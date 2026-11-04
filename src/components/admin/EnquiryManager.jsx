"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const STATUS = [
  ["new", "New"],
  ["in_progress", "In progress"],
  ["contacted", "Contacted"],
  ["completed", "Completed"],
];
const labelStatus = value => STATUS.find(([id]) => id === value)?.[1] || "New";
const formatDate = value => value ? new Date(value).toLocaleString("en-GB", {
  dateStyle: "medium", timeStyle: "short",
}) : "—";
const control = "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800";

export default function EnquiryManager({ records, setRecords, cursor, setCursor }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [period, setPeriod] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const detailsRef = useRef(null);
  const [detail, setDetail] = useState(null);
  const [activity, setActivity] = useState([]);
  const [status, setStatus] = useState("new");
  const [note, setNote] = useState("");
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const categories = useMemo(() => [...new Set(records.map(e => e.category).filter(Boolean))].sort(), [records]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const threshold = period === "7" ? now - 7 * 86400000 : period === "30" ? now - 30 * 86400000 : 0;
    const term = query.trim().toLowerCase();
    return records.filter(e =>
      (statusFilter === "all" || (e.status || "new") === statusFilter) &&
      (categoryFilter === "all" || e.category === categoryFilter) &&
      (!threshold || (e.createdAt && new Date(e.createdAt).getTime() >= threshold)) &&
      (!term || [e.name, e.email, e.phone, e.category, e.offering, e.message].some(
        value => String(value || "").toLowerCase().includes(term)
      ))
    );
  }, [records, query, statusFilter, categoryFilter, period]);

  useEffect(() => {
    if (!selectedId) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    detailsRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }, [selectedId]);

  async function jsonRequest(url, options) {
    const response = await fetch(url, { cache: "no-store", ...options });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Request failed");
    return payload;
  }

  async function openDetail(id) {
    setSelectedId(id);
    setDetail(null);
    setActivity([]);
    setError("");
    setNotice("");
    setLoadingDetail(true);
    try {
      const result = await jsonRequest(`/api/admin/enquiries/${encodeURIComponent(id)}`);
      setDetail(result.enquiry);
      setActivity(result.activity || []);
      setStatus(result.enquiry.status || "new");
      setNote("");
    } catch (err) { setError(err.message); }
    finally { setLoadingDetail(false); }
  }

  async function refreshDetail(id) {
    const result = await jsonRequest(`/api/admin/enquiries/${encodeURIComponent(id)}`);
    setDetail(result.enquiry);
    setActivity(result.activity || []);
    setStatus(result.enquiry.status || "new");
    setRecords(previous => previous.map(item => item.id === id
      ? { ...item, status: result.enquiry.status, lastNote: result.enquiry.lastNote,
          lastNoteAt: result.enquiry.lastNoteAt, updatedAt: result.enquiry.updatedAt }
      : item));
  }

  async function saveStatus() {
    if (!selectedId || !detail || status === detail.status) return;
    setSaving(true); setError(""); setNotice("");
    try {
      await jsonRequest(`/api/admin/enquiries/${encodeURIComponent(selectedId)}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await refreshDetail(selectedId);
      setNotice("Status updated and recorded in the activity history.");
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  async function saveNote(event) {
    event.preventDefault();
    if (!selectedId || !note.trim()) return;
    setSaving(true); setError(""); setNotice("");
    try {
      await jsonRequest(`/api/admin/enquiries/${encodeURIComponent(selectedId)}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: note.trim() }),
      });
      setNote("");
      await refreshDetail(selectedId);
      setNotice("Follow-up note saved to Firebase.");
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  async function syncGoogleSheet() {
    if (syncing) return;
    setSyncing(true); setError(""); setNotice("");
    try {
      const result = await jsonRequest("/api/admin/enquiries/sync", { method: "POST" });
      setNotice(`Google Sheet updated: ${result.added} new, ${result.updated} changed, ${result.total} enquiries checked.`);
    } catch (err) { setError(err.message || "Unable to synchronize enquiries"); }
    finally { setSyncing(false); }
  }

  async function loadMore() {
    if (!cursor || loadingMore) return;
    setLoadingMore(true); setError(""); setNotice("");
    try {
      const result = await jsonRequest(`/api/admin/enquiries?cursor=${encodeURIComponent(cursor)}`);
      setRecords(previous => {
        const known = new Set(previous.map(item => item.id));
        return [...previous, ...(result.enquiries || []).filter(item => !known.has(item.id))];
      });
      setCursor(result.nextCursor);
    } catch (err) { setError(err.message); }
    finally { setLoadingMore(false); }
  }

  return (
    <section className="mt-6 space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#081b3a]">Enquiry management</h2>
            <p className="mt-1 text-xs text-slate-500">
              Search and manage enquiries. Filters apply to the {records.length} loaded records.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={syncGoogleSheet} disabled={syncing}
              className="gd-brand-primary inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60">
              {syncing ? "Syncing…" : "Sync to Google Sheets"}
            </button>
            <a href="/api/admin/enquiries/export"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#002dcc]">
              Export for Excel (CSV)
            </a>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-semibold text-slate-600">Search
            <input type="search" value={query} onChange={event => setQuery(event.target.value)}
              placeholder="Name, email, phone, message" className={`mt-1.5 w-full ${control}`}/>
          </label>
          <label className="text-xs font-semibold text-slate-600">Status
            <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}
              className={`mt-1.5 w-full ${control}`}>
              <option value="all">All statuses</option>
              {STATUS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-600">Category
            <select value={categoryFilter} onChange={event => setCategoryFilter(event.target.value)}
              className={`mt-1.5 w-full ${control}`}>
              <option value="all">All categories</option>
              {categories.map(category => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-600">Submitted
            <select value={period} onChange={event => setPeriod(event.target.value)}
              className={`mt-1.5 w-full ${control}`}>
              <option value="all">All loaded dates</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>Showing {filtered.length} of {records.length} loaded enquiries</span>
          <button type="button" onClick={() => { setQuery(""); setStatusFilter("all"); setCategoryFilter("all"); setPeriod("all"); }}
            className="font-semibold text-[#057cfa] hover:underline">Clear filters</button>
        </div>

        <div className="mt-4 space-y-3 md:hidden">
          {filtered.map(item => <article key={item.id} className="rounded-xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0"><h3 className="break-words text-sm font-semibold">{item.name || "Unnamed enquiry"}</h3>
                <p className="mt-1 break-all text-xs text-slate-500">{item.email}</p></div>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#002dcc]">{labelStatus(item.status)}</span>
            </div>
            <p className="mt-3 text-xs text-slate-600">{item.category || "Other"} · {item.offering || "General enquiry"}</p>
            <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
            <button type="button" onClick={() => openDetail(item.id)}
              className="mt-3 min-h-10 rounded-full border border-blue-200 px-4 text-xs font-semibold text-[#057cfa]">
              View & manage
            </button>
          </article>)}
        </div>
        <div className="mt-4 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b text-slate-500">
              <th scope="col" className="p-3">Date</th><th scope="col" className="p-3">Customer</th>
              <th scope="col" className="p-3">Category / Offering</th><th scope="col" className="p-3">Status</th>
              <th scope="col" className="p-3">Action</th>
            </tr></thead>
            <tbody>{filtered.map(item => <tr key={item.id} className="border-b border-slate-100">
              <td className="p-3 text-xs">{formatDate(item.createdAt)}</td>
              <td className="p-3"><strong className="font-semibold">{item.name}</strong>
                <div className="break-all text-xs text-slate-500">{item.email}</div>
                <div className="text-xs text-slate-500">{item.phone}</div>
              </td>
              <td className="p-3">{item.category}<div className="text-xs text-slate-500">{item.offering}</div></td>
              <td className="p-3">{labelStatus(item.status)}</td>
              <td className="p-3"><button type="button" onClick={() => openDetail(item.id)}
                className="rounded-full border border-blue-200 px-3 py-2 text-xs font-semibold text-[#057cfa]">View & manage</button></td>
            </tr>)}</tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No enquiries match the current filters.</p>}
        {cursor && <div className="mt-5 text-center"><button type="button" disabled={loadingMore} onClick={loadMore}
          className="min-h-11 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold disabled:opacity-50">
          {loadingMore ? "Loading…" : "Load more enquiries"}</button></div>}
      </div>

      {selectedId && <section ref={detailsRef} aria-label="Selected enquiry details"
        className="scroll-mt-24 rounded-3xl border border-blue-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#081b3a]">Customer details & follow-ups</h2>
          <button type="button" onClick={() => { setSelectedId(null); setDetail(null); setError(""); }}
            className="min-h-10 rounded-full border border-slate-200 px-4 text-sm font-semibold">Close</button>
        </div>
        {loadingDetail && <p role="status" className="mt-4 text-sm">Loading customer details…</p>}
        {detail && <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              {[
                ["Customer", detail.name], ["Email", detail.email],
                ["Phone", detail.phone], ["Category", detail.category],
                ["Offering", detail.offering], ["Submitted", formatDate(detail.createdAt)],
              ].map(([name, value]) => <div key={name} className="min-w-0 rounded-xl bg-slate-50 p-3">
                <dt className="text-xs font-semibold text-slate-500">{name}</dt>
                <dd className="mt-1 break-words text-slate-800">{value || "—"}</dd>
              </div>)}
            </dl>
            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="text-xs font-semibold uppercase text-slate-500">Customer message</h3>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6">{detail.message || "No message"}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <label htmlFor="enquiry-status" className="block text-sm font-semibold">Follow-up status</label>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <select id="enquiry-status" value={status} onChange={event => setStatus(event.target.value)}
                  className={control} disabled={saving}>
                  {STATUS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                </select>
                <button type="button" onClick={saveStatus} disabled={saving || status === detail.status}
                  className="gd-brand-primary min-h-11 rounded-full px-5 text-sm font-semibold disabled:opacity-50">
                  Save status
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <form onSubmit={saveNote} className="rounded-xl border border-slate-200 p-4">
              <label htmlFor="followup-note" className="block text-sm font-semibold">Add follow-up note</label>
              <textarea id="followup-note" value={note} onChange={event => setNote(event.target.value)}
                minLength={2} maxLength={2000} rows={4} required disabled={saving}
                placeholder="Call outcome, next action, or customer follow-up…"
                className={`mt-2 w-full resize-y ${control}`}/>
              <button type="submit" disabled={saving || note.trim().length < 2}
                className="gd-brand-primary mt-3 min-h-11 rounded-full px-5 text-sm font-semibold disabled:opacity-50">
                {saving ? "Saving…" : "Save note"}
              </button>
            </form>
            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="text-sm font-bold">Activity history</h3>
              <p className="mt-1 text-xs text-slate-500">Latest 100 recorded changes and follow-ups</p>
              <ol className="mt-4 space-y-3">
                {activity.length === 0 && <li className="text-sm text-slate-500">No follow-up activity yet.</li>}
                {activity.map(item => <li key={item.id} className="border-l-2 border-blue-200 pl-3 text-sm">
                  <p className="font-semibold">{item.type === "note" ? "Follow-up note" :
                    `Status: ${labelStatus(item.fromStatus)} → ${labelStatus(item.toStatus)}`}</p>
                  {item.type === "note" && <p className="mt-1 whitespace-pre-wrap break-words">{item.text}</p>}
                  <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                </li>)}
              </ol>
            </div>
          </div>
        </div>}
      </section>}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">{notice}</p>}
    </section>
  );
}
