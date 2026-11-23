"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Calculator,
  Home,
  Building,
  Briefcase,
  Coffee,
  Check,
  Clock,
  MessageCircle,
} from "lucide-react";

export default function CostEstimator() {
  const { lang, t } = useLanguage();

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
      const totalTurnkey = designCost + fitoutCost;
      totalLow = Math.round(totalTurnkey * 0.95);
      totalHigh = Math.round(totalTurnkey * 1.1);
      durationWeeks = Math.max(10, Math.round(area / 15));
    }

    return { totalLow, totalHigh, designCost, fitoutCost, durationWeeks };
  }, [propertyType, area, tier, scope]);

  const selectedTierObj = tiers.find((t) => t.id === tier) || tiers[1];
  const selectedPropObj = propertyTypes.find((p) => p.id === propertyType) || propertyTypes[0];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Eng. Alaa Essa, I calculated an indicative estimate for my project on your website:
- Property Type: ${selectedPropObj.labelEn}
- Area: ${area} m²
- Specification: ${selectedTierObj.labelEn}
- Scope of Work: ${scope === "design" ? "Design & Working Drawings" : scope === "supervision" ? "Design & Site Supervision" : "Full Turnkey Fit-Out"}
- Estimated Range: ${formatNumber(calculation.totalLow)} - ${formatNumber(calculation.totalHigh)} EGP

I would like to schedule a discovery consultation.`
  );

  return (
    <section id="estimator" className="py-24 bg-white border-t border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-black/10 gap-6">
          <div>
            <div className="text-xs font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              {t("تخطيط الميزانية وتقدير التكلفة", "BUDGET ESTIMATION & PLANNING")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-black tracking-tight">
              {t("حاسبة التكلفة التقديرية", "Project Cost Estimator")}
            </h2>
          </div>
          <p className="text-xs font-technical text-neutral-500 max-w-sm">
            {t(
              "حددي نوع ومساحة فراغك ومستوى التشطيب للحصول على تقدير استرشادي فوري للتكلفة والجدول الزمني.",
              "Select your space parameters and desired finish tier to instantly calculate an indicative budget range."
            )}
          </p>
        </div>

        {/* Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-50/60 border border-neutral-300 p-6 sm:p-8 space-y-8">
            {/* 1. Property Type */}
            <div>
              <label className="block text-xs font-technical font-bold uppercase tracking-widest text-black mb-3">
                1. {t("نوع العقار أو الفراغ", "PROPERTY TYPE")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {propertyTypes.map((item) => {
                  const Icon = item.icon;
                  const isSelected = propertyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPropertyType(item.id)}
                      className={`p-3 border text-center transition-colors flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? "text-white" : "text-neutral-500"}`} />
                      <span className="text-xs font-technical uppercase tracking-wider">
                        {t(item.labelAr, item.labelEn)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-technical font-bold uppercase tracking-widest text-black">
                  2. {t("المساحة الإجمالية بالمتر المربع", "FLOOR AREA (M²)")}
                </label>
                <span className="text-sm font-technical font-bold text-black border border-black/20 px-3 py-0.5 bg-white">
                  {area} m²
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="800"
                step="10"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-300 appearance-none cursor-pointer accent-black"
              />
              <div className="flex items-center justify-between text-[11px] font-technical text-neutral-500 mt-2">
                {[80, 150, 220, 350, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setArea(preset)}
                    className="hover:text-black py-0.5"
                  >
                    {preset} m²
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Finishing Tier */}
            <div>
              <label className="block text-xs font-technical font-bold uppercase tracking-widest text-black mb-3">
                3. {t("مستوى وباقة التشطيب", "FINISHING TIER")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {tiers.map((tItem) => {
                  const isSelected = tier === tItem.id;
                  return (
                    <button
                      key={tItem.id}
                      type="button"
                      onClick={() => setTier(tItem.id as any)}
                      className={`p-3 border text-start transition-colors ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                      }`}
                    >
                      <div className="text-xs font-technical font-bold uppercase tracking-wider">
                        {t(tItem.labelAr, tItem.labelEn)}
                      </div>
                      <div className={`text-[10px] mt-1 line-clamp-2 ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}>
                        {t(tItem.subAr, tItem.subEn)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Scope of Service */}
            <div>
              <label className="block text-xs font-technical font-bold uppercase tracking-widest text-black mb-3">
                4. {t("نطاق الخدمة المطلوب", "SERVICE SCOPE")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "design", labelAr: "تصميم 3D ومخططات فقط", labelEn: "Design & Blueprints" },
                  { id: "supervision", labelAr: "تصميم + إشراف دوري", labelEn: "Design + Supervision" },
                  { id: "turnkey", labelAr: "تسليم مفتاح متكامل", labelEn: "Full Turnkey Fit-Out" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScope(s.id as any)}
                    className={`py-2 px-3 border text-xs font-technical uppercase tracking-wider transition-colors text-center ${
                      scope === s.id
                        ? "bg-black text-white border-black font-bold"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                    }`}
                  >
                    {t(s.labelAr, s.labelEn)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-neutral-400 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <div className="text-[10px] font-technical uppercase tracking-widest text-neutral-500 mb-1">
                {t("التقدير الإجمالي التقديري", "INDICATIVE BUDGET ESTIMATE")}
              </div>
              <div className="text-2xl sm:text-3xl font-editorial font-bold text-black tracking-tight mb-2">
                <span>{formatNumber(calculation.totalLow)}</span>
                <span className="mx-2 text-neutral-400 font-sans">-</span>
                <span>{formatNumber(calculation.totalHigh)}</span>
                <span className="text-xs font-technical text-neutral-500 ms-2 font-normal">EGP</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                {t(
                  "* التكلفة استرشادية، ويتم اعتماد السعر النهائي بدقة خلال جلسة المعاينة الميدانية واعتماد المواصفات.",
                  "* Figures are indicative and subject to exact on-site survey and finalized material specifications."
                )}
              </p>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between py-3 border-y border-neutral-200 text-xs font-technical">
              <span className="text-neutral-600">{t("المدة الزمنية المتوقعة", "ESTIMATED TIMELINE")}</span>
              <span className="font-bold text-black">{calculation.durationWeeks} {t("أسبوع", "WEEKS")}</span>
            </div>

            {/* Scope highlights */}
            <div className="space-y-2 text-xs">
              <div className="font-technical font-bold uppercase tracking-wider text-black mb-1">
                {t("ما تشمله الباقة معكِ:", "INCLUDED IN SCOPE:")}
              </div>
              {[
                t("جلسة تحليل الاحتياجات ورفع المقاسات الميدانية بدقة", "Site survey & lifestyle discovery session"),
                t("مخططات 2D لتوزيع الفراغات والأثاث والمسارات", "2D layout & circulation space plans"),
                t("رندرات 3D واقعية متكاملة لجميع الغرف والزوايا", "Photorealistic 3D visual renders for all zones"),
                scope !== "design"
                  ? t("إشرافي الهندسي الشخصي على جودة ومطابقة التنفيذ", "Personal on-site quality supervision by Eng. Alaa")
                  : t("كتيب مواصفات الخامات وأكواد الدهانات المعتمدة", "Detailed material & paint specification book"),
                scope === "turnkey" &&
                  t("توريد وتركيب الخامات والتسليم على المفتاح مع ضمان شامل", "Turnkey material supply, installation & full warranty"),
              ]
                .filter(Boolean)
                .map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-neutral-600">
                    <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium transition-colors text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("مناقشة المقايسة مع م. آلاء عيسى", "Discuss Quote with Eng. Alaa")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
