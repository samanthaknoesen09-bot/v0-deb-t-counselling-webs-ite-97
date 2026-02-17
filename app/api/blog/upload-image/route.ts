import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

// Simple auth check
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization")
  if (!authHeader) return false
  
  const encoded = authHeader.replace("Basic ", "")
  const decoded = Buffer.from(encoded, "base64").toString()
  const [username, password] = decoded.split(":")
  
  return username === "dcsam.admin" && password === "sam@august"
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Please upload an image." }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 })
    }

    const filename = `blog-images/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
    
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    })

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      filename: blob.pathname
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
