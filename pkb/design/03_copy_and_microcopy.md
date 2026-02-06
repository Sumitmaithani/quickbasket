# Copy & Microcopy Guide

> **QuickBasket** — Groceries & essentials in minutes
>
> This document is the single source of truth for all user-facing text in the QuickBasket app. Every string — from page titles to error toasts — is catalogued here. Designers, developers, and content reviewers should reference this file to maintain a consistent voice and tone.

---

## Table of Contents

1. [Brand Copy](#brand-copy)
2. [Authentication](#authentication)
3. [Location](#location)
4. [Home](#home)
5. [Categories & Items](#categories--items)
6. [Cart](#cart)
7. [Checkout](#checkout)
8. [Orders](#orders)
9. [Support](#support)
10. [Membership](#membership)
11. [Profile](#profile)
12. [Stock Warnings](#stock-warnings)
13. [ETA & Delivery Messages](#eta--delivery-messages)
14. [Packing Preferences](#packing-preferences)
15. [Global Button Labels](#global-button-labels)
16. [Toast & Notification Messages](#toast--notification-messages)
17. [Accessibility Labels](#accessibility-labels)

---

## Brand Copy

| Key | Copy |
|-----|------|
| App name | **QuickBasket** |
| Tagline | Groceries & essentials in minutes |
| Short description | Ultra-fast delivery of groceries, snacks, and daily essentials to your doorstep. |
| Footer | © 2026 QuickBasket. All rights reserved. |

---

## Authentication

### `/login`

| Element | Copy |
|---------|------|
| Page title | Welcome to QuickBasket |
| Subtitle | Enter your phone number to get started |
| Phone input label | Phone Number |
| Phone input placeholder | 10-digit mobile number |
| Send OTP button | Send OTP |
| OTP title | Verify your number |
| OTP subtitle | We've sent a 6-digit code to +91 {phone} |
| Resend timer | Resend in {seconds}s |
| Resend link | Resend OTP |
| Verify button | Verify & Continue |
| Skip link | Skip for now |
| **Error: invalid phone** | Please enter a valid 10-digit phone number |
| **Error: OTP mismatch** | Incorrect OTP. Please check and try again. |
| **Error: OTP expired** | This OTP has expired. Tap "Resend" to get a new one. |
| **Error: too many attempts** | Too many attempts. Please try again after 5 minutes. |
| **Error: network** | Unable to connect. Please check your internet and try again. |

---

## Location

### `/location`

| Element | Copy |
|---------|------|
| Page title | Set delivery location |
| Detect button | Detect my location |
| Detecting label | Detecting your location... |
| Saved addresses heading | Saved Addresses |
| No saved addresses | No saved addresses yet |
| Add address link | + Add a new address |
| Continue button | Continue |
| **Error: GPS denied** | Location access denied. Please enable it in your device settings or enter your address manually. |
| **Error: unserviceable** | Sorry, we don't deliver to this area yet. Try a different address. |
| **Success: detected** | Location detected! |

---

## Home

### `/home`

| Element | Copy |
|---------|------|
| Search placeholder | Search for groceries, snacks, essentials... |
| Banner section title | *(none — banners are visual-only)* |
| Categories heading | Shop by Category |
| Reorder heading | Buy Again |
| Quick picks heading | Recommended for You |
| **Empty: no reorder** | Your past orders will appear here for quick reordering. |
| **Search: no results** | No results for "{query}". Try a different search term. |

---

## Categories & Items

### `/categories`

| Element | Copy |
|---------|------|
| Page title | Categories |
| Item count badge | {count} items |

### `/categories/[slug]`

| Element | Copy |
|---------|------|
| Filter chip: Brand | Brand |
| Filter chip: Price | Price |
| Filter chip: Diet | Veg / Non-Veg |
| Filter chip: Discount | Discount |
| Sort: relevance | Relevance |
| Sort: price low | Price: Low to High |
| Sort: price high | Price: High to Low |
| Sort: discount | Discount |
| **Empty: no results** | No items match your filters. Try adjusting or clearing filters. |
| Clear filters link | Clear all filters |

### `/item/[id]`

| Element | Copy |
|---------|------|
| Brand label | *(brand name displayed directly)* |
| Description heading | Product Details |
| Variant label | Select Size |
| MRP label | MRP |
| Discount badge | {percent}% OFF |
| Notify me toggle | Notify me when available |

---

## Cart

### `/cart`

| Element | Copy |
|---------|------|
| Page title | Your Cart |
| **Empty state: title** | Your cart is empty |
| **Empty state: message** | Looks like you haven't added anything yet. Start browsing to find what you need. |
| **Empty state: CTA** | Start Shopping |
| Coupon section heading | Coupons & Offers |
| Apply coupon link | Apply Coupon |
| Coupon input placeholder | Enter coupon code |
| Apply button | Apply |
| **Coupon success** | Coupon "{code}" applied! You save ₹{amount}. |
| **Coupon error: invalid** | This coupon code is invalid. Please check and try again. |
| **Coupon error: expired** | This coupon has expired. Browse other available offers. |
| **Coupon error: min order** | Minimum order of ₹{amount} required for this coupon. Add ₹{remaining} more. |
| **Coupon error: not applicable** | This coupon doesn't apply to the items in your cart. |
| Remove coupon link | Remove |
| Packing heading | Packing Preference |
| Delivery instructions heading | Delivery Instructions |
| Delivery instructions placeholder | E.g., Ring the doorbell twice, leave at door... |
| Delivery instructions char limit | {remaining}/200 characters |
| Bill heading | Bill Details |
| Bill: item total | Item Total |
| Bill: delivery fee | Delivery Fee |
| Bill: packing fee | Packing Fee |
| Bill: coupon discount | Coupon Discount |
| Bill: taxes | Taxes & Charges |
| Bill: grand total | Grand Total |
| Proceed button | Proceed to Checkout · ₹{total} |

---

## Checkout

### `/checkout`

| Element | Copy |
|---------|------|
| Page title | Checkout |
| Address heading | Delivering to |
| Change address link | Change |
| Delivery slot heading | Delivery Slot |
| Payment heading | Payment Method |
| Order summary heading | Order Summary |
| View details link | View details |
| Place order button | Place Order · ₹{total} |
| **Placing overlay** | Placing your order... |
| **Success: order placed** | Order placed successfully! 🎉 Your order #{id} is confirmed. |
| **Error: payment failed** | Payment failed. Please try a different payment method or try again. |
| **Error: order failed** | We couldn't place your order right now. Please try again in a moment. |
| **Error: stock conflict** | Some items in your cart are no longer available. Please review and update your cart. |
| Stock conflict: remove CTA | Remove Unavailable Items & Continue |
| Retry button | Retry Payment |
| Change payment link | Change Payment Method |

---

## Orders

### `/orders`

| Element | Copy |
|---------|------|
| Page title | My Orders |
| Tab: all | All |
| Tab: active | Active |
| Tab: delivered | Delivered |
| Tab: cancelled | Cancelled |
| **Empty state: title** | No orders yet |
| **Empty state: message** | When you place your first order, it will show up here. |
| **Empty state: CTA** | Start Shopping |
| Items summary | {first}, {second} +{remaining} more |

### `/orders/[id]`

| Element | Copy |
|---------|------|
| Page title | Order #{id} |
| ETA label | Estimated delivery |
| ETA value | By {time} |
| Timeline: confirmed | Order Confirmed |
| Timeline: packing | Packing Your Order |
| Timeline: out for delivery | Out for Delivery |
| Timeline: delivered | Delivered |
| Timeline: cancelled | Order Cancelled |
| Cancellation reason label | Reason |
| Items heading | Items Ordered |
| Bill heading | Bill Details |
| Cancel order button | Cancel Order |
| Cancel confirmation title | Cancel this order? |
| Cancel confirmation message | Are you sure you want to cancel? If the order is already being packed, cancellation may not be possible. |
| Cancel confirm CTA | Yes, Cancel |
| Cancel dismiss CTA | Keep Order |
| **Success: cancelled** | Order #{id} has been cancelled. Any payment will be refunded in 3-5 business days. |
| **Error: cancel failed** | Unable to cancel this order. It may already be out for delivery. |
| Get help button | Get Help |
| Reorder button | Reorder |
| Rate order prompt | How was your delivery? |

---

## Support

### `/support`

| Element | Copy |
|---------|------|
| Page title | Help & Support |
| Tab: all | All |
| Tab: open | Open |
| Tab: resolved | Resolved |
| Tab: closed | Closed |
| Create ticket CTA | + New Ticket |
| **Empty state: title** | No support tickets |
| **Empty state: message** | If you need help with an order or have a question, create a ticket and we'll get back to you. |
| **Empty state: CTA** | Create a Ticket |
| Sheet title | Create Ticket |
| Category label | Category |
| Category placeholder | Select a category |
| Subject label | Subject |
| Subject placeholder | Brief description of your issue |
| Description label | Details |
| Description placeholder | Tell us more so we can help faster... |
| Order link label | Related Order (optional) |
| Submit button | Submit Ticket |
| **Success: created** | Ticket #{id} created. We'll get back to you shortly. |
| **Error: create failed** | Couldn't create your ticket. Please try again. |

### `/support/[id]`

| Element | Copy |
|---------|------|
| Page title | Ticket #{id} |
| Status: open | Open |
| Status: resolved | Resolved |
| Status: closed | Closed |
| Reply placeholder | Type your reply... |
| Send button | Send |
| Resolved banner | This ticket has been resolved. |
| Reopen link | Not resolved? Reopen this ticket. |
| Closed banner | This ticket is closed. |
| Closed note | Closed tickets cannot receive new replies. Create a new ticket if you need further help. |

---

## Membership

### `/membership`

| Element | Copy |
|---------|------|
| Page title | QuickBasket Membership |
| Free plan name | Free |
| Premium plan name | Premium |
| Billing: monthly | Monthly |
| Billing: yearly | Yearly |
| Savings callout | Save {percent}% with yearly |
| Benefits heading | What's Included |
| Benefit: free delivery | Unlimited free deliveries |
| Benefit: priority | Priority slot booking |
| Benefit: exclusive | Exclusive member-only deals |
| Benefit: support | Priority customer support |
| Benefit: no fee | No packing or handling fees |
| Non-member CTA | Start Free Trial |
| Free trial note | 14-day free trial · Cancel anytime |
| Member badge | Current Plan |
| Renewal note | Renews on {date} |
| Manage link | Manage Membership |
| FAQ heading | Frequently Asked Questions |
| FAQ: what is | What is QuickBasket Premium? |
| FAQ: cancel | Can I cancel anytime? |
| FAQ: refund | Do I get a refund if I cancel? |
| FAQ: trial | What happens after the free trial? |

---

## Profile

### `/profile`

| Element | Copy |
|---------|------|
| Page title | Profile |
| Edit profile icon label | Edit |
| Preferences heading | Preferences |
| Pref: push | Push Notifications |
| Pref: sms | SMS Updates |
| Pref: dark mode | Dark Mode (coming soon) |
| Menu: addresses | Saved Addresses |
| Menu: payments | Payment Methods |
| Menu: membership | Membership |
| Menu: support | Help & Support |
| Menu: about | About QuickBasket |
| Menu: logout | Log Out |
| Logout confirmation | Are you sure you want to log out? |
| Logout confirm CTA | Log Out |
| Logout dismiss CTA | Cancel |

---

## Stock Warnings

These appear on item detail pages, in the cart, and during checkout.

| Scenario | Copy | Style |
|----------|------|-------|
| Low stock | Only {count} left in stock — order soon! | Amber badge / banner |
| Out of stock | Currently out of stock | Red badge / banner |
| Back in stock (notification) | {item} is back in stock! Order now before it's gone. | Push / toast |
| Stock sync delay | Some items may have limited availability. Your cart will be verified at checkout. | Grey info note in cart |
| Checkout stock conflict | {item} is no longer available. It has been removed from your cart. | Red inline alert |

---

## ETA & Delivery Messages

| Scenario | Copy |
|----------|------|
| ETA on order detail | Estimated delivery by **{time}** |
| ETA range | Arriving between **{start}** – **{end}** |
| ETA changed (faster) | Great news! Your order will arrive earlier — by **{time}**. |
| ETA changed (delayed) | Your delivery is slightly delayed. New estimated time: **{time}**. We're sorry for the wait. |
| Delivered | Delivered at **{time}** |
| Delivery partner assigned | {name} is on the way with your order. |
| Out for delivery | Your order is out for delivery! |

---

## Packing Preferences

| Option | Label | Note |
|--------|-------|------|
| Bag | Use a bag (₹5) | Eco-friendly paper bag |
| No bag | No bag — pack items individually | Items will be packed in their original packaging. If an item doesn't have original packaging, a bag will be used automatically. |
| Default | *(no selection)* | Fallback: no bag behaviour is applied |

---

## Global Button Labels

| Context | Label |
|---------|-------|
| Add to cart | ADD |
| View cart (floating) | View Cart · {count} items |
| Proceed to checkout | Proceed to Checkout |
| Place order | Place Order |
| Cancel order | Cancel Order |
| Get help | Get Help |
| Submit ticket | Submit Ticket |
| Retry | Try Again |
| Go back | Back |
| Start shopping | Start Shopping |
| Reorder | Reorder |
| Apply coupon | Apply |
| Remove coupon | Remove |
| Save | Save |
| Confirm | Confirm |
| Continue | Continue |
| Log out | Log Out |

---

## Toast & Notification Messages

| Event | Message | Type |
|-------|---------|------|
| Item added to cart | {item} added to cart | Success (green) |
| Item removed from cart | {item} removed from cart | Neutral (grey) |
| Coupon applied | Coupon applied! You save ₹{amount} | Success (green) |
| Coupon removed | Coupon removed | Neutral (grey) |
| Order placed | Order #{id} placed successfully! | Success (green) |
| Order cancelled | Order #{id} cancelled | Neutral (grey) |
| Payment failed | Payment failed. Please try again. | Error (red) |
| Ticket created | Support ticket #{id} created | Success (green) |
| Reply sent | Reply sent | Success (green) |
| Network error | Connection lost. Retrying... | Warning (amber) |
| Location detected | Location detected! | Success (green) |
| Address saved | Address saved successfully | Success (green) |
| Profile updated | Profile updated | Success (green) |

---

## Accessibility Labels

| Element | `aria-label` / `alt` |
|---------|---------------------|
| Back button | Go back |
| Cart tab | Cart, {count} items |
| Search input | Search for products |
| Quantity stepper minus | Decrease quantity |
| Quantity stepper plus | Increase quantity |
| Banner image | Promotional banner: {title} |
| Category icon | {category} category |
| Order status badge | Order status: {status} |
| Ticket status badge | Ticket status: {status} |
| Close sheet | Close |
| Loading spinner | Loading |

---

## Voice & Tone Guidelines

| Principle | Guideline |
|-----------|-----------|
| **Concise** | Keep all copy under 2 sentences. Users are shopping, not reading. |
| **Friendly** | Use conversational language. Say "we" and "your," not "the user." |
| **Helpful** | Error messages should explain the problem *and* suggest a fix. |
| **Specific** | Prefer "Enter a valid 10-digit phone number" over "Invalid input." |
| **Consistent** | Use the same terms everywhere (e.g., always "coupon," never "promo code"). |
| **No jargon** | Avoid technical terms. Say "Try again" not "Retry the request." |

---

*Last updated: 2026-02-06*
