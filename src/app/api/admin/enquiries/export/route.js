import { currentAdmin } from "../../../../../lib/admin-auth";
import { db } from "../../../../../lib/firebase-admin";

export const runtime = "nodejs";

const headers = [
  "Submitted at", "Name", "Email", "Phone", "Category", "Offering",
  "Status", "Customer message", "Latest follow-up note", "Last note at",
];

function safeCell(value) {
  let text = String(value ?? "").replace(/\0/g, "");
  // Protect spreadsheet applications from executing values supplied by visitors.
  // Leading whitespace can conceal an Excel formula prefix.
  if (/^[\s\uFEFF]*[=+@\-]/u.test(text)) text = "'" + text;
  return '"' + text.replace(/"/g, '""') + '"';
}

function csvRow(values) {
  return values.map(safeCell).join(",") + "\r\n";
}

export async function GET() {
  if (!await currentAdmin()) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(encoder.encode("\uFEFF" + csvRow(headers)));
          let lastDoc = null;
          while (true) {
            let query = db.collection("enquiries").orderBy("createdAt", "desc").limit(250);
            if (lastDoc) query = query.startAfter(lastDoc);
            const snap = await query.get();
            for (const doc of snap.docs) {
              const e = doc.data();
              controller.enqueue(encoder.encode(csvRow([
                e.createdAt?.toDate?.()?.toISOString() || "",
                e.name, e.email, e.phone, e.category, e.offering,
                e.status || "new", e.message, e.lastNote || "",
                e.lastNoteAt?.toDate?.()?.toISOString() || "",
              ])));
            }
            if (snap.docs.length < 250) break;
            lastDoc = snap.docs[snap.docs.length - 1];
          }
          controller.close();
        } catch (error) {
          console.error("Enquiry export stream failed", error?.code || error?.name);
          controller.error(error);
        }
      },
    });
    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="gendata-enquiries.csv"',
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Enquiry export failed", error?.code || error?.name);
    return new Response(JSON.stringify({ error: "Export unavailable" }), {
      status: 500, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
}
