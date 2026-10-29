"use client";
import {Fragment} from "react";
function inline(source){
 const tokens=source.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g);
 return tokens.map((token,i)=>{
  if(token.startsWith("**")&&token.endsWith("**"))return <strong key={i}>{token.slice(2,-2)}</strong>;
  if(token.startsWith("*")&&token.endsWith("*"))return <em key={i}>{token.slice(1,-1)}</em>;
  const match=token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
  if(match)return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="font-medium text-[#057cfa] underline">{match[1]}</a>;
  return <Fragment key={i}>{token}</Fragment>;
 });
}
export default function MarkdownContent({content}){
 return <div className="space-y-4 text-base leading-8 text-slate-700">{String(content||"").split(/\r?\n/).map((line,i)=>{
  if(line.startsWith("### "))return <h3 key={i} className="pt-3 text-xl font-bold text-[#081b3a]">{inline(line.slice(4))}</h3>;
  if(line.startsWith("## "))return <h2 key={i} className="pt-4 text-2xl font-bold text-[#081b3a]">{inline(line.slice(3))}</h2>;
  if(line.startsWith("# "))return <h2 key={i} className="pt-4 text-3xl font-bold text-[#081b3a]">{inline(line.slice(2))}</h2>;
  if(line.startsWith("- "))return <p key={i} className="pl-5 before:mr-2 before:content-['•']">{inline(line.slice(2))}</p>;
  if(!line.trim())return <div key={i} className="h-2"/>;
  return <p key={i}>{inline(line)}</p>;
 })}</div>;
}
