"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "da" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("da");

  // Init fra localStorage else browser
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("cbm_lang") as Lang | null) : null;
    if (saved) setLang(saved);
    else if (typeof navigator !== "undefined") setLang(navigator.language.startsWith("en") ? "en" : "da");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("cbm_lang", lang);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, toggle: () => setLang(l => (l === "da" ? "en" : "da")) }), [lang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within <LanguageProvider/>");
  return ctx;
}
