'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  saveProject,
  deleteProject,
  getProjectById,
  updateDesignerProfile,
  createInquiry,
  saveAdminAccount,
  deleteAdminAccount,
  updateTop4Projects,
  saveProjectCategory,
  deleteProjectCategory,
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
    revalidatePath('/admin')
    revalidatePath('/admin/hero')
    revalidatePath('/admin/about')
    revalidatePath('/admin/skills')
    revalidatePath('/admin/experience')
    revalidatePath('/admin/profile')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update profile' }
  }
}

// 6. INQUIRY: SUBMIT INQUIRY FROM PUBLIC CONTACT FORM
export async function submitInquiryAction(formData: {
  name: string
  phone: string
  email?: string
  city?: string
  projectType?: string
  areaSize?: string
  budgetRange?: string
  message?: string
}) {
  try {
    await createInquiry({
      client_name: formData.name,
      phone_number: formData.phone,
      email: formData.email,
      service_type: formData.projectType || 'residential',
      area_size: formData.areaSize ? `${formData.city ? formData.city + ' • ' : ''}${formData.areaSize}` : (formData.city || 'Cairo'),
      budget_range: formData.budgetRange,
      message: formData.message || '',
    })
    return { success: true }
  } catch (err: any) {
    console.error('Failed to submit client inquiry:', err)
    return { success: false, error: err.message || 'Failed to submit inquiry' }
  }
}

// 8. ADMIN ACCOUNTS & ACCESS CREDENTIALS
export async function addAdminAccountAction(formData: {
  email: string
  password?: string
  role?: string
}) {
  try {
    const email = (formData.email || '').trim().toLowerCase()
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' }
    }

    const supabase = await createClient()

    // If password provided, register them in Supabase Auth
    if (formData.password) {
      if (formData.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' }
      }

      const { error: signUpErr } = await supabase.auth.signUp({
        email,
        password: formData.password,
        options: {
          data: { role: formData.role || 'Admin' },
        },
      })

      if (signUpErr && !signUpErr.message.toLowerCase().includes('already')) {
        return { success: false, error: signUpErr.message }
      }
    }

    const account = await saveAdminAccount({
      email,
      role: formData.role || 'Admin',
    })

    revalidatePath('/admin/settings')
    return { success: true, account }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to add admin account' }
  }
}

export async function deleteAdminAccountAction(idOrEmail: string) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user?.email && (idOrEmail.toLowerCase() === user.email.toLowerCase() || idOrEmail === user.id)) {
      return { success: false, error: 'Security restriction: You cannot delete your currently active session account.' }
    }

    await deleteAdminAccount(idOrEmail)
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete account' }
  }
}

export async function updatePasswordAction(formData: {
  newPassword: string
  confirmPassword: string
}) {
  try {
    if (!formData.newPassword || formData.newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' }
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return { success: false, error: 'Passwords do not match. Please verify and re-enter.' }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.updateUser({
      password: formData.newPassword,
    })

    if (error) {
      return { success: false, error: error.message || 'Failed to update password' }
    }

    return { success: true, message: 'Password updated successfully!' }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update password' }
  }
}

export async function updateTop4ProjectsAction(top4Ids: string[]) {
  try {
    await updateTop4Projects(top4Ids)
    revalidatePath('/admin')
    revalidatePath('/api/cv-pdf')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update flagship projects' }
  }
}

export async function saveProjectCategoryAction(category: { id: string; labelEn: string; labelAr: string }) {
  try {
    const updated = await saveProjectCategory(category)
    revalidatePath('/admin/projects')
    return { success: true, categories: updated }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save project category' }
  }
}

export async function deleteProjectCategoryAction(id: string) {
  try {
    const updated = await deleteProjectCategory(id)
    revalidatePath('/admin/projects')
    return { success: true, categories: updated }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete project category' }
  }
}
