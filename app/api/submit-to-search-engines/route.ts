import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { url, type = "page" } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      )
    }

    const results = {
      google: { success: false, message: "" },
      bing: { success: false, message: "" },
    }

    // Google Search Console - IndexNow API (also works for Bing)
    try {
      const indexNowResponse = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host: "www.dcsam.co.za",
          key: process.env.INDEXNOW_API_KEY || "your-indexnow-key-here",
          keyLocation: `https://www.dcsam.co.za/${process.env.INDEXNOW_API_KEY || "your-indexnow-key"}.txt`,
          urlList: [url],
        }),
      })

      if (indexNowResponse.ok) {
        results.google.success = true
        results.google.message = "Submitted to Google via IndexNow"
        results.bing.success = true
        results.bing.message = "Submitted to Bing via IndexNow"
      } else {
        results.google.message = `IndexNow failed: ${indexNowResponse.statusText}`
        results.bing.message = `IndexNow failed: ${indexNowResponse.statusText}`
      }
    } catch (error) {
      results.google.message = `IndexNow error: ${error}`
      results.bing.message = `IndexNow error: ${error}`
    }

    // Google Indexing API (for individual page submissions)
    if (process.env.GOOGLE_INDEXING_API_KEY) {
      try {
        const googleResponse = await fetch(
          `https://indexing.googleapis.com/v3/urlNotifications:publish?key=${process.env.GOOGLE_INDEXING_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: url,
              type: "URL_UPDATED",
            }),
          }
        )

        if (googleResponse.ok) {
          results.google.success = true
          results.google.message = "Successfully submitted to Google Indexing API"
        }
      } catch (error) {
        console.error("Google Indexing API error:", error)
      }
    }

    // Bing URL Submission API
    if (process.env.BING_WEBMASTER_API_KEY) {
      try {
        const bingResponse = await fetch(
          `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${process.env.BING_WEBMASTER_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              siteUrl: "https://www.dcsam.co.za",
              url: url,
            }),
          }
        )

        if (bingResponse.ok) {
          results.bing.success = true
          results.bing.message = "Successfully submitted to Bing Webmaster"
        }
      } catch (error) {
        console.error("Bing Webmaster API error:", error)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Search engine submission completed",
      results,
      url,
    })
  } catch (error) {
    console.error("Search engine submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit to search engines" },
      { status: 500 }
    )
  }
}
