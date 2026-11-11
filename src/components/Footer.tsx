"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Compass,
  MessageCircle,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#09090b] border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfbe95] via-[#c5a880] to-[#8c6d42] p-[1px]">
                <div className="w-full h-full bg-[#141418] rounded-[11px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#dfbe95]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider uppercase text-white font-serif">
                  {lang === "ar" ? "م. آلاء عيسى" : "Alaa Issa"}
                </span>
                <span className="text-[10px] tracking-widest text-[#dfbe95] uppercase font-sans">
                  {t("تصميم داخلي وديكور معماري", "Interior Architecture & Decor")}
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-[#9c978e] leading-relaxed max-w-sm">
              {t(
                "مهندسة ديكور وتصميم داخلي متخصصة في ابتكار المساحات السكنية والتجارية الراقية، والإشراف الهندسي المباشر على التنفيذ وتفصيل الأثاث المودرن في أرقى أحياء القاهرة والشيخ زايد.",
                "Interior architect specializing in refined residential sanctuaries, bespoke furniture joinery, and attentive on-site execution supervision."
              )}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#c5a880] text-[#cac5bb] hover:text-black flex items-center justify-center transition-all border border-white/5"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-emerald-500 text-[#cac5bb] hover:text-white flex items-center justify-center transition-all border border-white/5"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t("أقسام الموقع", "Navigation")}
            </h4>
            <ul className="space-y-2 text-xs text-[#a8a49c]">
              <li>
                <a href="#home" className="hover:text-[#dfbe95] transition-colors">
                  {t("الرئيسية", "Home")}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#dfbe95] transition-colors">
                  {t("عن المهندسة آلاء", "About Eng. Alaa")}
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-[#dfbe95] transition-colors">
                  {t("أحدث أعمالي", "Featured Work")}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#dfbe95] transition-colors">
                  {t("معرض المشاريع", "Portfolio")}
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-[#dfbe95] transition-colors">
                  {t("مقارنة قبل وبعد", "Before & After")}
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#dfbe95] transition-colors">
                  {t("حاسبة التكلفة", "Cost Calculator")}
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t("خدماتي", "My Services")}
            </h4>
            <ul className="space-y-2 text-xs text-[#a8a49c]">
              <li>
                <a href="#services" className="hover:text-[#dfbe95] transition-colors">
                  {t("تصميم 3D ورندرات واقعية", "3D Photorealistic Design")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#dfbe95] transition-colors">
                  {t("إشراف تنفيذي وتسليم مفتاح", "Turnkey Fit-Out Supervision")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#dfbe95] transition-colors">
                  {t("تفصيل أثاث ونجارة مخصصة", "Bespoke Furniture")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#dfbe95] transition-colors">
                  {t("إضاءة معمارية وأجواء دافئة", "Architectural Lighting")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#dfbe95] transition-colors">
                  {t("مخططات تنفيذية (Shop Drawings)", "Executive Blueprints")}
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Hours & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t("التواصل المباشر", "Direct Contact")}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a8a49c]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#dfbe95]" />
                <span dir="ltr">+20 100 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#dfbe95]" />
                <span>{DESIGNER_INFO.email}</span>
              </li>
              <li className="text-[11px] text-[#88847c] pt-2">
                {t(
                  "متاح استقبال طلبات التصميم والمعاينات في القاهرة والشيخ زايد",
                  "Inquiries & site visits available in Cairo & Zayed"
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d7970]">
          <div>
            © {new Date().getFullYear()} {t("م. آلاء عيسى للتصميم الداخلي والديكور.", "Eng. Alaa Issa | Interior Design & Decor. All rights reserved.")}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-[#dfbe95] transition-colors"
            >
              <span>{t("العودة للأعلى", "Back to top")}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Instant WhatsApp Button */}
      <a
        href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
          "مرحباً م. آلاء عيسى، أود الاستفسار عن خدمات التصميم الداخلي لمشروعي."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 end-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-emerald-600/40 transition-all transform hover:scale-105"
        title="WhatsApp Direct with Eng. Alaa"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">{t("محادثة مع م. آلاء عبر واتساب", "Chat with Eng. Alaa")}</span>
      </a>
    </footer>
  );
}
