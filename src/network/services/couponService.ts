import { COUPONS } from "@/data/coupons";
import { Coupon } from "@/types";
import { simulateDelay } from "./delay";

export const CouponService = {
  async getCoupons(): Promise<Coupon[]> {
    await simulateDelay();
    // Return only active, non-hidden coupons
    return COUPONS.filter((c) => c.isActive && c.code !== "HIDDEN99");
  },

  async validateCoupon(
    code: string,
    basketTotal: number,
    isFirstOrder: boolean,
    isMember: boolean,
    _categoryBreakdown: Record<string, number>
  ): Promise<{ valid: boolean; coupon?: Coupon; reason?: string }> {
    await simulateDelay(200, 500);
    const coupon = COUPONS.find((c) => c.code === code.toUpperCase());

    if (!coupon) return { valid: false, reason: "Coupon not found" };
    if (!coupon.isActive) return { valid: false, reason: "This coupon has expired" };

    const now = new Date();
    if (now < new Date(coupon.validFrom) || now > new Date(coupon.validTo)) {
      return { valid: false, reason: "Coupon is not valid at this time" };
    }
    if (coupon.firstOrderOnly && !isFirstOrder) {
      return { valid: false, reason: "This coupon is valid for first orders only" };
    }
    if (coupon.memberOnly && !isMember) {
      return { valid: false, reason: "This coupon is for QuickBasket members only" };
    }
    if (basketTotal < coupon.minBasketValue) {
      return {
        valid: false,
        reason: `Minimum basket value of ₹${coupon.minBasketValue} required`,
      };
    }

    return { valid: true, coupon };
  },

  calculateDiscount(coupon: Coupon, basketTotal: number): number {
    switch (coupon.type) {
      case "flat":
        return coupon.value;
      case "percentage": {
        const discount = Math.floor((basketTotal * coupon.value) / 100);
        return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
      }
      case "free_delivery":
        return 0; // Delivery fee handled separately
      default:
        return 0;
    }
  },
};
