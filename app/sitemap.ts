import type { MetadataRoute } from "next"

const blogPosts = [
  { slug: "understanding-consumer-rights", lastModified: "2024-01-15" },
  { slug: "struggling-with-debt", lastModified: "2024-01-10" },
  { slug: "debt-review-benefits", lastModified: "2024-01-05" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.dcsam.co.za"
  const currentDate = new Date()

  const blogPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...blogPostUrls,
    {
      url: `${baseUrl}/calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap-html`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/admin/login`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/admin/blog`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.2,
    },
  ]
}
