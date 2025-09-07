"use client";

import Link from "next/link";
import Section from "@/components/Section";
import { useLang } from "@/components/i18n/LanguageProvider";

export default function CVPage() {
  const { lang } = useLang();

  // --- Translations & content pulled from your PDF CV (condensed) ---
  const T = {
    da: {
      title: "Junior softwareteknologi (B.Eng) • Full‑stack / Frontend",
      intro:
        "Passioneret og handlekraftig softwareingeniør med erfaring i full‑stack webudvikling, hardware‑integration (RFID, QR, stregkoder, IoT) og API‑drevne løsninger. Jeg bygger skalerbare systemer med robust backend og intuitiv frontend og trives i højt tempo med samarbejde og klare leverancer.",
      download: "Download CV (PDF)",
      stats: {
        years: { label: "År med kode", value: "3+" },
        projects: { label: "Projekter", value: "10+" },
        focus: { label: "Fokus", value: "Frontend / AI" }
      },
      profileTitle: "Profil",
      keyTitle: "Nøglekompetencer",
      techTitle: "Teknologier",
      tech: {
        langs: { title: "Sprog", items: ["JavaScript", "TypeScript", "C#", "C/C++", "Python", "SQL", "XML", "Kotlin", "Assembly"] },
        tools: {
          title: "Frameworks & værktøjer",
          items: ["React", "Next.js", "Angular", "WPF", ".NET", "MS SQL Server", "Firebase", "Docker", "Git", "REST", "Microservices", "Kubernetes", "Azure (App Services, Storage)", "Unity", "LaTeX", "Node.js"]
        },
        systems: { title: "Systemer", items: ["Linux (CLI, scripting, VM)", "Windows", "iOS", "Embedded I/O (PSoC, Raspberry Pi, DE2)"] }
      },
      eduTitle: "Uddannelse",
      expTitle: "Erfaring",
      projTitle: "Udvalgte projekter",
      langTitle: "Sprog",
      otherTitle: "Øvrigt",
      keys: [
        "Frontend (React, Next.js, Node.js, Angular, Android)",
        "Cloud (Azure services, Firebase)",
        "API‑design & integration (REST, microservices, event‑driven)",
        "CI/CD, Docker, Kubernetes",
        "Scanning & I/O (RFID, QR, Barcode)",
        "Agilt samarbejde, SCRUM & UX",
        "Machine Learning & AI (Python, TensorFlow, scikit‑learn)"
      ],
      edu: [
        { when: "2021 – 2025", place: "Aarhus Universitet", role: "Diplomingeniør i Softwarereteknologi (Web)", desc: "Valgfag: IT‑sikkerhed, ML, Web‑arkitektur & Orkestrering, Mobilapp, UX." },
        { when: "2017 – 2020", place: "Aalborg Universitet", role: "Diplomingeniør i Kemi & Bioteknologi" },
        { when: "2014 – 2017", place: "Århus HF & VUC", role: "Matematik & science A‑niveau" }
      ],
      exp: [
        {
          when: "Mar 2025 – Jul 2025",
          place: "BILLETTEN A/S, Aarhus",
          role: "Softwareudvikler – Frontend",
          bullets: [
            "Udviklede cross‑platform PWA i React/TypeScript til RFID/QR/stregkode‑scanning ved events.",
            "Byggede full‑stack komponenter til interne systemer med fokus på I/O‑workflows og UX.",
            "Bidrog til hurtigere indlukning og mere stabil drift via forbedret scanning og validering."
          ]
        },
        {
          when: "Jul 2023 – Dec 2023",
          place: "VESTAS A/S, Aarhus N",
          role: "Ingeniørpraktikant",
          bullets: [
            "Designede intern API‑løsning i Python/SQL til turbinediagnostik og automatisering.",
            "Udviklede og testede WPF‑UI komponenter til converter wall‑systemer.",
            "Byggede WPF‑app til parameteropslag under service; brugte Python og eksisterende database."
          ]
        }
      ],
      projects: [
        {
          name: "SafeByte (Bachelorprojekt)",
          tech: "React (PWA), Firebase (Auth/RTDB/Storage), Stregkodescanning, Docker",
          desc: "Fuldstack fødevare‑scanner til allergikere med real‑time opslag og allergen‑advarsler.",
          role: "Rolle: arkitektur, frontend, Firebase‑integration, scanning",
          href: "https://github.com/CodeBloodedMama/SafeByte_react_bachelor"
        },
        {
          name: "Event Scanning PWA (BILLETTEN)",
          tech: "React, TypeScript, Kamera‑/RFID‑scanning, REST, CI/CD",
          desc: "PWA til billet/armbånd‑scanning (RFID/QR/Barcode) på mobil og Android‑hardware.",
          role: "Rolle: frontend, backend‑API integration, UX‑forbedringer"
        },
        {
          name: "TimeTracking App (4. semester)",
          tech: "C#, React, WPF, Docker, CI/CD",
          desc: "Planlægning/analyse af studietid; ansvar for frontend‑arkitektur og CI/CD‑opsætning."
        }
      ],
      langs: [
        { k: "da", label: "Dansk", level: "Modersmål" },
        { k: "en", label: "Engelsk", level: "Flydende" },
        { k: "fr", label: "Fransk", level: "Begynder" },
        { k: "kl", label: "Kalaallisut", level: "Begynder" }
      ],
      other: ["Kørekort B", "Hobbyer: Reparation af iPhones/iPads og retro‑konsoller, styrketræning, guitar, astronomi, tid med familie"]
    },
    en: {
      title: "B.Eng Software Technology • Full‑stack / Frontend",
      intro:
        "Passionate and proactive software engineer with hands‑on experience in full‑stack web development, hardware integration (RFID, QR, barcodes, IoT) and API‑driven solutions. I build scalable systems combining robust backends with intuitive frontends, thriving in fast‑paced, collaborative environments.",
      download: "Download CV (PDF)",
      stats: {
        years: { label: "Years coding", value: "3+" },
        projects: { label: "Projects", value: "10+" },
        focus: { label: "Focus", value: "Frontend / AI" }
      },
      profileTitle: "Profile",
      keyTitle: "Key Competencies",
      techTitle: "Technologies",
      tech: {
        langs: { title: "Languages", items: ["JavaScript", "TypeScript", "C#", "C/C++", "Python", "SQL", "XML", "Kotlin", "Assembly"] },
        tools: {
          title: "Frameworks & Tools",
          items: ["React", "Next.js", "Angular", "WPF", ".NET", "MS SQL Server", "Firebase", "Docker", "Git", "REST", "Microservices", "Kubernetes", "Azure (App Services, Storage)", "Unity", "LaTeX", "Node.js"]
        },
        systems: { title: "Systems", items: ["Linux (CLI, scripting, VMs)", "Windows", "iOS", "Embedded I/O (PSoC, Raspberry Pi, DE2)"] }
      },
      eduTitle: "Education",
      expTitle: "Experience",
      projTitle: "Selected Projects",
      langTitle: "Languages",
      otherTitle: "Other",
      keys: [
        "Frontend (React, Next.js, Node.js, Angular, Android)",
        "Cloud (Azure services, Firebase)",
        "API design & integration (REST, microservices, event‑driven)",
        "CI/CD, Docker, Kubernetes",
        "Scanning & I/O (RFID, QR, Barcode)",
        "Agile collaboration, SCRUM & UX",
        "Machine Learning & AI (Python, TensorFlow, scikit‑learn)"
      ],
      edu: [
        { when: "2021 – 2025", place: "Aarhus University", role: "B.Eng in Software Technology (Web)", desc: "Electives: IT Security, ML, Web Architecture & Orchestration, Mobile App, UX." },
        { when: "2017 – 2020", place: "Aalborg University", role: "B.Eng in Chemistry & Biotechnology" },
        { when: "2014 – 2017", place: "Århus HF & VUC", role: "Higher preparatory with Math & Science (A‑level)" }
      ],
      exp: [
        {
          when: "Mar 2025 – Jul 2025",
          place: "BILLETTEN A/S, Aarhus",
          role: "Software Developer – Frontend",
          bullets: [
            "Developed a cross‑platform React/TypeScript PWA for RFID/QR/barcode scanning at events.",
            "Built full‑stack components for internal systems focusing on I/O workflows and UX.",
            "Contributed to faster admission and more stable operations through improved validation."
          ]
        },
        {
          when: "Jul 2023 – Dec 2023",
          place: "VESTAS A/S, Aarhus N",
          role: "Engineering Intern",
          bullets: [
            "Designed internal API solution in Python/SQL for turbine diagnostics and automation.",
            "Developed and tested WPF UI components for converter wall systems.",
            "Built a WPF app for parameter lookup during service; used Python and existing DB."
          ]
        }
      ],
      projects: [
        {
          name: "SafeByte (Bachelor Project)",
          tech: "React (PWA), Firebase (Auth/RTDB/Storage), Barcode scanning, Docker",
          desc: "Full‑stack food scanner for allergy sufferers with real‑time lookups and alerts.",
          role: "Role: architecture, frontend, Firebase integration, scanning",
          href: "https://github.com/CodeBloodedMama/SafeByte_react_bachelor"
        },
        {
          name: "Event Scanning PWA (BILLETTEN)",
          tech: "React, TypeScript, Camera/RFID scanning, REST, CI/CD",
          desc: "PWA for ticket/wristband scanning (RFID/QR/Barcode) on mobile and Android hardware.",
          role: "Role: frontend, backend API integration, UX improvements"
        },
        {
          name: "TimeTracking App (4th semester)",
          tech: "C#, React, WPF, Docker, CI/CD",
          desc: "Study time planning/analysis; responsible for frontend architecture and CI/CD setup."
        }
      ],
      langs: [
        { k: "da", label: "Danish", level: "Native" },
        { k: "en", label: "English", level: "Fluent" },
        { k: "fr", label: "French", level: "Beginner" },
        { k: "kl", label: "Kalaallisut", level: "Beginner" }
      ],
      other: ["Driver’s License B", "Hobbies: Repairing iPhones/iPads and retro consoles, weight training, guitar, astronomy, family time"]
    }
  }[lang];

  const LINKS = {
    pdf: "/Elisabeth_Lennert_CV.pdf",
    email: "mailto:ElisabethBinzerLennert@gmail.com",
    github: "https://github.com/CodeBloodedMama",
    linkedin: "https://linkedin.com/in/E-Lennert"
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 text-white">
          <p className="text-lg text-white/85">{T.title}</p>
          <p className="mt-4 max-w-3xl text-white/80">{T.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn glow" href={LINKS.pdf} download>
              {T.download}
            </a>
            <a className="btn" href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="btn" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <Link className="btn" href="/contact">
              Contact
            </Link>
          </div>

          {/* Small stat chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            <StatChip label={T.stats.years.label} value={T.stats.years.value} />
            <StatChip label={T.stats.projects.label} value={T.stats.projects.value} />
            <StatChip label={T.stats.focus.label} value={T.stats.focus.value} />
          </div>
        </div>
      </section>

      {/* Profile */}
      <Section title={T.profileTitle}>
        <Card>
          <p className="text-white/85 leading-relaxed">{T.intro}</p>
        </Card>
      </Section>

      {/* Key competencies */}
      <Section title={T.keyTitle}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {T.keys.map((k: string, i: number) => (
            <Card key={i} className="flex items-start gap-3">
              <CheckIcon className="mt-1 h-5 w-5 flex-none" />
              <span className="text-white/90">{k}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Technologies */}
      <Section title={T.techTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {[T.tech.langs, T.tech.tools, T.tech.systems].map((grp, i) => (
            <Card key={i}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">{grp.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {grp.items.map((s: string) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section title={T.expTitle}>
        <ol className="relative space-y-4 border-l border-white/10 pl-4">
          {T.exp.map((e: any, i: number) => (
            <li key={i} className="ml-1">
              <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-emerald-400" />
              <Card>
                <div className="text-sm text-white/60">{e.when} • {e.place}</div>
                <div className="font-medium text-white">{e.role}</div>
                <ul className="mt-2 list-disc pl-5 text-white/85 space-y-1">
                  {e.bullets.map((b: string, j: number) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* Projects */}
      <Section title={T.projTitle}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {T.projects.map((p: any, i: number) => (
            <Card key={i}>
              <div className="text-white font-semibold">{p.name}</div>
              <div className="text-xs text-white/60 mt-1">{p.tech}</div>
              <p className="mt-2 text-sm text-white/85">{p.desc}</p>
              {p.role && <p className="mt-1 text-sm text-white/75">{p.role}</p>}
              {p.href && (
                <a className="mt-3 inline-flex text-sm underline opacity-90 hover:opacity-100" href={p.href} target="_blank" rel="noopener noreferrer">
                  GitHub →
                </a>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Languages */}
      <Section title={T.langTitle}>
        <Card>
          <div className="flex flex-wrap gap-2">
            {T.langs.map((l: any) => (
              <Pill key={l.k}>{l.label} • {l.level}</Pill>
            ))}
          </div>
        </Card>
      </Section>

      {/* Other */}
      <Section title={T.otherTitle}>
        <Card>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            {T.other.map((o: string, i: number) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* Contact */}
      <Section title="Contact">
        <Card>
          <ul className="space-y-1 text-white/85">
            <li>
              <a className="underline" href={LINKS.email}>Email</a>
            </li>
            <li>
              <a className="underline" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li>
              <a className="underline" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
          </ul>
        </Card>
      </Section>
    </>
  );
}

// --- Tiny UI primitives (no deps) ---
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 p-4 shadow ${className}`}>{children}</div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      <DotIcon className="h-2.5 w-2.5" />
      {children}
    </span>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      <DotIcon className="h-2.5 w-2.5" />
      <span className="font-medium text-white/90">{value}</span>
      <span className="text-white/60">{label}</span>
    </span>
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M9 16.17 4.83 12a1 1 0 1 0-1.41 1.41l5.18 5.17a1 1 0 0 0 1.41 0l10.59-10.6A1 1 0 0 0 19.18 6L9 16.17Z" />
    </svg>
  );
}

function DotIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
