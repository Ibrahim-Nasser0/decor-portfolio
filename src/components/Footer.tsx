"use client";

import React, { useState, useEffect, useRef } from "react";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { Phone, Mail, ArrowUp, ArrowUpRight, MapPin, Clock, Sparkles } from "lucide-react";
import SocialLinks from "@/components/SocialIcons";

interface FooterProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    email?: string;
    phone?: string;
    whatsappNumber?: string;
    instagram?: string;
    linkedin?: string;
    behance?: string;
  };
}

export default function Footer({ profile }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
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

    const currentRef = footerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "ALAA ISSA";
  const title = profile?.titleEn || DESIGNER_INFO.titleEn || "INTERIOR ARCHITECTURE & DESIGN";
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "NEW CAIRO • SHEIKH ZAYED • CAIRO, EGYPT";
  const phone = profile?.phone || DESIGNER_INFO.phone;
  const email = profile?.email || DESIGNER_INFO.email;
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;
  const instagram = profile?.instagram || DESIGNER_INFO.instagram;
  const linkedin = profile?.linkedin || DESIGNER_INFO.linkedin;
  const behance = profile?.behance || "https://behance.net";

  const navLinks = [
    { num: "01", label: "HERO & ETHOS", href: "#hero" },
    { num: "02", label: "ARCHITECTURAL PROFILE", href: "#about" },
    { num: "03", label: "SKILLS & TOOLSET", href: "#skills" },
    { num: "04", label: "EXPERIENCE & PRACTICE", href: "#experience" },
    { num: "05", label: "SELECTED WORKS", href: "#projects" },
    { num: "06", label: "DIRECT CONTACT", href: "#contact" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-white border-t border-neutral-300 pt-16 sm:pt-20 2xl:pt-28 pb-10 sm:pb-14 relative text-black select-none overflow-hidden"
    >
      {/* Background Subtle Monograph Watermark */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 text-[16vw] font-editorial font-black text-black/[0.015] pointer-events-none select-none -z-10 leading-none tracking-tighter">
        STUDIO
      </div>

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Top Architectural Invitation Marquee Card */}
        <div
          className={`pb-12 sm:pb-16 border-b border-black/15 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-neutral-50 border border-neutral-200/80 p-6 sm:p-10 shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-technical uppercase tracking-[0.25em] text-neutral-500 font-bold">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AD1B8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7AD1B8]"></span>
                </span>
                <span>OPEN FOR COMMISSIONS • 2026/2027</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-bold text-black uppercase tracking-tight">
                Have an Intentional Space in Mind?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-xl font-sans leading-relaxed">
                Whether formulating a private residential sanctuary, penthouse suite, or bespoke commercial concept, let us explore the spatial possibilities.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#contact"
                className="group px-6 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-technical font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md active:scale-98"
              >
                <span>Start a Project Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main 4-Column Monograph Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 py-12 sm:py-16 border-b border-neutral-200">
          {/* Column 1: Identity & Ethos (5 cols) */}
          <div
            className={`lg:col-span-5 space-y-5 transition-all duration-700 delay-100 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <a href="#hero" className="group inline-flex flex-col">
                <span className="text-2xl sm:text-3xl font-editorial font-bold tracking-tight text-black uppercase group-hover:text-neutral-700 transition-colors">
                  {name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-technical uppercase tracking-[0.2em] text-neutral-500 mt-1 font-medium">
                  {title}
                </span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md font-sans">
              Architectural interior design practice specializing in bespoke residential sanctuaries, tailored millwork detailing, and attentive on-site executive supervision.
            </p>

            <div className="space-y-2 pt-1 text-xs font-technical text-neutral-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span>{location}</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono tracking-wider pl-5">
                COORDINATES: 30°02&apos;N 31°14&apos;E • CLT (UTC+2)
              </div>
            </div>
          </div>

          {/* Column 2: Index (2 cols) */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-[11px] font-technical font-bold uppercase tracking-[0.2em] text-black">
              PORTFOLIO INDEX
            </h4>
            <ul className="space-y-2.5 text-xs font-technical text-neutral-600">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 hover:text-black transition-colors"
                  >
                    <span className="text-[10px] font-mono text-neutral-400 group-hover:text-black transition-colors">
                      {link.num}
                    </span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct Reach (3 cols) */}
          <div
            className={`lg:col-span-3 space-y-4 transition-all duration-700 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-[11px] font-technical font-bold uppercase tracking-[0.2em] text-black">
              DIRECT REACH
            </h4>
            <ul className="space-y-3.5 text-xs font-sans">
              <li>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  Mobile / WhatsApp
                </span>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-black hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 group"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{phone}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>

              <li>
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  Email Correspondence
                </span>
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-black hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 group truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span className="truncate">{email}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>

              <li className="pt-1">
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-1">
                  Studio Schedule
                </span>
                <div className="flex items-center gap-1.5 text-neutral-600 font-technical text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Sun – Thu: 10:00 – 18:00 CLT</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Design Socials & Practice (2 cols) */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-400 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-[11px] font-technical font-bold uppercase tracking-[0.2em] text-black">
              DESIGN NETWORK
            </h4>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Explore ongoing construction updates, spatial photography, and visual moodboards.
            </p>

            <SocialLinks
              whatsappNumber={whatsappNumber}
              instagram={instagram}
              linkedin={linkedin}
              behance={behance}
              className="flex items-center gap-2 pt-1"
              iconClassName="w-4 h-4"
              itemClassName="w-9 h-9 rounded border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95"
            />

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-[11px] font-technical uppercase tracking-wider text-black font-semibold hover:underline"
              >
                <span>Chat Direct via WhatsApp</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Legal Bar */}
        <div
          className={`pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs font-technical text-neutral-500 text-center sm:text-left transition-all duration-700 delay-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            © {new Date().getFullYear()} {name} INTERIOR ARCHITECTURE. ALL RIGHTS RESERVED.
          </div>

          {/* Creator & Engineering Attribution */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-technical text-neutral-500">
            <span>Crafted with architectural precision by</span>
            <a
              href="https://ibrahim-nasser.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-mono font-bold text-black hover:text-neutral-600 transition-colors underline decoration-neutral-300 hover:decoration-black underline-offset-4"
              title="Visit Ibrahim Nasser Portfolio"
            >
              <span>Ibrahim Nasser</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-black transition-colors cursor-pointer active:scale-95 px-3 py-1.5 border border-neutral-200 hover:border-black rounded-xs bg-neutral-50 hover:bg-white"
          >
            <span className="tracking-widest uppercase font-medium">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}