'use client'

import React, { useEffect } from 'react'
import { AlertTriangle, X, Loader2 } from 'lucide-react'
import { triggerHaptic } from '@/lib/haptics'

interface AdminConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  isDestructive?: boolean
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function AdminConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: AdminConfirmModalProps) {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, isLoading, onCancel])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent cursor-pointer"
        onClick={() => {
          if (!isLoading) {
            triggerHaptic('light')
            onCancel()
          }
        }}
      />

      {/* Modal Dialog Card (Bottom Sheet on Mobile, Centered on Tablet/Desktop) */}
      <div className="relative z-10 bg-[#0e1014] border-t sm:border border-white/[0.14] rounded-t-[28px] sm:rounded-3xl w-full max-w-md mx-auto p-5 sm:p-6 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] sm:pb-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto sm:hidden -mt-1 mb-1" />

        <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                isDestructive
                  ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white tracking-wide truncate">
              {title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('light')
              onCancel()
            }}
            disabled={isLoading}
            className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center text-neutral-400 hover:text-white rounded-xl bg-white/[0.04] active:scale-90 transition-transform cursor-pointer disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
          {message}
        </p>

        <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => {
              triggerHaptic('selection')
              onCancel()
            }}
            disabled={isLoading}
            className="flex-1 py-2.5 px-4 min-h-[44px] rounded-xl text-neutral-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono transition-all text-center cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic(isDestructive ? 'warning' : 'success')
              onConfirm()
            }}
            disabled={isLoading}
            className={`flex-1 py-2.5 px-4 min-h-[44px] rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all text-center cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/40'
                : 'bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 shadow-amber-950/20'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
