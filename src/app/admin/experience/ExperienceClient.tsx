'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Sliders,
} from 'lucide-react'
import { saveProfileAction } from '../actions'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'
import AdminToast from '@/components/admin/AdminToast'
import AdminConfirmModal from '@/components/admin/AdminConfirmModal'
import { useAdminTranslation } from '@/context/AdminLanguageContext'
import { triggerHaptic } from '@/lib/haptics'

export default function ExperienceClient({ initialProfile }: { initialProfile: any }) {
  const { t, isRtl } = useAdminTranslation()
  const [profile, setProfile] = useState(initialProfile)
  const [activeTab, setActiveTab] = useState<'career' | 'software'>('career')

  // Career state
  const [experience, setExperience] = useState<any[]>(initialProfile.experience || [])
  const [education, setEducation] = useState<any[]>(initialProfile.education || [])

  // Software & Skills state
  const [software, setSoftware] = useState<any[]>(initialProfile.software || [])
  const [skills, setSkills] = useState<any>(initialProfile.skills || { technicalEn: [], technicalAr: [] })

  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'milestone' | 'education' | 'software'
    index: number
    title: string
  } | null>(null)

  // Snapshot for dirty tracking
  const [initialData, setInitialData] = useState({
    experience: initialProfile.experience || [],
    education: initialProfile.education || [],
    software: initialProfile.software || [],
    skills: initialProfile.skills || { technicalEn: [], technicalAr: [] },
  })

  const isDirty =
    JSON.stringify({ experience, education, software, skills }) !==
    JSON.stringify(initialData)

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

  // Ctrl+S / Cmd+S shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [experience, education, software, skills])

  const handleDiscard = () => {
    setExperience(initialData.experience)
    setEducation(initialData.education)
    setSoftware(initialData.software)
    setSkills(initialData.skills)
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSaving(true)
    const updated = {
      ...profile,
      experience,
      education,
      software,
      skills,
    }
    const res = await saveProfileAction(updated)
    setIsSaving(false)

    if (res.success) {
      setInitialData({ experience, education, software, skills })
      setFeedback({ type: 'success', text: t.common.success })
      setTimeout(() => setFeedback(null), 3500)
    } else {
      setFeedback({ type: 'error', text: res.error || t.common.error })
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 sm:space-y-8 animate-fade-in relative pb-28 select-none">
      {/* Floating Toast Feedback (Zero Layout Shift) */}
      <AdminToast feedback={feedback} onClose={() => setFeedback(null)} />

      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-mono text-amber-500 uppercase font-semibold">
            Section 03 Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-wide mt-1">
            {t.experience.title}
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            {t.experience.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#experience"
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

      {/* View Switcher Tabs (Career Milestones vs Software Toolset) */}
      <div className="flex items-center bg-[#111215] border border-white/[0.08] rounded-2xl p-1.5 gap-2 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('career')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'career'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>{t.experience.tabCareer}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('software')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'software'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>{t.experience.tabSoftware}</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: CAREER MILESTONES & EDUCATION                           */}
      {/* ============================================================== */}
      {activeTab === 'career' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          {/* Section 1: Professional Experience Milestones */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  {t.experience.tabCareer} ({experience.length})
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setExperience([
                    {
                      period: '2026 – PRESENT',
                      role: 'Senior Interior Architect',
                      company: 'Alaa Essa Studio',
                      location: 'Cairo & Alexandria',
                      description: 'Directing bespoke architectural schemes and turnkey execution.',
                      skills: ['Space Planning', 'Turnkey Execution'],
                    },
                    ...experience,
                  ])
                }
                className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.experience.addMilestone}</span>
              </button>
            </div>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#090a0c] border border-white/[0.08] rounded-2xl space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                      Milestone #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('warning')
                        setItemToDelete({
                          type: 'milestone',
                          index: idx,
                          title: exp.role || `Milestone #${idx + 1}`,
                        })
                      }}
                      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-500 hover:text-red-400 active:scale-90 transition-transform cursor-pointer"
                      title={t.common.delete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        {t.experience.periodDates}
                      </label>
                      <input
                        type="text"
                        value={exp.period || ''}
                        onChange={(e) => {
                          const updated = [...experience]
                          updated[idx].period = e.target.value
                          setExperience(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        {t.experience.roleTitleEn}
                      </label>
                      <input
                        type="text"
                        value={exp.role || ''}
                        onChange={(e) => {
                          const updated = [...experience]
                          updated[idx].role = e.target.value
                          setExperience(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        {t.experience.officeCompanyEn}
                      </label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => {
                          const updated = [...experience]
                          updated[idx].company = e.target.value
                          setExperience(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        {t.experience.locationEn}
                      </label>
                      <input
                        type="text"
                        value={exp.location || ''}
                        onChange={(e) => {
                          const updated = [...experience]
                          updated[idx].location = e.target.value
                          setExperience(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        {t.experience.responsibilitiesEn}
                      </label>
                      <textarea
                        rows={3}
                        value={exp.description || ''}
                        onChange={(e) => {
                          const updated = [...experience]
                          updated[idx].description = e.target.value
                          setExperience(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl p-3.5 text-[16px] sm:text-xs text-white focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Education & Degrees */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  Academic Degrees & Diplomas ({education.length})
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEducation([
                    {
                      degree: 'B.Sc. in Interior Architecture',
                      institution: 'Faculty of Fine Arts, Alexandria University',
                      year: '2021',
                      grade: 'Excellent with Honors',
                    },
                    ...education,
                  ])
                }
                className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-emerald-400 border border-white/[0.08] hover:border-emerald-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree</span>
              </button>
            </div>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#090a0c] border border-white/[0.08] rounded-2xl space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                      Degree #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('warning')
                        setItemToDelete({
                          type: 'education',
                          index: idx,
                          title: edu.degree || `Degree #${idx + 1}`,
                        })
                      }}
                      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-500 hover:text-red-400 active:scale-90 transition-transform cursor-pointer"
                      title={t.common.delete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Degree Title
                      </label>
                      <input
                        type="text"
                        value={edu.degree || ''}
                        onChange={(e) => {
                          const updated = [...education]
                          updated[idx].degree = e.target.value
                          setEducation(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Institution / University
                      </label>
                      <input
                        type="text"
                        value={edu.institution || ''}
                        onChange={(e) => {
                          const updated = [...education]
                          updated[idx].institution = e.target.value
                          setEducation(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Year of Graduation
                      </label>
                      <input
                        type="text"
                        value={edu.year || ''}
                        onChange={(e) => {
                          const updated = [...education]
                          updated[idx].year = e.target.value
                          setEducation(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Grade / Honors
                      </label>
                      <input
                        type="text"
                        value={edu.grade || ''}
                        onChange={(e) => {
                          const updated = [...education]
                          updated[idx].grade = e.target.value
                          setEducation(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: SOFTWARE & PRODUCTION TOOLSET                           */}
      {/* ============================================================== */}
      {activeTab === 'software' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-sky-400" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  {t.experience.tabSoftware} ({software.length})
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSoftware([
                    ...software,
                    {
                      name: 'Rhino 3D',
                      role: 'Parametric Surfaces & Computational Modeling',
                      engine: 'McNeel',
                      badge: 'NURBS',
                      color: 'from-sky-500 to-indigo-600',
                      deliverable: 'Parametric Form Generation',
                      category: '3D & Modeling',
                      proficiency: 90,
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-sky-400 border border-white/[0.08] hover:border-sky-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.experience.addTool}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {software.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#090a0c] border border-white/[0.08] rounded-2xl space-y-4 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        {tool.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('warning')
                        setItemToDelete({
                          type: 'software',
                          index: idx,
                          title: tool.name || `Tool #${idx + 1}`,
                        })
                      }}
                      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-500 hover:text-red-400 active:scale-90 transition-transform cursor-pointer"
                      title={t.common.delete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        {t.experience.toolName}
                      </label>
                      <input
                        type="text"
                        value={tool.name || ''}
                        onChange={(e) => {
                          const updated = [...software]
                          updated[idx].name = e.target.value
                          setSoftware(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Engine / Publisher
                      </label>
                      <input
                        type="text"
                        value={tool.engine || ''}
                        onChange={(e) => {
                          const updated = [...software]
                          updated[idx].engine = e.target.value
                          setSoftware(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                        Production Role / Specialization
                      </label>
                      <input
                        type="text"
                        value={tool.role || ''}
                        onChange={(e) => {
                          const updated = [...software]
                          updated[idx].role = e.target.value
                          setSoftware(updated)
                        }}
                        className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Unsaved Changes Bar */}
      <UnsavedChangesBar
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />

      {/* Item Deletion Confirmation Modal */}
      <AdminConfirmModal
        isOpen={itemToDelete !== null}
        title={
          isRtl
            ? `تأكيد حذف ${
                itemToDelete?.type === 'milestone'
                  ? 'المحطة المهنية'
                  : itemToDelete?.type === 'education'
                  ? 'المؤهل الدراسي'
                  : 'أداة التصميم'
              }`
            : `Confirm Delete ${
                itemToDelete?.type === 'milestone'
                  ? 'Career Milestone'
                  : itemToDelete?.type === 'education'
                  ? 'Degree'
                  : 'Design Tool'
              }`
        }
        message={
          isRtl
            ? `هل أنت متأكد من رغبتك في حذف "${itemToDelete?.title}" نهائياً من سيرتك وسجلات الاستوديو؟`
            : `Are you sure you want to permanently delete "${itemToDelete?.title}"? This item will be removed from your portfolio and CV.`
        }
        confirmLabel={isRtl ? 'نعم، حذف' : 'Delete'}
        cancelLabel={isRtl ? 'إلغاء' : 'Cancel'}
        isDestructive={true}
        onConfirm={() => {
          if (!itemToDelete) return
          if (itemToDelete.type === 'milestone') {
            setExperience((prev) => prev.filter((_, i) => i !== itemToDelete.index))
          } else if (itemToDelete.type === 'education') {
            setEducation((prev) => prev.filter((_, i) => i !== itemToDelete.index))
          } else if (itemToDelete.type === 'software') {
            setSoftware((prev) => prev.filter((_, i) => i !== itemToDelete.index))
          }
          setItemToDelete(null)
        }}
        onCancel={() => setItemToDelete(null)}
      />
    </form>
  )
}
