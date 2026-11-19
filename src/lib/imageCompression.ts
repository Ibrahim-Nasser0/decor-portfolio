/**
 * High-performance client-side image compression utility for Eng. Alaa Essa Atelier.
 * Automatically downscales oversized photos and converts to high-fidelity WebP
 * before uploading to Supabase Storage, reducing upload times by up to 80%.
 */
export async function compressImage(
  file: File,
  maxWidth = 2560,
  maxHeight = 2560,
  quality = 0.85
): Promise<File> {
  // If not an image or is an animated SVG/GIF, return original
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file
  }

  // If already under 1MB WebP, skip re-encoding
  if (file.size < 1024 * 1024 && file.type === 'image/webp') {
    return file
  }

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = document.createElement('img')
      img.onload = () => {
        let width = img.width
        let height = img.height

        // Downscale bounds maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          } else {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          resolve(file)
          return
        }

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file)
              return
            }

            const cleanName = file.name.replace(/\.[^/.]+$/, '') + '.webp'
            const compressedFile = new File([blob], cleanName, {
              type: 'image/webp',
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          },
          'image/webp',
          quality
        )
      }
      img.onerror = () => resolve(file)
      img.src = e.target?.result as string
    }
    reader.onerror = () => resolve(file)
    reader.readAsDataURL(file)
  })
}
