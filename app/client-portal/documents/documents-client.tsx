"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  FileText,
  Download,
  Trash2,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  FileCheck,
  Home,
} from "lucide-react"
import Link from "next/link"

interface DocumentsClientProps {
  user: any
  initialDocuments: any[]
}

const DOCUMENT_TYPES = [
  { value: "id", label: "ID Document", icon: CreditCard },
  { value: "payslip", label: "Payslip", icon: FileText },
  { value: "bank_statement", label: "Bank Statement", icon: FileCheck },
  { value: "marriage_certificate", label: "Marriage Certificate", icon: FileText },
  { value: "proof_of_residence", label: "Proof of Residence", icon: Home },
  { value: "other", label: "Other", icon: FileText },
]

export function DocumentsClient({ user, initialDocuments }: DocumentsClientProps) {
  const router = useRouter()
  const [documents, setDocuments] = useState(initialDocuments)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError("File size must be less than 10MB")
        return
      }
      setSelectedFile(file)
      setUploadError(null)
      setUploadSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !documentType) {
      setUploadError("Please select a file and document type")
      return
    }

    setUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("document_type", documentType)

      const response = await fetch("/api/client-portal/upload-document", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }



      // Add new document to the list
      setDocuments([data.document, ...documents])
      setSelectedFile(null)
      setDocumentType("")
      setUploadSuccess(true)

      // Reset file input
      const fileInput = document.getElementById("file-input") as HTMLInputElement
      if (fileInput) fileInput.value = ""

      // Refresh the page data
      router.refresh()
    } catch (error: any) {
      console.error("Upload error:", error)
      setUploadError(error.message || "Failed to upload document")
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async (documentId: string) => {
    try {
      const response = await fetch(`/api/client-portal/download-document?id=${documentId}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      window.open(data.url, "_blank")
    } catch (error: any) {
      alert(error.message || "Failed to download document")
    }
  }

  const handleDelete = async (documentId: string, storagePath: string) => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return
    }

    try {
      const supabase = createClient()

      // Delete from storage
      await supabase.storage.from("client-documents").remove([storagePath])

      // Delete from database
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentId)

      if (error) throw error

      // Remove from UI
      setDocuments(documents.filter((doc) => doc.id !== documentId))

      router.refresh()
    } catch (error) {
      console.error("Delete error:", error)
      alert("Failed to delete document")
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getDocumentTypeLabel = (type: string) => {
    return DOCUMENT_TYPES.find((t) => t.value === type)?.label || type
  }

  const getDocumentIcon = (type: string) => {
    const Icon = DOCUMENT_TYPES.find((t) => t.value === type)?.icon || FileText
    return Icon
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/client-portal/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <Link href="/" className="text-xl font-bold text-[#0D3B66]">
              DCSA
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0D3B66] mb-2">My Documents</h1>
          <p className="text-[#0D3B66]/70">
            Upload and manage your documents securely
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-[#4DB6AC]/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-[#0D3B66] flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Document
                </CardTitle>
                <CardDescription>
                  Accepted formats: PDF, JPG, PNG (max 10MB)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Document uploaded successfully!</p>
                  </div>
                )}

                {uploadError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{uploadError}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCUMENT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-input">Select File</Label>
                  <Input
                    id="file-input"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || !documentType || uploading}
                  className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Documents List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0D3B66]">
                  Uploaded Documents ({documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-[#0D3B66]/70 mb-2">No documents uploaded yet</p>
                    <p className="text-sm text-muted-foreground">
                      Upload your first document using the form on the left
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => {
                      const Icon = getDocumentIcon(doc.document_type)
                      return (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-5 w-5 text-[#4DB6AC]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-[#0D3B66] truncate">
                                {doc.file_name}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {getDocumentTypeLabel(doc.document_type)}
                                </Badge>
                                <span>•</span>
                                <span>{formatFileSize(doc.file_size)}</span>
                                <span>•</span>
                                <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(doc.id)}
                              className="bg-transparent"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(doc.id, doc.file_url)}
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
