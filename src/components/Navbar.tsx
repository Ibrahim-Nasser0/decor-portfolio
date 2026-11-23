"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Menu,
  X,
  ArrowUpRight,
  MessageCircle,
  Music,
  FileDown,
  FileText,
  Compass,
} from "lucide-react";
import AudioNavButton from "@/components/AudioNavButton";

interface NavbarProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    avatarUrl?: string;
    whatsappNumber?: string;
    email?: string;
  };
}

export default function Navbar({ profile }: NavbarProps) {
  const { lang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [studioTime, setStudioTime] = useState<string>("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Dynamic branding from Supabase designer profile with elegant fallbacks
  const avatarSrc = profile?.avatarUrl || "/images/alaa.webp";
  const brandName = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Essa";
  const titleShort = profile?.titleEn
    ? profile.titleEn.split("&")[0].trim().toUpperCase()
    : "INTERIOR ARCHITECTURE";
  const locationShort = profile?.locationEn
    ? profile.locationEn.split(",")[0].split("|")[0].trim().toUpperCase()
    : "ALEXANDRIA & CAIRO";
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber || "201032494616";

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

      // Precise active section tracking with top & bottom edge snapping
      if (scrollY < 80) {
        setActiveSection("hero");
        return;
      }

      if (winHeight > 0 && winHeight - scrollY < 80) {
        setActiveSection("contact");
        return;
      }

      const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setStudioTime(timeStr);
      } catch {
        setStudioTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Keyboard navigation: Close mobile drawer on Escape key (Web Interface Guidelines requirement)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll & autofocus close button when mobile menu is opened
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: "hero", href: "#hero", num: "01", labelEn: "Hero", fullLabel: "Hero & Ethos" },
    { id: "about", href: "#about", num: "02", labelEn: "About", fullLabel: "Architectural Profile" },
    { id: "skills", href: "#skills", num: "03", labelEn: "Skills", fullLabel: "Skills & CAD Toolset" },
    { id: "experience", href: "#experience", num: "04", labelEn: "Experience", fullLabel: "Chronology & Practice" },
    { id: "projects", href: "#projects", num: "05", labelEn: "Works", fullLabel: "Selected Built Works" },
    { id: "contact", href: "#contact", num: "06", labelEn: "Contact", fullLabel: "Direct Inquiries" },
  ];

  return (
    <>
      {/* 1. Global Viewport Reading Progress Bar across Top Edge (Hairline CAD Indicator) */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-neutral-200/40 pointer-events-none overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Monograph reading progress"
      >
        <div
          className="h-full bg-gradient-to-r from-black via-neutral-700 to-[#7AD1B8] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Floating Luxury Capsule Navbar (Architectural Monograph Dock) */}
      <header
        className={`fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div
          className={`pointer-events-auto relative inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all duration-300 border ${
            isScrolled
              ? "bg-white/90 backdrop-blur-2xl border-black/[0.1] shadow-[0_12px_36px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)]"
              : "bg-white/80 backdrop-blur-xl border-black/[0.06] shadow-[0_6px_24px_rgba(0,0,0,0.04)]"
          }`}
        >
          {/* Left Identity: Atelier Brand Capsule */}
          <a
            href="#hero"
            className="flex items-center gap-2 pl-1 sm:pl-1.5 pr-1 py-0.5 rounded-full group select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
            aria-label={`Eng. ${brandName} - Interior Architecture & Spatial Practice`}
          >
            {/* Monogram Portrait Frame */}
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-black/15 bg-neutral-100 shadow-2xs group-hover:scale-105 group-hover:border-black transition-all duration-300 shrink-0">
              <Image
                src={avatarSrc}
                alt={`${brandName} - Interior Architect`}
                fill
                priority
                sizes="32px"
                className="object-cover object-top filter grayscale-15 group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Title & Live Status Beacon */}
            <div className="flex items-center gap-1.5 min-w-0 pr-1">
              <span className="text-xs sm:text-[13px] font-editorial font-bold tracking-[0.12em] text-black uppercase leading-tight group-hover:text-neutral-700 transition-colors truncate">
                ENG. {brandName.toUpperCase()}
              </span>

              {/* Pulsing Availability Beacon */}
              <span
                className="relative flex h-2 w-2 items-center justify-center shrink-0"
                title="Studio Available for Commissions • 2026/2027 Calendar"
                aria-hidden="true"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AD1B8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7AD1B8]" />
              </span>
            </div>
          </a>

          {/* Hairline Divider */}
          <span className="h-4 w-[1px] bg-neutral-200/90 hidden md:block" aria-hidden="true" />

          {/* Center Desktop Navigation: Minimalist Architectural Links */}
          <nav
            role="navigation"
            aria-label="Main architectural monograph navigation"
            className="hidden md:flex items-center gap-0.5 lg:gap-1"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.14em] font-technical transition-all duration-200 select-none focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none ${
                    isActive
                      ? "bg-black text-white font-semibold shadow-xs"
                      : "text-neutral-600 hover:text-black hover:bg-neutral-100/70"
                  }`}
                >
                  {link.labelEn}
                </a>
              );
            })}
          </nav>

          {/* Hairline Divider */}
          <span className="h-4 w-[1px] bg-neutral-200/90 hidden lg:block" aria-hidden="true" />

          {/* Right Desktop Tools & Direct Inquiries */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Cairo Studio Coordinates & Time */}
            {studioTime && (
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono text-neutral-400 uppercase tracking-wider select-none">
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span>{studioTime} CLT</span>
              </div>
            )}

            {/* Atmosphere Audio Pill */}
            <AudioNavButton showVolumeSlider={true} />

            {/* Inquire Action Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-black hover:bg-neutral-800 text-white rounded-full text-[11px] font-technical uppercase tracking-widest font-medium transition-all shadow-xs hover:shadow-sm active:scale-95 cursor-pointer border border-black focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
              title="Initiate Direct Architectural Consultation"
            >
              <span>Inquire</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            {/* Mobile Controls: Tactile Rounded Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-black bg-white hover:bg-black hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none min-w-[38px] min-h-[38px]"
              aria-label={mobileMenuOpen ? "Close architectural menu" : "Open architectural menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Monograph Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Architectural Portfolio Navigation"
          className="fixed inset-0 z-50 bg-[#faf9f6]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-6 pb-8 px-5 sm:px-8 overflow-y-auto animate-in fade-in duration-300"
        >
          {/* Top Bar with Brand, Cairo Time & Accessible Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/80 shrink-0">
                <Image
                  src={avatarSrc}
                  alt={brandName}
                  fill
                  sizes="32px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-editorial font-bold uppercase tracking-wider text-black">
                  ENG. {brandName.toUpperCase()}
                </span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                  {studioTime ? `${studioTime} CAIRO CLT` : "CAIRO, EGYPT"}
                </span>
              </div>
            </div>

            {/* Accessible Close Button with 44px Hit Target */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 border border-neutral-300 hover:border-black rounded-full flex items-center justify-center text-black bg-white hover:bg-black hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none min-w-[44px] min-h-[44px]"
              aria-label="Close menu (Press Escape)"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links with Editorial Typography */}
          <div className="my-auto py-6">
            <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-2">
              PORTFOLIO CHRONOLOGY &amp; INDEX
            </div>

            <nav className="flex flex-col divide-y divide-neutral-200">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className="py-3.5 flex items-center justify-between group transition-colors animate-in slide-in-from-bottom-2 duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none rounded-lg"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-xs font-mono text-neutral-400 group-hover:text-black font-semibold">
                        {link.num} //
                      </span>
                      <span
                        className={`text-xl sm:text-2xl font-editorial uppercase tracking-tight transition-transform group-hover:translate-x-1 duration-200 ${
                          isActive ? "font-bold text-black" : "text-neutral-700 group-hover:text-black"
                        }`}
                      >
                        {link.fullLabel}
                      </span>
                    </div>

                    {isActive ? (
                      <span
                        className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpRight
                        className="w-4 h-4 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Mobile Menu Footer Dossier & Direct Actions */}
          <div className="pt-5 border-t border-neutral-300 space-y-3.5">
            {/* Ambient Atmosphere Audio Controller */}
            <div className="p-3 bg-white border border-neutral-200 rounded-xl flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Music className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-technical uppercase tracking-wider font-bold text-black">
                    Atmosphere Audio
                  </span>
                  <span className="text-[9px] text-neutral-500 font-editorial">
                    Ambient Architectural Piano
                  </span>
                </div>
              </div>
              <AudioNavButton showVolumeSlider={false} />
            </div>

            {/* Quick Monograph & CV Download Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/api/portfolio-pdf"
                download="Alaa-Essa-Architectural-Portfolio-2026.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-3 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-full text-[10px] font-technical uppercase tracking-wider text-black text-center flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none min-h-[44px]"
              >
                <FileDown className="w-3.5 h-3.5 text-[#7AD1B8]" aria-hidden="true" />
                <span>Monograph (PDF)</span>
              </a>

              <a
                href="/api/cv-pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-3 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-full text-[10px] font-technical uppercase tracking-wider text-black text-center flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none min-h-[44px]"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                <span>CV (PDF)</span>
              </a>
            </div>

            {/* Main Direct Actions: WhatsApp & Book Consultation */}
            <div className="flex gap-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello Eng. ${brandName}, I would like to inquire about booking an interior architecture consultation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-technical uppercase tracking-wider text-center flex items-center justify-center gap-2 rounded-full transition-all active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-[#7AD1B8]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-wider text-center flex items-center justify-center gap-2 rounded-full transition-all active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none min-h-[44px]"
              >
                <span>Inquire</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="text-[9px] font-mono text-neutral-400 text-center uppercase tracking-widest pt-1">
              ENG. {brandName.toUpperCase()} • {locationShort}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
