"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS, Project, DESIGNER_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import ProjectModal from "./ProjectModal";
import { ArrowUpRight, MapPin, Maximize } from "lucide-react";

export default function PortfolioGallery() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", labelAr: "كافة المشاريع", labelEn: "ALL WORKS" },
    { id: "living", labelAr: "صالونات ومعيشة", labelEn: "LIVING & LOUNGES" },
    { id: "bedroom", labelAr: "أجنحة النوم", labelEn: "MASTER BEDROOMS" },
    { id: "kitchen", labelAr: "مطابخ وحمامات", labelEn: "KITCHENS & BATHS" },
    { id: "commercial", labelAr: "تجاري وضيافة", labelEn: "COMMERCIAL & RETAIL" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-white border-t border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-black/10 gap-6">
          <div>
            <div className="text-xs font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              {t("أعمال مختارة • م. آلاء عيسى", "PORTFOLIO • SELECTED WORKS")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-black tracking-tight">
              {t("معرض المشاريع المعمارية", "Selected Architectural Works")}
            </h2>
          </div>
          <p className="text-xs font-technical text-neutral-500 max-w-sm">
            {t(
              "مجموعة مختارة من المشاريع السكنية والتجارية التي قمت بتصميمها وإعداد مخططاتها التنفيذية وإشرافها.",
              "A curated monograph of residential retreats and hospitality environments designed and detailed by Eng. Alaa Issa."
            )}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-4 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-technical uppercase tracking-widest py-1.5 px-3.5 transition-colors border ${
                activeCategory === cat.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black"
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
              className="group bg-white border border-neutral-200 hover:border-black transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute top-3 start-3 px-2 py-0.5 bg-white/95 text-[10px] font-technical uppercase tracking-wider text-black border border-black/10">
                  {t(project.categoryLabel, project.categoryLabelEn)}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-technical text-neutral-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-black" />
                      {t(project.location, project.locationEn)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3 h-3 text-black" />
                      {project.area}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg font-editorial font-bold text-black group-hover:underline cursor-pointer"
                  >
                    {t(project.title, project.titleEn)}
                  </h3>

                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed font-sans">
                    {t(project.description, project.descriptionEn)}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] font-technical uppercase tracking-wider text-neutral-500">
                    {project.style}
                  </span>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-technical uppercase tracking-wider text-black font-semibold flex items-center gap-1 hover:underline"
                  >
                    <span>{t("عرض المخطط والتفاصيل", "View Details")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
