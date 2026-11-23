import { notFound } from 'next/navigation'
import { getProjectById, getProjectCategories } from '@/lib/dataRepository'
import ProjectForm from '../ProjectForm'

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [project, categories] = await Promise.all([
    getProjectById(id),
    getProjectCategories(),
  ])

  if (!project) {
    notFound()
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <ProjectForm initialProject={project} isNew={false} initialCategories={categories} />
    </div>
  )
}
