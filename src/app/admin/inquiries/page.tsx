import { getClientInquiries } from '@/lib/dataRepository'
import InquiriesClient from './InquiriesClient'

export const dynamic = 'force-dynamic'

export default async function AdminInquiriesPage() {
  const inquiries = await getClientInquiries()

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-6">
      <div className="pb-6 border-b border-white/[0.08]">
        <span className="text-[10px] tracking-[0.25em] font-mono text-amber-500 uppercase font-semibold">
          Lead Intake & Consultations
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-wide mt-1">
          Client Inquiries Hub
        </h1>
        <p className="text-xs text-neutral-400 mt-1 font-mono">
          Manage private consultation requests, 1-click personalized WhatsApp replies, and studio lead notes.
        </p>
      </div>

      <InquiriesClient initialInquiries={inquiries} />
    </div>
  )
}
