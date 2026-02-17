import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.dcsam.co.za"

  return {
    rules: [
      // Google Chrome/Googlebot
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/client-portal/admin/", "/client-portal/auth/", "/*?*"],
        crawlDelay: 0,
      },
      // Google Image Search
      {
        userAgent: "Googlebot-Image",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/client-portal/"],
      },
      // Bing/Microsoft Edge
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/client-portal/admin/", "/client-portal/auth/", "/*?*"],
        crawlDelay: 1,
      },
      // AI Crawlers - Perplexity, ChatGPT, Claude, etc.
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/blog/", "/calculator", "/faq", "/get-started"],
        disallow: ["/api/", "/admin/", "/client-portal/"],
        crawlDelay: 1,
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/blog/", "/calculator", "/faq", "/get-started"],
        disallow: ["/api/", "/admin/", "/client-portal/"],
        crawlDelay: 1,
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/blog/", "/calculator", "/faq", "/get-started"],
        disallow: ["/api/", "/admin/", "/client-portal/"],
        crawlDelay: 1,
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/blog/", "/calculator", "/faq", "/get-started"],
        disallow: ["/api/", "/admin/", "/client-portal/"],
        crawlDelay: 1,
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/blog/", "/calculator", "/faq", "/get-started"],
        disallow: ["/api/", "/admin/", "/client-portal/"],
        crawlDelay: 1,
      },
      {
        userAgent: "Applebot",
        allow: ["/", "/blog/", "/calculator", "/faq", "/get-started"],
        disallow: ["/api/", "/admin/", "/client-portal/"],
        crawlDelay: 1,
      },
      // All other crawlers
      {
        userAgent: "*",
        allow: ["/", "/blog/", "/calculator", "/faq", "/get-started"],
        disallow: ["/api/", "/admin/", "/client-portal/", "/*?*", "/*.json$"],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

// AI-readable content summary available at: /ai-content.json
