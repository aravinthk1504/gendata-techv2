"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { FiBold, FiItalic, FiLink, FiList, FiListOrdered, FiCode, FiMinus, FiType } from "react-icons/fi";

const escapeHtml = value => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function inlineHtml(value) {
  let text = escapeHtml(value);
  text = text.replace(/!\[([^\]]*)\]\((https:\/\/[^\s)]+)\)/g, '<img src="$2" alt="$1" />');
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  return text;
}
function markdownToHtml(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  const html = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("### ")) { html.push("<h3>"+inlineHtml(line.slice(4))+"</h3>"); i++; continue; }
    if (line.startsWith("## ") || line.startsWith("# ")) { html.push("<h2>"+inlineHtml(line.replace(/^#{1,2} /,""))+"</h2>"); i++; continue; }
    if (/^[-*]\s+/.test(line)) {
      const items=[]; while(i<lines.length && /^[-*]\s+/.test(lines[i])) items.push("<li>"+inlineHtml(lines[i++].replace(/^[-*]\s+/,""))+"</li>");
      html.push("<ul>"+items.join("")+"</ul>"); continue;
    }
    if (/^\d+[.)]\s+/.test(line)) {
      const items=[]; while(i<lines.length && /^\d+[.)]\s+/.test(lines[i])) items.push("<li>"+inlineHtml(lines[i++].replace(/^\d+[.)]\s+/,""))+"</li>");
      html.push("<ol>"+items.join("")+"</ol>"); continue;
    }
    if (/^>\s?/.test(line)) { html.push("<blockquote>"+inlineHtml(line.replace(/^>\s?/,""))+"</blockquote>"); i++; continue; }
    if (/^!\[([^\]]*)\]\((https:\/\/[^\s)]+)\)$/.test(line.trim())) { html.push("<p>"+inlineHtml(line.trim())+"</p>"); i++; continue; }
    const paragraph=[]; while(i<lines.length && lines[i].trim() && !/^(#{1,3} |[-*]\s+|\d+[.)]\s+|>)/.test(lines[i])) paragraph.push(inlineHtml(lines[i++]));
    html.push("<p>"+paragraph.join("<br>")+"</p>");
  }
  return html.join("");
}
function nodeMarkdown(node) {
  if (node.nodeType === 3) return node.nodeValue || "";
  if (node.nodeType !== 1) return "";
  const tag=node.tagName.toLowerCase();
  const children=Array.from(node.childNodes).map(nodeMarkdown).join("");
  if (tag==="strong" || tag==="b") return "**"+children+"**";
  if (tag==="em" || tag==="i") return "*"+children+"*";
  if (tag==="code") return "`"+children+"`";
  if (tag==="a") { const href=node.getAttribute("href")||""; return /^https?:\/\//.test(href) ? "["+children+"]("+href+")" : children; }
  if (tag==="img") { const src=node.getAttribute("src")||""; return /^https:\/\//.test(src) ? "!["+(node.getAttribute("alt")||"Article image")+"]("+src+")" : ""; }
  if (tag==="br") return "\n";
  if (tag==="h2") return "## "+children;
  if (tag==="h3") return "### "+children;\n  if (tag==="pre") return "```\\n"+node.textContent+"\\n```";
  if (tag==="blockquote") return children.split("\n").map(line=>"> "+line).join("\n");
  if (tag==="ul" || tag==="ol") return Array.from(node.children).map((item,index)=>(tag==="ul"?"- ":String(index+1)+". ")+Array.from(item.childNodes).map(nodeMarkdown).join("")).join("\n");
  if (tag==="li") return children;
  if (tag==="p" || tag==="div") return children;
  return children;
}
function htmlToMarkdown(root) {
  return Array.from(root.children).map(node=>nodeMarkdown(node).trim()).filter(Boolean).join("\n\n");
}

const VisualMarkdownEditor = forwardRef(function VisualMarkdownEditor({ value, onChange }, ref) {
  const editorRef=useRef(null);
  const lastValue=useRef(value || "");
  useEffect(() => {
    if (!editorRef.current || (value || "") === lastValue.current) return;
    editorRef.current.innerHTML=markdownToHtml(value || "");
    lastValue.current=value || "";
  }, [value]);
  useImperativeHandle(ref, () => ({
    insertImage(url, alt="Article image") {
      if (!editorRef.current || !url) return;
      editorRef.current.focus();
      document.execCommand("insertHTML", false, '<img src="'+escapeHtml(url)+'" alt="'+escapeHtml(alt)+'" />');
      const next=htmlToMarkdown(editorRef.current);
      lastValue.current=next;
      onChange(next);
    }
  }), [onChange]);
  function update() {
    if (!editorRef.current) return;
    const next=htmlToMarkdown(editorRef.current);
    lastValue.current=next;
    onChange(next);
  }
  function command(name, valueArg) {
    editorRef.current?.focus();
    document.execCommand(name, false, valueArg || null);
    update();
  }
  function addLink() {
    const url=window.prompt("Paste the full https:// link");
    if (!url || !/^https?:\/\//i.test(url)) return;
    command("createLink", url);
  }
  const tools=[
    {label:"Bold",icon:FiBold,action:()=>command("bold")},
    {label:"Italic",icon:FiItalic,action:()=>command("italic")},
    {label:"Heading 2",icon:FiType,action:()=>command("formatBlock","h2")},
    {label:"Heading 3",icon:FiType,action:()=>command("formatBlock","h3")},
    {label:"Bulleted list",icon:FiList,action:()=>command("insertUnorderedList")},
    {label:"Numbered list",icon:FiListOrdered,action:()=>command("insertOrderedList")},
    {label:"Link",icon:FiLink,action:addLink},
    {label:"Quote",icon:FiMinus,action:()=>command("formatBlock","blockquote")},
    {label:"Code",icon:FiCode,action:()=>command("formatBlock","pre")},
  ];
  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2" role="toolbar" aria-label="Article formatting">
      {tools.map(({label,icon:Icon,action})=><button key={label} type="button" title={label} aria-label={label} onMouseDown={event=>event.preventDefault()} onClick={action} className="flex h-9 min-w-9 items-center justify-center gap-1 rounded-lg px-2 text-slate-700 hover:bg-blue-100 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"><Icon size={16}/><span className="hidden text-xs sm:inline">{label}</span></button>)}
      <span className="mx-1 h-6 w-px bg-slate-200"/>
      <span className="px-2 text-xs text-slate-500">Select text and choose a format</span>
    </div>
    <div ref={editorRef} contentEditable suppressContentEditableWarning role="textbox" aria-label="Visual article editor" aria-multiline="true"
      onInput={update} onBlur={update} onPaste={event=>{event.preventDefault();const text=event.clipboardData.getData("text/plain");document.execCommand("insertText",false,text);update();}}
      className="min-h-[420px] max-h-[720px] overflow-y-auto px-5 py-5 text-[15px] leading-8 text-slate-700 outline-none empty:before:pointer-events-none empty:before:text-slate-400 empty:before:content-['Start_writing_your_article_here...'] [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#081b3a] [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#081b3a] [&_p]:mb-3 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline [&_img]:my-4 [&_img]:max-h-80 [&_img]:rounded-xl [&_img]:object-contain [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-950 [&_pre]:p-3 [&_pre]:text-white"/>
    <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500"><span>Formatting is saved in the existing article format</span><span>{(value||"").trim().split(/\s+/).filter(Boolean).length} words</span></div>
  </div>;
});
VisualMarkdownEditor.displayName="VisualMarkdownEditor";
export default VisualMarkdownEditor;
