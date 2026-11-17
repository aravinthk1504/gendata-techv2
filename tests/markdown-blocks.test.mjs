import test from "node:test";
import assert from "node:assert/strict";
import { parseBlocks, parseInline } from "../src/lib/markdown-blocks.mjs";

test("consecutive bullet lines become one list, numbered lines one ordered list", () => {
  const blocks = parseBlocks("Intro\n- one\n- two\n\n1. first\n2) second\nOutro");
  assert.deepEqual(blocks.map(b => b.type), ["paragraph", "ul", "ol", "paragraph"]);
  assert.deepEqual(blocks[1].items, ["one", "two"]);
  assert.deepEqual(blocks[2].items, ["first", "second"]);
});

test("the toolbar's bare '- ' snippet is still a list item", () => {
  assert.deepEqual(parseBlocks("- ")[0], { type: "ul", items: [""] });
});

test("headings map # and ## to h2 and ### to h3", () => {
  const blocks = parseBlocks("# A\n## B\n### C");
  assert.deepEqual(blocks.map(b => b.level), [2, 2, 3]);
  assert.equal(blocks[0].large, true);
});

test("images must be https and sit on their own line", () => {
  assert.equal(parseBlocks("![alt text](https://x.test/a.webp)")[0].type, "image");
  assert.equal(parseBlocks("![alt text](http://x.test/a.webp)")[0].type, "paragraph");
  assert.equal(parseBlocks("![alt](javascript:alert(1))")[0].type, "paragraph");
});

test("code fences keep their content literally, including markdown and angle brackets", () => {
  const [block] = parseBlocks("```\n# not a heading\n<script>x</script>\n```");
  assert.deepEqual(block, { type: "code", text: "# not a heading\n<script>x</script>" });
  assert.equal(parseBlocks("```\nunterminated")[0].text, "unterminated");
});

test("blockquotes merge consecutive quoted lines", () => {
  assert.deepEqual(parseBlocks("> one\n> two")[0], { type: "quote", text: "one two" });
});

test("pipe tables need a separator row and trim ragged rows to the header width", () => {
  const [table] = parseBlocks("| Tool | Use |\n| --- | --- |\n| A | b |\n| C | d | extra |");
  assert.equal(table.type, "table");
  assert.deepEqual(table.header, ["Tool", "Use"]);
  assert.deepEqual(table.rows, [["A", "b"], ["C", "d"]]);
  assert.equal(parseBlocks("a | b\nno separator")[0].type, "paragraph");
});

test("blank lines produce no blocks and plain lines stay separate paragraphs", () => {
  assert.deepEqual(parseBlocks("one\n\n\ntwo").map(b => b.text), ["one", "two"]);
  assert.deepEqual(parseBlocks(""), []);
  assert.deepEqual(parseBlocks(undefined), []);
});

test("inline parsing handles bold, italic, code and https/http links only", () => {
  const tokens = parseInline("a **b** *c* `d` [e](https://x.test) [f](javascript:alert(1))");
  assert.deepEqual(tokens.filter(t => t.type !== "text").map(t => t.type), ["strong", "em", "code", "link"]);
  assert.equal(tokens.find(t => t.type === "link").href, "https://x.test");
  assert.ok(tokens.some(t => t.type === "text" && t.text.includes("javascript:")), "unsafe link stays plain text");
});

test("HTML in article text is never turned into markup tokens", () => {
  const tokens = parseInline("<img src=x onerror=alert(1)> text");
  assert.deepEqual(tokens, [{ type: "text", text: "<img src=x onerror=alert(1)> text" }]);
});
