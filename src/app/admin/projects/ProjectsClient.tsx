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
  Maximize2,
  X,
  AlertTriangle,
  Copy,
} from 'lucide-react'
import { Project } from '@/data/portfolioData'
import { deleteProjectAction, saveProjectAction, duplicateProjectAction } from '../actions'

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'living', label: 'Living & Lounges' },
  { id: 'bedroom', label: 'Master Bedrooms' },
  { id: 'kitchen', label: 'Kitchens & Baths' },
  { id: 'commercial', label: 'Commercial & Retail' },
  { id: 'villas', label: 'Luxury Villas' },
]

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  
  // Modals & States
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [togglingFeaturedId, setTogglingFeaturedId] = useState<string | null>(null)
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

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
      if (!matchesCategory || !matchesFeatured) return false
      if (!q) return true
      return (
        p.titleEn.toLowerCase().includes(q) ||
        p.title.includes(q) ||
        p.locationEn.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      )
    })
  }, [projects, activeCategory, featuredOnly, search])

  // Category counts
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return projects.length
    return projects.filter((p) => p.category === catId).length
  }

  // Dynamic categories including custom ones
  const dynamicCategories = useMemo(() => {
    const list = [{ id: 'all', label: 'All Works' }]
    const seen = new Set<string>()

    const defaultLabels: Record<string, string> = {
      living: 'Living & Lounges',
      bedroom: 'Master Bedrooms',
      kitchen: 'Kitchens & Baths',
      commercial: 'Commercial & Retail',
      villas: 'Luxury Villas',
    }

    projects.forEach((p) => {
      const cat = p.category
      if (cat && !seen.has(cat)) {
        seen.add(cat)
        list.push({
          id: cat,
          label: p.categoryLabelEn || defaultLabels[cat] || cat.replace(/-/g, ' ').toUpperCase(),
        })
      }
    })

    return list
  }, [projects])

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
    <div className="space-y-6 animate-fade-in">
      {/* Toast Alert Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-mono transition-all duration-300 shadow-xl ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-200'
              : 'bg-red-950/50 border-red-800/80 text-red-200'
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

      {/* Action Header: Search, View Switcher & New Project */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, location, or slug key..."
            className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all font-mono"
          />
        </div>

        {/* View Switcher, Featured Toggle & Add Button */}
        <div className="flex items-center gap-3 self-end md:self-center flex-wrap">
          {/* Featured Filter Toggle */}
          <button
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              featuredOnly
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : 'bg-white/[0.03] border-white/[0.08] text-neutral-400 hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${featuredOnly ? 'fill-amber-400' : ''}`} />
            <span>Featured Only</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#111215] border border-white/[0.08] rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white/[0.1] text-amber-400'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="Visual Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white/[0.1] text-amber-400'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="Detailed Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Project Button */}
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-neutral-900" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Category Pills with Project Counts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {dynamicCategories.map((cat) => {
          const count = getCategoryCount(cat.id)
          const isActive = activeCategory === cat.id

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                  : 'bg-[#111215] text-neutral-400 hover:bg-white/[0.06] hover:text-white border border-white/[0.08]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white/[0.08] text-neutral-400'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl py-24 text-center space-y-4">
          <Layers className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No Projects Match</h3>
          <p className="text-neutral-400 text-xs font-mono max-w-sm mx-auto">
            Try resetting your search query, clearing filters, or adding a new project to the portfolio.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setActiveCategory('all')
              setFeaturedOnly(false)
            }}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4"
          >
            Reset Filters
          </button>
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

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#131417] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
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
                className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-300 hover:bg-white/[0.05] border border-white/[0.08] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-mono transition-colors shadow-md cursor-pointer disabled:opacity-50"
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
    </div>
  )
}
