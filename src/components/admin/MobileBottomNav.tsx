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
      className="lg:hidden fixed bottom-3 inset-x-2.5 sm:bottom-4 max-w-lg mx-auto z-40 bg-[#0d0e12]/94 backdrop-blur-2xl border border-white/[0.12] rounded-[24px] py-1.5 px-1 sm:px-2 shadow-[0_12px_40px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] select-none"
    >
      <div className="flex items-center justify-between gap-0.5 sm:gap-1">
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
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-xl transition-all active:scale-95 ${
                isActive
                  ? 'text-amber-400 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'stroke-[2.3] scale-110 text-amber-400' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
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
