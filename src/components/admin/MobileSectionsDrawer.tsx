'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  UserCheck,
  LogOut,
  X,
  ExternalLink,
  ShieldCheck,
  Settings,
  ArrowUpRight,
} from 'lucide-react'
import { logoutAction } from '@/app/admin/actions'
import { useAdminTranslation } from '@/context/AdminLanguageContext'

interface MobileSectionsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSectionsDrawer({ isOpen, onClose }: MobileSectionsDrawerProps) {
  const pathname = usePathname()
  const { t, isRtl } = useAdminTranslation()

  // Lock body scroll and handle Escape key
  React.useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // 1-to-1 parity with Desktop Sidebar navigation
  const navItems = [
    { num: '01', label: t.nav.home, href: '/admin', icon: LayoutDashboard },
    { num: '02', label: t.nav.projects, href: '/admin/projects', icon: FolderKanban },
    { num: '03', label: t.nav.experience, href: '/admin/experience', icon: Briefcase },
    { num: '04', label: t.nav.profile, href: '/admin/profile', icon: UserCheck },
    { num: '05', label: t.nav.settings, href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="relative z-10 bg-[#0d0e12] border-t border-white/[0.12] rounded-t-3xl max-h-[88vh] overflow-y-auto no-scrollbar p-5 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-1 mb-2" />

        {/* Drawer Header (Exact same as Sidebar Identity) */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500/40 p-0.5 shadow-md shrink-0">
              <Image
                src="/images/alaa.webp"
                alt="Eng. Alaa Essa"
                fill
                sizes="44px"
                className="object-cover rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0d0e12] rounded-full" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-amber-500 block font-medium">
                {t.nav.studioConsole}
              </span>
              <h3 className="text-sm font-semibold tracking-wide text-white">
                {t.home.architectName}
              </h3>
              <span className="text-[10px] text-neutral-400 font-sans block">
                {t.home.architectTitle}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-xl bg-white/[0.04] border border-white/[0.08] active:scale-95 transition-transform cursor-pointer"
            aria-label={t.common.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cloud Status Ribbon */}
        <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.topNav.cloudSync}</span>
          </span>
          <span className="text-neutral-400">{isRtl ? '5 شاشات' : '5 Screens'}</span>
        </div>

        {/* Monograph Sections Header */}
        <div className="px-1 text-[10px] uppercase font-mono tracking-widest text-neutral-400">
          {t.nav.monographSections}
        </div>

        {/* Navigation Items (Matching Desktop Sidebar List) */}
        <nav className="space-y-1.5">
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
                onClick={onClose}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent text-white font-semibold border-amber-500 shadow-sm ' +
                      (isRtl ? 'border-r-2' : 'border-l-2')
                    : 'text-neutral-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-amber-400' : 'text-neutral-400 group-hover:text-neutral-200'
                    }`}
                  />
                  <span>
                    <span className="text-[10px] font-mono text-neutral-400 mx-1.5">
                      {item.num}
                    </span>
                    {item.label}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-neutral-500">
                  {isActive ? t.common.active : '→'}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions: Public Site & Logout (Exact same as Sidebar bottom) */}
        <div className="pt-3 border-t border-white/[0.08] space-y-2">
          <Link
            href="/"
            target="_blank"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-neutral-300 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-amber-500/30 transition-all group"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              <span>{t.nav.publicSite}</span>
            </span>
            <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-1">
              <span>{t.common.view}</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </span>
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-red-400/90 hover:text-red-300 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.nav.logout}</span>
              </span>
              <span className="text-[9px] font-mono text-neutral-400">{t.nav.exit}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
