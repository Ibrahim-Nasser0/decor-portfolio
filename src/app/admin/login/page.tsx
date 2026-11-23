'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, Mail, ArrowLeft, ShieldAlert, Loader2, Eye, EyeOff, Compass, Languages } from 'lucide-react'
import { loginAction } from '../actions'
import { useAdminTranslation } from '@/context/AdminLanguageContext'
import { triggerHaptic } from '@/lib/haptics'

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = useState(false)
  const { t, lang, toggleLang, isRtl } = useAdminTranslation()

  return (
    <div className="min-h-screen bg-[#090a0c] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      {/* Background Architectural Grid & Coordinates */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#7AD1B8]/[0.025] rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Strip: Return to Public Site & Language Switcher */}
      <div className="absolute top-4 sm:top-6 start-4 sm:start-6 end-4 sm:end-6 z-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => triggerHaptic('light')}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] px-4 py-2 min-h-[40px] rounded-full border border-white/[0.06] transition-all duration-200 group active:scale-95"
        >
          <ArrowLeft className={`w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
          <span>{t.login.backToMonograph}</span>
        </Link>

        {/* Clean Language Switcher Toggle */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic('selection')
            toggleLang()
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 hover:text-white border border-white/[0.1] hover:border-[#7AD1B8]/50 text-xs font-mono transition-all active:scale-95 cursor-pointer shadow-sm"
          title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
          aria-label="Toggle Language"
        >
          <Languages className="w-3.5 h-3.5 text-[#7AD1B8]" />
          <span className="font-bold text-[11px] tracking-wider">
            {lang === 'ar' ? 'English' : 'عربي'}
          </span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#111215]/90 border border-white/[0.1] rounded-3xl p-7 sm:p-10 shadow-2xl relative z-10 backdrop-blur-xl mt-12 sm:mt-0">
        {/* Monogram & Portrait Stamp */}
        <div className="flex flex-col items-center text-center mb-7 sm:mb-8">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A059]/40 p-1 mb-4 shadow-xl shadow-black/50">
            <Image
              src="/images/alaa.webp"
              alt="Eng. Alaa Essa"
              fill
              sizes="80px"
              priority
              className="object-cover rounded-full"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7AD1B8]/10 border border-[#7AD1B8]/25 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7AD1B8]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#7AD1B8] font-mono font-medium">
              {t.login.badge}
            </span>
          </div>

          <h1 className="text-2xl font-editorial tracking-wide text-white font-light">
            {t.login.title}
          </h1>
          <p className="text-xs text-[#C5A059] mt-1 font-mono tracking-wider">
            {t.login.subtitle}
          </p>
        </div>

        {/* Error Alert Banner */}
        {state?.error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-800/60 rounded-2xl flex items-start gap-3 text-red-200 text-xs font-mono animate-fade-in">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{state.error}</span>
          </div>
        )}

        {/* Login Form */}
        <form
          action={formAction}
          onSubmit={() => triggerHaptic('selection')}
          className="space-y-5"
        >
          {/* Email Field (No iOS auto-zoom: text-[16px] sm:text-xs) */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-mono mb-2">
              {t.login.emailLabel}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-neutral-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                placeholder="alaa.essa.design@gmail.com"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-[#7AD1B8]/80 rounded-xl ps-10 pe-4 py-3 text-[16px] sm:text-xs text-white placeholder-neutral-600 focus:outline-none transition-all shadow-inner font-mono"
              />
            </div>
          </div>

          {/* Password Field with Show/Hide & Ergonomic Hit Area */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-mono mb-2">
              {t.login.passwordLabel}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-neutral-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-[#7AD1B8]/80 rounded-xl ps-10 pe-12 py-3 text-[16px] sm:text-xs text-white placeholder-neutral-600 focus:outline-none transition-all shadow-inner font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light')
                  setShowPassword(!showPassword)
                }}
                className="absolute inset-y-0 end-1 my-auto w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-300 active:scale-90 transition-all rounded-lg cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-3 bg-white hover:bg-neutral-100 text-neutral-950 font-medium py-3.5 px-4 min-h-[48px] rounded-full text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                <span>{t.login.authenticating}</span>
              </>
            ) : (
              <span>{t.login.submitButton}</span>
            )}
          </button>
        </form>

        {/* Security Stamp Notice */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
            {t.login.securityNotice}
          </p>
        </div>
      </div>
    </div>
  )
}
