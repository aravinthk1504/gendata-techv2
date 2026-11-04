import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { blogUpdateSchema, publishingIssues } from "../../../../../lib/blog-validation";
import { currentAdmin } from "../../../../../lib/admin-auth";
import { db } from "../../../../../lib/firebase-admin";

export const runtime="nodejs";
const answer=(obj,status=200)=>NextResponse.json(obj,{status,headers:{"Cache-Control":"no-store"}});
function sameOrigin(req){try{return new URL(req.headers.get("origin")).host===req.headers.get("host")}catch{return false}}
export async function PATCH(request,{params}){
 const user=await currentAdmin();if(!user)return answer({error:"Unauthorized"},401);
 if(!sameOrigin(request))return answer({error:"Invalid origin"},403);
 const {id}=await params;if(!/^(en|de)_[a-z0-9-]{1,130}$/.test(id))return answer({error:"Invalid ID"},400);
 try{
  const raw=await request.text();if(Buffer.byteLength(raw,"utf8")>65000)return answer({error:"Content too large"},413);
  const parsed=blogUpdateSchema.safeParse(JSON.parse(raw));if(!parsed.success)return answer({error:"Invalid article",fields:parsed.error.flatten().fieldErrors},400);
  if(parsed.data.status==="published"){
   const issues=publishingIssues(parsed.data);
   if(Object.keys(issues).length)return answer({error:"Complete the publishing checklist",fields:issues},400);
  }
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
