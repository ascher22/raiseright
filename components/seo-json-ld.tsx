import { LAYOUT_DESCRIPTION } from "@/lib/meta-description"
import {
  SITE_DISPLAY_NAME,
  SITE_HOMEPAGE_CANONICAL,
  SITE_ORIGIN,
  ogImageAbsoluteUrl,
} from "@/lib/site-url"

/**
 * Clean brand phrases and acronyms only — generic category phrases and
 * query-shaped strings are rejected by Google's site-name algorithm and push
 * the SERP header back to a raw domain display. No Wikipedia/Wikidata entity
 * exists for this brand (verified absent), so no encyclopedia sameAs is emitted.
 */
const SCHEMA_ALTERNATE_NAMES = [
  "ShopWithScrip",
  "Great Lakes Scrip Center",
  "GLSC",
] as const

/**
 * External profiles verified live HTTP 200 on 2026-11-02. Profiles that answer
 * non-200 to automated checks (Facebook 400, BBB 403, Crunchbase 403) are
 * excluded — sameAs carries only verified real profiles.
 */
const ORGANIZATION_SAME_AS = [
  "https://www.raiseright.com/about-us/",
  "https://www.linkedin.com/company/raiseright/",
  "https://www.instagram.com/raiserightfundraising/",
  "https://apps.apple.com/us/app/raiseright-fundraising/id1498234012",
] as const

export function SeoJsonLd() {
  const logoUrl = ogImageAbsoluteUrl()

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_DISPLAY_NAME,
    alternateName: [...SCHEMA_ALTERNATE_NAMES],
    description: LAYOUT_DESCRIPTION,
    url: SITE_HOMEPAGE_CANONICAL,
    publisher: {
      "@type": "Organization",
      name: SITE_DISPLAY_NAME,
      url: SITE_ORIGIN,
      logo: logoUrl,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "LoginAction",
      target: {
        "@type": "EntryPoint",
        url: SITE_HOMEPAGE_CANONICAL,
      },
      name: `Sign in to ${SITE_DISPLAY_NAME}`,
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_DISPLAY_NAME,
    alternateName: ["ShopWithScrip", "Great Lakes Scrip Center"],
    legalName: "RaiseRight, LLC",
    url: SITE_ORIGIN,
    logo: logoUrl,
    description: LAYOUT_DESCRIPTION,
    foundingDate: "1994",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "PO Box 8158",
        addressLocality: "Kentwood",
        addressRegion: "MI",
        postalCode: "49518-8158",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Grand Rapids",
        addressRegion: "MI",
        addressCountry: "US",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-727-4715",
      contactType: "customer support",
      areaServed: "US",
      availableLanguage: "en",
      hoursAvailable: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "16:30",
          timeZone: "America/New_York",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday"],
          opens: "08:00",
          closes: "16:00",
          timeZone: "America/New_York",
        },
      ],
    },
    sameAs: [...ORGANIZATION_SAME_AS],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
