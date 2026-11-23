"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight, MapPin, Maximize, Calendar, Sparkles, Layers } from "lucide-react";

interface PortfolioGalleryProps {
  initialProjects?: Project[];
}

export default function PortfolioGallery({ initialProjects = PROJECTS }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Viewport Intersection Observer for scroll-triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Derive available categories dynamically from actual projects
  const categories = useMemo(() => {
    const counts: Record<string, number> = { all: initialProjects.length };
    
    const defaultLabels: Record<string, string> = {
      living: "LIVING & LOUNGES",
      bedroom: "MASTER BEDROOMS",
      kitchen: "KITCHENS & BATHS",
      commercial: "COMMERCIAL & RETAIL",
      villas: "PRIVATE VILLAS",
      penthouses: "PENTHOUSES & DUPLEXES",
      landscape: "TERRACES & LANDSCAPE",
      office: "EXECUTIVE OFFICES",
    };

    const categoryDisplayNames: Record<string, string> = {};

    initialProjects.forEach((p) => {
      const cat = p.category || "living";
      counts[cat] = (counts[cat] || 0) + 1;
      if (p.categoryLabelEn) {
        categoryDisplayNames[cat] = p.categoryLabelEn.toUpperCase();
      }
    });

    const list = [{ id: "all", label: "ALL WORKS", count: counts.all || 0 }];

    Object.keys(counts).forEach((catId) => {
      if (catId !== "all" && counts[catId] > 0) {
        list.push({
          id: catId,
          label: categoryDisplayNames[catId] || defaultLabels[catId] || catId.replace(/-/g, " ").toUpperCase(),
          count: counts[catId],
        });
      }
    });

    return list;
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return initialProjects;
    return initialProjects.filter((p) => p.category === activeCategory);
  }, [initialProjects, activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 sm:py-28 2xl:py-36 bg-white border-t border-neutral-300 relative select-none overflow-hidden"
    >
      {/* Background Architectural Drafting Guide Watermark */}
      <div className="absolute top-12 right-6 font-mono text-[9px] 2xl:text-xs text-neutral-300 tracking-[0.25em] pointer-events-none uppercase hidden md:block">
        DOC REF: ARCH-MONO-2026/27 • SELECTED PORTFOLIOS
      </div>

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className={`mb-12 sm:mb-16 pb-8 border-b border-black/15 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-[0.25em] text-neutral-500">
                <span className={`w-5 h-[1px] bg-neutral-400 inline-block transition-all duration-700 ${isVisible ? "scale-x-100" : "scale-x-0"}`} />
                <span>05 • CURATED MONOGRAPH</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-bold text-black tracking-tight uppercase leading-[0.95]">
                Selected Works & Case Studies
              </h2>
            </div>
            <p className="text-xs sm:text-sm 2xl:text-base text-neutral-600 max-w-md 2xl:max-w-lg font-sans leading-relaxed">
              A curated catalog of bespoke residential sanctuaries, penthouse suites, and boutique commercial environments executed with tactile materiality and 3000K warm architectural illumination.
            </p>
          </div>

          {/* Dynamic Filter Navigation Bar */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pt-8 sm:flex-wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group inline-flex items-center gap-2 text-[10px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider py-2 px-3.5 sm:px-4.5 border transition-all duration-300 shrink-0 cursor-pointer active:scale-95 ${
                    isActive
                      ? "bg-black text-white border-black shadow-xs font-semibold translate-y-[-1px]"
                      : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded transition-colors ${
                      isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500 group-hover:text-black"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid with Staggered Entrance Animations */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-neutral-300 p-8 space-y-3 animate-card-entrance">
            <Layers className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="text-base font-editorial font-bold uppercase text-black">
              No Archival Projects in this Category
            </h3>
            <p className="text-xs text-neutral-500 font-sans">
              Additional case studies are being documented and photographed for publication.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-2 text-xs font-technical uppercase tracking-wider underline text-black font-semibold"
            >
              View All Works
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 2xl:gap-12">
            {filteredProjects.map((project, idx) => {
              const displayIndex = String(idx + 1).padStart(2, "0");
              const delayMs = idx * 100 + 80;

              return (
                <article
                  key={project.id}
                  style={{ animationDelay: `${delayMs}ms` }}
                  className={`group relative bg-white border border-neutral-300 hover:border-black transition-all duration-500 flex flex-col justify-between shadow-xs hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${
                    isVisible ? "animate-card-entrance" : "opacity-0"
                  }`}
                >
                  {/* Top Cover Image Box with Architectural Aspect Ratio */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100 block cursor-pointer"
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.titleEn || project.title || "Architectural Project"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Dark gradient vignette on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none" />

                    {/* Category Label Badge (Top Left) */}
                    <div className="absolute top-3 start-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[9px] sm:text-[10px] font-technical uppercase tracking-[0.14em] text-black font-bold border border-black/15 shadow-xs transition-transform duration-300 group-hover:translate-x-0.5">
                      {project.categoryLabelEn || project.category}
                    </div>

                    {/* Practice Attribution & Index Badges (Top Right) */}
                    <div className="absolute top-3 end-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-black/85 backdrop-blur-xs text-[9px] font-mono text-white tracking-widest uppercase shadow-xs">
                        NO. {displayIndex}
                      </span>
                    </div>

                    {/* Hover Interactive Tag (Center Hover Pill with smooth float up) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                      <span className="px-4 py-2 bg-white/95 text-black font-technical uppercase tracking-widest text-[11px] font-bold shadow-xl border border-black flex items-center gap-2">
                        <span>Explore Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>

                  {/* Content Container */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Meta Coordinates & Practice Attribution Row */}
                      <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-technical text-neutral-500 mb-2.5 uppercase tracking-wider">
                        <div className="flex items-center gap-2 truncate">
                          {project.locationEn && (
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-neutral-800 shrink-0" />
                              <span className="truncate max-w-[120px]">{project.locationEn}</span>
                            </span>
                          )}
                          {project.locationEn && project.area && <span className="text-neutral-300">•</span>}
                          {project.area && <span className="shrink-0">{project.area}</span>}
                        </div>

                        {/* Firm / Freelance Attribution Label */}
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 border border-neutral-300/80 text-[9px] font-mono uppercase tracking-wider font-semibold shrink-0 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                          {project.firmEn || "Alaa Essa Studio"}
                        </span>
                      </div>

                      {/* Monumental Editorial Title */}
                      <Link href={`/projects/${project.id}`}>
                        <h3 className="text-lg sm:text-xl font-editorial font-bold text-black uppercase tracking-tight leading-snug group-hover:underline transition-all">
                          {project.titleEn || project.title || "Untitled Project"}
                        </h3>
                      </Link>

                      {/* Narrative Excerpt */}
                      {(project.descriptionEn || project.description) && (
                        <p className="text-xs sm:text-[13px] text-neutral-600 mt-2.5 line-clamp-2 leading-relaxed font-sans">
                          {project.descriptionEn || project.description}
                        </p>
                      )}
                    </div>

                    {/* Architectural Material Palette & Action Footer */}
                    <div className="pt-4 border-t border-neutral-200/80 space-y-3">
                      {/* Material Swatches Bar */}
                      {project.palette && project.palette.length > 0 && (
                        <div className="flex items-center justify-between text-[10px] font-technical text-neutral-500">
                          <span className="uppercase tracking-widest text-[9px] font-mono text-neutral-400">
                            PALETTE:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {project.palette.slice(0, 5).map((color, cIdx) => (
                              <span
                                key={cIdx}
                                className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs inline-block transition-transform duration-300 hover:scale-135 hover:shadow-xs cursor-default"
                                style={{ backgroundColor: color }}
                                title={`Tone: ${color}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer Row: Style & Case Study Link */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-technical uppercase tracking-wider text-neutral-500 font-medium truncate max-w-[160px]">
                          {project.styleEn || project.categoryLabelEn || project.category}
                        </span>

                        <Link
                          href={`/projects/${project.id}`}
                          className="text-xs font-technical uppercase tracking-wider text-black font-bold inline-flex items-center gap-1 group/link hover:translate-x-1 transition-all duration-300"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover/link:text-black group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Hairline Expanding Indicator */}
                  <div className="w-full h-[2px] bg-neutral-100 overflow-hidden">
                    <div className="h-full bg-black w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Monograph Curation Footnote */}
        <div className={`mt-14 sm:mt-16 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-technical text-neutral-500 uppercase tracking-wider transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>All projects designed, modeled, and supervised by Eng. Alaa Essa</span>
          </div>
          <a
            href="#contact"
            className="text-black font-bold hover:underline inline-flex items-center gap-1 group"
          >
            <span>Commission a New Architectural Project</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
