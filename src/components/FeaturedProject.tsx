"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS, DESIGNER_INFO } from "@/data/portfolioData";
import {
  Maximize2,
  MapPin,
  Maximize,
  Calendar,
  Layers,
  Sparkles,
  Check,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function FeaturedProject() {
  const { lang, t } = useLanguage();
  const project = PROJECTS[0]; // The authentic Japandi living room project
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const angleLabelsAr = [
    "الزاوية البانورامية الشاملة",
    "الواجهة الأمامية والبانوهات الخشبية",
    "جدار الشاشة ووحدة التلفزيون",
    "الجلسة الركنية وتفاصيل الأثاث",
  ];

  const angleLabelsEn = [
    "Panoramic Lounge View",
    "Front Elevation & Wall Fluting",
    "Floating Media & TV Feature",
    "L-Sectional Bouclé Details",
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const nextImage = () => {
    setSelectedImageIdx((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setSelectedImageIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  return (
    <section id="featured" className="py-20 bg-[#0e0e12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("مشروع مميز • تصميم وإشراف م. آلاء عيسى", "Featured Work • By Eng. Alaa Essa")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
              {t(project.title, project.titleEn)}
            </h2>
          </div>
          <p className="text-sm text-[#a8a49c] max-w-md">
            {t(
              "أحدث مشاريعي في التجمع الخامس؛ حيث وظفت خشب الجوز الطبيعي مع البانوهات المخططة والإضاءات المخفية الدافئة لخلق فراغ متوازن ومريح بصرياً.",
              "My latest interior project in New Cairo, balancing natural walnut timber, fluted panels, and warm ambient backlights."
            )}
          </p>
        </div>

        {/* Main Grid: Gallery on one side, Specs & Details on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Display (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Big Active Image Card */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-white/10 group shadow-2xl">
              <Image
                src={project.gallery[selectedImageIdx]}
                alt={project.title || "Featured Project"}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-102"
              />

              {/* View tag badge */}
              <div className="absolute top-4 start-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-medium text-[#f0eae1] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t(angleLabelsAr[selectedImageIdx], angleLabelsEn[selectedImageIdx])}</span>
              </div>

              {/* Lightbox Trigger */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 end-4 p-2 rounded-xl bg-black/70 hover:bg-[#c5a880] text-white hover:text-black transition-colors backdrop-blur-md border border-white/10"
                title={t("عرض بحجم الشاشة الكاملة", "Open full screen lightbox")}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Prev / Next overlay arrows */}
              <div className="absolute inset-y-0 start-3 flex items-center">
                <button
                  onClick={prevImage}
                  className="p-2 rounded-full bg-black/60 hover:bg-[#c5a880] text-white hover:text-black transition-colors backdrop-blur-sm"
                  aria-label="Previous view"
                >
                  <ChevronRight className="w-5 h-5 rtl:rotate-0 rotate-180" />
                </button>
              </div>
              <div className="absolute inset-y-0 end-3 flex items-center">
                <button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-black/60 hover:bg-[#c5a880] text-white hover:text-black transition-colors backdrop-blur-sm"
                  aria-label="Next view"
                >
                  <ChevronLeft className="w-5 h-5 rtl:rotate-0 rotate-180" />
                </button>
              </div>

              {/* Bottom Image counter */}
              <div className="absolute bottom-4 end-4 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-[#dcd7ce]">
                {selectedImageIdx + 1} / {project.gallery.length}
              </div>
            </div>

            {/* Thumbnails row (4 angles) */}
            <div className="grid grid-cols-4 gap-3">
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIdx === idx
                      ? "border-[#c5a880] shadow-lg shadow-[#c5a880]/20 scale-102"
                      : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                  }`}
                >
                  <Image src={img} alt={`View angle ${idx + 1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent" />
                  <span className="absolute bottom-1 end-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Specs & Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            {/* Meta badges grid */}
            <div className="grid grid-cols-2 gap-3 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] border border-white/5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#8e8a82] uppercase">{t("الموقع", "Location")}</div>
                  <div className="text-xs font-semibold text-white">{t(project.location, project.locationEn)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] border border-white/5">
                  <Maximize className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#8e8a82] uppercase">{t("المساحة", "Area")}</div>
                  <div className="text-xs font-semibold text-white">{project.area}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] border border-white/5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#8e8a82] uppercase">{t("الطراز", "Design Style")}</div>
                  <div className="text-xs font-semibold text-white">{t(project.style, project.styleEn)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] border border-white/5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#8e8a82] uppercase">{t("سنة التسليم", "Year")}</div>
                  <div className="text-xs font-semibold text-white">{project.year}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider font-serif">
                {t("رؤيتي في تصميم المشروع", "My Design Vision")}
              </h3>
              <p className="text-xs sm:text-sm text-[#b5b0a6] leading-relaxed">
                {t(project.description, project.descriptionEn)}
              </p>
            </div>

            {/* Color Palette Swatches */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t("لوحة الألوان المعتمدة (Color Palette)", "Project Color Palette")}
                </h4>
                {copiedHex && (
                  <span className="text-[11px] text-emerald-400 font-medium">
                    {t(`تم نسخ ${copiedHex}`, `Copied ${copiedHex}`)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {project.palette.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyColor(color)}
                    style={{ backgroundColor: color }}
                    className="group relative w-10 h-10 rounded-xl border border-white/20 shadow-md transition-transform hover:scale-110 focus:outline-none"
                    title={`Click to copy ${color}`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                      {color}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Highlights list */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                {t("العناصر والمواصفات التي صممتها", "Key Custom Elements")}
              </h4>
              <ul className="flex flex-col gap-2">
                {project.featuresEn.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#c9c4bb]">
                    <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `مرحباً م. آلاء عيسى، أعجبني مشروع "${project.title}" وأود طلب استشارة معك لتنفيذ تصميم مماثل لمساحتي.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#c5a880] to-[#b39162] hover:from-[#dfbe95] hover:to-[#c5a880] text-[#141316] shadow-lg shadow-[#c5a880]/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("طلب تصميم مماثل مع م. آلاء عيسى", "Request Similar Design with Eng. Alaa")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 end-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            ✕
          </button>
          <div className="relative max-w-5xl w-full max-h-[85vh] aspect-[16/10]">
            <Image
              src={project.gallery[selectedImageIdx]}
              alt="Fullscreen Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
