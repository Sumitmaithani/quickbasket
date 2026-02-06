/**
 * URL Constants for QuickBasket API
 * In production these would point to real API endpoints.
 * Currently they serve as labels for mock service functions.
 */

export const API_BASE = "/api/v1";

export const URLs = {
  // Auth
  AUTH_LOGIN: `${API_BASE}/auth/login`,
  AUTH_VERIFY_OTP: `${API_BASE}/auth/verify-otp`,
  AUTH_LOGOUT: `${API_BASE}/auth/logout`,

  // User
  USER_PROFILE: `${API_BASE}/user/profile`,
  USER_ADDRESSES: `${API_BASE}/user/addresses`,
  USER_PREFERENCES: `${API_BASE}/user/preferences`,
  USER_PAYMENT_METHODS: `${API_BASE}/user/payment-methods`,

  // Catalog
  CATEGORIES: `${API_BASE}/catalog/categories`,
  ITEMS: `${API_BASE}/catalog/items`,
  ITEM_DETAIL: `${API_BASE}/catalog/items/:id`,
  SEARCH: `${API_BASE}/catalog/search`,

  // Inventory
  INVENTORY_CHECK: `${API_BASE}/inventory/check`,

  // Cart
  CART: `${API_BASE}/cart`,
  CART_APPLY_COUPON: `${API_BASE}/cart/apply-coupon`,
  CART_REMOVE_COUPON: `${API_BASE}/cart/remove-coupon`,

  // Coupons
  COUPONS: `${API_BASE}/coupons`,

  // Checkout
  CHECKOUT: `${API_BASE}/checkout`,
  DELIVERY_SLOTS: `${API_BASE}/checkout/delivery-slots`,

  // Orders
  ORDERS: `${API_BASE}/orders`,
  ORDER_DETAIL: `${API_BASE}/orders/:id`,
  ORDER_CANCEL: `${API_BASE}/orders/:id/cancel`,

  // Payments
  PAYMENT_INITIATE: `${API_BASE}/payments/initiate`,
  PAYMENT_STATUS: `${API_BASE}/payments/:id/status`,

  // Support
  SUPPORT_TICKETS: `${API_BASE}/support/tickets`,
  SUPPORT_TICKET_DETAIL: `${API_BASE}/support/tickets/:id`,
  SUPPORT_TICKET_MESSAGE: `${API_BASE}/support/tickets/:id/message`,

  // Membership
  MEMBERSHIP_PLANS: `${API_BASE}/membership/plans`,
  MEMBERSHIP_SUBSCRIBE: `${API_BASE}/membership/subscribe`,
  MEMBERSHIP_CANCEL: `${API_BASE}/membership/cancel`,

  // Banners
  BANNERS: `${API_BASE}/banners`,

  // Zones
  ZONES: `${API_BASE}/zones`,
} as const;
