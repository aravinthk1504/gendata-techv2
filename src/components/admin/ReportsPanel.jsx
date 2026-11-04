"use client";

import { useEffect, useState } from "react";
import { FiRefreshCw, FiBarChart2, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

const stages = [
  ["new", "New", "bg-cyan-500"],
  ["in_progress", "In progress", "bg-blue-500"],
  ["contacted", "Contacted", "bg-violet-500"],
  ["completed", "Completed", "bg-emerald-500"],
];

export default function ReportsPanel() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/reports", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw Error(result.error || "Unable to load reports");
      setReport(result);
    } catch (issue) {
      setError(issue.message || "Unable to load reports");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { void refresh(); }, []);

  const total = report?.total || 0;
  const complete = report?.statuses?.completed || 0;
  const months = report?.trend || [];
  const max = Math.max(1, ...months.map(month => month.count));

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Firestore-wide statistics, including enquiries that haven't been loaded into the management table.
        </p>
        <button type="button" onClick={refresh} disabled={loading}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold disabled:opacity-50">
          <FiRefreshCw aria-hidden="true"/> {loading ? "Refreshing…" : "Refresh report"}
        </button>
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {loading && !report && <p role="status" className="text-sm text-slate-600">Calculating enquiry totals…</p>}
      {report && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {[
              ["All enquiries", total, FiBarChart2],
              ["New", report.statuses.new || 0, FiTrendingUp],
              ["In progress", report.statuses.in_progress || 0, FiTrendingUp],
              ["Completed", complete, FiCheckCircle],
            ].map(([label, value, Icon]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <Icon className="text-[#057cfa]" aria-hidden="true" size={20}/>
                <p className="mt-4 text-xs font-semibold text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold tabular-nums text-[#081b3a]">{value.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold">Monthly enquiries</h2>
              <p className="mt-1 text-xs text-slate-500">All Firestore enquiries during the past six calendar months (UTC).</p>
              <div className="mt-6 flex h-52 items-end gap-2 sm:gap-3" role="img"
                aria-label={months.map(item => item.label + ": " + item.count).join(", ")}>
                {months.map(item => (
                  <div key={item.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                    <span className="text-xs font-bold tabular-nums">{item.count}</span>
                    <div className="w-full max-w-14 rounded-t-xl bg-gradient-to-t from-[#002dcc] to-[#21d4f3]"
                      style={{ height: Math.max(3, item.count / max * 145) + "px" }}/>
                    <span className="text-[11px] text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold">Enquiry stages</h2>
              <p className="mt-1 text-xs text-slate-500">Current status distribution for all records with a status field.</p>
              <div className="mt-7 space-y-5">
                {stages.map(([key, label, color]) => {
                  const count = report.statuses[key] || 0;
                  return (
                    <div key={key}>
                      <div className="mb-2 flex justify-between gap-2 text-sm">
                        <span>{label}</span><strong className="tabular-nums">{count.toLocaleString()}</strong>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div className={"h-full rounded-full " + color}
                          style={{ width: count / Math.max(1, total) * 100 + "%" }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                Completed: <strong>{total ? (complete / total * 100).toFixed(1) : "0.0"}%</strong> of all enquiries
              </p>
            </div>
          </div>
          <p className="text-xs leading-5 text-slate-500">{report.note} Last calculated: {new Date(report.generatedAt).toLocaleString("en-GB")}.</p>
        </>
      )}
    </section>
  );
}
