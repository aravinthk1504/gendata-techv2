import test from "node:test";
import assert from "node:assert/strict";
import { getPageMetadata } from "../src/i18n/pageMetadata.js";

const ROUTES = [
  "about", "services", "services/ai-ml-development", "services/full-stack-development",
  "services/web-development", "services/software-development", "services/app-development",
  "services/iot-solutions", "products", "training", "blog", "contact",
];

test("page titles name the brand once and stay short enough for search results", () => {
  for (const lang of ["en", "de"]) {
    for (const route of ROUTES) {
      const { title } = getPageMetadata(lang, route);
      assert.equal(title.split("GenData Tech").length - 1, 1, `${lang} ${route}: "${title}"`);
      assert.ok(title.length <= 60, `${lang} ${route}: ${title.length} chars`);
    }
  }
});

test("titles are unique within each language", () => {
  for (const lang of ["en", "de"]) {
    const titles = ROUTES.map(route => getPageMetadata(lang, route).title);
    assert.equal(new Set(titles).size, titles.length, lang);
  }
});

test("every page has a description and canonical/hreflang alternates", () => {
  for (const lang of ["en", "de"]) {
    for (const route of ROUTES) {
      const meta = getPageMetadata(lang, route);
      assert.ok(meta.description.length > 40, `${lang} ${route}`);
      assert.equal(meta.alternates.canonical, `/${lang}/${route}`);
      assert.equal(meta.alternates.languages["x-default"], `/en/${route}`);
    }
  }
});
