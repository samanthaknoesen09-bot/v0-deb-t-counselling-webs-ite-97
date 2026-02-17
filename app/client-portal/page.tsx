import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function ClientPortalRoot() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/client-portal/dashboard")
  } else {
    redirect("/client-portal/auth/login")
  }
}
