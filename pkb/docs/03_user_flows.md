# QuickBasket — User Flows

> **Last updated:** February 2026  
> **Purpose:** Document all major user flows with happy paths, edge cases, and known issues  
> **Route structure:** Next.js App Router with `(auth)` and `(main)` route groups

---

## Table of Contents

1. [Login & Onboarding](#1-login--onboarding)
2. [Location Selection](#2-location-selection)
3. [Home — Discovery & Browsing](#3-home--discovery--browsing)
4. [Category Browsing](#4-category-browsing)
5. [Item Detail & Add to Cart](#5-item-detail--add-to-cart)
6. [Search](#6-search)
7. [Cart Management](#7-cart-management)
8. [Coupon Application](#8-coupon-application)
9. [Checkout](#9-checkout)
10. [Payment](#10-payment)
11. [Order Tracking](#11-order-tracking)
12. [Order History](#12-order-history)
13. [Support Ticket Creation](#13-support-ticket-creation)
14. [Membership Subscription](#14-membership-subscription)
15. [Profile Management](#15-profile-management)
16. [Edge Case Scenarios](#16-edge-case-scenarios)

---

## 1. Login & Onboarding

**Route:** `/login`  
**Route group:** `(auth)`

### Happy Path

```
┌─────────────┐    ┌──────────────┐    ┌────────────────┐    ┌──────────┐
│  App Launch  │───▶│  Login Page  │───▶│  Enter Phone # │───▶│ OTP Sent │
└─────────────┘    └──────────────┘    └────────────────┘    └──────────┘
                                                                   │
                                                                   ▼
                                                            ┌──────────┐    ┌──────────────┐
                                                            │ Enter OTP│───▶│  Logged In   │
                                                            └──────────┘    └──────────────┘
                                                                                   │
                                                                                   ▼
                                                                           ┌───────────────┐
                                                                           │ Location Page  │
                                                                           └───────────────┘
```

### Steps

1. User opens app → Login page displayed
2. User enters phone number (Indian 10-digit format)
3. System sends OTP (simulated in mock)
4. User enters OTP → Authentication verified
5. System loads user profile from `userService`
6. **First-time users:** Redirect to location selection
7. **Returning users with saved location:** Redirect to home

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Invalid phone number format | Form validation error, won't submit | Implemented |
| Wrong OTP entered | Error message, allow retry (3 attempts) | Implemented |
| OTP expired | "OTP expired, request new one" message | Simulated |
| User has no saved addresses | Redirect to location selection after login | Implemented |
| Network timeout during OTP | Show retry button with error message | Simulated |
| Returning user with saved session | Auto-login, skip to home | Implemented via auth store |

---

## 2. Location Selection

**Route:** `/location`  
**Route group:** `(auth)`

### Happy Path

```
┌───────────────┐    ┌─────────────────────┐    ┌──────────────┐    ┌──────────┐
│ Location Page │───▶│ Search or pick from  │───▶│ Confirm zone │───▶│  Home    │
│               │    │ saved addresses      │    │ (serviceable)│    │  Page    │
└───────────────┘    └─────────────────────┘    └──────────────┘    └──────────┘
```

### Steps

1. Page shows saved addresses (if any) and search input
2. User can:
   - **Select a saved address** (e.g., "Home — 42, 3rd Cross, HSR Layout")
   - **Search for a new address** using text input
   - **Use current location** (GPS-based)
3. System maps address to a delivery zone via `zones.ts`
4. If zone is active and within delivery radius → Confirm and proceed to home
5. If zone is not serviceable → Show "We're not in your area yet" message

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Address outside all delivery zones | "We don't deliver here yet" message with waitlist option | Simulated |
| GPS permission denied | Fall back to manual address search | Implemented |
| Zone exists but is inactive | "Temporarily unavailable in your area" | Simulated |
| Multiple addresses, switch mid-session | Can switch from profile; ongoing cart is preserved | Implemented |

### Data Reference

Active zones defined in `src/data/zones.ts`:

| Zone | Area | Avg Delivery (min) | Radius (km) |
|---|---|---|---|
| zone_1 | Koramangala/HSR | 18 | 3 |
| zone_2 | Indiranagar | 20 | 2.5 |
| zone_3 | Jayanagar | 22 | 3 |
| zone_4 | Whitefield | 25 | 5 |
| zone_5 | Banashankari | 20 | 3 |
| zone_6 | Malleshwaram | 22 | 2.5 |

---

## 3. Home — Discovery & Browsing

**Route:** `/home`  
**Route group:** `(main)`

### Page Sections (Top to Bottom)

```
┌─────────────────────────────────┐
│  📍 Location Bar + Delivery ETA │
├─────────────────────────────────┤
│  🔍 Search Bar                  │
├─────────────────────────────────┤
│  🎠 Banner Carousel             │
│  (promotional banners, deals)   │
├─────────────────────────────────┤
│  📦 Categories Grid             │
│  (5 categories with icons)      │
├─────────────────────────────────┤
│  🔄 Reorder Section             │
│  (frequently bought items)      │
├─────────────────────────────────┤
│  ⭐ Bestsellers                 │
│  (items tagged "bestseller")    │
├─────────────────────────────────┤
│  🆕 New Arrivals                │
│  (items tagged "new")           │
└─────────────────────────────────┘
```

### Interactions

| Element | Tap Action | Destination |
|---|---|---|
| Location bar | Open location selector | `/location` |
| Search bar | Focus search input | Search overlay / results on `/home` |
| Banner card | Navigate to linked page | Varies: `/categories/[slug]`, `/membership`, etc. |
| Category tile | Open category listing | `/categories/[slug]` |
| Reorder item | Add to cart (with variant) | Stays on home, cart updated |
| Bestseller/New item card | Open item detail | `/item/[id]` |

### Banners

Banners are managed in `src/data/banners.ts` and link to various destinations:

| Banner | Links To |
|---|---|
| Fresh fruits promo | `/categories/fruits-vegetables` |
| Membership upsell | `/membership` |
| Weekend deals | `/categories/snacks-beverages` |
| New arrivals | `/home` (scroll to section) |

---

## 4. Category Browsing

**Route:** `/categories` (all categories) and `/categories/[slug]` (single category)  
**Route group:** `(main)`

### Happy Path

```
┌────────────┐    ┌──────────────────┐    ┌──────────────┐
│  Category  │───▶│  Item Grid/List  │───▶│  Item Detail  │
│  Page      │    │  (filtered)      │    │  Page         │
└────────────┘    └──────────────────┘    └──────────────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Quick Add to │
                  │ Cart (+ btn) │
                  └──────────────┘
```

### Category Page (`/categories`)

- Grid display of all 5 categories
- Each tile shows: icon, name, item count, description
- Sorted by `sortOrder` field

### Category Detail (`/categories/[slug]`)

- Header with category name and description
- Item cards in a scrollable grid
- Each item card (`ItemCard` component) shows:
  - Product image
  - Name, brand
  - Price (discounted) and MRP (struck through)
  - Rating stars and count
  - Tags (bestseller, organic, new, etc.)
  - Quick add button (adds default variant, qty 1)

### Available Category Slugs

| Slug | Category | Item Count |
|---|---|---|
| `fruits-vegetables` | Fruits & Vegetables | 15 |
| `dairy-breakfast` | Dairy & Breakfast | 12 |
| `snacks-beverages` | Snacks & Beverages | 12 |
| `household-essentials` | Household Essentials | 11 |
| `personal-care` | Personal Care | 10 |

---

## 5. Item Detail & Add to Cart

**Route:** `/item/[id]`  
**Route group:** `(main)`

### Happy Path

```
┌──────────────┐    ┌───────────────┐    ┌─────────────┐    ┌───────────┐
│  Item Detail │───▶│ Select Variant│───▶│ Set Quantity │───▶│ Add to    │
│  Page        │    │ (size/pack)   │    │ (1, 2, 3..) │    │ Cart      │
└──────────────┘    └───────────────┘    └─────────────┘    └───────────┘
                                                                  │
                                                                  ▼
                                                           ┌─────────────┐
                                                           │ Cart Badge  │
                                                           │ Updated     │
                                                           └─────────────┘
```

### Page Layout

```
┌──────────────────────────────────┐
│  🖼️ Product Image               │
├──────────────────────────────────┤
│  Product Name                    │
│  Brand | Rating ⭐ (count)       │
│  Tags: [bestseller] [organic]    │
├──────────────────────────────────┤
│  Variant Selector                │
│  ┌─────────┐  ┌─────────┐       │
│  │  500g   │  │  1 kg ✓ │       │
│  │  ₹95    │  │  ₹180   │       │
│  └─────────┘  └─────────┘       │
├──────────────────────────────────┤
│  ₹180  ₹220(MRP)  Save ₹40     │
├──────────────────────────────────┤
│  Description text...             │
├──────────────────────────────────┤
│  ┌─────┐ ┌───┐ ┌─────┐         │
│  │  -  │ │ 1 │ │  +  │         │
│  └─────┘ └───┘ └─────┘         │
│                                  │
│  [ 🛒 Add to Cart — ₹180 ]      │
└──────────────────────────────────┘
```

### Interactions

1. **Default state:** Default variant selected (from `isDefault: true`), quantity = 1
2. **Variant selection:** Tap to switch; price/MRP/unit updates accordingly
3. **Quantity adjustment:** Increment/decrement buttons (min: 1, max: 10)
4. **Add to Cart:** Adds item with selected variant and quantity to cart store
5. **Already in cart:** Shows current quantity; +/- buttons update cart directly

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Item already in cart with different variant | Shows both entries separately in cart | Implemented |
| Item out of stock (inventory status) | "Out of Stock" badge, add button disabled | Implemented |
| Item low stock | "Only X left" warning badge | Implemented |
| Item has sync delay (may flip at checkout) | No visual indication — **known gap** | Known issue |

---

## 6. Search

**Route:** `/home` (search overlay)  
**Route group:** `(main)`

### Happy Path

```
┌─────────────┐    ┌──────────────┐    ┌───────────────┐
│ Tap Search  │───▶│ Type Query   │───▶│ Results Grid  │
│ Bar         │    │ (debounced)  │    │ (item cards)  │
└─────────────┘    └──────────────┘    └───────────────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │ Tap Item →  │
                                       │ Item Detail  │
                                       └─────────────┘
```

### Search Behavior

- **Input:** Free text, debounced (300ms)
- **Matching:** Searches item `name`, `brand`, `description`, and `tags`
- **Results:** Filtered `ItemCard` grid, sorted by relevance
- **No results:** "No items found" message with suggestion to browse categories

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Hindi/Kannada search terms ("dahi", "halu") | No results — English only | **Known gap** (tkt_21) |
| Typos ("banan" for "bananas") | No fuzzy matching — exact substring only | Known limitation |
| Empty query | Shows recent searches or popular items | Implemented |
| Very long query | Truncated, search still works | Handled |

---

## 7. Cart Management

**Route:** `/cart`  
**Route group:** `(main)`

### Happy Path

```
┌──────────────┐    ┌───────────────────┐    ┌──────────────┐
│  Cart Page   │───▶│ Review Items      │───▶│ Apply Coupon │
│              │    │ Adjust quantities │    │ (optional)   │
└──────────────┘    │ Remove items      │    └──────────────┘
                    └───────────────────┘           │
                                                    ▼
                    ┌──────────────────────────────────────┐
                    │  Select Packing Preference            │
                    │  ○ Standard  ○ No Bag  ○ Eco-Friendly│
                    └──────────────────────────────────────┘
                                                    │
                                                    ▼
                                             ┌──────────────┐
                                             │  Price Summary│
                                             │  Subtotal     │
                                             │  - Discount   │
                                             │  + Delivery   │
                                             │  = Total      │
                                             └──────────────┘
                                                    │
                                                    ▼
                                             ┌──────────────┐
                                             │ Proceed to   │
                                             │ Checkout      │
                                             └──────────────┘
```

### Cart Page Layout

```
┌──────────────────────────────────┐
│  🛒 My Cart (3 items)            │
├──────────────────────────────────┤
│  ┌──────────────────────────┐    │
│  │ 🖼️ Organic Bananas       │    │
│  │ 1 dozen · ₹49            │    │
│  │ [-] [2] [+]    🗑️ Remove │    │
│  └──────────────────────────┘    │
│  ┌──────────────────────────┐    │
│  │ 🖼️ Full Cream Milk       │    │
│  │ 1 L · ₹56                │    │
│  │ [-] [1] [+]    🗑️ Remove │    │
│  └──────────────────────────┘    │
├──────────────────────────────────┤
│  🎫 Apply Coupon: [________] ▶   │
│     Applied: WELCOME50 (-₹50) ✕  │
├──────────────────────────────────┤
│  📦 Packing Preference            │
│  (●) Standard  ○ No Bag  ○ Eco  │
├──────────────────────────────────┤
│  Subtotal         ₹154           │
│  Discount        -₹50            │
│  Delivery Fee    +₹15            │
│  ──────────────────────          │
│  Total            ₹119           │
├──────────────────────────────────┤
│  [ Proceed to Checkout — ₹119 ]  │
└──────────────────────────────────┘
```

### Interactions

| Action | Behavior |
|---|---|
| Increase quantity | Update cart store, recalculate totals |
| Decrease quantity (to 0) | Remove item from cart |
| Remove item | Remove from cart store, recalculate totals |
| Apply coupon | See [Coupon Application flow](#8-coupon-application) |
| Change packing preference | Update cart store; ECO10 auto-applied/removed for no_bag |
| Proceed to checkout | Navigate to `/checkout` |

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Empty cart | Show "Your cart is empty" with CTA to browse | Implemented |
| Item goes out of stock while in cart | Shown during checkout, not in cart (see stock flip) | Known gap |
| Applied coupon becomes invalid after item removal | Coupon removed, user notified | Implemented |
| Switch packing to "no_bag" | ECO10 coupon auto-applied (₹10 off) | Implemented |
| Switch packing away from "no_bag" | ECO10 auto-removed | Implemented |

---

## 8. Coupon Application

**Context:** Within Cart page (`/cart`)

### Happy Path

```
┌──────────────┐    ┌───────────────┐    ┌──────────────┐    ┌───────────┐
│ Tap "Apply  │───▶│ Enter Code or │───▶│ Validate     │───▶│ Discount  │
│  Coupon"    │    │ Select from   │    │ Against Cart │    │ Applied!  │
│              │    │ Available List│    │              │    │           │
└──────────────┘    └───────────────┘    └──────────────┘    └───────────┘
```

### Validation Rules

The `couponService` validates the following conditions in order:

| Rule | Check | Error if Failed |
|---|---|---|
| 1. Coupon exists | Code matches a coupon in the system | "Invalid coupon code" |
| 2. Coupon is active | `isActive === true` | "This coupon has expired" |
| 3. Date validity | Current date within `validFrom` – `validTo` | "This coupon has expired" |
| 4. First order only | `firstOrderOnly` → user has 0 previous orders | "Valid for first order only" |
| 5. Member only | `memberOnly` → user `isMember === true` | "This coupon is for members only" |
| 6. Min basket value | Cart subtotal >= `minBasketValue` | "Minimum basket value of ₹X required" |
| 7. Category restriction | If `categoryOnly` set, cart has items from that category | "Valid only on [category name]" |

### Discount Calculation

| Type | Formula |
|---|---|
| `flat` | Discount = `value` |
| `percentage` | Discount = `(value / 100) × eligible_subtotal`, capped at `maxDiscount` |
| `free_delivery` | Delivery fee set to ₹0 |

**Known issue:** Percentage discounts are rounded down to nearest ₹10 in the system. This confuses users who expect exact math (e.g., 25% of ₹215 = ₹53.75, but system shows ₹50). See tkt_28.

### Available Coupons (User-Visible)

| Code | Description | Conditions |
|---|---|---|
| WELCOME50 | ₹50 off first order | First order, min ₹199 |
| FRESH20 | 20% off Fruits & Veg | Category-specific, min ₹299, max ₹100 |
| FREEDELIVERY | Free delivery | Min ₹149 |
| DAIRY15 | 15% off Dairy & Breakfast | Category-specific, min ₹199, max ₹75 |
| MEMBER100 | ₹100 off for members | Members only, min ₹499 |
| SNACK25 | 25% off Snacks & Beverages | Category-specific, min ₹249, max ₹125 |
| FLAT200 | ₹200 off | Min ₹999 |
| WEEKEND30 | 30% off weekends | Min ₹399, max ₹150 (weekend enforcement bug) |
| ECO10 | ₹10 off (auto-applied) | No-bag packing preference |
| CARE20 | 20% off Personal Care | Category-specific, min ₹299, max ₹80 |

**Not shown in app:** HIDDEN99 (secret member-only code, ₹99 off on ₹599+)  
**Expired:** EXPIRED50 (no longer active)

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Expired coupon entered (EXPIRED50) | "This coupon has expired" | Implemented |
| Member coupon by non-member (MEMBER100) | "This coupon is for members only" | Implemented |
| Basket below minimum | "Minimum basket value of ₹X required" | Implemented |
| Wrong category items in cart | "Valid only on [category name]" | Implemented |
| WEEKEND30 used on a weekday | **Accepted** — weekend enforcement not implemented | **Bug** |
| ECO10 manually entered | No visible effect — it's auto-applied via packing preference | Confusing UX |
| HIDDEN99 entered by non-member | "Members only" error; user didn't know it was member-only | Expected but confusing |
| Generic "coupon not applicable" error | Shown when multiple conditions fail — no specificity | **Known UX issue** (tkt_3) |

---

## 9. Checkout

**Route:** `/checkout`  
**Route group:** `(main)`

### Happy Path

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Checkout    │───▶│ Confirm      │───▶│ Select       │───▶│ Select       │
│  Page        │    │ Address      │    │ Delivery Slot│    │ Payment      │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                   │
                                                                   ▼
                                                            ┌──────────────┐
                                                            │  Review &    │
                                                            │  Place Order │
                                                            └──────────────┘
```

### Checkout Page Layout

```
┌──────────────────────────────────┐
│  📍 Delivery Address             │
│  Home — 42, 3rd Cross, HSR Layout│
│  [Change Address]                │
├──────────────────────────────────┤
│  ⏰ Delivery Slot                │
│  ○ Express (10 min)     ₹29     │
│  ● Within 30 min        ₹15     │
│  ○ Within 1 hour        Free    │
│  ○ 9 AM – 11 AM         Free    │
│  ○ 11 AM – 1 PM         Free    │
│  ○ 2 PM – 4 PM          Free    │
│  ○ 5 PM – 7 PM          Free    │
│  ○ 7 PM – 9 PM          Free    │
├──────────────────────────────────┤
│  💳 Payment Method               │
│  ● UPI (GPay, PhonePe)          │
│  ○ Credit/Debit Card             │
│  ○ Wallet                        │
│  ○ Cash on Delivery              │
│  ○ Net Banking                   │
├──────────────────────────────────┤
│  📝 Order Summary                │
│  3 items · ₹252                  │
│  Discount: -₹50                  │
│  Delivery: +₹15                  │
│  Total: ₹217                     │
├──────────────────────────────────┤
│  [ Place Order — ₹217 ]          │
└──────────────────────────────────┘
```

### Delivery Slots

| Slot | Window | Fee | Notes |
|---|---|---|---|
| Express | 10 min | ₹29 | Fastest; free for Plus members |
| Standard | 30 min | ₹15 | Most popular |
| 1 Hour | 60 min | Free | Budget-friendly |
| Scheduled (6 slots) | 2-hour windows, 9 AM–9 PM | Free | For planned delivery |

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Address not in serviceable zone | "Delivery not available at this address" | Implemented |
| Cannot change address post-order | User must cancel and reorder (tkt_10) | Known limitation |
| Stock flip during checkout | See [Edge Case #1](#edge-case-1-stock-flip-at-checkout) | Simulated |
| Express slot unavailable (peak hours) | Slot greyed out with "Unavailable" label | Simulated |
| Cart modified after entering checkout | Redirect back to cart page | Implemented |

---

## 10. Payment

**Context:** Triggered from "Place Order" on Checkout page

### Happy Path

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Place Order  │───▶│ Payment      │───▶│ Payment      │───▶│ Order        │
│ Button       │    │ Gateway      │    │ Success      │    │ Confirmed!   │
│              │    │ (UPI/Card..) │    │              │    │ → Tracking   │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### Payment Methods

| Method | Implementation | Notes |
|---|---|---|
| UPI | Simulated gateway redirect | Most popular; used in 60% of orders |
| Card | Simulated gateway | Credit/debit; saved cards supported |
| Wallet | QuickBasket wallet balance | Store credits + cashback |
| COD | Cash on delivery | Available but not incentivized |
| Net Banking | Simulated gateway | Least popular option |

### Payment Statuses

```
initiated → success → (order created)
                    ↘ refund_initiated → refunded
initiated → failed → (retry or abandon)
```

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Payment success, order created | Happy path → redirect to order tracking | Implemented |
| Payment failed | "Payment failed. Retry?" with same cart preserved | Implemented |
| Payment success, order NOT created | **Critical bug** — money deducted, no order. See [Edge Case #4](#edge-case-4-payment-success-but-no-order). | Simulated (pay_25, tkt_4) |
| UPI timeout (bank debits, gateway doesn't confirm) | Amount auto-refunded in ~30 min (tkt_23) | Simulated |
| COD order placed | Order created immediately, no payment gateway | Implemented |
| Duplicate payment (user taps twice) | Idempotency check prevents double charge | Simulated |

---

## 11. Order Tracking

**Route:** `/orders/[id]`  
**Route group:** `(main)`

### Happy Path

```
┌───────────────────────────────────────────────────────────┐
│  Order #ord_13 — Out for Delivery                         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ✅ Created          10:30 AM                             │
│  ✅ Confirmed        10:31 AM                             │
│  ✅ Packing          10:35 AM                             │
│  🟢 Out for Delivery 10:42 AM                             │
│  ○  Delivered        ETA: ~10:55 AM                       │
│                                                           │
├───────────────────────────────────────────────────────────┤
│  📍 Delivering to: Home — 42, 3rd Cross, HSR Layout       │
│  ⏱️ Estimated: 25 minutes                                 │
├───────────────────────────────────────────────────────────┤
│  Items (2):                                               │
│  • Organic Bananas (1 dozen) × 1    ₹49                  │
│  • Masala Chai Premix (500g) × 1    ₹199                 │
├───────────────────────────────────────────────────────────┤
│  Subtotal: ₹248  Delivery: ₹15  Total: ₹263              │
├───────────────────────────────────────────────────────────┤
│  [ Need Help? → Create Support Ticket ]                   │
└───────────────────────────────────────────────────────────┘
```

### Order Status Flow

```
created → confirmed → packing → out_for_delivery → delivered
                 │         │
                 │         └──→ cancelled → refund_initiated → refunded
                 └──→ cancelled → refund_initiated → refunded
```

### Timeline Notes

Certain timeline entries include `note` fields that provide additional context:

| Note Type | Example | Orders |
|---|---|---|
| Item unavailable at packing | "Broccoli (300g x2) unavailable — removed from order" | ord_7, ord_22 |
| ETA change | "Delivery ETA updated: Heavy traffic in the area" | ord_9 |
| Weather delay | "ETA changed due to rain" | ord_16 |
| Partner reassignment | "ETA updated: Delivery partner reassigned" | ord_23 |
| Customer-initiated cancel | "Cancelled by customer" | ord_11 |
| Store-initiated cancel | "Cancelled — items not available in store" | ord_14 |
| Damage report | "Customer reported 3 eggs broken" | ord_12 |
| System error | "Payment succeeded (TXN025) but order confirmation failed" | ord_25 |

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| ETA changes after order placed | Updated ETA shown; timeline note added. **No push notification.** | Partially implemented (tkt_2, tkt_9) |
| Item removed during packing | Item marked `unavailableAtPacking: true`; timeline note. Partial refund. | Simulated (ord_7, ord_22) |
| Item substituted | `substitutedWith` field on order item; shown in detail view. | Simulated (ord_6) |
| Order cancelled by user | Status → cancelled → refund_initiated. Cart not restored. | Implemented |
| Order cancelled by store | Status → cancelled → refund_initiated → refunded. | Simulated (ord_14) |
| Orphaned order (payment but no confirmation) | Status stuck at "created". See [Edge Case #4](#edge-case-4-payment-success-but-no-order). | Simulated (ord_25) |

---

## 12. Order History

**Route:** `/orders`  
**Route group:** `(main)`

### Page Layout

```
┌──────────────────────────────────┐
│  📋 My Orders                    │
├──────────────────────────────────┤
│  ┌──────────────────────────┐    │
│  │ ord_21 — Confirmed       │    │
│  │ 3 items · ₹300           │    │
│  │ Today, 10:00 AM          │    │
│  │ [ Track Order ]          │    │
│  └──────────────────────────┘    │
│  ┌──────────────────────────┐    │
│  │ ord_15 — Packing         │    │
│  │ 3 items · ₹191           │    │
│  │ Today, 9:30 AM           │    │
│  │ [ Track Order ]          │    │
│  └──────────────────────────┘    │
│  ┌──────────────────────────┐    │
│  │ ord_13 — Out for Delivery│    │
│  │ 2 items · ₹263           │    │
│  │ Today, 8:00 AM           │    │
│  │ [ Track Order ]          │    │
│  └──────────────────────────┘    │
│  ...                             │
│  (25 total orders, paginated)    │
└──────────────────────────────────┘
```

### Order Status Distribution (Demo Data)

| Status | Count | Orders |
|---|---|---|
| Delivered | 16 | ord_1 through ord_20 (various) |
| Out for Delivery | 2 | ord_13, ord_23 |
| Packing | 1 | ord_15 |
| Confirmed | 1 | ord_21 |
| Created (stuck) | 1 | ord_25 |
| Cancelled | 1 | ord_11 |
| Refunded | 1 | ord_14 |
| **Total** | **25** | — |

### Interactions

| Action | Behavior |
|---|---|
| Tap order card | Navigate to `/orders/[id]` (order detail) |
| "Reorder" button | Adds all items from that order to current cart |
| "Need Help?" | Navigate to support ticket creation for that order |
| Filter by status | Toggle: All / Active / Completed / Cancelled |

---

## 13. Support Ticket Creation

**Route:** `/support` (list) and `/support/[id]` (detail/chat)  
**Route group:** `(main)`

### Happy Path

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Support Page │───▶│ Select       │───▶│ Describe     │───▶│ Ticket       │
│ (ticket list)│    │ Category     │    │ Issue        │    │ Created      │
│              │    │ + Order      │    │              │    │ → Chat View  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### Ticket Categories

| Category | Description | Example Ticket |
|---|---|---|
| `missing_item` | Items ordered but not delivered | tkt_1, tkt_13, tkt_17, tkt_30 |
| `damaged_item` | Items arrived broken/damaged | tkt_7, tkt_18, tkt_26 |
| `wrong_item` | Different item delivered than ordered | tkt_6, tkt_24 |
| `late_delivery` | Order arrived after expected time | tkt_8, tkt_20 |
| `refund_delay` | Refund not received in promised timeframe | tkt_5, tkt_15 |
| `payment_issue` | Payment problems (deducted but no order, failed but debited) | tkt_4, tkt_23 |
| `eta_changed` | Delivery ETA changed post-order | tkt_2, tkt_9 |
| `coupon_issue` | Coupon didn't work or discount was wrong | tkt_3, tkt_14, tkt_25, tkt_28 |
| `membership_issue` | Membership benefits not working | tkt_11, tkt_19 |
| `address_issue` | Address-related problems | tkt_10 |
| `packing_issue` | Packing preference not followed | tkt_12, tkt_27 |
| `other` | General feedback, bugs, feature requests | tkt_16, tkt_21, tkt_22, tkt_29 |

### Ticket Severity Levels

| Severity | SLA (Target Response) | Examples |
|---|---|---|
| `critical` | Within 30 minutes | Payment deducted, no order (tkt_4) |
| `high` | Within 2 hours | Missing items, broken items, refund delays |
| `medium` | Within 12 hours | Wrong items, ETA issues, membership problems |
| `low` | Within 24 hours | Coupon confusion, packing feedback, feature requests |

### Resolution Types

| Resolution | Description | Count in Demo |
|---|---|---|
| `refund` | Money returned to original payment method | 3 |
| `replacement` | Correct/new item delivered | 2 |
| `credit` | Store credit added to wallet | 4 |
| `explanation` | Issue explained, no monetary compensation | 9 |
| `no_action` | Acknowledged, no action needed | 4 |
| `pending` | Not yet resolved | 3 |

### Support Ticket Status Flow

```
open → in_progress → resolved → closed
  │                      │
  │                      └──→ closed (auto after 7 days)
  │
  └──→ waiting_on_customer → resolved/closed
```

### Demo Ticket Stats

| Status | Count |
|---|---|
| Open | 3 (tkt_5, tkt_8, tkt_11) |
| In Progress | 1 (tkt_4) |
| Resolved | 18 |
| Closed | 4 |
| **Total** | **30** |

---

## 14. Membership Subscription

**Route:** `/membership`  
**Route group:** `(main)`

### Happy Path

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Membership   │───▶│ Compare      │───▶│ Select Plan  │───▶│ Pay &        │
│ Page         │    │ Plans        │    │ + Billing    │    │ Subscribe    │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                   │
                                                                   ▼
                                                            ┌──────────────┐
                                                            │ Membership   │
                                                            │ Active!      │
                                                            └──────────────┘
```

### Plan Comparison

| Feature | Free (Default) | Basic (₹49/mo) | Plus (₹149/mo) |
|---|---|---|---|
| Delivery fee | ₹0–₹29 | Free above ₹199 | Always free |
| Priority delivery | No | No | Yes |
| Priority support | No | No | Yes |
| Cashback | 0% | 5% | 10% |
| Exclusive coupons | No | Yes | Yes + Plus-only |
| Free replacements | No | No | Yes |
| Birthday reward | No | No | Yes |
| Free express slots | No | No | Yes |
| Trial | — | 7 days | 14 days |
| Annual price | — | ₹399/yr (₹33/mo) | ₹1,199/yr (₹100/mo) |

### Edge Cases

| Scenario | Behavior | Status |
|---|---|---|
| Benefits not activating after subscription | Known sync delay. Workaround: logout/login. (tkt_11) | **Known bug** |
| User confusion between plans | Benefit descriptions could be clearer (tkt_19) | UX improvement needed |
| Membership coupon shown to non-member | MEMBER100 visible but not usable — feels like bait (tkt_25) | **Known UX issue** |
| Trial period ending | Notification should fire 2 days before; not yet implemented | Gap |
| Downgrade from Plus to Basic | Benefits adjust immediately; no partial refund | Simulated |

---

## 15. Profile Management

**Route:** `/profile`  
**Route group:** `(main)`

### Profile Page Sections

```
┌──────────────────────────────────┐
│  👤 Priya Sharma                 │
│  +91 98765 43210                 │
│  priya@email.com                 │
│  [ Edit Profile ]                │
├──────────────────────────────────┤
│  📍 Saved Addresses              │
│  • Home — HSR Layout (default)   │
│  • Office — Koramangala          │
│  [ + Add Address ]               │
├──────────────────────────────────┤
│  💳 Saved Payment Methods        │
│  • UPI — GPay (default)          │
│  • HDFC Visa ****1234            │
├──────────────────────────────────┤
│  ⚙️ Preferences                  │
│  Veg only: Off                   │
│  No bag default: On              │
│  Eco packing: Off                │
│  Notifications: On               │
├──────────────────────────────────┤
│  🎫 Membership: QuickBasket Plus │
│  [ Manage Membership ]           │
├──────────────────────────────────┤
│  📋 Order History                │
│  🎧 Support Tickets              │
│  🚪 Logout                       │
└──────────────────────────────────┘
```

### User Preferences

| Preference | Effect |
|---|---|
| `vegOnly` | Filters catalog to show only `isVeg: true` items |
| `noBag` | Defaults packing preference to "no_bag" in cart |
| `ecoPacking` | Defaults packing preference to "eco_friendly" in cart |
| `notificationsEnabled` | Controls push notification delivery |

---

## 16. Edge Case Scenarios

These are the key edge-case flows that QuickBasket deliberately simulates to test product resilience and support workflows.

---

### Edge Case 1: Stock Flip at Checkout

**What happens:** User adds items to cart that show as "in stock." By the time the order is packed at the dark store, the item is actually out of stock. This happens due to inventory sync delays (`hasSyncDelay: true` in inventory records).

**Affected orders:** ord_7 (Broccoli), ord_22 (Mushrooms)

**Flow:**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ User adds    │───▶│ Checkout &   │───▶│ Packing      │───▶│ Item removed │
│ item to cart │    │ Payment OK   │    │ starts       │    │ from order   │
│ (shows in    │    │              │    │              │    │              │
│  stock)      │    │              │    │ Item NOT in  │    │ Timeline note│
└──────────────┘    └──────────────┘    │ stock!       │    │ added        │
                                        └──────────────┘    └──────────────┘
                                                                   │
                                                                   ▼
                                                            ┌──────────────┐
                                                            │ User sees    │
                                                            │ missing item │
                                                            │ after        │
                                                            │ delivery     │
                                                            │ → Support    │
                                                            │   ticket     │
                                                            └──────────────┘
```

**User impact:**
- User paid for items they didn't receive
- No notification before/during packing
- Discovers issue only after delivery
- Creates support ticket → gets refund/credit

**Related tickets:** tkt_1 (mushrooms), tkt_13 (broccoli)

---

### Edge Case 2: ETA Changes Post-Order

**What happens:** After a user places an order with a specific delivery slot (e.g., 30 minutes), the estimated delivery time changes due to traffic, weather, or delivery partner reassignment.

**Affected orders:** ord_9 (30→55 min, traffic), ord_16 (30→55 min, rain), ord_23 (25→45 min, partner reassigned)

**Flow:**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Order placed │───▶│ ETA: 30 min  │───▶│ Delay occurs │
│ Slot: 30 min │    │ Tracking OK  │    │ (traffic/    │
│              │    │              │    │  weather)    │
└──────────────┘    └──────────────┘    └──────────────┘
                                               │
                                               ▼
                                        ┌──────────────┐    ┌──────────────┐
                                        │ ETA updated  │───▶│ User checks  │
                                        │ to 55 min    │    │ app, sees    │
                                        │              │    │ new ETA      │
                                        │ NO push      │    │ → Frustrated │
                                        │ notification │    │ → Support    │
                                        └──────────────┘    └──────────────┘
```

**User impact:**
- User chose a faster slot deliberately — feels betrayed
- No proactive notification about the change
- User only discovers it by manually checking the app
- Creates support ticket about late delivery

**Related tickets:** tkt_2, tkt_8, tkt_9

**Data markers:** `etaChangedAfterOrder: true`, `originalEtaMinutes` field on affected orders

---

### Edge Case 3: Coupon Confusion

**What happens:** Multiple coupon-related confusion scenarios arise from unclear error messages, hidden conditions, and visibility of member-only coupons.

**Sub-scenarios:**

| Scenario | Description | Ticket |
|---|---|---|
| **Vague error messages** | WEEKEND30 rejected with "coupon not applicable" instead of "min basket ₹399 required" | tkt_3 |
| **Hidden conditions** | ECO10 auto-applies only with no-bag packing — not documented in coupon listing | tkt_14 |
| **Member bait** | MEMBER100 shown to all users but only usable by members | tkt_25 |
| **Rounding confusion** | 25% of ₹215 = ₹53.75, system shows ₹50 (rounds to ₹10) | tkt_28 |
| **Weekend enforcement bug** | WEEKEND30 works on weekdays — day-check not implemented | Known bug |
| **Secret codes** | HIDDEN99 not listed in app; shared via word-of-mouth | By design |

---

### Edge Case 4: Payment Success But No Order

**What happens:** User's UPI payment is processed successfully (₹412 deducted, TXN025 confirmed), but the order creation step fails due to a system error. User sees money deducted but no order in their order list.

**Affected:** pay_25 (orderId: undefined, orderCreationFailed: true), ord_25 (status: "created" but stuck)

**Flow:**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ User taps    │───▶│ Payment      │───▶│ Payment      │───▶│ Order        │
│ "Place Order"│    │ Gateway      │    │ SUCCESS ✅   │    │ Creation     │
│              │    │              │    │ ₹412 debited │    │ FAILS ❌     │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                   │
                                                                   ▼
                                                            ┌──────────────┐
                                                            │ User sees:   │
                                                            │ • Money gone │
                                                            │ • No order   │
                                                            │ • Panic!     │
                                                            │ → Creates    │
                                                            │   critical   │
                                                            │   ticket     │
                                                            └──────────────┘
```

**User impact:**
- Highest anxiety scenario — "Where's my money?"
- No order to track, no confirmation screen
- Must contact support manually
- Support escalates to payments team
- Resolution: either create the order retroactively or refund within 24 hours

**Related ticket:** tkt_4 (severity: critical, status: in_progress)

---

### Edge Case 5: Refund Delays

**What happens:** After order cancellation (customer or store-initiated), the refund takes longer than the promised 3–5 business days. Refund gets stuck in "refund_initiated" status.

**Affected orders:** ord_11 (customer-cancelled, refund stuck for 7+ days), ord_14 (store-cancelled, refund took 2 days vs instant promise)

**Flow:**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Order        │───▶│ Refund       │───▶│ Expected:    │───▶│ Refund stuck │
│ Cancelled    │    │ Initiated    │    │ 3-5 days     │    │ in processing│
└──────────────┘    └──────────────┘    └──────────────┘    │ Day 7+       │
                                                            └──────────────┘
                                                                   │
                                                                   ▼
                                                            ┌──────────────┐
                                                            │ Customer     │
                                                            │ contacts     │
                                                            │ support      │
                                                            │ → Escalation │
                                                            │ → 48hr more  │
                                                            └──────────────┘
```

**Related tickets:** tkt_5 (7+ days, still pending), tkt_15 (2 days for store-cancelled, should be instant)

---

### Edge Case 6: Membership Sync Issues

**What happens:** User subscribes to QuickBasket Plus but benefits don't activate immediately. Delivery fees still appear, priority support badge not visible, exclusive coupons not unlocked.

**Flow:**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Subscribe to │───▶│ Payment OK   │───▶│ Benefits NOT │
│ Plus (₹149)  │    │              │    │ reflecting   │
└──────────────┘    └──────────────┘    └──────────────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │ User sees:   │
                                        │ • Delivery   │
                                        │   fees still │
                                        │   showing    │
                                        │ • No badge   │
                                        │ → Support    │
                                        └──────────────┘
```

**Related ticket:** tkt_11

**Current workaround:** Logout and login again (sometimes works)

---

### Edge Case 7: No-Bag Fallback

**What happens:** User selects "no bag" packing preference, but the order arrives in a plastic bag anyway because the packing team uses minimal bags for hygiene with loose items (vegetables, fruits).

**Flow:**

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ User selects │───▶│ ECO10 coupon │───▶│ Packer uses  │───▶│ Order arrives│
│ "No Bag"     │    │ auto-applied │    │ minimal bag  │    │ in a bag     │
│ preference   │    │ (₹10 off)    │    │ for hygiene  │    │ anyway       │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                   │
                                                                   ▼
                                                            ┌──────────────┐
                                                            │ User: "Why  │
                                                            │ did I choose │
                                                            │ no-bag if   │
                                                            │ it comes in │
                                                            │ a bag?"     │
                                                            └──────────────┘
```

**User impact:**
- User feels the "no bag" option is misleading
- They got the ₹10 ECO10 discount but the outcome contradicts the choice
- No in-app explanation of the fallback policy

**Related ticket:** tkt_12

**Proposed fix:** Add tooltip/note: "Some items may require minimal packaging for hygiene. Your ₹10 eco discount still applies."

---

### Edge Case 8: Support Resolution Flows

**Summary of how different issue types are resolved:**

| Issue Type | Typical Resolution | SLA | Example Flow |
|---|---|---|---|
| Missing item (stock flip) | Refund or store credit for missing items | 24 hours | tkt_1: Mushrooms missing → ₹150 refund |
| Damaged item | Partial refund or replacement delivery | 24 hours | tkt_7: 3 eggs broken → ₹28 refund |
| Wrong item (substitution) | Replacement delivery + store credit | 48 hours | tkt_6: Wrong toothpaste → replacement + ₹50 credit |
| Late delivery / ETA change | Explanation + delivery fee waiver | Immediate | tkt_2: Traffic delay → fee waived |
| Payment-no-order | Escalation → order creation or full refund | 2–24 hours | tkt_4: TXN025 → escalated, in progress |
| Refund delay | Re-escalation to finance team | 48 hours | tkt_5: 7-day delay → re-escalated |
| Coupon confusion | Explanation + goodwill coupon | Immediate | tkt_3: WEEKEND30 → explained min basket + gave FLAT200 |
| Membership issue | Troubleshooting + escalation | 2 hours | tkt_11: Benefits not syncing → investigating |
| Quality issue | Replacement or full credit | 24 hours | tkt_18: Overripe mangoes → replacement |
| Packing/no-bag issue | Explanation + feedback noted | Immediate | tkt_12: No-bag fallback → explained hygiene policy |

---

## Navigation Map

```
                                ┌──────────┐
                                │  Login   │
                                │ /login   │
                                └────┬─────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Location   │
                              │  /location   │
                              └──────┬───────┘
                                     │
                                     ▼
          ┌──────────────────────────────────────────────────┐
          │                     HOME                          │
          │                    /home                           │
          │  [Search] [Banners] [Categories] [Reorder]        │
          └───┬────────┬────────┬────────┬───────────────────┘
              │        │        │        │
              ▼        ▼        ▼        ▼
        ┌──────┐ ┌──────────┐ ┌────┐ ┌──────────┐
        │Search│ │Categories│ │Cart│ │  Item    │
        │      │ │/categor..│ │/car│ │ /item/[id]│
        └──────┘ └────┬─────┘ └──┬─┘ └──────────┘
                      │          │
                      ▼          ▼
               ┌──────────┐ ┌──────────┐
               │ Item     │ │ Checkout │
               │/item/[id]│ │/checkout │
               └──────────┘ └────┬─────┘
                                 │
                                 ▼
                          ┌──────────────┐
                          │   Payment    │
                          │  (in-flow)   │
                          └──────┬───────┘
                                 │
                                 ▼
                          ┌──────────────┐
                          │   Orders     │
                          │  /orders     │
                          │  /orders/[id]│
                          └──────┬───────┘
                                 │
                                 ▼
                          ┌──────────────┐
                          │   Support    │
                          │  /support    │
                          │  /support/[id│
                          └──────────────┘

  Bottom Tab Bar (persistent in /main):
  ┌────────┬────────┬────────┬────────┬────────┐
  │  Home  │ Search │  Cart  │ Orders │Profile │
  └────────┴────────┴────────┴────────┴────────┘

  Additional pages accessible from Profile/Menu:
  • /membership — Membership plans & subscription
  • /profile — User settings, addresses, preferences
  • /support — Support ticket list & creation
```

---

## Flow Coverage Matrix

| Flow | Happy Path | Edge Cases Documented | Demo Data Available |
|---|---|---|---|
| Login/Onboarding | Yes | 6 scenarios | User data in users.ts |
| Location Selection | Yes | 4 scenarios | Zones in zones.ts |
| Home Browsing | Yes | N/A (discovery) | Banners, categories, items |
| Category Browsing | Yes | N/A | 5 categories, 60 items |
| Item Detail + Add to Cart | Yes | 4 scenarios | Inventory with sync delays |
| Search | Yes | 4 scenarios | English-only limitation |
| Cart Management | Yes | 5 scenarios | Cart store in cartStore.ts |
| Coupon Application | Yes | 8 scenarios | 12 coupons with edge cases |
| Checkout | Yes | 5 scenarios | 8 delivery slots |
| Payment | Yes | 6 scenarios | 25 payments incl. orphaned |
| Order Tracking | Yes | 6 scenarios | 25 orders with timelines |
| Order History | Yes | N/A | Full order dataset |
| Support Tickets | Yes | Per-category flows | 30 tickets across 12 categories |
| Membership | Yes | 5 scenarios | 2 plans with full benefits |
| Profile | Yes | N/A | User preferences, addresses |
