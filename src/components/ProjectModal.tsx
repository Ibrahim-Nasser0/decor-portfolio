"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Project, DESIGNER_INFO } from "@/data/portfolioData";
import {
  X,
  MapPin,
  Maximize,
  Calendar,
  Check,
  MessageCircle,
  Layers,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Compass,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"renders" | "before-after">("renders");
  const [selectedAngleIdx, setSelectedAngleIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [activePlanTab, setActivePlanTab] = useState<"ground" | "upper" | "sections">("ground");

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setSelectedAngleIdx(0);
      setActiveTab("renders");
      setActivePlanTab("ground");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const angles = project.angles || project.gallery.map((img, i) => ({
    titleEn: `Perspective View ${i + 1}`,
    image: img,
  }));

  const activeImage = angles[selectedAngleIdx]?.image || project.coverImage;

  const whatsappMessage = encodeURIComponent(
    `Hello Eng. Alaa Essa, I reviewed the case study for "${project.titleEn}" (${project.area}, ${project.locationEn}) and would like to schedule an architectural consultation for a similar project.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-6xl bg-white border border-neutral-300 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Sticky Editorial Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-technical uppercase tracking-[0.2em] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                CASE STUDY • {project.categoryLabelEn}
              </span>
              <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 hidden sm:inline">
                SCALE 1:50
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-editorial font-bold text-black truncate tracking-tight">
              {project.titleEn}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-neutral-800 text-white text-[11px] font-technical uppercase tracking-widest transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inquire</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 border border-neutral-300 hover:border-black text-black hover:bg-neutral-100 transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Monograph Spread Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-12">
          {/* Metadata Banner Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-50 border border-neutral-200 text-xs font-technical">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">Location</span>
              <span className="font-bold text-black flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-neutral-600" />
                {project.locationEn}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">Floor Area</span>
              <span className="font-bold text-black flex items-center gap-1 mt-0.5">
                <Maximize className="w-3 h-3 text-neutral-600" />
                {project.area}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">Completion Year</span>
              <span className="font-bold text-black flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3 text-neutral-600" />
                {project.year}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">Design Style</span>
              <span className="font-bold text-black flex items-center gap-1 mt-0.5">
                <Compass className="w-3 h-3 text-neutral-600" />
                {project.styleEn}
              </span>
            </div>
          </div>

          {/* 2-Column Monograph Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column (5 cols): Visual Imagery, Multi-angles, Before/After & Technical Specs */}
            <div className="lg:col-span-6 space-y-8">
              {/* Image View Selector (Multi-angle vs Before/After) */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <div className="flex items-center gap-4 text-xs font-technical uppercase tracking-widest">
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
                      <SlidersHorizontal className="w-3 h-3" />
                      <span>Before / After</span>
                    </button>
                  )}
                </div>

                <span className="text-[10px] font-technical uppercase tracking-wider text-neutral-400">
                  {activeTab === "renders" ? `${selectedAngleIdx + 1} / ${angles.length}` : "Interactive"}
                </span>
              </div>

              {/* View Display Area */}
              {activeTab === "renders" ? (
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden border border-neutral-300 shadow-sm group">
                    <Image
                      src={activeImage}
                      alt={angles[selectedAngleIdx]?.titleEn || project.titleEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-102"
                    />
                    <div className="absolute bottom-3 start-3 px-3 py-1 bg-white/95 text-[11px] font-editorial uppercase tracking-widest text-black shadow-xs border border-black/10">
                      {angles[selectedAngleIdx]?.titleEn || "PERSPECTIVE VIEW"}
                    </div>
                  </div>

                  {/* Angle Thumbnail Selector Strip */}
                  <div className="grid grid-cols-4 gap-2">
                    {angles.map((angle, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAngleIdx(idx)}
                        className={`relative aspect-[4/3] border overflow-hidden transition-all ${
                          selectedAngleIdx === idx
                            ? "border-black ring-1 ring-black"
                            : "border-neutral-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={angle.image}
                          alt={angle.titleEn}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Interactive Before & After Slider */
                <div className="space-y-3">
                  <div
                    onMouseMove={handleSliderMove}
                    className="relative aspect-[4/3] w-full overflow-hidden border border-neutral-300 select-none cursor-ew-resize bg-neutral-100 shadow-sm"
                  >
                    {/* After Image */}
                    <Image
                      src={project.coverImage}
                      alt="Final Execution"
                      fill
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute top-3 end-3 px-2 py-0.5 bg-black text-white text-[10px] font-technical uppercase tracking-wider">
                      After: Photorealistic
                    </div>

                    {/* Before Image */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <div className="relative w-full h-full min-w-[300px]">
                        <Image
                          src={project.beforeImage || project.coverImage}
                          alt="Initial Concept"
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </div>
                      <div className="absolute top-3 start-3 px-2 py-0.5 bg-white text-black border border-black text-[10px] font-technical uppercase tracking-wider">
                        Before: Concept Draft
                      </div>
                    </div>

                    {/* Slider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-[2px] bg-white shadow pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-black border-2 border-white flex items-center justify-center text-white text-[10px]">
                        ↔
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-technical text-neutral-500 text-center">
                    Drag horizontal slider to compare conceptual 3D massing with photorealistic finish
                  </div>
                </div>
              )}

              {/* Technical Specifications Matrix (+ حاجات كمان) */}
              {project.specs && (
                <div className="bg-neutral-50 border border-neutral-200 p-5 space-y-3">
                  <h4 className="text-xs font-technical font-bold uppercase tracking-widest text-black pb-2 border-b border-neutral-200">
                    Architectural Specifications & Metrics
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-neutral-100">
                      <span className="font-technical text-neutral-500 uppercase text-[10px]">Scope of Services:</span>
                      <span className="font-medium text-black text-end">{project.specs.scopeEn}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-neutral-100">
                      <span className="font-technical text-neutral-500 uppercase text-[10px]">Design & Fit-Out Duration:</span>
                      <span className="font-medium text-black text-end">{project.specs.durationEn}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-neutral-100">
                      <span className="font-technical text-neutral-500 uppercase text-[10px]">Lighting Architecture:</span>
                      <span className="font-medium text-black text-end">{project.specs.lightingEn}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-neutral-100">
                      <span className="font-technical text-neutral-500 uppercase text-[10px]">Primary Flooring:</span>
                      <span className="font-medium text-black text-end">{project.specs.flooringEn}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1">
                      <span className="font-technical text-neutral-500 uppercase text-[10px]">Custom Millwork:</span>
                      <span className="font-medium text-black text-end">{project.specs.joineryEn}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (6 cols): Blueprints, Materials, Concept, Delivered Items */}
            <div className="lg:col-span-6 space-y-8">
              {/* Architectural Drawings & CAD Blueprint Card */}
              <div className="bg-white border border-neutral-300 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActivePlanTab("ground")}
                      className={`text-xs font-technical uppercase tracking-widest font-bold pb-1 transition-colors ${
                        activePlanTab === "ground"
                          ? "text-black border-b-2 border-black"
                          : "text-neutral-400 hover:text-black"
                      }`}
                    >
                      Ground Plan
                    </button>
                    <button
                      onClick={() => setActivePlanTab("upper")}
                      className={`text-xs font-technical uppercase tracking-widest font-bold pb-1 transition-colors ${
                        activePlanTab === "upper"
                          ? "text-black border-b-2 border-black"
                          : "text-neutral-400 hover:text-black"
                      }`}
                    >
                      Upper / Suite
                    </button>
                    <button
                      onClick={() => setActivePlanTab("sections")}
                      className={`text-xs font-technical uppercase tracking-widest font-bold pb-1 transition-colors ${
                        activePlanTab === "sections"
                          ? "text-black border-b-2 border-black"
                          : "text-neutral-400 hover:text-black"
                      }`}
                    >
                      Sections (AA/BB)
                    </button>
                  </div>
                  <span className="text-[10px] font-technical uppercase tracking-wider text-neutral-400">
                    CAD 1:50
                  </span>
                </div>

                {/* Vector Architectural Blueprint SVG */}
                <div className="relative aspect-[16/9] w-full bg-[#fafafa] border border-neutral-200 p-3 overflow-hidden flex items-center justify-center">
                  {activePlanTab === "ground" && (
                    <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                      <rect x="50" y="40" width="700" height="370" stroke="currentColor" strokeWidth="3" />
                      <line x1="320" y1="40" x2="320" y2="410" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="320" y1="220" x2="520" y2="220" stroke="currentColor" strokeWidth="2" />
                      <line x1="520" y1="140" x2="520" y2="340" stroke="currentColor" strokeWidth="2" />
                      <line x1="520" y1="340" x2="680" y2="340" stroke="currentColor" strokeWidth="2" />
                      <line x1="120" y1="40" x2="250" y2="40" stroke="#000" strokeWidth="6" strokeDasharray="8 4" />
                      <line x1="400" y1="40" x2="600" y2="40" stroke="#000" strokeWidth="6" strokeDasharray="8 4" />
                      <line x1="20" y1="200" x2="780" y2="200" stroke="#000" strokeWidth="1.5" strokeDasharray="12 4 3 4" />
                      <text x="10" y="195" fontSize="12" fontWeight="bold" fontFamily="sans-serif">AA&apos;</text>
                      <text x="765" y="195" fontSize="12" fontWeight="bold" fontFamily="sans-serif">AA&apos;</text>
                      <path d="M 120 180 L 120 320 L 260 320" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <rect x="150" y="220" width="80" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                      <circle cx="190" cy="245" r="8" stroke="currentColor" strokeWidth="1" />
                      <rect x="330" y="100" width="15" height="100" stroke="currentColor" strokeWidth="1.5" fill="#e5e5e5" />
                      <text x="140" y="270" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">MAIN LIVING LOUNGE</text>
                      <text x="360" y="150" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">MEDIA WALL</text>
                      <text x="560" y="180" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">DINING & FOYER</text>
                    </svg>
                  )}

                  {activePlanTab === "upper" && (
                    <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                      <rect x="70" y="40" width="660" height="370" stroke="currentColor" strokeWidth="3" />
                      <line x1="420" y1="40" x2="420" y2="410" stroke="currentColor" strokeWidth="2.5" />
                      <rect x="120" y="120" width="140" height="160" stroke="currentColor" strokeWidth="1.5" />
                      <text x="140" y="200" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">MASTER SUITE</text>
                      <rect x="460" y="90" width="120" height="110" stroke="currentColor" strokeWidth="1.5" />
                      <text x="475" y="150" fontSize="10" fontFamily="sans-serif" letterSpacing="1" fill="#555">DRESSING</text>
                      <rect x="460" y="230" width="120" height="130" stroke="currentColor" strokeWidth="1.5" />
                      <text x="485" y="300" fontSize="10" fontFamily="sans-serif" letterSpacing="1" fill="#555">BATHROOM</text>
                    </svg>
                  )}

                  {activePlanTab === "sections" && (
                    <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                      <g transform="translate(40, 50)">
                        <text x="0" y="0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">SECTION AA</text>
                        <rect x="0" y="20" width="320" height="150" stroke="currentColor" strokeWidth="2" fill="#fff" />
                        <line x1="-20" y1="20" x2="340" y2="20" stroke="currentColor" strokeWidth="4" />
                        <line x1="-20" y1="170" x2="340" y2="170" stroke="currentColor" strokeWidth="4" />
                        <rect x="60" y="40" width="120" height="90" stroke="currentColor" strokeWidth="1.5" fill="#ece8e1" />
                        <line x1="60" y1="100" x2="180" y2="100" stroke="#000" strokeWidth="1.5" />
                        <circle cx="240" cy="85" r="7" stroke="currentColor" strokeWidth="1" fill="#bbb" />
                        <path d="M 235 95 L 245 95 L 245 145 L 241 145 L 241 168 L 239 168 L 239 145 L 235 145 Z" fill="#bbb" />
                        <line x1="-15" y1="20" x2="-15" y2="170" stroke="#888" strokeWidth="1" />
                        <text x="-35" y="100" fontSize="10" fontFamily="sans-serif" fill="#666">280</text>
                      </g>
                      <g transform="translate(420, 50)">
                        <text x="0" y="0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">SECTION BB</text>
                        <rect x="0" y="20" width="300" height="150" stroke="currentColor" strokeWidth="2" fill="#fff" />
                        <line x1="-10" y1="20" x2="310" y2="20" stroke="currentColor" strokeWidth="4" />
                        <line x1="-10" y1="170" x2="310" y2="170" stroke="currentColor" strokeWidth="4" />
                        <path d="M 60 110 L 60 70 A 25 25 0 0 1 110 70 L 110 110 Z" stroke="currentColor" strokeWidth="1.5" fill="#f4f4f4" />
                        <rect x="40" y="110" width="160" height="30" stroke="currentColor" strokeWidth="1.5" fill="#ddd" />
                      </g>
                    </svg>
                  )}
                </div>
              </div>

              {/* The Material Palette & Tactile Curation */}
              <div className="bg-white border border-neutral-300 p-6 space-y-4 shadow-xs">
                <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black">
                  The Material Palette & Tactile Curation
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans text-justify">
                  {project.materialsDescriptionEn ||
                    "Centered around richly veined natural stone, warm architectural timber, and bespoke wall finishes. Soft ambient lighting enhances tactile textures while providing visual balance and spatial calm."}
                </p>

                {/* Swatch chips */}
                <div className="pt-2 flex items-center gap-3 flex-wrap">
                  {project.palette.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span
                        style={{ backgroundColor: color }}
                        className="w-5 h-5 rounded-full border border-black/20"
                      />
                      <span className="text-[10px] font-mono text-neutral-500">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concept Link & Spatial Circulation */}
              <div className="bg-white border border-neutral-300 p-6 space-y-3 shadow-xs">
                <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black">
                  Design Thesis & Spatial Circulation
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans text-justify">
                  {project.conceptEn ||
                    project.descriptionEn}
                </p>
              </div>

              {/* Delivered Specifications Checklist */}
              <div className="bg-white border border-neutral-300 p-6 space-y-4 shadow-xs">
                <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black">
                  Delivered Specifications & Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.featuresEn.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <footer className="border-t border-neutral-200 bg-neutral-50 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-technical text-neutral-500">
            Monograph Case Study • Eng. Alaa Essa Interior Architecture
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Consult on Similar Project</span>
            </a>

            <button
              onClick={onClose}
              className="px-5 py-3 border border-neutral-300 hover:border-black text-black text-xs font-technical uppercase tracking-widest transition-colors"
            >
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
