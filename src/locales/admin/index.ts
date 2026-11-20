import { AdminLocale } from './type'
import { enLocale } from './en'
import { arLocale } from './ar'

export type AdminLanguage = 'ar' | 'en'

export const adminLocales: Record<AdminLanguage, AdminLocale> = {
  ar: arLocale,
  en: enLocale,
}

export function getAdminLocale(lang: AdminLanguage): AdminLocale {
  return adminLocales[lang] || adminLocales.ar
}

export * from './type'
export { enLocale, arLocale }
