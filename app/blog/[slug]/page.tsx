import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"

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

const fallbackPosts: BlogPost[] = [
  {
    id: "1",
    slug: "understanding-consumer-rights",
    title: "Understanding Your Consumer Rights in South Africa",
    content: "Understanding your rights as a consumer is the first step towards financial freedom. At DCSA, we believe knowledge empowers you to make better financial decisions. The National Credit Act protects you from unfair lending practices and gives you the right to apply for debt review if you're struggling to pay your debts.",
    excerpt: "Understanding your rights as a consumer is the first step towards financial freedom...",
    category: "Consumer Rights",
    author: "DCSA Team",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    slug: "struggling-with-debt",
    title: "Struggling with Debt? You Are Not Alone",
    content: "Struggling with debt? You're not alone. Our certified debt counsellors are here to help you navigate through tough financial times with compassion and expertise. We understand that life happens - unexpected expenses, job loss, or medical emergencies can put anyone in a difficult financial position. Contact us for a free consultation.",
    excerpt: "Our certified debt counsellors are here to help you navigate through tough financial times...",
    category: "Debt Review",
    author: "DCSA Team",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    slug: "debt-review-benefits",
    title: "Did You Know? Debt Review Can Reduce Your Payments by Up to 45%",
    content: "Did you know that debt review can reduce your monthly payments by up to 45%? It's a legal process that protects you from creditors while you get back on your feet. During debt review, you make one affordable monthly payment, and we distribute it to your creditors on your behalf. Learn more about how DCSA can help you regain financial freedom.",
    excerpt: "Debt review can reduce your monthly payments by up to 45% - a legal process that protects you...",
    category: "Debt Review",
    author: "DCSA Team",
    createdAt: "2024-01-05T09:15:00Z",
    updatedAt: "2024-01-05T09:15:00Z",
  },
]

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch("https://dcsam.co.za/api/blog", {
      next: { revalidate: 3600 },
    })
    const data = await response.json()

    if (data.posts && data.posts.length > 0) {
      const post = data.posts.find((p: BlogPost) => p.slug === slug)
      if (post) return post
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
  }

  // Return from fallback
  return fallbackPosts.find((p) => p.slug === slug) || null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "debt counselling", "financial advice", "DCSA"],
    alternates: {
      canonical: `https://dcsam.co.za/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://dcsam.co.za/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.featuredImage ? [{ url: post.featuredImage, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

function getReadTime(content: string) {
  const words = content.split(" ").length
  const readTime = Math.ceil(words / 200)
  return `${readTime} min read`
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://dcsam.co.za",
    },
    publisher: {
      "@type": "Organization",
      name: "DCSA",
      url: "https://dcsam.co.za",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />

      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {post.featuredImage && (
            <div className="w-full h-96 rounded-lg overflow-hidden mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <article>
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{getReadTime(post.content)}</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground text-pretty">
                {post.excerpt}
              </p>
            </header>

            <div
              className="prose prose-lg dark:prose-invert max-w-none text-card-foreground leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="border-t border-border pt-8">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() =>
                  window.open(
                    `https://wa.me/27719006298?text=Hi, I read your blog post "${post.title}" and would like to learn more about your services.`,
                    "_blank",
                  )
                }
              >
                Get Help Now
              </Button>
            </footer>
          </article>

          <aside className="mt-16 pt-8 border-t border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">More Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {fallbackPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="p-4 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all">
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <p className="text-xs text-primary mt-3">Read More →</p>
                    </div>
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
