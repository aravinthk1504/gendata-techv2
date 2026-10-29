"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(120deg,#f4f7fc_0%,#d9e7ff_55%,#8bacf6_100%)] px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full bg-cyan-200/50 blur-3xl" />
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-[30px] bg-white shadow-[0_24px_80px_rgba(8,27,58,0.22)] md:min-h-[480px] md:grid-cols-2">
        <section className="flex items-center justify-center px-7 py-10 sm:px-12 md:py-12">
          <div className="w-full max-w-sm">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#057cfa]">GenData Tech</p>
            <h1 className="mt-3 text-center text-3xl font-bold text-[#081b3a]">Admin Sign In</h1>
            <p className="mt-2 text-center text-sm text-slate-500">Restricted leadership access</p>
            <form onSubmit={signIn} className="mt-8 space-y-4">
              <div>
                <label htmlFor="admin-email" className="sr-only">Admin email</label>
                <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-slate-200 bg-[#f6f8fc] px-4 py-3.5 text-sm outline-none focus:border-[#057cfa] focus:ring-4 focus:ring-blue-50" />
              </div>
              <div className="relative">
                <label htmlFor="admin-password" className="sr-only">Password</label>
                <input id="admin-password" type={showPassword?"text":"password"} autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-slate-200 bg-[#f6f8fc] px-4 py-3.5 pr-12 text-sm outline-none focus:border-[#057cfa] focus:ring-4 focus:ring-blue-50" />
                <button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?"Hide password":"Show password"} aria-pressed={showPassword} className="absolute inset-y-0 right-3 flex items-center px-1 text-slate-500 hover:text-[#057cfa]">
                  {showPassword?<FiEyeOff size={19} aria-hidden="true"/>:<FiEye size={19} aria-hidden="true"/>}
                </button>
              </div>
              {error&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <button disabled={loading} type="submit" className="mx-auto block w-full rounded-full bg-[#003cba] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#002d8b] disabled:opacity-60">{loading?"Signing in…":"Sign In"}</button>
            </form>
            <p className="mt-6 text-center text-xs leading-5 text-slate-400">Access is limited to approved GenData Tech leadership and website administrators.</p>
          </div>
        </section>
        <section className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-t-[90px] bg-[linear-gradient(145deg,#00245c_0%,#003cba_53%,#057cfa_100%)] px-8 py-12 text-center text-white md:min-h-[480px] md:rounded-l-[150px] md:rounded-tr-none">
          <div className="absolute -right-16 -top-12 h-52 w-52 rounded-full bg-cyan-300/15 blur-3xl" aria-hidden="true"/>
          <div className="relative flex flex-col items-center">
            <img src="/assets/gendata-tech-mark.webp" alt="GenData Tech logo" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
            <h2 className="mt-5 text-3xl font-bold">Welcome to GenData Tech</h2>
            <p className="mt-3 text-sm text-blue-100">Think - Build - Evolve</p>
            <p className="mt-6 max-w-xs text-sm leading-6 text-blue-100">Secure access for the people who lead and manage our digital platform.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
