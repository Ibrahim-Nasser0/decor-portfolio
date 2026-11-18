"use client";

import React, { useState, useEffect, useRef } from "react";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Monitor,
  Compass,
  Palette,
  CheckCircle2,
  Layers,
  Sparkles,
  SunMedium,
  Hammer,
  FileSpreadsheet,
  Ruler,
  Eye,
  Paintbrush,
  Languages,
  ArrowUpRight,
  Sliders,
  Cpu,
} from "lucide-react";

interface SkillsSectionProps {
  profile?: {
    software?: any[];
    skills?: {
      technicalEn?: string[];
      hobbiesEn?: string[];
      languages?: Array<{ nameEn: string; levelEn: string }>;
    };
  };
}

export default function SkillsSection({ profile }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState<"software" | "engineering" | "artistry">("software");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Trigger Observer & Parallax Tracking
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

  const parallaxOffset = (scrollProgress - 0.5) * 28;

  // Default Architectural Software Suite
  const DEFAULT_SOFTWARE = [
    {
      name: "3ds Max",
      engine: "Autodesk",
      role: "High-Poly Spatial Modeling & Environment Setup",
      badge: "3DS",
      level: "96%",
      deliverable: "Complex architectural geometries & interior volumes",
    },
    {
      name: "Corona Renderer",
      engine: "Chaos Group",
      role: "Physically-Based Lighting & Photorealism",
      badge: "CRN",
      level: "98%",
      deliverable: "Accurate light bouncing, micro-roughness & caustic realism",
    },
    {
      name: "AutoCAD",
      engine: "Autodesk",
      role: "2D Executive Shop Drawings & Blueprints",
      badge: "CAD",
      level: "99%",
      deliverable: "Dimensioned floor plans, elevations, sections & joinery details",
    },
    {
      name: "Revit BIM",
      engine: "Autodesk",
      role: "Building Information Modeling & Documentation",
      badge: "RVT",
      level: "88%",
      deliverable: "BIM coordination, schedules & multi-discipline alignment",
    },
    {
      name: "SketchUp Pro",
      engine: "Trimble",
      role: "Rapid 3D Volumetric Concept Massing",
      badge: "SKP",
      level: "95%",
      deliverable: "Initial schematic massing & spatial volumetric studies",
    },
    {
      name: "Photoshop & InDesign",
      engine: "Adobe Creative Cloud",
      role: "Post-Production, Color Grading & Monograph Design",
      badge: "CC",
      level: "94%",
      deliverable: "Architectural presentation sheets, boards & lighting balance",
    },
  ];

  // Dynamic Software Suite from Supabase
  const softwareSuite =
    profile?.software && profile.software.length > 0
      ? profile.software.map((sw: any, idx: number) => {
          const fallback = DEFAULT_SOFTWARE[idx] || DEFAULT_SOFTWARE[0];
          return {
            name: sw.name || fallback.name,
            engine: sw.engine || fallback.engine,
            role: sw.role || fallback.role,
            badge: sw.badge || (sw.name ? sw.name.slice(0, 3).toUpperCase() : fallback.badge),
            level: sw.level ? (sw.level.includes("%") ? sw.level : `${sw.level}%`) : fallback.level,
            deliverable: sw.deliverable || fallback.deliverable,
          };
        })
      : DEFAULT_SOFTWARE;

  // Default Architectural Competencies
  const DEFAULT_DISCIPLINES = [
    {
      num: "01",
      icon: Ruler,
      title: "Spatial Ergonomics & Circulation",
      tagline: "Circulation Analysis • Flow Optimization",
      desc: "Scientific space planning analyzing movement vectors, human proportion clearance, and furniture clearances to ensure effortless functional fluidity.",
      specs: ["1:50 Zoning Diagrams", "Clearance Standards", "Ergonomic Sightlines"],
    },
    {
      num: "02",
      icon: SunMedium,
      title: "Circadian Lighting Architecture",
      tagline: "Lux Calculations • 2700K - 3000K Warmth",
      desc: "Layered illumination engineering combining ambient coves, architectural task accents, and grazing wall washers calibrated for biological wellbeing.",
      specs: ["Photometric Lux Standards", "Concealed LED Details", "Color Rendering Index (CRI 95+)"],
    },
    {
      num: "03",
      icon: Layers,
      title: "Materiality & Tactile Curation",
      tagline: "Physical Swatches • Natural Stone & Timber",
      desc: "Harmonizing rich physical textures: open-pore travertines, bookmatched marbles, rift-sawn European oaks, fluted wall acoustics, and hand-finished lime wash.",
      specs: ["Tactile Flatlays", "Texture Compatibility", "Durability Classification"],
    },
    {
      num: "04",
      icon: Hammer,
      title: "Executive Shop Drawings & Joinery",
      tagline: "1:10 Detailing • Millimeter Precision",
      desc: "Exhaustive executive production packages detailing custom cabinetry, shadow reveals, concealed hinges, integrated lighting pockets, and acoustic paneling.",
      specs: ["1:10 / 1:20 Detailing", "Shadow Gap Reveals", "Concealed Joinery Specs"],
    },
    {
      num: "05",
      icon: Eye,
      title: "Turnkey Site Quality Supervision",
      tagline: "Laser Verification • Zero-Tolerance Execution",
      desc: "Rigorous on-site engineering oversight ensuring finishing contractors adhere strictly to design intent, laser alignments, and impeccable material transitions.",
      specs: ["Laser Level Verification", "Contractor Alignment", "Snagging Inspections"],
    },
    {
      num: "06",
      icon: FileSpreadsheet,
      title: "BOQ & Cost Integrity Oversight",
      tagline: "Yield Maximization • Budget Governance",
      desc: "Comprehensive Bill of Quantities (BOQ), material yield optimization, vendor procurement vetting, and transparent budget governance throughout delivery.",
      specs: ["Accurate Item Quantities", "Vendor Benchmarking", "Budget Integrity"],
    },
  ];

  // Dynamic Disciplines from Supabase
  const customCompetencies = profile?.skills?.technicalEn;
  const disciplines =
    customCompetencies && customCompetencies.length > 0
      ? customCompetencies.map((comp: string, idx: number) => {
          const fallback = DEFAULT_DISCIPLINES[idx] || {
            num: String(idx + 1).padStart(2, "0"),
            icon: Ruler,
            title: comp,
            tagline: "Executive Spatial Detailing",
            desc: "Rigorous architectural methodology and spatial detailing applied to bespoke interior environments.",
            specs: ["Engineering Standards", "Executive Oversight", "Quality Control"],
          };
          return {
            ...fallback,
            title: comp || fallback.title,
            num: String(idx + 1).padStart(2, "0"),
          };
        })
      : DEFAULT_DISCIPLINES;

  // Dynamic Artistry & Languages from Supabase
  const hobbies = profile?.skills?.hobbiesEn || DESIGNER_INFO.skills.hobbiesEn;
  const languages = profile?.skills?.languages || DESIGNER_INFO.skills.languages;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 sm:py-24 2xl:py-32 bg-[#faf9f6] border-t border-neutral-200 relative overflow-hidden select-none"
    >
      {/* Background Architectural Drafting Watermark */}
      <div
        className="absolute top-1/4 -right-10 text-[20vw] font-editorial font-black text-black/[0.015] pointer-events-none select-none -z-10 leading-none tracking-tighter"
        style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
      >
        TOOLSET
      </div>

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header with Scroll-Triggered Entrance */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 2xl:mb-16 pb-6 border-b border-black/10 gap-4 sm:gap-6 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>03 • TECHNICAL MASTERY & TOOLSET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              Capabilities & Proficiencies
            </h2>
          </div>
          <p className="text-xs 2xl:text-sm text-neutral-600 max-w-sm 2xl:max-w-md font-sans leading-relaxed">
            Bridging technical precision, computational modeling, and hands-on material artistry across every architectural phase.
          </p>
        </div>

        {/* Architectural Filter / Tab Navigators with Smooth Hover States */}
        <div
          className={`flex items-center gap-2 sm:gap-3 2xl:gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mb-10 sm:mb-12 transition-all duration-700 ease-out delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => setActiveTab("software")}
            className={`px-4 sm:px-5 py-2.5 text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest transition-all duration-300 border shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === "software"
                ? "bg-black text-white border-black shadow-md font-bold scale-[1.02]"
                : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
            }`}
          >
            <Monitor className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
            <span>3D Engines & Software Suite</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                activeTab === "software" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {String(softwareSuite.length).padStart(2, "0")}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("engineering")}
            className={`px-4 sm:px-5 py-2.5 text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest transition-all duration-300 border shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === "engineering"
                ? "bg-black text-white border-black shadow-md font-bold scale-[1.02]"
                : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
            }`}
          >
            <Compass className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
            <span>Architectural Disciplines</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                activeTab === "engineering" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {String(disciplines.length).padStart(2, "0")}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("artistry")}
            className={`px-4 sm:px-5 py-2.5 text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest transition-all duration-300 border shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === "artistry"
                ? "bg-black text-white border-black shadow-md font-bold scale-[1.02]"
                : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
            }`}
          >
            <Palette className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
            <span>Artistry & Languages</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                activeTab === "artistry" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {String(hobbies.length + languages.length).padStart(2, "0")}
            </span>
          </button>
        </div>

        {/* TAB 1: 3D Engines & Software Suite with Animated Progress Bars */}
        {activeTab === "software" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8">
              {softwareSuite.map((sw: any, idx: number) => (
                <div
                  key={idx}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                  className={`bg-white border border-neutral-300 hover:border-black p-6 2xl:p-8 transition-all duration-500 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group relative ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  {/* Subtle Drafting Crosshairs */}
                  <span className="absolute top-2 left-2 font-mono text-[9px] text-neutral-300 group-hover:text-black transition-colors select-none">+</span>
                  <span className="absolute top-2 right-2 font-mono text-[9px] text-neutral-300 group-hover:text-black transition-colors select-none">+</span>

                  <div className="space-y-4 pt-1">
                    {/* Header with Monogram Badge & Title */}
                    <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
                      <div>
                        <span className="text-[10px] 2xl:text-[11px] font-technical uppercase tracking-widest text-neutral-400 block font-semibold">
                          {sw.engine}
                        </span>
                        <h3 className="text-lg 2xl:text-xl font-editorial font-bold text-black group-hover:tracking-wide transition-all">
                          {sw.name}
                        </h3>
                      </div>
                      <div className="w-10 h-10 2xl:w-11 2xl:h-11 border border-black flex items-center justify-center font-mono font-bold text-xs 2xl:text-sm text-black group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-xs">
                        {sw.badge}
                      </div>
                    </div>

                    {/* Technical Role */}
                    <div>
                      <span className="text-[11px] 2xl:text-xs font-technical uppercase tracking-wider text-neutral-800 font-semibold block">
                        {sw.role}
                      </span>
                      <p className="text-xs 2xl:text-sm text-neutral-600 mt-2 font-sans leading-relaxed">
                        {sw.deliverable}
                      </p>
                    </div>
                  </div>

                  {/* Animated Proficiency Bar with Percentage Counter */}
                  <div className="pt-5 border-t border-neutral-100 space-y-2">
                    <div className="flex items-center justify-between text-[10px] 2xl:text-[11px] font-technical uppercase tracking-widest text-neutral-500">
                      <span>Pipeline Mastery</span>
                      <span className="font-mono font-bold text-black">{sw.level}</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black transition-all duration-1000 ease-out rounded-full"
                        style={{
                          width: isVisible ? sw.level : "0%",
                          transitionDelay: `${300 + idx * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline Workflow Banner with High-End Editorial Accents */}
            <div className="p-5 sm:p-6 bg-white border border-neutral-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-technical font-bold text-sm shrink-0 shadow-sm">
                  ⚡
                </div>
                <div>
                  <span className="text-xs 2xl:text-sm font-bold text-black font-technical uppercase tracking-wider block">
                    Integrated Production Pipeline
                  </span>
                  <span className="text-[11px] 2xl:text-xs text-neutral-600 font-sans">
                    AutoCAD (2D Blueprints) → 3ds Max / Corona (Photorealistic Lighting) → InDesign (Client Monograph)
                  </span>
                </div>
              </div>
              <span className="text-[10px] 2xl:text-[11px] font-mono text-neutral-700 font-semibold uppercase tracking-widest shrink-0 bg-neutral-100 px-3 py-1.5 rounded border border-neutral-200">
                100% CAD FIDELITY GUARANTEED
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: Architectural Disciplines with Staggered Entrance */}
        {activeTab === "engineering" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8 animate-in fade-in duration-300">
            {disciplines.map((disc: any, idx: number) => {
              const IconComp = disc.icon || Ruler;
              return (
                <div
                  key={idx}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                  className={`bg-white border border-neutral-300 hover:border-black p-6 2xl:p-8 transition-all duration-500 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Number and Icon Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <span className="text-xs 2xl:text-sm font-mono font-bold text-neutral-400 group-hover:text-black transition-colors">
                        {disc.num}
                      </span>
                      <div className="p-2 border border-neutral-200 group-hover:border-black text-black group-hover:bg-neutral-50 transition-all duration-300">
                        <IconComp className="w-4 h-4 2xl:w-5 2xl:h-5" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] 2xl:text-[11px] font-technical uppercase tracking-wider text-neutral-500 font-semibold block">
                        {disc.tagline}
                      </span>
                      <h3 className="text-base sm:text-lg 2xl:text-xl font-editorial font-bold text-black mt-1 group-hover:tracking-wide transition-all">
                        {disc.title}
                      </h3>
                      <p className="text-xs 2xl:text-sm text-neutral-600 mt-2.5 font-sans leading-relaxed text-justify">
                        {disc.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bullet Specs Pills */}
                  <div className="pt-4 border-t border-neutral-100 space-y-1.5">
                    {disc.specs?.map((spec: string, sIdx: number) => (
                      <div key={sIdx} className="flex items-center gap-2 text-[11px] 2xl:text-xs text-neutral-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                        <span className="font-technical uppercase tracking-wider text-[10px] 2xl:text-[11px] text-neutral-600 truncate">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: Artistry & Languages */}
        {activeTab === "artistry" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 2xl:gap-10 animate-in fade-in duration-300 items-start">
            {/* Left: Artistic Explorations (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-neutral-300 p-6 sm:p-8 2xl:p-10 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
                <Paintbrush className="w-4 h-4 2xl:w-5 2xl:h-5 text-black" />
                <div>
                  <h3 className="text-base 2xl:text-lg font-technical font-bold uppercase tracking-widest text-black">
                    Artistic Explorations & Hand Craftsmanship
                  </h3>
                  <span className="text-[10px] 2xl:text-xs text-neutral-500 font-technical">
                    Tactile sensibilities that inform spatial architecture
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {hobbies.map((hobby: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-neutral-50 border border-neutral-200 hover:border-black transition-all hover:bg-white hover:shadow-xs group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-black transition-colors mt-0.5">
                        0{idx + 1}.
                      </span>
                      <p className="text-xs 2xl:text-sm text-neutral-700 font-sans leading-relaxed">
                        {hobby}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[10px] 2xl:text-[11px] font-technical uppercase tracking-widest text-neutral-400">
                SPATIAL SENSITIVITY • FREEHAND SKETCHING • LIGHT & SHADOW FRAMING
              </div>
            </div>

            {/* Right: Multilingual Communication (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-neutral-300 p-6 sm:p-8 2xl:p-10 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
                <Languages className="w-4 h-4 2xl:w-5 2xl:h-5 text-black" />
                <div>
                  <h3 className="text-base 2xl:text-lg font-technical font-bold uppercase tracking-widest text-black">
                    Languages & Global Reach
                  </h3>
                  <span className="text-[10px] 2xl:text-xs text-neutral-500 font-technical">
                    International clients and overseas supplier communication
                  </span>
                </div>
              </div>

              <div className="space-y-3.5">
                {languages.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-neutral-50 border border-neutral-200 flex items-center justify-between hover:border-black hover:bg-white transition-all shadow-2xs"
                  >
                    <div>
                      <span className="font-bold text-sm 2xl:text-base text-black font-editorial tracking-wider block">
                        {item.nameEn}
                      </span>
                      <span className="text-xs text-neutral-500 font-technical">
                        {item.levelEn}
                      </span>
                    </div>
                    <span className="text-[10px] 2xl:text-[11px] font-mono px-2 py-0.5 bg-white border border-neutral-300 text-black">
                      {idx === 0 ? "NATIVE" : idx === 1 ? "FLUENT" : "WORKING"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-neutral-100/70 border border-neutral-200 text-xs text-neutral-600 font-sans leading-relaxed">
                Comfortable presenting architectural pitches and executing shop drawings for clients across Egypt, the GCC, and European supplier houses.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
