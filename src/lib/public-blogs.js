import "server-only";
import { db } from "./firebase-admin";
export async function getPublishedBlogs(lang="en",limit=100){
 const snap=await db.collection("cmsBlogs").where("status","==","published").get();
 return snap.docs.map(doc=>{
   const d=doc.data();
   return {id:doc.id,type:d.type||"article",gallery:Array.isArray(d.gallery)?d.gallery:[],eventDate:d.eventDate||"",eventTime:d.eventTime||"",location:d.location||"",eventMode:d.eventMode||"",registrationUrl:d.registrationUrl||"",slug:d.slug,title:d.title,category:d.category,excerpt:d.excerpt,content:d.content||"",image:d.image||"",imageAlt:d.imageAlt||"",language:d.language||"en",seoTitle:d.seoTitle||"",seoDescription:d.seoDescription||"",publishedDate:d.publishedAt?.toDate?.()?.toISOString()||"",readTime:`${Math.max(1,Math.ceil((d.content||"").split(/\s+/).length/220))} min read`,updatedAt:d.updatedAt?.toDate?.()?.toISOString()||""};
 }).filter(item=>item.language===lang).sort((a,b)=> (b.publishedDate||"").localeCompare(a.publishedDate||"")).slice(0,limit);
}
export async function getPublishedBlog(lang,slug){
 const ref=await db.collection("cmsBlogs").doc(`${lang}_${slug}`).get();
 if(!ref.exists || ref.data().status!=="published")return null;
 const d=ref.data();
 return {type:d.type||"article",eventDate:d.eventDate||"",eventTime:d.eventTime||"",location:d.location||"",eventMode:d.eventMode||"",registrationUrl:d.registrationUrl||"",slug:d.slug,title:d.title,excerpt:d.excerpt,category:d.category,content:d.content||"",image:d.image||"",imageAlt:d.imageAlt||"",publishedDate:d.publishedAt?.toDate?.()?.toISOString()||"",seoTitle:d.seoTitle||"",seoDescription:d.seoDescription||""};
}
