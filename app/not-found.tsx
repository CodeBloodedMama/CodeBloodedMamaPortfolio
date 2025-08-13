"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout"; // samme layout som dine andre sider

function NotFoundContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || (typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : "en");

  const translations: Record<string, { title: string; description: string }> = {
    da: {
      title: "Siden blev ikke fundet",
      description: "Ups! Vi kunne ikke finde den side, du leder efter.",
    },
    en: {
      title: "Page Not Found",
      description: "Oops! We couldn't find the page you were looking for.",
    },
  };

  const t = translations[lang] || translations["en"];

  return (
    <Layout>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          {lang === "da" ? "Tilbage til forsiden" : "Back to Home"}
        </a>
      </div>
    </Layout>
  );
}

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
