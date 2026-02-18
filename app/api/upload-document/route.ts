import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No file provided", code: "NO_FILE" },
        { status: 400 }
      )
    }

    // Client-side validation should catch this, but enforce server-side
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { 
          error: "File too large. Maximum allowed size is 50MB.",
          code: "FILE_TOO_LARGE",
          maxSize: MAX_FILE_SIZE,
          fileSize: file.size
        },
        { status: 413 }
      )
    }

    // Validate file type (allow common document formats)
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

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          error: "Invalid file type. Please upload a document (PDF, DOC, XLS, image, etc.)",
          code: "INVALID_FILE_TYPE"
        },
        { status: 400 }
      )
    }

    const filename = `client-documents/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
    
    const blob = await put(filename, file, {
      access: "private",
      contentType: file.type,
    })

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      filename: blob.pathname,
      size: file.size
    })
  } catch (error) {
    console.error("Error uploading document:", error)
    
    // Handle specific Vercel Blob errors
    if (error instanceof Error) {
      if (error.message.includes("413") || error.message.includes("Payload Too Large")) {
        return NextResponse.json(
          { 
            error: "File too large. Maximum allowed size is 50MB.",
            code: "FILE_TOO_LARGE"
          },
          { status: 413 }
        )
      }
    }

    return NextResponse.json(
      { error: "Failed to upload document", code: "UPLOAD_FAILED" },
      { status: 500 }
    )
  }
}
