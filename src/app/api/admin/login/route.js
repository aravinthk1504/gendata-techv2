import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "../../../../lib/firebase-admin";

export const runtime = "nodejs";
const LIMIT = 8192;
function sameOrigin(req) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}
export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({error:"Invalid request origin"},{status:403});
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw) > LIMIT) return NextResponse.json({error:"Invalid request"},{status:400});
    const {email,password} = JSON.parse(raw);
    if (typeof email!=="string" || typeof password!=="string" || email.length>254 || password.length>1024) {
      return NextResponse.json({error:"Invalid credentials"},{status:401});
    }
    const apiKey=process.env.FIREBASE_WEB_API_KEY;
    const allowed=(process.env.ADMIN_UIDS||"").split(",").map(s=>s.trim()).filter(Boolean);
    if(!apiKey || !allowed.length) return NextResponse.json({error:"Admin login not configured"},{status:503});
    const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(apiKey)}`,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password,returnSecureToken:true}),cache:"no-store"
    });
    if(!response.ok) return NextResponse.json({error:"Invalid credentials"},{status:401});
    const auth=await response.json();
    if(!allowed.includes(auth.localId)) return NextResponse.json({error:"Access denied"},{status:403});
    const decoded=await getAuth().verifyIdToken(auth.idToken);
    if(Date.now()/1000-decoded.auth_time>300) return NextResponse.json({error:"Sign in again"},{status:401});
    const expiry=60*60*8*1000;
    const session=await getAuth().createSessionCookie(auth.idToken,{expiresIn:expiry});
    const result=NextResponse.json({success:true});
    result.cookies.set("gd_admin_session",session,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:expiry/1000});
    return result;
  }catch(error){
    console.error("Admin authentication failed",error?.code||error?.name||"unknown");
    return NextResponse.json({error:"Unable to sign in"},{status:500});
  }
}
