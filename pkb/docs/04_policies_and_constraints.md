# 04 — Policies & Constraints

> QuickBasket business rules, SLAs, and operational constraints.
> Last updated: 2026-02-06

---

## Table of Contents

1. [Refund Policy](#1-refund-policy)
2. [Cancellation Policy](#2-cancellation-policy)
3. [Substitution Rules](#3-substitution-rules)
4. [Packing & No-Bag Policy](#4-packing--no-bag-policy)
5. [Membership Plans & Eligibility](#5-membership-plans--eligibility)
6. [Delivery SLA](#6-delivery-sla)
7. [Coupon & Discount Rules](#7-coupon--discount-rules)
8. [Minimum Order & Delivery Fee](#8-minimum-order--delivery-fee)
9. [Inventory Sync Policy](#9-inventory-sync-policy)
10. [Payment Policies](#10-payment-policies)

---

## 1. Refund Policy

### Refund Timelines

| Scenario | Refund SLA | Refund Method |
|---|---|---|
| Customer-initiated cancellation (before packing) | 3–5 business days | Original payment method |
| Customer-initiated cancellation (after packing starts) | 3–5 business days | Original payment method |
| Store-initiated cancellation (items unavailable) | Within 24 hours | Original payment method |
| Damaged/wrong item reported | 3–5 business days | Original payment method or store credit |
| Payment success but order creation failure | Within 24 hours (escalated) | Original payment method |

### Refund Rules

- All refunds are issued to the **original payment method** (UPI, card, wallet, etc.).
- COD orders that are cancelled after payment do not require a monetary refund — the order is simply not charged.
- Partial refunds are supported for individual items (e.g., damaged eggs within a larger order).
- Store credits may be offered as an alternative at the agent's discretion.

### Known Issues

- **Refund SLA is often missed.** Customer-initiated refunds that should take 3–5 business days frequently take 7+ days. The root cause is a manual approval step in the finance pipeline. See [Known Issue #7](./07_known_issues_and_debt.md#7-refund-processing-delays).
- Store-initiated cancellations that promise 24-hour refunds have been observed taking up to 48 hours.

---

## 2. Cancellation Policy

### Cancellation Windows

| Order Status | Cancellation Allowed? | Fee |
|---|---|---|
| `created` | Yes | Free |
| `confirmed` | Yes | Free |
| `packing` | Yes | **₹25 cancellation fee** |
| `out_for_delivery` | **No** | N/A — cancellation blocked |
| `delivered` | **No** | N/A — must raise support ticket |

### Cancellation Rules

- **Free cancellation** is available at any point before the order enters `packing` status.
- Once packing has started, a **₹25 cancellation fee** is deducted from the refund amount to cover labour and restocking costs.
- **No cancellation** is possible once the order is `out_for_delivery`. The user must wait for delivery and then raise a support ticket if there's an issue.
- After delivery, users cannot cancel but can request refunds for specific issues (damaged items, wrong items, missing items) via the support system.

### Store-Initiated Cancellations

- QuickBasket may cancel an order if critical items are unavailable during packing and the remaining items don't meet the minimum order threshold.
- Store-initiated cancellations are always **free** (no cancellation fee) and refunds are processed within **24 hours**.

---

## 3. Substitution Rules

### Policy

- Substitutions should **only** happen with explicit customer consent.
- If an item becomes unavailable during packing, the correct behaviour is to **remove the item and adjust the order total**, not substitute it.
- The customer should be notified immediately when an item is removed.

### Current Reality

> **KNOWN ISSUE:** Substitution without customer consent is a known operational problem. Packers sometimes substitute items (e.g., Herbal Toothpaste → Regular Mint Toothpaste) without asking the customer. The `substitutedWith` field on `OrderItem` tracks this, but there is **no in-app consent flow** for substitutions. See [Known Issue #4](./07_known_issues_and_debt.md#4-substitution-without-consent).

### Handling Unavailable Items

1. During packing, if an item is unavailable:
   - Remove the item from the order.
   - Set `unavailableAtPacking: true` on the `OrderItem`.
   - Add a note to the `OrderTimeline` entry for the `packing` status.
   - Adjust the order total (subtotal, discount recalculation, new total).
2. The customer should receive a push notification about the removal (currently unreliable — see [Known Issue #11](./07_known_issues_and_debt.md#11-eta-change-notifications-unreliable)).

---

## 4. Packing & No-Bag Policy

### Packing Preferences

| Preference | Description | Fee |
|---|---|---|
| `standard` | Regular plastic bags | ₹0 |
| `no_bag` | No external bag — items delivered loose | ₹0 (eligible for ECO10 coupon: ₹10 off) |
| `eco_friendly` | Biodegradable paper-based packaging | ₹0 |

### No-Bag Fallback Rule

> **KNOWN UX ISSUE:** Even when "no bag" is selected, certain items require minimal hygiene packaging for safety and regulatory compliance:
>
> - **Loose vegetables** (tomatoes, onions, potatoes, etc.)
> - **Loose fruits** (lemons, bananas, etc.)
> - **Leafy greens** (spinach, coriander, etc.)
>
> These items will be placed in a **thin compostable sleeve or minimal hygiene bag** regardless of the "no bag" preference.

**Problem:** This fallback rule is **NOT communicated to users** anywhere in the app. Users who select "no bag" expect zero packaging and are surprised to receive items in bags. This has generated multiple support tickets (see ticket `tkt_12`).

**Proposed Fix:** Add an info tooltip or disclaimer on the packing preference selector: _"Some loose items (vegetables, fruits) may require minimal hygiene packaging for food safety."_

### ECO10 Coupon

- The `ECO10` coupon gives ₹10 off for choosing "no bag" delivery.
- It is auto-applied at checkout when the `no_bag` preference is selected.
- The coupon conditions are **not clearly communicated** in the coupon listing — users see it but don't know how to activate it. See [Known Issue #3](./07_known_issues_and_debt.md#3-coupon-error-messages-are-vague).

---

## 5. Membership Plans & Eligibility

### Eligibility

- **Any registered user** can subscribe to a membership plan.
- No minimum order history or account age required.
- Users can upgrade from Basic to Plus at any time (prorated billing).
- Users can downgrade from Plus to Basic at the end of the current billing cycle.

### Plan Comparison

| Feature | Basic | Plus |
|---|---|---|
| **Monthly Price** | ₹49/mo | ₹149/mo |
| **Annual Price** | ₹399/yr | ₹1,199/yr |
| **Free Trial** | 7 days | 14 days |
| **Free Delivery Threshold** | Above ₹199 | **Always free (no minimum)** |
| **Priority Delivery** | No | Yes |
| **Priority Support** | No | Yes |
| **Cashback** | 5% | 10% |
| **Exclusive Deals** | Yes | Yes |
| **Free Replacements** | No | Yes |
| **Birthday Surprise** | No | Yes |
| **Free Express Slots** | No | Yes |

### Auto-Renewal

- Memberships auto-renew at the end of each billing cycle (monthly or annual) unless cancelled.
- Users can cancel auto-renewal at any time. The membership remains active until the end of the paid period.
- No refunds for partial billing periods.

### Trial Rules

- Each user gets one free trial per plan tier.
- Trial auto-converts to a paid subscription unless cancelled before the trial ends.
- Trial benefits are identical to paid plan benefits.

### Known Issues

- **Membership benefits sync delay:** After subscribing, it can take up to **2 hours** for benefits to reflect in the app (free delivery, priority support badge, etc.). This is because membership status is cached and synced on a schedule. See [Known Issue #8](./07_known_issues_and_debt.md#8-membership-benefits-sync-delay).

---

## 6. Delivery SLA

### Delivery Slot Types

| Slot Type | Target ETA | Delivery Fee | Notes |
|---|---|---|---|
| **Express** | 10 minutes | ₹29 | Available in high-density zones only |
| **Standard (30 min)** | 30 minutes | ₹15 | Default option for most users |
| **Within 1 hour** | 60 minutes | ₹0 | Free delivery slot |
| **Scheduled** | 2-hour windows (e.g., 9–11 AM) | ₹0 | Pre-scheduled delivery slots |

### ETA Rules

- ETA is calculated at order placement based on zone, current load, and slot type.
- ETA **can change** after order placement due to traffic, weather, delivery partner reassignment, or peak-hour surges.
- If ETA changes, the user **must** be notified via push notification.

### Known Issues

- **ETA estimation is inaccurate.** The algorithm does not account for real-time traffic, rain, or peak-hour demand. See [Known Issue #2](./07_known_issues_and_debt.md#2-eta-estimation-inaccurate).
- **ETA change notifications are unreliable.** The push notification system frequently fails to deliver ETA change alerts. Users discover the change only by checking the app. See [Known Issue #11](./07_known_issues_and_debt.md#11-eta-change-notifications-unreliable).

### Delivery Zones (Bengaluru)

| Zone | Code | Status | Avg Delivery (min) | Radius (km) |
|---|---|---|---|---|
| Koramangala | KRM | Active | 18 | 5 |
| Indiranagar | IND | Active | 22 | 4 |
| HSR Layout | HSR | Active | 15 | 6 |
| Whitefield | WTF | Active | 30 | 7 |
| Jayanagar | JAY | **Inactive** | 25 | 5 |

---

## 7. Coupon & Discount Rules

### Coupon Stacking

- **Only one coupon per order.** Coupon stacking is not supported.
- If a coupon is already applied and the user tries to apply another, the previous coupon is replaced (not stacked).

### Coupon Types

| Type | Description | Example |
|---|---|---|
| `flat` | Fixed amount off | WELCOME50 → ₹50 off |
| `percentage` | Percentage discount with optional cap | FRESH20 → 20% off, max ₹100 |
| `free_delivery` | Waives delivery fee | FREEDELIVERY → ₹0 delivery |

### Coupon Constraints

| Constraint | Description |
|---|---|
| `minBasketValue` | Minimum cart subtotal required |
| `maxDiscount` | Maximum discount cap (for percentage coupons) |
| `categoryOnly` | Restricts coupon to items in a specific category |
| `firstOrderOnly` | Only valid on the user's first-ever order |
| `memberOnly` | Only usable by active Basic or Plus members |
| `validFrom` / `validTo` | Date range validity |

### Member Coupon Visibility

> **KNOWN UX ISSUE:** Member-only coupons (e.g., `MEMBER100`, `HIDDEN99`) are **visible to all users** in the coupon listing, but only **usable by members**. This is intentional (to showcase member benefits) but causes confusion and frustration among non-members who try to apply them and get vague error messages. See [Known Issue #12](./07_known_issues_and_debt.md#12-coupon-visibility-for-non-members).

### Discount Rounding

- Percentage discounts are rounded **down** to the nearest ₹10. For example, 25% of ₹215 = ₹53.75 → rounded to ₹50. This rounding logic is not documented anywhere in the UI and has caused support tickets.

---

## 8. Minimum Order & Delivery Fee

### Minimum Order Value

| User Type | Minimum Order | Notes |
|---|---|---|
| **Plus Members** | **No minimum** | Can order any amount |
| **Basic Members** | ₹99 | Standard minimum applies |
| **Non-Members** | ₹99 | Standard minimum applies |

### Delivery Fee Rules

| Condition | Delivery Fee |
|---|---|
| Order subtotal ≥ ₹149 | **Free delivery** (standard/scheduled slots) |
| Order subtotal < ₹149 | ₹15 (standard) or ₹29 (express) |
| Plus Member | **Always free** (all slot types including express) |
| Express slot (non-Plus) | ₹29 regardless of order amount |
| Scheduled slot | ₹0 (always free) |
| `FREEDELIVERY` coupon applied | ₹0 (if subtotal ≥ ₹149) |

### Edge Case: Delivery Fee After Item Removal

If items are removed during packing (unavailable) and the order subtotal drops below ₹149, the delivery fee is **not retroactively added**. The customer pays the fee calculated at checkout time. This is a deliberate policy choice to avoid surprise charges.

---

## 9. Inventory Sync Policy

### Sync Schedule

- Inventory is synced from the warehouse system **every 2 hours**.
- Each `InventoryRecord` has a `lastSyncedAt` timestamp and a `hasSyncDelay` flag.

### Inventory Statuses

| Status | Quantity Range | Display |
|---|---|---|
| `in_stock` | > 10 units | Available to order |
| `low_stock` | 1–10 units | "Only X left" badge |
| `out_of_stock` | 0 units | Greyed out, not orderable |

### Stock Flip Problem

> **KNOWN ISSUE:** Due to the 2-hour sync cycle, inventory shown in the app can be stale. An item may show as `in_stock` in the app but actually be `out_of_stock` in the warehouse. This causes a "stock flip" at checkout or during packing:
>
> 1. User sees item as available → adds to cart → places order.
> 2. During packing, the item is physically unavailable.
> 3. The item is removed from the order, and the total is adjusted.
>
> The `hasSyncDelay: true` flag on `InventoryRecord` marks items currently experiencing this issue. See [Known Issue #1](./07_known_issues_and_debt.md#1-inventory-sync-delay).

### Real-Time Inventory (Planned)

There are plans to move to a real-time inventory system using WebSocket updates, but this is not yet implemented.

---

## 10. Payment Policies

### Supported Payment Methods

| Method | Type | Notes |
|---|---|---|
| `upi` | Digital | Google Pay, PhonePe, Paytm, BHIM, etc. |
| `card` | Digital | Credit/debit cards (Visa, Mastercard, RuPay) |
| `wallet` | Digital | QuickPay Wallet (in-app wallet) |
| `netbanking` | Digital | All major banks |
| `cod` | Cash | Cash on Delivery — available for orders ≤ ₹2,000 |

### Payment Flow

1. User selects payment method at checkout.
2. Payment is initiated (`status: "initiated"`).
3. On success → `status: "success"` → order is confirmed.
4. On failure → `status: "failed"` → user is prompted to retry.
5. If payment succeeds but order creation fails → **orphaned payment** (see below).

### Orphaned Payments

> **KNOWN ISSUE:** A race condition in the checkout flow can cause the payment to succeed (`status: "success"`) but the order creation to fail. This results in:
> - `Payment.orderCreationFailed = true`
> - `Payment.orderId = undefined`
> - Money is deducted from the user but no order is created.
>
> Current handling: Manual escalation via support. Refund processed within 24 hours. See [Known Issue #6](./07_known_issues_and_debt.md#6-payment-success-but-order-creation-failure).

### Saved Payment Methods

- Users can save payment methods for faster checkout.
- One payment method can be marked as `isDefault`.
- Saved methods include: UPI IDs, cards (masked), and wallet balances.

---

## Revision History

| Date | Change | Author |
|---|---|---|
| 2026-02-06 | Initial document creation | PKB System |
