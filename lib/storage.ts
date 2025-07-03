import { supabase } from "./supabase"

export const uploadFile = async (file: File, bucket: string, path: string) => {
  if (!supabase) throw new Error("Supabase not configured")

  const fileExt = file.name.split(".").pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${path}/${fileName}`

  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) throw error

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath)

  return { data, publicUrl }
}

export const deleteFile = async (bucket: string, path: string) => {
  if (!supabase) throw new Error("Supabase not configured")

  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

export const getPublicUrl = (bucket: string, path: string) => {
  if (!supabase) return null

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path)
  return publicUrl
}

// Image compression utility
export const compressImage = (file: File, maxWidth = 800, quality = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    const img = new Image()

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob!], file.name, {
            type: file.type,
            lastModified: Date.now(),
          })
          resolve(compressedFile)
        },
        file.type,
        quality,
      )
    }

    img.src = URL.createObjectURL(file)
  })
}
