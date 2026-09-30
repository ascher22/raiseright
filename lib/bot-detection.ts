import {
  AI_REFERENCE_CRAWLER_UA,
  AI_TRAINING_CRAWLER_UA,
} from "@/lib/ai-referral"
/**
 * Search crawlers that receive SSR CrawlerSeoPage on `/` (middleware: x-crawler-seo-page).
 *
 * | Engine     | Constant             | UA tokens (summary)                                      |
 * |------------|----------------------|----------------------------------------------------------|
 * | Google     | GOOGLE_CRAWLER_UA    | googlebot, adsbot-google, feedfetcher-google, …          |
 * | Bing       | BING_CRAWLER_UA      | bingbot, msnbot, bingpreview, microsoftpreview, …        |
 * | DuckDuckGo | DUCKDUCK_CRAWLER_UA  | duckduckbot, duckduckgo-favicons-bot                     |
 * | Yahoo      | YAHOO_CRAWLER_UA     | slurp                                                    |
 * | Apple      | APPLE_CRAWLER_UA     | applebot                                                 |
 * | Baidu      | BAIDU_CRAWLER_UA     | baiduspider, baiduspider-image, baiduspider-video        |
 *
 * SEARCH_CRAWLER_UA = union of the above for SSR (excludes google-extended).
 * GOOGLE_CRAWLER_UA may include google-extended for other checks; SSR union does not.
 */

export const GOOGLE_CRAWLER_UA =
  /googlebot|mediapartners-google|adsbot-google|feedfetcher-google|google-inspectiontool|storebot-google/i

export const BING_CRAWLER_UA =
  /bingbot|msnbot|bingpreview|microsoftpreview|bingvideopreview|adidxbot/i

export const DUCKDUCK_CRAWLER_UA = /duckduckbot|duckduckgo-favicons-bot/i

export const YAHOO_CRAWLER_UA = /slurp/i

/**
 * Apple's indexing crawler.
 *
 * `applebot(?!-extended)` alone is not enough: Apple's own real-world UA carries a
 * documentation URL that ends in `.../go/applebot`, which satisfies the negative
 * lookahead and hands the AI-*training* token (Applebot-Extended) the search twin.
 * Anchor on the product position instead — a bot name must not be preceded by a
 * letter/dash (so `/go/applebot` and `applebot-extended` are both excluded) — and
 * exclude the extended token explicitly first.
 */
export const APPLE_CRAWLER_UA = /(?<![a-z-])applebot(?![a-z-])/i

/** Applebot-Extended is a training/asset token and must never be allowlisted. */
export const APPLEBOT_EXTENDED_UA = /applebot-extended/i

export const BAIDU_CRAWLER_UA = /baiduspider/i

/** Huawei Petal Search crawler. */
export const PETAL_CRAWLER_UA = /petalbot/i

/** Majestic SEO crawler (MJ12bot) — allowlisted for CrawlerSeoPage (not CF hard-deny). */
export const MAJESTIC_CRAWLER_UA = /mj12bot/i

/** SSR homepage crawlers — union of per-engine patterns (no google-extended). */
export const SEARCH_CRAWLER_UA =
  /googlebot|mediapartners-google|adsbot-google|feedfetcher-google|google-inspectiontool|bingbot|msnbot|bingpreview|microsoftpreview|bingvideopreview|adidxbot|duckduckbot|duckduckgo-favicons-bot|slurp|(?<![a-z-])applebot(?![a-z-])|baiduspider|petalbot|mj12bot/i

export const SOCIAL_PREVIEW_UA =
  /facebookexternalhit|facebot|facebookbot|twitterbot|linkedinbot|pinterest|slackbot|discordbot|whatsapp|skypeuripreview|telegrambot|meta-externalfetcher|snapchat/i

export function isGoogleCrawlerUA(ua: string | null | undefined): boolean {
  return GOOGLE_CRAWLER_UA.test(ua ?? "")
}

export function isBingCrawlerUA(ua: string | null | undefined): boolean {
  return BING_CRAWLER_UA.test(ua ?? "")
}

export function isDuckDuckCrawlerUA(ua: string | null | undefined): boolean {
  return DUCKDUCK_CRAWLER_UA.test(ua ?? "")
}

export function isYahooCrawlerUA(ua: string | null | undefined): boolean {
  return YAHOO_CRAWLER_UA.test(ua ?? "")
}

export function isAppleCrawlerUA(ua: string | null | undefined): boolean {
  return APPLE_CRAWLER_UA.test(ua ?? "")
}

export function isBaiduCrawlerUA(ua: string | null | undefined): boolean {
  return BAIDU_CRAWLER_UA.test(ua ?? "")
}

export function isPetalCrawlerUA(ua: string | null | undefined): boolean {
  return PETAL_CRAWLER_UA.test(ua ?? "")
}

export function isMajesticCrawlerUA(ua: string | null | undefined): boolean {
  return MAJESTIC_CRAWLER_UA.test(ua ?? "")
}

export function isSearchCrawlerUA(ua: string | null | undefined): boolean {
  return SEARCH_CRAWLER_UA.test(ua ?? "")
}

export function getCrawlerLabel(ua: string): string | null {
  if (isGoogleCrawlerUA(ua)) return "Googlebot"
  if (isBingCrawlerUA(ua)) return "Bingbot"
  if (isDuckDuckCrawlerUA(ua)) return "DuckDuckBot"
  if (isYahooCrawlerUA(ua)) return "Yahoo Slurp"
  if (isAppleCrawlerUA(ua)) return "Applebot"
  if (isBaiduCrawlerUA(ua)) return "Baiduspider"
  return null
}

/** AI reference crawlers (ChatGPT-User, PerplexityBot, …). */
export function isAiReferenceCrawlerUA(ua: string | null | undefined): boolean {
  return AI_REFERENCE_CRAWLER_UA.test(ua ?? "")
}

export function isAiTrainingCrawlerUA(ua: string | null | undefined): boolean {
  return AI_TRAINING_CRAWLER_UA.test(ua ?? "")
}

/**
 * Ranking search ∪ social preview ∪ AI reference — receives CrawlerSeoPage on SEO paths.
 *
 * Social preview UAs are included deliberately: link-unfurl scrapers need the
 * same SSR title/description/OG payload that search crawlers get, otherwise
 * Facebook/Slack/Discord/Snapchat renders a blank or bare-text card. The 13-token
 * list (including `meta-externalfetcher` and `snapchat`) is the kit's canonical set.
 *
 * AI *training* crawlers stay excluded — they are not fetching a page to index or
 * unfurl it, and the kit blocks them in robots.txt anyway.
 */
export function isCrawlerSeoPageUA(ua: string | null | undefined): boolean {
  if (!ua) return false
  // A reference token always wins over a training token in the same UA.
  // Anthropic's real Claude-Web UA embeds `+claudebot@anthropic.com`, so a plain
  // "training first" veto starves an allowlisted reference crawler.
  if (isAiReferenceCrawlerUA(ua)) return true
  if (isAiTrainingCrawlerUA(ua)) return false
  // Applebot-Extended is a training token; its UA also ends in `.../go/applebot`.
  if (APPLEBOT_EXTENDED_UA.test(ua)) return false
  return isSearchCrawlerUA(ua) || SOCIAL_PREVIEW_UA.test(ua)
}
