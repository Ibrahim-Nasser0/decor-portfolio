"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight, MessageCircle, Phone, Minimize2, Maximize2 } from "lucide-react";

export default function Navbar() {
  const { lang, setLang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
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
      const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
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
    { id: "hero", href: "#hero", num: "01", labelAr: "Hero", labelEn: "Hero" },
    { id: "about", href: "#about", num: "02", labelAr: "About", labelEn: "About" },
    { id: "skills", href: "#skills", num: "03", labelAr: "Skills", labelEn: "Skills" },
    { id: "experience", href: "#experience", num: "04", labelAr: "Experience", labelEn: "Experience" },
    { id: "projects", href: "#projects", num: "05", labelAr: "Projects", labelEn: "Projects" },
    { id: "contact", href: "#contact", num: "06", labelAr: "Contact", labelEn: "Contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isCompact || isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/10 py-2.5 sm:py-3 shadow-xs"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-200 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Editorial Typography */}
            <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 2xl:gap-3.5 group shrink-0">
              {/* Eng. Alaa Issa Portrait Avatar Icon */}
              <div className={`relative ${isCompact ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10"} rounded-full overflow-hidden border border-black/80 bg-neutral-100 shadow-xs group-hover:ring-2 group-hover:ring-black transition-all shrink-0`}>
                <Image
                  src="/images/alaa.webp"
                  alt="Eng. Alaa Issa - Interior Architect"
                  fill
                  priority
                  sizes="(max-width: 640px) 32px, (max-width: 1536px) 36px, 40px"
                  className="object-cover object-top filter grayscale-15 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`${isCompact ? "text-xs sm:text-sm" : "text-sm sm:text-base md:text-lg 2xl:text-xl"} font-bold tracking-[0.12em] sm:tracking-[0.14em] text-black font-editorial uppercase leading-tight transition-all`}>
                    ALAA ISSA
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" title="Available for projects" />
                </div>
                {!isCompact && (
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] 2xl:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] text-neutral-500 uppercase font-technical font-medium">
                    INTERIOR ARCHITECT • CAIRO
                  </span>
                )}
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 text-[11px] 2xl:text-xs uppercase tracking-[0.15em] 2xl:tracking-[0.18em] font-technical transition-colors group flex items-center gap-1.5 ${
                      isActive ? "text-black font-bold" : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    <span className="text-[9px] 2xl:text-[10px] text-neutral-400 font-mono group-hover:text-black transition-colors">
                      {link.num}
                    </span>
                    <span>{link.labelEn}</span>

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

            {/* Actions: Size Toggle + WhatsApp + CTA */}
            <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 2xl:gap-4 shrink-0">
              {/* Compact / Shrink Mode Toggle Button */}
              <button
                type="button"
                onClick={() => setIsCompact(!isCompact)}
                className="w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10 rounded-sm border border-neutral-300 hover:border-black text-neutral-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                title={isCompact ? "Expand to Full Navbar" : "Shrink to Compact Navbar"}
              >
                {isCompact ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Quick WhatsApp Pill */}
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Eng. Alaa Issa, I would like to inquire about booking an interior design consultation for my project."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10 rounded-sm border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 flex items-center justify-center text-neutral-700 transition-colors"
                title="WhatsApp Consultation"
              >
                <MessageCircle className="w-4 h-4 2xl:w-4.5 2xl:h-4.5" />
              </a>

              {/* Consultation Booking Button */}
              <a
                href="#contact"
                className={`${isCompact ? "px-3.5 py-1.5 text-[10px]" : "px-5 2xl:px-6 py-2.5 2xl:py-3 text-[11px] 2xl:text-xs"} bg-black hover:bg-neutral-800 text-white uppercase tracking-[0.16em] font-technical font-medium transition-all flex items-center gap-1.5 shadow-xs`}
              >
                <span>Book Discovery</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Compact Toggle Mobile */}
              <button
                type="button"
                onClick={() => setIsCompact(!isCompact)}
                className="p-1.5 border border-black/10 hover:border-black text-neutral-600 transition-colors"
                title={isCompact ? "Expand" : "Shrink"}
              >
                {isCompact ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              {/* Quick WhatsApp Pill Mobile */}
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Eng. Alaa Issa, I would like to inquire about booking an interior design consultation for my project."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-black/10 hover:border-black text-emerald-600 transition-colors"
                title="WhatsApp Consultation"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

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
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-5 sm:px-8 overflow-y-auto animate-in fade-in duration-200">
          <div>
            <div className="text-[10px] font-technical uppercase tracking-[0.25em] text-neutral-400 pb-3 border-b border-neutral-200">
              ARCHITECTURAL INDEX • MONOGRAPH 2026
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
                        {link.labelEn}
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
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-black/80 shrink-0">
                  <Image
                    src="/images/alaa.jpeg"
                    alt="Eng. Alaa Issa"
                    fill
                    sizes="28px"
                    className="object-cover object-top"
                  />
                </div>
                <span>Designer:</span>
              </div>
              <span className="font-bold text-black">Eng. Alaa Issa</span>
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
                <span>WhatsApp Direct</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <span>Book Discovery</span>
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
