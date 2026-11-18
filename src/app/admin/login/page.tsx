'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, Mail, ArrowLeft, ShieldAlert, Loader2, Eye, EyeOff, Compass } from 'lucide-react'
import { loginAction } from '../actions'

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#090a0c] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      {/* Background Architectural Grid & Coordinates */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Return to Portfolio Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-2 rounded-xl border border-white/[0.06] transition-all duration-200 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Public Monograph</span>
        </Link>
      </div>

      {/* Top Coordinate Stamp */}
      <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-400">
        <Compass className="w-3.5 h-3.5 text-amber-500/80" />
        <span>CAIRO • 30°02&apos;40&quot;N 31°14&apos;08&quot;E</span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#111215]/90 border border-white/[0.1] rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Monogram & Portrait Stamp */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500/50 p-1 mb-4 shadow-xl shadow-amber-950/30">
            <Image
              src="/images/alaa.webp"
              alt="Eng. Alaa Issa"
              fill
              sizes="80px"
              className="object-cover rounded-full"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-mono font-medium">
              PRIVATE STUDIO ACCESS
            </span>
          </div>

          <h1 className="text-2xl font-serif tracking-wide text-white">
            Eng. Alaa Issa
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono tracking-wider">
            PORTFOLIO MANAGEMENT CONSOLE
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
        <form action={formAction} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-mono mb-2">
              Studio Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="alaa.issa.design@gmail.com"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-all shadow-inner font-mono text-xs"
              />
            </div>
          </div>

          {/* Password Field with Show/Hide */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-mono mb-2">
              Security Key / Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full bg-[#090a0c] border border-white/[0.08] focus:border-amber-500/80 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-all shadow-inner font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-3 bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                <span>Authenticating Studio...</span>
              </>
            ) : (
              <span>Unlock Admin Console</span>
            )}
          </button>
        </form>

        {/* Security Stamp Notice */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
            RESTRICTED ATELIER ACCESS • ENCRYPTED SESSION COOKIE
          </p>
        </div>
      </div>
    </div>
  )
}
