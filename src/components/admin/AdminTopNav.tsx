'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Compass, ArrowUpRight, Languages, Menu, ChevronLeft } from 'lucide-react'
import { useAdminTranslation } from '@/context/AdminLanguageContext'
import { triggerHaptic } from '@/lib/haptics'
import MobileSectionsDrawer from './MobileSectionsDrawer'

export default function AdminTopNav() {
  const pathname = usePathname()
  const { t, lang, toggleLang, isRtl } = useAdminTranslation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (pathname === '/admin/login') {
    return null
  }

  const getSectionInfo = () => {
    if (pathname === '/admin') {
      return { num: '01', title: t.nav.home, subTitle: null, backHref: null }
    }
    if (pathname === '/admin/projects/new') {
      return {
        num: '02',
        title: t.nav.projects,
        subTitle: t.projectForm.newProjectTitle,
        backHref: '/admin/projects',
      }
    }
    if (pathname.startsWith('/admin/projects/') && pathname !== '/admin/projects') {
      return {
        num: '02',
        title: t.nav.projects,
        subTitle: t.projectForm.editProjectTitle,
        backHref: '/admin/projects',
      }
    }
    if (pathname.startsWith('/admin/projects')) {
      return { num: '02', title: t.nav.projects, subTitle: null, backHref: null }
    }
    if (pathname.startsWith('/admin/experience') || pathname.startsWith('/admin/skills')) {
      return { num: '03', title: t.nav.experience, subTitle: null, backHref: null }
    }
    if (
      pathname.startsWith('/admin/profile') ||
      pathname.startsWith('/admin/hero') ||
      pathname.startsWith('/admin/about')
    ) {
      return { num: '04', title: t.nav.profile, subTitle: null, backHref: null }
    }
    if (pathname.startsWith('/admin/settings')) {
      return { num: '05', title: t.nav.settings, subTitle: null, backHref: null }
    }
    return { num: '••', title: t.nav.studioConsole, subTitle: null, backHref: null }
  }

  const current = getSectionInfo()

  return (
    <>
      <header className="sticky top-0 z-30 w-full pt-[env(safe-area-inset-top,0px)] bg-[#0c0d0e]/94 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none transition-all">
        <div className="px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
          {/* ============================================================== */}
          {/* Left: Architect Cartouche & Breadcrumbs                        */}
          {/* ============================================================== */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Architect Portrait Badge (Can also trigger menu on mobile) */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light')
                setDrawerOpen(true)
              }}
              className="lg:pointer-events-none relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-amber-500/40 p-0.5 shrink-0 bg-neutral-900 shadow-sm active:scale-90 transition-transform cursor-pointer lg:cursor-default"
              title="Eng. Alaa Essa"
            >
              <Image
                src="/images/alaa.webp"
                alt="Eng. Alaa Essa"
                fill
                sizes="36px"
                className="object-cover rounded-full"
              />
            </button>

            {/* Section Number Pill */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] tracking-wider uppercase font-semibold shrink-0">
              <Compass className="w-3 h-3 hidden sm:inline" />
              <span>{current.num}</span>
            </div>

            <span className="text-neutral-600 font-mono text-xs hidden sm:inline">/</span>

            {/* Back Arrow for Sub-Routes */}
            {current.backHref && (
              <Link
                href={current.backHref}
                onClick={() => triggerHaptic('light')}
                className="p-1 min-w-[28px] min-h-[28px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-90 transition-all"
                title={t.common.back}
                aria-label={t.common.back}
              >
                <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            )}

            {/* Section Title & Sub-Route Breadcrumb */}
            <div className="min-w-0 flex items-center gap-1.5 truncate">
              {current.backHref ? (
                <Link
                  href={current.backHref}
                  className="font-sans text-xs font-semibold text-neutral-400 hover:text-white transition-colors truncate"
                >
                  {current.title}
                </Link>
              ) : (
                <span className="font-sans text-xs font-semibold text-white truncate">
                  {current.title}
                </span>
              )}
              {current.subTitle && (
                <>
                  <span className="text-neutral-600 font-mono text-xs">/</span>
                  <span className="text-xs font-medium text-amber-300 truncate max-w-[140px] sm:max-w-xs">
                    {current.subTitle}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* ============================================================== */}
          {/* Right: Language Switcher, Cloud Telemetry, Live Link & Menu   */}
          {/* ============================================================== */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs font-mono shrink-0">
            {/* Language Switcher Button (Clean Toggle AR / EN) with min 44px hit */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic('selection')
                toggleLang()
              }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[40px] rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 hover:text-white border border-white/[0.1] hover:border-amber-400/50 text-xs font-mono transition-all active:scale-95 cursor-pointer shadow-sm"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
              aria-label="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-[11px] tracking-wider">
                {lang === 'ar' ? 'English' : 'عربي'}
              </span>
            </button>

            {/* Coordinates Stamp (Desktop XL only) */}
            <div className="hidden xl:flex items-center gap-2 text-[10px] text-neutral-400 font-mono tracking-widest uppercase px-3 py-1 bg-white/[0.02] border border-white/[0.04] rounded-lg">
              <span>{t.topNav.cairoCoordinates}</span>
            </div>

            {/* Live Cloud Indicator (Desktop / Tablet) */}
            <div className="hidden md:flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.topNav.cloudSync}</span>
            </div>

            {/* Live Mobile Indicator (Mobile only) */}
            <div className="md:hidden flex items-center gap-1 text-[10px] text-emerald-400 font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.common.active}</span>
            </div>

            {/* View Live Site Button */}
            <Link
              href="/"
              target="_blank"
              onClick={() => triggerHaptic('light')}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[40px] rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.08] hover:border-amber-500/40 text-xs font-mono transition-all group active:scale-95"
              title="Open Public Monograph in New Tab"
            >
              <span className="hidden sm:inline">{t.topNav.liveSite}</span>
              <span className="sm:hidden text-[11px]">{t.common.preview}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Mobile Hamburger / Menu Drawer Trigger (Mobile only, min 44px hit) */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light')
                setDrawerOpen(true)
              }}
              className="lg:hidden p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-amber-400 border border-white/[0.1] active:scale-90 transition-all cursor-pointer"
              title="Open Menu"
              aria-label="Open Studio Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Up Mobile Navigation Drawer with 100% Sidebar parity */}
      <MobileSectionsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
