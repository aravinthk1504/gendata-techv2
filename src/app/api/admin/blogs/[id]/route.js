import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { currentAdmin } from "../../../../../lib/admin-auth";
import { db } from "../../../../../lib/firebase-admin";

export const runtime="nodejs";
const schema=z.object({
 type:z.enum(["article","event"]).default("article"),
 eventDate:z.string().max(30).default(""),
 eventTime:z.string().max(50).default(""),
 location:z.string().max(180).default(""),
 eventMode:z.enum(["online","in-person","hybrid"]).default("online"),
 registrationUrl:z.union([z.literal(""),z.url().refine(x=>x.startsWith("https://"))]).default(""),
 title:z.string().trim().min(5).max(180),category:z.string().trim().min(2).max(80),
 excerpt:z.string().trim().min(10).max(500),content:z.string().trim().min(30).max(50000),
 seoTitle:z.string().trim().max(180),seoDescription:z.string().trim().max(320),
 image:z.union([z.literal(""),z.url().refine(v=>v.startsWith("https://"),"Use an HTTPS image URL")]),imageAlt:z.string().trim().max(180),
 status:z.enum(["draft","published"])
}).strict();
const answer=(obj,status=200)=>NextResponse.json(obj,{status,headers:{"Cache-Control":"no-store"}});
function sameOrigin(req){try{return new URL(req.headers.get("origin")).host===req.headers.get("host")}catch{return false}}
export async function PATCH(request,{params}){
 const user=await currentAdmin();if(!user)return answer({error:"Unauthorized"},401);
 if(!sameOrigin(request))return answer({error:"Invalid origin"},403);
 const {id}=await params;if(!/^(en|de)_[a-z0-9-]{1,130}$/.test(id))return answer({error:"Invalid ID"},400);
 try{
  const raw=await request.text();if(Buffer.byteLength(raw,"utf8")>65000)return answer({error:"Content too large"},413);
  const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return answer({error:"Invalid article",fields:parsed.error.flatten().fieldErrors},400);
  if(parsed.data.type==="event"&&(!/^\d{4}-\d{2}-\d{2}$/.test(parsed.data.eventDate)||!parsed.data.eventTime.trim()))return answer({error:"Event date and time are required"},400);
  const ref=db.collection("cmsBlogs").doc(id);
  await db.runTransaction(async tx=>{
   const snap=await tx.get(ref);if(!snap.exists)throw new Error("NOT_FOUND");
   const prev=snap.data();
   tx.update(ref,{...parsed.data,updatedAt:FieldValue.serverTimestamp(),updatedBy:user.uid,publishedAt:parsed.data.status==="published"?(prev.publishedAt||FieldValue.serverTimestamp()):null});
  });
  return answer({success:true,id});
 }catch(e){if(e instanceof SyntaxError)return answer({error:"Invalid JSON"},400);if(e.message==="NOT_FOUND")return answer({error:"Not found"},404);console.error("CMS update failed",e.code||e.name);return answer({error:"Unable to update article"},500)}
}

export async function DELETE(request,{params}){
 const user=await currentAdmin();
 if(!user)return answer({error:"Unauthorized"},401);
 if(!sameOrigin(request))return answer({error:"Invalid origin"},403);
 const {id}=await params;
 if(!/^(en|de)_[a-z0-9-]{1,130}$/.test(id))return answer({error:"Invalid ID"},400);
 try{
  const ref=db.collection("cmsBlogs").doc(id);
  const existing=await ref.get();
  if(!existing.exists)return answer({error:"Not found"},404);
  await ref.delete();
  return answer({success:true,id});
 }catch(error){
  console.error("CMS deletion failed",error?.code||error?.name||"unknown");
  return answer({error:"Unable to delete content"},500);
 }
}
