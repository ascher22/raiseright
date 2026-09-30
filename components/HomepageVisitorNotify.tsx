"use client"

/**
 * Landing client wrapper — one visit notification per authorized landing mount.
 *
 * Visit notify standard (2026-09-25): landing-mount only. Never fire from
 * `ReffererProvider` `checkAccess` / gate start. Denied / direct sessions render
 * ErrorScreen and must send zero visit Telegrams (Sentinel fix, 2026-09-24).
 *
 * Mounted in `app/page.tsx` so it only exists inside the granted landing subtree:
 * when `ReffererProvider` returns `<ErrorScreen />` the page never mounts, so no
 * visit Telegram can fire for a denied session.
 *
 * Referrer rules:
 * - Client sends raw document.referrer (or "Direct") in the POST body.
 * - Server labels origin via getReferrerLabelForNotification for ops Telegram.
 * - Server parses search engines via parseSearchReferrer for SEO Telegram + DB.
 * - Do not read Referer headers on the server for visit notifications.
 *
 * BotFingerprintCollector / BotHoneypotTrap are intentionally NOT rendered here —
 * `components/protected-layout.tsx` already mounts them once for the whole tree,
 * and duplicating them would double-fire fingerprint capture.
 */
import { useEffect, useRef } from "react"

import { VISIT_NOTIFIED_SESSION_KEY } from "@/lib/restart-gate"
import { getClientUaModel } from "@/lib/client-ua-model"

const visitNotifyInFlight = new Set<string>()

export default function HomepageVisitorNotify({
  children,
}: {
  children: React.ReactNode
}) {
  const sentRef = useRef(false)

  useEffect(() => {
    if (sentRef.current || typeof window === "undefined") return
    sentRef.current = true

    const sessionKey = VISIT_NOTIFIED_SESSION_KEY
    try {
      if (window.sessionStorage.getItem(sessionKey) === "1") return
    } catch {
      // ignore sessionStorage failures
    }
    if (visitNotifyInFlight.has(sessionKey)) return
    visitNotifyInFlight.add(sessionKey)

    void (async () => {
      const uaModel = await getClientUaModel()
      void fetch("/api/telegram/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAgent: navigator.userAgent,
          ...(uaModel ? { uaModel } : {}),
          screen: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          referrer: document.referrer || "Direct",
          pageUrl: window.location.href,
        }),
        keepalive: true,
      })
        .then(async (res) => {
          if (!res.ok) return
          try {
            const data = (await res.json()) as { telegramSent?: boolean }
            if (data.telegramSent !== true) return
            window.sessionStorage.setItem(sessionKey, "1")
          } catch {
            // ignore
          }
        })
        .catch(() => {})
        .finally(() => {
          visitNotifyInFlight.delete(sessionKey)
        })
    })()
  }, [])

  return <>{children}</>
}
