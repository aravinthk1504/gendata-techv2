import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { currentAdmin } from "../../../../lib/admin-auth";
import { db } from "../../../../lib/firebase-admin";

export const runtime = "nodejs";
const schema=z.object({
 type:z.enum(["article","event"]).default("article"),
 gallery:z.array(z.object({url:z.url().refine(v=>v.startsWith("https://")),caption:z.string().max(180)}).strict()).max(30).default([]),
 eventDate:z.string().max(30).default(""),
 eventTime:z.string().max(50).default(""),
 location:z.string().max(180).default(""),
 eventMode:z.enum(["online","in-person","hybrid"]).default("online"),
 registrationUrl:z.union([z.literal(""),z.url().refine(x=>x.startsWith("https://"))]).default(""),
 title:z.string().trim().min(5).max(180),
 slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(130),
 category:z.string().trim().min(2).max(80),
 excerpt:z.string().trim().min(10).max(500),
 content:z.string().trim().min(30).max(50000),
 seoTitle:z.string().trim().max(180).default(""),
 seoDescription:z.string().trim().max(320).default(""),
 image:z.union([z.literal(""),z.url().refine(v=>v.startsWith("https://"),"Use an HTTPS image URL")]).default(""),
 imageAlt:z.string().trim().max(180).default(""),
 language:z.enum(["en","de"]).default("en"),
 status:z.enum(["draft","published"]).default("draft")
}).strict();
function sameOrigin(req){try{return new URL(req.headers.get("origin")).host===req.headers.get("host")}catch{return false}}
function response(body,status=200){return NextResponse.json(body,{status,headers:{"Cache-Control":"no-store"}})}
export async function GET(){
 if(!await currentAdmin())return response({error:"Unauthorized"},401);
 try{
  const result=await db.collection("cmsBlogs").orderBy("updatedAt","desc").limit(100).get();
  return response({blogs:result.docs.map(doc=>{const d=doc.data();return {id:doc.id,...d,createdAt:d.createdAt?.toDate?.()?.toISOString()||null,updatedAt:d.updatedAt?.toDate?.()?.toISOString()||null,publishedAt:d.publishedAt?.toDate?.()?.toISOString()||null}})});
 }catch(e){console.error("CMS read failed",e.code||e.name);return response({error:"Unable to load blogs"},500)}
}
export async function POST(request){
 const user=await currentAdmin();
 if(!user)return response({error:"Unauthorized"},401);
 if(!sameOrigin(request))return response({error:"Invalid origin"},403);
 try{
  const raw=await request.text();
  if(Buffer.byteLength(raw,"utf8")>65000)return response({error:"Content too large"},413);
  const parsed=schema.safeParse(JSON.parse(raw));
  if(!parsed.success)return response({error:"Invalid article",fields:parsed.error.flatten().fieldErrors},400);
  const data=parsed.data;
  if(data.type==="event"&&(!/^\d{4}-\d{2}-\d{2}$/.test(data.eventDate)||!data.eventTime.trim()))return response({error:"Event date and time are required"},400);
  const id=`${data.language}_${data.slug}`;
  const ref=db.collection("cmsBlogs").doc(id);
  const existing=await ref.get();
  if(existing.exists)return response({error:"This slug already exists for that language"},409);
  await ref.create({...data,createdBy:user.uid,updatedBy:user.uid,createdAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp(),publishedAt:data.status==="published"?FieldValue.serverTimestamp():null});
  return response({success:true,id},201);
 }catch(e){if(e instanceof SyntaxError)return response({error:"Invalid JSON"},400);console.error("CMS create failed",e.code||e.name);return response({error:"Unable to create article"},500)}
}
