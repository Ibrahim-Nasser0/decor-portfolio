'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
  Layers,
  Calculator,
  Compass,
  Briefcase,
  FileText,
  UserCheck,
  Upload,
  Camera,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { saveProfileAction } from '../actions'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'
import { calculateYearsOfExperience, calculateBuiltWorks } from '@/lib/metrics'
import { DESIGNER_INFO } from '@/data/portfolioData'
import { compressImage } from '@/lib/imageCompression'

export default function HeroClient({
  initialProfile,
  projectsCount = 5,
}: {
  initialProfile: any
  projectsCount?: number
}) {
  const [profile, setProfile] = useState({
    ...initialProfile,
    aboutIntroEn: initialProfile.aboutIntroEn || DESIGNER_INFO.aboutIntroEn,
    builtWorksOffset: initialProfile.builtWorksOffset !== undefined ? Number(initialProfile.builtWorksOffset) : 80,
    cadFidelity: initialProfile.cadFidelity !== undefined ? Number(initialProfile.cadFidelity) : 100,
    avatarUrl: initialProfile.heroImageUrl || initialProfile.avatarUrl || '/images/alaa.webp',
    heroImageUrl: initialProfile.heroImageUrl || initialProfile.avatarUrl || '/images/alaa.webp',
  })
  const [initialData, setInitialData] = useState(profile)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingHero, setIsUploadingHero] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Handle Hero Portrait Upload to Supabase Storage (profile-media)
  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0]
    if (!rawFile) return

    try {
      setIsUploadingHero(true)
      const file = await compressImage(rawFile)
      const supabase = createClient()
      const ext = file.name.split('.').pop() || 'webp'
      const fileName = `hero-portrait-${Date.now()}.${ext}`

      let bucket = 'profile-media'
      let uploadRes = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true })

      if (uploadRes.error) {
        bucket = 'portfolio-media'
        uploadRes = await supabase.storage.from(bucket).upload(`hero/${fileName}`, file, { upsert: true })
      }

      if (uploadRes.error) throw uploadRes.error

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(bucket === 'profile-media' ? fileName : `hero/${fileName}`)

      setProfile((prev: any) => ({ ...prev, heroImageUrl: publicUrl, avatarUrl: publicUrl }))
      setFeedback({ type: 'success', text: 'Hero portrait uploaded to Supabase Storage successfully!' })
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Failed to upload hero photo' })
    } finally {
      setIsUploadingHero(false)
    }
  }

  // Calculations for Monograph Metrics
  const calculatedYears = calculateYearsOfExperience(profile.experience || initialProfile?.experience)
  const builtWorksCalc = calculateBuiltWorks(projectsCount, profile.builtWorksOffset)
  const totalBuiltWorks = builtWorksCalc.total

  // Dirty state calculation
  const isDirty = JSON.stringify(profile) !== JSON.stringify(initialData)

  // Keyboard shortcut Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [profile, isDirty])

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSaving(true)
    const res = await saveProfileAction(profile)
    setIsSaving(false)

    if (res.success) {
      setInitialData(profile)
      setFeedback({ type: 'success', text: 'Hero Section & Monograph Metrics saved to Supabase!' })
      setTimeout(() => setFeedback(null), 3500)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update hero section' })
    }
  }

  const handleDiscard = () => {
    setProfile(initialData)
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in relative pb-16">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-mono shadow-xl transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-200'
              : 'bg-red-950/50 border-red-800/80 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-neutral-400 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-mono text-amber-500 uppercase">
            Section 01 • Landing Impact & Brand Identity
          </span>
          <h1 className="text-2xl font-serif text-white tracking-wide mt-1">
            Hero Section & Metrics Editor
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Direct the monumental headline, bio paragraph, avatar portrait, and 3 credibility stats synced with Supabase.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Toggle Live Preview */}
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              showLivePreview
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-white/[0.03] border-white/[0.08] text-neutral-400 hover:text-white'
            }`}
          >
            {showLivePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showLivePreview ? 'Hide Preview' : 'Show Live Preview'}</span>
          </button>

          <Link
            href="/#hero"
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white rounded-xl text-xs font-mono border border-white/[0.08] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Public Site</span>
          </Link>

          <button
            type="submit"
            disabled={isSaving || !isDirty}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 font-semibold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-40"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left, Live Preview Right */}
      <div className={`grid grid-cols-1 ${showLivePreview ? 'lg:grid-cols-12' : ''} gap-8`}>
        {/* Editor Form Column */}
        <div className={`${showLivePreview ? 'lg:col-span-6' : 'max-w-4xl'} space-y-6`}>
          {/* Card 1: Hero Bio Statement (Image 2) */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white">
                  Hero Bio Statement (Image 2 Paragraph)
                </h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Dashboard Controlled
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-neutral-300 uppercase">
                  Introduction Narrative & Spatial Ethos *
                </label>
                <span className="text-[10px] font-mono text-neutral-500">
                  {profile.aboutIntroEn?.length || 0} characters
                </span>
              </div>
              <textarea
                rows={5}
                required
                value={profile.aboutIntroEn || ''}
                onChange={(e) => setProfile({ ...profile, aboutIntroEn: e.target.value })}
                placeholder="As an Interior Architect and Designer, I am passionate about creating spaces that combine functionality, creativity, and aesthetic value..."
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none leading-relaxed font-sans"
              />
              <p className="text-[10px] text-neutral-400 font-mono mt-1.5 leading-normal">
                This exact paragraph is rendered directly on the landing page hero section below the divider line.
              </p>
            </div>
          </div>

          {/* Card 2: Monograph Credibility Metrics (Image 2 - 3 Stats) */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white">
                  3 Architectural Metrics Ribbon
                </h2>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Live Calculation
              </span>
            </div>

            <div className="space-y-5">
              {/* Stat 1: Built Works */}
              <div className="p-4 bg-[#090a0c] border border-white/[0.06] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                    <label className="text-xs font-mono text-neutral-200 uppercase font-semibold">
                      01. Built Works Count
                    </label>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-white/[0.08] px-2 py-0.5 rounded">
                    Total: {totalBuiltWorks}+
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 block mb-1">
                      Additional Archived Works (Offset):
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={profile.builtWorksOffset ?? 80}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          builtWorksOffset: Math.max(0, parseInt(e.target.value, 10) || 0),
                        })
                      }
                      className="w-full bg-[#121316] border border-white/[0.1] focus:border-amber-500/80 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="text-[10px] font-mono text-neutral-400 flex flex-col justify-center bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                    <div>Database Projects: <span className="text-white font-bold">{projectsCount}</span></div>
                    <div>Archived Offset: <span className="text-amber-400 font-bold">{profile.builtWorksOffset ?? 80}</span></div>
                    <div className="text-emerald-400 mt-0.5">Displayed on Hero: <span className="font-bold">{totalBuiltWorks}+</span></div>
                  </div>
                </div>
              </div>

              {/* Stat 2: Years Practice (Auto-calculated from Experience) */}
              <div className="p-4 bg-[#090a0c] border border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <label className="text-xs font-mono text-neutral-200 uppercase font-semibold">
                      02. Years of Practice
                    </label>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {calculatedYears} (Automated)
                  </span>
                </div>

                <p className="text-[10px] font-mono text-neutral-400 leading-normal">
                  Calculated automatically from your career timeline in the <Link href="/admin/experience" className="text-amber-400 hover:underline">Experience section</Link> (from earliest year to current year). No manual override needed!
                </p>
              </div>

              {/* Stat 3: CAD Fidelity */}
              <div className="p-4 bg-[#090a0c] border border-white/[0.06] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <label className="text-xs font-mono text-neutral-200 uppercase font-semibold">
                      03. CAD Fidelity & Precision Rate
                    </label>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-white/[0.08] px-2 py-0.5 rounded">
                    {profile.cadFidelity ?? 100}%
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="range"
                    min={90}
                    max={100}
                    value={profile.cadFidelity ?? 100}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        cadFidelity: parseInt(e.target.value, 10) || 100,
                      })
                    }
                    className="flex-1 accent-amber-400 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-amber-300 w-12 text-end">
                    {profile.cadFidelity ?? 100}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Identity & Monograph Branding (Navbar & Hero Brand - Image 1) */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white">
                  Brand Identity (Navbar & Monumental Hero)
                </h2>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Image 1 Brand</span>
            </div>

            <div className="space-y-4">
              {/* Avatar Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    Hero Portrait Photo (Shown in Navbar & Hero Frame)
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.08] hover:bg-white/[0.15] text-white text-[11px] font-mono rounded-lg cursor-pointer transition-colors border border-white/10">
                    {isUploadingHero ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload (profile-media)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroUpload}
                      disabled={isUploadingHero}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex items-center gap-4 p-3 bg-[#090a0c] border border-white/[0.06] rounded-2xl">
                  {/* Live Avatar Preview matching Navbar Image 1 */}
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/80 shrink-0 shadow-md">
                    <Image
                      src={profile.avatarUrl || '/images/alaa.webp'}
                      alt="Avatar"
                      fill
                      className="object-cover object-top"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-black" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={profile.avatarUrl || '/images/alaa.webp'}
                      onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                      placeholder="/images/alaa.webp"
                      className="w-full bg-[#121316] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500/80"
                    />

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono text-neutral-500">Presets:</span>
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, avatarUrl: '/images/alaa.webp' })}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                          profile.avatarUrl === '/images/alaa.webp'
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                            : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                        }`}
                      >
                        Portrait 1 (.webp)
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, avatarUrl: '/images/alaa2.webp' })}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                          profile.avatarUrl === '/images/alaa2.webp'
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                            : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                        }`}
                      >
                        Portrait 2 (.webp)
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, avatarUrl: '/images/alaa.jpeg' })}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                          profile.avatarUrl === '/images/alaa.jpeg'
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                            : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                        }`}
                      >
                        Portrait 3 (.jpeg)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grand Name Headline */}
              <div>
                <label className="text-xs font-mono text-neutral-300 uppercase block mb-1.5">
                  Designer Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={profile.nameEn || ''}
                  onChange={(e) => setProfile({ ...profile, nameEn: e.target.value })}
                  placeholder="ALAA ISSA"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-serif tracking-wider"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="text-xs font-mono text-neutral-300 uppercase block mb-1.5">
                  Discipline Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={profile.titleEn || ''}
                  onChange={(e) => setProfile({ ...profile, titleEn: e.target.value })}
                  placeholder="INTERIOR ARCHITECTURE & DESIGN"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>

              {/* Subtitle & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-neutral-300 uppercase block mb-1.5">
                    Monograph Edition
                  </label>
                  <input
                    type="text"
                    value={profile.subtitleEn || ''}
                    onChange={(e) => setProfile({ ...profile, subtitleEn: e.target.value })}
                    placeholder="SELECTED WORKS | 2026-2027"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-300 uppercase block mb-1.5">
                    Studio Location
                  </label>
                  <input
                    type="text"
                    value={profile.locationEn || ''}
                    onChange={(e) => setProfile({ ...profile, locationEn: e.target.value })}
                    placeholder="CAIRO | EGYPT"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Section Preview Column */}
        {showLivePreview && (
          <div className="lg:col-span-6 space-y-4">
            <div className="sticky top-24 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-semibold uppercase tracking-wider">
                    Live Monograph Simulation
                  </span>
                </div>
                <span className="text-[10px] bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]">
                  Updates As You Type
                </span>
              </div>

              {/* Live Preview Card */}
              <div className="bg-white text-black rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-300 relative overflow-hidden select-none space-y-6">
                {/* Simulated Sticky Navbar Brand (Image 1) */}
                <div className="flex items-center justify-between pb-3.5 border-b border-black/10">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/80 bg-neutral-100 shrink-0">
                      <Image
                        src={profile.avatarUrl || '/images/alaa.webp'}
                        alt="Avatar Preview"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-editorial uppercase tracking-wider text-black">
                          {profile.nameEn || 'ALAA ISSA'}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      </div>
                      <span className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase">
                        {(profile.titleEn ? profile.titleEn.split('&')[0].trim().toUpperCase() : 'INTERIOR ARCHITECT')} • {(profile.locationEn ? profile.locationEn.split(',')[0].split('|')[0].trim().toUpperCase() : 'CAIRO')}
                      </span>
                    </div>
                  </div>
                  <span className="text-[8px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded uppercase">
                    Navbar Sync
                  </span>
                </div>

                {/* Simulated Monograph Issue Bar */}
                <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-500 uppercase border-b border-neutral-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="font-semibold text-black">
                      {profile.subtitleEn || 'SELECTED WORKS'}
                    </span>
                  </div>
                  <span>{profile.locationEn || 'CAIRO, EGYPT'}</span>
                </div>

                {/* Main Composition */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-medium block">
                    {profile.titleEn || 'INTERIOR ARCHITECTURE & DESIGN'}
                  </span>

                  <h1 className="text-4xl sm:text-5xl font-editorial font-bold text-black tracking-tight uppercase leading-[0.92]">
                    {profile.nameEn || 'ALAA ISSA'}
                  </h1>

                  <div className="w-16 h-[2px] bg-black my-3" />

                  {/* Bio Statement (Image 2 Paragraph) */}
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed text-justify line-clamp-4">
                    {profile.aboutIntroEn || DESIGNER_INFO.aboutIntroEn}
                  </p>

                  {/* Simulated Metrics Strip (Image 2 3 Stats) */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-black/10">
                    <div className="p-2.5 bg-neutral-100 rounded-xl text-center">
                      <div className="text-xl font-editorial font-bold text-black leading-none">
                        {totalBuiltWorks}<span className="text-xs text-neutral-400 font-sans font-normal">+</span>
                      </div>
                      <div className="text-[8px] font-technical uppercase tracking-wider text-neutral-500 mt-1">
                        Built Works
                      </div>
                    </div>

                    <div className="p-2.5 bg-neutral-100 rounded-xl text-center">
                      <div className="text-xl font-editorial font-bold text-black leading-none">
                        {calculatedYears}
                      </div>
                      <div className="text-[8px] font-technical uppercase tracking-wider text-neutral-500 mt-1">
                        Years Practice
                      </div>
                    </div>

                    <div className="p-2.5 bg-neutral-100 rounded-xl text-center">
                      <div className="text-xl font-editorial font-bold text-black leading-none">
                        {profile.cadFidelity ?? 100}<span className="text-xs text-neutral-400 font-sans font-normal">%</span>
                      </div>
                      <div className="text-[8px] font-technical uppercase tracking-wider text-neutral-500 mt-1">
                        CAD Fidelity
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Watermark */}
                <div className="absolute -bottom-6 -right-6 text-[7rem] font-serif font-black text-black/[0.03] pointer-events-none select-none">
                  AI
                </div>
              </div>

              <div className="p-3 bg-[#111215] rounded-xl border border-white/[0.06] text-[11px] font-mono text-neutral-400">
                💡 <span className="text-neutral-200">Live Sync:</span> All changes saved here update both the sticky Navbar brand and the Hero section across desktop and mobile.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Unsaved Changes Guard */}
      <UnsavedChangesBar
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </form>
  )
}