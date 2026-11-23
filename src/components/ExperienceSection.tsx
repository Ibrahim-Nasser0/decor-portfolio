"use client";

import React, { useState, useEffect, useRef } from "react";
import { DESIGNER_INFO } from "@/data/portfolioData";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Sparkles,
  FileText,
  MessageCircle,
  Building2,
  Clock,
} from "lucide-react";

interface ExperienceItem {
  period?: string;
  role?: string;
  company?: string;
  location?: string;
  description?: string;
  skills?: string[] | string;
}

interface EducationItem {
  year?: string;
  titleEn?: string;
  institutionEn?: string;
  descEn?: string;
}

interface ExperienceSectionProps {
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    email?: string;
    whatsappNumber?: string;
    statementEn?: string;
    experience?: ExperienceItem[];
    education?: EducationItem[];
  };
}

export default function ExperienceSection({ profile }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic Content & Fallbacks
  const experience: ExperienceItem[] =
    profile?.experience && profile.experience.length > 0
      ? profile.experience
      : DESIGNER_INFO.experience || [];

  const education: EducationItem[] =
    profile?.education && profile.education.length > 0
      ? profile.education
      : DESIGNER_INFO.education || [];

  const name = profile?.nameEn || DESIGNER_INFO.nameEn || "Alaa Essa";
  const statement = profile?.statementEn || DESIGNER_INFO.statementEn;
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;

  // Viewport Observer & Scroll Parallax
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, currentDist / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = (scrollProgress - 0.5) * 30;

  // Helper: check if a role is actively ongoing (e.g. "PRESENT", "CURRENT", "حالي")
  const isCurrentRole = (period?: string): boolean => {
    if (!period) return false;
    const p = period.toUpperCase();
    return (
      p.includes("PRESENT") ||
      p.includes("CURRENT") ||
      p.includes("حالي") ||
      p.includes("NOW") ||
      p.includes("2026") ||
      p.includes("2027")
    );
  };

  // Helper: robust skills normalizer (array or comma-delimited string)
  const parseSkills = (skills?: string[] | string): string[] => {
    if (Array.isArray(skills)) return skills.filter(Boolean);
    if (typeof skills === "string") {
      return skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-16 sm:py-24 2xl:py-32 bg-[#faf9f6] border-t border-neutral-200 relative overflow-hidden select-none"
    >
      {/* Background Architectural Drafting Watermark */}
      <div
        className="absolute top-1/4 -right-12 text-[19vw] font-editorial font-black text-black/[0.015] pointer-events-none select-none -z-10 leading-none tracking-tighter"
        style={{ transform: `translateY(${parallaxOffset * 0.75}px)` }}
      >
        PRACTICE
      </div>

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header with Scroll Trigger */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 2xl:mb-20 pb-6 border-b border-black/10 gap-4 sm:gap-6 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-neutral-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>04 • PROFESSIONAL CHRONOLOGY & BACKGROUND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-editorial font-bold text-black tracking-tight">
              Experience & Education
            </h2>
          </div>
          <p className="text-xs 2xl:text-sm text-neutral-600 max-w-sm 2xl:max-w-md font-sans leading-relaxed">
            A track record of translating complex architectural concepts into refined built realities through disciplined practice.
          </p>
        </div>

        {/* 2-Column Monograph Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 2xl:gap-24 items-start">
          {/* Left Column (7 cols): Professional Experience Timeline */}
          <div
            className={`lg:col-span-7 space-y-6 sm:space-y-8 2xl:space-y-10 transition-all duration-700 ease-out delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Header Strip with Live Role Count */}
            <div className="flex items-center justify-between pb-4 border-b border-black">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 2xl:w-5 2xl:h-5 text-black shrink-0" />
                <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                  Professional Practice History
                </h3>
              </div>
              <span className="text-[10px] 2xl:text-xs font-mono bg-neutral-200/60 text-neutral-700 px-2.5 py-0.5 rounded">
                {String(experience.length).padStart(2, "0")} Appointments
              </span>
            </div>

            {/* Case: Empty State for Experience */}
            {experience.length === 0 ? (
              <div className="p-8 sm:p-12 bg-white border border-dashed border-neutral-300 rounded-2xl text-center space-y-3 shadow-xs">
                <Briefcase className="w-8 h-8 text-neutral-400 mx-auto" />
                <h4 className="text-sm font-technical uppercase font-bold text-black tracking-wider">
                  Chronology in Preparation
                </h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto font-sans leading-relaxed">
                  Professional appointments are being cataloged in the studio monograph. In the meantime, explore selected works.
                </p>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-xs font-technical uppercase tracking-wider text-black font-semibold hover:underline pt-2"
                >
                  <span>Explore Selected Works</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              /* Timeline Container with Continuous Architectural Spine */
              <div className="space-y-6 sm:space-y-8 2xl:space-y-10 relative before:absolute before:inset-0 before:left-3 sm:before:left-3.5 before:w-[2px] before:bg-gradient-to-b before:from-black before:via-neutral-300 before:to-transparent">
                {experience.map((exp: ExperienceItem, idx: number) => {
                  const current = isCurrentRole(exp.period);
                  const skillsList = parseSkills(exp.skills);

                  return (
                    <div
                      key={idx}
                      style={{ transitionDelay: `${250 + idx * 100}ms` }}
                      className={`relative pl-8 sm:pl-10 2xl:pl-12 group transition-all duration-500 ease-out ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    >
                      {/* Architectural Timeline Node Indicator */}
                      {current ? (
                        <div className="absolute left-1.5 sm:left-2 top-1.5 w-4 h-4 rounded-full bg-emerald-500/20 ring-2 ring-emerald-500 flex items-center justify-center transition-all group-hover:scale-125">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        </div>
                      ) : (
                        <div className="absolute left-2.5 sm:left-3 top-2 w-2 h-2 rounded-full bg-neutral-400 ring-2 ring-white group-hover:bg-black group-hover:scale-150 transition-all duration-300" />
                      )}

                      {/* Main Milestone Card with Elevated Hover Effect */}
                      <div className="p-5 sm:p-6 bg-white border border-neutral-300 rounded-2xl group-hover:border-black group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 space-y-3">
                        {/* Period & Location Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] sm:text-[11px] 2xl:text-xs font-technical uppercase font-bold text-black tracking-wider flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                              <span>{exp.period || "Undated Period"}</span>
                            </span>

                            {/* Active Practice Status Badge */}
                            {current && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-mono font-bold uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>Active Appointment</span>
                              </span>
                            )}
                          </div>

                          {exp.location && (
                            <span className="text-[11px] sm:text-xs font-technical text-neutral-500 flex items-center gap-1 shrink-0">
                              <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                              <span>{exp.location}</span>
                            </span>
                          )}
                        </div>

                        {/* Role Title & Firm Name */}
                        <div>
                          <h4 className="text-base sm:text-lg 2xl:text-xl font-editorial font-bold text-black group-hover:tracking-wide transition-all">
                            {exp.role || "Interior Architect"}
                          </h4>
                          {exp.company && (
                            <div className="text-xs 2xl:text-sm font-technical text-neutral-600 font-medium mt-0.5 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                              <span>{exp.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        {exp.description && (
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans text-justify">
                            {exp.description}
                          </p>
                        )}

                        {/* Skills / Scope Tags */}
                        {skillsList.length > 0 && (
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-2 border-t border-neutral-100">
                            {skillsList.map((skill: string, sIdx: number) => (
                              <span
                                key={sIdx}
                                className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-wider px-2.5 py-1 bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-md group-hover:border-neutral-400 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Academic Education & Design Credo */}
          <div
            className={`lg:col-span-5 space-y-6 sm:space-y-8 2xl:space-y-10 transition-all duration-700 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Education Box */}
            <div className="bg-white border border-neutral-300 rounded-3xl p-6 sm:p-8 2xl:p-10 space-y-6 shadow-xs hover:border-black transition-all duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-black">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 2xl:w-5 2xl:h-5 text-black shrink-0" />
                  <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                    Academic Credentials & Degrees
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                  {education.length} Programs
                </span>
              </div>

              {/* Case: Empty State for Education */}
              {education.length === 0 ? (
                <div className="p-6 bg-neutral-50 border border-dashed border-neutral-200 rounded-xl text-center space-y-2">
                  <GraduationCap className="w-6 h-6 text-neutral-400 mx-auto" />
                  <p className="text-xs text-neutral-600 font-sans">
                    Academic degrees are archived. Faculty of Fine Arts & Architectural Engineering.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {education.map((edu: EducationItem, idx: number) => (
                    <div
                      key={idx}
                      className="space-y-2 pb-5 border-b border-neutral-100 last:border-none last:pb-0"
                    >
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] 2xl:text-xs font-technical text-neutral-500">
                        <span className="font-mono font-bold text-black flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
                          <span>{edu.year || "Accredited"}</span>
                        </span>
                        <Award className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-500 shrink-0" />
                      </div>

                      <h4 className="text-xs sm:text-sm 2xl:text-base font-bold text-black font-sans leading-snug">
                        {edu.titleEn}
                      </h4>

                      {edu.institutionEn && (
                        <div className="text-xs 2xl:text-sm text-neutral-600 font-technical">
                          {edu.institutionEn}
                        </div>
                      )}

                      {edu.descEn && (
                        <p className="text-[11px] 2xl:text-xs text-neutral-500 leading-relaxed font-sans pt-0.5">
                          {edu.descEn}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Verified Credentials Seal */}
              <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between gap-3 text-[10px] 2xl:text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Architectural Engineering Bachelor</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 shrink-0">
                  HONORS
                </span>
              </div>
            </div>

            {/* Design Ethos & Direct Inbound Consultation Card */}
            <div className="bg-white border border-neutral-300 rounded-3xl p-6 sm:p-8 2xl:p-10 space-y-4 shadow-xs hover:border-black transition-all duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-technical uppercase tracking-widest text-neutral-400 font-semibold">
                  ARCHITECTURAL ETHOS
                </span>
                <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ENG. {name.toUpperCase()}
                </span>
              </div>

              <p className="text-xs sm:text-sm 2xl:text-base text-neutral-700 leading-relaxed font-serif italic text-justify">
                &ldquo;{statement}&rdquo;
              </p>

              <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello Eng. ${name}, I am interested in discussing an interior architecture consultation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-technical uppercase tracking-wider flex items-center justify-center gap-2 transition-colors active:scale-98"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Book Consultation</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-1.5 text-black hover:underline uppercase tracking-wider font-semibold text-[11px] sm:text-xs 2xl:text-sm py-2"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Request Full Portfolio / PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
