import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { blogSchema, publishingIssues } from "../../../../lib/blog-validation";
import { currentAdmin } from "../../../../lib/admin-auth";
import { db } from "../../../../lib/firebase-admin";
import { recordAdminEvent } from "../../../../lib/admin-security";

export const runtime = "nodejs";
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
  const parsed=blogSchema.safeParse(JSON.parse(raw));
  if(!parsed.success)return response({error:"Invalid article",fields:parsed.error.flatten().fieldErrors},400);
  const data=parsed.data;
  if(data.status!=="draft"){
   const issues=publishingIssues(data);
   if(Object.keys(issues).length)return response({error:"Complete the publishing checklist",fields:issues},400);
  }
  const id=`${data.language}_${data.slug}`;
  const ref=db.collection("cmsBlogs").doc(id);
  const existing=await ref.get();
  if(existing.exists)return response({error:"This slug already exists for that language"},409);
  await ref.create({...data,createdBy:user.uid,updatedBy:user.uid,createdAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp(),publishedAt:data.status==="published"?FieldValue.serverTimestamp():null});
  await recordAdminEvent({event:"blog_created",actorUid:user.uid,target:id});
  return response({success:true,id},201);
 }catch(e){if(e instanceof SyntaxError)return response({error:"Invalid JSON"},400);console.error("CMS create failed",e.code||e.name);return response({error:"Unable to create article"},500)}
}
