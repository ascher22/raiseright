# TRACK B — Corporate Entity Intelligence: RaiseRight

> Step 5 (Autonomous SEO Intelligence) — TRACK B deliverable.
> Target project: `Tobi/raiseright`. Research date: 2026-11-02.
> Evidence tags on every claim: **[OBSERVED]** (direct source), **[INFERRED]** (derived from evidence), **[ESTIMATED]** (approximate), **[UNKNOWN]** (not established).

---

## 1. Entity Identification (from project code)

| Field | Value | Evidence |
|---|---|---|
| `SITE_DISPLAY_NAME` | `RaiseRight` | [OBSERVED] `lib/site-url.ts` |
| `PROJECT_DISPLAY_NAME` / `PROJECT_ID` | `RaiseRight` / `raiseright` | [OBSERVED] `lib/project-config.ts` |
| `SITE_ORIGIN` | `https://www.raise-rights.com` (project deployment host, NOT the authentic brand domain) | [OBSERVED] `lib/site-url.ts` |
| Auth/login redirect | `https://login.raiseright.com/Account/Login` | [OBSERVED] `lib/project-config.ts` (`LOGIN_REDIRECT_URL`) |
| Allowed backlink hosts | `raiseright.com`, `www.raiseright.com`, `raiserights.com`, `www.raiserights.com`, `login.raiseright.com` | [OBSERVED] `lib/project-config.ts` |
| Platform archetype | Fundraising/gift-card participant portal (not Alight/Wealthcare; `SITE_PLATFORM = "other"`) | [OBSERVED] `lib/site-url.ts` + brand web research |
| `lib/brand-config.ts` / `lib/brand.ts` | Do not exist in this project; brand constants live in `lib/site-url.ts` + `lib/project-config.ts` | [OBSERVED] file listing of `lib/` |

**Authentic target portal (login chrome):** `https://login.raiseright.com/Account/Login` renders "RaiseRight / Sign In / Username / Password / Sign In" with `Forgot Username` → `/account/forgotusername`, `Forgot Password` → `/account/forgotpassword`, "Don't have an account? Enroll Here" → `https://www.raiseright.com/enroll`, and "Back" → `https://www.raiseright.com/shop`. [OBSERVED] live fetch of login.raiseright.com.

---

## 2. Corporate Entity Findings

### 2.1 Exact entity names

- **Brand / trade name:** **RaiseRight** — "the largest gift card fundraising platform in the United States". [OBSERVED] https://www.raiseright.com/blog/shopwithscrip-rebrands-as-raiseright
- **Legal entity (USA):** **RaiseRight, LLC** — Organization Terms of Use: "a legal agreement between you and if you are in the USA RaiseRight, LLC and if you are in Canada FlipGive Corporation". [OBSERVED] https://www.raiseright.com/about-us/organization-terms-of-use/ (Last Updated Oct 2, 2026)
- **Canadian legal entity:** **FlipGive Corporation** (Canadian operations post-acquisition). [OBSERVED] same Terms of Use page.
- **Former names:** Great Lakes Scrip Center (GLSC) → platform brand **ShopWithScrip** (ShopWithScrip.com) → **RaiseRight** (full rebrand 2022). [OBSERVED] https://www.raiseright.com/about-us/
- **Legacy email domain:** `shopwithscrip@glscrip.com` (GLSC = Great Lakes Scrip Center). [OBSERVED] LinkedIn company page (weak-tier source, corroboration only).
- **Stock ticker:** none — privately held company. [OBSERVED] LinkedIn "Type: Privately held"; no exchange listing found. Never cite a ticker.

### 2.2 Ownership & corporate history (timeline)

| Year | Event | Evidence |
|---|---|---|
| 1994 | Founded by two Michigan mothers, **Carol Smith** and **Carol Burgess**, as **Great Lakes Scrip Center (GLSC)**, operating from a home basement in the Grand Rapids, MI area; took orders by fax/phone. | [OBSERVED] https://www.raiseright.com/about-us/ |
| 1990s–2000s | Grew into the largest scrip (gift card) fundraising provider in the U.S.; early e-commerce site + digital gift card wallet; eGift cards grew from 2010. | [OBSERVED] raiseright.com/about-us; Lincoln International release |
| Feb 12, 2018 | **Bold Orange Company** (Minneapolis, MN; founder Margaret Murphy) acquired GLSC; deal backed by Denver-based private equity firm **Mountaingate Capital**. Terms undisclosed. Jack Smith was former CEO at sale. Lincoln International was sell-side advisor. | [OBSERVED] https://boldorange.com/news/bold-orange-company-acquires-great-lakes-scrip-center/ and https://www.lincolninternational.com/transactions/great-lakes-scrip-center-sold-to-bold-orange/ |
| 2018 | RaiseRight mobile app launches (initially "RaiseRight by ShopWithScrip"). | [OBSERVED] raiseright.com/about-us; RaiseRight mobile-app FAQ PDF |
| 2021 | Milestone: 50,000 approved organizations. | [OBSERVED] raiseright.com/about-us timeline |
| May 11, 2022 | **ShopWithScrip fully rebrands to RaiseRight**; **Lou Agnese** appointed CEO (ex-president, RetailMeNot). Margaret Murphy = Chairwoman of the RaiseRight Board. Grand Rapids, MI dateline. | [OBSERVED] https://www.raiseright.com/blog/shopwithscrip-rebrands-as-raiseright |
| 2022 | **Separated from Bold Orange**; rebrand completed "across the entire ecosystem". | [OBSERVED] raiseright.com/about-us |
| 2024 | Online shopping earnings + browser extension launch (RaiseRight Earnings Extension). | [OBSERVED] raiseright.com/about-us timeline; support.raiseright.com extension section |
| Sep 2025 | **RaiseRight, LLC (portfolio company of Mountaingate Capital) acquired the assets of FlipGive** (Toronto digital fundraising platform, founded 2016, B Corp). FlipGive brand/team continue in Canada; services integrate into RaiseRight's platform. Terms undisclosed. | [OBSERVED] https://privatecapitaljournal.com/mountaingates-raiseright-acquires-assets-of-flipgive/ and https://thenonprofittimes.com/npt_articles/fundraising-solutions-provider-raiseright-acquires-flipgive/ |

**Current owner (as of research date):** **Mountaingate Capital** (Denver, CO growth PE firm, ~$1.4B AUM, Fund III $570M hard cap closed Jan 2025) holds RaiseRight as a portfolio company via RaiseRight, LLC. [OBSERVED] Private Capital Journal ("RaiseRight, LLC, a portfolio company of Mountaingate Capital"); [INFERRED] exact holdco chain (Mountaingate fund → RaiseRight, LLC) beyond the stated "portfolio company" wording is not publicly detailed.

**Leadership:** CEO **Louis (Lou) Agnese**; COO Jill Whalen; CTO Will Bowlin; CMO Mike Turner; CPO Joe Mattleman; Kyle Kooienga, Director Finance. [OBSERVED] raiseright.com/about-us (leadership section).

### 2.3 Headquarters & locations

- **HQ: Grand Rapids, Michigan** (Midwest US). [OBSERVED] press releases (Grand Rapids dateline), LinkedIn HQ listing, NonProfit Times ("Grand Rapids, Michigan").
- **Kentwood, Michigan** office + mailing address: **PO Box 8158, Kentwood, MI 49518-8158**. [OBSERVED] https://www.raiseright.com/about-us/contact/ ; Private Capital Journal calls the company "Kentwood, Michigan based RaiseRight".
- Original GLSC roots: Grand Rapids area, Michigan. [OBSERVED] raiseright.com/about-us.
- Workforce distributed across US and Brazil per LinkedIn; headcount listed as ~57. [OBSERVED — third-party estimate] LinkedIn company page. Treat headcount/revenue figures on aggregator profiles as **[ESTIMATED]**, not authoritative.

### 2.4 Disambiguation (other "raise right" names)

- **Raise Right Academy** (Tanta, Egypt; education company, raiserightacademy.com) — unrelated. [OBSERVED] UK LinkedIn listing.
- No other significant company branded "RaiseRight" surfaced; the gift-card fundraising platform is the dominant entity for the term. [INFERRED] from SERP dominance across all queried engines.
- `raise-rights.com` is THIS project's deployment host (`SITE_ORIGIN`), not the authentic brand domain; authentic domain is `raiseright.com`. [OBSERVED] project code.
- "Scrip" in this context = gift card fundraising (substitute currency sense), not payroll scrip or stock scrip. [OBSERVED] https://www.raiseright.com/how-it-works/ ("What is scrip?").

### 2.5 Scale / proof points (all brand-stated)

- 50,000+ organizations served since inception; **$900+ million** raised for nonprofits to date (2025 milestone). [OBSERVED] raiseright.com/about-us.
- 100+ million gift cards purchased; $16B+ in sales driven to brand partners; 750+ brand partners (Walmart, Target, Amazon, Home Depot, Macy's, Olive Garden, Safeway, Starbucks, ExxonMobil…). [OBSERVED] raiseright.com homepage + LinkedIn.
- 15,000+ organizations raised $35M+ in 2025 alone. [OBSERVED] raiseright.com homepage ("Together, we thrived in '25").
- iOS app rating 4.9/5 across 20,000+ reviews (brand-stated). [OBSERVED] raiseright.com homepage.
- Historical (2018 era): 48,000+ orgs, $680M+ raised, ~$9B commerce to 750+ retailers. [OBSERVED] Bold Orange / Lincoln releases.

---

## 3. Product & Service Offerings

| Offering | Description | Evidence |
|---|---|---|
| **Gift card fundraising ("scrip")** | Buy gift cards at face value for everyday spending; a percentage (rebate/earnings, e.g. 14% on a $100 Gap card → $14 earned) goes to the enrolled organization/participant. | [OBSERVED] https://www.raiseright.com/how-it-works/gift-card-fundraising |
| **eGift cards** | Digital cards delivered to the **RaiseRight Wallet** (app or desktop); usable online or in-store from phone; printable; schedulable email gifts to up to 125 recipients. | [OBSERVED] raiseright.com/how-it-works/gift-card-fundraising |
| **Physical gift cards** | Plastic cards; **Ship to Coordinator** (organization address) or **Ship to Home** (200+ brands). | [OBSERVED] same + support.raiseright.com |
| **Reloadable gift cards (physical + eGift)** | 150+ reloadable brands physical; reloadable eGift for The Home Depot, Target, Starbucks, PetSmart, Panera, Burger King, Cub Foods (app v3.5.0+). Register card in Wallet, "Add Money" to reload. | [OBSERVED] https://support.raiseright.com/hc/en-us/articles/55666078417811 and /360050533674 |
| **Online shopping earnings** | Earn on brand-site purchases via RaiseRight; "earn twice" (gift card + online earnings on same purchase); Online Deals & Coupons; **RaiseRight Earnings Extension** browser extension (Chrome/Edge desktop, iOS Safari) launched 2024. | [OBSERVED] raiseright.com; support.raiseright.com extension section |
| **Local dining** | Earn at participating restaurants by linking a credit/debit card. | [OBSERVED] support.raiseright.com Local Dining section |
| **Travel bookings** | Book hotels, car rentals, attractions through RaiseRight and earn; loyalty points still accrue. | [OBSERVED] support.raiseright.com Travel section |
| **PrestoPay** | Legacy/known name for RaiseRight's instant bank-debit payment processor (linked checking/savings; funds eGift + reloads immediately). Current site calls this simply "link a bank account" (Instant or Manual verification, 1–2 business days). A $0.15/order convenience fee is cited by third-party org FAQs (legacy). | [OBSERVED] https://support.raiseright.com/hc/en-us/articles/44378984718227 (bank linking); [OBSERVED — third party] genegrawefund.org/faq/what-is-prestopay/ (PrestoPay definition + fee — treat fee as legacy [INFERRED]) |
| **MyScripWallet** | Legacy ShopWithScrip-era mobile wallet site; was scheduled to be replaced by the RaiseRight app (2021-era FAQ: "The RaiseRight app will replace MyScripWallet.com later this year"). Current status of MyScripWallet.com: [UNKNOWN] (no current first-party page found). Users still search the term. | [OBSERVED] raiseright mobile app FAQ PDF (campussuite-storage mirror) |
| **Coordinator Dashboard / Participant Hub** | Organization management: enrollment codes, family invite tool, invite links, QR quick-enroll, bulk orders, POs, reports, bonus calendar, Ship to Coordinator toggles, earnings allocation (recommend 80%+ shared with participants). | [OBSERVED] support.raiseright.com Coordinator sections; raiseright.com/resources/organization/starting-a-new-program/ |
| **FlipGive** | Acquired Sep 2025; Canadian cashback fundraising platform (900+ brands, 50,000+ youth sports teams, B Corp); brand retained in Canada, integrated into RaiseRight platform. | [OBSERVED] NonProfit Times + Private Capital Journal |
| **Program model** | Free to start, no minimums, no selling; organizations keep 100% of earnings; small transaction fees on gift card orders. | [OBSERVED] raiseright.com homepage + how-it-works |

**Order/payment fees (gift card orders):** ACH/personal bank account $0.29 flat per order (org provided banking) or $0.79 (not provided); debit card 1%; credit card 3% per order. No fees for online shopping, local dining, or travel bookings. [OBSERVED] https://www.raiseright.com/how-it-works/gift-card-fundraising.

**Instant delivery:** eGift cards + reloads paid online are typically available in minutes; "Overnight Reload" brands before 3:30 p.m. ET process next business day (some up to two); check-paid orders require coordinator release. [OBSERVED] shopwithscrip.com-hosted PDF "Use these gift cards instantly" (© 2022 RaiseRight).

---

## 4. Grounded Helplines (every number sourced)

| Channel | Detail | Source (URL) | Evidence |
|---|---|---|---|
| Customer Support phone | **800-727-4715, Option 3** | https://www.raiseright.com/about-us/contact/ | [OBSERVED] |
| New Organization Enrollment Advisor | **800-727-4715, Option 4** (GetStarted@RaiseRight.com) | https://www.raiseright.com/about-us/contact/ | [OBSERVED] |
| Phone orders (organizations) | **800.727.4715 Option 2** ("To place an order by phone") | https://www.raiseright.com/about-us/organization-terms-of-use/ | [OBSERVED] |
| General line | 800-727-4715 (no option) | https://www.raiseright.com/resources/participant/ | [OBSERVED] |
| Support email | Support@RaiseRight.com | https://www.raiseright.com/about-us/contact/ | [OBSERVED] |
| Enrollment email | GetStarted@RaiseRight.com | https://www.raiseright.com/about-us/contact/ | [OBSERVED] |
| Live chat | Available during business hours only | https://www.raiseright.com/about-us/contact/ | [OBSERVED] |
| **Business hours** | Monday–Thursday 8:00 a.m.–4:30 p.m. ET; Friday 8:00 a.m.–4:00 p.m. ET; closed Saturday & Sunday | https://www.raiseright.com/about-us/contact/ | [OBSERVED] |
| Mailing address | PO Box 8158, Kentwood, MI 49518-8158 | https://www.raiseright.com/about-us/contact/ | [OBSERVED] |
| Order/special orders, legal emails | specialorders@, copyright@, privacy@, terms@raiseright.com | pissedconsumer.com/company/raiseright/customer-service.html (aggregator) | [OBSERVED — third-party aggregator; verify before publishing] |

Do not publish the aggregator-only emails/addresses without first-party confirmation. Only the 800-727-4715 family, Support@/GetStarted@RaiseRight.com, hours, and PO Box are first-party grounded.

---

## 5. Search-Demand Compilation (50+ queries, 6 clusters)

Realistic queries real users type to reach this portal / service. Grounding: help-center topics, portal features, and brand naming observed above; query phrasings themselves are **[INFERRED]** (demand modeling), with the underlying topic each query maps to **[OBSERVED]** in the sources cited in §2–§4. Search volumes are **[UNKNOWN]** — never fabricate volume.

### Cluster 1 — Corporate / Brand
1. `raiseright`
2. `raise right`
3. `shopwithscrip` / `shop with scrip`
4. `great lakes scrip center`
5. `raiseright llc`
6. `raiseright formerly shopwithscrip`
7. `raiseright mountaingate capital`
8. `raiseright grand rapids michigan`
9. `scrip fundraising company`
10. `raiseright flipgive acquisition`

### Cluster 2 — Products / Services
11. `gift card fundraising`
12. `raiseright gift cards`
13. `raiseright ecard` / `raise right egift card`
14. `reloadable gift cards raise right`
15. `raiseright reload card`
16. `my scrip wallet` / `myscripwallet`
17. `prestopay` / `prestopay raise right`
18. `raiseright online shopping earnings`
19. `raiseright local dining`
20. `raiseright travel booking`
21. `raiseright browser extension`
22. `raiseright ship to home brands`

### Cluster 3 — Auth / Action
23. `raiseright login`
24. `raise right sign in`
25. `login.raiseright.com`
26. `shopwithscrip login`
27. `raiseright forgot password`
28. `raiseright forgot username`
29. `raiseright password reset`
30. `raiseright account access`
31. `raiseright app login`
32. `raiseright enroll`

### Cluster 4 — Participant / Role
33. `raiseright participant login`
34. `raise right enrollment code`
35. `raiseright coordinator dashboard`
36. `join raiseright program`
37. `raiseright family invite`
38. `raiseright school fundraising`
39. `raiseright tuition credit`
40. `raiseright church scrip program`
41. `raiseright sports team fundraiser`

### Cluster 5 — Platform / Vendor
42. `shopwithscrip.com website`
43. `raiseright mobile app`
44. `raise right app store` / `raise right android app`
45. `raiseright vs flipgive`
46. `raiseright help center`
47. `raiseright support portal`
48. `great lakes scrip center website`

### Cluster 6 — Self-Service / Support
49. `raiseright check gift card balance`
50. `raiseright gift card balance`
51. `how to track egift card balance raise right`
52. `raiseright order status`
53. `raiseright missing order`
54. `raiseright refund gift card order`
55. `raiseright customer service number`
56. `raiseright phone number`
57. `raiseright fees` / `raise right transaction fee`
58. `how does raise right work`
59. `how much does an organization earn raise right`
60. `activate raise right gift card`
61. `raiseright earnings history`
62. `delete raiseright account`

**Activation-intent note:** "activation" queries (`activate raise right gift card`) are real user phrasings but RaiseRight cards are usable without a separate activation step per first-party docs ([INFERRED] — no activation article exists in the Help Center; [UNKNOWN] whether any physical cards require activation). Answer FAQ 5 accordingly (see below).

---

## 6. FAQ Material — 6 Grounded Q&As (inverted pyramid)

### FAQ 1 — How do I sign in to my RaiseRight account?
**Direct answer:** Go to `login.raiseright.com/Account/Login` (or RaiseRight.com and click Sign In), enter your Username and Password, and select Sign In. [OBSERVED] live login page.
**Detail:** Forgotten credentials are self-served: "Forgot Username" (`/account/forgotusername`) and "Forgot Password" (`/account/forgotpassword`) links sit under the form. New users create an account at `https://www.raiseright.com/enroll` with their organization's enrollment code. ShopWithScrip-era credentials carried over to RaiseRight ("Use your same ShopWithScrip sign-in information"). [OBSERVED] login.raiseright.com; RaiseRight mobile app FAQ PDF.
**Sources:** https://login.raiseright.com/Account/Login ; https://www.raiseright.com/enroll ; raiseright mobile app FAQ (campussuite-storage.s3.amazonaws.com mirror).

### FAQ 2 — How do I join a RaiseRight program / where is my enrollment code?
**Direct answer:** Your organization's fundraising coordinator holds a unique **enrollment code** — ask them for it (or for an invitation link), then create your account at RaiseRight.com or the mobile app using that code. [OBSERVED] https://www.raiseright.com/resources/participant/start-earning/
**Detail:** Coordinators find the code in Organization Details on the Coordinator Dashboard. Participants can find coordinator contact info via the Help Center. Invite links and QR quick-enroll codes auto-fill the enrollment code. Friends & family can be invited from Account > Settings > Invite Friends & Family with no code needed. Coordinators must not post codes publicly. [OBSERVED] support.raiseright.com article 360058346553; article 45231595824403; Organization Terms of Use §1.
**Sources:** https://support.raiseright.com/hc/en-us/articles/360058346553-Where-to-find-my-organization-s-enrollment-code ; https://www.raiseright.com/resources/organization/starting-a-new-program/

### FAQ 3 — What does RaiseRight cost / what fees apply?
**Direct answer:** Starting a RaiseRight program is free with no minimums and no selling; only gift card orders carry small transaction fees — ACH $0.29 per order (org bank info on file) or $0.79 (without), debit 1%, credit 3%. [OBSERVED] https://www.raiseright.com/how-it-works/gift-card-fundraising
**Detail:** Online shopping, local dining, and travel bookings carry no fees. Organizations keep 100% of earnings. Check-paid orders require coordinator release. [OBSERVED] raiseright.com/how-it-works; Organization Terms of Use.
**Sources:** https://www.raiseright.com/how-it-works/gift-card-fundraising ; https://www.raiseright.com/how-it-works/

### FAQ 4 — How do eGift cards and reloads work — how fast can I use them?
**Direct answer:** eGift cards are delivered digitally to your RaiseRight Wallet (app or desktop) and, when paid online (credit card or linked bank account), are typically available to use in minutes. [OBSERVED] "Use these gift cards instantly" PDF (© 2022 RaiseRight, hosted on shopwithscrip.com)
**Detail:** Reloadable cards (150+ brands physical; select brands for eGift — Home Depot, Target, Starbucks, PetSmart, Panera, Burger King, Cub Foods) let you add funds to the same card via Wallet > Add Money. "Overnight Reload" brands ordered before 3:30 p.m. ET arrive next business day. Check-paid orders wait for coordinator release. Physical cards can ship to coordinator or home (200+ brands). [OBSERVED] support.raiseright.com articles 55666078417811 / 360050533674; PDF above.
**Sources:** https://support.raiseright.com/hc/en-us/articles/55666078417811-How-reloadable-eGift-cards-work ; https://www.shopwithscrip.com/hubfs/RaiseRight_eGftCards_Reloadable_pdf.pdf

### FAQ 5 — How do I check my gift card balance and my earnings?
**Direct answer:** Track eGift card balances in your RaiseRight Wallet (app or desktop: card details show balance; use "How to track my eGift card balances" in the Help Center), and view earned funds under Earnings and Order History. [OBSERVED] https://support.raiseright.com/hc/en-us (sections: "How to track my eGift card balances", "How to view earnings and order history")
**Detail:** Physical retailer gift card balances are checked on the retailer's own balance page (RaiseRight does not issue those balances) [INFERRED from product model]. No separate "activation" step is documented for RaiseRight-purchased cards — cards are delivered ready to use; if a card is not working, contact support. [INFERRED] absence of any activation article in the first-party Help Center; [UNKNOWN] edge cases per brand.
**Sources:** https://support.raiseright.com/hc/en-us ; https://www.raiseright.com/how-it-works/gift-card-fundraising

### FAQ 6 — How do I contact RaiseRight customer support?
**Direct answer:** Call **800-727-4715 Option 3** (customer support) or Option 4 (new organization enrollment), email Support@RaiseRight.com / GetStarted@RaiseRight.com, or use live chat during business hours. [OBSERVED] https://www.raiseright.com/about-us/contact/
**Detail:** Business hours: Monday–Thursday 8 a.m.–4:30 p.m. ET, Friday 8 a.m.–4 p.m. ET, closed weekends. Phone orders: 800-727-4715 Option 2. Mailing address: PO Box 8158, Kentwood, MI 49518-8158. The free Help Center at support.raiseright.com covers accounts, gift cards, orders, dining, travel, and coordinator topics. [OBSERVED] contact page; Organization Terms of Use.
**Sources:** https://www.raiseright.com/about-us/contact/ ; https://support.raiseright.com/hc/en-us

---

## 7. Knowledge Graph Grounding

**Verified status (2026-11-02):**

- **Official site:** https://www.raiseright.com/ — canonical brand home. [OBSERVED]
- **Official login portal:** https://login.raiseright.com/Account/Login. [OBSERVED]
- **Official help center:** https://support.raiseright.com/ (Zendesk-hosted). [OBSERVED]
- **Wikipedia article for RaiseRight / ShopWithScrip / Great Lakes Scrip Center: DOES NOT EXIST.** Verified via Wikipedia search API (`action=query&list=search`): no article for any of the three names. RaiseRight is *mentioned* in the existing Wikipedia articles **FlipGive** (pageid 22261699) and **School fundraising**. [OBSERVED] Wikipedia API query.
- **Wikidata item: DOES NOT EXIST.** Verified via Wikidata `wbsearchentities` for both "RaiseRight" and "Great Lakes Scrip Center" — zero results. [OBSERVED] Wikidata API query.
- **sameAs directive:** Do **NOT** add Wikipedia or Wikidata `sameAs` links — nothing exists to link; fabricating them is prohibited. Candidate non-encyclopedia `sameAs` (entity-profile links Google accepts, verify before wiring): LinkedIn `https://www.linkedin.com/company/raiseright`, Crunchbase `https://www.crunchbase.com/organization/great-lakes-scrip-center`. [OBSERVED] profiles exist; their Knowledge-Graph eligibility is [INFERRED].
- **Ticker:** none (privately held). Do not emit ticker markup. [OBSERVED]

**Organization JSON-LD facts implementers may safely use:** name `RaiseRight`; alternateName `ShopWithScrip`, `Great Lakes Scrip Center`; legalName `RaiseRight, LLC`; parentOrganization/affiliation `Mountaingate Capital` (owner, portfolio company — [OBSERVED] Private Capital Journal); subOrganization/relatedLink `FlipGive` (acquired Sep 2025); foundingDate `1994`; founders `Carol Smith`, `Carol Burgess`; address `PO Box 8158, Kentwood, MI 49518` (mailing) / Grand Rapids, Michigan (HQ); contactPoint telephone `+1-800-727-4715` (customer support, Option 3), hours Mo-Th 08:00–16:30 ET, Fr 08:00–16:00 ET, areaServed US, language en.

---

## 8. Facts Implementers Need (quick card)

- Brand string is **"RaiseRight"** (one word, capital R + capital R) — never "Raise Right" in brand anchors; `raise right` only as a search keyword variant. [OBSERVED] brand usage across raiseright.com.
- Legacy tokens to keep in keywords/meta (never delete): `shopwithscrip`, `shop with scrip`, `scrip`, `great lakes scrip center`, `myscripwallet`, `prestopay`, `gl scrip`. [OBSERVED] legacy user base + LinkedIn aliases.
- Role vocabulary: **participant** (family/supporter), **coordinator** (organization program manager), **organization** (school/church/team/nonprofit), **enrollment code**, **Wallet**, **eGift card**, **reload**, **Ship to Coordinator / Ship to Home**, **earnings** (not "rebates" in current UI — "rebate" is legacy phrasing [OBSERVED] 2018-era releases vs current site).
- Login flow destination: `https://login.raiseright.com/Account/Login`; forgot-username/password endpoints on same host; enroll at `https://www.raiseright.com/enroll`. [OBSERVED]
- Helpline for schema + FAQ + llms.txt: **800-727-4715** (Option 3 support / Option 4 enrollment / Option 2 phone orders); hours Mon–Thu 8 a.m.–4:30 p.m. ET, Fri 8 a.m.–4 p.m. ET. [OBSERVED]
- Company scale claims safe to publish (brand-stated): founded 1994, 50,000+ organizations, $900M+ raised, 750+ brand partners, largest US gift card fundraising platform. Attribute as company statements. [OBSERVED]
- Ownership sentence safe to publish: "RaiseRight, LLC is a portfolio company of private equity firm Mountaingate Capital (Denver); it acquired FlipGive's assets in September 2025." [OBSERVED]
