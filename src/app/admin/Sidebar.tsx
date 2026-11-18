'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Cpu,
  Briefcase,
  FolderKanban,
  UserCheck,
  MessageSquareText,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react'
import { logoutAction } from './actions'

const SECTION_TABS = [
  { num: '00', label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { num: '01', label: 'Hero Section', href: '/admin/hero', icon: Sparkles },
  { num: '02', label: 'About Section', href: '/admin/about', icon: BookOpen },
  { num: '03', label: 'Skills Suite', href: '/admin/skills', icon: Cpu },
  { num: '04', label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { num: '05', label: 'Projects Gallery', href: '/admin/projects', icon: FolderKanban },
  { num: '06', label: 'Profile (Contact)', href: '/admin/profile', icon: UserCheck },
  { num: '07', label: 'Inquiries Inbox', href: '/admin/inquiries', icon: MessageSquareText, badge: 'Inbox' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Don't render sidebar on login page
  if (pathname === '/admin/login') {
    return null
  }

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#0d0e11]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-amber-500/40 p-0.5">
            <Image
              src="/images/alaa.webp"
              alt="Eng. Alaa Issa"
              fill
              sizes="32px"
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wider text-white">
              ENG. ALAA ISSA
            </div>
            <div className="text-[9px] text-amber-500 font-mono tracking-wider">
              SECTIONS CONSOLE
            </div>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-neutral-400 hover:text-white rounded-xl bg-white/[0.03] border border-white/[0.06] transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
        />
      )}

      {/* Spacer for desktop fixed layout to prevent content overlapping */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      />

      {/* Sidebar Container (Fixed & Collapsible - DOES NOT SCROLL AWAY WITH PAGE) */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-[#0d0e11] border-r border-white/[0.08] flex flex-col justify-between transition-all duration-300 ease-in-out select-none ${
          mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}`}
      >
        {/* Top: Identity Header & Collapse Button */}
        <div className={`border-b border-white/[0.08] relative ${isCollapsed ? 'p-3 py-5' : 'p-5'}`}>
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              className="flex items-center gap-3 group min-w-0"
              onClick={() => setMobileOpen(false)}
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500/40 p-0.5 shadow-lg group-hover:border-amber-400 transition-colors shrink-0">
                <Image
                  src="/images/alaa.webp"
                  alt="Eng. Alaa Issa"
                  fill
                  sizes="48px"
                  className="object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0d0e11] rounded-full" />
              </div>

              {!isCollapsed && (
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-amber-500 block font-medium truncate">
                    SECTIONS CONTROL
                  </span>
                  <h2 className="text-sm font-semibold tracking-wide text-white group-hover:text-amber-200 transition-colors truncate">
                    Eng. Alaa Issa
                  </h2>
                  <span className="text-[10px] text-neutral-400 font-mono block truncate">
                    Interior Architecture
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Collapse / Expand Toggle Button ("ينفع أصغرها") */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar to Mini'}
            >
              {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Telemetry pill (Expanded only) */}
          {!isCollapsed && (
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Supabase Live</span>
              </span>
              <span className="bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded text-[9px] text-neutral-300">
                8 Tabs
              </span>
            </div>
          )}
        </div>

        {/* Middle: Section Navigation Links */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto no-scrollbar">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] uppercase font-mono tracking-widest text-neutral-400">
              Monograph Sections
            </div>
          )}

          {SECTION_TABS.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center ${
                  isCollapsed ? 'justify-center p-3' : 'justify-between px-3.5 py-2.5'
                } rounded-xl text-xs font-medium tracking-wide transition-all duration-200 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent text-white font-semibold border-l-2 border-amber-500 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                title={isCollapsed ? `${item.num} • ${item.label}` : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-amber-400' : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate">
                      <span className="text-[10px] font-mono text-neutral-400 mr-2">
                        {item.num}
                      </span>
                      {item.label}
                    </span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: Public Link & Logout */}
        <div className={`p-3 border-t border-white/[0.08] bg-[#090a0c]/60 space-y-2`}>
          <Link
            href="/"
            target="_blank"
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2.5'
            } rounded-xl text-xs text-neutral-300 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-amber-500/30 transition-all group`}
            title={isCollapsed ? 'Preview Public Monograph' : undefined}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              {!isCollapsed && <span>Public Site</span>}
            </span>
            {!isCollapsed && (
              <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-1">
                <span>View</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </span>
            )}
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-2'
              } rounded-xl text-xs text-red-400/90 hover:text-red-300 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-all cursor-pointer`}
              title={isCollapsed ? 'Sign Out' : undefined}
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" />
                {!isCollapsed && <span>Sign Out</span>}
              </span>
              {!isCollapsed && <span className="text-[9px] font-mono text-neutral-400">Exit</span>}
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
