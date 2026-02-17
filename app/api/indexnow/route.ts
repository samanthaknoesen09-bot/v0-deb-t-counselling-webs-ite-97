import { type NextRequest, NextResponse } from "next/server"

// IndexNow API for instant indexing with Bing and other search engines
export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json()

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: "Invalid URLs provided" }, { status: 400 })
    }

    // IndexNow endpoint
    const indexNowEndpoint = "https://api.indexnow.org/indexnow"

    // Submit to IndexNow (Bing, Yandex, etc.)
    const response = await fetch(indexNowEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: "dcsam.co.za",
        key: "your-indexnow-key-here", // User needs to generate this
        keyLocation: "https://dcsam.co.za/your-indexnow-key.txt",
        urlList: urls,
      }),
    })

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "URLs submitted to IndexNow successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit to IndexNow",
        },
        { status: response.status },
      )
    }
  } catch (error) {
    console.error("IndexNow submission error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error submitting URLs",
      },
      { status: 500 },
    )
  }
}
