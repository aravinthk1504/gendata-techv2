
import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { contactSchema } from "../../../lib/contact-validation";
import {
  RateLimitError,
  saveEnquiryWithRateLimit,
} from "../../../lib/contact-rate-limit";

export const runtime = "nodejs";

function respond(data, status) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return respond(
        { success: false, error: "Expected JSON" },
        415
      );
    }

    const length = Number(
      request.headers.get("content-length") ?? "0"
    );

    if (length > 16_384) {
      return respond(
        { success: false, error: "Request too large" },
        413
      );
    }

    const raw = await request.text();

    if (Buffer.byteLength(raw, "utf8") > 16_384) {
      return respond(
        { success: false, error: "Request too large" },
        413
      );
    }

    let body;

    try {
      body = JSON.parse(raw);
    } catch {
      return respond(
        { success: false, error: "Invalid JSON" },
        400
      );
    }

    const validated = contactSchema.safeParse(body);

    if (!validated.success) {
      return respond(
        { success: false, error: "Invalid form data" },
        400
      );
    }

    // Basic bot detection: hidden website field.
    if (validated.data.website !== "") {
      return respond(
        { success: false, error: "Invalid submission" },
        400
      );
    }

    // This address must come from a trusted hosting proxy.
    // On localhost, use a consistent loopback fallback.
    const forwarded = request.headers.get("x-forwarded-for");
    const clientAddress =
      forwarded?.split(",")[0]?.trim() || "127.0.0.1";

    const {
      website: _honeypot,
      ...cleanData
    } = validated.data;

    const enquiry = {
      ...cleanData,
      email: cleanData.email.toLowerCase(),
      status: "new",
      emailStatus: "not_configured",
      createdAt: FieldValue.serverTimestamp(),
    };

    const enquiryId = await saveEnquiryWithRateLimit(
      enquiry,
      clientAddress
    );

    return respond(
      {
        success: true,
        message: "Enquiry saved successfully",
        enquiryId,
      },
      201
    );
  } catch (error) {
    if (error instanceof RateLimitError) {
      return respond(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        429
      );
    }

   console.error("Contact API failed:", {
  name: error?.name,
  code: error?.code,
  message: error?.message,
});

    return respond(
      {
        success: false,
        error: "Unable to process enquiry",
      },
      500
    );
  }
}
