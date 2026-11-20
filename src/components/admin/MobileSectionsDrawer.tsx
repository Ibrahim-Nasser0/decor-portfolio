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
  ArrowUpRight,
  ShieldCheck,
  Settings,
  Plus,
  FileText,
} from 'lucide-react'
import { logoutAction } from '@/app/admin/actions'
import { useAdminTranslation } from '@/context/AdminLanguageContext'

interface MobileSectionsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSectionsDrawer({ isOpen, onClose }: MobileSectionsDrawerProps) {
  const pathname = usePathname()
  const { t } = useAdminTranslation()

  if (!isOpen) return null

  const sections = [
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
      <div className="relative z-10 bg-[#0e1013] border-t border-white/[0.12] rounded-t-3xl max-h-[85vh] overflow-y-auto no-scrollbar p-5 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-1 mb-1" />

        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-500/40 p-0.5">
              <Image
                src="/images/alaa.webp"
                alt="Eng. Alaa Essa"
                fill
                sizes="36px"
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider text-white">
                {t.home.architectName}
              </div>
              <div className="text-[10px] text-amber-400 font-mono tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>{t.nav.studioConsole}</span>
              </div>
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

        {/* Quick Fast Actions: New Project & Live Site */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/admin/projects/new"
            onClick={onClose}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 hover:from-white hover:to-amber-100 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all font-mono"
          >
            <Plus className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
            <span>{t.projects.newProject}</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            onClick={onClose}
            className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-200 text-xs font-mono flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>{t.nav.liveSite}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>

        {/* Navigation Grid (Touch-Friendly Cards for all 5 Studio Sections) */}
        <div className="grid grid-cols-2 gap-2.5">
          {sections.map((sec) => {
            const Icon = sec.icon
            const isActive = pathname === sec.href

            return (
              <Link
                key={sec.href}
                href={sec.href}
                onClick={onClose}
                className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-3 active:scale-[0.98] ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-lg'
                    : 'bg-white/[0.03] border-white/[0.06] text-neutral-300 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'bg-white/[0.06] text-neutral-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 font-bold">
                    {sec.num}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide">
                    {sec.label}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 mt-0.5">
                    {isActive ? t.common.active : t.common.view}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Links & Sign Out Bar */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-3 text-xs font-mono">
          <a
            href="/api/cv-pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex-1 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-200 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            title="Download / View LaTeX PDF"
          >
            <FileText className="w-3.5 h-3.5 text-[#7AD1B8]" />
            <span>{t.home.downloadCv}</span>
          </a>

          <button
            onClick={async () => {
              onClose()
              await logoutAction()
            }}
            className="p-3 rounded-xl bg-red-950/30 hover:bg-red-950/50 border border-red-800/40 text-red-300 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.nav.logout}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
