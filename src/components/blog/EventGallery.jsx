"use client";
import {useEffect,useState} from "react";
export default function EventGallery({photos=[]}){
 const [active,setActive]=useState(null);
 const items=photos.filter(p=>p?.url);
 useEffect(()=>{
  if(active===null)return;
  function keys(e){if(e.key==="Escape")setActive(null);if(e.key==="ArrowRight")setActive(i=>(i+1)%items.length);if(e.key==="ArrowLeft")setActive(i=>(i-1+items.length)%items.length)}
  window.addEventListener("keydown",keys);return()=>window.removeEventListener("keydown",keys)
 },[active,items.length]);
 if(!items.length)return null;
 const repeated=items.length>1?[...items,...items]:items;
 return <section className="mx-auto max-w-6xl overflow-hidden px-5 py-14">
  <h2 className="mb-5 text-2xl font-bold text-[#081b3a]">Event gallery</h2>
  <div className="group overflow-hidden rounded-2xl" aria-label="Event photo gallery">
   <div className={items.length>1?"flex w-max gap-4 motion-safe:animate-[eventGalleryScroll_45s_linear_infinite] hover:[animation-play-state:paused]":"flex gap-4"}>
    {repeated.map((photo,i)=><button type="button" key={i} onClick={()=>setActive(i%items.length)} className="w-56 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white text-left sm:w-80"><img src={photo.url} alt={photo.caption||"Event photograph"} loading="lazy" className="aspect-[4/3] w-full object-cover"/><p className="truncate px-3 py-2 text-sm text-slate-600">{photo.caption||"Event photo"}</p></button>)}
   </div>
  </div>
  {active!==null&&<div role="dialog" aria-modal="true" aria-label="Event photo viewer" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
   <button onClick={()=>setActive(null)} className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Close ✕</button>
   <button onClick={()=>setActive((active-1+items.length)%items.length)} aria-label="Previous photo" className="mr-3 rounded-full bg-white/20 px-3 py-2 text-white">←</button>
   <figure className="max-w-[80vw]"><img src={items[active].url} alt={items[active].caption||"Event photo"} className="max-h-[78vh] max-w-full object-contain"/><figcaption className="mt-3 text-center text-white">{items[active].caption}</figcaption></figure>
   <button onClick={()=>setActive((active+1)%items.length)} aria-label="Next photo" className="ml-3 rounded-full bg-white/20 px-3 py-2 text-white">→</button>
  </div>}
 </section>;
}
