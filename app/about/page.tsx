"use client";
import Image from "next/image";
import Section from "@/components/Section";
import { useLang } from "@/components/i18n/LanguageProvider";

export default function AboutPage() {
  const { lang } = useLang();

  const T = {
    da: {
      headline: "Hey, jeg er Elisabeth 🚀",
      intro: "Full stack tryllekunstner 🪄, AI-entusiast 🤖 og fuldtids eventyrer i både kode og liv. Når jeg ikke bygger apps, headbanger jeg til musik, ser Rick & Morty eller får mine planter til at høre på algoritmesnak.",
      hobbiesTitle: "Hobbyer & Passioner",
      finalTitle: "Sidste tanke",
      finalText: "Om det er at debugge kode eller forklare mine børn kvantefysik over pizza 🍕, så jagter jeg altid nysgerrighed, grin og den næste store idé.",
      edsBadge: "EDS Warrior",
      edsNote: "Jeg lever med Ehlers-Danlos Syndrom (EDS). Mine ringe hjælper med at holde fingrene stabile — og ja, de er også en del af min stil ✨",
      h_mom: { title: "Mor-livet", text: "Stolt kaos-koordinator for mine fantastiske børn Zoé (13 år) og Leonardo (11 år) — mine hårdeste projektledere." },
      h_code: { title: "Fri kode–magi", text: "Egne projekter = ingen Jira tickets, bare ren nørdeglæde 🧪" },
      h_rnm:  { title: "Rick & Morty fan", text: "Wubba Lubba Dub-Dub! 💥 Sci-fi absurditet giver mig ideer." },
      h_music:{ title: "Musiknørd", text: "Guitar i hånden, Spotify på — mine debug-sessions har soundtrack 🎸" },
      h_plants:{ title: "Plantesamler", text: "Sjældne husplanter — og ja, de har navne 🌱" },
      h_stem: { title: "STEM-geek", text: "Kan ikke sige nej til foredrag om robotter, AI eller sorte huller 🚀" },
      h_repair:{ title: "Tech Repair Queen", text: "Jeg reparerer iPhones/iPads & gadgets — jeg skruer, lodder og fejlfinder som en chef 🔧⚡" }
    },
    en: {
      headline: "Hey, I’m Elisabeth 🚀",
      intro: "Frontend wizard 🪄, AI enthusiast 🤖, and full-time adventurer in both code and life. When I’m not building apps, I’m headbanging to music, binge-watching Rick & Morty, or getting my plants to listen to algorithm talk.",
      hobbiesTitle: "Hobbies & Passions",
      finalTitle: "Final Thought",
      finalText: "Whether it’s debugging code or explaining quantum physics over pizza 🍕, I’m always chasing curiosity, laughter, and the next big idea.",
      edsBadge: "EDS Warrior",
      edsNote: "I live with Ehlers-Danlos Syndrome (EDS). My beautiful rings help keep my fingers stable — and yes, they’re also part of my style ✨",
      h_mom: { title: "Mom Life", text: "Proud chaos coordinator for two amazing kids (11 & 13) — my toughest project managers." },
      h_code: { title: "Code Freedom", text: "Personal projects = no Jira tickets, just pure mad science! 🧪" },
      h_rnm:  { title: "Rick & Morty Fan", text: "Wubba Lubba Dub-Dub! 💥 Sci-fi absurdity fuels my creativity." },
      h_music:{ title: "Music Lover", text: "Guitar in hand, Spotify on — my debug sessions have a great soundtrack 🎸" },
      h_plants:{ title: "Plant Collector", text: "Collector of rare houseplants — yes, they have names 🌱" },
      h_stem: { title: "STEM Geek", text: "Can’t resist talks on robots, AI, or black holes 🚀" },
      h_repair:{ title: "Tech Repair Queen", text: "I repair iPhones/iPads & gadgets — I solder, screw, and debug like a boss 🔧⚡" }
    }
  }[lang];

  const hobbies = [
    { title: T.h_mom.title, text: T.h_mom.text, img: "/kids.jpg" },
    { title: T.h_code.title, text: T.h_code.text, img: "/code.jpg" },
    { title: T.edsBadge, text: T.edsNote, img: "/full-face.jpg" },
    { title: T.h_rnm.title,  text: T.h_rnm.text,  img: "/rm.jpg" },
    { title: T.h_music.title,text: T.h_music.text,img: "/guitar.jpg" },
    { title: T.h_plants.title,text: T.h_plants.text,img: "/plants.jpg" },
    { title: T.h_repair.title,text: T.h_repair.text,img: "/repair.jpg" },
    { title: T.h_stem.title, text: T.h_stem.text, img: "/stem1.jpg" },
  ];

  return (
    <div className="bg-hero-gradient min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10 text-white">
        
        {/* Centered header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold">{T.headline}</h1>
          <p className="text-base text-white/80 max-w-2xl mt-2">{T.intro}</p>
        </div>

        {/* Hobbies grid */}
        <Section title={T.hobbiesTitle}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hobbies.map((h, i) => (
              <div key={i}
                   className="bg-white/10 rounded-xl shadow p-3 flex flex-col items-center text-center hover:scale-105 transition-transform">
                <Image src={h.img} alt={h.title} width={110} height={110} className="rounded-lg mb-2" />
                <h3 className="text-lg font-semibold">{h.title}</h3>
                <p className="text-sm text-white/80">{h.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Final thought */}
        <Section title={T.finalTitle}>
          <p className="text-base text-white/80">{T.finalText}</p>
        </Section>
      </div>
    </div>
  );
}
