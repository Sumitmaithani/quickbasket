# Component Catalog

> **QuickBasket** — Reusable component reference
>
> This catalog documents every shared component used across QuickBasket screens. Each entry includes its purpose, props/slots, visual specifications, and usage notes. Components are built with **shadcn/ui** primitives and styled with **Tailwind CSS** using the green theme (`#16a34a` / `green-600`).

---

## Table of Contents

1. [Layout Components](#layout-components)
2. [Navigation Components](#navigation-components)
3. [Product Components](#product-components)
4. [Cart & Checkout Components](#cart--checkout-components)
5. [Order Components](#order-components)
6. [Support Components](#support-components)
7. [Feedback & State Components](#feedback--state-components)
8. [Promotional Components](#promotional-components)

---

## Layout Components

### MobileShell

The root layout wrapper for all pages. Enforces mobile-first sizing and provides safe area for the bottom tab bar.

| Property | Value |
|----------|-------|
| **Max width** | `max-w-lg` (512 px) |
| **Centering** | `mx-auto` |
| **Min height** | `min-h-screen` |
| **Bottom padding** | `pb-20` (80 px — clearance for BottomTabBar) |
| **Background** | `bg-gray-50` |
| **Breakpoint** | Designed for 375 px viewport, scales up to 512 px |

```
┌──────────────────────────┐
│       MobileShell        │
│  ┌────────────────────┐  │
│  │    Page Content     │  │
│  │                    │  │
│  │                    │  │
│  │                    │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │   BottomTabBar      │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

**Usage:** Wraps `(main)/layout.tsx`. Auth pages (`/login`, `/location`) use MobileShell without the tab bar.

---

### PageHeader

A consistent top bar used on inner pages (not the home screen).

| Slot / Prop | Type | Description |
|-------------|------|-------------|
| `title` | `string` | Page title, centered or left-aligned |
| `showBack` | `boolean` | Shows a `←` back arrow (navigates via `router.back()`) |
| `rightAction` | `ReactNode` | Optional right-side slot (e.g., cart icon, filter icon) |

**Styling:**
- Height: `h-14` (56 px)
- Background: `bg-white`
- Border: `border-b border-gray-100`
- Title: `text-lg font-semibold text-gray-900`
- Back icon: `w-5 h-5 text-gray-700`

---

## Navigation Components

### BottomTabBar

Persistent bottom navigation shown on all main screens (hidden on auth routes).

| Tab | Icon | Label | Route | Badge |
|-----|------|-------|-------|-------|
| 1 | `Home` | Home | `/home` | — |
| 2 | `Grid` | Categories | `/categories` | — |
| 3 | `ShoppingCart` | Cart | `/cart` | Item count (red circle badge) |
| 4 | `Package` | Orders | `/orders` | — |
| 5 | `User` | Profile | `/profile` | — |

**Styling:**
- Position: `fixed bottom-0`
- Width: `w-full max-w-lg`
- Height: `h-16` (64 px)
- Background: `bg-white`
- Border: `border-t border-gray-200`
- Active tab: icon and label in `text-green-600` (`#16a34a`)
- Inactive tab: `text-gray-400`
- Cart badge: `bg-red-500 text-white text-xs` absolute positioned circle, min-width 18 px

**Behaviour:**
- Active state determined by `usePathname()` matching
- Cart badge reads from `cartStore` (Zustand)
- Hidden during auth flow and checkout placing state

---

## Product Components

### ItemCard

The primary product display component used in grids, search results, and cart lists.

**Variants:**

| Variant | Context | Layout |
|---------|---------|--------|
| `default` | Category grid, home reorder | Vertical card, image on top |
| `compact` | Search results, cart list | Horizontal row, small thumbnail left |

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `item` | `Item` | Product data object |
| `variant` | `"default" \| "compact"` | Layout variant |
| `onAdd` | `() => void` | Add to cart callback |
| `onIncrement` | `() => void` | Increment quantity |
| `onDecrement` | `() => void` | Decrement quantity |
| `quantity` | `number` | Current cart quantity (0 = show ADD button) |

**Visual Specs (default variant):**
- Card: `bg-white rounded-xl shadow-sm border border-gray-100`
- Image: `aspect-square rounded-t-xl object-cover`
- Brand: `text-xs text-gray-500 uppercase tracking-wide`
- Name: `text-sm font-medium text-gray-900 line-clamp-2`
- Variant label: `text-xs text-gray-500` (e.g., "500 g")
- MRP: `text-xs text-gray-400 line-through`
- Price: `text-sm font-bold text-gray-900`
- Discount: `bg-green-100 text-green-700 text-xs font-semibold px-1.5 py-0.5 rounded`
- ADD button: `bg-green-600 text-white text-sm font-semibold rounded-lg px-4 py-1.5`
- Out-of-stock overlay: semi-transparent grey overlay with "Out of Stock" text

**Visual Specs (compact variant):**
- Row: `flex gap-3 items-center p-3`
- Thumbnail: `w-16 h-16 rounded-lg`
- Text stack: flex-1, same typography but single-line truncation
- Stepper: right-aligned `QuantityStepper`

---

### QuantityStepper

Inline quantity control used inside `ItemCard` and `CartItemList`.

**Visual Specs:**
- Shape: Pill (`rounded-full`)
- Background: `bg-green-600`
- Text/icons: `text-white`
- Height: `h-8`
- Min width: `min-w-[96px]`
- Layout: `[−]  count  [+]` evenly spaced
- Minus icon: `Minus` (16 px)
- Plus icon: `Plus` (16 px)
- Count: `text-sm font-bold`

**Behaviour:**
- Appears when `quantity >= 1` (replaces the ADD button)
- Decrementing to 0 reverts to ADD button
- Haptic feedback on tap (if supported)

---

### VariantSelector

Horizontal pill selector for product weight/pack size variants on the item detail page.

**Visual Specs:**
- Layout: horizontal scroll, `flex gap-2`
- Pill (inactive): `border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-700`
- Pill (active): `bg-green-600 text-white border-green-600 rounded-full px-3 py-1 text-sm font-semibold`

---

### CategoryTile

Circular icon with label, used in the home page category grid.

**Visual Specs:**
- Container: `flex flex-col items-center gap-1.5 w-16`
- Icon circle: `w-14 h-14 rounded-full bg-green-50 flex items-center justify-center`
- Icon: `w-7 h-7 text-green-600`
- Label: `text-xs text-gray-700 text-center line-clamp-1`

---

## Cart & Checkout Components

### CouponSheet

Bottom sheet for applying promotional coupons.

**Structure:**
```
┌─────────────────────────────┐
│  Apply Coupon          ✕    │
├─────────────────────────────┤
│  [Enter coupon code] [Apply]│
├─────────────────────────────┤
│  Available Coupons          │
│  ┌─────────────────────┐    │
│  │ FRESH20 — 20% off   │    │
│  │ Min order ₹200      │    │
│  │           [Apply]   │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ FREEDELIVERY        │    │
│  │ Free delivery > ₹99 │    │
│  │           [Apply]   │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

**Uses:** shadcn `Sheet` component (bottom drawer)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Sheet visibility |
| `onOpenChange` | `(open: boolean) => void` | Toggle handler |
| `onApply` | `(code: string) => void` | Apply coupon callback |
| `onRemove` | `() => void` | Remove applied coupon |
| `appliedCode` | `string \| null` | Currently applied coupon code |
| `availableCoupons` | `Coupon[]` | List of available coupons |

---

### AddressSelector

Radio-style address picker used on the checkout page.

**Visual Specs:**
- Each address: `Card` with radio indicator, label badge (Home/Work/Other), full address text, pin code
- Selected: `border-green-600 bg-green-50`
- Unselected: `border-gray-200`
- "Add New Address" link at bottom

---

### DeliverySlotPicker

Radio group of available delivery time slots.

**Visual Specs:**
- Each slot: `RadioGroupItem` styled as a card
- Content: time range (e.g., "10:00 AM – 12:00 PM"), delivery fee (e.g., "₹29" or "FREE")
- Selected: green border + green radio dot
- Disabled/full slot: grey text, "Slot Full" badge

---

### PaymentMethodPicker

Radio group for selecting a payment method at checkout.

**Supported methods:**
- UPI (with saved VPA display)
- Credit/Debit Card (with masked last 4 digits)
- Cash on Delivery
- Wallet (with balance display)

**Visual Specs:**
- Each method: icon + label + optional detail text
- Selected: green radio indicator
- COD: shows "₹5 handling fee" note

---

## Order Components

### OrderCard

Summary card for the order list page (`/orders`).

**Visual Specs:**
- Card: `bg-white rounded-xl shadow-sm border border-gray-100 p-4`
- Header row: Order ID (`text-sm font-mono text-gray-500`) + Status badge
- Items summary: `text-sm text-gray-700` — first 2 item names + "+X more"
- Footer row: Total (`font-semibold`) + Date (`text-xs text-gray-400`)

**Status badge colours:**

| Status | Badge Style |
|--------|-------------|
| Confirmed | `bg-blue-100 text-blue-700` |
| Packing | `bg-amber-100 text-amber-700` |
| Out for Delivery | `bg-purple-100 text-purple-700` |
| Delivered | `bg-green-100 text-green-700` |
| Cancelled | `bg-red-100 text-red-700` |

---

### TimelineStep

Vertical timeline item used on the order detail page.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `LucideIcon` | Step icon (e.g., `CheckCircle`, `Truck`) |
| `label` | `string` | Status label (e.g., "Order Confirmed") |
| `timestamp` | `string \| null` | Formatted date/time, `null` if step not reached |
| `note` | `string \| null` | Optional detail (e.g., "Packing started by warehouse") |
| `isActive` | `boolean` | Whether this is the current step |
| `isCompleted` | `boolean` | Whether this step is in the past |

**Visual Specs:**
- Completed icon: `text-green-600`
- Active icon: `text-green-600` with pulse animation
- Future icon: `text-gray-300`
- Connector line: `border-l-2` — green if completed, dashed grey if future
- Label: `text-sm font-medium`
- Timestamp: `text-xs text-gray-400`
- Note: `text-xs text-gray-500 italic`

---

## Support Components

### TicketCard

Summary card for the support tickets list (`/support`).

**Visual Specs:**
- Card: `bg-white rounded-xl shadow-sm border border-gray-100 p-4`
- Header row: Status badge + Category badge
- Subject: `text-sm font-medium text-gray-900`
- Footer row: Linked Order ID (if any) + Date

**Status badge colours:**

| Status | Badge Style |
|--------|-------------|
| Open | `bg-amber-100 text-amber-700` |
| Resolved | `bg-green-100 text-green-700` |
| Closed | `bg-gray-100 text-gray-500` |

---

### MessageBubble *(internal to `/support/[id]`)*

Chat-style message bubble used in the ticket thread.

| Sender | Alignment | Background | Text Color |
|--------|-----------|------------|------------|
| User | Right | `bg-green-600` | `text-white` |
| Agent | Left | `bg-gray-100` | `text-gray-900` |

- Max width: `max-w-[80%]`
- Border radius: `rounded-2xl` with flat corner on sender side
- Timestamp: `text-[10px] text-gray-400` below bubble

---

## Feedback & State Components

### LoadingSpinner

Inline spinner used inside buttons and small loading areas.

**Visual Specs:**
- SVG circle animation
- Size variants: `sm` (16 px), `md` (24 px), `lg` (32 px)
- Colour: `text-green-600` (default), `text-white` (on green backgrounds)

---

### LoadingScreen

Full-page loading state with centered spinner and optional message.

**Visual Specs:**
- Centred vertically and horizontally
- `LoadingSpinner` (lg) + `text-sm text-gray-500` message below
- Background: `bg-gray-50`

---

### ErrorState

Error feedback component with retry action.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Error headline (e.g., "Something went wrong") |
| `message` | `string` | Detail text |
| `onRetry` | `() => void` | Retry callback |

**Visual Specs:**
- Illustration: `AlertTriangle` icon in `text-red-400` (48 px)
- Title: `text-lg font-semibold text-gray-900`
- Message: `text-sm text-gray-500`
- Retry button: `variant="outline"` with `text-green-600 border-green-600`

---

### EmptyState

Placeholder for screens with no data.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `LucideIcon` | Contextual icon |
| `title` | `string` | Headline |
| `message` | `string` | Subtitle |
| `actionLabel` | `string` | CTA button text |
| `onAction` | `() => void` | CTA callback |

**Visual Specs:**
- Centred layout, `py-16`
- Icon: `w-16 h-16 text-gray-300`
- Title: `text-lg font-semibold text-gray-700`
- Message: `text-sm text-gray-400`
- CTA: `bg-green-600 text-white rounded-lg`

---

## Promotional Components

### BannerCarousel

Horizontal scrolling promo banners on the home page.

**Visual Specs:**
- Container: horizontal scroll with `snap-x snap-mandatory`, `gap-3`, `px-4`
- Banner card: `w-[85vw] max-w-sm aspect-[2/1] rounded-2xl overflow-hidden`
- Content: background image with gradient overlay, title + subtitle text
- Dots indicator: `flex gap-1.5` centred below carousel
  - Active dot: `w-6 h-1.5 bg-green-600 rounded-full`
  - Inactive dot: `w-1.5 h-1.5 bg-gray-300 rounded-full`
- Auto-advance: every 4 seconds, pauses on touch

---

## Design Tokens Reference

All components adhere to the following shared tokens:

| Token | Tailwind Class | Value |
|-------|---------------|-------|
| Primary | `green-600` | `#16a34a` |
| Primary Light | `green-50` | `#f0fdf4` |
| Primary Hover | `green-700` | `#15803d` |
| Background | `gray-50` | `#f9fafb` |
| Surface | `white` | `#ffffff` |
| Text Primary | `gray-900` | `#111827` |
| Text Secondary | `gray-500` | `#6b7280` |
| Text Muted | `gray-400` | `#9ca3af` |
| Border | `gray-200` | `#e5e7eb` |
| Error | `red-500` | `#ef4444` |
| Warning | `amber-500` | `#f59e0b` |
| Success | `green-600` | `#16a34a` |
| Border Radius (card) | `rounded-xl` | 12 px |
| Border Radius (button) | `rounded-lg` | 8 px |
| Border Radius (pill) | `rounded-full` | 9999 px |

---

*Last updated: 2026-02-06*
