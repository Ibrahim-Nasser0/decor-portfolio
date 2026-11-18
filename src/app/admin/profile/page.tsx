import { getDesignerProfile } from '@/lib/dataRepository'
import ProfileClient from './ProfileClient'

export const dynamic = 'force-dynamic'

export default async function AdminProfilePage() {
  const profile = await getDesignerProfile()

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <ProfileClient initialProfile={profile} />
    </div>
  )
}
