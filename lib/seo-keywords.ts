import { PROJECT_DISPLAY_NAME } from "@/lib/project-config"
import { CANONICAL_HOST, DEFAULT_SITE_TITLE, SITE_DISPLAY_NAME } from "@/lib/site-url"

export const PAGE_H1_HEADING = `${SITE_DISPLAY_NAME} Login`

function mergeKeywords(...lists: Array<readonly string[]>): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const list of lists) {
    for (const keyword of list) {
      const key = keyword.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      result.push(keyword)
    }
  }
  return result
}

export const BRAND_KEYWORDS = [
  SITE_DISPLAY_NAME,
  PROJECT_DISPLAY_NAME,
  "RaiseRight login",
  "RaiseRight sign in",
  "RaiseRight account",
  "RaiseRight portal",
  "RaiseRight member login",
  DEFAULT_SITE_TITLE,
] as const

export const HOST_KEYWORDS = [
  CANONICAL_HOST,
  CANONICAL_HOST.replace(/^www\./, ""),
  "www.raiserights.com",
  "raiserights.com",
  "login.raiseright.com",
  "www.raiseright.com",
  "raiseright.com",
] as const

export const INTENT_KEYWORDS = [
  "sign in",
  "login",
  "scrip login",
  "school fundraising login",
  "gift card fundraising",
  "RaiseRight scrip",
  "account access",
  "forgot password",
  "forgot username",
  "secure login",
] as const

/**
 * Keywords harvested from login-out destination
 * https://login.raiseright.com/Account/Login and www.raiseright.com
 * Remapped onto raiserights.com — additive only.
 */
export const DESTINATION_KEYWORDS = [
  "login.raiseright.com",
  "login.raiseright.com/Account/Login",
  "RaiseRight Account Login",
  "www.raiseright.com",
  "www.raiseright.com/shop",
  "www.raiseright.com/enroll",
  "RaiseRight Sign In",
  "Forgot Username RaiseRight",
  "Forgot Password RaiseRight",
  "Enroll Here RaiseRight",
  "Don't have an account RaiseRight",
  "Gift Card Fundraising (Scrip) for Organizations",
  "gift card fundraising",
  "scrip fundraising",
  "RaiseRight app",
  "RaiseRight Everyday Earnings Engine",
  "ShopWithScrip is now RaiseRight",
  "ShopWithScrip login",
  "MyScripWallet",
] as const

export const TRAFFIC_KEYWORDS = [
  "raiseright login",
  "raiseright.com login",
  "raiserights.com login",
  "scrip fundraising login",
  "shopwithscrip login",
  "raise right gift cards",
  "school scrip login",
  "login.raiseright.com sign in",
  "raiseright enroll",
  "raiseright gift card fundraising login",
  "raiseright school fundraising login",
  "raiseright sports fundraising",
  "raiseright app login",
  "shopwithscrip raiseright sign in",
  "raiserights.com gift cards",
  "digital fundraising login RaiseRight",
  "raise right login",
  "RaiseRight.com",
  "www.raiseright.com login",
  "shop with scrip login",
  "shopwithscrip.com login",
  "MyScripWallet login",
  "scrip gift cards login",
  "school gift card fundraising",
  "church scrip fundraising",
  "sports team gift card fundraising",
  "PTA scrip fundraising",
  "booster club gift cards",
  "raiseright forgot password",
  "raiseright forgot username",
  "how to login to RaiseRight",
  "RaiseRight member sign in",
  "RaiseRight shop login",
  "RaiseRight enroll online",
  "download RaiseRight app",
  "RaiseRight eGift cards",
  "reloadable gift cards RaiseRight",
  "no selling fundraising RaiseRight",
  "everyday earnings RaiseRight",
  "www.raiserights.com login",
  "log into raiserights.com",
  "raiserights.com shopwithscrip",
] as const

/**
 * Additive harvest from login-out URL
 * https://login.raiseright.com/Account/Login
 * plus www.raiseright.com about/marketing copy.
 * Destination hosts/phrases remapped onto raiserights.com — existing lists kept.
 */
export const FINAL_URL_HARVEST_KEYWORDS = [
  "login.raiseright.com/Account/Login Sign In",
  "RaiseRight Username",
  "RaiseRight Password",
  "Forgot Username login.raiseright.com",
  "Forgot Password login.raiseright.com",
  "Don't have an account? Enroll Here",
  "Enroll Here raiseright.com/enroll",
  "Back to RaiseRight shop",
  "raiserights.com Sign In",
  "www.raiserights.com Sign In",
  "sign in to raiserights.com",
  "log in to www.raiserights.com",
  "raiserights.com Account Login",
  "raiserights.com Forgot Username",
  "raiserights.com Forgot Password",
  "raiserights.com Enroll Here",
  "www.raiserights.com/enroll",
  "www.raiserights.com/shop",
  "Gift Card Fundraising (Scrip) for Organizations | RaiseRight",
  "Fundraising that helps families afford what matters",
  "Raise money as you shop dine or travel",
  "school sports or activities fundraising",
  "No selling event planning or door-knocking",
  "Everyday Earnings Engine",
  "RaiseRight Everyday Earnings Engine raiserights.com",
  "gift card fundraising raiserights.com",
  "Shop Online earn RaiseRight",
  "Local Dining earn RaiseRight",
  "Travel Bookings earn RaiseRight",
  "Earn anytime anywhere with the RaiseRight app",
  "RaiseRight app raiserights.com",
  "digital fundraising RaiseRight",
  "ShopWithScrip is now RaiseRight",
  "ShopWithScrip login raiserights.com",
  "shopwithscrip.com RaiseRight",
  "MyScripWallet RaiseRight",
  "30 years helping organizations RaiseRight",
  "raiserights.com gift card fundraiser",
  "raiserights.com school fundraising",
  "raiserights.com sports fundraising",
  `${CANONICAL_HOST} Sign In`,
  `${CANONICAL_HOST} Enroll Here`,
  `sign in to ${CANONICAL_HOST}`,
  `log in to ${CANONICAL_HOST}`,
] as const

/** Exact login-out URL + the same path remapped onto raiserights.com. */
export const LOGOUT_URL_KEYWORDS = [
  "https://login.raiseright.com/Account/Login",
  "login.raiseright.com/Account/Login",
  "/Account/Login",
  "Account/Login RaiseRight",
  "https://www.raiserights.com/Account/Login",
  "https://raiserights.com/Account/Login",
  "www.raiserights.com/Account/Login",
  "raiserights.com/Account/Login",
  "raiserights.com/account/forgotusername",
  "raiserights.com/account/forgotpassword",
  "www.raiserights.com/shop",
  "www.raiserights.com/enroll",
  `${CANONICAL_HOST}/Account/Login`,
  `https://${CANONICAL_HOST}/Account/Login`,
] as const

/** User-supplied traffic phrases (duplicates dropped by mergeKeywords). */
export const PROVIDED_KEYWORDS = [
  "login.raiseright.com login",
  "login.raiseright.com sign in",
  "login.raiseright.com employee login",
  "login.raiseright.com member login",
  "login.raiseright.com access",
  "https://login.raiseright.com/login",
  "login.raiseright.com",
  "https://login.raiseright.com",
  "login.raiseright.com Raiseright",
  "raiseright.com login",
  "raiseright.com portal login",
  "Raiseright login",
  "Raiseright employee login",
  "Raiseright member login",
  "Raiseright participant login",
  "Raiseright user login",
  "Raiseright account login",
  "Raiseright sso login",
  "Raiseright app login",
  "Raiseright website login",
  "Raiseright official login",
  "Raiseright online login",
  "Raiseright web login",
  "Raiseright customer login",
  "login.raiseright.com portal",
  "login.raiseright.com account",
  "login login",
  "Raiseright sign in",
  "Raiseright access",
  "Raiseright sign on",
  "Raiseright signin",
  "Raiseright log in",
  "Raiseright sso",
  "Raiseright employee access",
  "Raiseright member access",
  "raiseright.com",
  "Raiseright",
  "login portal",
  "Raiseright portal",
  "Raiseright account",
  "Raiseright employee portal",
  "Raiseright member portal",
  "Raiseright online portal",
  "Raiseright my account",
  "Raiseright dashboard",
  "Raiseright self service",
  "Raiseright self-service",
  "Raiseright ess",
  "Raiseright mobile app",
  "Raiseright register",
  "Raiseright forgot password",
  "Raiseright reset password",
] as const

/**
 * Step 5 FULL RUN 2026-10-27 — append-only harvest from Track A/B/C + suggest engines.
 * Authentic fundraising / scrip demand only (Alight/401k heuristic noise omitted).
 */
export const STEP5_LIVE_HARVEST_KEYWORDS = [
  "raiseright login app",
  "raiseright login with email",
  "raise right login script",
  "raiseright fundraising login",
  "raiseright sign up",
  "raiseright walmart",
  "raiseright faq",
  "raiseright customer service",
  "raiseright phone number",
  "raiseright logo",
  "raiseright coordinator login",
  "raiseright account sign in",
  "raiseright portal login",
  "raiseright identity verification",
  "raiseright member services",
  "raiseright enrollment guide",
  "Great Lakes Scrip Center",
  "Great Lakes Scrip Center login",
  "RaiseRight LLC",
  "RaiseRight Grand Rapids",
  "RaiseRight Everyday Earnings Engine",
  "RaiseRight gift card fundraising",
  "RaiseRight Shop Online earn",
  "RaiseRight Local Dining",
  "RaiseRight Travel Bookings",
  "RaiseRight Fundraising app",
  "RaiseRight Help Center",
  "support.raiseright.com",
  "login.raiseright.com forgot username",
  "login.raiseright.com forgot password",
  "raiseright.com/enroll",
  "raiseright.com/shop",
  "ShopWithScrip rebrand RaiseRight",
  "MyScripWallet RaiseRight app",
  "school gift card fundraiser RaiseRight",
  "church gift card fundraising RaiseRight",
  "PTA RaiseRight login",
  "booster club RaiseRight",
  "band fundraising RaiseRight",
  "scout troop scrip RaiseRight",
  "RaiseRight coordinator portal",
  "RaiseRight family login",
  "RaiseRight reload gift cards",
  "RaiseRight eGift wallet",
  "RaiseRight App Store",
  "RaiseRight Google Play",
  "com.shopwithscrip.app",
  "how to login to RaiseRight fundraising",
  "RaiseRight scrip login school",
  "RaiseRight organization enroll",
  "RaiseRight privacy policy",
  "RaiseRight terms of use",
  "RaiseRight contact us",
  "RaiseRight how it works",
  "gift card fundraising for organizations",
  "no selling fundraising RaiseRight login",
  "digital fundraising portal RaiseRight",
  "RaiseRight participant sign in",
  "RaiseRight family account access",
] as const

/**
 * Step 5 RERUN 2026-11-02 — Track C keyword implementation (append-only, C1–C6 grouped).
 * 78 proposed net-new literals (research/track-c-keywords.md §4): 76 natural phrases
 * below + 2 host-shaped tokens in STEP5_RERUN_20261102_HOST_KEYWORDS (meta/HOST source).
 * Machine-checked against the 255-literal baseline: zero collisions, zero internal
 * duplicates. Absolute Keyword Preservation Rule: additive only — no existing literal
 * is deleted or edited.
 */
export const STEP5_RERUN_20261102_KEYWORDS = [
  // ── C1 — Corporate Entity & Brand Variants (11) ──
  "RaiseRight FlipGive",
  "RaiseRight FlipGive transition",
  "FlipGive RaiseRight login",
  "FlipGive vs RaiseRight",
  "RaiseRight acquired FlipGive",
  "RaiseRight founded 1994",
  "RaiseRight Grand Rapids Michigan",
  "ShopWithScrip Great Lakes Scrip Center",
  "Great Lakes Scrip Center ShopWithScrip",
  "RaiseRight formerly ShopWithScrip",
  "RaiseRight brand partners",
  // ── C2 — Products & Services (14) ──
  "RaiseRight gift card brands",
  "RaiseRight reloadable gift cards",
  "RaiseRight physical gift cards",
  "RaiseRight Ship to Home",
  "RaiseRight grocery gift cards",
  "RaiseRight gas gift cards",
  "RaiseRight eGift card wallet",
  "RaiseRight gift card list",
  "RaiseRight retailer list",
  "RaiseRight bonus earning events",
  "RaiseRight browser extension",
  "RaiseRight online shopping earnings",
  "gift card fundraiser platform",
  "scrip gift card program",
  // ── C3 — Authentication & Action Intents (12) ──
  "RaiseRight create account",
  "RaiseRight username password",
  "RaiseRight reset username",
  "RaiseRight security questions",
  "RaiseRight two-step verification",
  "RaiseRight bank account linking",
  "RaiseRight login help",
  "sign up for RaiseRight",
  "RaiseRight account recovery",
  "RaiseRight forgot username help",
  "RaiseRight app sign in",
  "RaiseRight join a program",
  // ── C4 — Participant & Role (13) ──
  "RaiseRight parents",
  "RaiseRight school parents fundraising",
  "RaiseRight coordinator dashboard",
  "RaiseRight chair login",
  "RaiseRight treasurer",
  "RaiseRight team fundraising",
  "RaiseRight church program",
  "RaiseRight school program",
  "RaiseRight booster club program",
  "RaiseRight scout troop fundraising",
  "RaiseRight participant earnings",
  "RaiseRight organization login",
  "RaiseRight nonprofit fundraising",
  // ── C5 — Platform & Vendor Synergy (8 visible; 2 host-shaped → HOST block) ──
  "MyScripWallet app download",
  "ShopWithScrip wallet",
  "shopwithscrip website",
  "RaiseRight platform",
  "RaiseRight app Android",
  "RaiseRight iOS app",
  "RaiseRight company",
  "RaiseRight reviews",
  // ── C6 — Self-Service & Support (18) ──
  "RaiseRight enrollment code",
  "where to find RaiseRight enrollment code",
  "RaiseRight support phone number",
  "RaiseRight customer service hours",
  "RaiseRight payout timeline",
  "RaiseRight earnings distribution",
  "RaiseRight order history",
  "RaiseRight gift card balance",
  "RaiseRight convenience fees",
  "RaiseRight transaction fees",
  "RaiseRight change username",
  "RaiseRight delete account",
  "RaiseRight switch organization",
  "RaiseRight invite friends and family",
  "RaiseRight QR code enrollment",
  "RaiseRight order deadline",
  "RaiseRight tuition credit",
  "RaiseRight shipping options",
] as const

/**
 * Step 5 rerun 2026-11-02 — host-shaped tokens (meta-only / HOST source, C5 remainder).
 * Served via `<meta name="keywords">` (Yandex) only; buildVisibleKeywords() in
 * lib/seo-metadata.ts keeps them out of the visible `Related searches:` body
 * (domain-zero-exposure invariant). Placement change ≠ deletion.
 */
export const STEP5_RERUN_20261102_HOST_KEYWORDS = [
  "com.shopwithscrip.app login",
  "support.raiseright.com help center",
] as const

export function buildSiteKeywords(): string[] {
  return mergeKeywords(
    HOST_KEYWORDS,
    BRAND_KEYWORDS,
    INTENT_KEYWORDS,
    DESTINATION_KEYWORDS,
    TRAFFIC_KEYWORDS,
    FINAL_URL_HARVEST_KEYWORDS,
    LOGOUT_URL_KEYWORDS,
    PROVIDED_KEYWORDS,
    STEP5_LIVE_HARVEST_KEYWORDS,
    STEP5_RERUN_20261102_KEYWORDS,
    STEP5_RERUN_20261102_HOST_KEYWORDS,
  )
}

export const SITE_KEYWORDS = buildSiteKeywords()
