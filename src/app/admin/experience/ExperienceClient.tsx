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
} from 'lucide-react'
import { saveProfileAction } from '../actions'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'

export default function ExperienceClient({ initialProfile }: { initialProfile: any }) {
  const [profile, setProfile] = useState(initialProfile)
  const [experience, setExperience] = useState<any[]>(initialProfile.experience || [])
  const [education, setEducation] = useState<any[]>(initialProfile.education || [])
  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Snapshot for dirty tracking
  const [initialData, setInitialData] = useState({
    experience: initialProfile.experience || [],
    education: initialProfile.education || [],
  })

  const isDirty =
    JSON.stringify({ experience, education }) !== JSON.stringify(initialData)

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
  }, [experience, education])

  const handleDiscard = () => {
    setExperience(initialData.experience)
    setEducation(initialData.education)
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSaving(true)
    const updated = {
      ...profile,
      experience,
      education,
    }
    const res = await saveProfileAction(updated)
    setIsSaving(false)

    if (res.success) {
      setInitialData({ experience, education })
      setFeedback({ type: 'success', text: 'Career milestones & education credentials saved!' })
      setTimeout(() => setFeedback(null), 3500)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update experience' })
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in relative pb-28">
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

      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-mono text-amber-500 uppercase">
            Section 04 Management
          </span>
          <h1 className="text-2xl font-serif text-white tracking-wide mt-1">
            Experience & Education Chronology
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Manage professional studio leadership roles, firm appointments, and academic degrees.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#experience"
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white rounded-xl text-xs font-mono border border-white/[0.08] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Preview Section</span>
          </Link>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 font-semibold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Experience</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Section 1: Professional Experience Milestones */}
      <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-white">
              Professional Practice Appointments ({experience.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              setExperience([
                {
                  period: '2026 – PRESENT',
                  role: 'Interior Architect & Consultant',
                  company: 'Alaa Issa Studio',
                  location: 'Cairo, Egypt',
                  description: 'Directing bespoke architectural schemes and turnkey execution.',
                  skills: ['Space Planning', 'Turnkey Execution'],
                },
                ...experience,
              ])
            }
            className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Role</span>
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
                  onClick={() => setExperience(experience.filter((_, i) => i !== idx))}
                  className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Period
                  </label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => {
                      const updated = [...experience]
                      updated[idx].period = e.target.value
                      setExperience(updated)
                    }}
                    placeholder="2024 – PRESENT"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => {
                      const updated = [...experience]
                      updated[idx].role = e.target.value
                      setExperience(updated)
                    }}
                    placeholder="Lead Interior Architect"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Company / Studio Firm
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...experience]
                      updated[idx].company = e.target.value
                      setExperience(updated)
                    }}
                    placeholder="Alaa Issa Studio"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => {
                      const updated = [...experience]
                      updated[idx].location = e.target.value
                      setExperience(updated)
                    }}
                    placeholder="Cairo, Egypt"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  Scope & Responsibilities Description
                </label>
                <textarea
                  rows={3}
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...experience]
                    updated[idx].description = e.target.value
                    setExperience(updated)
                  }}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Education & Academic Honors */}
      <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-white">
              Academic Degrees & Diplomas ({education.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              setEducation([
                ...education,
                {
                  year: '2024 – 2025',
                  titleEn: 'Advanced Diploma in Lighting & Millwork',
                  institutionEn: 'Institute of Architecture',
                  descEn: 'Focusing on circadian lighting and joinery.',
                },
              ])
            }
            className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
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
                <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                  Degree #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setEducation(education.filter((_, i) => i !== idx))}
                  className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Years
                  </label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => {
                      const updated = [...education]
                      updated[idx].year = e.target.value
                      setEducation(updated)
                    }}
                    placeholder="2020 – 2024"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Degree Title (English)
                  </label>
                  <input
                    type="text"
                    value={edu.titleEn}
                    onChange={(e) => {
                      const updated = [...education]
                      updated[idx].titleEn = e.target.value
                      setEducation(updated)
                    }}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Institution (English)
                  </label>
                  <input
                    type="text"
                    value={edu.institutionEn}
                    onChange={(e) => {
                      const updated = [...education]
                      updated[idx].institutionEn = e.target.value
                      setEducation(updated)
                    }}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Honors & Description
                  </label>
                  <input
                    type="text"
                    value={edu.descEn}
                    onChange={(e) => {
                      const updated = [...education]
                      updated[idx].descEn = e.target.value
                      setEducation(updated)
                    }}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
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
