import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Form16Client } from "./form16-client"

export const metadata = {
  title: "Form 16 - Debt Review Application | DCSA Client Portal",
  description: "Complete your debt review application with power of attorney",
}

export default async function Form16Page() {
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

  return <Form16Client user={user} client={client} />
}
