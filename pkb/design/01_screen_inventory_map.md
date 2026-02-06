# Screen Inventory Map

> **QuickBasket** — Groceries & essentials in minutes
>
> This document maps every route in the application to its on-screen components and the discrete UI states each screen can occupy. Use it as the single source of truth when building, reviewing, or testing any page.

---

## Conventions

| Symbol | Meaning |
|--------|---------|
| **Component** | A visually distinct, interactive section of the screen |
| **State** | A named condition that changes what the user sees or can do |
| `→` | Transition direction (e.g., idle → loading → success) |

All screens share the **MobileShell** wrapper (`max-w-lg`, bottom padding for the tab bar) and the **BottomTabBar** (shown on main screens only, hidden on auth flows).

---

## Auth Screens

### `/login`

| Component | Description |
|-----------|-------------|
| **PhoneInput** | Country code selector + 10-digit phone field with validation |
| **OTPVerification** | 6-digit OTP input with auto-focus advance, resend timer (30 s) |
| **SkipButton** | "Skip for now" link at the bottom; navigates to `/home` as guest |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `idle` | Page load | Phone input visible, CTA disabled until valid number entered |
| `loading` | User taps "Send OTP" or "Verify" | Spinner on CTA button, inputs disabled |
| `error` | Invalid OTP / network failure | Inline red error text below OTP field, shake animation |
| `success` | OTP verified | Redirect to `/location` (new user) or `/home` (returning user) |

**Typical flow:** `idle → loading → error | success`

---

### `/location`

| Component | Description |
|-----------|-------------|
| **AddressList** | Scrollable list of saved addresses (radio selection), each showing label, full address, pin code |
| **DetectLocationButton** | GPS auto-detect CTA with permission prompt handling |
| **ManualAddressForm** | Inline form (hidden by default) for typing a new address with pin code lookup |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `detecting` | User taps "Detect my location" | Pulsing location icon, "Detecting..." label, map pin animation |
| `selected` | User picks a saved address or detection succeeds | Green check on selected row, "Continue" CTA enabled, navigate to `/home` |
| `error` | GPS permission denied or API failure | Toast: "Could not detect location. Please enter manually." |

---

## Main Screens

### `/home`

| Component | Description |
|-----------|-------------|
| **AddressBar** | Displays current delivery address with a "Change" chevron; taps open `/location` |
| **SearchBar** | Sticky search input at top; opens inline search overlay on focus |
| **BannerCarousel** | Horizontally scrollable promotional banners (auto-advances every 4 s) |
| **CategoryGrid** | 2-row horizontal scroll of circular `CategoryTile` icons linking to `/categories/[slug]` |
| **ReorderSection** | "Buy again" horizontal scroll of `ItemCard` components from past orders |
| **QuickPicksSection** | Algorithmic recommendations grid (2 columns) |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount / address change | Skeleton placeholders for banners, categories, reorder items |
| `loaded` | Data fetched | Full content rendered, pull-to-refresh enabled |
| `searching` | User types in SearchBar | Overlay with live results (debounced 300 ms), compact `ItemCard` list |

---

### `/categories`

| Component | Description |
|-----------|-------------|
| **CategoryList** | Vertical list of category cards, each with icon, name, item count badge |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount | Skeleton list (6 placeholder rows) |
| `loaded` | Data fetched | Full category list with icons and item counts |

---

### `/categories/[slug]`

| Component | Description |
|-----------|-------------|
| **PageHeader** | Category name, back arrow, optional cart icon with badge |
| **FilterBar** | Horizontal chips: Brand, Price Range, Dietary (veg/non-veg), Discount |
| **SortOptions** | Dropdown/sheet: Relevance, Price Low→High, Price High→Low, Discount |
| **ItemGrid** | 2-column grid of `ItemCard` components with infinite scroll |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount or filter change | Skeleton grid (6 placeholder cards) |
| `loaded` | Data fetched | Full item grid with pagination |
| `filtered` | User applies a filter/sort | Active filter chips highlighted in green, grid re-renders with loader |
| `empty` | No items match filters | `EmptyState` illustration: "No items match your filters" |

---

### `/item/[id]`

| Component | Description |
|-----------|-------------|
| **ItemImage** | Large product hero image with zoom-on-tap, horizontal gallery dots |
| **ItemDetails** | Brand, product name, description, nutrition/weight info |
| **VariantSelector** | Horizontal pills for weight/pack variants (e.g., 500 g, 1 kg) |
| **PriceBlock** | MRP with strike-through, sale price, discount percentage badge |
| **StockWarning** | Conditional banner: low stock (amber) or out of stock (red) |
| **AddToCartBar** | Sticky bottom bar: price summary + "ADD" button or `QuantityStepper` |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount | Skeleton image + text blocks |
| `loaded` | Data fetched, item in stock | Full product detail, ADD button active |
| `out_of_stock` | `inventory.qty === 0` | Red "Out of Stock" banner, ADD button disabled (grey), "Notify Me" toggle |
| `low_stock` | `inventory.qty <= 5` | Amber "Only X left!" badge above ADD bar |

---

### `/cart`

| Component | Description |
|-----------|-------------|
| **CartItemList** | List of cart items with `ItemCard` (compact) + `QuantityStepper` + remove button |
| **CouponSheet** | Bottom sheet: input field to type code, scrollable list of available coupons, apply/remove |
| **PackingPreference** | Radio group: "Use a bag (₹5)" / "No bag (items packed individually)" |
| **DeliveryInstructions** | Textarea for special instructions (max 200 chars) |
| **BillSummary** | Item total, delivery fee, packing fee, coupon discount, taxes, grand total |
| **ProceedButton** | Sticky bottom CTA: "Proceed to Checkout · ₹{total}" |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `empty` | No items in cart | `EmptyState`: illustration + "Your cart is empty" + "Start Shopping" CTA |
| `has_items` | ≥ 1 item in cart | Full cart view with bill summary |
| `coupon_applied` | Valid coupon code applied | Green "Coupon applied" banner, discount reflected in BillSummary, "Remove" link |
| `coupon_error` | Invalid/expired coupon | Red inline error: "This coupon is invalid or expired" |

---

### `/checkout`

| Component | Description |
|-----------|-------------|
| **AddressSelector** | Current address card with "Change" link; opens address list sheet |
| **DeliverySlotPicker** | Radio group of available time slots with delivery fee per slot |
| **PaymentMethodPicker** | Radio group: UPI, Credit/Debit Card, Cash on Delivery, Wallet |
| **OrderSummary** | Collapsed bill summary (expandable) matching `/cart` BillSummary |
| **StockWarning** | Banner if any cart item went out of stock since cart was loaded |
| **PlaceOrderButton** | Sticky CTA: "Place Order · ₹{total}" |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount | Skeleton blocks for address, slots, payment |
| `ready` | Data fetched | All selectors populated, CTA enabled |
| `placing` | User taps "Place Order" | Full-screen overlay with spinner + "Placing your order..." |
| `success` | Order confirmed by backend | Confetti animation → redirect to `/orders/[id]` |
| `failure` | Payment declined / API error | Error sheet with reason + "Retry" and "Change Payment" buttons |
| `stock_conflict` | Item unavailable during checkout | Amber banner listing affected items with "Remove & Continue" option |

---

### `/orders`

| Component | Description |
|-----------|-------------|
| **OrderList** | Vertical list of `OrderCard` components, sorted newest-first, with infinite scroll |
| **FilterTabs** | Tabs: All, Active, Delivered, Cancelled |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount | Skeleton list (4 placeholder cards) |
| `empty` | User has no orders | `EmptyState`: illustration + "No orders yet" + "Start Shopping" CTA |
| `has_orders` | ≥ 1 order exists | Full order list with pull-to-refresh |

---

### `/orders/[id]`

| Component | Description |
|-----------|-------------|
| **StatusHeader** | Large status badge (Confirmed / Packing / Out for Delivery / Delivered / Cancelled) with ETA |
| **MapPlaceholder** | Static map image placeholder (future: live tracking embed) |
| **Timeline** | Vertical stepper of `TimelineStep` components showing order progress |
| **ItemList** | Compact list of ordered items with quantities and per-item totals |
| **BillDetails** | Expandable bill breakdown matching checkout summary |
| **ActionButtons** | Contextual: "Cancel Order" (if cancellable), "Get Help", "Reorder" |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount | Skeleton header + timeline |
| `active` | Order status ∈ {confirmed, packing, out_for_delivery} | Live timeline, ETA countdown, cancel button visible |
| `delivered` | Order delivered | Green "Delivered" badge, "Reorder" CTA prominent, rating prompt |
| `cancelled` | Order cancelled | Red "Cancelled" badge, cancellation reason shown, "Reorder" CTA |

---

### `/support`

| Component | Description |
|-----------|-------------|
| **TicketList** | Vertical list of `TicketCard` components, sorted newest-first |
| **CreateTicketSheet** | Bottom sheet with category dropdown, subject input, description textarea, optional order link, submit button |
| **FilterTabs** | Tabs: All, Open, Resolved, Closed |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount | Skeleton list (3 placeholder cards) |
| `empty` | No tickets exist | `EmptyState`: illustration + "No support tickets" + "Create Ticket" CTA |
| `has_tickets` | ≥ 1 ticket exists | Full ticket list |

---

### `/support/[id]`

| Component | Description |
|-----------|-------------|
| **TicketHeader** | Ticket ID, category badge, status badge, creation date |
| **MessageThread** | Chat-style thread: user messages (right-aligned, green), agent messages (left-aligned, grey) |
| **ReplyBar** | Sticky bottom input bar with text field and send button (disabled when ticket is resolved/closed) |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount | Skeleton header + message bubbles |
| `open` | Ticket status = open | Reply bar active, send button enabled |
| `resolved` | Ticket status = resolved | Amber "Resolved" banner, reply bar shows "Reopen" option |
| `closed` | Ticket status = closed | Grey "Closed" banner, reply bar disabled with "This ticket is closed" text |

---

### `/membership`

| Component | Description |
|-----------|-------------|
| **PlanCards** | Side-by-side cards for Free vs Premium tiers, highlighted current plan |
| **BillingToggle** | Monthly / Yearly toggle with savings callout (e.g., "Save 20%") |
| **BenefitsList** | Checklist of benefits with green checkmarks for included, grey dashes for excluded |
| **FAQ** | Accordion of common membership questions |
| **CTAButton** | "Start Free Trial" (non-member) or "Current Plan" badge (member) |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loading` | Page mount | Skeleton plan cards + benefits list |
| `not_member` | User has no active membership | "Start Free Trial" CTA prominent, Premium card highlighted |
| `is_member` | User has active membership | Current plan highlighted with green border, renewal date shown, "Manage" link |

---

### `/profile`

| Component | Description |
|-----------|-------------|
| **UserCard** | Avatar (initials fallback), name, phone number, edit icon |
| **PreferenceSwitches** | Toggle switches: Push Notifications, SMS Updates, Dark Mode (future) |
| **MenuList** | Navigation links: Saved Addresses, Payment Methods, Membership, Support, About, Logout |

**States**

| State | Trigger | UI Behaviour |
|-------|---------|--------------|
| `loaded` | Page mount (data from auth store) | Full profile rendered; switches reflect stored preferences |

---

## `/pkb-preview`

Internal-only debug screen. Renders a preview of all PKB data files. No user-facing states.

---

## State Transition Summary

```
idle → loading → loaded → (user interaction) → loading → loaded
                       ↘ error → (retry) → loading
```

Every screen follows the above general pattern. Screen-specific deviations (e.g., `placing`, `out_of_stock`) are documented in their respective sections above.

---

*Last updated: 2026-02-06*
