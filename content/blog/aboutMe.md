// app/about/page.tsx
import da from "@/content/da.json";
import en from "@/content/en.json";
import Section from "@/components/Section";

export default function AboutPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = searchParams?.lang === "en" ? "en" : "da";
  const t = lang === "en" ? en : da;

  const labels =
    lang === "en"
      ? {
          title: "About Me",
          sub: "Who I am and how I work",
          skills: "Focus Areas",
          values: "Values",
          contact: "Get in touch",
          download: "Download CV",
        }
      : {
          title: "Om mig",
          sub: "Hvem jeg er – og hvordan jeg arbejder",
          skills: "Fokusområder",
          values: "Værdier",
          contact: "Kontakt",
          download: "Download CV",
        };

  return (
    <div className="bg-hero-gradient">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">{labels.title}</h1>
        <p className="text-white/80 mt-2">{labels.sub}</p>

        <Section title={lang === "en" ? "Profile" : "Profil"}>
          <p className="max-w-3xl text-white/80">{(t as any).intro}</p>
        </Section>

        <Section title={labels.skills}>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Node.js", "Docker", "Firebase", "C#", "Python", "SQL"].map(
              (s) => (
                <span key={s} className="badge">
                  {s}
                </span>
              )
            )}
          </div>
        </Section>

        <Section title={labels.values}>
          <ul className="list-disc ml-6 space-y-2 text-white/80">
            <li>{lang === "en" ? "Security-by-design mindset" : "Security-by-design tilgang"}</li>
            <li>{lang === "en" ? "User-first UX, clean code" : "Bruger-først UX og ren kode"}</li>
            <li>{lang === "en" ? "Collaborative, pragmatic, delivery-focused" : "Samarbejdende, pragmatisk, leverancefokus"}</li>
            <li>{lang === "en" ? "Curious about AI/ML and embedded" : "Nysgerrig på AI/ML og embedded"}</li>
          </ul>
        </Section>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`/cv?lang=${lang}`} className="btn glow">
            {labels.download}
          </a>
          <a href={`/contact?lang=${lang}`} className="btn">
            {labels.contact}
          </a>
        </div>
      </div>
    </div>
  );
}
