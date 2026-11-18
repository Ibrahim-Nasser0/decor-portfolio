'use client'

import { useState, useMemo } from 'react'
import {
  PhoneCall,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquareText,
  Search,
  Copy,
  Check,
  Send,
  Calendar,
  DollarSign,
  Maximize2,
  FileText,
  Compass,
  BookOpen,
  Save,
  Loader2,
} from 'lucide-react'
import { ClientInquiry } from '@/lib/dataRepository'
import { updateInquiryStatusAction, updateInquiryNotesAction } from '../actions'

const STATUS_FILTERS = [
  { id: 'all', label: 'All Inquiries' },
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'quoted', label: 'Quoted' },
  { id: 'archived', label: 'Archived' },
]

export default function InquiriesClient({ initialInquiries }: { initialInquiries: ClientInquiry[] }) {
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(initialInquiries)
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Private studio notes tracking
  const [notesState, setNotesState] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    initialInquiries.forEach((inq) => {
      initial[inq.id] = inq.notes || ''
    })
    return initial
  })
  const [savingNotes, setSavingNotes] = useState<Record<string, boolean>>({})
  const [savedNotesFeedback, setSavedNotesFeedback] = useState<Record<string, boolean>>({})

  const filteredInquiries = useMemo(() => {
    const q = search.trim().toLowerCase()
    return inquiries.filter((inq) => {
      const matchesFilter = activeFilter === 'all' || inq.status === activeFilter
      if (!matchesFilter) return false
      if (!q) return true
      return (
        inq.client_name.toLowerCase().includes(q) ||
        inq.phone_number.includes(q) ||
        (inq.email && inq.email.toLowerCase().includes(q)) ||
        (inq.service_type && inq.service_type.toLowerCase().includes(q))
      )
    })
  }, [inquiries, activeFilter, search])

  const getStatusCount = (statusId: string) => {
    if (statusId === 'all') return inquiries.length
    return inquiries.filter((i) => i.status === statusId).length
  }

  const handleStatusChange = async (id: string, newStatus: ClientInquiry['status']) => {
    const res = await updateInquiryStatusAction(id, newStatus)
    if (res.success) {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      )
      setFeedback({ type: 'success', text: `Inquiry marked as ${newStatus}` })
      setTimeout(() => setFeedback(null), 3000)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update status' })
    }
  }

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleSaveNotes = async (id: string) => {
    setSavingNotes((prev) => ({ ...prev, [id]: true }))
    const res = await updateInquiryNotesAction(id, notesState[id] || '')
    setSavingNotes((prev) => ({ ...prev, [id]: false }))

    if (res.success) {
      setSavedNotesFeedback((prev) => ({ ...prev, [id]: true }))
      setTimeout(() => {
        setSavedNotesFeedback((prev) => ({ ...prev, [id]: false }))
      }, 2500)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to save note' })
    }
  }

  // Pre-composed WhatsApp message generator
  const getWhatsAppUrl = (
    phone: string,
    clientName: string,
    service: string | undefined,
    templateKey: 'discovery' | 'cad' | 'monograph'
  ) => {
    const cleanPhone = phone.replace(/\D/g, '')
    let text = ''

    if (templateKey === 'discovery') {
      text = `Hello ${clientName}, this is Eng. Alaa Issa following up on your consultation request for ${
        service || 'interior architecture'
      }. I would love to schedule a brief discovery call to discuss your vision and spatial requirements. When would be a convenient time for you?`
    } else if (templateKey === 'cad') {
      text = `Hello ${clientName}, this is Eng. Alaa Issa. To prepare an accurate design proposal and turnkey execution scope for your space, could you kindly share your AutoCAD layouts or preliminary floor plans with dimensions?`
    } else if (templateKey === 'monograph') {
      text = `Hello ${clientName}, this is Eng. Alaa Issa. Thank you for your interest! Please find our latest interior architecture monograph and turnkey scope sheet. We look forward to creating an exceptional living space tailored to your lifestyle.`
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="space-y-6 animate-fade-in">
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

      {/* Top Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by client name, phone, or scope..."
            className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all font-mono"
          />
        </div>

        {/* Status Filter Tabs with Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {STATUS_FILTERS.map((f) => {
            const count = getStatusCount(f.id)
            const isActive = activeFilter === f.id

            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                    : 'bg-[#111215] text-neutral-400 hover:bg-white/[0.06] hover:text-white border border-white/[0.08]'
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
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

      {/* Inquiries Cards Grid */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl py-24 text-center space-y-3">
          <MessageSquareText className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No Inquiries Found</h3>
          <p className="text-neutral-400 text-xs font-mono max-w-sm mx-auto">
            Client requests submitted through the public website contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredInquiries.map((inq) => {
            const initials = inq.client_name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()

            const noteValue = notesState[inq.id] || ''
            const isSaving = savingNotes[inq.id]
            const isSaved = savedNotesFeedback[inq.id]

            return (
              <div
                key={inq.id}
                className="bg-[#111215]/90 border border-white/[0.08] hover:border-amber-500/30 rounded-3xl p-6 sm:p-7 space-y-5 transition-all duration-300 shadow-xl"
              >
                {/* Header: Client Avatar, Name, Status, Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-neutral-900 border border-amber-500/30 flex items-center justify-center text-xs font-mono font-bold text-amber-300 shrink-0">
                      {initials || 'AI'}
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <span>{inq.client_name}</span>
                        <span
                          className={`text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full ${
                            inq.status === 'new'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : inq.status === 'contacted'
                              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                              : inq.status === 'quoted'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                              : 'bg-white/[0.06] text-neutral-400 border border-white/[0.08]'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </h3>
                      <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          <span>{new Date(inq.created_at).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      Status:
                    </span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className="bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/60 text-neutral-300 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none cursor-pointer"
                    >
                      <option value="new">● New (Unread)</option>
                      <option value="contacted">● Contacted</option>
                      <option value="quoted">● Proposal Sent</option>
                      <option value="archived">● Archive</option>
                    </select>
                  </div>
                </div>

                {/* Scope & Parameter Badges */}
                <div className="flex items-center gap-2.5 flex-wrap text-xs text-neutral-300 font-mono">
                  {inq.service_type && (
                    <span className="bg-[#090a0c] border border-white/[0.08] px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-amber-400">Scope:</span>
                      <span>{inq.service_type}</span>
                    </span>
                  )}
                  {inq.area_size && (
                    <span className="bg-[#090a0c] border border-white/[0.08] px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-amber-400">Area:</span>
                      <span>{inq.area_size}</span>
                    </span>
                  )}
                  {inq.budget_range && (
                    <span className="bg-[#090a0c] border border-white/[0.08] px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-amber-400">Budget:</span>
                      <span>{inq.budget_range}</span>
                    </span>
                  )}
                </div>

                {/* Message Body */}
                {inq.message && (
                  <div className="p-4 bg-[#090a0c] rounded-2xl border border-white/[0.06] text-xs text-neutral-200 leading-relaxed font-sans">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Client Brief:
                    </span>
                    {inq.message}
                  </div>
                )}

                {/* Contact Coordinates */}
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-300 flex-wrap pt-1">
                  <div className="flex items-center gap-1.5">
                    <span>📞 {inq.phone_number}</span>
                    <button
                      onClick={() => handleCopyPhone(inq.id, inq.phone_number)}
                      className="p-1 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                      title="Copy phone number"
                    >
                      {copiedId === inq.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {inq.email && (
                    <a
                      href={`mailto:${inq.email}`}
                      className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-neutral-400"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{inq.email}</span>
                    </a>
                  )}
                </div>

                {/* Fast Pre-Composed WhatsApp Templates */}
                <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Instant WhatsApp Responses (1-Click Personalized Reply):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {/* Template 1: Discovery Call */}
                    <a
                      href={getWhatsAppUrl(inq.phone_number, inq.client_name, inq.service_type, 'discovery')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 hover:border-emerald-600 px-3.5 py-2 rounded-xl text-xs font-mono transition-all active:scale-95 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Discovery Call Invite</span>
                    </a>

                    {/* Template 2: Request CAD Blueprints */}
                    <a
                      href={getWhatsAppUrl(inq.phone_number, inq.client_name, inq.service_type, 'cad')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#090a0c] hover:bg-white/[0.06] text-neutral-300 hover:text-white border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-all active:scale-95 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>Request CAD & Plans</span>
                    </a>

                    {/* Template 3: Monograph & Turnkey Scope */}
                    <a
                      href={getWhatsAppUrl(inq.phone_number, inq.client_name, inq.service_type, 'monograph')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#090a0c] hover:bg-white/[0.06] text-neutral-300 hover:text-white border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-mono transition-all active:scale-95 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                      <span>Send Portfolio & Scope</span>
                    </a>
                  </div>
                </div>

                {/* Studio Private Notes (CRM) */}
                <div className="pt-3 border-t border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-neutral-500" />
                      <span>Studio Private Notes (Internal Only)</span>
                    </span>
                    {isSaved && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={noteValue}
                      onChange={(e) =>
                        setNotesState((prev) => ({ ...prev, [inq.id]: e.target.value }))
                      }
                      placeholder="Add private studio notes (e.g. client budget limits, site visit date, preferred color schemes)..."
                      className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/60 rounded-xl p-3 text-xs text-white placeholder-neutral-600 focus:outline-none transition-all font-mono"
                    />

                    <button
                      type="button"
                      onClick={() => handleSaveNotes(inq.id)}
                      disabled={isSaving}
                      className="px-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-amber-500/40 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                      title="Save Note"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
