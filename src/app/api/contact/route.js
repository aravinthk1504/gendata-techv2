import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { contactSchema } from "../../../lib/contact-validation";
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

    const { website: ignoredHoneypot, ...formData } = parsed.data;

    // Local-development fallback only. A production deployment must
    // derive the client address from a verified, trusted proxy.
    const forwarded = request.headers.get("x-forwarded-for");
    const clientAddress =
      process.env.NODE_ENV === "production"
        ? "unverified-client"
        : forwarded?.split(",")[0]?.trim() || "127.0.0.1";

    const enquiryId = await saveEnquiryWithRateLimit(
      {
        ...formData,
        email: formData.email.toLowerCase(),
        status: "new",
        emailStatus: "not_configured",
        createdAt: FieldValue.serverTimestamp(),
      },
      clientAddress
    );

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
