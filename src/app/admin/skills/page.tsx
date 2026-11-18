import { getDesignerProfile } from '@/lib/dataRepository'
import SkillsClient from './SkillsClient'

export const dynamic = 'force-dynamic'

export default async function AdminSkillsPage() {
  const profile = await getDesignerProfile()

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <SkillsClient initialProfile={profile} />
    </div>
  )
}
