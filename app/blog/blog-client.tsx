"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
  blobUrl?: string
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

export default function BlogClientPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/blog")
      const data = await response.json()
      
      if (data.posts && data.posts.length > 0) {
        setPosts(data.posts)
      } else {
        setPosts(fallbackPosts)
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      setPosts(fallbackPosts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Real Talk About Money (Coffee Break Edition)
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Hey friend! Welcome to our blog where we share honest financial advice without the boring jargon. Think of it as money conversations over coffee with your supportive (and slightly funny) debt counsellor friends. Pull up a chair!
            </p>
            <div className="mt-6">
              <Button
                className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
                onClick={() => window.open("https://www.facebook.com/DebtClearDCSA", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Follow Us on Facebook
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading latest posts...</p>
              </div>
            ) : (
              posts.map((post) => (
                <a key={post.id} href={`/blog/${post.slug}`} className="block group">
                  <Card className="bg-card border-border hover:border-[#4DB6AC] hover:shadow-lg transition-all overflow-hidden cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            <Badge className="bg-[#FFE5D9] text-[#0D3B66] border-[#4DB6AC]/30">{post.category}</Badge>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(post.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{getReadTime(post.content)}</span>
                            </div>
                          </div>
                          <h2 className="text-2xl font-bold text-[#0D3B66] group-hover:text-[#4DB6AC] transition-colors mb-2">
                            {post.title}
                          </h2>
                          <p className="text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-[#4DB6AC] group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))
            )}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready for That Conversation We Mentioned?</h3>
                <p className="text-muted-foreground mb-6">
                  Reading is great (thanks for being here!), but sometimes you just need to talk to an actual human who gets it. Our female-led team is here - no judgment, just genuine support and real solutions tailored to YOUR life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() =>
                      (window.location.href =
                        "mailto:info@dcsam.co.za?subject=Free Consultation Request&body=Hi DCSA team, I would like to schedule a free consultation to discuss my debt situation.")
                    }
                  >
                    Email for Free Consultation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open("https://wa.me/27719006298?text=Hi, I need help with debt counselling", "_blank")
                    }
                  >
                    WhatsApp Us Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
