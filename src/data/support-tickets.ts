import { SupportTicket } from "@/types";

export const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "tkt_1", userId: "user_1", orderId: "ord_22", category: "missing_item", severity: "high", status: "resolved", resolution: "refund",
    subject: "Mushrooms were missing from my order",
    description: "I ordered 3 packs of Button Mushrooms but none were delivered. The app showed them as available when I placed the order.",
    messages: [
      { id: "msg_1_1", sender: "customer", message: "Hi, I just received my order but the mushrooms I ordered are completely missing. I ordered 3 packs!", timestamp: "2026-02-05T08:35:00Z" },
      { id: "msg_1_2", sender: "agent", message: "I'm sorry about that! I can see the mushrooms were marked as out of stock during packing. We should have notified you. I'll process a refund of ₹150 for the 3 packs.", timestamp: "2026-02-05T08:40:00Z" },
      { id: "msg_1_3", sender: "customer", message: "Why did the app show them as available when I ordered? This is frustrating.", timestamp: "2026-02-05T08:42:00Z" },
      { id: "msg_1_4", sender: "agent", message: "You're right, and I understand the frustration. There was a delay in our inventory sync. The refund has been initiated and should reflect in 3-5 business days.", timestamp: "2026-02-05T08:45:00Z" },
    ],
    createdAt: "2026-02-05T08:35:00Z", updatedAt: "2026-02-05T08:45:00Z",
  },
  {
    id: "tkt_2", userId: "user_1", orderId: "ord_9", category: "eta_changed", severity: "medium", status: "resolved", resolution: "explanation",
    subject: "Delivery was 25 minutes late",
    description: "My order was supposed to arrive in 30 minutes but took almost an hour. The ETA changed after I placed the order.",
    messages: [
      { id: "msg_2_1", sender: "customer", message: "My order said 30 mins but it's been 50 minutes and still not here. What's going on?", timestamp: "2026-01-28T16:20:00Z" },
      { id: "msg_2_2", sender: "agent", message: "I apologize for the delay. There's heavy traffic in your area right now which is causing delays. Your order is on the way and should arrive in the next 5-10 minutes.", timestamp: "2026-01-28T16:22:00Z" },
      { id: "msg_2_3", sender: "customer", message: "I chose the 30-min slot specifically because I needed it fast. This defeats the purpose.", timestamp: "2026-01-28T16:23:00Z" },
      { id: "msg_2_4", sender: "agent", message: "I completely understand. We've waived the delivery fee for this order as a gesture. We're working on improving our ETA estimates for traffic conditions.", timestamp: "2026-01-28T16:25:00Z" },
    ],
    createdAt: "2026-01-28T16:20:00Z", updatedAt: "2026-01-28T16:25:00Z",
  },
  {
    id: "tkt_3", userId: "user_1", orderId: "ord_10", category: "coupon_issue", severity: "low", status: "resolved", resolution: "explanation",
    subject: "WEEKEND30 coupon didn't work on Saturday",
    description: "I tried to apply WEEKEND30 coupon on a Saturday order but it wasn't valid. The description says 'weekends only'.",
    messages: [
      { id: "msg_3_1", sender: "customer", message: "I tried using WEEKEND30 on Saturday but the app said it's not applicable. It says '30% off this weekend!' — isn't Saturday a weekend?", timestamp: "2026-02-01T10:00:00Z" },
      { id: "msg_3_2", sender: "agent", message: "Let me check this for you. The WEEKEND30 coupon requires a minimum basket value of ₹399. Could you confirm your basket total?", timestamp: "2026-02-01T10:05:00Z" },
      { id: "msg_3_3", sender: "customer", message: "My basket was ₹350. But the error message just said 'coupon not applicable' — it didn't tell me about the minimum amount!", timestamp: "2026-02-01T10:07:00Z" },
      { id: "msg_3_4", sender: "agent", message: "You're right, the error message should be more specific. I've noted this as feedback. The coupon needs a minimum of ₹399. You could add ₹49 more to qualify. I've also applied FLAT200 for your next order as a goodwill gesture.", timestamp: "2026-02-01T10:10:00Z" },
    ],
    createdAt: "2026-02-01T10:00:00Z", updatedAt: "2026-02-01T10:10:00Z",
  },
  {
    id: "tkt_4", userId: "user_1", orderId: undefined, category: "payment_issue", severity: "critical", status: "in_progress", resolution: "pending",
    subject: "Payment deducted but no order created",
    description: "I placed an order and my payment of ₹412 was deducted but no order appeared in my orders list. Transaction ID: TXN025.",
    messages: [
      { id: "msg_4_1", sender: "customer", message: "My money was deducted (₹412 via UPI) but I don't see any order! Transaction ID is TXN025. Please help urgently.", timestamp: "2026-02-06T09:05:00Z" },
      { id: "msg_4_2", sender: "agent", message: "I can see the payment was successful but there was a system error during order creation. I'm escalating this to our payments team right away. We'll either create your order or initiate a full refund within 2 hours.", timestamp: "2026-02-06T09:10:00Z" },
      { id: "msg_4_3", sender: "customer", message: "This is really concerning. How can the payment go through but the order not be created? When will I get my money back?", timestamp: "2026-02-06T09:12:00Z" },
      { id: "msg_4_4", sender: "agent", message: "I understand your concern. This is a rare edge case in our system. Our team is looking into it now. If the order can't be recovered, the refund will be processed within 24 hours.", timestamp: "2026-02-06T09:15:00Z" },
    ],
    createdAt: "2026-02-06T09:05:00Z", updatedAt: "2026-02-06T09:15:00Z",
  },
  {
    id: "tkt_5", userId: "user_1", orderId: "ord_11", category: "refund_delay", severity: "high", status: "open", resolution: "pending",
    subject: "Refund not received after 7 days",
    description: "I cancelled order ord_11 on Jan 30 and was told refund would take 3-5 business days. It's been over a week and I haven't received it.",
    messages: [
      { id: "msg_5_1", sender: "customer", message: "I cancelled my order on Jan 30 and was promised a refund in 3-5 days. It's Feb 6 now and still no refund of ₹310!", timestamp: "2026-02-06T11:00:00Z" },
      { id: "msg_5_2", sender: "agent", message: "I'm sorry about the delay. Let me check the refund status for you.", timestamp: "2026-02-06T11:05:00Z" },
      { id: "msg_5_3", sender: "agent", message: "I can see the refund was initiated on Jan 30 but it seems to be stuck in processing. I'm escalating this to our finance team for priority processing. You should receive it within 48 hours.", timestamp: "2026-02-06T11:08:00Z" },
      { id: "msg_5_4", sender: "customer", message: "48 more hours? I was already told 3-5 days. This is unacceptable.", timestamp: "2026-02-06T11:10:00Z" },
    ],
    createdAt: "2026-02-06T11:00:00Z", updatedAt: "2026-02-06T11:10:00Z",
  },
  {
    id: "tkt_6", userId: "user_1", orderId: "ord_6", category: "wrong_item", severity: "medium", status: "resolved", resolution: "replacement",
    subject: "Received wrong toothpaste — not what I ordered",
    description: "I ordered Herbal Toothpaste but received a Regular Mint one instead. This is a substitution I didn't approve.",
    messages: [
      { id: "msg_6_1", sender: "customer", message: "I ordered Toothpaste (Herbal) but got Regular Mint Toothpaste. I specifically wanted the herbal variant for its natural ingredients.", timestamp: "2026-01-25T09:10:00Z" },
      { id: "msg_6_2", sender: "agent", message: "I apologize for this. It looks like we substituted your item without your consent. Would you prefer a refund or a replacement?", timestamp: "2026-01-25T09:15:00Z" },
      { id: "msg_6_3", sender: "customer", message: "I'd like a replacement please. The herbal one.", timestamp: "2026-01-25T09:16:00Z" },
      { id: "msg_6_4", sender: "agent", message: "Done! We'll deliver the correct Herbal Toothpaste tomorrow. You can keep the regular one. I've also added a ₹50 credit to your account for the inconvenience.", timestamp: "2026-01-25T09:20:00Z" },
    ],
    createdAt: "2026-01-25T09:10:00Z", updatedAt: "2026-01-25T09:20:00Z",
  },
  {
    id: "tkt_7", userId: "user_1", orderId: "ord_12", category: "damaged_item", severity: "high", status: "resolved", resolution: "refund",
    subject: "Eggs were broken in delivery",
    description: "3 out of 12 eggs were broken when delivered. The packaging was inadequate.",
    messages: [
      { id: "msg_7_1", sender: "customer", message: "3 eggs from my order were broken. The packaging was clearly not enough for such fragile items. See attached photo.", timestamp: "2026-01-31T14:35:00Z" },
      { id: "msg_7_2", sender: "agent", message: "I'm really sorry to see that. You're right, our packaging for eggs needs to be better. I'll process a partial refund for the 3 broken eggs (₹28). Would you also like a replacement?", timestamp: "2026-01-31T14:40:00Z" },
      { id: "msg_7_3", sender: "customer", message: "Just the refund is fine. But please improve the packaging. This has happened before.", timestamp: "2026-01-31T14:42:00Z" },
      { id: "msg_7_4", sender: "agent", message: "Refund of ₹28 has been initiated. I've also flagged this for our operations team. Thank you for the feedback.", timestamp: "2026-01-31T14:45:00Z" },
    ],
    createdAt: "2026-01-31T14:35:00Z", updatedAt: "2026-01-31T14:45:00Z",
  },
  {
    id: "tkt_8", userId: "user_1", orderId: "ord_23", category: "late_delivery", severity: "medium", status: "open", resolution: "pending",
    subject: "Order tracking seems stuck",
    description: "My order has been 'out for delivery' for 30 minutes but the tracking hasn't updated. The original ETA was 25 minutes.",
    messages: [
      { id: "msg_8_1", sender: "customer", message: "My order shows 'out for delivery' but it's been 30 minutes and no update. The ETA already changed once. Is something wrong?", timestamp: "2026-02-06T11:15:00Z" },
      { id: "msg_8_2", sender: "agent", message: "Let me check the delivery partner's location. It appears the partner was reassigned which caused the delay. Your order should arrive in the next 10-15 minutes.", timestamp: "2026-02-06T11:18:00Z" },
    ],
    createdAt: "2026-02-06T11:15:00Z", updatedAt: "2026-02-06T11:18:00Z",
  },
  {
    id: "tkt_9", userId: "user_1", orderId: "ord_16", category: "eta_changed", severity: "low", status: "resolved", resolution: "explanation",
    subject: "ETA changed due to rain but no notification",
    description: "My delivery ETA doubled because of rain but I wasn't notified. I only found out when I checked the app.",
    messages: [
      { id: "msg_9_1", sender: "customer", message: "My ETA went from 30 mins to 55 mins because of rain. Why wasn't I notified about this change?", timestamp: "2026-02-02T13:25:00Z" },
      { id: "msg_9_2", sender: "agent", message: "You're right, we should have sent a notification. I'll raise this with our product team. For now, I can confirm your order is on its way.", timestamp: "2026-02-02T13:28:00Z" },
      { id: "msg_9_3", sender: "customer", message: "OK thanks. Please make sure notifications work next time.", timestamp: "2026-02-02T13:30:00Z" },
    ],
    createdAt: "2026-02-02T13:25:00Z", updatedAt: "2026-02-02T13:30:00Z",
  },
  {
    id: "tkt_10", userId: "user_1", orderId: undefined, category: "address_issue", severity: "medium", status: "resolved", resolution: "explanation",
    subject: "Cannot change address after placing order",
    description: "I accidentally selected my office address for a weekend order. There's no way to change it after placing the order.",
    messages: [
      { id: "msg_10_1", sender: "customer", message: "I just placed an order but selected my office address by mistake. How do I change it? I don't see an option.", timestamp: "2026-02-01T14:00:00Z" },
      { id: "msg_10_2", sender: "agent", message: "Unfortunately, we can't change the delivery address after the order is confirmed as our delivery routes are optimized. You could cancel and reorder with the correct address.", timestamp: "2026-02-01T14:05:00Z" },
      { id: "msg_10_3", sender: "customer", message: "But I'll lose my coupon if I cancel and reorder! This should be an option at least before packing starts.", timestamp: "2026-02-01T14:07:00Z" },
      { id: "msg_10_4", sender: "agent", message: "I understand the frustration. Let me apply the same coupon to your new order manually. Please cancel the current one and place a new order.", timestamp: "2026-02-01T14:10:00Z" },
    ],
    createdAt: "2026-02-01T14:00:00Z", updatedAt: "2026-02-01T14:10:00Z",
  },
  {
    id: "tkt_11", userId: "user_1", orderId: undefined, category: "membership_issue", severity: "medium", status: "open", resolution: "pending",
    subject: "Membership benefits not showing after subscription",
    description: "I subscribed to QuickBasket Plus but I'm still seeing delivery charges and no priority support badge.",
    messages: [
      { id: "msg_11_1", sender: "customer", message: "I subscribed to Plus membership 2 hours ago but I'm still being charged delivery fees. Also no priority support badge visible.", timestamp: "2026-02-06T12:00:00Z" },
      { id: "msg_11_2", sender: "agent", message: "Let me check your membership status. I can see the subscription was created but it seems there's a sync delay. Can you try logging out and back in?", timestamp: "2026-02-06T12:05:00Z" },
      { id: "msg_11_3", sender: "customer", message: "I did that. Still the same. This is the main reason I upgraded — for free delivery!", timestamp: "2026-02-06T12:08:00Z" },
    ],
    createdAt: "2026-02-06T12:00:00Z", updatedAt: "2026-02-06T12:08:00Z",
  },
  {
    id: "tkt_12", userId: "user_1", orderId: "ord_3", category: "packing_issue", severity: "low", status: "resolved", resolution: "explanation",
    subject: "Order came in plastic bag despite selecting no-bag",
    description: "I selected 'no bag' option but my order arrived in a plastic bag anyway.",
    messages: [
      { id: "msg_12_1", sender: "customer", message: "I selected no-bag delivery but my tomatoes and onions came in a plastic bag. What's the point of the option if it's not followed?", timestamp: "2026-01-20T10:00:00Z" },
      { id: "msg_12_2", sender: "agent", message: "I apologize for this. For certain items like loose vegetables, our packers use a minimal bag for hygiene reasons even with no-bag selected. We should communicate this better in the app.", timestamp: "2026-01-20T10:05:00Z" },
      { id: "msg_12_3", sender: "customer", message: "Then the option is misleading. At least add a note saying 'some items may require minimal packaging'.", timestamp: "2026-01-20T10:07:00Z" },
      { id: "msg_12_4", sender: "agent", message: "That's valid feedback. I've forwarded this to our product team. The ₹10 eco discount was applied to your order. Thank you for being environmentally conscious!", timestamp: "2026-01-20T10:10:00Z" },
    ],
    createdAt: "2026-01-20T10:00:00Z", updatedAt: "2026-01-20T10:10:00Z",
  },
  {
    id: "tkt_13", userId: "user_1", orderId: "ord_7", category: "missing_item", severity: "high", status: "resolved", resolution: "credit",
    subject: "Broccoli removed without notification",
    description: "Broccoli was removed from my order during packing but I wasn't notified until after delivery.",
    messages: [
      { id: "msg_13_1", sender: "customer", message: "My broccoli was removed from the order without asking me! I needed it for dinner tonight.", timestamp: "2026-01-26T19:35:00Z" },
      { id: "msg_13_2", sender: "agent", message: "I'm sorry about this. The broccoli went out of stock while your order was being packed. We should have notified you immediately. I'll add ₹130 credit to your account for the inconvenience.", timestamp: "2026-01-26T19:40:00Z" },
    ],
    createdAt: "2026-01-26T19:35:00Z", updatedAt: "2026-01-26T19:40:00Z",
  },
  {
    id: "tkt_14", userId: "user_1", orderId: "ord_8", category: "coupon_issue", severity: "low", status: "resolved", resolution: "explanation",
    subject: "ECO10 coupon conditions are unclear",
    description: "I see a ₹10 eco coupon advertised but I can't find how to use it. The conditions aren't clear.",
    messages: [
      { id: "msg_14_1", sender: "customer", message: "There's an ECO10 coupon but when I try to apply it, nothing happens. What are the conditions?", timestamp: "2026-01-27T12:30:00Z" },
      { id: "msg_14_2", sender: "agent", message: "The ECO10 coupon is automatically applied when you select 'no bag' packing preference at checkout. It gives ₹10 off as an incentive for eco-friendly delivery.", timestamp: "2026-01-27T12:35:00Z" },
      { id: "msg_14_3", sender: "customer", message: "Oh I see. I wish the coupon listing said that clearly. I spent 5 minutes trying to figure it out.", timestamp: "2026-01-27T12:37:00Z" },
    ],
    createdAt: "2026-01-27T12:30:00Z", updatedAt: "2026-01-27T12:37:00Z",
  },
  {
    id: "tkt_15", userId: "user_1", orderId: "ord_14", category: "refund_delay", severity: "medium", status: "resolved", resolution: "refund",
    subject: "Cancellation refund took too long",
    description: "My order was cancelled because items weren't available. Refund took 2 days instead of the promised 'instant' refund for store-cancelled orders.",
    messages: [
      { id: "msg_15_1", sender: "customer", message: "My order was cancelled because your store didn't have the items. The refund should be instant but it took 2 days!", timestamp: "2026-02-03T12:00:00Z" },
      { id: "msg_15_2", sender: "agent", message: "You're right. For store-initiated cancellations, refunds should be processed within 24 hours. I apologize for the delay. The refund has been completed now.", timestamp: "2026-02-03T12:05:00Z" },
    ],
    createdAt: "2026-02-03T12:00:00Z", updatedAt: "2026-02-03T12:05:00Z",
  },
  // Additional tickets to reach 30
  {
    id: "tkt_16", userId: "user_1", orderId: "ord_1", category: "other", severity: "low", status: "closed", resolution: "no_action",
    subject: "App froze during checkout",
    description: "The app screen froze for about 10 seconds during checkout. Order went through but it was scary.",
    messages: [
      { id: "msg_16_1", sender: "customer", message: "The checkout screen froze and I thought my order was lost. It recovered after 10 seconds but please fix this.", timestamp: "2026-01-15T10:33:00Z" },
      { id: "msg_16_2", sender: "agent", message: "Sorry about the experience. This can happen during peak hours. Your order was processed successfully. We're working on optimizing checkout performance.", timestamp: "2026-01-15T10:38:00Z" },
    ],
    createdAt: "2026-01-15T10:33:00Z", updatedAt: "2026-01-15T10:38:00Z",
  },
  {
    id: "tkt_17", userId: "user_1", orderId: "ord_2", category: "missing_item", severity: "medium", status: "resolved", resolution: "credit",
    subject: "Cold coffee pack opened during delivery",
    description: "One cold coffee from the pack of 4 was leaking when it arrived.",
    messages: [
      { id: "msg_17_1", sender: "customer", message: "One cold coffee bottle was leaking inside the pack. It seems it was damaged during transit.", timestamp: "2026-01-18T14:55:00Z" },
      { id: "msg_17_2", sender: "agent", message: "I'm sorry about that. I've added a ₹35 credit to your account for the damaged item.", timestamp: "2026-01-18T15:00:00Z" },
    ],
    createdAt: "2026-01-18T14:55:00Z", updatedAt: "2026-01-18T15:00:00Z",
  },
  {
    id: "tkt_18", userId: "user_1", orderId: "ord_5", category: "damaged_item", severity: "medium", status: "resolved", resolution: "replacement",
    subject: "Mango was overripe and mushy",
    description: "The Alphonso mangoes delivered were overripe and almost rotten.",
    messages: [
      { id: "msg_18_1", sender: "customer", message: "The Alphonso mangoes I received are overripe and mushy. They're practically inedible. I paid ₹450 for these!", timestamp: "2026-01-23T12:00:00Z" },
      { id: "msg_18_2", sender: "agent", message: "I'm very sorry. Premium items should meet quality standards. I'll arrange a replacement delivery tomorrow with freshly picked mangoes.", timestamp: "2026-01-23T12:05:00Z" },
      { id: "msg_18_3", sender: "customer", message: "Thanks. Please make sure they're actually fresh this time.", timestamp: "2026-01-23T12:06:00Z" },
    ],
    createdAt: "2026-01-23T12:00:00Z", updatedAt: "2026-01-23T12:06:00Z",
  },
  {
    id: "tkt_19", userId: "user_1", orderId: undefined, category: "membership_issue", severity: "low", status: "resolved", resolution: "explanation",
    subject: "Difference between Basic and Plus not clear",
    description: "I'm considering a membership but the benefits page is confusing. What's the real difference?",
    messages: [
      { id: "msg_19_1", sender: "customer", message: "Can you explain the real difference between Basic and Plus? The benefits page lists many things but I can't tell what's worth it.", timestamp: "2026-02-04T15:00:00Z" },
      { id: "msg_19_2", sender: "agent", message: "Basic (₹49/mo) gives you free delivery above ₹199, member coupons, and 5% cashback. Plus (₹149/mo) gives ALL of that plus: free delivery always (no minimum), priority delivery, priority support, 10% cashback, free replacements, and birthday rewards. If you order 3+ times a week, Plus pays for itself.", timestamp: "2026-02-04T15:05:00Z" },
    ],
    createdAt: "2026-02-04T15:00:00Z", updatedAt: "2026-02-04T15:05:00Z",
  },
  {
    id: "tkt_20", userId: "user_1", orderId: "ord_4", category: "late_delivery", severity: "low", status: "closed", resolution: "no_action",
    subject: "Order arrived at edge of time window",
    description: "Order arrived at the very last minute of the 1-hour slot. Cutting it close!",
    messages: [
      { id: "msg_20_1", sender: "customer", message: "Order arrived at 17:30 for a slot that ended at 17:30. Just barely made it!", timestamp: "2026-01-22T17:35:00Z" },
      { id: "msg_20_2", sender: "agent", message: "Glad it arrived on time! We aim to deliver well within the window. Apologies it was tight this time. Noted your feedback for our delivery team.", timestamp: "2026-01-22T17:40:00Z" },
    ],
    createdAt: "2026-01-22T17:35:00Z", updatedAt: "2026-01-22T17:40:00Z",
  },
  {
    id: "tkt_21", userId: "user_1", orderId: undefined, category: "other", severity: "low", status: "closed", resolution: "explanation",
    subject: "Search not finding items properly",
    description: "When I search for 'dahi' I get no results. I have to search 'yogurt' instead.",
    messages: [
      { id: "msg_21_1", sender: "customer", message: "Searching 'dahi' gives 0 results but 'yogurt' works. Can you add Hindi terms to search?", timestamp: "2026-02-03T09:00:00Z" },
      { id: "msg_21_2", sender: "agent", message: "Great suggestion! We currently only support English product names but we're working on adding local language search support. I've passed this along to our product team.", timestamp: "2026-02-03T09:05:00Z" },
    ],
    createdAt: "2026-02-03T09:00:00Z", updatedAt: "2026-02-03T09:05:00Z",
  },
  {
    id: "tkt_22", userId: "user_1", orderId: "ord_17", category: "other", severity: "low", status: "resolved", resolution: "no_action",
    subject: "Delivery person couldn't find my apartment",
    description: "The delivery person called 3 times because they couldn't find my flat. Maybe add landmark field?",
    messages: [
      { id: "msg_22_1", sender: "customer", message: "The delivery person called me 3 times. My address is correct but the building entrance is from the back lane. Can you add a landmarks field?", timestamp: "2026-02-03T10:35:00Z" },
      { id: "msg_22_2", sender: "agent", message: "Thank you for the suggestion! Currently you can add notes in the delivery instructions field for each order. We'll look into adding a permanent landmarks field to addresses.", timestamp: "2026-02-03T10:40:00Z" },
    ],
    createdAt: "2026-02-03T10:35:00Z", updatedAt: "2026-02-03T10:40:00Z",
  },
  {
    id: "tkt_23", userId: "user_1", orderId: undefined, category: "payment_issue", severity: "medium", status: "resolved", resolution: "explanation",
    subject: "UPI payment failed but amount debited",
    description: "UPI payment showed failed in the app but my bank account was debited. The amount was auto-refunded after 30 minutes.",
    messages: [
      { id: "msg_23_1", sender: "customer", message: "Payment failed in the app but ₹200 was debited from my bank. What happened?", timestamp: "2026-01-29T18:00:00Z" },
      { id: "msg_23_2", sender: "agent", message: "This happens when the payment gateway times out. The bank debits the amount but our system doesn't receive confirmation. The amount will be auto-refunded to your bank within 30 minutes.", timestamp: "2026-01-29T18:05:00Z" },
      { id: "msg_23_3", sender: "customer", message: "OK the refund came through after 25 minutes. But it was scary not knowing if my money was lost.", timestamp: "2026-01-29T18:30:00Z" },
    ],
    createdAt: "2026-01-29T18:00:00Z", updatedAt: "2026-01-29T18:30:00Z",
  },
  {
    id: "tkt_24", userId: "user_1", orderId: "ord_19", category: "wrong_item", severity: "medium", status: "resolved", resolution: "credit",
    subject: "Bread was stale — near expiry",
    description: "The brown bread I received had an expiry date of the next day. It was already stale.",
    messages: [
      { id: "msg_24_1", sender: "customer", message: "The bread expiry is tomorrow! It's basically stale already. I bought 2 packs — both near expiry.", timestamp: "2026-02-04T10:00:00Z" },
      { id: "msg_24_2", sender: "agent", message: "I'm sorry about that. We have a policy of not sending items within 2 days of expiry. This shouldn't have happened. I'll add ₹84 credit (full price of both packs) to your account.", timestamp: "2026-02-04T10:05:00Z" },
    ],
    createdAt: "2026-02-04T10:00:00Z", updatedAt: "2026-02-04T10:05:00Z",
  },
  {
    id: "tkt_25", userId: "user_1", orderId: undefined, category: "coupon_issue", severity: "low", status: "resolved", resolution: "explanation",
    subject: "MEMBER100 coupon not working — I'm not a member?",
    description: "I saw MEMBER100 coupon in the app but it says I'm not eligible. Feels like a bait.",
    messages: [
      { id: "msg_25_1", sender: "customer", message: "Why is MEMBER100 shown to me if I can't use it? It feels like bait to get me to subscribe.", timestamp: "2026-02-05T11:00:00Z" },
      { id: "msg_25_2", sender: "agent", message: "I understand your frustration. The coupon is visible to everyone but only usable by members. We show it to highlight the savings members get. I agree the messaging could be clearer. I'll pass this feedback along.", timestamp: "2026-02-05T11:05:00Z" },
    ],
    createdAt: "2026-02-05T11:00:00Z", updatedAt: "2026-02-05T11:05:00Z",
  },
  {
    id: "tkt_26", userId: "user_1", orderId: "ord_20", category: "damaged_item", severity: "low", status: "resolved", resolution: "no_action",
    subject: "Floor cleaner cap was slightly loose",
    description: "The floor cleaner bottle cap was loose when delivered. Small amount leaked but nothing major.",
    messages: [
      { id: "msg_26_1", sender: "customer", message: "Floor cleaner cap was loose and a tiny bit leaked. Not a big deal but just letting you know.", timestamp: "2026-02-04T14:55:00Z" },
      { id: "msg_26_2", sender: "agent", message: "Thanks for letting us know. I'll flag this with our quality team. If you need a replacement, let me know!", timestamp: "2026-02-04T15:00:00Z" },
    ],
    createdAt: "2026-02-04T14:55:00Z", updatedAt: "2026-02-04T15:00:00Z",
  },
  {
    id: "tkt_27", userId: "user_1", orderId: undefined, category: "packing_issue", severity: "low", status: "resolved", resolution: "explanation",
    subject: "Eco packing option used too much paper",
    description: "The eco-friendly packing used more paper than needed. Doesn't seem very eco-friendly.",
    messages: [
      { id: "msg_27_1", sender: "customer", message: "I chose eco packing hoping it would use less material, but the order was wrapped in a lot of paper. Doesn't seem eco-friendly?", timestamp: "2026-02-05T09:00:00Z" },
      { id: "msg_27_2", sender: "agent", message: "Eco packing replaces plastic with paper-based biodegradable materials. While it may look like more material, it's all compostable. We're working on reducing overall packaging volume too.", timestamp: "2026-02-05T09:05:00Z" },
    ],
    createdAt: "2026-02-05T09:00:00Z", updatedAt: "2026-02-05T09:05:00Z",
  },
  {
    id: "tkt_28", userId: "user_1", orderId: "ord_24", category: "coupon_issue", severity: "low", status: "resolved", resolution: "explanation",
    subject: "Discount amount lower than expected with SNACK25",
    description: "SNACK25 says 25% off but I only got ₹50 off on a ₹215 basket instead of ₹54.",
    messages: [
      { id: "msg_28_1", sender: "customer", message: "I applied SNACK25 (25% off) on ₹215 of snacks. Expected ₹54 off but only got ₹50. Why?", timestamp: "2026-02-05T17:30:00Z" },
      { id: "msg_28_2", sender: "agent", message: "The SNACK25 coupon applies only to items in the Snacks & Beverages category. Your ₹215 basket may include items from other categories. Also the coupon has a max discount cap of ₹125. Let me check your exact breakdown.", timestamp: "2026-02-05T17:35:00Z" },
      { id: "msg_28_3", sender: "agent", message: "I see that the noodles (₹130) and mango juice (₹85) are both in Snacks & Beverages, totaling ₹215. 25% of ₹215 is ₹53.75, rounded to ₹50 in our system. We round down to nearest ₹10. I agree this is confusing — I'll flag the rounding logic.", timestamp: "2026-02-05T17:38:00Z" },
    ],
    createdAt: "2026-02-05T17:30:00Z", updatedAt: "2026-02-05T17:38:00Z",
  },
  {
    id: "tkt_29", userId: "user_1", orderId: undefined, category: "other", severity: "low", status: "closed", resolution: "explanation",
    subject: "Want to set preferred delivery time permanently",
    description: "I order every morning. Would be great to set a default delivery slot so I don't have to pick it each time.",
    messages: [
      { id: "msg_29_1", sender: "customer", message: "I order almost daily at 8 AM with the 'within 30 min' slot. Can I set this as a default?", timestamp: "2026-02-04T08:15:00Z" },
      { id: "msg_29_2", sender: "agent", message: "Great suggestion! Currently we don't have a default slot feature, but you can use the 'Reorder' button on the home page to quickly repeat past orders. I'll add your suggestion to our feature request list.", timestamp: "2026-02-04T08:20:00Z" },
    ],
    createdAt: "2026-02-04T08:15:00Z", updatedAt: "2026-02-04T08:20:00Z",
  },
  {
    id: "tkt_30", userId: "user_1", orderId: "ord_18", category: "missing_item", severity: "low", status: "resolved", resolution: "credit",
    subject: "Only got 2 lemons instead of 3 packs",
    description: "I ordered 3 packs of lemons (250g each) but received only 2.",
    messages: [
      { id: "msg_30_1", sender: "customer", message: "I ordered 3 packs of lemons but only received 2. Missing one pack.", timestamp: "2026-02-03T16:30:00Z" },
      { id: "msg_30_2", sender: "agent", message: "Sorry about the missing pack. I've added ₹20 credit to your account for the missing lemons. This will be auto-applied on your next order.", timestamp: "2026-02-03T16:35:00Z" },
    ],
    createdAt: "2026-02-03T16:30:00Z", updatedAt: "2026-02-03T16:35:00Z",
  },
];
