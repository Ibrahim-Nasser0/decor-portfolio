import { getProjects, getProjectCategories } from '@/lib/dataRepository'
import ProjectsClient from './ProjectsClient'

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ])

  return (
    <div className="p-4 sm:p-6 lg:p-8 2xl:p-10 max-w-7xl mx-auto space-y-6">
      <ProjectsClient initialProjects={projects} initialCategories={categories} />
    </div>
  )
}
