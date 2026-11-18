"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  MapPin,
  Mail,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Sparkles,
  Quote,
  Compass,
  Sliders,
  Layers,
  GraduationCap,
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
    education?: Array<{ titleEn?: string; institutionEn?: string; year?: string }>;
  };
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic Content from Supabase profile with elegant fallbacks
  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Issa";
  const title = profile?.titleEn || DESIGNER_INFO.titleEn || "Interior Architect & Spatial Designer";
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "Cairo, Egypt";
  const email = profile?.email || DESIGNER_INFO.email;
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;
  const intro = profile?.aboutIntroEn || DESIGNER_INFO.aboutIntroEn;
  const experienceText = profile?.aboutExperienceEn || DESIGNER_INFO.aboutExperienceEn;
  const philosophyStatement = profile?.statementEn || DESIGNER_INFO.statementEn;
  const photoUrl = profile?.avatarUrl || "/images/alaa2.webp";
  const educationDegree = profile?.education?.[0]?.titleEn || "B.Sc. Architectural Engineering & Interior Architecture";

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
          {/* Left Column (5 cols): Portrait Frame with Scroll Parallax & Quick Coordinates */}
          <div
            className={`lg:col-span-5 space-y-6 2xl:space-y-8 transition-all duration-800 ease-out delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative mx-auto max-w-[280px] xs:max-w-xs sm:max-w-sm lg:max-w-none">
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
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, (max-width: 1536px) 500px, 650px"
                  className="object-cover object-top filter grayscale-15 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

                {/* Name Badge Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 2xl:bottom-5 start-3 sm:start-4 2xl:start-5 end-3 sm:end-4 2xl:end-5 text-white text-xs font-technical p-2.5 sm:p-3 2xl:p-4 backdrop-blur-md bg-black/50 border border-white/20 transition-all group-hover:border-white/40">
                  <div className="font-bold text-xs sm:text-sm 2xl:text-base font-editorial tracking-wider">
                    ENG. {name.toUpperCase()}
                  </div>
                  <div className="text-[9px] sm:text-[10px] 2xl:text-xs uppercase text-neutral-300 tracking-widest mt-0.5 truncate">
                    {title}
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Coordinates & Quick Connect Card */}
            <div className="p-4 sm:p-5 2xl:p-6 bg-neutral-50 border border-neutral-300 space-y-3 2xl:space-y-4 text-xs 2xl:text-sm font-technical shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-neutral-500 uppercase text-[10px] 2xl:text-xs">Studio Base:</span>
                <span className="font-bold text-black flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-neutral-700 shrink-0" />
                  <span className="truncate">{location} (Available Globally)</span>
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-neutral-500 uppercase text-[10px] 2xl:text-xs">Degree:</span>
                <span className="font-medium text-black text-end truncate flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                  <span className="truncate">Architectural Engineering</span>
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                <a
                  href={`mailto:${email}`}
                  className="text-neutral-700 hover:text-black font-mono text-[10px] sm:text-[11px] 2xl:text-xs flex items-center gap-1.5 transition-colors truncate"
                  title="Send Email"
                >
                  <Mail className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
                  <span className="truncate">{email}</span>
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-[10px] sm:text-[11px] 2xl:text-xs uppercase tracking-wider flex items-center gap-1 shrink-0 transition-transform active:scale-95"
                  title="Direct WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Biography, Philosophy & Pillars */}
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

              {/* Supabase Dynamic Narrative Paragraphs */}
              <div className="space-y-3.5 sm:space-y-4 2xl:space-y-5 text-xs sm:text-sm 2xl:text-base text-neutral-700 leading-relaxed 2xl:leading-loose font-sans text-justify">
                <p className="first-letter:text-2xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                  {intro}
                </p>
                <p>
                  {experienceText}
                </p>
              </div>
            </div>

            {/* Editorial Philosophy Statement Callout Card (From Supabase statementEn) */}
            {philosophyStatement && (
              <div
                className={`relative p-5 sm:p-6 bg-neutral-50/90 border-l-2 border-black border-y border-r border-neutral-200 rounded-r-xl transition-all duration-700 ease-out delay-400 group hover:border-black shadow-xs ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <Quote className="w-5 h-5 text-neutral-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs sm:text-sm font-sans italic text-neutral-800 leading-relaxed">
                  &ldquo;{philosophyStatement}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  <span>— Eng. {name}</span>
                  <span className="text-neutral-400">ARCHITECTURAL STATEMENT</span>
                </div>
              </div>
            )}

            {/* 4 Architectural Core Pillars with Staggered Scroll Entrance */}
            <div className="space-y-3 pt-2">
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block">
                Foundational Principles
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 2xl:gap-6">
                {pillars.map((pillar, idx) => (
                  <div
                    key={pillar.title}
                    style={{ transitionDelay: `${450 + idx * 100}ms` }}
                    className={`p-4 sm:p-5 2xl:p-6 bg-neutral-50/80 border border-neutral-200 rounded-xl space-y-2 transition-all duration-600 ease-out hover:border-black hover:bg-white hover:shadow-md hover:-translate-y-1 group ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-neutral-400 group-hover:text-black transition-colors shrink-0" />
                        <h4 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-wider text-black">
                          {pillar.title}
                        </h4>
                      </div>
                      <span className="text-[8px] font-mono text-neutral-400 group-hover:text-neutral-700">
                        {pillar.tag}
                      </span>
                    </div>
                    <p className="text-[11px] 2xl:text-xs text-neutral-600 font-sans leading-relaxed group-hover:text-neutral-800 transition-colors">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons with interactive hover micro-transitions */}
            <div
              className={`pt-2 2xl:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 2xl:gap-5 transition-all duration-700 ease-out delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="#skills"
                className="group w-full sm:w-auto px-7 2xl:px-9 py-4 2xl:py-4.5 bg-black text-white text-xs 2xl:text-sm uppercase tracking-widest font-technical font-medium transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:bg-neutral-900 active:scale-[0.98]"
              >
                <span>View Skills & Toolset</span>
                <ArrowUpRight className="w-4 h-4 2xl:w-5 2xl:h-5 text-neutral-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              <a
                href="#experience"
                className="w-full sm:w-auto px-7 2xl:px-9 py-4 2xl:py-4.5 border border-black/30 hover:border-black text-black hover:bg-black hover:text-white text-xs 2xl:text-sm uppercase tracking-widest font-technical font-medium transition-all duration-300 text-center justify-center flex items-center active:scale-[0.98]"
              >
                Career & Experience
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
