"use client";

import React, { useState } from "react";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Monitor,
  Compass,
  Palette,
  CheckCircle2,
  Globe,
  Layers,
  Sparkles,
  Maximize2,
  SunMedium,
  Hammer,
  FileSpreadsheet,
  Ruler,
  Eye,
  Camera,
  Paintbrush,
  Languages,
} from "lucide-react";

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"software" | "engineering" | "artistry">("software");

  // Detailed competence cards with architectural depth
  const disciplines = [
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

  // Software suite with architectural proficiency & technical roles
  const softwareSuite = [
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

  return (
    <section id="skills" className="py-16 sm:py-24 2xl:py-32 bg-[#faf9f6] border-t border-neutral-200 relative">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 2xl:mb-16 pb-6 border-b border-black/10 gap-4 sm:gap-6">
          <div>
            <div className="text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              03 • TECHNICAL MASTERY & TOOLSET
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              Capabilities & Proficiencies
            </h2>
          </div>
          <p className="text-xs 2xl:text-sm text-neutral-600 max-w-sm 2xl:max-w-md font-sans leading-relaxed">
            Bridging technical precision, computational modeling, and hands-on material artistry across every architectural phase.
          </p>
        </div>

        {/* Architectural Filter / Tab Navigators */}
        <div className="flex items-center gap-2 sm:gap-3 2xl:gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mb-10 sm:mb-12">
          <button
            onClick={() => setActiveTab("software")}
            className={`px-4 sm:px-5 py-2.5 text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest transition-all border shrink-0 flex items-center gap-2 ${
              activeTab === "software"
                ? "bg-black text-white border-black shadow-xs font-bold"
                : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
            }`}
          >
            <Monitor className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
            <span>3D Engines & Software Suite</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${activeTab === "software" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"}`}>
              06
            </span>
          </button>

          <button
            onClick={() => setActiveTab("engineering")}
            className={`px-4 sm:px-5 py-2.5 text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest transition-all border shrink-0 flex items-center gap-2 ${
              activeTab === "engineering"
                ? "bg-black text-white border-black shadow-xs font-bold"
                : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
            }`}
          >
            <Compass className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
            <span>Architectural Disciplines</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${activeTab === "engineering" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"}`}>
              06
            </span>
          </button>

          <button
            onClick={() => setActiveTab("artistry")}
            className={`px-4 sm:px-5 py-2.5 text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest transition-all border shrink-0 flex items-center gap-2 ${
              activeTab === "artistry"
                ? "bg-black text-white border-black shadow-xs font-bold"
                : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
            }`}
          >
            <Palette className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
            <span>Artistry & Languages</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${activeTab === "artistry" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"}`}>
              02
            </span>
          </button>
        </div>

        {/* TAB 1: 3D Engines & Software Suite */}
        {activeTab === "software" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8">
              {softwareSuite.map((sw, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-neutral-300 hover:border-black p-6 2xl:p-8 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header with Monogram Badge & Title */}
                    <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
                      <div>
                        <span className="text-[10px] 2xl:text-[11px] font-technical uppercase tracking-widest text-neutral-400 block">
                          {sw.engine}
                        </span>
                        <h3 className="text-lg 2xl:text-xl font-editorial font-bold text-black group-hover:underline">
                          {sw.name}
                        </h3>
                      </div>
                      <div className="w-9 h-9 2xl:w-10 2xl:h-10 border border-black flex items-center justify-center font-mono font-bold text-xs 2xl:text-sm text-black group-hover:bg-black group-hover:text-white transition-colors">
                        {sw.badge}
                      </div>
                    </div>

                    {/* Technical Role */}
                    <div>
                      <span className="text-[11px] 2xl:text-xs font-technical uppercase tracking-wider text-neutral-700 font-semibold block">
                        {sw.role}
                      </span>
                      <p className="text-xs 2xl:text-sm text-neutral-600 mt-2 font-sans leading-relaxed">
                        {sw.deliverable}
                      </p>
                    </div>
                  </div>

                  {/* Minimalist Proficiency Bar */}
                  <div className="pt-5 border-t border-neutral-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] 2xl:text-[11px] font-technical uppercase tracking-widest text-neutral-500">
                      <span>Pipeline Mastery</span>
                      <span className="font-mono font-bold text-black">{sw.level}</span>
                    </div>
                    <div className="h-1 w-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full bg-black transition-all duration-700"
                        style={{ width: sw.level }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline Workflow Banner */}
            <div className="p-5 sm:p-6 bg-white border border-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-technical font-bold text-xs shrink-0">
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
              <span className="text-[10px] 2xl:text-[11px] font-mono text-neutral-500 uppercase tracking-widest shrink-0">
                100% CAD FIDELITY GUARANTEED
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: Architectural Disciplines */}
        {activeTab === "engineering" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8 animate-in fade-in duration-300">
            {disciplines.map((disc, idx) => {
              const IconComp = disc.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-neutral-300 hover:border-black p-6 2xl:p-8 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Number and Icon Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <span className="text-xs 2xl:text-sm font-mono font-bold text-neutral-400 group-hover:text-black transition-colors">
                        {disc.num}
                      </span>
                      <div className="p-2 border border-neutral-200 group-hover:border-black text-black transition-colors">
                        <IconComp className="w-4 h-4 2xl:w-5 2xl:h-5" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] 2xl:text-[11px] font-technical uppercase tracking-wider text-neutral-500 font-medium block">
                        {disc.tagline}
                      </span>
                      <h3 className="text-base sm:text-lg 2xl:text-xl font-editorial font-bold text-black mt-1 group-hover:underline">
                        {disc.title}
                      </h3>
                      <p className="text-xs 2xl:text-sm text-neutral-600 mt-2.5 font-sans leading-relaxed text-justify">
                        {disc.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bullet Specs */}
                  <div className="pt-4 border-t border-neutral-100 space-y-1.5">
                    {disc.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-[11px] 2xl:text-xs text-neutral-700">
                        <div className="w-1 h-1 rounded-full bg-black shrink-0" />
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
                {DESIGNER_INFO.skills.hobbiesEn.map((hobby, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-neutral-50 border border-neutral-200 hover:border-black transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono font-bold text-neutral-400 mt-0.5">
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
                {DESIGNER_INFO.skills.languages.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-neutral-50 border border-neutral-200 flex items-center justify-between"
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
