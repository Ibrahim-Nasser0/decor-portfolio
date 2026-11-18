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
} from 'lucide-react'
import { saveProfileAction } from '../actions'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'

export default function HeroClient({ initialProfile }: { initialProfile: any }) {
  const [profile, setProfile] = useState(initialProfile)
  const [initialData, setInitialData] = useState(initialProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

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
      setFeedback({ type: 'success', text: 'Hero Section updated & live revalidated!' })
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
            Section 01 • Landing Impact
          </span>
          <h1 className="text-2xl font-serif text-white tracking-wide mt-1">
            Hero Section Editor
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Direct the monumental monograph headline, role credentials, edition badge, and portrait.
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
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white">
                  Content Fields & Monograph Tags
                </h2>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Section 01</span>
            </div>

            <div className="space-y-5">
              {/* English Name Headline */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    Grand Monograph Headline *
                  </label>
                  <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                    [EN] ENGLISH
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={profile.nameEn}
                  onChange={(e) => setProfile({ ...profile, nameEn: e.target.value })}
                  placeholder="ALAA ISSA"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-serif tracking-wider"
                />
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
                  Location on site: Monumental Hero Title (`text-8xl / text-9xl`)
                </span>
              </div>

              {/* Arabic Name Headline */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    الاسم المعماري (بالعربية)
                  </label>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    [AR] العربية
                  </span>
                </div>
                <input
                  type="text"
                  dir="rtl"
                  value={profile.nameAr}
                  onChange={(e) => setProfile({ ...profile, nameAr: e.target.value })}
                  placeholder="م. آلاء عيسى"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-sans"
                />
              </div>

              {/* English Role Tagline */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    Primary Architectural Tagline *
                  </label>
                  <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                    [EN]
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={profile.titleEn}
                  onChange={(e) => setProfile({ ...profile, titleEn: e.target.value })}
                  placeholder="INTERIOR ARCHITECTURE & DESIGN"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                />
              </div>

              {/* Arabic Role Tagline */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    التخصص الدقيق (بالعربية)
                  </label>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    [AR]
                  </span>
                </div>
                <input
                  type="text"
                  dir="rtl"
                  value={profile.titleAr}
                  onChange={(e) => setProfile({ ...profile, titleAr: e.target.value })}
                  placeholder="مهندسة تصميم داخلي وديكور معماري"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-sans"
                />
              </div>

              {/* Edition Subtitle & Studio Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                    Edition Ribbon Badge
                  </label>
                  <input
                    type="text"
                    value={profile.subtitleEn || ''}
                    onChange={(e) => setProfile({ ...profile, subtitleEn: e.target.value })}
                    placeholder="SELECTED WORKS | 2026-2027"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                    Studio Base
                  </label>
                  <input
                    type="text"
                    value={profile.locationEn || ''}
                    onChange={(e) => setProfile({ ...profile, locationEn: e.target.value })}
                    placeholder="CAIRO | EGYPT"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Portrait Info */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-500/40 p-1 shrink-0 shadow-md">
                  <Image
                    src="/images/alaa.jpeg"
                    alt="Hero Portrait"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-white block">
                    Hero Section Photo
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono block truncate">
                    public/images/alaa.jpeg (1:1 Ratio Face Centered)
                  </span>
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
                    Live Section Simulation
                  </span>
                </div>
                <span className="text-[10px] bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]">
                  Updates As You Type
                </span>
              </div>

              {/* Live Preview Card */}
              <div className="bg-white text-black rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-300 relative overflow-hidden select-none">
                {/* Simulated Header Line */}
                <div className="flex items-center justify-between pb-3 border-b border-black/10 text-[9px] font-mono tracking-widest text-neutral-500 uppercase mb-6">
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

                  <p className="text-[11px] font-technical uppercase tracking-widest text-neutral-800 font-semibold leading-relaxed">
                    Bespoke Residential Sanctuaries & Tactile Living Environments
                  </p>

                  {/* Simulated Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-black/10 text-center font-mono">
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      <div className="text-sm font-bold text-black">5+</div>
                      <div className="text-[8px] text-neutral-500 uppercase">Years</div>
                    </div>
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      <div className="text-sm font-bold text-black">40+</div>
                      <div className="text-[8px] text-neutral-500 uppercase">Works</div>
                    </div>
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      <div className="text-sm font-bold text-black">100%</div>
                      <div className="text-[8px] text-neutral-500 uppercase">Turnkey</div>
                    </div>
                  </div>
                </div>

                {/* Corner Watermark */}
                <div className="absolute -bottom-6 -right-6 text-[7rem] font-serif font-black text-black/[0.03] pointer-events-none select-none">
                  AI
                </div>
              </div>

              <div className="p-3 bg-[#111215] rounded-xl border border-white/[0.06] text-[11px] font-mono text-neutral-400">
                💡 <span className="text-neutral-200">Tip:</span> Changes here are mirrored directly on the public homepage hero banner upon clicking Save.
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
