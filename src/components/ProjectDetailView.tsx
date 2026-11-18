"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, DESIGNER_INFO, PROJECTS } from "@/data/portfolioData";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Maximize,
  Maximize2,
  Calendar,
  Compass,
  Check,
  MessageCircle,
  SlidersHorizontal,
  Mail,
  ArrowUpRight,
  X,
  Layers,
  Ruler,
  Lightbulb,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"renders" | "before-after">("renders");
  const [selectedAngleIdx, setSelectedAngleIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [activePlanTab, setActivePlanTab] = useState<"ground" | "rcp" | "sections">("ground");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches[0].clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const angles = project.angles || project.gallery.map((img, i) => ({
    titleEn: `Perspective View ${i + 1}`,
    image: img,
  }));

  const activeImage = angles[selectedAngleIdx]?.image || project.coverImage;

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        setSelectedAngleIdx((prev) => (prev > 0 ? prev - 1 : angles.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedAngleIdx((prev) => (prev < angles.length - 1 ? prev + 1 : 0));
      }
    },
    [lightboxOpen, angles.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const whatsappMessage = encodeURIComponent(
    `Hello Eng. Alaa Issa, I reviewed your architectural case study for "${project.titleEn}" (${project.area}, ${project.locationEn}) and would like to inquire about booking an architectural consultation for a similar project.`
  );

  return (
    <div className="min-h-screen bg-white text-[#111111] antialiased">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-3.5 sm:px-8 2xl:px-12 py-3.5 sm:py-4 2xl:py-5">
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest text-neutral-600 hover:text-black transition-colors group shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-4.5 2xl:h-4.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden xs:inline">Back to Works</span>
            <span className="xs:hidden">Back</span>
          </Link>

          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-black/80 bg-neutral-100 shadow-xs group-hover:ring-2 group-hover:ring-black transition-all shrink-0">
              <Image
                src="/images/alaa.webp"
                alt="Eng. Alaa Issa"
                fill
                sizes="32px"
                className="object-cover object-top"
              />
            </div>
            <span className="text-xs sm:text-sm 2xl:text-base font-editorial font-bold tracking-widest uppercase text-black">
              ALAA ISSA
            </span>
          </Link>

          <a
            href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 2xl:px-5 py-2 2xl:py-2.5 bg-black hover:bg-neutral-800 text-white text-[10px] sm:text-[11px] 2xl:text-xs font-technical uppercase tracking-wider sm:tracking-widest transition-colors shadow-xs shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-400" />
            <span className="hidden sm:inline">Inquire on Project</span>
            <span className="sm:hidden">Inquire</span>
          </a>
        </div>
      </nav>

      {/* Main Content Monograph */}
      <main className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 lg:py-16 2xl:py-24 space-y-10 sm:space-y-14 2xl:space-y-20">
        {/* Monograph Spread Header */}
        <div className="space-y-4 sm:space-y-6 2xl:space-y-8 pb-6 sm:pb-8 2xl:pb-10 border-b border-black/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold text-neutral-600 bg-neutral-100 px-2 sm:px-2.5 2xl:px-3 py-1 border border-neutral-200">
              ARCHITECTURAL CASE STUDY
            </span>
            <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold text-neutral-500 border border-neutral-200 px-2 sm:px-2.5 2xl:px-3 py-1">
              {project.categoryLabelEn}
            </span>
            <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider text-neutral-400 hidden xs:inline">
              SCALE 1:50 • MONOGRAPH ISSUE 2026-2027
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-editorial font-bold text-black tracking-tight leading-none break-words">
              {project.titleEn}
            </h1>

            <div className="shrink-0 flex items-center gap-3">
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Discuss Similar Space</span>
              </a>
            </div>
          </div>

          {/* 6-Metric Metadata Grid Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-5 2xl:p-6 bg-neutral-50 border border-neutral-300 text-xs 2xl:text-sm font-technical">
            <div>
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-neutral-400 uppercase tracking-widest block truncate">Location</span>
              <span className="font-bold text-black flex items-center gap-1 mt-1 text-[11px] sm:text-xs 2xl:text-sm">
                <MapPin className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span className="truncate">{project.locationEn}</span>
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-neutral-400 uppercase tracking-widest block truncate">Floor Area</span>
              <span className="font-bold text-black flex items-center gap-1 mt-1 text-[11px] sm:text-xs 2xl:text-sm">
                <Maximize className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span>{project.area}</span>
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-neutral-400 uppercase tracking-widest block truncate">Completion Year</span>
              <span className="font-bold text-black flex items-center gap-1 mt-1 text-[11px] sm:text-xs 2xl:text-sm">
                <Calendar className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span>{project.year}</span>
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-neutral-400 uppercase tracking-widest block truncate">Clear Ceiling</span>
              <span className="font-bold text-black flex items-center gap-1 mt-1 text-[11px] sm:text-xs 2xl:text-sm">
                <Ruler className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span>3.20m Finished</span>
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-neutral-400 uppercase tracking-widest block truncate">Architectural Style</span>
              <span className="font-bold text-black flex items-center gap-1 mt-1 text-[11px] sm:text-xs 2xl:text-sm">
                <Compass className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span className="truncate">{project.styleEn}</span>
              </span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-neutral-400 uppercase tracking-widest block truncate">Execution Scope</span>
              <span className="font-bold text-black flex items-center gap-1 mt-1 text-[11px] sm:text-xs 2xl:text-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span className="truncate">Turnkey Handover</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Monograph Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 2xl:gap-16 items-start">
          {/* Left Column (6 cols): Visual Renders, Before/After Slider, Story, Technical Specs */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            {/* View Selector Tabs */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-technical uppercase tracking-wider sm:tracking-widest">
                <button
                  onClick={() => setActiveTab("renders")}
                  className={`font-bold pb-1 transition-colors ${
                    activeTab === "renders"
                      ? "text-black border-b-2 border-black"
                      : "text-neutral-400 hover:text-black"
                  }`}
                >
                  3D Perspectives ({angles.length})
                </button>

                {project.beforeImage && (
                  <button
                    onClick={() => setActiveTab("before-after")}
                    className={`font-bold pb-1 transition-colors flex items-center gap-1.5 ${
                      activeTab === "before-after"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Before / After</span>
                  </button>
                )}
              </div>

              <span className="text-[9px] sm:text-[10px] font-technical uppercase tracking-wider text-neutral-400">
                {activeTab === "renders" ? `${selectedAngleIdx + 1}/${angles.length}` : "Interactive Slider"}
              </span>
            </div>

            {/* Visual Display */}
            {activeTab === "renders" ? (
              <div className="space-y-3 sm:space-y-4">
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden border border-neutral-300 shadow-sm group cursor-zoom-in"
                  title="Click to view full screen"
                >
                  <Image
                    src={activeImage}
                    alt={angles[selectedAngleIdx]?.titleEn || project.titleEn}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />

                  {/* Top-Right Fullscreen Zoom Pill */}
                  <div className="absolute top-3 end-3 px-2.5 py-1.5 bg-black/60 hover:bg-black text-white text-[10px] font-technical uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-xs transition-colors">
                    <Maximize2 className="w-3 h-3" />
                    <span>Zoom</span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3 sm:bottom-4 start-3 sm:start-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/95 text-[10px] sm:text-[11px] font-editorial uppercase tracking-wider sm:tracking-widest text-black shadow-xs border border-black/10">
                    {angles[selectedAngleIdx]?.titleEn || "PERSPECTIVE VIEW"}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {angles.map((angle, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAngleIdx(idx)}
                      className={`relative aspect-[4/3] border overflow-hidden transition-all ${
                        selectedAngleIdx === idx
                          ? "border-black ring-2 ring-black"
                          : "border-neutral-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={angle.image} alt={angle.titleEn} fill sizes="120px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Before / After Slider with Clip-Path & Touch Events */
              <div className="space-y-3">
                <div
                  onMouseMove={handleSliderMove}
                  onTouchMove={handleTouchMove}
                  onTouchStart={handleTouchMove}
                  className="relative aspect-[4/3] w-full overflow-hidden border border-neutral-300 select-none cursor-ew-resize bg-neutral-100 shadow-sm touch-none"
                >
                  {/* After Image (Background) */}
                  <Image
                    src={project.coverImage}
                    alt="Final Execution"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover pointer-events-none"
                  />
                  <div className="absolute top-3 end-3 px-2 py-0.5 sm:py-1 bg-black text-white text-[9px] sm:text-[10px] font-technical uppercase tracking-wider">
                    After: Photorealistic Execution
                  </div>

                  {/* Before Image (Clipped Overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <Image
                      src={project.beforeImage || project.coverImage}
                      alt="Initial Concept Massing"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute top-3 start-3 px-2 py-0.5 sm:py-1 bg-white text-black border border-black text-[9px] sm:text-[10px] font-technical uppercase tracking-wider">
                      Before: Concept Massing
                    </div>
                  </div>

                  {/* Divider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-white shadow-md pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black border-2 border-white flex items-center justify-center text-white text-[10px] font-mono">
                      ↔
                    </div>
                  </div>
                </div>
                <div className="text-[10px] sm:text-[11px] font-technical text-neutral-500 text-center">
                  Drag horizontal slider or swipe with finger to compare conceptual massing with final photorealistic finish
                </div>
              </div>
            )}

            {/* Spatial Challenge vs Architectural Solution (The Story) */}
            {(project.challengeEn || project.solutionEn) && (
              <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 space-y-5 shadow-xs">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
                  <Lightbulb className="w-4 h-4 text-black shrink-0" />
                  <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                    Spatial Challenge & Architectural Intervention
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-2">
                    <span className="text-[10px] font-technical font-bold uppercase tracking-widest text-neutral-500 block">
                      The Challenge
                    </span>
                    <p className="text-xs 2xl:text-sm text-neutral-700 font-sans leading-relaxed text-justify">
                      {project.challengeEn}
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-900 text-white space-y-2">
                    <span className="text-[10px] font-technical font-bold uppercase tracking-widest text-neutral-400 block">
                      Architectural Solution
                    </span>
                    <p className="text-xs 2xl:text-sm text-neutral-200 font-sans leading-relaxed text-justify">
                      {project.solutionEn}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Specifications Matrix */}
            {project.specs && (
              <div className="bg-neutral-50 border border-neutral-300 p-5 sm:p-6 2xl:p-8 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                    Technical Specifications & Metrics
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400">SPEC MATRIX</span>
                </div>
                <div className="space-y-2.5 sm:space-y-3 text-xs 2xl:text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-neutral-200 gap-0.5">
                    <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Scope of Services:</span>
                    <span className="font-medium text-black text-start sm:text-end">{project.specs.scopeEn}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-neutral-200 gap-0.5">
                    <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Design & Execution Duration:</span>
                    <span className="font-medium text-black text-start sm:text-end">{project.specs.durationEn}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-neutral-200 gap-0.5">
                    <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Lighting Architecture:</span>
                    <span className="font-medium text-black text-start sm:text-end">{project.specs.lightingEn}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-neutral-200 gap-0.5">
                    <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Primary Flooring:</span>
                    <span className="font-medium text-black text-start sm:text-end">{project.specs.flooringEn}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 gap-0.5">
                    <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Custom Millwork & Joinery:</span>
                    <span className="font-medium text-black text-start sm:text-end">{project.specs.joineryEn}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (6 cols): Blueprints, Materials, Concept, Delivered Items */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            {/* Executive CAD Blueprint Viewer with Architectural Cartouche */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => setActivePlanTab("ground")}
                    className={`text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest font-bold pb-1 transition-colors ${
                      activePlanTab === "ground"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    Ground Level
                  </button>
                  <button
                    onClick={() => setActivePlanTab("rcp")}
                    className={`text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest font-bold pb-1 transition-colors ${
                      activePlanTab === "rcp"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    Ceiling (RCP)
                  </button>
                  <button
                    onClick={() => setActivePlanTab("sections")}
                    className={`text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest font-bold pb-1 transition-colors ${
                      activePlanTab === "sections"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    Sections AA/BB
                  </button>
                </div>
                <span className="text-[10px] 2xl:text-xs font-technical uppercase tracking-wider text-neutral-400">
                  SCALE 1:50 @ A1
                </span>
              </div>

              {/* Vector Architectural Blueprint SVG with Cartouche */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#fafafa] border border-neutral-300 p-2 sm:p-3 overflow-hidden flex items-center justify-center shadow-inner">
                {/* Architectural Coordinate Border (Grid Ticks) */}
                <div className="absolute top-1 left-3 text-[8px] font-mono text-neutral-400 pointer-events-none">A1</div>
                <div className="absolute top-1 right-3 text-[8px] font-mono text-neutral-400 pointer-events-none">B1</div>
                <div className="absolute bottom-1 left-3 text-[8px] font-mono text-neutral-400 pointer-events-none">A2</div>
                <div className="absolute bottom-1 right-3 text-[8px] font-mono text-neutral-400 pointer-events-none">B2</div>

                {activePlanTab === "ground" && (
                  <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                    {/* Architectural Grid Background */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="0.8" />
                      </pattern>
                    </defs>
                    <rect width="800" height="450" fill="url(#grid)" />

                    {/* Outer Structural Walls */}
                    <rect x="40" y="30" width="720" height="390" stroke="currentColor" strokeWidth="4" fill="none" />
                    
                    {/* Interior Partition Walls */}
                    <line x1="310" y1="30" x2="310" y2="340" stroke="currentColor" strokeWidth="3" />
                    <line x1="310" y1="210" x2="520" y2="210" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="520" y1="130" x2="520" y2="340" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="520" y1="340" x2="680" y2="340" stroke="currentColor" strokeWidth="2.5" />
                    
                    {/* Door Swing Arcs */}
                    <path d="M 310 110 A 50 50 0 0 1 260 160" stroke="#666" strokeWidth="1" strokeDasharray="3 2" fill="none" />
                    <line x1="310" y1="110" x2="260" y2="110" stroke="currentColor" strokeWidth="1.5" />

                    {/* Windows */}
                    <line x1="120" y1="30" x2="250" y2="30" stroke="#000" strokeWidth="6" strokeDasharray="8 4" />
                    <line x1="400" y1="30" x2="620" y2="30" stroke="#000" strokeWidth="6" strokeDasharray="8 4" />

                    {/* Section Cutting Line AA' */}
                    <line x1="10" y1="190" x2="780" y2="190" stroke="#000" strokeWidth="1.2" strokeDasharray="14 4 2 4" />
                    <text x="12" y="185" fontSize="11" fontWeight="bold" fontFamily="sans-serif">AA&apos;</text>
                    <text x="765" y="185" fontSize="11" fontWeight="bold" fontFamily="sans-serif">AA&apos;</text>

                    {/* Furniture Layout */}
                    <path d="M 100 160 L 100 320 L 250 320" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <rect x="130" y="210" width="80" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                    <circle cx="170" cy="235" r="8" stroke="currentColor" strokeWidth="1" />
                    <rect x="320" y="90" width="16" height="100" stroke="currentColor" strokeWidth="1.5" fill="#e2e2e2" />

                    {/* Space Labels */}
                    <text x="110" y="270" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555" fontWeight="bold">LIVING SALON [45 m²]</text>
                    <text x="350" y="145" fontSize="10" fontFamily="sans-serif" letterSpacing="1.5" fill="#666">FLUTED MEDIA WALL</text>
                    <text x="545" y="175" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555" fontWeight="bold">DINING & FOYER [30 m²]</text>

                    {/* Dimension String Callouts */}
                    <line x1="40" y1="435" x2="310" y2="435" stroke="#888" strokeWidth="1" />
                    <text x="160" y="445" fontSize="9" fontFamily="sans-serif" fill="#777">540 cm</text>
                    <line x1="310" y1="435" x2="760" y2="435" stroke="#888" strokeWidth="1" />
                    <text x="520" y="445" fontSize="9" fontFamily="sans-serif" fill="#777">720 cm</text>

                    {/* Architectural Title Block (Cartouche) */}
                    <g transform="translate(560, 310)">
                      <rect x="0" y="0" width="190" height="100" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
                      <line x1="0" y1="25" x2="190" y2="25" stroke="#000" strokeWidth="1" />
                      <line x1="0" y1="50" x2="190" y2="50" stroke="#000" strokeWidth="1" />
                      <line x1="0" y1="75" x2="190" y2="75" stroke="#000" strokeWidth="1" />
                      <line x1="95" y1="75" x2="95" y2="100" stroke="#000" strokeWidth="1" />
                      <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="#000">STUDIO ALAA ISSA</text>
                      <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="#333">DWG: GROUND LEVEL PLAN</text>
                      <text x="10" y="67" fontSize="8" fontFamily="sans-serif" fill="#666">SCALE: 1:50 • LEVEL +0.00</text>
                      <text x="10" y="92" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="#000">APPROVED</text>
                      <text x="105" y="92" fontSize="7" fontFamily="sans-serif" fill="#666">SHEET 01/04</text>
                    </g>
                  </svg>
                )}

                {activePlanTab === "rcp" && (
                  <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                    <rect width="800" height="450" fill="#fafafa" />
                    <rect x="40" y="30" width="720" height="390" stroke="currentColor" strokeWidth="3" fill="none" />

                    {/* Dropped Ceiling Perimeter Coves (Hidden LED) */}
                    <rect x="60" y="50" width="680" height="350" stroke="#e0a96d" strokeWidth="2.5" strokeDasharray="6 3" fill="none" />
                    <text x="75" y="70" fontSize="9" fontFamily="sans-serif" fill="#e0a96d" fontWeight="bold">3000K INDIRECT COVE [1200 LUX]</text>

                    {/* Downlight Grid Points */}
                    <circle cx="160" cy="140" r="4" fill="#000" />
                    <circle cx="260" cy="140" r="4" fill="#000" />
                    <circle cx="160" cy="240" r="4" fill="#000" />
                    <circle cx="260" cy="240" r="4" fill="#000" />
                    <text x="140" y="160" fontSize="8" fontFamily="sans-serif" fill="#666">DL-01 (15° SPOT)</text>

                    {/* Dining Chandelier Accent */}
                    <circle cx="580" cy="200" r="28" stroke="#000" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
                    <circle cx="580" cy="200" r="3" fill="#000" />
                    <text x="540" y="240" fontSize="9" fontFamily="sans-serif" fill="#333" fontWeight="bold">PENDANT ACCENT</text>

                    {/* Cartouche */}
                    <g transform="translate(560, 310)">
                      <rect x="0" y="0" width="190" height="100" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
                      <line x1="0" y1="25" x2="190" y2="25" stroke="#000" strokeWidth="1" />
                      <line x1="0" y1="50" x2="190" y2="50" stroke="#000" strokeWidth="1" />
                      <line x1="0" y1="75" x2="190" y2="75" stroke="#000" strokeWidth="1" />
                      <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="#000">STUDIO ALAA ISSA</text>
                      <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="#333">DWG: REFLECTED CEILING (RCP)</text>
                      <text x="10" y="67" fontSize="8" fontFamily="sans-serif" fill="#666">LIGHTING CIRCUITS A/B/C</text>
                      <text x="10" y="92" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="#000">APPROVED</text>
                    </g>
                  </svg>
                )}

                {activePlanTab === "sections" && (
                  <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                    <rect width="800" height="450" fill="#fafafa" />
                    
                    <g transform="translate(30, 40)">
                      <text x="0" y="0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">CROSS SECTION AA&apos; (CLEAR HEIGHT 3.20m)</text>
                      <rect x="0" y="20" width="480" height="240" stroke="currentColor" strokeWidth="2" fill="#fff" />
                      
                      {/* Ceiling & Floor Slabs */}
                      <rect x="-10" y="10" width="500" height="10" fill="#333" />
                      <rect x="-10" y="260" width="500" height="12" fill="#333" />
                      
                      {/* Dropped Ceiling Details */}
                      <rect x="20" y="40" width="440" height="15" fill="#f0ece1" stroke="#000" strokeWidth="1" />
                      <line x1="20" y1="55" x2="460" y2="55" stroke="#e0a96d" strokeWidth="2" />
                      <text x="35" y="52" fontSize="8" fontFamily="sans-serif" fill="#888">SUSPENDED GYPSUM COVE [-20cm]</text>
                      
                      {/* Fluted Media Unit Joinery Elevation */}
                      <rect x="60" y="90" width="180" height="170" fill="#ece4db" stroke="#000" strokeWidth="1.5" />
                      <line x1="60" y1="180" x2="240" y2="180" stroke="#000" strokeWidth="1.5" />
                      <text x="80" y="140" fontSize="9" fontFamily="sans-serif" fill="#444" fontWeight="bold">FLUTED WALNUT PANEL</text>
                      <text x="95" y="220" fontSize="8" fontFamily="sans-serif" fill="#666">FLOATING BENCH</text>
                      
                      {/* Dimension Height Strings */}
                      <line x1="-15" y1="20" x2="-15" y2="260" stroke="#666" strokeWidth="1" />
                      <text x="-35" y="145" fontSize="9" fontFamily="sans-serif" fill="#666">320</text>
                    </g>

                    {/* Cartouche */}
                    <g transform="translate(560, 310)">
                      <rect x="0" y="0" width="190" height="100" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
                      <line x1="0" y1="25" x2="190" y2="25" stroke="#000" strokeWidth="1" />
                      <line x1="0" y1="50" x2="190" y2="50" stroke="#000" strokeWidth="1" />
                      <line x1="0" y1="75" x2="190" y2="75" stroke="#000" strokeWidth="1" />
                      <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="#000">STUDIO ALAA ISSA</text>
                      <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="#333">DWG: VERTICAL SECTIONS</text>
                      <text x="10" y="67" fontSize="8" fontFamily="sans-serif" fill="#666">MILLWORK REVEAL 1:10</text>
                      <text x="10" y="92" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="#000">APPROVED</text>
                    </g>
                  </svg>
                )}
              </div>
            </div>

            {/* The Material Palette & Tactile Curation (Enriched with named Trade Finishes) */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                  Material Palette & Tactile Curation
                </h3>
                <span className="text-[10px] font-mono text-neutral-400">FINISH SCHEDULE</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans text-justify">
                {project.materialsDescriptionEn ||
                  "Centered around richly veined natural stone, warm architectural timber, and bespoke wall finishes. Soft ambient lighting enhances tactile textures while providing visual balance and spatial calm."}
              </p>

              {/* Swatch chips with real architectural trade names */}
              <div className="space-y-2.5 pt-2">
                {(project.materialSwatches || project.palette.map((c) => ({ color: c, nameEn: "Architectural Finish", finishEn: "Custom Specification" }))).map((swatch, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3 hover:border-black transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        style={{ backgroundColor: swatch.color }}
                        className="w-6 h-6 rounded-full border border-black/20 shrink-0 shadow-xs"
                      />
                      <div>
                        <span className="font-bold text-xs 2xl:text-sm text-black font-sans block">
                          {swatch.nameEn}
                        </span>
                        <span className="text-[10px] 2xl:text-xs text-neutral-500 font-technical">
                          {swatch.finishEn}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase shrink-0">
                      {swatch.color}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Thesis & Spatial Circulation */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <Compass className="w-4 h-4 text-black shrink-0" />
                <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                  Design Thesis & Spatial Circulation
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans text-justify">
                {project.conceptEn || project.descriptionEn}
              </p>
            </div>

            {/* Delivered Specifications Checklist */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-4 shadow-xs">
              <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black pb-2 border-b border-neutral-200">
                Delivered Architectural Specifications & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {project.featuresEn.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs 2xl:text-sm text-neutral-700">
                    <Check className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-black shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project to Project Bottom Pagination */}
        <div className="pt-8 sm:pt-12 2xl:pt-16 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 2xl:gap-8">
          <Link
            href={`/projects/${prevProject.id}`}
            className="p-5 sm:p-6 2xl:p-8 border border-neutral-200 hover:border-black transition-colors flex items-center gap-3.5 sm:gap-4 2xl:gap-6 group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 text-neutral-400 group-hover:text-black transition-transform group-hover:-translate-x-1 shrink-0" />
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-widest text-neutral-400 block truncate">
                Previous Case Study
              </span>
              <span className="text-sm sm:text-base 2xl:text-lg font-editorial font-bold text-black group-hover:underline truncate block">
                {prevProject.titleEn}
              </span>
            </div>
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            className="p-5 sm:p-6 2xl:p-8 border border-neutral-200 hover:border-black transition-colors flex items-center justify-between group text-end sm:text-right"
          >
            <div className="w-full min-w-0">
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-widest text-neutral-400 block truncate">
                Next Case Study
              </span>
              <span className="text-sm sm:text-base 2xl:text-lg font-editorial font-bold text-black group-hover:underline truncate block">
                {nextProject.titleEn}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-1 shrink-0 ml-3 sm:ml-4 2xl:ml-6" />
          </Link>
        </div>

        {/* Consultation Callout Banner */}
        <div className="p-6 sm:p-10 md:p-12 2xl:p-16 bg-neutral-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 2xl:gap-12">
          <div className="space-y-2 2xl:space-y-3 max-w-xl 2xl:max-w-2xl">
            <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-widest text-neutral-400">
              COMMISSION AN ARCHITECTURAL SPACE
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl 2xl:text-5xl font-editorial font-bold">
              Ready to create a space of timeless elegance?
            </h3>
            <p className="text-xs sm:text-sm 2xl:text-base text-neutral-300 font-sans leading-relaxed">
              Schedule a discovery session directly with Eng. Alaa Issa to review your floor plans, space ergonomics, and material selections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 2xl:gap-4 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 2xl:px-8 py-3.5 2xl:py-4 bg-white text-black hover:bg-neutral-100 text-xs 2xl:text-sm font-technical uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>

            <Link
              href="/#contact"
              className="w-full sm:w-auto px-6 2xl:px-8 py-3.5 2xl:py-4 border border-white/30 hover:border-white text-white text-xs 2xl:text-sm font-technical uppercase tracking-widest font-medium transition-colors text-center justify-center flex items-center"
            >
              Inquiry Form
            </Link>
          </div>
        </div>
      </main>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white text-xs font-technical uppercase tracking-widest border-b border-white/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-bold font-editorial text-sm tracking-wider">
                {project.titleEn}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-300">
                {angles[selectedAngleIdx]?.titleEn}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono text-neutral-400">
                {selectedAngleIdx + 1} / {angles.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image View */}
          <div className="relative flex-1 w-full max-w-6xl mx-auto my-4 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[80vh]">
              <Image
                src={angles[selectedAngleIdx]?.image || project.coverImage}
                alt={angles[selectedAngleIdx]?.titleEn || project.titleEn}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={() =>
                setSelectedAngleIdx((prev) => (prev > 0 ? prev - 1 : angles.length - 1))
              }
              className="absolute start-2 sm:start-6 p-3 bg-black/50 hover:bg-black text-white border border-white/30 backdrop-blur-xs transition-colors"
              aria-label="Previous Perspective"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={() =>
                setSelectedAngleIdx((prev) => (prev < angles.length - 1 ? prev + 1 : 0))
              }
              className="absolute end-2 sm:end-6 p-3 bg-black/50 hover:bg-black text-white border border-white/30 backdrop-blur-xs transition-colors"
              aria-label="Next Perspective"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pt-2">
            {angles.map((ang, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAngleIdx(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 border overflow-hidden transition-all shrink-0 ${
                  selectedAngleIdx === idx
                    ? "border-white ring-2 ring-white"
                    : "border-white/30 opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={ang.image} alt={ang.titleEn} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
