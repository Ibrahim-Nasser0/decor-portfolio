"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Sparkles,
  Heart,
  Palette,
  Compass,
  CheckCircle2,
  MessageCircle,
  Quote,
  Award,
} from "lucide-react";

export default function AboutSection() {
  const { lang, t } = useLanguage();

  const philosophyPillars = [
    {
      titleAr: "الهدوء البصري والسكينة",
      titleEn: "Visual Serenity & Warmth",
      descAr:
        "أعتمد على لوحات الألوان الترابية المتوازنة والخامات العضوية كخشب الجوز والكتان لتوفير بيئة منزلية تمنحك الراحة النفسية التامة بعد يوم عمل طويل.",
      descEn:
        "Curating earthy, tactile palettes and natural walnut joinery that foster calming, timeless living spaces.",
      icon: Heart,
    },
    {
      titleAr: "هندسة الإضاءة المدروسة",
      titleEn: "Architectural Lighting",
      descAr:
        "الإضاءة هي روح المكان؛ أهتم بدراسة مسارات الإنارة المخفية والدرجات الدافئة (3000K) لتبرز تفاصيل الخامات وتصنع أجواءً ساحرة ليلاً ونهاراً.",
      descEn:
        "Treating light as a core architectural material, layering 3000K warm ambient glows to celebrate textures and forms.",
    },
    {
      titleAr: "الدقة الهندسية والمطابقة 100%",
      titleEn: "Design-to-Reality Fidelity",
      descAr:
        "أشرف شخصياً على تنفيذ المخططات وتفصيل الأثاث والمقاسات خطوة بخطوة مع الفنيين لضمان أن ما وافقت عليه في الرندر 3D يتطابق بدقة في الواقع.",
      descEn:
        "Hands-on technical supervision and bespoke joinery coordination ensuring the built reality mirrors the 3D render perfectly.",
      icon: Compass,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0d] border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Side / Designer Profile Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-[#c5a880]/30 shadow-2xl p-2 group">
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#16151a]">
                <Image
                  src="/images/projects/project-1.jpg"
                  alt="Alaa Issa Interior Design"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/40 to-transparent" />

                {/* Floating overlay card */}
                <div className="absolute bottom-6 inset-x-6 p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfbe95] to-[#c5a880] p-[1px] shrink-0">
                      <div className="w-full h-full bg-[#141418] rounded-[11px] flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#dfbe95]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-serif">
                        {t(DESIGNER_INFO.nameAr, DESIGNER_INFO.nameEn)}
                      </h3>
                      <p className="text-[11px] text-[#dfbe95] font-medium">
                        {t(DESIGNER_INFO.titleAr, DESIGNER_INFO.titleEn)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#b5b0a6] leading-relaxed">
                    {t(
                      "خبرة +7 سنوات في التصميم السكني والتجاري الفاخر في القاهرة الجديدة والشيخ زايد.",
                      "7+ years crafting high-end residential & commercial spaces across New Cairo and Sheikh Zayed."
                    )}
                  </p>
                </div>
              </div>

              {/* Decorative top badge */}
              <div className="absolute top-5 start-5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#c5a880]/40 text-[11px] font-semibold text-[#dfbe95] flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("لمسة شخصية وحرفية معمارية", "Personal Architectural Touch")}</span>
              </div>
            </div>
          </div>

          {/* Text & Philosophy Side (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-4">
                <Palette className="w-3.5 h-3.5" />
                <span>{t("عن المهندسة آلاء عيسى", "About The Designer")}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight leading-tight mb-6">
                {t("أصمم منزلك ليكون انعكاساً لروحك ودفء تفاصيلك اليومية", "Designing Homes That Reflect Your Soul & Daily Rhythm")}
              </h2>

              <p className="text-sm sm:text-base text-[#b8b3a8] leading-relaxed mb-6 font-sans">
                {t(DESIGNER_INFO.bioAr, DESIGNER_INFO.bioEn)}
              </p>

              {/* Quote block */}
              <div className="p-5 rounded-2xl glass-panel-gold border border-[#c5a880]/20 relative mb-8">
                <Quote className="w-8 h-8 text-[#c5a880]/20 absolute top-4 end-4" />
                <p className="text-xs sm:text-sm text-[#e4ded6] font-serif italic leading-relaxed pe-6">
                  {t(
                    '"التصميم الداخلي الناجح لا ينتهي عند جمال الصورة، بل يبدأ من الشعور الذي يغمرك في اللحظة الأولى التي تفتح فيها باب منزلك."',
                    '"Successful interior architecture is never just about a pretty photograph; it begins with the profound sense of belonging you feel the moment you step through your front door."'
                  )}
                </p>
                <div className="text-[11px] text-[#dfbe95] font-bold mt-2 font-sans">
                  — {t(DESIGNER_INFO.nameAr, DESIGNER_INFO.nameEn)}
                </div>
              </div>
            </div>

            {/* Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {philosophyPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-panel border border-white/5 hover:border-[#c5a880]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-serif mb-2">
                      {t(pillar.titleAr, pillar.titleEn)}
                    </h4>
                    <p className="text-[11px] text-[#9c978e] leading-relaxed">
                      {t(pillar.descAr, pillar.descEn)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#dfbe95] via-[#c5a880] to-[#b39162] text-[#121216] shadow-lg shadow-[#c5a880]/20 hover:brightness-110 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t("احجز استشارتك المباشرة مع م. آلاء", "Book Consultation with Eng. Alaa")}</span>
              </a>

              <a
                href="https://wa.me/201000000000?text=مرحباً%20م.%20آلاء%20عيسى،%20أود%20الاستفسار%20عن%20خدمات%20التصميم%20الداخلي%20لمشروعي"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("تحدثي مع م. آلاء عبر واتساب", "WhatsApp Chat with Eng. Alaa")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
