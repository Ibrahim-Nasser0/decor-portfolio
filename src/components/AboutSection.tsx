"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  MapPin,
  Mail,
  MessageCircle,
  ArrowUpRight,
  ArrowDown,
  Quote,
  GraduationCap,
  FileDown,
  FileText,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";

interface AboutSectionProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    email?: string;
    whatsappNumber?: string;
    aboutIntroEn?: string;
    aboutExperienceEn?: string;
    statementEn?: string;
    avatarUrl?: string;
    aboutImageUrl?: string;
    education?: Array<{ titleEn?: string; institutionEn?: string; year?: string }>;
  };
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic Content from Supabase profile with elegant fallbacks
  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Essa";
  const title = profile?.titleEn || DESIGNER_INFO.titleEn || "Interior Architecture & 3D Visualization";
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "Alexandria, Egypt";
  const email = profile?.email || DESIGNER_INFO.email || "alaaesssaa@gmail.com";
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber || "201032494616";
  const experienceText = profile?.aboutExperienceEn || DESIGNER_INFO.aboutExperienceEn;
  const philosophyStatement = profile?.statementEn || DESIGNER_INFO.statementEn;
  const photoUrl = profile?.aboutImageUrl || "/images/alaa2.webp";
  const educationDegree = profile?.education?.[0]?.titleEn || "Faculty of Fine Arts • Alexandria University";

  // Viewport Intersection Observer & Scroll Parallax Tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, currentDist / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Subtle parallax offset (-16px to +16px across viewport traversal)
  const parallaxOffset = (scrollProgress - 0.5) * 32;

  // 4 Core Architectural Pillars
  const pillars = [
    {
      title: "Spatial Ergonomics",
      desc: "Rigorous circulation analysis ensuring every square meter is functional, serene, and naturally flowing.",
      tag: "01 / CIRCULATION",
    },
    {
      title: "Circadian Lighting",
      desc: "Layered 3000K warm architectural lighting schemes engineered to elevate texture and promote calm.",
      tag: "02 / LUMEN DYNAMICS",
    },
    {
      title: "Bespoke Millwork",
      desc: "Tailored joinery detailing, acoustic wall fluting, and floating cabinetry executed with zero-gap precision.",
      tag: "03 / JOINERY ART",
    },
    {
      title: "Turnkey Execution",
      desc: "Millimeter-accurate executive shop drawings and attentive direct on-site supervision ensuring real-world fidelity.",
      tag: "04 / REALIZATION",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-24 2xl:py-32 bg-white border-t border-neutral-200 relative overflow-hidden select-none"
    >
      {/* Background Architectural Watermark with Parallax Drift */}
      <div
        className="absolute top-1/3 -right-12 text-[18vw] font-editorial font-black text-black/[0.015] pointer-events-none select-none -z-10 leading-none tracking-tighter"
        style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
      >
        ETHOS
      </div>

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header with Scroll Entrance */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 2xl:mb-20 pb-6 border-b border-black/10 gap-4 sm:gap-6 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>02 • ARCHITECTURAL PROFILE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              About Eng. {name}
            </h2>
          </div>
          <div className="text-[10px] sm:text-xs 2xl:text-sm font-technical text-neutral-500 text-start md:text-end uppercase tracking-widest">
            <div className="font-semibold text-black">{location.toUpperCase()} • SPATIAL PRACTICE</div>
            <div className="text-neutral-400 mt-1">{educationDegree.toUpperCase()}</div>
          </div>
        </div>

        {/* 2-Column Monograph Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 2xl:gap-24 items-start">
          {/* Left Column (5 cols): Portrait Frame with Scroll Parallax & Architectural Title Block */}
          <div
            className={`lg:col-span-5 space-y-6 2xl:space-y-8 transition-all duration-800 ease-out delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative mx-auto max-w-[300px] xs:max-w-xs sm:max-w-sm lg:max-w-none">
              {/* Luxury Ambient Atmospheric Glow Aura */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-amber-500/10 via-neutral-900/5 to-transparent rounded-3xl blur-2xl pointer-events-none -z-20 animate-aura-breathe" />

              {/* Outer decorative architectural outline with Drafting Crosshairs (+) */}
              <div
                className="absolute -inset-2.5 sm:-inset-4 2xl:-inset-5 border border-neutral-300 -z-10 pointer-events-none transition-transform duration-700 ease-out"
                style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
              >
                {/* Crosshairs */}
                <span className="absolute -top-1.5 -left-1.5 font-mono text-[9px] text-neutral-400 select-none">+</span>
                <span className="absolute -top-1.5 -right-1.5 font-mono text-[9px] text-neutral-400 select-none">+</span>
                <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[9px] text-neutral-400 select-none">+</span>
                <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[9px] text-neutral-400 select-none">+</span>
              </div>

              {/* Portrait Image Frame with Subtle Scroll Parallax */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-neutral-300 shadow-xl group"
                style={{ transform: `translateY(${parallaxOffset * 0.25}px)` }}
              >
                <Image
                  src={photoUrl}
                  alt={`Eng. ${name} - ${title}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, (max-width: 1536px) 500px, 650px"
                  className="object-cover object-top filter grayscale-10 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                {/* Architectural Cartouche Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 2xl:bottom-5 start-3 sm:start-4 2xl:start-5 end-3 sm:end-4 2xl:end-5 text-white font-technical p-3 sm:p-3.5 2xl:p-4 backdrop-blur-md bg-black/60 border border-white/20 transition-all group-hover:border-white/40">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-xs sm:text-sm 2xl:text-base font-editorial tracking-wider text-white">
                      ENG. {name.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-1.5 py-0.5 border border-emerald-500/30">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      COMMISSIONS OPEN
                    </span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] 2xl:text-xs uppercase text-neutral-300 tracking-widest truncate">
                    {title}
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Specifications & Inquiries Block (Architectural Cartouche) */}
            <div className="p-4 sm:p-5 2xl:p-6 bg-neutral-50/90 border border-neutral-300 space-y-3.5 2xl:space-y-4 text-xs 2xl:text-sm font-technical shadow-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                <span>STUDIO SPECIFICATIONS</span>
                <span>ISSUE // 2026</span>
              </div>

              {/* Coordinates Grid */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-neutral-500 uppercase text-[10px] 2xl:text-xs">Location:</span>
                  <span className="font-semibold text-black flex items-center gap-1.5 truncate text-end">
                    <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span className="truncate">{location} (Global Practice)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-neutral-500 uppercase text-[10px] 2xl:text-xs">Qualification:</span>
                  <span className="font-medium text-black truncate text-end flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                    <span className="truncate">{educationDegree}</span>
                  </span>
                </div>
              </div>

              {/* Professional Inquiry Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2.5">
                <a
                  href={`mailto:${email}`}
                  className="p-2.5 bg-white hover:bg-neutral-900 hover:text-white text-neutral-800 border border-neutral-300 hover:border-black font-technical text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-2xs rounded-xs"
                  title="Direct Email Inquiry"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Email Inquiries</span>
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-neutral-900 hover:bg-black text-white border border-black font-technical text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-2xs rounded-xs group"
                  title="Direct WhatsApp Consultation"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Biography, Philosophy, Pillars & Unified Action Hub */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 2xl:space-y-10">
            {/* Architectural Philosophy & Narrative Head */}
            <div
              className={`space-y-3 sm:space-y-4 2xl:space-y-5 transition-all duration-700 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-[0.2em] font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 border border-neutral-300">
                  DESIGN ETHOS & PHILOSOPHY
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-editorial font-bold text-black tracking-tight leading-snug">
                Crafting meaningful spaces where structural logic meets innate artistic sensibility.
              </h3>

              {/* Minimalist Divider Line with Expand Animation */}
              <div
                className={`w-20 sm:w-28 2xl:w-36 h-[2px] bg-black my-3 sm:my-4 2xl:my-6 transition-all duration-1000 ease-out delay-300 origin-left ${
                  isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              />

              {/* Architectural Practice Narrative */}
              <div className="text-xs sm:text-sm md:text-[14px] 2xl:text-base text-neutral-600 leading-relaxed font-sans">
                <p>
                  {experienceText}
                </p>
              </div>
            </div>

            {/* Architectural Philosophy Manifesto Pull-Quote */}
            {philosophyStatement && (
              <div
                className={`relative py-3.5 px-4 sm:px-5 bg-neutral-50/70 border-l-2 border-black border-y border-r border-neutral-200/80 rounded-xs transition-all duration-700 ease-out delay-300 group hover:border-black shadow-2xs ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5 group-hover:text-black transition-colors" />
                  <div className="space-y-1.5 min-w-0">
                    <p className="text-xs sm:text-[13px] 2xl:text-sm font-sans italic text-neutral-800 leading-relaxed">
                      &ldquo;{philosophyStatement}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase pt-0.5">
                      <span className="font-semibold text-black">— Eng. {name}</span>
                      <span className="text-neutral-400">ARCHITECTURAL STATEMENT</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Architectural Core Pillars with Drafting Numbers */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block">
                Foundational Principles
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 2xl:gap-6">
                {pillars.map((pillar, idx) => (
                  <div
                    key={pillar.title}
                    style={{ transitionDelay: `${350 + idx * 70}ms` }}
                    className={`relative p-3.5 sm:p-4 2xl:p-5 bg-neutral-50/70 border border-neutral-200/90 rounded-xs space-y-1.5 transition-all duration-500 ease-out hover:border-black hover:bg-white hover:shadow-lg hover:-translate-y-1.5 group overflow-hidden ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    {/* Top Architectural Drafting Pip */}
                    <span className="absolute top-1.5 end-2 font-mono text-[8px] text-neutral-300 group-hover:text-black transition-colors select-none">
                      +
                    </span>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] 2xl:text-xs font-mono font-bold text-neutral-400 group-hover:text-black transition-colors">
                          0{idx + 1}
                        </span>
                        <span className="w-1.5 h-[1px] bg-neutral-300 group-hover:bg-black transition-colors" />
                        <h4 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-wider text-black">
                          {pillar.title}
                        </h4>
                      </div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-neutral-600">
                        {pillar.tag}
                      </span>
                    </div>
                    <p className="text-[11px] 2xl:text-xs text-neutral-600 font-sans leading-relaxed group-hover:text-neutral-800 transition-colors">
                      {pillar.desc}
                    </p>

                    {/* Bottom Hairline Expanding Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-black w-0 group-hover:w-full transition-all duration-500 ease-out" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Documentation & Dossier Suite (Unified Action Grid) */}
            <div
              className={`pt-3 space-y-3 transition-all duration-700 ease-out delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] 2xl:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                <span>Practice Dossier & Documentation</span>
                <span>Issue // 2026-2027</span>
              </div>

              {/* Tier 1: Two High-Fidelity Download Cards (Matched 2-Column Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 2xl:gap-6">
                {/* Card 1: Architectural Monograph (PDF) */}
                <a
                  href="/api/portfolio-pdf"
                  download="Alaa-Essa-Architectural-Portfolio-2026.pdf"
                  className="group relative p-4 bg-neutral-950 hover:bg-black text-white border border-neutral-900 hover:border-neutral-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between active:scale-[0.98] overflow-hidden rounded-xs"
                  title="Download Curated Architectural Monograph (PDF)"
                >
                  {/* Subtle Sheen Highlight */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {/* Top Spec Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                    <span className="text-neutral-300 font-semibold">DOC // 01</span>
                    <span className="bg-white/10 px-1.5 py-0.5 rounded-2xs text-[8px] text-white">2026 EDITION • PDF</span>
                  </div>

                  {/* Body Content */}
                  <div className="py-3 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#7AD1B8] transition-colors duration-300">
                      <FileDown className="w-4 h-4 text-[#7AD1B8] group-hover:text-black transition-colors duration-300" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs sm:text-[13px] font-technical uppercase tracking-wider font-bold text-white group-hover:text-[#7AD1B8] transition-colors truncate">
                        Portfolio Monograph
                      </h5>
                      <p className="text-[10px] font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors mt-0.5 line-clamp-1">
                        High-resolution curated works & spatial studies
                      </p>
                    </div>
                  </div>

                  {/* Action Indicator */}
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                    <span>Download Monograph (A4)</span>
                    <span className="group-hover:translate-y-0.5 transition-transform text-white">↓</span>
                  </div>
                </a>

                {/* Card 2: Curriculum Vitae (PDF) - Typeset via LaTeX */}
                <a
                  href="/api/cv-pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-black shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between active:scale-[0.98] overflow-hidden rounded-xs"
                  title="Download / View Alaa Essa Official Curriculum Vitae (PDF)"
                >
                  {/* Top Spec Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                    <span className="text-black font-semibold">DOC // 02</span>
                    <span className="bg-neutral-100 border border-neutral-300 px-1.5 py-0.5 rounded-2xs text-[8px] text-neutral-700">LATEX TYPESET</span>
                  </div>

                  {/* Body Content */}
                  <div className="py-3 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:border-black transition-colors duration-300">
                      <FileText className="w-4 h-4 text-neutral-800 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs sm:text-[13px] font-technical uppercase tracking-wider font-bold text-black group-hover:text-neutral-900 transition-colors truncate">
                        Curriculum Vitae (PDF)
                      </h5>
                      <p className="text-[10px] font-sans text-neutral-600 group-hover:text-neutral-800 transition-colors mt-0.5 line-clamp-1">
                        Academic degrees, practice history & software tools
                      </p>
                    </div>
                  </div>

                  {/* Action Indicator */}
                  <div className="pt-2.5 border-t border-neutral-200 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-neutral-500 group-hover:text-black transition-colors">
                    <span>View Official CV</span>
                    <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-black">↗</span>
                  </div>
                </a>
              </div>

              {/* Tier 2: Unified Interactive Navigation Strip */}
              <div className="p-2 sm:p-2.5 bg-neutral-50/80 border border-neutral-200/90 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-technical">
                {/* Career Link */}
                <a
                  href="#experience"
                  className="w-full sm:w-auto flex-1 flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 text-neutral-600 hover:text-black hover:bg-white border border-transparent hover:border-neutral-200 transition-all rounded-2xs group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-neutral-400 font-bold group-hover:text-black">03 //</span>
                    <Briefcase className="w-3.5 h-3.5 text-neutral-500 group-hover:text-black" />
                    <span className="uppercase tracking-wider font-semibold">Career & Practice Chronology</span>
                  </div>
                  <span className="text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform">→</span>
                </a>

                {/* Vertical Divider on Desktop */}
                <span className="hidden sm:block w-[1px] h-4 bg-neutral-300" />

                {/* Skills Link */}
                <a
                  href="#skills"
                  className="w-full sm:w-auto flex-1 flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 text-neutral-600 hover:text-black hover:bg-white border border-transparent hover:border-neutral-200 transition-all rounded-2xs group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-neutral-400 font-bold group-hover:text-black">04 //</span>
                    <Layers className="w-3.5 h-3.5 text-neutral-500 group-hover:text-black" />
                    <span className="uppercase tracking-wider font-semibold">Technical Skills & Software Toolset</span>
                  </div>
                  <span className="text-neutral-400 group-hover:text-black group-hover:translate-y-0.5 transition-transform">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
