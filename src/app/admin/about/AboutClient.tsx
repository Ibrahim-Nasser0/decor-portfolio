'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ExternalLink,
  Eye,
  EyeOff,
  Camera,
  Upload,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { saveProfileAction } from '../actions'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'

export default function AboutClient({ initialProfile }: { initialProfile: any }) {
  const [profile, setProfile] = useState(initialProfile)
  const [initialData, setInitialData] = useState(initialProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Handle Photo Upload to Supabase Storage (profile-media)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const fileName = `about-portrait-${Date.now()}.${ext}`

      let bucket = 'profile-media'
      let uploadRes = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true })

      if (uploadRes.error) {
        bucket = 'portfolio-media'
        uploadRes = await supabase.storage.from(bucket).upload(`about/${fileName}`, file, { upsert: true })
      }

      if (uploadRes.error) throw uploadRes.error

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(bucket === 'profile-media' ? fileName : `about/${fileName}`)

      setProfile((prev: any) => ({ ...prev, aboutImageUrl: publicUrl }))
      setFeedback({ type: 'success', text: 'About section portrait uploaded to Supabase Storage successfully!' })
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Failed to upload photo' })
    } finally {
      setIsUploading(false)
    }
  }

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
            {/* Block 0: Dedicated About Section Portrait Photo */}
            <div className="space-y-4 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-xs font-mono uppercase tracking-wider text-white">
                    00 • About Section Portrait Photo
                  </h2>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Independent from Hero</span>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#090a0c] border border-white/[0.08] rounded-2xl">
                {/* Image Preview */}
                <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-white/20 bg-neutral-900 shrink-0 shadow-md">
                  <Image
                    src={profile.aboutImageUrl || '/images/alaa2.webp'}
                    alt="About Portrait"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      Profile Frame Photo
                    </span>
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.08] hover:bg-white/[0.15] text-white text-[11px] font-mono rounded-lg cursor-pointer transition-colors border border-white/10">
                      {isUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Upload (Supabase)</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={profile.aboutImageUrl || '/images/alaa2.webp'}
                    onChange={(e) => setProfile({ ...profile, aboutImageUrl: e.target.value })}
                    placeholder="/images/alaa2.webp or https://..."
                    className="w-full bg-[#121316] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/80"
                  />

                  {/* Presets */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-mono text-neutral-500">Presets:</span>
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, aboutImageUrl: '/images/alaa2.webp' })}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                        (profile.aboutImageUrl || '/images/alaa2.webp') === '/images/alaa2.webp'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                      }`}
                    >
                      Graduation White Gown (.webp)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, aboutImageUrl: '/images/alaa.webp' })}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                        profile.aboutImageUrl === '/images/alaa.webp'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                      }`}
                    >
                      Hero Portrait 1 (.webp)
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
                    Architectural Narrative & Introduction *
                  </label>
                  <span className="text-[9px] font-mono bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    BIO INTRO
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={profile.aboutIntroEn || ''}
                  onChange={(e) => setProfile({ ...profile, aboutIntroEn: e.target.value })}
                  placeholder="Architectural background and practice ethos..."
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
                    Practice Experience Narrative *
                  </label>
                  <span className="text-[9px] font-mono bg-white/[0.06] text-neutral-400 px-2 py-0.5 rounded border border-white/[0.08]">
                    EXPERIENCE
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={profile.aboutExperienceEn || ''}
                  onChange={(e) => setProfile({ ...profile, aboutExperienceEn: e.target.value })}
                  placeholder="Turnkey residential execution and bespoke craftsmanship..."
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
                    Design Philosophy Statement *
                  </label>
                  <span className="text-[9px] font-mono bg-white/[0.06] text-neutral-400 px-2 py-0.5 rounded border border-white/[0.08]">
                    PHILOSOPHY
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={profile.statementEn || ''}
                  onChange={(e) => setProfile({ ...profile, statementEn: e.target.value })}
                  placeholder="Timeless spatial order, authentic materials, and circadian light..."
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

                <div className="space-y-3">
                  <h3 className="text-lg font-editorial font-bold text-black uppercase">
                    Spatial Philosophy & Practice
                  </h3>
                  <div className="w-12 h-[1.5px] bg-black my-2" />
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans line-clamp-3">
                    {profile.aboutIntroEn}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans line-clamp-3">
                    {profile.aboutExperienceEn}
                  </p>
                </div>

                {profile.statementEn && (
                  <div className="p-4 bg-neutral-100 rounded-2xl border-l-2 border-black border-y border-r border-neutral-200">
                    <span className="text-[9px] font-mono uppercase text-neutral-500 block mb-1">
                      Design Philosophy Callout:
                    </span>
                    <p className="text-[11px] text-neutral-800 italic leading-relaxed line-clamp-3">
                      &ldquo;{profile.statementEn}&rdquo;
                    </p>
                  </div>
                )}
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
