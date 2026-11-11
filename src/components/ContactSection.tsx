"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DESIGNER_INFO, FAQS } from "@/data/portfolioData";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    projectType: "residential",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const directWhatsappLink = `https://wa.me/${DESIGNER_INFO.whatsappNumber}?text=${encodeURIComponent(
    `مرحباً م. آلاء عيسى، اسمي ${formData.name || "عميل"} وأود حجز موعد استشارة تصميم داخلي لمشروع ${
      formData.projectType === "residential"
        ? "شقة سكنية"
        : formData.projectType === "villa"
        ? "فيلا خاصة"
        : "مشروع تجاري"
    } في منطقة ${formData.city || "القاهرة"}.`
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#faf9f6] border-t border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-black/10 gap-6">
          <div>
            <div className="text-xs font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              {t("جلسات الاستشارة والتعاقد", "CONSULTATION & DIRECT INQUIRIES")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-black tracking-tight">
              {t("تواصلي مباشرة مع م. آلاء عيسى", "Direct Inquiry & Booking")}
            </h2>
          </div>
          <p className="text-xs font-technical text-neutral-500 max-w-sm">
            {t(
              "يسعدني التحدث معكِ لمناقشة أفكار وتطلعات منزلكِ الجديد أو مشروعكِ التجاري.",
              "I welcome the opportunity to discuss your architectural aspirations directly."
            )}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-neutral-300 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-neutral-200 pb-4">
                <span className="text-xs font-technical uppercase tracking-widest text-neutral-400">
                  ARCHITECTURAL DESIGNER
                </span>
                <h3 className="text-xl font-editorial font-bold text-black mt-1">
                  {t(DESIGNER_INFO.nameAr, DESIGNER_INFO.nameEn)}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  {t(DESIGNER_INFO.titleAr, DESIGNER_INFO.titleEn)}
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <a
                  href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-neutral-700 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-technical font-bold uppercase tracking-wider text-black">
                      {t("واتساب الاستشارات المباشر", "WhatsApp Inquiries")}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-0.5" dir="ltr">
                      {DESIGNER_INFO.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${DESIGNER_INFO.email}`}
                  className="flex items-start gap-3 text-neutral-700 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-technical font-bold uppercase tracking-wider text-black">
                      {t("البريد الإلكتروني", "Email")}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      {DESIGNER_INFO.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-neutral-700">
                  <div className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-technical font-bold uppercase tracking-wider text-black">
                      {t("نطاق العمل والمعاينات", "Location Coverage")}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      {t(
                        "القاهرة الجديدة (التجمع الخامس)، الشيخ زايد، 6 أكتوبر، والمعادي.",
                        "New Cairo, Sheikh Zayed, 6th of October, Maadi & Remote Design."
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-neutral-700">
                  <div className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-technical font-bold uppercase tracking-wider text-black">
                      {t("ساعات العمل والاستشارات", "Hours")}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      {t("السبت - الخميس: 10:00 ص - 8:00 م", "Sat - Thu: 10:00 AM - 8:00 PM")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white border border-neutral-300 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-xs font-technical font-bold uppercase tracking-widest text-black mb-4 pb-2 border-b border-black">
                {t("الأسئلة الشائعة", "FREQUENTLY ASKED QUESTIONS")}
              </h3>

              {FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-neutral-100 last:border-0 pb-3">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-start py-1.5 text-xs font-bold text-black hover:underline transition-colors"
                  >
                    <span>{t(faq.q, faq.qEn)}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${
                        activeFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <p className="text-xs text-neutral-600 pt-2 leading-relaxed font-sans">
                      {t(faq.a, faq.a)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-neutral-300 p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-neutral-100 border border-black flex items-center justify-center mb-5 text-black">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-editorial font-bold text-black mb-2">
                  {t("تم استلام طلب الاستشارة بنجاح!", "Inquiry Received Successfully!")}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mb-8 leading-relaxed font-sans">
                  {t(
                    "شكراً لاهتمامكِ؛ سأقوم شخصياً بمراجعة التفاصيل والتواصل معكِ هاتفياً خلال أقل من 24 ساعة.",
                    "Thank you for contacting me. Eng. Alaa Issa will personally review your project requirements and follow up within 24 hours."
                  )}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={directWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 bg-black text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t("فتح المحادثة عبر واتساب الآن", "Open WhatsApp Chat Now")}</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-3 px-6 border border-neutral-300 text-black text-xs uppercase tracking-widest font-medium transition-colors"
                  >
                    {t("إرسال طلب جديد", "Submit Another Request")}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="text-xl sm:text-2xl font-editorial font-bold text-black">
                    {t("احجزي استشارتكِ المعمارية مع م. آلاء", "Book an Architectural Consultation")}
                  </h3>
                  <p className="text-xs font-technical text-neutral-500 mt-1">
                    {t("سجلي بياناتكِ وسأتواصل معكِ لترتيب موعد جلسة دراسة الفراغ والمخططات.", "Fill out the form to schedule our project discovery session.")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                      {t("الاسم الكريم *", "FULL NAME *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("الاسم الكامل", "Your Name")}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs font-sans placeholder-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                      {t("رقم الهاتف أو الواتساب *", "PHONE / WHATSAPP *")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs font-sans placeholder-neutral-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                      {t("المدينة أو المنطقة *", "CITY OR REGION *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder={t("مثال: التجمع الخامس، الشيخ زايد...", "e.g. New Cairo, Zayed...")}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs font-sans placeholder-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                      {t("نوع المشروع أو الفراغ", "PROJECT CATEGORY")}
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs font-sans"
                    >
                      <option value="residential">{t("شقة سكنية أو بنتهاوس", "Apartment / Penthouse")}</option>
                      <option value="villa">{t("فيلا مستقلة أو تاون هاوس", "Villa / Townhouse")}</option>
                      <option value="commercial">{t("مقر تجاري أو كافيه", "Commercial / Hospitality")}</option>
                      <option value="renovation">{t("تجديد وإعادة تأهيل عقار قائم", "Full Renovation")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                    {t("تفاصيل إضافية أو المساحة التقديرية", "ADDITIONAL PROJECT NOTES")}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t(
                      "أخبريني بمساحة منزلكِ، الطراز المفضل، والموعد المستهدف للبدء...",
                      "Tell me about floor area, preferred styles, and timeline..."
                    )}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs font-sans placeholder-neutral-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t("تأكيد حجز جلسة الاستشارة", "Confirm Consultation Booking")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
