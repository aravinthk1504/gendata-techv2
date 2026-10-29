"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
export default function AdminLogin({lang}){
 const router=useRouter();
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 async function signIn(event){
  event.preventDefault();setError("");setLoading(true);
  try{
   const res=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
   const body=await res.json();
   if(!res.ok)throw new Error(body.error||"Login failed");
   router.replace(`/${lang}/admin`);router.refresh();
  }catch(e){setError(e.message||"Unable to sign in")}finally{setLoading(false)}
 }
 return <main className="min-h-[70vh] bg-[#f5f8ff] px-5 py-20"><div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#057cfa]">GenData Tech</p>
  <h1 className="mt-3 text-3xl font-semibold text-[#081b3a]">Admin sign in</h1>
  <p className="mt-2 text-sm text-slate-500">Authorized team members only.</p>
  <form onSubmit={signIn} className="mt-7 space-y-5">
   <label className="block text-sm font-semibold">Email<input autoComplete="username" type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3"/></label>
   <label className="block text-sm font-semibold">Password<input autoComplete="current-password" type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3"/></label>
   {error&&<p role="alert" className="text-sm text-red-700">{error}</p>}
   <button disabled={loading} className="w-full rounded-full bg-[#057cfa] p-3 font-semibold text-white disabled:opacity-60">{loading?"Signing in…":"Sign in securely"}</button>
  </form></div></main>
}
