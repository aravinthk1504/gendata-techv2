"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiShield, FiRefreshCw, FiLogOut, FiClock, FiInfo } from "react-icons/fi";

const descriptions = {
  login_success: "Administrator signed in",
  login_failed: "Failed administrator sign-in",
  login_limited: "Login attempts temporarily limited",
  logout: "Administrator signed out",
  revoke_sessions: "All sessions revoked for an administrator",
  blog_created: "Blog article created",
  blog_updated: "Blog article updated",
  blog_deleted: "Blog article deleted",
  media_uploaded: "Media uploaded",
  enquiry_status_updated: "Enquiry status changed",
  enquiry_note_added: "Enquiry follow-up recorded",
  enquiries_exported: "Enquiry CSV exported",
};

function formatDate(value) {
  if (!value) return "Pending timestamp";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unknown time" : date.toLocaleString("en-GB", {
    dateStyle: "medium", timeStyle: "short",
  });
}

export default function SecurityPanel({ lang }) {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/activity", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load security activity");
      setEvents(data.activity || []);
    } catch (issue) {
      setError(issue.message || "Unable to load activity");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void refresh(); }, []);

  async function revokeSessions() {
    if (busy || !window.confirm(
      "Sign out EVERY session for your administrator account, including this browser? You will need to log in again."
    )) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/sessions/revoke", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to revoke sessions");
      router.replace("/" + lang + "/admin/login");
      router.refresh();
    } catch (issue) {
      setError(issue.message || "Unable to revoke sessions");
      setBusy(false);
    }
  }

  return (
    <section className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#057cfa]">
            <FiShield size={21} aria-hidden="true"/>
          </span>
          <h2 className="mt-4 text-lg font-bold text-[#081b3a]">Session management</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Administrator sessions use HTTP-only cookies and expire after eight hours.
            Firebase verifies that sessions have not been revoked.
          </p>
          <button type="button" disabled={busy} onClick={revokeSessions}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50">
            <FiLogOut aria-hidden="true"/> {busy ? "Revoking sessions…" : "Sign out all my sessions"}
          </button>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            This affects your own account, including other devices. It does not revoke other administrators' accounts.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
            <FiInfo size={21} aria-hidden="true"/>
          </span>
          <h2 className="mt-4 text-lg font-bold text-[#081b3a]">Admin protection</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Only approved Firebase administrator accounts are permitted. Login attempts
            are temporarily restricted after repeated failures. Content changes and
            enquiry exports are recorded without logging customer messages or passwords.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Multi-factor authentication is a separate pre-deployment enhancement.
          </p>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#081b3a]">Recent administrator activity</h2>
            <p className="mt-1 text-xs text-slate-500">Latest 50 events from the shared Firebase activity log.</p>
          </div>
          <button type="button" onClick={refresh} disabled={loading}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-[#081b3a] disabled:opacity-60">
            <FiRefreshCw aria-hidden="true"/> Refresh
          </button>
        </div>
        {loading ? <p className="mt-5 text-sm text-slate-600" role="status">Loading activity…</p> :
          events.length === 0 && !error ?
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No activity recorded yet.</p> : null}
        <ol className="mt-5 divide-y divide-slate-100">
          {events.map(item => (
            <li key={item.id} className="flex items-start gap-3 py-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FiClock size={16} aria-hidden="true"/>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#081b3a]">{descriptions[item.event] || "Administrator activity"}</p>
                {item.target && <p className="mt-1 break-all text-xs text-slate-600">Record: {item.target}</p>}
                <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
              </div>
            </li>
          ))}
        </ol>
        {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      </section>
    </section>
  );
}
