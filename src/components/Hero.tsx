"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[90vh] bg-white pt-28 pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Metadata Row (Matching Image 1) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-end mb-8">
        <span className="text-[11px] sm:text-xs font-technical uppercase tracking-widest text-neutral-500">
          {t("أعمال مختارة | 2026-2027", "SELECTED WORKS | 2026-2027")}
        </span>
      </div>

      {/* Main Composition (Matching Image 1 layout) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Architectural 3D Perspective Cutout */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm group">
              <Image
                src="/images/projects/project-1.jpg"
                alt="Alaa Issa Architectural Space"
                fill
                priority
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Subtle architectural frame overlay line */}
              <div className="absolute inset-4 border border-white/40 pointer-events-none" />
              <div className="absolute bottom-4 start-4 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-technical uppercase tracking-wider text-black">
                {t("منظور صالون التجمع • ريزيدنس فاخر", "Living Suite Panorama • New Cairo")}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography Composition (Exact to Image 1) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 lg:ps-8">
            <div className="space-y-4">
              {/* Large Spaced Lowercase Title: portfolio */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial tracking-[0.08em] sm:tracking-[0.14em] text-black lowercase leading-none select-none">
                portfolio
              </h1>

              {/* Subtitle: INTERIOR DESIGN */}
              <div className="text-xs sm:text-sm font-technical uppercase tracking-[0.25em] text-neutral-800 pt-2">
                {t("التصميم الداخلي والديكور المعماري", "INTERIOR DESIGN")}
              </div>

              {/* Horizontal Line (From Image 1) */}
              <div className="w-28 sm:w-36 h-[1.5px] bg-black my-4" />

              {/* Designer Name: ALAA ISSA */}
              <div className="text-xl sm:text-2xl md:text-3xl font-technical tracking-wider text-black uppercase font-medium">
                {t("م. آلاء عيسى", "ALAA  ISSA")}
              </div>
            </div>

            {/* Concise designer introduction */}
            <p className="text-xs sm:text-sm text-neutral-600 max-w-lg leading-relaxed font-sans">
              {t(
                "مهندسة تصميم داخلي ومعماري؛ أبتكر فراغات تجمع بين التخطيط المكاني الذكي، الخامات الطبيعية الدافئة، وهندسة الإضاءة لتقديم تجربة سكنية راقية ومريحة.",
                "Architectural interior designer crafting thoughtful spaces combining intelligent spatial layouts, tactile materials, and ambient lighting for refined living."
              )}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#case-study"
                className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
              >
                <span>{t("استعراض دراسة المشروع والمخططات", "Explore Project Case Study")}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="px-6 py-3 border border-black/20 hover:border-black text-black text-xs uppercase tracking-widest font-medium transition-colors"
              >
                {t("عن المهندسة والسيرة الذاتية", "About & Resume")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-center pt-8">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-[11px] font-technical uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
