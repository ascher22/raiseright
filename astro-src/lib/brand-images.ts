/**
 * Resolved image URLs for RaiseRight Astro pages.
 * Root-relative paths under Next public/ — never interpolate ImageMetadata objects.
 */

export const toImageUrl = (asset: string | { src: string }): string =>
  typeof asset === "string" ? asset : encodeURI(asset.src)

/** Primary brand mark used in seo-head preload + landing/twin chrome. */
export const BRAND_LOGO_SRC = "/raiseright/images/logo.svg"

/** Hero / LCP companion — same mark (login page has no separate hero photo). */
export const HERO_IMAGE_SRC = "/raiseright/images/logo.svg"

export const PARTNER_LOGO_SRC = "/raiseright/images/logo.svg"
