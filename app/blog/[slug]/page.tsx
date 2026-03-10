import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import PostClient from "./post-client"

interface Post {
  id: string
  slug: string
  title: string
  seoTitle?: string
  metaDescription?: string
  content: string
  excerpt: string
  category: string
  author: string
  createdAt: string
  featuredImage?: string
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    // In a real app, use an absolute URL or fetch from DB
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.dcsam.co.za'
    const res = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.posts.find((p: Post) => p.slug === slug) || null
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  // Fetch all posts to find related ones
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.dcsam.co.za'
  const res = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' })
  const data = await res.json()
  const relatedPosts = (data.posts || []).filter((p: Post) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 lg:py-24">
        <PostClient post={post} relatedPosts={relatedPosts} />
      </main>
      <Footer />
    </div>
  )
}
