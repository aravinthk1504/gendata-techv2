import test from "node:test";
import assert from "node:assert/strict";
import { siteUrl, absoluteUrl, alternatesFor, STATIC_ROUTES, LANGUAGES } from "../src/lib/site.mjs";

test("siteUrl falls back to the default when SITE_URL is missing or invalid", () => {
  assert.equal(siteUrl({}), "https://gendatatech.com");
  assert.equal(siteUrl({ SITE_URL: "not a url" }), "https://gendatatech.com");
  assert.equal(siteUrl({ SITE_URL: "http://evil.example" }), "https://gendatatech.com");
});

test("siteUrl accepts https origins and strips paths and trailing slashes", () => {
  assert.equal(siteUrl({ SITE_URL: "https://staging.example.com/" }), "https://staging.example.com");
  assert.equal(siteUrl({ SITE_URL: "https://staging.example.com/en" }), "https://staging.example.com");
  assert.equal(siteUrl({ SITE_URL: "http://localhost:3000" }), "http://localhost:3000");
});

test("absoluteUrl joins origin and path", () => {
  assert.equal(absoluteUrl("/en/about", {}), "https://gendatatech.com/en/about");
});

test("alternatesFor gives a self canonical, both languages and x-default", () => {
  assert.deepEqual(alternatesFor("de", "/about"), {
    canonical: "/de/about",
    languages: { en: "/en/about", de: "/de/about", "x-default": "/en/about" },
  });
  assert.equal(alternatesFor("fr", "").canonical, "/en");
  assert.equal(alternatesFor("en", "").languages["x-default"], "/en");
});

test("static routes are unique, start with a slash and include the key pages", () => {
  assert.equal(new Set(STATIC_ROUTES).size, STATIC_ROUTES.length);
  for (const route of STATIC_ROUTES) assert.ok(route === "" || route.startsWith("/"));
  for (const must of ["", "/about", "/blog", "/contact", "/services/ai-ml-development"]) {
    assert.ok(STATIC_ROUTES.includes(must), must);
  }
  assert.deepEqual(LANGUAGES, ["en", "de"]);
});

import { defaultShareImage } from "../src/lib/site.mjs";

test("defaultShareImage points at the localized generated card", () => {
  assert.deepEqual(defaultShareImage("de"), { url: "/de/opengraph-image", width: 1200, height: 630, alt: "GenData Tech" });
  assert.equal(defaultShareImage("xx").url, "/en/opengraph-image");
});
