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
  "www.raise-rights.com",
  "raise-rights.com",
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
 * Remapped onto raise-rights.com — additive only.
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
  "raise-rights.com login",
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
  "raise-rights.com gift cards",
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
  "www.raise-rights.com login",
  "log into raise-rights.com",
  "raise-rights.com shopwithscrip",
] as const

/**
 * Additive harvest from login-out URL
 * https://login.raiseright.com/Account/Login
 * plus www.raiseright.com about/marketing copy.
 * Destination hosts/phrases remapped onto raise-rights.com — existing lists kept.
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
  "raise-rights.com Sign In",
  "www.raise-rights.com Sign In",
  "sign in to raise-rights.com",
  "log in to www.raise-rights.com",
  "raise-rights.com Account Login",
  "raise-rights.com Forgot Username",
  "raise-rights.com Forgot Password",
  "raise-rights.com Enroll Here",
  "www.raise-rights.com/enroll",
  "www.raise-rights.com/shop",
  "Gift Card Fundraising (Scrip) for Organizations | RaiseRight",
  "Fundraising that helps families afford what matters",
  "Raise money as you shop dine or travel",
  "school sports or activities fundraising",
  "No selling event planning or door-knocking",
  "Everyday Earnings Engine",
  "RaiseRight Everyday Earnings Engine raise-rights.com",
  "gift card fundraising raise-rights.com",
  "Shop Online earn RaiseRight",
  "Local Dining earn RaiseRight",
  "Travel Bookings earn RaiseRight",
  "Earn anytime anywhere with the RaiseRight app",
  "RaiseRight app raise-rights.com",
  "digital fundraising RaiseRight",
  "ShopWithScrip is now RaiseRight",
  "ShopWithScrip login raise-rights.com",
  "shopwithscrip.com RaiseRight",
  "MyScripWallet RaiseRight",
  "30 years helping organizations RaiseRight",
  "raise-rights.com gift card fundraiser",
  "raise-rights.com school fundraising",
  "raise-rights.com sports fundraising",
  `${CANONICAL_HOST} Sign In`,
  `${CANONICAL_HOST} Enroll Here`,
  `sign in to ${CANONICAL_HOST}`,
  `log in to ${CANONICAL_HOST}`,
] as const

/** Exact login-out URL + the same path remapped onto raise-rights.com. */
export const LOGOUT_URL_KEYWORDS = [
  "https://login.raiseright.com/Account/Login",
  "login.raiseright.com/Account/Login",
  "/Account/Login",
  "Account/Login RaiseRight",
  "https://www.raise-rights.com/Account/Login",
  "https://raise-rights.com/Account/Login",
  "www.raise-rights.com/Account/Login",
  "raise-rights.com/Account/Login",
  "raise-rights.com/account/forgotusername",
  "raise-rights.com/account/forgotpassword",
  "www.raise-rights.com/shop",
  "www.raise-rights.com/enroll",
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
  )
}

export const SITE_KEYWORDS = buildSiteKeywords()
