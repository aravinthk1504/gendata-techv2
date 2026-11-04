import "server-only";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import "./firebase-admin";
import { adminUidAllowlist, approvedAdminUid } from "./admin-allowlist.mjs";

export async function currentAdmin() {
  const allowed = adminUidAllowlist(process.env.ADMIN_UIDS);
  if (!allowed.size) return null;
  const session = (await cookies()).get("gd_admin_session")?.value;
  if (!session) return null;
  try {
    const user = await getAuth().verifySessionCookie(session, true);
    return approvedAdminUid(user.uid, allowed) ? user : null;
  } catch {
    return null;
  }
}
