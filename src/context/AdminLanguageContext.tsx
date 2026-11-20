'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AdminLanguage, AdminLocale, getAdminLocale, arLocale } from '@/locales/admin'

interface AdminLanguageContextType {
  lang: AdminLanguage
  setLang: (lang: AdminLanguage) => void
  toggleLang: () => void
  t: AdminLocale
  dir: 'rtl' | 'ltr'
  isRtl: boolean
}

const AdminLanguageContext = createContext<AdminLanguageContextType>({
  lang: 'ar',
  setLang: () => {},
  toggleLang: () => {},
  t: arLocale,
  dir: 'rtl',
  isRtl: true,
})

export function AdminLanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AdminLanguage>('ar')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('admin_locale') as AdminLanguage | null
      if (saved === 'ar' || saved === 'en') {
        setLangState(saved)
        document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = saved
      } else {
        document.documentElement.dir = 'rtl'
        document.documentElement.lang = 'ar'
      }
    } catch {
      // localStorage may fail in private mode
    }
    setMounted(true)
  }, [])

  const setLang = (newLang: AdminLanguage) => {
    setLangState(newLang)
    try {
      localStorage.setItem('admin_locale', newLang)
    } catch {
      // ignore
    }
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  const toggleLang = () => {
    const nextLang: AdminLanguage = lang === 'ar' ? 'en' : 'ar'
    setLang(nextLang)
  }

  const isRtl = lang === 'ar'
  const dir: 'rtl' | 'ltr' = isRtl ? 'rtl' : 'ltr'
  const t = getAdminLocale(lang)

  return (
    <AdminLanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        dir,
        isRtl,
      }}
    >
      <div dir={dir} className="w-full min-h-screen">
        {children}
      </div>
    </AdminLanguageContext.Provider>
  )
}

export function useAdminTranslation() {
  const context = useContext(AdminLanguageContext)
  if (!context) {
    throw new Error('useAdminTranslation must be used within an AdminLanguageProvider')
  }
  return context
}
