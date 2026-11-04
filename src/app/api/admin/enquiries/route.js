import { NextResponse } from "next/server";
import { currentAdmin } from "../../../../lib/admin-auth";
import { db } from "../../../../lib/firebase-admin";

export const runtime = "nodejs";
const LIMIT = 100;
const reply = (body, status = 200) => NextResponse.json(body, {
  status, headers: { "Cache-Control": "no-store" },
});

function normalizeEnquiry(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    name: String(data.name || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    category: String(data.category || ""),
    offering: String(data.offering || ""),
    message: String(data.message || ""),
    status: String(data.status || "new"),
    createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
    updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
    statusChangedAt: data.statusChangedAt?.toDate?.()?.toISOString() || null,
    lastNote: String(data.lastNote || ""),
    lastNoteAt: data.lastNoteAt?.toDate?.()?.toISOString() || null,
  };
}

export async function GET(request) {
  if (!await currentAdmin()) return reply({ error: "Unauthorized" }, 401);
  const cursor = new URL(request.url).searchParams.get("cursor");
  if (cursor && !/^[a-zA-Z0-9_-]{1,128}$/.test(cursor)) {
    return reply({ error: "Invalid pagination cursor" }, 400);
  }
  try {
    let query = db.collection("enquiries").orderBy("createdAt", "desc").limit(LIMIT + 1);
    if (cursor) {
      const snap = await db.collection("enquiries").doc(cursor).get();
      if (!snap.exists || !snap.get("createdAt")) return reply({ error: "Cursor not found" }, 400);
      query = query.startAfter(snap);
    }
    const snap = await query.get();
    const hasMore = snap.docs.length > LIMIT;
    const docs = snap.docs.slice(0, LIMIT);
    return reply({
      enquiries: docs.map(normalizeEnquiry),
      nextCursor: hasMore ? docs[docs.length - 1].id : null,
    });
  } catch (error) {
    console.error("Enquiry pagination failed", error?.code || error?.name);
    return reply({ error: "Unable to load enquiries" }, 500);
  }
}
