'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  Layers,
  Settings,
} from 'lucide-react'
import MobileSectionsDrawer from './MobileSectionsDrawer'
import MobileStudioHubModal from './MobileStudioHubModal'
import { useAdminTranslation } from '@/context/AdminLanguageContext'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { t } = useAdminTranslation()
  const [hubOpen, setHubOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Hide on login page
  if (pathname === '/admin/login') {
    return null
  }

  const isOverview = pathname === '/admin'
  const isProjects = pathname.startsWith('/admin/projects')
  const isSettings = pathname === '/admin/settings'
  const isSubSection = [
    '/admin/experience',
    '/admin/skills',
    '/admin/profile',
    '/admin/hero',
    '/admin/about',
  ].some((path) => pathname.startsWith(path))

  return (
    <>
      {/* ============================================================== */}
      {/* FLOATING LUXURY GLASS DOCK (Ergonomic Single-Thumb Reach)       */}
      {/* ============================================================== */}
      <nav
        aria-label="Mobile Studio Navigation Dock"
        className="lg:hidden fixed bottom-3 inset-x-3 sm:bottom-4 max-w-md mx-auto z-40 bg-[#0d0e12]/92 backdrop-blur-2xl border border-white/[0.12] rounded-[26px] py-1 px-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] select-none"
      >
        <div className="flex items-center justify-around relative">
          {/* Tab 1: Home */}
          <Link
            href="/admin"
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 rounded-2xl transition-all active:scale-90 ${
              isOverview ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <LayoutDashboard className={`w-5 h-5 ${isOverview ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              {isOverview && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider">{t.nav.home}</span>
          </Link>

          {/* Tab 2: Projects Gallery */}
          <Link
            href="/admin/projects"
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 rounded-2xl transition-all active:scale-90 ${
              isProjects ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <FolderKanban className={`w-5 h-5 ${isProjects ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              {isProjects && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider">{t.nav.projects}</span>
          </Link>

          {/* Tab 3: Center Elevated Studio Hub Button (Action Sheet Trigger) */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false)
                setHubOpen(true)
              }}
              aria-label="Open Studio Quick Actions Hub"
              className="relative -mt-5 flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all border-2 ${
                  hubOpen
                    ? 'bg-gradient-to-tr from-amber-300 to-white text-neutral-950 border-white shadow-amber-400/40 ring-4 ring-amber-400/30'
                    : 'bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-200 text-neutral-950 border-[#0d0e12] shadow-black/80 ring-2 ring-amber-400/30'
                }`}
              >
                <Sparkles className="w-5 h-5 stroke-[2.4] fill-neutral-950/20" />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-wider text-amber-300 mt-1">
                {t.nav.hub}
              </span>
            </button>
          </div>

          {/* Tab 4: Sections ❖ (Slide-Up Drawer Trigger) */}
          <button
            type="button"
            onClick={() => {
              setHubOpen(false)
              setDrawerOpen(true)
            }}
            aria-label="Open All Monograph Sections"
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 rounded-2xl transition-all active:scale-90 cursor-pointer ${
              drawerOpen || isSubSection
                ? 'text-amber-400 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Layers className={`w-5 h-5 ${drawerOpen || isSubSection ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              {(drawerOpen || isSubSection) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider">{t.nav.sections}</span>
          </button>

          {/* Tab 5: Settings & Security */}
          <Link
            href="/admin/settings"
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 rounded-2xl transition-all active:scale-90 ${
              isSettings ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Settings className={`w-5 h-5 ${isSettings ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              {isSettings && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider">{t.nav.settings}</span>
          </Link>
        </div>
      </nav>

      {/* Center Studio Hub Action Sheet Modal */}
      <MobileStudioHubModal
        isOpen={hubOpen}
        onClose={() => setHubOpen(false)}
      />

      {/* Slide-Up Bottom Drawer for All 5 Monograph Sections */}
      <MobileSectionsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
