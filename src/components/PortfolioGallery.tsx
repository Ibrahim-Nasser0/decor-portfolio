"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project, DESIGNER_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, MapPin, Maximize } from "lucide-react";

export default function PortfolioGallery({ initialProjects = PROJECTS }: { initialProjects?: Project[] }) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", labelEn: "ALL WORKS" },
    { id: "living", labelEn: "LIVING & LOUNGES" },
    { id: "bedroom", labelEn: "MASTER BEDROOMS" },
    { id: "kitchen", labelEn: "KITCHENS & BATHS" },
    { id: "commercial", labelEn: "COMMERCIAL & RETAIL" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 2xl:py-32 bg-white border-t border-neutral-200 relative">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 2xl:mb-16 pb-6 border-b border-black/10 gap-4 sm:gap-6">
          <div>
            <div className="text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              05 • CURATED MONOGRAPH
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              Selected Works & Case Studies
            </h2>
          </div>
          <p className="text-xs 2xl:text-sm text-neutral-500 max-w-sm 2xl:max-w-md">
            A curated portfolio of residential retreats, penthouse suites, and boutique commercial environments by Eng. Alaa Issa.
          </p>
        </div>

        {/* Filter Tabs (Horizontal Scrollable on Mobile, Wrapped on Desktop) */}
        <div className="flex items-center gap-2 sm:gap-3 2xl:gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0 mb-8 sm:mb-12 2xl:mb-16 sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest py-1.5 2xl:py-2 px-3 sm:px-3.5 2xl:px-5 transition-colors border shrink-0 whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black"
              }`}
            >
              {cat.labelEn}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 2xl:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-neutral-200 hover:border-black transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Link */}
              <Link
                href={`/projects/${project.id}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 block"
              >
                <Image
                  src={project.coverImage}
                  alt={project.titleEn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute top-3 start-3 px-2 py-0.5 bg-white/95 text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider text-black border border-black/10">
                  {project.categoryLabelEn}
                </div>
              </Link>

              {/* Content Body */}
              <div className="p-5 sm:p-6 2xl:p-7 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4 2xl:space-y-5">
                <div>
                  <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] 2xl:text-xs font-technical text-neutral-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-black shrink-0" />
                      <span className="truncate">{project.locationEn}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-black shrink-0" />
                      <span>{project.area}</span>
                    </span>
                  </div>

                  <Link href={`/projects/${project.id}`}>
                    <h3 className="text-base sm:text-lg 2xl:text-xl font-editorial font-bold text-black group-hover:underline">
                      {project.titleEn}
                    </h3>
                  </Link>

                  <p className="text-xs 2xl:text-sm text-neutral-600 mt-2 line-clamp-2 leading-relaxed font-sans">
                    {project.descriptionEn}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] 2xl:text-xs font-technical uppercase tracking-wider text-neutral-500 truncate">
                    {project.styleEn}
                  </span>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider text-black font-semibold flex items-center gap-1 hover:underline shrink-0"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
