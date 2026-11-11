"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { STATS, DESIGNER_INFO } from "@/data/portfolioData";
import { ArrowLeft, ArrowRight, Calculator, Sparkles, UserCheck } from "lucide-react";

export default function Hero() {
  const { lang, t } = useLanguage();
  const isRtl = lang === "ar";

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0a0a0c]"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/projects/project-1.jpg"
          alt="Alaa Issa Interior Design"
          fill
          priority
          className="object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e10] via-[#0e0e10]/60 to-[#0e0e10]" />
        {/* Ambient warm glow lights */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#c5a880]/15 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#a8885b]/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Designer Personal Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1c22]/85 border border-[#c5a880]/40 shadow-lg backdrop-blur-md mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#dfbe95]" />
          <span className="text-xs sm:text-sm font-medium text-[#e4ded6] tracking-wide">
            {t(
              "م. آلاء عيسى • مهندسة الديكور والتصميم الداخلي المعماري",
              "Eng. Alaa Issa • Interior Architect & Decor Designer"
            )}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif max-w-4xl leading-[1.25] sm:leading-[1.2] mb-6">
          {t("أصنع من مساحتك", "Transforming Spaces into")} <br className="hidden sm:inline" />
          <span className="gold-gradient-text font-serif italic">
            {t("تحفة فنية تنبض بالدفء والرقي", "Warm, Refined Architectural Havens")}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[#b8b3a8] max-w-2xl leading-relaxed mb-10 font-sans">
          {t(
            "أهلاً بكِ في مساحتي الخاصة؛ أبتكر تصاميم داخلية تعكس ذوقكِ الخاص وتمنح منزلكِ سكينة بصرية وحلول إضاءة مدروسة، من أول رسمة 3D وحتى إشرافي الشخصي على أدق تفاصيل التشطيب.",
            "Welcome to my portfolio. I create bespoke interior sanctuaries tailored to your personality, blending natural warmth, layered ambient lighting, and hands-on site supervision."
          )}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <a
            href="#featured"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#c5a880] to-[#b39162] hover:from-[#dfbe95] hover:to-[#c5a880] text-[#141316] shadow-xl shadow-[#c5a880]/20 hover:shadow-2xl hover:shadow-[#c5a880]/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>{t("استعرضي أحدث أعمالي", "Explore My Works")}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>

          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#c5a880]/40 transition-all backdrop-blur-md"
          >
            <UserCheck className="w-4 h-4 text-[#dfbe95]" />
            <span>{t("تعرفي على م. آلاء عيسى", "About Eng. Alaa")}</span>
          </a>

          <a
            href="#estimator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#c5a880]/40 transition-all backdrop-blur-md"
          >
            <Calculator className="w-4 h-4 text-[#dfbe95]" />
            <span>{t("حاسبة التكلفة التقديرية", "Calculate Project Cost")}</span>
          </a>
        </div>

        {/* Trust Stats Bar */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 shadow-2xl">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center py-2 px-3 ${
                idx < 3 ? "border-b md:border-b-0 border-white/5 md:border-l md:border-white/5 rtl:md:border-l-0 rtl:md:border-r" : ""
              }`}
            >
              <span className="text-2xl sm:text-3xl font-extrabold gold-gradient-text font-serif">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-[#a39e94] mt-1 font-medium">
                {t(stat.label, stat.labelEn)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
