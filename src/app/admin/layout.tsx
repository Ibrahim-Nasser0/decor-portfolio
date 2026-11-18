import AdminSidebar from './Sidebar'
import AdminTopNav from '@/components/admin/AdminTopNav'

export const metadata = {
  title: 'Admin Console | Eng. Alaa Issa Interior Architecture',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0b0d] text-neutral-100 flex flex-col lg:flex-row font-sans selection:bg-amber-500/20 selection:text-amber-200 relative overflow-x-hidden">
      {/* Background Architectural Drafting Grid & Atmospheric Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 -left-40 w-96 h-96 bg-sky-500/[0.02] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Collapsible Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col relative z-10 overflow-y-auto">
        <AdminTopNav />
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
