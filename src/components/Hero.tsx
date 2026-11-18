import React from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] bg-white pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-14 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Editorial Hairline & Monograph Info */}
      <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between py-2.5 2xl:py-3.5 border-b border-black/10 text-[9px] sm:text-[11px] 2xl:text-xs font-technical uppercase tracking-[0.16em] sm:tracking-[0.2em] 2xl:tracking-[0.25em] text-neutral-500">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
            <span className="font-semibold text-black truncate">MONOGRAPH 2026-2027</span>
            <span className="text-neutral-300">•</span>
            <span className="shrink-0">ISSUE 01</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-neutral-400">
            <span>RESIDENTIAL & HOSPITALITY</span>
            <span>/</span>
            <span>CAIRO, EGYPT</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Composition: Text on LEFT, Portrait Photo on RIGHT */}
      <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 my-auto py-8 sm:py-10 lg:py-16 2xl:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 2xl:gap-24 items-center">
          {/* Left Column (7 cols): Editorial Typography & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7 2xl:space-y-9 order-1 lg:pe-6 2xl:pe-10">
            <div className="space-y-2.5 sm:space-y-3 2xl:space-y-4">
              <span className="text-[10px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-medium block">
                Interior Architecture & Spatial Design
              </span>

              {/* Grand Monumental Name Headline */}
              <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-editorial font-bold text-black tracking-tight uppercase leading-[0.92] 2xl:leading-[0.86] select-none break-words">
                Alaa Issa
              </h1>

              {/* Minimalist Architectural Divider Line */}
              <div className="w-16 sm:w-28 2xl:w-36 h-[1.5px] 2xl:h-[2px] bg-black my-3 sm:my-4 2xl:my-6" />

              <p className="text-[11px] sm:text-sm 2xl:text-base font-technical uppercase tracking-[0.16em] sm:tracking-[0.22em] 2xl:tracking-[0.25em] text-neutral-800 font-semibold leading-relaxed">
                Bespoke Residential Sanctuaries & Tactile Living Environments
              </p>
            </div>

            {/* Editorial Bio Statement */}
            <p className="text-xs sm:text-sm md:text-[15px] 2xl:text-lg text-neutral-600 max-w-xl 2xl:max-w-2xl leading-relaxed 2xl:leading-loose font-sans text-justify sm:text-left">
              Architectural interior designer specializing in timeless residential sanctuaries, bespoke joinery, and circadian ambient lighting. Transforming raw volumes into cohesive, functional, and deeply tactile living environments.
            </p>

            {/* Key Metrics / Credibility Ribbon */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 2xl:gap-10 pt-4 2xl:pt-6 border-t border-neutral-200 max-w-lg 2xl:max-w-xl">
              <div>
                <span className="block text-xl sm:text-3xl 2xl:text-4xl font-editorial font-bold text-black leading-none">
                  85<span className="text-sm sm:text-base 2xl:text-lg font-sans font-normal text-neutral-400">+</span>
                </span>
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider 2xl:tracking-widest text-neutral-500 mt-1 block truncate">
                  Built Works
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-3xl 2xl:text-4xl font-editorial font-bold text-black leading-none">
                  07<span className="text-sm sm:text-base 2xl:text-lg font-sans font-normal text-neutral-400">+</span>
                </span>
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider 2xl:tracking-widest text-neutral-500 mt-1 block truncate">
                  Years Practice
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-3xl 2xl:text-4xl font-editorial font-bold text-black leading-none">
                  100<span className="text-sm sm:text-base 2xl:text-lg font-sans font-normal text-neutral-400">%</span>
                </span>
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider 2xl:tracking-widest text-neutral-500 mt-1 block truncate">
                  CAD Fidelity
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 2xl:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 2xl:gap-5">
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 2xl:px-8 py-3.5 2xl:py-4 bg-black hover:bg-neutral-800 text-white text-xs 2xl:text-sm uppercase tracking-widest font-technical font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Explore Selected Works</span>
                <ArrowUpRight className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </a>

              <a
                href="#about"
                className="w-full sm:w-auto px-6 2xl:px-8 py-3.5 2xl:py-4 border border-black/25 hover:border-black text-black text-xs 2xl:text-sm uppercase tracking-widest font-technical font-medium transition-colors text-center justify-center flex items-center"
              >
                About & Philosophy
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Real Portrait Photo of Eng. Alaa Issa */}
          <div className="lg:col-span-5 relative order-2">
            <div className="relative mx-auto max-w-[280px] xs:max-w-xs sm:max-w-sm lg:max-w-none">
              {/* Outer architectural guide frame */}
              <div className="absolute -inset-2.5 sm:-inset-4 2xl:-inset-5 border border-neutral-200 -z-10 pointer-events-none" />

              {/* Main Portrait Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-neutral-300 shadow-md group">
                <Image
                  src="/images/alaa.webp"
                  alt="Eng. Alaa Issa - Interior Architect & Spatial Designer"
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, (max-width: 1536px) 500px, 650px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                />

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Bottom Architectural Caption Strip */}
                <div className="absolute bottom-3 sm:bottom-4 2xl:bottom-5 start-3 sm:start-4 2xl:start-5 end-3 sm:end-4 2xl:end-5 flex items-center justify-between text-white text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider backdrop-blur-xs bg-black/50 px-2.5 sm:px-3.5 2xl:px-4 py-1.5 sm:py-2 2xl:py-2.5 border border-white/20">
                  <span className="font-semibold tracking-[0.14em] truncate">
                    ENG. ALAA ISSA
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] 2xl:text-[10px] text-neutral-300 shrink-0">
                    INTERIOR ARCHITECT
                  </span>
                </div>
              </div>

              {/* Refined Architectural Studio Seal (Minimalist & Crisp) */}
              <div className="absolute -bottom-3 -start-3 sm:-bottom-4 sm:-start-4 2xl:-bottom-5 2xl:-start-5 bg-white border border-neutral-300 px-2.5 py-2 sm:px-3.5 sm:py-2.5 2xl:px-4 2xl:py-3 shadow-sm flex items-center gap-2 sm:gap-3 2xl:gap-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-8 2xl:h-8 bg-black text-white flex items-center justify-center font-technical font-bold text-[9px] sm:text-[10px] 2xl:text-xs tracking-tight shrink-0">
                  AI
                </div>
                <div className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase leading-tight tracking-[0.12em] sm:tracking-[0.14em]">
                  <span className="font-bold text-black block">Studio Alaa Issa</span>
                  <span className="text-neutral-500 text-[8px] sm:text-[9px] 2xl:text-[10px] block tracking-widest">
                    Cairo, Egypt
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 flex justify-center pt-2">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-technical uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
