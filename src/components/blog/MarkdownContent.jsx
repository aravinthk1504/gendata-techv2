"use client";
import { Fragment } from "react";
import { parseBlocks, parseInline } from "../../lib/markdown-blocks.mjs";

function Inline({ text }) {
  return parseInline(text).map((token, i) => {
    if (token.type === "strong") return <strong key={i}>{token.text}</strong>;
    if (token.type === "em") return <em key={i}>{token.text}</em>;
    if (token.type === "code") return <code key={i} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800">{token.text}</code>;
    if (token.type === "link") return <a key={i} href={token.href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#057cfa] underline">{token.text}</a>;
    return <Fragment key={i}>{token.text}</Fragment>;
  });
}

export default function MarkdownContent({ content }) {
  return <div className="gd-blog-font space-y-4 text-base leading-8 text-slate-700">{parseBlocks(content).map((block, i) => {
    switch (block.type) {
      case "image":
        return <figure key={i} className="my-8">
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" className="mx-auto h-auto max-h-[680px] w-auto max-w-full rounded-2xl border border-slate-100 object-contain shadow-sm" />
          <figcaption className="mt-3 text-center text-sm text-slate-500">{block.alt}</figcaption>
        </figure>;
      case "heading":
        return block.level === 3
          ? <h3 key={i} className="pt-3 text-xl font-bold text-[#081b3a]"><Inline text={block.text} /></h3>
          : <h2 key={i} className={`pt-4 font-bold text-[#081b3a] ${block.large ? "text-3xl" : "text-2xl"}`}><Inline text={block.text} /></h2>;
      case "ul":
        return <ul key={i} className="list-disc space-y-2 pl-6 marker:text-[#057cfa]">{block.items.map((item, j) => <li key={j}><Inline text={item} /></li>)}</ul>;
      case "ol":
        return <ol key={i} start={block.start || 1} className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-[#057cfa]">{block.items.map((item, j) => <li key={j}><Inline text={item} /></li>)}</ol>;
      case "quote":
        return <blockquote key={i} className="border-l-4 border-[#057cfa]/40 pl-5 italic text-slate-600"><Inline text={block.text} /></blockquote>;
      case "code":
        return <pre key={i} className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-100"><code>{block.text}</code></pre>;
      case "table":
        return <div key={i} className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-900"><tr>{block.header.map((cell, j) => <th key={j} scope="col" className="border-b border-slate-200 px-4 py-3 font-semibold"><Inline text={cell} /></th>)}</tr></thead>
            <tbody>{block.rows.map((row, r) => <tr key={r} className="border-b border-slate-100 last:border-0">{row.map((cell, c) => <td key={c} className="px-4 py-3 align-top"><Inline text={cell} /></td>)}</tr>)}</tbody>
          </table>
        </div>;
      default:
        return <p key={i}><Inline text={block.text} /></p>;
    }
  })}</div>;
}
