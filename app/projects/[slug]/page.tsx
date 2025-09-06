import { getProject } from "@/lib/projects";
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project)
    return <div className="max-w-5xl mx-auto px-4 py-10">Not found</div>;
  return (
    <div>
      <section className="bg-hero-gradient">
        <div className="max-w-5xl mx-auto px-4 py-10">
       
          <h1 className="mt-6 text-3xl font-bold">{project.title}</h1>
          <p className="text-white/80">{project.teaser}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="badge">
                {s}
              </span>
            ))}
          </div>
          {project.text && (
            <div className="mt-12 bg-white/10 border border-white/20 rounded-xl p-5 shadow-lg max-w-2xl">
              <h2 className="text-xl font-semibold mb-2">Info</h2>
              <p className="text-white/80 whitespace-pre-line">{project.text}</p>
              {project.links && project.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow transition"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 py-10 prose prose-invert"></div>
    </div>
  );
}
