import Link from "next/link";
import MarkdownContent from "./MarkdownContent";
export default function PublicBlogArticle({post,lang}){
 return <main className="min-h-screen bg-white">
  <section className="bg-[#06142f] px-5 pb-16 pt-32 text-white sm:pt-40">
   <div className="mx-auto max-w-4xl"><Link href={`/${lang}/blog`} className="text-sm text-cyan-300">← Back to Insights</Link>
   <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{post.category}</p>
   <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
   <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{post.excerpt}</p>
   {post.publishedDate&&<p className="mt-5 text-sm text-slate-400">Published {new Date(post.publishedDate).toLocaleDateString(lang==="de"?"de-DE":"en-GB")}</p>}
   </div>
  </section>
  <article className="mx-auto max-w-4xl px-5 py-14">
   {post.image&&<img src={post.image} alt={post.imageAlt||post.title} className="mb-10 aspect-video w-full rounded-2xl object-cover"/>}
   <MarkdownContent content={post.content}/>
  </article>
 </main>;
}
