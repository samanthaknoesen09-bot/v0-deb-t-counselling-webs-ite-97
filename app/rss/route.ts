import { type NextRequest, NextResponse } from "next/server"

const fallbackPosts = [
  {
    id: "1",
    slug: "understanding-consumer-rights",
    title: "Understanding Your Consumer Rights in South Africa",
    excerpt: "Understanding your rights as a consumer is the first step towards financial freedom...",
    category: "Consumer Rights",
    author: "DCSA Team",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    slug: "struggling-with-debt",
    title: "Struggling with Debt? You Are Not Alone",
    excerpt: "Our certified debt counsellors are here to help you navigate through tough financial times...",
    category: "Debt Review",
    author: "DCSA Team",
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    slug: "debt-review-benefits",
    title: "Did You Know? Debt Review Can Reduce Your Payments by Up to 45%",
    excerpt: "Debt review can reduce your monthly payments by up to 45% - a legal process that protects you...",
    category: "Debt Review",
    author: "DCSA Team",
    createdAt: "2024-01-05T09:15:00Z",
  },
]

function generateRSS(posts: typeof fallbackPosts): string {
  const baseUrl = "https://dcsam.co.za"

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <author>info@dcsam.co.za (${post.author})</author>
    </item>
  `
    )
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[DCSA - Debt Counselling Blog]]></title>
    <link>https://dcsam.co.za</link>
    <description><![CDATA[Professional debt counselling services helping South Africans achieve financial freedom. Latest tips, advice, and updates.]]></description>
    <language>en-za</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>https://dcsam.co.za/images/dcsa-logo.png</url>
      <title><![CDATA[DCSA - Debt Counselling Blog]]></title>
      <link>https://dcsam.co.za</link>
    </image>
    ${items}
  </channel>
</rss>`
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    let posts = fallbackPosts

    try {
      const response = await fetch("https://dcsam.co.za/api/blog", {
        next: { revalidate: 3600 },
      })
      const data = await response.json()
      if (data.posts && data.posts.length > 0) {
        posts = data.posts
      }
    } catch (error) {
      console.error("Error fetching blog posts for RSS:", error)
      // Use fallback posts
    }

    const rss = generateRSS(posts)

    return new NextResponse(rss, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return NextResponse.json({ error: "Failed to generate RSS feed" }, { status: 500 })
  }
}
