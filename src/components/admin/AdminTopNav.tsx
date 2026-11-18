'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Compass, Radio, ArrowUpRight } from 'lucide-react'

const PATH_TITLES: Record<string, { num: string; title: string }> = {
  '/admin': { num: '00', title: 'Studio Overview' },
  '/admin/hero': { num: '01', title: 'Monograph Hero' },
  '/admin/about': { num: '02', title: 'Architectural Philosophy' },
  '/admin/skills': { num: '03', title: 'Software & Production Stack' },
  '/admin/experience': { num: '04', title: 'Career & Academic Credentials' },
  '/admin/projects': { num: '05', title: 'Architectural Portfolio Works' },
  '/admin/projects/new': { num: '05', title: 'Draft New Project Case Study' },
  '/admin/profile': { num: '06', title: 'Studio Coordinates & Contact' },
  '/admin/inquiries': { num: '07', title: 'Client Consultations Inbox' },
}

export default function AdminTopNav() {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return null
  }

  const current = PATH_TITLES[pathname] || {
    num: pathname.startsWith('/admin/projects/') ? '05' : 'CONSOLE',
    title: pathname.startsWith('/admin/projects/') ? 'Deep Project Editor' : 'Atelier Command',
  }

  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-3.5 border-b border-white/[0.06] bg-[#0c0d0e]/80 backdrop-blur-md sticky top-0 z-30 select-none">
      {/* Left: Breadcrumbs & Section Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] tracking-wider uppercase font-semibold">
          <Compass className="w-3 h-3" />
          <span>Section {current.num}</span>
        </div>

        <span className="text-neutral-600 font-mono text-xs">/</span>

        <span className="text-xs font-serif tracking-wide text-neutral-200">
          {current.title}
        </span>
      </div>

      {/* Right: Telemetry, Cairo Coordinates & Public Preview */}
      <div className="flex items-center gap-4 text-xs font-mono">
        {/* Coordinates Stamp */}
        <div className="hidden xl:flex items-center gap-2 text-[10px] text-neutral-400 font-mono tracking-widest uppercase px-3 py-1 bg-white/[0.02] border border-white/[0.04] rounded-lg">
          <span>CAIRO, EG</span>
          <span className="text-neutral-600">•</span>
          <span>30.0444° N, 31.2357° E</span>
        </div>

        {/* Live Supabase Pulse */}
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Supabase Cloud Live</span>
        </div>

        {/* View Public Monograph */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.08] hover:border-amber-500/40 text-xs font-mono transition-all group"
          title="Open Public Monograph in New Tab"
        >
          <span>View Live Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </header>
  )
}
