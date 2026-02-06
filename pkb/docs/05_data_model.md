# 05 — Data Model

> Complete data model reference for QuickBasket.
> All types are defined in `src/types/index.ts`.
> Last updated: 2026-02-06

---

## Table of Contents

1. [Entity Relationship Overview](#entity-relationship-overview)
2. [User & Auth](#user--auth)
3. [Address & Zone](#address--zone)
4. [Category & Item](#category--item)
5. [Inventory](#inventory)
6. [Cart](#cart)
7. [Coupon](#coupon)
8. [Payment](#payment)
9. [Order](#order)
10. [Delivery](#delivery)
11. [Support](#support)
12. [Membership](#membership)
13. [Banner](#banner)
14. [Enum Reference](#enum-reference)

---

## Entity Relationship Overview

```
User ─────────┬── has many ──→ Address ──→ belongs to ──→ Zone
              ├── has one ───→ Cart
              ├── has many ──→ Order
              ├── has many ──→ SupportTicket
              ├── has many ──→ SavedPaymentMethod
              └── has one ───→ MembershipPlan (optional)

Item ──────────┬── has many ──→ ItemVariant
               └── belongs to → Category

InventoryRecord ── references → Item + ItemVariant + Zone

Cart ──────────── has many ──→ CartItem ──→ references → Item + ItemVariant

Order ─────────┬── has many ──→ OrderItem ──→ references → Item + ItemVariant
               ├── has many ──→ OrderTimeline
               ├── has one ───→ Payment
               ├── has one ───→ DeliverySlot
               ├── has one ───→ Address
               ├── has one ───→ Zone
               └── has one ───→ Coupon (optional)

SupportTicket ─┬── has many ──→ TicketMessage
               ├── references → Order (optional)
               └── references → User

Banner ────────── standalone (links to routes)
```

---

## User & Auth

### User

Represents a registered QuickBasket customer.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique user identifier (e.g., `"user_1"`) |
| `name` | `string` | Yes | Full name of the user |
| `phone` | `string` | Yes | Phone number with country code (e.g., `"+91 98765 43210"`) |
| `email` | `string` | Yes | Email address |
| `avatarUrl` | `string` | No | URL to user's profile picture |
| `isMember` | `boolean` | Yes | Whether the user has an active membership |
| `membershipPlanId` | `string` | No | ID of the active membership plan (`"plan_basic"` or `"plan_plus"`) |
| `preferences` | `UserPreferences` | Yes | User's app preferences |
| `defaultAddressId` | `string` | No | ID of the user's default delivery address |
| `createdAt` | `string` (ISO 8601) | Yes | Account creation timestamp |

### UserPreferences

Nested object within `User`.

| Field | Type | Required | Description |
|---|---|---|---|
| `vegOnly` | `boolean` | Yes | Filter catalog to show only veg items |
| `noBag` | `boolean` | Yes | Default packing preference to "no bag" |
| `ecoPacking` | `boolean` | Yes | Default packing preference to "eco friendly" |
| `notificationsEnabled` | `boolean` | Yes | Whether push notifications are enabled |

---

## Address & Zone

### Address

A saved delivery address for a user.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique address identifier (e.g., `"addr_1"`) |
| `userId` | `string` | Yes | FK → `User.id` |
| `label` | `string` | Yes | Display label (e.g., `"Home"`, `"Office"`, or custom) |
| `line1` | `string` | Yes | Primary address line |
| `line2` | `string` | No | Secondary address line (area, landmark) |
| `city` | `string` | Yes | City name |
| `state` | `string` | Yes | State name |
| `pincode` | `string` | Yes | Postal code |
| `lat` | `number` | Yes | Latitude coordinate |
| `lng` | `number` | Yes | Longitude coordinate |
| `zoneId` | `string` | Yes | FK → `Zone.id` — delivery zone this address falls in |
| `isDefault` | `boolean` | Yes | Whether this is the user's default address |

**Relationships:**
- Belongs to one `User` (via `userId`)
- Belongs to one `Zone` (via `zoneId`)

### Zone

A delivery zone in Bengaluru. Zones determine delivery availability and ETA.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique zone identifier (e.g., `"zone_1"`) |
| `name` | `string` | Yes | Zone name (e.g., `"Koramangala"`) |
| `code` | `string` | Yes | Short code (e.g., `"KRM"`) |
| `city` | `string` | Yes | City name (currently always `"Bengaluru"`) |
| `isActive` | `boolean` | Yes | Whether delivery is available in this zone |
| `deliveryRadiusKm` | `number` | Yes | Maximum delivery radius in kilometers |
| `avgDeliveryMinutes` | `number` | Yes | Average delivery time in minutes |

**Active Zones:** Koramangala (KRM), Indiranagar (IND), HSR Layout (HSR), Whitefield (WTF)
**Inactive Zones:** Jayanagar (JAY)

---

## Category & Item

### Category

A product category for organizing items in the catalog.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique category identifier (e.g., `"cat_1"`) |
| `name` | `string` | Yes | Display name (e.g., `"Fruits & Vegetables"`) |
| `slug` | `string` | Yes | URL-friendly slug (e.g., `"fruits-vegetables"`) |
| `icon` | `string` | Yes | Emoji icon for the category |
| `description` | `string` | Yes | Short description of the category |
| `imageUrl` | `string` | Yes | Category banner image URL |
| `itemCount` | `number` | Yes | Number of items in this category |
| `sortOrder` | `number` | Yes | Display order in the category list |

### Item

A product available for purchase.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique item identifier (e.g., `"item_1"`) |
| `name` | `string` | Yes | Product name (e.g., `"Organic Bananas"`) |
| `slug` | `string` | Yes | URL-friendly slug |
| `categoryId` | `string` | Yes | FK → `Category.id` |
| `categorySlug` | `string` | Yes | Denormalized category slug for routing |
| `description` | `string` | Yes | Full product description |
| `imageUrl` | `string` | Yes | Product image URL |
| `unit` | `string` | Yes | Default display unit (e.g., `"1 kg"`, `"6 pcs"`) |
| `variants` | `ItemVariant[]` | Yes | Available size/quantity variants |
| `tags` | `string[]` | Yes | Product tags: `"bestseller"`, `"organic"`, `"new"`, `"premium"`, `"seasonal"`, `"eco"` |
| `isVeg` | `boolean` | Yes | Whether the item is vegetarian |
| `brand` | `string` | Yes | Brand name |
| `rating` | `number` | Yes | Average customer rating (0–5) |
| `ratingCount` | `number` | Yes | Total number of ratings |
| `frequentlyBought` | `boolean` | Yes | Whether this item appears in "frequently bought" lists |

**Relationships:**
- Belongs to one `Category` (via `categoryId`)
- Has many `ItemVariant` (embedded array)

### ItemVariant

A size/quantity variant of an item. Embedded within `Item.variants`.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique variant identifier (e.g., `"v1_1"`) |
| `label` | `string` | Yes | Display label (e.g., `"500g"`, `"1 kg"`, `"Pack of 6"`) |
| `price` | `number` | Yes | Selling price in ₹ |
| `mrp` | `number` | Yes | Maximum retail price in ₹ (original price before discount) |
| `isDefault` | `boolean` | Yes | Whether this variant is pre-selected |

---

## Inventory

### InventoryRecord

Tracks stock levels for a specific item variant in a specific zone.

| Field | Type | Required | Description |
|---|---|---|---|
| `itemId` | `string` | Yes | FK → `Item.id` |
| `variantId` | `string` | Yes | FK → `ItemVariant.id` |
| `zoneId` | `string` | Yes | FK → `Zone.id` |
| `quantity` | `number` | Yes | Current stock quantity |
| `status` | `InventoryStatus` | Yes | Stock status: `"in_stock"`, `"low_stock"`, `"out_of_stock"` |
| `lastSyncedAt` | `string` (ISO 8601) | Yes | Last time inventory was synced from warehouse |
| `hasSyncDelay` | `boolean` | Yes | Whether this record has a known sync delay (stale data) |

**Composite Key:** `(itemId, variantId, zoneId)` — one record per item-variant-zone combination.

**Relationships:**
- References `Item` (via `itemId`)
- References `ItemVariant` (via `variantId`)
- References `Zone` (via `zoneId`)

**Note:** When `hasSyncDelay` is `true`, the displayed `status` may not reflect reality. The item could show `in_stock` in the app but actually be out of stock in the warehouse. See [Inventory Sync Policy](./04_policies_and_constraints.md#9-inventory-sync-policy).

---

## Cart

### Cart

The user's current shopping cart. One cart per user session.

| Field | Type | Required | Description |
|---|---|---|---|
| `items` | `CartItem[]` | Yes | Items currently in the cart |
| `appliedCouponId` | `string` | No | FK → `Coupon.id` — currently applied coupon |
| `packingPreference` | `PackingPreference` | Yes | `"standard"`, `"no_bag"`, or `"eco_friendly"` |
| `deliveryInstructions` | `string` | No | Free-text delivery instructions |

### CartItem

An item in the cart. Embedded within `Cart.items`.

| Field | Type | Required | Description |
|---|---|---|---|
| `itemId` | `string` | Yes | FK → `Item.id` |
| `variantId` | `string` | Yes | FK → `ItemVariant.id` |
| `quantity` | `number` | Yes | Quantity selected (min: 1) |
| `name` | `string` | Yes | Denormalized item name |
| `imageUrl` | `string` | Yes | Denormalized item image URL |
| `price` | `number` | Yes | Denormalized selling price per unit |
| `mrp` | `number` | Yes | Denormalized MRP per unit |
| `unit` | `string` | Yes | Denormalized unit label |

---

## Coupon

### Coupon

A discount coupon that can be applied to an order.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique coupon identifier (e.g., `"coup_1"`) |
| `code` | `string` | Yes | Coupon code entered by user (e.g., `"WELCOME50"`) |
| `type` | `CouponType` | Yes | `"flat"`, `"percentage"`, or `"free_delivery"` |
| `value` | `number` | Yes | Discount value — flat amount (₹) or percentage (%) |
| `maxDiscount` | `number` | No | Maximum discount cap in ₹ (for percentage coupons) |
| `minBasketValue` | `number` | Yes | Minimum cart subtotal required to apply (₹0 = no minimum) |
| `categoryOnly` | `string` | No | FK → `Category.id` — restricts to a specific category |
| `firstOrderOnly` | `boolean` | Yes | Valid only on the user's first order |
| `memberOnly` | `boolean` | Yes | Only usable by active members |
| `validFrom` | `string` (date) | Yes | Start date of validity |
| `validTo` | `string` (date) | Yes | End date of validity |
| `description` | `string` | Yes | User-facing description |
| `terms` | `string` | Yes | Full terms and conditions |
| `isActive` | `boolean` | Yes | Whether the coupon is currently active |

**Active Coupons (as of Feb 2026):** WELCOME50, FRESH20, FREEDELIVERY, DAIRY15, MEMBER100, SNACK25, FLAT200, WEEKEND30, ECO10, CARE20, HIDDEN99

---

## Payment

### Payment

A payment transaction associated with an order.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique payment identifier (e.g., `"pay_1"`) |
| `orderId` | `string` | No | FK → `Order.id` — absent if order creation failed |
| `method` | `PaymentMethod` | Yes | `"upi"`, `"card"`, `"wallet"`, `"cod"`, or `"netbanking"` |
| `amount` | `number` | Yes | Payment amount in ₹ |
| `status` | `PaymentStatus` | Yes | Current payment status (see enum below) |
| `transactionId` | `string` | No | External transaction reference (e.g., `"TXN001"`) |
| `createdAt` | `string` (ISO 8601) | Yes | Payment initiation timestamp |
| `updatedAt` | `string` (ISO 8601) | Yes | Last status update timestamp |
| `orderCreationFailed` | `boolean` | No | `true` if payment succeeded but order creation failed |

**Relationships:**
- Belongs to one `Order` (via `orderId`) — nullable for orphaned payments

### SavedPaymentMethod

A user's saved payment method for faster checkout.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier |
| `userId` | `string` | Yes | FK → `User.id` |
| `method` | `PaymentMethod` | Yes | Payment method type |
| `label` | `string` | Yes | Display label (e.g., `"HDFC Visa ••••1234"`, `"priya@okaxis"`) |
| `isDefault` | `boolean` | Yes | Whether this is the default payment method |

---

## Order

### Order

A placed order with delivery and payment details.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique order identifier (e.g., `"ord_1"`) |
| `userId` | `string` | Yes | FK → `User.id` |
| `items` | `OrderItem[]` | Yes | Items included in the order |
| `addressId` | `string` | Yes | FK → `Address.id` — delivery address |
| `zoneId` | `string` | Yes | FK → `Zone.id` — delivery zone |
| `status` | `OrderStatus` | Yes | Current order status (see enum below) |
| `timeline` | `OrderTimeline[]` | Yes | Ordered list of status transitions |
| `deliverySlotId` | `string` | Yes | FK → `DeliverySlot.id` |
| `estimatedDeliveryMinutes` | `number` | Yes | Current ETA in minutes |
| `etaChangedAfterOrder` | `boolean` | Yes | Whether ETA was modified after order placement |
| `originalEtaMinutes` | `number` | No | Original ETA if it was changed |
| `subtotal` | `number` | Yes | Sum of (price × quantity) for all items in ₹ |
| `discount` | `number` | Yes | Total discount applied in ₹ |
| `deliveryFee` | `number` | Yes | Delivery charge in ₹ |
| `packingFee` | `number` | Yes | Packing fee in ₹ (currently always 0) |
| `total` | `number` | Yes | Final amount: subtotal − discount + deliveryFee + packingFee |
| `paymentId` | `string` | Yes | FK → `Payment.id` |
| `couponId` | `string` | No | FK → `Coupon.id` — applied coupon |
| `packingPreference` | `PackingPreference` | Yes | `"standard"`, `"no_bag"`, or `"eco_friendly"` |
| `deliveryInstructions` | `string` | No | Free-text delivery instructions |
| `createdAt` | `string` (ISO 8601) | Yes | Order creation timestamp |
| `updatedAt` | `string` (ISO 8601) | Yes | Last update timestamp |

**Relationships:**
- Belongs to one `User` (via `userId`)
- Belongs to one `Address` (via `addressId`)
- Belongs to one `Zone` (via `zoneId`)
- Has one `Payment` (via `paymentId`)
- Has one `DeliverySlot` (via `deliverySlotId`)
- Has one `Coupon` (via `couponId`, optional)
- Has many `OrderItem` (embedded)
- Has many `OrderTimeline` (embedded)

### OrderItem

An item within an order. Embedded within `Order.items`.

| Field | Type | Required | Description |
|---|---|---|---|
| `itemId` | `string` | Yes | FK → `Item.id` |
| `variantId` | `string` | Yes | FK → `ItemVariant.id` |
| `name` | `string` | Yes | Denormalized item name |
| `imageUrl` | `string` | Yes | Denormalized item image |
| `price` | `number` | Yes | Price per unit at time of order (₹) |
| `mrp` | `number` | Yes | MRP per unit at time of order (₹) |
| `quantity` | `number` | Yes | Quantity ordered |
| `unit` | `string` | Yes | Unit label |
| `substitutedWith` | `string` | No | Name of substituted item (if packer swapped the item) |
| `unavailableAtPacking` | `boolean` | No | `true` if the item was found unavailable during packing |

### OrderTimeline

A status change event in the order lifecycle. Embedded within `Order.timeline`.

| Field | Type | Required | Description |
|---|---|---|---|
| `status` | `OrderStatus` | Yes | The status the order transitioned to |
| `timestamp` | `string` (ISO 8601) | Yes | When the transition occurred |
| `note` | `string` | No | Optional note (e.g., reason for cancellation, ETA change reason) |

---

## Delivery

### DeliverySlot

An available delivery time slot.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique slot identifier (e.g., `"slot_1"`) |
| `label` | `string` | Yes | Display label (e.g., `"Express (10 min)"`, `"9 AM – 11 AM"`) |
| `startTime` | `string` | Yes | Slot start time (`"now"` for immediate, or `"HH:MM"` for scheduled) |
| `endTime` | `string` | Yes | Slot end time (`"+10min"` for express, or `"HH:MM"` for scheduled) |
| `isExpress` | `boolean` | Yes | Whether this is an express delivery slot |
| `fee` | `number` | Yes | Delivery fee for this slot in ₹ |

**Available Slots:**

| Slot | Label | Express | Fee |
|---|---|---|---|
| `slot_1` | Express (10 min) | Yes | ₹29 |
| `slot_2` | Within 30 min | No | ₹15 |
| `slot_3` | Within 1 hour | No | ₹0 |
| `slot_4` | 9 AM – 11 AM | No | ₹0 |
| `slot_5` | 11 AM – 1 PM | No | ₹0 |
| `slot_6` | 2 PM – 4 PM | No | ₹0 |
| `slot_7` | 5 PM – 7 PM | No | ₹0 |
| `slot_8` | 7 PM – 9 PM | No | ₹0 |

---

## Support

### SupportTicket

A customer support ticket, optionally linked to an order.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique ticket identifier (e.g., `"tkt_1"`) |
| `userId` | `string` | Yes | FK → `User.id` |
| `orderId` | `string` | No | FK → `Order.id` — the related order (if applicable) |
| `category` | `TicketCategory` | Yes | Issue category (see enum below) |
| `severity` | `TicketSeverity` | Yes | `"low"`, `"medium"`, `"high"`, or `"critical"` |
| `status` | `TicketStatus` | Yes | Current ticket status (see enum below) |
| `resolution` | `TicketResolution` | Yes | How the ticket was/will be resolved (see enum below) |
| `subject` | `string` | Yes | Short description of the issue |
| `description` | `string` | Yes | Full description of the issue |
| `messages` | `TicketMessage[]` | Yes | Conversation thread |
| `createdAt` | `string` (ISO 8601) | Yes | Ticket creation timestamp |
| `updatedAt` | `string` (ISO 8601) | Yes | Last activity timestamp |

**Relationships:**
- Belongs to one `User` (via `userId`)
- Optionally references one `Order` (via `orderId`)
- Has many `TicketMessage` (embedded)

### TicketMessage

A message in a support ticket conversation thread. Embedded within `SupportTicket.messages`.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique message identifier |
| `sender` | `"customer"` \| `"agent"` | Yes | Who sent the message |
| `message` | `string` | Yes | Message content |
| `timestamp` | `string` (ISO 8601) | Yes | When the message was sent |

---

## Membership

### MembershipPlan

A subscription plan offering benefits to members.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique plan identifier (`"plan_basic"` or `"plan_plus"`) |
| `name` | `string` | Yes | Display name (e.g., `"QuickBasket Plus"`) |
| `tier` | `"basic"` \| `"plus"` | Yes | Plan tier |
| `monthlyPrice` | `number` | Yes | Monthly subscription price in ₹ |
| `annualPrice` | `number` | Yes | Annual subscription price in ₹ |
| `benefits` | `MembershipBenefit[]` | Yes | List of plan benefits |
| `freeDeliveryAbove` | `number` | Yes | Free delivery threshold in ₹ (0 = always free) |
| `prioritySupport` | `boolean` | Yes | Whether plan includes priority support |
| `exclusiveDeals` | `boolean` | Yes | Whether plan includes exclusive deals |
| `maxCashbackPercent` | `number` | Yes | Maximum cashback percentage per order |
| `trialDays` | `number` | Yes | Free trial period in days |

### MembershipBenefit

A single benefit item displayed on the membership page. Embedded within `MembershipPlan.benefits`.

| Field | Type | Required | Description |
|---|---|---|---|
| `icon` | `string` | Yes | Emoji icon for the benefit |
| `title` | `string` | Yes | Benefit title |
| `description` | `string` | Yes | Benefit description |

---

## Banner

### Banner

A promotional banner displayed on the home screen.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique banner identifier (e.g., `"banner_1"`) |
| `title` | `string` | Yes | Banner headline |
| `subtitle` | `string` | Yes | Banner subtext |
| `imageUrl` | `string` | Yes | Banner image URL |
| `bgColor` | `string` | Yes | Background colour hex code (e.g., `"#FFF3E0"`) |
| `linkTo` | `string` | Yes | Navigation target route (e.g., `"/item/item_8"`, `"/membership"`) |
| `isActive` | `boolean` | Yes | Whether the banner is currently displayed |

---

## Enum Reference

### OrderStatus

Lifecycle states of an order.

| Value | Description | Terminal? |
|---|---|---|
| `created` | Order created, pending confirmation | No |
| `confirmed` | Order confirmed, awaiting packing | No |
| `packing` | Order is being packed at the warehouse | No |
| `out_for_delivery` | Order dispatched, delivery partner en route | No |
| `delivered` | Order successfully delivered | **Yes** |
| `cancelled` | Order cancelled (by customer or store) | **Yes** |
| `refund_initiated` | Refund has been initiated | No |
| `refunded` | Refund completed | **Yes** |

**Valid Transitions:**
```
created → confirmed → packing → out_for_delivery → delivered
                 ↘ cancelled → refund_initiated → refunded
          packing ↗ cancelled → refund_initiated → refunded
```

### PaymentStatus

| Value | Description |
|---|---|
| `initiated` | Payment process started |
| `success` | Payment completed successfully |
| `failed` | Payment failed |
| `refund_initiated` | Refund process started |
| `refunded` | Refund completed |

### PaymentMethod

| Value | Description |
|---|---|
| `upi` | UPI (Google Pay, PhonePe, etc.) |
| `card` | Credit/debit card |
| `wallet` | QuickPay in-app wallet |
| `cod` | Cash on delivery |
| `netbanking` | Net banking |

### InventoryStatus

| Value | Description | Quantity Range |
|---|---|---|
| `in_stock` | Available for ordering | > 10 |
| `low_stock` | Limited availability, shown with badge | 1–10 |
| `out_of_stock` | Not available | 0 |

### CouponType

| Value | Description |
|---|---|
| `flat` | Fixed amount discount (₹) |
| `percentage` | Percentage discount with optional max cap |
| `free_delivery` | Waives delivery fee |

### PackingPreference

| Value | Description |
|---|---|
| `standard` | Regular plastic bags |
| `no_bag` | No external bag (loose delivery) |
| `eco_friendly` | Biodegradable paper packaging |

### TicketCategory

| Value | Description |
|---|---|
| `missing_item` | Item missing from delivered order |
| `damaged_item` | Item arrived damaged or spoiled |
| `wrong_item` | Wrong item delivered (substitution) |
| `late_delivery` | Delivery arrived later than ETA |
| `refund_delay` | Refund not received within SLA |
| `payment_issue` | Payment failure or orphaned payment |
| `order_not_created` | Payment succeeded but order not created |
| `eta_changed` | ETA changed after order placement |
| `coupon_issue` | Coupon application failure or confusion |
| `membership_issue` | Membership benefits not working |
| `address_issue` | Address-related problems |
| `packing_issue` | Packing preference not followed |
| `other` | General or miscellaneous issue |

### TicketSeverity

| Value | Description |
|---|---|
| `low` | Minor inconvenience, no financial impact |
| `medium` | Moderate issue, partial financial impact |
| `high` | Significant issue, full item cost impact |
| `critical` | System failure, money at risk |

### TicketStatus

| Value | Description |
|---|---|
| `open` | Ticket created, awaiting agent response |
| `in_progress` | Agent is actively investigating |
| `waiting_on_customer` | Agent responded, waiting for customer input |
| `resolved` | Issue resolved |
| `closed` | Ticket closed (no further action) |

### TicketResolution

| Value | Description |
|---|---|
| `refund` | Full or partial refund issued |
| `replacement` | Replacement item sent |
| `credit` | Store credit added to account |
| `explanation` | Issue explained, no monetary action |
| `no_action` | No action needed or taken |
| `pending` | Resolution pending (ticket still open) |

---

## Revision History

| Date | Change | Author |
|---|---|---|
| 2026-02-06 | Initial document creation | PKB System |
