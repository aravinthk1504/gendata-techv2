"use client";

import { useEffect, useState } from "react";
import { FiImage, FiRefreshCw } from "react-icons/fi";

export default function MediaLibrary({ onSelectCover, onInsertImage }) {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function load(next = "") {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/media/library" +
        (next ? "?cursor=" + encodeURIComponent(next) : ""), { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load uploaded images");
      setItems(previous => next ? [
        ...previous, ...(data.items || []).filter(item => !previous.some(old => old.assetId === item.assetId)),
      ] : data.items || []);
      setCursor(data.nextCursor);
    } catch (issue) {
      setError(issue.message || "Unable to load uploaded images");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);
  const matching = items.filter(item =>
    (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.publicId || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f7faff] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-[#081b3a]">
            <FiImage aria-hidden="true"/> Cloudinary media library
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Reuse existing images without uploading them again. Images are never deleted here.
          </p>
        </div>
        <button type="button" disabled={loading} onClick={() => void load()}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold disabled:opacity-50">
          <FiRefreshCw aria-hidden="true"/> Refresh
        </button>
      </div>
      <input type="search" value={search} onChange={event => setSearch(event.target.value)}
        placeholder="Filter loaded images…" aria-label="Filter media library images"
        className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm"/>
      {loading && !items.length && <p role="status" className="mt-4 text-sm text-slate-500">Loading media library…</p>}
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {matching.map(item => (
          <article key={item.assetId || item.publicId} className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img src={item.url} alt={item.name || "Uploaded image"} loading="lazy"
              className="h-36 w-full bg-slate-100 object-contain"/>
            <div className="space-y-2 p-3">
              <p className="truncate text-xs font-semibold text-[#081b3a]" title={item.name}>{item.name}</p>
              <p className="text-[11px] text-slate-500">{item.width} × {item.height} px</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => onSelectCover(item)}
                  className="min-h-9 rounded-lg bg-[#057cfa] px-3 py-1.5 text-xs font-semibold text-white">Use as cover</button>
                <button type="button" onClick={() => onInsertImage(item)}
                  className="min-h-9 rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-semibold text-[#003cba]">Insert in article</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!loading && !error && !matching.length &&
        <p className="mt-4 text-sm text-slate-500">No matching images on this page. Upload a new image or browse further.</p>}
      {cursor && <button type="button" disabled={loading} onClick={() => void load(cursor)}
        className="mt-4 min-h-11 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold disabled:opacity-50">
        {loading ? "Loading…" : "Load more images"}
      </button>}
    </div>
  );
}
