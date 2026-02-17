import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const documentId = request.nextUrl.searchParams.get("id")

    if (!documentId) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 })
    }

    // Fetch the document record (RLS ensures user can only access their own)
    const { data: doc, error: dbError } = await supabase
      .from("documents")
      .select("file_url, file_name")
      .eq("id", documentId)
      .eq("client_id", user.id)
      .single()

    if (dbError || !doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Generate a signed URL (valid for 60 seconds)
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from("client-documents")
      .createSignedUrl(doc.file_url, 60)

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error("Signed URL error:", signedUrlError)
      return NextResponse.json({ error: "Failed to generate download link" }, { status: 500 })
    }

    return NextResponse.json({ url: signedUrlData.signedUrl })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Failed to generate download link" }, { status: 500 })
  }
}
