"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SERVICES } from "@/data/portfolioData";
import {
  Cuboid,
  Hammer,
  Armchair,
  Sparkles,
  Compass,
  Palette,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function ServicesSection() {
  const { lang, t } = useLanguage();

  const iconMap: Record<string, any> = {
    Cuboid,
    Hammer,
    Armchair,
    Sparkles,
    Compass,
    Palette,
  };

  return (
    <section id="services" className="py-24 bg-[#0e0e12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{t("خدماتنا الهندسية المتكاملة", "Our Services")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight mb-4">
            {t("حلول متكاملة من الفكرة للتسليم", "End-to-End Interior Solutions")}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c]">
            {t(
              "نقدم منظومة عمل شاملة تغطي كافة مراحل التصميم المعماري الداخلي، التنفيذ الإنشائي، والتأثيث المخصص بأعلى معايير الإتقان.",
              "A comprehensive studio workflow covering interior architectural design, precision engineering fit-out, and bespoke furniture manufacturing."
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.iconName] || Sparkles;
            return (
              <div
                key={service.id}
                className="group p-6 sm:p-7 rounded-2xl glass-panel border border-white/10 hover:border-[#c5a880]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dfbe95]/20 to-[#c5a880]/5 border border-[#c5a880]/30 flex items-center justify-center text-[#dfbe95] mb-5 group-hover:bg-[#c5a880] group-hover:text-black transition-all duration-300 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white font-serif group-hover:text-[#dfbe95] transition-colors mb-3">
                    {t(service.title, service.titleEn)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#a8a49c] leading-relaxed mb-6">
                    {t(service.description, service.descriptionEn)}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 mb-6">
                    {service.featuresEn.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#cfcac0]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dfbe95] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Card Footer CTA */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={`https://wa.me/201000000000?text=${encodeURIComponent(
                      `مرحباً استوديو Decor Portfolio، أود الاستفسار عن خدمة "${service.title}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#dfbe95] hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t("طلب استشارة لهذه الخدمة", "Inquire About Service")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

