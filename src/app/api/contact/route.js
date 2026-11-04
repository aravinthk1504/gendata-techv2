import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../../lib/firebase-admin";
import { sendEnquiryNotification, sendCustomerAcknowledgement } from "../../../lib/contact-email";
import { contactSchema } from "../../../lib/contact-validation";
import { verifyContactTurnstile } from "../../../lib/contact-turnstile.mjs";
import {
  RateLimitError,
  saveEnquiryWithRateLimit,
} from "../../../lib/contact-rate-limit";

export const runtime = "nodejs";

function json(data, status) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
      return json({ success: false, error: "Expected JSON" }, 415);
    }

    const lengthHeader = request.headers.get("content-length");
    const length = lengthHeader === null ? 0 : Number(lengthHeader);
    if (!Number.isFinite(length) || length < 0 || length > 16_384) {
      return json({ success: false, error: "Request too large" }, 413);
    }

    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 16_384) {
      return json({ success: false, error: "Request too large" }, 413);
    }

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return json({ success: false, error: "Invalid JSON" }, 400);
    }

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      return json({
        success: false,
        error: "Invalid form data",
        fields: parsed.error.flatten().fieldErrors,
      }, 400);
    }

    if (parsed.data.website !== "") {
      return json({ success: false, error: "Invalid submission" }, 400);
    }

    const { website: ignoredHoneypot, turnstileToken, ...formData } = parsed.data;
    // Siteverify runs before any Firestore write or Resend email.
    // In production, missing keys or hostname settings fail closed.
    const verification = await verifyContactTurnstile(turnstileToken);
    if (!verification.ok) {
      if (verification.reason === "not_configured") {
        console.error("Contact Turnstile is not configured");
      }
      if (verification.reason === "not_configured" || verification.reason === "unavailable") {
        return json({ success: false, error: "Security verification temporarily unavailable" }, 503);
      }
      return json({ success: false, error: "Security verification failed. Please try again." }, 403);
    }

    const enquiry = { ...formData, email: formData.email.toLowerCase() };

    // Until a trusted edge/proxy client-address source is configured, use
    // the validated normalized email as the production rate-limit identity.
    // This avoids accidentally limiting all customers as one shared visitor.
    // A verified-IP/WAF limiter is still required before public launch.
    const forwarded = request.headers.get("x-forwarded-for");
    const clientAddress =
      process.env.NODE_ENV === "production"
        ? "email:" + enquiry.email
        : "dev-ip:" + (forwarded?.split(",")[0]?.trim() || "127.0.0.1");

    const enquiryId = await saveEnquiryWithRateLimit(
      {
        ...enquiry,
        status: "new",
        emailStatus: "pending",
        customerEmailStatus: process.env.RESEND_CUSTOMER_ACK_ENABLED === "true" ? "pending" : "disabled",
        createdAt: FieldValue.serverTimestamp(),
      },
      clientAddress
    );

    // Firestore is the source of truth: a Resend outage must never turn a
    // successfully saved enquiry into a failed form response.
    const notification = await sendEnquiryNotification(enquiryId, enquiry);
    // A separate acknowledgement to the customer, independent of management.
    // Failure of either email must never roll back the saved Firestore enquiry.
    const acknowledgement = await sendCustomerAcknowledgement(enquiryId, enquiry);
    try {
      await db.collection("enquiries").doc(enquiryId).update({
        emailStatus: notification.status,
        ...(notification.providerId ? { emailProviderId: notification.providerId } : {}),
        emailAttemptedAt: FieldValue.serverTimestamp(),
        customerEmailStatus: acknowledgement.status,
        ...(acknowledgement.providerId ? { customerEmailProviderId: acknowledgement.providerId } : {}),
        customerEmailAttemptedAt: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error("Enquiry email state update failed", error?.code || error?.name || "unknown");
    }

    return json({
      success: true,
      message: "Enquiry saved successfully",
      enquiryId,
    }, 201);
  } catch (error) {
    if (error instanceof RateLimitError) {
      return json({
        success: false,
        error: "Too many requests. Please try again later.",
      }, 429);
    }

    // Server log only: do not expose Firebase or environment details
    // in the HTTP response.
    console.error("Contact API failed", {
      name: error?.name ?? "unknown",
      code: error?.code ?? "unknown",
      message: error?.message ?? "unknown",
    });
    return json({
      success: false,
      error: "Unable to process enquiry",
    }, 500);
  }
}
