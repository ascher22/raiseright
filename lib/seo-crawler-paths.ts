/** Paths where SEARCH_CRAWLER_UA engines receive the Astro crawler twin. */
export const SEO_CRAWLER_PATHS = new Set<string>(["/", "/index.html", "/crawler-seo.html"])

export function isSeoCrawlerPath(pathname: string): boolean {
  if (!pathname) return false
  return SEO_CRAWLER_PATHS.has(pathname)
}
