"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, DESIGNER_INFO, PROJECTS } from "@/data/portfolioData";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Maximize,
  Maximize2,
  Minimize2,
  Menu,
  Calendar,
  Compass,
  Check,
  MessageCircle,
  SlidersHorizontal,
  Mail,
  ArrowUpRight,
  X,
  Layers,
  Ruler,
  Lightbulb,
  ShieldCheck,
  Building2,
  Sparkles,
  Share2,
  Copy,
  Eye,
  CheckCircle2,
  Music,
} from "lucide-react";
import Footer from "@/components/Footer";
import AudioNavButton from "@/components/AudioNavButton";

interface ProjectDetailViewProps {
  project: Project;
  profile?: {
    nameEn?: string;
    titleEn?: string;
    locationEn?: string;
    avatarUrl?: string;
    email?: string;
    phone?: string;
    whatsappNumber?: string;
    instagram?: string;
    linkedin?: string;
    behance?: string;
  };
}

export default function ProjectDetailView({ project, profile }: ProjectDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"renders" | "before-after">("renders");
  const [selectedAngleIdx, setSelectedAngleIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [activePlanTab, setActivePlanTab] = useState<"ground" | "rcp" | "sections">("ground");
  const [blueprintTheme, setBlueprintTheme] = useState<"classic" | "cyanotype">("classic");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [cadModalOpen, setCadModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState<number | null>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Profile data resolution
  const brandName = profile?.nameEn || DESIGNER_INFO.nameEn || "ALAA ISSA";
  const avatarSrc = profile?.avatarUrl || "/images/alaa.webp";
  const whatsappNumber = profile?.whatsappNumber || DESIGNER_INFO.whatsappNumber;
  const titleShort = profile?.titleEn ? profile.titleEn.split('&')[0].trim().toUpperCase() : "INTERIOR ARCHITECT";
  const locationShort = profile?.locationEn ? profile.locationEn.split(',')[0].split('|')[0].trim().toUpperCase() : "CAIRO";
  const brandSubtitle = `${titleShort} • ${locationShort}`;

  // Pagination resolution
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  // Architectural Monograph Navigation Sections
  const projectNavLinks = [
    { id: "overview", href: "#overview", num: "01", labelEn: "Overview" },
    { id: "perspectives", href: "#perspectives", num: "02", labelEn: "Perspectives" },
    { id: "blueprints", href: "#blueprints", num: "03", labelEn: "Blueprints" },
    { id: "materials", href: "#materials", num: "04", labelEn: "Materials" },
    { id: "specs", href: "#specs", num: "05", labelEn: "Specifications" },
  ];

  // Scroll listener for sticky header & progress bar & active section tracking
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }

      // Track active section for monograph navbar
      const sections = ["overview", "perspectives", "blueprints", "materials", "specs"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle Share / Copy Link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Slider Mouse & Touch handlers
  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches[0].clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const angles = project.angles || project.gallery.map((img, i) => ({
    titleEn: `Perspective View ${i + 1}`,
    image: img,
  }));

  const activeImage = angles[selectedAngleIdx]?.image || project.coverImage;

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        setSelectedAngleIdx((prev) => (prev > 0 ? prev - 1 : angles.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedAngleIdx((prev) => (prev < angles.length - 1 ? prev + 1 : 0));
      }
    },
    [lightboxOpen, angles.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const whatsappMessage = encodeURIComponent(
    `Hello Eng. ${brandName}, I reviewed your architectural case study for "${project.titleEn}" (${project.area}, ${project.locationEn}) and would like to inquire about booking an architectural consultation for a similar project.`
  );

  const materials = project.materialSwatches || project.palette.map((c) => ({
    color: c,
    nameEn: "Architectural Custom Finish",
    finishEn: "Tailored Specification",
  }));

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-[#111111] antialiased flex flex-col justify-between">
      {/* 1. Intelligent Architectural Monograph Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mounted ? "animate-navbar-down" : "opacity-0 -translate-y-full"
        } ${
          isCompact || isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/10 py-2.5 sm:py-3 shadow-xs"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-200 py-3 sm:py-4.5"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Back to Works + Brand Capsule with Portrait & Pulse Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 border border-neutral-200 hover:border-black bg-neutral-50/80 hover:bg-black hover:text-white text-[10px] sm:text-xs font-technical uppercase tracking-wider text-neutral-700 transition-all duration-200 shrink-0 active:scale-95 shadow-2xs rounded-xs"
                title="Return to Works Index"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="hidden xs:inline">Works</span>
              </Link>

              <span className="h-4 w-px bg-neutral-300 hidden sm:inline-block shrink-0" />

              <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0 min-w-0">
                <div
                  className={`relative ${
                    isCompact ? "w-6 h-6 sm:w-8 sm:h-8" : "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
                  } rounded-full overflow-hidden border border-black/80 bg-neutral-100 shadow-xs group-hover:ring-2 group-hover:ring-black transition-all duration-300 shrink-0 group-hover:scale-105`}
                >
                  <Image
                    src={avatarSrc}
                    alt={`${brandName} - Interior Architect`}
                    fill
                    priority
                    sizes="36px"
                    className="object-cover object-top filter grayscale-15 group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`${
                        isCompact ? "text-xs sm:text-sm" : "text-xs sm:text-sm md:text-base"
                      } font-bold tracking-[0.12em] text-black font-editorial uppercase leading-tight group-hover:text-neutral-700 transition-colors truncate`}
                    >
                      {brandName}
                    </span>
                    <span className="relative flex h-2 w-2 items-center justify-center shrink-0" title="Available for projects">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AD1B8] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7AD1B8]"></span>
                    </span>
                  </div>
                  {!isCompact && (
                    <span className="text-[8px] sm:text-[9px] tracking-[0.16em] text-neutral-500 uppercase font-technical font-medium truncate hidden md:inline">
                      {brandSubtitle}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Center: Monograph Architectural Section Navigation (Desktop XL) */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-8">
              {projectNavLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 text-[10px] 2xl:text-xs uppercase tracking-[0.14em] font-technical transition-all duration-200 group flex items-center gap-1.5 ${
                      isActive ? "text-black font-bold" : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    <span
                      className={`text-[9px] 2xl:text-[10px] font-mono transition-colors duration-200 ${
                        isActive ? "text-black font-bold" : "text-neutral-400 group-hover:text-black"
                      }`}
                    >
                      {link.num}
                    </span>
                    <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                      {link.labelEn}
                    </span>

                    {/* Animated Underline */}
                    <span
                      className={`absolute -bottom-1 start-0 h-[1.5px] bg-black transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right: Ambient Audio Controller + Share Monograph + Mobile Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 2xl:gap-3 shrink-0">
              {/* Desktop Ambient Audio Controller */}
              <div className="hidden sm:inline-flex">
                <AudioNavButton />
              </div>

              {/* Share Monograph Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-neutral-300 hover:border-black rounded-sm text-neutral-700 hover:text-black text-[10px] sm:text-[11px] font-technical uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer bg-neutral-50 hover:bg-white shadow-2xs"
                title="Share Monograph Link"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 animate-scale-check" />
                    <span className="hidden sm:inline text-emerald-700 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-neutral-600" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>

              {/* Mobile Controls: Audio + Hamburger */}
              <div className="flex items-center gap-1.5 xl:hidden">
                <div className="sm:hidden">
                  <AudioNavButton showVolumeSlider={false} />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 sm:p-2 border border-black/10 hover:border-black text-black transition-colors rounded-xs active:scale-95"
                  aria-label={mobileMenuOpen ? "Close section navigation" : "Open section navigation"}
                >
                  {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Reading Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-100 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Mobile Fullscreen Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-0 top-[56px] sm:top-[64px] z-40 bg-white/98 backdrop-blur-md flex flex-col justify-between p-6 sm:p-8 border-b border-black/10 animate-in fade-in slide-in-from-top-4 duration-200 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <span className="text-[10px] font-technical uppercase tracking-widest text-neutral-400">
                  MONOGRAPH SECTIONS
                </span>
                <span className="text-xs font-mono text-neutral-600 truncate max-w-[180px]">
                  {project.titleEn}
                </span>
              </div>

              <nav className="flex flex-col space-y-4">
                {projectNavLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-2 text-base font-editorial tracking-wide transition-colors ${
                        isActive ? "text-black font-bold" : "text-neutral-500 hover:text-black"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-neutral-400">{link.num}</span>
                        <span>{link.labelEn}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-300" />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Atmosphere Audio Sound Controller in Mobile Drawer */}
            <div className="p-3 bg-neutral-50 border border-neutral-200/90 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Music className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-technical uppercase tracking-wider font-bold text-black">
                    Atmosphere Audio
                  </span>
                  <span className="text-[9px] text-neutral-500 font-editorial">
                    Erik Satie • Classical Piano
                  </span>
                </div>
              </div>
              <AudioNavButton showVolumeSlider={false} />
            </div>

            <div className="pt-6 border-t border-neutral-200 space-y-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-black text-white text-xs font-technical uppercase tracking-widest font-medium flex items-center justify-center gap-2 active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-[#7AD1B8]" />
                <span>Discuss Project on WhatsApp</span>
              </a>

              <Link
                href="/#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 border border-neutral-300 text-neutral-700 hover:border-black text-xs font-technical uppercase tracking-widest font-medium flex items-center justify-center gap-2 active:scale-98"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Works</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to offset fixed header */}
      <div
        className={`w-full transition-all duration-300 pointer-events-none ${
          isCompact ? "h-14 sm:h-16" : "h-16 sm:h-20"
        }`}
        aria-hidden="true"
      />

      {/* Main Content Monograph */}
      <main className="flex-1 max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14 2xl:space-y-20 w-full">
        {/* Monograph Spread Header */}
        <div id="overview" className="scroll-mt-24 space-y-4 sm:space-y-6 pb-6 sm:pb-8 border-b border-black/15 animate-hero-entrance">
          {/* Top Breadcrumb & Attribution Pill Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-xs font-technical uppercase tracking-wider text-neutral-500">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-black bg-neutral-100 px-2.5 py-1 border border-neutral-300 tracking-[0.2em]">
                ARCHITECTURAL CASE STUDY
              </span>
              <span className="px-2.5 py-1 border border-neutral-300 text-neutral-700 font-semibold tracking-wider">
                {project.categoryLabelEn || project.category}
              </span>
              <span className="text-neutral-400 font-mono hidden sm:inline">
                SCALE 1:50 • MONOGRAPH ARCHIVE
              </span>
            </div>

            {/* Practice / Firm Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-wider shadow-xs">
              <Building2 className="w-3 h-3 text-[#7AD1B8]" />
              <span>{project.firmEn || project.specs?.firmEn || "Freelance Practice"}</span>
            </div>
          </div>

          {/* Monumental Headline */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-editorial font-bold text-black tracking-tight leading-[1.05] max-w-4xl">
              {project.titleEn}
            </h1>

            <div className="shrink-0 flex items-center gap-2 sm:gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-5 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-technical uppercase tracking-widest font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-xs active:scale-98"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#7AD1B8]" />
                <span>Discuss Similar Space</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* 6-Metric Responsive Drafting Grid Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-5 bg-neutral-50 border border-neutral-300 text-xs font-technical shadow-xs">
            {/* 1. Location */}
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest block truncate">Location</span>
              <span className="font-bold text-black flex items-center gap-1.5 text-xs sm:text-sm">
                <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span className="truncate">{project.locationEn}</span>
              </span>
            </div>

            {/* 2. Floor Area */}
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest block truncate">Floor Area</span>
              <span className="font-bold text-black flex items-center gap-1.5 text-xs sm:text-sm">
                <Maximize className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span>{project.area}</span>
              </span>
            </div>

            {/* 3. Year */}
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest block truncate">Completion Year</span>
              <span className="font-bold text-black flex items-center gap-1.5 text-xs sm:text-sm">
                <Calendar className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span>{project.year}</span>
              </span>
            </div>

            {/* 4. Practice / Firm */}
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest block truncate">Practice / Firm</span>
              <span className="font-bold text-black flex items-center gap-1.5 text-xs sm:text-sm">
                <Building2 className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span className="truncate">{project.firmEn || project.specs?.firmEn || "Freelance Practice"}</span>
              </span>
            </div>

            {/* 5. Style */}
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest block truncate">Architectural Style</span>
              <span className="font-bold text-black flex items-center gap-1.5 text-xs sm:text-sm">
                <Compass className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span className="truncate">{project.styleEn}</span>
              </span>
            </div>

            {/* 6. Scope */}
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest block truncate">Execution Scope</span>
              <span className="font-bold text-black flex items-center gap-1.5 text-xs sm:text-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span className="truncate">Turnkey Handover</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Monograph Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 2xl:gap-16 items-start">
          {/* Left Column (6 cols): Visual Renders, Before/After Slider, Story, Technical Specs */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            {/* Monograph Section 02: Perspectives & Visual Studies */}
            <div id="perspectives" className="scroll-mt-24 space-y-4">
              {/* View Selector Tabs */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div className="flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-technical uppercase tracking-wider sm:tracking-widest">
                  <button
                    onClick={() => setActiveTab("renders")}
                    className={`font-bold pb-1 transition-colors cursor-pointer ${
                      activeTab === "renders"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    3D Perspectives ({angles.length})
                  </button>

                  {project.beforeImage && (
                    <button
                      onClick={() => setActiveTab("before-after")}
                      className={`font-bold pb-1 transition-colors flex items-center gap-1.5 cursor-pointer ${
                        activeTab === "before-after"
                          ? "text-black border-b-2 border-black"
                          : "text-neutral-400 hover:text-black"
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Before / After</span>
                    </button>
                  )}
                </div>

                <span className="text-[9px] sm:text-[10px] font-technical uppercase tracking-wider text-neutral-400">
                  {activeTab === "renders" ? `${selectedAngleIdx + 1}/${angles.length}` : "Interactive Slider"}
                </span>
              </div>

            {/* Visual Display */}
            {activeTab === "renders" ? (
              <div className="space-y-3 sm:space-y-4">
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="relative aspect-[16/11] sm:aspect-[4/3] w-full bg-neutral-100 overflow-hidden border border-neutral-300 shadow-sm group cursor-zoom-in"
                  title="Click to view full screen"
                >
                  <Image
                    src={activeImage}
                    alt={angles[selectedAngleIdx]?.titleEn || project.titleEn}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-104"
                  />

                  {/* Top-Right Fullscreen Zoom Pill */}
                  <div className="absolute top-3 end-3 px-2.5 py-1.5 bg-black/70 hover:bg-black text-white text-[10px] font-technical uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-xs transition-colors shadow-xs">
                    <Maximize2 className="w-3 h-3 text-[#7AD1B8]" />
                    <span>Zoom Perspective</span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3 sm:bottom-4 start-3 sm:start-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/95 text-[10px] sm:text-[11px] font-editorial uppercase tracking-wider sm:tracking-widest text-black shadow-xs border border-black/10">
                    {angles[selectedAngleIdx]?.titleEn || "PERSPECTIVE VIEW"}
                  </div>
                </div>

                {/* Thumbnails Grid */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {angles.map((angle, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAngleIdx(idx)}
                      className={`relative aspect-[4/3] border overflow-hidden transition-all cursor-pointer ${
                        selectedAngleIdx === idx
                          ? "border-black ring-2 ring-black"
                          : "border-neutral-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={angle.image} alt={angle.titleEn} fill sizes="120px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Before / After Slider with Clip-Path & Touch Events */
              <div className="space-y-3">
                <div
                  onMouseMove={handleSliderMove}
                  onTouchMove={handleTouchMove}
                  onTouchStart={handleTouchMove}
                  className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden border border-neutral-300 select-none cursor-ew-resize bg-neutral-100 shadow-sm touch-none"
                >
                  {/* After Image (Background) */}
                  <Image
                    src={project.coverImage}
                    alt="Final Execution"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover pointer-events-none"
                  />
                  <div className="absolute top-3 end-3 px-2 py-0.5 sm:py-1 bg-black text-white text-[9px] sm:text-[10px] font-technical uppercase tracking-wider">
                    After: Photorealistic Execution
                  </div>

                  {/* Before Image (Clipped Overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <Image
                      src={project.beforeImage || project.coverImage}
                      alt="Initial Concept Massing"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute top-3 start-3 px-2 py-0.5 sm:py-1 bg-white text-black border border-black text-[9px] sm:text-[10px] font-technical uppercase tracking-wider">
                      Before: Concept Massing
                    </div>
                  </div>

                  {/* Divider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-white shadow-md pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black border-2 border-white flex items-center justify-center text-white text-[10px] font-mono shadow-lg">
                      ↔
                    </div>
                  </div>
                </div>
                <div className="text-[10px] sm:text-[11px] font-technical text-neutral-500 text-center">
                  Drag horizontal slider or swipe with finger to compare conceptual massing with final photorealistic finish
                </div>
              </div>
            )}
            </div>

            {/* Monograph Section 05: Technical Specifications & Intervention Story */}
            <div id="specs" className="scroll-mt-24 space-y-8 sm:space-y-10">
              {/* Spatial Challenge vs Architectural Solution (The Story) */}
              {(project.challengeEn || project.solutionEn) && (
                <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 space-y-5 shadow-xs transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
                    <Lightbulb className="w-4 h-4 text-black shrink-0" />
                    <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                      Spatial Challenge &amp; Architectural Intervention
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-2">
                      <span className="text-[10px] font-technical font-bold uppercase tracking-widest text-neutral-500 block">
                        The Challenge
                      </span>
                      <p className="text-xs sm:text-[13px] text-neutral-700 font-sans leading-relaxed text-justify">
                        {project.challengeEn}
                      </p>
                    </div>

                    <div className="p-4 bg-neutral-900 text-white space-y-2">
                      <span className="text-[10px] font-technical font-bold uppercase tracking-widest text-neutral-400 block">
                        Architectural Solution
                      </span>
                      <p className="text-xs sm:text-[13px] text-neutral-200 font-sans leading-relaxed text-justify">
                        {project.solutionEn}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Specifications Matrix */}
              {project.specs && (
                <div className="bg-neutral-50 border border-neutral-300 p-5 sm:p-6 2xl:p-8 space-y-4 shadow-xs transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                      Technical Specifications &amp; Metrics
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400">SPEC MATRIX</span>
                  </div>
                  <div className="space-y-2.5 sm:space-y-3 text-xs 2xl:text-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-neutral-200 gap-0.5">
                      <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Scope of Services:</span>
                      <span className="font-medium text-black text-start sm:text-end">{project.specs.scopeEn}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-neutral-200 gap-0.5">
                      <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Design &amp; Execution Duration:</span>
                      <span className="font-medium text-black text-start sm:text-end">{project.specs.durationEn}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-neutral-200 gap-0.5">
                      <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Lighting Architecture:</span>
                      <span className="font-medium text-black text-start sm:text-end">{project.specs.lightingEn}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-neutral-200 gap-0.5">
                      <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Primary Flooring:</span>
                      <span className="font-medium text-black text-start sm:text-end">{project.specs.flooringEn}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1.5 gap-0.5">
                      <span className="font-technical text-neutral-500 uppercase text-[10px] 2xl:text-xs">Custom Millwork &amp; Joinery:</span>
                      <span className="font-medium text-black text-start sm:text-end">{project.specs.joineryEn}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (6 cols): Blueprints, Materials, Concept, Delivered Items */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            {/* Monograph Section 03: Executive CAD Blueprint Viewer with Theme Toggle & Zoom Modal */}
            <div id="blueprints" className="scroll-mt-24 bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 shadow-xs space-y-4 transition-all duration-300 hover:shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => setActivePlanTab("ground")}
                    className={`text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest font-bold pb-1 transition-colors cursor-pointer ${
                      activePlanTab === "ground"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    Ground Level
                  </button>
                  <button
                    onClick={() => setActivePlanTab("rcp")}
                    className={`text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest font-bold pb-1 transition-colors cursor-pointer ${
                      activePlanTab === "rcp"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    Ceiling (RCP)
                  </button>
                  <button
                    onClick={() => setActivePlanTab("sections")}
                    className={`text-[11px] sm:text-xs 2xl:text-sm font-technical uppercase tracking-wider sm:tracking-widest font-bold pb-1 transition-colors cursor-pointer ${
                      activePlanTab === "sections"
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    Sections AA/BB
                  </button>
                </div>

                {/* Blueprint Mode & Zoom Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBlueprintTheme(blueprintTheme === "classic" ? "cyanotype" : "classic")}
                    className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider border border-neutral-200 hover:border-black rounded-xs transition-colors cursor-pointer"
                    title="Toggle Canvas Theme"
                  >
                    {blueprintTheme === "classic" ? "Cyanotype Mode" : "Paper Mode"}
                  </button>
                  <button
                    onClick={() => setCadModalOpen(true)}
                    className="p-1 border border-neutral-200 hover:border-black rounded-xs transition-colors cursor-pointer"
                    title="Expand Blueprint Sheet"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-neutral-600" />
                  </button>
                </div>
              </div>

              {/* Vector Architectural Blueprint SVG with Cartouche */}
              <div
                className={`relative aspect-[16/10] sm:aspect-[16/9] w-full border border-neutral-300 p-2 sm:p-3 overflow-hidden flex items-center justify-center shadow-inner transition-colors duration-300 ${
                  blueprintTheme === "cyanotype" ? "bg-[#0c1f38] text-cyan-200" : "bg-[#fafafa] text-neutral-800"
                }`}
              >
                {/* Architectural Coordinate Border (Grid Ticks) */}
                <div className="absolute top-1 left-3 text-[8px] font-mono opacity-50 pointer-events-none">A1</div>
                <div className="absolute top-1 right-3 text-[8px] font-mono opacity-50 pointer-events-none">B1</div>
                <div className="absolute bottom-1 left-3 text-[8px] font-mono opacity-50 pointer-events-none">A2</div>
                <div className="absolute bottom-1 right-3 text-[8px] font-mono opacity-50 pointer-events-none">B2</div>

                {activePlanTab === "ground" && (
                  <svg className="w-full h-full" viewBox="0 0 800 450" fill="none">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke={blueprintTheme === "cyanotype" ? "#1a365d" : "#f0f0f0"}
                          strokeWidth="0.8"
                        />
                      </pattern>
                    </defs>
                    <rect width="800" height="450" fill="url(#grid)" />

                    {/* Outer Structural Walls */}
                    <rect x="40" y="30" width="720" height="390" stroke="currentColor" strokeWidth="4" fill="none" />
                    
                    {/* Interior Partition Walls */}
                    <line x1="310" y1="30" x2="310" y2="340" stroke="currentColor" strokeWidth="3" />
                    <line x1="310" y1="210" x2="520" y2="210" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="520" y1="130" x2="520" y2="340" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="520" y1="340" x2="680" y2="340" stroke="currentColor" strokeWidth="2.5" />
                    
                    {/* Door Swing Arcs */}
                    <path d="M 310 110 A 50 50 0 0 1 260 160" stroke="currentColor" opacity="0.6" strokeWidth="1" strokeDasharray="3 2" fill="none" />
                    <line x1="310" y1="110" x2="260" y2="110" stroke="currentColor" strokeWidth="1.5" />

                    {/* Windows */}
                    <line x1="120" y1="30" x2="250" y2="30" stroke="currentColor" strokeWidth="6" strokeDasharray="8 4" />
                    <line x1="400" y1="30" x2="620" y2="30" stroke="currentColor" strokeWidth="6" strokeDasharray="8 4" />

                    {/* Section Cutting Line AA' */}
                    <line x1="10" y1="190" x2="780" y2="190" stroke="currentColor" strokeWidth="1.2" strokeDasharray="14 4 2 4" />
                    <text x="12" y="185" fontSize="11" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">AA&apos;</text>
                    <text x="765" y="185" fontSize="11" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">AA&apos;</text>

                    {/* Furniture Layout */}
                    <path d="M 100 160 L 100 320 L 250 320" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <rect x="130" y="210" width="80" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                    <circle cx="170" cy="235" r="8" stroke="currentColor" strokeWidth="1" />
                    <rect x="320" y="90" width="16" height="100" stroke="currentColor" strokeWidth="1.5" fill={blueprintTheme === "cyanotype" ? "#1e3a5f" : "#e2e2e2"} />

                    {/* Space Labels */}
                    <text x="110" y="270" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="currentColor" opacity="0.75" fontWeight="bold">LIVING SALON [45 m²]</text>
                    <text x="350" y="145" fontSize="10" fontFamily="sans-serif" letterSpacing="1.5" fill="currentColor" opacity="0.75">FLUTED MEDIA WALL</text>
                    <text x="545" y="175" fontSize="11" fontFamily="sans-serif" letterSpacing="2" fill="currentColor" opacity="0.75" fontWeight="bold">DINING &amp; FOYER [30 m²]</text>

                    {/* Dimension String Callouts */}
                    <line x1="40" y1="435" x2="310" y2="435" stroke="currentColor" opacity="0.5" strokeWidth="1" />
                    <text x="160" y="445" fontSize="9" fontFamily="sans-serif" fill="currentColor" opacity="0.6">540 cm</text>
                    <line x1="310" y1="435" x2="760" y2="435" stroke="currentColor" opacity="0.5" strokeWidth="1" />
                    <text x="520" y="445" fontSize="9" fontFamily="sans-serif" fill="currentColor" opacity="0.6">720 cm</text>

                    {/* Architectural Title Block (Cartouche) */}
                    <g transform="translate(560, 310)">
                      <rect x="0" y="0" width="190" height="100" fill={blueprintTheme === "cyanotype" ? "#081526" : "#ffffff"} stroke="currentColor" strokeWidth="1.5" />
                      <line x1="0" y1="25" x2="190" y2="25" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="50" x2="190" y2="50" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="75" x2="190" y2="75" stroke="currentColor" strokeWidth="1" />
                      <line x1="95" y1="75" x2="95" y2="100" stroke="currentColor" strokeWidth="1" />
                      <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">ALAA ISSA PRACTICE</text>
                      <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.8">DWG: GROUND LEVEL PLAN</text>
                      <text x="10" y="67" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.6">SCALE: 1:50 • LEVEL +0.00</text>
                      <text x="10" y="92" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">APPROVED</text>
                      <text x="105" y="92" fontSize="7" fontFamily="sans-serif" fill="currentColor" opacity="0.6">SHEET 01/04</text>
                    </g>
                  </svg>
                )}

                {activePlanTab === "rcp" && (
                  <svg className="w-full h-full" viewBox="0 0 800 450" fill="none">
                    <rect width="800" height="450" fill="none" />
                    <rect x="40" y="30" width="720" height="390" stroke="currentColor" strokeWidth="3" fill="none" />

                    {/* Dropped Ceiling Perimeter Coves (Hidden LED) */}
                    <rect x="60" y="50" width="680" height="350" stroke="#e0a96d" strokeWidth="2.5" strokeDasharray="6 3" fill="none" />
                    <text x="75" y="70" fontSize="9" fontFamily="sans-serif" fill="#e0a96d" fontWeight="bold">3000K INDIRECT COVE [1200 LUX]</text>

                    {/* Downlight Grid Points */}
                    <circle cx="160" cy="140" r="4" fill="currentColor" />
                    <circle cx="260" cy="140" r="4" fill="currentColor" />
                    <circle cx="160" cy="240" r="4" fill="currentColor" />
                    <circle cx="260" cy="240" r="4" fill="currentColor" />
                    <text x="140" y="160" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.6">DL-01 (15° SPOT)</text>

                    {/* Dining Chandelier Accent */}
                    <circle cx="580" cy="200" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
                    <circle cx="580" cy="200" r="3" fill="currentColor" />
                    <text x="540" y="240" fontSize="9" fontFamily="sans-serif" fill="currentColor" fontWeight="bold">PENDANT ACCENT</text>

                    {/* Cartouche */}
                    <g transform="translate(560, 310)">
                      <rect x="0" y="0" width="190" height="100" fill={blueprintTheme === "cyanotype" ? "#081526" : "#ffffff"} stroke="currentColor" strokeWidth="1.5" />
                      <line x1="0" y1="25" x2="190" y2="25" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="50" x2="190" y2="50" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="75" x2="190" y2="75" stroke="currentColor" strokeWidth="1" />
                      <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">ALAA ISSA PRACTICE</text>
                      <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.8">DWG: REFLECTED CEILING (RCP)</text>
                      <text x="10" y="67" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.6">LIGHTING CIRCUITS A/B/C</text>
                      <text x="10" y="92" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">APPROVED</text>
                    </g>
                  </svg>
                )}

                {activePlanTab === "sections" && (
                  <svg className="w-full h-full" viewBox="0 0 800 450" fill="none">
                    <rect width="800" height="450" fill="none" />
                    
                    <g transform="translate(30, 40)">
                      <text x="0" y="0" fontSize="11" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">CROSS SECTION AA&apos; (CLEAR HEIGHT 3.20m)</text>
                      <rect x="0" y="20" width="480" height="240" stroke="currentColor" strokeWidth="2" fill={blueprintTheme === "cyanotype" ? "#0f2747" : "#fff"} />
                      
                      {/* Ceiling & Floor Slabs */}
                      <rect x="-10" y="10" width="500" height="10" fill="currentColor" opacity="0.8" />
                      <rect x="-10" y="260" width="500" height="12" fill="currentColor" opacity="0.8" />
                      
                      {/* Dropped Ceiling Details */}
                      <rect x="20" y="40" width="440" height="15" fill={blueprintTheme === "cyanotype" ? "#1e3a5f" : "#f0ece1"} stroke="currentColor" strokeWidth="1" />
                      <line x1="20" y1="55" x2="460" y2="55" stroke="#e0a96d" strokeWidth="2" />
                      <text x="35" y="52" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.7">SUSPENDED GYPSUM COVE [-20cm]</text>
                      
                      {/* Fluted Media Unit Joinery Elevation */}
                      <rect x="60" y="90" width="180" height="170" fill={blueprintTheme === "cyanotype" ? "#163355" : "#ece4db"} stroke="currentColor" strokeWidth="1.5" />
                      <line x1="60" y1="180" x2="240" y2="180" stroke="currentColor" strokeWidth="1.5" />
                      <text x="80" y="140" fontSize="9" fontFamily="sans-serif" fill="currentColor" fontWeight="bold">FLUTED WALNUT PANEL</text>
                      <text x="95" y="220" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.7">FLOATING BENCH</text>
                      
                      {/* Dimension Height Strings */}
                      <line x1="-15" y1="20" x2="-15" y2="260" stroke="currentColor" opacity="0.5" strokeWidth="1" />
                      <text x="-35" y="145" fontSize="9" fontFamily="sans-serif" fill="currentColor" opacity="0.7">320</text>
                    </g>

                    {/* Cartouche */}
                    <g transform="translate(560, 310)">
                      <rect x="0" y="0" width="190" height="100" fill={blueprintTheme === "cyanotype" ? "#081526" : "#ffffff"} stroke="currentColor" strokeWidth="1.5" />
                      <line x1="0" y1="25" x2="190" y2="25" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="50" x2="190" y2="50" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="75" x2="190" y2="75" stroke="currentColor" strokeWidth="1" />
                      <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">ALAA ISSA PRACTICE</text>
                      <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.8">DWG: VERTICAL SECTIONS</text>
                      <text x="10" y="67" fontSize="8" fontFamily="sans-serif" fill="currentColor" opacity="0.6">MILLWORK REVEAL 1:10</text>
                      <text x="10" y="92" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">APPROVED</text>
                    </g>
                  </svg>
                )}
              </div>
            </div>

            {/* Monograph Section 04: The Material Palette & Tactile Curation */}
            <div id="materials" className="scroll-mt-24 bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-5 shadow-xs transition-all duration-300 hover:shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                  Material Palette &amp; Tactile Curation
                </h3>
                <span className="text-[10px] font-mono text-neutral-400">FINISH SCHEDULE</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans text-justify">
                {project.materialsDescriptionEn ||
                  "Centered around richly veined natural stone, warm architectural timber, and bespoke wall finishes. Soft ambient lighting enhances tactile textures while providing visual balance and spatial calm."}
              </p>

              {/* Swatch chips with real architectural trade names */}
              <div className="space-y-2.5 pt-2">
                {materials.map((swatch, idx) => {
                  const isSelected = selectedSwatchIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedSwatchIdx(idx)}
                      className={`p-3 border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-neutral-100 border-black shadow-xs translate-x-1"
                          : "bg-neutral-50 border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          style={{ backgroundColor: swatch.color }}
                          className="w-6 h-6 rounded-full border border-black/20 shrink-0 shadow-xs"
                        />
                        <div>
                          <span className="font-bold text-xs 2xl:text-sm text-black font-sans block">
                            {swatch.nameEn}
                          </span>
                          <span className="text-[10px] 2xl:text-xs text-neutral-500 font-technical">
                            {swatch.finishEn}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase shrink-0">
                        {swatch.color}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Design Thesis & Spatial Circulation */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-3 shadow-xs transition-all duration-300 hover:shadow-sm">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <Compass className="w-4 h-4 text-black shrink-0" />
                <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black">
                  Design Thesis &amp; Spatial Circulation
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans text-justify">
                {project.conceptEn || project.descriptionEn}
              </p>
            </div>

            {/* Delivered Specifications Checklist */}
            <div className="bg-white border border-neutral-300 p-5 sm:p-7 md:p-8 2xl:p-10 space-y-4 shadow-xs transition-all duration-300 hover:shadow-sm">
              <h3 className="text-xs 2xl:text-sm font-technical font-bold uppercase tracking-widest text-black pb-2 border-b border-neutral-200">
                Delivered Architectural Specifications &amp; Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {project.featuresEn.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs 2xl:text-sm text-neutral-700">
                    <Check className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-black shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project to Project Bottom Pagination (With Visual Cover Thumbnails) */}
        <div className="pt-8 sm:pt-12 2xl:pt-16 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 2xl:gap-8">
          {/* Previous Project Card */}
          <Link
            href={`/projects/${prevProject.id}`}
            className="p-4 sm:p-5 2xl:p-6 border border-neutral-200 hover:border-black transition-all flex items-center gap-4 group bg-neutral-50/50 hover:bg-white shadow-2xs hover:shadow-xs active:scale-98"
          >
            <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-xs overflow-hidden border border-neutral-300 shrink-0">
              <Image
                src={prevProject.coverImage}
                alt={prevProject.titleEn}
                fill
                sizes="80px"
                className="object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-technical uppercase tracking-widest text-neutral-400 mb-0.5">
                <ArrowLeft className="w-3 h-3 text-neutral-400 group-hover:text-black transition-transform group-hover:-translate-x-1" />
                <span>Previous Project</span>
              </div>
              <span className="text-xs sm:text-sm font-editorial font-bold text-black group-hover:underline truncate block">
                {prevProject.titleEn}
              </span>
              <span className="text-[10px] font-technical text-neutral-500 block truncate">
                {prevProject.categoryLabelEn || prevProject.category} • {prevProject.area}
              </span>
            </div>
          </Link>

          {/* Next Project Card */}
          <Link
            href={`/projects/${nextProject.id}`}
            className="p-4 sm:p-5 2xl:p-6 border border-neutral-200 hover:border-black transition-all flex items-center justify-between gap-4 group bg-neutral-50/50 hover:bg-white text-right shadow-2xs hover:shadow-xs active:scale-98"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-end gap-1.5 text-[9px] sm:text-[10px] font-technical uppercase tracking-widest text-neutral-400 mb-0.5">
                <span>Next Project</span>
                <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-1" />
              </div>
              <span className="text-xs sm:text-sm font-editorial font-bold text-black group-hover:underline truncate block">
                {nextProject.titleEn}
              </span>
              <span className="text-[10px] font-technical text-neutral-500 block truncate">
                {nextProject.categoryLabelEn || nextProject.category} • {nextProject.area}
              </span>
            </div>
            <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-xs overflow-hidden border border-neutral-300 shrink-0">
              <Image
                src={nextProject.coverImage}
                alt={nextProject.titleEn}
                fill
                sizes="80px"
                className="object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>
          </Link>
        </div>

        {/* Consultation Callout Banner */}
        <div className="p-6 sm:p-10 md:p-12 bg-neutral-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[9px] sm:text-[10px] font-technical uppercase tracking-widest text-neutral-400">
              COMMISSION AN ARCHITECTURAL SPACE
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-editorial font-bold">
              Ready to create a space of timeless elegance?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Schedule a discovery session directly with Eng. {brandName} to review your floor plans, space ergonomics, and material selections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-black hover:bg-neutral-100 text-xs font-technical uppercase tracking-widest font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>

            <Link
              href="/#contact"
              className="w-full sm:w-auto px-6 py-3.5 border border-white/30 hover:border-white text-white text-xs font-technical uppercase tracking-widest font-medium transition-all active:scale-95 text-center justify-center flex items-center"
            >
              Inquiry Form
            </Link>
          </div>
        </div>
      </main>

      {/* Unified Luxury Footer Component */}
      <Footer profile={profile} />

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white text-xs font-technical uppercase tracking-widest border-b border-white/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-bold font-editorial text-sm tracking-wider">
                {project.titleEn}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-300">
                {angles[selectedAngleIdx]?.titleEn}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono text-neutral-400">
                {selectedAngleIdx + 1} / {angles.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image View */}
          <div className="relative flex-1 w-full max-w-6xl mx-auto my-4 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[80vh]">
              <Image
                src={angles[selectedAngleIdx]?.image || project.coverImage}
                alt={angles[selectedAngleIdx]?.titleEn || project.titleEn}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={() =>
                setSelectedAngleIdx((prev) => (prev > 0 ? prev - 1 : angles.length - 1))
              }
              className="absolute start-2 sm:start-6 p-3 bg-black/50 hover:bg-black text-white border border-white/30 backdrop-blur-xs transition-colors cursor-pointer active:scale-95"
              aria-label="Previous Perspective"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={() =>
                setSelectedAngleIdx((prev) => (prev < angles.length - 1 ? prev + 1 : 0))
              }
              className="absolute end-2 sm:end-6 p-3 bg-black/50 hover:bg-black text-white border border-white/30 backdrop-blur-xs transition-colors cursor-pointer active:scale-95"
              aria-label="Next Perspective"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pt-2">
            {angles.map((ang, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAngleIdx(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 border overflow-hidden transition-all shrink-0 cursor-pointer ${
                  selectedAngleIdx === idx
                    ? "border-white ring-2 ring-white"
                    : "border-white/30 opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={ang.image} alt={ang.titleEn} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FULL-SCREEN CAD BLUEPRINT INSPECTION MODAL */}
      {cadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#071322]/98 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="flex items-center justify-between text-cyan-200 text-xs font-mono uppercase tracking-widest border-b border-cyan-800/60 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white tracking-wider">
                EXECUTIVE CAD DRAWING SHEET • {project.titleEn}
              </span>
              <span className="text-cyan-500">•</span>
              <span className="text-cyan-300">
                {activePlanTab === "ground"
                  ? "GROUND LEVEL PLAN (1:50)"
                  : activePlanTab === "rcp"
                  ? "REFLECTED CEILING PLAN (RCP)"
                  : "VERTICAL SECTIONS AA&apos;/BB&apos;"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setBlueprintTheme(blueprintTheme === "classic" ? "cyanotype" : "classic")}
                className="px-3 py-1.5 border border-cyan-700/80 hover:border-cyan-400 text-[10px] text-cyan-300 rounded-xs transition-colors cursor-pointer"
              >
                Switch to {blueprintTheme === "classic" ? "Cyanotype" : "Paper"}
              </button>
              <button
                onClick={() => setCadModalOpen(false)}
                className="p-2 border border-cyan-700/80 hover:border-cyan-400 text-white transition-colors cursor-pointer"
                aria-label="Close CAD Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Blueprint Body */}
          <div className="relative flex-1 w-full max-w-6xl mx-auto my-4 flex items-center justify-center p-2 sm:p-6 overflow-auto">
            <div
              className={`relative w-full max-h-[80vh] aspect-[16/10] border border-cyan-700/50 shadow-2xl p-4 transition-colors ${
                blueprintTheme === "cyanotype" ? "bg-[#0c1f38] text-cyan-200" : "bg-[#fafafa] text-neutral-800"
              }`}
            >
              {activePlanTab === "ground" && (
                <svg className="w-full h-full" viewBox="0 0 800 450" fill="none">
                  <rect width="800" height="450" fill="none" />
                  <rect x="40" y="30" width="720" height="390" stroke="currentColor" strokeWidth="4" fill="none" />
                  <line x1="310" y1="30" x2="310" y2="340" stroke="currentColor" strokeWidth="3" />
                  <line x1="310" y1="210" x2="520" y2="210" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="520" y1="130" x2="520" y2="340" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="520" y1="340" x2="680" y2="340" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="120" y1="30" x2="250" y2="30" stroke="currentColor" strokeWidth="6" strokeDasharray="8 4" />
                  <line x1="400" y1="30" x2="620" y2="30" stroke="currentColor" strokeWidth="6" strokeDasharray="8 4" />
                  <path d="M 100 160 L 100 320 L 250 320" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="130" y="210" width="80" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                  <circle cx="170" cy="235" r="8" stroke="currentColor" strokeWidth="1" />
                  <text x="110" y="270" fontSize="12" fontFamily="sans-serif" letterSpacing="2" fill="currentColor" fontWeight="bold">LIVING SALON [45 m²]</text>
                  <text x="545" y="175" fontSize="12" fontFamily="sans-serif" letterSpacing="2" fill="currentColor" fontWeight="bold">DINING &amp; FOYER [30 m²]</text>
                  <g transform="translate(560, 310)">
                    <rect x="0" y="0" width="190" height="100" fill={blueprintTheme === "cyanotype" ? "#081526" : "#ffffff"} stroke="currentColor" strokeWidth="1.5" />
                    <line x1="0" y1="25" x2="190" y2="25" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="50" x2="190" y2="50" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="75" x2="190" y2="75" stroke="currentColor" strokeWidth="1" />
                    <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">ALAA ISSA PRACTICE</text>
                    <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="currentColor">DWG: GROUND LEVEL PLAN</text>
                    <text x="10" y="67" fontSize="8" fontFamily="sans-serif" fill="currentColor">SCALE: 1:50 • APPROVED</text>
                  </g>
                </svg>
              )}

              {activePlanTab === "rcp" && (
                <svg className="w-full h-full" viewBox="0 0 800 450" fill="none">
                  <rect width="800" height="450" fill="none" />
                  <rect x="40" y="30" width="720" height="390" stroke="currentColor" strokeWidth="3" fill="none" />
                  <rect x="60" y="50" width="680" height="350" stroke="#e0a96d" strokeWidth="2.5" strokeDasharray="6 3" fill="none" />
                  <text x="75" y="70" fontSize="11" fontFamily="sans-serif" fill="#e0a96d" fontWeight="bold">3000K INDIRECT COVE [1200 LUX]</text>
                  <circle cx="160" cy="140" r="5" fill="currentColor" />
                  <circle cx="260" cy="140" r="5" fill="currentColor" />
                  <circle cx="160" cy="240" r="5" fill="currentColor" />
                  <circle cx="260" cy="240" r="5" fill="currentColor" />
                  <circle cx="580" cy="200" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" fill="none" />
                  <circle cx="580" cy="200" r="4" fill="currentColor" />
                  <text x="535" y="245" fontSize="10" fontFamily="sans-serif" fill="currentColor" fontWeight="bold">PENDANT ACCENT</text>
                  <g transform="translate(560, 310)">
                    <rect x="0" y="0" width="190" height="100" fill={blueprintTheme === "cyanotype" ? "#081526" : "#ffffff"} stroke="currentColor" strokeWidth="1.5" />
                    <line x1="0" y1="25" x2="190" y2="25" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="50" x2="190" y2="50" stroke="currentColor" strokeWidth="1" />
                    <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">ALAA ISSA PRACTICE</text>
                    <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="currentColor">DWG: CEILING &amp; LIGHTING (RCP)</text>
                  </g>
                </svg>
              )}

              {activePlanTab === "sections" && (
                <svg className="w-full h-full" viewBox="0 0 800 450" fill="none">
                  <rect width="800" height="450" fill="none" />
                  <g transform="translate(30, 40)">
                    <text x="0" y="0" fontSize="12" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">SECTION AA&apos; (CLEAR HEIGHT 3.20m)</text>
                    <rect x="0" y="20" width="480" height="240" stroke="currentColor" strokeWidth="2" fill={blueprintTheme === "cyanotype" ? "#0f2747" : "#fff"} />
                    <rect x="-10" y="10" width="500" height="10" fill="currentColor" opacity="0.8" />
                    <rect x="-10" y="260" width="500" height="12" fill="currentColor" opacity="0.8" />
                    <rect x="20" y="40" width="440" height="15" fill={blueprintTheme === "cyanotype" ? "#1e3a5f" : "#f0ece1"} stroke="currentColor" strokeWidth="1" />
                    <rect x="60" y="90" width="180" height="170" fill={blueprintTheme === "cyanotype" ? "#163355" : "#ece4db"} stroke="currentColor" strokeWidth="1.5" />
                    <line x1="60" y1="180" x2="240" y2="180" stroke="currentColor" strokeWidth="1.5" />
                    <text x="80" y="140" fontSize="10" fontFamily="sans-serif" fill="currentColor" fontWeight="bold">FLUTED WALNUT JOINERY</text>
                  </g>
                  <g transform="translate(560, 310)">
                    <rect x="0" y="0" width="190" height="100" fill={blueprintTheme === "cyanotype" ? "#081526" : "#ffffff"} stroke="currentColor" strokeWidth="1.5" />
                    <text x="10" y="17" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">ALAA ISSA PRACTICE</text>
                    <text x="10" y="42" fontSize="8" fontFamily="sans-serif" fill="currentColor">DWG: JOINERY SECTIONS</text>
                  </g>
                </svg>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between text-cyan-400/80 text-[11px] font-mono border-t border-cyan-800/60 pt-3">
            <span>SCALE: 1:50 ARCHITECTURAL SHOP DRAWING</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>
        </div>
      )}
    </div>
  );
}