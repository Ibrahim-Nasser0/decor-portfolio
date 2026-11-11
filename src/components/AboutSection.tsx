"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";

export default function AboutSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white border-t border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top-Left Designer Header (Exact to Image 2) */}
        <div className="mb-12">
          <div className="text-sm font-technical font-bold uppercase tracking-widest text-black">
            {t("م. آلاء عيسى", "ALAA ISSA")}
          </div>
          <div className="text-[11px] font-technical uppercase tracking-widest text-neutral-500 mt-0.5">
            {t("التصميم الداخلي | العمارة | الديكور", "INTERIOR DESIGN | ARCHITECTURE | DECOR")}
          </div>
        </div>

        {/* Main 2-Column Composition with Vertical Divider (Matching Image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Portrait & Location */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="relative aspect-[3/4] w-full max-w-sm bg-neutral-100 overflow-hidden border border-neutral-200 shadow-sm group">
              <Image
                src="/images/projects/project-4.jpg"
                alt="Eng. Alaa Issa Interior Architecture"
                fill
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Location Tag Under Photo (From Image 2) */}
            <div className="text-xs font-technical uppercase tracking-widest text-neutral-600 pt-1">
              {t("القاهرة | مصر", "CAIRO | EGYPT")}
            </div>
          </div>

          {/* Center Vertical Divider (From Image 2) */}
          <div className="hidden lg:block lg:col-span-1 self-stretch flex justify-center">
            <div className="w-[1.5px] h-full bg-black/20" />
          </div>

          {/* Right Column: Title + Underline + Bio Paragraphs (From Image 2) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 lg:pt-4">
            <div>
              <h2 className="text-4xl sm:text-6xl font-editorial tracking-wide text-black capitalize">
                {t("عن المهندسة", "About me")}
              </h2>

              {/* Horizontal line under title (From Image 2) */}
              <div className="w-24 sm:w-32 h-[1.5px] bg-black mt-4 mb-8" />

              <div className="space-y-6 text-neutral-700 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
                <p>{t(DESIGNER_INFO.aboutIntroAr, DESIGNER_INFO.aboutIntroEn)}</p>
                <p>{t(DESIGNER_INFO.aboutExperienceAr, DESIGNER_INFO.aboutExperienceEn)}</p>
              </div>
            </div>

            {/* Quick architectural hallmarks */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
              <div>
                <span className="block text-2xl font-editorial font-bold text-black">85+</span>
                <span className="text-[10px] font-technical uppercase tracking-wider text-neutral-500">
                  {t("مشروع مكتمل", "Projects")}
                </span>
              </div>
              <div>
                <span className="block text-2xl font-editorial font-bold text-black">07+</span>
                <span className="text-[10px] font-technical uppercase tracking-wider text-neutral-500">
                  {t("سنوات خبرة", "Years Exp.")}
                </span>
              </div>
              <div>
                <span className="block text-2xl font-editorial font-bold text-black">100%</span>
                <span className="text-[10px] font-technical uppercase tracking-wider text-neutral-500">
                  {t("مطابقة المخطط", "Fidelity")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
