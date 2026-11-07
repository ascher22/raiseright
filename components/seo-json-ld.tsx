import { SITE_DESCRIPTION } from "@/lib/seo-metadata"
import { SITE_DISPLAY_NAME, SITE_HOMEPAGE_CANONICAL, SITE_ORIGIN } from "@/lib/site-url"
export const ORGANIZATION_SAME_AS: readonly string[] = []
const SCHEMA_ALTERNATE_NAMES = [
  "ShopWithScrip",
  "Great Lakes Scrip Center",
  "GLSC",
] as const
export function SeoJsonLd() {
  const organizationId = `${SITE_ORIGIN}/#organization`
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_DISPLAY_NAME,
    url: SITE_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/og-image.png`,
      width: 1200,
      height: 630,
    },
  }
  if (ORGANIZATION_SAME_AS.length > 0) {
    organization.sameAs = [...ORGANIZATION_SAME_AS]
  }
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_HOMEPAGE_CANONICAL}#website`,
        name: SITE_DISPLAY_NAME,
        alternateName: [...SCHEMA_ALTERNATE_NAMES],
        url: SITE_HOMEPAGE_CANONICAL,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": organizationId },
        potentialAction: {
          "@type": "LoginAction",
          target: {
            "@type": "EntryPoint",
            url: SITE_HOMEPAGE_CANONICAL,
          },
          name: `Sign in to ${SITE_DISPLAY_NAME}`,
        },
      },
      organization,
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_HOMEPAGE_CANONICAL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_HOMEPAGE_CANONICAL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Sign in to ${SITE_DISPLAY_NAME}`,
            item: SITE_HOMEPAGE_CANONICAL,
          },
        ],
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}