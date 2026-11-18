import { getDesignerProfile, getProjects } from '@/lib/dataRepository'
import HeroClient from './HeroClient'

export const dynamic = 'force-dynamic'

export default async function AdminHeroPage() {
  const [profile, projects] = await Promise.all([
    getDesignerProfile(),
    getProjects(),
  ])

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <HeroClient initialProfile={profile} projectsCount={projects.length} />
    </div>
  )
}
