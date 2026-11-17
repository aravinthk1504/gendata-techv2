// Small, dependency-free Markdown subset used by blog articles. It returns plain
// data (no HTML), so the renderer builds React elements and nothing from the
// article text is ever interpreted as markup.
//
// Blocks: heading, image, ul, ol, quote, code, table, paragraph.
// Inline: **bold**, *italic*, `code`, [text](https://link).

const INLINE_PATTERN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;

export function parseInline(source) {
  return String(source ?? "")
    .split(INLINE_PATTERN)
    .filter(token => token !== "")
    .map(token => {
      if (token.length > 2 && token.startsWith("`") && token.endsWith("`")) {
        return { type: "code", text: token.slice(1, -1) };
      }
      if (token.length > 4 && token.startsWith("**") && token.endsWith("**")) {
        return { type: "strong", text: token.slice(2, -2) };
      }
      if (token.length > 2 && token.startsWith("*") && token.endsWith("*")) {
        return { type: "em", text: token.slice(1, -1) };
      }
      const link = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (link) return { type: "link", text: link[1], href: link[2] };
      return { type: "text", text: token };
    });
}

const IMAGE = /^!\[([^\]]{1,200})\]\((https:\/\/[^\s)]+)\)$/;
const BULLET = /^[-*•]\s+(.*)$/;
const NUMBERED = /^\d{1,3}[.)]\s+(.*)$/;
const QUOTE = /^>\s?(.*)$/;
const TABLE_SEPARATOR = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/;

function splitRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(cell => cell.trim());
}

export function parseBlocks(content) {
  const lines = String(content ?? "").split(/\r?\n/);
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) { index += 1; continue; }

    // Fenced code block. An unterminated fence runs to the end of the article.
    if (trimmed.startsWith("```")) {
      const body = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        body.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ type: "code", text: body.join("\n") });
      continue;
    }

    const image = trimmed.match(IMAGE);
    if (image) { blocks.push({ type: "image", alt: image[1], src: image[2] }); index += 1; continue; }

    if (line.startsWith("### ")) { blocks.push({ type: "heading", level: 3, text: line.slice(4) }); index += 1; continue; }
    if (line.startsWith("## ")) { blocks.push({ type: "heading", level: 2, text: line.slice(3) }); index += 1; continue; }
    // A single "#" is rendered as h2 because the article title is the page's h1.
    if (line.startsWith("# ")) { blocks.push({ type: "heading", level: 2, text: line.slice(2), large: true }); index += 1; continue; }

    if (BULLET.test(line)) {
      const items = [];
      while (index < lines.length && BULLET.test(lines[index])) {
        items.push(lines[index].match(BULLET)[1]);
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (NUMBERED.test(line)) {
      const items = [];
      while (index < lines.length && NUMBERED.test(lines[index])) {
        items.push(lines[index].match(NUMBERED)[1]);
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (QUOTE.test(line)) {
      const quoted = [];
      while (index < lines.length && QUOTE.test(lines[index])) {
        quoted.push(lines[index].match(QUOTE)[1]);
        index += 1;
      }
      blocks.push({ type: "quote", text: quoted.join(" ").trim() });
      continue;
    }

    // Pipe table: a header row followed by a separator row.
    if (trimmed.includes("|") && index + 1 < lines.length && TABLE_SEPARATOR.test(lines[index + 1].trim())) {
      const header = splitRow(line);
      const rows = [];
      index += 2;
      while (index < lines.length && lines[index].trim().includes("|") && lines[index].trim()) {
        rows.push(splitRow(lines[index]).slice(0, header.length));
        index += 1;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    // Each text line stays its own paragraph, as it always has in this renderer.
    blocks.push({ type: "paragraph", text: line });
    index += 1;
  }

  return blocks;
}
