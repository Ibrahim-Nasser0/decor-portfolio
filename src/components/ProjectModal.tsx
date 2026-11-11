"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project, DESIGNER_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  MapPin,
  Maximize,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white border border-neutral-300 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-20 p-2 bg-white/90 hover:bg-black hover:text-white text-black transition-colors border border-black/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Slider Area */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-neutral-100 border-b border-neutral-200">
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
                className="absolute inset-y-0 start-4 my-auto h-9 w-9 bg-white/90 hover:bg-black text-black hover:text-white flex items-center justify-center transition-colors border border-black/20"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-0 rotate-180" />
              </button>
              <button
                onClick={() =>
                  setActiveImgIdx((prev) => (prev + 1) % project.gallery.length)
                }
                className="absolute inset-y-0 end-4 my-auto h-9 w-9 bg-white/90 hover:bg-black text-black hover:text-white flex items-center justify-center transition-colors border border-black/20"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-0 rotate-180" />
              </button>
            </>
          )}

          {/* Indicator */}
          {project.gallery.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-black/10">
              {project.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImgIdx === i ? "w-5 bg-black" : "bg-neutral-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
            <div>
              <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-500">
                {t(project.categoryLabel, project.categoryLabelEn)}
              </span>
              <h3 className="text-xl sm:text-2xl font-editorial font-bold text-black mt-1">
                {t(project.title, project.titleEn)}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-technical text-neutral-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-black" />
                {t(project.location, project.locationEn)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Maximize className="w-3.5 h-3.5 text-black" />
                {project.area}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-black" />
                {project.year}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
            {t(project.description, project.descriptionEn)}
          </p>

          {/* Color Palette */}
          <div>
            <h4 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-2">
              {t("لوحة الألوان المعتمدة (Color Palette)", "Project Palette")}
            </h4>
            <div className="flex items-center gap-2">
              {project.palette.map((color, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded border border-neutral-300"
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-2.5">
              {t("المواصفات والبنود المنفذة", "Delivered Specifications")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(lang === "ar" ? project.features : project.featuresEn).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                  <Check className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
                `مرحباً م. آلاء عيسى، أود الاستفسار عن تفاصيل تنفيذ مشروع "${project.title}" وكيفية تطبيقها في مساحتي.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-6 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium transition-colors text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t("طلب استشارة لهذا المشروع مع م. آلاء", "Consult Eng. Alaa for Similar Project")}</span>
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-neutral-300 hover:border-black text-black text-xs uppercase tracking-widest font-medium transition-colors"
            >
              {t("إغلاق", "Close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
