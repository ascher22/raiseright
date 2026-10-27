import { LAYOUT_DESCRIPTION } from "@/lib/meta-description"
import {
  SITE_DISPLAY_NAME,
  SITE_HOMEPAGE_CANONICAL,
  SITE_ORIGIN,
  ogImageAbsoluteUrl,
} from "@/lib/site-url"

const SCHEMA_ALTERNATE_NAMES = [
  "RaiseRight Benefits",
  "RaiseRight Login",
  "RaiseRight Portal",
  "RaiseRight scrip",
  "ShopWithScrip",
  "gift card fundraising",
  "Everyday Earnings Engine",
  "Great Lakes Scrip Center",
] as const

const ORGANIZATION_SAME_AS = [
  "https://www.raiseright.com/about-us/",
  "https://www.linkedin.com/company/raiseright/",
  "https://www.facebook.com/RaiseRightFundraising",
  "https://www.instagram.com/raiserightfundraising/",
  "https://www.bbb.org/us/mi/grand-rapids/profile/fundraising-counselors-and-organizations/raiseright-llc-0372-13002078/",
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
    alternateName: [
      "ShopWithScrip",
      "Great Lakes Scrip Center",
      "RaiseRight LLC",
      "Great Lakes Scrip Center Inc",
    ],
    url: SITE_ORIGIN,
    logo: logoUrl,
    description: LAYOUT_DESCRIPTION,
    foundingDate: "1994",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Grand Rapids",
      addressRegion: "MI",
      addressCountry: "US",
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
