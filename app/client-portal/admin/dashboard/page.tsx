import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "./admin-dashboard"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/client-portal/admin/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("clients")
    .select("role, full_name")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    redirect("/client-portal/auth/login")
  }

  // Fetch all applications and documents
  const { data: form16Applications } = await supabase
    .from("form16_applications")
    .select(`
      *,
      clients(full_name, email, phone)
    `)
    .order("created_at", { ascending: false })

  const { data: creditRepairApplications } = await supabase
    .from("credit_repair_applications")
    .select(`
      *,
      clients(full_name, email, phone)
    `)
    .order("created_at", { ascending: false })

  const { data: transferRequests } = await supabase
    .from("transfer_requests")
    .select(`
      *,
      clients(full_name, email, phone)
    `)
    .order("created_at", { ascending: false })

  const { data: documents } = await supabase
    .from("documents")
    .select(`
      *,
      clients(full_name, email)
    `)
    .order("created_at", { ascending: false })

  return (
    <AdminDashboard
      adminName={profile?.full_name || "Admin"}
      form16Applications={form16Applications || []}
      creditRepairApplications={creditRepairApplications || []}
      transferRequests={transferRequests || []}
      documents={documents || []}
    />
  )
}
