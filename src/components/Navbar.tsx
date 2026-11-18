"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight, MessageCircle, Minimize2, Maximize2 } from "lucide-react";

interface NavbarProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    avatarUrl?: string;
    whatsappNumber?: string;
  };
}

export default function Navbar({ profile }: NavbarProps) {
  const { lang, setLang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Dynamic branding from Supabase designer profile
  const avatarSrc = profile?.avatarUrl || "/images/alaa.webp";
  const brandName = profile?.nameEn || "ALAA ISSA";
  const titleShort = profile?.titleEn ? profile.titleEn.split('&')[0].trim().toUpperCase() : "INTERIOR ARCHITECT";
  const locationShort = profile?.locationEn ? profile.locationEn.split(',')[0].split('|')[0].trim().toUpperCase() : "CAIRO";
  const brandSubtitle = `${titleShort} • ${locationShort}`;
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;

  useEffect(() => {
    setMounted(true);
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
    { id: "hero", href: "#hero", num: "01", labelEn: "Hero" },
    { id: "about", href: "#about", num: "02", labelEn: "About" },
    { id: "skills", href: "#skills", num: "03", labelEn: "Skills" },
    { id: "experience", href: "#experience", num: "04", labelEn: "Experience" },
    { id: "projects", href: "#projects", num: "05", labelEn: "Projects" },
    { id: "contact", href: "#contact", num: "06", labelEn: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mounted ? "animate-navbar-down" : "opacity-0 -translate-y-full"
        } ${
          isCompact || isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/10 py-2.5 sm:py-3 shadow-xs"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-200 py-3.5 sm:py-4.5"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Editorial Typography */}
            <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 2xl:gap-3.5 group shrink-0">
              {/* Eng. Alaa Issa Portrait Avatar Icon */}
              <div
                className={`relative ${
                  isCompact ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10"
                } rounded-full overflow-hidden border border-black/80 bg-neutral-100 shadow-xs group-hover:ring-2 group-hover:ring-black transition-all duration-300 shrink-0 group-hover:scale-105`}
              >
                <Image
                  src={avatarSrc}
                  alt={`${brandName} - Interior Architect`}
                  fill
                  priority
                  sizes="(max-width: 640px) 32px, (max-width: 1536px) 36px, 40px"
                  className="object-cover object-top filter grayscale-15 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`${
                      isCompact
                        ? "text-xs sm:text-sm"
                        : "text-sm sm:text-base md:text-lg 2xl:text-xl"
                    } font-bold tracking-[0.12em] sm:tracking-[0.14em] text-black font-editorial uppercase leading-tight transition-all duration-300 group-hover:text-neutral-800`}
                  >
                    {brandName}
                  </span>
                  {/* Subtle pulsing live indicator */}
                  <span className="relative flex h-2 w-2 items-center justify-center" title="Available for projects">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AD1B8] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7AD1B8]"></span>
                  </span>
                </div>
                {!isCompact && (
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] 2xl:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] text-neutral-500 uppercase font-technical font-medium">
                    {brandSubtitle}
                  </span>
                )}
              </div>
            </a>

            {/* Desktop Navigation Links with Architectural Micro-Animations */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 text-[11px] 2xl:text-xs uppercase tracking-[0.15em] 2xl:tracking-[0.18em] font-technical transition-all duration-200 group flex items-center gap-1.5 ${
                      isActive ? "text-black font-bold" : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    <span
                      className={`text-[9px] 2xl:text-[10px] font-mono transition-colors duration-200 ${
                        isActive ? "text-black font-bold" : "text-neutral-400 group-hover:text-black"
                      }`}
                    >
                      {link.num}
                    </span>
                    <span className="transition-transform duration-200 group-hover:-translate-y-0.2">
                      {link.labelEn}
                    </span>

                    {/* Active & Hover Underline Animation */}
                    <span
                      className={`absolute -bottom-1 start-0 h-[1.5px] bg-black transition-all duration-300 ease-out ${
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
                className="w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10 rounded-sm border border-neutral-300 hover:border-black text-neutral-600 hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                title={isCompact ? "Expand to Full Navbar" : "Shrink to Compact Navbar"}
              >
                {isCompact ? (
                  <Maximize2 className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                ) : (
                  <Minimize2 className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                )}
              </button>

              {/* Quick WhatsApp Pill */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello Eng. ${brandName}, I would like to inquire about booking an interior design consultation for my project.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10 rounded-sm border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 flex items-center justify-center text-neutral-700 transition-all duration-200 hover:scale-105 active:scale-95"
                title="WhatsApp Consultation"
              >
                <MessageCircle className="w-4 h-4 2xl:w-4.5 2xl:h-4.5" />
              </a>

              {/* Consultation Booking Button */}
              <a
                href="#contact"
                className={`group ${
                  isCompact ? "px-3.5 py-1.5 text-[10px]" : "px-5 2xl:px-6 py-2.5 2xl:py-3 text-[11px] 2xl:text-xs"
                } bg-black hover:bg-neutral-800 text-white uppercase tracking-[0.16em] font-technical font-medium transition-all duration-200 flex items-center gap-1.5 shadow-xs hover:shadow-md active:scale-98`}
              >
                <span>Book Discovery</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello Eng. ${brandName}, I would like to inquire about booking an interior design consultation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-black/10 hover:border-black text-emerald-600 transition-all duration-200 hover:scale-105 active:scale-95"
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

      {/* Matching Height Spacer so Fixed Header Never Overlaps Content on Top */}
      <div
        className={`w-full transition-all duration-300 pointer-events-none ${
          isCompact ? "h-14 sm:h-16" : "h-18 sm:h-20"
        }`}
        aria-hidden="true"
      />

      {/* Full-Screen Architectural Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-5 sm:px-8 overflow-y-auto animate-in fade-in duration-300">
          <div>
            <div className="text-[10px] font-technical uppercase tracking-[0.25em] text-neutral-400 pb-3 border-b border-neutral-200">
              ARCHITECTURAL INDEX • MONOGRAPH 2026
            </div>

            <nav className="flex flex-col divide-y divide-neutral-100 mt-2">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ animationDelay: `${idx * 50}ms` }}
                    className="py-3.5 flex items-center justify-between group transition-colors animate-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-neutral-400 group-hover:text-black">
                        {link.num}
                      </span>
                      <span
                        className={`text-base font-editorial tracking-wide transition-transform group-hover:translate-x-1 duration-200 ${
                          isActive ? "font-bold text-black" : "text-neutral-700 group-hover:text-black"
                        }`}
                      >
                        {link.labelEn}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                    src={avatarSrc}
                    alt={brandName}
                    fill
                    sizes="28px"
                    className="object-cover object-top"
                  />
                </div>
                <span>Designer:</span>
              </div>
              <span className="font-bold text-black">{brandName}</span>
            </div>

            <div className="flex gap-2">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3 bg-neutral-900 hover:bg-black text-white text-xs font-technical uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#7AD1B8]" />
                <span>WhatsApp</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Book Discovery</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
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