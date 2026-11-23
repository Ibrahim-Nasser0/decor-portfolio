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
  MapPin,
  ExternalLink,
  PhoneCall,
  Sparkles,
  Camera,
  FileText,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Upload,
  Globe,
  Sliders,
  Share2,
} from 'lucide-react'
import { saveProfileAction } from '../actions'
import { createClient } from '@/lib/supabase/client'
import { compressImage } from '@/lib/imageCompression'
import { deleteStorageFile } from '@/lib/storageUtils'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'
import AdminToast from '@/components/admin/AdminToast'
import { useAdminTranslation } from '@/context/AdminLanguageContext'
import { triggerHaptic } from '@/lib/haptics'

export default function ProfileClient({ initialProfile }: { initialProfile: any }) {
  const { t, isRtl } = useAdminTranslation()
  const [profile, setProfile] = useState(initialProfile)
  const [initialData, setInitialData] = useState(initialProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingField, setUploadingField] = useState<'hero' | 'about' | 'avatar' | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Handle direct image file upload to Supabase Storage
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'heroImageUrl' | 'aboutImageUrl' | 'avatarUrl'
  ) => {
    const rawFile = e.target.files?.[0]
    if (!rawFile) return

    // Capture the existing image URL to automatically clean it up from Supabase Storage
    const previousUrl = profile[field]

    try {
      setUploadingField(field === 'heroImageUrl' ? 'hero' : field === 'aboutImageUrl' ? 'about' : 'avatar')
      const file = await compressImage(rawFile)
      const supabase = createClient()
      const ext = file.name.split('.').pop() || 'webp'
      const fileName = `${field}-${Date.now()}.${ext}`

      let bucket = 'profile-media'
      let uploadRes = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true })

      if (uploadRes.error) {
        bucket = 'portfolio-media'
        uploadRes = await supabase.storage.from(bucket).upload(`profile/${fileName}`, file, { upsert: true })
      }

      if (uploadRes.error) throw uploadRes.error

      const {
        data: { publicUrl },
      } = supabase.storage
        .from(bucket)
        .getPublicUrl(bucket === 'profile-media' ? fileName : `profile/${fileName}`)

      setProfile((prev: any) => ({ ...prev, [field]: publicUrl }))

      // Automatically delete the other/previous image from Supabase Storage
      if (previousUrl && previousUrl !== publicUrl) {
        await deleteStorageFile(previousUrl)
      }

      setFeedback({
        type: 'success',
        text: isRtl ? 'تم رفع الصورة وحذف الصورة السابقة تلقائياً!' : 'Photo uploaded and previous image cleaned up automatically!',
      })
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Failed to upload photo' })
    } finally {
      setUploadingField(null)
      e.target.value = ''
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

  // Prevent accidental window close or reload when dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSaving(true)
    const res = await saveProfileAction(profile)
    setIsSaving(false)

    if (res.success) {
      setInitialData(profile)
      setFeedback({ type: 'success', text: t.common.success })
      setTimeout(() => setFeedback(null), 3500)
    } else {
      setFeedback({ type: 'error', text: res.error || t.common.error })
    }
  }

  const handleDiscard = () => {
    setProfile(initialData)
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in relative pb-28 select-none">
      {/* Floating Toast Feedback (Zero Layout Shift) */}
      <AdminToast feedback={feedback} onClose={() => setFeedback(null)} />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-mono text-amber-500 uppercase font-semibold">
            Section 04 Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-wide mt-1">
            {t.profile.title}
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            {t.profile.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white rounded-xl text-xs font-mono border border-white/[0.08] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.common.preview}</span>
          </Link>

          <button
            type="submit"
            disabled={isSaving}
            onClick={() => triggerHaptic('success')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 font-bold px-5 py-2.5 min-h-[44px] rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                <span>{t.common.saving}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{t.common.save}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CARD 1: IDENTITY & DIRECT CONTACT COORDINATES                  */}
      {/* ============================================================== */}
      <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              {t.profile.tabGeneral}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Name EN */}
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {t.profile.nameEn}
            </label>
            <input
              type="text"
              value={profile.nameEn || ''}
              onChange={(e) => setProfile({ ...profile, nameEn: e.target.value })}
              className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
            />
          </div>

          {/* Name AR */}
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {t.profile.nameAr}
            </label>
            <input
              type="text"
              value={profile.nameAr || ''}
              onChange={(e) => setProfile({ ...profile, nameAr: e.target.value })}
              className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-sans"
            />
          </div>

          {/* Title EN */}
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {t.profile.roleEn}
            </label>
            <input
              type="text"
              value={profile.titleEn || ''}
              onChange={(e) => setProfile({ ...profile, titleEn: e.target.value })}
              className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
            />
          </div>

          {/* Title AR */}
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {t.profile.roleAr}
            </label>
            <input
              type="text"
              value={profile.titleAr || ''}
              onChange={(e) => setProfile({ ...profile, titleAr: e.target.value })}
              className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-sans"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {t.profile.phone}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                inputMode="tel"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl ps-10 pe-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {t.profile.whatsapp}
            </label>
            <div className="relative">
              <PhoneCall className="w-4 h-4 text-emerald-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                inputMode="tel"
                value={profile.whatsappNumber || profile.whatsapp || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    whatsappNumber: e.target.value,
                    whatsapp: e.target.value,
                  })
                }
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl ps-10 pe-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {t.profile.email}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                inputMode="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl ps-10 pe-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Location EN */}
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {isRtl ? 'المقر الجغرافي للاستوديو (بالإنجليزية)' : 'Studio Practice Location (English)'}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-neutral-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="NEW CAIRO • SHEIKH ZAYED • CAIRO, EGYPT"
                value={profile.locationEn || ''}
                onChange={(e) => setProfile({ ...profile, locationEn: e.target.value })}
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl ps-10 pe-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-sans"
              />
            </div>
          </div>

          {/* Location AR */}
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
              {isRtl ? 'المقر الجغرافي للاستوديو (بالعربية)' : 'Studio Practice Location (Arabic)'}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-neutral-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="القاهرة الجديدة • الشيخ زايد • القاهرة، مصر"
                value={profile.locationAr || ''}
                onChange={(e) => setProfile({ ...profile, locationAr: e.target.value })}
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl ps-10 pe-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-sans"
              />
            </div>
          </div>

          {/* Social Channels Divider */}
          <div className="md:col-span-2 pt-4 border-t border-white/[0.08]">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-3 font-semibold">
              {isRtl ? 'المنصات والشبكات المهنية المعمارية' : 'Portfolio & Professional Channels'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[9px] font-mono text-neutral-400 uppercase mb-1">Instagram</label>
                <input
                  type="text"
                  placeholder="@alaaissa.interiors"
                  value={profile.instagram || ''}
                  onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-neutral-400 uppercase mb-1">LinkedIn</label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/alaaessa"
                  value={profile.linkedin || ''}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-neutral-400 uppercase mb-1">Behance</label>
                <input
                  type="text"
                  placeholder="https://behance.net/alaaessa"
                  value={profile.behance || ''}
                  onChange={(e) => setProfile({ ...profile, behance: e.target.value })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Architectural Metrics */}
          <div className="md:col-span-2 pt-4 border-t border-white/[0.08]">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-3 font-semibold">
              {isRtl ? 'النسب والقياسات المعمارية' : 'Architectural Metrics & Fidelity'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-mono text-neutral-400 uppercase mb-1">
                  {isRtl ? 'إزاحة عدد المشاريع المنفذة (Built Works Offset)' : 'Built Works / Spaces Counter'}
                </label>
                <input
                  type="number"
                  value={profile.builtWorksOffset !== undefined ? profile.builtWorksOffset : 80}
                  onChange={(e) => setProfile({ ...profile, builtWorksOffset: Number(e.target.value) })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-neutral-400 uppercase mb-1">
                  {isRtl ? 'نسبة دقة التنفيذ المعماري (CAD Fidelity %)' : 'CAD Execution Fidelity %'}
                </label>
                <input
                  type="number"
                  min={80}
                  max={100}
                  value={profile.cadFidelity !== undefined ? profile.cadFidelity : 100}
                  onChange={(e) => setProfile({ ...profile, cadFidelity: Number(e.target.value) })}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CARD 2: VISUAL ASSETS STUDIO (WITH EXPLICIT CONTEXT LABELS)    */}
      {/* ============================================================== */}
      <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <Camera className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              {t.profile.contextImagesTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Image 1: Hero Main Slider Background */}
          <div className="p-4 bg-[#090a0c] border border-white/[0.08] hover:border-amber-500/30 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                {t.profile.context.heroSliderBg}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                {t.profile.context.heroSliderBgDesc}
              </p>
            </div>

            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-neutral-900 border border-white/[0.08]">
              <Image
                src={profile.heroImageUrl || profile.avatarUrl || '/images/alaa.webp'}
                alt="Hero Background Placement"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono text-neutral-500 uppercase">
                Image URL / Cloud Asset
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={profile.heroImageUrl || ''}
                  onChange={(e) => setProfile({ ...profile, heroImageUrl: e.target.value })}
                  className="flex-1 bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-300 border border-white/[0.08] hover:border-amber-500/40 rounded-xl text-xs font-mono transition-colors cursor-pointer shrink-0">
                  {uploadingField === 'hero' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{uploadingField === 'hero' ? '...' : (isRtl ? 'رفع' : 'Upload')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingField !== null}
                    onChange={(e) => handleImageUpload(e, 'heroImageUrl')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Image 2: Architect Portrait (About Section) */}
          <div className="p-4 bg-[#090a0c] border border-white/[0.08] hover:border-amber-500/30 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold">
                {t.profile.context.architectPortrait}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                {t.profile.context.architectPortraitDesc}
              </p>
            </div>

            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-neutral-900 border border-white/[0.08]">
              <Image
                src={profile.aboutImageUrl || '/images/alaa2.webp'}
                alt="Architect Portrait Placement"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono text-neutral-500 uppercase">
                Image URL / Cloud Asset
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={profile.aboutImageUrl || ''}
                  onChange={(e) => setProfile({ ...profile, aboutImageUrl: e.target.value })}
                  className="flex-1 bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-emerald-300 border border-white/[0.08] hover:border-emerald-500/40 rounded-xl text-xs font-mono transition-colors cursor-pointer shrink-0">
                  {uploadingField === 'about' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{uploadingField === 'about' ? '...' : (isRtl ? 'رفع' : 'Upload')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingField !== null}
                    onChange={(e) => handleImageUpload(e, 'aboutImageUrl')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Image 3: CV Dossier Card Thumbnail */}
          <div className="p-4 bg-[#090a0c] border border-white/[0.08] hover:border-amber-500/30 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="inline-block px-2.5 py-1 rounded-lg bg-[#7AD1B8]/15 border border-[#7AD1B8]/30 text-[#7AD1B8] font-mono text-[10px] font-bold">
                {t.profile.context.cvDossierCard}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                {t.profile.context.cvDossierCardDesc}
              </p>
            </div>

            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-neutral-900 border border-white/[0.08]">
              <Image
                src={profile.avatarUrl || '/images/alaa.webp'}
                alt="CV Card Placement"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono text-neutral-500 uppercase">
                Image URL / Cloud Asset
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={profile.avatarUrl || ''}
                  onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                  className="flex-1 bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-[#7AD1B8] border border-white/[0.08] hover:border-[#7AD1B8]/40 rounded-xl text-xs font-mono transition-colors cursor-pointer shrink-0">
                  {uploadingField === 'avatar' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#7AD1B8]" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{uploadingField === 'avatar' ? '...' : (isRtl ? 'رفع' : 'Upload')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingField !== null}
                    onChange={(e) => handleImageUpload(e, 'avatarUrl')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CARD 3: EDITORIAL COPY & PARAGRAPHS (WITH EXPLICIT CONTEXT)     */}
      {/* ============================================================== */}
      <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              {t.profile.contextParagraphsTitle}
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {/* Paragraph 1: Hero Main Headline & Tagline */}
          <div className="p-5 bg-[#090a0c] border border-white/[0.08] rounded-2xl space-y-3">
            <div className="space-y-1">
              <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                {t.profile.context.heroHeadline}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans">
                {t.profile.context.heroHeadlineDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">
                  Tagline (English)
                </label>
                <input
                  type="text"
                  value={profile.subtitleEn || ''}
                  onChange={(e) => setProfile({ ...profile, subtitleEn: e.target.value })}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">
                  Tagline (Arabic)
                </label>
                <input
                  type="text"
                  value={profile.subtitleAr || ''}
                  onChange={(e) => setProfile({ ...profile, subtitleAr: e.target.value })}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-sans"
                />
              </div>
            </div>
          </div>

          {/* Paragraph 2: Design Philosophy & Biography Body (About Section) */}
          <div className="p-5 bg-[#090a0c] border border-white/[0.08] rounded-2xl space-y-3">
            <div className="space-y-1">
              <div className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold">
                {t.profile.context.philosophyBody}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans">
                {t.profile.context.philosophyBodyDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">
                  Philosophy Narrative (English)
                </label>
                <textarea
                  rows={4}
                  value={profile.aboutIntroEn || ''}
                  onChange={(e) => setProfile({ ...profile, aboutIntroEn: e.target.value })}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl p-3.5 text-[16px] sm:text-xs text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">
                  Philosophy Narrative (Arabic)
                </label>
                <textarea
                  rows={4}
                  value={profile.aboutIntroAr || ''}
                  onChange={(e) => setProfile({ ...profile, aboutIntroAr: e.target.value })}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl p-3.5 text-[16px] sm:text-xs text-white focus:outline-none font-sans leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Paragraph 3: Academic Credentials & Studio Background (About Section) */}
          <div className="p-5 bg-[#090a0c] border border-white/[0.08] rounded-2xl space-y-3">
            <div className="space-y-1">
              <div className="inline-block px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 font-mono text-[10px] font-bold">
                {t.profile.context.academicBio}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans">
                {t.profile.context.academicBioDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">
                  Academic Background (English)
                </label>
                <textarea
                  rows={3}
                  value={profile.aboutExperienceEn || ''}
                  onChange={(e) => setProfile({ ...profile, aboutExperienceEn: e.target.value })}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl p-3.5 text-[16px] sm:text-xs text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">
                  Academic Background (Arabic)
                </label>
                <textarea
                  rows={3}
                  value={profile.aboutExperienceAr || ''}
                  onChange={(e) => setProfile({ ...profile, aboutExperienceAr: e.target.value })}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl p-3.5 text-[16px] sm:text-xs text-white focus:outline-none font-sans leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Paragraph 4: Direct Consultation & Contact Callout (Contact Section & Footer) */}
          <div className="p-5 bg-[#090a0c] border border-white/[0.08] rounded-2xl space-y-3">
            <div className="space-y-1">
              <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                {t.profile.context.contactInvitation}
              </div>
              <p className="text-[11px] text-neutral-400 font-sans">
                {t.profile.context.contactInvitationDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">
                  Consultation Callout (English)
                </label>
                <textarea
                  rows={2}
                  value={profile.statementEn || ''}
                  onChange={(e) => setProfile({ ...profile, statementEn: e.target.value })}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl p-3.5 text-[16px] sm:text-xs text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">
                  Consultation Callout (Arabic)
                </label>
                <textarea
                  rows={2}
                  value={profile.statementAr || ''}
                  onChange={(e) => setProfile({ ...profile, statementAr: e.target.value })}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl p-3.5 text-[16px] sm:text-xs text-white focus:outline-none font-sans leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Unsaved Changes Bar */}
      <UnsavedChangesBar
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </form>
  )
}
