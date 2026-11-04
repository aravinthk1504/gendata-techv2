import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { currentAdmin } from "../../../../../lib/admin-auth";
import { recordAdminEvent } from "../../../../../lib/admin-security";

export const runtime = "nodejs";
export async function POST(request) {
  const user = await currentAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  try {
    if (!origin || !host || new URL(origin).host !== host) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  try {
    // invalidate all of this account's Firebase sessions (including this one).
    await getAuth().revokeRefreshTokens(user.uid);
    await recordAdminEvent({ event: "revoke_sessions", actorUid: user.uid });
    const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set("gd_admin_session", "", {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "strict", path: "/", maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error("Admin session revocation failed", error?.code || error?.name);
    return NextResponse.json({ error: "Unable to revoke sessions" }, { status: 500 });
  }
}
