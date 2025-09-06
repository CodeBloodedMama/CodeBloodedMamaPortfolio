"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";
import { useLang } from "@/components/i18n/LanguageProvider";

export default function HeroLanding({
  name,
  title,
  intro,
}: { name: string; title: string; intro: string }) {
  const { lang } = useLang();

  const T = {
    da: {
      aka: "aka CodeBloodedMama",
      enter: "Gå til CV",
      download: "Download CV",
      game: "Spil CV-spil",
      intro:
        "Jeg bygger moderne webapps med fokus på performance, udvikleroplevelse og en lækker brugeroplevelse. To create is to live.",
    },
    en: {
      aka: "aka CodeBloodedMama",
      enter: "Enter site",
      download: "Download CV",
      game: "Play CV game",
      intro:
        "I build modern web apps with a focus on performance, developer experience and polished UX. To create is to live.",
    },
  }[lang];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-10 w-24 h-24 rounded-full bg-white/5 blur-2xl animate-pulse" />
          <div className="absolute top-1/3 right-10 w-16 h-16 rounded-full bg-white/10 blur-xl animate-ping" />
          <div className="absolute bottom-10 left-1/4 w-32 h-32 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative hidden sm:block"
          >
            <img
              src="/hero-fullbody.jpg"
              alt={name}
              className="w-full max-h-[70vh] object-contain object-bottom rounded-lg shadow-2xl"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-xs sm:text-sm uppercase tracking-widest text-white/60">
              {T.aka}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {name}
            </h1>
            <p className="mt-2 text-lg sm:text-xl text-white/80">{title}</p>

             <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/cv" className="btn glow">
                {T.enter}
              </Link>

              <a
                href="/Elisabeth_Lennert_CV.pdf"
                download="Elisabeth_Lennert_CV.pdf"
                className="btn glow"
              >
                {T.download}
              </a>

              <Link href="/game" className="btn glow">
                🎮 {T.game}
              </Link>
            </div>

            <p className="mt-6 text-white/80">{T.intro}</p>
          </motion.div>
        </div>
      </section>
    </Suspense>
  );
}
