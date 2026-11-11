"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  MapPin,
  Maximize,
  Layers,
  Calendar,
  Check,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang, t } = useLanguage();
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#141418] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#c5a880] text-white hover:text-black transition-colors backdrop-blur-md border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Slider Area */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
          <Image
            src={project.gallery[activeImgIdx] || project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />

          {project.gallery.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImgIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)
                }
                className="absolute inset-y-0 start-4 my-auto h-10 w-10 rounded-full bg-black/60 hover:bg-[#c5a880] text-white hover:text-black flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-0 rotate-180" />
              </button>
              <button
                onClick={() =>
                  setActiveImgIdx((prev) => (prev + 1) % project.gallery.length)
                }
                className="absolute inset-y-0 end-4 my-auto h-10 w-10 rounded-full bg-black/60 hover:bg-[#c5a880] text-white hover:text-black flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-0 rotate-180" />
              </button>
            </>
          )}

          {/* Image Thumbnails indicator */}
          {project.gallery.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
              {project.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImgIdx === i ? "w-6 bg-[#dfbe95]" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#dfbe95]">
                {t(project.categoryLabel, project.categoryLabelEn)}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mt-1">
                {t(project.title, project.titleEn)}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#a39e94]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#dfbe95]" />
                {t(project.location, project.locationEn)}
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize className="w-3.5 h-3.5 text-[#dfbe95]" />
                {project.area}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#dfbe95]" />
                {project.year}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#cac5bb] leading-relaxed">
            {t(project.description, project.descriptionEn)}
          </p>

          {/* Color Palette */}
          <div>
            <h4 className="text-xs font-bold uppercase text-white mb-2 tracking-wider">
              {t("لوحة الألوان المعتمدة للمشروع", "Color Palette")}
            </h4>
            <div className="flex items-center gap-2">
              {project.palette.map((color, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded-lg border border-white/20 shadow-sm"
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-bold uppercase text-white mb-2.5 tracking-wider">
              {t("المواصفات والبنود المنجزة", "Delivered Specifications")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(lang === "ar" ? project.features : project.featuresEn).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#b8b3a8]">
                  <Check className="w-3.5 h-3.5 text-[#dfbe95] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/201000000000?text=${encodeURIComponent(
                `مرحباً استوديو Decor Portfolio، أود الاستفسار عن تفاصيل تنفيذ مشروع "${project.title}" وكيف يمكن تطبيق أفكاره في مساحتي.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#c5a880] to-[#b39162] text-[#141316] hover:from-[#dfbe95] hover:to-[#c5a880] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t("طلب تسعير واستشارة لهذا المشروع", "Request Quote for Similar Design")}</span>
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              {t("إغلاق", "Close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

