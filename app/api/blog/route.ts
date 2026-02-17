import { put, list, del } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

// Simple auth check
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization")
  if (!authHeader) return false
  
  const encoded = authHeader.replace("Basic ", "")
  const decoded = Buffer.from(encoded, "base64").toString()
  const [username, password] = decoded.split(":")
  
  return username === "dcsam.admin" && password === "sam@august"
}

// Post to Facebook Page
async function postToFacebook(title: string, excerpt: string, blogUrl: string, imageUrl?: string): Promise<{ success: boolean; postId?: string; error?: string }> {
  const pageId = process.env.FACEBOOK_PAGE_ID
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  
  if (!pageId || !accessToken) {
    console.error("Facebook credentials not configured")
    return { success: false, error: "Facebook credentials not configured" }
  }
  
  try {
    const message = `${title}\n\n${excerpt}\n\nRead more: ${blogUrl}\n\n#DCSA #DebtCounselling #DebtReview #FinancialFreedom #CreditRepair #DebtHelp`
    
    let endpoint = `https://graph.facebook.com/v18.0/${pageId}/feed`
    const params: Record<string, string> = {
      message,
      link: blogUrl,
      access_token: accessToken,
    }
    
    // If there's a featured image, post as a photo instead
    if (imageUrl) {
      endpoint = `https://graph.facebook.com/v18.0/${pageId}/photos`
      params.url = imageUrl
      params.caption = message
      delete params.link
      delete params.message
    }
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(params).toString(),
    })
    
    const data = await response.json()
    
    if (data.error) {
      console.error("Facebook API error:", data.error)
      return { success: false, error: data.error.message }
    }
    
    return { success: true, postId: data.id || data.post_id }
  } catch (error) {
    console.error("Error posting to Facebook:", error)
    return { success: false, error: "Failed to post to Facebook" }
  }
}

// GET - List all blog posts
export async function GET() {
  try {
    const { blobs } = await list({ prefix: "blogs/" })
    const now = new Date()
    
    const posts = await Promise.all(
      blobs
        .filter(blob => blob.pathname.endsWith(".json"))
        .map(async (blob) => {
          const response = await fetch(blob.url)
          const post = await response.json()
          return {
            ...post,
            blobUrl: blob.url,
            pathname: blob.pathname,
          }
        })
    )
    
    // Filter out scheduled posts that haven't been published yet (for public view)
    // Admin can see all posts by checking auth
    const publishedPosts = posts.filter(post => {
      if (!post.scheduledFor) return true
      return new Date(post.scheduledFor) <= now
    })
    
    // Sort by date, newest first
    publishedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return NextResponse.json({ posts: publishedPosts })
  } catch (error) {
    console.error("Error listing blog posts:", error)
    return NextResponse.json({ posts: [] })
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  try {
    const body = await request.json()
    const { title, content, excerpt, category, featuredImage, scheduledFor } = body
    
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }
    
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    
    // Strip HTML tags for excerpt generation
    const plainTextContent = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    
    const now = new Date().toISOString()
    const publishDate = scheduledFor || now
    
    const post = {
      id: `post-${Date.now()}`,
      slug,
      title,
      content,
      excerpt: excerpt || plainTextContent.substring(0, 200) + "...",
      category: category || "General",
      author: "DCSA Team",
      featuredImage: featuredImage || "",
      scheduledFor: scheduledFor || null,
      createdAt: now,
      updatedAt: now,
      publishedAt: !scheduledFor ? now : null,
    }
    
    const filename = `blogs/${slug}-${Date.now()}.json`
    const blob = await put(filename, JSON.stringify(post), {
      access: "public",
      contentType: "application/json",
    })
    
    let message = "Blog post created successfully."
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dcsam.co.za"
    const blogUrl = `${baseUrl}/blog/${slug}`
    
    // Only post to Facebook and search engines if not scheduled for future
    if (!scheduledFor || new Date(scheduledFor) <= new Date()) {
      // Post to Facebook
      const fbResult = await postToFacebook(
        title,
        post.excerpt,
        blogUrl,
        featuredImage
      )
      
      if (fbResult.success) {
        message += " Posted to Facebook."
      } else {
        message += ` Facebook posting failed: ${fbResult.error}`
      }

      // Auto-submit to search engines (Google, Bing, Edge, Chrome)
      try {
        const searchEngineResponse = await fetch(`${baseUrl}/api/submit-to-search-engines`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: blogUrl,
            type: "blog"
          })
        })

        if (searchEngineResponse.ok) {
          const searchResult = await searchEngineResponse.json()
          message += " Submitted to Google, Bing, Edge, and Chrome for indexing."
        }
      } catch (error) {
        console.error("Search engine submission error:", error)
        message += " (Search engine submission failed)"
      }
    } else {
      message += ` Scheduled for ${new Date(scheduledFor).toLocaleString("en-ZA")}`
    }
    
    return NextResponse.json({ 
      success: true, 
      post: { ...post, blobUrl: blob.url },
      message
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

// DELETE - Delete a blog post
export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")
    
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }
    
    await del(url)
    
    return NextResponse.json({ success: true, message: "Blog post deleted" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
