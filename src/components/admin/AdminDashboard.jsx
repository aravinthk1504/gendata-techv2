"use client";
import {useMemo,useState} from "react";
import {useRouter} from "next/navigation";
import BlogManager from "./BlogManager";

const statuses=["new","in_progress","contacted","completed"];
export default function AdminDashboard({enquiries,lang,adminEmail,adminName}){
 const router=useRouter();
 const [tab,setTab]=useState("overview"),[search,setSearch]=useState("");
 const filtered=useMemo(()=>enquiries.filter(e=>[e.name,e.email,e.phone,e.category,e.offering].join(" ").toLowerCase().includes(search.toLowerCase())),[enquiries,search]);
 const counts=Object.fromEntries(statuses.map(s=>[s,enquiries.filter(e=>e.status===s).length]));
 const months=useMemo(()=>{
  const data=Array.from({length:6},(_,i)=>{
   const d=new Date();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()-(5-i));
   return {key:d.toISOString().slice(0,7),label:d.toLocaleString("en",{month:"short"})};
  });
  return data.map(m=>({...m,count:enquiries.filter(e=>e.createdAt?.startsWith(m.key)).length}));
 },[enquiries]);
 const byCategory=Object.entries(enquiries.reduce((acc,e)=>{acc[e.category||"Other"]=(acc[e.category||"Other"]||0)+1;return acc},{})).sort((a,b)=>b[1]-a[1]);
 const max=Math.max(1,...months.map(m=>m.count));
 async function logout(){await fetch("/api/admin/logout",{method:"POST"});router.replace(`/${lang}/admin/login`);router.refresh()}
 return <main className="min-h-screen bg-[#f5f8ff] px-4 py-10 sm:px-8">
 <div className="mx-auto max-w-7xl">
  <header className="flex flex-wrap items-center justify-between gap-4">
   <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#057cfa]">GenData Tech / Admin</p><h1 className="mt-2 text-3xl font-bold text-[#081b3a]">Welcome, {adminName || "Administrator"}</h1><p className="mt-1 text-sm font-medium text-slate-600">Management dashboard</p><p className="mt-1 text-sm text-slate-500">Signed in as {adminEmail}</p></div>
   <button onClick={logout} className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold">Sign out</button>
  </header>
  <nav className="my-8 flex flex-wrap gap-2" aria-label="Admin sections">
   {["overview","enquiries","blogs"].map(id=><button key={id} onClick={()=>setTab(id)} className={`rounded-full px-5 py-2 text-sm font-semibold ${tab===id?"bg-[#057cfa] text-white":"border border-slate-200 bg-white text-slate-700"}`}>{id==="blogs"?"Blog management":id[0].toUpperCase()+id.slice(1)}</button>)}
  </nav>
  {tab==="blogs"?<BlogManager/>:<>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Total enquiries",enquiries.length],["New",counts.new],["In progress",counts.in_progress],["Completed",counts.completed]].map(([label,value])=><div key={label} className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold text-[#081b3a]">{value}</p></div>)}</div>
  <div className="mt-6 grid gap-6 lg:grid-cols-2">
   <section className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold">Enquiries · last 6 months</h2><p className="mt-1 text-xs text-slate-500">Based on the latest 250 Firestore enquiries</p>
    <div className="mt-6 flex h-52 items-end gap-3" role="img" aria-label={months.map(m=>m.label+": "+m.count).join(", ")}>{months.map(m=><div key={m.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"><span className="text-xs font-semibold">{m.count}</span><div className="w-full max-w-14 rounded-t-lg bg-gradient-to-t from-[#002dcc] to-[#3ac6f6]" style={{height:`${Math.max(3,m.count/max*150)}px`}}/><span className="text-xs text-slate-500">{m.label}</span></div>)}</div>
   </section>
   <section className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold">Enquiries by category</h2><p className="mt-1 text-xs text-slate-500">Current distribution</p><div className="mt-7 space-y-5">{byCategory.length?byCategory.map(([name,n])=><div key={name}><div className="mb-2 flex justify-between text-sm"><span>{name}</span><span>{n}</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#057cfa]" style={{width:`${n/Math.max(1,enquiries.length)*100}%`}}/></div></div>):<p className="text-sm text-slate-500">No enquiries yet.</p>}</div></section>
  </div>
  {tab==="enquiries"&&<section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
   <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-lg font-bold">Enquiry records</h2><input aria-label="Search enquiries" placeholder="Search name, phone, category…" value={search} onChange={e=>setSearch(e.target.value)} className="w-full max-w-sm rounded-xl border border-slate-200 px-4 py-3 text-sm"/></div>
   <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[750px] text-left text-sm"><thead><tr className="border-b text-slate-500">{["Date","Name","Phone","Category / Offering","Status"].map(x=><th key={x} className="p-3">{x}</th>)}</tr></thead><tbody>{filtered.map(e=><tr key={e.id} className="border-b border-slate-100"><td className="p-3">{e.createdAt?new Date(e.createdAt).toLocaleDateString():"—"}</td><td className="p-3 font-semibold">{e.name}<div className="font-normal text-slate-500">{e.email}</div><details className="mt-1 font-normal"><summary className="cursor-pointer text-[#057cfa]">View message</summary><p className="max-w-md whitespace-pre-wrap py-2 text-slate-700">{e.message}</p></details></td><td className="p-3">{e.phone}</td><td className="p-3">{e.category}<div className="text-slate-500">{e.offering}</div></td><td className="p-3 capitalize">{e.status.replaceAll("_"," ")}</td></tr>)}</tbody></table></div>
   <p className="mt-4 text-xs text-slate-500">Showing {filtered.length} of the most recent {enquiries.length} records. Status editing and Excel export are planned next.</p>
  </section>}
  </>}
 </div></main>;
}
