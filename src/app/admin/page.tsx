import Link from 'next/link'
import Image from 'next/image'
import {
  FolderKanban,
  Star,
  MessageSquareText,
  Plus,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  Clock,
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  Cpu,
  BookOpen,
  Briefcase,
  UserCheck,
  ChevronRight,
  Sliders,
  Eye,
} from 'lucide-react'
import { getProjects, getClientInquiries, getDesignerProfile } from '@/lib/dataRepository'

export const dynamic = 'force-dynamic'

const SECTIONS_DIRECTORY = [
  {
    num: '01',
    title: 'Hero Section',
    subtitle: 'Monumental headline, role taglines & Cairo coordinate stamps',
    href: '/admin/hero',
    previewHref: '/#hero',
    icon: Sparkles,
    badge: 'Homepage Banner',
  },
  {
    num: '02',
    title: 'About Section',
    subtitle: 'Practice narrative, design philosophy & architectural ethos',
    href: '/admin/about',
    previewHref: '/#about',
    icon: BookOpen,
    badge: 'Philosophy',
  },
  {
    num: '03',
    title: 'Skills Suite',
    subtitle: '3ds Max, Corona, CAD production stack & technical disciplines',
    href: '/admin/skills',
    previewHref: '/#skills',
    icon: Cpu,
    badge: 'Production Engine',
  },
  {
    num: '04',
    title: 'Experience',
    subtitle: 'Professional firm appointments & academic architecture degrees',
    href: '/admin/experience',
    previewHref: '/#experience',
    icon: Briefcase,
    badge: 'Chronology',
  },
  {
    num: '05',
    title: 'Projects Gallery',
    subtitle: 'Residential & commercial case studies, before/after & specifications',
    href: '/admin/projects',
    previewHref: '/#projects',
    icon: FolderKanban,
    badge: 'Curated Works',
  },
  {
    num: '06',
    title: 'Profile (Contact)',
    subtitle: 'WhatsApp hotline, studio phone, email, location & social coordinates',
    href: '/admin/profile',
    previewHref: '/#contact',
    icon: UserCheck,
    badge: 'Coordinates',
  },
  {
    num: '07',
    title: 'Inquiries Inbox',
    subtitle: 'Private consultation briefs, 1-click WhatsApp replies & studio notes',
    href: '/admin/inquiries',
    previewHref: '/admin/inquiries',
    icon: MessageSquareText,
    badge: 'Lead CRM',
  },
]

export default async function AdminOverviewPage() {
  const [projects, inquiries, profile] = await Promise.all([
    getProjects(),
    getClientInquiries(10),
    getDesignerProfile(),
  ])

  const featuredProjects = projects.filter((p) => p.featured)
  const newInquiries = inquiries.filter((i) => i.status === 'new')
  const categoriesList = Array.from(new Set(projects.map((p) => p.category)))

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-10 animate-fade-in relative z-10">
      {/* Top Studio Control Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-mono text-amber-500 uppercase font-semibold">
              ARCHITECTURAL ATELIER COMMAND
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide font-light">
            Monograph Control Overview
          </h1>
          <p className="text-xs text-neutral-400 mt-1.5 font-mono max-w-2xl">
            Central command for Eng. Alaa Issa's portfolio. Directing {projects.length} architectural works, live section statements, and client consultations.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 font-semibold px-4.5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/20 active:scale-95 cursor-pointer font-mono"
          >
            <Plus className="w-4 h-4 text-neutral-900" />
            <span>New Project</span>
          </Link>

          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-2 bg-[#111215] hover:bg-white/[0.08] text-neutral-200 px-4 py-2.5 rounded-xl text-xs font-mono border border-white/[0.08] hover:border-amber-500/40 transition-all cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Studio Profile</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#111215] hover:bg-white/[0.08] text-neutral-200 px-4 py-2.5 rounded-xl text-xs font-mono border border-white/[0.08] hover:border-white/20 transition-all group"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">View Public Monograph</span>
          </Link>
        </div>
      </div>

      {/* KPI Command Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Total Projects */}
        <div className="bg-[#111215]/80 backdrop-blur-md border border-white/[0.08] hover:border-amber-500/40 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group shadow-xl">
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/[0.04] rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-neutral-400 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
              01 • Total Works
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-light text-white tracking-tight font-serif">
            {projects.length}
          </div>
          <div className="text-[11px] text-neutral-400 mt-3 flex items-center justify-between font-mono pt-3 border-t border-white/[0.04]">
            <span>{categoriesList.length} Categories Live</span>
            <Link
              href="/admin/projects"
              className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metric 2: Featured in Hero */}
        <div className="bg-[#111215]/80 backdrop-blur-md border border-white/[0.08] hover:border-amber-500/40 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group shadow-xl">
          <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/[0.04] rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-neutral-400 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
              02 • Hero Featured
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-light text-white tracking-tight font-serif">
            {featuredProjects.length}
          </div>
          <div className="text-[11px] text-neutral-400 mt-3 font-mono pt-3 border-t border-white/[0.04] flex items-center justify-between">
            <span>Active in hero slider</span>
            <Link
              href="/admin/projects"
              className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
            >
              <span>Select</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metric 3: Client Inquiries */}
        <div className="bg-[#111215]/80 backdrop-blur-md border border-white/[0.08] hover:border-sky-500/40 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group shadow-xl">
          <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/[0.04] rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-neutral-400 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
              03 • Consultations
            </span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <MessageSquareText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-light text-white tracking-tight font-serif flex items-center gap-2.5">
            <span>{inquiries.length}</span>
            {newInquiries.length > 0 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {newInquiries.length} new
              </span>
            )}
          </div>
          <div className="text-[11px] text-neutral-400 mt-3 flex items-center justify-between font-mono pt-3 border-t border-white/[0.04]">
            <span>Direct Client Leads</span>
            <Link
              href="/admin/inquiries"
              className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Inbox</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metric 4: Software Stack */}
        <div className="bg-[#111215]/80 backdrop-blur-md border border-white/[0.08] hover:border-purple-500/40 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group shadow-xl">
          <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/[0.04] rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-neutral-400 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
              04 • Production Tools
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-light text-white tracking-tight font-serif">
            {profile.software?.length || 6}
          </div>
          <div className="text-[11px] text-neutral-400 mt-3 flex items-center justify-between font-mono pt-3 border-t border-white/[0.04]">
            <span>3ds Max, Corona, CAD...</span>
            <Link
              href="/admin/skills"
              className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Skills</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Monograph Sections Directory Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-semibold">
              DIRECT SECTION ACCESS
            </div>
            <h2 className="text-xl font-serif text-white tracking-wide">
              Portfolio Monograph Sections
            </h2>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
            Click any section card to edit content and view live preview
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SECTIONS_DIRECTORY.map((sec) => {
            const Icon = sec.icon
            return (
              <div
                key={sec.num}
                className="bg-[#111215]/80 hover:bg-[#15161a] border border-white/[0.08] hover:border-amber-500/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {sec.num}
                    </span>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                      {sec.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white/[0.04] text-neutral-300 group-hover:text-amber-400 group-hover:bg-amber-500/10 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                      {sec.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed font-sans">
                    {sec.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono">
                  <Link
                    href={sec.href}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium group/btn"
                  >
                    <span>Edit Section</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>

                  {sec.previewHref && (
                    <Link
                      href={sec.previewHref}
                      target={sec.previewHref.startsWith('/') ? '_blank' : undefined}
                      className="text-neutral-500 hover:text-white transition-colors"
                      title="Preview on Public Website"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Grid: Projects Overview & Live Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Projects Catalogue */}
        <div className="lg:col-span-2 bg-[#111215]/80 backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-semibold mb-0.5">
                CURATED ARCHITECTURAL WORKS
              </div>
              <h2 className="text-lg font-serif text-white tracking-wide">
                Published Monograph Works
              </h2>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 font-medium"
            >
              <span>View All ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {projects.slice(0, 5).map((project, idx) => (
              <div
                key={project.id}
                className="py-4 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-18 h-14 sm:w-22 sm:h-16 rounded-2xl overflow-hidden bg-neutral-900 shrink-0 border border-white/[0.08]">
                    <Image
                      src={project.coverImage}
                      alt={project.titleEn}
                      fill
                      sizes="90px"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 left-1 bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] font-mono text-neutral-300">
                      #{idx + 1}
                    </div>
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                        {project.titleEn}
                      </h3>
                      {project.featured && (
                        <span className="text-[9px] font-mono uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0 font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate font-mono">
                      {project.categoryLabelEn} • {project.locationEn} • {project.area}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/projects/${project.id}`}
                    target="_blank"
                    className="p-2 text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] rounded-xl border border-white/[0.06] transition-colors"
                    title="Preview public case study"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-xs text-neutral-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-amber-500/40 px-3.5 py-1.5 rounded-xl transition-all font-mono font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): Latest Inquiries & Fast WhatsApp */}
        <div className="bg-[#111215]/80 backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-semibold mb-0.5">
                  CLIENT CONSULTATIONS
                </div>
                <h2 className="text-lg font-serif text-white tracking-wide">
                  Recent Inquiries
                </h2>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-mono text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-medium"
              >
                <span>Inbox</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <MessageSquareText className="w-8 h-8 text-neutral-600 mx-auto" />
                <p className="text-neutral-400 text-xs font-mono">
                  No inquiries submitted yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5 pt-4">
                {inquiries.slice(0, 4).map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-4 bg-[#090a0c] border border-white/[0.06] rounded-2xl space-y-2.5 hover:border-amber-500/30 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">
                        {inquiry.client_name}
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full ${
                          inquiry.status === 'new'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-white/[0.06] text-neutral-400'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed font-sans">
                      {inquiry.message || `${inquiry.service_type || 'Consultation'} • ${inquiry.area_size || 'Area unspecified'}`}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.04] text-[10px] text-neutral-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                      <a
                        href={`https://wa.me/${inquiry.phone_number.replace(/\D/g, '')}?text=${encodeURIComponent(`Dear ${inquiry.client_name}, this is Eng. Alaa Issa following up on your interior architecture consultation request.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 hover:underline font-semibold"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>WhatsApp Reply</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-center">
            <Link
              href="/admin/inquiries"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-neutral-300 border border-white/[0.06] transition-colors"
            >
              <span>Manage All Inquiries & Private Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
