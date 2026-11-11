"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { MessageCircle, Phone, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-neutral-300 pt-16 pb-12 relative text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-200">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex flex-col">
              <span className="text-2xl font-editorial font-bold tracking-tight text-black uppercase">
                {lang === "ar" ? "م. آلاء عيسى" : "ALAA ISSA"}
              </span>
              <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-500 mt-1">
                {t("التصميم الداخلي • العمارة والديكور", "INTERIOR ARCHITECTURE & DESIGN")}
              </span>
            </a>

            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm font-sans">
              {t(
                "مهندسة تصميم داخلي ومعماري متخصصة في ابتكار المساحات السكنية والتجارية الراقية، وإعداد المخططات التنفيذية، وتفصيل الأثاث المودرن مع الإشراف الميداني المباشر.",
                "Architectural interior designer specializing in refined residential sanctuaries, bespoke furniture joinery, and attentive on-site execution supervision."
              )}
            </p>

            <div className="text-xs font-technical text-neutral-500 pt-2">
              {t("القاهرة الجديدة | الشيخ زايد | مصر", "NEW CAIRO | SHEIKH ZAYED | EGYPT")}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-4">
              {t("أقسام الموقع", "PORTFOLIO INDEX")}
            </h4>
            <ul className="space-y-2 text-xs font-technical text-neutral-600">
              <li>
                <a href="#home" className="hover:text-black transition-colors">
                  01. {t("الرئيسية", "HOME")}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-black transition-colors">
                  02. {t("عن المهندسة", "ABOUT ME")}
                </a>
              </li>
              <li>
                <a href="#resume" className="hover:text-black transition-colors">
                  03. {t("السيرة والمهارات", "RESUME & SKILLS")}
                </a>
              </li>
              <li>
                <a href="#case-study" className="hover:text-black transition-colors">
                  04. {t("دراسة المشروع والمخططات", "PROJECT CASE STUDY")}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-black transition-colors">
                  05. {t("معرض المشاريع", "SELECTED WORKS")}
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-black transition-colors">
                  06. {t("حاسبة التكلفة", "COST ESTIMATOR")}
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-4">
              {t("التواصل المباشر", "DIRECT CONTACT")}
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              <li className="flex items-center gap-2 text-neutral-700">
                <Phone className="w-3.5 h-3.5 text-black shrink-0" />
                <span dir="ltr" className="font-mono">{DESIGNER_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-700">
                <Mail className="w-3.5 h-3.5 text-black shrink-0" />
                <span className="font-mono">{DESIGNER_INFO.email}</span>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-technical uppercase tracking-wider text-black font-bold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t("مراسلة واتساب مباشرة", "WhatsApp Chat")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-technical text-neutral-500">
          <div>
            © {new Date().getFullYear()} {t("م. آلاء عيسى للتصميم الداخلي والديكور.", "ALAA ISSA INTERIOR DESIGN. ALL RIGHTS RESERVED.")}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-black transition-colors"
          >
            <span>{t("العودة للأعلى", "BACK TO TOP")}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Instant WhatsApp Button */}
      <a
        href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
          "مرحباً م. آلاء عيسى، أود الاستفسار عن خدمات التصميم الداخلي لمشروعي."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 end-6 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-widest shadow-xl transition-all transform hover:scale-105 border border-white/20"
        title="WhatsApp Direct with Eng. Alaa"
      >
        <MessageCircle className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:inline">{t("محادثة مع م. آلاء", "Chat with Eng. Alaa")}</span>
      </a>
    </footer>
  );
}
