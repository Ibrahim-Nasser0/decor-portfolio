'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  Mail,
  KeyRound,
  UserPlus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  Briefcase,
  FolderKanban,
  UserCheck,
  Sliders,
  X,
  AlertTriangle,
  ArrowRight,
  Languages,
} from 'lucide-react'
import { AdminAccount } from '@/data/portfolioData'
import { triggerHaptic } from '@/lib/haptics'
import AdminToast from '@/components/admin/AdminToast'
import {
  addAdminAccountAction,
  deleteAdminAccountAction,
  updatePasswordAction,
  logoutAction,
} from '../actions'
import { useAdminTranslation } from '@/context/AdminLanguageContext'

export default function SettingsClient({
  initialAccounts,
  currentUserEmail,
}: {
  initialAccounts: AdminAccount[]
  currentUserEmail: string
}) {
  const { t, isRtl, lang, setLang } = useAdminTranslation()

  const [accounts, setAccounts] = useState<AdminAccount[]>(() => {
    const hasCurrent = initialAccounts.some(
      (a) => a.email.toLowerCase() === currentUserEmail.toLowerCase()
    )
    if (!hasCurrent) {
      return [
        {
          id: 'current-session-user',
          email: currentUserEmail,
          role: 'Owner / Principal Architect',
          created_at: new Date().toISOString(),
        },
        ...initialAccounts,
      ]
    }
    return initialAccounts
  })

  // Modals & Feedback
  const [showAddModal, setShowAddModal] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState<AdminAccount | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Add Account Form State
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState('Administrator')
  const [isAdding, setIsAdding] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Update Password Form State
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showUpdatePass, setShowUpdatePass] = useState(false)
  const [isUpdatingPass, setIsUpdatingPass] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Handle Add Admin Account
  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail || !newEmail.includes('@')) {
      setFeedback({ type: 'error', text: 'Please enter a valid email address.' })
      return
    }

    if (newPassword && newPassword.length < 6) {
      setFeedback({ type: 'error', text: 'Password must be at least 6 characters long.' })
      return
    }

    setIsAdding(true)
    const res = await addAdminAccountAction({
      email: newEmail,
      password: newPassword,
      role: newRole,
    })
    setIsAdding(false)

    if (res.success && res.account) {
      setAccounts((prev) => [...prev, res.account!])
      setFeedback({
        type: 'success',
        text: `Admin account "${newEmail}" registered successfully!`,
      })
      setShowAddModal(false)
      setNewEmail('')
      setNewPassword('')
      setTimeout(() => setFeedback(null), 4000)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to add admin account' })
    }
  }

  // Handle Delete Account
  const confirmDeleteAccount = async () => {
    if (!accountToDelete) return
    setIsDeleting(true)
    const res = await deleteAdminAccountAction(accountToDelete.id || accountToDelete.email)
    setIsDeleting(false)

    if (res.success) {
      setAccounts((prev) => prev.filter((a) => a.email !== accountToDelete.email))
      setFeedback({
        type: 'success',
        text: `Account "${accountToDelete.email}" removed from studio access.`,
      })
      setAccountToDelete(null)
      setTimeout(() => setFeedback(null), 4000)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to remove account' })
    }
  }

  // Handle Update Password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPass.length < 6) {
      setFeedback({ type: 'error', text: 'New password must be at least 6 characters.' })
      return
    }
    if (newPass !== confirmPass) {
      setFeedback({ type: 'error', text: 'Passwords do not match. Please re-enter.' })
      return
    }

    setIsUpdatingPass(true)
    const res = await updatePasswordAction({
      newPassword: newPass,
      confirmPassword: confirmPass,
    })
    setIsUpdatingPass(false)

    if (res.success) {
      setFeedback({ type: 'success', text: t.settings.passwordUpdatedSuccess })
      setNewPass('')
      setConfirmPass('')
      setTimeout(() => setFeedback(null), 5000)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update password' })
    }
  }

  const sectionsDirectory = [
    { num: '01', label: t.nav.home, href: '/admin', icon: Layers },
    { num: '02', label: t.nav.projects, href: '/admin/projects', icon: FolderKanban },
    { num: '03', label: t.nav.experience, href: '/admin/experience', icon: Briefcase },
    { num: '04', label: t.nav.profile, href: '/admin/profile', icon: UserCheck },
    { num: '05', label: t.nav.settings, href: '/admin/settings', icon: Sliders },
  ]

  // Lock body scroll and handle Escape key for modals
  useEffect(() => {
    const hasModal = Boolean(showAddModal || accountToDelete)
    if (!hasModal) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAddModal(false)
        setAccountToDelete(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showAddModal, accountToDelete])

  return (
    <div className="p-4 sm:p-6 lg:p-8 2xl:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in relative z-10 pb-28 select-none">
      {/* Floating Toast Notification (Zero Layout Shift) */}
      <AdminToast feedback={feedback} onClose={() => setFeedback(null)} />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-mono text-amber-500 uppercase font-semibold">
            Section 05 Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-wide mt-1">
            {t.settings.title}
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            {t.settings.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white rounded-xl text-xs font-mono border border-white/[0.08] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.common.preview}</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Accounts (7 cols) + Security (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* ============================================================== */}
        {/* Left Column: Registered Admin Emails (7 Cols)                  */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400" />
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  {t.settings.adminAccountsTitle} ({accounts.length})
                </h2>
                <p className="text-[10px] text-neutral-400 font-sans mt-0.5">
                  {t.settings.adminAccountsSubtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md font-mono cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-neutral-950 stroke-[2.5]" />
              <span>{t.settings.addAdminEmail}</span>
            </button>
          </div>

          {/* Accounts List */}
          <div className="divide-y divide-white/[0.06]">
            {accounts.map((acc) => {
              const isCurrentUser =
                acc.email.toLowerCase() === currentUserEmail.toLowerCase()

              return (
                <div
                  key={acc.id || acc.email}
                  className="py-3.5 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-amber-400">
                      <Mail className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-white font-mono truncate">
                          {acc.email}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[8px] font-mono uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                            {t.settings.currentSessionYou}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                        {acc.role || 'Studio Administrator'}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isCurrentUser ? (
                      <span
                        className="text-[10px] font-mono text-neutral-500 cursor-not-allowed px-2.5 py-1 rounded-lg bg-white/[0.02]"
                        title={t.settings.selfDeleteBlocked}
                      >
                        Protected
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAccountToDelete(acc)}
                        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer"
                        title={t.settings.deleteAdminEmail}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* Right Column: Password Manager & Preferences (5 Cols)          */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Master Password Manager */}
          <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
              <KeyRound className="w-4 h-4 text-sky-400" />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  {t.settings.passwordManagerTitle}
                </h3>
                <p className="text-[10px] text-neutral-400 font-sans mt-0.5">
                  {t.settings.passwordManagerSubtitle}
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  {t.settings.newPasswordLabel}
                </label>
                <div className="relative">
                  <input
                    type={showUpdatePass ? 'text' : 'password'}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    minLength={6}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl ps-3.5 pe-12 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light')
                      setShowUpdatePass(!showUpdatePass)
                    }}
                    className="absolute end-1 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showUpdatePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  {t.settings.confirmPasswordLabel}
                </label>
                <input
                  type={showUpdatePass ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  minLength={6}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingPass || !newPass || !confirmPass}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 hover:text-white border border-white/[0.1] hover:border-amber-400/50 text-xs font-mono font-semibold transition-all disabled:opacity-50 cursor-pointer active:scale-98"
              >
                {isUpdatingPass ? t.common.saving : t.settings.updatePasswordButton}
              </button>
            </form>
          </div>

          {/* Card: Studio Language Preference */}
          <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
              <Languages className="w-4 h-4 text-amber-400" />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  {t.settings.preferencesTitle}
                </h3>
                <p className="text-[10px] text-neutral-400 font-sans mt-0.5">
                  {t.settings.languagePreference}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  lang === 'ar'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold shadow-md'
                    : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                }`}
              >
                <span>العربية (RTL)</span>
              </button>

              <button
                type="button"
                onClick={() => setLang('en')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold shadow-md'
                    : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                }`}
              >
                <span>English (LTR)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5 MONOGRAPH SCREENS DIRECTORY                                  */}
      {/* ============================================================== */}
      <div className="space-y-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold">
          {t.nav.monographSections} (5 Screens)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {sectionsDirectory.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-3.5 bg-[#111215]/80 hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-500/40 rounded-2xl transition-all flex flex-col justify-between gap-3 group active:scale-95 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] text-neutral-400 group-hover:text-amber-400 group-hover:bg-amber-500/10 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-neutral-500 font-bold">
                    {item.num}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-amber-200 transition-colors truncate">
                    {item.label}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 mt-0.5">
                    Configure →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM SHEET: ADD ADMIN EMAIL                                  */}
      {/* ============================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-transparent cursor-pointer"
            onClick={() => setShowAddModal(false)}
          />

          <div className="relative z-10 bg-[#0e1014] border-t sm:border border-white/[0.14] rounded-t-[28px] sm:rounded-3xl w-full max-w-md mx-auto p-5 sm:p-6 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] sm:pb-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden -mt-1 mb-1" />

            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                  {t.settings.addAdminEmail}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light')
                  setShowAddModal(false)
                }}
                className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-neutral-400 hover:text-white rounded-xl bg-white/[0.04] active:scale-90 transition-transform cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  {t.settings.emailAddress}
                </label>
                <input
                  type="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="architect@domain.com"
                  required
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  {t.settings.initialPassword}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    minLength={6}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl ps-3.5 pe-12 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light')
                      setShowNewPassword(!showNewPassword)
                    }}
                    className="absolute end-1 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                  {t.settings.roleLabel}
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#111215] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-3 text-[16px] sm:text-xs text-white focus:outline-none font-mono"
                >
                  <option value="Studio Principal">Studio Principal</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Editor / Architect">Editor / Architect</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.04] active:scale-95 transition-all cursor-pointer"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isAdding || !newEmail || !newPassword}
                  className="px-5 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-400 to-amber-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 active:scale-95 cursor-pointer shadow-md"
                >
                  {isAdding ? t.common.saving : t.common.create}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM SHEET: DELETE CONFIRMATION                              */}
      {/* ============================================================== */}
      {accountToDelete && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-transparent cursor-pointer"
            onClick={() => setAccountToDelete(null)}
          />

          <div className="relative z-10 bg-[#0e1014] border-t sm:border border-red-900/40 rounded-t-[28px] sm:rounded-3xl w-full max-w-sm mx-auto p-5 sm:p-6 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] sm:pb-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden -mt-1 mb-1" />

            <div className="w-10 h-10 rounded-2xl bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">
                {t.settings.deleteAdminEmail}
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {t.settings.confirmDeleteAdmin} <strong className="text-white font-mono">{accountToDelete.email}</strong>?
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAccountToDelete(null)}
                className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.04] active:scale-95 transition-all cursor-pointer"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={confirmDeleteAccount}
                disabled={isDeleting}
                className="px-5 py-2.5 min-h-[44px] rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md"
              >
                {isDeleting ? t.common.saving : t.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
