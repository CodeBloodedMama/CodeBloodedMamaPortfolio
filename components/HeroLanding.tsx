'use client';
import { motion } from "framer-motion";
import Link from "next/link";
export default function HeroLanding({ name, title }:{ name:string; title:string; }){
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 left-10 w-24 h-24 rounded-full bg-white/5 blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 rounded-full bg-white/10 blur-xl animate-ping"></div>
        <div className="absolute bottom-10 left-1/4 w-32 h-32 rounded-full bg-white/5 blur-3xl"></div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{opacity:0, x:-30}} animate={{opacity:1, x:0}} transition={{duration:.6}} className="relative">
          <img src="/hero-fullbody.jpg" alt={name} className="w-full max-h-[70vh] object-contain object-bottom rounded-lg shadow-2xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent"></div>
        </motion.div>
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:.6, delay:.15}}>
          <p className="text-sm uppercase tracking-widest text-white/60">aka CodeBloodedMama</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{name}</h1>
          <p className="mt-2 text-xl text-white/80">{title}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/cv" className="btn glow">Enter site</Link>
            <a href="/Elisabeth_Lennert_CV.pdf" download="Elisabeth_Lennert_CV.pdf" className="btn glow">Download CV</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
