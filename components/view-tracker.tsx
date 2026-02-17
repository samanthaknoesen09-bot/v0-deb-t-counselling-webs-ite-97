"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

function getVisitorId(): string {
  if (typeof window === "undefined") return ""
  
  let visitorId = localStorage.getItem("dcsa_visitor_id")
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem("dcsa_visitor_id", visitorId)
  }
  return visitorId
}

export function ViewTracker() {
  const pathname = usePathname()
  
  useEffect(() => {
    const recordView = async () => {
      try {
        const visitorId = getVisitorId()
        await fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: pathname, visitorId })
        })
      } catch (error) {
        // Silently fail - don't affect user experience
      }
    }
    
    recordView()
  }, [pathname])
  
  return null
}
