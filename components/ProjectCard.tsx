import Link from "next/link";
export default function ProjectCard({ slug, title, teaser, image, stack, category }:{ slug:string; title:string; teaser:string; image:string; stack:string[]; category:string; }){
  return (
    <div className="card glow overflow-hidden hover:scale-[1.01] transition">
      <img src={image} alt={title} className="w-full h-44 object-cover bg-black/30" />
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between"><h3 className="font-medium">{title}</h3><span className="badge">{category}</span></div>
        <p className="text-white/80 text-sm">{teaser}</p>
        <div className="flex flex-wrap gap-2 mt-2">{stack?.map((s,i)=>(<span key={i} className="badge">{s}</span>))}</div>
        <div className="pt-3"><Link href={`/projects/${slug}`} className="btn">View Details</Link></div>
      </div>
    </div>
  );
}
