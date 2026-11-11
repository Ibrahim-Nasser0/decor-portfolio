"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FAQS } from "@/data/portfolioData";
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
    budget: "medium",
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

  const directWhatsappLink = `https://wa.me/201000000000?text=${encodeURIComponent(
    `مرحباً استوديو Decor Portfolio، اسمي ${formData.name || "عميل"} وأود حجز موعد استشارة لمشروع ${
      formData.projectType === "residential"
        ? "سكني"
        : formData.projectType === "villa"
        ? "فيلا خاصة"
        : "تجاري"
    } في منطقة ${formData.phone || ""}.`
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
            {t("تواصل معنا واحجز استشارتك", "Consult with Our Architects")}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c]">
            {t(
              "يسعدنا استقبالك في استوديو التصميم أو التحدث معك مباشرة عبر الهاتف والواتساب لمناقشة تفاصيل مشروعك.",
              "We welcome you to visit our design studio or contact us directly via WhatsApp to discuss your upcoming project."
            )}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Info & FAQs (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Studio Cards */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5">
              <h3 className="text-lg font-bold text-white font-serif">
                {t("بيانات الاستوديو والتواصل المباشر", "Studio Contact Details")}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#cac5bb] hover:text-[#dfbe95] transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] shrink-0 border border-white/5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("مقر الاستوديو", "Studio Address")}</div>
                    <div className="text-xs text-[#9c978e] mt-0.5">
                      {t(
                        "التجمع الخامس، شارع التسعين الشمالي، القاهرة الجديدة، مصر",
                        "North 90th St, New Cairo, Egypt"
                      )}
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+201000000000"
                  className="flex items-start gap-3 text-[#cac5bb] hover:text-[#dfbe95] transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] shrink-0 border border-white/5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("الهاتف المباشر", "Direct Phone")}</div>
                    <div className="text-xs text-[#9c978e] mt-0.5 font-mono" dir="ltr">
                      +20 100 000 0000 / +20 120 000 0000
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/201000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#cac5bb] hover:text-[#dfbe95] transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("واتساب الاستشارات", "WhatsApp Inquiries")}</div>
                    <div className="text-xs text-[#9c978e] mt-0.5">
                      {t("متاح على مدار الساعة للمحادثات السريعة", "Available 24/7 for quick chats")}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-[#cac5bb]">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#dfbe95] shrink-0 border border-white/5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t("ساعات العمل الرسمية", "Working Hours")}</div>
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
                  {t("الأسئلة الشائعة", "Frequently Asked Questions")}
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
                  {t("تم استلام طلب استشارتك بنجاح!", "Consultation Request Received!")}
                </h3>
                <p className="text-sm text-[#b5b0a6] max-w-md mb-8 leading-relaxed">
                  {t(
                    "شكراً لاهتمامك بفريق Decor Portfolio؛ سيقوم كبير مهندسي التصميم بالتواصل معك هاتفياً خلال أقل من 24 ساعة لمناقشة التفاصيل.",
                    "Thank you for contacting Decor Portfolio. Our senior interior architect will reach out within 24 hours to schedule your consultation."
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
                    <span>{t("فتح المحادثة عبر واتساب الآن", "Open WhatsApp Chat Now")}</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 text-white transition-colors"
                  >
                    {t("إرسال طلب جديد", "Submit Another Request")}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    {t("احجز جلسة استشارة مع كبير مهندسينا", "Book an Architectural Consultation")}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a8a49c] mt-1">
                    {t(
                      "املأ النموذج وسنتواصل معك لعقد جلسة أولية لمناقشة الأفكار والمخططات المتاحة.",
                      "Fill out the form and our design lead will contact you to discuss your vision."
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#dfbe95] mb-2 uppercase">
                      {t("الاسم الكامل *", "Full Name *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("مثال: م. أحمد السعيد", "e.g. John Doe")}
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
                      {t("نوع المشروع", "Project Type")}
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
                    {t("تفاصيل إضافية أو مساحة الفراغ", "Additional Notes or Approximate Area")}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t(
                      "أخبرنا بالمساحة، الطراز المفضل (مودرن، كلاسيك، جاباندي)، وتاريخ البدء المرغوب...",
                      "Tell us about space area, preferred aesthetic, target timeline..."
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
                  <span>{t("تأكيد وحجز موعد الاستشارة الهندسية", "Confirm Consultation Booking")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
