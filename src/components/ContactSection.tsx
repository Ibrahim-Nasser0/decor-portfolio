"use client";

import React, { useState, useEffect, useRef } from "react";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Loader2,
  RotateCcw,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { submitInquiryAction } from "@/app/admin/actions";
import SocialLinks from "@/components/SocialIcons";

interface ContactSectionProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    phone?: string;
    email?: string;
    whatsappNumber?: string;
    instagram?: string;
    linkedin?: string;
    behance?: string;
  };
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Essa";
  const title = profile?.titleEn || DESIGNER_INFO.titleEn || "Interior Architecture & Spatial Design";
  const phone = profile?.phone || DESIGNER_INFO.phone;
  const email = profile?.email || DESIGNER_INFO.email;
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber || "201032494616";
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "Alexandria & Cairo, Egypt";

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Quick Typology Brief Selector Chips
  const typologies = [
    "Private Villa",
    "Penthouse Suite",
    "Luxury Living",
    "Turnkey Execution",
    "Boutique Commercial",
  ];
  const [selectedTypology, setSelectedTypology] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectTypology = (typ: string) => {
    if (selectedTypology === typ) {
      setSelectedTypology("");
      return;
    }
    setSelectedTypology(typ);
    // Gracefully prepend or update project brief
    if (!formData.message || typologies.some((t) => formData.message.startsWith(`[Project Typology: ${t}]`))) {
      const cleanMsg = typologies.reduce(
        (acc, t) => acc.replace(`[Project Typology: ${t}]\n\n`, "").replace(`[Project Typology: ${t}]`, ""),
        formData.message
      );
      setFormData((prev) => ({
        ...prev,
        message: cleanMsg ? `[Project Typology: ${typ}]\n\n${cleanMsg.trim()}` : `[Project Typology: ${typ}]\n\n`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        message: `[Project Typology: ${typ}]\n\n${prev.message}`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitInquiryAction({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 sm:py-28 2xl:py-36 bg-[#faf9f6] border-t border-neutral-300 relative overflow-hidden select-none"
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Header with Monograph Typography */}
        <div
          className={`mb-12 sm:mb-16 pb-6 border-b border-black/15 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-2 text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-[0.25em] text-neutral-500 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" aria-hidden="true" />
            <span>06 • DIRECT INQUIRIES &amp; COMMISSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-bold text-black tracking-tight uppercase leading-[0.95]">
            Let&apos;s Formulate Your Space
          </h2>
          <p className="text-xs sm:text-sm 2xl:text-base text-neutral-600 max-w-xl mt-3 font-sans leading-relaxed">
            Whether planning a private residential sanctuary, penthouse interior, or bespoke commercial concept, initiate direct communication below.
          </p>
        </div>

        {/* Two-Column Monograph Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Direct Studio Inquiries & Channels */}
          <div
            className={`lg:col-span-5 space-y-8 transition-all duration-700 delay-150 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <div>
              <span className="text-[10px] font-technical uppercase tracking-[0.2em] text-neutral-400 block font-semibold">
                STUDIO DIRECT REACH
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-black uppercase tracking-tight mt-1">
                ENG. {name.toUpperCase()}
              </h3>
              <p className="text-xs text-neutral-500 font-technical uppercase tracking-wider mt-0.5">
                {title}
              </p>
            </div>

            <div className="space-y-6 text-sm font-sans border-t border-neutral-200 pt-6">
              {/* WhatsApp & Phone */}
              <div>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  Mobile &amp; WhatsApp
                </span>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello Eng. ${name}, I would like to inquire about booking an interior architecture consultation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg text-black font-mono font-medium hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xs"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                  <span>{phone}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </a>
              </div>

              {/* Email */}
              <div>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  Direct Inquiries Email
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-base sm:text-lg text-black font-mono hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                  <span>{email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </a>
              </div>

              {/* Studio Location */}
              <div>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  Studio Practice Coordinates
                </span>
                <p className="text-sm text-neutral-700 font-sans flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" aria-hidden="true" />
                  <span>{location}</span>
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Fast Channel */}
            <div className="p-4 bg-white border border-neutral-300 rounded-sm shadow-2xs space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-semibold">
                PREFER DIRECT MESSAGING?
              </span>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                Connect directly via WhatsApp to share floor plans, moodboards, or site locations.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello Eng. ${name}, I am reaching out through your architectural portfolio to discuss an interior project.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-widest rounded-xs transition-all active:scale-98 shadow-xs focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Launch WhatsApp Chat</span>
              </a>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-2.5 font-semibold">
                PORTFOLIO &amp; PROFESSIONAL CHANNELS
              </span>
              <SocialLinks
                whatsappNumber={whatsappNumber}
                instagram={profile?.instagram || DESIGNER_INFO.instagram}
                linkedin={profile?.linkedin || DESIGNER_INFO.linkedin}
                behance={profile?.behance || "https://behance.net"}
                className="flex items-center gap-2.5"
                iconClassName="w-4 h-4"
                itemClassName="w-9 h-9 rounded border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
              />
            </div>
          </div>

          {/* Right Column (7 cols): Formal Architectural Monograph Form */}
          <div
            className={`lg:col-span-7 relative bg-white border border-neutral-300 p-6 sm:p-10 shadow-xs transition-all duration-700 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            {/* Architectural Drafting Crosshairs */}
            <span className="absolute top-2 start-2 font-mono text-[9px] text-neutral-300 select-none" aria-hidden="true">+</span>
            <span className="absolute top-2 end-2 font-mono text-[9px] text-neutral-300 select-none" aria-hidden="true">+</span>
            <span className="absolute bottom-2 start-2 font-mono text-[9px] text-neutral-300 select-none" aria-hidden="true">+</span>
            <span className="absolute bottom-2 end-2 font-mono text-[9px] text-neutral-300 select-none" aria-hidden="true">+</span>

            {/* Form Monograph Reference Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              <span>DOC REF: INQ-2026/27</span>
              <span>CONFIDENTIAL TRANSMISSION</span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-card-entrance">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-black mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-black uppercase tracking-tight">
                  Inquiry Brief Transmitted
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed font-sans">
                  Thank you for reaching out. Eng. {name} will personally evaluate your architectural requirements and respond shortly.
                </p>
                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedTypology("");
                      setFormData({ name: "", phone: "", email: "", message: "" });
                    }}
                    className="px-6 py-3 border border-neutral-300 hover:border-black text-black text-xs uppercase tracking-widest font-technical font-medium transition-all active:scale-95 inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                {/* 1. Quick Project Typology Selector Chips */}
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-500 mb-2 font-semibold">
                    1. SELECT PROJECT TYPOLOGY (OPTIONAL):
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {typologies.map((typ) => {
                      const isSelected = selectedTypology === typ;
                      return (
                        <button
                          key={typ}
                          type="button"
                          onClick={() => handleSelectTypology(typ)}
                          className={`px-3 py-1.5 text-[10px] sm:text-[11px] font-technical uppercase tracking-wider border transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none ${
                            isSelected
                              ? "bg-black text-white border-black font-semibold shadow-2xs"
                              : "bg-[#faf9f6] text-neutral-700 border-neutral-300 hover:border-black hover:text-black"
                          }`}
                        >
                          {typ}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Client Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-technical uppercase tracking-wider text-black mb-1.5 font-bold"
                  >
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eng. Karim El-Sayed"
                    className="w-full px-4 py-3 bg-[#faf9f6] border border-neutral-300 focus:border-black focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black text-black text-sm font-sans placeholder-neutral-400 transition-colors"
                  />
                </div>

                {/* 3. Phone & Email in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[11px] font-technical uppercase tracking-wider text-black mb-1.5 font-bold"
                    >
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      className="w-full px-4 py-3 bg-[#faf9f6] border border-neutral-300 focus:border-black focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black text-black text-sm font-sans placeholder-neutral-400 transition-colors"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-technical uppercase tracking-wider text-black mb-1.5 font-bold"
                    >
                      Email Address <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      spellCheck={false}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-[#faf9f6] border border-neutral-300 focus:border-black focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black text-black text-sm font-sans placeholder-neutral-400 transition-colors"
                    />
                  </div>
                </div>

                {/* 4. Project Brief / Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] font-technical uppercase tracking-wider text-black mb-1.5 font-bold"
                  >
                    Project Brief or Questions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your space typology, location (e.g. New Cairo, Sheikh Zayed, North Coast), area, and desired services..."
                    className="w-full px-4 py-3 bg-[#faf9f6] border border-neutral-300 focus:border-black focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black text-black text-sm font-sans placeholder-neutral-400 resize-none transition-colors leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-technical font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none shadow-sm min-h-[44px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-300" aria-hidden="true" />
                      <span>Transmitting Inquiry Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Transmit Project Brief</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
