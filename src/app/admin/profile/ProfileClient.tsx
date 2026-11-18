'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Globe,
  Link2,
  MapPin,
  ExternalLink,
  Eye,
  EyeOff,
  PhoneCall,
  MessageCircle,
} from 'lucide-react'
import { saveProfileAction } from '../actions'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'

export default function ProfileClient({ initialProfile }: { initialProfile: any }) {
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
      setFeedback({ type: 'success', text: 'Contact channels and studio profile updated & live revalidated!' })
      setTimeout(() => setFeedback(null), 3500)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update profile' })
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
            Section 06 • Inbound Coordinates
          </span>
          <h1 className="text-2xl font-serif text-white tracking-wide mt-1">
            Profile & Contact Hub
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Direct your public contact points, WhatsApp number, studio headquarters, and social channels.
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
            href="/#contact"
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
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-white/[0.06]">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-500/40 p-1 shadow-lg shrink-0">
                <Image
                  src="/images/alaa.jpeg"
                  alt="Eng. Alaa Issa"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-500">
                  Principal Consultant
                </span>
                <h2 className="text-xl font-serif text-white tracking-wide">
                  {profile.nameEn} • {profile.nameAr}
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  {profile.titleEn}
                </p>
              </div>
            </div>

            {/* Direct Contact Coordinates */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Client Contact Coordinates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* WhatsApp */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono text-neutral-300 uppercase flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Inbound Number (Digits Only) *</span>
                    </label>
                    <span className="text-[9px] font-mono bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      CRITICAL FOR LEADS
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={profile.whatsappNumber}
                    onChange={(e) => setProfile({ ...profile, whatsappNumber: e.target.value })}
                    placeholder="201000000000"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                  <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
                    Direct chat link: https://wa.me/{profile.whatsappNumber}
                  </span>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Display Phone</span>
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+20 100 000 0000"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Studio Email</span>
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="alaa.issa.design@gmail.com"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Physical Studio Headquarters</span>
                  </label>
                  <input
                    type="text"
                    value={profile.locationEn}
                    onChange={(e) => setProfile({ ...profile, locationEn: e.target.value })}
                    placeholder="CAIRO | EGYPT"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram</span>
                  </label>
                  <input
                    type="text"
                    value={profile.instagram}
                    onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                    placeholder="@alaaissa.interiors"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>LinkedIn</span>
                  </label>
                  <input
                    type="text"
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    placeholder="Alaa Issa"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
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
                    Live Contact Card Preview
                  </span>
                </div>
                <span className="text-[10px] bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]">
                  Real Simulation
                </span>
              </div>

              {/* Live Preview Card */}
              <div className="bg-white text-black rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-300 relative select-none space-y-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 pb-3 border-b border-black/10">
                  06 • INITIATE COLLABORATION
                </div>

                <div>
                  <h3 className="text-xl font-editorial font-bold text-black uppercase mb-1">
                    Book Architectural Discovery
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans">
                    Turnkey Interior Architecture & Spatial Curation
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-black/10 font-mono text-xs">
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between">
                    <span className="text-neutral-500">WhatsApp:</span>
                    <span className="font-semibold text-emerald-600">
                      +{profile.whatsappNumber}
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between">
                    <span className="text-neutral-500">Phone:</span>
                    <span className="font-semibold text-black">{profile.phone}</span>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between">
                    <span className="text-neutral-500">Email:</span>
                    <span className="font-semibold text-black truncate max-w-[180px]">
                      {profile.email}
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between">
                    <span className="text-neutral-500">Studio:</span>
                    <span className="font-semibold text-black">{profile.locationEn}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${profile.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Test WhatsApp Launch</span>
                </a>
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
