"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Calculator,
  Building,
  Home,
  Briefcase,
  Coffee,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function CostEstimator() {
  const { lang, t } = useLanguage();
  const isRtl = lang === "ar";

  // State
  const [propertyType, setPropertyType] = useState<string>("apartment");
  const [area, setArea] = useState<number>(160);
  const [tier, setTier] = useState<"standard" | "luxury" | "royal">("luxury");
  const [scope, setScope] = useState<"design" | "supervision" | "turnkey">("turnkey");

  const propertyTypes = [
    { id: "apartment", labelAr: "شقة سكنية", labelEn: "Apartment", icon: Home, baseMultiplier: 1.0 },
    { id: "duplex", labelAr: "دوبلكس / بنتهاوس", labelEn: "Duplex / Penthouse", icon: Building, baseMultiplier: 1.1 },
    { id: "villa", labelAr: "فيلا مستقلة", labelEn: "Standalone Villa", icon: Building, baseMultiplier: 1.25 },
    { id: "office", labelAr: "مقر إداري ومكاتب", labelEn: "Corporate Office", icon: Briefcase, baseMultiplier: 1.15 },
    { id: "commercial", labelAr: "كافيه / مطعم / بوتيك", labelEn: "Café / Boutique", icon: Coffee, baseMultiplier: 1.3 },
  ];

  const tiers = [
    {
      id: "standard",
      labelAr: "مودرن كوزي",
      labelEn: "Modern Cozy",
      subAr: "خطوط عصرية أنيقة بتكلفة متوازنة",
      subEn: "Contemporary clean lines with optimized budget",
      designRatePerM2: 250,
      turnkeyRatePerM2: 7500,
    },
    {
      id: "luxury",
      labelAr: "بريميوم لاكشري",
      labelEn: "Premium Luxury",
      subAr: "رخام مستورد وتكسيات خشبية وإضاءة ذكية",
      subEn: "Imported marble, custom joinery, smart lighting",
      designRatePerM2: 450,
      turnkeyRatePerM2: 12500,
    },
    {
      id: "royal",
      labelAr: "رويال ألترا هاي إند",
      labelEn: "Royal Ultra High-End",
      subAr: "أفخم الخامات العالمية مع تفصيل حصري",
      subEn: "Top tier bespoke finishes & artisanal craftsmanship",
      designRatePerM2: 700,
      turnkeyRatePerM2: 18500,
    },
  ];

  // Calculation
  const calculation = useMemo(() => {
    const selectedProp = propertyTypes.find((p) => p.id === propertyType) || propertyTypes[0];
    const selectedTier = tiers.find((t) => t.id === tier) || tiers[1];

    const designCost = Math.round(area * selectedTier.designRatePerM2 * selectedProp.baseMultiplier);
    const fitoutCost = Math.round(area * selectedTier.turnkeyRatePerM2 * selectedProp.baseMultiplier);

    let totalLow = 0;
    let totalHigh = 0;
    let durationWeeks = 0;

    if (scope === "design") {
      totalLow = Math.round(designCost * 0.95);
      totalHigh = Math.round(designCost * 1.1);
      durationWeeks = Math.max(2, Math.round(area / 60));
    } else if (scope === "supervision") {
      const supervisionFee = Math.round(fitoutCost * 0.12);
      totalLow = Math.round((designCost + supervisionFee) * 0.95);
      totalHigh = Math.round((designCost + supervisionFee) * 1.1);
      durationWeeks = Math.max(8, Math.round(area / 18));
    } else {
      // turnkey
      const totalTurnkey = designCost + fitoutCost;
      totalLow = Math.round(totalTurnkey * 0.95);
      totalHigh = Math.round(totalTurnkey * 1.1);
      durationWeeks = Math.max(10, Math.round(area / 15));
    }

    return {
      totalLow,
      totalHigh,
      designCost,
      fitoutCost,
      durationWeeks,
    };
  }, [propertyType, area, tier, scope]);

  const selectedTierObj = tiers.find((t) => t.id === tier) || tiers[1];
  const selectedPropObj = propertyTypes.find((p) => p.id === propertyType) || propertyTypes[0];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US").format(num);
  };

  const whatsappMessage = encodeURIComponent(
    `مرحباً استوديو Decor Portfolio، قمت باستخدام حاسبة التكلفة التقديرية بموقكم بالمواصفات التالية:
- نوع العقار: ${selectedPropObj.labelAr}
- المساحة: ${area} م²
- باقة التشطيب: ${selectedTierObj.labelAr}
- نوع الخدمة: ${scope === "design" ? "تصميم ومخططات فقط" : scope === "supervision" ? "تصميم مع إشراف هندسي" : "تسليم مفتاح متكامل"}
- التكلفة التقديرية: ${formatNumber(calculation.totalLow)} - ${formatNumber(calculation.totalHigh)} ج.م
أود حجز جلسة استشارية وتحديد موعد لمعاينة العقار.`
  );

  return (
    <section id="estimator" className="py-24 bg-[#0a0a0d] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t("شفافية التكاليف والميزانية", "Cost Transparency")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight mb-4">
            {t("حاسبة تكلفة الديكور والتشطيب التقديرية", "Interactive Project Cost Estimator")}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c]">
            {t(
              "حدد نوع ومساحة فراغك ومستوى التشطيب المطلوب للحصول على تقدير استرشادي فوري لمتوسط التكلفة والمدة الزمنية.",
              "Select your space type, area, and desired finish tier to instantly estimate design & fit-out costs and project timelines."
            )}
          </p>
        </div>

        {/* Estimator Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
            {/* 1. Property Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#dfbe95] mb-3">
                1. {t("نوع العقار أو الفراغ", "Property Type")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {propertyTypes.map((item) => {
                  const Icon = item.icon;
                  const isSelected = propertyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPropertyType(item.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? "bg-[#c5a880]/20 border-[#c5a880] text-white shadow-lg shadow-[#c5a880]/15"
                          : "bg-white/5 border-white/5 text-[#a8a49c] hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? "text-[#dfbe95]" : "text-[#888]"}`} />
                      <span className="text-xs font-semibold">{t(item.labelAr, item.labelEn)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Space Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe95]">
                  2. {t("المساحة الإجمالية بالمتر المربع (م²)", "Total Floor Area (m²)")}
                </label>
                <div className="px-3 py-1 rounded-lg bg-[#c5a880]/20 border border-[#c5a880]/40 text-sm font-bold text-white font-mono">
                  {area} {t("م²", "m²")}
                </div>
              </div>

              <input
                type="range"
                min="40"
                max="800"
                step="10"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
              />

              {/* Area Presets */}
              <div className="flex items-center justify-between text-xs text-[#8c887f] mt-2">
                {[80, 150, 220, 350, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setArea(preset)}
                    className="hover:text-[#dfbe95] transition-colors py-1 px-1.5"
                  >
                    {preset} م²
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Finishing Tier */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#dfbe95] mb-3">
                3. {t("مستوى وباقة التشطيب والديكور", "Finishing & Material Tier")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {tiers.map((tItem) => {
                  const isSelected = tier === tItem.id;
                  return (
                    <button
                      key={tItem.id}
                      type="button"
                      onClick={() => setTier(tItem.id as any)}
                      className={`p-3.5 rounded-2xl border text-start transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-gradient-to-br from-[#c5a880]/25 to-transparent border-[#c5a880] text-white shadow-lg"
                          : "bg-white/5 border-white/5 text-[#a8a49c] hover:bg-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{t(tItem.labelAr, tItem.labelEn)}</span>
                          {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#dfbe95]" />}
                        </div>
                        <p className="text-[11px] text-[#9c978e] mt-1 line-clamp-2 leading-relaxed">
                          {t(tItem.subAr, tItem.subEn)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Scope of Service */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#dfbe95] mb-3">
                4. {t("نطاق الخدمة المطلوب", "Service Scope")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: "design",
                    labelAr: "تصميم 3D ومخططات فقط",
                    labelEn: "3D Design & Blueprints",
                  },
                  {
                    id: "supervision",
                    labelAr: "تصميم + إشراف دوري",
                    labelEn: "Design + Supervision",
                  },
                  {
                    id: "turnkey",
                    labelAr: "تسليم مفتاح متكامل",
                    labelEn: "Full Turnkey Fit-Out",
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScope(s.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      scope === s.id
                        ? "bg-[#c5a880] text-[#121216] border-[#c5a880] shadow-md"
                        : "bg-white/5 text-[#cbc6bc] border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {t(s.labelAr, s.labelEn)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box (5 cols) */}
          <div className="lg:col-span-5 glass-panel-gold p-6 sm:p-8 rounded-3xl border border-[#c5a880]/30 shadow-2xl flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfbe95]/15 text-[#dfbe95] text-xs font-bold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t("تقدير استرشادي فوري", "Instant Estimation")}</span>
              </div>

              <div className="text-xs text-[#b8b3a8] uppercase tracking-wider mb-1">
                {t("التكلفة الإجمالية التقديرية", "Estimated Total Budget Range")}
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mb-2">
                <span className="text-[#dfbe95]">{formatNumber(calculation.totalLow)}</span>
                <span className="text-white/60 text-lg mx-2">-</span>
                <span className="text-[#dfbe95]">{formatNumber(calculation.totalHigh)}</span>
                <span className="text-xs sm:text-sm font-sans font-normal text-[#a8a49c] ms-2">
                  {t("ج.م تقريباً", "EGP approx")}
                </span>
              </div>

              <p className="text-[11px] text-[#9c978e] leading-relaxed mb-6">
                {t(
                  "* الأسعار استرشادية وتخضع للمعاينة الميدانية الدقيقة واعتماد الخامات والمواصفات التفصيلية.",
                  "* Figures are indicative and subject to exact on-site survey and finalized material specifications."
                )}
              </p>

              {/* Timeline estimate */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#dfbe95]" />
                  <span className="text-xs text-[#cfcac0]">{t("المدة الزمنية المقدرة للتنفيذ", "Estimated Timeline")}</span>
                </div>
                <span className="text-xs font-bold text-white font-mono">
                  {calculation.durationWeeks} {t("أسبوع", "Weeks")}
                </span>
              </div>

              {/* Included Highlights */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {t("البنود المشمولة في هذا التقدير:", "What's Included in This Scope:")}
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    t("جلسة تحليل الاحتياجات ورفع المقاسات الميدانية", "Site survey & lifestyle needs discovery"),
                    t("مخططات 2D لتوزيع الفراغات والأثاث والمسارات", "2D layout & circulation space plans"),
                    t("رندرات 3D واقعية متكاملة لجميع الغرف والزوايا", "Photorealistic 3D visual renders for all zones"),
                    scope !== "design"
                      ? t("إشراف هندسي وضمان جودة الأعمال والمطابقة", "On-site engineering quality supervision")
                      : t("كتيب مواصفات الخامات والألوان (Specs Sheet)", "Detailed material & paint specification book"),
                    scope === "turnkey" &&
                      t("توريد وتركيب الخامات والتسليم على المفتاح مع ضمان شامل", "Turnkey material supply, installation & full warranty"),
                  ]
                    .filter(Boolean)
                    .map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#cfcac0]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dfbe95] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/201000000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#dfbe95] via-[#c5a880] to-[#a8885b] text-[#121216] hover:brightness-110 shadow-lg shadow-[#c5a880]/30 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("طلب مقايسة رسمية ومناقشة التقدير عبر واتساب", "Get Official Quote via WhatsApp")}</span>
              </a>

              <p className="text-[10px] text-center text-[#88847c]">
                {t("استشارة أولية مجانية بدون أي التزام مالي", "Free initial discovery session with zero obligation")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
