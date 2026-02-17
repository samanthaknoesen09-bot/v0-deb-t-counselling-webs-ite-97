"use client"

import React, { useRef, useCallback } from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlusCircle, Trash2, LogOut, CheckCircle, AlertCircle, Edit, Eye,
  Bold, Italic, Underline, Link, ImageIcon, List, Heading1, Heading2, Quote,
  BarChart3, Users, TrendingUp, FileText
} from "lucide-react"
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
  blobUrl: string
  pathname: string
  featuredImage?: string
}

interface SiteStats {
  totalViews: number
  uniqueVisitors: number
  todayViews: number
  last7Days: Record<string, number>
  pageViews: Record<string, number>
  lastUpdated: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [authToken, setAuthToken] = useState("")
  const [stats, setStats] = useState<SiteStats | null>(null)
  const router = useRouter()
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("General")
  const [featuredImage, setFeaturedImage] = useState("")

  useEffect(() => {
    // Check authentication
    const token = sessionStorage.getItem("dcsa_admin_auth")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setAuthToken(token)
    fetchPosts()
    fetchStats()
  }, [router])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog")
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  // Rich text editor commands
  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }, [])

  const insertLink = useCallback(() => {
    const url = prompt("Enter the URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }, [execCommand])

  const insertImage = useCallback(async () => {
    fileInputRef.current?.click()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/blog/upload-image", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${authToken}`,
        },
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        execCommand("insertImage", data.url)
      } else {
        setMessage({ type: "error", text: "Failed to upload image" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error uploading image" })
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/blog/upload-image", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${authToken}`,
        },
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        setFeaturedImage(data.url)
      } else {
        setMessage({ type: "error", text: "Failed to upload featured image" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while uploading the featured image" })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage({ type: "", text: "" })

    const content = editorRef.current?.innerHTML || ""
    
    if (!title || !content || content === "<br>") {
      setMessage({ type: "error", text: "Title and content are required" })
      setSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${authToken}`,
        },
        body: JSON.stringify({ title, content, excerpt, category, featuredImage }),
      })

      const data = await response.json()

      if (response.ok) {
        const fbStatus = data.facebookPost?.success 
          ? "Also posted to Facebook!" 
          : `Facebook: ${data.facebookPost?.error || "Not posted"}`
        setMessage({ type: "success", text: `Blog post created successfully! ${fbStatus}` })
        setTitle("")
        setExcerpt("")
        setCategory("General")
        setFeaturedImage("")
        if (editorRef.current) editorRef.current.innerHTML = ""
        fetchPosts()
      } else {
        setMessage({ type: "error", text: data.error || "Failed to create blog post" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while creating the post" })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (url: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/blog?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Basic ${authToken}`,
        },
      })

      if (response.ok) {
        setMessage({ type: "success", text: "Blog post deleted successfully!" })
        fetchPosts()
      } else {
        setMessage({ type: "error", text: "Failed to delete blog post" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while deleting the post" })
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("dcsa_admin_auth")
    router.push("/admin/login")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Hidden file input for images */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/dcsa-logo.png"
              alt="DCSA Logo"
              width={120}
              height={48}
              className="h-10 w-auto"
            />
            <span className="text-lg font-semibold text-stone-700">Blog Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.open("/blog", "_blank")}>
              <Eye className="w-4 h-4 mr-2" />
              View Blog
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {message.text && (
          <Alert className={`mb-6 ${message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-700" : "text-red-700"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="stats">
              <BarChart3 className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="create">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Post
            </TabsTrigger>
            <TabsTrigger value="manage">
              <Edit className="w-4 h-4 mr-2" />
              Manage Posts ({posts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Page Views</p>
                      <p className="text-3xl font-bold text-[#8B4513]">{stats?.totalViews || 0}</p>
                    </div>
                    <Eye className="w-10 h-10 text-[#8B4513]/20" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Unique Visitors</p>
                      <p className="text-3xl font-bold text-[#8B4513]">{stats?.uniqueVisitors || 0}</p>
                    </div>
                    <Users className="w-10 h-10 text-[#8B4513]/20" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Views Today</p>
                      <p className="text-3xl font-bold text-[#8B4513]">{stats?.todayViews || 0}</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-[#8B4513]/20" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Blog Posts</p>
                      <p className="text-3xl font-bold text-[#8B4513]">{posts.length}</p>
                    </div>
                    <FileText className="w-10 h-10 text-[#8B4513]/20" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Last 7 Days Views</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats?.last7Days ? (
                    <div className="space-y-3">
                      {Object.entries(stats.last7Days).reverse().map(([date, views]) => (
                        <div key={date} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {new Date(date).toLocaleDateString("en-ZA", { weekday: "short", month: "short", day: "numeric" })}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-stone-200 rounded-full h-2">
                              <div 
                                className="bg-[#8B4513] h-2 rounded-full" 
                                style={{ width: `${Math.min(100, (views / Math.max(...Object.values(stats.last7Days), 1)) * 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-8 text-right">{views}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No data available yet</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Page Views Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats?.pageViews && Object.keys(stats.pageViews).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(stats.pageViews)
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 10)
                        .map(([page, views]) => (
                          <div key={page} className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {page === "/" ? "Home" : page}
                            </span>
                            <span className="text-sm font-medium">{views} views</span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No page view data yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {stats?.lastUpdated && (
              <p className="text-xs text-muted-foreground mt-4">
                Last updated: {new Date(stats.lastUpdated).toLocaleString("en-ZA")}
              </p>
            )}
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter blog post title"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Debt Review">Debt Review</SelectItem>
                          <SelectItem value="Financial Tips">Financial Tips</SelectItem>
                          <SelectItem value="Credit Repair">Credit Repair</SelectItem>
                          <SelectItem value="Budgeting">Budgeting</SelectItem>
                          <SelectItem value="Consumer Rights">Consumer Rights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Featured Image</Label>
                      <div className="flex gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFeaturedImageUpload}
                          disabled={uploadingImage}
                        />
                      </div>
                      {featuredImage && (
                        <div className="mt-2 relative">
                          <img src={featuredImage || "/placeholder.svg"} alt="Featured" className="w-full h-32 object-cover rounded" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1"
                            onClick={() => setFeaturedImage("")}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt (optional)</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief summary of the post (auto-generated if left empty)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content *</Label>
                    
                    {/* Rich Text Editor Toolbar */}
                    <div className="flex flex-wrap gap-1 p-2 bg-stone-100 border border-stone-200 rounded-t-md">
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("bold")} title="Bold">
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("italic")} title="Italic">
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("underline")} title="Underline">
                        <Underline className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-6 bg-stone-300 mx-1" />
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "h2")} title="Heading 1">
                        <Heading1 className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "h3")} title="Heading 2">
                        <Heading2 className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-6 bg-stone-300 mx-1" />
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("insertUnorderedList")} title="Bullet List">
                        <List className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "blockquote")} title="Quote">
                        <Quote className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-6 bg-stone-300 mx-1" />
                      <Button type="button" variant="ghost" size="sm" onClick={insertLink} title="Insert Link">
                        <Link className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={insertImage} disabled={uploadingImage} title="Insert Image">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Rich Text Editor Content Area */}
                    <div
                      ref={editorRef}
                      contentEditable
                      className="min-h-[300px] p-4 border border-t-0 border-stone-200 rounded-b-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                      style={{ 
                        wordBreak: "break-word",
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Use the toolbar to format text: Bold, Italic, Underline, Headings, Links, and Images.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#8B4513] hover:bg-[#6B3410]"
                    disabled={submitting || uploadingImage}
                  >
                    {submitting ? "Publishing..." : "Publish Blog Post"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-4">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-4">
                        {post.featuredImage && (
                          <img 
                            src={post.featuredImage || "/placeholder.svg"} 
                            alt={post.title}
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 text-xs rounded-full bg-[#8B4513]/10 text-[#8B4513]">
                              {post.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg text-stone-800 mb-1">{post.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(post.blobUrl)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
