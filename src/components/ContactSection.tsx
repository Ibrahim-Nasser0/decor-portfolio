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
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "Cairo, Egypt";

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
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
      className="py-20 sm:py-28 bg-[#faf9f6] border-t border-neutral-200 relative overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Smooth Scroll Entrance */}
        <div
          className={`mb-12 sm:mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[10px] sm:text-[11px] font-technical uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
            06 • CONTACT
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-black tracking-tight uppercase">
            Let&apos;s Discuss Your Space
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-lg mt-3 font-sans leading-relaxed">
            Have a residential or commercial project in mind? Reach out directly or leave a message below to begin the conversation.
          </p>
        </div>

        {/* Clean Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <div
            className={`lg:col-span-5 space-y-8 transition-all duration-700 delay-150 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <div>
              <span className="text-[10px] font-technical uppercase tracking-[0.2em] text-neutral-400 block">
                DIRECT INQUIRIES
              </span>
              <h3 className="text-2xl font-editorial font-bold text-black uppercase tracking-tight mt-1">
                {name}
              </h3>
              <p className="text-xs text-neutral-500 font-technical uppercase tracking-wider mt-0.5">
                {title}
              </p>
            </div>

            <div className="space-y-6 text-sm font-sans border-t border-neutral-200 pt-6">
              {/* WhatsApp & Phone */}
              <div>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  WhatsApp & Phone
                </span>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg text-black font-mono font-medium hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 group"
                  dir="ltr"
                >
                  <span>{phone}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Email */}
              <div>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-base sm:text-lg text-black font-mono hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>{email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Location */}
              <div>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  Location
                </span>
                <p className="text-sm text-neutral-700 font-sans">
                  {location}
                </p>
              </div>
            </div>

            {/* Social Channels (Behance, LinkedIn, Instagram, WhatsApp) */}
            <div className="pt-2">
              <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-2.5">
                PORTFOLIO & SOCIAL CHANNELS
              </span>
              <SocialLinks
                whatsappNumber={whatsappNumber}
                instagram={profile?.instagram || DESIGNER_INFO.instagram}
                linkedin={profile?.linkedin || DESIGNER_INFO.linkedin}
                behance={profile?.behance || "https://behance.net"}
                className="flex items-center gap-2.5"
                iconClassName="w-4 h-4"
                itemClassName="w-9 h-9 rounded border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95"
              />
            </div>
          </div>

          {/* Right Column: Clean Minimalist Form */}
          <div
            className={`lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-10 shadow-xs transition-all duration-700 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-card-entrance">
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-black mx-auto animate-scale-check">
                  <CheckCircle2 className="w-7 h-7 text-[#7AD1B8]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-black uppercase tracking-tight">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed font-sans">
                  Thank you for reaching out. Eng. {name} will personally review your brief and get back to you shortly.
                </p>
                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", message: "" });
                    }}
                    className="px-6 py-3 border border-neutral-300 hover:border-black text-black text-xs uppercase tracking-widest font-technical font-medium transition-all active:scale-95 inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-technical uppercase tracking-wider text-black mb-1.5 font-bold">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Karim El-Sayed"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-black focus:bg-white focus:outline-none text-black text-sm font-sans placeholder-neutral-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-technical uppercase tracking-wider text-black mb-1.5 font-bold">
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-black focus:bg-white focus:outline-none text-black text-sm font-sans placeholder-neutral-400 transition-colors"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-technical uppercase tracking-wider text-black mb-1.5 font-bold">
                      EMAIL (OPTIONAL)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-black focus:bg-white focus:outline-none text-black text-sm font-sans placeholder-neutral-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-technical uppercase tracking-wider text-black mb-1.5 font-bold">
                    MESSAGE OR PROJECT BRIEF *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your space, location, or any questions..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-black focus:bg-white focus:outline-none text-black text-sm font-sans placeholder-neutral-400 resize-none transition-colors leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-technical font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-300" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
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
