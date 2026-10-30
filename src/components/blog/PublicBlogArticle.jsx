import Link from "next/link";
import MarkdownContent from "./MarkdownContent";
export default function PublicBlogArticle({post,lang}){
 return <main className="min-h-screen bg-white">
  <section className="bg-[#06142f] px-5 pb-16 pt-32 text-white sm:pt-40">
   <div className="mx-auto max-w-4xl"><Link href={`/${lang}/blog`} className="text-sm text-cyan-300">← Back to Insights</Link>
   <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{post.type==="event"?"Event":"Article"} / {post.category}</p>
   <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
   <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{post.excerpt}</p>
   {post.type==="event"&&<div className="mt-5 flex flex-wrap gap-3 text-sm text-white"><span>{post.eventDate||"Date to be announced"}{post.eventTime?` · ${post.eventTime}`:""}</span><span>{post.eventMode==="in-person"?"In person":post.eventMode==="hybrid"?"Hybrid":"Online"}{post.location?` · ${post.location}`:""}</span></div>}
   {post.type==="event"&&post.registrationUrl&&<a className="mt-6 inline-flex rounded-full bg-[#057cfa] px-6 py-3 text-sm font-semibold text-white" href={post.registrationUrl} rel="noopener noreferrer" target="_blank">Register for event</a>}
   {post.publishedDate&&<p className="mt-5 text-sm text-slate-400">Published {new Date(post.publishedDate).toLocaleDateString(lang==="de"?"de-DE":"en-GB")}</p>}
   </div>
  </section>
  <article className="mx-auto max-w-4xl px-5 py-14">
   {post.image&&<img src={post.image} alt={post.imageAlt||post.title} className="mb-10 aspect-video w-full rounded-2xl object-cover"/>}
   <MarkdownContent content={post.content}/>
  </article>
 </main>;
}
