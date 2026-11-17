import "server-only";
import { db } from "./firebase-admin";
import { unstable_cache } from "next/cache";
import { blogIsPublic, blogPublicDate } from "./blog-schedule.mjs";
import { BLOG_CACHE_TAG, BLOG_REVALIDATE_SECONDS } from "./blog-cache.mjs";
async function readPublishedBlogs(lang="en",limit=100){
 const [published, scheduled] = await Promise.all([
  db.collection("cmsBlogs").where("status","==","published").get(),
  db.collection("cmsBlogs").where("status","==","scheduled").get(),
 ]);
 const now = Date.now();
 return [...published.docs, ...scheduled.docs].filter(doc=>blogIsPublic(doc.data(), now)).map(doc=>{
   const d=doc.data();
   return {id:doc.id,type:d.type||"article",eventDate:d.eventDate||"",eventTime:d.eventTime||"",location:d.location||"",eventMode:d.eventMode||"",registrationUrl:d.registrationUrl||"",slug:d.slug,title:d.title,category:d.category,excerpt:d.excerpt,image:d.image||"",imageAlt:d.imageAlt||"",language:d.language||"en",seoTitle:d.seoTitle||"",seoDescription:d.seoDescription||"",publishedDate:blogPublicDate(d),readTime:`${Math.max(1,Math.ceil((d.content||"").split(/\s+/).length/220))} min read`,updatedAt:d.updatedAt?.toDate?.()?.toISOString()||""};
 }).filter(item=>item.language===lang && item.type==="article").sort((a,b)=> (b.publishedDate||"").localeCompare(a.publishedDate||"")).slice(0,limit);
}
async function readPublishedBlog(lang,slug){
 const ref=await db.collection("cmsBlogs").doc(`${lang}_${slug}`).get();
 if(!ref.exists || !blogIsPublic(ref.data()))return null;
 const d=ref.data();
 return {type:d.type||"article",eventDate:d.eventDate||"",eventTime:d.eventTime||"",location:d.location||"",eventMode:d.eventMode||"",registrationUrl:d.registrationUrl||"",slug:d.slug,title:d.title,excerpt:d.excerpt,category:d.category,content:d.content||"",image:d.image||"",imageAlt:d.imageAlt||"",publishedDate:d.publishedAt?.toDate?.()?.toISOString()||"",seoTitle:d.seoTitle||"",seoDescription:d.seoDescription||"",updatedAt:d.updatedAt?.toDate?.()?.toISOString()||""};
}

const cacheOptions = { revalidate: BLOG_REVALIDATE_SECONDS, tags: [BLOG_CACHE_TAG] };

// Cached reads: Firestore is queried at most once per window (or after an admin
// change calls revalidateBlogContent). Errors are thrown, never cached.
export const getPublishedBlogs = unstable_cache(readPublishedBlogs, ["public-blogs-list"], cacheOptions);
export const getPublishedBlog = unstable_cache(readPublishedBlog, ["public-blog-article"], cacheOptions);

// For pages that should still render when Firestore is unreachable.
export async function getPublishedBlogsOrEmpty(lang, limit){
 try{
  return await getPublishedBlogs(lang, limit);
 }catch(error){
  console.error("Published blogs unavailable", error?.code || error?.name || "unknown");
  return [];
 }
}

// Lightweight read for the sitemap: no article bodies.
export async function getPublishedBlogEntries(){
 const [published, scheduled] = await Promise.all([
  db.collection("cmsBlogs").where("status","==","published").select("slug","language","type","status","scheduledFor","publishedAt","updatedAt").get(),
  db.collection("cmsBlogs").where("status","==","scheduled").select("slug","language","type","status","scheduledFor","publishedAt","updatedAt").get(),
 ]);
 const now = Date.now();
 return [...published.docs, ...scheduled.docs]
  .filter(doc=>blogIsPublic(doc.data(), now))
  .map(doc=>{const d=doc.data();return {slug:d.slug,language:d.language||"en",type:d.type||"article",lastModified:d.updatedAt?.toDate?.()||d.publishedAt?.toDate?.()||null};})
  .filter(item=>item.slug && item.type==="article" && ["en","de"].includes(item.language));
}
