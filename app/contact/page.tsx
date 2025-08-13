"use client";
import ContactForm from "../../components/ContactForm";
import { useLang } from "@/components/i18n/LanguageProvider";

export default function ContactPage() {
  const { lang } = useLang();

  const t = lang === "en"
    ? {
        title: "Contact",
        intro: "Have a collaboration idea or a question? Send me a message and I’ll get back to you.",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        success: "Thanks! I’ll get back to you as soon as possible.",
        error: "Something went wrong. Please try again.",
      }
    : {
        title: "Kontakt",
        intro: "Har du et samarbejdsønske eller et spørgsmål? Skriv til mig – jeg vender tilbage hurtigst muligt.",
        name: "Navn",
        email: "Email",
        subject: "Emne",
        message: "Besked",
        send: "Send besked",
        success: "Tak! Jeg vender tilbage hurtigst muligt.",
        error: "Noget gik galt. Prøv igen.",
      };

  return (
    <div className="min-h-[70vh] bg-hero-gradient">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="text-white/80 mt-2">{t.intro}</p>

        <div className="flex gap-4 mt-6 mb-8">
          <a
            href="mailto:elisabeth@example.com"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow transition"
            target="_blank"
            rel="noopener noreferrer"
          >Email</a>
          <a
            href="https://github.com/CodeBloodedMama"
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold shadow transition"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a>
          <a
            href="https://www.linkedin.com/in/elisabeth-lennert/"
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold shadow transition"
            target="_blank"
            rel="noopener noreferrer"
          >LinkedIn</a>
        </div>

        <div className="mt-8">
          <ContactForm lang={lang} t={t} />
        </div>
      </div>
    </div>
  );
}
