"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";

export default function ResumeSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="resume" className="py-24 bg-white border-t border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Statement Across Header (Exact to Image 3) */}
        <div className="max-w-5xl mb-12">
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans text-justify">
            {t(DESIGNER_INFO.statementAr, DESIGNER_INFO.statementEn)}
          </p>
        </div>

        {/* Horizontal Divider Line (Exact to Image 3) */}
        <div className="w-full h-[1px] bg-neutral-300 mb-12" />

        {/* Two-Column Grid Layout (Exact to Image 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: EDUCATION, Technical Skills, Hobbies (6 cols) */}
          <div className="lg:col-span-6 space-y-12">
            {/* EDUCATION */}
            <div>
              <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-6 pb-2 border-b border-black">
                {t("التعليم والمؤهلات الأكاديمية", "EDUCATION")}
              </h3>
              <div className="space-y-6">
                {DESIGNER_INFO.education.map((edu, idx) => (
                  <div key={idx} className="flex items-start gap-4 text-xs">
                    <span className="w-24 shrink-0 font-technical text-neutral-500 font-medium">
                      • {edu.year}
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-black font-sans">
                        {t(edu.titleAr, edu.titleEn)}
                      </div>
                      <div className="text-neutral-600">
                        {t(edu.institutionAr, edu.institutionEn)}
                      </div>
                      <p className="text-neutral-500 text-[11px] leading-relaxed">
                        {t(edu.descAr, edu.descEn)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical and Artistic Skills */}
            <div>
              <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-6 pb-2 border-b border-black">
                {t("المهارات التقنية والفنية", "Technical and Artistic Skills")}
              </h3>
              <div className="text-xs space-y-2">
                <div className="font-bold text-black font-sans mb-1">
                  {t("المجالات الفنية والمعمارية:", "Artistic Domains:")}
                </div>
                {(lang === "ar" ? DESIGNER_INFO.skills.technicalAr : DESIGNER_INFO.skills.technicalEn).map(
                  (skill, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-neutral-700">
                      <span className="text-neutral-400">•</span>
                      <span>{skill}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Hobbies / Design Explorations */}
            <div>
              <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-6 pb-2 border-b border-black">
                {t("الاهتمامات والاستكشافات الإبداعية", "Hobbies & Design Explorations")}
              </h3>
              <div className="text-xs space-y-3">
                {(lang === "ar" ? DESIGNER_INFO.skills.hobbiesAr : DESIGNER_INFO.skills.hobbiesEn).map(
                  (hobby, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-neutral-600 leading-relaxed">
                      <span className="text-neutral-400">•</span>
                      <span>{hobby}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Design & Modeling Software, Languages, Contact (6 cols) */}
          <div className="lg:col-span-6 space-y-12">
            {/* Design and Modeling Software (Exact to Image 3) */}
            <div>
              <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-6 pb-2 border-b border-black">
                {t("برامج النمذجة والتصميم الهندسي", "Design and Modeling Software")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DESIGNER_INFO.software.map((sw, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between hover:border-black transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-black">{sw.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sw.color}`}>
                        {sw.badge}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500">{sw.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages (Exact to Image 3) */}
            <div>
              <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-6 pb-2 border-b border-black">
                {t("اللغات", "Languages")}
              </h3>
              <div className="space-y-2 text-xs">
                {DESIGNER_INFO.skills.languages.map((langItem, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-neutral-100">
                    <span className="font-bold text-black font-technical">
                      {t(langItem.nameAr, langItem.nameEn)}
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      {t(langItem.levelAr, langItem.levelEn)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details (Exact to Image 3) */}
            <div>
              <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-6 pb-2 border-b border-black">
                {t("بيانات التواصل المباشر", "Contact")}
              </h3>
              <div className="space-y-4 text-xs">
                <a
                  href={`mailto:${DESIGNER_INFO.email}`}
                  className="flex items-center gap-3 text-neutral-700 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-mono">{DESIGNER_INFO.email}</span>
                </a>

                <a
                  href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-neutral-700 hover:text-emerald-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="font-mono" dir="ltr">{DESIGNER_INFO.phone}</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-neutral-700 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <span>{DESIGNER_INFO.linkedin}</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-neutral-700 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span>{DESIGNER_INFO.instagram}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
