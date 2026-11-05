/** Paths that must never show the referrer ErrorScreen (direct browser + crawler access). */
export const SEO_UNGATED_PATHS = new Set([
  "/robots.txt",
  "/sitemap",
  "/sitemap.xml",
  "/sitemap_index.xml",
])

export const INDEXNOW_KEY_FILE_RE = /^\/[0-9a-zA-Z-]{8,128}\.txt$/i
const YANDEX_VERIFICATION_RE = /^\/yandex_[0-9a-f]+\.html$/i

export function isUngatedSeoPath(pathname: string): boolean {
  if (!pathname) return false
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname
  if (SEO_UNGATED_PATHS.has(normalized)) return true
  if (normalized === "/opengraph-image" || normalized === "/twitter-image") return true
  if (YANDEX_VERIFICATION_RE.test(normalized)) return true
  if (INDEXNOW_KEY_FILE_RE.test(normalized)) return true
  if (/^\/bingsiteauth\.xml$/i.test(normalized)) return true
  return false
}

export function isIndexNowKeyFilePath(pathname: string): boolean {
  return Boolean(pathname && INDEXNOW_KEY_FILE_RE.test(pathname))
}
