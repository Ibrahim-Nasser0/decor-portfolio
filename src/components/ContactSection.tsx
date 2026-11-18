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

import { submitInquiryAction } from "@/app/admin/actions";

interface ContactSectionProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    phone?: string;
    email?: string;
    whatsappNumber?: string;
  };
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const { lang, t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Issa";
  const phone = profile?.phone || DESIGNER_INFO.phone;
  const email = profile?.email || DESIGNER_INFO.email;
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;
  const location = profile?.locationEn || DESIGNER_INFO.locationEn;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    projectType: "residential",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitInquiryAction(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const directWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Eng. ${name}, my name is ${formData.name || "a client"} and I would like to book an interior design consultation for a ${
      formData.projectType === "residential"
        ? "residential apartment"
        : formData.projectType === "villa"
        ? "private villa"
        : "commercial space"
    } in ${formData.city || "Cairo"}.`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 2xl:py-32 bg-[#faf9f6] border-t border-neutral-200 relative">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 2xl:mb-16 pb-6 border-b border-black/10 gap-4 sm:gap-6">
          <div>
            <div className="text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              06 • CONSULTATION & DIRECT INQUIRIES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              Direct Inquiry & Booking
            </h2>
          </div>
          <p className="text-xs 2xl:text-sm text-neutral-500 max-w-sm 2xl:max-w-md">
            I welcome the opportunity to discuss your architectural aspirations directly.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 2xl:gap-12 items-start">
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 2xl:space-y-10">
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-5 sm:space-y-6 2xl:space-y-7 shadow-sm">
              <div className="border-b border-neutral-200 pb-4">
                <span className="text-[10px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-widest text-neutral-400">
                  ARCHITECTURAL DESIGNER
                </span>
                <h3 className="text-lg sm:text-xl 2xl:text-2xl font-editorial font-bold text-black mt-1">
                  {name}
                </h3>
                <p className="text-xs 2xl:text-sm text-neutral-600 mt-0.5">
                  {profile?.titleEn || "Architectural Interior Designer"}
                </p>
              </div>

              <div className="space-y-4 2xl:space-y-5 text-xs 2xl:text-sm font-sans">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-neutral-700 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded border border-neutral-300 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle className="w-4 h-4 2xl:w-5 2xl:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-technical font-bold uppercase tracking-wider text-black">
                      WhatsApp Inquiries
                    </div>
                    <div className="text-[11px] 2xl:text-xs text-neutral-500 font-mono mt-0.5 truncate" dir="ltr">
                      {phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-3 text-neutral-700 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <Mail className="w-4 h-4 2xl:w-5 2xl:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-technical font-bold uppercase tracking-wider text-black">
                      Email
                    </div>
                    <div className="text-[11px] 2xl:text-xs text-neutral-500 font-mono mt-0.5 truncate">
                      {email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-neutral-700">
                  <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <MapPin className="w-4 h-4 2xl:w-5 2xl:h-5" />
                  </div>
                  <div>
                    <div className="font-technical font-bold uppercase tracking-wider text-black">
                      Location Coverage
                    </div>
                    <div className="text-[11px] 2xl:text-xs text-neutral-500 mt-0.5">
                      New Cairo, Sheikh Zayed, 6th of October, Maadi & Remote Architectural Design.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-neutral-700">
                  <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded border border-neutral-300 flex items-center justify-center text-black shrink-0">
                    <Clock className="w-4 h-4 2xl:w-5 2xl:h-5" />
                  </div>
                  <div>
                    <div className="font-technical font-bold uppercase tracking-wider text-black">
                      Office Hours
                    </div>
                    <div className="text-[11px] 2xl:text-xs text-neutral-500 mt-0.5">
                      Sat - Thu: 10:00 AM - 8:00 PM (Cairo Time)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-4 shadow-sm">
              <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black mb-4 pb-2 border-b border-black">
                FREQUENTLY ASKED QUESTIONS
              </h3>

              {FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-neutral-100 last:border-0 pb-3">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-start py-1.5 text-xs 2xl:text-sm font-bold text-black hover:underline transition-colors gap-2"
                  >
                    <span>{faq.qEn}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-neutral-500 shrink-0 transition-transform ${
                        activeFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <p className="text-xs 2xl:text-sm text-neutral-600 pt-2 leading-relaxed font-sans">
                      {faq.aEn}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-neutral-300 p-5 sm:p-8 md:p-10 2xl:p-12 shadow-sm">
            {submitted ? (
              <div className="py-8 sm:py-12 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-100 border border-black flex items-center justify-center mb-5 text-black">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-black mb-2">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mb-8 leading-relaxed font-sans">
                  Thank you for contacting me. Eng. {name} will personally review your project requirements and follow up within 24 hours.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a
                    href={directWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3.5 px-6 bg-black text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat Now</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto py-3.5 px-6 border border-neutral-300 text-black text-xs uppercase tracking-widest font-medium transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="text-xl sm:text-2xl font-editorial font-bold text-black">
                    Book an Architectural Consultation
                  </h3>
                  <p className="text-xs font-technical text-neutral-500 mt-1">
                    Fill out the form to schedule our project discovery session.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3.5 sm:px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs sm:text-sm font-sans placeholder-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      className="w-full px-3.5 sm:px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs sm:text-sm font-sans placeholder-neutral-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                      CITY OR REGION *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. New Cairo, Zayed..."
                      className="w-full px-3.5 sm:px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs sm:text-sm font-sans placeholder-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                      PROJECT CATEGORY
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs sm:text-sm font-sans"
                    >
                      <option value="residential">Apartment / Penthouse</option>
                      <option value="villa">Villa / Townhouse</option>
                      <option value="commercial">Commercial / Hospitality</option>
                      <option value="renovation">Full Renovation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-technical uppercase tracking-wider text-black mb-1.5">
                    ADDITIONAL PROJECT NOTES
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about floor area, preferred styles, and timeline..."
                    className="w-full px-3.5 sm:px-4 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-black focus:outline-none text-black text-xs sm:text-sm font-sans placeholder-neutral-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Consultation Booking</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
