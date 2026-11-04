"use client";
import {useEffect,useRef,useState} from "react";
import MarkdownContent from "../blog/MarkdownContent";
import {FiUpload,FiTrash2} from "react-icons/fi";
const slugify = value => value.toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,130).replace(/-+$/,"");
const BLOG_CATEGORIES=["AI & Machine Learning","Data Science","Full Stack Development","Web Development","Software Development","App Development","IoT Solutions","Technology Trends"];
const blank={gallery:[],type:"article",eventDate:"",eventTime:"",location:"",eventMode:"online",registrationUrl:"",title:"",slug:"",category:"Technology Trends",excerpt:"",content:"",seoTitle:"",seoDescription:"",image:"",imageAlt:"",language:"en",status:"draft"};
export default function BlogManager({onUnsavedChange}){
 const contentType="article";
 const [items,setItems]=useState([]),[editing,setEditing]=useState(null),[form,setForm]=useState({...blank,type:contentType});
 const checks=[["Title",form.title.trim().length>=5],["URL slug",Boolean(form.slug)],["Category",form.category.trim().length>=2],["Summary",form.excerpt.trim().length>=10],["Cover image",Boolean(form.image.trim())],["Image alt text",Boolean(form.imageAlt.trim())],["SEO title",Boolean(form.seoTitle.trim())],["SEO description",Boolean(form.seoDescription.trim())],["Article body",form.content.trim().length>=30]];
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
 const [revision,setRevision]=useState(0),[savedRevision,setSavedRevision]=useState(0);
 const [autosaveState,setAutosaveState]=useState("");
 const [slugEdited,setSlugEdited]=useState(false);
 const savingRef=useRef(false);
 const dirty=revision>savedRevision;
 useEffect(()=>{onUnsavedChange?.(dirty||busy||uploading)},[dirty,busy,uploading,onUnsavedChange]);
 const persistedPublished=items.some(item=>item.id===editing&&item.status==="published");
 async function load(){try{const response=await fetch("/api/admin/blogs",{cache:"no-store"});if(!response.ok)throw Error("Unable to load articles");const json=await response.json();setItems(json.blogs||[])}catch(e){setError(e.message)}}
 useEffect(()=>{load()},[]);
 function field(name,value){
   setForm(previous=>({...previous,[name]:value,...(name==="title"&&!editing&&!slugEdited?{slug:slugify(value)}:{})}));
   setRevision(value=>value+1);
   setAutosaveState("");
 }
 function edit(item){if(savingRef.current||uploading||(dirty&&!window.confirm("Discard unsaved changes?")))return;setRevision(0);setSavedRevision(0);setAutosaveState("");setSlugEdited(true);setPreview(false);setEditing(item.id);setForm({gallery:item.gallery||[],type:item.type||"article",eventDate:item.eventDate||"",eventTime:item.eventTime||"",location:item.location||"",eventMode:item.eventMode||"online",registrationUrl:item.registrationUrl||"",title:item.title,slug:item.slug,category:item.category,excerpt:item.excerpt,content:item.content,seoTitle:item.seoTitle||"",seoDescription:item.seoDescription||"",image:item.image||"",imageAlt:item.imageAlt||"",language:item.language,status:item.status});setError("");setNotice("");setSection("content")}
 function reset(){if(savingRef.current||uploading||(dirty&&!window.confirm("Discard unsaved changes?")))return;setRevision(0);setSavedRevision(0);setAutosaveState("");setSlugEdited(false);setPreview(false);setEditing(null);setForm({...blank,type:contentType});setError("");setNotice("");setSection("content")}
 async function changeLanguage(nextLanguage){
  if(nextLanguage===form.language||savingRef.current||uploading)return;
  setError("");setNotice("");
  if(!editing){
   field("language",nextLanguage);
   return;
  }
  const name=nextLanguage==="de"?"German":"English";
  if(!window.confirm(`Create a separate ${name} draft of this article? The original article will remain unchanged. Article text is not translated automatically.`))return;
  savingRef.current=true;
  setBusy(true);
  try{
   // A saved slug is part of the Firestore document ID and public URL.
   // Copy to a distinct language-scoped draft, never silently rename
   // or unpublish the existing article.
   const copy={...form,language:nextLanguage,status:"draft"};
   const response=await fetch("/api/admin/blogs",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(copy)
   });
   const data=await response.json();
   if(!response.ok){
    if(response.status===409)throw Error(`A ${name} article with this URL slug already exists. Select that article from the list, or use a different slug for a new draft.`);
    throw Error(data.error||"Unable to create language draft");
   }
   setEditing(data.id);
   setForm(copy);
   setRevision(0);
   setSavedRevision(0);
   setSlugEdited(true);
   setAutosaveState("Draft saved to Firebase");
   setNotice(`${name} draft created. Translate its text before publishing; the original article is unchanged.`);
   await load();
  }catch(error){
   setError(error.message||"Unable to change language");
  }finally{
   savingRef.current=false;
   setBusy(false);
  }
 }
 async function removeEntry(item){
  if(!item||busy||uploading)return;
  setDeleting(item.id);setError("");setNotice("");
  try{
   const response=await fetch(`/api/admin/blogs/${encodeURIComponent(item.id)}`,{method:"DELETE"});
   const data=await response.json();
   if(!response.ok)throw Error(data.error||"Deletion failed");
   if(editing===item.id){setEditing(null);setForm({...blank,type:contentType});setRevision(0);setSavedRevision(0);setSlugEdited(false);}
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
   else {
     const alt=file.name.split(".").slice(0,-1).join(".").replace(/[^a-zA-Z0-9 _-]/g,"")||"Article image";
     setForm(previous=>({...previous,content:previous.content+(previous.content?"\n\n":"")+ `![${alt}](${data.url})`}));
     setRevision(v=>v+1);
     setAutosaveState("");
   }
   setNotice("Image uploaded successfully. Drafts will autosave once changes settle.");
  }catch(e){setError(e.message||"Upload failed")}finally{setUploading(false)}
 }
 async function persist(draft, version, automatic=false){
  if(savingRef.current||uploading)return;
  if(!draft.slug||!draft.title.trim()){
    if(!automatic)setError("Enter an article title to generate a URL slug before saving.");
    return;
  }
  if(draft.status==="published"&&!ready){
    if(!automatic){setError("Complete the publishing checklist before publishing.");setSection("seo");}
    return;
  }
  savingRef.current=true;setBusy(true);
  if(automatic)setAutosaveState("Saving draft…");
  else {setError("");setNotice("");}
  try{
   const body=editing?((({slug,language,...rest})=>rest)(draft)):draft;
   const response=await fetch(editing?`/api/admin/blogs/${encodeURIComponent(editing)}`:"/api/admin/blogs",{
     method:editing?"PATCH":"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(body)
   });
   const data=await response.json();
   if(!response.ok){
    const details=data.fields&&typeof data.fields==="object"?Object.entries(data.fields).flatMap(([field,messages])=>(Array.isArray(messages)?messages:[]).map(message=>`${field}: ${message}`)).join("; "):"";
    throw Error(details||data.error||"Unable to save article");
   }
   if(!editing)setEditing(data.id);
   setSavedRevision(v=>Math.max(v,version));
   if(automatic){setAutosaveState("Draft saved to Firebase");setError("");}
   else {setAutosaveState("");setNotice(draft.status==="published"?"Article published successfully":"Draft saved to Firebase");}
   await load();
  }catch(e){
   setError(e.message||"Unable to save article");
   setAutosaveState(automatic?"Autosave failed — use Save article":"");
  }finally{savingRef.current=false;setBusy(false);}
 }
 async function save(event){
  event.preventDefault();
  await persist(form,revision,false);
 }
 // Autosave only drafts; published articles are never unpublished by a timer.
 // The revision counter prevents an in-flight save from dropping later edits.
 useEffect(()=>{
   if(!dirty||form.status!=="draft"||persistedPublished||form.title.trim().length<5||!form.slug||uploading||busy)return;
   const timer=setTimeout(()=>{void persist(form,revision,true)},2000);
   return ()=>clearTimeout(timer);
 },[form,revision,dirty,persistedPublished,uploading,busy,editing]);
 useEffect(()=>{
   if(!dirty)return;
   const warn=event=>{event.preventDefault();event.returnValue="";};
   window.addEventListener("beforeunload",warn);
   return ()=>window.removeEventListener("beforeunload",warn);
 },[dirty]);
 return <section className="space-y-5">
 <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
  <div className="flex flex-wrap items-center justify-between gap-3">
   <div><h2 className="text-lg font-bold">Blog Management</h2><p className="mt-1 text-xs text-slate-500">Select an article to edit, or start a new one.</p></div>
   <button type="button" onClick={reset} disabled={busy||uploading} className="gd-brand-primary inline-flex min-h-11 items-center rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60">+ New article</button>
  </div>
  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <input aria-label="Search blog articles" type="search" placeholder="Search articles..." value={query} onChange={e=>setQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"/>
    <select aria-label="Filter by publishing status" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select>
    <select aria-label="Filter by category" value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="all">All categories</option>{categories.map(category=><option key={category} value={category}>{category}</option>)}</select>
    <select aria-label="Filter by language" value={languageFilter} onChange={e=>setLanguageFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="all">All languages</option><option value="en">English</option><option value="de">German</option></select>
  </div>
  <div className="mt-3 flex flex-wrap items-center justify-between gap-2"><p className="text-xs text-slate-500">Showing {matching.length} of {articles.length} articles</p><button type="button" onClick={()=>{setQuery("");setStatusFilter("all");setLanguageFilter("all");setCategoryFilter("all")}} className="text-xs font-semibold text-[#057cfa] hover:underline">Clear filters</button></div>
  <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{matching.length?matching.map(item=><div key={item.id} className={"flex min-w-0 items-center gap-2 rounded-xl border p-3 "+(editing===item.id?"border-[#057cfa] bg-blue-50":"border-slate-200")}>
   <button type="button" onClick={()=>edit(item)} disabled={busy||uploading} className="min-w-0 flex-1 text-left disabled:opacity-60"><span className="block truncate text-sm font-semibold">{item.title}</span><span className="mt-1 block text-xs text-slate-500">{item.category} · {item.language.toUpperCase()} · {item.status}</span></button>
   <button type="button" disabled={Boolean(deleting)||busy||uploading} onClick={()=>{if(window.confirm('Permanently delete "'+item.title+'"? The entry will be deleted, but Cloudinary images will remain.'))removeEntry(item)}} aria-label={"Delete "+item.title} className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 disabled:opacity-50"><FiTrash2 size={16}/></button>
  </div>):<p className="text-sm text-slate-500">{articles.length?"No articles match your filters.":"No blog articles yet."}</p>}</div>
 </div>
 <form onSubmit={save} noValidate className="min-w-0 rounded-3xl border border-slate-200 bg-white shadow-sm">
  <div className="sticky top-[64px] z-20 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl border-b border-slate-100 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:top-0">
   <div><h2 className="text-lg font-bold">{editing?"Edit article":"Create article"}</h2><p className="text-xs text-slate-500">{form.status==="published"?"Published":"Draft"} · {form.language.toUpperCase()}</p><p role="status" aria-live="polite" className="mt-1 text-xs text-slate-500">{busy?"Saving…":autosaveState || (dirty?"Unsaved changes":editing?"Changes saved":"Autosaves 2 seconds after typing")}</p></div>
   <button disabled={busy||uploading} type="submit" className="gd-brand-primary inline-flex min-h-11 items-center rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60">{busy?"Saving…":editing?"Save changes":"Save article"}</button>
  </div>
  <div className="flex gap-2 overflow-x-auto border-b border-slate-100 px-4 py-3 sm:px-6" role="tablist" aria-label="Article form sections">
   {[["content","Content"],["media","Images"],["seo","SEO & Publishing"]].map(([id,name])=><button key={id} type="button" role="tab" id={"cms-tab-"+id} aria-controls={"cms-panel-"+id} aria-selected={section===id} tabIndex={section===id?0:-1} onKeyDown={event=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;event.preventDefault();const ids=["content","media","seo"];const target=event.key==="Home"?0:event.key==="End"?2:(ids.indexOf(id)+(event.key==="ArrowRight"?1:2))%3;setSection(ids[target]);document.getElementById("cms-tab-"+ids[target])?.focus()}} onClick={()=>setSection(id)} className={"shrink-0 rounded-full px-4 py-2 text-sm font-semibold "+(section===id?"gd-brand-primary":"bg-slate-100 text-slate-600 hover:bg-slate-200")}>{name}</button>)}
  </div>
  <div className="px-4 py-5 sm:px-6">
   <div id="cms-panel-content" role="tabpanel" aria-labelledby="cms-tab-content" hidden={section!=="content"} className="space-y-4">
    <div className="grid gap-4 md:grid-cols-2">
     <label className="text-sm font-semibold md:col-span-2">Article title<input required minLength={5} value={form.title} onChange={e=>field("title",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal" placeholder="Enter a clear article title"/></label>
     <label className="text-sm font-semibold">URL slug<input required disabled={!!editing} value={form.slug} onChange={e=>{setSlugEdited(true);field("slug",slugify(e.target.value))}} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal disabled:bg-slate-100"/></label>
     <label className="text-sm font-semibold">Category<select required value={form.category} onChange={e=>field("category",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal">{!BLOG_CATEGORIES.includes(form.category)&&<option value={form.category}>{form.category} (existing)</option>}{BLOG_CATEGORIES.map(category=><option key={category} value={category}>{category}</option>)}</select></label>
     <label className="text-sm font-semibold md:col-span-2">Short summary<textarea required rows={2} value={form.excerpt} onChange={e=>field("excerpt",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal"/></label>
    </div>
    <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold">Article body (Markdown)</h3><button type="button" onClick={()=>setPreview(v=>!v)} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">{preview?"Edit":"Preview"}</button></div>
    {preview?<div className="max-h-[600px] overflow-auto rounded-2xl border border-slate-200 bg-white">
      <div className="bg-[#06142f] px-5 py-10 text-white sm:px-10">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">{form.category} · {form.language.toUpperCase()} · Draft preview</p>
        <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-4xl">{form.title||"Untitled article"}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">{form.excerpt||"Article summary will appear here."}</p>
        <p className="mt-3 text-xs text-slate-400">/{form.language}/blog/{form.slug||"article-slug"}</p>
      </div>
      <div className="px-5 py-7 sm:px-10">
        {form.image&&<img src={form.image} alt={form.imageAlt||"Article cover"} className="mb-8 aspect-video w-full rounded-xl object-cover"/>}
        <MarkdownContent content={form.content}/>
      </div>
    </div>:<>
     <div className="flex flex-wrap gap-2">{[["Heading","## "],["Bold","**bold text**"],["Italic","*italic text*"],["List","- "],["Link","[link](https://example.com)"],["Image","![Image description](https://example.com/image.webp)"]].map(([label,snippet])=><button key={label} type="button" onClick={()=>{setForm(v=>({...v,content:v.content+(v.content?"\n":"")+snippet}));setRevision(v=>v+1);setAutosaveState("")}} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium">{label}</button>)}</div>
     <textarea aria-label="Article content" required minLength={30} rows={9} value={form.content} onChange={e=>field("content",e.target.value)} className="w-full rounded-xl border border-slate-200 p-4 text-sm font-normal" placeholder="Write your article here..."/>
    </>}
   </div>
   <div id="cms-panel-media" role="tabpanel" aria-labelledby="cms-tab-media" hidden={section!=="media"} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
     <div><p className="mb-2 text-sm font-semibold">Cover image</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#057cfa] px-5 py-3 text-sm font-semibold text-white"><FiUpload size={17}/>{uploading?"Uploading…":"Upload cover photo"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e=>{uploadImage(e.target.files?.[0],"cover");e.target.value=""}} className="sr-only"/></label><p className="mt-2 text-xs text-slate-500">JPG, PNG or WebP · Max 5 MB</p></div>
     {form.image&&<img src={form.image} alt={form.imageAlt||"Cover preview"} className="max-h-36 w-full rounded-xl object-contain"/>}
     <label className="text-sm font-semibold sm:col-span-2">Cover image URL<input value={form.image} onChange={e=>field("image",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal" placeholder="https://..."/></label>
     <label className="text-sm font-semibold sm:col-span-2">Image description (alt text)<input value={form.imageAlt} onChange={e=>field("imageAlt",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal"/></label>
    </div>
    <div className="border-t border-slate-100 pt-4"><p className="mb-2 text-sm font-semibold">Insert photo or diagram into the article</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#057cfa] bg-blue-50 px-5 py-3 text-sm font-semibold text-[#003cba]"><FiUpload size={17}/>{uploading?"Uploading…":"Upload inline image"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e=>{uploadImage(e.target.files?.[0],"inline");e.target.value=""}} className="sr-only"/></label><p className="mt-2 text-xs text-slate-500">Inserted into Markdown content automatically. Save the article afterwards.</p></div>
   </div>
   <div id="cms-panel-seo" role="tabpanel" aria-labelledby="cms-tab-seo" hidden={section!=="seo"} className="space-y-4">
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-bold">Publishing checklist</h3><span className={"text-xs font-semibold "+(ready?"text-green-700":"text-amber-700")}>{checks.filter(([,ok])=>ok).length}/{checks.length} complete</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{checks.map(([name,ok])=><p key={name} className={"text-xs "+(ok?"text-green-700":"text-slate-600")}><span aria-hidden="true">{ok?"✓":"○"}</span> {name}</p>)}</div><p className="mt-3 text-xs text-slate-500">All checks are required for publishing. Incomplete articles can still be saved as drafts.</p></div>
    <div className="grid gap-4 md:grid-cols-2">
     <label className="text-sm font-semibold md:col-span-2">SEO title<input value={form.seoTitle} onChange={e=>field("seoTitle",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal"/></label>
     <label className="text-sm font-semibold md:col-span-2">SEO description<textarea rows={3} value={form.seoDescription} onChange={e=>field("seoDescription",e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-normal"/></label>
     <label className="text-sm font-semibold">Language<select disabled={busy||uploading} value={form.language} onChange={e=>{void changeLanguage(e.target.value)}} className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 disabled:bg-slate-100"><option value="en">English</option><option value="de">German</option></select><span className="mt-1 block text-xs font-normal text-slate-500">{editing?"Switching creates a separate draft in the selected language; the original article stays unchanged.":"Choose the language before publishing."}</span></label>
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
