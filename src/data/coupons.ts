import { Coupon } from "@/types";

export const COUPONS: Coupon[] = [
  {
    id: "coup_1", code: "WELCOME50", type: "flat", value: 50, minBasketValue: 199,
    firstOrderOnly: true, memberOnly: false, validFrom: "2025-01-01", validTo: "2026-12-31",
    description: "₹50 off on your first order", terms: "Valid on first order only. Min basket value ₹199. Cannot be combined with other offers.",
    isActive: true,
  },
  {
    id: "coup_2", code: "FRESH20", type: "percentage", value: 20, maxDiscount: 100, minBasketValue: 299,
    categoryOnly: "cat_1", firstOrderOnly: false, memberOnly: false,
    validFrom: "2025-06-01", validTo: "2026-12-31",
    description: "20% off on Fruits & Vegetables", terms: "Valid on Fruits & Vegetables category only. Max discount ₹100. Min basket value ₹299.",
    isActive: true,
  },
  {
    id: "coup_3", code: "FREEDELIVERY", type: "free_delivery", value: 0, minBasketValue: 149,
    firstOrderOnly: false, memberOnly: false, validFrom: "2025-01-01", validTo: "2026-06-30",
    description: "Free delivery on orders above ₹149", terms: "Free delivery on all orders above ₹149. Not valid with express delivery.",
    isActive: true,
  },
  {
    id: "coup_4", code: "DAIRY15", type: "percentage", value: 15, maxDiscount: 75, minBasketValue: 199,
    categoryOnly: "cat_2", firstOrderOnly: false, memberOnly: false,
    validFrom: "2025-03-01", validTo: "2026-12-31",
    description: "15% off on Dairy & Breakfast", terms: "Valid on Dairy & Breakfast category only. Max discount ₹75.",
    isActive: true,
  },
  {
    id: "coup_5", code: "MEMBER100", type: "flat", value: 100, minBasketValue: 499,
    firstOrderOnly: false, memberOnly: true, validFrom: "2025-01-01", validTo: "2026-12-31",
    description: "₹100 off for QuickBasket members", terms: "Exclusive for QuickBasket Plus or Basic members. Min basket value ₹499.",
    isActive: true,
  },
  {
    id: "coup_6", code: "SNACK25", type: "percentage", value: 25, maxDiscount: 125, minBasketValue: 249,
    categoryOnly: "cat_3", firstOrderOnly: false, memberOnly: false,
    validFrom: "2025-09-01", validTo: "2026-03-31",
    description: "25% off on Snacks & Beverages", terms: "Valid on Snacks & Beverages only. Max discount ₹125. Min basket ₹249.",
    isActive: true,
  },
  {
    id: "coup_7", code: "FLAT200", type: "flat", value: 200, minBasketValue: 999,
    firstOrderOnly: false, memberOnly: false, validFrom: "2026-01-01", validTo: "2026-03-31",
    description: "Flat ₹200 off on orders above ₹999", terms: "Min basket value ₹999. Valid on all categories. Limited period offer.",
    isActive: true,
  },
  {
    id: "coup_8", code: "WEEKEND30", type: "percentage", value: 30, maxDiscount: 150, minBasketValue: 399,
    firstOrderOnly: false, memberOnly: false, validFrom: "2026-02-01", validTo: "2026-02-28",
    description: "30% off this weekend!", terms: "Valid on weekends only (Sat-Sun). Max discount ₹150. Min basket ₹399. The system does NOT currently enforce the weekend-only constraint — known issue.",
    isActive: true,
  },
  {
    id: "coup_9", code: "ECO10", type: "flat", value: 10, minBasketValue: 0,
    firstOrderOnly: false, memberOnly: false, validFrom: "2025-01-01", validTo: "2026-12-31",
    description: "₹10 off for choosing no-bag delivery", terms: "Select 'no bag' packing preference to activate. Auto-applied at checkout if eligible. Often confuses users because the condition is not visible upfront.",
    isActive: true,
  },
  {
    id: "coup_10", code: "CARE20", type: "percentage", value: 20, maxDiscount: 80, minBasketValue: 299,
    categoryOnly: "cat_5", firstOrderOnly: false, memberOnly: false,
    validFrom: "2025-06-01", validTo: "2026-12-31",
    description: "20% off on Personal Care", terms: "Valid on Personal Care category only. Max discount ₹80.",
    isActive: true,
  },
  {
    id: "coup_11", code: "EXPIRED50", type: "flat", value: 50, minBasketValue: 199,
    firstOrderOnly: false, memberOnly: false, validFrom: "2024-01-01", validTo: "2025-01-31",
    description: "₹50 off — expired promo", terms: "This coupon has expired.",
    isActive: false,
  },
  {
    id: "coup_12", code: "HIDDEN99", type: "flat", value: 99, minBasketValue: 599,
    firstOrderOnly: false, memberOnly: true, validFrom: "2026-01-01", validTo: "2026-06-30",
    description: "Secret ₹99 off for members", terms: "This coupon is not shown in the app listing. Users must know the code. For members only. Min basket ₹599.",
    isActive: true,
  },
];
