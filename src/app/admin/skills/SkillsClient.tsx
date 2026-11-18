'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Cpu,
  BookOpen,
  Eye,
  Sliders,
  Sparkles,
  Layers,
  Check,
} from 'lucide-react'
import { saveProfileAction } from '../actions'
import UnsavedChangesBar from '@/components/admin/UnsavedChangesBar'

export default function SkillsClient({ initialProfile }: { initialProfile: any }) {
  const [profile, setProfile] = useState(initialProfile)
  const [software, setSoftware] = useState<any[]>(initialProfile.software || [])
  const [skills, setSkills] = useState<any>(initialProfile.skills || { technicalEn: [], technicalAr: [] })
  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showLivePreview, setShowLivePreview] = useState(true)

  // Snapshot for dirty state tracking
  const [initialData, setInitialData] = useState({
    software: initialProfile.software || [],
    skills: initialProfile.skills || { technicalEn: [], technicalAr: [] },
  })

  const isDirty =
    JSON.stringify({ software, skills }) !== JSON.stringify(initialData)

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [software, skills])

  const handleDiscard = () => {
    setSoftware(initialData.software)
    setSkills(initialData.skills)
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSaving(true)
    const updatedProfile = {
      ...profile,
      software,
      skills,
    }
    const res = await saveProfileAction(updatedProfile)
    setIsSaving(false)

    if (res.success) {
      setInitialData({ software, skills })
      setFeedback({ type: 'success', text: 'Software suite and competencies saved successfully!' })
      setTimeout(() => setFeedback(null), 3000)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to save skills' })
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in relative pb-28">
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
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-neutral-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Toolbar: Live Preview Toggle & Save Button */}
      <div className="flex items-center justify-between gap-4 bg-[#111215]/80 p-4 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              showLivePreview
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-white/[0.05] text-neutral-400 hover:text-white border border-white/[0.08]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}</span>
          </button>
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-300">Ctrl+S</kbd> to save anytime
          </span>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-semibold px-5 py-2 rounded-xl text-xs font-mono tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
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

      {/* Main Grid: Editor Left, Live Preview Right */}
      <div className={`grid grid-cols-1 ${showLivePreview ? 'lg:grid-cols-12' : ''} gap-8`}>
        {/* Editor Form Column */}
        <div className={`${showLivePreview ? 'lg:col-span-7' : 'max-w-4xl'} space-y-6`}>
          {/* Section 1: Software Suite */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white">
                  3D Modeling & Production Software Suite
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSoftware((prev) => [
                    ...prev,
                    {
                      name: 'Rhino 3D',
                      engine: 'McNeel',
                      role: 'NURBS Parametric Surface Modeling',
                      badge: 'RHN',
                      level: '92%',
                      deliverable: 'Complex double-curved geometric surfaces',
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.08] hover:border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tool</span>
              </button>
            </div>

            <div className="space-y-4">
              {software.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#090a0c] border border-white/[0.08] rounded-2xl space-y-3 shadow-sm hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-20">
                      <label className="text-[10px] font-mono text-neutral-400 block mb-1">
                        Badge
                      </label>
                      <input
                        type="text"
                        value={tool.badge || ''}
                        onChange={(e) => {
                          const updated = [...software]
                          updated[idx].badge = e.target.value
                          setSoftware(updated)
                        }}
                        placeholder="3DS"
                        className="w-full bg-[#111215] border border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs font-mono text-center text-amber-400 font-bold focus:outline-none"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="text-[10px] font-mono text-neutral-400 block mb-1">
                        Software Name
                      </label>
                      <input
                        type="text"
                        value={tool.name || ''}
                        onChange={(e) => {
                          const updated = [...software]
                          updated[idx].name = e.target.value
                          setSoftware(updated)
                        }}
                        placeholder="3ds Max"
                        className="w-full bg-[#111215] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="w-28">
                      <label className="text-[10px] font-mono text-neutral-400 block mb-1">
                        Proficiency
                      </label>
                      <input
                        type="text"
                        value={tool.level || '95%'}
                        onChange={(e) => {
                          const updated = [...software]
                          updated[idx].level = e.target.value
                          setSoftware(updated)
                        }}
                        placeholder="96%"
                        className="w-full bg-[#111215] border border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs font-mono text-center text-emerald-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSoftware(software.filter((_, i) => i !== idx))}
                      className="p-2 text-neutral-500 hover:text-red-400 self-end transition-colors cursor-pointer"
                      title="Remove Software"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 block mb-1">
                        Engine / Developer
                      </label>
                      <input
                        type="text"
                        value={tool.engine || ''}
                        onChange={(e) => {
                          const updated = [...software]
                          updated[idx].engine = e.target.value
                          setSoftware(updated)
                        }}
                        placeholder="Autodesk"
                        className="w-full bg-[#111215] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-neutral-300 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 block mb-1">
                        Architectural Role
                      </label>
                      <input
                        type="text"
                        value={tool.role || ''}
                        onChange={(e) => {
                          const updated = [...software]
                          updated[idx].role = e.target.value
                          setSoftware(updated)
                        }}
                        placeholder="High-Poly Spatial Modeling"
                        className="w-full bg-[#111215] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-neutral-300 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Technical Competencies */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-white">
                  Architectural Disciplines & Core Competencies
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSkills((prev: any) => ({
                    ...prev,
                    technicalEn: [...(prev.technicalEn || []), 'New Architectural Discipline'],
                  }))
                }
                className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.08] hover:border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Discipline</span>
              </button>
            </div>

            <div className="space-y-3">
              {skills.technicalEn?.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-500 w-7">#{idx + 1}</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...skills.technicalEn]
                      updated[idx] = e.target.value
                      setSkills({ ...skills, technicalEn: updated })
                    }}
                    placeholder="e.g. Ergonomic Space Planning & Clearance Optimization"
                    className="flex-1 bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-sans"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSkills({
                        ...skills,
                        technicalEn: skills.technicalEn.filter((_: any, i: number) => i !== idx),
                      })
                    }
                    className="p-2 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        {showLivePreview && (
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Section Simulation
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Section 03 • Skills</span>
              </div>

              {/* Simulation Sandbox Card */}
              <div className="bg-[#0b0c0e] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-amber-400 mb-1">
                    03 • TECHNICAL MASTERY
                  </div>
                  <h3 className="text-lg font-serif font-light text-white">
                    Digital Tools & Production Engine
                  </h3>
                </div>

                {/* Software Cards Simulation */}
                <div className="space-y-3">
                  {software.slice(0, 4).map((tool, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex items-center justify-between gap-3 hover:border-amber-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-amber-300">
                          {tool.badge || '3D'}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white flex items-center gap-2">
                            <span>{tool.name || 'Software'}</span>
                            {tool.engine && (
                              <span className="text-[9px] text-neutral-400 font-mono">
                                • {tool.engine}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-400 font-mono">
                            {tool.role || 'Role'}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {tool.level || '95%'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {software.length > 4 && (
                    <div className="text-center text-[10px] font-mono text-neutral-400 pt-1">
                      + {software.length - 4} more production tools configured
                    </div>
                  )}
                </div>

                {/* Technical Disciplines Tags Simulation */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Core Technical Disciplines
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.technicalEn?.map((disc: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] text-neutral-300 border border-white/[0.06] flex items-center gap-1.5"
                      >
                        <Check className="w-2.5 h-2.5 text-amber-400" />
                        <span>{disc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#111215] rounded-xl border border-white/[0.06] text-[11px] font-mono text-neutral-400">
                💡 <span className="text-neutral-200">Tip:</span> Changes here are mirrored directly in the public Skills & Competencies section upon clicking Save.
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
