# Future Mockups & UI Improvement Notes

> **QuickBasket** — Ideas for the next design iteration
>
> This document captures 10 proposed UI improvements that the PM agent (or design team) can evaluate, prioritise, and turn into actionable specs. Each item includes the problem it solves, a description of the proposed solution, affected screens, and implementation complexity.

---

## Table of Contents

1. [Real-Time Inventory Badge on Item Cards](#1-real-time-inventory-badge-on-item-cards)
2. [Substitution Consent Flow During Packing](#2-substitution-consent-flow-during-packing)
3. [ETA Change Push Notification with Explanation](#3-eta-change-push-notification-with-explanation)
4. [Better Coupon Error Messages with Specific Reason](#4-better-coupon-error-messages-with-specific-reason)
5. [Address Change Before Packing Starts](#5-address-change-before-packing-starts)
6. [One-Tap Reorder from Order Detail](#6-one-tap-reorder-from-order-detail)
7. [Hindi / Multi-Language Search Support](#7-hindi--multi-language-search-support)
8. [Live Delivery Tracking Map](#8-live-delivery-tracking-map)
9. [Membership Comparison Table on Checkout](#9-membership-comparison-table-on-checkout)
10. [No-Bag Education Tooltip](#10-no-bag-education-tooltip)

---

## 1. Real-Time Inventory Badge on Item Cards

### Problem
Users add items to their cart only to discover at checkout that the item is out of stock or low in stock. This creates friction and abandoned checkouts.

### Proposed Solution
Add a small, contextual inventory badge directly on each `ItemCard` component:

- **Low stock (qty ≤ 5):** Amber pill badge — `"Only 3 left"`
- **Out of stock (qty = 0):** Red overlay with `"Out of Stock"` text, ADD button disabled
- **In stock (qty > 5):** No badge (clean default)

### Visual Spec
```
┌──────────────────┐
│   [Product Img]  │
│  ┌──────────────┐│
│  │ Only 3 left  ││  ← amber badge, bottom-left of image
│  └──────────────┘│
│  Brand Name      │
│  Product Name    │
│  ₹99  ₹129  23% │
│     [  ADD  ]    │
└──────────────────┘
```

### Affected Screens
`/home` (reorder section, quick picks), `/categories/[slug]`, search results

### Complexity
**Low** — Requires passing `inventory.qty` to `ItemCard` and conditionally rendering a badge. No new API calls needed if inventory data is already included in item responses.

### Open Questions
- Should we use WebSocket for real-time updates, or is polling on page load sufficient?
- How frequently should inventory counts refresh on long-browsing sessions?

---

## 2. Substitution Consent Flow During Packing

### Problem
When a packer discovers an item is unavailable during order fulfillment, the order may be delayed while waiting for the customer to respond (or the item is simply removed without consent).

### Proposed Solution
Introduce a **substitution consent modal** delivered via push notification + in-app overlay:

1. **Push notification:** "{Item} is unavailable. Tap to review a suggested substitute."
2. **In-app modal:** Shows original item vs. suggested substitute with price comparison
3. **Actions:** "Accept Substitute" / "Remove Item" / "Cancel Order"
4. **Timeout:** If no response in 3 minutes, fall back to "Remove Item"

### Wireframe
```
┌─────────────────────────────┐
│  Substitution Available      │
├─────────────────────────────┤
│  ┌─────┐    →    ┌─────┐   │
│  │ Img │         │ Img │   │
│  │Orig │         │ Sub │   │
│  │₹120 │         │₹115 │   │
│  └─────┘         └─────┘   │
│                             │
│  Amul Butter 500g is        │
│  unavailable. We suggest:   │
│  Amul Butter 200g × 2      │
│                             │
│  [Accept Substitute]  green │
│  [Remove Item]       outline│
│  [Cancel Order]        text │
│           ⏱ 2:45 remaining │
└─────────────────────────────┘
```

### Affected Screens
New overlay (renders on top of any screen), `/orders/[id]` timeline

### Complexity
**High** — Requires real-time notification infrastructure (FCM / WebSocket), packer-side UI, and timeout logic.

---

## 3. ETA Change Push Notification with Explanation

### Problem
When delivery is delayed, users receive a generic "Your order is delayed" notification with no context, leading to frustration and support tickets.

### Proposed Solution
Enhance ETA-change notifications with a **specific, empathetic reason** and the updated ETA:

| Reason Code | Notification Copy |
|-------------|-------------------|
| `high_demand` | "Due to high demand in your area, your delivery is now expected by {new_time}. Thanks for your patience!" |
| `weather` | "Bad weather is causing delays. New ETA: {new_time}. Stay safe!" |
| `partner_reassigned` | "Your delivery partner changed. New ETA: {new_time}." |
| `packing_delay` | "Packing is taking a bit longer. New ETA: {new_time}." |

Also update the `/orders/[id]` timeline with a new `TimelineStep`:
- Icon: `Clock`
- Label: "ETA Updated"
- Note: reason text

### Affected Screens
Push notifications, `/orders/[id]` (timeline)

### Complexity
**Medium** — Backend needs to send reason codes with ETA updates. Frontend changes are minimal (new timeline step type + notification template).

---

## 4. Better Coupon Error Messages with Specific Reason

### Problem
Current coupon errors are vague ("Invalid coupon"). Users don't know if the code is wrong, expired, or simply not applicable to their cart.

### Proposed Solution
Map each backend error code to a specific, actionable error message:

| Error Code | Current Message | Proposed Message |
|------------|----------------|------------------|
| `INVALID_CODE` | Invalid coupon | This coupon code doesn't exist. Double-check and try again. |
| `EXPIRED` | Invalid coupon | This coupon expired on {date}. Browse other available offers below. |
| `MIN_ORDER` | Invalid coupon | Add ₹{remaining} more to use this coupon (min. order ₹{min}). |
| `MAX_USES` | Invalid coupon | You've already used this coupon the maximum number of times. |
| `NOT_APPLICABLE` | Invalid coupon | This coupon doesn't apply to the items in your cart. It's valid for: {categories}. |
| `FIRST_ORDER_ONLY` | Invalid coupon | This coupon is for first-time orders only. |

### Visual Enhancement
Show a yellow info box below the error with a "See available coupons" link to scroll the user to the available coupons list.

### Affected Screens
`/cart` (CouponSheet)

### Complexity
**Low** — Backend already has error codes; frontend just needs better message mapping and a minor UI addition.

---

## 5. Address Change Before Packing Starts

### Problem
Users sometimes realise they selected the wrong delivery address after placing an order, but there's no self-service way to change it.

### Proposed Solution
Add an **"Edit Address"** button on `/orders/[id]` that is visible only when the order status is `confirmed` (before packing begins):

1. Tap "Edit Address" → opens `AddressSelector` sheet
2. Select new address → confirm change
3. Backend validates the new address is serviceable from the assigned warehouse
4. If valid: update order, show success toast
5. If invalid (different zone): show error: "This address is in a different delivery zone. Please contact support."

### Rules
- Button disappears once status moves to `packing` or later
- Maximum 1 address change per order
- Zone validation is mandatory

### Affected Screens
`/orders/[id]` (new action button + address sheet)

### Complexity
**Medium** — Requires a new API endpoint for address updates with zone validation. Frontend changes are straightforward.

---

## 6. One-Tap Reorder from Order Detail

### Problem
Users who want to reorder must navigate to the home page "Buy Again" section and manually find each item. There's no quick reorder flow from the order detail page.

### Proposed Solution
Add a prominent **"Reorder"** CTA on `/orders/[id]` (for `delivered` and `cancelled` orders):

1. Tap "Reorder"
2. System checks current availability of all items in the order
3. **All available:** Add all items to cart → navigate to `/cart` with success toast
4. **Some unavailable:** Show a confirmation sheet listing unavailable items with option to "Add Available Items Only" or "Cancel"
5. **All unavailable:** Show error: "None of these items are currently available."

### Wireframe
```
┌─────────────────────────────┐
│  Some items are unavailable  │
├─────────────────────────────┤
│  ✓ Amul Milk 1L             │
│  ✓ Bread - White            │
│  ✗ Eggs (12 pack) — Out     │
│                             │
│  [Add Available Items]  green│
│  [Cancel]              outline│
└─────────────────────────────┘
```

### Affected Screens
`/orders/[id]` (new CTA), `/cart` (items added)

### Complexity
**Medium** — Needs availability check API and cart batch-add logic. UI is a simple sheet + toast.

---

## 7. Hindi / Multi-Language Search Support

### Problem
Many users in tier-2/tier-3 cities search for products in Hindi (Devanagari script) or transliterated Hindi (e.g., "atta" for flour, "doodh" for milk). The current search only matches English product names.

### Proposed Solution

1. **Transliteration mapping:** Maintain a curated map of common Hindi search terms → English product names (e.g., `दूध` → "milk", `atta` → "wheat flour")
2. **Multi-script tokenisation:** Index products with both English and Hindi names
3. **Search UI:** Support mixed-script input. Add a subtle language toggle icon in the search bar (optional)
4. **Autocomplete:** Show suggestions in the user's input language

### Phase 1 (Quick win)
- Transliteration alias map for top 200 search terms
- Server-side synonym matching

### Phase 2 (Full i18n)
- Full app localisation with language picker in profile
- Hindi, Tamil, Telugu, Kannada support

### Affected Screens
`/home` (search bar), `/categories/[slug]` (results)

### Complexity
**Phase 1: Low-Medium** — Alias map + search service update.
**Phase 2: High** — Full i18n framework, translation management, RTL considerations for some languages.

---

## 8. Live Delivery Tracking Map

### Problem
The current `/orders/[id]` page shows a static map placeholder. Users have no real-time visibility into where their delivery is.

### Proposed Solution
Replace the `MapPlaceholder` with an embedded **live tracking map** (e.g., Google Maps / Mapbox):

- **Map view:** Shows the delivery partner's real-time location as a moving green pin, the user's address as the destination pin, and the estimated route
- **Partner info card:** Overlay at bottom with partner name, photo, vehicle type, phone call button
- **ETA ticker:** "Arriving in ~{minutes} min" updates every 30 seconds
- **Fallback:** If location data is unavailable, show static map with last known location + "Location updating..." label

### Technical Requirements
- WebSocket or SSE connection for partner location updates (every 10 s)
- Map SDK integration (Mapbox GL JS recommended for mobile-first)
- Battery-friendly location sampling on partner's device

### Affected Screens
`/orders/[id]` (replace `MapPlaceholder`)

### Complexity
**High** — Requires map SDK integration, real-time location infrastructure, and partner-side location sharing.

---

## 9. Membership Comparison Table on Checkout

### Problem
Non-member users don't realise how much they'd save with a Premium membership. The membership page exists, but users rarely visit it during checkout.

### Proposed Solution
Show a **contextual savings banner** on the `/checkout` page for non-members:

```
┌─────────────────────────────────┐
│  💎 Save ₹{amount} on this      │
│     order with Premium           │
│                                  │
│  ┌─────────┬─────────┐          │
│  │  Free   │ Premium │          │
│  ├─────────┼─────────┤          │
│  │ Del ₹29 │ Del FREE│          │
│  │ Bag ₹5  │ Bag FREE│          │
│  │ Total   │ Total   │          │
│  │ ₹534    │ ₹500    │          │
│  └─────────┴─────────┘          │
│                                  │
│  [Start Free Trial →]            │
└─────────────────────────────────┘
```

### Rules
- Only shown to non-members
- Only shown when potential savings ≥ ₹20
- "Start Free Trial" links to `/membership`
- Dismissible (remember dismiss for current session)

### Affected Screens
`/checkout` (new banner component above Place Order button)

### Complexity
**Low** — Pure frontend calculation using existing membership pricing data. No new APIs needed.

---

## 10. No-Bag Education Tooltip

### Problem
The "No bag" packing option has a nuanced fallback rule: if an item doesn't have original packaging, a bag is used anyway (and the fee applies). Users don't understand this and file complaints.

### Proposed Solution
Add an **info tooltip** (ℹ️ icon) next to the "No bag" packing option that expands into an educational popover:

### Tooltip Content
> **How "No bag" works:**
>
> We'll pack items in their original packaging (boxes, cartons, bottles). If any item doesn't have its own packaging (e.g., loose fruits, bakery items), we'll use a bag for those items only — a ₹5 packing fee will apply.
>
> **Tip:** Check the "Bag" option if you'd like all items in a single carry bag.

### Visual Spec
- Trigger: `ℹ️` icon (16 px, `text-gray-400`) next to "No bag" label
- Popover: shadcn `Popover` component, max-width 280 px
- Arrow pointing to the trigger icon
- Dismiss on tap outside

### Affected Screens
`/cart` (packing preference section)

### Complexity
**Very Low** — Single popover component with static text. No backend changes.

---

## Priority Matrix

| # | Improvement | Impact | Effort | Priority |
|---|-------------|--------|--------|----------|
| 1 | Inventory badge | High | Low | **P0** |
| 4 | Coupon error messages | High | Low | **P0** |
| 10 | No-bag tooltip | Medium | Very Low | **P0** |
| 9 | Membership comparison | High | Low | **P1** |
| 6 | One-tap reorder | High | Medium | **P1** |
| 5 | Address change | Medium | Medium | **P1** |
| 3 | ETA notifications | Medium | Medium | **P2** |
| 2 | Substitution consent | High | High | **P2** |
| 7 | Multi-language search | High | Medium-High | **P2** |
| 8 | Live tracking map | High | High | **P3** |

---

## How to Use This Document

1. **PM Agent:** Pick items from the priority matrix for the next sprint. Create detailed specs by expanding the wireframes and open questions.
2. **Design Team:** Use the wireframes as starting points for high-fidelity mockups in Figma.
3. **Engineering:** Reference the complexity estimates and technical requirements for sprint planning.
4. **QA:** Use the affected screens list to plan test coverage.

---

*Last updated: 2026-02-06*
