"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Issa";
  const title = profile?.titleEn || DESIGNER_INFO.titleEn || "Interior Architecture & Spatial Design";
  const subtitle = profile?.subtitleEn || DESIGNER_INFO.subtitleEn || "Bespoke Residential Sanctuaries & Tactile Living Environments";
  const bio = profile?.aboutIntroEn || DESIGNER_INFO.aboutIntroEn;
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "Cairo, Egypt";
  const avatarUrl = profile?.avatarUrl || "/images/alaa.webp";

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

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] bg-white pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Architectural Drafting Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-editorial font-black text-black/[0.015] pointer-events-none select-none -z-10 tracking-tighter leading-none animate-float-muted">
        ARCH
      </div>

      {/* Top Editorial Hairline & Monograph Info (Staggered Entrance 1) */}
      <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 animate-hero-entrance [animation-delay:100ms]">
        <div className="flex items-center justify-between py-2.5 2xl:py-3.5 border-b border-black/10 text-[9px] sm:text-[11px] 2xl:text-xs font-technical uppercase tracking-[0.16em] sm:tracking-[0.2em] 2xl:tracking-[0.25em] text-neutral-500">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
            <span className="font-semibold text-black truncate">MONOGRAPH 2026-2027</span>
            <span className="text-neutral-300">•</span>
            <span className="shrink-0 text-neutral-600 font-mono">ISSUE 01</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-neutral-400">
            <span>RESIDENTIAL & HOSPITALITY</span>
            <span>/</span>
            <span className="text-neutral-700 font-semibold">{location.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Composition: Text on LEFT, Portrait Photo on RIGHT */}
      <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 my-auto py-8 sm:py-12 lg:py-16 2xl:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 2xl:gap-24 items-center">
          {/* Left Column (7 cols): Editorial Typography & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7 2xl:space-y-9 order-1 lg:pe-6 2xl:pe-10">
            <div className="space-y-2.5 sm:space-y-3 2xl:space-y-4">
              {/* Architectural Discipline Tagline */}
              <div className="animate-hero-entrance [animation-delay:200ms] flex items-center gap-2">
                <span className="w-4 h-[1px] bg-neutral-400 inline-block" />
                <span className="text-[10px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-medium block">
                  {title}
                </span>
              </div>

              {/* Grand Monumental Name Headline with Masked Entrance */}
              <div className="overflow-hidden">
                <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-editorial font-bold text-black tracking-tight uppercase leading-[0.92] 2xl:leading-[0.86] select-none break-words animate-hero-entrance [animation-delay:350ms] hover:tracking-normal transition-all duration-700 cursor-default">
                  {name}
                </h1>
              </div>

              {/* Minimalist Architectural Divider Line (Draw Animation) */}
              <div className="w-20 sm:w-32 2xl:w-40 h-[2px] bg-black my-3 sm:my-4 2xl:my-6 animate-line-draw [animation-delay:500ms]" />

              {/* Focus / Subtitle */}
              <p className="text-[11px] sm:text-sm 2xl:text-base font-technical uppercase tracking-[0.16em] sm:tracking-[0.22em] 2xl:tracking-[0.25em] text-neutral-800 font-semibold leading-relaxed animate-hero-entrance [animation-delay:600ms]">
                {subtitle}
              </p>
            </div>

            {/* Editorial Bio Statement from Supabase (Controlled from Dashboard) */}
            <p className="text-xs sm:text-sm md:text-[15px] 2xl:text-lg text-neutral-600 max-w-xl 2xl:max-w-2xl leading-relaxed 2xl:leading-loose font-sans text-justify sm:text-left animate-hero-entrance [animation-delay:700ms]">
              {bio}
            </p>

            {/* Horizontal Line Divider matching Monograph Ref Image 2 */}
            <div className="w-full h-[1px] bg-neutral-200/90 my-2 sm:my-3 animate-line-draw [animation-delay:750ms]" />

            {/* Key Metrics / Credibility Ribbon with Count-up Animations */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 2xl:gap-12 max-w-lg 2xl:max-w-xl animate-hero-entrance [animation-delay:800ms]">
              <div className="group cursor-default">
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl 2xl:text-5xl font-editorial font-bold text-black leading-none group-hover:translate-x-0.5 transition-transform">
                    {animatedBuiltWorks}
                  </span>
                  <span className="text-lg sm:text-xl 2xl:text-2xl font-light text-neutral-400 ms-0.5">+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-[0.16em] sm:tracking-[0.2em] text-neutral-500 mt-2 block truncate font-medium">
                  BUILT WORKS
                </span>
              </div>

              <div className="group cursor-default">
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl 2xl:text-5xl font-editorial font-bold text-black leading-none group-hover:translate-x-0.5 transition-transform">
                    {String(animatedYears).padStart(2, "0")}
                  </span>
                  <span className="text-lg sm:text-xl 2xl:text-2xl font-light text-neutral-400 ms-0.5">+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-[0.16em] sm:tracking-[0.2em] text-neutral-500 mt-2 block truncate font-medium">
                  YEARS PRACTICE
                </span>
              </div>

              <div className="group cursor-default">
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl 2xl:text-5xl font-editorial font-bold text-black leading-none group-hover:translate-x-0.5 transition-transform">
                    {animatedFidelity}
                  </span>
                  <span className="text-base sm:text-lg 2xl:text-xl font-light text-neutral-400 ms-0.5">%</span>
                </div>
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-[0.16em] sm:tracking-[0.2em] text-neutral-500 mt-2 block truncate font-medium">
                  CAD FIDELITY
                </span>
              </div>
            </div>

            {/* Action Buttons with High-End Micro-interactions */}
            <div className="pt-2 2xl:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 2xl:gap-5 animate-hero-entrance [animation-delay:900ms]">
              <a
                href="#projects"
                className="group relative w-full sm:w-auto px-7 2xl:px-9 py-4 2xl:py-4.5 bg-black text-white text-xs 2xl:text-sm uppercase tracking-widest font-technical font-medium transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md hover:bg-neutral-900 active:scale-[0.98]"
              >
                <span>Explore Selected Works</span>
                <ArrowUpRight className="w-4 h-4 2xl:w-5 2xl:h-5 text-neutral-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              <a
                href="#about"
                className="w-full sm:w-auto px-7 2xl:px-9 py-4 2xl:py-4.5 border border-black/30 hover:border-black text-black hover:bg-black hover:text-white text-xs 2xl:text-sm uppercase tracking-widest font-technical font-medium transition-all duration-300 text-center justify-center flex items-center active:scale-[0.98]"
              >
                About & Philosophy
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Real Portrait Photo with Architectural Drafting Guides */}
          <div className="lg:col-span-5 relative order-2 animate-hero-entrance [animation-delay:400ms]">
            <div className="relative mx-auto max-w-[290px] xs:max-w-xs sm:max-w-sm lg:max-w-none">
              {/* Outer architectural guide frame with Drafting Tick Marks (+) */}
              <div className="absolute -inset-3 sm:-inset-5 2xl:-inset-6 border border-neutral-300/80 -z-10 pointer-events-none transition-all duration-700">
                {/* Corner Crosshairs */}
                <span className="absolute -top-1.5 -left-1.5 font-mono text-[10px] text-neutral-400 leading-none select-none">+</span>
                <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] text-neutral-400 leading-none select-none">+</span>
                <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[10px] text-neutral-400 leading-none select-none">+</span>
                <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[10px] text-neutral-400 leading-none select-none">+</span>
              </div>

              {/* Main Portrait Frame with Atmospheric Depth */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-neutral-300 shadow-xl group">
                <Image
                  src={avatarUrl}
                  alt={`${name} - Interior Architect & Spatial Designer`}
                  fill
                  priority
                  sizes="(max-width: 640px) 290px, (max-width: 1024px) 380px, (max-width: 1536px) 500px, 650px"
                  className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-75 pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />

                {/* Bottom Architectural Caption Strip */}
                <div className="absolute bottom-3 sm:bottom-4 2xl:bottom-5 start-3 sm:start-4 2xl:start-5 end-3 sm:end-4 2xl:end-5 flex items-center justify-between text-white text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider backdrop-blur-md bg-black/60 px-3 sm:px-4 py-2 border border-white/20 transition-all duration-300 group-hover:border-white/40">
                  <span className="font-semibold tracking-[0.16em] truncate">
                    {name.toUpperCase()}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] 2xl:text-[10px] text-neutral-300 shrink-0">
                    ARCHITECT
                  </span>
                </div>
              </div>

              {/* Refined Architectural Studio Seal (Minimalist & Floating Ambient) */}
              <div className="absolute -bottom-3 -start-3 sm:-bottom-4 sm:-start-4 2xl:-bottom-5 2xl:-start-5 bg-white border border-neutral-300 px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg flex items-center gap-2.5 sm:gap-3.5 2xl:gap-4 animate-float-muted z-10">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white flex items-center justify-center font-technical font-bold text-[10px] sm:text-xs tracking-tight shrink-0 shadow-inner">
                  AI
                </div>
                <div className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase leading-tight tracking-[0.12em] sm:tracking-[0.14em]">
                  <span className="font-bold text-black block">Studio {name}</span>
                  <span className="text-neutral-500 text-[8px] sm:text-[9px] 2xl:text-[10px] block tracking-widest">
                    {location}
                  </span>
                </div>
              </div>
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