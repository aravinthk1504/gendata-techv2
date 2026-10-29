import "server-only";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import "./firebase-admin";

export async function currentAdmin() {
  const allowed = (process.env.ADMIN_UIDS || "").split(",").map(x => x.trim()).filter(Boolean);
  if (!allowed.length) return null;
  const session = (await cookies()).get("gd_admin_session")?.value;
  if (!session) return null;
  try {
    const user = await getAuth().verifySessionCookie(session, true);
    return allowed.includes(user.uid) ? user : null;
  } catch {
    return null;
  }
}
