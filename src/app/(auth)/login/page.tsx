"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { MobileShell } from "@/components/shared/MobileShell";

export default function LoginPage() {
  const router = useRouter();
  const quickLogin = useAuthStore((s) => s.quickLogin);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setStep("otp");
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    quickLogin();
    router.push("/location");
    setLoading(false);
  };

  const handleSkip = () => {
    quickLogin();
    router.push("/home");
  };

  return (
    <MobileShell hasTabBar={false}>
      <div className="min-h-screen flex flex-col px-6 pt-16 pb-8">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧺</div>
          <h1 className="text-3xl font-bold text-green-600">QuickBasket</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Groceries & essentials in minutes
          </p>
        </div>

        {/* Login Form */}
        <div className="flex-1">
          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                    +91
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 h-12"
                  />
                </div>
              </div>
              <Button
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                onClick={handleSendOtp}
                disabled={phone.length < 10 || loading}
              >
                {loading ? "Sending OTP..." : "Continue"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                We sent a 6-digit code to +91 {phone}
              </p>
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="h-12 text-center text-lg tracking-widest"
                maxLength={6}
              />
              <Button
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                onClick={handleVerifyOtp}
                disabled={otp.length < 4 || loading}
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </Button>
              <button
                onClick={() => setStep("phone")}
                className="text-sm text-green-600 w-full text-center"
              >
                Change phone number
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">or</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={handleSkip}
            >
              Skip to Demo (Auto-login)
            </Button>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 text-center mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          This is a demo app — no real data is collected.
        </p>
      </div>
    </MobileShell>
  );
}
