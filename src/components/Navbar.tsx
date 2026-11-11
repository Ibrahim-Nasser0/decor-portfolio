"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Globe,
  Compass,
  ArrowUpRight,
} from "lucide-react";

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
    { href: "#featured", labelAr: "أحدث أعمالنا", labelEn: "Featured" },
    { href: "#portfolio", labelAr: "معرض المشاريع", labelEn: "Portfolio" },
    { href: "#before-after", labelAr: "قبل وبعد", labelEn: "Before & After" },
    { href: "#services", labelAr: "خدماتنا", labelEn: "Services" },
    { href: "#estimator", labelAr: "حاسبة التكلفة", labelEn: "Cost Estimator" },
    { href: "#process", labelAr: "مراحل العمل", labelEn: "Process" },
    { href: "#contact", labelAr: "تواصل معنا", labelEn: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#111114]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfbe95] via-[#c5a880] to-[#8c6d42] p-[1px] shadow-lg shadow-[#c5a880]/10">
              <div className="w-full h-full bg-[#141418] rounded-[11px] flex items-center justify-center group-hover:bg-[#1a191f] transition-colors">
                <Compass className="w-5 h-5 text-[#dfbe95] group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-wider uppercase text-white font-serif">
                Decor <span className="text-[#c5a880]">Portfolio</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#a8a49c] uppercase font-sans">
                {t("استوديو التصميم الداخلي الفاخر", "Luxury Interior Architecture")}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs xl:text-sm font-medium text-[#d4cfc7] hover:text-[#dfbe95] hover:bg-white/5 rounded-lg transition-colors"
              >
                {t(link.labelAr, link.labelEn)}
              </a>
            ))}
          </nav>

          {/* Actions & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-[#d4cfc7] border border-white/10 transition-all hover:border-[#c5a880]/40"
              title={t("تغيير اللغة إلى الإنجليزية", "Switch language to Arabic")}
            >
              <Globe className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href="https://wa.me/201000000000?text=مرحباً،%20أود%20الاستفسار%20عن%20خدمات%20التصميم%20الداخلي"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all"
              title={t("مراسلة واتساب مباشرة", "Direct WhatsApp Chat")}
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Book Consultation Button */}
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold bg-gradient-to-r from-[#c5a880] to-[#b39162] hover:from-[#dfbe95] hover:to-[#c5a880] text-[#141316] shadow-md shadow-[#c5a880]/20 hover:shadow-lg hover:shadow-[#c5a880]/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>{t("احجز استشارتك", "Book Consultation")}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded text-xs font-semibold bg-white/5 text-[#d4cfc7] border border-white/10"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pb-6 pt-2 bg-[#121216]/98 backdrop-blur-2xl border-b border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-[#d4cfc7] hover:text-[#dfbe95] hover:bg-white/5 rounded-xl transition-all"
              >
                {t(link.labelAr, link.labelEn)}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#c5a880] to-[#b39162] text-[#141316]"
            >
              <span>{t("احجز استشارتك المجانية", "Book Free Consultation")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/201000000000?text=مرحباً،%20أود%20الاستفسار%20عن%20خدمات%20التصميم%20الداخلي"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t("تواصل عبر واتساب", "WhatsApp Chat")}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

