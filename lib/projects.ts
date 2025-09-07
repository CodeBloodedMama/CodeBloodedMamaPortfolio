import projects from "@/content/projects.json";
export type Project = {
  slug: string;
  title: string;
  teaser: string;
  date: string;
  category: "Web App" | "Mobile" | "IoT" | "Dashboard" | "PWA";
  stack: string[];
  links?: { label: string; url: string }[];
  type?: string;
  technologies?: string[];
  shortDescription?: string;
  features?: string[];
  result?: string;
};
export const getProjects = () =>
  (projects as Project[]).sort((a, b) => (a.date < b.date ? 1 : -1));
export const getProject = (slug: string) =>
  getProjects().find((p) => p.slug === slug);

