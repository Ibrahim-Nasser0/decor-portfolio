"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Phone,
  Mail,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Compass,
  FileDown,
  FileText,
} from "lucide-react";
import SocialLinks from "@/components/SocialIcons";

interface FooterProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    avatarUrl?: string;
    email?: string;
    phone?: string;
    whatsappNumber?: string;
    instagram?: string;
    linkedin?: string;
    behance?: string;
  };
}

export default function Footer({ profile }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [studioTime, setStudioTime] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const currentRef = footerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

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

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const avatarSrc = profile?.avatarUrl || "/images/alaa.webp";
  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "ALAA ESSA";
  const title = profile?.titleEn || DESIGNER_INFO.titleEn || "INTERIOR ARCHITECTURE & SPATIAL DESIGN";
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "NEW CAIRO • SHEIKH ZAYED • CAIRO, EGYPT";
  const phone = profile?.phone || DESIGNER_INFO.phone;
  const email = profile?.email || DESIGNER_INFO.email;
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;
  const instagram = profile?.instagram || DESIGNER_INFO.instagram;
  const linkedin = profile?.linkedin || DESIGNER_INFO.linkedin;
  const behance = profile?.behance || "https://behance.net";

  const navLinks = [
    { num: "01", label: "HERO & ETHOS", href: "#hero" },
    { num: "02", label: "ARCHITECTURAL PROFILE", href: "#about" },
    { num: "03", label: "SKILLS & TOOLSET", href: "#skills" },
    { num: "04", label: "EXPERIENCE & PRACTICE", href: "#experience" },
    { num: "05", label: "SELECTED WORKS", href: "#projects" },
    { num: "06", label: "DIRECT CONTACT", href: "#contact" },
  ];

  const typologies = [
    "Private Residential Sanctuaries",
    "Penthouse & Duplex Styling",
    "Tailored Joinery & Millwork",
    "Turnkey Execution & Site Supervision",
    "Boutique Commercial Concepts",
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-white border-t border-neutral-300 pt-16 sm:pt-20 2xl:pt-28 pb-10 sm:pb-14 relative text-black select-none overflow-hidden"
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Main 4-Column Monograph Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-neutral-200">
          {/* Column 1: Identity & Studio Ethos (4 cols) */}
          <div
            className={`lg:col-span-4 space-y-5 transition-all duration-700 delay-100 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/80 bg-neutral-100 shrink-0">
                <Image
                  src={avatarSrc}
                  alt={name}
                  fill
                  sizes="36px"
                  className="object-cover object-top filter grayscale-20"
                />
              </div>
              <div>
                <a href="#hero" className="group block">
                  <span className="text-xl sm:text-2xl font-editorial font-bold tracking-tight text-black uppercase group-hover:text-neutral-700 transition-colors">
                    {name}
                  </span>
                </a>
                <span className="text-[9px] font-technical uppercase tracking-[0.2em] text-neutral-500 font-medium block">
                  {title}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-sans">
              Dedicated to the architectural composition of refined residential sanctuaries, bespoke furniture joinery, and attentive turnkey execution supervision.
            </p>

            <div className="space-y-2 pt-1 text-xs font-technical text-neutral-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono tracking-wider">
                <Compass className="w-3 h-3 text-neutral-400 shrink-0" />
                <span>30°02&apos;N 31°14&apos;E • {studioTime ? `${studioTime} CAIRO (UTC+2)` : "CAIRO CLT (UTC+2)"}</span>
              </div>
            </div>

            {/* Architectural Monograph & CV PDF Download Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="/api/portfolio-pdf"
                download="Alaa-Essa-Architectural-Portfolio-2026.pdf"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-3.5 py-2.5 bg-neutral-900 hover:bg-black text-white rounded-sm border border-neutral-800 text-[11px] font-technical uppercase tracking-wider transition-all duration-300 hover:shadow-md active:scale-95"
                title="Download Architectural Monograph (PDF)"
              >
                <FileDown className="w-4 h-4 text-[#7AD1B8] group-hover:scale-110 transition-transform" />
                <span>Monograph (PDF)</span>
              </a>

              <a
                href="/api/cv-pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 hover:text-black rounded-sm border border-neutral-300 text-[11px] font-technical uppercase tracking-wider transition-all duration-300 hover:shadow-sm active:scale-95"
                title="Download Alaa Essa Curriculum Vitae (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-600 group-hover:text-black transition-colors" />
                <span>CV (PDF)</span>
              </a>
            </div>
          </div>

          {/* Column 2: Index (2 cols) */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-[11px] font-technical font-bold uppercase tracking-[0.2em] text-black pb-1 border-b border-black/10 inline-block">
              PORTFOLIO INDEX
            </h4>
            <ul className="space-y-2.5 text-xs font-technical text-neutral-600 pt-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 hover:text-black transition-colors"
                  >
                    <span className="text-[10px] font-mono text-neutral-400 group-hover:text-black transition-colors">
                      {link.num}
                    </span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Typologies & Scope (3 cols) */}
          <div
            className={`lg:col-span-3 space-y-4 transition-all duration-700 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-[11px] font-technical font-bold uppercase tracking-[0.2em] text-black pb-1 border-b border-black/10 inline-block">
              PRACTICE TYPOLOGIES
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-neutral-600 pt-1">
              {typologies.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Inquiries & Design Network (3 cols) */}
          <div
            className={`lg:col-span-3 space-y-4 transition-all duration-700 delay-400 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-[11px] font-technical font-bold uppercase tracking-[0.2em] text-black pb-1 border-b border-black/10 inline-block">
              DIRECT REACH
            </h4>
            <ul className="space-y-3 text-xs font-sans pt-1">
              <li>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-0.5">
                  Mobile & WhatsApp
                </span>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-black hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 group font-medium"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{phone}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>

              <li>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-0.5">
                  Direct Email
                </span>
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-black hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 group truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span className="truncate">{email}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-2">
                PORTFOLIO & SOCIAL CHANNELS
              </span>
              <SocialLinks
                whatsappNumber={whatsappNumber}
                instagram={instagram}
                linkedin={linkedin}
                behance={behance}
                className="flex items-center gap-2"
                iconClassName="w-4 h-4"
                itemClassName="w-9 h-9 rounded border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Architectural Wordmark Banner */}
        <div
          className={`my-8 sm:my-10 py-5 sm:py-7 border-y border-neutral-200 transition-all duration-700 delay-500 group select-none ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Subtle architectural drafting coordinates */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-2">
            <span>DOC REF • MONO-2026</span>
            <span className="hidden sm:inline">ARCHITECTURE &amp; SPATIAL PRACTICE</span>
            <span>EDITION 01</span>
          </div>

          {/* Balanced Non-Overflowing Editorial Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 font-editorial uppercase">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-300 group-hover:text-black transition-colors duration-500">
              {name}
            </span>
            <span className="text-neutral-200 font-serif italic text-lg sm:text-2xl hidden sm:inline select-none">
              •
            </span>
            <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-400 group-hover:text-neutral-800 transition-colors duration-500">
              INTERIOR ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Continuous Architectural Monograph Marquee */}
        <div className="my-6 sm:my-8 py-3 overflow-hidden border-y border-neutral-200 bg-neutral-50/70 select-none">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-technical text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-neutral-500 font-semibold">
            <span>ALAA ESSA ARCHITECTURAL PRACTICE</span>
            <span className="text-neutral-300">•</span>
            <span>RESIDENTIAL SANCTUARIES</span>
            <span className="text-neutral-300">•</span>
            <span>CIRCADIAN 3000K LIGHTING</span>
            <span className="text-neutral-300">•</span>
            <span>BESPOKE JOINERY &amp; MILLWORK</span>
            <span className="text-neutral-300">•</span>
            <span>HYPER-REALISTIC CORONA 3D VISUALIZATION</span>
            <span className="text-neutral-300">•</span>
            <span>TURNKEY SITE SUPERVISION</span>
            <span className="text-neutral-300">•</span>
            <span>ALEXANDRIA &amp; CAIRO</span>
            <span className="text-neutral-300">•</span>
            <span>ALAA ESSA ARCHITECTURAL PRACTICE</span>
            <span className="text-neutral-300">•</span>
            <span>RESIDENTIAL SANCTUARIES</span>
            <span className="text-neutral-300">•</span>
            <span>CIRCADIAN 3000K LIGHTING</span>
            <span className="text-neutral-300">•</span>
            <span>BESPOKE JOINERY &amp; MILLWORK</span>
            <span className="text-neutral-300">•</span>
            <span>HYPER-REALISTIC CORONA 3D VISUALIZATION</span>
            <span className="text-neutral-300">•</span>
            <span>TURNKEY SITE SUPERVISION</span>
            <span className="text-neutral-300">•</span>
            <span>ALEXANDRIA &amp; CAIRO</span>
            <span className="text-neutral-300">•</span>
          </div>
        </div>

        {/* Bottom Editorial Legal Bar & Ibrahim Nasser Creator Signature */}
        <div
          className={`pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs font-technical text-neutral-500 text-center md:text-left transition-all duration-700 delay-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} {name} INTERIOR ARCHITECTURE. ALL RIGHTS RESERVED.
          </div>

          {/* Unified Architectural Creator Capsule */}
          <a
            href="https://ibrahim-nasser.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 hover:border-black bg-white hover:bg-black transition-all duration-300 shadow-2xs hover:shadow-xs cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none min-h-[44px]"
            title="Crafted & Engineered by Ibrahim Nasser"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7AD1B8] group-hover:bg-emerald-400 transition-colors animate-pulse" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-technical uppercase tracking-[0.14em] text-neutral-500 group-hover:text-neutral-300 transition-colors">
              Crafted &amp; Engineered by
            </span>
            <span className="text-[10px] sm:text-[11px] font-technical uppercase tracking-[0.16em] font-bold text-black group-hover:text-white transition-colors">
              Ibrahim Nasser
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-black transition-colors cursor-pointer active:scale-95 px-4 py-2 border border-neutral-200 hover:border-black rounded-full bg-white hover:bg-neutral-50 text-[10px] sm:text-[11px] font-technical uppercase tracking-widest text-neutral-600 hover:text-black shadow-2xs focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none min-h-[44px]"
            aria-label="Back to top of monograph"
          >
            <span className="font-medium">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}