import { NextResponse } from "next/server";
import { currentAdmin } from "../../../../lib/admin-auth";
export const runtime="nodejs";
const MAX_BYTES=5*1024*1024;
const json=(data,status=200)=>NextResponse.json(data,{status,headers:{"Cache-Control":"no-store"}});
function sameOrigin(req){try{return new URL(req.headers.get("origin")).host===req.headers.get("host")}catch{return false}}
export async function POST(req){
 if(!await currentAdmin())return json({error:"Unauthorized"},401);
 if(!sameOrigin(req))return json({error:"Invalid origin"},403);
 const cloud=process.env.CLOUDINARY_CLOUD_NAME, key=process.env.CLOUDINARY_API_KEY, secret=process.env.CLOUDINARY_API_SECRET;
 if(!cloud||!key||!secret)return json({error:"Cloudinary is not configured on the server"},503);
 if(!/^[a-zA-Z0-9_-]+$/.test(cloud))return json({error:"Invalid Cloudinary configuration"},503);
 const length=Number(req.headers.get("content-length"));
 if(length>MAX_BYTES+20000)return json({error:"Image exceeds 5 MB limit"},413);
 try{
  const form=await req.formData();
  const file=form.get("file");
  if(!file||typeof file==="string"||!["image/jpeg","image/png","image/webp"].includes(file.type))return json({error:"Upload a JPG, PNG or WebP image"},400);
  if(file.size>MAX_BYTES||file.size===0)return json({error:"Image must be under 5 MB"},413);
  const bytes=Buffer.from(await file.arrayBuffer());
  const jpg=bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff;
  const png=bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const webp=bytes.toString("ascii",0,4)==="RIFF"&&bytes.toString("ascii",8,12)==="WEBP";
  if(!(jpg||png||webp))return json({error:"Invalid image data"},400);
  const kind=form.get("kind")==="event"?"events":"articles";
  const payload=new FormData();
  payload.set("file",new Blob([bytes],{type:file.type}),"upload-image");
  payload.set("folder",`gendata-tech/${kind}`);
  const auth=Buffer.from(`${key}:${secret}`).toString("base64");
  const result=await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`,{method:"POST",headers:{Authorization:`Basic ${auth}`},body:payload,cache:"no-store",signal:AbortSignal.timeout(30000)});
  const data=await result.json();
  if(!result.ok||!data.secure_url){console.error("Cloudinary upload rejected",result.status);return json({error:"Cloudinary upload failed. Check account settings and free-tier limits."},502)}
  return json({url:data.secure_url,publicId:data.public_id,width:data.width,height:data.height});
 }catch(e){console.error("Media upload failed",e.name||"unknown");return json({error:"Unable to upload image"},500)}
}
