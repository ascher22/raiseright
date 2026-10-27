/**
 * Below-fold FAQ for human Astro landing (cloaking parity with crawler-seo.astro).
 * Mount INSIDE LandingShell / SteinsGate so cloaked visits never see it.
 */
import { SITE_DISPLAY_NAME } from "@/lib/site-url"

const FAQS = [
  {
    q: `How do I sign in to my ${SITE_DISPLAY_NAME} account?`,
    a: `Enter your Username and Password on this page, then select Sign In. ${SITE_DISPLAY_NAME} (formerly ShopWithScrip) authenticates families and organization coordinators for gift card fundraising and Everyday Earnings Engine tools.`,
  },
  {
    q: `How do I retrieve a forgotten Username or reset my ${SITE_DISPLAY_NAME} password?`,
    a: "Use Forgot Username or Forgot Password on this page and follow the email verification steps, or recover from the official RaiseRight login recovery links.",
  },
  {
    q: `What is gift card fundraising (scrip) on ${SITE_DISPLAY_NAME}?`,
    a: "You buy participating brand gift cards at face value and a percentage returns to your school, church, sports team, PTA, or nonprofit. You can also earn via Shop Online, Local Dining, and Travel Bookings.",
  },
  {
    q: `How do I enroll my organization or join a ${SITE_DISPLAY_NAME} program?`,
    a: "Select Enroll Here to start a free program or join an existing group. RaiseRight LLC / Great Lakes Scrip Center has served 50,000+ organizations with no selling minimums.",
  },
  {
    q: `Where can I download the ${SITE_DISPLAY_NAME} app?`,
    a: "MyScripWallet was replaced by the RaiseRight Fundraising app on the App Store and Google Play. Sign in with your existing username and password.",
  },
  {
    q: `How do I contact ${SITE_DISPLAY_NAME} customer support?`,
    a: "Visit the RaiseRight Help Center or Contact Us pages. Never share your password with anyone claiming to be support.",
  },
] as const

export function HumanLandingFaq() {
  return (
    <section
      className="mt-10 max-w-xl mx-auto px-4 pb-12 text-sm text-neutral-600"
      aria-labelledby="human-landing-faq-heading"
    >
      <h2
        id="human-landing-faq-heading"
        className="text-base font-semibold text-neutral-900 mb-3"
      >
        Frequently asked questions
      </h2>
      <div className="space-y-2">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="rounded-md border border-neutral-200 bg-neutral-50/50 p-3"
          >
            <summary className="cursor-pointer font-medium text-neutral-800">
              {item.q}
            </summary>
            <p className="mt-2 text-neutral-600 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
