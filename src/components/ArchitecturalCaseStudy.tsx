"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS, DESIGNER_INFO } from "@/data/portfolioData";
import { Sliders, Maximize2, Layers, Check, MessageCircle } from "lucide-react";

export default function ArchitecturalCaseStudy() {
  const { lang, t } = useLanguage();
  const project = PROJECTS[0]; // Authentic Tagamoa Living Suite project
  const [activePlanTab, setActivePlanTab] = useState<"ground" | "first" | "sections">("ground");
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section id="case-study" className="py-24 bg-[#faf9f6] border-t border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Editorial Monograph Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 gap-6">
          <div>
            <div className="text-xs font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              {t("دراسة حالة معمارية مفصلة", "PROJECT CASE STUDY • MONOGRAPH SPREAD")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-black tracking-tight">
              {t("ريزيدنس التجمع • صالون مودرن جاباندي", "Tagamoa Residence • Japandi Living Suite")}
            </h2>
          </div>
          <div className="text-xs font-technical uppercase tracking-widest text-neutral-600 text-end">
            <div>{t("المساحة: 75 م²", "AREA: 75 M²")}</div>
            <div>{t("الموقع: التجمع الخامس، القاهرة", "LOCATION: NEW CAIRO, EGYPT")}</div>
          </div>
        </div>

        {/* Spread Layout: Left Renders + Right Architectural Drawings & Material Palette (Exact to Image 4 & 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Stacked High-Resolution Architectural Renders (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Render 1: Main Living View */}
            <div className="space-y-2">
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden border border-neutral-300 shadow-sm group">
                <Image
                  src="/images/projects/project-1.jpg"
                  alt="Living Lounge Panorama"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-3 start-3 px-3 py-1 bg-white/95 text-[11px] font-editorial uppercase tracking-widest text-black shadow">
                  {t("الصالون الرئيسي", "LIVING SALON")}
                </div>
              </div>
            </div>

            {/* Render 2: TV Feature Wall */}
            <div className="space-y-2">
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden border border-neutral-300 shadow-sm group">
                <Image
                  src="/images/projects/project-3.jpg"
                  alt="Media Feature & Floating Console"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-3 start-3 px-3 py-1 bg-white/95 text-[11px] font-editorial uppercase tracking-widest text-black shadow">
                  {t("جدار الشاشة والكونسول المعلق", "MEDIA UNIT & WALL FLUTING")}
                </div>
              </div>
            </div>

            {/* Render 3: Corner Details */}
            <div className="space-y-2">
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden border border-neutral-300 shadow-sm group">
                <Image
                  src="/images/projects/project-4.jpg"
                  alt="Sectional & Ambient Lighting"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-3 start-3 px-3 py-1 bg-white/95 text-[11px] font-editorial uppercase tracking-widest text-black shadow">
                  {t("الجلسة الركنية والإضاءة الهادئة", "CORNER LOUNGE & BOUCLÉ")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Plans, Section Heights, Material Palette & Concept (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Architectural Plans Card */}
            <div className="bg-white border border-neutral-300 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActivePlanTab("ground")}
                    className={`text-xs font-technical uppercase tracking-widest font-bold pb-1 transition-colors ${
                      activePlanTab === "ground"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    GROUND FLOOR
                  </button>
                  <button
                    onClick={() => setActivePlanTab("first")}
                    className={`text-xs font-technical uppercase tracking-widest font-bold pb-1 transition-colors ${
                      activePlanTab === "first"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    FIRST FLOOR
                  </button>
                  <button
                    onClick={() => setActivePlanTab("sections")}
                    className={`text-xs font-technical uppercase tracking-widest font-bold pb-1 transition-colors ${
                      activePlanTab === "sections"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    SECTIONS (AA / BB / CC)
                  </button>
                </div>
                <span className="text-[10px] font-technical uppercase tracking-wider text-neutral-400">
                  SCALE 1:50
                </span>
              </div>

              {/* Vector Architectural Blueprint CAD Drawing (Matching Image 4 & 5) */}
              <div className="relative aspect-[16/9] w-full bg-[#fdfdfd] border border-neutral-200 p-4 overflow-hidden flex items-center justify-center">
                {activePlanTab === "ground" && (
                  <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                    {/* Perimeter walls */}
                    <rect x="50" y="40" width="700" height="370" stroke="currentColor" strokeWidth="3" />
                    {/* Interior dividing walls */}
                    <line x1="320" y1="40" x2="320" y2="410" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="320" y1="220" x2="520" y2="220" stroke="currentColor" strokeWidth="2" />
                    <line x1="520" y1="140" x2="520" y2="340" stroke="currentColor" strokeWidth="2" />
                    <line x1="520" y1="340" x2="680" y2="340" stroke="currentColor" strokeWidth="2" />

                    {/* Windows & Glazing lines */}
                    <line x1="120" y1="40" x2="250" y2="40" stroke="#000" strokeWidth="6" strokeDasharray="8 4" />
                    <line x1="400" y1="40" x2="600" y2="40" stroke="#000" strokeWidth="6" strokeDasharray="8 4" />

                    {/* Section Cut Line AA' (Exact to Image 4 & 5) */}
                    <line x1="20" y1="200" x2="780" y2="200" stroke="#000" strokeWidth="1.5" strokeDasharray="12 4 3 4" />
                    <text x="10" y="195" fontSize="12" fontWeight="bold" fontFamily="sans-serif">AA&apos;</text>
                    <text x="765" y="195" fontSize="12" fontWeight="bold" fontFamily="sans-serif">AA&apos;</text>

                    {/* Furniture Layout (Living Sofa & Coffee Table) */}
                    <path d="M 120 180 L 120 320 L 260 320" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <rect x="150" y="220" width="80" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                    <circle cx="190" cy="245" r="8" stroke="currentColor" strokeWidth="1" />
                    {/* Armchairs */}
                    <rect x="110" y="340" width="45" height="45" rx="10" stroke="currentColor" strokeWidth="1.2" />

                    {/* TV Floating Unit */}
                    <rect x="330" y="100" width="15" height="100" stroke="currentColor" strokeWidth="1.5" fill="#f0f0f0" />
                    <line x1="325" y1="80" x2="325" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Room Labels */}
                    <text x="140" y="270" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">LIVING SUITE</text>
                    <text x="360" y="150" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">MEDIA ZONE</text>
                    <text x="560" y="180" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">DINING & FOYER</text>
                    <text x="560" y="380" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">BALCONY</text>
                  </svg>
                )}

                {activePlanTab === "first" && (
                  <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                    <rect x="70" y="40" width="660" height="370" stroke="currentColor" strokeWidth="3" />
                    <line x1="420" y1="40" x2="420" y2="410" stroke="currentColor" strokeWidth="2.5" />
                    {/* Master Suite */}
                    <rect x="120" y="120" width="140" height="160" stroke="currentColor" strokeWidth="1.5" />
                    <text x="140" y="200" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="#555">MASTER SUITE</text>
                    {/* Walk-in Dressing */}
                    <rect x="460" y="90" width="120" height="110" stroke="currentColor" strokeWidth="1.5" />
                    <text x="475" y="150" fontSize="10" fontFamily="sans-serif" letterSpacing="1" fill="#555">DRESSING</text>
                    {/* Ensuite Bath */}
                    <rect x="460" y="230" width="120" height="130" stroke="currentColor" strokeWidth="1.5" />
                    <text x="485" y="300" fontSize="10" fontFamily="sans-serif" letterSpacing="1" fill="#555">BATHROOM</text>
                  </svg>
                )}

                {activePlanTab === "sections" && (
                  <svg className="w-full h-full text-neutral-800" viewBox="0 0 800 450" fill="none">
                    {/* Section AA */}
                    <g transform="translate(40, 50)">
                      <text x="0" y="0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">SECTION AA</text>
                      <rect x="0" y="20" width="320" height="150" stroke="currentColor" strokeWidth="2" fill="#fff" />
                      {/* Ceiling & Floor slabs */}
                      <line x1="-20" y1="20" x2="340" y2="20" stroke="currentColor" strokeWidth="4" />
                      <line x1="-20" y1="170" x2="340" y2="170" stroke="currentColor" strokeWidth="4" />
                      {/* Media Wall Cladding */}
                      <rect x="60" y="40" width="120" height="90" stroke="currentColor" strokeWidth="1.5" fill="#ece8e1" />
                      <line x1="60" y1="100" x2="180" y2="100" stroke="#000" strokeWidth="1.5" />
                      {/* Human scale silhouette (Matching Image 4) */}
                      <circle cx="240" cy="85" r="7" stroke="currentColor" strokeWidth="1" fill="#bbb" />
                      <path d="M 235 95 L 245 95 L 245 145 L 241 145 L 241 168 L 239 168 L 239 145 L 235 145 Z" fill="#bbb" />
                      {/* Height dimension (280 cm) */}
                      <line x1="-15" y1="20" x2="-15" y2="170" stroke="#888" strokeWidth="1" />
                      <text x="-35" y="100" fontSize="10" fontFamily="sans-serif" fill="#666">280</text>
                    </g>

                    {/* Section BB */}
                    <g transform="translate(420, 50)">
                      <text x="0" y="0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">SECTION BB</text>
                      <rect x="0" y="20" width="300" height="150" stroke="currentColor" strokeWidth="2" fill="#fff" />
                      <line x1="-10" y1="20" x2="310" y2="20" stroke="currentColor" strokeWidth="4" />
                      <line x1="-10" y1="170" x2="310" y2="170" stroke="currentColor" strokeWidth="4" />
                      {/* Arched Mirror Feature (from Image 4 Bathroom) */}
                      <path d="M 60 110 L 60 70 A 25 25 0 0 1 110 70 L 110 110 Z" stroke="currentColor" strokeWidth="1.5" fill="#f4f4f4" />
                      <path d="M 130 110 L 130 70 A 25 25 0 0 1 180 70 L 180 110 Z" stroke="currentColor" strokeWidth="1.5" fill="#f4f4f4" />
                      <rect x="40" y="110" width="160" height="30" stroke="currentColor" strokeWidth="1.5" fill="#ddd" />
                    </g>
                  </svg>
                )}
              </div>
            </div>

            {/* The Material Palette Box (Exact to Image 4) */}
            <div className="bg-white border border-neutral-300 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-sm font-technical font-bold uppercase tracking-widest text-black">
                {t("لوحة الخامات والمواد (The material palette)", "The material palette")}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans text-justify">
                {t(
                  "تتمحور لوحة الخامات حول الرخام الطبيعي المعرق، خشب الجوز الدافئ، والتكسيات الجدارية المخططة لخلق بيئة معمارية متوازنة وخالدة. تعزز الإضاءة المحيطية الهادئة ملمس الخامات الطبيعية مضيفة دفئاً وعمقاً بصرياً إلى الفراغ الداخلي.",
                  "The material palette is centered around richly veined natural marble, warm walnut wood, and textured wall finishes, creating a refined and timeless atmosphere. Soft, ambient lighting enhances the natural textures of the materials while adding warmth and depth to the interior. A palette of earthy tones, deep browns, and warm cream accents evokes a sense of luxury, comfort, and relaxation, offering clients a calm and intimate environment."
                )}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans text-justify">
                {t(
                  "يوازن التصميم بين التعبير الجريء للخامات والخطوط المعمارية النقية، مدمجاً أثاثاً مخصصاً ووحدات تخزين ذكية وتفاصيل تشطيب متقنة تمنح تجربة سكنية تجمع بين الفخامة والراحة العملية.",
                  "The design balances bold material expression with clean architectural lines, integrating custom furniture, functional storage, and elegant detailing to create a sophisticated residential experience that is both visually striking and highly functional."
                )}
              </p>

              {/* Swatch chips */}
              <div className="pt-2 flex items-center gap-3">
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

            {/* Concept Link Box (Exact to Image 5) */}
            <div className="bg-white border border-neutral-300 p-6 sm:p-8 space-y-3 shadow-sm">
              <h3 className="text-sm font-editorial font-bold text-black tracking-wide">
                {t("الرابط المفاهيمي للتصميم (Concept link)", "Concept link")}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans text-justify">
                {t(
                  "استوحيت حركة الفراغ من فكرة 'الساحة المعمارية المعاصرة'؛ حيث تتدفق مسارات الحركة بسلاسة بين مناطق الاستقبال، الجلوس، وضيافة القهوة في مساحة مفتوحة تغمرها الإضاءة الطبيعية والإنارة الدافئة لتوفير تجربة معيشية حيوية ومتناغمة.",
                  "My space organization is built around the concept of a seamless modern agora. In classical architecture, circulation was continuous and filled with natural daylight. The interior circulation here recreates this sense of organic activity, with all functional zones radiating from the central living lounge bathed in balanced 3000K warm illumination."
                )}
              </p>
            </div>

            {/* Interactive Before & After Enhancement Slider */}
            <div className="bg-white border border-neutral-300 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-technical font-bold uppercase tracking-widest text-black">
                  {t("مقارنة الرندر المبدئي والنتيجة المعمارية", "Visual Enhancement: Draft vs Reality")}
                </span>
                <span className="text-[11px] font-technical text-neutral-500">
                  {t("اسحب للمقارنة", "Drag to compare")}
                </span>
              </div>

              <div
                onMouseMove={handleSliderMove}
                className="relative aspect-[16/9] w-full overflow-hidden border border-neutral-200 select-none cursor-ew-resize"
              >
                {/* After Image */}
                <Image
                  src="/images/projects/project-1.jpg"
                  alt="After Render"
                  fill
                  className="object-cover pointer-events-none"
                />
                <div className="absolute top-3 end-3 px-2 py-0.5 bg-black text-white text-[10px] font-technical uppercase tracking-wider">
                  {t("بعد: الإخراج النهائي", "After: Final Photorealism")}
                </div>

                {/* Before Image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="relative w-full h-full min-w-[300px]">
                    <Image
                      src="/images/projects/project-1-orig.jpg"
                      alt="Before Render"
                      fill
                      className="object-cover pointer-events-none"
                    />
                  </div>
                  <div className="absolute top-3 start-3 px-2 py-0.5 bg-white text-black border border-black text-[10px] font-technical uppercase tracking-wider">
                    {t("قبل: الرندر الأولي", "Before: Initial Sketch")}
                  </div>
                </div>

                {/* Slider divider line */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-white shadow pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-black border-2 border-white flex items-center justify-center text-white text-[10px]">
                    ↔
                  </div>
                </div>
              </div>
            </div>

            {/* CTA to Consult with Eng. Alaa */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Eng. Alaa Issa, I reviewed the Tagamoa Residence case study and would like to schedule an architectural consultation for my project."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium transition-colors text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("طلب دراسة تصميم مماثلة لمساحتك", "Request Similar Architectural Concept")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
