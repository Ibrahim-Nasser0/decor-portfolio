import { createClient } from '@/lib/supabase/client'

/**
 * Extracts the bucket and object path from a Supabase public storage URL
 * and deletes the file from Supabase Storage automatically.
 * Safe to call with any URL (external URLs or local static assets are ignored).
 */
export async function deleteStorageFile(url?: string | null): Promise<boolean> {
  if (!url || typeof url !== 'string') return false
  if (!url.includes('/storage/v1/object/public/')) return false

  try {
    const supabase = createClient()
    const pathPart = url.split('/storage/v1/object/public/')[1]
    if (!pathPart) return false

    // Clean any trailing query parameters (e.g. ?t=123)
    const cleanPath = pathPart.split('?')[0]
    const firstSlash = cleanPath.indexOf('/')
    if (firstSlash === -1) return false

    const bucket = cleanPath.slice(0, firstSlash)
    const filePath = cleanPath.slice(firstSlash + 1)

    const { error } = await supabase.storage.from(bucket).remove([filePath])
    if (error) {
      console.warn(`[storageUtils] Could not delete ${filePath} from ${bucket}:`, error.message)
      return false
    }
    return true
  } catch (err) {
    console.warn('[storageUtils] Error during file deletion:', err)
    return false
  }
}
