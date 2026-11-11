"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight, MessageCircle, Phone } from "lucide-react";

export default function Navbar() {
  const { lang, setLang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Calculate scroll progress percentage
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }

      // Track active section
      const sections = ["home", "about", "resume", "case-study", "portfolio", "estimator", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: "home", href: "#home", num: "01", labelAr: "الرئيسية", labelEn: "Home" },
    { id: "about", href: "#about", num: "02", labelAr: "عن المهندسة", labelEn: "About" },
    { id: "resume", href: "#resume", num: "03", labelAr: "السيرة", labelEn: "Resume" },
    { id: "case-study", href: "#case-study", num: "04", labelAr: "المخططات", labelEn: "Case Study" },
    { id: "portfolio", href: "#portfolio", num: "05", labelAr: "المشاريع", labelEn: "Works" },
    { id: "estimator", href: "#estimator", num: "06", labelAr: "المقايسة", labelEn: "Estimator" },
    { id: "contact", href: "#contact", num: "07", labelAr: "تواصل", labelEn: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/10 py-3.5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-200 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Editorial Typography */}
            <a href="#home" className="flex items-center gap-3.5 group shrink-0">
              {/* Minimalist Monogram Stamp */}
              <div className="w-9 h-9 border border-black flex items-center justify-center font-technical font-bold text-xs tracking-tighter text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                AI
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold tracking-[0.14em] text-black font-editorial uppercase leading-tight">
                    {lang === "ar" ? "م. آلاء عيسى" : "ALAA ISSA"}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" title="Available for projects" />
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-technical font-medium">
                  {t("تصميم داخلي • عمارة وديكور", "INTERIOR ARCHITECT • CAIRO")}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 text-[11px] uppercase tracking-[0.15em] font-technical transition-colors group flex items-center gap-1.5 ${
                      isActive ? "text-black font-bold" : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    <span className="text-[9px] text-neutral-400 font-mono group-hover:text-black transition-colors">
                      {link.num}
                    </span>
                    <span>{t(link.labelAr, link.labelEn)}</span>

                    {/* Active / Hover Line */}
                    <span
                      className={`absolute -bottom-1 start-0 h-[1.5px] bg-black transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Actions: Segmented Language Pill + WhatsApp + CTA */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {/* Segmented Language Switcher */}
              <div className="flex items-center border border-neutral-300 bg-neutral-50/80 p-0.5 rounded-sm">
                <button
                  type="button"
                  onClick={() => setLang("ar")}
                  className={`px-2.5 py-1 text-[10px] font-technical uppercase font-bold tracking-wider transition-all ${
                    lang === "ar"
                      ? "bg-black text-white shadow-xs"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  عربي
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1 text-[10px] font-technical uppercase font-bold tracking-wider transition-all ${
                    lang === "en"
                      ? "bg-black text-white shadow-xs"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Quick WhatsApp Pill */}
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "مرحباً م. آلاء عيسى، أود الاستفسار عن حجز موعد استشارة تصميم داخلي لمشروعي."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 flex items-center justify-center text-neutral-700 transition-colors"
                title={t("محادثة فورية عبر واتساب", "WhatsApp Consultation")}
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Consultation Booking Button */}
              <a
                href="#contact"
                className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-[11px] uppercase tracking-[0.16em] font-technical font-medium transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>{t("احجزي استشارة", "Book Discovery")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Quick Lang */}
              <button
                type="button"
                onClick={toggleLang}
                className="px-2.5 py-1 text-[11px] font-technical font-bold border border-neutral-300 hover:border-black text-black uppercase"
              >
                {lang === "ar" ? "EN" : "عربي"}
              </button>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 border border-black/10 hover:border-black text-black transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-100 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Full-Screen Architectural Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto animate-in fade-in duration-200">
          <div>
            <div className="text-[10px] font-technical uppercase tracking-[0.25em] text-neutral-400 pb-3 border-b border-neutral-200">
              {t("فهرس المحتوى المعماري • مونوجراف 2026", "ARCHITECTURAL INDEX • MONOGRAPH 2026")}
            </div>

            <nav className="flex flex-col divide-y divide-neutral-100 mt-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3.5 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-neutral-400 group-hover:text-black">
                        {link.num}
                      </span>
                      <span
                        className={`text-base font-editorial tracking-wide ${
                          isActive ? "font-bold text-black" : "text-neutral-700 group-hover:text-black"
                        }`}
                      >
                        {t(link.labelAr, link.labelEn)}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Mobile Menu Footer Details */}
          <div className="pt-6 border-t border-neutral-200 space-y-4">
            <div className="flex items-center justify-between text-xs font-technical text-neutral-600">
              <span>{t("مهندسة الديكور", "Designer")}:</span>
              <span className="font-bold text-black">{lang === "ar" ? "م. آلاء عيسى" : "Eng. Alaa Issa"}</span>
            </div>

            <div className="flex gap-2">
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-technical uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("واتساب مباشر", "WhatsApp")}</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <span>{t("طلب استشارة", "Consultation")}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="text-[10px] font-technical text-neutral-400 text-center uppercase tracking-widest pt-2">
              CAIRO • NEW CAIRO • SHEIKH ZAYED
            </div>
          </div>
        </div>
      )}
    </>
  );
}
