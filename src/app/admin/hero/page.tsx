import { getDesignerProfile } from '@/lib/dataRepository'
import HeroClient from './HeroClient'

export const dynamic = 'force-dynamic'

export default async function AdminHeroPage() {
  const profile = await getDesignerProfile()

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <HeroClient initialProfile={profile} />
    </div>
  )
}
