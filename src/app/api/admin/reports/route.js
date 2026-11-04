import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { currentAdmin } from "../../../../lib/admin-auth";
import { db } from "../../../../lib/firebase-admin";

export const runtime = "nodejs";

export async function GET() {
  if (!await currentAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const ref = db.collection("enquiries");
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, index) => {
      const first = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + index, 1));
      const next = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 1));
      return {
        key: first.toISOString().slice(0, 7),
        label: first.toLocaleString("en-GB", { month: "short", year: "2-digit", timeZone: "UTC" }),
        start: Timestamp.fromDate(first),
        end: Timestamp.fromDate(next),
      };
    });

    const [total, ...results] = await Promise.all([
      ref.count().get(),
      ...["new", "in_progress", "contacted", "completed"].map(status =>
        ref.where("status", "==", status).count().get()
      ),
      ...months.map(month =>
        ref.where("createdAt", ">=", month.start)
          .where("createdAt", "<", month.end).count().get()
      ),
    ]);
    const statuses = {};
    ["new", "in_progress", "contacted", "completed"].forEach((status, index) => {
      statuses[status] = results[index].data().count;
    });
    const trend = months.map((month, index) => ({
      key: month.key, label: month.label, count: results[index + 4].data().count,
    }));
    return NextResponse.json({
      total: total.data().count,
      statuses,
      trend,
      generatedAt: new Date().toISOString(),
      note: "Status counts exclude legacy enquiries with no status field; total includes all records.",
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Admin full enquiry report failed", error?.code || error?.name);
    return NextResponse.json({ error: "Unable to generate the full enquiry report" }, { status: 500 });
  }
}
