import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import {
  Project,
  PROJECTS as STATIC_PROJECTS,
  DESIGNER_INFO as STATIC_DESIGNER_INFO,
} from '@/data/portfolioData'

// Public Supabase client for reads without cookie overhead (Singleton connection pool)
let _publicClient: ReturnType<typeof createSupabaseClient> | null = null

function getPublicClient() {
  if (_publicClient) return _publicClient
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://doagrgbkcmftsxzckimk.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable__gAlNoRbvX6VIjNvsfx_-A_ReBjh1Q7'
  if (!url || !key) return null
  _publicClient = createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
  return _publicClient
}

// -------------------------------------------------------------
// IN-MEMORY SERVER CACHE (Sub-millisecond reads across routes)
// -------------------------------------------------------------
interface CacheEntry<T> {
  data: T
  timestamp: number
}

const CACHE_TTL_MS = 60 * 1000 // 60 seconds TTL
const INQUIRIES_CACHE_TTL_MS = 15 * 1000 // 15 seconds TTL for CRM leads

let profileCache: CacheEntry<any> | null = null
let projectsCache: CacheEntry<Project[]> | null = null
const projectByIdCache = new Map<string, CacheEntry<Project | null>>()
let inquiriesCache: CacheEntry<ClientInquiry[]> | null = null

export function invalidateProfileCache() {
  profileCache = null
}

export function invalidateProjectsCache() {
  projectsCache = null
  projectByIdCache.clear()
}

export function invalidateInquiriesCache() {
  inquiriesCache = null
}

export function invalidateAllDataCache() {
  profileCache = null
  projectsCache = null
  projectByIdCache.clear()
  inquiriesCache = null
}

export interface ClientInquiry {
  id: string
  client_name: string
  phone_number: string
  email?: string
  service_type?: string
  area_size?: string
  budget_range?: string
  message?: string
  notes?: string
  status: 'new' | 'contacted' | 'quoted' | 'archived'
  created_at: string
}

// Map PostgreSQL snake_case row to TypeScript Project interface
export function rowToProject(row: any): Project {
  return {
    id: row.id,
    title: row.title || '',
    titleEn: row.title_en || '',
    category: row.category,
    categoryLabel: row.category_label || '',
    categoryLabelEn: row.category_label_en || '',
    coverImage: row.cover_image || '',
    gallery: row.gallery || [],
    beforeImage: row.before_image || undefined,
    location: row.location || '',
    locationEn: row.location_en || '',
    year: row.year || '',
    area: row.area || '',
    style: row.style || '',
    styleEn: row.style_en || '',
    description: row.description || '',
    descriptionEn: row.description_en || '',
    palette: row.palette || [],
    features: row.features || [],
    featuresEn: row.features_en || [],
    featured: Boolean(row.featured),
    conceptEn: row.concept_en || undefined,
    materialsDescriptionEn: row.materials_description_en || undefined,
    angles: row.angles || [],
    specs: row.specs || undefined,
    materialSwatches: row.material_swatches || [],
    challengeEn: row.challenge_en || undefined,
    solutionEn: row.solution_en || undefined,
  }
}

// Map TypeScript Project interface to PostgreSQL snake_case row
export function projectToRow(p: Project, displayOrder: number = 0) {
  return {
    id: p.id,
    title: p.title,
    title_en: p.titleEn,
    category: p.category,
    category_label: p.categoryLabel,
    category_label_en: p.categoryLabelEn,
    cover_image: p.coverImage,
    gallery: p.gallery,
    before_image: p.beforeImage || null,
    location: p.location,
    location_en: p.locationEn,
    year: p.year,
    area: p.area,
    style: p.style,
    style_en: p.styleEn,
    description: p.description,
    description_en: p.descriptionEn,
    concept_en: p.conceptEn || null,
    challenge_en: p.challengeEn || null,
    solution_en: p.solutionEn || null,
    materials_description_en: p.materialsDescriptionEn || null,
    palette: p.palette,
    features: p.features,
    features_en: p.featuresEn,
    featured: Boolean(p.featured),
    display_order: displayOrder,
    specs: p.specs || null,
    angles: p.angles || [],
    material_swatches: p.materialSwatches || [],
    updated_at: new Date().toISOString(),
  }
}

// 1. GET ALL PROJECTS (In-memory cached with 60s TTL + Supabase fallback to static)
export const getProjects = cache(async function getProjects(): Promise<Project[]> {
  const now = Date.now()
  if (projectsCache && now - projectsCache.timestamp < CACHE_TTL_MS) {
    return projectsCache.data
  }

  try {
    const supabase = getPublicClient()
    if (!supabase) return STATIC_PROJECTS

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (error || !data || (data as any[]).length === 0) {
      return STATIC_PROJECTS
    }

    const mapped = (data as any[]).map(rowToProject)
    projectsCache = { data: mapped, timestamp: now }
    return mapped
  } catch (err) {
    console.error('Error fetching projects from Supabase:', err)
    return projectsCache ? projectsCache.data : STATIC_PROJECTS
  }
})

// 2. GET SINGLE PROJECT BY ID (In-memory cached with 60s TTL)
export const getProjectById = cache(async function getProjectById(id: string): Promise<Project | null> {
  const now = Date.now()
  const cached = projectByIdCache.get(id)
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data
  }

  if (projectsCache && now - projectsCache.timestamp < CACHE_TTL_MS) {
    const found = projectsCache.data.find((p) => p.id === id) || null
    if (found) {
      projectByIdCache.set(id, { data: found, timestamp: now })
      return found
    }
  }

  try {
    const supabase = getPublicClient()
    if (!supabase) return STATIC_PROJECTS.find((p) => p.id === id) || null

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return STATIC_PROJECTS.find((p) => p.id === id) || null
    }

    const mapped = rowToProject(data as any)
    projectByIdCache.set(id, { data: mapped, timestamp: now })
    return mapped
  } catch (err) {
    console.error(`Error fetching project ${id}:`, err)
    return STATIC_PROJECTS.find((p) => p.id === id) || null
  }
})

// 3. UPSERT PROJECT
export async function saveProject(project: Project, displayOrder: number = 0) {
  const supabase = await createClient()
  const row = projectToRow(project, displayOrder)

  const { data, error } = await supabase
    .from('projects')
    .upsert(row, { onConflict: 'id' })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save project: ${error.message}`)
  }

  invalidateProjectsCache()
  return rowToProject(data as any)
}

// 4. DELETE PROJECT
export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`)
  }

  invalidateProjectsCache()
  return true
}

// 5. GET DESIGNER PROFILE (In-memory cached with 60s TTL)
export const getDesignerProfile = cache(async function getDesignerProfile() {
  const now = Date.now()
  if (profileCache && now - profileCache.timestamp < CACHE_TTL_MS) {
    return profileCache.data
  }

  try {
    const supabase = getPublicClient()
    if (!supabase) return STATIC_DESIGNER_INFO

    const { data, error } = await supabase
      .from('designer_profile')
      .select('*')
      .eq('id', 'main')
      .single()

    if (error || !data) {
      return STATIC_DESIGNER_INFO
    }

    const row = data as any
    const mapped = {
      nameAr: row.name_ar,
      nameEn: row.name_en,
      titleAr: row.title_ar,
      titleEn: row.title_en,
      subtitleAr: row.subtitle_ar,
      subtitleEn: row.subtitle_en,
      locationAr: row.location_ar,
      locationEn: row.location_en,
      email: row.email,
      phone: row.phone,
      whatsappNumber: row.whatsapp_number,
      linkedin: row.linkedin,
      instagram: row.instagram,
      aboutIntroAr: row.about_intro_ar,
      aboutIntroEn: row.about_intro_en,
      aboutExperienceAr: row.about_experience_ar,
      aboutExperienceEn: row.about_experience_en,
      statementAr: row.statement_ar,
      statementEn: row.statement_en,
      software: row.software || STATIC_DESIGNER_INFO.software,
      skills: row.skills || STATIC_DESIGNER_INFO.skills,
      experience: row.experience || STATIC_DESIGNER_INFO.experience,
      education: row.education || STATIC_DESIGNER_INFO.education,
    }

    profileCache = { data: mapped, timestamp: now }
    return mapped
  } catch (err) {
    console.error('Error fetching profile from Supabase:', err)
    return profileCache ? profileCache.data : STATIC_DESIGNER_INFO
  }
})

// 6. UPDATE DESIGNER PROFILE
export async function updateDesignerProfile(profile: any) {
  const supabase = await createClient()
  const row = {
    id: 'main',
    name_ar: profile.nameAr,
    name_en: profile.nameEn,
    title_ar: profile.titleAr,
    title_en: profile.titleEn,
    subtitle_ar: profile.subtitleAr,
    subtitle_en: profile.subtitleEn,
    location_ar: profile.locationAr,
    location_en: profile.locationEn,
    email: profile.email,
    phone: profile.phone,
    whatsapp_number: profile.whatsappNumber,
    linkedin: profile.linkedin,
    instagram: profile.instagram,
    about_intro_ar: profile.aboutIntroAr,
    about_intro_en: profile.aboutIntroEn,
    about_experience_ar: profile.aboutExperienceAr,
    about_experience_en: profile.aboutExperienceEn,
    statement_ar: profile.statementAr,
    statement_en: profile.statementEn,
    software: profile.software,
    skills: profile.skills,
    experience: profile.experience,
    education: profile.education,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('designer_profile')
    .upsert(row, { onConflict: 'id' })

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`)
  }

  invalidateProfileCache()
  return true
}

// 7. INQUIRIES (In-memory cached with 15s TTL)
export async function getClientInquiries(limit?: number): Promise<ClientInquiry[]> {
  const now = Date.now()
  if (inquiriesCache && now - inquiriesCache.timestamp < INQUIRIES_CACHE_TTL_MS) {
    return limit ? inquiriesCache.data.slice(0, limit) : inquiriesCache.data
  }

  try {
    const supabase = await createClient()
    let query = supabase
      .from('client_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    const { data, error } = await query

    if (error || !data) {
      return []
    }

    const inquiries = data as ClientInquiry[]
    inquiriesCache = { data: inquiries, timestamp: now }
    return limit ? inquiries.slice(0, limit) : inquiries
  } catch (err) {
    console.error('Error fetching inquiries:', err)
    return inquiriesCache ? (limit ? inquiriesCache.data.slice(0, limit) : inquiriesCache.data) : []
  }
}

export async function updateInquiryStatus(id: string, status: ClientInquiry['status']) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('client_inquiries')
    .update({ status })
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to update inquiry status: ${error.message}`)
  }

  invalidateInquiriesCache()
  return true
}

export async function updateInquiryNotes(id: string, notes: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('client_inquiries')
    .update({ notes })
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to update inquiry notes: ${error.message}`)
  }

  invalidateInquiriesCache()
  return true
}

export async function submitClientInquiry(inquiry: Omit<ClientInquiry, 'id' | 'status' | 'created_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('client_inquiries').insert([inquiry])

  if (error) {
    throw new Error(`Failed to submit inquiry: ${error.message}`)
  }

  invalidateInquiriesCache()
  return true
}
