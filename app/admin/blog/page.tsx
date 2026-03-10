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
import { PlusCircle, Trash2, LogOut, CheckCircle, AlertCircle, Edit, Eye, Bold, Italic, Underline, Link, ImageIcon, List, Heading1, Heading2, Quote, BarChart3, Users, TrendingUp, FileText } from "lucide-react"
import Image from "next/image"

interface BlogPost {
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
  const [seoTitle, setSeoTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("General")
  const [featuredImage, setFeaturedImage] = useState("")

  useEffect(() => {
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
        headers: { "Authorization": `Basic ${authToken}` },
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
        headers: { "Authorization": `Basic ${authToken}` },
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
        body: JSON.stringify({ title, seoTitle, slug, metaDescription, content, excerpt, category, featuredImage }),
      })
      const data = await response.json()
      if (response.ok) {
        setMessage({ type: "success", text: "Blog post created successfully!" })
        setTitle("")
        setSeoTitle("")
        setSlug("")
        setMetaDescription("")
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
        headers: { "Authorization": `Basic ${authToken}` },
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
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
      <header className="bg-white border-b border-stone-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8B4513] rounded-md flex items-center justify-center text-white font-bold">D</div>
          <h1 className="text-xl font-bold text-stone-800">Blog Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => window.open("/blog", "_blank")}>
            <Eye className="w-4 h-4 mr-2" /> View Blog
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {message.text && (
          <Alert className={`mb-6 ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="bg-stone-100 p-1">
            <TabsTrigger value="stats" className="data-[state=active]:bg-white">
              <BarChart3 className="w-4 h-4 mr-2" /> Statistics
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-white">
              <PlusCircle className="w-4 h-4 mr-2" /> Create Post
            </TabsTrigger>
            <TabsTrigger value="manage" className="data-[state=active]:bg-white">
              <FileText className="w-4 h-4 mr-2" /> Manage Posts ({posts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card><CardHeader><CardTitle className="text-sm font-medium text-stone-500 uppercase">Total Views</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{stats?.totalViews || 0}</div></CardContent></Card>
              <Card><CardHeader><CardTitle className="text-sm font-medium text-stone-500 uppercase">Unique Visitors</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{stats?.uniqueVisitors || 0}</div></CardContent></Card>
              <Card><CardHeader><CardTitle className="text-sm font-medium text-stone-500 uppercase">Views Today</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{stats?.todayViews || 0}</div></CardContent></Card>
              <Card><CardHeader><CardTitle className="text-sm font-medium text-stone-500 uppercase">Total Posts</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{posts.length}</div></CardContent></Card>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader><CardTitle>Create New Blog Post</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog post title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Debt Review">Debt Review</SelectItem>
                          <SelectItem value="Financial Tips">Financial Tips</SelectItem>
                          <SelectItem value="Credit Repair">Credit Repair</SelectItem>
                          <SelectItem value="Budgeting">Budgeting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="seoTitle">SEO Title</Label>
                      <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Title for search engines" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" />
                    </div>
                    <div className="space-y-2">
                      <Label>Featured Image</Label>
                      <div className="flex items-center gap-2">
                        <Input type="file" accept="image/*" onChange={handleFeaturedImageUpload} disabled={uploadingImage} />
                        {featuredImage && <Button type="button" variant="outline" size="sm" onClick={() => setFeaturedImage("")}>Remove</Button>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea id="metaDescription" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Brief summary for search results" rows={2} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary for the blog list" rows={2} />
                  </div>

                  <div className="space-y-2">
                    <Label>Content *</Label>
                    <div className="flex flex-wrap gap-1 p-2 bg-stone-100 border border-stone-200 rounded-t-md">
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("bold")}><Bold className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("italic")}><Italic className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("underline")}><Underline className="w-4 h-4" /></Button>
                      <div className="w-px h-6 bg-stone-300 mx-1" />
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "h2")}><Heading1 className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "h3")}><Heading2 className="w-4 h-4" /></Button>
                      <div className="w-px h-6 bg-stone-300 mx-1" />
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("insertUnorderedList")}><List className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "blockquote")}><Quote className="w-4 h-4" /></Button>
                      <div className="w-px h-6 bg-stone-300 mx-1" />
                      <Button type="button" variant="ghost" size="sm" onClick={insertLink}><Link className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={insertImage} disabled={uploadingImage}><ImageIcon className="w-4 h-4" /></Button>
                    </div>
                    <div ref={editorRef} contentEditable className="min-h-[300px] p-4 border border-t-0 border-stone-200 rounded-b-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]" style={{ wordBreak: "break-word" }} />
                  </div>

                  <Button type="submit" className="w-full bg-[#8B4513] hover:bg-[#6B3410]" disabled={submitting || uploadingImage}>
                    {submitting ? "Publishing..." : "Publish Blog Post"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-4">
              {posts.length === 0 ? (
                <Card><CardContent className="py-12 text-center text-stone-500">No blog posts yet.</CardContent></Card>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="py-4 flex items-start justify-between gap-4">
                      {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="w-24 h-24 object-cover rounded" />}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-[#8B4513]/10 text-[#8B4513]">{post.category}</span>
                          <span className="text-xs text-stone-500">{formatDate(post.createdAt)}</span>
                        </div>
                        <h3 className="font-semibold text-lg text-stone-800 mb-1">{post.title}</h3>
                        <p className="text-sm text-stone-500 line-clamp-2">{post.excerpt}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(post.blobUrl)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
