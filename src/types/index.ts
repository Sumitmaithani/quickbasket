// ==========================================
// QuickBasket — Core Type Definitions
// ==========================================

// ---------- User & Auth ----------
export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  isMember: boolean;
  membershipPlanId?: string;
  preferences: UserPreferences;
  defaultAddressId?: string;
  createdAt: string;
}

export interface UserPreferences {
  vegOnly: boolean;
  noBag: boolean;
  ecoPacking: boolean;
  notificationsEnabled: boolean;
}

// ---------- Address & Zone ----------
export interface Address {
  id: string;
  userId: string;
  label: string; // "Home" | "Office" | custom
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  zoneId: string;
  isDefault: boolean;
}

export interface Zone {
  id: string;
  name: string;
  code: string;
  city: string;
  isActive: boolean;
  deliveryRadiusKm: number;
  avgDeliveryMinutes: number;
}

// ---------- Category & Item ----------
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  imageUrl: string;
  itemCount: number;
  sortOrder: number;
}

export type ItemVariant = {
  id: string;
  label: string; // e.g. "500g", "1kg", "6 pack"
  price: number;
  mrp: number;
  isDefault: boolean;
};

export interface Item {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categorySlug: string;
  description: string;
  imageUrl: string;
  unit: string;
  variants: ItemVariant[];
  tags: string[]; // "bestseller", "organic", "new"
  isVeg: boolean;
  brand: string;
  rating: number;
  ratingCount: number;
  frequentlyBought: boolean;
}

// ---------- Inventory ----------
export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface InventoryRecord {
  itemId: string;
  variantId: string;
  zoneId: string;
  quantity: number;
  status: InventoryStatus;
  lastSyncedAt: string;
  /** Simulates stale inventory — true means the item might flip at checkout */
  hasSyncDelay: boolean;
}

// ---------- Cart ----------
export interface CartItem {
  itemId: string;
  variantId: string;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  mrp: number;
  unit: string;
}

export interface Cart {
  items: CartItem[];
  appliedCouponId?: string;
  packingPreference: "standard" | "no_bag" | "eco_friendly";
  deliveryInstructions?: string;
}

// ---------- Coupon ----------
export type CouponType = "flat" | "percentage" | "free_delivery";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number; // flat amount or percentage
  maxDiscount?: number;
  minBasketValue: number;
  categoryOnly?: string; // category id, if restricted
  firstOrderOnly: boolean;
  memberOnly: boolean;
  validFrom: string;
  validTo: string;
  description: string;
  terms: string;
  isActive: boolean;
}

// ---------- Payment ----------
export type PaymentMethod = "upi" | "card" | "wallet" | "cod" | "netbanking";
export type PaymentStatus = "initiated" | "success" | "failed" | "refund_initiated" | "refunded";

export interface Payment {
  id: string;
  orderId?: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  /** Edge case: payment succeeded but order creation failed */
  orderCreationFailed?: boolean;
}

export interface SavedPaymentMethod {
  id: string;
  userId: string;
  method: PaymentMethod;
  label: string; // "HDFC Visa ****1234"
  isDefault: boolean;
}

// ---------- Order ----------
export type OrderStatus =
  | "created"
  | "confirmed"
  | "packing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refund_initiated"
  | "refunded";

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface OrderItem {
  itemId: string;
  variantId: string;
  name: string;
  imageUrl: string;
  price: number;
  mrp: number;
  quantity: number;
  unit: string;
  /** Was this item substituted? */
  substitutedWith?: string;
  /** Was this item found unavailable during packing? */
  unavailableAtPacking?: boolean;
}

export interface DeliverySlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  isExpress: boolean;
  fee: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  addressId: string;
  zoneId: string;
  status: OrderStatus;
  timeline: OrderTimeline[];
  deliverySlotId: string;
  estimatedDeliveryMinutes: number;
  /** ETA changed after placing order? */
  etaChangedAfterOrder: boolean;
  originalEtaMinutes?: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  packingFee: number;
  total: number;
  paymentId: string;
  couponId?: string;
  packingPreference: "standard" | "no_bag" | "eco_friendly";
  deliveryInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Support Ticket ----------
export type TicketCategory =
  | "missing_item"
  | "damaged_item"
  | "wrong_item"
  | "late_delivery"
  | "refund_delay"
  | "payment_issue"
  | "order_not_created"
  | "eta_changed"
  | "coupon_issue"
  | "membership_issue"
  | "address_issue"
  | "packing_issue"
  | "other";

export type TicketSeverity = "low" | "medium" | "high" | "critical";
export type TicketStatus = "open" | "in_progress" | "waiting_on_customer" | "resolved" | "closed";
export type TicketResolution = "refund" | "replacement" | "credit" | "explanation" | "no_action" | "pending";

export interface TicketMessage {
  id: string;
  sender: "customer" | "agent";
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  orderId?: string;
  category: TicketCategory;
  severity: TicketSeverity;
  status: TicketStatus;
  resolution: TicketResolution;
  subject: string;
  description: string;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

// ---------- Membership ----------
export interface MembershipBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: "basic" | "plus";
  monthlyPrice: number;
  annualPrice: number;
  benefits: MembershipBenefit[];
  freeDeliveryAbove: number;
  prioritySupport: boolean;
  exclusiveDeals: boolean;
  maxCashbackPercent: number;
  trialDays: number;
}

// ---------- Banner ----------
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  bgColor: string;
  linkTo: string;
  isActive: boolean;
}

// ---------- Analytics (for reference) ----------
export interface AnalyticsEvent {
  name: string;
  properties: Record<string, string | number | boolean>;
  timestamp: string;
}
