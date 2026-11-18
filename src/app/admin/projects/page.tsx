import { getProjects } from '@/lib/dataRepository'
import ProjectsClient from './ProjectsClient'

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-mono text-amber-500 uppercase font-semibold">
            Curated Portfolio Catalogue
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-wide mt-1">
            Projects Manager
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Direct published monograph works, before/after sliders, material swatches, and 1-click clones.
          </p>
        </div>
      </div>

      <ProjectsClient initialProjects={projects} />
    </div>
  )
}
