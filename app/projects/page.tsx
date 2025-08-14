import Section from "@/components/Section"; 
import { getProjects } from "@/lib/projects"; 
import ProjectCard from "@/components/ProjectCard";
import { Suspense } from "react";
export default function Projects(){ const projects = getProjects();
     return (
        <Suspense fallback={<div className="text-center text-white/70">Loading projects...</div>}>
        <Section title="Projects">
            <div className="mb-6 text-white/70 text-sm">
                Klik for detaljer. (under construction).
                
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(p=>
                (<ProjectCard key={p.slug} 
                        slug={p.slug}
                        title={p.title} 
                        teaser={p.teaser} 
                        image={p.image} 
                        stack={p.stack} category={p.category} />))}
            </div>
        </Section>
        </Suspense>
        ); 
    }
