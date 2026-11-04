# TRACK C — AUTONOMOUS SEO INTELLIGENCE HARVEST (Keyword Research Deliverable)

- **Project:** `/Users/emperorofafrica/Documents/TAF/Tobi/raiseright`
- **Brand (`SITE_DISPLAY_NAME` / `PROJECT_DISPLAY_NAME`):** RaiseRight
- **Public host (`CANONICAL_HOST` from `lib/site-url.ts`):** `www.raise-rights.com` (SITE_ORIGIN `https://www.raise-rights.com`)
- **Authentic brand domain (login-out destination):** `login.raiseright.com/Account/Login` → `www.raiseright.com`
- **Keyword module (detected):** `lib/seo-keywords.ts` (no `astro-src/lib/seo-keywords.js` exists; `astro-src/lib/` contains only `brand-images.ts`)
- **Harvester:** `scripts/harvest-seo-intelligence.mjs` (already present, byte-identical to kit `Steins Gate/scripts/harvest-seo-intelligence.mjs` — no copy needed)
- **Run date:** 2026-11-02 · Spec: `Sleipnir the glider/Step 5 — Autonomous SEO Intelligence Prompt.md` (Track C)
- **Archetype:** gift-card fundraising participant portal (scrip) — NOT a benefits/401k portal. Entity: RaiseRight (formerly ShopWithScrip / Great Lakes Scrip Center; FlipGive acquired Sept 2025).

---

## 1. BASELINE INVENTORY (zero-deletion anchor)

Exact literal counts per block in `lib/seo-keywords.ts`, counted line-per-entry after comment stripping; template literals resolved (`CANONICAL_HOST` = `www.raise-rights.com`):

| Block | Literals | Notes |
|---|---|---|
| `BRAND_KEYWORDS` | 8 | includes 3 identifier refs (`SITE_DISPLAY_NAME`, `PROJECT_DISPLAY_NAME`, `DEFAULT_SITE_TITLE`) |
| `HOST_KEYWORDS` | 7 | includes `CANONICAL_HOST` + `CANONICAL_HOST.replace(/^www\./, "")` computed entries |
| `INTENT_KEYWORDS` | 10 | |
| `DESTINATION_KEYWORDS` | 19 | |
| `TRAFFIC_KEYWORDS` | 42 | |
| `FINAL_URL_HARVEST_KEYWORDS` | 44 | incl. 4 template literals |
| `LOGOUT_URL_KEYWORDS` | 14 | incl. 2 template literals |
| `PROVIDED_KEYWORDS` | 52 | user-supplied traffic phrases |
| `STEP5_LIVE_HARVEST_KEYWORDS` | 59 | prior Step 5 run 2026-10-27, append-only |
| **TOTAL LITERALS** | **255** | |
| **MERGED UNIQUE (runtime `SITE_KEYWORDS`)** | **229** | `mergeKeywords()` case-insensitive dedupe, 26 cross-block duplicates |

**PRESERVATION ANCHOR: all 255 literals / 229 unique runtime strings are EXISTING and MUST survive untouched. This run is strictly additive (0 deletions, 0 edits to `lib/seo-keywords.ts`).**

Existing 6-cluster coverage (classified, informational): C1 corporate/brand — heavy (`RaiseRight LLC`, `RaiseRight Grand Rapids`, `ShopWithScrip is now RaiseRight`, `Great Lakes Scrip Center`…); C2 products/services — moderate (`gift card fundraising`, `RaiseRight eGift cards`, `reloadable gift cards`, `Walmart`, `scrip fundraising`…); C3 auth/action — heavy (`login`/`sign in`/`forgot password`/`forgot username` families incl. host-shaped); C4 participant/role — moderate (`family login`, `coordinator login`, `participant sign in`, `employee/member portal` legacy phrases); C5 platform/vendor — moderate (`ShopWithScrip`, `MyScripWallet`, `com.shopwithscrip.app`, `login.raiseright.com`); C6 self-service/support — light-moderate (`FAQ`, `customer service`, `phone number`, `Help Center`, `enrollment guide`, `privacy policy`, `terms of use`, `contact us`, `App Store`, `Google Play`). Gaps below target C2/C4/C6.

---

## 2. HARVESTED DEMAND DUMP (grouped, 2026-11-02 live)

Sources: kit harvester run (`node scripts/harvest-seo-intelligence.mjs --brand "RaiseRight" --domain "www.raise-rights.com"` → fresh `seo-intelligence.json`, 2.2s) + direct Google/Bing/DuckDuckGo suggest APIs (10 entity seeds + 10 question seeds) + WebSearch SERP/PAA mining. Evidence class: **OBSERVED** (live API responses) unless marked.

### 2.1 Brand core (Google suggest, brand seed)
`raiseright login` · `raiseright fundraising` · `raiseright app` · `raiseright reviews` · `raiseright gift cards` · `raiseright enrollment code` · `raiseright logo` · `raiseright enrollment code 2026` · `raiseright fundraising reviews` · `raiseright customer service` · `raiseright reddit` · `raiseright scrip` · `raiseright app download`

### 2.2 Login/auth family (Google suggest)
`raiseright login app` · `raiseright login with email` · `raise right login script` · `raiseright fundraising login` · `raiseright sign up` · `raiseright account sign in` · `raiseright coordinator login` · `raiseright portal login` · `raiseright app sign in` (inferred from `raiseright app login`)

### 2.3 Legacy rebrand family (Google + Bing/DDG suggest)
`shopwithscrip login with email` · `shopwithscrip app` · `shopwithscrip login` · `shopwithscrip sign up` · `shopwithscrip gift cards` · `shopwithscrip account` · `shopwithscrip wallet` · `shopwithscrip enrollment code` · `shopwithscrip com website` · `shopwithscrip sign up login` · `shopwithscrip app download` · `shopwithscrip raiseright` · `shopwithscrip retailer list` · `my scrip wallet login` · `myscripwallet app` · `myscripwallet login app` · `myscripwallet com login` · `myscripwallet sign up`

### 2.4 Scrip / gift-card fundraising category
`scrip fundraising program` · `scrip fundraising list` · `scrip fundraising reviews` · `scrip school fundraising` · `how does scrip fundraising work` · `what is scrip program` · `what is scrip cards` · `what is scrip` · `gift card fundraising program` · `gift card fundraising ideas` · `gift card fundraising program for schools` · `gift card fundraiser for schools` · `gift card fundraiser flyer` · `gift card fundraiser platform` · `gift card fundraiser for individuals` · `gift card fundraiser basket` (Bing/DDG: `scrip gift card fundraising program`)

### 2.5 App / mobile family
`raise right app not working` · `raise right app download` · `raise right app not working today` · `raise right app reviews` · `raiseright fundraising app` · `raiseright fundraising app download` · `raiseright mobile app` · `raiseright app for android` · `raise right app` (Bing/DDG)

### 2.6 Enrollment / coordinator family (high commercial intent)
`raiseright enrollment code` · `raiseright enrollment code 2026` · `raiseright enrollment code 2025` · `raiseright enrollment code free` · `raiseright enrollment code 2026 free` · `raiseright enrollment code 2023` · `how to get raiseright enrollment code` · `raise right coordinator login` · `raise right coordinator dashboard` · `raiseright st alberts enrollment code` (Bing/DDG — real per-org demand pattern)

### 2.7 eGift / gift card product family
`raiseright gift cards` · `raiseright gift card fundraiser` · `raiseright gift card program` · `raiseright gift card list` · `raiseright disney gift cards`

### 2.8 Behavior / how-it-works questions (Google suggest)
`how does raise right fundraising work` · `how does raise right app work` · `how does raise right make money` · `how to use raise right app` · `how to use raiseright`

### 2.9 Fees / payout (Google suggest)
`raiseright fees` · `raise direct deposit` · `raiser direct deposit` · `raise deposit`

### 2.10 SERP-verified entity vocabulary (WebSearch, top-ranking pages)
Enrollment code (Coordinator Dashboard → Organization Details) · Coordinator Dashboard · Family Invite Tool · invite link / QR code · Invite Friends & Family (Account > Settings) · eGift cards (available in minutes) · reloadable gift cards · physical gift cards · Ship to Home (order tracking, delivery times, eligible brands) · virtual/gift card wallet · browser extension (Chrome/Edge, `raiseright.com/m/extension`) · bonus earning events · earnings dashboard · earnings distribution (80%+ recommended) · payout timelines · convenience fees ($0.29 bank / $0.79 no-org-banking / 1% debit / 3% credit) · bank account linking (instant vs 1–2 business days) · 2-step authorization · tuition credit (school programs) · "Change or reset my username or password" · "How to delete my RaiseRight account" · "How to switch the organization I'm earning for" · "About FlipGive and RaiseRight" · 2–20% earnings · 750+ brand partners (600 gift card / 440+ eGift / 550+ online / 20,000+ restaurants) · founded 1994 · 50,000+ organizations · $900M+ raised.

### 2.11 Competitor SERP phrasing (WebSearch; OBSERVED)
- `FlipGive vs RaiseRight` / `RaiseRight and FlipGive have joined forces` (acquisition Sept 2025; U.S. FlipGive teams discontinued from 2026 — **strategic brand adjacency, on-entity**)
- `RaiseRight vs HypeRaise` / `Zeffy vs RaiseRight` (comparison pages from rivals — captured as intent signals only; competitor brand keywords **rejected** per spec anti-spam rule)
- Institutional rebrand phrasing: `What is RaiseRight? (Formerly ShopwithScrip)`, `RaiseRight Info and FAQ`, `RaiseRight Chair`, `enrollment code`, `tuition credit` (school-church FAQ PDFs ranking in SERPs)

---

## 3. CONTAMINATION FLAGS — REJECTED (off-entity / template noise)

Per anti-contamination rule, the following harvested items are **REJECTED** — not on-entity for a gift-card fundraising portal:

**A. Off-entity suggest noise (fuzzy-name collisions):**
- `raiseright concrete` (construction company) · `how to redeem arena codes` (game codes) · `risk adjustment coordinator job description` / `campaign coordinator job description` (job boards) · `how do i get my money back from trust wallet` / `my script wallet` typo-suggest → crypto · `scripts fundraising` misspelling → separate query family · `buyers gift ideas`, `gift card fundraise up` (irrelevant tails) · `shopwithscrip logs` (log-file noise).

**B. Kit-harvester FAQ templates — OFF-ENTITY + PAIRING BUG (in `seo-intelligence.json` `faqs`, must NOT ship to `CrawlerSeoPage`):**
- "How to log into right networks?" · "How do i log into raiser's edge?" · "How to log into raid shadow legends?" · "How do i reset my rise broadband?" — fuzzy-entity contamination from question suggest.
- Structural bug: harvester pairs harvested question *i* with fallback answer *i* (answers reference "Health & Benefits / Retirement section" — benefits-archetype copy). All 5 shipped FAQ objects are contaminated on both axes. **Flagged; FAQ candidates in §6 supersede them.** (Run preserved as raw evidence in `seo-intelligence.json`.)

**C. Kit-harvester fallback taxonomy — Alight/benefits-archetype heuristic noise (REJECT for this archetype):**
`raiseright benefits login` · `raiseright worklife login` · `raiseright 401k account login` · `raiseright retirement savings` · `raiseright pension portal` · `raiseright hr portal login` · `raiseright employee benefits` · `raiseright claims status` · `raiseright coverage details` · `raiseright annual enrollment` · `raiseright health savings account` · `raiseright flexible spending account` (+ `direct deposit portal`, `toll free help desk` in fallback seed list). Also `domainServices` copy in `seo-intelligence.json` ("health, retirement, 401(k)… benefit programs") is off-entity — do not reuse.

**D. Legacy-but-preserved (never delete, do not expand):** `Raiseright employee login`, `Raiseright employee portal`, `login.raiseright.com employee login`, `login login`, `RaiseRight ess`, `RaiseRight Everyday Earnings Engine` — existing module literals; kept verbatim per Absolute Keyword Preservation Rule (marketing-era phrasing; harmless in meta).

---

## 4. PROPOSED NET-NEW KEYWORD LITERALS — 6-CLUSTER (78 net-new, strictly additive)

Verification: 78/78 strings machine-checked against the 229 unique existing runtime keywords → **0 collisions, 0 internal duplicates**. Ready to paste as a new `export const STEP6_TRACK_C_KEYWORDS = [...] as const` and append to `buildSiteKeywords()` (implementer does the paste; this run does not edit the module per scope).

### Cluster 1 — Corporate Entity & Brand Variants (11)
```
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
```

### Cluster 2 — Products & Services (gift-card fundraising offerings) (14)
```
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
```

### Cluster 3 — Authentication & Action Intents (12)
```
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
```

### Cluster 4 — Participant & Role (13)
```
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
```

### Cluster 5 — Platform & Vendor Synergy (10)
```
"MyScripWallet app download",
"ShopWithScrip wallet",
"shopwithscrip website",
"RaiseRight platform",
"RaiseRight app Android",
"RaiseRight iOS app",
"RaiseRight company",
"RaiseRight reviews",
"com.shopwithscrip.app login",
"support.raiseright.com help center",
```

### Cluster 6 — Self-Service & Support (18)
```
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
```

**Placement rule:** natural phrases above → visible body (`Related searches:`) + meta. Host/domain-shaped tokens (`com.shopwithscrip.app login`, `support.raiseright.com help center`, plus existing `HOST_KEYWORDS`/`LOGOUT_URL_KEYWORDS`) → **`<meta name="keywords">` META-only** (Yandex), kept out of visible body per domain-zero-exposure invariant. Placement change ≠ deletion.

**Counts:** C1 11 · C2 14 · C3 12 · C4 13 · C5 10 · C6 18 = **78 net-new** (fleet-standard 60–80 ✔). Post-paste totals would be 333 literals / 307 unique (verification pending paste).

---

## 5. PAA-STYLE QUESTIONS (real demand, verbatim patterns)

1. how does raise right fundraising work
2. how does raise right app work
3. how does raise right make money
4. how to use raise right app
5. how to get raiseright enrollment code
6. how does scrip fundraising work
7. what is scrip / what is scrip program / what is scrip cards
8. where to find my organization's enrollment code (RaiseRight help-center article title — top SERP)
9. how to change or reset my username or password (help-center article title)
10. what payment methods can I use to buy gift cards (help-center article title)
11. how to link a bank account for buying gift cards (help-center article title)
12. how to view and use eGift cards / how to track my eGift card balances / how to reload funds on existing eGift cards (help-center article titles)
13. how to switch the organization I'm earning for (help-center article title)
14. how to delete my RaiseRight account (help-center article title)
15. how to invite participants to your program (help-center article title)

---

## 6. FAQ CANDIDATES (6, entity-grounded — replace contaminated harvester FAQs)

Inverted-pyramid answers, grounded in OBSERVED RaiseRight/Help Center/school-program sources:

1. **How do I sign up for RaiseRight and find my organization's enrollment code?**
   Create your account at `RaiseRight.com/enroll` or in the mobile app under "Join a Program." Ask your program coordinator for your organization's unique enrollment code (Coordinator Dashboard → Organization Details), or use the invite link/QR code which pre-fills it. Then add a payment method to start earning.

2. **How do I log in to RaiseRight or recover my username or password?**
   Sign in at `login.raiseright.com` with your username and password. Use the Forgot Username and Forgot Password links on the sign-in card, or the Help Center article "Change or reset my username or password," to restore access through self-service security prompts.

3. **How does RaiseRight gift card fundraising work?**
   Buy gift cards at face value for everyday purchases — groceries, gas, dining, travel — and participating brands give 2–20% back to your organization. There is no selling, no minimums, and your group keeps 100% of earnings across 750+ brand partners.

4. **What fees does RaiseRight charge?**
   Starting a program is free. Gift card orders carry small transaction fees — $0.29 per order via linked bank account ($0.79 without organization banking on file), 1% by debit card, 3% by credit card. Online shopping, local dining, and travel bookings have no added fees.

5. **How do eGift cards, reloadable cards, and Ship to Home work?**
   eGift cards arrive in your virtual wallet within minutes and can be reloaded; physical gift cards are ordered on a monthly cycle (midnight cutoff on the 1st) and can ship to your organization or directly to your home with order tracking in the app.

6. **What happened to ShopWithScrip and FlipGive?**
   ShopWithScrip (formerly Great Lakes Scrip Center, founded 1994) rebranded to RaiseRight in 2022, and FlipGive officially joined RaiseRight in September 2025. Existing accounts, wallets, and earnings carry over on the RaiseRight platform.

---

## 7. HARVEST EXECUTION LOG (evidence)

- `node scripts/harvest-seo-intelligence.mjs --brand "RaiseRight" --domain "www.raise-rights.com"` → exit 0, 2209ms, fresh `seo-intelligence.json` saved (35 keyword slots — 12 authentic + 23 fallback-taxonomy entries; 5/5 FAQs contaminated → §3).
- Google Suggest API: 20 seeds queried (10 phrase + 10 question) — outputs in §2.
- Bing Suggest + DuckDuckGo suggest: 5 seeds each — outputs in §2 (near-identical sets; DDG duplicates Bing).
- WebSearch: 4 queries (login SERP, scrip how-it-works, PAA/FAQ mining, competitor landscape) — outputs in §2.10–2.11.
- DataForSEO: no `DATAFORSEO_LOGIN`/`DATAFORSEO_PASSWORD` in env → zero-key mode (graceful fallback per kit).
- Keyword-count verification + collision check: Node scripts over `lib/seo-keywords.ts` (§1, §4) — 255 literals / 229 unique baseline; 78 proposed / 0 collisions.

---

## 8. IMPLEMENTATION NOTES — keyword implementation run (2026-11-02)

**Scope owned:** `lib/seo-keywords.ts` + `scripts/verify-keyword-preservation.mjs` (new gate). Twin/head/layout untouched.

- **Baseline snapshot (pre-edit):** `research/seo-keywords.baseline.txt` — 255 raw source tokens, sorted, one per line, captured from the unmodified module before any edit. Raw-token form (not resolved strings) is the strictest verbatim anchor: it proves both presence and zero edits to existing literals. Block counts match §1 exactly (8/7/10/19/42/44/14/52/59).
- **Blocks appended (strictly additive, 0 deletions, 0 edits to existing literals):**
  - `STEP5_RERUN_20261102_KEYWORDS` — **76** natural phrases, C1–C6 grouped and commented (C1 11 · C2 14 · C3 12 · C4 13 · C5 8 · C6 18).
  - `STEP5_RERUN_20261102_HOST_KEYWORDS` — **2** host-shaped tokens (`com.shopwithscrip.app login`, `support.raiseright.com help center`), meta-only / HOST source per §4 placement rule; never enter `SITE_VISIBLE_KEYWORDS`.
  - **Deviation (documented):** §4 proposed one 78-literal visible list; the 2 host-shaped tokens were routed to a dedicated HOST-source block per the placement rule ("Host-shaped tokens → meta-only/HOST source"). 76 + 2 = **exactly the 78 proposed**; mechanical diff vs §4: 78/78 verbatim, 0 fabricated, 0 internal dups, 0 baseline collisions, 0 "Raise Right" split-brand forms. Legacy brand tokens (shopwithscrip, scrip, myscripwallet, and all pre-existing literals) untouched.
- **Wiring:** both new arrays appended to `mergeKeywords(...)` inside `buildSiteKeywords()` → `SITE_KEYWORDS` (feeds `<meta name="keywords">` full list) → `buildVisibleKeywords()` derivation in `lib/seo-metadata.ts` (feeds visible `Related searches:`).
- **Counts:** baseline 255 literals / 229 unique → final **333 literals / 307 unique** (255+78 / 229+78; merge count proves 0 collisions).
- **Task 5 — derivation leak found + hardened (one line, `lib/seo-metadata.ts`):** `buildVisibleKeywords()` previously excluded only `VISIBLE_HOST_TOKENS` (`www.raise-rights.com` / `raise-rights.com` substrings). Verified leak: **74 domain-shaped tokens** (incl. `https://…` URLs, `login.raiseright.com…`, `shopwithscrip.com…`, `com.shopwithscrip.app`) flowed into visible body copy — violating the domain-zero-exposure invariant. Hardened the single filter line to also exclude `/(?:https?:\/\/|www\.|[a-z0-9-]+\.(?:com|net|org|app|io|co|us|edu|gov|info|biz|shop|store|online)\b)/i`. **Placement change, not deletion** (spec §2 "Placement, not deletion (domain tokens)"): every token remains in the `SITE_KEYWORDS` meta list for Yandex. Over-filter audit: 74 entries excluded, **0 natural phrases eaten**; visible body = 251 entries (audit quota ≥ 25 safe).
- **Gate:** `scripts/verify-keyword-preservation.mjs` — (a) all 255 baseline literals verbatim in the module, (b) zero `\.com|\.net|http` (plus broader host-shape) tokens in visible surfaces (derived `SITE_VISIBLE_KEYWORDS` semantics + the rerun visible block), (c) `--self-test` with negative tests (deleted literal, edited literal, weak-filter leak, alt-TLD host leak) + positive controls. **Gate exit 0; self-test 15/15 exit 0.**
- **Verification:** `npx tsc --noEmit` exit 0. `npm run build` intentionally NOT run (finalizer owns build gate).
- **README changelog:** not touched — explicit write scope for this run excludes `README.md`; this section is the run's changelog of record.
