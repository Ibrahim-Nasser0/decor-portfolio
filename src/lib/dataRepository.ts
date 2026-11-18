import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import {
  Project,
  PROJECTS as STATIC_PROJECTS,
  DESIGNER_INFO as STATIC_DESIGNER_INFO,
} from '@/data/portfolioData'

// Public Supabase client for reads without cookie overhead
function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  if (!url || !key) return null
  return createSupabaseClient(url, key)
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

// 1. GET ALL PROJECTS (Supabase with fallback to static, memoized per request)
export const getProjects = cache(async function getProjects(): Promise<Project[]> {
  try {
    const supabase = getPublicClient()
    if (!supabase) return STATIC_PROJECTS

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return STATIC_PROJECTS
    }

    return data.map(rowToProject)
  } catch (err) {
    console.error('Error fetching projects from Supabase:', err)
    return STATIC_PROJECTS
  }
})

// 2. GET SINGLE PROJECT BY ID (memoized per request)
export const getProjectById = cache(async function getProjectById(id: string): Promise<Project | null> {
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

    return rowToProject(data)
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

  return rowToProject(data)
}

// 4. DELETE PROJECT
export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`)
  }

  return true
}

// 5. GET DESIGNER PROFILE (memoized per request)
export const getDesignerProfile = cache(async function getDesignerProfile() {
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

    return {
      nameAr: data.name_ar,
      nameEn: data.name_en,
      titleAr: data.title_ar,
      titleEn: data.title_en,
      subtitleAr: data.subtitle_ar,
      subtitleEn: data.subtitle_en,
      locationAr: data.location_ar,
      locationEn: data.location_en,
      email: data.email,
      phone: data.phone,
      whatsappNumber: data.whatsapp_number,
      linkedin: data.linkedin,
      instagram: data.instagram,
      aboutIntroAr: data.about_intro_ar,
      aboutIntroEn: data.about_intro_en,
      aboutExperienceAr: data.about_experience_ar,
      aboutExperienceEn: data.about_experience_en,
      statementAr: data.statement_ar,
      statementEn: data.statement_en,
      software: data.software || STATIC_DESIGNER_INFO.software,
      skills: data.skills || STATIC_DESIGNER_INFO.skills,
      experience: data.experience || STATIC_DESIGNER_INFO.experience,
      education: data.education || STATIC_DESIGNER_INFO.education,
    }
  } catch (err) {
    console.error('Error fetching profile from Supabase:', err)
    return STATIC_DESIGNER_INFO
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

  return true
}

// 7. INQUIRIES
export async function getClientInquiries(limit?: number): Promise<ClientInquiry[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('client_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error || !data) {
      return []
    }

    return data as ClientInquiry[]
  } catch (err) {
    console.error('Error fetching inquiries:', err)
    return []
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

  return true
}

export async function submitClientInquiry(inquiry: Omit<ClientInquiry, 'id' | 'status' | 'created_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('client_inquiries').insert([inquiry])

  if (error) {
    throw new Error(`Failed to submit inquiry: ${error.message}`)
  }

  return true
}
