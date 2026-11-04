"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BlogManager from "./BlogManager";
import EnquiryManager from "./EnquiryManager";

const statuses = ["new", "in_progress", "contacted", "completed"];

export default function AdminDashboard({ enquiries, nextCursor, lang, adminEmail, adminName }) {
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const [blogUnsaved, setBlogUnsaved] = useState(false);
  const [records, setRecords] = useState(enquiries);
  const [cursor, setCursor] = useState(nextCursor);
  const [logoutError, setLogoutError] = useState("");

  const counts = useMemo(() => Object.fromEntries(
    statuses.map(status => [status, records.filter(item => (item.status || "new") === status).length])
  ), [records]);

  const months = useMemo(() => {
    const list = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setUTCDate(1);
      date.setUTCMonth(date.getUTCMonth() - (5 - index));
      return { key: date.toISOString().slice(0, 7), label: date.toLocaleString("en", { month: "short" }) };
    });
    return list.map(month => ({
      ...month,
      count: records.filter(item => item.createdAt?.startsWith(month.key)).length,
    }));
  }, [records]);

  const byCategory = useMemo(() => Object.entries(records.reduce((acc, item) => {
    const category = item.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]), [records]);
  const max = Math.max(1, ...months.map(month => month.count));

  async function logout() {
    setLogoutError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error("Sign out failed. Please try again.");
      router.replace(`/${lang}/admin/login`);
      router.refresh();
    } catch (error) {
      setLogoutError(error.message || "Unable to sign out");
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8ff] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#057cfa]">GenData Tech / Admin</p>
            <h1 className="mt-2 text-2xl font-bold text-[#081b3a] sm:text-3xl">Welcome, {adminName || "Administrator"}</h1>
            <p className="mt-1 text-sm text-slate-600">Management dashboard</p>
            <p className="mt-1 break-all text-xs text-slate-500">Signed in as {adminEmail}</p>
          </div>
          <button type="button" onClick={logout} className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold">
            Sign out
          </button>
        </header>
        {logoutError && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{logoutError}</p>}
        <nav className="my-8 flex flex-wrap gap-2" aria-label="Admin sections">
          {[["overview", "Overview"], ["enquiries", "Enquiries"], ["blogs", "Blog management"]].map(([id, label]) => (
            <button key={id} type="button" aria-current={tab === id ? "page" : undefined}
              onClick={() => {
                if (tab === "blogs" && id !== "blogs" && blogUnsaved && !window.confirm("There are unsaved blog edits. Leave the editor?")) return;
                setTab(id);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold ${tab === id
                ? "gd-brand-primary" : "border border-slate-200 bg-white text-slate-700"}`}>
              {label}
            </button>
          ))}
        </nav>
        {tab === "blogs" ? <BlogManager key="articles" onUnsavedChange={setBlogUnsaved} /> : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Loaded enquiries", records.length],
                ["New", counts.new],
                ["In progress", counts.in_progress],
                ["Completed", counts.completed],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-3 text-3xl font-bold text-[#081b3a]">{value}</p>
                </div>
              ))}
            </div>
            {tab === "overview" && (
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <section className="rounded-3xl border border-slate-200 bg-white p-6">
                  <h2 className="text-lg font-bold">Enquiries · last 6 months</h2>
                  <p className="mt-1 text-xs text-slate-500">Based on {records.length} loaded enquiries; older records can be loaded under Enquiries.</p>
                  <div className="mt-6 flex h-52 items-end gap-3" role="img"
                    aria-label={months.map(month => month.label + ": " + month.count).join(", ")}>
                    {months.map(month => (
                      <div key={month.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                        <span className="text-xs font-semibold">{month.count}</span>
                        <div className="w-full max-w-14 rounded-t-lg bg-gradient-to-t from-[#002dcc] to-[#3ac6f6]"
                          style={{ height: `${Math.max(3, month.count / max * 150)}px` }}/>
                        <span className="text-xs text-slate-500">{month.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-3xl border border-slate-200 bg-white p-6">
                  <h2 className="text-lg font-bold">Enquiries by category</h2>
                  <p className="mt-1 text-xs text-slate-500">Distribution of loaded enquiries</p>
                  <div className="mt-7 space-y-5">
                    {byCategory.length ? byCategory.map(([name, count]) => (
                      <div key={name}>
                        <div className="mb-2 flex justify-between gap-3 text-sm">
                          <span className="break-words">{name}</span><span>{count}</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#057cfa]"
                            style={{ width: `${count / Math.max(1, records.length) * 100}%` }}/>
                        </div>
                      </div>
                    )) : <p className="text-sm text-slate-500">No enquiries yet.</p>}
                  </div>
                </section>
              </div>
            )}
            {tab === "enquiries" && <EnquiryManager records={records} setRecords={setRecords}
              cursor={cursor} setCursor={setCursor}/>}
          </>
        )}
      </div>
    </main>
  );
}
