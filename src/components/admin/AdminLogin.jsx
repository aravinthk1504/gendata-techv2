"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

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
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Login failed");
      router.replace(`/${lang}/admin`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[48%_52%]">
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#06142f] px-8 py-12 text-white lg:min-h-screen">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#057cfa]/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <img src="/assets/gendata-tech-mark.webp" alt="GenData Tech logo" className="h-28 w-28 object-contain sm:h-36 sm:w-36" />
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">GenData Tech</h1>
          <p className="mt-2 text-sm tracking-[0.16em] text-[#59c8ff]">Think - Build - Evolve</p>
          <div className="mt-8 h-px w-20 bg-white/25" />
          <p className="mt-6 max-w-xs text-sm leading-7 text-slate-300">Secure management workspace for the GenData Tech team.</p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:min-h-screen">
        <div className="w-full max-w-md">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff6ff] text-[#057cfa]">
            <LockKeyhole aria-hidden="true" size={23} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#057cfa]">Admin portal</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#081b3a]">Welcome back</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">Sign in with your authorized administrator account.</p>

          <form onSubmit={signIn} className="mt-9 space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-slate-700">Email address</label>
              <input id="admin-email" autoComplete="username" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#057cfa] focus:ring-4 focus:ring-blue-50" />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative mt-2">
                <input id="admin-password" autoComplete="current-password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-14 text-sm outline-none transition focus:border-[#057cfa] focus:ring-4 focus:ring-blue-50" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute inset-y-0 right-3 flex items-center justify-center rounded-lg px-2 text-slate-500 hover:text-[#057cfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#057cfa]">
                  {showPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
                </button>
              </div>
            </div>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-full bg-[#057cfa] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#002dcc] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in…" : "Sign in securely"}</button>
          </form>
          <p className="mt-8 text-center text-xs text-slate-400">Restricted to authorized GenData Tech administrators.</p>
        </div>
      </section>
    </main>
  );
}
