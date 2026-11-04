"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiGrid, FiInbox, FiFileText, FiLogOut, FiMenu, FiX, FiShield, FiArrowUpRight, FiActivity, FiCheckCircle } from "react-icons/fi";
import BlogManager from "./BlogManager";
import EnquiryManager from "./EnquiryManager";

const statuses = ["new", "in_progress", "contacted", "completed"];
const navItems = [
  { id: "overview", label: "Overview", icon: FiGrid },
  { id: "enquiries", label: "Enquiries", icon: FiInbox },
  { id: "blogs", label: "Blog management", icon: FiFileText },
];
const metrics = [
  { label: "Loaded enquiries", key: "total", icon: FiInbox, tint: "bg-blue-50 text-[#057cfa]" },
  { label: "New", key: "new", icon: FiActivity, tint: "bg-cyan-50 text-cyan-700" },
  { label: "In progress", key: "in_progress", icon: FiArrowUpRight, tint: "bg-violet-50 text-violet-700" },
  { label: "Completed", key: "completed", icon: FiCheckCircle, tint: "bg-emerald-50 text-emerald-700" },
];

function Navigation({ active, onSelect, counts }) {
  return (
    <nav aria-label="Admin sections" className="mt-6 space-y-1.5">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button key={id} type="button" onClick={() => onSelect(id)}
          aria-current={active === id ? "page" : undefined}
          className={"flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 " +
            (active === id ? "bg-white/15 text-white ring-1 ring-white/20" : "text-blue-100/80 hover:bg-white/10 hover:text-white")}>
          <Icon size={18} aria-hidden="true" className={active === id ? "text-[#67e8f9]" : "text-blue-200"} />
          <span className="flex-1">{label}</span>
          {id === "enquiries" && counts.new > 0 && (
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-bold text-white">{counts.new}</span>
          )}
        </button>
      ))}
    </nav>
  );
}

function AdminBrand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
        <img src="/assets/gendata-tech-mark.webp" alt="" className="h-9 w-9 object-contain" />
      </div>
      <div className="min-w-0">
        <p className="font-heading text-base font-bold text-white">GenData Tech</p>
        <p className="text-[11px] font-medium tracking-[0.18em] text-[#70deff]">ADMIN WORKSPACE</p>
      </div>
    </div>
  );
}

export default function AdminDashboard({ enquiries, nextCursor, lang, adminEmail, adminName }) {
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const [blogUnsaved, setBlogUnsaved] = useState(false);
  const [records, setRecords] = useState(enquiries);
  const [cursor, setCursor] = useState(nextCursor);
  const [logoutError, setLogoutError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuTrigger = useRef(null);
  const mobileDrawer = useRef(null);

  const counts = useMemo(() => Object.fromEntries([
    ["total", records.length],
    ...statuses.map(status => [status, records.filter(item => (item.status || "new") === status).length]),
  ]), [records]);

  const months = useMemo(() => {
    const list = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setUTCDate(1);
      date.setUTCMonth(date.getUTCMonth() - (5 - index));
      return { key: date.toISOString().slice(0, 7), label: date.toLocaleString("en", { month: "short" }) };
    });
    return list.map(month => ({
      ...month, count: records.filter(item => item.createdAt?.startsWith(month.key)).length,
    }));
  }, [records]);

  const byCategory = useMemo(() => Object.entries(records.reduce((acc, item) => {
    const category = item.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]), [records]);
  const max = Math.max(1, ...months.map(month => month.count));

  function selectSection(id) {
    if (id === tab) {
      setMobileMenuOpen(false);
      return;
    }
    if (tab === "blogs" && blogUnsaved &&
      !window.confirm("There are unsaved blog edits. Leave the editor?")) return;
    setTab(id);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileDrawer.current?.querySelector("button")?.focus();
    const handleKey = event => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuTrigger.current?.focus();
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(mobileDrawer.current?.querySelectorAll('button:not([disabled]), a[href]') || []);
      if (!controls.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [mobileMenuOpen]);

  async function logout() {
    if (tab === "blogs" && blogUnsaved &&
      !window.confirm("There are unsaved blog edits. Sign out anyway?")) return;
    setLogoutError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error("Sign out failed. Please try again.");
      router.replace("/" + lang + "/admin/login");
      router.refresh();
    } catch (error) {
      setLogoutError(error.message || "Unable to sign out");
      setMobileMenuOpen(false);
    }
  }

  return (
    <main className="gd-admin-root min-h-screen bg-[#f5f8ff] text-[#081b3a]">
      <div className="lg:flex lg:min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#06142f] px-4 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen">
          <div className="px-2"><AdminBrand /></div>
          <Navigation active={tab} onSelect={selectSection} counts={counts} />
          <div className="mt-auto space-y-4 px-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <FiShield className="text-[#70deff]" size={19} aria-hidden="true"/>
              <p className="mt-2 text-xs font-semibold text-white">Restricted access</p>
              <p className="mt-1 break-all text-xs leading-5 text-blue-100/70">{adminEmail}</p>
            </div>
            <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-100 hover:bg-white/10 hover:text-white">
              <FiLogOut size={18} aria-hidden="true" /> Sign out
            </button>
          </div>
        </aside>

        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:hidden">
          <div className="flex min-w-0 items-center gap-2.5">
            <img src="/assets/gendata-tech-mark.webp" alt="" className="h-9 w-9 object-contain"/>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#081b3a]">GenData Tech</p>
              <p className="text-[11px] text-slate-500">Admin workspace</p>
            </div>
          </div>
          <button type="button" ref={menuTrigger} aria-label="Open admin navigation"
            aria-expanded={mobileMenuOpen} aria-controls="gd-admin-mobile-menu"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#081b3a]">
            <FiMenu size={22} aria-hidden="true"/>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <button type="button" aria-label="Close admin navigation" tabIndex={-1}
              className="absolute inset-0 h-full w-full bg-[#06142f]/60"
              onClick={() => {setMobileMenuOpen(false);menuTrigger.current?.focus();}}/>
            <div id="gd-admin-mobile-menu" ref={mobileDrawer} role="dialog" aria-modal="true"
              aria-label="Admin navigation"
              className="absolute inset-y-0 left-0 flex w-[min(85vw,320px)] flex-col overflow-y-auto bg-[#06142f] px-4 py-6 shadow-2xl">
              <div className="flex items-start justify-between gap-3 px-1">
                <AdminBrand />
                <button type="button" aria-label="Close admin navigation"
                  onClick={() => {setMobileMenuOpen(false);menuTrigger.current?.focus();}}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white hover:bg-white/10">
                  <FiX size={21} aria-hidden="true"/>
                </button>
              </div>
              <Navigation active={tab} onSelect={selectSection} counts={counts} />
              <div className="mt-auto border-t border-white/15 pt-5">
                <p className="mb-3 break-all px-3 text-xs text-blue-100/70">{adminEmail}</p>
                <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-100 hover:bg-white/10">
                  <FiLogOut size={18} aria-hidden="true"/> Sign out
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1 px-4 pb-14 pt-7 sm:px-6 lg:px-8 lg:pt-10 xl:px-10">
          <div className="mx-auto w-full max-w-[1300px]">
            <header className="mb-7 flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#057cfa]">
                  Admin / {navItems.find(item => item.id === tab)?.label}
                </p>
                <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#081b3a] sm:text-3xl">
                  {tab === "overview" ? "Welcome, " + (adminName || "Administrator") :
                    tab === "enquiries" ? "Enquiry management" : "Content studio"}
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {tab === "overview" ? "Your website activity at a glance." :
                    tab === "enquiries" ? "Review messages, track follow-ups and export records." :
                    "Create, preview and publish GenData Tech insights."}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"/>
                Secure admin area
              </span>
            </header>
            {logoutError && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{logoutError}</p>}

            {tab === "blogs" ? <BlogManager key="articles" onUnsavedChange={setBlogUnsaved} /> : (
              <>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                  {metrics.map(({ label, key, icon: Icon, tint }) => (
                    <div key={key} className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_6px_24px_rgba(8,27,58,0.035)] sm:p-5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium leading-5 text-slate-500 sm:text-sm">{label}</p>
                        <span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl " + tint}>
                          <Icon size={17} aria-hidden="true"/>
                        </span>
                      </div>
                      <p className="mt-3 text-2xl font-bold tabular-nums text-[#081b3a] sm:text-3xl">{counts[key]}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Metrics reflect {records.length} loaded enquiries, not the all-time database total.
                </p>

                {tab === "overview" && (
                  <div className="mt-6 grid gap-5 xl:grid-cols-2">
                    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                      <h2 className="font-heading text-base font-bold sm:text-lg">Enquiries · last 6 months</h2>
                      <p className="mt-1 text-xs text-slate-500">Monthly activity among loaded enquiries</p>
                      <div className="mt-6 flex h-48 items-end gap-2 sm:gap-3" role="img"
                        aria-label={months.map(month => month.label + ": " + month.count).join(", ")}>
                        {months.map(month => (
                          <div key={month.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                            <span className="text-xs font-semibold tabular-nums">{month.count}</span>
                            <div className="w-full max-w-14 rounded-t-lg bg-gradient-to-t from-[#002dcc] to-[#3ac6f6]"
                              style={{ height: Math.max(3, month.count / max * 140) + "px" }}/>
                            <span className="text-[11px] text-slate-500">{month.label}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                      <h2 className="font-heading text-base font-bold sm:text-lg">Enquiries by category</h2>
                      <p className="mt-1 text-xs text-slate-500">Distribution of loaded enquiries</p>
                      <div className="mt-6 space-y-4">
                        {byCategory.length ? byCategory.map(([name, count]) => (
                          <div key={name}>
                            <div className="mb-2 flex justify-between gap-3 text-xs font-medium sm:text-sm">
                              <span className="break-words">{name}</span><span>{count}</span>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-gradient-to-r from-[#21d4f3] to-[#057cfa]"
                                style={{ width: count / Math.max(1, records.length) * 100 + "%" }}/>
                            </div>
                          </div>
                        )) : <p className="text-sm text-slate-500">No enquiries yet.</p>}
                      </div>
                    </section>
                  </div>
                )}
                {tab === "enquiries" && (
                  <EnquiryManager records={records} setRecords={setRecords} cursor={cursor} setCursor={setCursor}/>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
