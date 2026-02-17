import { put, list } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

interface SiteStats {
  totalViews: number
  uniqueVisitors: string[]
  pageViews: Record<string, number>
  dailyViews: Record<string, number>
  lastUpdated: string
}

async function getStats(): Promise<SiteStats> {
  try {
    const { blobs } = await list({ prefix: "stats/" })
    const statsBlob = blobs.find(b => b.pathname === "stats/site-stats.json")
    
    if (statsBlob) {
      const response = await fetch(statsBlob.url)
      return await response.json()
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
  }
  
  return {
    totalViews: 0,
    uniqueVisitors: [],
    pageViews: {},
    dailyViews: {},
    lastUpdated: new Date().toISOString()
  }
}

async function saveStats(stats: SiteStats): Promise<void> {
  await put("stats/site-stats.json", JSON.stringify(stats), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true
  })
}

// GET - Retrieve stats (for admin)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  
  // Optional auth check for detailed stats
  const stats = await getStats()
  
  // Calculate additional metrics
  const today = new Date().toISOString().split("T")[0]
  const todayViews = stats.dailyViews[today] || 0
  
  // Get views for last 7 days
  const last7Days: Record<string, number> = {}
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateKey = date.toISOString().split("T")[0]
    last7Days[dateKey] = stats.dailyViews[dateKey] || 0
  }
  
  return NextResponse.json({
    totalViews: stats.totalViews,
    uniqueVisitors: stats.uniqueVisitors.length,
    todayViews,
    last7Days,
    pageViews: stats.pageViews,
    lastUpdated: stats.lastUpdated
  })
}

// POST - Record a page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, visitorId } = body
    
    const stats = await getStats()
    
    // Increment total views
    stats.totalViews += 1
    
    // Track unique visitors
    if (visitorId && !stats.uniqueVisitors.includes(visitorId)) {
      stats.uniqueVisitors.push(visitorId)
    }
    
    // Track page views
    const pagePath = page || "/"
    stats.pageViews[pagePath] = (stats.pageViews[pagePath] || 0) + 1
    
    // Track daily views
    const today = new Date().toISOString().split("T")[0]
    stats.dailyViews[today] = (stats.dailyViews[today] || 0) + 1
    
    stats.lastUpdated = new Date().toISOString()
    
    await saveStats(stats)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error recording view:", error)
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 })
  }
}
