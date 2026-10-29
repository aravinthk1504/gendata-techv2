
import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";

import { db } from "../../../lib/firebase-admin";

export const runtime = "nodejs";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  phone: z.string().trim().max(25).optional().default(""),
  category: z.enum([
    "Services",
    "Products",
    "Training",
    "Other Enquiry",
  ]),
  offering: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(5000),
  language: z.enum(["en", "de"]).default("en"),
}).strict();

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Unsupported content type" },
        { status: 415 }
      );
    }

    // Reject oversized requests before parsing the JSON.
    const contentLength = Number(
      request.headers.get("content-length") ?? "0"
    );

    if (contentLength > 16_384) {
      return NextResponse.json(
        { success: false, error: "Request too large" },
        { status: 413 }
      );
    }

    const rawBody = await request.text();

    if (Buffer.byteLength(rawBody, "utf8") > 16_384) {
      return NextResponse.json(
        { success: false, error: "Request too large" },
        { status: 413 }
      );
    }

    let body;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON" },
        { status: 400 }
      );
    }

    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data",
          fields: z.flattenError(result.error).fieldErrors,
        },
        { status: 400 }
      );
    }

    const enquiry = {
      ...result.data,
      status: "new",
      emailStatus: "pending",
      createdAt: FieldValue.serverTimestamp(),
    };

    const document = await db.collection("enquiries").add(enquiry);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry received successfully",
        enquiryId: document.id,
      },
      { status: 201 }
    );
  } catch (error) {
    // Do not expose internal errors or credentials to visitors.
    console.error("Contact API request failed:", error.code ?? "unknown");

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process the enquiry",
      },
      { status: 500 }
    );
  }
}
