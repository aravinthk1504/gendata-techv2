import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "../../../../lib/firebase-admin";
import {
  checkAdminLoginLimit, registerAdminLoginFailure, clearAdminLoginFailures,
  normalizedLoginEmail, recordAdminEvent,
} from "../../../../lib/admin-security";

export const runtime = "nodejs";
const BODY_LIMIT = 8192;
const genericFailure = () => NextResponse.json(
  { error: "Invalid credentials or access unavailable" },
  { status: 401, headers: { "Cache-Control": "no-store" } },
);

const lockResponse = seconds => NextResponse.json(
  { error: "Too many failed sign-in attempts. Please try again in 10 minutes." },
  {
    status: 429,
    headers: {
      "Retry-After": String(Math.max(1, seconds)),
      "Cache-Control": "no-store",
    },
  },
);

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

export async function POST(request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > BODY_LIMIT) return genericFailure();
    const body = JSON.parse(raw);
    const email = normalizedLoginEmail(body?.email);
    const password = body?.password;

    if (!email || !email.includes("@") || email.length > 254 ||
        typeof password !== "string" || !password || password.length > 1024) {
      return genericFailure();
    }

    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    const allowed = (process.env.ADMIN_UIDS || "").split(",").map(x => x.trim()).filter(Boolean);
    if (!apiKey || !allowed.length) {
      return NextResponse.json({ error: "Admin login not configured" }, { status: 503 });
    }

    // Check before contacting Firebase. This includes unknown email addresses,
    // and blocks correct passwords during a temporary lock.
    const status = await checkAdminLoginLimit(email);
    if (status.blocked) return lockResponse(status.retryAfter);

    let adminUser = null;
    try {
      adminUser = await getAuth().getUserByEmail(email);
    } catch (error) {
      if (error?.code !== "auth/user-not-found" && error?.code !== "auth/invalid-email") throw error;
    }
    const approved = Boolean(adminUser && allowed.includes(adminUser.uid) && !adminUser.disabled);

    async function rejectAttempt() {
      const failed = await registerAdminLoginFailure(email);
      if (approved) {
        await recordAdminEvent({
          event: failed.blocked ? "login_limited" : "login_failed",
          actorUid: adminUser.uid,
        });
      }
      return failed.blocked ? lockResponse(failed.retryAfter) : genericFailure();
    }

    if (!approved) return await rejectAttempt();

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      },
    );

    if (!response.ok) {
      // Provider-side service errors must not lock an account as a bad password.
      if (response.status >= 500) {
        return NextResponse.json({ error: "Authentication service unavailable" }, { status: 503 });
      }
      return await rejectAttempt();
    }

    const authentication = await response.json();
    if (authentication.localId !== adminUser.uid || !allowed.includes(authentication.localId)) {
      return await rejectAttempt();
    }
    const decoded = await getAuth().verifyIdToken(authentication.idToken);
    if (Date.now() / 1000 - decoded.auth_time > 300) return genericFailure();

    // Reserve a final check before issuing a session so parallel requests cannot
    // trivially skip a lock imposed by other failed requests.
    const afterAuthentication = await checkAdminLoginLimit(email);
    if (afterAuthentication.blocked) return lockResponse(afterAuthentication.retryAfter);

    const expiry = 8 * 60 * 60 * 1000;
    const session = await getAuth().createSessionCookie(authentication.idToken, { expiresIn: expiry });
    await clearAdminLoginFailures(email);
    await recordAdminEvent({ event: "login_success", actorUid: adminUser.uid });

    const result = NextResponse.json({ success: true }, {
      headers: { "Cache-Control": "no-store" },
    });
    result.cookies.set("gd_admin_session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: expiry / 1000,
    });
    return result;
  } catch (error) {
    if (error instanceof SyntaxError) return genericFailure();
    console.error("Admin authentication failed", error?.code || error?.name || "unknown");
    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
