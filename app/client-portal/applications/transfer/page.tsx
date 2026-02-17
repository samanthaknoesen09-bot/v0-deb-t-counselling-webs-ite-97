import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { TransferClient } from "./transfer-client"

export const metadata = {
  title: "Transfer Request | DCSA Client Portal",
  description: "Transfer your debt review from another counsellor to DCSA",
}

export default async function TransferPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/client-portal/auth/login")
  }

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", user.id)
    .single()

  return <TransferClient user={user} client={client} />
}
