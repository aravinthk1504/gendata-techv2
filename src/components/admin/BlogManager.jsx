"use client";
import {useEffect,useState} from "react";
import MarkdownContent from "../blog/MarkdownContent";
import {FiUpload,FiTrash2} from "react-icons/fi";
const blank={type:"article",eventDate:"",eventTime:"",location:"",eventMode:"online",registrationUrl:"",title:"",slug:"",category:"Technology",excerpt:"",content:"",seoTitle:"",seoDescription:"",image:"",imageAlt:"",language:"en",status:"draft"};
export default function BlogManager(){
 const [items,setItems]=useState([]),[editing,setEditing]=useState(null),[form,setForm]=useState(blank);
 const [preview,setPreview]=useState(false);
 const [deleting,setDeleting]=useState(null);
 const [uploading,setUploading]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(""),[notice,setNotice]=useState("");
 async function load(){try{const response=await fetch("/api/admin/blogs",{cache:"no-store"});if(!response.ok)throw Error("Unable to load articles");const json=await response.json();setItems(json.blogs||[])}catch(e){setError(e.message)}}
 useEffect(()=>{load()},[]);
 function field(name,value){setForm(v=>({...v,[name]:value}))}
 function edit(item){setEditing(item.id);setForm({type:item.type||"article",eventDate:item.eventDate||"",eventTime:item.eventTime||"",location:item.location||"",eventMode:item.eventMode||"online",registrationUrl:item.registrationUrl||"",title:item.title,slug:item.slug,category:item.category,excerpt:item.excerpt,content:item.content,seoTitle:item.seoTitle||"",seoDescription:item.seoDescription||"",image:item.image||"",imageAlt:item.imageAlt||"",language:item.language,status:item.status});setError("");setNotice("")}
 function reset(){setEditing(null);setForm(blank);setError("");setNotice("")}
 async function removeEntry(item){
  if(!item||busy||uploading)return;
  setDeleting(item.id);setError("");setNotice("");
  try{
   const response=await fetch(`/api/admin/blogs/${encodeURIComponent(item.id)}`,{method:"DELETE"});
   const data=await response.json();
   if(!response.ok)throw Error(data.error||"Deletion failed");
   if(editing===item.id)reset();
   setNotice(`${item.type==="event"?"Event":"Article"} deleted from Firestore. Cloudinary images are retained.`);
   await load();
  }catch(e){setError(e.message||"Unable to delete")}finally{setDeleting(null)}
 }
 async function uploadImage(file,target){
  if(!file)return;
  setUploading(true);setError("");setNotice("");
  try{
   const payload=new FormData();payload.set("file",file);payload.set("kind",form.type);
   const response=await fetch("/api/admin/media",{method:"POST",body:payload});
   const data=await response.json();
   if(!response.ok)throw Error(data.error||"Upload failed");
   if(target==="cover")field("image",data.url);
   else field("content",form.content+(form.content?"\n\n":"")+ `![${file.name.replace(/\.[^.]+$/,"").replace(/[\[\]()]/g,"")||"Event photo"}](${data.url})`);
   setNotice("Image uploaded successfully. Save the article to keep the link.");
  }catch(e){setError(e.message||"Upload failed")}finally{setUploading(false)}
 }
 async function save(event){
  event.preventDefault();setBusy(true);setError("");setNotice("");
  try{
   const body=editing?((({slug,language,...rest})=>rest)(form)):form;
   const response=await fetch(editing?`/api/admin/blogs/${encodeURIComponent(editing)}`:"/api/admin/blogs",{method:editing?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
   const data=await response.json();if(!response.ok){const details=data.fields&&typeof data.fields==="object"?Object.entries(data.fields).flatMap(([field,messages])=>(Array.isArray(messages)?messages:[]).map(message=>`${field}: ${message}`)).join("; "):"";throw Error(details||data.error||"Unable to save article");}
   setNotice(editing?"Article updated":"Article created");await load();setEditing(data.id||editing);
  }catch(e){setError(e.message)}finally{setBusy(false)}
 }
 return <section className="mt-6 flex flex-col gap-6">
 <div className="rounded-3xl border border-slate-200 bg-white p-6">
  <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold">Blog articles</h2><button onClick={reset} className="rounded-full bg-[#057cfa] px-4 py-2 text-xs font-semibold text-white">New article</button></div>
  <p className="mt-2 text-xs text-slate-500">Firestore CMS posts. Only published articles appear on the public website.</p>
  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{items.length?items.map(item=><div key={item.id} className={`flex items-center gap-2 rounded-xl border p-3 ${editing===item.id?"border-[#057cfa] bg-blue-50":"border-slate-200"}`}><button type="button" onClick={()=>edit(item)} className="min-w-0 flex-1 text-left"><span className="block font-semibold">{item.title}</span><span className="mt-1 block text-xs text-slate-500">{item.type==="event"?"Event":"Article"} · {item.category} · {item.language.toUpperCase()} · {item.status}</span></button><button type="button" disabled={Boolean(deleting)} onClick={()=>{if(window.confirm(`Permanently delete "${item.title}"? This removes the Firestore entry and unpublishes it. Images remain in Cloudinary.`))removeEntry(item)}} title="Delete" aria-label={`Delete ${item.title}`} className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-red-600 hover:bg-red-100 disabled:opacity-50"><FiTrash2 size={16}/></button></div>):<p className="text-sm text-slate-500">No CMS articles yet.</p>}</div>
 </div>
 <form onSubmit={save} className="rounded-3xl border border-slate-200 bg-white p-6">
  <h2 className="text-lg font-bold">{editing?"Edit article":"Create article"}</h2>
  <p className="mt-1 text-xs text-slate-500">Write in Markdown, preview, then save a draft or publish.</p>
  <div className="mt-5 grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold">Content type<select value={form.type} onChange={e=>field("type",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3"><option value="article">Article</option><option value="event">Event</option></select></label>{form.type==="event"&&<div className="grid gap-4 rounded-xl bg-blue-50 p-4 sm:grid-cols-2 md:col-span-2"><label className="text-sm font-semibold">Event date<input type="date" required value={form.eventDate} onChange={e=>field("eventDate",e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">Time and timezone<input required value={form.eventTime} onChange={e=>field("eventTime",e.target.value)} placeholder="10:00 AM IST" className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">Mode<select value={form.eventMode} onChange={e=>field("eventMode",e.target.value)} className="mt-2 w-full rounded-xl border p-3"><option value="online">Online</option><option value="in-person">In person</option><option value="hybrid">Hybrid</option></select></label><label className="text-sm font-semibold">Venue / platform<input value={form.location} onChange={e=>field("location",e.target.value)} placeholder="Coimbatore / Google Meet" className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold sm:col-span-2">HTTPS registration link<input type="url" value={form.registrationUrl} onChange={e=>field("registrationUrl",e.target.value)} placeholder="https://..." className="mt-2 w-full rounded-xl border p-3"/></label></div>}
   {[["title","Title"],["slug","URL slug"],["category","Category"],["excerpt","Summary / excerpt"],["seoTitle","SEO title"],["seoDescription","SEO description"],["image","HTTPS cover image URL"],["imageAlt","Image description (alt text)"]].map(([name,label])=><label key={name} className={`block text-sm font-semibold ${["title","excerpt","image"].includes(name)?"md:col-span-2":""}`}>{label}<input required={["title","slug","category","excerpt"].includes(name)} disabled={!!editing&&name==="slug"} value={form[name]} onChange={e=>field(name,e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal"/></label>)}
   <div><p className="mb-2 text-sm font-semibold text-slate-700">Cover photo</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#057cfa] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#002dcc]"><FiUpload size={17}/> {uploading?"Uploading…":"Upload cover image"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e=>{uploadImage(e.target.files?.[0],"cover");e.target.value=""}} className="sr-only"/></label><p className="mt-2 text-xs text-slate-500">JPG, PNG or WebP · Max 5 MB</p></div>
   {form.image&&<img src={form.image} alt={form.imageAlt||"Cover preview"} className="max-h-48 w-auto rounded-xl object-contain"/>}
   <div className="flex flex-wrap items-center justify-between gap-2 md:col-span-2"><span className="text-sm font-semibold">Article content (Markdown)</span><button type="button" onClick={()=>setPreview(v=>!v)} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">{preview?"Edit content":"Preview article"}</button></div><div className="md:col-span-2">{preview?<div className="min-h-60 rounded-xl border border-slate-200 p-5 md:col-span-2">{form.image&&<img src={form.image} alt={form.imageAlt||form.title} className="mb-5 w-full rounded-xl object-cover"/>}<h2 className="mb-3 text-2xl font-bold">{form.title||"Untitled article"}</h2><p className="mb-5 text-slate-500">{form.excerpt}</p><MarkdownContent content={form.content}/></div>:<><div className="flex flex-wrap gap-2 md:col-span-2">{[["Heading","## "],["Bold","**bold text**"],["Italic","*italic text*"],["List","- "],["Link","[link](https://example.com)"],["Insert Image / Diagram","![Diagram description](https://example.com/diagram.webp)"]].map(([label,snippet])=><button key={label} type="button" onClick={()=>field("content",form.content+(form.content?"\n":"")+snippet)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium">{label}</button>)}</div><textarea aria-label="Article content" required minLength={30} rows={12} value={form.content} onChange={e=>field("content",e.target.value)} className="w-full rounded-xl border border-slate-200 p-4 text-sm font-normal" placeholder="Write your article here using Markdown..."/></>}</div>
   <div><p className="mb-2 text-sm font-semibold text-slate-700">Photos and diagrams inside the content</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#057cfa] bg-blue-50 px-5 py-3 text-sm font-semibold text-[#003cba] transition hover:bg-blue-100"><FiUpload size={17}/> {uploading?"Uploading…":"Upload photo / diagram"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e=>{uploadImage(e.target.files?.[0],"inline");e.target.value=""}} className="sr-only"/></label><p className="mt-2 text-xs text-slate-500">JPG, PNG or WebP · Max 5 MB</p></div>
   {uploading&&<p role="status" className="text-sm text-blue-600">Uploading image…</p>}
   <div className="grid grid-cols-2 gap-4 md:col-span-2"><label className="text-sm font-semibold">Language<select disabled={!!editing} value={form.language} onChange={e=>field("language",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3"><option value="en">English</option><option value="de">German</option></select></label><label className="text-sm font-semibold">Status<select value={form.status} onChange={e=>field("status",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3"><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
   {error&&<p role="alert" className="text-sm text-red-700">{error}</p>}{notice&&<p role="status" className="text-sm text-green-700">{notice}</p>}
   <button disabled={busy||uploading} type="submit" className="md:col-span-2 rounded-full bg-[#057cfa] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{busy?"Saving…":editing?"Save changes":"Create article"}</button>
  </div>
 </form></section>;
}
