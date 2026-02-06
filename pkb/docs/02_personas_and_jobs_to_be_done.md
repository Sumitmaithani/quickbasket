# QuickBasket — Personas & Jobs to Be Done

> **Last updated:** February 2026  
> **Purpose:** Define our core user personas and the jobs they hire QuickBasket to do

---

## Overview

QuickBasket serves four primary personas across Bengaluru's urban landscape. Each represents a distinct behavioral pattern, but they share one thing: the need for **daily essentials delivered fast, without the overhead of planning a big shop**.

These personas are based on observed patterns from our early user base and customer support interactions (30 tickets analyzed).

---

## Persona 1: Priya Sharma — The Urban Professional

### Demographics

| Attribute | Detail |
|---|---|
| **Age** | 29 |
| **Occupation** | Product Manager at a SaaS startup in Koramangala |
| **Household** | Lives alone in a 1BHK apartment |
| **Income** | ₹1.2L/month |
| **Location** | HSR Layout, Bengaluru |
| **Tech savviness** | High — early adopter, uses 4–5 delivery apps |
| **Phone** | iPhone 15, always on mobile |

### Behavioral Profile

Priya works 10-hour days and has a 45-minute commute. She doesn't have time to visit stores and hates the idea of a weekly grocery trip. She orders small baskets 4–5 times a week — usually in the morning before work (milk, bread, eggs) or in the evening when she realizes she's missing something for dinner (tomatoes, coriander, paneer).

She's **price-aware but not price-driven**. She'll pay ₹15–₹29 for fast delivery without hesitation but will use coupon codes she comes across. She tried WEEKEND30 on a Saturday but her basket was ₹350 (under the ₹399 minimum) — the error message just said "coupon not applicable" and she filed a support ticket about it.

She's a **Plus member** because the free delivery and 10% cashback pays for itself given her order frequency.

### Quote

> *"I don't need 10,000 items. I need 10 items in 10 minutes."*

### Jobs to Be Done

#### Functional Jobs

| Job | Frequency | Context |
|---|---|---|
| **Replenish daily essentials** (milk, bread, eggs) | Daily, 7–8 AM | Before leaving for work; realizes fridge is empty |
| **Emergency ingredient run** (coriander, tomatoes, onions) | 3–4x/week, 6–7 PM | Cooking dinner, missing a key ingredient |
| **Stock up on snacks for WFH days** (chips, cold coffee, cookies) | 1–2x/week, afternoon | Working from home, wants munchies |
| **Quick personal care restock** (hand wash, shampoo) | 1–2x/month | Runs out mid-week, doesn't want to wait |

#### Emotional Jobs

- **Feel in control** of her daily routine despite a hectic schedule
- **Avoid the guilt** of "I should have planned better" when she's out of something
- **Feel smart** about using coupons and membership savings

#### Social Jobs

- **Host impromptu dinners** without stressing about missing ingredients
- **Be seen as organized** by friends even though she shops on-demand

### Pain Points

| Pain Point | Severity | Mapping to Known Issues |
|---|---|---|
| Coupon errors are vague — doesn't know why a code failed | Medium | WEEKEND30 incident (tkt_3) |
| ETA changed without notification during rain | High | ord_9, ord_16 (tkt_2, tkt_9) |
| Payment went through but order wasn't created | Critical | TXN025 orphaned payment (tkt_4) |
| Membership benefits didn't activate immediately after subscribing | High | Membership sync delay (tkt_11) |
| Search doesn't support Hindi terms ("dahi" → 0 results) | Low | tkt_21 |

### Frequency & Spend

| Metric | Value |
|---|---|
| Orders per week | 4–5 |
| Average basket size | ₹200–₹400 |
| Monthly spend | ₹3,500–₹5,000 |
| Preferred slots | Express (10 min), Standard (30 min) |
| Packing preference | No bag or eco-friendly |
| Membership | QuickBasket Plus (₹149/mo) |

---

## Persona 2: Rajesh Nair — The Young Family Man

### Demographics

| Attribute | Detail |
|---|---|
| **Age** | 35 |
| **Occupation** | Senior Software Engineer at a large IT company in Whitefield |
| **Household** | Lives with wife Meera (homemaker) and 2 kids (ages 4 and 7) in a 3BHK apartment |
| **Income** | ₹2L/month |
| **Location** | Whitefield, Bengaluru |
| **Tech savviness** | High — tech professional, methodical about apps |
| **Phone** | Samsung Galaxy S24, shared account with wife |

### Behavioral Profile

Rajesh does a big weekly grocery run on BigBasket/JioMart every Sunday. But during the week, there's always something that runs out — milk, bread, eggs, snacks for the kids, cleaning supplies. His wife Meera handles most of the ordering during the day while Rajesh is at work.

They value **reliability over speed**. A missed item or wrong substitution means a cranky kid who won't eat dinner. They've had issues with receiving wrong items (Regular Mint Toothpaste instead of Herbal — tkt_6) and near-expiry bread (tkt_24). Quality consistency matters more to them than shaving 5 minutes off delivery.

Rajesh does the math on everything. He compared Basic vs Plus membership carefully (even raised a support ticket asking for clarification — tkt_19) before subscribing to Basic, since they order 2–3 times a week and the ₹49/mo plan gives free delivery above ₹199.

### Quote

> *"The weekly BigBasket order covers 80% of what we need. QuickBasket handles the other 20% that we always forget."*

### Jobs to Be Done

#### Functional Jobs

| Job | Frequency | Context |
|---|---|---|
| **Top-up household staples mid-week** (milk, eggs, bread, butter) | 2–3x/week, morning | Wife notices supply running low |
| **Get kid-specific snacks and drinks** (cookies, mango juice, noodles) | 1–2x/week, after school | Kids want specific items |
| **Emergency household supply** (garbage bags, detergent, tissue) | 1x/week | Unexpectedly ran out |
| **Seasonal/premium purchases** (Alphonso mangoes, trail mix) | Occasionally | Special occasions, weekend treats |

#### Emotional Jobs

- **Be a reliable provider** — family shouldn't have to worry about household basics
- **Avoid friction with spouse** over forgotten items or planning failures
- **Feel confident** that the items delivered are fresh, correct, and safe for kids

#### Social Jobs

- **Share the mental load** of grocery management with his wife through the shared app
- **Model responsible consumption** (chose eco-friendly packing for recent orders)

### Pain Points

| Pain Point | Severity | Mapping to Known Issues |
|---|---|---|
| Wrong item delivered (substitution without consent) | High | Herbal → Regular toothpaste (ord_6, tkt_6) |
| Damaged items (3 broken eggs) | High | Poor packaging (ord_12, tkt_7) |
| Near-expiry items delivered (bread expires tomorrow) | Medium | Quality check failure (tkt_24) |
| Overripe/quality issues with premium items | High | Mushy Alphonso mangoes (tkt_18) |
| Difference between Basic and Plus not clear | Low | Membership comparison confusion (tkt_19) |

### Frequency & Spend

| Metric | Value |
|---|---|
| Orders per week | 2–3 |
| Average basket size | ₹300–₹600 |
| Monthly spend | ₹2,500–₹4,000 |
| Preferred slots | 1-hour free slot, Scheduled (9–11 AM) |
| Packing preference | Standard or eco-friendly |
| Membership | QuickBasket Basic (₹49/mo) |

---

## Persona 3: Ananya Reddy — The College Student

### Demographics

| Attribute | Detail |
|---|---|
| **Age** | 21 |
| **Occupation** | 3rd year B.Tech student at PES University |
| **Household** | Shares a PG (paying guest) room with one roommate near campus |
| **Income** | ₹15,000/month (parental allowance + part-time freelancing) |
| **Location** | Banashankari, Bengaluru |
| **Tech savviness** | Very high — digital native, active on social media |
| **Phone** | Redmi Note 13, budget-conscious about everything |

### Behavioral Profile

Ananya is extremely price-sensitive and optimizes every rupee. She'll spend 10 minutes hunting for the right coupon code before placing a ₹200 order. She discovered HIDDEN99 from a college WhatsApp group and was annoyed when she couldn't use it without a membership.

She orders mainly snacks, instant noodles, cold coffee, and personal care items. Her orders are small (₹100–₹250) and she avoids delivery fees by using the free 1-hour slot or adding items to hit the free delivery threshold. She's considered a membership but ₹49/month feels steep when her total monthly grocery spend is ₹1,500–₹2,000.

She's a vocal user — she'll file a support ticket for a ₹4 rounding discrepancy on a coupon (tkt_28) and actively suggests features (like Hindi search, default delivery slots).

### Quote

> *"If I'm paying ₹40 for chips, I better get the exact discount the coupon promises. Don't round down my money."*

### Jobs to Be Done

#### Functional Jobs

| Job | Frequency | Context |
|---|---|---|
| **Quick snack restock** (chips, noodles, cold coffee, cookies) | 3–4x/week | Study sessions, late nights, hostel munchies |
| **Essential personal care** (face wash, lip balm, cotton pads) | 1–2x/month | Ran out, no time to visit a store between classes |
| **Share orders with roommate** to split costs and hit min basket values | 2x/week | Combine orders to qualify for coupons |
| **Coupon hunt and maximize savings** | Every order | Screenshots coupon codes from social media, tries every code |

#### Emotional Jobs

- **Feel independent** — managing her own household needs away from home
- **Feel savvy** — getting the best deal on every order
- **Avoid embarrassment** of running out of personal care basics

#### Social Jobs

- **Share good deals** with college friends and PG roommates
- **Bond over shared orders** — ordering together is a social activity

### Pain Points

| Pain Point | Severity | Mapping to Known Issues |
|---|---|---|
| Coupon conditions not clear upfront (ECO10, MEMBER100) | High | tkt_14, tkt_25 |
| Discount rounding feels unfair (₹53.75 → ₹50) | Medium | SNACK25 rounding (tkt_28) |
| Member-only coupons shown to non-members feels like bait | Medium | MEMBER100 visibility (tkt_25) |
| Delivery fee on small orders is a big percentage of basket | High | ₹29 express on a ₹110 order is 26% |
| No way to split payments or share order costs in-app | Low | Feature gap |

### Frequency & Spend

| Metric | Value |
|---|---|
| Orders per week | 3–4 |
| Average basket size | ₹100–₹250 |
| Monthly spend | ₹1,500–₹2,000 |
| Preferred slots | 1-hour free slot (avoids delivery fees) |
| Packing preference | No bag (to get ₹10 ECO10 discount) |
| Membership | None (considering Basic) |

---

## Persona 4: Murthy Rao — The Senior Citizen

### Demographics

| Attribute | Detail |
|---|---|
| **Age** | 68 |
| **Occupation** | Retired government officer; pension + savings |
| **Household** | Lives with wife Saraswathi (65) in an independent house |
| **Income** | ₹45,000/month (pension) |
| **Location** | Jayanagar, Bengaluru |
| **Tech savviness** | Low-medium — uses WhatsApp confidently, struggles with complex apps |
| **Phone** | Samsung Galaxy M14, large font enabled |

### Behavioral Profile

Murthy started using QuickBasket after his son set it up for him during a visit. He mainly orders dairy (milk, curd, paneer), vegetables, and household cleaning products. His orders are routine and predictable — the same 5–8 items every few days.

He's not interested in coupons or deals — he just wants his items to arrive correctly and on time. He gets confused by ETA changes and doesn't understand why the app shows a different delivery time after he places an order. When something goes wrong, he tends to call his son for help rather than use in-app support.

He had a frustrating experience when his delivery person couldn't find his house because the app doesn't have a landmarks field (tkt_22). He also doesn't understand packing preferences — he selected "no bag" once (his son had set it up) and was confused when his vegetables arrived in a bag anyway (tkt_12).

### Quote

> *"Just send me my milk and vegetables on time. I don't need all these offers and coupons. Keep it simple."*

### Jobs to Be Done

#### Functional Jobs

| Job | Frequency | Context |
|---|---|---|
| **Regular dairy delivery** (milk, curd, butter, paneer) | 3–4x/week | Morning routine; wife makes fresh curd daily |
| **Vegetable restock** (tomatoes, onions, potatoes, coriander) | 2x/week | Cooking staples for daily South Indian meals |
| **Household supplies** (bathroom cleaner, mosquito repellent) | 1–2x/month | Wife requests; too heavy to carry from store |
| **Reorder last order** with minimal interaction | Every order | Wants to repeat the same basket quickly |

#### Emotional Jobs

- **Maintain independence** — doesn't want to depend on neighbors or son for basic shopping
- **Feel secure** that his payment and personal information are safe
- **Avoid confusion** — simple, predictable experience every time

#### Social Jobs

- **Show his wife** that he's handling the household shopping efficiently
- **Tell neighbors** about the convenience (word of mouth among senior community)

### Pain Points

| Pain Point | Severity | Mapping to Known Issues |
|---|---|---|
| Delivery person can't find house — no landmarks field | High | tkt_22 |
| ETA changes are confusing — "why is my 30-min order taking 55 min?" | High | ord_9, ord_16, tkt_2, tkt_9 |
| "No bag" option is misleading — vegetables still came in a bag | Medium | tkt_12 |
| Doesn't understand in-app support — prefers calling someone | High | UX gap for low-tech users |
| Font size and button targets too small on some screens | Medium | Accessibility gap |
| Refund process takes too long and status updates are unclear | Medium | tkt_5, tkt_15 |

### Frequency & Spend

| Metric | Value |
|---|---|
| Orders per week | 3–4 |
| Average basket size | ₹150–₹300 |
| Monthly spend | ₹2,000–₹3,000 |
| Preferred slots | Scheduled morning (9–11 AM) |
| Packing preference | Standard (doesn't understand other options) |
| Membership | None (son considering setting up Basic for him) |

---

## Jobs to Be Done — Framework Summary

### Functional Jobs (Across All Personas)

| Priority | Job | Personas | Current Support |
|---|---|---|---|
| **P0** | Get essential items delivered within 30 minutes | All | Core flow works; ETA accuracy needs improvement |
| **P0** | Browse, search, and discover items quickly | All | Category browsing + search. Search is English-only. |
| **P0** | Complete checkout and pay reliably | All | UPI, card, wallet, COD. Edge case: orphaned payments (TXN025) |
| **P1** | Reorder previous baskets with minimal effort | Murthy, Priya, Rajesh | "Reorder" section on home page; no default slot |
| **P1** | Apply coupons and understand discounts clearly | Ananya, Priya | 12 coupons available; error messages need work |
| **P1** | Track order in real-time with accurate ETA | All | Timeline tracking exists; ETA changes lack proactive notification |
| **P2** | Get help when something goes wrong | All | In-app support tickets; no phone support; senior-unfriendly |
| **P2** | Manage membership and understand benefits | Priya, Rajesh, Ananya | Membership page exists; benefit sync can be delayed |

### Emotional Jobs

| Job | Primary Persona | Insight |
|---|---|---|
| Feel in control of daily routine | Priya | Fast delivery = freedom from planning |
| Feel like a reliable provider | Rajesh | Correct items, fresh quality = family trust |
| Feel savvy and smart about spending | Ananya | Coupons, cashback, optimizing every order |
| Feel independent despite age | Murthy | Self-sufficient for basic needs |
| Avoid guilt about poor planning | Priya, Rajesh | "I forgot" is OK when delivery is 15 min away |
| Feel secure about payments | Murthy | Trust that money won't be lost |

### Social Jobs

| Job | Primary Persona | Insight |
|---|---|---|
| Share deals and refer friends | Ananya | College friend networks amplify organic growth |
| Host without stress | Priya | Last-minute ingredient runs enable spontaneous entertaining |
| Share household mental load | Rajesh, Meera | Shared app account distributes grocery responsibility |
| Demonstrate tech-savviness to peers | Murthy | Pride in using modern delivery apps at 68 |

---

## Persona-Feature Priority Matrix

| Feature / Improvement | Priya | Rajesh | Ananya | Murthy | Overall Priority |
|---|---|---|---|---|---|
| Fix stock sync (reduce stock flip) | High | High | Medium | Medium | **P0** |
| Proactive ETA change notifications | High | Medium | Low | High | **P0** |
| Specific coupon error messages | Medium | Low | High | Low | **P1** |
| Payment-order atomicity fix | High | High | Medium | High | **P0** |
| Hindi/Kannada search support | Medium | Low | Low | High | **P2** |
| Address landmarks field | Low | Low | Low | High | **P2** |
| Default delivery slot preference | High | Medium | Low | High | **P1** |
| Clearer membership comparison | Medium | High | High | Low | **P1** |
| Improved accessibility (font, buttons) | Low | Low | Low | High | **P2** |
| In-app chat / phone support | Low | Low | Low | High | **P2** |
