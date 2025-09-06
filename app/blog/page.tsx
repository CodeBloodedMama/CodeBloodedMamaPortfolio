import fs from "node:fs"; 
import path from "node:path"; 
import Link from "next/link"; 
import Section from "@/components/Section";

type Meta = { title:string; date:string; tags:string[]; slug:string; };
function parseFrontmatter(content:string){ const m = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/); if(!m) return { meta:{title:"Untitled",date:"",tags:[]}, body:content }; 
const fm=m[1], body=m[2]; const meta:any={}; fm.split("\n").forEach(line=>{ const [k,...rest]=line.split(":"); if(!k) return; 
    const v=rest.join(":").trim().replace(/^"|"$|^'|'$/g,""); if(k==='title') meta.title=v; if(k==='date') meta.date=v; if(k==='tags') meta.tags=v.replace(/[\[\]]/g,"").split(',').map(s=>s.trim().replace(/^"|"$|^'|'$/g,'')); }); return { meta, body }; }

export default function Blog(){ 
    const dir=path.join(process.cwd(),"content","blog"); 
    const files=fs.readdirSync(dir).filter(f=>f.endsWith(".md")); 
    const posts:Meta[]=files.map(f=>{ const raw=fs.readFileSync(path.join(dir,f),"utf-8"); 
        const { meta }=parseFrontmatter(raw); return { title: meta.title, date: meta.date, tags: meta.tags, slug: f.replace(/\.md$/, "") }; }).sort((a,b)=> a.date<b.date?1:-1); 
        
        return (<Section title="Blog"><div className="grid md:grid-cols-2 gap-4">{posts.map(p=>(<div key={p.slug} className="card p-4 glow"><h3 className="text-lg font-semibold">{p.title}</h3><p className="text-xs text-white/60">{p.date} — {p.tags.join(", ")}</p><Link className="btn mt-3" href={`/blog/${p.slug}`}>Read</Link></div>))}</div></Section>); }
