'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  saveProject,
  deleteProject,
  getProjectById,
  updateDesignerProfile,
  updateInquiryStatus,
  updateInquiryNotes,
  ClientInquiry,
} from '@/lib/dataRepository'
import { Project } from '@/data/portfolioData'

// 1. AUTH: LOGIN
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please enter both email and password.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message || 'Invalid login credentials.' }
  }

  redirect('/admin')
}

// 2. AUTH: LOGOUT
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// 3. PROJECT: SAVE (CREATE OR UPDATE)
export async function saveProjectAction(project: Project, displayOrder: number = 0) {
  try {
    await saveProject(project, displayOrder)
    revalidatePath('/')
    revalidatePath(`/projects/${project.id}`)
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save project' }
  }
}

// 4. PROJECT: DELETE
export async function deleteProjectAction(id: string) {
  try {
    await deleteProject(id)
    revalidatePath('/')
    revalidatePath(`/projects/${id}`)
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete project' }
  }
}

// 4.1 PROJECT: DUPLICATE (1-CLICK CLONE)
export async function duplicateProjectAction(id: string) {
  try {
    const existing = await getProjectById(id)
    if (!existing) throw new Error('Project not found')

    const suffix = Date.now().toString().slice(-4)
    const clone: Project = {
      ...existing,
      id: `${existing.id}-copy-${suffix}`,
      titleEn: `${existing.titleEn} (Copy)`,
      title: `${existing.title} (نسخة)`,
      featured: false,
    }

    await saveProject(clone, 99)
    revalidatePath('/')
    revalidatePath(`/projects/${clone.id}`)
    revalidatePath('/admin/projects')
    return { success: true, project: clone }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to duplicate project' }
  }
}

// 5. PROFILE: UPDATE
export async function saveProfileAction(profileData: any) {
  try {
    await updateDesignerProfile(profileData)
    revalidatePath('/')
    revalidatePath('/admin/profile')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update profile' }
  }
}

// 6. INQUIRY: UPDATE STATUS & NOTES
export async function updateInquiryStatusAction(id: string, status: ClientInquiry['status']) {
  try {
    await updateInquiryStatus(id, status)
    revalidatePath('/admin/inquiries')
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update status' }
  }
}

export async function updateInquiryNotesAction(id: string, notes: string) {
  try {
    await updateInquiryNotes(id, notes)
    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update private notes' }
  }
}
