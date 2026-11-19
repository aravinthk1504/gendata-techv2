import test from "node:test";
import assert from "node:assert/strict";
import { withTimeout } from "../src/lib/with-timeout.mjs";

const later = (ms, value, fail = false) => new Promise((resolve, reject) =>
  setTimeout(() => (fail ? reject(new Error(value)) : resolve(value)), ms));

test("resolves with the value when the call is fast enough", async () => {
  assert.equal(await withTimeout(later(5, "ok"), 200), "ok");
});

test("rejects with a labelled error when the call is too slow", async () => {
  await assert.rejects(withTimeout(later(200, "late"), 10, "Firestore read"), /Firestore read timed out after 10 ms/);
});

test("passes through the original rejection", async () => {
  await assert.rejects(withTimeout(later(5, "boom", true), 200), /boom/);
});

test("does not leave a pending timer behind after a fast call", async () => {
  const started = Date.now();
  await withTimeout(later(5, "ok"), 5000);
  assert.ok(Date.now() - started < 1000);
});
