import { getProjects, getDesignerProfile, getAdminAccounts } from '@/lib/dataRepository'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  const [projects, profile, adminAccounts] = await Promise.all([
    getProjects(),
    getDesignerProfile(),
    getAdminAccounts(),
  ])

  return (
    <HomeClient
      initialProjects={projects}
      profile={profile}
      adminAccounts={adminAccounts}
    />
  )
}
