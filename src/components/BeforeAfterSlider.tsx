"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sliders, Sparkles, Layers } from "lucide-react";

export default function BeforeAfterSlider() {
  const { lang, t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [containerRef]
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="before-after" className="py-20 bg-[#0a0a0d] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>{t("دقة التطوير والإخراج", "Visual Transformation")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight mb-4">
            {t("مقارنة تفاعلية: قبل وبعد التحسين", "Interactive Before & After Comparison")}
          </h2>
          <p className="text-xs sm:text-sm text-[#a39e94]">
            {t(
              "اسحب المؤشر لترى كيف نحول التصاميم الأولية إلى رندرات معمارية فائقة الدقة تحاكي الواقع وتوضح أدق تفاصيل الإضاءة والخامات.",
              "Drag the slider to see how initial concepts are elevated into ultra-photorealistic architectural renders displaying true lighting and rich material textures."
            )}
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize glass-panel"
        >
          {/* AFTER Image (Full background) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/projects/project-1.jpg"
              alt="After Enhancement"
              fill
              priority
              className="object-cover pointer-events-none"
            />
            {/* After Tag */}
            <div className="absolute bottom-5 end-5 px-3.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-[#c5a880]/40 text-xs font-bold text-[#dfbe95] shadow-lg flex items-center gap-1.5 pointer-events-none">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("بعد التحسين والإخراج الفائق", "After: Photorealistic Render")}</span>
            </div>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full min-w-[300px]">
              <Image
                src="/images/projects/project-1-orig.jpg"
                alt="Before Enhancement"
                fill
                priority
                className="object-cover pointer-events-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                  maxWidth: "none",
                }}
              />
            </div>
            {/* Before Tag */}
            <div className="absolute bottom-5 start-5 px-3.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 pointer-events-none">
              <Layers className="w-3.5 h-3.5 text-[#b5b0a6]" />
              <span>{t("قبل: الرندر الأولي", "Before: Initial Draft")}</span>
            </div>
          </div>

          {/* Draggable Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle Thumb Button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1c1b20] border-2 border-white shadow-2xl flex items-center justify-center text-white cursor-ew-resize">
              <Sliders className="w-4 h-4 text-[#dfbe95] rotate-90" />
            </div>
          </div>
        </div>

        {/* Instructions footer */}
        <div className="mt-4 flex items-center justify-between text-[11px] sm:text-xs text-[#8c887f] px-2 font-mono">
          <span>← {t("المسودة الأولية", "Initial Draft")}</span>
          <span className="hidden sm:inline font-sans text-[#c5a880]">
            {t("اسحب المؤشر لليمين واليسار للمقارنة", "Drag slider horizontally to compare")}
          </span>
          <span>{t("النتيجة المعمارية النهائية", "Architectural Handover")} →</span>
        </div>
      </div>
    </section>
  );
}

