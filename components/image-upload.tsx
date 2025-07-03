"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, RotateCw, ZoomIn, ZoomOut } from "lucide-react"
import { uploadFile, compressImage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface ImageUploadProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (url: string) => void
  bucket: string
  path: string
  currentImage?: string
  aspectRatio?: "square" | "banner"
}

export function ImageUpload({
  isOpen,
  onClose,
  onUpload,
  bucket,
  path,
  currentImage,
  aspectRatio = "square",
}: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB for avatars, 10MB for banners)
    const maxSize = bucket === "avatars" ? 5 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `Please select an image smaller than ${maxSize / (1024 * 1024)}MB.`,
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      // Compress image before upload
      const compressedFile = await compressImage(selectedFile, aspectRatio === "banner" ? 1200 : 400)

      const { publicUrl } = await uploadFile(compressedFile, bucket, path)

      onUpload(publicUrl)
      toast({
        title: "Image uploaded successfully",
        description: "Your image has been updated.",
      })

      handleClose()
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setRotation(0)
    setZoom(1)
    onClose()
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload {aspectRatio === "banner" ? "Banner" : "Profile"} Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

          {!previewUrl ? (
            <div className="space-y-4">
              {currentImage && (
                <div
                  className={`relative ${aspectRatio === "banner" ? "aspect-[3/1]" : "aspect-square"} bg-muted rounded-lg overflow-hidden`}
                >
                  <Image src={currentImage || "/placeholder.svg"} alt="Current image" fill className="object-cover" />
                </div>
              )}

              <Button onClick={triggerFileInput} className="w-full liquid-button bg-transparent" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`relative ${aspectRatio === "banner" ? "aspect-[3/1]" : "aspect-square"} bg-muted rounded-lg overflow-hidden`}
              >
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                  style={{
                    transform: `rotate(${rotation}deg) scale(${zoom})`,
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>

              {/* Image editing controls */}
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setRotation(rotation + 90)}
                  className="liquid-button"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="liquid-button"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="liquid-button"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button onClick={triggerFileInput} variant="outline" className="flex-1 bg-transparent">
                  Choose Different
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="liquid-button gradient-bg text-white flex-1"
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
