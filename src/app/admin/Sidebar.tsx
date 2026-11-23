'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  UserCheck,
  Briefcase,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Settings,
} from 'lucide-react'
import { logoutAction } from './actions'
import { useAdminTranslation } from '@/context/AdminLanguageContext'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { t, isRtl } = useAdminTranslation()

  // Don't render sidebar on login page
  if (pathname === '/admin/login') {
    return null
  }

  const navItems = [
    { num: '01', label: t.nav.home, href: '/admin', icon: LayoutDashboard },
    { num: '02', label: t.nav.projects, href: '/admin/projects', icon: FolderKanban },
    { num: '03', label: t.nav.experience, href: '/admin/experience', icon: Briefcase },
    { num: '04', label: t.nav.profile, href: '/admin/profile', icon: UserCheck },
    { num: '05', label: t.nav.settings, href: '/admin/settings', icon: Settings },
  ]

  return (
    <>
      {/* Spacer for desktop fixed layout to prevent content overlapping */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      />

      {/* Desktop Fixed & Collapsible Sidebar */}
      <aside
        className={`hidden lg:flex fixed top-0 z-40 h-screen bg-[#0d0e11] border-white/[0.08] flex-col justify-between transition-all duration-300 ease-in-out select-none ${
          isRtl ? 'right-0 border-l' : 'left-0 border-r'
        } ${isCollapsed ? 'w-20' : 'w-72'}`}
      >
        {/* Top: Identity Header & Collapse Button */}
        <div className={`border-b border-white/[0.08] relative ${isCollapsed ? 'p-3 py-5' : 'p-5'}`}>
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 group min-w-0"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#C5A059]/40 p-0.5 shadow-lg group-hover:border-[#C5A059] transition-colors shrink-0">
                <Image
                  src="/images/alaa.webp"
                  alt="Eng. Alaa Essa"
                  fill
                  sizes="48px"
                  className="object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#7AD1B8] border-2 border-[#0d0e11] rounded-full" />
              </div>

              {!isCollapsed && (
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#C5A059] block font-medium truncate">
                    {t.nav.studioConsole}
                  </span>
                  <h2 className="text-sm font-semibold tracking-wide text-white group-hover:text-neutral-200 transition-colors truncate">
                    {t.home.architectName}
                  </h2>
                  <span className="text-[10px] text-neutral-400 font-sans block truncate">
                    {t.home.architectTitle}
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Collapse / Expand Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors cursor-pointer"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle Sidebar Width"
            >
              {isCollapsed ? (
                isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Telemetry pill (Expanded only) */}
          {!isCollapsed && (
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-[#7AD1B8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7AD1B8] animate-pulse" />
                <span>{t.topNav.cloudSync}</span>
              </span>
              <span className="bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full text-[9px] text-neutral-300 font-mono">
                {isRtl ? '5 شاشات' : '5 Screens'}
              </span>
            </div>
          )}
        </div>

        {/* Middle: Section Navigation Links */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto no-scrollbar">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] uppercase font-mono tracking-widest text-neutral-400">
              {t.nav.monographSections}
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center ${
                  isCollapsed ? 'justify-center p-3' : 'justify-between px-3.5 py-2.5'
                } rounded-xl text-xs font-medium tracking-wide transition-all duration-200 relative ${
                  isActive
                    ? 'bg-white/[0.06] text-white font-semibold border-[#7AD1B8] shadow-sm ' +
                      (isRtl ? 'border-r-2' : 'border-l-2')
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                title={isCollapsed ? `${item.num} • ${item.label}` : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#7AD1B8]' : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate">
                      <span className="text-[10px] font-mono text-neutral-400 mx-1.5">
                        {item.num}
                      </span>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom: Public Link & Logout */}
        <div className="p-3 border-t border-white/[0.08] bg-[#090a0c]/60 space-y-2">
          <Link
            href="/"
            target="_blank"
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2.5'
            } rounded-full text-xs text-neutral-300 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#7AD1B8]/40 transition-all group`}
            title={isCollapsed ? t.topNav.liveSite : undefined}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#7AD1B8] group-hover:translate-x-0.5 transition-transform" />
              {!isCollapsed && <span>{t.nav.publicSite}</span>}
            </span>
            {!isCollapsed && (
              <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-1">
                <span>{t.common.view}</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </span>
            )}
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center p-2' : 'justify-between px-3.5 py-2'
              } rounded-full text-xs text-red-400/90 hover:text-red-300 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-all cursor-pointer`}
              title={isCollapsed ? t.nav.logout : undefined}
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" />
                {!isCollapsed && <span>{t.nav.logout}</span>}
              </span>
              {!isCollapsed && <span className="text-[9px] font-mono text-neutral-400">{t.nav.exit}</span>}
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
