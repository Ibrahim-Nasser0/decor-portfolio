'use client'

import React from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Plus,
  ArrowUpRight,
  FileText,
  X,
  FolderKanban,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'

interface MobileStudioHubModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileStudioHubModal({ isOpen, onClose }: MobileStudioHubModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Floating Bottom Action Sheet */}
      <div className="relative z-10 bg-[#0e1014] border-t border-white/[0.12] rounded-t-[32px] p-5 pb-9 space-y-4 shadow-[0_-12px_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom duration-300 select-none">
        {/* Drag Indicator Bar */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-1 mb-1" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4 fill-amber-400/20" />
            </div>
            <div>
              <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                STUDIO QUICK ACTIONS
              </h2>
              <p className="text-[10px] text-neutral-400 font-mono">
                Eng. Alaa Essa Atelier Command
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-xl bg-white/[0.04] border border-white/[0.08] active:scale-95 transition-transform"
            aria-label="Close Action Sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The 3 Core High-Impact Action Cards */}
        <div className="space-y-2.5">
          {/* Action 1: New Case Study */}
          <Link
            href="/admin/projects/new"
            onClick={onClose}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/[0.12] to-amber-500/[0.03] hover:from-amber-500/[0.18] hover:to-amber-500/[0.08] border border-amber-500/30 hover:border-amber-500/50 flex items-center justify-between gap-3 group active:scale-[0.98] transition-all shadow-sm"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-200 text-neutral-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors flex items-center gap-1.5">
                  <span>New Case Study</span>
                  <span className="text-[8px] font-mono uppercase bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded-full font-bold">
                    Primary
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans truncate">
                  Publish a new interior architectural project
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>

          {/* Action 2: Live Portfolio Preview */}
          <Link
            href="/"
            target="_blank"
            onClick={onClose}
            className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-emerald-500/40 flex items-center justify-between gap-3 group active:scale-[0.98] transition-all shadow-sm"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span>Live Portfolio</span>
                  <span className="text-[8px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-medium">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans truncate">
                  Open client-facing website in new tab
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>

          {/* Action 3: LaTeX Curriculum Vitae (PDF) */}
          <a
            href="/api/cv-pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#7AD1B8]/40 flex items-center justify-between gap-3 group active:scale-[0.98] transition-all shadow-sm"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#7AD1B8]/15 border border-[#7AD1B8]/30 text-[#7AD1B8] flex items-center justify-center font-bold shrink-0">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white group-hover:text-[#7AD1B8] transition-colors flex items-center gap-1.5">
                  <span>Architectural CV (PDF)</span>
                  <span className="text-[8px] font-mono uppercase bg-[#7AD1B8]/20 text-[#7AD1B8] border border-[#7AD1B8]/30 px-1.5 py-0.2 rounded-full font-medium">
                    LaTeX
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans truncate">
                  View and export generated 1-page monograph PDF
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </a>
        </div>

        {/* Footer Quick Links */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2 text-xs font-mono">
          <Link
            href="/admin/projects"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-neutral-300 flex items-center justify-center gap-1.5 transition-colors text-[11px]"
          >
            <FolderKanban className="w-3.5 h-3.5 text-amber-400" />
            <span>Manage Works</span>
          </Link>

          <Link
            href="/admin/settings"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-neutral-300 flex items-center justify-center gap-1.5 transition-colors text-[11px]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Studio Access</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
