import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "../../../../lib/firebase-admin";
import {
  reserveAdminLoginAttempt, clearAdminLoginAttempts, recordAdminEvent,
} from "../../../../lib/admin-security";

export const runtime = "nodejs";
const LIMIT = 8192;
const genericFailure = () => NextResponse.json(
  { error: "Invalid credentials or access unavailable" },
  { status: 401, headers: { "Cache-Control": "no-store" } },
);

function sameOrigin(req) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > LIMIT) return genericFailure();
    const body = JSON.parse(raw);
    const email = body?.email;
    const password = body?.password;
    if (typeof email !== "string" || typeof password !== "string" ||
      !email.trim() || !password || email.length > 254 || password.length > 1024) {
      return genericFailure();
    }

    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    const allowed = (process.env.ADMIN_UIDS || "").split(",").map(s => s.trim()).filter(Boolean);
    if (!apiKey || !allowed.length) return NextResponse.json(
      { error: "Admin login not configured" }, { status: 503 },
    );

    // Look up approved UID server-side before checking a password. This lets
    // Firestore enforce a shared login limit across all Next.js instances;
    // external clients never receive the UID or a user-existence signal.
    let adminUser;
    try {
      adminUser = await getAuth().getUserByEmail(email.trim());
    } catch (error) {
      if (error?.code === "auth/user-not-found") return genericFailure();
      throw error;
    }
    if (!allowed.includes(adminUser.uid) || adminUser.disabled) return genericFailure();

    const reservation = await reserveAdminLoginAttempt(adminUser.uid);
    if (!reservation.allowed) {
      await recordAdminEvent({ event: "login_limited", actorUid: adminUser.uid });
      return NextResponse.json({ error: "Too many attempts. Try again later." }, {
        status: 429,
        headers: {
          "Retry-After": String(reservation.retryAfter),
          "Cache-Control": "no-store",
        },
      });
    }

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, returnSecureToken: true }),
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      },
    );
    if (!response.ok) {
      await recordAdminEvent({ event: "login_failed", actorUid: adminUser.uid });
      return genericFailure();
    }
    const authentication = await response.json();
    if (authentication.localId !== adminUser.uid || !allowed.includes(authentication.localId)) {
      return genericFailure();
    }
    const decoded = await getAuth().verifyIdToken(authentication.idToken);
    if (Date.now() / 1000 - decoded.auth_time > 300) return genericFailure();

    const expiry = 60 * 60 * 8 * 1000;
    const session = await getAuth().createSessionCookie(authentication.idToken, { expiresIn: expiry });
    await clearAdminLoginAttempts(adminUser.uid);
    await recordAdminEvent({ event: "login_success", actorUid: adminUser.uid });
    const result = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
    result.cookies.set("gd_admin_session", session, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "strict", path: "/", maxAge: expiry / 1000,
    });
    return result;
  } catch (error) {
    if (error instanceof SyntaxError) return genericFailure();
    console.error("Admin authentication failed", error?.code || error?.name || "unknown");
    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
