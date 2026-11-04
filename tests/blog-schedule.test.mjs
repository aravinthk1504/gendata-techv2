import test from "node:test";
import assert from "node:assert/strict";
import { scheduleError, blogIsPublic, blogPublicDate } from "../src/lib/blog-schedule.mjs";

const now = Date.parse("2026-11-04T12:00:00.000Z");

test("drafts never appear, even with a past schedule date", () => {
  assert.equal(blogIsPublic({ status: "draft", scheduledFor: "2026-11-01T12:00:00.000Z" }, now), false);
});

test("published articles stay visible", () => {
  assert.equal(blogIsPublic({ status: "published", type: "article" }, now), true);
});

test("future scheduled articles remain private", () => {
  const item = { status: "scheduled", scheduledFor: "2026-11-05T12:00:00.000Z" };
  assert.equal(blogIsPublic(item, now), false);
  assert.equal(scheduleError(item, now), null);
});

test("scheduled articles are public on or after the exact time", () => {
  const item = { status: "scheduled", scheduledFor: "2026-11-04T12:00:00.000Z" };
  assert.equal(blogIsPublic(item, now - 1), false);
  assert.equal(blogIsPublic(item, now), true);
  assert.equal(blogPublicDate(item), item.scheduledFor);
});

test("invalid and past publishing times are rejected", () => {
  assert.ok(scheduleError({ status: "scheduled", scheduledFor: "" }, now));
  assert.ok(scheduleError({ status: "scheduled", scheduledFor: "invalid" }, now));
  assert.ok(scheduleError({ status: "scheduled", scheduledFor: "2026-11-04T12:00:00.000Z" }, now));
  assert.equal(scheduleError({ status: "draft", scheduledFor: "" }, now), null);
});

test("event records are never shown in public blog articles", () => {
  assert.equal(blogIsPublic({ status: "published", type: "event" }, now), false);
});
