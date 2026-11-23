"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, FileDown, Sparkles, Compass } from "lucide-react";
import { calculateYearsOfExperience, calculateBuiltWorks } from "@/lib/metrics";
import { DESIGNER_INFO } from "@/data/portfolioData";

interface HeroProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    subtitleEn?: string;
    aboutIntroEn?: string;
    locationEn?: string;
    avatarUrl?: string;
    heroImageUrl?: string;
    aboutImageUrl?: string;
    builtWorksOffset?: number;
    cadFidelity?: number;
    experience?: any[];
  };
  projectsCount?: number;
}

// Lightweight smooth easing count-up animation hook
function useAnimatedCounter(target: number, duration: number = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return count;
}

export default function Hero({ profile, projectsCount = 5 }: HeroProps) {
  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Essa";
  const title = profile?.titleEn || DESIGNER_INFO.titleEn || "Interior Architecture & 3D Visualization";
  const subtitle = profile?.subtitleEn || DESIGNER_INFO.subtitleEn || "Bespoke Residential Sanctuaries & Tactile Living Environments";
  const bio = profile?.aboutIntroEn || DESIGNER_INFO.aboutIntroEn;
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "Alexandria, Egypt";
  const heroImageUrl = profile?.heroImageUrl || profile?.avatarUrl || "/images/alaa.webp";

  // Dynamic Initials from name (e.g. "AE" for Alaa Essa)
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "AE";

  // Dynamic Metrics Calculation:
  // 1. Built Works: active projects in database + customizable archive offset (default 80)
  const builtWorksCalc = calculateBuiltWorks(projectsCount, profile?.builtWorksOffset ?? 80);
  const targetBuiltWorks = builtWorksCalc.total;

  // 2. Years of Experience: automatically derived from experience history
  const yearsString = calculateYearsOfExperience(profile?.experience || DESIGNER_INFO.experience);
  const targetYears = parseInt(yearsString.replace(/\D/g, ""), 10) || 7;

  // 3. CAD Fidelity / Quality precision index
  const targetFidelity = profile?.cadFidelity !== undefined ? profile.cadFidelity : 100;

  // Smooth count-up animations
  const animatedBuiltWorks = useAnimatedCounter(targetBuiltWorks, 1400);
  const animatedYears = useAnimatedCounter(targetYears, 1200);
  const animatedFidelity = useAnimatedCounter(targetFidelity, 1600);

  // Live Studio Clock (Cairo / Alexandria timezone: UTC+2)
  const [studioTime, setStudioTime] = useState<string>("");

  useEffect(() => {
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
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] bg-white pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Architectural Drafting Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-editorial font-black text-black/[0.015] pointer-events-none select-none -z-10 tracking-tighter leading-none animate-float-muted">
        ARCH
      </div>

      {/* Top Editorial Hairline & Monograph Info Bar */}
      <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 animate-hero-entrance [animation-delay:100ms]">
        <div className="flex items-center justify-between py-2 sm:py-2.5 2xl:py-3.5 border-b border-black/10 text-[9px] sm:text-[11px] 2xl:text-xs font-technical uppercase tracking-[0.16em] sm:tracking-[0.2em] 2xl:tracking-[0.25em] text-neutral-500">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
            <span className="font-semibold text-black truncate">MONOGRAPH 2026-2027</span>
            <span className="text-neutral-300">•</span>
            <span className="shrink-0 text-neutral-600 font-mono">ISSUE 01</span>
            {studioTime && (
              <>
                <span className="text-neutral-300 hidden sm:inline">•</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-neutral-500">
                  <span className="w-1 h-1 rounded-full bg-neutral-400" />
                  {studioTime} CAIRO (UTC+2)
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 text-neutral-400">
            <span className="hidden md:inline">RESIDENTIAL & COMMERCIAL</span>
            <span className="hidden md:inline">/</span>
            <span className="text-neutral-800 font-semibold">{location.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Composition: Text on LEFT, Portrait Photo on RIGHT (Order 1 on Mobile) */}
      <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 my-auto py-6 sm:py-10 lg:py-14 2xl:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 2xl:gap-24 items-center">
          {/* Portrait Photo: 1st on Mobile for Strong Visual Identity, Right Column (5 cols) on Desktop */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 animate-hero-entrance [animation-delay:300ms]">
            <div className="relative mx-auto max-w-[280px] xs:max-w-[320px] sm:max-w-sm lg:max-w-none">
              {/* Luxury Ambient Atmospheric Glow Aura */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-amber-500/10 via-neutral-900/5 to-transparent rounded-3xl blur-2xl pointer-events-none -z-20 animate-aura-breathe" />

              {/* Outer architectural guide frame with Drafting Corner Marks (+) */}
              <div className="absolute -inset-2.5 sm:-inset-4 2xl:-inset-5 border border-neutral-300 -z-10 pointer-events-none transition-all duration-700">
                <span className="absolute -top-1.5 -left-1.5 font-mono text-[9px] text-neutral-400 leading-none select-none">+</span>
                <span className="absolute -top-1.5 -right-1.5 font-mono text-[9px] text-neutral-400 leading-none select-none">+</span>
                <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[9px] text-neutral-400 leading-none select-none">+</span>
                <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[9px] text-neutral-400 leading-none select-none">+</span>
              </div>

              {/* Main Portrait Frame with Atmospheric Depth */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-neutral-300 shadow-xl group">
                <Image
                  src={heroImageUrl}
                  alt={`Eng. ${name} - ${title}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, (max-width: 1536px) 500px, 650px"
                  className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-80 pointer-events-none transition-opacity duration-500 group-hover:opacity-65" />

                {/* Bottom Architectural Caption Strip */}
                <div className="absolute bottom-3 sm:bottom-4 2xl:bottom-5 start-3 sm:start-4 2xl:start-5 end-3 sm:end-4 2xl:end-5 flex items-center justify-between text-white text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider backdrop-blur-md bg-black/60 px-3 sm:px-3.5 py-2 border border-white/20 transition-all duration-300 group-hover:border-white/40">
                  <span className="font-bold tracking-[0.16em] truncate">
                    ENG. {name.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[8px] sm:text-[9px] text-emerald-400 shrink-0">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    PRACTICE
                  </span>
                </div>
              </div>

              {/* Refined Architectural Studio Seal (Minimalist Floating Seal with Dynamic Initials) */}
              <div className="absolute -bottom-3 -start-2 sm:-bottom-4 sm:-start-3 2xl:-bottom-5 2xl:-start-4 bg-white border border-neutral-300 px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-lg flex items-center gap-2.5 sm:gap-3 animate-float-muted z-10 rounded-xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white flex items-center justify-center font-technical font-bold text-[10px] sm:text-xs tracking-tight shrink-0 shadow-inner">
                  {initials}
                </div>
                <div className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase leading-tight tracking-[0.12em]">
                  <span className="font-bold text-black block">Studio {name}</span>
                  <span className="text-neutral-500 text-[8px] sm:text-[9px] block tracking-widest mt-0.5">
                    {location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column (7 cols on Desktop, 2nd on Mobile): Editorial Typography, Bio & Key Metrics */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6 2xl:space-y-8 order-2 lg:order-1 lg:pe-6 2xl:pe-10">
            <div className="space-y-2 sm:space-y-3 2xl:space-y-4">
              {/* Architectural Discipline Tagline */}
              <div className="animate-hero-entrance [animation-delay:200ms] flex items-center gap-2">
                <span className="w-4 h-[1px] bg-neutral-400 inline-block" />
                <span className="text-[10px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-medium block">
                  {title}
                </span>
              </div>

              {/* Monumental Name Headline with Fluid Typography */}
              <div className="overflow-hidden">
                <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-editorial font-bold text-black tracking-tight uppercase leading-[0.92] select-none break-words animate-hero-entrance [animation-delay:350ms] hover:tracking-normal transition-all duration-700 cursor-default">
                  {name}
                </h1>
              </div>

              {/* Minimalist Architectural Divider Line */}
              <div className="w-20 sm:w-28 2xl:w-36 h-[2px] bg-black my-2.5 sm:my-3 2xl:my-5 animate-line-draw [animation-delay:500ms]" />

              {/* Focus / Subtitle */}
              <p className="text-[11px] sm:text-sm 2xl:text-base font-technical uppercase tracking-[0.14em] sm:tracking-[0.2em] text-neutral-800 font-semibold leading-relaxed animate-hero-entrance [animation-delay:600ms]">
                {subtitle}
              </p>
            </div>

            {/* Editorial Bio Statement from Supabase */}
            <p className="text-xs sm:text-sm md:text-[14px] 2xl:text-base text-neutral-600 max-w-xl 2xl:max-w-2xl leading-relaxed font-sans text-justify sm:text-left animate-hero-entrance [animation-delay:700ms]">
              {bio}
            </p>

            {/* Horizontal Line Divider */}
            <div className="w-full h-[1px] bg-neutral-200/90 my-1 sm:my-2 animate-line-draw [animation-delay:750ms]" />

            {/* Key Metrics / Credibility Ribbon with Count-up Animations & Micro Gauges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 2xl:gap-10 max-w-lg 2xl:max-w-xl animate-hero-entrance [animation-delay:800ms] pt-1">
              <div className="group cursor-default">
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-3xl 2xl:text-4xl font-editorial font-bold text-black leading-none group-hover:translate-x-0.5 transition-transform duration-300">
                    {animatedBuiltWorks}
                  </span>
                  <span className="text-base sm:text-lg 2xl:text-xl font-light text-neutral-400 ms-0.5">+</span>
                </div>
                {/* Micro Animated Progress Gauge */}
                <div className="w-full h-[2px] bg-neutral-200 mt-2 overflow-hidden rounded-full">
                  <div className="h-full bg-black animate-gauge-fill w-full" />
                </div>
                <span className="text-[8px] sm:text-[9px] 2xl:text-xs font-technical uppercase tracking-[0.14em] sm:tracking-[0.2em] text-neutral-500 mt-1.5 block truncate font-medium group-hover:text-black transition-colors duration-300">
                  BUILT WORKS
                </span>
              </div>

              <div className="group cursor-default">
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-3xl 2xl:text-4xl font-editorial font-bold text-black leading-none group-hover:translate-x-0.5 transition-transform duration-300">
                    {String(animatedYears).padStart(2, "0")}
                  </span>
                  <span className="text-base sm:text-lg 2xl:text-xl font-light text-neutral-400 ms-0.5">+</span>
                </div>
                {/* Micro Animated Progress Gauge */}
                <div className="w-full h-[2px] bg-neutral-200 mt-2 overflow-hidden rounded-full">
                  <div className="h-full bg-black animate-gauge-fill w-full [animation-delay:150ms]" />
                </div>
                <span className="text-[8px] sm:text-[9px] 2xl:text-xs font-technical uppercase tracking-[0.14em] sm:tracking-[0.2em] text-neutral-500 mt-1.5 block truncate font-medium group-hover:text-black transition-colors duration-300">
                  YEARS PRACTICE
                </span>
              </div>

              <div className="group cursor-default">
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-3xl 2xl:text-4xl font-editorial font-bold text-black leading-none group-hover:translate-x-0.5 transition-transform duration-300">
                    {animatedFidelity}
                  </span>
                  <span className="text-sm sm:text-base 2xl:text-lg font-light text-neutral-400 ms-0.5">%</span>
                </div>
                {/* Micro Animated Progress Gauge */}
                <div className="w-full h-[2px] bg-neutral-200 mt-2 overflow-hidden rounded-full">
                  <div className="h-full bg-black animate-gauge-fill w-full [animation-delay:300ms]" />
                </div>
                <span className="text-[8px] sm:text-[9px] 2xl:text-xs font-technical uppercase tracking-[0.14em] sm:tracking-[0.2em] text-neutral-500 mt-1.5 block truncate font-medium group-hover:text-black transition-colors duration-300">
                  CAD FIDELITY
                </span>
              </div>
            </div>

            {/* Action Buttons with High-End Micro-interactions & Shimmer Light Sweep */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-hero-entrance [animation-delay:900ms]">
              <a
                href="#projects"
                className="group relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-black hover:bg-neutral-900 text-white text-xs uppercase tracking-widest font-technical font-medium transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] rounded-xs"
              >
                {/* Subtle Luxury Glass Shimmer Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none animate-shimmer-sweep" />

                <span className="relative z-10">Explore Selected Works</span>
                <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>

              <a
                href="#about"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border border-neutral-300 hover:border-black text-black hover:bg-black hover:text-white text-xs uppercase tracking-widest font-technical font-medium transition-all duration-300 text-center justify-center flex items-center active:scale-[0.98] rounded-xs shadow-2xs"
              >
                About & Philosophy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator with Smooth Wave Pulse */}
      <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 flex justify-center pt-2 animate-hero-entrance [animation-delay:1000ms]">
        <a
          href="#about"
          className="group inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-technical uppercase tracking-[0.25em] text-neutral-400 hover:text-black transition-colors py-2"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform duration-300 text-neutral-500 group-hover:text-black" />
        </a>
      </div>
    </section>
  );
}
