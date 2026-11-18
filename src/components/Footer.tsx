"use client";

import React from "react";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { Phone, Mail, ArrowUp } from "lucide-react";
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

  return (
    <footer className="bg-white border-t border-neutral-300 pt-12 sm:pt-16 2xl:pt-24 pb-10 sm:pb-12 2xl:pb-16 relative text-black select-none">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 2xl:gap-14 pb-10 sm:pb-12 2xl:pb-16 border-b border-neutral-200">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 2xl:space-y-5">
            <a href="#hero" className="flex flex-col">
              <span className="text-xl sm:text-2xl 2xl:text-3xl font-editorial font-bold tracking-tight text-black uppercase">
                {name}
              </span>
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-widest text-neutral-500 mt-1">
                {title}
              </span>
            </a>

            <p className="text-xs 2xl:text-sm text-neutral-600 leading-relaxed max-w-sm 2xl:max-w-md font-sans">
              Architectural interior designer specializing in refined residential sanctuaries, bespoke furniture joinery, and attentive on-site execution supervision.
            </p>

            <div className="text-[11px] sm:text-xs 2xl:text-sm font-technical text-neutral-500 pt-1">
              {location}
            </div>

            {/* Social Icons (Behance, LinkedIn, Instagram, WhatsApp) */}
            <div className="pt-2">
              <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400 block mb-2.5">
                PORTFOLIO & SOCIAL CHANNELS
              </span>
              <SocialLinks
                whatsappNumber={whatsappNumber}
                instagram={instagram}
                linkedin={linkedin}
                behance={behance}
                className="flex items-center gap-2.5"
                iconClassName="w-4 h-4"
                itemClassName="w-9 h-9 rounded border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black mb-3 sm:mb-4 2xl:mb-5">
              PORTFOLIO INDEX
            </h4>
            <ul className="space-y-2 2xl:space-y-2.5 text-xs 2xl:text-sm font-technical text-neutral-600">
              <li>
                <a href="#hero" className="hover:text-black transition-colors">
                  01. HERO
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-black transition-colors">
                  02. ABOUT ME
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-black transition-colors">
                  03. SKILLS & TOOLSET
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-black transition-colors">
                  04. EXPERIENCE & EDUCATION
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-black transition-colors">
                  05. SELECTED WORKS
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black transition-colors">
                  06. DIRECT CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black mb-3 sm:mb-4 2xl:mb-5">
              DIRECT REACH
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 2xl:space-y-3.5 text-xs 2xl:text-sm font-sans">
              <li className="flex items-center gap-2 text-neutral-700">
                <Phone className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-black shrink-0" />
                <span dir="ltr" className="font-mono">{phone}</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-700">
                <Mail className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-black shrink-0" />
                <span className="font-mono truncate">{email}</span>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs 2xl:text-sm font-technical uppercase tracking-wider text-black font-bold hover:underline"
                >
                  <span>Open WhatsApp Direct</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 2xl:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs 2xl:text-sm font-technical text-neutral-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {name} INTERIOR DESIGN. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
