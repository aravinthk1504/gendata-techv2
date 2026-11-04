// Pure template builder, deliberately independent of Firebase and Resend.
const escapeHtml = value => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

export function buildEnquiryNotification(id, enquiry) {
  const lines = [
    ["Enquiry ID", id],
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Category", enquiry.category],
    ["Offering", enquiry.offering],
    ["Language", enquiry.language === "de" ? "German" : "English"],
  ];
  const subject = "New GenData Tech enquiry — " + enquiry.category;
  const text = [
    "A new enquiry has been saved to the GenData Tech admin dashboard.",
    "",
    ...lines.map(([label, value]) => label + ": " + String(value || "—")),
    "",
    "Customer message:",
    String(enquiry.message || "—"),
    "",
    "Open Admin → Enquiries to manage this request and add follow-up notes.",
  ].join("\n");
  const rows = lines.map(([label, value]) =>
    '<tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e7edf6;color:#56637a;vertical-align:top">' +
    escapeHtml(label) + '</th><td style="padding:10px 12px;border-bottom:1px solid #e7edf6;overflow-wrap:anywhere">' +
    escapeHtml(value || "—") + "</td></tr>"
  ).join("");
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f8ff;font-family:Arial,sans-serif;color:#081b3a">
    <main style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #dde7f5;border-radius:14px;overflow:hidden">
      <header style="background:#06142f;padding:26px 30px;color:#fff"><div style="font-size:12px;letter-spacing:2px;color:#67e8f9">GENDATA TECH</div>
      <h1 style="font-size:24px;margin:12px 0 4px">New website enquiry</h1>
      <p style="margin:0;color:#cbd5e1">Saved in Firebase · Admin notification</p></header>
      <div style="padding:24px">
        <table role="presentation" style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
        <h2 style="font-size:16px;margin:26px 0 10px">Customer message</h2>
        <div style="white-space:pre-wrap;overflow-wrap:anywhere;background:#f5f8ff;padding:18px;border-radius:10px;font-size:14px;line-height:1.6">${escapeHtml(enquiry.message || "—")}</div>
        <p style="font-size:12px;color:#64748b;margin-top:22px">Open Admin → Enquiries to update the status and record follow-ups. You can reply directly to this notification to email the customer.</p>
      </div>
    </main>
  </body></html>`;
  return { subject, text, html };
}
