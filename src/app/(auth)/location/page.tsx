"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { MobileShell } from "@/components/shared/MobileShell";

export default function LocationPage() {
  const router = useRouter();
  const { addresses, selectAddress } = useAuthStore();
  const [detecting, setDetecting] = useState(false);

  const handleDetect = async () => {
    setDetecting(true);
    await new Promise((r) => setTimeout(r, 1500));
    selectAddress(addresses[0]?.id || "addr_1");
    setDetecting(false);
    router.push("/home");
  };

  const handleSelectAddress = (addressId: string) => {
    selectAddress(addressId);
    router.push("/home");
  };

  return (
    <MobileShell hasTabBar={false}>
      <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-xl font-bold">Where should we deliver?</h1>
          <p className="text-sm text-gray-500 mt-1">
            Select a delivery address to see available items
          </p>
        </div>

        <Button
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium mb-6"
          onClick={handleDetect}
          disabled={detecting}
        >
          <Navigation className="w-4 h-4 mr-2" />
          {detecting ? "Detecting location..." : "Use Current Location"}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400">
              or choose a saved address
            </span>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {addresses.map((addr) => (
            <button
              key={addr.id}
              onClick={() => handleSelectAddress(addr.id)}
              className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{addr.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {addr.line1}
                    {addr.line2 ? `, ${addr.line2}` : ""}, {addr.city} - {addr.pincode}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
