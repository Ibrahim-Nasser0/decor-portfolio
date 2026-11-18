'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ExternalLink,
  Eye,
  EyeOff,
} from 'lucide-react'
import { saveProfileAction } from '../actions'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'

export default function AboutClient({ initialProfile }: { initialProfile: any }) {
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
      setFeedback({ type: 'success', text: 'About Section statements updated & live revalidated!' })
      setTimeout(() => setFeedback(null), 3500)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update about section' })
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
            Section 02 • Architectural Bio
          </span>
          <h1 className="text-2xl font-serif text-white tracking-wide mt-1">
            About Section Editor
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Direct the architectural background, practice narrative, and design philosophy statements.
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
            href="/#about"
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
        <div className={`${showLivePreview ? 'lg:col-span-7' : 'max-w-4xl'} space-y-6`}>
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-8">
            {/* Block 1: Introduction Narrative */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <h2 className="text-xs font-mono uppercase tracking-wider text-white">
                    01 • Architectural Introduction Narrative
                  </h2>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">Intro Paragraph</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    Introduction (English)
                  </label>
                  <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                    [EN]
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={profile.aboutIntroEn}
                  onChange={(e) => setProfile({ ...profile, aboutIntroEn: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    النبذة التمهيدية (بالعربية)
                  </label>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    [AR]
                  </span>
                </div>
                <textarea
                  rows={4}
                  dir="rtl"
                  value={profile.aboutIntroAr}
                  onChange={(e) => setProfile({ ...profile, aboutIntroAr: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
                />
              </div>
            </div>

            {/* Block 2: Professional Practice Statement */}
            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  02 • Professional Practice & Scale Statement
                </h2>
                <span className="text-[10px] font-mono text-neutral-400">Practice Statement</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    Practice Experience (English)
                  </label>
                  <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                    [EN]
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={profile.aboutExperienceEn}
                  onChange={(e) => setProfile({ ...profile, aboutExperienceEn: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    المسيرة والمشاريع السكنية الفاخرة (بالعربية)
                  </label>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    [AR]
                  </span>
                </div>
                <textarea
                  rows={4}
                  dir="rtl"
                  value={profile.aboutExperienceAr}
                  onChange={(e) => setProfile({ ...profile, aboutExperienceAr: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
                />
              </div>
            </div>

            {/* Block 3: Design Philosophy Statement */}
            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  03 • Architectural Philosophy & Values
                </h2>
                <span className="text-[10px] font-mono text-neutral-400">Philosophy Quote</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    Design Philosophy Statement (English)
                  </label>
                  <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                    [EN]
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={profile.statementEn}
                  onChange={(e) => setProfile({ ...profile, statementEn: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    الفلسفة المعمارية ورؤية التصميم (بالعربية)
                  </label>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    [AR]
                  </span>
                </div>
                <textarea
                  rows={5}
                  dir="rtl"
                  value={profile.statementAr}
                  onChange={(e) => setProfile({ ...profile, statementAr: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Section Preview Column */}
        {showLivePreview && (
          <div className="lg:col-span-5 space-y-4">
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
              <div className="bg-white text-black rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-300 relative select-none space-y-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 pb-3 border-b border-black/10">
                  02 • ARCHITECTURAL NARRATIVE
                </div>

                <div>
                  <h3 className="text-lg font-editorial font-bold text-black uppercase mb-2">
                    Spatial Philosophy & Practice
                  </h3>
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans line-clamp-5">
                    {profile.aboutIntroEn}
                  </p>
                </div>

                <div className="p-4 bg-neutral-100 rounded-2xl border border-neutral-200">
                  <span className="text-[9px] font-mono uppercase text-neutral-500 block mb-1">
                    Design Philosophy Quote:
                  </span>
                  <p className="text-[11px] text-neutral-800 italic leading-relaxed line-clamp-4">
                    &quot;{profile.statementEn}&quot;
                  </p>
                </div>
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
