"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { Menu, X, MessageCircle, Globe, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", labelAr: "الرئيسية", labelEn: "Home" },
    { href: "#about", labelAr: "عن المهندسة", labelEn: "About Me" },
    { href: "#resume", labelAr: "السيرة والمهارات", labelEn: "Resume & Skills" },
    { href: "#case-study", labelAr: "المخططات والمشروع", labelEn: "Case Study & Plans" },
    { href: "#portfolio", labelAr: "الأعمال المختارة", labelEn: "Selected Works" },
    { href: "#estimator", labelAr: "حاسبة التكلفة", labelEn: "Cost Estimator" },
    { href: "#contact", labelAr: "تواصل معي", labelEn: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm py-4"
          : "bg-white border-b border-black/5 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Name - Minimalist Monograph Style */}
          <a href="#home" className="flex flex-col group">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-black font-editorial uppercase">
              {lang === "ar" ? "م. آلاء عيسى" : "ALAA ISSA"}
            </span>
            <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-technical">
              {t("تصميم داخلي • عمارة وديكور", "INTERIOR ARCHITECTURE & DESIGN")}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-wider font-medium text-neutral-600 hover:text-black transition-colors"
              >
                {t(link.labelAr, link.labelEn)}
              </a>
            ))}
          </nav>

          {/* Actions & Language Switcher */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="px-3 py-1 text-xs font-semibold tracking-wider text-black border border-black/20 hover:border-black rounded transition-colors"
              title="Toggle language"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>

            <a
              href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
                "مرحباً م. آلاء عيسى، أود الاستفسار عن خدمات التصميم الداخلي لمشروعي."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-black hover:bg-neutral-800 text-white rounded transition-colors flex items-center gap-2"
            >
              <span>{t("تواصل مباشر", "Get In Touch")}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="px-2 py-1 text-xs font-semibold text-black border border-black/20 rounded"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-neutral-100 rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-6 pb-6 pt-4 bg-white border-b border-black/10">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-wider font-medium text-neutral-700 hover:text-black py-1"
              >
                {t(link.labelAr, link.labelEn)}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-black/10 flex flex-col gap-2">
            <a
              href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs uppercase tracking-wider font-medium bg-black text-white rounded"
            >
              {t("مراسلة م. آلاء عبر واتساب", "WhatsApp Chat with Eng. Alaa")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
