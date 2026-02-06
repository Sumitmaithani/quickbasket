# 06 — Analytics Events

> Complete analytics event catalog for QuickBasket.
> All events conform to the `AnalyticsEvent` interface defined in `src/types/index.ts`.
> Last updated: 2026-02-06

---

## Table of Contents

1. [Event Naming Conventions](#event-naming-conventions)
2. [Auth & Onboarding Events](#1-auth--onboarding-events)
3. [Home & Discovery Events](#2-home--discovery-events)
4. [Product Browsing Events](#3-product-browsing-events)
5. [Cart Events](#4-cart-events)
6. [Checkout Events](#5-checkout-events)
7. [Order Lifecycle Events](#6-order-lifecycle-events)
8. [Support Events](#7-support-events)
9. [Membership Events](#8-membership-events)
10. [Refund Events](#9-refund-events)
11. [Common Properties](#common-properties)

---

## Event Naming Conventions

- All event names use **snake_case** (e.g., `add_to_cart`, `order_placed`).
- Events follow the pattern: `{noun}_{verb_past_tense}` or `{action}_{context}`.
- Every event includes a `timestamp` (ISO 8601) automatically.
- Properties use snake_case keys and primitive values (`string`, `number`, `boolean`).

---

## 1. Auth & Onboarding Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `app_open` | User opens the app (cold or warm start) | `session_id: string`, `is_logged_in: boolean`, `app_version: string`, `platform: string`, `zone_id: string` | Fired on every app launch. `zone_id` is empty if location not yet set. |
| `login_start` | User taps "Login" or is redirected to login screen | `session_id: string`, `entry_point: string` | `entry_point`: `"splash"`, `"cart"`, `"checkout"`, `"profile"` — where the login was initiated from. |
| `otp_sent` | OTP is dispatched to user's phone number | `session_id: string`, `phone_masked: string`, `otp_method: string` | `phone_masked`: last 4 digits only (e.g., `"****3210"`). `otp_method`: `"sms"` or `"whatsapp"`. |
| `login_success` | User successfully logs in (OTP verified) | `session_id: string`, `user_id: string`, `is_new_user: boolean`, `login_method: string` | `is_new_user`: `true` for first-time registrations. `login_method`: `"otp_sms"` or `"otp_whatsapp"`. |
| `location_selected` | User selects or confirms a delivery location | `session_id: string`, `user_id: string`, `zone_id: string`, `zone_name: string`, `address_id: string`, `is_new_address: boolean`, `selection_method: string` | `selection_method`: `"map_pin"`, `"saved_address"`, `"search"`, `"gps_auto"`. Fired both during onboarding and when switching addresses. |

---

## 2. Home & Discovery Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `home_viewed` | Home screen fully loaded and visible | `session_id: string`, `user_id: string`, `zone_id: string`, `is_member: boolean`, `banner_count: number`, `category_count: number` | Fired once per home screen view (not on background resume). |
| `banner_clicked` | User taps a promotional banner | `session_id: string`, `user_id: string`, `banner_id: string`, `banner_title: string`, `banner_position: number`, `link_to: string` | `banner_position`: 0-indexed position in the carousel. |
| `category_viewed` | User opens a category listing page | `session_id: string`, `user_id: string`, `category_id: string`, `category_name: string`, `category_slug: string`, `item_count: number`, `source: string` | `source`: `"home_grid"`, `"search"`, `"banner"`, `"deep_link"`. |
| `search_performed` | User submits a search query | `session_id: string`, `user_id: string`, `query: string`, `result_count: number`, `zone_id: string` | Fired on search submission (not on each keystroke). `result_count` is the total matching items. |
| `search_result_clicked` | User taps on a search result item | `session_id: string`, `user_id: string`, `query: string`, `item_id: string`, `item_name: string`, `result_position: number` | `result_position`: 0-indexed rank in search results. |

---

## 3. Product Browsing Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `item_viewed` | Item detail page is opened | `session_id: string`, `user_id: string`, `item_id: string`, `item_name: string`, `category_id: string`, `category_name: string`, `price: number`, `mrp: number`, `variant_id: string`, `is_in_stock: boolean`, `source: string` | `source`: `"category_list"`, `"search"`, `"home_frequently_bought"`, `"banner"`, `"deep_link"`. Price/variant reflect the default variant. |
| `variant_selected` | User selects a different size/quantity variant | `session_id: string`, `user_id: string`, `item_id: string`, `item_name: string`, `variant_id: string`, `variant_label: string`, `price: number`, `mrp: number`, `previous_variant_id: string` | Fired only when user actively changes the variant (not on page load with default). |
| `add_to_cart` | User adds an item to the cart | `session_id: string`, `user_id: string`, `item_id: string`, `item_name: string`, `variant_id: string`, `variant_label: string`, `price: number`, `quantity: number`, `category_id: string`, `source: string`, `cart_size_after: number` | `source`: `"item_detail"`, `"category_list"`, `"search_results"`, `"home_page"`. `cart_size_after`: total items in cart after adding. |
| `remove_from_cart` | User removes an item entirely from the cart | `session_id: string`, `user_id: string`, `item_id: string`, `item_name: string`, `variant_id: string`, `price: number`, `quantity_removed: number`, `cart_size_after: number`, `source: string` | `source`: `"cart_page"`, `"item_detail"`. |
| `quantity_changed` | User changes the quantity of a cart item (increment/decrement) | `session_id: string`, `user_id: string`, `item_id: string`, `item_name: string`, `variant_id: string`, `old_quantity: number`, `new_quantity: number`, `price: number`, `source: string` | `source`: `"cart_page"`, `"item_detail"`, `"category_list"`. Not fired when quantity reaches 0 (that's `remove_from_cart`). |

---

## 4. Cart Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `cart_viewed` | User navigates to the cart screen | `session_id: string`, `user_id: string`, `cart_item_count: number`, `cart_subtotal: number`, `has_coupon: boolean`, `coupon_id: string`, `packing_preference: string` | Fired each time the cart screen is viewed. |
| `coupon_applied` | User successfully applies a coupon code | `session_id: string`, `user_id: string`, `coupon_id: string`, `coupon_code: string`, `coupon_type: string`, `discount_amount: number`, `cart_subtotal: number`, `source: string` | `source`: `"manual_entry"`, `"coupon_list"`, `"auto_applied"`. `discount_amount` is the calculated discount in ₹. |
| `coupon_failed` | User attempts to apply a coupon but it fails | `session_id: string`, `user_id: string`, `coupon_code: string`, `failure_reason: string`, `cart_subtotal: number`, `is_member: boolean` | `failure_reason`: `"expired"`, `"min_basket_not_met"`, `"member_only"`, `"first_order_only"`, `"category_mismatch"`, `"already_used"`, `"invalid_code"`. Critical for diagnosing coupon UX issues. |
| `coupon_removed` | User removes an applied coupon | `session_id: string`, `user_id: string`, `coupon_id: string`, `coupon_code: string`, `discount_lost: number` | `discount_lost`: the discount amount that was removed. |
| `packing_preference_changed` | User changes the packing preference | `session_id: string`, `user_id: string`, `old_preference: string`, `new_preference: string` | Values: `"standard"`, `"no_bag"`, `"eco_friendly"`. |

---

## 5. Checkout Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `checkout_started` | User initiates checkout (taps "Proceed to checkout") | `session_id: string`, `user_id: string`, `cart_item_count: number`, `cart_subtotal: number`, `discount: number`, `delivery_fee: number`, `total: number`, `has_coupon: boolean`, `coupon_id: string`, `packing_preference: string`, `address_id: string`, `zone_id: string` | Snapshot of the cart state at checkout initiation. |
| `delivery_slot_selected` | User selects a delivery time slot | `session_id: string`, `user_id: string`, `slot_id: string`, `slot_label: string`, `is_express: boolean`, `slot_fee: number`, `previous_slot_id: string` | Fired on slot change. `previous_slot_id` is empty on first selection. |
| `payment_method_selected` | User selects a payment method | `session_id: string`, `user_id: string`, `payment_method: string`, `is_saved_method: boolean`, `saved_method_id: string` | `payment_method`: `"upi"`, `"card"`, `"wallet"`, `"cod"`, `"netbanking"`. |
| `order_placed` | Order is successfully created after payment | `session_id: string`, `user_id: string`, `order_id: string`, `payment_id: string`, `payment_method: string`, `total: number`, `item_count: number`, `coupon_id: string`, `delivery_slot_id: string`, `is_express: boolean`, `zone_id: string`, `is_member: boolean`, `packing_preference: string`, `estimated_delivery_minutes: number` | The most critical conversion event. Indicates a completed purchase. |
| `order_placement_failed` | Order creation fails (after payment attempt) | `session_id: string`, `user_id: string`, `payment_id: string`, `payment_status: string`, `error_type: string`, `error_message: string`, `cart_total: number` | `error_type`: `"payment_failed"`, `"order_creation_failed"`, `"timeout"`, `"stock_unavailable"`, `"network_error"`. Critical for debugging orphaned payments. |

---

## 6. Order Lifecycle Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `order_viewed` | User opens the order detail screen | `session_id: string`, `user_id: string`, `order_id: string`, `order_status: string`, `item_count: number`, `total: number`, `time_since_placed_minutes: number` | Fired each time the order detail is viewed. Useful for tracking anxious-refresh patterns. |
| `order_cancelled` | User cancels an order | `session_id: string`, `user_id: string`, `order_id: string`, `order_status_at_cancel: string`, `cancellation_fee: number`, `refund_amount: number`, `cancel_reason: string`, `time_since_placed_minutes: number` | `order_status_at_cancel`: `"created"`, `"confirmed"`, `"packing"`. `cancel_reason`: user-selected reason. `cancellation_fee`: ₹0 or ₹25. |
| `order_delivered` | Order is marked as delivered (system event) | `session_id: string`, `user_id: string`, `order_id: string`, `total: number`, `item_count: number`, `delivery_time_minutes: number`, `estimated_delivery_minutes: number`, `eta_was_changed: boolean`, `zone_id: string`, `had_unavailable_items: boolean`, `had_substitutions: boolean` | `delivery_time_minutes`: actual time from order creation to delivery. Compare with `estimated_delivery_minutes` for SLA tracking. |

---

## 7. Support Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `support_ticket_created` | User creates a new support ticket | `session_id: string`, `user_id: string`, `ticket_id: string`, `category: string`, `severity: string`, `order_id: string`, `subject: string` | `order_id` may be empty for non-order-related tickets. `category` matches `TicketCategory` enum values. |
| `support_message_sent` | User sends a message in a support ticket thread | `session_id: string`, `user_id: string`, `ticket_id: string`, `message_id: string`, `ticket_status: string`, `message_count: number` | `message_count`: total messages in the thread after this one. Tracks engagement depth. |
| `ticket_resolved` | Support ticket is marked as resolved | `session_id: string`, `user_id: string`, `ticket_id: string`, `category: string`, `resolution: string`, `time_to_resolve_hours: number`, `message_count: number` | `resolution` matches `TicketResolution` enum. `time_to_resolve_hours`: hours from creation to resolution. |

---

## 8. Membership Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `membership_page_viewed` | User views the membership plans page | `session_id: string`, `user_id: string`, `is_member: boolean`, `current_plan: string`, `source: string` | `source`: `"profile"`, `"home_banner"`, `"checkout_upsell"`, `"coupon_prompt"`, `"deep_link"`. `current_plan`: `"none"`, `"basic"`, `"plus"`. |
| `membership_subscribed` | User subscribes to a membership plan | `session_id: string`, `user_id: string`, `plan_id: string`, `plan_tier: string`, `billing_cycle: string`, `price: number`, `is_trial: boolean`, `previous_plan: string` | `billing_cycle`: `"monthly"` or `"annual"`. `is_trial`: `true` for free trial activations. `previous_plan`: `"none"` for new members, or previous tier for upgrades. |
| `membership_cancelled` | User cancels their membership (auto-renew off) | `session_id: string`, `user_id: string`, `plan_id: string`, `plan_tier: string`, `membership_duration_days: number`, `cancel_reason: string` | `membership_duration_days`: how long the user was a member. `cancel_reason`: user-selected reason from cancellation flow. |

---

## 9. Refund Events

| Event Name | Trigger | Key Properties | Notes |
|---|---|---|---|
| `refund_initiated` | A refund is initiated for an order | `session_id: string`, `user_id: string`, `order_id: string`, `payment_id: string`, `refund_amount: number`, `refund_reason: string`, `initiated_by: string` | `refund_reason`: `"customer_cancellation"`, `"store_cancellation"`, `"damaged_item"`, `"wrong_item"`, `"missing_item"`, `"orphaned_payment"`. `initiated_by`: `"customer"`, `"agent"`, `"system"`. |
| `refund_completed` | Refund is successfully processed and completed | `session_id: string`, `user_id: string`, `order_id: string`, `payment_id: string`, `refund_amount: number`, `refund_method: string`, `time_to_refund_hours: number` | `refund_method`: `"upi"`, `"card"`, `"wallet"`, `"store_credit"`. `time_to_refund_hours`: hours from initiation to completion. Critical metric for SLA tracking. |

---

## Common Properties

These properties are included automatically in **every** event:

| Property | Type | Description |
|---|---|---|
| `timestamp` | `string` (ISO 8601) | When the event occurred |
| `session_id` | `string` | Unique session identifier for grouping events in a single app session |
| `app_version` | `string` | Current app version (auto-populated) |
| `platform` | `string` | `"web"`, `"ios"`, `"android"` |
| `device_type` | `string` | `"mobile"`, `"tablet"`, `"desktop"` |

---

## Event Flow Summary

### Happy Path: Browse → Purchase → Delivery

```
app_open
  → login_start → otp_sent → login_success
  → location_selected
  → home_viewed
  → category_viewed
  → item_viewed → variant_selected → add_to_cart
  → cart_viewed → coupon_applied
  → checkout_started → delivery_slot_selected → payment_method_selected
  → order_placed
  → order_viewed (polling)
  → order_delivered
```

### Error Path: Failed Order

```
checkout_started
  → payment_method_selected
  → order_placement_failed (error_type: "payment_failed")
  [retry]
  → order_placement_failed (error_type: "order_creation_failed")
  → support_ticket_created (category: "payment_issue")
  → refund_initiated → refund_completed
```

### Cancellation Path

```
order_viewed
  → order_cancelled (order_status_at_cancel: "confirmed")
  → refund_initiated → refund_completed
```

---

## Revision History

| Date | Change | Author |
|---|---|---|
| 2026-02-06 | Initial event catalog creation | PKB System |
