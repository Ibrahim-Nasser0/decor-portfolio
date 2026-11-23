'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  UserCheck,
  Settings,
} from 'lucide-react'
import { useAdminTranslation } from '@/context/AdminLanguageContext'
import { triggerHaptic } from '@/lib/haptics'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { t } = useAdminTranslation()

  // Hide on login page
  if (pathname === '/admin/login') {
    return null
  }

  // Exact same 5 screens as the Desktop Sidebar
  const navItems = [
    { num: '01', label: t.nav.home, href: '/admin', icon: LayoutDashboard },
    { num: '02', label: t.nav.projects, href: '/admin/projects', icon: FolderKanban },
    { num: '03', label: t.nav.experience, href: '/admin/experience', icon: Briefcase },
    { num: '04', label: t.nav.profile, href: '/admin/profile', icon: UserCheck },
    { num: '05', label: t.nav.settings, href: '/admin/settings', icon: Settings },
  ]

  return (
    <nav
      aria-label="Mobile Studio Navigation Dock"
      className="lg:hidden fixed bottom-[calc(env(safe-area-inset-bottom,0px)+10px)] inset-x-2.5 max-w-lg mx-auto z-40 bg-[#0d0e12]/96 backdrop-blur-2xl border border-white/[0.14] rounded-[24px] py-1 px-1 sm:px-2 shadow-[0_16px_48px_rgba(0,0,0,0.92)] ring-1 ring-white/[0.05] select-none"
    >
      <div className="flex items-center justify-between gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href)) ||
                (item.href === '/admin/profile' &&
                  (pathname.startsWith('/admin/hero') || pathname.startsWith('/admin/about')))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (!isActive) triggerHaptic('selection')
              }}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-2xl transition-all active:scale-90 ${
                isActive
                  ? 'text-[#7AD1B8] font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'stroke-[2.3] scale-110 text-[#7AD1B8]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7AD1B8] shadow-[0_0_8px_#7ad1b8]" />
                )}
              </div>
              <span className="text-[10px] font-mono tracking-tight truncate max-w-[58px] sm:max-w-[70px] text-center leading-tight">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
