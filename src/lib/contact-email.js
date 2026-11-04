import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildEnquiryNotification, buildCustomerAcknowledgement } from "./contact-notification-template.mjs";

// A hosted PNG URL is preferred for broad email compatibility.
// Otherwise embed the existing project logo via Resend CID attachments.
let brandPromise;
async function emailBranding() {
  const hosted = process.env.RESEND_EMAIL_LOGO_URL?.trim();
  if (hosted) {
    try {
      const url = new URL(hosted);
      if (url.protocol === "https:") return { logoSrc: url.href, attachments: [] };
    } catch {}
  }
  if (!brandPromise) {
    brandPromise = readFile(join(process.cwd(), "public/assets/gendata-tech-mark.webp"))
      .then(data => ({
        logoSrc: "cid:gendata-tech-logo",
        attachments: [{
          filename: "gendata-tech-mark.webp",
          content: data.toString("base64"),
          content_type: "image/webp",
          content_id: "gendata-tech-logo",
        }],
      }))
      .catch(error => {
        console.error("Email logo unavailable", error?.code || error?.name || "unknown");
        return { logoSrc: "", attachments: [] };
      });
  }
  return brandPromise;
}

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
// delivered it. This function sends the internal management notification.
export async function sendEnquiryNotification(enquiryId, enquiry) {
  const settings = notificationSettings();
  if (!settings.enabled) return { status: "disabled" };
  if (!settings.configured) return { status: "not_configured" };

  const branding = await emailBranding();
  const { subject, html, text } = buildEnquiryNotification(enquiryId, enquiry, { logoSrc: branding.logoSrc });
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
        ...(branding.attachments.length ? { attachments: branding.attachments } : {}),
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

// Optional, separately addressed customer email. The management notification's
// Reply-To header alone never sends an email to the customer.
export async function sendCustomerAcknowledgement(enquiryId, enquiry) {
  if (process.env.RESEND_CUSTOMER_ACK_ENABLED !== "true") return { status: "disabled" };
  const settings = notificationSettings();
  if (!settings.enabled) return { status: "disabled" };
  if (!settings.configured || !validEmail(enquiry.email)) return { status: "not_configured" };

  const fromAddress = settings.from.match(/<([^<>]+)>$/)?.[1] || settings.from;
  const domain = fromAddress.split("@")[1];
  const customerFrom = process.env.RESEND_CUSTOMER_FROM_EMAIL?.trim() || ("GenData Tech <noreply@" + domain + ">");
  const replyTo = process.env.RESEND_CUSTOMER_REPLY_TO?.trim() || ("support@" + domain);
  const customerEmail = customerFrom.match(/<([^<>]+)>$/)?.[1] || customerFrom;
  if (!validEmail(customerEmail) || !validEmail(replyTo)) return { status: "not_configured" };
  const branding = await emailBranding();
  const { subject, html, text } = buildCustomerAcknowledgement(enquiryId, enquiry, { logoSrc: branding.logoSrc, supportEmail: replyTo });
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + settings.key,
        "Content-Type": "application/json",
        "Idempotency-Key": "gendata-customer-ack-" + enquiryId,
      },
      body: JSON.stringify({
        from: customerFrom, to: [enquiry.email], reply_to: replyTo,
        subject, html, text,
        ...(branding.attachments.length ? { attachments: branding.attachments } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) {
      console.error("Resend customer acknowledgement rejected", { status: response.status });
      return { status: "failed" };
    }
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id) {
      console.error("Resend customer acknowledgement returned no message ID");
      return { status: "failed" };
    }
    return { status: "accepted", providerId: result.id };
  } catch (error) {
    console.error("Resend customer acknowledgement unavailable", error?.name || "unknown");
    return { status: "failed" };
  }
}
