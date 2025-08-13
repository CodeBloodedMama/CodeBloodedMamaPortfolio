import ContactForm from "../../../components/ContactForm";

export default function ContactPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = searchParams?.lang === "en" ? "en" : "da";

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
        name: "Elisabeth Lennert",
        email: "elisabethbinzerlennert@gmail.com",
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
        <div className="mt-8">
          <ContactForm lang={lang} t={t} />
        </div>
      </div>
    </div>
  );
}
