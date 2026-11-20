import Link from 'next/link'
import Image from 'next/image'
import {
  FolderKanban,
  Star,
  Plus,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
  Briefcase,
  UserCheck,
  ChevronRight,
  Sliders,
  FileText,
  ShieldCheck,
  ArrowUpRight,
  Settings,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react'
import { getProjects, getDesignerProfile, getAdminAccounts } from '@/lib/dataRepository'

export const dynamic = 'force-dynamic'

export default async function AdminOverviewPage() {
  const [projects, profile, adminAccounts] = await Promise.all([
    getProjects(),
    getDesignerProfile(),
    getAdminAccounts(),
  ])

  const featuredProjects = projects.filter((p) => p.featured)
  const cvProjects = projects.filter((p) => p.includeInCv !== false)
  const categoriesList = Array.from(new Set(projects.map((p) => p.category)))

  return (
    <div className="p-4 sm:p-6 lg:p-8 2xl:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in relative z-10 select-none">
      {/* ============================================================== */}
      {/* 1. TOP STUDIO HERO & TELEMETRY STRIP                          */}
      {/* ============================================================== */}
      <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] font-mono text-neutral-400 uppercase font-semibold">
              ATELIER COMMAND • ALEXANDRIA & CAIRO
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-light">
            Welcome, Eng. {profile.nameEn || 'Alaa Essa'}
          </h1>

          <p className="text-xs text-neutral-400 font-mono">
            {projects.length} architectural case studies published • {cvProjects.length}/4 selected for LaTeX CV
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2.5 flex-wrap relative z-10">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-200 hover:from-white hover:to-amber-100 text-neutral-950 font-semibold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 font-mono cursor-pointer"
          >
            <Plus className="w-4 h-4 text-neutral-900" />
            <span>New Project</span>
          </Link>

          <a
            href="/api/cv-pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.08] hover:border-[#7AD1B8]/40 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all"
            title="Preview LaTeX Curriculum Vitae (PDF)"
          >
            <FileText className="w-3.5 h-3.5 text-[#7AD1B8]" />
            <span className="hidden sm:inline">Preview CV</span>
          </a>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.08] hover:border-white/20 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all group"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. COMPACT TELEMETRY KPI CARDS (Responsive Grid)               */}
      {/* ============================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
        {/* Metric 1: Total Published Works */}
        <Link
          href="/admin/projects"
          className="bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 group shadow-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
              Total Works
            </span>
            <FolderKanban className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-serif">
            {projects.length}
          </div>
          <div className="text-[10px] font-mono text-neutral-500 mt-2 flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span>{categoriesList.length} Categories</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </Link>

        {/* Metric 2: CV Selected Works (Max 4 Rule) */}
        <Link
          href="/admin/projects"
          className="bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-emerald-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 group shadow-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
              CV Showcase
            </span>
            <FileText className="w-4 h-4 text-[#7AD1B8] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-light text-white font-serif">
              {cvProjects.length}
            </span>
            <span className="text-xs font-mono text-neutral-500">/ 4 max</span>
          </div>
          <div className="text-[10px] font-mono text-neutral-500 mt-2 flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span className={cvProjects.length === 4 ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
              {cvProjects.length === 4 ? 'Optimal (4/4)' : `${4 - cvProjects.length} slots left`}
            </span>
            <span className="text-[#7AD1B8] group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </Link>

        {/* Metric 3: Hero Featured Works */}
        <Link
          href="/admin/hero"
          className="bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 group shadow-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
              Hero Featured
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-serif">
            {featuredProjects.length}
          </div>
          <div className="text-[10px] font-mono text-neutral-500 mt-2 flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span>Active in slider</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </Link>

        {/* Metric 4: Studio Security & Admin Accounts */}
        <Link
          href="/admin/settings"
          className="bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-sky-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 group shadow-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
              Studio Access
            </span>
            <ShieldCheck className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-light text-white font-serif">
              {adminAccounts.length}
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30">
              Active
            </span>
          </div>
          <div className="text-[10px] font-mono text-neutral-500 mt-2 flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span>Security & Passwords</span>
            <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </Link>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN WORKSPACE GRID: PROJECTS (7 Cols) + DIRECT CHANNELS (5 Cols) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Recent Works Quick-List (7 Cols) */}
        <div className="lg:col-span-7 bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                Published Works ({projects.length})
              </h2>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {projects.slice(0, 5).map((project, idx) => (
              <div
                key={project.id}
                className="py-3 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-white/[0.08]">
                    <Image
                      src={project.coverImage || '/images/projects/project-1.jpg'}
                      alt={project.titleEn}
                      fill
                      sizes="64px"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1 left-1 px-1 py-0.2 rounded text-[7px] font-mono bg-black/80 text-white font-bold">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                        {project.titleEn}
                      </h3>
                      {project.featured && (
                        <span className="text-[8px] font-mono uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded-full font-medium">
                          ★ Hero
                        </span>
                      )}
                      {project.includeInCv !== false && (
                        <span className="text-[8px] font-mono uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-medium">
                          📄 CV
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate font-mono">
                      {project.categoryLabelEn || project.category} • {project.locationEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Link
                    href={`/projects/${project.id}`}
                    target="_blank"
                    className="p-1.5 text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] rounded-lg border border-white/[0.06] transition-colors"
                    title="Live preview"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-[11px] text-neutral-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-amber-500/40 px-2.5 py-1.5 rounded-lg transition-all font-mono"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Studio Coordinates & Fast Comms Channels (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Direct Client Comms Status */}
          <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                  Direct Client Channels
                </h2>
              </div>
              <Link
                href="/admin/profile"
                className="text-xs font-mono text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-medium"
              >
                <span>Edit Info</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {/* WhatsApp Direct */}
              <div className="p-3 bg-[#090a0c] border border-white/[0.06] rounded-2xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    WhatsApp Primary
                  </div>
                  <div className="text-xs font-semibold text-white font-mono truncate">
                    {profile.whatsapp || '+20 100 000 0000'}
                  </div>
                </div>
                <a
                  href={`https://wa.me/${(profile.whatsapp || '').replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center gap-1 hover:bg-emerald-500/25 transition-all shrink-0"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Test Link</span>
                </a>
              </div>

              {/* Direct Phone */}
              <div className="p-3 bg-[#090a0c] border border-white/[0.06] rounded-2xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    Studio Voice Line
                  </div>
                  <div className="text-xs font-semibold text-white font-mono truncate">
                    {profile.phone || '+20 100 000 0000'}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Active
                </span>
              </div>

              {/* Direct Email */}
              <div className="p-3 bg-[#090a0c] border border-white/[0.06] rounded-2xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    Studio Inquiry Email
                  </div>
                  <div className="text-xs font-semibold text-white font-mono truncate">
                    {profile.email || 'alaa.issa.design@gmail.com'}
                  </div>
                </div>
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
              </div>
            </div>
          </div>

          {/* Card 2: Studio Security & Admin Accounts Summary */}
          <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  Studio Security & Passwords
                </h3>
              </div>
              <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                {adminAccounts.length} Admin{adminAccounts.length > 1 ? 's' : ''}
              </span>
            </div>

            <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
              Studio administration is protected via Supabase Auth. Manage registered administrator emails and change credentials securely.
            </p>

            <Link
              href="/admin/settings"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-neutral-200 border border-white/[0.08] hover:border-amber-500/40 transition-all font-semibold active:scale-95"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>Manage Admin Emails & Passwords</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. SLEEK SECTION QUICK NAVIGATOR (7 Core Monograph Sections)   */}
      {/* ============================================================== */}
      <div className="space-y-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold">
          DIRECT SECTION EDITORS
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {[
            { num: '01', title: 'Hero Section', href: '/admin/hero', icon: Sparkles },
            { num: '02', title: 'About Philosophy', href: '/admin/about', icon: BookOpen },
            { num: '03', title: 'Skills & Toolset', href: '/admin/skills', icon: Cpu },
            { num: '04', title: 'Experience', href: '/admin/experience', icon: Briefcase },
            { num: '05', title: 'Projects Gallery', href: '/admin/projects', icon: FolderKanban },
            { num: '06', title: 'Profile & Contact', href: '/admin/profile', icon: UserCheck },
            { num: '07', title: 'Studio Settings', href: '/admin/settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-3 bg-[#111215]/80 hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-500/40 rounded-2xl transition-all duration-200 flex flex-col justify-between gap-3 group active:scale-95 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] text-neutral-400 group-hover:text-amber-400 group-hover:bg-amber-500/10 flex items-center justify-center transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[9px] text-neutral-500 font-bold">
                    {item.num}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-amber-200 transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 mt-0.5">
                    Configure →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
