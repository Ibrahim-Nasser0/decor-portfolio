import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getAdminAccounts } from '@/lib/dataRepository'
import SettingsClient from './SettingsClient'

export const metadata: Metadata = {
  title: 'Settings & Studio Access | Eng. Alaa Essa Console',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const accounts = await getAdminAccounts()

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      <SettingsClient
        initialAccounts={accounts}
        currentUserEmail={user?.email || 'alaa.issa.design@gmail.com'}
      />
    </div>
  )
}
