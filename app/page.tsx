"use client";

import da from "@/content/da.json"; 
import en from "@/content/en.json"; 
import HeroLanding from "@/components/HeroLanding"; 
import Section from "@/components/Section";
import { Suspense } from "react";
export default function Page({ searchParams }:{ searchParams:{ lang?: string } }){
  const lang = searchParams?.lang === "en" ? "en" : "da"; 
  const data = lang === "en" ? en : da;
  return (
    <Suspense fallback={<div className="text-center text-white/70">Loading...</div>}>
      <HeroLanding 
        name={data.name} 
        title={data.title}
        intro={data.intro}
      />
      </Suspense>


    );
}
