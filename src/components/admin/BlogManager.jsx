"use client";
import {useEffect,useState} from "react";
const blank={title:"",slug:"",category:"Technology",excerpt:"",content:"",seoTitle:"",seoDescription:"",language:"en",status:"draft"};
export default function BlogManager(){
 const [items,setItems]=useState([]),[editing,setEditing]=useState(null),[form,setForm]=useState(blank);
 const [busy,setBusy]=useState(false),[error,setError]=useState(""),[notice,setNotice]=useState("");
 async function load(){try{const response=await fetch("/api/admin/blogs",{cache:"no-store"});if(!response.ok)throw Error("Unable to load articles");const json=await response.json();setItems(json.blogs||[])}catch(e){setError(e.message)}}
 useEffect(()=>{load()},[]);
 function field(name,value){setForm(v=>({...v,[name]:value}))}
 function edit(item){setEditing(item.id);setForm({title:item.title,slug:item.slug,category:item.category,excerpt:item.excerpt,content:item.content,seoTitle:item.seoTitle||"",seoDescription:item.seoDescription||"",language:item.language,status:item.status});setError("");setNotice("")}
 function reset(){setEditing(null);setForm(blank);setError("");setNotice("")}
 async function save(event){
  event.preventDefault();setBusy(true);setError("");setNotice("");
  try{
   const body=editing?((({slug,language,...rest})=>rest)(form)):form;
   const response=await fetch(editing?`/api/admin/blogs/${encodeURIComponent(editing)}`:"/api/admin/blogs",{method:editing?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
   const data=await response.json();if(!response.ok){const details=data.fields&&typeof data.fields==="object"?Object.entries(data.fields).flatMap(([field,messages])=>(Array.isArray(messages)?messages:[]).map(message=>`${field}: ${message}`)).join("; "):"";throw Error(details||data.error||"Unable to save article");}
   setNotice(editing?"Article updated":"Article created");await load();setEditing(data.id||editing);
  }catch(e){setError(e.message)}finally{setBusy(false)}
 }
 return <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
 <div className="rounded-3xl border border-slate-200 bg-white p-6">
  <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold">Blog articles</h2><button onClick={reset} className="rounded-full bg-[#057cfa] px-4 py-2 text-xs font-semibold text-white">New article</button></div>
  <p className="mt-2 text-xs text-slate-500">Firestore CMS posts only. Existing public Insights articles are unchanged.</p>
  <div className="mt-5 space-y-3">{items.length?items.map(item=><button key={item.id} onClick={()=>edit(item)} className={`block w-full rounded-xl border p-4 text-left ${editing===item.id?"border-[#057cfa] bg-blue-50":"border-slate-200"}`}><span className="block font-semibold">{item.title}</span><span className="mt-1 block text-xs text-slate-500">{item.category} · {item.language.toUpperCase()} · {item.status}</span></button>):<p className="text-sm text-slate-500">No CMS articles yet.</p>}</div>
 </div>
 <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-6">
  <h2 className="text-lg font-bold">{editing?"Edit article":"Create article"}</h2>
  <p className="mt-1 text-xs text-slate-500">Save drafts or mark as published. Public website integration comes next.</p>
  <div className="mt-5 grid gap-4">
   {[["title","Title"],["slug","URL slug"],["category","Category"],["excerpt","Summary / excerpt"],["seoTitle","SEO title"],["seoDescription","SEO description"]].map(([name,label])=><label key={name} className="block text-sm font-semibold">{label}<input required={["title","slug","category","excerpt"].includes(name)} disabled={!!editing&&name==="slug"} value={form[name]} onChange={e=>field(name,e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal"/></label>)}
   <label className="block text-sm font-semibold">Article content (plain text for now)<textarea required minLength={30} rows={10} value={form.content} onChange={e=>field("content",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-4 text-sm font-normal"/></label>
   <div className="grid grid-cols-2 gap-4"><label className="text-sm font-semibold">Language<select disabled={!!editing} value={form.language} onChange={e=>field("language",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3"><option value="en">English</option><option value="de">German</option></select></label><label className="text-sm font-semibold">Status<select value={form.status} onChange={e=>field("status",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3"><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
   {error&&<p role="alert" className="text-sm text-red-700">{error}</p>}{notice&&<p role="status" className="text-sm text-green-700">{notice}</p>}
   <button disabled={busy} type="submit" className="rounded-full bg-[#057cfa] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{busy?"Saving…":editing?"Save changes":"Create article"}</button>
  </div>
 </form></section>;
}
