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

  // Apps Script runs doPost, then 302-redirects to the URL holding its
  // reply. Follow that redirect by hand with a GET: Cloudflare's fetch
  // doesn't reliably do it for a POST, so the lead saved but the reply failed.
  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    redirect: "manual",
  });
  const next = res.headers.get("location");
  if (res.status >= 300 && res.status < 400 && next) {
    res = await fetch(next);
  }
  const text = await res.text();
  let result: { ok?: boolean } | null = null;
  try {
    result = JSON.parse(text);
  } catch {
    // Google returned an HTML error page, not JSON.
  }
  if (!res.ok || !result?.ok) {
    console.error("Sheets webhook failed", res.status, text.slice(0, 300));
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
