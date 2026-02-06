"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { User, Address, UserPreferences } from "@/types";
import { MOCK_USER, ADDRESSES } from "@/data/users";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  addresses: Address[];
  selectedAddressId: string | null;
  selectedZoneId: string;

  // Actions
  login: (user: User) => void;
  logout: () => void;
  setAddresses: (addresses: Address[]) => void;
  selectAddress: (addressId: string) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setMembership: (planId: string | undefined) => void;
  quickLogin: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        addresses: [],
        selectedAddressId: null,
        selectedZoneId: "zone_1",

        login: (user) =>
          set({
            user,
            isLoggedIn: true,
            addresses: ADDRESSES,
            selectedAddressId: user.defaultAddressId || ADDRESSES[0]?.id,
            selectedZoneId:
              ADDRESSES.find((a) => a.id === user.defaultAddressId)?.zoneId ||
              "zone_1",
          }),

        logout: () =>
          set({
            user: null,
            isLoggedIn: false,
            addresses: [],
            selectedAddressId: null,
          }),

        setAddresses: (addresses) => set({ addresses }),

        selectAddress: (addressId) => {
          const addr = ADDRESSES.find((a) => a.id === addressId);
          set({
            selectedAddressId: addressId,
            selectedZoneId: addr?.zoneId || "zone_1",
          });
        },

        updatePreferences: (prefs) =>
          set((state) => ({
            user: state.user
              ? { ...state.user, preferences: { ...state.user.preferences, ...prefs } }
              : null,
          })),

        setMembership: (planId) =>
          set((state) => ({
            user: state.user
              ? { ...state.user, isMember: !!planId, membershipPlanId: planId }
              : null,
          })),

        quickLogin: () =>
          set({
            user: MOCK_USER,
            isLoggedIn: true,
            addresses: ADDRESSES,
            selectedAddressId: MOCK_USER.defaultAddressId || ADDRESSES[0]?.id,
            selectedZoneId: "zone_1",
          }),
      }),
      { name: "quickbasket-auth" }
    ),
    { name: "AuthStore" }
  )
);
