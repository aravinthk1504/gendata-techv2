import { NextResponse } from "next/server";
import { currentAdmin } from "../../../../lib/admin-auth";
import { db } from "../../../../lib/firebase-admin";

export const runtime = "nodejs";

export async function GET() {
  if (!await currentAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const snapshot = await db.collection("_adminAudit")
      .orderBy("createdAt", "desc").limit(50).get();
    const activity = snapshot.docs.map(doc => {
      const record = doc.data();
      return {
        id: doc.id,
        event: record.event || "unknown",
        actorUid: record.actorUid || "",
        target: record.target || "",
        createdAt: record.createdAt?.toDate?.()?.toISOString() || null,
      };
    });
    return NextResponse.json({ activity }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Admin audit history read failed", error?.code || error?.name);
    return NextResponse.json({ error: "Unable to load admin activity" }, { status: 500 });
  }
}
