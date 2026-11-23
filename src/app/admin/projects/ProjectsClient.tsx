'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus,
  Search,
  Star,
  Edit3,
  Trash2,
  ExternalLink,
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LayoutGrid,
  List,
  MapPin,
  X,
  AlertTriangle,
  Copy,
  FileText,
  Code,
  Smartphone,
  ShieldCheck,
  Sliders,
  ArrowLeftRight,
} from 'lucide-react'
import { Project } from '@/data/portfolioData'
import {
  deleteProjectAction,
  saveProjectAction,
  duplicateProjectAction,
  saveProjectCategoryAction,
  deleteProjectCategoryAction,
} from '../actions'
import { ProjectCategory, DEFAULT_PROJECT_CATEGORIES } from '@/data/portfolioData'
import { useAdminTranslation } from '@/context/AdminLanguageContext'
import { triggerHaptic } from '@/lib/haptics'

export default function ProjectsClient({
  initialProjects,
  initialCategories = [],
}: {
  initialProjects: Project[]
  initialCategories?: ProjectCategory[]
}) {
  const { t, isRtl } = useAdminTranslation()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [categories, setCategories] = useState<ProjectCategory[]>(
    initialCategories.length > 0 ? initialCategories : DEFAULT_PROJECT_CATEGORIES
  )
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [cvOnly, setCvOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'grid' | 'table'>('cards')
  
  // Modals & States
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCvModal, setShowCvModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCatId, setNewCatId] = useState('')
  const [newCatLabelEn, setNewCatLabelEn] = useState('')
  const [newCatLabelAr, setNewCatLabelAr] = useState('')
  const [isSavingCategory, setIsSavingCategory] = useState(false)
  const [swappingProjectId, setSwappingProjectId] = useState<string | null>(null)
  const [togglingFeaturedId, setTogglingFeaturedId] = useState<string | null>(null)
  const [togglingCvId, setTogglingCvId] = useState<string | null>(null)
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // CV Projects Count & Limit Tracking (Max 4 Rule)
  const cvProjects = useMemo(() => projects.filter((p) => p.includeInCv !== false), [projects])
  const cvCount = cvProjects.length

  // Swap CV Projects (1-Click Replacement)
  async function handleSwapCv(targetProjectToAdd: Project, oldProjectToRemove: Project) {
    const updatedOld = { ...oldProjectToRemove, includeInCv: false }
    const updatedNew = { ...targetProjectToAdd, includeInCv: true }

    const resOld = await saveProjectAction(updatedOld)
    const resNew = await saveProjectAction(updatedNew)

    if (resOld.success && resNew.success) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === oldProjectToRemove.id) return updatedOld
          if (p.id === targetProjectToAdd.id) return updatedNew
          return p
        })
      )
      setSwappingProjectId(null)
      setStatusMessage({
        type: 'success',
        text: `Swapped CV slot: "${targetProjectToAdd.titleEn}" replaced "${oldProjectToRemove.titleEn}".`,
      })
      setTimeout(() => setStatusMessage(null), 3500)
    } else {
      setStatusMessage({ type: 'error', text: 'Failed to complete project swap' })
    }
  }

  // Duplicate Project (1-Click Clone)
  async function handleDuplicate(project: Project) {
    setDuplicatingId(project.id)
    const res = await duplicateProjectAction(project.id)
    setDuplicatingId(null)

    if (res.success && res.project) {
      setProjects((prev) => [res.project!, ...prev])
      setStatusMessage({
        type: 'success',
        text: `Duplicated "${project.titleEn}" as "${res.project.titleEn}". Click Edit to customize!`,
      })
      setTimeout(() => setStatusMessage(null), 4500)
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Failed to duplicate project' })
    }
  }

  // Filter projects (memoized for instant responsiveness)
  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory
      const matchesFeatured = !featuredOnly || p.featured
      const matchesCv = !cvOnly || p.includeInCv !== false
      if (!matchesCategory || !matchesFeatured || !matchesCv) return false
      if (!q) return true
      return (
        p.titleEn.toLowerCase().includes(q) ||
        p.title.includes(q) ||
        p.locationEn.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      )
    })
  }, [projects, activeCategory, featuredOnly, cvOnly, search])

  // Category counts
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return projects.length
    return projects.filter((p) => p.category === catId).length
  }

  // Dynamic categories including custom ones
  const dynamicCategories = useMemo(() => {
    const allOption = { id: 'all', label: isRtl ? 'كافة المشاريع' : t.projects.allCategories }
    const seen = new Set<string>()
    const list = [allOption]

    categories.forEach((cat) => {
      seen.add(cat.id)
      list.push({
        id: cat.id,
        label: isRtl ? (cat.labelAr || cat.labelEn) : (cat.labelEn || cat.id),
      })
    })

    // Also include any legacy categories found in projects not yet registered
    projects.forEach((p) => {
      const cat = p.category
      if (cat && !seen.has(cat)) {
        seen.add(cat)
        list.push({
          id: cat,
          label: p.categoryLabelEn || cat.replace(/-/g, ' ').toUpperCase(),
        })
      }
    })

    return list
  }, [categories, projects, isRtl, t.projects.allCategories])

  // Save new or updated category
  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!newCatLabelEn && !newCatLabelAr) return

    const slug = (newCatId || newCatLabelEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    if (!slug) return

    setIsSavingCategory(true)
    const res = await saveProjectCategoryAction({
      id: slug,
      labelEn: newCatLabelEn || newCatLabelAr,
      labelAr: newCatLabelAr || newCatLabelEn,
    })
    setIsSavingCategory(false)

    if (res.success && res.categories) {
      setCategories(res.categories)
      setNewCatId('')
      setNewCatLabelEn('')
      setNewCatLabelAr('')
      setStatusMessage({ type: 'success', text: `Saved category "${newCatLabelEn || newCatLabelAr}"` })
      setTimeout(() => setStatusMessage(null), 3500)
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Failed to save category' })
    }
  }

  // Delete category
  async function handleDeleteCategory(catId: string) {
    const assignedCount = getCategoryCount(catId)
    if (assignedCount > 0) {
      alert(`Cannot delete this category because it is currently assigned to ${assignedCount} project(s). Please reassign them first.`)
      return
    }

    const res = await deleteProjectCategoryAction(catId)
    if (res.success && res.categories) {
      setCategories(res.categories)
      if (activeCategory === catId) setActiveCategory('all')
      setStatusMessage({ type: 'success', text: `Deleted category "${catId}"` })
      setTimeout(() => setStatusMessage(null), 3000)
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Failed to delete category' })
    }
  }

  // Toggle Featured status
  async function handleToggleFeatured(project: Project) {
    setTogglingFeaturedId(project.id)
    const updated = { ...project, featured: !project.featured }
    const res = await saveProjectAction(updated)
    setTogglingFeaturedId(null)

    if (res.success) {
      setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)))
      setStatusMessage({ type: 'success', text: `Updated featured status for "${project.titleEn}"` })
      setTimeout(() => setStatusMessage(null), 3000)
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Failed to update featured status' })
    }
  }

  // Toggle CV Featured status (Enforcing user-requested max 4 limit)
  async function handleToggleCv(project: Project) {
    const isCurrentlyInCv = project.includeInCv !== false
    const currentCvCount = projects.filter((p) => p.includeInCv !== false).length

    if (!isCurrentlyInCv && currentCvCount >= 4) {
      setStatusMessage({
        type: 'error',
        text: 'Maximum 4 projects can be featured in the CV. Please uncheck another project first.',
      })
      setTimeout(() => setStatusMessage(null), 4500)
      return
    }

    setTogglingCvId(project.id)
    const updated = { ...project, includeInCv: !isCurrentlyInCv }
    const res = await saveProjectAction(updated)
    setTogglingCvId(null)

    if (res.success) {
      setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)))
      setStatusMessage({
        type: 'success',
        text: `Updated CV status: "${project.titleEn}" ${!isCurrentlyInCv ? 'is now featured in the CV' : 'removed from CV'}.`,
      })
      setTimeout(() => setStatusMessage(null), 3000)
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Failed to update CV status' })
    }
  }

  // Confirm and Delete project
  async function confirmDelete() {
    if (!projectToDelete) return

    setIsDeleting(true)
    const res = await deleteProjectAction(projectToDelete.id)
    setIsDeleting(false)

    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id))
      setStatusMessage({ type: 'success', text: `Deleted project "${projectToDelete.titleEn}"` })
      setProjectToDelete(null)
      setTimeout(() => setStatusMessage(null), 3500)
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Failed to delete project' })
    }
  }

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Toast Alert Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-mono transition-all duration-300 shadow-xl ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200'
              : 'bg-red-950/60 border-red-800/80 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-neutral-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* CV Showcase Tracking Banner (Max 4 Rule) */}
      <div className="bg-[#111215]/90 border border-white/[0.08] p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-[#7AD1B8]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-white tracking-wide">
                LaTeX CV Showcase
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                  cvCount === 4
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : cvCount > 4
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {cvCount} / 4 Selected
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
              {cvCount === 4
                ? 'Optimal: exactly 4 featured projects will appear on the typeset LaTeX CV.'
                : cvCount < 4
                ? `Select ${4 - cvCount} more project${4 - cvCount > 1 ? 's' : ''} to reach the 4-project limit.`
                : 'Warning: more than 4 selected; please uncheck to maintain clean CV typesetting.'}
            </p>
          </div>
        </div>

        {/* 4-Segment Progress Indicator & Actions */}
        <div className="flex items-center gap-2.5 self-end sm:self-center flex-wrap">
          <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/[0.06]">
            {[0, 1, 2, 3].map((slot) => (
              <div
                key={slot}
                className={`w-4 h-2 rounded-xs transition-colors ${
                  slot < cvCount ? 'bg-[#7AD1B8]' : 'bg-white/10'
                }`}
                title={`CV Slot ${slot + 1}: ${slot < cvCount ? 'Filled' : 'Empty'}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowCvModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-all cursor-pointer active:scale-95"
            title="Open CV Slots Manager Matrix"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Manage 4 Slots</span>
          </button>

          <a
            href="/api/cv-pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-neutral-200 border border-white/[0.08] transition-all"
            title="Preview LaTeX CV PDF"
          >
            <span>Preview CV</span>
            <ExternalLink className="w-3 h-3 text-[#7AD1B8]" />
          </a>
        </div>
      </div>

      {/* Action Header: Search, Filters & View Mode Switcher */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Input (No iOS Auto-zoom, Bidirectional) */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, location, or slug key..."
              className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl ps-10 pe-10 py-3 text-[16px] sm:text-xs text-white placeholder-neutral-500 focus:outline-none transition-all font-mono"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light')
                  setSearch('')
                }}
                className="absolute end-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white p-2 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters & View Switcher */}
          <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end">
            <div className="flex items-center gap-1.5">
              {/* CV Only Filter */}
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('selection')
                  setCvOnly(!cvOnly)
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-mono border transition-all cursor-pointer active:scale-95 ${
                  cvOnly
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold shadow-sm'
                    : 'bg-white/[0.03] border-white/[0.08] text-neutral-400 hover:text-white'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 ${cvOnly ? 'text-[#7AD1B8]' : ''}`} />
                <span>CV ({cvCount})</span>
              </button>

              {/* Featured Only Filter */}
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('selection')
                  setFeaturedOnly(!featuredOnly)
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-mono border transition-all cursor-pointer active:scale-95 ${
                  featuredOnly
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold shadow-sm'
                    : 'bg-white/[0.03] border-white/[0.08] text-neutral-400 hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${featuredOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>Featured</span>
              </button>
            </div>

            {/* View Mode Switcher (Cards | Grid | Table - Table hidden on small mobile) */}
            <div className="flex items-center bg-[#111215] border border-white/[0.08] rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('selection')
                  setViewMode('cards')
                }}
                className={`p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg transition-all active:scale-90 cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title="Mobile Cards View"
                aria-label="Cards view"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('selection')
                  setViewMode('grid')
                }}
                className={`p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg transition-all active:scale-90 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title="Visual 3D Grid View"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('selection')
                  setViewMode('table')
                }}
                className={`hidden sm:flex p-2 min-w-[38px] min-h-[38px] items-center justify-center rounded-lg transition-all active:scale-90 cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title="Detailed Table View"
                aria-label="Table view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Add Project Button */}
            <Link
              href="/admin/projects/new"
              onClick={() => triggerHaptic('light')}
              className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 px-4 py-2 min-h-[40px] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-neutral-900" />
              <span>Add</span>
            </Link>
          </div>
        </div>

        {/* Category Swipeable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {/* Manage Categories Trigger */}
          <button
            type="button"
            onClick={() => setShowCategoryModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono whitespace-nowrap bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all cursor-pointer active:scale-95 shrink-0"
            title={t.projects.manageCategories}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.projects.manageCategories}</span>
          </button>

          {dynamicCategories.map((cat) => {
            const count = getCategoryCount(cat.id)
            const isActive = activeCategory === cat.id

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                    : 'bg-[#111215] text-neutral-400 hover:bg-white/[0.06] hover:text-white border border-white/[0.08]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-neutral-900 text-white' : 'bg-white/[0.08] text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl py-20 text-center space-y-4">
          <Layers className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No Projects Match</h3>
          <p className="text-neutral-400 text-xs font-mono max-w-sm mx-auto">
            Try resetting your search query, clearing filters, or adding a new project.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setActiveCategory('all')
              setFeaturedOnly(false)
              setCvOnly(false)
            }}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* ================= COMPACT MOBILE APP CARDS ================= */
        <div className="space-y-3">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-[#111215]/95 border border-white/[0.08] hover:border-amber-500/40 rounded-2xl p-3.5 sm:p-4 shadow-lg transition-all space-y-3 group"
            >
              {/* Top Row: Thumbnail + Core Metadata */}
              <div className="flex items-start gap-3.5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-white/[0.1]">
                  <Image
                    src={project.coverImage || '/images/projects/project-1.jpg'}
                    alt={project.titleEn}
                    fill
                    sizes="96px"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/80 text-white font-bold">
                    #{idx + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono uppercase bg-white/[0.06] text-amber-300 px-2 py-0.5 rounded border border-white/[0.08] truncate">
                      {project.categoryLabelEn || project.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                    {project.titleEn}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 truncate">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{project.locationEn}</span>
                    <span className="text-neutral-600">•</span>
                    <span>{project.area}</span>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-500">
                    <span>{project.gallery?.length || 0} renders</span>
                    {project.firmEn && <span> • {project.firmEn}</span>}
                  </div>
                </div>
              </div>

              {/* Bottom Thumb Action Row (Ergonomic Touch Targets) */}
              <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  {/* CV Quick Toggle Pill */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light')
                      handleToggleCv(project)
                    }}
                    disabled={togglingCvId === project.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-mono border transition-all cursor-pointer active:scale-95 ${
                      project.includeInCv !== false
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold shadow-sm'
                        : 'bg-white/[0.03] border-white/[0.08] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {togglingCvId === project.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FileText className={`w-3.5 h-3.5 ${project.includeInCv !== false ? 'text-[#7AD1B8]' : ''}`} />
                    )}
                    <span>{project.includeInCv !== false ? 'CV (Selected)' : 'Add to CV'}</span>
                  </button>

                  {/* Featured Quick Toggle Pill */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light')
                      handleToggleFeatured(project)
                    }}
                    disabled={togglingFeaturedId === project.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-mono border transition-all cursor-pointer active:scale-95 ${
                      project.featured
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold shadow-sm'
                        : 'bg-white/[0.03] border-white/[0.08] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {togglingFeaturedId === project.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                    )}
                    <span>{project.featured ? 'Featured' : 'Feature'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 ms-auto">
                  {/* Clone */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light')
                      handleDuplicate(project)
                    }}
                    disabled={duplicatingId === project.id}
                    className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-amber-400 rounded-xl border border-white/[0.08] active:scale-90 transition-all cursor-pointer"
                    title="Duplicate project"
                    aria-label="Duplicate project"
                  >
                    {duplicatingId === project.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Live */}
                  <Link
                    href={`/projects/${project.id}`}
                    target="_blank"
                    onClick={() => triggerHaptic('light')}
                    className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-white rounded-xl border border-white/[0.08] active:scale-90 transition-all"
                    title="View live page"
                    aria-label="View live page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* Edit */}
                  <Link
                    href={`/admin/projects/${project.id}`}
                    onClick={() => triggerHaptic('light')}
                    className="inline-flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-mono font-semibold active:scale-95 transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('warning')
                      setProjectToDelete(project)
                    }}
                    className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center text-neutral-500 hover:text-red-400 hover:bg-red-950/20 rounded-xl active:scale-90 transition-all cursor-pointer"
                    title="Delete project"
                    aria-label="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        /* ================= GRID VIEW ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-[#111215]/90 border border-white/[0.08] hover:border-amber-500/40 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Visual Cover Image */}
                <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                  <Image
                    src={project.coverImage || '/images/projects/project-1.jpg'}
                    alt={project.titleEn || project.title || 'Project'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono uppercase bg-black/70 backdrop-blur-md text-neutral-200 px-2.5 py-1 rounded-md border border-white/[0.1]">
                        {project.categoryLabelEn || project.category}
                      </span>
                      {project.firmEn && (
                        <span className="text-[10px] font-mono uppercase bg-amber-500/20 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/40">
                          {project.firmEn}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleCv(project)}
                        disabled={togglingCvId === project.id}
                        className={`p-1.5 rounded-lg backdrop-blur-md border transition-all cursor-pointer ${
                          project.includeInCv !== false
                            ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                            : 'bg-black/60 border-white/[0.1] text-neutral-500 hover:text-white'
                        }`}
                        title={project.includeInCv !== false ? 'Included in CV (Max 4)' : 'Include in CV (Max 4)'}
                      >
                        {togglingCvId === project.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FileText className={`w-3.5 h-3.5 ${project.includeInCv !== false ? 'text-[#7AD1B8]' : ''}`} />
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(project)}
                        disabled={togglingFeaturedId === project.id}
                        className={`p-1.5 rounded-lg backdrop-blur-md border transition-all cursor-pointer ${
                          project.featured
                            ? 'bg-amber-500/20 border-amber-500/60 text-amber-400'
                            : 'bg-black/60 border-white/[0.1] text-neutral-400 hover:text-white'
                        }`}
                        title={project.featured ? 'Featured on hero' : 'Mark as featured'}
                      >
                        {togglingFeaturedId === project.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-amber-400' : ''}`} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span className="truncate">{project.locationEn}</span>
                    </span>
                    <span>{project.area}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>{project.year}</span>
                    <span>{project.gallery?.length || 0} Gallery Renders</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                    {project.titleEn}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-1 font-sans">
                    {project.title}
                  </p>

                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                    {project.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 pt-3 border-t border-white/[0.06] bg-[#0c0d0e]/60 flex items-center justify-between">
                <Link
                  href={`/projects/${project.id}`}
                  target="_blank"
                  className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 group/link"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:text-amber-400" />
                  <span>Live Page</span>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDuplicate(project)}
                    disabled={duplicatingId === project.id}
                    className="p-1.5 text-neutral-400 hover:text-amber-400 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-colors cursor-pointer"
                    title="1-Click Duplicate Specifications"
                  >
                    {duplicatingId === project.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.08] hover:border-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-amber-400" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => setProjectToDelete(project)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= TABLE VIEW ================= */
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
          <div className="divide-y divide-white/[0.06]">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-white/[0.08]">
                    <Image
                      src={project.coverImage || '/images/projects/project-1.jpg'}
                      alt={project.titleEn || project.title || 'Project'}
                      fill
                      sizes="96px"
                      loading="lazy"
                      className="object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-neutral-300">
                      #{idx + 1}
                    </div>
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {project.titleEn}
                      </h3>
                      <span className="text-[10px] font-mono uppercase bg-white/[0.05] text-neutral-300 px-2 py-0.5 rounded border border-white/[0.08]">
                        {project.categoryLabelEn || project.category}
                      </span>
                      {project.firmEn && (
                        <span className="text-[10px] font-mono uppercase bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                          {project.firmEn}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 truncate">
                      {project.title}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-mono">
                      <span>{project.locationEn}</span>
                      <span>•</span>
                      <span>{project.area}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {/* CV Toggle */}
                  <button
                    onClick={() => handleToggleCv(project)}
                    disabled={togglingCvId === project.id}
                    title={project.includeInCv !== false ? 'Remove from CV' : 'Feature in CV (Max 4)'}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      project.includeInCv !== false
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-white/[0.03] border-white/[0.08] text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {togglingCvId === project.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileText
                        className={`w-4 h-4 ${
                          project.includeInCv !== false ? 'text-[#7AD1B8]' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Featured Toggle */}
                  <button
                    onClick={() => handleToggleFeatured(project)}
                    disabled={togglingFeaturedId === project.id}
                    title={project.featured ? 'Unfeature from Hero' : 'Feature in Hero'}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      project.featured
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                        : 'bg-white/[0.03] border-white/[0.08] text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {togglingFeaturedId === project.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Star
                        className={`w-4 h-4 ${
                          project.featured ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Duplicate Button */}
                  <button
                    type="button"
                    onClick={() => handleDuplicate(project)}
                    disabled={duplicatingId === project.id}
                    className="p-2 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-amber-400 rounded-lg border border-white/[0.06] transition-colors cursor-pointer"
                    title="1-Click Duplicate Specifications"
                  >
                    {duplicatingId === project.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Public Link */}
                  <Link
                    href={`/projects/${project.id}`}
                    target="_blank"
                    className="p-2 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-white rounded-lg border border-white/[0.06] transition-colors"
                    title="View live project page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* Edit Button */}
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.08] px-3 py-2 rounded-lg text-xs font-mono transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Edit</span>
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => setProjectToDelete(project)}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Bottom Sheet */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-transparent cursor-pointer"
            onClick={() => setProjectToDelete(null)}
          />

          <div className="relative z-10 w-full max-w-md mx-auto bg-[#131417] border-t sm:border border-red-900/40 rounded-t-[28px] sm:rounded-3xl p-5 sm:p-7 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] sm:pb-7 shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-300">
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden -mt-1 mb-1" />

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-950/40 text-red-400 border border-red-800/60 rounded-2xl shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  Confirm Project Deletion
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete{' '}
                  <span className="text-white font-semibold font-mono">
                    "{projectToDelete.titleEn}"
                  </span>
                  ? This will remove it from the public portfolio and all case study views.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-mono text-neutral-300 hover:bg-white/[0.05] border border-white/[0.08] active:scale-95 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-bold active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Project</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CV Showcase Manager Matrix Bottom Sheet */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-transparent cursor-pointer"
            onClick={() => {
              setShowCvModal(false)
              setSwappingProjectId(null)
            }}
          />

          <div className="relative z-10 w-full max-w-3xl mx-auto bg-[#121316] border-t sm:border border-white/[0.12] rounded-t-[28px] sm:rounded-3xl p-5 sm:p-8 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] sm:pb-8 shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-300">
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden -mt-1 mb-1" />

            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2 flex-wrap">
                    <span>LaTeX CV Showcase Matrix</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      {cvCount} / 4 Slots
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Precisely 4 projects typeset on the LaTeX PDF CV. Easily swap or replace.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light')
                  setShowCvModal(false)
                  setSwappingProjectId(null)
                }}
                className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-neutral-400 hover:text-white rounded-xl bg-white/[0.03] border border-white/[0.08] active:scale-90 transition-transform cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Active 4 Slots Grid */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Active CV Slots (1 to 4):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((slotIdx) => {
                  const p = cvProjects[slotIdx]
                  return (
                    <div
                      key={slotIdx}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        p
                          ? 'bg-[#090a0c] border-emerald-500/30'
                          : 'bg-white/[0.01] border-dashed border-white/10 flex items-center justify-center min-h-[90px]'
                      }`}
                    >
                      {p ? (
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-neutral-900">
                              <Image
                                src={p.coverImage}
                                alt={p.titleEn}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                              <div className="absolute top-1 left-1 bg-black/80 px-1 py-0.5 rounded text-[8px] font-mono text-emerald-400 font-bold">
                                #{slotIdx + 1}
                              </div>
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate">
                                {p.titleEn}
                              </div>
                              <div className="text-[10px] text-neutral-400 font-mono truncate">
                                {p.categoryLabelEn || p.category} • {p.year}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleCv(p)}
                            className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Remove from CV"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <span className="text-xs font-mono text-neutral-500">
                            Slot #{slotIdx + 1} Empty
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Available Projects to Swap or Add */}
            <div className="space-y-3 pt-3 border-t border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Other Portfolio Works (1-Click Add or Swap):
              </span>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-none">
                {projects
                  .filter((p) => p.includeInCv === false)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-[#090a0c] border border-white/[0.06] rounded-2xl flex items-center justify-between gap-3 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-neutral-900">
                          <Image src={p.coverImage} alt={p.titleEn} fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-white truncate">{p.titleEn}</div>
                          <div className="text-[10px] text-neutral-500 font-mono truncate">
                            {p.categoryLabelEn || p.category}
                          </div>
                        </div>
                      </div>

                      {cvCount < 4 ? (
                        <button
                          type="button"
                          onClick={() => handleToggleCv(p)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-all cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add to CV</span>
                        </button>
                      ) : swappingProjectId === p.id ? (
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-mono text-neutral-400 mr-1">Replace:</span>
                          {cvProjects.slice(0, 4).map((oldP, idx) => (
                            <button
                              key={oldP.id}
                              type="button"
                              onClick={() => handleSwapCv(p, oldP)}
                              className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold transition-all cursor-pointer"
                              title={`Replace ${oldP.titleEn}`}
                            >
                              #{idx + 1}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setSwappingProjectId(null)}
                            className="p-1 text-neutral-500 hover:text-white"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSwappingProjectId(p.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.08] text-xs font-mono transition-all cursor-pointer"
                        >
                          <ArrowLeftRight className="w-3 h-3 text-amber-400" />
                          <span>Swap into CV</span>
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Modal Bottom Strip */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <a
                href="/api/cv-pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline"
              >
                <span>Preview compiled LaTeX PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setShowCvModal(false)
                  setSwappingProjectId(null)
                }}
                className="px-4 py-2 rounded-xl bg-white text-neutral-950 font-semibold text-xs font-mono cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Management Bottom Sheet */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-transparent cursor-pointer"
            onClick={() => setShowCategoryModal(false)}
          />

          <div className="relative z-10 bg-[#0e1014] border-t sm:border border-white/[0.12] rounded-t-[28px] sm:rounded-3xl w-full max-w-lg mx-auto p-5 sm:p-6 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] sm:pb-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[88vh] flex flex-col select-none">
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden -mt-1 mb-1" />

            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                  {t.projects.manageCategories}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light')
                  setShowCategoryModal(false)
                }}
                className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-neutral-400 hover:text-white rounded-xl bg-white/[0.04] active:scale-90 transition-transform cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form: Add New Category */}
            <form onSubmit={handleSaveCategory} className="p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-3">
              <div className="text-xs font-mono uppercase text-amber-300 font-semibold tracking-wider">
                {t.projects.addCategory}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder={t.projects.categoryNameEn}
                  value={newCatLabelEn}
                  onChange={(e) => setNewCatLabelEn(e.target.value)}
                  className="bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white placeholder-neutral-500 focus:outline-none font-mono"
                  required
                />
                <input
                  type="text"
                  placeholder={t.projects.categoryNameAr}
                  value={newCatLabelAr}
                  onChange={(e) => setNewCatLabelAr(e.target.value)}
                  className="bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white placeholder-neutral-500 focus:outline-none font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSavingCategory || (!newCatLabelEn && !newCatLabelAr)}
                className="w-full py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-400 to-amber-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 active:scale-98 cursor-pointer"
              >
                {isSavingCategory ? t.common.saving : t.projects.addCategory}
              </button>
            </form>

            {/* List of Registered Categories */}
            <div className="overflow-y-auto no-scrollbar space-y-2 flex-1 pr-1 overscroll-contain">
              <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                Active Categories ({categories.length})
              </div>

              {categories.map((cat) => {
                const count = getCategoryCount(cat.id)
                return (
                  <div
                    key={cat.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate flex items-center gap-2">
                        <span>{isRtl ? (cat.labelAr || cat.labelEn) : (cat.labelEn || cat.id)}</span>
                        <span className="text-[10px] font-mono text-neutral-500">({cat.id})</span>
                      </div>
                      <div className="text-[10px] text-neutral-400 font-sans mt-0.5">
                        {isRtl ? cat.labelEn : cat.labelAr}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-neutral-300">
                        {count} works
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic('warning')
                          handleDeleteCategory(cat.id)
                        }}
                        className={`p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg text-red-400 hover:bg-red-950/30 active:scale-90 transition-transform cursor-pointer ${
                          count > 0 ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                        title={count > 0 ? 'Cannot delete category with active projects' : 'Delete category'}
                        aria-label="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
