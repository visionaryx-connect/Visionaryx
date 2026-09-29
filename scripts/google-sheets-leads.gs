/**
 * Google Apps Script: appends each website lead as a row in the sheet.
 *
 * Setup (one time):
 *  1. Open the Google Sheet → Extensions → Apps Script. Paste this file, save.
 *  2. Deploy → New deployment → type "Web app".
 *       Execute as: Me   ·   Who has access: Anyone
 *     Authorise it, then copy the Web app URL (ends in /exec).
 *  3. Give that URL to the website as the LEADS_WEBHOOK_URL env var:
 *       - local:      .env.local  →  LEADS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 *       - Cloudflare: npx wrangler secret put LEADS_WEBHOOK_URL
 *  After editing this script, Deploy → Manage deployments → Edit → New version
 *  (keeps the same URL).
 */
// Where new-lead alerts go. Hard-coded so the script needs no extra permission.
const ALERT_TO = "visionaryx.connect@gmail.com";

const HEADERS = ["Date", "Name", "Email", "Phone", "Company", "Message", "Status"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads")
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    const d = JSON.parse(e.postData.contents);
    // Leading ' stops a value like "=HYPERLINK(...)" running as a formula.
    const safe = (v) => {
      const s = String(v || "");
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };
    sheet.appendRow([
      new Date(),
      safe(d.name),
      safe(d.email),
      safe(d.phone),
      safe(d.company),
      safe(d.message),
      "New",
    ]);
    // Email alert for every lead (sheet notifications skip your own edits).
    // The row is already saved, so a mail failure must not fail the lead.
    try {
      sendAlert(d);
    } catch (mailErr) {
      console.error("Lead saved, email alert failed: " + mailErr);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function sendAlert(d) {
  MailApp.sendEmail({
    to: ALERT_TO,
    replyTo: d.email,
    subject: "New website lead — " + d.name + " (" + d.company + ")",
    body: [
      "Name: " + d.name,
      "Email: " + d.email,
      "Phone: " + (d.phone || "—"),
      "Company: " + d.company,
      "",
      d.message,
      "",
      SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].join("\n"),
  });
}

/** Run this once from the editor (select it → Run) to grant email permission. */
function authorize() {
  sendAlert({ name: "Test", email: ALERT_TO, company: "Setup", message: "Email alerts are working." });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
