import React from "react";
import { DESIGNER_INFO } from "@/data/portfolioData";
import { Briefcase, GraduationCap, MapPin, Calendar, ArrowUpRight, Award } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-24 2xl:py-32 bg-[#faf9f6] border-t border-neutral-200 relative">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 2xl:mb-20 pb-6 border-b border-black/10 gap-4 sm:gap-6">
          <div>
            <div className="text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              04 • PROFESSIONAL CHRONOLOGY & BACKGROUND
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              Experience & Education
            </h2>
          </div>
          <p className="text-xs 2xl:text-sm text-neutral-500 max-w-sm 2xl:max-w-md">
            A track record of translating complex architectural concepts into refined built realities through disciplined practice.
          </p>
        </div>

        {/* 2-Column Monograph Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 2xl:gap-24 items-start">
          {/* Left Column (7 cols): Professional Experience Timeline */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 2xl:space-y-10">
            <div className="flex items-center gap-2.5 pb-4 border-b border-black">
              <Briefcase className="w-4 h-4 2xl:w-5 2xl:h-5 text-black shrink-0" />
              <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                Professional Practice History
              </h3>
            </div>

            <div className="space-y-6 sm:space-y-8 2xl:space-y-10 relative before:absolute before:inset-0 before:left-2.5 sm:before:left-3 before:w-[1px] before:bg-neutral-200">
              {DESIGNER_INFO.experience?.map((exp, idx) => (
                <div key={idx} className="relative pl-6 sm:pl-8 2xl:pl-10 space-y-2.5 sm:space-y-3 2xl:space-y-4 group">
                  {/* Timeline Dot */}
                  <div className="absolute left-[7px] sm:left-[9px] top-1.5 w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] sm:text-[11px] 2xl:text-xs font-technical uppercase font-bold text-black tracking-wider">
                      {exp.period}
                    </span>
                    <span className="text-[11px] sm:text-xs 2xl:text-sm font-technical text-neutral-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-neutral-400 shrink-0" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg 2xl:text-xl font-editorial font-bold text-black">
                      {exp.role}
                    </h4>
                    <div className="text-xs 2xl:text-sm font-technical text-neutral-600 font-medium">
                      {exp.company}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm 2xl:text-base text-neutral-600 leading-relaxed font-sans text-justify">
                    {exp.description}
                  </p>

                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-1">
                    {exp.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider px-2 2xl:px-3 py-0.5 2xl:py-1 bg-white border border-neutral-200 text-neutral-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Academic Education & Design Credo */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10 2xl:space-y-12">
            {/* Education Box */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-5 sm:space-y-6 2xl:space-y-8 shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 border-b border-black">
                <GraduationCap className="w-4 h-4 2xl:w-5 2xl:h-5 text-black shrink-0" />
                <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                  Academic Education & Credentials
                </h3>
              </div>

              <div className="space-y-5 sm:space-y-6 2xl:space-y-8">
                {DESIGNER_INFO.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1.5 pb-5 border-b border-neutral-100 last:border-none last:pb-0">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] 2xl:text-xs font-technical text-neutral-500">
                      <span>• {edu.year}</span>
                      <Award className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-neutral-400 shrink-0" />
                    </div>
                    <h4 className="text-xs sm:text-sm 2xl:text-base font-bold text-black font-sans leading-snug">
                      {edu.titleEn}
                    </h4>
                    <div className="text-xs 2xl:text-sm text-neutral-600 font-technical">
                      {edu.institutionEn}
                    </div>
                    <p className="text-[11px] 2xl:text-xs text-neutral-500 leading-relaxed font-sans pt-1">
                      {edu.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Statement Callout */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-4 2xl:space-y-5 shadow-xs">
              <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-widest text-neutral-400">
                ARCHITECTURAL ETHOS
              </span>
              <p className="text-xs sm:text-sm 2xl:text-base text-neutral-700 leading-relaxed font-serif italic text-justify">
                &ldquo;{DESIGNER_INFO.statementEn}&rdquo;
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-neutral-100 text-xs 2xl:text-sm font-technical flex-wrap gap-2">
                <span className="font-bold text-black">ENG. ALAA ISSA</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-black hover:underline uppercase tracking-wider font-semibold text-[11px] sm:text-xs 2xl:text-sm"
                >
                  <span>Request Full CV / PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
