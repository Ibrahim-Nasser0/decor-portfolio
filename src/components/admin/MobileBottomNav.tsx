'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  UserCheck,
  Menu,
  Layers,
  Sliders,
} from 'lucide-react'
import MobileSectionsDrawer from './MobileSectionsDrawer'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Hide on login page
  if (pathname === '/admin/login') {
    return null
  }

  const isOverview = pathname === '/admin'
  const isProjects = pathname.startsWith('/admin/projects') && pathname !== '/admin/projects/new'
  const isNewProject = pathname === '/admin/projects/new'
  const isProfile = pathname === '/admin/profile'
  const isSettings = pathname === '/admin/settings'

  return (
    <>
      {/* Bottom Fixed Navigation Bar (Ergonomic Thumb Zone) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0e11]/95 backdrop-blur-2xl border-t border-white/[0.1] px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.7)] select-none"
      >
        <div className="flex items-center justify-around max-w-md mx-auto relative">
          {/* Tab 1: Overview */}
          <Link
            href="/admin"
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all active:scale-90 ${
              isOverview ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <LayoutDashboard className={`w-5 h-5 ${isOverview ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {isOverview && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider">Overview</span>
          </Link>

          {/* Tab 2: Projects Gallery */}
          <Link
            href="/admin/projects"
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all active:scale-90 ${
              isProjects ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <FolderKanban className={`w-5 h-5 ${isProjects ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {isProjects && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider">Projects</span>
          </Link>

          {/* Center Elevated Action Button: Quick Add New Project */}
          <Link
            href="/admin/projects/new"
            aria-label="Create New Project"
            className={`-mt-6 w-12 h-12 rounded-full flex items-center justify-center shadow-xl border transition-all active:scale-90 shrink-0 ${
              isNewProject
                ? 'bg-gradient-to-tr from-amber-400 to-amber-200 text-neutral-950 border-amber-300 shadow-amber-500/30'
                : 'bg-gradient-to-tr from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-neutral-950 border-amber-400/80 shadow-black/80'
            }`}
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </Link>

          {/* Tab 4: Profile / Contact Coordinates */}
          <Link
            href="/admin/profile"
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all active:scale-90 ${
              isProfile ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <UserCheck className={`w-5 h-5 ${isProfile ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {isProfile && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider">Profile</span>
          </Link>

          {/* Tab 5: More / Settings */}
          <Link
            href="/admin/settings"
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-2xl transition-all active:scale-90 ${
              isSettings ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Sliders className={`w-5 h-5 ${isSettings ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {isSettings && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-wider">More</span>
          </Link>
        </div>
      </nav>

      {/* Slide-Up Bottom Drawer for All Sections */}
      <MobileSectionsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
