"use client";

import Link from "next/link";
import Section from "@/components/Section";
import { useLang } from "@/components/i18n/LanguageProvider";

export default function CVPage() {
  const { lang } = useLang();

  const T = {
    da: {
      title: "Junior softwareteknologi (B.Eng) • Full-stack / Frontend",
      intro:
        "Kort CV: Jeg bygger moderne webapps med fokus på performance, DX og lækker UX. Erfaring med PWA, scanning (RFID/QR/Barcode), API-design og CI/CD. Jeg brænder for AI/ML og IT-sikkerhed.",
      download: "Download CV (PDF)",
      techTitle: "Tech stack (udvalg)",
      quickTitle: "Kort info",
      quickLines: [
        "Frontend: React, Next.js, TypeScript",
        "Backend: Node.js, .NET/C#, REST",
        "Cloud/DevOps: Azure, Firebase, Docker, CI/CD",
        "Data: SQL, Python",
      ],
      contactTitle: "Kontakt",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    en: {
      title: "B.Eng Software Technology • Full-stack / Frontend",
      intro:
        "Short CV: I build modern web apps with a focus on performance, DX and polished UX. Experience with PWAs, scanning (RFID/QR/Barcode), API design and CI/CD. Passionate about AI/ML and security.",
      download: "Download CV (PDF)",
      techTitle: "Tech stack (selected)",
      quickTitle: "At a glance",
      quickLines: [
        "Frontend: React, Next.js, TypeScript",
        "Backend: Node.js, .NET/C#, REST",
        "Cloud/DevOps: Azure, Firebase, Docker, CI/CD",
        "Data: SQL, Python",
      ],
      contactTitle: "Contact",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  }[lang];

  const stack = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    ".NET/C#",
    "SQL",
    "Python",
    "Azure",
    "Firebase",
    "Docker",
    "CI/CD",
    "PWA",
    "RFID/QR/Barcode",
  ];

  const LINKS = {
    pdf: "/Elisabeth_Lennert_CV.pdf", 
    email: "mailto:ElisabethBinzerLennert@gmail.com",
    github: "https://github.com/CodeBloodedMama",
    linkedin: "https://linkedin.com/in/E-Lennert",
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-12 ">
          <p className="text-lg text-white/80">{T.title}</p>
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
              {T.contactTitle}
            </Link>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <Section title={T.techTitle}>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span key={s} className="badge">
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* Kort info */}
      <Section title={T.quickTitle}>
        <ul className="list-disc ml-5 space-y-1 text-white/80">
          {T.quickLines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </Section>

      {/* Kontakt */}
      <Section title={T.contactTitle}>
        <ul className="space-y-1 text-white/80">
          <li>
            <a className="underline" href={LINKS.email}>
              {T.email}
            </a>
          </li>
          <li>
            <a className="underline" href={LINKS.github} target="_blank" rel="noopener noreferrer">
              {T.github}
            </a>
          </li>
          <li>
            <a className="underline" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              {T.linkedin}
            </a>
          </li>
        </ul>
      </Section>
    </>
  );
}
