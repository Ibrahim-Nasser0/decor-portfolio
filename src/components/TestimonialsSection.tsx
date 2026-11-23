"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TESTIMONIALS } from "@/data/portfolioData";
import { Star, Quote, MessageSquareHeart } from "lucide-react";

export default function TestimonialsSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 bg-[#0e0e12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>{t("آراء عملائنا الكرام", "Client Experiences")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight mb-4">
            {t("شهادات نفتخر بها", "Words from Our Clients")}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c]">
            {t(
              "ثقة عملائنا هي أثمن ما نبنيه؛ نفخر برضا كل عميل سلمناه مفتاح منزله أو مقره التجاري.",
              "Our clients' trust is our proudest achievement. Here is what homeowners and business leaders say about partnering with us."
            )}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-[#c5a880]/40 transition-all duration-300 shadow-xl relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#c5a880]/20 mb-4" />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#dfbe95] text-[#dfbe95]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#d4cfc7] leading-relaxed mb-6 font-sans">
                  "{test.comment}"
                </p>
              </div>

              {/* User meta */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#c5a880]/40 shrink-0">
                  <Image
                    src={test.avatar}
                    alt={test.name || "Client"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">{test.name}</h4>
                  <p className="text-[11px] text-[#a8a49c]">{test.role}</p>
                  <p className="text-[10px] text-[#c5a880] mt-0.5">{test.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

