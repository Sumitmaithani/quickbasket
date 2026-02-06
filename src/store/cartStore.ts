"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { CartItem, Coupon } from "@/types";

interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  packingPreference: "standard" | "no_bag" | "eco_friendly";
  deliveryInstructions: string;

  // Computed-like
  itemCount: () => number;
  subtotal: () => number;
  discount: () => number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string, variantId: string) => void;
  updateQuantity: (itemId: string, variantId: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  setPackingPreference: (pref: "standard" | "no_bag" | "eco_friendly") => void;
  setDeliveryInstructions: (instructions: string) => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        appliedCoupon: null,
        packingPreference: "standard",
        deliveryInstructions: "",

        itemCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

        subtotal: () =>
          get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

        discount: () => {
          const coupon = get().appliedCoupon;
          if (!coupon) return 0;
          const sub = get().subtotal();
          switch (coupon.type) {
            case "flat":
              return coupon.value;
            case "percentage": {
              const d = Math.floor((sub * coupon.value) / 100);
              return coupon.maxDiscount ? Math.min(d, coupon.maxDiscount) : d;
            }
            case "free_delivery":
              return 0;
            default:
              return 0;
          }
        },

        addItem: (item) =>
          set((state) => {
            const existing = state.items.find(
              (i) => i.itemId === item.itemId && i.variantId === item.variantId
            );
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.itemId === item.itemId && i.variantId === item.variantId
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                ),
              };
            }
            return { items: [...state.items, item] };
          }),

        removeItem: (itemId, variantId) =>
          set((state) => ({
            items: state.items.filter(
              (i) => !(i.itemId === itemId && i.variantId === variantId)
            ),
          })),

        updateQuantity: (itemId, variantId, qty) =>
          set((state) => {
            if (qty <= 0) {
              return {
                items: state.items.filter(
                  (i) => !(i.itemId === itemId && i.variantId === variantId)
                ),
              };
            }
            return {
              items: state.items.map((i) =>
                i.itemId === itemId && i.variantId === variantId
                  ? { ...i, quantity: qty }
                  : i
              ),
            };
          }),

        clearCart: () =>
          set({
            items: [],
            appliedCoupon: null,
            packingPreference: "standard",
            deliveryInstructions: "",
          }),

        applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
        removeCoupon: () => set({ appliedCoupon: null }),

        setPackingPreference: (pref) => set({ packingPreference: pref }),
        setDeliveryInstructions: (instructions) =>
          set({ deliveryInstructions: instructions }),
      }),
      { name: "quickbasket-cart" }
    ),
    { name: "CartStore" }
  )
);
