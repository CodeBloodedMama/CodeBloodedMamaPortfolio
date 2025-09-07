import { getProject } from "@/lib/projects";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project)
    return <div className="max-w-5xl mx-auto px-4 py-10">Not found</div>;

  return (
    <div className="mt-20 max-w-5xl mx-auto px-4">
      <div className="rounded-xl bg-white/5 p-6 shadow-md border border-white/10">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-white/80 mb-4">{project.teaser}</p>

        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {project.type && (
          <div className="mt-4 text-sm text-white/70"><b>Type:</b> {project.type}</div>
        )}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-2 text-sm text-white/70">
            <b>Technologies:</b> {project.technologies.join(", ")}
          </div>
        )}

        {project.shortDescription && (
          <div className="mt-4 text-base text-white/90 leading-relaxed">
            {project.shortDescription}
          </div>
        )}

        {project.features && project.features.length > 0 && (
          <div className="mt-6 rounded-lg bg-white/5 p-4 border border-white/10">
            <h2 className="font-semibold text-white mb-2">Features</h2>
            <ul className="list-disc list-inside text-white/80 space-y-1">
              {project.features.map((feature: string, idx: number) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.result && (
          <div className="mt-6 rounded-lg bg-green-600/10 p-4 border border-green-600/20">
            <b className="text-green-400">Resultat:</b>
            <p className="text-white/90 mt-1">{project.result}</p>
          </div>
        )}

        {project.stack && project.stack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 border border-white/20"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
