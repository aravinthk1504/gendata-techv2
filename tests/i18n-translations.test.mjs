import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

// The page components translate through tr("English text") with an inline
// translationsDE dictionary. A key that is missing silently shows English on a
// /de page, and an HTML entity inside a JS string is displayed literally.

function jsxFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? jsxFiles(full) : full.endsWith(".jsx") ? [full] : [];
  });
}

function read(file) {
  const source = fs.readFileSync(file, "utf8");
  const block = source.match(/const translationsDE\s*=\s*(\{[\s\S]*?\n?\})\s*(?:\n|;)/);
  if (!block) return null;
  const dictionary = vm.runInNewContext("(" + block[1] + ")");
  const keys = [...new Set([...source.matchAll(/\btr\(\s*(["`])((?:\\.|(?!\1)[^\\])*)\1\s*[,)]/g)].map(m => m[2]))];
  return { source, dictionary, keys, blockText: block[0] };
}

const files = jsxFiles("src/components/migrated").map(file => [file, read(file)]).filter(([, data]) => data);

test("the translated page components are found", () => {
  assert.ok(files.length >= 10, `found ${files.length}`);
});

for (const [file, data] of files) {
  const name = path.basename(file);

  test(`${name}: every tr() text has a German translation`, () => {
    const missing = data.keys.filter(key => !(key in data.dictionary));
    assert.deepEqual(missing, []);
  });

  test(`${name}: no HTML entities inside translated strings`, () => {
    const entity = /&(apos|quot|amp|lt|gt|#\d+);/;
    const offenders = [
      ...data.keys.filter(key => entity.test(key)),
      ...Object.entries(data.dictionary).flatMap(([key, value]) => [key, value]).filter(text => entity.test(text)),
    ];
    assert.deepEqual(offenders, []);
  });
}
