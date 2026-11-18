import { getDesignerProfile } from '@/lib/dataRepository'
import ExperienceClient from './ExperienceClient'

export const dynamic = 'force-dynamic'

export default async function AdminExperiencePage() {
  const profile = await getDesignerProfile()

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <ExperienceClient initialProfile={profile} />
    </div>
  )
}
