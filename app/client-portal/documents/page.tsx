import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DocumentsClient } from "./documents-client"

export const metadata = {
  title: "My Documents | DCSA Client Portal",
  description: "Upload and manage your documents securely",
}

export default async function DocumentsPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/client-portal/auth/login")
  }

  // Fetch client's documents
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })

  return <DocumentsClient user={user} initialDocuments={documents || []} />
}
