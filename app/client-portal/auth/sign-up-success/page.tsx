import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20 px-4 py-12">
      <Card className="w-full max-w-md border-2 border-[#4DB6AC]/20">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-[#4DB6AC]/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-[#4DB6AC]" />
          </div>
          <CardTitle className="text-2xl text-[#0D3B66]">Check Your Email</CardTitle>
          <CardDescription>
            We've sent you a confirmation email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#0D3B66]/80">
              <Mail className="h-5 w-5 text-[#4DB6AC]" />
              <p className="text-sm">
                Please check your inbox and click the confirmation link to activate your account.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Don't forget to check your spam folder if you don't see it.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <p className="text-sm text-[#0D3B66]/70">
              After confirming your email, you can log in to access your client portal.
            </p>
            <Button
              className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
              asChild
            >
              <Link href="/client-portal/auth/login">
                Go to Login
              </Link>
            </Button>
          </div>

          <div className="pt-4">
            <Link href="/" className="text-sm text-[#0D3B66]/70 hover:text-[#0D3B66] underline">
              Return to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
