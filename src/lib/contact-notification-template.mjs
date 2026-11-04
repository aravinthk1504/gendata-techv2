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

 
// Customer confirmation deliberately excludes the full message and phone number
// because the submitted email address has not been ownership-verified.
export function buildCustomerAcknowledgement(id, enquiry) {
  const de = enquiry.language === "de";
  const name = String(enquiry.name || "").trim();
  const topic = String(enquiry.offering || "").trim();
  const c = de ? {
    subject: "Wir haben Ihre Anfrage erhalten | GenData Tech",
    hello: "Guten Tag", intro: "Vielen Dank für Ihre Nachricht an GenData Tech.",
    received: "Wir haben Ihre Anfrage erhalten. Unser Team wird sie prüfen.",
    topic: "Anfragethema", ref: "Referenznummer",
    next: "Wir melden uns über die von Ihnen angegebenen Kontaktdaten bei Ihnen.",
    footer: "Dies ist eine automatische Eingangsbestätigung. Für Ergänzungen können Sie auf diese E-Mail antworten.",
  } : {
    subject: "We've received your enquiry | GenData Tech",
    hello: "Hello", intro: "Thank you for contacting GenData Tech.",
    received: "We have received your enquiry and our team will review it.",
    topic: "Enquiry topic", ref: "Reference number",
    next: "We will follow up using the contact information you provided.",
    footer: "This is an automated acknowledgement. You can reply to this email to share additional details.",
  };
  const greeting = c.hello + (name ? " " + name : "") + ",";
  const text = [
    greeting, "", c.intro, c.received, "",
    ...(topic ? [c.topic + ": " + topic] : []),
    c.ref + ": " + id, "", c.next, "", c.footer, "", "GenData Tech",
  ].join("\n");
  const items = [
    ...(topic ? [[c.topic, topic]] : []), [c.ref, id],
  ].map(([label, value]) =>
    '<tr><th align="left" style="padding:11px 0;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0">' +
    escapeHtml(label) + '</th><td style="padding:11px 0 11px 16px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;overflow-wrap:anywhere">' +
    escapeHtml(value) + '</td></tr>'
  ).join("");
  const html = `<!doctype html><html lang="${de ? "de" : "en"}"><body style="margin:0;padding:24px;background:#f5f8ff;font-family:Arial,sans-serif;color:#081b3a">
    <main style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #dde7f5;border-radius:14px;overflow:hidden">
      <header style="background:#06142f;padding:28px;color:#fff">
        <div style="font-size:12px;letter-spacing:2px;color:#67e8f9">GENDATA TECH</div>
        <h1 style="font-size:25px;line-height:1.3;margin:14px 0 0">${escapeHtml(c.subject.split(" | ")[0])}</h1>
      </header>
      <div style="padding:28px">
        <p style="font-size:15px;line-height:1.7">${escapeHtml(greeting)}</p>
        <p style="font-size:15px;line-height:1.7">${escapeHtml(c.intro)}</p>
        <p style="font-size:15px;line-height:1.7;margin-bottom:20px">${escapeHtml(c.received)}</p>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:22px">${items}</table>
        <p style="font-size:14px;line-height:1.7">${escapeHtml(c.next)}</p>
        <p style="font-size:12px;line-height:1.7;color:#64748b">${escapeHtml(c.footer)}</p>
        <p style="font-size:14px;font-weight:700;color:#002DCC">GenData Tech</p>
      </div>
    </main>
  </body></html>`;
  return { subject: c.subject, html, text };
}
