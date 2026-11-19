"use client";

import React, { useState, useEffect, useRef } from "react";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Layers,
  Sparkles,
  SunMedium,
  Hammer,
  FileSpreadsheet,
  Ruler,
  Paintbrush,
  Languages,
  Box,
  Check,
  ShieldCheck,
} from "lucide-react";

interface SkillsSectionProps {
  profile?: {
    software?: any[];
    skills?: {
      technicalEn?: string[];
      hobbiesEn?: string[];
      languages?: Array<{ nameEn: string; levelEn: string }>;
    };
    education?: Array<{
      titleEn?: string;
      degree?: string;
      institutionEn?: string;
      institution?: string;
      year?: string;
      grade?: string;
      descEn?: string;
      description?: string;
    }>;
  };
}

export default function SkillsSection({ profile }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Viewport Intersection & Parallax Scroll Tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
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

  const parallaxOffset = (scrollProgress - 0.5) * 32;

  // ----------------------------------------------------------------------
  // DYNAMIC SUPABASE DATA BINDINGS WITH ROCK-SOLID ARCHITECTURAL FALLBACKS
  // ----------------------------------------------------------------------

  // 1. Dynamic Software List from Supabase software_skills or designer_profile
  const softwareList: any[] =
    profile?.software && profile.software.length > 0
      ? profile.software
      : DESIGNER_INFO.software;

  const findTool = (regex: RegExp) =>
    softwareList.find((s: any) => s.name && regex.test(s.name));

  // Bento 1: Primary 3D Photorealism Engine (3ds Max / Corona / V-Ray)
  const primaryTool = findTool(/3ds|max|corona|v-ray|rendering/i) || softwareList[0] || {
    name: "3ds Max & Corona Renderer",
    role: "Physically-Based Lighting & Hyper-Realism",
    badge: "3DS / CRN",
    engine: "Autodesk & Chaos Group",
    deliverable: "4K Photorealistic Renders & 360° VR Spherical Views",
  };

  // Bento 2: Technical Drafting (AutoCAD 2D)
  const cadTool = findTool(/autocad|cad|drafting/i) || softwareList[2] || {
    name: "AutoCAD 2D",
    role: "Executive Shop Drawings",
    badge: "CAD",
    engine: "Autodesk",
    deliverable: "1:10 Joinery Details & Dimensioned Floor Plans",
  };

  // Bento 3: BIM & Spatial Volumetrics (Revit BIM / SketchUp)
  const bimTool = findTool(/revit|bim|sketchup/i) || softwareList[4] || {
    name: "Revit BIM & SketchUp",
    role: "Volumetric Massing & BIM",
    badge: "BIM / SKP",
    engine: "Autodesk & Trimble",
    deliverable: "BIM Level 2 Coordination & Spatial Massing",
  };

  // Bento 5: Editorial & Post-Production (InDesign / Photoshop)
  const editorialTool = findTool(/photoshop|indesign|adobe/i) || softwareList[3] || {
    name: "InDesign & Photoshop CC",
    role: "Client Monographs & Grading",
    badge: "PS / ID",
    engine: "Adobe Creative Cloud",
    deliverable: "Publication-Grade Monographs & Material Boards",
  };

  // 2. Academic Foundation (Bento 4) from Supabase education table
  const eduItem = profile?.education?.[0];
  const institution =
    eduItem?.institutionEn || eduItem?.institution || "Alexandria University";
  const degree =
    eduItem?.titleEn || eduItem?.degree || "Faculty of Fine Arts • Interior Architecture";
  const grade = eduItem?.grade || "Grade: Very Good";
  const eduDescription =
    eduItem?.descEn ||
    eduItem?.description ||
    "Rooted in fine arts spatial composition. Merging freehand architectural sketching, biophilic organic forms, and natural tactile material curation.";

  // 3. Technical Competencies & Execution Standards (Bento 6)
  const techSkills = profile?.skills?.technicalEn || DESIGNER_INFO.skills.technicalEn || [];
  const languages = profile?.skills?.languages || DESIGNER_INFO.skills.languages || [
    { nameEn: "Arabic", levelEn: "Native" },
    { nameEn: "English", levelEn: "Professional Working" },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 sm:py-24 2xl:py-32 bg-[#FBFBFA] border-t border-neutral-200 relative overflow-hidden select-none"
    >
      {/* Background Architectural Watermark with Parallax Drift */}
      <div
        className="absolute top-1/4 -right-12 text-[18vw] font-editorial font-black text-black/[0.015] pointer-events-none select-none -z-10 leading-none tracking-tighter"
        style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
      >
        TOOLSET
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
              <span>03 • TECHNICAL MASTERY & TOOLSET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              Computational Precision & Spatial Artistry
            </h2>
          </div>
          <div className="text-[10px] sm:text-xs 2xl:text-sm font-technical text-neutral-500 text-start md:text-end uppercase tracking-widest">
            <div className="font-semibold text-black">PRODUCTION-READY PIPELINE</div>
            <div className="text-neutral-400 mt-1">ZERO CLICHÉ PERCENTAGES • 100% REAL DELIVERABLES</div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODULAR BENTO MATRIX (12-Column Architectural Grid)          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 2xl:gap-8 items-stretch">
          {/* ------------------------------------------------------------ */}
          {/* BENTO 1: HERO VISUAL COMPUTING (8 Cols on Desktop)           */}
          {/* Dynamic 3ds Max / Corona / Photorealism Engine               */}
          {/* ------------------------------------------------------------ */}
          <div
            className={`lg:col-span-8 bg-neutral-950 text-white border border-neutral-900 p-6 sm:p-8 2xl:p-10 flex flex-col justify-between relative overflow-hidden group shadow-md hover:border-neutral-700 hover:shadow-2xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Architectural Drafting Crosshairs */}
            <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-neutral-600 select-none group-hover:text-neutral-400 transition-colors">+</span>
            <span className="absolute top-2.5 right-2.5 font-mono text-[9px] text-neutral-600 select-none group-hover:text-neutral-400 transition-colors">+</span>
            <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-neutral-600 select-none group-hover:text-neutral-400 transition-colors">+</span>
            <span className="absolute bottom-2.5 right-2.5 font-mono text-[9px] text-neutral-600 select-none group-hover:text-neutral-400 transition-colors">+</span>

            {/* Subtle Sheen Highlight */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header Spec Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-400">01 //</span>
                  <span className="text-[10px] sm:text-xs font-technical uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                    Primary Visual Computing & Simulation
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 bg-white/10 border border-white/20 font-mono text-[9px] sm:text-[10px] text-white tracking-widest uppercase">
                    {primaryTool.name?.toUpperCase() || "3DS MAX"}
                  </span>
                  <span className="px-2 py-0.5 bg-[#FF6A3D]/20 border border-[#FF6A3D]/40 font-mono text-[9px] sm:text-[10px] text-[#FFA07A] tracking-widest uppercase">
                    {primaryTool.engine?.toUpperCase() || "CHAOS GROUP"}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-950/70 border border-emerald-500/30 font-mono text-[9px] sm:text-[10px] text-emerald-400 tracking-widest uppercase">
                    PBR ENGINES
                  </span>
                </div>
              </div>

              {/* Title & Dynamic Narrative */}
              <div>
                <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-editorial font-bold text-white tracking-tight leading-snug">
                  {primaryTool.role || "Physically-Based Lighting & Hyper-Realism"}
                </h3>
                <p className="text-xs sm:text-[13px] 2xl:text-sm text-neutral-300 mt-2.5 font-sans leading-relaxed max-w-2xl">
                  Translating complex spatial design into photorealistic atmospheres. Engineered with physically correct light bounces, micro-roughness surface scattering, and calibrated 2700K–3000K warm circadian illumination.
                </p>
              </div>

              {/* 4 Architectural Capabilities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3 bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-technical uppercase tracking-wider text-white font-semibold">
                    <SunMedium className="w-3.5 h-3.5 text-[#FFA07A]" />
                    <span>LightMix CCT Control</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-normal">
                    Real-time photometric lux distribution & biological warm balance without re-rendering.
                  </p>
                </div>

                <div className="p-3 bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-technical uppercase tracking-wider text-white font-semibold">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PBR Material Synthesis</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-normal">
                    Complex tactile mapping for open-pore travertine, bookmatched marble, bouclés, and brushed brass.
                  </p>
                </div>

                <div className="p-3 bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-technical uppercase tracking-wider text-white font-semibold">
                    <Box className="w-3.5 h-3.5 text-sky-400" />
                    <span>High-Poly Mesh Modeling</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-normal">
                    Complex architectural geometries, organic soft curves, and bespoke parametric joinery volumes.
                  </p>
                </div>

                <div className="p-3 bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-technical uppercase tracking-wider text-white font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Caustics & Volumetrics</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-normal">
                    Subtle volumetric dust motes, fluted glass refraction, and natural architectural light falloff.
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverable Footer Bar */}
            <div className="pt-4 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-neutral-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Deliverable:</span>
                <span className="text-white font-semibold">{primaryTool.deliverable}</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-500">
                {primaryTool.engine?.toUpperCase() || "AUTODESK & CHAOS"}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* BENTO 2: 2D EXECUTIVE BLUEPRINTS (4 Cols on Desktop)         */}
          {/* Dynamic AutoCAD Shop Drawings & Detailing                    */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{ transitionDelay: "100ms" }}
            className={`lg:col-span-4 bg-white border border-neutral-300 hover:border-black p-6 sm:p-7 2xl:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 group relative ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Drafting Crosshairs */}
            <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-neutral-300 select-none group-hover:text-black transition-colors">+</span>
            <span className="absolute top-2.5 right-2.5 font-mono text-[9px] text-neutral-300 select-none group-hover:text-black transition-colors">+</span>

            <div className="space-y-4">
              {/* Header Spec Row */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-black transition-colors">02 //</span>
                  <span className="text-[10px] font-technical uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                    Technical Drafting
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 font-mono text-[9px] text-black tracking-widest uppercase font-semibold">
                  {cadTool.badge || "AUTOCAD 2D"}
                </span>
              </div>

              {/* Title & Dynamic Narrative */}
              <div>
                <h3 className="text-lg sm:text-xl font-editorial font-bold text-black tracking-tight">
                  {cadTool.role || "Executive Shop Drawings"}
                </h3>
                <p className="text-xs text-neutral-600 mt-2 font-sans leading-relaxed">
                  Millimeter-accurate working drawing packages ready for municipal permits and flawless on-site contractor execution.
                </p>
              </div>

              {/* Technical Drawing List */}
              <div className="space-y-2 pt-1 font-technical text-xs">
                <div className="flex items-start gap-2 p-2 bg-neutral-50 border border-neutral-200/80">
                  <Ruler className="w-3.5 h-3.5 text-neutral-700 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="font-semibold text-black uppercase tracking-wider block text-[11px]">
                      Dimensioned Floor Plans
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans">
                      Clearance standards & movement vectors
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-2 bg-neutral-50 border border-neutral-200/80">
                  <SunMedium className="w-3.5 h-3.5 text-neutral-700 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="font-semibold text-black uppercase tracking-wider block text-[11px]">
                      Reflected Ceiling Plans (RCP)
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans">
                      Concealed LED pockets & circuit zoning
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-2 bg-neutral-50 border border-neutral-200/80">
                  <Hammer className="w-3.5 h-3.5 text-neutral-700 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="font-semibold text-black uppercase tracking-wider block text-[11px]">
                      1:10 Joinery Detailing
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans">
                      Shadow reveals & custom millwork sections
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverable Footer */}
            <div className="pt-3.5 mt-5 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span className="uppercase tracking-wider text-black font-semibold">TOLERANCE: &lt; 2MM</span>
              <span className="truncate">{cadTool.deliverable || "1:10 • 1:20 • 1:50"}</span>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* BENTO 3: SPATIAL MASSING & BIM (4 Cols on Desktop)           */}
          {/* Dynamic Revit BIM & SketchUp Pro                             */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{ transitionDelay: "150ms" }}
            className={`lg:col-span-4 bg-white border border-neutral-300 hover:border-black p-6 sm:p-7 2xl:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 group relative ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-black transition-colors">03 //</span>
                  <span className="text-[10px] font-technical uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                    BIM & Volumetrics
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 font-mono text-[9px] text-black tracking-widest uppercase font-semibold">
                  {bimTool.badge || "REVIT / SKP"}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-editorial font-bold text-black tracking-tight">
                  {bimTool.role || "Volumetric Massing & BIM"}
                </h3>
                <p className="text-xs text-neutral-600 mt-2 font-sans leading-relaxed">
                  Rapid 3D schematic massing, sightline evaluation, daylight angles, and BIM architectural documentation.
                </p>
              </div>

              <div className="space-y-2 pt-1 text-[11px] font-sans text-neutral-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  <span>Early-stage volumetric sightline & clearance studies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  <span>MEP & structural coordination clash detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  <span>Multi-angle client walkthrough presentations</span>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-5 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              <span className="text-black font-semibold">COORDINATION</span>
              <span className="truncate">{bimTool.deliverable || "BIM LEVEL 2"}</span>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* BENTO 4: FINE ARTS FOUNDATION (4 Cols on Desktop)            */}
          {/* Dynamic Supabase Education Table (Alexandria Univ Fine Arts) */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{ transitionDelay: "200ms" }}
            className={`lg:col-span-4 bg-[#F5F4F0] border border-neutral-300 hover:border-black p-6 sm:p-7 2xl:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 group relative ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-300/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-black transition-colors">04 //</span>
                  <span className="text-[10px] font-technical uppercase tracking-[0.2em] text-neutral-600 font-semibold">
                    Academic Heritage
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] tracking-widest uppercase">
                  FINE ARTS
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-editorial font-bold text-black tracking-tight">
                  {degree}
                </h3>
                <p className="text-xs text-neutral-700 mt-2 font-sans leading-relaxed">
                  {eduDescription}
                </p>
              </div>

              <div className="space-y-2 pt-1 text-[11px] font-sans text-neutral-700">
                <div className="flex items-center gap-2">
                  <Paintbrush className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>Freehand ideation sketches & proportion studies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>Tactile stone, wood & textile flatlays curation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>Biophilic harmony & organic curved geometry</span>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-5 border-t border-neutral-300/80 flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-wider">
              <span className="text-black font-semibold truncate">{institution.toUpperCase()}</span>
              <span className="shrink-0">{grade.toUpperCase()}</span>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* BENTO 5: EDITORIAL & MONOGRAPH DESIGN (4 Cols on Desktop)    */}
          {/* Dynamic InDesign & Photoshop CC                              */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{ transitionDelay: "250ms" }}
            className={`lg:col-span-4 bg-white border border-neutral-300 hover:border-black p-6 sm:p-7 2xl:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 group relative ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-black transition-colors">05 //</span>
                  <span className="text-[10px] font-technical uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                    Visual Storytelling
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 font-mono text-[9px] text-black tracking-widest uppercase font-semibold">
                  {editorialTool.badge || "INDESIGN / PS"}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-editorial font-bold text-black tracking-tight">
                  {editorialTool.role || "Client Monographs & Grading"}
                </h3>
                <p className="text-xs text-neutral-600 mt-2 font-sans leading-relaxed">
                  Editorial post-production color balance, bloom grading, sample swatch boards, and bespoke architectural pitch books.
                </p>
              </div>

              <div className="space-y-2 pt-1 text-[11px] font-sans text-neutral-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  <span>Cinematic depth-of-field & atmospheric light balancing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  <span>Executive A4 architectural monographs & client dossiers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  <span>Tactile material boards & swatch presentation</span>
                </div>
              </div>
            </div>

            <div className="pt-3.5 mt-5 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              <span className="text-black font-semibold">OUTPUT</span>
              <span className="truncate">{editorialTool.deliverable || "PUBLICATION GRADE"}</span>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* BENTO 6: FULL-WIDTH STUDIO EXECUTION STANDARDS (12 Cols)     */}
          {/* Dynamic Technical Disciplines & Languages                    */}
          {/* ------------------------------------------------------------ */}
          <div
            style={{ transitionDelay: "300ms" }}
            className={`lg:col-span-12 bg-white border border-neutral-300 p-6 sm:p-7 2xl:p-9 shadow-xs hover:border-black transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Header Strip */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
              <span className="text-black font-bold">06 // STUDIO DELIVERY & EXECUTION STANDARDS</span>
              <span>RIGOROUS SITE REALIZATION</span>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Pillar 1: Turnkey Supervision */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-technical font-bold uppercase tracking-wider text-black">
                      Turnkey Site Supervision
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      Zero-Tolerance Quality
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed ps-10">
                  {techSkills[4] || "Rigorous on-site engineering oversight, laser level verification, and direct alignment with finishing contractors to match 3D intent."}
                </p>
              </div>

              {/* Pillar 2: BOQ & Cost Governance */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-technical font-bold uppercase tracking-wider text-black">
                      BOQ & Cost Integrity
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      Budget Governance
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed ps-10">
                  {techSkills[5] || "Comprehensive Bill of Quantities, material yield optimization, vendor procurement vetting, and transparent budget management."}
                </p>
              </div>

              {/* Pillar 3: Bilingual Global Reach */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                    <Languages className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-technical font-bold uppercase tracking-wider text-black">
                      Global Client Pitching
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {languages.map((l: any) => l.nameEn || l.name || "Language").join(" & ")}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed ps-10">
                  Comfortable presenting design concepts, specifications, and contracts to private villa owners and commercial developers across Egypt and the GCC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
