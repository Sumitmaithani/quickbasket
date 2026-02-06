"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RootPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="text-5xl mb-4">🧺</div>
        <h1 className="text-2xl font-bold text-green-600">QuickBasket</h1>
        <p className="text-sm text-gray-500 mt-1">Loading...</p>
      </div>
    </div>
  );
}
