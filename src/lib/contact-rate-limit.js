
import "server-only";

import { createHmac } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "./firebase-admin";

export class RateLimitError extends Error {
  constructor() {
    super("Too many requests");
    this.name = "RateLimitError";
  }
}

export async function saveEnquiryWithRateLimit(
  enquiry,
  clientAddress
) {
  const secret = process.env.RATE_LIMIT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("RATE_LIMIT_SECRET is not configured");
  }

  const now = Date.now();
  const hour = Math.floor(now / 3_600_000);

  // Hash the client address before storing it.
  const clientHash = createHmac("sha256", secret)
    .update(clientAddress)
    .digest("hex");

  const limitRef = db
    .collection("contactRateLimits")
    .doc(`${clientHash}_${hour}`);

  const enquiryRef = db.collection("enquiries").doc();

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(limitRef);
    const current = snapshot.exists ? snapshot.data() : null;

    if (
      current &&
      (current.count >= 5 ||
        now - current.lastSubmission < 60_000)
    ) {
      throw new RateLimitError();
    }

    transaction.set(limitRef, {
      count: (current?.count ?? 0) + 1,
      lastSubmission: now,
      expiresAt: Timestamp.fromMillis(now + 7_200_000),
    });

    transaction.set(enquiryRef, enquiry);
  });

  return enquiryRef.id;
}
