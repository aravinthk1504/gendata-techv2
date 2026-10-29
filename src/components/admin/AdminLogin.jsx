"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

export default function AdminLogin({ lang }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to sign in");
      router.replace(`/${lang}/admin`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8ff] px-4 py-10 sm:px-6">
      <div className="w-full max-w-5xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(8,27,58,0.08)] sm:p-10 lg:p-12">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#057cfa]">GenData Tech</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#081b3a] sm:text-3xl">Administration Panel</h1>
          <p className="mt-2 text-xs text-slate-500 sm:text-sm">Restricted leadership and website administration access</p>
        </div>

        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border border-slate-200 md:grid-cols-2">
          <section className="flex min-h-[260px] flex-col items-center justify-center bg-[#06142f] px-8 py-12 text-center text-white md:min-h-[440px]">
            <img src="/assets/gendata-tech-mark.webp" alt="GenData Tech brand mark" className="h-28 w-28 object-contain sm:h-36 sm:w-36" />
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">GenData Tech</h2>
            <p className="mt-2 text-sm tracking-wider text-[#5acbff]">Think - Build - Evolve</p>
          </section>

          <section className="flex items-center justify-center bg-white p-6 sm:p-9">
            <div className="w-full max-w-sm">
              <div className="mb-3 flex items-center gap-2 text-[#057cfa]"><FiLock aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-widest">Private access</span></div>
              <h2 className="text-2xl font-semibold text-[#081b3a]">Administrator Sign In</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">For the CEO, approved senior leadership and authorized website administrators only.</p>

              <form onSubmit={signIn} className="mt-7 space-y-5">
                <div>
                  <label htmlFor="admin-email" className="block text-sm font-semibold text-slate-700">Email address</label>
                  <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your admin email" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#057cfa] focus:ring-4 focus:ring-blue-50" />
                </div>
                <div>
                  <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-700">Password</label>
                  <div className="relative mt-2">
                    <input id="admin-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#057cfa] focus:ring-4 focus:ring-blue-50" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute inset-y-0 right-3 flex items-center justify-center rounded-md px-1 text-slate-500 hover:text-[#057cfa]">
                      {showPassword ? <FiEyeOff size={19} aria-hidden="true" /> : <FiEye size={19} aria-hidden="true" />}
                    </button>
                  </div>
                </div>
                {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <button type="submit" disabled={loading} className="w-full rounded-full bg-[#057cfa] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#002dcc] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in…" : "Sign in securely"}</button>
              </form>
              <p className="mt-7 text-center text-xs text-slate-400">Unauthorized access is prohibited.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
