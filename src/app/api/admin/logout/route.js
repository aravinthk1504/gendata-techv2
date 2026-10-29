import { NextResponse } from "next/server";
export async function POST(request) {
  const origin=request.headers.get("origin");
  const host=request.headers.get("host");
  if(!origin || !host || (()=>{try{return new URL(origin).host!==host}catch{return true}})())
    return NextResponse.json({error:"Invalid origin"},{status:403});
  const res=NextResponse.json({success:true});
  res.cookies.set("gd_admin_session","",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:0});
  return res;
}
