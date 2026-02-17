import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CreditRepairClient } from "./credit-repair-client"

export const metadata = {
  title: "Credit Repair Application | DCSA Client Portal",
  description: "Apply for credit repair services to improve your credit score",
}

export default async function CreditRepairPage() {
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

  return <CreditRepairClient user={user} client={client} />
}
