"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, FileText, AlertCircle } from "lucide-react"

type ApplicationStatus = "submitted" | "under_review" | "approved" | "rejected" | "completed"

interface ApplicationProgressProps {
  status: ApplicationStatus
  submittedDate: string
  reviewedDate?: string
  approvedDate?: string
  notes?: string
}

export function ApplicationProgress({
  status,
  submittedDate,
  reviewedDate,
  approvedDate,
  notes,
}: ApplicationProgressProps) {
  const steps = [
    {
      label: "Submitted",
      status: "submitted",
      icon: FileText,
      date: submittedDate,
      completed: true,
    },
    {
      label: "Under Review",
      status: "under_review",
      icon: Clock,
      date: reviewedDate,
      completed: status !== "submitted",
    },
    {
      label: status === "rejected" ? "Rejected" : "Approved",
      status: status === "rejected" ? "rejected" : "approved",
      icon: status === "rejected" ? XCircle : CheckCircle2,
      date: approvedDate,
      completed: status === "approved" || status === "completed" || status === "rejected",
    },
  ]

  return (
    <Card className="border-2 border-[#4DB6AC]/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Application Status</span>
          <Badge
            variant={status === "approved" || status === "completed" ? "default" : "secondary"}
            className={
              status === "approved" || status === "completed"
                ? "bg-green-500"
                : status === "rejected"
                ? "bg-red-500"
                : "bg-yellow-500"
            }
          >
            {status === "under_review"
              ? "Under Review"
              : status === "approved"
              ? "Approved"
              : status === "rejected"
              ? "Rejected"
              : status === "completed"
              ? "Completed"
              : "Submitted"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = step.status === status
            const isFailed = status === "rejected" && step.status === "rejected"

            return (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed
                        ? isFailed
                          ? "bg-red-500 text-white"
                          : "bg-[#4DB6AC] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-12 ${
                        step.completed ? "bg-[#4DB6AC]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <p className={`font-semibold ${isActive ? "text-[#4DB6AC]" : "text-[#0D3B66]"}`}>
                    {step.label}
                  </p>
                  {step.date && (
                    <p className="text-sm text-muted-foreground">
                      {new Date(step.date).toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  {isActive && !step.date && (
                    <p className="text-sm text-muted-foreground italic">In progress...</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {notes && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">Notes from DCSA</p>
                <p className="text-sm text-blue-800">{notes}</p>
              </div>
            </div>
          </div>
        )}

        {status === "submitted" && (
          <p className="mt-4 text-sm text-muted-foreground">
            Your application is in the queue. We typically review applications within 48 hours.
          </p>
        )}

        {status === "under_review" && (
          <p className="mt-4 text-sm text-muted-foreground">
            Our team is currently reviewing your application. We'll contact you if we need any additional information.
          </p>
        )}

        {status === "approved" && (
          <p className="mt-4 text-sm text-green-700 bg-green-50 p-3 rounded">
            Congratulations! Your application has been approved. We'll be in touch shortly with next steps.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
