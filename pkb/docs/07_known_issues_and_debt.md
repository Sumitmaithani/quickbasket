# 07 — Known Issues & Technical Debt

> Documented known issues, bugs, and technical debt in QuickBasket.
> Each issue includes severity, impact, current workaround, and proposed fix.
> Last updated: 2026-02-06

---

## Table of Contents

1. [Inventory Sync Delay (Stock Flip)](#1-inventory-sync-delay)
2. [ETA Estimation Inaccurate](#2-eta-estimation-inaccurate)
3. [Coupon Error Messages Are Vague](#3-coupon-error-messages-are-vague)
4. [Substitution Without Consent](#4-substitution-without-consent)
5. [No-Bag Option Misleading](#5-no-bag-option-misleading)
6. [Payment Success but Order Creation Failure](#6-payment-success-but-order-creation-failure)
7. [Refund Processing Delays](#7-refund-processing-delays)
8. [Membership Benefits Sync Delay](#8-membership-benefits-sync-delay)
9. [Search Doesn't Support Hindi/Local Language Terms](#9-search-doesnt-support-hindilocal-language-terms)
10. [No Address Change After Order Placement](#10-no-address-change-after-order-placement)
11. [ETA Change Notifications Unreliable](#11-eta-change-notifications-unreliable)
12. [Coupon Visibility for Non-Members](#12-coupon-visibility-for-non-members)

---

## Severity Legend

| Level | Definition | Examples |
|---|---|---|
| **Critical** | Money at risk, data loss, or system failure | Payment deducted but no order |
| **High** | Significant user impact, trust erosion | Refund SLA missed, items removed without notice |
| **Medium** | Noticeable user frustration, workaround exists | Inaccurate ETA, vague errors |
| **Low** | Minor inconvenience, cosmetic or edge-case | Misleading UI copy, search limitations |

---

## 1. Inventory Sync Delay

**Severity:** High
**Component:** Inventory System, Checkout
**Status:** Open — no fix scheduled

### Description

Inventory data is synced from the warehouse system on a **2-hour polling cycle**. Between syncs, the app can display stale stock data. This leads to the "stock flip" problem: an item shows as `in_stock` in the catalog and can be added to the cart, but when the order reaches the packing stage, the item is physically unavailable.

### Impact

- **User experience:** Users place orders with items that appear available, only to have them silently removed during packing. This erodes trust, especially for meal-planning use cases.
- **Financial:** Order totals are adjusted post-placement, which confuses users who see a different amount than expected.
- **Support volume:** Generated tickets: `tkt_1` (mushrooms missing), `tkt_13` (broccoli removed). Approximately 5–8% of support tickets relate to stock-flip scenarios.
- **Data marker:** `InventoryRecord.hasSyncDelay = true` identifies currently affected records.

### Reproduction

1. Observe item `item_14` (Button Mushrooms) — `status: "in_stock"` but `quantity: 0`, `hasSyncDelay: true`.
2. Add to cart and place order.
3. During packing, item is removed. See `ord_22` for a live example.

### Current Workaround

- Packers manually remove unavailable items and add a note to the order timeline.
- A `hasSyncDelay` flag is set on inventory records to mark stale data, but it is **not exposed to the user** in any way.
- Support agents issue refunds or credits for removed items.

### Proposed Fix

1. **Short-term:** Add a real-time stock check at checkout (just before payment) to catch stale inventory. Display a warning: _"Some items may have limited stock — we'll notify you if anything changes."_
2. **Long-term:** Migrate from 2-hour batch sync to **real-time inventory updates** via WebSocket or event-driven architecture from the warehouse system.
3. **UX improvement:** Show a "low confidence" badge on items with `hasSyncDelay: true` to set user expectations.

---

## 2. ETA Estimation Inaccurate

**Severity:** Medium
**Component:** Delivery, ETA Algorithm
**Status:** Open — improvement planned for Q2 2026

### Description

The ETA calculation algorithm uses a simple formula based on zone average delivery time and slot type. It does **not** account for:

- Real-time traffic conditions
- Weather (rain significantly impacts Bengaluru traffic)
- Peak-hour demand surges (lunch, evening)
- Delivery partner availability or reassignment
- Number of concurrent orders in the zone

### Impact

- **User experience:** Users choose express (10 min) or standard (30 min) slots expecting accurate delivery. Actual delivery can take 2x the estimated time during rain or peak hours.
- **Trust:** Repeated ETA misses damage the "ultra-fast delivery" brand promise.
- **Support volume:** Tickets `tkt_2`, `tkt_8`, `tkt_9`, `tkt_20` relate to ETA issues. ~12% of all support tickets.
- **Data marker:** Orders with `etaChangedAfterOrder: true` — examples: `ord_9` (30→55 min), `ord_16` (30→55 min), `ord_23` (25→45 min).

### Reproduction

1. Place an order during peak evening hours (6–8 PM) or during rain.
2. Observe that the initial ETA of 30 minutes extends to 50+ minutes.
3. The `originalEtaMinutes` field preserves the initial estimate for comparison.

### Current Workaround

- Delivery ops team manually updates ETAs when delays are detected.
- Support agents waive delivery fees for significantly delayed orders.
- The `etaChangedAfterOrder` flag and `originalEtaMinutes` field track ETA changes.

### Proposed Fix

1. **Integrate real-time traffic API** (Google Maps or Mappls) for live ETA calculation.
2. **Weather-aware ETA:** Add a multiplier during rain alerts (1.5x–2x base ETA).
3. **Peak-hour buffer:** Auto-add 10–15 minutes during known peak windows.
4. **ML-based ETA:** Train a model on historical delivery data (zone, time, weather, partner) for more accurate predictions.

---

## 3. Coupon Error Messages Are Vague

**Severity:** Medium
**Component:** Coupon System, Cart UI
**Status:** Open — UX redesign pending

### Description

When a coupon application fails, the app displays a generic error message like _"Coupon not applicable"_ without specifying **why** it failed. The backend validates multiple conditions (min basket value, category, membership, expiry, first-order-only) but the error message does not surface the specific failing condition.

### Impact

- **User experience:** Users try multiple coupons and get the same vague error, leading to frustration and cart abandonment.
- **Support volume:** Tickets `tkt_3`, `tkt_14`, `tkt_25`, `tkt_28` are all coupon-related confusion. ~10% of support tickets.
- **Conversion:** Users who encounter coupon errors are more likely to abandon their cart.

### Reproduction

1. Add items worth ₹200 to cart.
2. Try to apply `WEEKEND30` (requires ₹399 minimum).
3. Error message: _"Coupon not applicable"_ — no mention of the ₹399 minimum.
4. Try to apply `MEMBER100` as a non-member.
5. Error message: _"Coupon not applicable"_ — no mention of membership requirement.

### Current Workaround

- Support agents manually explain coupon conditions when users raise tickets.
- The `terms` field on each coupon contains the full conditions, but it is only visible in the coupon detail view, not in the error state.

### Proposed Fix

1. **Specific error messages** for each failure reason:
   - `"min_basket_not_met"` → _"Add ₹X more to use this coupon (minimum ₹Y)"_
   - `"member_only"` → _"This coupon is for QuickBasket members. [Upgrade now]"_
   - `"expired"` → _"This coupon expired on [date]"_
   - `"category_mismatch"` → _"This coupon is valid only for [category name] items"_
   - `"first_order_only"` → _"This coupon is for first-time orders only"_
2. **Inline validation:** Show coupon eligibility status in the coupon list before the user tries to apply.
3. Track `coupon_failed` analytics events with `failure_reason` to identify the most common pain points.

---

## 4. Substitution Without Consent

**Severity:** High
**Component:** Packing Operations, Order System
**Status:** Open — consent flow not built

### Description

The policy states that substitutions should **only** happen with customer consent. In practice, packers sometimes substitute items without asking the customer. The `OrderItem.substitutedWith` field records when this happens, but there is **no in-app consent mechanism** for substitutions.

### Impact

- **User experience:** Customers receive items they didn't order (e.g., regular toothpaste instead of herbal). This is especially problematic for dietary, allergy, or preference reasons.
- **Trust:** Unauthorized substitutions are one of the top trust-eroding issues.
- **Support volume:** Ticket `tkt_6` (wrong toothpaste substitution). Generates replacement requests and refunds.
- **Data marker:** `OrderItem.substitutedWith` on affected items — example: `ord_6` item `item_52`.

### Reproduction

1. View order `ord_6` — the Herbal Toothpaste (`item_52`) was substituted with "Regular Mint Toothpaste" without customer approval.

### Current Workaround

- Packers are instructed to remove items rather than substitute, but compliance is inconsistent.
- Support agents offer refunds or replacements when substitution complaints arise.
- The `substitutedWith` field tracks substitutions for audit purposes.

### Proposed Fix

1. **Real-time consent flow:** When a packer initiates a substitution, send a push notification + in-app prompt to the customer: _"[Item] is unavailable. Would you like [Substitute] instead, or should we remove it?"_ with a 2-minute response window.
2. **Default to removal:** If the customer doesn't respond within the window, remove the item (don't substitute).
3. **Packer app enforcement:** Block the packer from marking a substitution without the customer's in-app approval.
4. **Preference setting:** Let users set a global preference: "Allow substitutions" / "Never substitute — just remove".

---

## 5. No-Bag Option Misleading

**Severity:** Low
**Component:** Cart UI, Packing Operations
**Status:** Open — UX copy update needed

### Description

Users can select "no bag" as their packing preference, expecting zero packaging. However, a **fallback rule** exists: loose items (vegetables, fruits, leafy greens) require minimal hygiene packaging for food safety compliance. This fallback is **not communicated** to users anywhere in the app.

### Impact

- **User experience:** Environmentally conscious users feel deceived when their "no bag" order arrives in a bag.
- **Support volume:** Ticket `tkt_12` (tomatoes and onions in plastic bag despite "no bag" selection).
- **Brand perception:** Undermines QuickBasket's eco-friendly positioning.

### Reproduction

1. Add loose vegetables (tomatoes, onions) to cart.
2. Select "no bag" packing preference.
3. Place order.
4. Delivery arrives with items in minimal hygiene bags.

### Current Workaround

- Support agents explain the fallback rule when users complain.
- The ECO10 coupon (₹10 off) is still applied as an incentive.

### Proposed Fix

1. **Add disclaimer** to the "no bag" option: _"Loose items (vegetables, fruits) may require minimal hygiene packaging for food safety."_
2. **Visual indicator:** On the cart screen, show a small note next to items that will still require packaging.
3. **Long-term:** Explore compostable mesh nets for loose produce as a zero-bag alternative.

---

## 6. Payment Success but Order Creation Failure

**Severity:** Critical
**Component:** Checkout, Payment Gateway, Order Service
**Status:** Open — high priority

### Description

A race condition in the checkout flow can cause the payment to succeed but the order creation to fail. This results in:

- Money deducted from the user's account.
- No order appearing in the user's order history.
- `Payment.orderCreationFailed = true` and `Payment.orderId = undefined`.

This is the most severe known issue as it directly involves user's money.

### Impact

- **User experience:** Users see money deducted but no order — causes panic and immediate support contact.
- **Financial risk:** User money is held without a corresponding order.
- **Support volume:** Ticket `tkt_4` (₹412 deducted, no order). Generates critical-severity tickets.
- **Trust:** Single occurrence can permanently damage user trust.
- **Data marker:** `pay_25` — payment succeeded (TXN025) but `orderId` is undefined, `orderCreationFailed: true`. Related order `ord_25` exists in `created` status with no confirmation.

### Reproduction

1. View payment `pay_25` — `status: "success"`, `orderId: undefined`, `orderCreationFailed: true`.
2. View order `ord_25` — `status: "created"` with timeline note explaining the system error.
3. User `user_1` has ticket `tkt_4` open about this issue.

### Current Workaround

- Users raise support tickets (category: `"payment_issue"` or `"order_not_created"`).
- Support agents manually escalate to the payments team.
- Refund is processed manually within 24 hours.
- No automated detection or recovery.

### Proposed Fix

1. **Idempotent order creation:** Make the order creation API idempotent so it can be safely retried.
2. **Transactional guarantee:** Wrap payment + order creation in a distributed transaction or use the saga pattern with compensating transactions.
3. **Automated recovery:** Add a background job that scans for successful payments without orders every 5 minutes. Auto-create the order or auto-initiate a refund.
4. **User-facing status:** Show a "Processing" state instead of nothing when order creation is pending.
5. **Payment hold:** Use payment authorization (hold) instead of immediate capture. Only capture after order is confirmed.

---

## 7. Refund Processing Delays

**Severity:** High
**Component:** Finance, Payment Gateway
**Status:** Open — process improvement needed

### Description

Refund SLAs are frequently missed:

- **Customer-initiated cancellations:** Should take 3–5 business days, often take 7+ days.
- **Store-initiated cancellations:** Should take 24 hours, have been observed taking 48+ hours.

The root cause is a manual approval step in the finance pipeline and a lack of automated refund processing.

### Impact

- **User experience:** Users who cancel and expect a prompt refund are left waiting, damaging trust.
- **Support volume:** Tickets `tkt_5` (refund not received after 7 days), `tkt_15` (store-cancellation refund delayed). ~8% of tickets.
- **Financial:** Refund delays can trigger chargeback disputes from users contacting their bank directly.
- **Data marker:** `pay_11` — refund initiated on Jan 30, still `refund_initiated` status as of Feb 6 (7 days overdue).

### Reproduction

1. View order `ord_11` — cancelled on Jan 30, `status: "cancelled"`.
2. View payment `pay_11` — `status: "refund_initiated"`, not yet completed after 7 days.
3. Ticket `tkt_5` documents the user's complaint.

### Current Workaround

- Support agents escalate delayed refunds to the finance team.
- For repeat complaints, agents offer store credit as an interim measure.
- No automated SLA monitoring or alerts.

### Proposed Fix

1. **Automate refunds:** Remove the manual approval step for standard refunds under ₹1,000. Auto-process within 24 hours.
2. **SLA monitoring dashboard:** Build an internal dashboard that flags refunds approaching or exceeding their SLA.
3. **Automated escalation:** If a refund is not processed within 80% of the SLA window, auto-escalate to the finance team lead.
4. **User communication:** Send proactive notifications at each refund stage: _"Refund initiated"_, _"Refund processing"_, _"Refund completed"_.
5. **Instant wallet refunds:** Offer instant refund to QuickPay wallet as the default option, with bank refund as an alternative (longer SLA).

---

## 8. Membership Benefits Sync Delay

**Severity:** Medium
**Component:** Membership Service, User Profile Cache
**Status:** Open — cache invalidation fix planned

### Description

After subscribing to a membership plan, it can take up to **2 hours** for benefits to be reflected in the app. During this window:

- Delivery fees are still charged (even for Plus members who should get free delivery).
- Priority support badge doesn't appear.
- Member-only coupons still show as ineligible.
- Cashback is not calculated.

The root cause is that the user profile (including `isMember` and `membershipPlanId`) is cached with a 2-hour TTL and is not invalidated on membership subscription.

### Impact

- **User experience:** Users who just paid for a membership immediately try to use the benefits and find they don't work. This is the worst possible first impression.
- **Support volume:** Ticket `tkt_11` (Plus member seeing delivery charges 2 hours after subscribing).
- **Financial:** Users may cancel their membership within the trial period due to perceived non-delivery of promised benefits.

### Reproduction

1. Subscribe to a membership plan.
2. Immediately try to place an order.
3. Observe that delivery fees are still charged and member coupons don't work.
4. Wait 2 hours and retry — benefits now work.

### Current Workaround

- Support agents suggest logging out and back in (sometimes triggers a cache refresh, but not reliably).
- Agents manually apply discounts or waive delivery fees for affected orders.

### Proposed Fix

1. **Immediate cache invalidation:** When a membership subscription is created, invalidate the user profile cache immediately.
2. **Optimistic update:** Update the client-side user state immediately upon successful payment, before the server cache updates.
3. **Reduce cache TTL:** Reduce the user profile cache TTL from 2 hours to 15 minutes.
4. **Event-driven update:** Use a pub/sub pattern — membership service publishes `membership_activated` event, user service subscribes and updates the cache.

---

## 9. Search Doesn't Support Hindi/Local Language Terms

**Severity:** Low
**Component:** Search, Catalog
**Status:** Open — feature request logged

### Description

The search system only matches against English product names and descriptions. Users searching in Hindi or Kannada (common in Bengaluru) get zero results.

Examples of failed searches:
- "dahi" → 0 results (should match "Greek Yogurt" or "Curd")
- "atta" → 0 results (should match "Wheat Flour")
- "sabji" → 0 results (should match vegetables category)
- "dudh" → 0 results (should match "Full Cream Milk")

### Impact

- **User experience:** Bengaluru has a multilingual population. Users who think in Hindi/Kannada must mentally translate to English product names.
- **Conversion:** Users who can't find items via search may assume the item is not available and leave.
- **Support volume:** Ticket `tkt_21` (user searching "dahi" getting no results).

### Reproduction

1. Search for "dahi" in the search bar.
2. Get 0 results.
3. Search for "yogurt" — results appear.

### Current Workaround

- Users must search using English product names.
- No alias or synonym mapping exists.

### Proposed Fix

1. **Synonym/alias mapping:** Create a multilingual mapping table: `{"dahi": "yogurt", "atta": "flour", "dudh": "milk", ...}` and expand search queries using aliases.
2. **Transliteration support:** Add a transliteration layer that converts Hindi/Kannada input to English equivalents.
3. **Long-term:** Implement semantic search using embeddings that understand cross-language similarity.
4. **Data source:** Crowdsource alias mappings from support agents who encounter these queries.

---

## 10. No Address Change After Order Placement

**Severity:** Medium
**Component:** Order System, Delivery
**Status:** Open — product decision pending

### Description

Once an order is confirmed, there is no way to change the delivery address. The system locks the address at order creation because delivery routes are pre-optimized. Users who accidentally select the wrong address must cancel and reorder.

### Impact

- **User experience:** Users lose their applied coupon when they cancel and reorder. The forced cancel-and-reorder flow is cumbersome.
- **Support volume:** Ticket `tkt_10` (user selected office address for a weekend order by accident).
- **Edge cases:** Users who move between addresses (home vs. office) during the day often make this mistake.

### Reproduction

1. Place an order with the "Office" address selected.
2. Realize the mistake immediately after order confirmation.
3. Try to change the address — no option available.
4. Only option: cancel the order and reorder.

### Current Workaround

- Support agents advise users to cancel and reorder.
- Agents may manually re-apply coupons to the new order.

### Proposed Fix

1. **Allow address change before packing:** Add an "Edit Address" option on the order detail screen while status is `created` or `confirmed`.
2. **Address confirmation step:** Add an explicit address confirmation screen at checkout: _"Delivering to [Address]. Is this correct?"_
3. **Zone validation:** When changing address, validate that the new address is in a zone that can be served from the same warehouse. If not, inform the user that a cancel-and-reorder is required.
4. **Preserve coupon on reorder:** If an order is cancelled and immediately reordered, auto-apply the same coupon (if still valid).

---

## 11. ETA Change Notifications Unreliable

**Severity:** High
**Component:** Notification System, Delivery
**Status:** Open — notification infrastructure upgrade planned

### Description

When an order's ETA changes after placement (due to traffic, weather, partner reassignment), the system is supposed to send a push notification to the user. However, the notification delivery is **unreliable** — notifications frequently fail to reach the user, or arrive significantly late.

Root causes:
- Push notification service has intermittent failures.
- Background notification delivery is deprioritized by mobile OS power management.
- No retry mechanism for failed notification sends.
- No fallback to SMS or in-app notification.

### Impact

- **User experience:** Users discover ETA changes only by manually checking the app. This is especially frustrating when waiting for express orders.
- **Trust:** Users feel uninformed and out of the loop about their order status.
- **Support volume:** Tickets `tkt_2`, `tkt_8`, `tkt_9` all mention not being notified about ETA changes.
- **Data marker:** Orders with `etaChangedAfterOrder: true` — `ord_9`, `ord_16`, `ord_23`.

### Reproduction

1. Place a standard (30 min) delivery order.
2. Wait for an ETA change (e.g., due to traffic).
3. Observe that no push notification is received.
4. Check the app — the ETA has increased but there's no in-app banner or alert about the change.

### Current Workaround

- Users must manually poll the order detail screen.
- Support agents respond to complaints about late deliveries and explain the ETA change.

### Proposed Fix

1. **Notification retry:** Implement a retry mechanism (3 attempts with exponential backoff) for failed push notifications.
2. **Multi-channel fallback:** If push fails, send SMS. If SMS fails, show a persistent in-app banner on next app open.
3. **In-app real-time updates:** Use WebSocket for live order tracking with ETA change alerts shown as an in-app toast.
4. **Notification audit log:** Track notification delivery status for each order event for debugging.

---

## 12. Coupon Visibility for Non-Members

**Severity:** Low
**Component:** Coupon System, Cart UI
**Status:** Open — design decision under review

### Description

Member-only coupons (e.g., `MEMBER100`, `HIDDEN99`) are **visible to all users** in the coupon listing, even those who are not members. Non-members can see the coupon and its benefits but get a vague error when trying to apply it. This is a **deliberate product decision** to showcase member savings, but it causes confusion.

### Impact

- **User experience:** Non-members feel baited when they see attractive coupons they can't use. The vague error message (see [Issue #3](#3-coupon-error-messages-are-vague)) compounds the frustration.
- **Support volume:** Ticket `tkt_25` (user felt baited by MEMBER100 coupon).
- **Perception:** Some users view this as deceptive rather than aspirational.

### Reproduction

1. Log in as a non-member user.
2. View the coupon list — `MEMBER100` (₹100 off) is visible.
3. Try to apply it — error: _"Coupon not applicable"_.
4. No explanation that it requires membership.

### Current Workaround

- Support agents explain that the coupon is for members only.
- The coupon `terms` field mentions the membership requirement, but users often don't read it before trying to apply.

### Proposed Fix

1. **Visual differentiation:** Show member-only coupons with a distinct "Members Only" badge and a muted/locked visual treatment for non-members.
2. **CTA instead of error:** When a non-member tries to apply a member coupon, show: _"This coupon is exclusive to [Plan] members. [View membership plans →]"_ instead of a generic error.
3. **Separate sections:** Split the coupon list into "Your Coupons" and "Member Exclusive" sections.
4. **A/B test visibility:** Test whether showing member coupons to non-members actually increases membership conversion vs. causing frustration.

---

## Summary Table

| # | Issue | Severity | Component | Status | SLA Impact |
|---|---|---|---|---|---|
| 1 | Inventory sync delay (stock flip) | High | Inventory, Checkout | Open | Item removal post-order |
| 2 | ETA estimation inaccurate | Medium | Delivery | Open | Delivery SLA misses |
| 3 | Coupon error messages vague | Medium | Coupon, Cart UI | Open | Cart abandonment |
| 4 | Substitution without consent | High | Packing, Orders | Open | Wrong items delivered |
| 5 | No-bag option misleading | Low | Cart UI, Packing | Open | Trust erosion |
| 6 | Payment success, order failure | **Critical** | Checkout, Payments | Open | Money at risk |
| 7 | Refund processing delays | High | Finance, Payments | Open | Refund SLA missed |
| 8 | Membership benefits sync delay | Medium | Membership, Cache | Open | New member frustration |
| 9 | Search no Hindi/local language | Low | Search, Catalog | Open | Lost conversions |
| 10 | No address change post-order | Medium | Orders, Delivery | Open | Forced cancel/reorder |
| 11 | ETA change notifications unreliable | High | Notifications | Open | Users uninformed |
| 12 | Coupon visibility for non-members | Low | Coupons, Cart UI | Open | User confusion |

---

## Priority Recommendation

Based on severity and impact, recommended fix order:

1. **[Critical]** #6 — Payment success but order creation failure (money at risk)
2. **[High]** #4 — Substitution without consent (trust + operational)
3. **[High]** #1 — Inventory sync delay (trust + frequent occurrence)
4. **[High]** #7 — Refund processing delays (financial SLA)
5. **[High]** #11 — ETA change notifications (trust + information)
6. **[Medium]** #2 — ETA estimation (delivery SLA)
7. **[Medium]** #3 — Coupon error messages (conversion)
8. **[Medium]** #8 — Membership benefits sync (new member experience)
9. **[Medium]** #10 — No address change post-order (UX friction)
10. **[Low]** #5 — No-bag option misleading (simple copy fix)
11. **[Low]** #9 — Search Hindi/local language (feature enhancement)
12. **[Low]** #12 — Coupon visibility for non-members (design decision)

---

## Revision History

| Date | Change | Author |
|---|---|---|
| 2026-02-06 | Initial known issues documentation | PKB System |
