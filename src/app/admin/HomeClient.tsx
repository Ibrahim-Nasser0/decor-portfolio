'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FolderKanban,
  Star,
  Plus,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  Sparkles,
  Briefcase,
  Cpu,
  FileText,
  ShieldCheck,
  ArrowUpRight,
  Copy,
  Check,
  Download,
  Mail,
  MapPin,
  X,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import { Project } from '@/data/portfolioData'
import { updateTop4ProjectsAction } from '@/app/admin/actions'
import { useAdminTranslation } from '@/context/AdminLanguageContext'
import { triggerHaptic } from '@/lib/haptics'

interface HomeClientProps {
  initialProjects: Project[]
  profile: any
  adminAccounts: any[]
}

export default function HomeClient({
  initialProjects,
  profile,
  adminAccounts,
}: HomeClientProps) {
  const { t, isRtl } = useAdminTranslation()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [copied, setCopied] = useState(false)
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null)
  const [savingTop4, setSavingTop4] = useState(false)

  // Derive Top 4 Projects (slots 0..3)
  const cvProjects = projects
    .filter((p) => p.includeInCv !== false)
    .sort((a, b) => {
      const orderA = (a.specs as any)?.cvOrder ?? 99
      const orderB = (b.specs as any)?.cvOrder ?? 99
      return orderA - orderB
    })

  const top4Slots: (Project | null)[] = [
    cvProjects[0] || null,
    cvProjects[1] || null,
    cvProjects[2] || null,
    cvProjects[3] || null,
  ]

  const featuredProjects = projects.filter((p) => p.featured)
  const assignedSlotsCount = top4Slots.filter(Boolean).length

  // Copy portfolio link
  const handleCopyLink = async () => {
    try {
      const liveUrl = typeof window !== 'undefined' ? window.location.origin : 'https://alaa-essa.vercel.app'
      await navigator.clipboard.writeText(liveUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback
    }
  }

  // Assign a project to a slot
  const handleAssignProjectToSlot = async (slotIdx: number, project: Project) => {
    setSelectedSlotIndex(null)
    setSavingTop4(true)

    const newSlots = [...top4Slots]
    // If project was already in another slot, remove it from that slot
    const existingIdx = newSlots.findIndex((p) => p?.id === project.id)
    if (existingIdx !== -1) {
      newSlots[existingIdx] = null
    }

    newSlots[slotIdx] = project
    const validIds = newSlots.filter((p): p is Project => p !== null).map((p) => p.id)

    const res = await updateTop4ProjectsAction(validIds)
    if (res.success) {
      setProjects((prev) =>
        prev.map((p) => ({
          ...p,
          includeInCv: validIds.includes(p.id),
          specs: {
            ...((typeof p.specs === 'object' && p.specs) || {}),
            cvOrder: validIds.indexOf(p.id) !== -1 ? validIds.indexOf(p.id) : 99,
            includeInCv: validIds.includes(p.id),
          },
        }))
      )
    }
    setSavingTop4(false)
  }

  // Remove project from slot
  const handleRemoveSlot = async (slotIdx: number) => {
    setSavingTop4(true)
    const newSlots = [...top4Slots]
    newSlots[slotIdx] = null
    const validIds = newSlots.filter((p): p is Project => p !== null).map((p) => p.id)

    const res = await updateTop4ProjectsAction(validIds)
    if (res.success) {
      setProjects((prev) =>
        prev.map((p) => ({
          ...p,
          includeInCv: validIds.includes(p.id),
          specs: {
            ...((typeof p.specs === 'object' && p.specs) || {}),
            cvOrder: validIds.indexOf(p.id) !== -1 ? validIds.indexOf(p.id) : 99,
            includeInCv: validIds.includes(p.id),
          },
        }))
      )
    }
    setSavingTop4(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 2xl:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in relative z-10 select-none">
      {/* ============================================================== */}
      {/* 1. TOP STUDIO HERO & IDENTITY STRIP                            */}
      {/* ============================================================== */}
      <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 sm:gap-5 relative z-10 min-w-0">
          {/* Hero Visual Image Display */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-500/40 p-0.5 shadow-xl shrink-0 bg-neutral-900 group">
            <Image
              src={profile.heroImageUrl || profile.avatarUrl || '/images/alaa.webp'}
              alt={profile.nameEn || 'Eng. Alaa Essa'}
              fill
              sizes="80px"
              priority
              className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-[#111215] rounded-full" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-400 uppercase font-semibold">
                {t.home.studioSubtitle}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white tracking-wide font-light truncate">
              {profile.nameEn || t.home.architectName}
            </h1>

            <div className="flex items-center gap-3 text-xs text-neutral-400 font-sans flex-wrap">
              <span>{profile.titleEn || t.home.architectTitle}</span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="font-mono text-neutral-400 text-[11px] flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                <span>{profile.whatsappNumber || profile.phone || '+20 100 000 0000'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Site Status Pill */}
        <div className="flex items-center gap-2.5 relative z-10 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.08] hover:border-amber-400/50 text-xs font-mono transition-all group active:scale-95"
            title="Open Live Portfolio Website"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.topNav.liveSite}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. DIRECT SHARING & PDF DOSSIERS LAUNCHPAD                     */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Action 1: Copy Portfolio Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="p-4 sm:p-5 rounded-2xl bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-amber-500/40 transition-all group active:scale-[0.98] text-start flex items-center justify-between gap-3 shadow-md cursor-pointer"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20'
            }`}>
              {copied ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Copy className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold font-mono tracking-wider text-white group-hover:text-amber-200 transition-colors truncate">
                {copied ? t.home.linkCopied : t.home.copyLink}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5 truncate">
                {t.home.quickShareSubtitle}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-400 shrink-0">
            {copied ? '✓' : '→'}
          </span>
        </button>

        {/* Action 2: Download Curriculum Vitae (PDF) */}
        <a
          href="/api/cv-pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 sm:p-5 rounded-2xl bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-[#7AD1B8]/40 transition-all group active:scale-[0.98] text-start flex items-center justify-between gap-3 shadow-md"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-[#7AD1B8]/10 text-[#7AD1B8] border border-[#7AD1B8]/20 group-hover:bg-[#7AD1B8]/20 flex items-center justify-center transition-colors shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold font-mono tracking-wider text-white group-hover:text-[#7AD1B8] transition-colors truncate">
                {t.home.downloadCv}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5 truncate">
                LaTeX Monograph 1-Page PDF
              </p>
            </div>
          </div>
          <Download className="w-4 h-4 text-[#7AD1B8] shrink-0 group-hover:translate-y-0.5 transition-transform" />
        </a>

        {/* Action 3: Download Portfolio (PDF) */}
        <a
          href="/api/portfolio-pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 sm:p-5 rounded-2xl bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-sky-500/40 transition-all group active:scale-[0.98] text-start flex items-center justify-between gap-3 shadow-md"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:bg-sky-500/20 flex items-center justify-center transition-colors shrink-0">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold font-mono tracking-wider text-white group-hover:text-sky-300 transition-colors truncate">
                {t.home.downloadPortfolio}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5 truncate">
                Multi-Page Architectural Dossier
              </p>
            </div>
          </div>
          <Download className="w-4 h-4 text-sky-400 shrink-0 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* ============================================================== */}
      {/* 3. QUICK ACTION BUTTONS (+ Project, + Experience, + Skill)     */}
      {/* ============================================================== */}
      <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              {t.home.quickActionsTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Quick Action 1: Add Project */}
          <Link
            href="/admin/projects/new"
            className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-transparent hover:from-amber-500/25 border border-amber-500/30 flex items-center justify-between group active:scale-95 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-neutral-950 flex items-center justify-center font-bold shrink-0">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-amber-200">
                  {t.home.addProjectAction}
                </div>
                <div className="text-[10px] text-neutral-400 font-sans">
                  {t.projects.title}
                </div>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
          </Link>

          {/* Quick Action 2: Add Experience */}
          <Link
            href="/admin/experience"
            className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-500/40 flex items-center justify-between group active:scale-95 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] text-amber-400 border border-white/[0.08] flex items-center justify-center font-bold shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-amber-200">
                  {t.home.addExperienceAction}
                </div>
                <div className="text-[10px] text-neutral-400 font-sans">
                  {t.experience.tabCareer}
                </div>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
          </Link>

          {/* Quick Action 3: Add Skill */}
          <Link
            href="/admin/experience"
            className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-500/40 flex items-center justify-between group active:scale-95 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] text-sky-400 border border-white/[0.08] flex items-center justify-center font-bold shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-sky-200">
                  {t.home.addSkillAction}
                </div>
                <div className="text-[10px] text-neutral-400 font-sans">
                  {t.experience.tabSoftware}
                </div>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. TOP 4 FLAGSHIP PROJECTS (Interactive Visual Slot Picker)    */}
      {/* ============================================================== */}
      <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                {t.home.top4ShowcaseTitle}
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              {t.home.top4ShowcaseSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
              {assignedSlotsCount} / 4 Slots
            </span>
            {savingTop4 && (
              <span className="text-[10px] font-mono text-neutral-400 animate-pulse">
                {t.common.saving}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Snap Carousel (< sm) + Desktop Responsive Grid (>= sm) */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 no-scrollbar snap-x snap-mandatory -mx-1 px-1 sm:mx-0 sm:px-0">
          {top4Slots.map((project, slotIdx) => (
            <div
              key={slotIdx}
              className={`min-w-[82vw] sm:min-w-0 snap-center shrink-0 sm:shrink rounded-2xl border transition-all flex flex-col justify-between overflow-hidden relative ${
                project
                  ? 'bg-[#090a0c] border-white/[0.1] hover:border-amber-500/40 shadow-md group'
                  : 'bg-white/[0.02] border-dashed border-amber-500/30 hover:border-amber-500/60 p-5 items-center justify-center text-center min-h-[220px]'
              }`}
            >
              {project ? (
                <>
                  {/* Slot Image Banner */}
                  <div className="relative w-full h-36 sm:h-32 bg-neutral-900 overflow-hidden">
                    <Image
                      src={project.coverImage || '/images/projects/project-1.jpg'}
                      alt={project.titleEn}
                      fill
                      sizes="(max-width: 768px) 85vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50" />
                    
                    {/* Slot Number Stamp */}
                    <span className="absolute top-2.5 start-2.5 px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-black/85 text-amber-300 border border-amber-400/30 font-bold shadow-sm">
                      #{slotIdx + 1}
                    </span>

                    <span className="absolute top-2.5 end-2.5 px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm">
                      📄 CV Active
                    </span>

                    <div className="absolute bottom-2.5 start-2.5 end-2.5 truncate">
                      <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-wider block truncate">
                        {project.categoryLabelEn || project.category}
                      </span>
                    </div>
                  </div>

                  {/* Slot Info & Controls */}
                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm sm:text-xs font-semibold text-white truncate">
                        {project.titleEn}
                      </h3>
                      <p className="text-[11px] sm:text-[10px] text-neutral-400 font-mono truncate mt-0.5">
                        {project.locationEn || 'Egypt'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic('light')
                          setSelectedSlotIndex(slotIdx)
                        }}
                        className="flex-1 py-2 px-3 min-h-[40px] rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 text-xs sm:text-[10px] font-mono font-medium transition-all text-center cursor-pointer active:scale-95"
                      >
                        {t.home.changeProject}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic('warning')
                          handleRemoveSlot(slotIdx)
                        }}
                        className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/30 active:scale-90 transition-transform cursor-pointer"
                        title={t.home.removeSlot}
                        aria-label="Remove from slot"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty Slot Card */
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('light')
                    setSelectedSlotIndex(slotIdx)
                  }}
                  className="w-full h-full min-h-[220px] flex flex-col items-center justify-center gap-2.5 p-4 group active:scale-98 transition-transform cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform flex items-center justify-center font-bold">
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div className="space-y-0.5 text-center">
                    <span className="text-[11px] font-mono uppercase text-amber-300 font-bold block">
                      #{slotIdx + 1} {t.home.slot}
                    </span>
                    <span className="text-xs text-neutral-400 font-sans block">
                      {t.home.emptySlot}
                    </span>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Swipe Pagination Dots Indicator (< sm) */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 pt-1">
          {[0, 1, 2, 3].map((slotIdx) => (
            <span
              key={slotIdx}
              className={`h-1.5 rounded-full transition-all ${
                top4Slots[slotIdx]
                  ? 'w-5 bg-amber-400'
                  : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Slot ${slotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. TELEMETRY KPI SUMMARY RIBBON                                */}
      {/* ============================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Metric 1: Total Published Works */}
        <Link
          href="/admin/projects"
          className="bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all group shadow-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
              {t.home.totalWorksCount}
            </span>
            <FolderKanban className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-serif">
            {projects.length}
          </div>
          <div className="text-[10px] font-mono text-neutral-500 mt-2 flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span>{t.projects.title}</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </Link>

        {/* Metric 2: CV Showcase Selected */}
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
              {t.home.cvSlotsCount}
            </span>
            <FileText className="w-4 h-4 text-[#7AD1B8]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-light text-white font-serif">
              {assignedSlotsCount}
            </span>
            <span className="text-xs font-mono text-neutral-500">/ 4 max</span>
          </div>
          <div className="text-[10px] font-mono text-neutral-500 mt-2 flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span className={assignedSlotsCount === 4 ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
              {assignedSlotsCount === 4 ? 'Optimal (4/4)' : `${4 - assignedSlotsCount} slots left`}
            </span>
            <span className="text-[#7AD1B8]">●</span>
          </div>
        </div>

        {/* Metric 3: Hero Featured Works */}
        <Link
          href="/admin/projects"
          className="bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all group shadow-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
              {t.home.heroFeaturedCount}
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-serif">
            {featuredProjects.length}
          </div>
          <div className="text-[10px] font-mono text-neutral-500 mt-2 flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span>Active in slider</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </Link>

        {/* Metric 4: Studio Security */}
        <Link
          href="/admin/settings"
          className="bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-sky-500/40 rounded-2xl p-4 sm:p-5 transition-all group shadow-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
              {t.home.studioSecurityStatus}
            </span>
            <ShieldCheck className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-light text-white font-serif">
              {adminAccounts.length}
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30">
              {t.common.active}
            </span>
          </div>
          <div className="text-[10px] font-mono text-neutral-500 mt-2 flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span>{t.nav.settings}</span>
            <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </Link>
      </div>

      {/* ============================================================== */}
      {/* 6. SELECT PROJECT BOTTOM SHEET (Assign to Top 4 Slot)          */}
      {/* ============================================================== */}
      {selectedSlotIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          {/* Backdrop Dismiss Area */}
          <div
            className="fixed inset-0 bg-transparent cursor-pointer"
            onClick={() => setSelectedSlotIndex(null)}
          />

          <div className="relative z-10 bg-[#0e1014] border-t sm:border border-white/[0.14] rounded-t-[28px] sm:rounded-3xl w-full max-w-lg mx-auto p-5 sm:p-6 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] sm:pb-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[88vh] flex flex-col">
            {/* Mobile Drag Handle Indicator */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden -mt-1 mb-1" />

            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                  {t.home.selectProjectModalTitle} #{selectedSlotIndex + 1}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light')
                  setSelectedSlotIndex(null)
                }}
                className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-neutral-400 hover:text-white rounded-xl bg-white/[0.04] active:scale-90 transition-transform cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar space-y-2.5 flex-1 pr-1 overscroll-contain">
              {projects.map((proj) => {
                const isAlreadySelected = top4Slots.some((p) => p?.id === proj.id)
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      triggerHaptic('selection')
                      handleAssignProjectToSlot(selectedSlotIndex, proj)
                    }}
                    className={`w-full min-h-[56px] p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-start active:scale-[0.98] cursor-pointer ${
                      isAlreadySelected
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.08] hover:border-white/20 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-white/[0.08]">
                        <Image
                          src={proj.coverImage || '/images/projects/project-1.jpg'}
                          alt={proj.titleEn}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">
                          {proj.titleEn}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono truncate">
                          {proj.categoryLabelEn || proj.category} • {proj.locationEn}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-xs font-mono">
                      {isAlreadySelected ? (
                        <span className="text-[9px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          Selected
                        </span>
                      ) : (
                        <span className="text-xs px-3 py-1 rounded-xl bg-white/[0.06] text-amber-300 font-mono font-medium">
                          Assign →
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
