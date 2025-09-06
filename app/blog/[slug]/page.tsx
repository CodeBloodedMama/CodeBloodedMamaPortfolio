import fs from "node:fs"; 
import path from "node:path"; 
import ReactMarkdown from "react-markdown";
function parseFrontmatter(content:string){ 
    const m = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
     if(!m) return { title:"Untitled", date:"", tags:[], body:content }; 
     const fm=m[1], body=m[2]; 
     const meta:any={}; fm.split("\n").forEach(line=>
        { const [k,...rest]=line.split(":"); if(!k)
             return; 
        
        const v=rest.join(":").trim().replace(/^"|"$|^'|'$/g,""); if(k==='title') meta.title=v; if(k==='date') meta.date=v; if(k==='tags') meta.tags=v.replace(/[\[\]]/g,"").split(',').map((s:string)=>s.trim().replace(/^"|"$|^'|'$/g,'')); }); return { title: meta.title||"Untitled", date: meta.date||"", tags: meta.tags||[], body }; }
export default function Post({ params }:{ params:{ slug:string } }){
     const file=path.join(process.cwd(),"content","blog",`${params.slug}.md`); 
     const raw=fs.readFileSync(file,"utf-8"); 
     const { title,date,tags,body }=parseFrontmatter(raw); 
     
     return
         (<div className="max-w-3xl mx-auto px-4 py-10"><h1 className="text-3xl font-bold">{title}</h1><p className="text-sm text-white/60">{date} — {tags.join(", ")}</p><article className="prose prose-invert mt-6"><ReactMarkdown>{body}</ReactMarkdown></article></div>); }
