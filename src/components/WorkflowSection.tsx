"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { WORKFLOW_STEPS } from "@/data/portfolioData";
import { Layers } from "lucide-react";

export default function WorkflowSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="process" className="py-24 bg-[#0a0a0d] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{t("منهجية العمل الهندسية", "Our Methodology")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight mb-4">
            {t("رحلة مشروعك من الفكرة حتى السكن", "From Concept to Turnkey Reality")}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c]">
            {t(
              "خطوات واضحة ومنظمة تمنحك راحة البال التامة والاطلاع الدائم على كل تطور في منزلك أو مشروعك الاستثماري.",
              "A structured 4-stage engineering pathway providing total peace of mind and full visibility over every detail."
            )}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-[#c5a880]/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Step Number */}
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c5a880]/40 to-transparent font-serif mb-4 group-hover:from-[#dfbe95] transition-colors">
                  {step.step}
                </div>

                {/* Step Title */}
                <h3 className="text-base sm:text-lg font-bold text-white font-serif mb-3">
                  {t(step.title, step.titleEn)}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-[#a8a49c] leading-relaxed">
                  {t(step.desc, step.desc)}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#c5a880]">
                <span>{t(`المرحلة ${idx + 1}`, `Phase ${idx + 1}`)}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
