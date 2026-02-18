"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const MAX_FILE_SIZE_DISPLAY = "50MB"

interface DocumentUploadProps {
  onUploadSuccess?: (url: string, filename: string) => void
  onUploadError?: (error: string) => void
}

export function DocumentUpload({ onUploadSuccess, onUploadError }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const { toast } = useToast()

  const validateFile = (selectedFile: File): string | null => {
    // Check file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      return `File too large. Maximum allowed size is ${MAX_FILE_SIZE_DISPLAY}.`
    }

    // Check file type
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "application/zip",
    ]

    if (!validTypes.includes(selectedFile.type)) {
      return "Invalid file type. Please upload a document (PDF, DOC, XLS, image, ZIP, etc.)"
    }

    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setUploadError(null)
    setUploadSuccess(null)

    if (!selectedFile) {
      setFile(null)
      return
    }

    // Validate file
    const error = validateFile(selectedFile)
    if (error) {
      setUploadError(error)
      setFile(null)
      e.target.value = "" // Reset input
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-document", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || "Failed to upload document"
        setUploadError(errorMessage)
        onUploadError?.(errorMessage)
        
        // Show toast notification
        toast({
          title: "Upload Failed",
          description: errorMessage,
          variant: "destructive",
        })
        return
      }

      setUploadSuccess(`Successfully uploaded: ${file.name}`)
      onUploadSuccess?.(data.url, data.filename)

      // Show success toast
      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded.`,
      })

      // Reset form
      setFile(null)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during upload"
      setUploadError(errorMessage)
      onUploadError?.(errorMessage)
      
      // Show error toast
      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="document-upload">Upload Document</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="document-upload"
            type="file"
            onChange={handleFileChange}
            disabled={isUploading}
            className="cursor-pointer"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.txt,.zip"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Maximum file size: {MAX_FILE_SIZE_DISPLAY}. Supported formats: PDF, DOC, DOCX, XLS, XLSX, images, ZIP
        </p>
      </div>

      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      {uploadSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{uploadSuccess}</AlertDescription>
        </Alert>
      )}

      {file && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium text-foreground mb-2">
            Selected: {file.name}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Size: {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
