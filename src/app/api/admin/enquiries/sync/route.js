import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { createSign, randomUUID } from "node:crypto";
import { currentAdmin } from "../../../../../lib/admin-auth";
import { db } from "../../../../../lib/firebase-admin";

export const runtime = "nodejs";

// Existing Google workbook and its existing, previously empty enquiryForm tab.
// Never alter the other two management tabs or columns A:G for existing rows.
const SPREADSHEET_ID = "16kBU_nbQJWaVv8gFX52zfHIDJz0sNtQd3JS-TQNHkKs";
const TAB = "enquiryForm";
const BASE = "https://sheets.googleapis.com/v4/spreadsheets/" + SPREADSHEET_ID;
const ORIGINAL_HEADERS = ["Timestamp", "Name", "Email", "Phone", "Category", "Offering", "Message"];
const EXTRA_HEADERS = ["Status", "Latest follow-up note", "Firebase enquiry ID", "Last synced"];
const BATCH_SIZE = 250;
const MAX_RECORDS = 5000;

const reply = (payload, status = 200) => NextResponse.json(payload, {
  status, headers: { "Cache-Control": "no-store" },
});

function sameOrigin(request) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    return Boolean(origin && host && new URL(origin).host === host);
  } catch {
    return false;
  }
}

// RAW Sheets writes prevent formulas; also guard against spreadsheet formula
// injection when a manager later exports the same cells as CSV.
function safeText(value) {
  let text = String(value ?? "").replace(/\u0000/g, "");
  if (/^[\s\uFEFF]*[=+\-@]/u.test(text)) text = "'" + text;
  return text;
}

function timestamp(value) {
  return value?.toDate?.()?.toISOString() || "";
}

async function credentials() {
  let email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if ((!email || !privateKey) && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      const fromFile = JSON.parse(await readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"));
      email = email || fromFile.client_email;
      privateKey = privateKey || fromFile.private_key;
    } catch {
      throw new Error("Google service-account credentials could not be read");
    }
  }
  if (!email || !privateKey) throw new Error("Google service-account credentials are not configured");
  return { email, privateKey: privateKey.replace(/\\n/g, "\n") };
}

async function accessToken() {
  const { email, privateKey } = await credentials();
  const now = Math.floor(Date.now() / 1000);
  const encode = value => Buffer.from(JSON.stringify(value)).toString("base64url");
  const signingInput = encode({ alg: "RS256", typ: "JWT" }) + "." + encode({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3500,
  });
  const signature = createSign("RSA-SHA256").update(signingInput).end().sign(privateKey, "base64url");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signingInput + "." + signature,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("Google service-account authentication failed");
  const data = await response.json();
  if (!data.access_token) throw new Error("Google did not provide a Sheets access token");
  return data.access_token;
}

async function sheetsRequest(token, path, method = "GET", body) {
  const response = await fetch(BASE + path, {
    method,
    headers: {
      Authorization: "Bearer " + token,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Google Sheets access denied. Share this workbook with your service-account email as Editor and enable the Sheets API.");
    }
    if (response.status === 404) throw new Error("Google spreadsheet or enquiryForm tab is not accessible");
    throw new Error("Google Sheets request failed (HTTP " + response.status + ")");
  }
  return response.json();
}

function range(a1) {
  return encodeURIComponent("'" + TAB.replace(/'/g, "''") + "'!" + a1);
}

async function getAllEnquiries() {
  let last = null;
  const records = [];
  while (true) {
    let query = db.collection("enquiries").orderBy("createdAt", "asc").limit(BATCH_SIZE);
    if (last) query = query.startAfter(last);
    const snapshot = await query.get();
    records.push(...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    if (records.length > MAX_RECORDS) throw new Error("More than 5000 enquiries; increase the server sync batch limit before proceeding");
    if (snapshot.size < BATCH_SIZE) break;
    last = snapshot.docs[snapshot.docs.length - 1];
  }
  return records;
}

async function performSync(token) {
  const data = await sheetsRequest(token, "/values/" + range("A1:K") + "?valueRenderOption=FORMATTED_VALUE");
  const rows = data.values || [];
  const headers = rows[0] || [];
  const normalize = value => String(value || "").trim().toLowerCase();
  if (ORIGINAL_HEADERS.some((header, index) => normalize(headers[index]) !== normalize(header))) {
    throw new Error("The original enquiryForm columns A:G have changed; sync stopped without changing the workbook");
  }
  const extras = EXTRA_HEADERS.map((title, index) => normalize(headers[index + 7]) === normalize(title));
  if (EXTRA_HEADERS.some((title, index) => headers[index + 7] && !extras[index])) {
    throw new Error("enquiryForm columns H:K already contain other headers; sync stopped to preserve them");
  }

  const rowById = new Map();
  rows.forEach((row, index) => {
    const id = String(row[9] || "").trim();
    if (!id || index === 0) return;
    if (rowById.has(id)) throw new Error("Duplicate Firebase enquiry IDs in the Google Sheet; resolve them before syncing");
    rowById.set(id, { number: index + 1, cells: row });
  });

  const records = await getAllEnquiries();
  const now = new Date().toISOString();
  const append = [];
  const updates = [];
  for (const record of records) {
    const id = record.id;
    const status = safeText(record.status || "new");
    const lastNote = safeText(record.lastNote || "");
    const existing = rowById.get(id);
    if (!existing) {
      append.push([
        timestamp(record.createdAt), safeText(record.name), safeText(record.email),
        safeText(record.phone), safeText(record.category), safeText(record.offering),
        safeText(record.message), status, lastNote, id, now,
      ]);
    } else if (String(existing.cells[7] || "") !== status || String(existing.cells[8] || "") !== lastNote) {
      updates.push({
        range: "'" + TAB + "'!H" + existing.number + ":I" + existing.number,
        values: [[status, lastNote]],
      }, {
        range: "'" + TAB + "'!K" + existing.number,
        values: [[now]],
      });
    }
  }

  // Set only the additional metadata headers, retaining all original headers
  // and every other tab. If a later operation fails, a retry is idempotent.
  if (extras.some(ok => !ok)) {
    await sheetsRequest(token, "/values/" + range("H1:K1") + "?valueInputOption=RAW", "PUT", {
      majorDimension: "ROWS", values: [EXTRA_HEADERS],
    });
  }
  // Existing manager-edited columns A:G are never overwritten.
  if (updates.length) {
    await sheetsRequest(token, "/values:batchUpdate", "POST", {
      valueInputOption: "RAW", data: updates,
    });
  }
  if (append.length) {
    // Append in bounded chunks to avoid oversized Sheets API requests.
    for (let offset = 0; offset < append.length; offset += 200) {
      await sheetsRequest(
        token, "/values/" + range("A:K") + ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS",
        "POST", { majorDimension: "ROWS", values: append.slice(offset, offset + 200) },
      );
    }
  }
  return { added: append.length, updated: updates.length / 2, total: records.length, tab: TAB };
}

async function obtainLock(owner) {
  const lock = db.collection("_adminInternal").doc("googleEnquirySync");
  await db.runTransaction(async tx => {
    const snapshot = await tx.get(lock);
    if ((snapshot.get("lockedUntil") || 0) > Date.now()) throw new Error("SYNC_RUNNING");
    tx.set(lock, { owner, lockedUntil: Date.now() + 10 * 60 * 1000 });
  });
  return lock;
}

async function releaseLock(ref, owner) {
  await db.runTransaction(async tx => {
    const snapshot = await tx.get(ref);
    if (snapshot.exists && snapshot.get("owner") === owner) tx.delete(ref);
  });
}

export async function POST(request) {
  if (!await currentAdmin()) return reply({ error: "Unauthorized" }, 401);
  if (!sameOrigin(request)) return reply({ error: "Invalid request origin" }, 403);
  if (process.env.GOOGLE_SHEETS_SYNC_ENABLED !== "true") {
    return reply({ error: "Google Sheets sync is disabled. Restrict workbook sharing, grant Editor access to the service account, then set GOOGLE_SHEETS_SYNC_ENABLED=true." }, 503);
  }
  let lock = null;
  const owner = randomUUID();
  try {
    lock = await obtainLock(owner);
    const token = await accessToken();
    const result = await performSync(token);
    return reply({ success: true, ...result });
  } catch (error) {
    if (error?.message === "SYNC_RUNNING") return reply({ error: "A spreadsheet sync is already in progress" }, 409);
    console.error("Admin Google Sheet sync failed", error?.code || error?.name || "unknown");
    return reply({ error: error?.message || "Unable to sync the Google spreadsheet" }, 502);
  } finally {
    if (lock) {
      try { await releaseLock(lock, owner); }
      catch (error) { console.error("Google Sheet sync lock release failed", error?.code || error?.name); }
    }
  }
}
