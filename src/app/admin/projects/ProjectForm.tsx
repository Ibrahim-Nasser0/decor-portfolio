'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Image as ImageIcon,
  BookOpen,
  FileText,
  Palette,
  Eye,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Building2,
} from 'lucide-react'
import { Project, ProjectSpecs, MaterialSwatch, ProjectAngle } from '@/data/portfolioData'
import { saveProjectAction } from '../actions'
import { createClient } from '@/lib/supabase/client'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'

const CATEGORY_OPTIONS = [
  { value: 'living', labelEn: 'Living & Lounges', labelAr: 'صالونات ومعيشة' },
  { value: 'bedroom', labelEn: 'Master Bedrooms', labelAr: 'أجنحة النوم' },
  { value: 'kitchen', labelEn: 'Kitchens & Baths', labelAr: 'مطابخ وحمامات' },
  { value: 'commercial', labelEn: 'Commercial & Retail', labelAr: 'تجاري وإداري' },
  { value: 'villas', labelEn: 'Private Luxury Villas', labelAr: 'فلل وقصور خاصة' },
]

export default function ProjectForm({
  initialProject,
  isNew = false,
}: {
  initialProject?: Partial<Project>
  isNew?: boolean
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'general' | 'media' | 'story' | 'specs' | 'materials' | 'angles'>('general')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Interactive Slider Preview in Tab 2
  const [sliderPos, setSliderPos] = useState(50)

  // Form State
  const [formData, setFormData] = useState<Project>({
    id: initialProject?.id || '',
    title: initialProject?.title || '',
    titleEn: initialProject?.titleEn || '',
    category: (initialProject?.category as any) || 'living',
    categoryLabel: initialProject?.categoryLabel || 'صالونات ومعيشة',
    categoryLabelEn: initialProject?.categoryLabelEn || 'Living & Lounges',
    firmEn: initialProject?.firmEn || (initialProject?.specs as any)?.firmEn || 'Freelance Practice',
    coverImage: initialProject?.coverImage || '',
    gallery: initialProject?.gallery || [],
    beforeImage: initialProject?.beforeImage || '',
    location: initialProject?.location || '',
    locationEn: initialProject?.locationEn || '',
    year: initialProject?.year || '2026',
    area: initialProject?.area || '',
    style: initialProject?.style || '',
    styleEn: initialProject?.styleEn || '',
    description: initialProject?.description || '',
    descriptionEn: initialProject?.descriptionEn || '',
    palette: initialProject?.palette || ['#E7E3DC', '#4A3A2C', '#A2907D'],
    features: initialProject?.features || [],
    featuresEn: initialProject?.featuresEn || [],
    featured: Boolean(initialProject?.featured),
    includeInCv: initialProject?.includeInCv !== undefined ? Boolean(initialProject.includeInCv) : true,
    conceptEn: initialProject?.conceptEn || '',
    challengeEn: initialProject?.challengeEn || '',
    solutionEn: initialProject?.solutionEn || '',
    materialsDescriptionEn: initialProject?.materialsDescriptionEn || '',
    specs: initialProject?.specs || {
      scopeEn: '',
      durationEn: '',
      lightingEn: '',
      flooringEn: '',
      joineryEn: '',
    },
    angles: initialProject?.angles || [],
    materialSwatches: initialProject?.materialSwatches || [],
  })

  // Initial data snapshot for dirty tracking
  const [initialData, setInitialData] = useState<Project>(formData)
  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData)

  // Move gallery image left or right
  const moveGalleryImage = (index: number, direction: 'left' | 'right') => {
    const newGallery = [...formData.gallery]
    const targetIndex = direction === 'left' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newGallery.length) return
    const temp = newGallery[index]
    newGallery[index] = newGallery[targetIndex]
    newGallery[targetIndex] = temp
    setFormData((prev) => ({ ...prev, gallery: newGallery }))
  }

  // Keyboard shortcut: Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSaveProject()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [formData])

  // Handle Category Change
  const handleCategoryChange = (catValue: string) => {
    const match = CATEGORY_OPTIONS.find((c) => c.value === catValue)
    setFormData((prev) => ({
      ...prev,
      category: catValue as any,
      categoryLabel: match?.labelAr || '',
      categoryLabelEn: match?.labelEn || '',
    }))
  }

  // Handle Supabase Storage Image Upload
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetField: 'coverImage' | 'beforeImage' | 'gallery'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const fileName = `${formData.id || 'project'}-${Date.now()}.${ext}`
      const filePath = `projects/${fileName}`

      const { error } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, { upsert: true })

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from('portfolio-media').getPublicUrl(filePath)

      if (targetField === 'gallery') {
        setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, publicUrl] }))
      } else {
        setFormData((prev) => ({ ...prev, [targetField]: publicUrl }))
      }

      setFeedback({ type: 'success', text: 'Image uploaded to Supabase Storage successfully!' })
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: err.message || 'Image upload failed. You can also paste an image URL directly.',
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Handle Project Save
  const handleSaveProject = async () => {
    if (!formData.id || !formData.titleEn || !formData.coverImage) {
      setFeedback({
        type: 'error',
        text: 'Please fill in Project ID/Slug, English Title, and Cover Image.',
      })
      setActiveTab('general')
      return
    }

    setIsSaving(true)
    const res = await saveProjectAction(formData)
    setIsSaving(false)

    if (res.success) {
      setInitialData(formData)
      setFeedback({ type: 'success', text: `Project "${formData.titleEn}" saved successfully!` })
      if (isNew) {
        setTimeout(() => router.push(`/admin/projects/${formData.id}`), 1000)
      } else {
        setTimeout(() => setFeedback(null), 3500)
      }
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to save project' })
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#090a0c]/90 backdrop-blur-xl -mx-6 sm:-mx-8 lg:-mx-10 px-6 sm:px-8 lg:px-10 py-4 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-white rounded-xl border border-white/[0.08] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.2em] font-mono text-amber-500 uppercase">
                {isNew ? 'New Entry' : 'Editing Monograph Entry'}
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                (Press Ctrl+S to save)
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-serif text-white tracking-wide truncate max-w-md">
              {formData.titleEn || 'Untitled Architectural Project'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <Link
              href={`/projects/${formData.id}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white rounded-xl text-xs font-mono border border-white/[0.08] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Live View</span>
            </Link>
          )}

          <button
            type="button"
            onClick={handleSaveProject}
            disabled={isSaving}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 font-semibold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/20 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Project</span>
              </>
            )}
          </button>
        </div>
      </div>

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

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'general', label: '1. General Info', icon: FileText },
          { id: 'media', label: '2. Media & Gallery', icon: ImageIcon },
          { id: 'story', label: '3. Narrative & Story', icon: BookOpen },
          { id: 'specs', label: '4. Technical Specs', icon: Sliders },
          { id: 'materials', label: '5. Materials & Swatches', icon: Palette },
          { id: 'angles', label: '6. Angles & CAD', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-neutral-950 font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* TAB 1: GENERAL & INFO */}
      {activeTab === 'general' && (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium">
              Architectural Parameters & Identity
            </h2>
            <span className="text-[10px] font-mono text-neutral-400">Step 1 of 6</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slug ID */}
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Project Slug / URL Identifier *
              </label>
              <input
                type="text"
                required
                disabled={!isNew}
                value={formData.id}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    id: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                  }))
                }
                placeholder="e.g. tagamoa-japandi-residence"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono disabled:opacity-60"
              />
              <span className="text-[10px] text-neutral-400 font-mono mt-1.5 block">
                Public URL: /projects/{formData.id || 'slug-key'}
              </span>
            </div>

            {/* Category (Customizable & Dynamic) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono text-neutral-300 uppercase">
                  Category (Customizable) *
                </label>
                <span className="text-[10px] font-mono text-amber-400">
                  Tag: {formData.category || 'slug'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={formData.categoryLabelEn || ''}
                  onChange={(e) => {
                    const label = e.target.value;
                    const slug = label
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');
                    setFormData((prev) => ({
                      ...prev,
                      categoryLabelEn: label,
                      categoryLabel: label,
                      category: slug || 'custom',
                    }));
                  }}
                  placeholder="Category Name (e.g. Dining, Penthouses...)"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-sans"
                />
                <input
                  type="text"
                  required
                  value={formData.category || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                    }))
                  }
                  placeholder="Slug (e.g. dining-rooms)"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono"
                />
              </div>
              {/* Presets */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                {[
                  { slug: 'living', en: 'Living & Lounges' },
                  { slug: 'bedroom', en: 'Master Bedrooms' },
                  { slug: 'kitchen', en: 'Kitchens & Baths' },
                  { slug: 'commercial', en: 'Commercial & Retail' },
                  { slug: 'villas', en: 'Private Luxury Villas' },
                  { slug: 'penthouses', en: 'Penthouses & Duplexes' },
                  { slug: 'landscape', en: 'Terraces & Landscape' },
                ].map((preset) => (
                  <button
                    type="button"
                    key={preset.slug}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        category: preset.slug,
                        categoryLabelEn: preset.en,
                        categoryLabel: preset.en,
                      }))
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                      formData.category === preset.slug
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                        : 'bg-white/[0.02] text-neutral-400 border-white/[0.06] hover:text-white'
                    }`}
                  >
                    {preset.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Firm / Freelance Attribution */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono text-neutral-300 uppercase flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Practice / Firm / Freelance *</span>
                </label>
                <span className="text-[10px] font-mono text-emerald-400">
                  {formData.firmEn || 'Freelance Practice'}
                </span>
              </div>
              <input
                type="text"
                value={formData.firmEn || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, firmEn: e.target.value }))}
                placeholder="e.g. Freelance Practice, Alaa Issa Studio, Atelier Arch, Blueprint Consultancy..."
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-sans"
              />
              {/* Presets */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                {[
                  'Freelance Practice',
                  'Alaa Issa Studio',
                  'Atelier Arch',
                  'Blueprint Architectural Consultancy',
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setFormData((prev) => ({ ...prev, firmEn: opt }))}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                      formData.firmEn === opt
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                        : 'bg-white/[0.02] text-neutral-400 border-white/[0.06] hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* English Title */}
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Title (English) *
              </label>
              <input
                type="text"
                required
                value={formData.titleEn}
                onChange={(e) => setFormData((prev) => ({ ...prev, titleEn: e.target.value }))}
                placeholder="Tagamoa Residence - Warm Japandi Living Suite"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-sans"
              />
            </div>

            {/* Arabic Title */}
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Title (Arabic)
              </label>
              <input
                type="text"
                dir="rtl"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="ريزيدنس التجمع - صالون مودرن جاباندي دافئ"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-sans"
              />
            </div>

            {/* Location (EN) */}
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Location (English)
              </label>
              <input
                type="text"
                value={formData.locationEn}
                onChange={(e) => setFormData((prev) => ({ ...prev, locationEn: e.target.value }))}
                placeholder="New Cairo, 5th Settlement"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Location (AR) */}
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Location (Arabic)
              </label>
              <input
                type="text"
                dir="rtl"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="القاهرة الجديدة، التجمع الخامس"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Area & Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                  Area (m²)
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                  placeholder="75 m²"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                  placeholder="2026"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Architectural Style */}
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Architectural Style
              </label>
              <input
                type="text"
                value={formData.styleEn}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    styleEn: e.target.value,
                    style: prev.style || e.target.value,
                  }))
                }
                placeholder="Japandi Warm Minimalist"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Featured & CV Toggle Cards */}
          <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3.5 p-4 bg-[#090a0c] border border-white/[0.08] rounded-2xl cursor-pointer hover:border-amber-500/40 transition-colors">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded bg-neutral-900 border-white/20 text-amber-500 focus:ring-0 cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-white block">
                  Promote on Homepage Hero
                </span>
                <span className="text-[11px] text-neutral-400 font-mono block">
                  Appears in the monograph ribbon & case studies.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3.5 p-4 bg-[#090a0c] border border-white/[0.08] rounded-2xl cursor-pointer hover:border-emerald-500/40 transition-colors">
              <input
                type="checkbox"
                checked={formData.includeInCv}
                onChange={(e) => setFormData((prev) => ({ ...prev, includeInCv: e.target.checked }))}
                className="w-4 h-4 rounded bg-neutral-900 border-white/20 text-[#7AD1B8] focus:ring-0 cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  Include in Professional CV
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    Max 4
                  </span>
                </span>
                <span className="text-[11px] text-neutral-400 font-mono block">
                  Featured in the LaTeX Architectural CV.
                </span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* TAB 2: MEDIA & GALLERY + LIVE BEFORE/AFTER SLIDER PREVIEW */}
      {activeTab === 'media' && (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium">
              High-Resolution Imagery & Supabase Storage
            </h2>
            <span className="text-[10px] font-mono text-neutral-400">Step 2 of 6</span>
          </div>

          {/* Cover Image */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-neutral-300 uppercase">
                Cover Image (Primary Monograph Render) *
              </label>
              <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/20">
                Optimal: 16:10 or 16:9 (1920 × 1200 px) • Max 5MB
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                required
                value={formData.coverImage}
                onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                placeholder="https://... or upload to Supabase"
                className="flex-1 bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
              />
              <label className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white px-5 py-3 rounded-xl text-xs font-mono cursor-pointer border border-white/[0.08] hover:border-amber-500/40 transition-colors shrink-0">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload to Cloud</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'coverImage')}
                  className="hidden"
                />
              </label>
            </div>

            {formData.coverImage && (
              <div className="relative w-full max-w-md h-56 rounded-2xl overflow-hidden border border-white/[0.1] bg-black shadow-lg">
                <Image src={formData.coverImage} alt="Cover preview" fill sizes="450px" className="object-cover" />
              </div>
            )}
          </div>

          {/* Before/After Renovation Slider */}
          <div className="space-y-4 pt-6 border-t border-white/[0.08]">
            <label className="block text-xs font-mono text-neutral-300 uppercase">
              Before Renovation Image (For Interactive Comparison Slider)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                value={formData.beforeImage || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, beforeImage: e.target.value }))}
                placeholder="https://... or upload site survey photo"
                className="flex-1 bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
              />
              <label className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white px-5 py-3 rounded-xl text-xs font-mono cursor-pointer border border-white/[0.08] hover:border-amber-500/40 transition-colors shrink-0">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Before Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'beforeImage')}
                  className="hidden"
                />
              </label>
            </div>

            {/* Live Interactive Before/After Preview inside the Editor! */}
            {formData.beforeImage && formData.coverImage && (
              <div className="pt-2">
                <div className="text-[10px] font-mono text-neutral-400 uppercase mb-2 flex items-center gap-1.5">
                  <Sliders className="w-3 h-3 text-amber-400" />
                  <span>Interactive Comparison Slider Preview</span>
                </div>
                <div className="relative aspect-[16/9] max-w-xl rounded-2xl overflow-hidden border border-white/[0.1] bg-black select-none">
                  {/* After Finished Image (Base) */}
                  <Image src={formData.coverImage} alt="Finished" fill sizes="600px" className="object-cover" />
                  <div className="absolute top-3 right-3 bg-black/70 px-2.5 py-1 rounded-md text-[9px] font-mono text-amber-300">
                    AFTER
                  </div>

                  {/* Before Original Image (Clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <Image
                      src={formData.beforeImage}
                      alt="Before"
                      fill
                      sizes="600px"
                      className="object-cover max-w-none"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-3 left-3 bg-black/70 px-2.5 py-1 rounded-md text-[9px] font-mono text-neutral-300">
                      BEFORE
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
                    style={{ left: `${sliderPos}%` }}
                  />

                  {/* Control Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Gallery Manager */}
          <div className="space-y-4 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase">
                  Project Gallery Perspectives ({formData.gallery.length} Images)
                </label>
                <span className="text-[10px] text-neutral-400 font-mono">
                  High-res views displayed in the lightbox modal
                </span>
              </div>
              <label className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-mono cursor-pointer transition-colors">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'gallery')}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {formData.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative group h-32 rounded-2xl overflow-hidden border border-white/[0.08] bg-black shadow-md"
                >
                  <Image
                    src={imgUrl}
                    alt={`Gallery ${idx}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 220px"
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-neutral-300">
                    #{idx + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        gallery: prev.gallery.filter((_, i) => i !== idx),
                      }))
                    }
                    className="absolute top-2 right-2 p-1.5 bg-red-950/90 hover:bg-red-800 text-red-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Reorder Buttons */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-sm rounded-lg p-1 text-white">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveGalleryImage(idx, 'left')}
                      className="p-1 hover:text-amber-400 disabled:opacity-20 cursor-pointer"
                      title="Move Left"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono text-neutral-400">Position</span>
                    <button
                      type="button"
                      disabled={idx === formData.gallery.length - 1}
                      onClick={() => moveGalleryImage(idx, 'right')}
                      className="p-1 hover:text-amber-400 disabled:opacity-20 cursor-pointer"
                      title="Move Right"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STORY & NARRATIVE */}
      {activeTab === 'story' && (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium">
              Architectural Narrative & Case Study
            </h2>
            <span className="text-[10px] font-mono text-neutral-400">Step 3 of 6</span>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
              Spatial Concept Statement (English)
            </label>
            <textarea
              rows={3}
              value={formData.conceptEn || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, conceptEn: e.target.value }))}
              placeholder="Space organization is centered around the concept of a seamless modern agora..."
              className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Spatial Challenge (Problem Solved)
              </label>
              <textarea
                rows={3}
                value={formData.challengeEn || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, challengeEn: e.target.value }))}
                placeholder="A raw concrete shell with an obstructive structural column right in the primary sightline..."
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Architectural Solution
              </label>
              <textarea
                rows={3}
                value={formData.solutionEn || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, solutionEn: e.target.value }))}
                placeholder="Absorbed the column into an integrated fluted walnut media feature wall..."
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Comprehensive Description (English)
              </label>
              <textarea
                rows={5}
                value={formData.descriptionEn}
                onChange={(e) => setFormData((prev) => ({ ...prev, descriptionEn: e.target.value }))}
                placeholder="Detailed English narrative..."
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Comprehensive Description (Arabic)
              </label>
              <textarea
                rows={5}
                dir="rtl"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="الوصف الشامل باللغة العربية..."
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TECHNICAL SPECS */}
      {activeTab === 'specs' && (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium">
              Technical Specifications & Turnkey Schedule
            </h2>
            <span className="text-[10px] font-mono text-neutral-400">Step 4 of 6</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Scope of Work
              </label>
              <input
                type="text"
                value={formData.specs?.scopeEn || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specs: { ...prev.specs!, scopeEn: e.target.value } as ProjectSpecs,
                  }))
                }
                placeholder="Turnkey Interior Architecture, Shop Drawings & Site Supervision"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Duration & Execution Timeline
              </label>
              <input
                type="text"
                value={formData.specs?.durationEn || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specs: { ...prev.specs!, durationEn: e.target.value } as ProjectSpecs,
                  }))
                }
                placeholder="6 Weeks Design • 14 Weeks Turnkey Execution"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Lighting Engineering Scheme
              </label>
              <input
                type="text"
                value={formData.specs?.lightingEn || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specs: { ...prev.specs!, lightingEn: e.target.value } as ProjectSpecs,
                  }))
                }
                placeholder="3000K Warm Circadian Linear LED with Smart Dimming"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Flooring Specification
              </label>
              <input
                type="text"
                value={formData.specs?.flooringEn || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specs: { ...prev.specs!, flooringEn: e.target.value } as ProjectSpecs,
                  }))
                }
                placeholder="Natural Botticino Marble Slabs & Acoustic Underlayment"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-2 uppercase">
                Joinery & Millwork
              </label>
              <input
                type="text"
                value={formData.specs?.joineryEn || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specs: { ...prev.specs!, joineryEn: e.target.value } as ProjectSpecs,
                  }))
                }
                placeholder="Bespoke Walnut Vertical Fluting with Concealed Storage"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MATERIAL SWATCHES & PALETTE */}
      {activeTab === 'materials' && (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium">
                Material Finish Schedule & Tactile Swatches
              </h2>
              <span className="text-[10px] text-neutral-400 font-mono">
                Visual finish schedule rendered on the public project monograph
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  materialSwatches: [
                    ...(prev.materialSwatches || []),
                    { color: '#E7E3DC', nameEn: 'New Finish', finishEn: 'Honed Natural Slab' },
                  ],
                }))
              }
              className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Swatch</span>
            </button>
          </div>

          <div className="space-y-3.5">
            {formData.materialSwatches?.map((swatch, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#090a0c] border border-white/[0.08] rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-inner">
                    <input
                      type="color"
                      value={swatch.color}
                      onChange={(e) => {
                        const updated = [...(formData.materialSwatches || [])]
                        updated[idx].color = e.target.value
                        setFormData((prev) => ({ ...prev, materialSwatches: updated }))
                      }}
                      className="absolute inset-0 w-full h-full cursor-pointer bg-transparent border-0 scale-150"
                    />
                  </div>
                  <input
                    type="text"
                    value={swatch.color}
                    onChange={(e) => {
                      const updated = [...(formData.materialSwatches || [])]
                      updated[idx].color = e.target.value
                      setFormData((prev) => ({ ...prev, materialSwatches: updated }))
                    }}
                    className="w-24 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-neutral-300"
                  />
                </div>

                <div className="flex-1 w-full sm:w-auto">
                  <input
                    type="text"
                    value={swatch.nameEn}
                    onChange={(e) => {
                      const updated = [...(formData.materialSwatches || [])]
                      updated[idx].nameEn = e.target.value
                      setFormData((prev) => ({ ...prev, materialSwatches: updated }))
                    }}
                    placeholder="Material Name (e.g. Travertine Navona)"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex-1 w-full sm:w-auto">
                  <input
                    type="text"
                    value={swatch.finishEn}
                    onChange={(e) => {
                      const updated = [...(formData.materialSwatches || [])]
                      updated[idx].finishEn = e.target.value
                      setFormData((prev) => ({ ...prev, materialSwatches: updated }))
                    }}
                    placeholder="Finish Specification (e.g. Honed & Unfilled Natural Slab)"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      materialSwatches: prev.materialSwatches?.filter((_, i) => i !== idx),
                    }))
                  }
                  className="p-2 text-neutral-500 hover:text-red-400 self-end sm:self-center transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ANGLES & CAD */}
      {activeTab === 'angles' && (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium">
                Photographic Perspective Angles & Blueprints
              </h2>
              <span className="text-[10px] text-neutral-400 font-mono">
                Individual perspectives displayed in the project blueprint tabs
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  angles: [
                    ...(prev.angles || []),
                    { titleEn: 'New Angle Perspective', image: '' },
                  ],
                }))
              }
              className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Perspective</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.angles?.map((angle, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#090a0c] border border-white/[0.08] rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm"
              >
                <div className="w-full sm:w-1/3">
                  <input
                    type="text"
                    value={angle.titleEn}
                    onChange={(e) => {
                      const updated = [...(formData.angles || [])]
                      updated[idx].titleEn = e.target.value
                      setFormData((prev) => ({ ...prev, angles: updated }))
                    }}
                    placeholder="Angle Title (e.g. Panoramic Lounge View)"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex-1 w-full sm:w-auto">
                  <input
                    type="text"
                    value={angle.image}
                    onChange={(e) => {
                      const updated = [...(formData.angles || [])]
                      updated[idx].image = e.target.value
                      setFormData((prev) => ({ ...prev, angles: updated }))
                    }}
                    placeholder="Image URL or upload"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      angles: prev.angles?.filter((_, i) => i !== idx),
                    }))
                  }
                  className="p-2 text-neutral-500 hover:text-red-400 self-end sm:self-center transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Unsaved Changes Guard */}
      <UnsavedChangesBar
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={handleSaveProject}
        onDiscard={() => setFormData(initialData)}
      />
    </div>
  )
}
