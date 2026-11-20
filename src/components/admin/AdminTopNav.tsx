'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Compass, ArrowUpRight } from 'lucide-react'

const PATH_TITLES: Record<string, { num: string; title: string; mobileTitle: string }> = {
  '/admin': { num: '00', title: 'Studio Overview', mobileTitle: 'Overview' },
  '/admin/hero': { num: '01', title: 'Monograph Hero', mobileTitle: 'Hero' },
  '/admin/about': { num: '02', title: 'Architectural Philosophy', mobileTitle: 'About' },
  '/admin/skills': { num: '03', title: 'Software & Production Stack', mobileTitle: 'Skills' },
  '/admin/experience': { num: '04', title: 'Career & Academic Credentials', mobileTitle: 'Experience' },
  '/admin/projects': { num: '05', title: 'Architectural Portfolio Works', mobileTitle: 'Projects' },
  '/admin/projects/new': { num: '05', title: 'Draft New Project Case Study', mobileTitle: 'New Project' },
  '/admin/profile': { num: '06', title: 'Studio Coordinates & Contact', mobileTitle: 'Profile' },
  '/admin/settings': { num: '07', title: 'Studio Settings & Access Control', mobileTitle: 'Settings' },
}

export default function AdminTopNav() {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return null
  }

  const current = PATH_TITLES[pathname] || {
    num: pathname.startsWith('/admin/projects/') ? '05' : 'CONSOLE',
    title: pathname.startsWith('/admin/projects/') ? 'Deep Project Editor' : 'Atelier Command',
    mobileTitle: pathname.startsWith('/admin/projects/') ? 'Project Edit' : 'Console',
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0c0d0e]/92 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none transition-all">
      <div className="px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* ============================================================== */}
        {/* Left: Architect Cartouche & Breadcrumbs                        */}
        {/* ============================================================== */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Architect Portrait Badge */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-amber-500/40 p-0.5 shrink-0 bg-neutral-900 shadow-sm">
            <Image
              src="/images/alaa.webp"
              alt="Eng. Alaa Essa"
              fill
              sizes="32px"
              className="object-cover rounded-full"
            />
          </div>

          {/* Section Number Pill */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] tracking-wider uppercase font-semibold shrink-0">
            <Compass className="w-3 h-3 hidden sm:inline" />
            <span>{current.num}</span>
          </div>

          <span className="text-neutral-600 font-mono text-xs hidden sm:inline">/</span>

          {/* Section Title */}
          <div className="min-w-0">
            <span className="text-xs font-serif tracking-wide text-neutral-200 truncate block sm:inline">
              <span className="sm:hidden font-mono text-[11px] font-semibold text-white">
                {current.mobileTitle}
              </span>
              <span className="hidden sm:inline">
                {current.title}
              </span>
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Right: Studio Status & Fast Actions                           */}
        {/* ============================================================== */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono shrink-0">
          {/* Coordinates Stamp (Desktop XL only) */}
          <div className="hidden xl:flex items-center gap-2 text-[10px] text-neutral-400 font-mono tracking-widest uppercase px-3 py-1 bg-white/[0.02] border border-white/[0.04] rounded-lg">
            <span>CAIRO, EG</span>
            <span className="text-neutral-600">•</span>
            <span>30.0444° N, 31.2357° E</span>
          </div>

          {/* Live Cloud Indicator (Desktop / Tablet) */}
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cloud Sync Active</span>
          </div>

          {/* Live Mobile Indicator (Mobile only) */}
          <div className="md:hidden flex items-center gap-1 text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live</span>
          </div>

          {/* View Live Site Button */}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.08] hover:border-amber-500/40 text-xs font-mono transition-all group active:scale-95"
            title="Open Public Monograph in New Tab"
          >
            <span className="hidden sm:inline">View Live Site</span>
            <span className="sm:hidden text-[11px]">Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  )
}
