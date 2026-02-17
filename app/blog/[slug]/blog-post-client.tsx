"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogShareButtons } from "@/components/blog-share-buttons"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { calculateReadingTime } from "@/lib/reading-time"
import Link from "next/link"
import Image from "next/image"

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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getReadTime(content: string) {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://www.dcsam.co.za",
    },
    publisher: {
      "@type": "Organization",
      name: "DCSA - Debt Clear South Africa",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dcsam.co.za/images/dcsa-logo.png",
      },
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.dcsam.co.za/blog/${post.slug}`,
    },
    ...(post.featuredImage && {
      image: {
        "@type": "ImageObject",
        url: post.featuredImage,
      },
    }),
    articleSection: post.category,
    keywords: [post.category, "debt counselling", "debt review", "financial advice", "DCSA"],
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="min-h-screen bg-background" id="main-content">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          {/* Back button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Card className="overflow-hidden">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="w-full h-[400px] overflow-hidden relative">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <CardHeader className="space-y-4">
              {/* Category Badge */}
              <Badge className="bg-[#FFE5D9] text-[#0D3B66] border-[#4DB6AC]/30 w-fit">
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#0D3B66] text-balance">
                {post.title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
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
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Blog content with proper HTML rendering */}
              <div
                className="blog-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share buttons */}
              <div className="pt-6 border-t-2 border-[#0D3B66]/10">
                <h3 className="text-lg font-semibold text-[#0D3B66] mb-3">
                  Found this helpful? Share it with others:
                </h3>
                <BlogShareButtons
                  title={post.title}
                  url={`https://www.dcsam.co.za/blog/${post.slug}`}
                  description={post.excerpt}
                />
              </div>

              {/* Call to action */}
              <div className="mt-12 p-6 bg-[#FFE5D9] rounded-xl border-2 border-[#4DB6AC]/30">
                <h3 className="text-2xl font-bold text-[#0D3B66] mb-3">Need Help with Your Debt?</h3>
                <p className="text-[#0D3B66]/80 mb-4">
                  Our certified debt counsellors are here to guide you towards financial freedom. Contact us
                  today for a free, confidential consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
                    asChild
                  >
                    <a href="tel:+27719006298">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now: 071 900 6298
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent" asChild>
                    <Link href="/calculator">Try Our Money Map</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related posts could go here */}
        </article>
      </main>
      <Footer />
    </>
  )
}
