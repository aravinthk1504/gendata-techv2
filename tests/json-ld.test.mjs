import test from "node:test";
import assert from "node:assert/strict";
import {
  serializeJsonLd, faqSchema, articleSchema, organizationSchema, websiteSchema,
} from "../src/lib/json-ld.mjs";

test("serializeJsonLd cannot break out of a script tag", () => {
  const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.ok(!out.includes("<"));
  assert.equal(JSON.parse(out).name, "</script><script>alert(1)</script>");
});

test("serializeJsonLd escapes line and paragraph separators", () => {
  const out = serializeJsonLd({ text: "a\u2028b\u2029c" });
  assert.ok(!out.includes("\u2028") && !out.includes("\u2029"));
  assert.equal(JSON.parse(out).text, "a\u2028b\u2029c");
});

test("faqSchema skips incomplete items and returns null when nothing is left", () => {
  const schema = faqSchema([
    { question: "Q1?", answer: "A1" },
    { question: "", answer: "A2" },
    { question: "Q3?" },
    null,
  ]);
  assert.equal(schema["@type"], "FAQPage");
  assert.equal(schema.mainEntity.length, 1);
  assert.equal(schema.mainEntity[0].acceptedAnswer.text, "A1");
  assert.equal(faqSchema([]), null);
  assert.equal(faqSchema(), null);
});

test("articleSchema builds an absolute URL and falls back dateModified to the publish date", () => {
  const schema = articleSchema({
    lang: "en", slug: "hello-world", title: "Hello", description: "D",
    image: "https://res.cloudinary.com/x/y.jpg", publishedDate: "2026-01-02T00:00:00.000Z", updatedAt: "",
  });
  assert.equal(schema.mainEntityOfPage["@id"], "https://gendatatech.com/en/blog/hello-world");
  assert.equal(schema.dateModified, "2026-01-02T00:00:00.000Z");
  assert.deepEqual(schema.image, ["https://res.cloudinary.com/x/y.jpg"]);
  assert.ok(articleSchema({ lang: "en", slug: "s", title: "x".repeat(300) }).headline.length <= 110);
});

test("organization and website schemas link to each other and use absolute URLs", () => {
  const org = organizationSchema();
  const site = websiteSchema("de");
  assert.equal(org["@type"], "Organization");
  assert.ok(org.logo.startsWith("https://"));
  assert.equal(site.publisher["@id"], org["@id"]);
  assert.equal(site.inLanguage, "de");
});
