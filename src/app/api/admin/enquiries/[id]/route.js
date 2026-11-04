import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { currentAdmin } from "../../../../../lib/admin-auth";
import { db } from "../../../../../lib/firebase-admin";

export const runtime = "nodejs";
const STATUSES = new Set(["new", "in_progress", "contacted", "completed"]);
const reply = (body, status = 200) => NextResponse.json(body, {
  status, headers: { "Cache-Control": "no-store" },
});

function sameOrigin(request) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    return Boolean(origin && host && new URL(origin).host === host);
  } catch { return false; }
}

async function recordRef(params) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) return null;
  return db.collection("enquiries").doc(id);
}

function timestamp(value) {
  return value?.toDate?.()?.toISOString() || null;
}

async function readBody(request) {
  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > 4096) throw new Error("TOO_LARGE");
  return JSON.parse(raw);
}

export async function GET(request, { params }) {
  if (!await currentAdmin()) return reply({ error: "Unauthorized" }, 401);
  const ref = await recordRef(params);
  if (!ref) return reply({ error: "Invalid enquiry ID" }, 400);
  try {
    const [snap, history] = await Promise.all([
      ref.get(),
      ref.collection("activity").orderBy("createdAt", "desc").limit(100).get(),
    ]);
    if (!snap.exists) return reply({ error: "Enquiry not found" }, 404);
    const data = snap.data();
    return reply({
      enquiry: {
        id: snap.id, ...data,
        createdAt: timestamp(data.createdAt),
        updatedAt: timestamp(data.updatedAt),
        statusChangedAt: timestamp(data.statusChangedAt),
        lastNoteAt: timestamp(data.lastNoteAt),
      },
      activity: history.docs.map(doc => {
        const item = doc.data();
        return { id: doc.id, ...item, createdAt: timestamp(item.createdAt) };
      }),
    });
  } catch (error) {
    console.error("Enquiry detail read failed", error?.code || error?.name);
    return reply({ error: "Unable to load enquiry" }, 500);
  }
}

export async function PATCH(request, { params }) {
  const admin = await currentAdmin();
  if (!admin) return reply({ error: "Unauthorized" }, 401);
  if (!sameOrigin(request)) return reply({ error: "Invalid origin" }, 403);
  const ref = await recordRef(params);
  if (!ref) return reply({ error: "Invalid enquiry ID" }, 400);

  try {
    const body = await readBody(request);
    if (!body || Object.keys(body).length !== 1 || !STATUSES.has(body.status)) {
      return reply({ error: "Invalid status" }, 400);
    }
    const changed = await db.runTransaction(async tx => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error("NOT_FOUND");
      const previous = snap.get("status") || "new";
      if (previous === body.status) return false;
      tx.update(ref, {
        status: body.status,
        statusChangedAt: FieldValue.serverTimestamp(),
        statusChangedBy: admin.uid,
        updatedAt: FieldValue.serverTimestamp(),
      });
      tx.create(ref.collection("activity").doc(), {
        type: "status_changed", fromStatus: previous, toStatus: body.status,
        createdBy: admin.uid, createdAt: FieldValue.serverTimestamp(),
      });
      return true;
    });
    return reply({ success: true, changed, status: body.status });
  } catch (error) {
    if (error instanceof SyntaxError) return reply({ error: "Invalid JSON" }, 400);
    if (error?.message === "TOO_LARGE") return reply({ error: "Request too large" }, 413);
    if (error?.message === "NOT_FOUND") return reply({ error: "Enquiry not found" }, 404);
    console.error("Enquiry status update failed", error?.code || error?.name);
    return reply({ error: "Unable to update enquiry status" }, 500);
  }
}

export async function POST(request, { params }) {
  const admin = await currentAdmin();
  if (!admin) return reply({ error: "Unauthorized" }, 401);
  if (!sameOrigin(request)) return reply({ error: "Invalid origin" }, 403);
  const ref = await recordRef(params);
  if (!ref) return reply({ error: "Invalid enquiry ID" }, 400);

  try {
    const body = await readBody(request);
    if (!body || Object.keys(body).length !== 1 || typeof body.note !== "string") {
      return reply({ error: "Invalid note" }, 400);
    }
    const note = body.note.trim();
    if (note.length < 2 || note.length > 2000) {
      return reply({ error: "Note must contain 2–2000 characters" }, 400);
    }
    await db.runTransaction(async tx => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error("NOT_FOUND");
      tx.update(ref, {
        lastNote: note,
        lastNoteAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      tx.create(ref.collection("activity").doc(), {
        type: "note", text: note,
        createdBy: admin.uid, createdAt: FieldValue.serverTimestamp(),
      });
    });
    return reply({ success: true }, 201);
  } catch (error) {
    if (error instanceof SyntaxError) return reply({ error: "Invalid JSON" }, 400);
    if (error?.message === "TOO_LARGE") return reply({ error: "Request too large" }, 413);
    if (error?.message === "NOT_FOUND") return reply({ error: "Enquiry not found" }, 404);
    console.error("Enquiry note save failed", error?.code || error?.name);
    return reply({ error: "Unable to save follow-up note" }, 500);
  }
}
