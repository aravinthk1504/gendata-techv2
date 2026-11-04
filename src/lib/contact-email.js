import "server-only";
import { buildEnquiryNotification } from "./contact-notification-template.mjs";

function validEmail(value) {
  return typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@<>\r\n,]+@[^\s@<>\r\n,]+\.[^\s@<>\r\n,]+$/.test(value);
}

function notificationSettings() {
  if (process.env.RESEND_NOTIFICATIONS_ENABLED !== "true") {
    return { enabled: false };
  }
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = (process.env.RESEND_NOTIFY_TO || "")
    .split(",").map(value => value.trim()).filter(Boolean);
  if (!key || !from || !validEmail(from.match(/<([^<>]+)>$/)?.[1] || from) ||
      !to.length || to.length > 5 || !to.every(validEmail)) {
    return { enabled: true, configured: false };
  }
  return { enabled: true, configured: true, key, from, to };
}

// A successful API response means Resend accepted the message, not that an inbox
// delivered it. No customer-facing acknowledgement is sent from this function.
export async function sendEnquiryNotification(enquiryId, enquiry) {
  const settings = notificationSettings();
  if (!settings.enabled) return { status: "disabled" };
  if (!settings.configured) return { status: "not_configured" };

  const { subject, html, text } = buildEnquiryNotification(enquiryId, enquiry);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + settings.key,
        "Content-Type": "application/json",
        // Safe if a transient request is retried with the same Firestore enquiry.
        "Idempotency-Key": "gendata-contact-" + enquiryId,
      },
      body: JSON.stringify({
        from: settings.from,
        to: settings.to,
        reply_to: enquiry.email,
        subject,
        html,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) {
      console.error("Resend enquiry notification rejected", { status: response.status });
      return { status: "failed" };
    }
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id) {
      console.error("Resend enquiry notification returned no message ID");
      return { status: "failed" };
    }
    return { status: "accepted", providerId: result.id };
  } catch (error) {
    console.error("Resend enquiry notification unavailable", error?.name || "unknown");
    return { status: "failed" };
  }
}
