/**
 * Contact-form leads → Google Sheets.
 *
 * Validates the form server-side, then forwards it to the Apps Script web app
 * in scripts/google-sheets-leads.gs, which appends a row. The script URL lives
 * in the LEADS_WEBHOOK_URL env var so it never ships to the browser.
 */
const FIELDS = ["name", "email", "phone", "company", "message"] as const;
const MAX_LEN = 2000;

export async function POST(request: Request) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) {
    console.error("LEADS_WEBHOOK_URL is not set");
    return Response.json({ ok: false }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field.
  if (body.website) return Response.json({ ok: true });

  const lead = Object.fromEntries(
    FIELDS.map((k) => [k, String(body[k] ?? "").trim().slice(0, MAX_LEN)])
  );
  if (
    !lead.name ||
    !lead.company ||
    !lead.message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)
  ) {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Apps Script runs doPost to completion, *then* 302-redirects to a
  // googleusercontent URL holding its reply. Google often refuses that second
  // request from Cloudflare's datacenter IPs, so the row saves but the reply
  // is lost. Read the reply when we can; if we can't, the 302 alone proves
  // the script ran.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    redirect: "manual",
  });
  const next = res.headers.get("location");
  const ran = res.status >= 300 && res.status < 400 && !!next;

  let reply = res;
  if (ran) {
    try {
      reply = await fetch(next!);
    } catch (err) {
      console.error("Sheets reply fetch failed (lead saved)", err);
      return Response.json({ ok: true });
    }
  }
  const text = await reply.text();
  let result: { ok?: boolean; error?: string } | null = null;
  try {
    result = JSON.parse(text);
  } catch {
    // Not JSON — Google served an HTML page instead of the script's reply.
  }

  if (result?.ok) return Response.json({ ok: true });
  // Script explicitly reported an error (e.g. sheet missing): a real failure.
  if (result && !result.ok) {
    console.error("Sheets script error", text.slice(0, 300));
    // ponytail: diagnostic detail in the response; drop once leads are stable.
    return Response.json(
      { ok: false, why: "script", error: String(result.error ?? "").slice(0, 200) },
      { status: 502 }
    );
  }
  // Reply unreadable. If the script ran, the lead is saved.
  console.error("Sheets reply unreadable", res.status, reply.status, text.slice(0, 200));
  return Response.json(
    ran ? { ok: true } : { ok: false, why: "no-redirect", first: res.status, reply: reply.status },
    { status: ran ? 200 : 502 }
  );
}
