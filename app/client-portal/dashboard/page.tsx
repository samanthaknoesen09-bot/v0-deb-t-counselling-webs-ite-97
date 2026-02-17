import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientDashboard } from "./client-dashboard"

export const metadata = {
  title: "Dashboard | DCSA Client Portal",
  description: "Access your documents, applications, and account information",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/client-portal/auth/login")
  }

  // Fetch client profile
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", user.id)
    .single()

  // Fetch documents count
  const { count: documentsCount } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: true })
    .eq("client_id", user.id)

  // Fetch applications
  const { data: form16Applications } = await supabase
    .from("form16_applications")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: creditRepairApplications } = await supabase
    .from("credit_repair_applications")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: transferRequests } = await supabase
    .from("transfer_requests")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <ClientDashboard
      user={user}
      client={client}
      documentsCount={documentsCount || 0}
      form16Applications={form16Applications || []}
      creditRepairApplications={creditRepairApplications || []}
      transferRequests={transferRequests || []}
    />
  )
}
