'use client'

import { useState } from 'react'
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
  BookOpen,
  Cpu,
  Briefcase,
  FolderKanban,
  UserCheck,
  MessageSquareText,
  Sliders,
  X,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import { AdminAccount } from '@/lib/dataRepository'
import {
  addAdminAccountAction,
  deleteAdminAccountAction,
  updatePasswordAction,
  logoutAction,
} from '../actions'

const SECTIONS_DIRECTORY = [
  { num: '00', label: 'Studio Overview', href: '/admin', icon: Layers, desc: 'Real-time telemetry and overview' },
  { num: '01', label: 'Monograph Hero', href: '/admin/hero', icon: Sparkles, desc: 'Cover, statement & metrics ribbon' },
  { num: '02', label: 'About Philosophy', href: '/admin/about', icon: BookOpen, desc: 'Biography, ethos & dossier links' },
  { num: '03', label: 'Skills & Software', href: '/admin/skills', icon: Cpu, desc: 'Bento grid & software stack' },
  { num: '04', label: 'Career & Degrees', href: '/admin/experience', icon: Briefcase, desc: 'Firm roles & academic diplomas' },
  { num: '05', label: 'Projects Gallery', href: '/admin/projects', icon: FolderKanban, desc: 'Portfolio case studies & CV slots' },
  { num: '06', label: 'Profile & Contact', href: '/admin/profile', icon: UserCheck, desc: 'WhatsApp, email & studio coordinates' },
]

export default function SettingsClient({
  initialAccounts,
  currentUserEmail,
}: {
  initialAccounts: AdminAccount[]
  currentUserEmail: string
}) {
  const [accounts, setAccounts] = useState<AdminAccount[]>(() => {
    // Ensure the current authenticated user is included in the list
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
      setFeedback({ type: 'success', text: 'Password updated successfully! Next login will require this new password.' })
      setNewPass('')
      setConfirmPass('')
      setTimeout(() => setFeedback(null), 5000)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update password' })
    }
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-mono shadow-xl transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200'
              : 'bg-red-950/60 border-red-800/80 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-neutral-400 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-[#111215]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-semibold">
                Section 08 • Studio Access
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono font-bold">
                {accounts.length} Registered Accounts
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif text-white tracking-wide mt-0.5">
              Settings & Studio Security
            </h1>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Authorized admin emails, password management, and studio console configurations.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 font-semibold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/20 active:scale-95 cursor-pointer self-start sm:self-center shrink-0"
        >
          <UserPlus className="w-4 h-4 text-neutral-900" />
          <span>Add Admin Email</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Registered Emails List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authorized Admin Emails ({accounts.length})</span>
                </h2>
                <span className="text-[10px] text-neutral-400 font-mono">
                  Team members with authenticated administrative rights
                </span>
              </div>

              <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
                Supabase Auth Protected
              </span>
            </div>

            {/* Accounts Cards List */}
            <div className="space-y-3">
              {accounts.map((acc, idx) => {
                const isCurrent = acc.email.toLowerCase() === currentUserEmail.toLowerCase()
                const initials = acc.email.slice(0, 2).toUpperCase()

                return (
                  <div
                    key={acc.id || idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                      isCurrent
                        ? 'bg-amber-500/[0.03] border-amber-500/40 shadow-sm'
                        : 'bg-[#090a0c] border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 border ${
                          isCurrent
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-inner'
                            : 'bg-white/[0.03] text-neutral-300 border-white/[0.08]'
                        }`}
                      >
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-semibold text-white truncate font-sans">
                            {acc.email}
                          </span>
                          {isCurrent && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Current Session (You)</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-2 mt-0.5">
                          <span className="text-amber-400/90 font-medium">{acc.role || 'Administrator'}</span>
                          <span>•</span>
                          <span>Active Access</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {isCurrent ? (
                        <span className="text-[10px] font-mono text-neutral-500 px-3 py-1 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          Primary Session
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setAccountToDelete(acc)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 text-red-300 border border-red-800/40 hover:border-red-600 text-xs font-mono transition-all cursor-pointer active:scale-95"
                          title="Revoke Admin Access"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Monograph Directory (Especially handy for mobile "More" tab) */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
            <div className="pb-3 border-b border-white/[0.06]">
              <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Navigation Directory</span>
              </h2>
              <span className="text-[10px] text-neutral-400 font-mono">
                Jump directly to any section of the monograph editor
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SECTIONS_DIRECTORY.map((sec) => {
                const Icon = sec.icon
                return (
                  <Link
                    key={sec.href}
                    href={sec.href}
                    className="p-3.5 rounded-2xl bg-[#090a0c] border border-white/[0.06] hover:border-amber-500/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                          {sec.label}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono truncate">
                          {sec.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Password Management & Security */}
        <div className="space-y-6">
          {/* Change Password Card */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
            <div className="pb-3 border-b border-white/[0.06]">
              <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Security & Password</span>
              </h2>
              <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                Update credentials for active session ({currentUserEmail})
              </p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1.5">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showUpdatePass ? 'text' : 'password'}
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowUpdatePass(!showUpdatePass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showUpdatePass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1.5">
                  Confirm New Password *
                </label>
                <input
                  type={showUpdatePass ? 'text' : 'password'}
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingPass}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-semibold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isUpdatingPass ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Studio Profile & Brand Coordinates */}
          <div className="bg-[#111215]/80 border border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
            <div className="pb-3 border-b border-white/[0.06]">
              <h2 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-medium">
                Studio Identity Stamp
              </h2>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 bg-[#090a0c] rounded-xl border border-white/[0.04]">
                <span className="text-neutral-400">Principal:</span>
                <span className="text-white font-semibold">Eng. Alaa Essa</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#090a0c] rounded-xl border border-white/[0.04]">
                <span className="text-neutral-400">Practice:</span>
                <span className="text-white font-semibold">Interior Architecture</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#090a0c] rounded-xl border border-white/[0.04]">
                <span className="text-neutral-400">Headquarters:</span>
                <span className="text-white">Alexandria, Egypt</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#090a0c] rounded-xl border border-white/[0.04]">
                <span className="text-neutral-400">Live URL:</span>
                <a
                  href="https://alaa-essa.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>alaa-essa.vercel.app</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-950/20 hover:bg-red-900/40 text-red-300 border border-red-800/40 hover:border-red-600 px-4 py-2.5 rounded-xl text-xs font-mono transition-all active:scale-95 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Log Out of Console</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add New Admin Account */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#131417] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Add New Admin Email</h3>
                  <span className="text-[10px] text-neutral-400 font-mono">Register new studio access</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-white/[0.03]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. partner@atelier.com"
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1.5">
                  Initial Password *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-300 mb-1.5">
                  Role & Permissions
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono cursor-pointer"
                >
                  <option value="Administrator">Administrator (Full Console Access)</option>
                  <option value="Associate Architect">Associate Architect</option>
                  <option value="Editor">Editor (Portfolio Content)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-300 hover:bg-white/[0.05] border border-white/[0.08] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-neutral-950 font-semibold px-4 py-2 rounded-xl text-xs font-mono transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirm Delete Account */}
      {accountToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#131417] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-950/40 text-red-400 border border-red-800/60 rounded-2xl shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Revoke Studio Access</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Are you sure you want to remove{' '}
                  <span className="text-white font-semibold font-mono">
                    "{accountToDelete.email}"
                  </span>
                  ? This account will no longer be able to log in to the Studio Console.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setAccountToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-300 hover:bg-white/[0.05] border border-white/[0.08] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteAccount}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-mono transition-colors shadow-md cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Removing...</span>
                  </>
                ) : (
                  <span>Revoke Access</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
