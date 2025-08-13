"use client";
import Link from "next/link";
import { Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Nav(){
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [lang, setLang] = useState(params.get("lang")==="en" ? "en" : "da");
  useEffect(()=>{ const l = params.get("lang"); if(l) setLang(l); },[params]);
  const navItem = (href:string, da:string, en:string) => {
    const hrefWithLang = `${href}?lang=${lang}`;
    const active = pathname === href;
    return <Link href={hrefWithLang} className={`px-3 py-2 rounded ${active ? 'bg-white/10' : 'hover:bg-white/5'}`}>{lang==="en"?en:da}</Link>;
  };
  const toggleLang = () => { const next = lang==="en"?"da":"en"; const qs = new URLSearchParams(params as any); qs.set("lang", next); router.push(`${pathname}?${qs.toString()}`); };
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-2"><img src="/logo.png" alt="logo" className="w-14 h-14"/><span className="font-semibold">CodeBloodedMama</span></Link>
        <div className="flex items-center gap-2">
          {navItem("/","Intro","Intro")}
          {navItem("/cv","CV","CV")}
          {navItem("/projects","Projekter","Projects")}
          {navItem("/blog","Blog","Blog")}
          {navItem("/contact", "Kontakt", "Contact")}
          {navItem("/about", "Om mig", "About")}
          {navItem("/not-found", "404", "404")}

          <button onClick={toggleLang} className="ml-2 px-3 py-2 rounded border border-white/20 hover:bg-white/10">{lang==="en"?"DA 🇩🇰":"EN 🇬🇧"}</button>
        </div>
      </div>
    </nav>
    </Suspense>
  );
}
