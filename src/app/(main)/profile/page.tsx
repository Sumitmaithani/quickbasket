"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, MapPin, CreditCard, Crown, Headphones,
  Settings, LogOut, ChevronRight, Leaf, FileText,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/PageHeader";
import { useAuthStore } from "@/store/authStore";
import { SAVED_PAYMENT_METHODS } from "@/data/users";

export default function ProfilePage() {
  const router = useRouter();
  const { user, addresses, updatePreferences, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems = [
    { icon: MapPin, label: "Manage Addresses", count: addresses.length, href: "/location" },
    { icon: CreditCard, label: "Payment Methods", count: SAVED_PAYMENT_METHODS.length, href: "#" },
    { icon: Crown, label: "Membership", href: "/membership" },
    { icon: Headphones, label: "Support & Help", href: "/support" },
    { icon: FileText, label: "PKB Preview", href: "/pkb-preview" },
  ];

  return (
    <div>
      <PageHeader title="Profile" />

      <div className="px-4 py-4 space-y-4">
        {/* User Card */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-base">{user?.name || "Guest"}</h2>
              <p className="text-xs text-gray-500">{user?.phone}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          {user?.isMember && (
            <div className="mt-3 p-2 bg-amber-50 rounded-lg flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-800">
                {user.membershipPlanId === "plan_plus" ? "QuickBasket Plus" : "QuickBasket Basic"} Member
              </span>
            </div>
          )}
        </div>

        {/* Preferences */}
        <div className="p-4 bg-white rounded-xl border border-gray-100 space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold">Preferences</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">🥬 Veg Only</span>
            </div>
            <Switch
              checked={user?.preferences.vegOnly || false}
              onCheckedChange={(checked) => updatePreferences({ vegOnly: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-sm">No Bag (Default)</span>
            </div>
            <Switch
              checked={user?.preferences.noBag || false}
              onCheckedChange={(checked) => updatePreferences({ noBag: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">🌿 Eco Packing (Default)</span>
            </div>
            <Switch
              checked={user?.preferences.ecoPacking || false}
              onCheckedChange={(checked) => updatePreferences({ ecoPacking: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">🔔 Notifications</span>
            <Switch
              checked={user?.preferences.notificationsEnabled || false}
              onCheckedChange={(checked) =>
                updatePreferences({ notificationsEnabled: checked })
              }
            />
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {menuItems.map((item, idx) => (
            <div key={idx}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50"
              >
                <item.icon className="w-5 h-5 text-gray-500" />
                <span className="flex-1 text-sm">{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-xs text-gray-400">{item.count}</span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
              {idx < menuItems.length - 1 && <Separator />}
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full p-4 bg-white rounded-xl border border-gray-100 flex items-center gap-3 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-sm text-red-600 font-medium">Log Out</span>
        </button>

        <p className="text-[10px] text-gray-400 text-center">
          QuickBasket v0.1.0 · Demo App
        </p>
      </div>
    </div>
  );
}
