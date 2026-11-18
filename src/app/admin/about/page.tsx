import { getDesignerProfile } from '@/lib/dataRepository'
import AboutClient from './AboutClient'

export const dynamic = 'force-dynamic'

export default async function AdminAboutPage() {
  const profile = await getDesignerProfile()

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <AboutClient initialProfile={profile} />
    </div>
  )
}
