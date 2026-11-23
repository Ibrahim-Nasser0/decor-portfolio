import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import {
  Project,
  PROJECTS as STATIC_PROJECTS,
  DESIGNER_INFO as STATIC_DESIGNER_INFO,
  ProjectCategory,
  DEFAULT_PROJECT_CATEGORIES,
  AdminAccount,
} from '@/data/portfolioData'

export type { ProjectCategory, AdminAccount }
export { DEFAULT_PROJECT_CATEGORIES }

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
  const specs = (typeof row.specs === 'object' && row.specs !== null) ? row.specs : {}
  return {
    id: row.id,
    title: row.title || '',
    titleEn: row.title_en || '',
    category: row.category || 'living',
    categoryLabel: row.category_label || '',
    categoryLabelEn: row.category_label_en || '',
    firmEn: row.firm_en || specs.firmEn || specs.firm || undefined,
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
    includeInCv: (specs && specs.includeInCv !== undefined) ? Boolean(specs.includeInCv) : (row.include_in_cv !== undefined ? Boolean(row.include_in_cv) : true),
    conceptEn: row.concept_en || undefined,
    materialsDescriptionEn: row.materials_description_en || undefined,
    angles: row.angles || [],
    specs: specs,
    materialSwatches: row.material_swatches || [],
    challengeEn: row.challenge_en || undefined,
    solutionEn: row.solution_en || undefined,
  }
}

// Map TypeScript Project interface to PostgreSQL snake_case row
export function projectToRow(p: Project, displayOrder: number = 0) {
  const rawSpecs = (typeof p.specs === 'object' && p.specs !== null) ? p.specs : {}
  const mergedSpecs = {
    ...rawSpecs,
    firmEn: p.firmEn || rawSpecs.firmEn || undefined,
    includeInCv: p.includeInCv !== undefined ? Boolean(p.includeInCv) : (rawSpecs.includeInCv !== undefined ? Boolean(rawSpecs.includeInCv) : true),
  }

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
    specs: mergedSpecs,
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

// 4.1 UPDATE TOP 4 FLAGSHIP PROJECTS (CV / SHOWCASE)
export async function updateTop4Projects(top4Ids: string[]) {
  const all = await getProjects()
  const promises = all.map(async (p) => {
    const isSelected = top4Ids.includes(p.id)
    const slotIndex = top4Ids.indexOf(p.id)
    const currentSpecs = (typeof p.specs === 'object' && p.specs) ? p.specs : {}
    if (p.includeInCv !== isSelected || (isSelected && (currentSpecs as any).cvOrder !== slotIndex)) {
      return saveProject({
        ...p,
        includeInCv: isSelected,
        specs: {
          ...currentSpecs,
          cvOrder: isSelected ? slotIndex : 99,
          includeInCv: isSelected,
        },
      })
    }
    return p
  })
  await Promise.all(promises)
  invalidateProjectsCache()
  return true
}

// 4.2 PROJECT CATEGORIES DATA ACCESS & RESILIENT FALLBACK
let categoriesCache: ProjectCategory[] | null = null

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  if (categoriesCache) return categoriesCache
  try {
    const supabase = getPublicClient()
    if (!supabase) return DEFAULT_PROJECT_CATEGORIES
    const { data, error } = await supabase
      .from('project_categories')
      .select('*')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      categoriesCache = DEFAULT_PROJECT_CATEGORIES
      return DEFAULT_PROJECT_CATEGORIES
    }

    const mapped = data.map((row: any) => ({
      id: row.slug || String(row.id),
      labelEn: row.name || row.slug,
      labelAr: row.description || row.name || row.slug,
    }))
    categoriesCache = mapped
    return mapped
  } catch {
    return DEFAULT_PROJECT_CATEGORIES
  }
}

export async function saveProjectCategory(category: ProjectCategory): Promise<ProjectCategory[]> {
  const current = await getProjectCategories()
  const existingIdx = current.findIndex((c) => c.id === category.id)
  let updated: ProjectCategory[]
  if (existingIdx !== -1) {
    updated = current.map((c, i) => (i === existingIdx ? category : c))
  } else {
    updated = [...current, category]
  }

  try {
    const supabase = await createClient()
    await supabase.from('project_categories').upsert(
      {
        slug: category.id,
        name: category.labelEn,
        description: category.labelAr,
      },
      { onConflict: 'slug' }
    )
  } catch (err) {
    console.warn('Fallback to local categories storage:', err)
  }

  categoriesCache = updated
  return updated
}

export async function deleteProjectCategory(id: string): Promise<ProjectCategory[]> {
  const current = await getProjectCategories()
  const updated = current.filter((c) => c.id !== id)

  try {
    const supabase = await createClient()
    await supabase.from('project_categories').delete().eq('slug', id)
  } catch (err) {
    console.warn('Fallback to local categories storage:', err)
  }

  categoriesCache = updated
  return updated
}

// 4.3 ARCHITECTURAL STATS CALCULATION HELPERS
export { calculateYearsOfExperience, calculateBuiltWorks } from './metrics'

// 5. GET DESIGNER PROFILE (In-memory cached with 60s TTL)
export const getDesignerProfile = cache(async function getDesignerProfile() {
  const now = Date.now()
  if (profileCache && now - profileCache.timestamp < CACHE_TTL_MS) {
    return profileCache.data
  }

  try {
    const supabase = getPublicClient()
    if (!supabase) return STATIC_DESIGNER_INFO

    // 5.1 Check if new normalized basic_info table exists & has data
    try {
      const { data: basicRow, error: basicErr } = await supabase
        .from('basic_info')
        .select('*, contact:contact_id(*, links:links_id(*))')
        .order('id', { ascending: true })
        .limit(1)
        .maybeSingle()

      if (!basicErr && basicRow) {
        const bRow = basicRow as any
        const [expRes, eduRes, softRes] = await Promise.all([
          supabase.from('experience').select('*').order('display_order', { ascending: true }),
          supabase.from('education').select('*').order('display_order', { ascending: true }),
          supabase.from('software_skills').select('*').order('display_order', { ascending: true }),
        ])

        const bContact = bRow.contact || {}
        const bLinks = bContact.links || {}

        const mapped = {
          nameAr: bRow.name_ar || STATIC_DESIGNER_INFO.nameAr,
          nameEn: bRow.name_en || STATIC_DESIGNER_INFO.nameEn,
          titleAr: bRow.title_ar || STATIC_DESIGNER_INFO.titleAr,
          titleEn: bRow.title_en || STATIC_DESIGNER_INFO.titleEn,
          subtitleAr: bRow.subtitle_ar || STATIC_DESIGNER_INFO.subtitleAr,
          subtitleEn: bRow.subtitle_en || STATIC_DESIGNER_INFO.subtitleEn,
          locationAr: bRow.location_ar || STATIC_DESIGNER_INFO.locationAr,
          locationEn: bRow.location_en || STATIC_DESIGNER_INFO.locationEn,
          email: bContact.email || STATIC_DESIGNER_INFO.email,
          phone: bContact.phone_number || STATIC_DESIGNER_INFO.phone,
          whatsappNumber: bContact.whatsapp_number || STATIC_DESIGNER_INFO.whatsappNumber,
          linkedin: bLinks.linkedin || STATIC_DESIGNER_INFO.linkedin,
          instagram: bLinks.instagram || STATIC_DESIGNER_INFO.instagram,
          behance: bLinks.behance || 'https://behance.net/alaaessa',
          pinterest: bLinks.pinterest || 'https://pinterest.com/alaaessa',
          website: bLinks.website || 'https://alaa-essa.vercel.app/',
          heroImageUrl: bRow.hero_image_url || '/images/alaa.webp',
          aboutImageUrl: bRow.about_image_url || '/images/alaa2.webp',
          avatarUrl: bRow.hero_image_url || '/images/alaa.webp',
          aboutIntroAr: bRow.about_intro_ar || STATIC_DESIGNER_INFO.aboutIntroAr,
          aboutIntroEn: bRow.about_intro_en || STATIC_DESIGNER_INFO.aboutIntroEn,
          aboutExperienceAr: bRow.about_experience_ar || STATIC_DESIGNER_INFO.aboutExperienceAr,
          aboutExperienceEn: bRow.about_experience_en || STATIC_DESIGNER_INFO.aboutExperienceEn,
          statementAr: bRow.statement_ar || STATIC_DESIGNER_INFO.statementAr,
          statementEn: bRow.statement_en || STATIC_DESIGNER_INFO.statementEn,
          builtWorksOffset: bRow.built_works_offset !== undefined ? Number(bRow.built_works_offset) : 80,
          cadFidelity: bRow.cad_fidelity !== undefined ? Number(bRow.cad_fidelity) : 100,
          experience: expRes.data && expRes.data.length > 0
            ? expRes.data.map((e: any) => ({
                role: e.job_title,
                company: e.organization,
                location: e.location,
                period: e.period,
                description: e.description,
                skills: e.skills || [],
              }))
            : STATIC_DESIGNER_INFO.experience,
          education: eduRes.data && eduRes.data.length > 0
            ? eduRes.data.map((ed: any) => ({
                degree: ed.degree,
                titleEn: ed.degree,
                institutionEn: ed.institution,
                year: ed.year,
                grade: ed.grade,
                descEn: ed.description,
              }))
            : STATIC_DESIGNER_INFO.education,
          software: softRes.data && softRes.data.length > 0
            ? softRes.data.map((s: any) => ({
                name: s.name,
                role: s.role,
                badge: s.badge,
                color: s.color,
                engine: s.engine || 'Autodesk',
                deliverable: s.deliverable || s.role || 'High-Fidelity Production Deliverable',
                category: s.category || '3D & Modeling',
              }))
            : STATIC_DESIGNER_INFO.software,
        }

        profileCache = { data: mapped, timestamp: now }
        return mapped
      }
    } catch {
      // Proceed to designer_profile fallback
    }

    // 5.2 Legacy designer_profile table fallback
    const { data, error } = await supabase
      .from('designer_profile')
      .select('*')
      .eq('id', 'main')
      .single()

    if (error || !data) {
      return STATIC_DESIGNER_INFO
    }

    const row = data as any
    const skillsObj = (typeof row.skills === 'object' && row.skills !== null) ? row.skills : {}
    const mapped = {
      nameAr: row.name_ar,
      nameEn: row.name_en || STATIC_DESIGNER_INFO.nameEn,
      titleAr: row.title_ar,
      titleEn: row.title_en || STATIC_DESIGNER_INFO.titleEn,
      subtitleAr: row.subtitle_ar,
      subtitleEn: row.subtitle_en || STATIC_DESIGNER_INFO.subtitleEn,
      locationAr: row.location_ar,
      locationEn: row.location_en || STATIC_DESIGNER_INFO.locationEn,
      email: row.email || STATIC_DESIGNER_INFO.email,
      phone: row.phone || STATIC_DESIGNER_INFO.phone,
      whatsappNumber: row.whatsapp_number || STATIC_DESIGNER_INFO.whatsappNumber,
      linkedin: row.linkedin || STATIC_DESIGNER_INFO.linkedin,
      instagram: row.instagram || STATIC_DESIGNER_INFO.instagram,
      aboutIntroAr: row.about_intro_ar,
      aboutIntroEn: row.about_intro_en || STATIC_DESIGNER_INFO.aboutIntroEn,
      aboutExperienceAr: row.about_experience_ar,
      aboutExperienceEn: row.about_experience_en || STATIC_DESIGNER_INFO.aboutExperienceEn,
      statementAr: row.statement_ar,
      statementEn: row.statement_en || STATIC_DESIGNER_INFO.statementEn,
      software: row.software || STATIC_DESIGNER_INFO.software,
      skills: row.skills || STATIC_DESIGNER_INFO.skills,
      experience: row.experience || STATIC_DESIGNER_INFO.experience,
      education: row.education || STATIC_DESIGNER_INFO.education,
      builtWorksOffset: skillsObj.builtWorksOffset !== undefined ? Number(skillsObj.builtWorksOffset) : 80,
      cadFidelity: skillsObj.cadFidelity !== undefined ? Number(skillsObj.cadFidelity) : 100,
      avatarUrl: skillsObj.avatarUrl || row.hero_image_url || '/images/alaa.webp',
      heroImageUrl: row.hero_image_url || skillsObj.heroImageUrl || skillsObj.avatarUrl || '/images/alaa.webp',
      aboutImageUrl: row.about_image_url || skillsObj.aboutImageUrl || '/images/alaa2.webp',
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
  const rawSkills = (typeof profile.skills === 'object' && profile.skills !== null) ? profile.skills : {}
  const heroImageUrl = profile.heroImageUrl || profile.avatarUrl || rawSkills.heroImageUrl || rawSkills.avatarUrl || '/images/alaa.webp'
  const aboutImageUrl = profile.aboutImageUrl || rawSkills.aboutImageUrl || '/images/alaa2.webp'

  const skillsWithMeta = {
    ...rawSkills,
    builtWorksOffset: profile.builtWorksOffset !== undefined ? Number(profile.builtWorksOffset) : (rawSkills.builtWorksOffset ?? 80),
    cadFidelity: profile.cadFidelity !== undefined ? Number(profile.cadFidelity) : (rawSkills.cadFidelity ?? 100),
    avatarUrl: heroImageUrl,
    heroImageUrl,
    aboutImageUrl,
  }

  // 6.1 Try updating normalized tables (basic_info, contact, links)
  try {
    await Promise.all([
      supabase.from('basic_info').update({
        name_ar: profile.nameAr || 'م. آلاء عيسى',
        name_en: profile.nameEn || 'Alaa Essa',
        title_ar: profile.titleAr || 'مهندسة تصميم داخلي وديكور معماري',
        title_en: profile.titleEn || 'Interior Architecture & Spatial Design',
        subtitle_ar: profile.subtitleAr,
        subtitle_en: profile.subtitleEn,
        location_ar: profile.locationAr,
        location_en: profile.locationEn,
        hero_image_url: heroImageUrl,
        about_image_url: aboutImageUrl,
        about_intro_ar: profile.aboutIntroAr,
        about_intro_en: profile.aboutIntroEn,
        about_experience_ar: profile.aboutExperienceAr,
        about_experience_en: profile.aboutExperienceEn,
        statement_ar: profile.statementAr,
        statement_en: profile.statementEn,
        built_works_offset: skillsWithMeta.builtWorksOffset,
        cad_fidelity: skillsWithMeta.cadFidelity,
        updated_at: new Date().toISOString(),
      }).eq('id', 1),

      supabase.from('contact').update({
        email: profile.email || 'alaaesssaa@gmail.com',
        phone_number: profile.phone || '+20 1032494616',
        whatsapp_number: profile.whatsappNumber || '201032494616',
        updated_at: new Date().toISOString(),
      }).eq('id', 1),

      supabase.from('links').update({
        linkedin: profile.linkedin || 'Alaa Essa',
        instagram: profile.instagram || '@alaaissa.interiors',
        behance: profile.behance || 'https://behance.net/alaaessa',
        website: profile.website || 'https://alaa-essa.vercel.app/',
        updated_at: new Date().toISOString(),
      }).eq('id', 1),
    ])
  } catch {
    // Non-blocking if normalized tables not yet created
  }

  // 6.2 Update designer_profile table
  const row: Record<string, any> = {
    id: 'main',
    name_ar: profile.nameAr || profile.nameEn || 'م. آلاء عيسى',
    name_en: profile.nameEn || 'Alaa Essa',
    title_ar: profile.titleAr || profile.titleEn || 'مهندسة تصميم داخلي وديكور معماري',
    title_en: profile.titleEn || 'Interior Architecture & Spatial Design',
    subtitle_ar: profile.subtitleAr || profile.subtitleEn || 'أعمال مختارة | 2026-2027',
    subtitle_en: profile.subtitleEn || 'Selected Works | 2026-2027',
    location_ar: profile.locationAr || profile.locationEn || 'الإسكندرية | مصر',
    location_en: profile.locationEn || 'Alexandria, Egypt',
    email: profile.email || 'alaaesssaa@gmail.com',
    phone: profile.phone || '+20 1032494616',
    whatsapp_number: profile.whatsappNumber || '201032494616',
    linkedin: profile.linkedin || 'Alaa Essa',
    instagram: profile.instagram || '@alaaissa.interiors',
    about_intro_ar: profile.aboutIntroAr || profile.aboutIntroEn || '',
    about_intro_en: profile.aboutIntroEn || '',
    about_experience_ar: profile.aboutExperienceAr || profile.aboutExperienceEn || '',
    about_experience_en: profile.aboutExperienceEn || '',
    statement_ar: profile.statementAr || profile.statementEn || '',
    statement_en: profile.statementEn || '',
    software: profile.software || STATIC_DESIGNER_INFO.software,
    skills: skillsWithMeta,
    experience: profile.experience || STATIC_DESIGNER_INFO.experience,
    education: profile.education || STATIC_DESIGNER_INFO.education,
    updated_at: new Date().toISOString(),
  }

  const rowWithColumns = {
    ...row,
    hero_image_url: heroImageUrl,
    about_image_url: aboutImageUrl,
  }

  const { error } = await supabase
    .from('designer_profile')
    .upsert(rowWithColumns, { onConflict: 'id' })

  if (error) {
    const { error: fallbackError } = await supabase
      .from('designer_profile')
      .upsert(row, { onConflict: 'id' })

    if (fallbackError) {
      throw new Error(`Failed to update profile: ${fallbackError.message}`)
    }
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

export async function deleteClientInquiry(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('client_inquiries').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete client inquiry: ${error.message}`)
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

export const createInquiry = submitClientInquiry

// -------------------------------------------------------------
// ADMIN ACCOUNTS REPOSITORY
// -------------------------------------------------------------
let adminAccountsCache: CacheEntry<AdminAccount[]> | null = null

export function invalidateAdminAccountsCache() {
  adminAccountsCache = null
}

export async function getAdminAccounts(): Promise<AdminAccount[]> {
  const now = Date.now()
  if (adminAccountsCache && now - adminAccountsCache.timestamp < CACHE_TTL_MS) {
    return adminAccountsCache.data
  }

  const defaultAccounts: AdminAccount[] = [
    {
      id: 'default-owner',
      email: 'alaa.issa.design@gmail.com',
      role: 'Owner / Principal Architect',
      created_at: '2026-01-01T00:00:00Z',
    },
  ]

  const supabase = getPublicClient()
  if (!supabase) return defaultAccounts

  try {
    const { data, error } = await supabase
      .from('admin_accounts')
      .select('*')
      .order('created_at', { ascending: true })

    if (error || !data || data.length === 0) {
      return defaultAccounts
    }

    const accounts: AdminAccount[] = data.map((row: any) => ({
      id: row.id,
      email: row.email,
      role: row.role || 'Admin',
      created_at: row.created_at || new Date().toISOString(),
    }))

    adminAccountsCache = { data: accounts, timestamp: now }
    return accounts
  } catch {
    return defaultAccounts
  }
}

export async function saveAdminAccount(account: { email: string; role?: string }): Promise<AdminAccount> {
  invalidateAdminAccountsCache()
  const supabase = await createClient()

  const payload = {
    email: account.email.trim().toLowerCase(),
    role: account.role || 'Admin',
    created_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('admin_accounts')
    .insert([payload])
    .select()
    .single()

  if (error) {
    return {
      id: `local-${Date.now()}`,
      email: payload.email,
      role: payload.role,
      created_at: payload.created_at,
    }
  }

  return {
    id: data.id,
    email: data.email,
    role: data.role,
    created_at: data.created_at,
  }
}

export async function deleteAdminAccount(idOrEmail: string): Promise<boolean> {
  invalidateAdminAccountsCache()
  const supabase = await createClient()

  const { error } = await supabase
    .from('admin_accounts')
    .delete()
    .or(`id.eq.${idOrEmail},email.eq.${idOrEmail}`)

  if (error) {
    console.warn('Note on deleting admin account:', error.message)
  }
  return true
}
