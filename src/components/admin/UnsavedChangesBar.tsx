'use client'

import { useEffect, useState } from 'react'
import { Save, RotateCcw, Loader2 } from 'lucide-react'
import { triggerHaptic } from '@/lib/haptics'
import { useAdminTranslation } from '@/context/AdminLanguageContext'
import AdminConfirmModal from './AdminConfirmModal'

interface UnsavedChangesBarProps {
  isDirty: boolean
  isSaving: boolean
  onSave: () => void
  onDiscard: () => void
}

export default function UnsavedChangesBar({
  isDirty,
  isSaving,
  onSave,
  onDiscard,
}: UnsavedChangesBarProps) {
  const { t, isRtl } = useAdminTranslation()
  const [showConfirmDiscard, setShowConfirmDiscard] = useState(false)

  // Prevent accidental window close or reload when dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  if (!isDirty) return null

  return (
    <>
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+76px)] lg:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-3 animate-in slide-in-from-bottom-4 duration-200 select-none">
        <div className="bg-[#141519]/96 border border-amber-500/60 rounded-2xl p-2.5 sm:p-3.5 shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-2.5 text-xs font-mono shadow-amber-950/40 ring-1 ring-amber-400/30">
          <div className="flex items-center gap-2 text-amber-300 min-w-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="font-semibold truncate">
              {isRtl ? 'تعديلات غير محفوظة' : 'Unsaved Changes'}
            </span>
            <span className="text-neutral-400 text-[10px] hidden sm:inline">• (Ctrl+S)</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('warning')
                setShowConfirmDiscard(true)
              }}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="text-[11px]">{t.common.cancel}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHaptic('success')
                onSave()
              }}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-xl bg-gradient-to-r from-amber-200 via-white to-amber-100 hover:from-white hover:to-amber-50 text-neutral-950 font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-900" />
                  <span className="text-[11px]">{t.common.saving}</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{t.common.save}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal Before Discarding */}
      <AdminConfirmModal
        isOpen={showConfirmDiscard}
        title={isRtl ? 'تجاهل التعديلات غير المحفوظة؟' : 'Discard Unsaved Changes?'}
        message={
          isRtl
            ? 'هل أنت متأكد من رغبتك في إلغاء كافة التعديلات الأخيرة والعودة للنسخة الأصلية؟ لا يمكن التراجع عن هذا الإجراء.'
            : 'Are you sure you want to revert all pending modifications? Any unsaved edits will be permanently lost.'
        }
        confirmLabel={isRtl ? 'نعم، إلغاء التعديلات' : 'Yes, Discard'}
        cancelLabel={isRtl ? 'متابعة التعديل' : 'Keep Editing'}
        isDestructive={true}
        onConfirm={() => {
          setShowConfirmDiscard(false)
          onDiscard()
        }}
        onCancel={() => setShowConfirmDiscard(false)}
      />
    </>
  )
}

