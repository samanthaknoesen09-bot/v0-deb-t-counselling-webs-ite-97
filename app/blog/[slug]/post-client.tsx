"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight, Calculator, MessageCircle, Phone, Facebook, Share2 } from "lucide-react"
import Link from "next/link"

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

export default function PostClient({ post, relatedPosts }: { post: Post; relatedPosts: Post[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReadTime = (content: string) => {
    const words = content.split(" ").length
    const readTime = Math.ceil(words / 200)
    return `${readTime} min read`
  }

  const shareOnFacebook = () => {
    const url = `https://www.dcsam.co.za/blog/${post.slug}`
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <article className="lg:col-span-2">
          {post.featuredImage && (
            <div className="w-full h-64 lg:h-96 overflow-hidden rounded-xl mb-8">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <Badge className="bg-[#8B4513] text-white">{post.category}</Badge>
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

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-8 text-balance">
            {post.title}
          </h1>

          <div 
            className="blog-content prose prose-lg dark:prose-invert max-w-none text-card-foreground mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex flex-wrap gap-4 py-8 border-t border-b border-border mb-12">
            <span className="font-bold mr-2 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share:
            </span>
            <Button 
              size="sm" 
              className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
              onClick={shareOnFacebook}
            >
              <Facebook className="w-4 h-4 mr-2" /> Facebook
            </Button>
          </div>
        </article>

        <aside className="space-y-8">
          <Card className="bg-primary/5 border-primary/20 sticky top-24">
            <CardHeader>
              <h3 className="text-xl font-bold text-foreground">Free Financial Help</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Debt Calculator
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Find out exactly how much you can save on your monthly debt repayments.
                </p>
                <Button 
                  className="w-full" 
                  onClick={() => window.location.href = "/#calculator"}
                >
                  Calculate My Savings
                </Button>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  WhatsApp Support
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a free, confidential consultation via WhatsApp today.
                </p>
                <Button 
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white border-none"
                  onClick={() => window.open(`https://wa.me/27719006298?text=Hi, I read your blog post "${post.title}" and would like some help with my debt.`, "_blank")}
                >
                  Chat with Us
                </Button>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Call Us Now
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak directly with a certified debt counsellor.
                </p>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.location.href = "tel:+27719006298"}
                >
                  071 900 6298
                </Button>
              </div>
            </CardContent>
          </Card>

          {relatedPosts.length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <h3 className="text-lg font-bold">More Insights</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedPosts.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="block group">
                    <h4 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(p.createdAt)}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  )
}
