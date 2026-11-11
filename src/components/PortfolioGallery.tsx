"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import ProjectModal from "./ProjectModal";
import {
  Sparkles,
  ArrowUpRight,
  MapPin,
  Maximize,
  SlidersHorizontal,
} from "lucide-react";

export default function PortfolioGallery() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", labelAr: "كافة المشاريع", labelEn: "All Works" },
    { id: "living", labelAr: "صالونات ومعيشة", labelEn: "Living & Lounges" },
    { id: "bedroom", labelAr: "أجنحة النوم", labelEn: "Master Bedrooms" },
    { id: "kitchen", labelAr: "مطابخ وحمامات", labelEn: "Kitchens & Baths" },
    { id: "villas", labelAr: "فلل وقصور", labelEn: "Villas" },
    { id: "commercial", labelAr: "تجاري وإداري", labelEn: "Commercial" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-[#0e0e12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("معرض الإبداعات المعمارية", "Curated Portfolio")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight mb-4">
            {t("أحدث مشاريعنا المنفذة", "Our Latest Interior Works")}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c] max-w-xl mx-auto">
            {t(
              "تصفح مجموعة من أرقى المساحات السكنية والتجارية التي تم تصميمها وإخراجها وتنفيذها بأعلى معايير الإتقان والدقة الهندسية.",
              "Explore a curated collection of prime residences, penthouses, and commercial spaces designed and finished to international standards."
            )}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#c5a880] to-[#b39162] text-[#121216] font-semibold shadow-lg shadow-[#c5a880]/20 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-[#cbc6bc] border border-white/5 hover:border-white/20"
              }`}
            >
              {t(cat.labelAr, cat.labelEn)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-[#c5a880]/50 transition-all duration-500 hover:-translate-y-1.5 shadow-xl flex flex-col"
            >
              {/* Card Image */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Top badges */}
                <div className="absolute top-3.5 start-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-semibold text-[#dfbe95] border border-white/10">
                    {t(project.categoryLabel, project.categoryLabelEn)}
                  </span>
                </div>

                <div className="absolute top-3.5 end-3.5">
                  <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-[#dfbe95] group-hover:bg-black transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Image count pill */}
                {project.gallery.length > 1 && (
                  <div className="absolute bottom-3 end-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-white/90">
                    {project.gallery.length} {t("صور", "photos")}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#9b968c] mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#dfbe95]" />
                      {t(project.location, project.locationEn)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3 h-3 text-[#dfbe95]" />
                      {project.area}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-[#dfbe95] transition-colors cursor-pointer font-serif line-clamp-1"
                  >
                    {t(project.title, project.titleEn)}
                  </h3>

                  <p className="text-xs text-[#a39e94] mt-2 line-clamp-2 leading-relaxed">
                    {t(project.description, project.descriptionEn)}
                  </p>
                </div>

                {/* Card Action footer */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#c5a880]">
                    {t(project.style, project.styleEn)}
                  </span>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-white hover:text-[#dfbe95] flex items-center gap-1 transition-colors"
                  >
                    <span>{t("التفاصيل", "View Details")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
