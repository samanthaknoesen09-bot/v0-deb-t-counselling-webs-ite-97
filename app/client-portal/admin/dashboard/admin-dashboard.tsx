"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  CreditCard, 
  RefreshCw, 
  Upload, 
  LogOut,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Download
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

type Props = {
  adminName: string
  form16Applications: any[]
  creditRepairApplications: any[]
  transferRequests: any[]
  documents: any[]
}

export function AdminDashboard({
  adminName,
  form16Applications,
  creditRepairApplications,
  transferRequests,
  documents,
}: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/client-portal/admin/login")
  }

  const totalApplications = 
    form16Applications.length + 
    creditRepairApplications.length + 
    transferRequests.length

  const pendingApplications = [
    ...form16Applications.filter(app => app.status === "pending"),
    ...creditRepairApplications.filter(app => app.status === "pending"),
    ...transferRequests.filter(app => app.status === "pending")
  ].length

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0D3B66]">DCSA Admin Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {adminName}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="gap-2 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="form16">Form 16 ({form16Applications.length})</TabsTrigger>
            <TabsTrigger value="credit">Credit Repair ({creditRepairApplications.length})</TabsTrigger>
            <TabsTrigger value="transfer">Transfers ({transferRequests.length})</TabsTrigger>
            <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalApplications}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                  <Clock className="h-4 w-4 text-[#FFD93D]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#FFD93D]">{pendingApplications}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents</CardTitle>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{documents.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Form 16</CardTitle>
                  <FileText className="h-4 w-4 text-[#4DB6AC]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{form16Applications.length}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest applications and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...form16Applications, ...creditRepairApplications, ...transferRequests]
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 10)
                    .map((app, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3">
                        <div className="flex-1">
                          <p className="font-medium">{app.clients?.full_name}</p>
                          <p className="text-sm text-muted-foreground">{app.clients?.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={app.status === "pending" ? "secondary" : "default"}>
                            {app.status || "pending"}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(app.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form 16 Tab */}
          <TabsContent value="form16" className="space-y-4">
            {form16Applications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{app.clients?.full_name}</CardTitle>
                      <CardDescription>
                        {app.clients?.email} • {app.clients?.phone}
                      </CardDescription>
                    </div>
                    <Badge>{app.status || "pending"}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Monthly Income:</span> R{app.monthly_income?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Total Debt:</span> R{app.total_debt?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Submitted:</span> {new Date(app.created_at).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">POA Signed:</span> {app.poa_signed ? "Yes" : "No"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Credit Repair Tab */}
          <TabsContent value="credit" className="space-y-4">
            {creditRepairApplications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{app.clients?.full_name}</CardTitle>
                      <CardDescription>
                        {app.clients?.email} • {app.clients?.phone}
                      </CardDescription>
                    </div>
                    <Badge>{app.status || "pending"}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <p><span className="font-medium">Credit Issues:</span> {app.credit_issues}</p>
                    <p className="mt-2"><span className="font-medium">Submitted:</span> {new Date(app.created_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Transfer Requests Tab */}
          <TabsContent value="transfer" className="space-y-4">
            {transferRequests.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{app.clients?.full_name}</CardTitle>
                      <CardDescription>
                        {app.clients?.email} • {app.clients?.phone}
                      </CardDescription>
                    </div>
                    <Badge>{app.status || "pending"}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <p><span className="font-medium">Current DC:</span> {app.current_dc_name}</p>
                    <p><span className="font-medium">Reason:</span> {app.transfer_reason}</p>
                    <p className="mt-2"><span className="font-medium">Submitted:</span> {new Date(app.created_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4DB6AC]/10 rounded flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#4DB6AC]" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.document_type.replace("_", " ")}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.clients?.full_name} • {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      View
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
