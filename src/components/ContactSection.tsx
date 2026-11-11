"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FAQS, DESIGNER_INFO } from "@/data/portfolioData";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
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
    <section id="contact" className="py-24 bg-[#0a0a0d] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#dfbe95] text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t("ابدأ مشروعك اليوم", "Get In Touch")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight mb-4">
            {t("تواصلي مباشرة مع م. آلاء عيسى", "Consult Directly with Eng. Alaa")}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c]">
            {t(
              "يسعدني التحدث معكِ مباشرة ومناقشة تفاصيل وأفكار منزلكِ الجديد أو مشروعكِ التجاري عبر الهاتف أو الواتساب أو تحديد موعد لقاء استشاري.",
              "I would love to discuss your interior aspirations directly via WhatsApp, phone, or in person for an in-depth design consultation."
            )}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Info & FAQs (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Designer Contact Cards */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfbe95] to-[#c5a880] p-[1px]">
                  <div className="w-full h-full bg-[#141418] rounded-[11px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#dfbe95]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">
                    {t(DESIGNER_INFO.nameAr, DESIGNER_INFO.nameEn)}
                  </h3>
                  <p className="text-xs text-[#dfbe95]">
                    {t(DESIGNER_INFO.titleAr, DESIGNER_INFO.titleEn)}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={`https://wa.me/${DESIGNER_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#cac5bb] hover:text-[#dfbe95] transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("واتساب الاستشارات المباشر", "Direct WhatsApp Chat")}</div>
                    <div className="text-xs text-[#9c978e] mt-0.5">
                      {t("متاح للمحادثات السريعة ومشاركة الصور والمخططات", "Available for instant messaging and blueprint review")}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:+${DESIGNER_INFO.whatsappNumber}`}
                  className="flex items-start gap-3 text-[#cac5bb] hover:text-[#dfbe95] transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] shrink-0 border border-white/5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("رقم الاتصال المباشر", "Direct Phone Call")}</div>
                    <div className="text-xs text-[#9c978e] mt-0.5 font-mono" dir="ltr">
                      +20 100 000 0000
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-[#cac5bb]">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] shrink-0 border border-white/5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("نطاق العمل الميداني", "Coverage & Service Area")}</div>
                    <div className="text-xs text-[#9c978e] mt-0.5">
                      {t(
                        "القاهرة الجديدة (التجمع الخامس)، الشيخ زايد، 6 أكتوبر، والمعادي (ومتاح تصميم أونلاين لجميع المحافظات ودول الخليج).",
                        "New Cairo, Sheikh Zayed, 6th of October, and online consultation across GCC."
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#cac5bb]">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] shrink-0 border border-white/5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("مواعيد الاستشارات", "Consultation Hours")}</div>
                    <div className="text-xs text-[#9c978e] mt-0.5">
                      {t("السبت - الخميس: 10:00 ص - 8:00 م", "Sat - Thu: 10:00 AM - 8:00 PM")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-4 h-4 text-[#dfbe95]" />
                <h3 className="text-base font-bold text-white font-serif">
                  {t("الأسئلة الشائعة حول خدمات التصميم", "Frequently Asked Questions")}
                </h3>
              </div>

              {FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-white/5 last:border-0 pb-3">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-start py-2 text-xs sm:text-sm font-semibold text-white hover:text-[#dfbe95] transition-colors"
                  >
                    <span>{t(faq.q, faq.qEn)}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#a8a49c] transition-transform duration-200 shrink-0 ${
                        activeFaq === idx ? "rotate-180 text-[#dfbe95]" : ""
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <p className="text-xs text-[#a8a49c] pt-2 pb-1 leading-relaxed animate-in fade-in duration-150">
                      {t(faq.a, faq.a)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Booking Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel-gold p-6 sm:p-10 rounded-3xl border border-[#c5a880]/30 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif mb-2">
                  {t("تم استلام طلبك بنجاح!", "Your Request Has Been Received!")}
                </h3>
                <p className="text-sm text-[#b5b0a6] max-w-md mb-8 leading-relaxed">
                  {t(
                    "شكراً لاهتمامكِ وتواصلكِ؛ سأقوم شخصياً بمراجعة تفاصيل طلبكِ والتواصل معكِ هاتفياً خلال أقل من 24 ساعة.",
                    "Thank you for reaching out. Eng. Alaa Issa will personally review your project details and contact you within 24 hours."
                  )}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={directWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t("فتح محادثة واتساب مع م. آلاء الآن", "Chat with Eng. Alaa on WhatsApp")}</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 text-white transition-colors"
                  >
                    {t("إرسال طلب استشارة آخر", "Submit Another Request")}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    {t("احجزي استشارتكِ المباشرة مع م. آلاء عيسى", "Book a Direct Consultation with Eng. Alaa")}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a8a49c] mt-1">
                    {t(
                      "سجلي بياناتكِ وسأتواصل معكِ لترتيب جلسة لمناقشة أفكاركِ وتطلعاتكِ لمساحتكِ الخاصة.",
                      "Fill out the form and I will personally get in touch to schedule our design discovery session."
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#dfbe95] mb-2 uppercase">
                      {t("الاسم الكريم *", "Your Name *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("الاسم الكامل", "Full Name")}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#c5a880] focus:outline-none text-white text-xs sm:text-sm placeholder-[#777] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-[#dfbe95] mb-2 uppercase">
                      {t("رقم الهاتف أو الواتساب *", "Phone / WhatsApp *")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#c5a880] focus:outline-none text-white text-xs sm:text-sm placeholder-[#777] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold text-[#dfbe95] mb-2 uppercase">
                      {t("المدينة أو المنطقة *", "City or Area *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder={t("مثال: التجمع الخامس، زايد، المعادي...", "e.g. New Cairo, Zayed...")}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#c5a880] focus:outline-none text-white text-xs sm:text-sm placeholder-[#777] transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-semibold text-[#dfbe95] mb-2 uppercase">
                      {t("نوع الفراغ أو المشروع", "Project Type")}
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1b22] border border-white/10 focus:border-[#c5a880] focus:outline-none text-white text-xs sm:text-sm transition-colors"
                    >
                      <option value="residential">{t("شقة سكنية أو دوبلكس", "Apartment / Duplex")}</option>
                      <option value="villa">{t("فيلا مستقلة أو تاون هاوس", "Villa / Townhouse")}</option>
                      <option value="commercial">{t("مقر تجاري أو كافيه", "Commercial / Café")}</option>
                      <option value="renovation">{t("تجديد وإعادة تأهيل عقار قائم", "Full Renovation")}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#dfbe95] mb-2 uppercase">
                    {t("تفاصيل إضافية أو المساحة التقديرية", "Additional Notes or Approximate Area")}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t(
                      "أخبريني بمساحة منزلكِ، الألوان أو الطراز المفضل لديكِ، وموعد البدء المتوقع...",
                      "Tell me about space area, preferred styles, and timeline..."
                    )}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#c5a880] focus:outline-none text-white text-xs sm:text-sm placeholder-[#777] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#dfbe95] via-[#c5a880] to-[#b39162] hover:brightness-110 text-[#121216] shadow-xl shadow-[#c5a880]/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>{t("تأكيد حجز جلسة الاستشارة مع م. آلاء", "Confirm Consultation with Eng. Alaa")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
