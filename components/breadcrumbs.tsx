"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate JSON-LD structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.dcsam.co.za"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://www.dcsam.co.za${item.href}` : undefined
      }))
    ]
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center" itemProp="item">
              <Home className="h-4 w-4" />
              <span className="sr-only" itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const position = index + 2
            return (
              <li key={index} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <ChevronRight className="h-4 w-4 shrink-0" />
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-foreground transition-colors" itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span className={isLast ? "text-foreground font-medium" : ""} aria-current={isLast ? "page" : undefined} itemProp="name">
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={position.toString()} />
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
