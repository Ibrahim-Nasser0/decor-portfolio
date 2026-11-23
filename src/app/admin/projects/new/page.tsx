import { getProjectCategories } from '@/lib/dataRepository'
import ProjectForm from '../ProjectForm'

export const dynamic = 'force-dynamic'

export default async function NewProjectPage() {
  const categories = await getProjectCategories()

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <ProjectForm isNew={true} initialCategories={categories} />
    </div>
  )
}
