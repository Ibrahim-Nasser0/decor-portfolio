import { getProjects, getDesignerProfile, getAdminAccounts, getClientInquiries } from '@/lib/dataRepository'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  const [projects, profile, adminAccounts, inquiries] = await Promise.all([
    getProjects(),
    getDesignerProfile(),
    getAdminAccounts(),
    getClientInquiries(),
  ])

  return (
    <HomeClient
      initialProjects={projects}
      profile={profile}
      adminAccounts={adminAccounts}
      initialInquiries={inquiries}
    />
  )
}
