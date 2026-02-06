# QuickBasket — Product Overview

> **Last updated:** February 2026  
> **Status:** Early-stage product, actively iterating  
> **Platform:** Mobile-first consumer web app (Next.js)

---

## 1. Product Vision

**QuickBasket** is an ultra-fast local essentials delivery service built for urban consumers in Bengaluru. The core promise: get your daily essentials — groceries, dairy, snacks, household items, and personal care products — delivered to your door in **15–30 minutes**.

We exist because generic grocery delivery apps optimize for large weekly baskets and 2-hour delivery windows. QuickBasket is purpose-built for the **small, frequent, urgent purchase** — the forgotten coriander for tonight's dinner, the milk that ran out this morning, the cleaning supplies you need before guests arrive.

### Mission Statement

*Make daily essentials as accessible as tap water — fast, reliable, and always available.*

---

## 2. Target Audience

| Segment | Description |
|---|---|
| **Primary** | Urban professionals (25–40) in Bengaluru who value time over price |
| **Secondary** | Young families with children who need frequent top-ups between big shops |
| **Tertiary** | College students and senior citizens who need convenience for small orders |

### Geographic Focus

- **City:** Bengaluru, Karnataka
- **Zones:** Currently operating across 6 active zones with defined delivery radii (2–5 km per zone)
- **Dark store model:** Hyperlocal fulfillment from neighborhood micro-warehouses

---

## 3. Core Value Proposition

### Why QuickBasket?

| Dimension | QuickBasket | Generic Grocery Apps |
|---|---|---|
| **Delivery speed** | 15–30 minutes | 1–4 hours (or next day) |
| **Order size** | Optimized for ₹100–₹500 baskets | Optimized for ₹1,000+ weekly shops |
| **Minimum order** | None (delivery fee applies) | ₹200–₹500 minimum |
| **Catalog focus** | 60+ curated essentials | 10,000+ SKUs |
| **Decision fatigue** | Low — curated, fast browsing | High — overwhelming choice |
| **Use case** | "I need this NOW" | "Let me plan my weekly groceries" |

### The 15-Minute Promise

Our target is to deliver every order within **15–30 minutes** of confirmation. We achieve this through:

1. **Hyperlocal dark stores** positioned within 2–5 km of every delivery zone
2. **Curated catalog** of 60 high-velocity items (no long-tail SKUs slowing packing)
3. **Pre-staged inventory** with real-time stock sync (though we're still improving sync latency — see known issues)
4. **Dedicated delivery fleet** with optimized routing

---

## 4. Product Catalog

### Categories (5)

| # | Category | Icon | Items | Description |
|---|---|---|---|---|
| 1 | Fruits & Vegetables | 🥬 | 15 | Fresh farm produce — bananas, apples, tomatoes, spinach, seasonal fruits |
| 2 | Dairy & Breakfast | 🥛 | 12 | Milk, bread, eggs, paneer, cheese, yogurt, cereals, honey |
| 3 | Snacks & Beverages | 🍿 | 12 | Chips, cookies, juices, tea, coffee, noodles, protein bars |
| 4 | Household Essentials | 🧹 | 11 | Cleaning products, tissue, garbage bags, foil, repellents |
| 5 | Personal Care | 🧴 | 10 | Hand wash, toothpaste, shampoo, sunscreen, grooming |

### Catalog Principles

- **Curated, not comprehensive.** We stock only high-velocity items that people need frequently.
- **Variant support.** Most items offer 2 size variants (e.g., 500g / 1kg) to balance value and convenience.
- **Brand diversity.** Mix of trusted national brands (DairyPure, CleanHome) and artisanal/organic options (GreenLeaf, FarmFresh, Ratnagiri Select).
- **Pricing.** All items display both MRP and our discounted price. Savings range from 5% to 30% off MRP.
- **Tags.** Items can be tagged as `bestseller`, `organic`, `new`, `premium`, `seasonal`, or `eco` for discovery and merchandising.

### Key Metrics

| Metric | Value |
|---|---|
| Total items | 60 |
| Total categories | 5 |
| Price range | ₹15 (coriander) – ₹650 (protein bar box) |
| Average item rating | 4.0 – 4.8 stars |
| Items with multiple variants | ~50% |
| Bestseller tagged items | 10 |

---

## 5. Revenue Model

### Revenue Streams

| Stream | Description | Current Implementation |
|---|---|---|
| **Delivery fees** | ₹0–₹29 depending on slot and order value | Express (10 min): ₹29, Standard (30 min): ₹15, 1-hour+: Free |
| **Product margins** | Markup between wholesale cost and selling price | All items priced below MRP — margin built into selling price |
| **Membership subscriptions** | Monthly/annual recurring revenue from Basic and Plus plans | Basic: ₹49/mo (₹399/yr), Plus: ₹149/mo (₹1,199/yr) |
| **Brand partnerships** | Promotional placements, banner ads, featured listings | Home page banner carousel, category-specific promotions |
| **Packing fees** | Eco-friendly packing upsell | Currently ₹0 (planned future monetization) |

### Membership Plans

| Feature | Basic (₹49/mo) | Plus (₹149/mo) |
|---|---|---|
| Free delivery threshold | Above ₹199 | Always free (no minimum) |
| Priority delivery | No | Yes — delivered first, even during peak |
| Priority support | No | Yes — skip the queue |
| Cashback | 5% per order | 10% per order |
| Exclusive coupons | Yes | Yes + Plus-only deals |
| Free replacements | No | Yes — instant for damaged/wrong items |
| Birthday reward | No | Yes |
| Express slot access | No | Free 10-minute express slots |
| Trial period | 7 days | 14 days |

---

## 6. Coupons & Promotions

The app currently supports **12 coupons** across multiple types:

| Type | Count | Examples |
|---|---|---|
| Flat discount | 5 | WELCOME50 (₹50 off first order), FLAT200 (₹200 off on ₹999+), MEMBER100 |
| Percentage discount | 4 | FRESH20 (20% off fruits & veg), SNACK25, DAIRY15, CARE20 |
| Free delivery | 1 | FREEDELIVERY (orders above ₹149) |
| Eco incentive | 1 | ECO10 (auto-applied for no-bag preference) |
| Expired/Hidden | 2 | EXPIRED50 (expired), HIDDEN99 (secret member-only code) |

### Known Coupon Issues

- **WEEKEND30** has a "weekends only" description but the system doesn't enforce the day constraint — known bug.
- **ECO10** conditions are not visible upfront in the coupon listing; users get confused because it's auto-applied based on packing preference.
- **MEMBER100** is shown to all users but only usable by members — perceived as bait by non-members.
- Discount rounding logic rounds down to nearest ₹10, which confuses users expecting exact percentages.

---

## 7. Delivery Infrastructure

### Delivery Slots

| Slot | Window | Fee | Type |
|---|---|---|---|
| Express | 10 minutes | ₹29 | Express |
| Standard | 30 minutes | ₹15 | Standard |
| 1 Hour | 60 minutes | Free | Standard |
| Scheduled AM | 9–11 AM, 11 AM–1 PM | Free | Scheduled |
| Scheduled PM | 2–4 PM, 5–7 PM, 7–9 PM | Free | Scheduled |

### Packing Preferences

| Option | Description |
|---|---|
| **Standard** | Regular plastic/paper bags |
| **No bag** | Minimal packaging; qualifies for ECO10 coupon. Note: loose items (vegetables) may still get a minimal hygiene bag — this is a known point of user confusion. |
| **Eco-friendly** | Biodegradable paper-based materials; replaces all plastic. Currently no extra charge. |

---

## 8. Competitive Positioning

```
                    Fast ──────────────────────── Slow
                     │                              │
              ┌──────┼──────┐                       │
              │  QuickBasket │                       │
              │  (15-30 min) │                       │
              └──────┼──────┘                       │
                     │          ┌──────────────┐    │
    Small            │          │ Zepto/Blinkit│    │     Large
    Basket ──────────┤          │  (10-30 min) │────┤     Basket
                     │          └──────────────┘    │
                     │                     ┌────────┤
                     │                     │BigBasket│
                     │                     │(1-4 hr) │
                     │                     └────────┘
                     │                              │
                    Fast ──────────────────────── Slow
```

### Differentiators

1. **Curated catalog** — We don't try to be everything. 60 items, not 60,000.
2. **Mobile-first UX** — Designed for one-handed phone use while cooking or between meetings.
3. **Transparent edge cases** — We surface stock changes, ETA updates, and substitutions honestly (improving, not perfect).
4. **Membership that matters** — Plus membership pays for itself with 3+ orders/week through free delivery and cashback.

---

## 9. Current Stage & Known Issues

### Stage: Early Product

- **Launched:** Late 2025 in Bengaluru
- **Users:** Single demo user in current build (expanding)
- **Catalog:** 60 items across 5 categories
- **Orders:** 25 historical orders in demo data
- **Support tickets:** 30 tickets across various issue categories

### Active Known Issues

| Issue | Severity | Description |
|---|---|---|
| Stock sync latency | High | Inventory can show items as available that are actually out of stock. Causes "stock flip" at packing. |
| ETA accuracy | Medium | ETA estimates don't account for traffic/weather. Users see ETA changes post-order without notification. |
| Payment-order gap | Critical | Rare edge case where UPI payment succeeds but order creation fails. Customer sees money deducted, no order. |
| Coupon error messages | Low | Generic "coupon not applicable" instead of specific reason (min basket, category, etc.). |
| No-bag fallback | Low | "No bag" orders may still arrive in bags for hygiene reasons. No in-app explanation. |
| Refund delays | Medium | Refund SLA (3–5 days) not consistently met. Some refunds get stuck in processing. |
| Membership sync | Medium | New subscriptions can take time to reflect in the app. Benefits may not appear immediately. |
| Search (English only) | Low | No support for Hindi/Kannada terms (e.g., "dahi" → no results). |

### Iteration Focus (Current Quarter)

1. Fix stock sync pipeline to reduce stock flip incidents by 80%
2. Implement proactive ETA change notifications (push + in-app)
3. Add specific coupon rejection reasons in error messages
4. Improve payment-order atomicity to eliminate orphaned payments
5. Expand catalog to 100+ items with 2 new categories (Bakery, Baby Care)

---

## 10. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui components |
| State management | Zustand (auth store, cart store) |
| Data layer | Static TypeScript mock data (simulating API responses with artificial delays) |
| Services | Mock service layer with `catalogService`, `orderService`, `couponService`, `membershipService`, `supportService`, `userService` |

### Architecture Notes

- **Mobile-first shell** with `MobileShell` wrapper component and `BottomTabBar` navigation
- **Route groups** separate auth flows `(auth)` from main app `(main)`
- **Mock service layer** introduces realistic delays and edge cases to simulate production behavior
- **Inventory simulation** includes `hasSyncDelay` flag to model stale stock scenarios
