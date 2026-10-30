"use client";
import {useEffect,useState} from "react";
import MarkdownContent from "../blog/MarkdownContent";
import {FiUpload,FiTrash2} from "react-icons/fi";
const BLOG_CATEGORIES=["AI & Machine Learning","Data Science","Full Stack Development","Web Development","Software Development","App Development","IoT Solutions","Technology Trends"];
const blank={gallery:[],type:"article",eventDate:"",eventTime:"",location:"",eventMode:"online",registrationUrl:"",title:"",slug:"",category:"Technology Trends",excerpt:"",content:"",seoTitle:"",seoDescription:"",image:"",imageAlt:"",language:"en",status:"draft"};
export default function BlogManager(){
 const contentType="article";
 const [items,setItems]=useState([]),[editing,setEditing]=useState(null),[form,setForm]=useState({...blank,type:contentType});
 const checks=[["Title",form.title.trim().length>=5],["Summary",form.excerpt.trim().length>=10],["Cover image",Boolean(form.image.trim())],["Image alt text",Boolean(form.imageAlt.trim())],["SEO title",Boolean(form.seoTitle.trim())],["SEO description",Boolean(form.seoDescription.trim())],["Article body",form.content.trim().length>=30]];
 const ready=checks.every(([,ok])=>ok);
 const [preview,setPreview]=useState(false);
 const [section,setSection]=useState("content");
 const [query,setQuery]=useState(""),[statusFilter,setStatusFilter]=useState("all"),[languageFilter,setLanguageFilter]=useState("all"),[categoryFilter,setCategoryFilter]=useState("all");
 const articles=items.filter(item=>(item.type||"article")==="article");
 const categories=[...new Set(articles.map(item=>item.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
 const matching=articles.filter(item=>(statusFilter==="all"||item.status===statusFilter)&&(languageFilter==="all"||item.language===languageFilter)&&(categoryFilter==="all"||item.category===categoryFilter)&&[item.title,item.category,item.excerpt,item.slug].some(x=>(x||"").toLowerCase().includes(query.trim().toLowerCase())));
 const [deleting,setDeleting]=useState(null);
 const [uploading,setUploading]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(""),[notice,setNotice]=useState("");
 async function load(){try{const response=await fetch("/api/admin/blogs",{cache:"no-store"});if(!response.ok)throw Error("Unable to load articles");const json=await response.json();setItems(json.blogs||[])}catch(e){setError(e.message)}}
 useEffect(()=>{load()},[]);
 function field(name,value){setForm(v=>({...v,[name]:value}))}
 function edit(item){setEditing(item.id);setForm({gallery:item.gallery||[],type:item.type||"article",eventDate:item.eventDate||"",eventTime:item.eventTime||"",location:item.location||"",eventMode:item.eventMode||"online",registrationUrl:item.registrationUrl||"",title:item.title,slug:item.slug,category:item.category,excerpt:item.excerpt,content:item.content,seoTitle:item.seoTitle||"",seoDescription:item.seoDescription||"",image:item.image||"",imageAlt:item.imageAlt||"",language:item.language,status:item.status});setError("");setNotice("");setSection("content")}
 function reset(){setEditing(null);setForm({...blank,type:contentType});setError("");setNotice("");setSection("content")}
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
  event.preventDefault();setError("");setNotice("");
  if(form.status==="published"&&!ready){setError("Complete the publishing checklist before publishing. Drafts can be saved at any time.");setSection("seo");return;}
  setBusy(true);
  try{
   const body=editing?((({slug,language,...rest})=>rest)(form)):form;
   const response=await fetch(editing?`/api/admin/blogs/${encodeURIComponent(editing)}`:"/api/admin/blogs",{method:editing?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
   const data=await response.json();if(!response.ok){const details=data.fields&&typeof data.fields==="object"?Object.entries(data.fields).flatMap(([field,messages])=>(Array.isArray(messages)?messages:[]).map(message=>`${field}: ${message}`)).join("; "):"";throw Error(details||data.error||"Unable to save article");}
   setNotice(editing?`${contentType==="event"?"Event":"Article"} updated`:`${contentType==="event"?"Event":"Article"} created`);await load();setEditing(data.id||editing);
  }catch(e){setError(e.message)}finally{setBusy(false)}
 }
 return <section className="mt-6 space-y-5">
 <div className="rounded-3xl border border-slate-200 bg-white p-5">
  <div className="flex flex-wrap items-center justify-between gap-3">
   <div><h2 className="text-lg font-bold">Blog Management</h2><p className="mt-1 text-xs text-slate-500">Select an article to edit, or start a new one.</p></div>
   <button type="button" onClick={reset} className="rounded-full bg-[#057cfa] px-5 py-2 text-sm font-semibold text-white">+ New article</button>
  </div>
  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <input aria-label="Search blog articles" type="search" placeholder="Search articles..." value={query} onChange={e=>setQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"/>
    <select aria-label="Filter by publishing status" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select>
    <select aria-label="Filter by category" value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="all">All categories</option>{categories.map(category=><option key={category} value={category}>{category}</option>)}</select>
    <select aria-label="Filter by language" value={languageFilter} onChange={e=>setLanguageFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="all">All languages</option><option value="en">English</option><option value="de">German</option></select>
  </div>
  <div className="mt-3 flex flex-wrap items-center justify-between gap-2"><p className="text-xs text-slate-500">Showing {matching.length} of {articles.length} articles</p><button type="button" onClick={()=>{setQuery("");setStatusFilter("all");setLanguageFilter("all");setCategoryFilter("all")}} className="text-xs font-semibold text-[#057cfa] hover:underline">Clear filters</button></div>
  <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{matching.length?matching.map(item=><div key={item.id} className={"flex min-w-0 items-center gap-2 rounded-xl border p-3 "+(editing===item.id?"border-[#057cfa] bg-blue-50":"border-slate-200")}>
   <button type="button" onClick={()=>edit(item)} className="min-w-0 flex-1 text-left"><span className="block truncate text-sm font-semibold">{item.title}</span><span className="mt-1 block text-xs text-slate-500">{item.category} · {item.language.toUpperCase()} · {item.status}</span></button>
   <button type="button" disabled={Boolean(deleting)||busy||uploading} onClick={()=>{if(window.confirm('Permanently delete "'+item.title+'"? The entry will be deleted, but Cloudinary images will remain.'))removeEntry(item)}} aria-label={"Delete "+item.title} className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 disabled:opacity-50"><FiTrash2 size={16}/></button>
  </div>):<p className="text-sm text-slate-500">{articles.length?"No articles match your filters.":"No blog articles yet."}</p>}</div>
 </div>
 <form onSubmit={save} noValidate className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
   <div><h2 className="text-lg font-bold">{editing?"Edit article":"Create article"}</h2><p className="text-xs text-slate-500">{form.status==="published"?"Published":"Draft"} · {form.language.toUpperCase()}</p></div>
   <button disabled={busy||uploading} type="submit" className="rounded-full bg-[#057cfa] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{busy?"Saving…":editing?"Save changes":"Save article"}</button>
  </div>
  <div className="flex flex-wrap gap-2 border-b border-slate-100 px-5 py-3 sm:px-6" role="tablist" aria-label="Article form sections">
   {[["content","Content"],["media","Images"],["seo","SEO & Publishing"]].map(([id,name])=><button key={id} type="button" role="tab" aria-selected={section===id} onClick={()=>setSection(id)} className={"rounded-full px-4 py-2 text-sm font-semibold "+(section===id?"bg-[#057cfa] text-white":"bg-slate-100 text-slate-600 hover:bg-slate-200")}>{name}</button>)}
  </div>
  <div className="px-5 py-5 sm:px-6">
   <div className={section==="content"?"space-y-4":"hidden"}>
    <div className="grid gap-4 md:grid-cols-2">
     <label className="text-sm font-semibold md:col-span-2">Article title<input required minLength={5} value={form.title} onChange={e=>field("title",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal" placeholder="Enter a clear article title"/></label>
     <label className="text-sm font-semibold">URL slug<input required disabled={!!editing} value={form.slug} onChange={e=>field("slug",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal disabled:bg-slate-100"/></label>
     <label className="text-sm font-semibold">Category<select required value={form.category} onChange={e=>field("category",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal">{!BLOG_CATEGORIES.includes(form.category)&&<option value={form.category}>{form.category} (existing)</option>}{BLOG_CATEGORIES.map(category=><option key={category} value={category}>{category}</option>)}</select></label>
     <label className="text-sm font-semibold md:col-span-2">Short summary<textarea required rows={2} value={form.excerpt} onChange={e=>field("excerpt",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal"/></label>
    </div>
    <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold">Article body (Markdown)</h3><button type="button" onClick={()=>setPreview(v=>!v)} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">{preview?"Edit":"Preview"}</button></div>
    {preview?<div className="max-h-[480px] overflow-auto rounded-xl border border-slate-200 p-5"><h2 className="mb-3 text-2xl font-bold">{form.title||"Untitled article"}</h2><p className="mb-5 text-slate-500">{form.excerpt}</p><MarkdownContent content={form.content}/></div>:<>
     <div className="flex flex-wrap gap-2">{[["Heading","## "],["Bold","**bold text**"],["Italic","*italic text*"],["List","- "],["Link","[link](https://example.com)"],["Image","![Image description](https://example.com/image.webp)"]].map(([label,snippet])=><button key={label} type="button" onClick={()=>setForm(v=>({...v,content:v.content+(v.content?"\n":"")+snippet}))} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium">{label}</button>)}</div>
     <textarea aria-label="Article content" required minLength={30} rows={9} value={form.content} onChange={e=>field("content",e.target.value)} className="w-full rounded-xl border border-slate-200 p-4 text-sm font-normal" placeholder="Write your article here..."/>
    </>}
   </div>
   <div className={section==="media"?"space-y-4":"hidden"}>
    <div className="grid gap-4 sm:grid-cols-2">
     <div><p className="mb-2 text-sm font-semibold">Cover image</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#057cfa] px-5 py-3 text-sm font-semibold text-white"><FiUpload size={17}/>{uploading?"Uploading…":"Upload cover photo"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e=>{uploadImage(e.target.files?.[0],"cover");e.target.value=""}} className="sr-only"/></label><p className="mt-2 text-xs text-slate-500">JPG, PNG or WebP · Max 5 MB</p></div>
     {form.image&&<img src={form.image} alt={form.imageAlt||"Cover preview"} className="max-h-36 w-full rounded-xl object-contain"/>}
     <label className="text-sm font-semibold sm:col-span-2">Cover image URL<input value={form.image} onChange={e=>field("image",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal" placeholder="https://..."/></label>
     <label className="text-sm font-semibold sm:col-span-2">Image description (alt text)<input value={form.imageAlt} onChange={e=>field("imageAlt",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal"/></label>
    </div>
    <div className="border-t border-slate-100 pt-4"><p className="mb-2 text-sm font-semibold">Insert photo or diagram into the article</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#057cfa] bg-blue-50 px-5 py-3 text-sm font-semibold text-[#003cba]"><FiUpload size={17}/>{uploading?"Uploading…":"Upload inline image"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e=>{uploadImage(e.target.files?.[0],"inline");e.target.value=""}} className="sr-only"/></label><p className="mt-2 text-xs text-slate-500">Inserted into Markdown content automatically. Save the article afterwards.</p></div>
   </div>
   <div className={section==="seo"?"space-y-4":"hidden"}>
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-bold">Publishing checklist</h3><span className={"text-xs font-semibold "+(ready?"text-green-700":"text-amber-700")}>{checks.filter(([,ok])=>ok).length}/{checks.length} complete</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{checks.map(([name,ok])=><p key={name} className={"text-xs "+(ok?"text-green-700":"text-slate-600")}><span aria-hidden="true">{ok?"✓":"○"}</span> {name}</p>)}</div><p className="mt-3 text-xs text-slate-500">All checks are required for publishing. Incomplete articles can still be saved as drafts.</p></div>
    <div className="grid gap-4 md:grid-cols-2">
     <label className="text-sm font-semibold md:col-span-2">SEO title<input value={form.seoTitle} onChange={e=>field("seoTitle",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal"/></label>
     <label className="text-sm font-semibold md:col-span-2">SEO description<textarea rows={3} value={form.seoDescription} onChange={e=>field("seoDescription",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal"/></label>
     <label className="text-sm font-semibold">Language<select disabled={!!editing} value={form.language} onChange={e=>field("language",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 p-3"><option value="en">English</option><option value="de">German</option></select></label>
     <label className="text-sm font-semibold">Publishing status<select value={form.status} onChange={e=>field("status",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 p-3"><option value="draft">Draft</option><option value="published">Published</option></select></label>
    </div>
   </div>
   {uploading&&<p role="status" className="mt-4 text-sm text-blue-600">Uploading image…</p>}
   {error&&<p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
   {notice&&<p role="status" className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
  </div>
 </form>
 </section>;
}
