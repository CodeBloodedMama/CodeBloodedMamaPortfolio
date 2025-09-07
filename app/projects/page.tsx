import Section from "@/components/Section";
import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { Suspense } from "react";

export default function Projects() {
  const projects = getProjects();
  return (
    <Suspense fallback={<div className="text-center text-white/70">Loading projects...</div>}>
      <Section title={""}>
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">A little preview of my work </h2>
          <p className="mt-2 text-sm text-white/60">
            Click to see details
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              teaser={p.teaser}
              stack={p.stack}
              category={p.category}
              text={p.text}
            />
          ))}
        </div>
      </Section>
    </Suspense>
  );
}
