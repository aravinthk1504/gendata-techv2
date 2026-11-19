import { NextResponse } from "next/server";
import { isSameOriginRequest } from "../../../../lib/request-origin";
import { currentAdmin } from "../../../../lib/admin-auth";
import { recordAdminEvent } from "../../../../lib/admin-security";

export const runtime = "nodejs";
export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const user = await currentAdmin();
  if (user) await recordAdminEvent({ event: "logout", actorUid: user.uid });
  const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set("gd_admin_session", "", {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "strict", path: "/", maxAge: 0,
  });
  return response;
}
