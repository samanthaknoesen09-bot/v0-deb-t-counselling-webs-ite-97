import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { list } from "@vercel/blob"
import BlogPostClient from "./blog-post-client"

interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  category: string
  author: string
  createdAt: string
  updatedAt: string
  featuredImage?: string
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { blobs } = await list({ prefix: "blogs/" })
    
    for (const blob of blobs) {
      if (!blob.pathname.endsWith(".json")) continue
      
      const response = await fetch(blob.url)
      const post = await response.json()
      
      if (post.slug === slug) {
        // Check if post is scheduled for future
        if (post.scheduledFor && new Date(post.scheduledFor) > new Date()) {
          return null
        }
        return post
      }
    }
    
    return null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: "Post Not Found | DCSA Blog",
      description: "The blog post you're looking for could not be found.",
    }
  }

  const baseUrl = "https://www.dcsam.co.za"
  const postUrl = `${baseUrl}/blog/${post.slug}`
  
  return {
    title: `${post.title} | DCSA Blog - Debt Counselling South Africa`,
    description: post.excerpt,
    keywords: [
      post.category,
      "debt counselling",
      "debt review",
      "credit repair",
      "financial advice",
      "DCSA",
      "South Africa",
    ],
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : [],
      siteName: "DCSA - Debt Clear South Africa",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const { blobs } = await list({ prefix: "blogs/" })
    const now = new Date()
    
    const slugs = await Promise.all(
      blobs
        .filter(blob => blob.pathname.endsWith(".json"))
        .map(async (blob) => {
          try {
            const response = await fetch(blob.url)
            const post = await response.json()
            
            // Validate post has required fields
            if (!post || !post.slug || typeof post.slug !== 'string') {
              console.log("[v0] Invalid post structure, skipping:", blob.pathname)
              return null
            }
            
            // Only include published posts
            if (post.scheduledFor && new Date(post.scheduledFor) > now) {
              console.log("[v0] Post scheduled for future, skipping:", post.slug)
              return null
            }
            
            console.log("[v0] Including post in static params:", post.slug)
            return { slug: post.slug }
          } catch (error) {
            console.log("[v0] Error parsing blog post:", blob.pathname, error)
            return null
          }
        })
    )
    
    // Filter out null values and ensure all slugs are valid strings
    const validSlugs = slugs.filter((s): s is { slug: string } => {
      return s !== null && s.slug && typeof s.slug === 'string' && s.slug.length > 0
    })
    
    console.log("[v0] Generated static params for blog posts:", validSlugs.map(s => s.slug))
    return validSlugs
  } catch (error) {
    console.error("[v0] Error generating static params:", error)
    return []
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return <BlogPostClient post={post} />
}
