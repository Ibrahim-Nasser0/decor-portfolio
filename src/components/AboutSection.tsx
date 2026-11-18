import React from "react";
import Image from "next/image";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { MapPin, Mail, MessageCircle, ArrowUpRight, CheckCircle2, Award } from "lucide-react";

export default function AboutSection({ profile }: { profile?: any }) {
  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Issa";
  const title = profile?.titleEn || DESIGNER_INFO.titleEn || "Interior Architect & Spatial Designer";
  const location = profile?.locationEn || DESIGNER_INFO.locationEn || "Cairo, Egypt";
  const email = profile?.email || DESIGNER_INFO.email;
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;
  const intro = profile?.aboutIntroEn || DESIGNER_INFO.aboutIntroEn;
  const experienceText = profile?.aboutExperienceEn || DESIGNER_INFO.aboutExperienceEn;
  return (
    <section id="about" className="py-16 sm:py-24 2xl:py-32 bg-white border-t border-neutral-200 relative">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 2xl:mb-20 pb-6 border-b border-black/10 gap-4 sm:gap-6">
          <div>
            <div className="text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              02 • ARCHITECTURAL PROFILE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              About Eng. Alaa Issa
            </h2>
          </div>
          <div className="text-[10px] sm:text-xs 2xl:text-sm font-technical text-neutral-500 text-start md:text-end uppercase tracking-widest">
            <div>CAIRO, EGYPT • ARCHITECTURE & INTERIOR DESIGN</div>
            <div className="text-neutral-400 mt-1">BACHELOR OF ARCHITECTURAL ENGINEERING</div>
          </div>
        </div>

        {/* 2-Column Monograph Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 2xl:gap-24 items-start">
          {/* Left Column (5 cols): Real Portrait Photo & Bio Card */}
          <div className="lg:col-span-5 space-y-6 2xl:space-y-8">
            <div className="relative mx-auto max-w-[280px] xs:max-w-xs sm:max-w-sm lg:max-w-none">
              {/* Outer decorative architectural outline */}
              <div className="absolute -inset-2.5 sm:-inset-4 2xl:-inset-5 border border-neutral-200 -z-10 pointer-events-none" />

              {/* Portrait Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-neutral-300 shadow-md group">
                <Image
                  src="/images/alaa2.webp"
                  alt="Eng. Alaa Issa - Interior Architect & Designer"
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, (max-width: 1536px) 500px, 650px"
                  className="object-cover object-top filter grayscale-15 group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                {/* Name Badge Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 2xl:bottom-5 start-3 sm:start-4 2xl:start-5 end-3 sm:end-4 2xl:end-5 text-white text-xs font-technical p-2.5 sm:p-3 2xl:p-4 backdrop-blur-xs bg-black/40 border border-white/20">
                  <div className="font-bold text-xs sm:text-sm 2xl:text-base font-editorial tracking-wider">
                    {name.toUpperCase()}
                  </div>
                  <div className="text-[9px] sm:text-[10px] 2xl:text-xs uppercase text-neutral-300 tracking-widest mt-0.5 truncate">
                    {title}
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Quick Contact Card */}
            <div className="p-4 sm:p-5 2xl:p-6 bg-neutral-50 border border-neutral-300 space-y-3 2xl:space-y-4 text-xs 2xl:text-sm font-technical">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-neutral-500 uppercase text-[10px] 2xl:text-xs">Based in:</span>
                <span className="font-bold text-black flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-neutral-700 shrink-0" />
                  <span className="truncate">{location} (Available Globally)</span>
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-neutral-500 uppercase text-[10px] 2xl:text-xs">Education:</span>
                <span className="font-medium text-black text-end truncate">
                  B.Sc. Architectural Engineering
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                <a
                  href={`mailto:${email}`}
                  className="text-neutral-700 hover:text-black font-mono text-[10px] sm:text-[11px] 2xl:text-xs flex items-center gap-1.5 transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
                  <span className="truncate">{email}</span>
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-[10px] sm:text-[11px] 2xl:text-xs uppercase tracking-wider flex items-center gap-1 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Biography, Philosophy & Architectural Pillars */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 2xl:space-y-10">
            <div className="space-y-3 sm:space-y-4 2xl:space-y-5">
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-[0.2em] font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 border border-neutral-200 inline-block">
                DESIGN ETHOS & PHILOSOPHY
              </span>

              <h3 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-editorial font-bold text-black tracking-tight leading-snug">
                Crafting meaningful spaces where structural logic meets innate artistic sensibility.
              </h3>

              <div className="w-16 sm:w-20 2xl:w-28 h-[1.5px] 2xl:h-[2px] bg-black my-3 sm:my-4 2xl:my-6" />

              <div className="space-y-3 sm:space-y-4 2xl:space-y-5 text-xs sm:text-sm 2xl:text-base text-neutral-700 leading-relaxed 2xl:leading-loose font-sans text-justify">
                <p>
                  As an Interior Architect, I am deeply driven by the dialogue between light, material materiality, and human wellbeing. Throughout my career, I have cultivated an uncompromising foundation in space planning, custom joinery detailing, architectural lux calculations, and 2D/3D visualization pipelines.
                </p>
                <p>
                  My practice spans bespoke residential retreats, private villas, and boutique hospitality spaces across Cairo, New Cairo, and Sheikh Zayed. I guide projects from initial spatial massing and photorealistic concept rendering through to comprehensive executive shop drawings and attentive on-site execution supervision.
                </p>
              </div>
            </div>

            {/* 4 Architectural Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 2xl:gap-6 pt-4 2xl:pt-6 border-t border-neutral-200">
              <div className="p-3.5 sm:p-4 2xl:p-6 bg-neutral-50/70 border border-neutral-200 space-y-1.5 2xl:space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-black shrink-0" />
                  <h4 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-wider text-black">
                    Spatial Ergonomics
                  </h4>
                </div>
                <p className="text-[11px] 2xl:text-xs text-neutral-600 font-sans leading-relaxed">
                  Rigorous circulation analysis ensuring every square meter is functional, serene, and naturally flowing.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 2xl:p-6 bg-neutral-50/70 border border-neutral-200 space-y-1.5 2xl:space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-black shrink-0" />
                  <h4 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-wider text-black">
                    Circadian Lighting
                  </h4>
                </div>
                <p className="text-[11px] 2xl:text-xs text-neutral-600 font-sans leading-relaxed">
                  Layered 3000K warm architectural lighting schemes engineered to elevate texture and promote calm.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 2xl:p-6 bg-neutral-50/70 border border-neutral-200 space-y-1.5 2xl:space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-black shrink-0" />
                  <h4 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-wider text-black">
                    Bespoke Millwork
                  </h4>
                </div>
                <p className="text-[11px] 2xl:text-xs text-neutral-600 font-sans leading-relaxed">
                  Tailored joinery detailing, acoustic wall fluting, and floating cabinetry executed with precision.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 2xl:p-6 bg-neutral-50/70 border border-neutral-200 space-y-1.5 2xl:space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-black shrink-0" />
                  <h4 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-wider text-black">
                    Zero-Gap Execution
                  </h4>
                </div>
                <p className="text-[11px] 2xl:text-xs text-neutral-600 font-sans leading-relaxed">
                  Millimeter-accurate shop drawings and direct on-site supervision ensuring real-world fidelity.
                </p>
              </div>
            </div>

            {/* Action link */}
            <div className="pt-2 2xl:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 2xl:gap-5">
              <a
                href="#skills"
                className="w-full sm:w-auto px-6 2xl:px-8 py-3.5 2xl:py-4 bg-black hover:bg-neutral-800 text-white text-xs 2xl:text-sm uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>View Skills & Toolset</span>
                <ArrowUpRight className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </a>

              <a
                href="#experience"
                className="w-full sm:w-auto px-6 2xl:px-8 py-3.5 2xl:py-4 border border-neutral-300 hover:border-black text-black text-xs 2xl:text-sm uppercase tracking-widest font-medium transition-colors text-center justify-center flex items-center"
              >
                Career & Experience
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
