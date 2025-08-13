import { getProject } from "@/lib/projects";
export default function ProjectPage({ params }:{ params:{ slug:string } }){
  const project = getProject(params.slug);
  if (!project) return <div className="max-w-5xl mx-auto px-4 py-10">Not found</div>;
  return (<div><section className="bg-hero-gradient"><div className="max-w-5xl mx-auto px-4 py-10"><img src={project.image} alt={project.title} className="w-full max-h-[50vh] object-cover rounded-lg border border-white/10"/><h1 className="mt-6 text-3xl font-bold">{project.title}</h1><p className="text-white/80">{project.teaser}</p><div className="mt-3 flex flex-wrap gap-2">{project.stack.map(s=>(<span key={s} className="badge">{s}</span>))}</div></div></section><div className="max-w-3xl mx-auto px-4 py-10 prose prose-invert"><p>Rediger den fulde beskrivelse i den tilknyttede Markdown-fil (se <code>content/projects.json</code>).</p></div></div>);
}
