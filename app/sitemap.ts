import type { MetadataRoute } from "next"
import { list } from "@vercel/blob"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.dcsam.co.za"
  const currentDate = new Date()

  // Fetch all blog posts from Vercel Blob
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const { blobs } = await list({ prefix: "blogs/" })
    const now = new Date()
    
    const posts = await Promise.all(
      blobs
        .filter(blob => blob.pathname.endsWith(".json"))
        .map(async (blob) => {
          try {
            const response = await fetch(blob.url)
            const post = await response.json()
            
            // Only include published posts (not scheduled for future)
            if (post.scheduledFor && new Date(post.scheduledFor) > now) {
              return null
            }
            
            return {
              url: `${baseUrl}/blog/${post.slug}`,
              lastModified: new Date(post.updatedAt || post.createdAt),
              changeFrequency: "monthly" as const,
              priority: 0.7,
            }
          } catch (error) {
            console.error(`Error parsing blog post ${blob.pathname}:`, error)
            return null
          }
        })
    )
    
    blogPosts = posts.filter((post): post is MetadataRoute.Sitemap[0] => post !== null)
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error)
  }

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/interest-calculator`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.98,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.97,
    },
    {
      url: `${baseUrl}/locations/johannesburg`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/cape-town`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/durban`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/pretoria`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogPosts,
    {
      url: `${baseUrl}/sitemap-html`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}
