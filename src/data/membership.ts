import { MembershipPlan } from "@/types";

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "plan_basic",
    name: "QuickBasket Basic",
    tier: "basic",
    monthlyPrice: 49,
    annualPrice: 399,
    benefits: [
      { icon: "🚚", title: "Free Delivery", description: "Free delivery on orders above ₹199" },
      { icon: "🎫", title: "Exclusive Coupons", description: "Access to member-only coupon codes" },
      { icon: "💰", title: "5% Cashback", description: "Earn 5% cashback on every order (as store credits)" },
      { icon: "⚡", title: "Early Access", description: "Get early access to flash sales and new arrivals" },
    ],
    freeDeliveryAbove: 199,
    prioritySupport: false,
    exclusiveDeals: true,
    maxCashbackPercent: 5,
    trialDays: 7,
  },
  {
    id: "plan_plus",
    name: "QuickBasket Plus",
    tier: "plus",
    monthlyPrice: 149,
    annualPrice: 1199,
    benefits: [
      { icon: "🚚", title: "Free Delivery Always", description: "Free delivery on ALL orders — no minimum" },
      { icon: "⚡", title: "Priority Delivery", description: "Get your orders delivered first, even during peak hours" },
      { icon: "📞", title: "Priority Support", description: "Skip the queue — connect with support instantly" },
      { icon: "💰", title: "10% Cashback", description: "Earn 10% cashback on every order (as store credits)" },
      { icon: "🎫", title: "Exclusive Deals", description: "Plus-only deals and secret coupon codes" },
      { icon: "🔄", title: "Free Replacements", description: "Get instant free replacement for damaged or wrong items" },
      { icon: "🎁", title: "Birthday Surprise", description: "Special reward on your birthday month" },
      { icon: "🧊", title: "Free Express Slots", description: "Access to free 10-minute express delivery slots" },
    ],
    freeDeliveryAbove: 0,
    prioritySupport: true,
    exclusiveDeals: true,
    maxCashbackPercent: 10,
    trialDays: 14,
  },
];
