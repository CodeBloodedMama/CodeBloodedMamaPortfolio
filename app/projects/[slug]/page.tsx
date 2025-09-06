import { getProject } from "@/lib/projects";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project)
    return <div className="max-w-5xl mx-auto px-4 py-10">Not found</div>;


  let mdContent = "";
  if (project.md) {
    const mdPath = path.join(process.cwd(), project.md);
    if (fs.existsSync(mdPath)) {
      mdContent = fs.readFileSync(mdPath, "utf-8");
    }
  }

  return (
    <div>
      <section className="bg-hero-gradient pt-16">
        <div className="max-w-5xl mx-auto px-4 py-10">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[50vh] object-cover rounded-lg border border-white/10"
            />
          )}
          <h1 className="mt-6 text-3xl font-bold">{project.title}</h1>
          <p className="text-white/80">{project.teaser}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="badge">
                {s}
              </span>
            ))}
          </div>
          {project.links && project.links.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-3">
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
          {mdContent && (
            <div className="prose prose-invert mt-12">
              <ReactMarkdown>{mdContent}</ReactMarkdown>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}