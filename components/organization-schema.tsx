import { getOrganizationSchema } from "@/lib/structured-data"

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
    />
  )
}
