'use client'

import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { triggerHaptic } from '@/lib/haptics'

export interface ToastFeedback {
  type: 'success' | 'error' | 'info'
  text: string
}

interface AdminToastProps {
  feedback: ToastFeedback | null
  onClose: () => void
  autoDismissSuccessMs?: number
}

export default function AdminToast({
  feedback,
  onClose,
  autoDismissSuccessMs = 3500,
}: AdminToastProps) {
  useEffect(() => {
    if (!feedback) return

    // Success auto-dismisses after autoDismissSuccessMs
    // Critical errors persist until dismissed by the user (Vercel Guidelines)
    if (feedback.type === 'success' && autoDismissSuccessMs > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, autoDismissSuccessMs)
      return () => clearTimeout(timer)
    }
  }, [feedback, onClose, autoDismissSuccessMs])

  if (!feedback) return null

  const isSuccess = feedback.type === 'success'
  const isError = feedback.type === 'error'

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-4 sm:top-5 end-4 sm:end-6 z-50 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-auto animate-in slide-in-from-top-3 fade-in duration-200 select-none pointer-events-auto"
    >
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-mono shadow-2xl backdrop-blur-2xl transition-all ${
          isSuccess
            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200 shadow-emerald-950/30'
            : isError
            ? 'bg-red-950/85 border-red-500/50 text-red-200 shadow-red-950/40 ring-1 ring-red-500/30'
            : 'bg-neutral-900/90 border-white/20 text-neutral-200 shadow-neutral-950/40'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : isError ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span className="leading-snug break-words">{feedback.text}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            triggerHaptic('light')
            onClose()
          }}
          className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.08] active:scale-90 transition-all cursor-pointer shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
