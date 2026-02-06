import { Order, Payment, DeliverySlot } from "@/types";

export const DELIVERY_SLOTS: DeliverySlot[] = [
  { id: "slot_1", label: "Express (10 min)", startTime: "now", endTime: "+10min", isExpress: true, fee: 29 },
  { id: "slot_2", label: "Within 30 min", startTime: "now", endTime: "+30min", isExpress: false, fee: 15 },
  { id: "slot_3", label: "Within 1 hour", startTime: "now", endTime: "+60min", isExpress: false, fee: 0 },
  { id: "slot_4", label: "9 AM – 11 AM", startTime: "09:00", endTime: "11:00", isExpress: false, fee: 0 },
  { id: "slot_5", label: "11 AM – 1 PM", startTime: "11:00", endTime: "13:00", isExpress: false, fee: 0 },
  { id: "slot_6", label: "2 PM – 4 PM", startTime: "14:00", endTime: "16:00", isExpress: false, fee: 0 },
  { id: "slot_7", label: "5 PM – 7 PM", startTime: "17:00", endTime: "19:00", isExpress: false, fee: 0 },
  { id: "slot_8", label: "7 PM – 9 PM", startTime: "19:00", endTime: "21:00", isExpress: false, fee: 0 },
];

export const PAYMENTS: Payment[] = [
  { id: "pay_1", orderId: "ord_1", method: "upi", amount: 347, status: "success", transactionId: "TXN001", createdAt: "2026-01-15T10:30:00Z", updatedAt: "2026-01-15T10:30:05Z" },
  { id: "pay_2", orderId: "ord_2", method: "card", amount: 523, status: "success", transactionId: "TXN002", createdAt: "2026-01-18T14:20:00Z", updatedAt: "2026-01-18T14:20:04Z" },
  { id: "pay_3", orderId: "ord_3", method: "upi", amount: 189, status: "success", transactionId: "TXN003", createdAt: "2026-01-20T09:15:00Z", updatedAt: "2026-01-20T09:15:03Z" },
  { id: "pay_4", orderId: "ord_4", method: "wallet", amount: 412, status: "success", transactionId: "TXN004", createdAt: "2026-01-22T16:45:00Z", updatedAt: "2026-01-22T16:45:02Z" },
  { id: "pay_5", orderId: "ord_5", method: "upi", amount: 678, status: "success", transactionId: "TXN005", createdAt: "2026-01-23T11:00:00Z", updatedAt: "2026-01-23T11:00:06Z" },
  { id: "pay_6", orderId: "ord_6", method: "card", amount: 255, status: "success", transactionId: "TXN006", createdAt: "2026-01-25T08:30:00Z", updatedAt: "2026-01-25T08:30:04Z" },
  { id: "pay_7", orderId: "ord_7", method: "upi", amount: 890, status: "success", transactionId: "TXN007", createdAt: "2026-01-26T19:00:00Z", updatedAt: "2026-01-26T19:00:05Z" },
  { id: "pay_8", orderId: "ord_8", method: "cod", amount: 156, status: "success", transactionId: "TXN008", createdAt: "2026-01-27T12:00:00Z", updatedAt: "2026-01-27T12:00:01Z" },
  { id: "pay_9", orderId: "ord_9", method: "upi", amount: 445, status: "success", transactionId: "TXN009", createdAt: "2026-01-28T15:30:00Z", updatedAt: "2026-01-28T15:30:03Z" },
  { id: "pay_10", orderId: "ord_10", method: "card", amount: 1230, status: "success", transactionId: "TXN010", createdAt: "2026-01-29T10:00:00Z", updatedAt: "2026-01-29T10:00:07Z" },
  { id: "pay_11", orderId: "ord_11", method: "upi", amount: 310, status: "refund_initiated", transactionId: "TXN011", createdAt: "2026-01-30T09:00:00Z", updatedAt: "2026-02-01T09:00:00Z" },
  { id: "pay_12", orderId: "ord_12", method: "upi", amount: 567, status: "success", transactionId: "TXN012", createdAt: "2026-01-31T14:00:00Z", updatedAt: "2026-01-31T14:00:04Z" },
  { id: "pay_13", orderId: "ord_13", method: "card", amount: 298, status: "success", transactionId: "TXN013", createdAt: "2026-02-01T08:00:00Z", updatedAt: "2026-02-01T08:00:03Z" },
  { id: "pay_14", orderId: "ord_14", method: "upi", amount: 720, status: "refunded", transactionId: "TXN014", createdAt: "2026-02-01T11:00:00Z", updatedAt: "2026-02-03T11:00:00Z" },
  { id: "pay_15", orderId: "ord_15", method: "wallet", amount: 185, status: "success", transactionId: "TXN015", createdAt: "2026-02-02T07:30:00Z", updatedAt: "2026-02-02T07:30:02Z" },
  { id: "pay_16", orderId: "ord_16", method: "upi", amount: 430, status: "success", transactionId: "TXN016", createdAt: "2026-02-02T13:00:00Z", updatedAt: "2026-02-02T13:00:05Z" },
  { id: "pay_17", orderId: "ord_17", method: "card", amount: 925, status: "success", transactionId: "TXN017", createdAt: "2026-02-03T10:00:00Z", updatedAt: "2026-02-03T10:00:06Z" },
  { id: "pay_18", orderId: "ord_18", method: "upi", amount: 145, status: "success", transactionId: "TXN018", createdAt: "2026-02-03T16:00:00Z", updatedAt: "2026-02-03T16:00:03Z" },
  { id: "pay_19", orderId: "ord_19", method: "upi", amount: 389, status: "success", transactionId: "TXN019", createdAt: "2026-02-04T09:30:00Z", updatedAt: "2026-02-04T09:30:04Z" },
  { id: "pay_20", orderId: "ord_20", method: "card", amount: 560, status: "success", transactionId: "TXN020", createdAt: "2026-02-04T14:00:00Z", updatedAt: "2026-02-04T14:00:05Z" },
  { id: "pay_21", orderId: "ord_21", method: "upi", amount: 275, status: "success", transactionId: "TXN021", createdAt: "2026-02-04T18:00:00Z", updatedAt: "2026-02-04T18:00:03Z" },
  { id: "pay_22", orderId: "ord_22", method: "wallet", amount: 480, status: "success", transactionId: "TXN022", createdAt: "2026-02-05T08:00:00Z", updatedAt: "2026-02-05T08:00:02Z" },
  { id: "pay_23", orderId: "ord_23", method: "upi", amount: 635, status: "success", transactionId: "TXN023", createdAt: "2026-02-05T12:00:00Z", updatedAt: "2026-02-05T12:00:04Z" },
  { id: "pay_24", orderId: "ord_24", method: "card", amount: 199, status: "success", transactionId: "TXN024", createdAt: "2026-02-05T17:00:00Z", updatedAt: "2026-02-05T17:00:03Z" },
  // Edge case: payment succeeded but order not created
  {
    id: "pay_25", orderId: undefined, method: "upi", amount: 412, status: "success",
    transactionId: "TXN025", createdAt: "2026-02-06T09:00:00Z", updatedAt: "2026-02-06T09:00:05Z",
    orderCreationFailed: true,
  },
];

export const ORDERS: Order[] = [
  {
    id: "ord_1", userId: "user_1",
    items: [
      { itemId: "item_1", variantId: "v1_1", name: "Organic Bananas", imageUrl: "/images/items/bananas.png", price: 49, mrp: 60, quantity: 2, unit: "1 dozen" },
      { itemId: "item_16", variantId: "v16_2", name: "Full Cream Milk", imageUrl: "/images/items/milk.png", price: 56, mrp: 60, quantity: 2, unit: "1 L" },
      { itemId: "item_17", variantId: "v17_1", name: "Brown Bread", imageUrl: "/images/items/bread.png", price: 42, mrp: 50, quantity: 1, unit: "400 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-15T10:30:00Z" },
      { status: "confirmed", timestamp: "2026-01-15T10:31:00Z" },
      { status: "packing", timestamp: "2026-01-15T10:35:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-15T10:42:00Z" },
      { status: "delivered", timestamp: "2026-01-15T10:55:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 25, etaChangedAfterOrder: false,
    subtotal: 252, discount: 0, deliveryFee: 15, packingFee: 0, total: 267,
    paymentId: "pay_1", packingPreference: "standard", createdAt: "2026-01-15T10:30:00Z", updatedAt: "2026-01-15T10:55:00Z",
  },
  {
    id: "ord_2", userId: "user_1",
    items: [
      { itemId: "item_28", variantId: "v28_2", name: "Classic Potato Chips", imageUrl: "/images/items/chips.png", price: 75, mrp: 95, quantity: 2, unit: "300 g" },
      { itemId: "item_39", variantId: "v39_1", name: "Instant Noodles", imageUrl: "/images/items/noodles.png", price: 48, mrp: 56, quantity: 3, unit: "4 pack" },
      { itemId: "item_30", variantId: "v30_2", name: "Cold Coffee", imageUrl: "/images/items/cold-coffee.png", price: 125, mrp: 160, quantity: 1, unit: "Pack of 4" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-18T14:20:00Z" },
      { status: "confirmed", timestamp: "2026-01-18T14:21:00Z" },
      { status: "packing", timestamp: "2026-01-18T14:26:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-18T14:35:00Z" },
      { status: "delivered", timestamp: "2026-01-18T14:48:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 419, discount: 0, deliveryFee: 15, packingFee: 0, total: 434,
    paymentId: "pay_2", packingPreference: "standard", createdAt: "2026-01-18T14:20:00Z", updatedAt: "2026-01-18T14:48:00Z",
  },
  {
    id: "ord_3", userId: "user_1",
    items: [
      { itemId: "item_4", variantId: "v4_1", name: "Fresh Tomatoes", imageUrl: "/images/items/tomatoes.png", price: 35, mrp: 45, quantity: 2, unit: "1 kg" },
      { itemId: "item_5", variantId: "v5_1", name: "Onions", imageUrl: "/images/items/onions.png", price: 30, mrp: 40, quantity: 2, unit: "1 kg" },
      { itemId: "item_15", variantId: "v15_1", name: "Fresh Coriander", imageUrl: "/images/items/coriander.png", price: 15, mrp: 20, quantity: 1, unit: "100 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-20T09:15:00Z" },
      { status: "confirmed", timestamp: "2026-01-20T09:16:00Z" },
      { status: "packing", timestamp: "2026-01-20T09:20:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-20T09:28:00Z" },
      { status: "delivered", timestamp: "2026-01-20T09:40:00Z" },
    ],
    deliverySlotId: "slot_1", estimatedDeliveryMinutes: 10, etaChangedAfterOrder: false,
    subtotal: 145, discount: 0, deliveryFee: 29, packingFee: 0, total: 174,
    paymentId: "pay_3", packingPreference: "no_bag", createdAt: "2026-01-20T09:15:00Z", updatedAt: "2026-01-20T09:40:00Z",
  },
  {
    id: "ord_4", userId: "user_1",
    items: [
      { itemId: "item_22", variantId: "v22_2", name: "Paneer (Fresh)", imageUrl: "/images/items/paneer.png", price: 150, mrp: 180, quantity: 1, unit: "400 g" },
      { itemId: "item_18", variantId: "v18_2", name: "Farm Eggs", imageUrl: "/images/items/eggs.png", price: 110, mrp: 135, quantity: 1, unit: "12 pcs" },
      { itemId: "item_21", variantId: "v21_1", name: "Butter (Salted)", imageUrl: "/images/items/butter.png", price: 52, mrp: 58, quantity: 2, unit: "200 g" },
    ],
    addressId: "addr_2", zoneId: "zone_4", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-22T16:45:00Z" },
      { status: "confirmed", timestamp: "2026-01-22T16:46:00Z" },
      { status: "packing", timestamp: "2026-01-22T16:55:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-22T17:05:00Z" },
      { status: "delivered", timestamp: "2026-01-22T17:30:00Z" },
    ],
    deliverySlotId: "slot_3", estimatedDeliveryMinutes: 45, etaChangedAfterOrder: false,
    subtotal: 364, discount: 0, deliveryFee: 0, packingFee: 0, total: 364,
    paymentId: "pay_4", packingPreference: "standard", createdAt: "2026-01-22T16:45:00Z", updatedAt: "2026-01-22T17:30:00Z",
  },
  {
    id: "ord_5", userId: "user_1",
    items: [
      { itemId: "item_8", variantId: "v8_1", name: "Mangoes (Alphonso)", imageUrl: "/images/items/mangoes.png", price: 450, mrp: 550, quantity: 1, unit: "1 kg" },
      { itemId: "item_19", variantId: "v19_1", name: "Greek Yogurt", imageUrl: "/images/items/yogurt.png", price: 85, mrp: 99, quantity: 2, unit: "400 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-23T11:00:00Z" },
      { status: "confirmed", timestamp: "2026-01-23T11:01:00Z" },
      { status: "packing", timestamp: "2026-01-23T11:08:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-23T11:15:00Z" },
      { status: "delivered", timestamp: "2026-01-23T11:30:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 620, discount: 0, deliveryFee: 15, packingFee: 0, total: 635,
    paymentId: "pay_5", packingPreference: "eco_friendly", createdAt: "2026-01-23T11:00:00Z", updatedAt: "2026-01-23T11:30:00Z",
  },
  // Order with wrong item delivered
  {
    id: "ord_6", userId: "user_1",
    items: [
      { itemId: "item_52", variantId: "v52_1", name: "Toothpaste (Herbal)", imageUrl: "/images/items/toothpaste.png", price: 85, mrp: 99, quantity: 1, unit: "150 g", substitutedWith: "Regular Mint Toothpaste" },
      { itemId: "item_51", variantId: "v51_1", name: "Hand Wash (Neem)", imageUrl: "/images/items/handwash.png", price: 75, mrp: 89, quantity: 2, unit: "250 ml" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-25T08:30:00Z" },
      { status: "confirmed", timestamp: "2026-01-25T08:31:00Z" },
      { status: "packing", timestamp: "2026-01-25T08:36:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-25T08:44:00Z" },
      { status: "delivered", timestamp: "2026-01-25T08:58:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 235, discount: 0, deliveryFee: 15, packingFee: 0, total: 250,
    paymentId: "pay_6", packingPreference: "standard", createdAt: "2026-01-25T08:30:00Z", updatedAt: "2026-01-25T08:58:00Z",
  },
  // Large order with items found unavailable during packing
  {
    id: "ord_7", userId: "user_1",
    items: [
      { itemId: "item_1", variantId: "v1_1", name: "Organic Bananas", imageUrl: "/images/items/bananas.png", price: 49, mrp: 60, quantity: 1, unit: "1 dozen" },
      { itemId: "item_2", variantId: "v2_1", name: "Red Apples", imageUrl: "/images/items/apples.png", price: 180, mrp: 220, quantity: 1, unit: "1 kg" },
      { itemId: "item_7", variantId: "v7_1", name: "Broccoli", imageUrl: "/images/items/broccoli.png", price: 65, mrp: 80, quantity: 2, unit: "300 g", unavailableAtPacking: true },
      { itemId: "item_10", variantId: "v10_1", name: "Carrots", imageUrl: "/images/items/carrots.png", price: 32, mrp: 40, quantity: 3, unit: "500 g" },
      { itemId: "item_16", variantId: "v16_2", name: "Full Cream Milk", imageUrl: "/images/items/milk.png", price: 56, mrp: 60, quantity: 2, unit: "1 L" },
      { itemId: "item_18", variantId: "v18_1", name: "Farm Eggs", imageUrl: "/images/items/eggs.png", price: 60, mrp: 72, quantity: 1, unit: "6 pcs" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-26T19:00:00Z" },
      { status: "confirmed", timestamp: "2026-01-26T19:01:00Z" },
      { status: "packing", timestamp: "2026-01-26T19:06:00Z", note: "Broccoli (300g x2) unavailable — removed from order" },
      { status: "out_for_delivery", timestamp: "2026-01-26T19:15:00Z" },
      { status: "delivered", timestamp: "2026-01-26T19:28:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 631, discount: 0, deliveryFee: 15, packingFee: 0, total: 646,
    paymentId: "pay_7", packingPreference: "standard", createdAt: "2026-01-26T19:00:00Z", updatedAt: "2026-01-26T19:28:00Z",
  },
  // Small order, no-bag
  {
    id: "ord_8", userId: "user_1",
    items: [
      { itemId: "item_12", variantId: "v12_1", name: "Lemons", imageUrl: "/images/items/lemons.png", price: 20, mrp: 25, quantity: 2, unit: "250 g" },
      { itemId: "item_15", variantId: "v15_1", name: "Fresh Coriander", imageUrl: "/images/items/coriander.png", price: 15, mrp: 20, quantity: 1, unit: "100 g" },
      { itemId: "item_4", variantId: "v4_1", name: "Fresh Tomatoes", imageUrl: "/images/items/tomatoes.png", price: 35, mrp: 45, quantity: 2, unit: "1 kg" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-27T12:00:00Z" },
      { status: "confirmed", timestamp: "2026-01-27T12:01:00Z" },
      { status: "packing", timestamp: "2026-01-27T12:05:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-27T12:12:00Z" },
      { status: "delivered", timestamp: "2026-01-27T12:22:00Z" },
    ],
    deliverySlotId: "slot_1", estimatedDeliveryMinutes: 10, etaChangedAfterOrder: false,
    subtotal: 125, discount: 10, deliveryFee: 29, packingFee: 0, total: 144,
    paymentId: "pay_8", couponId: "coup_9", packingPreference: "no_bag", createdAt: "2026-01-27T12:00:00Z", updatedAt: "2026-01-27T12:22:00Z",
  },
  // Order with ETA change
  {
    id: "ord_9", userId: "user_1",
    items: [
      { itemId: "item_42", variantId: "v42_1", name: "Laundry Detergent", imageUrl: "/images/items/detergent.png", price: 199, mrp: 249, quantity: 1, unit: "1 L" },
      { itemId: "item_40", variantId: "v40_1", name: "Dish Wash Liquid", imageUrl: "/images/items/dish-wash.png", price: 95, mrp: 115, quantity: 2, unit: "500 ml" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-28T15:30:00Z" },
      { status: "confirmed", timestamp: "2026-01-28T15:31:00Z" },
      { status: "packing", timestamp: "2026-01-28T15:40:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-28T15:55:00Z", note: "Delivery ETA updated: Heavy traffic in the area" },
      { status: "delivered", timestamp: "2026-01-28T16:25:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 55, etaChangedAfterOrder: true, originalEtaMinutes: 30,
    subtotal: 389, discount: 0, deliveryFee: 15, packingFee: 0, total: 404,
    paymentId: "pay_9", packingPreference: "standard", createdAt: "2026-01-28T15:30:00Z", updatedAt: "2026-01-28T16:25:00Z",
  },
  // Large order with coupon
  {
    id: "ord_10", userId: "user_1",
    items: [
      { itemId: "item_29", variantId: "v29_2", name: "Mixed Nuts Trail Mix", imageUrl: "/images/items/trail-mix.png", price: 575, mrp: 699, quantity: 1, unit: "500 g" },
      { itemId: "item_38", variantId: "v38_2", name: "Protein Bar (Box)", imageUrl: "/images/items/protein-bar.png", price: 650, mrp: 900, quantity: 1, unit: "Box of 6" },
    ],
    addressId: "addr_2", zoneId: "zone_4", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-29T10:00:00Z" },
      { status: "confirmed", timestamp: "2026-01-29T10:01:00Z" },
      { status: "packing", timestamp: "2026-01-29T10:10:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-29T10:20:00Z" },
      { status: "delivered", timestamp: "2026-01-29T10:50:00Z" },
    ],
    deliverySlotId: "slot_3", estimatedDeliveryMinutes: 50, etaChangedAfterOrder: false,
    subtotal: 1225, discount: 200, deliveryFee: 0, packingFee: 0, total: 1025,
    paymentId: "pay_10", couponId: "coup_7", packingPreference: "standard", createdAt: "2026-01-29T10:00:00Z", updatedAt: "2026-01-29T10:50:00Z",
  },
  // Cancelled order with refund delay
  {
    id: "ord_11", userId: "user_1",
    items: [
      { itemId: "item_53", variantId: "v53_1", name: "Shampoo (Anti-Dandruff)", imageUrl: "/images/items/shampoo.png", price: 190, mrp: 230, quantity: 1, unit: "200 ml" },
      { itemId: "item_54", variantId: "v54_1", name: "Body Lotion (Aloe Vera)", imageUrl: "/images/items/body-lotion.png", price: 145, mrp: 175, quantity: 1, unit: "200 ml" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "cancelled",
    timeline: [
      { status: "created", timestamp: "2026-01-30T09:00:00Z" },
      { status: "confirmed", timestamp: "2026-01-30T09:01:00Z" },
      { status: "cancelled", timestamp: "2026-01-30T09:05:00Z", note: "Cancelled by customer" },
      { status: "refund_initiated", timestamp: "2026-01-30T09:10:00Z" },
    ],
    deliverySlotId: "slot_3", estimatedDeliveryMinutes: 45, etaChangedAfterOrder: false,
    subtotal: 335, discount: 0, deliveryFee: 0, packingFee: 0, total: 335,
    paymentId: "pay_11", packingPreference: "standard", createdAt: "2026-01-30T09:00:00Z", updatedAt: "2026-02-01T09:00:00Z",
  },
  // Order with damaged items
  {
    id: "ord_12", userId: "user_1",
    items: [
      { itemId: "item_18", variantId: "v18_2", name: "Farm Eggs", imageUrl: "/images/items/eggs.png", price: 110, mrp: 135, quantity: 2, unit: "12 pcs" },
      { itemId: "item_16", variantId: "v16_2", name: "Full Cream Milk", imageUrl: "/images/items/milk.png", price: 56, mrp: 60, quantity: 3, unit: "1 L" },
      { itemId: "item_19", variantId: "v19_1", name: "Greek Yogurt", imageUrl: "/images/items/yogurt.png", price: 85, mrp: 99, quantity: 2, unit: "400 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-01-31T14:00:00Z" },
      { status: "confirmed", timestamp: "2026-01-31T14:01:00Z" },
      { status: "packing", timestamp: "2026-01-31T14:06:00Z" },
      { status: "out_for_delivery", timestamp: "2026-01-31T14:15:00Z" },
      { status: "delivered", timestamp: "2026-01-31T14:30:00Z", note: "Customer reported 3 eggs broken" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 558, discount: 0, deliveryFee: 15, packingFee: 0, total: 573,
    paymentId: "pay_12", packingPreference: "standard", createdAt: "2026-01-31T14:00:00Z", updatedAt: "2026-01-31T14:30:00Z",
  },
  // Out for delivery currently
  {
    id: "ord_13", userId: "user_1",
    items: [
      { itemId: "item_1", variantId: "v1_1", name: "Organic Bananas", imageUrl: "/images/items/bananas.png", price: 49, mrp: 60, quantity: 1, unit: "1 dozen" },
      { itemId: "item_35", variantId: "v35_1", name: "Masala Chai Premix", imageUrl: "/images/items/chai.png", price: 199, mrp: 245, quantity: 1, unit: "500 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "out_for_delivery",
    timeline: [
      { status: "created", timestamp: "2026-02-06T08:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-06T08:01:00Z" },
      { status: "packing", timestamp: "2026-02-06T08:05:00Z" },
      { status: "out_for_delivery", timestamp: "2026-02-06T08:12:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 25, etaChangedAfterOrder: false,
    subtotal: 248, discount: 0, deliveryFee: 15, packingFee: 0, total: 263,
    paymentId: "pay_13", packingPreference: "standard", createdAt: "2026-02-06T08:00:00Z", updatedAt: "2026-02-06T08:12:00Z",
  },
  // Cancelled and refunded order
  {
    id: "ord_14", userId: "user_1",
    items: [
      { itemId: "item_29", variantId: "v29_1", name: "Mixed Nuts Trail Mix", imageUrl: "/images/items/trail-mix.png", price: 250, mrp: 299, quantity: 2, unit: "200 g" },
      { itemId: "item_55", variantId: "v55_1", name: "Sunscreen SPF 50", imageUrl: "/images/items/sunscreen.png", price: 320, mrp: 399, quantity: 1, unit: "100 ml" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "refunded",
    timeline: [
      { status: "created", timestamp: "2026-02-01T11:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-01T11:01:00Z" },
      { status: "cancelled", timestamp: "2026-02-01T11:15:00Z", note: "Cancelled — items not available in store" },
      { status: "refund_initiated", timestamp: "2026-02-01T11:20:00Z" },
      { status: "refunded", timestamp: "2026-02-03T11:00:00Z" },
    ],
    deliverySlotId: "slot_3", estimatedDeliveryMinutes: 45, etaChangedAfterOrder: false,
    subtotal: 820, discount: 0, deliveryFee: 0, packingFee: 0, total: 820,
    paymentId: "pay_14", packingPreference: "standard", createdAt: "2026-02-01T11:00:00Z", updatedAt: "2026-02-03T11:00:00Z",
  },
  // Packing currently
  {
    id: "ord_15", userId: "user_1",
    items: [
      { itemId: "item_4", variantId: "v4_2", name: "Fresh Tomatoes", imageUrl: "/images/items/tomatoes.png", price: 65, mrp: 85, quantity: 1, unit: "2 kg" },
      { itemId: "item_5", variantId: "v5_2", name: "Onions", imageUrl: "/images/items/onions.png", price: 55, mrp: 75, quantity: 1, unit: "2 kg" },
      { itemId: "item_6", variantId: "v6_1", name: "Potatoes", imageUrl: "/images/items/potatoes.png", price: 28, mrp: 35, quantity: 2, unit: "1 kg" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "packing",
    timeline: [
      { status: "created", timestamp: "2026-02-06T09:30:00Z" },
      { status: "confirmed", timestamp: "2026-02-06T09:31:00Z" },
      { status: "packing", timestamp: "2026-02-06T09:35:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 176, discount: 0, deliveryFee: 15, packingFee: 0, total: 191,
    paymentId: "pay_15", packingPreference: "eco_friendly", createdAt: "2026-02-06T09:30:00Z", updatedAt: "2026-02-06T09:35:00Z",
  },
  // Delivered with ETA change
  {
    id: "ord_16", userId: "user_1",
    items: [
      { itemId: "item_40", variantId: "v40_2", name: "Dish Wash Liquid", imageUrl: "/images/items/dish-wash.png", price: 175, mrp: 210, quantity: 1, unit: "1 L" },
      { itemId: "item_43", variantId: "v43_1", name: "Kitchen Tissue Roll", imageUrl: "/images/items/tissue.png", price: 120, mrp: 150, quantity: 1, unit: "2 rolls" },
      { itemId: "item_44", variantId: "v44_1", name: "Garbage Bags", imageUrl: "/images/items/garbage-bags.png", price: 80, mrp: 99, quantity: 1, unit: "30 pcs" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-02-02T13:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-02T13:01:00Z" },
      { status: "packing", timestamp: "2026-02-02T13:08:00Z" },
      { status: "out_for_delivery", timestamp: "2026-02-02T13:20:00Z", note: "ETA changed due to rain" },
      { status: "delivered", timestamp: "2026-02-02T13:55:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 55, etaChangedAfterOrder: true, originalEtaMinutes: 30,
    subtotal: 375, discount: 0, deliveryFee: 15, packingFee: 0, total: 390,
    paymentId: "pay_16", packingPreference: "standard", createdAt: "2026-02-02T13:00:00Z", updatedAt: "2026-02-02T13:55:00Z",
  },
  {
    id: "ord_17", userId: "user_1",
    items: [
      { itemId: "item_8", variantId: "v8_1", name: "Mangoes (Alphonso)", imageUrl: "/images/items/mangoes.png", price: 450, mrp: 550, quantity: 2, unit: "1 kg" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-02-03T10:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-03T10:01:00Z" },
      { status: "packing", timestamp: "2026-02-03T10:05:00Z" },
      { status: "out_for_delivery", timestamp: "2026-02-03T10:12:00Z" },
      { status: "delivered", timestamp: "2026-02-03T10:28:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 900, discount: 0, deliveryFee: 15, packingFee: 0, total: 915,
    paymentId: "pay_17", packingPreference: "standard", createdAt: "2026-02-03T10:00:00Z", updatedAt: "2026-02-03T10:28:00Z",
  },
  {
    id: "ord_18", userId: "user_1",
    items: [
      { itemId: "item_12", variantId: "v12_1", name: "Lemons", imageUrl: "/images/items/lemons.png", price: 20, mrp: 25, quantity: 3, unit: "250 g" },
      { itemId: "item_9", variantId: "v9_1", name: "Cucumber", imageUrl: "/images/items/cucumber.png", price: 25, mrp: 30, quantity: 2, unit: "500 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-02-03T16:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-03T16:01:00Z" },
      { status: "packing", timestamp: "2026-02-03T16:05:00Z" },
      { status: "out_for_delivery", timestamp: "2026-02-03T16:10:00Z" },
      { status: "delivered", timestamp: "2026-02-03T16:22:00Z" },
    ],
    deliverySlotId: "slot_1", estimatedDeliveryMinutes: 10, etaChangedAfterOrder: false,
    subtotal: 110, discount: 0, deliveryFee: 29, packingFee: 0, total: 139,
    paymentId: "pay_18", packingPreference: "no_bag", createdAt: "2026-02-03T16:00:00Z", updatedAt: "2026-02-03T16:22:00Z",
  },
  {
    id: "ord_19", userId: "user_1",
    items: [
      { itemId: "item_22", variantId: "v22_1", name: "Paneer (Fresh)", imageUrl: "/images/items/paneer.png", price: 80, mrp: 95, quantity: 2, unit: "200 g" },
      { itemId: "item_17", variantId: "v17_1", name: "Brown Bread", imageUrl: "/images/items/bread.png", price: 42, mrp: 50, quantity: 2, unit: "400 g" },
      { itemId: "item_21", variantId: "v21_1", name: "Butter (Salted)", imageUrl: "/images/items/butter.png", price: 52, mrp: 58, quantity: 1, unit: "200 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-02-04T09:30:00Z" },
      { status: "confirmed", timestamp: "2026-02-04T09:31:00Z" },
      { status: "packing", timestamp: "2026-02-04T09:36:00Z" },
      { status: "out_for_delivery", timestamp: "2026-02-04T09:44:00Z" },
      { status: "delivered", timestamp: "2026-02-04T09:58:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 296, discount: 0, deliveryFee: 15, packingFee: 0, total: 311,
    paymentId: "pay_19", packingPreference: "standard", createdAt: "2026-02-04T09:30:00Z", updatedAt: "2026-02-04T09:58:00Z",
  },
  {
    id: "ord_20", userId: "user_1",
    items: [
      { itemId: "item_42", variantId: "v42_2", name: "Laundry Detergent", imageUrl: "/images/items/detergent.png", price: 365, mrp: 449, quantity: 1, unit: "2 L" },
      { itemId: "item_47", variantId: "v47_1", name: "Bathroom Cleaner", imageUrl: "/images/items/bathroom-cleaner.png", price: 110, mrp: 135, quantity: 1, unit: "500 ml" },
      { itemId: "item_41", variantId: "v41_1", name: "Floor Cleaner", imageUrl: "/images/items/floor-cleaner.png", price: 130, mrp: 155, quantity: 1, unit: "1 L" },
    ],
    addressId: "addr_2", zoneId: "zone_4", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-02-04T14:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-04T14:01:00Z" },
      { status: "packing", timestamp: "2026-02-04T14:08:00Z" },
      { status: "out_for_delivery", timestamp: "2026-02-04T14:18:00Z" },
      { status: "delivered", timestamp: "2026-02-04T14:50:00Z" },
    ],
    deliverySlotId: "slot_3", estimatedDeliveryMinutes: 50, etaChangedAfterOrder: false,
    subtotal: 605, discount: 0, deliveryFee: 0, packingFee: 0, total: 605,
    paymentId: "pay_20", packingPreference: "standard", createdAt: "2026-02-04T14:00:00Z", updatedAt: "2026-02-04T14:50:00Z",
  },
  // Confirmed — just placed
  {
    id: "ord_21", userId: "user_1",
    items: [
      { itemId: "item_28", variantId: "v28_1", name: "Classic Potato Chips", imageUrl: "/images/items/chips.png", price: 40, mrp: 50, quantity: 3, unit: "150 g" },
      { itemId: "item_37", variantId: "v37_1", name: "Coconut Water", imageUrl: "/images/items/coconut-water.png", price: 40, mrp: 50, quantity: 3, unit: "300 ml" },
      { itemId: "item_33", variantId: "v33_1", name: "Chocolate Cookies", imageUrl: "/images/items/cookies.png", price: 60, mrp: 75, quantity: 1, unit: "200 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "confirmed",
    timeline: [
      { status: "created", timestamp: "2026-02-06T10:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-06T10:01:00Z" },
    ],
    deliverySlotId: "slot_3", estimatedDeliveryMinutes: 45, etaChangedAfterOrder: false,
    subtotal: 300, discount: 0, deliveryFee: 0, packingFee: 0, total: 300,
    paymentId: "pay_21", packingPreference: "standard", createdAt: "2026-02-06T10:00:00Z", updatedAt: "2026-02-06T10:01:00Z",
  },
  // Order with stock flip at checkout scenario
  {
    id: "ord_22", userId: "user_1",
    items: [
      { itemId: "item_14", variantId: "v14_1", name: "Mushrooms (Button)", imageUrl: "/images/items/mushrooms.png", price: 50, mrp: 65, quantity: 3, unit: "200 g", unavailableAtPacking: true },
      { itemId: "item_3", variantId: "v3_2", name: "Baby Spinach", imageUrl: "/images/items/spinach.png", price: 99, mrp: 120, quantity: 2, unit: "500 g" },
      { itemId: "item_13", variantId: "v13_1", name: "Sweet Corn", imageUrl: "/images/items/corn.png", price: 40, mrp: 50, quantity: 2, unit: "2 pcs" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-02-05T08:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-05T08:01:00Z" },
      { status: "packing", timestamp: "2026-02-05T08:05:00Z", note: "Mushrooms (200g x3) out of stock — removed from order. Stock showed available at time of checkout." },
      { status: "out_for_delivery", timestamp: "2026-02-05T08:14:00Z" },
      { status: "delivered", timestamp: "2026-02-05T08:28:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 428, discount: 0, deliveryFee: 15, packingFee: 0, total: 443,
    paymentId: "pay_22", packingPreference: "standard", createdAt: "2026-02-05T08:00:00Z", updatedAt: "2026-02-05T08:28:00Z",
  },
  // Out for delivery with ETA change
  {
    id: "ord_23", userId: "user_1",
    items: [
      { itemId: "item_2", variantId: "v2_1", name: "Red Apples", imageUrl: "/images/items/apples.png", price: 180, mrp: 220, quantity: 2, unit: "1 kg" },
      { itemId: "item_26", variantId: "v26_1", name: "Honey (Raw)", imageUrl: "/images/items/honey.png", price: 299, mrp: 350, quantity: 1, unit: "500 g" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "out_for_delivery",
    timeline: [
      { status: "created", timestamp: "2026-02-06T10:30:00Z" },
      { status: "confirmed", timestamp: "2026-02-06T10:31:00Z" },
      { status: "packing", timestamp: "2026-02-06T10:36:00Z" },
      { status: "out_for_delivery", timestamp: "2026-02-06T10:44:00Z", note: "ETA updated: Delivery partner reassigned" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 45, etaChangedAfterOrder: true, originalEtaMinutes: 25,
    subtotal: 659, discount: 0, deliveryFee: 15, packingFee: 0, total: 674,
    paymentId: "pay_23", packingPreference: "standard", createdAt: "2026-02-06T10:30:00Z", updatedAt: "2026-02-06T10:44:00Z",
  },
  // Delivered with coupon applied
  {
    id: "ord_24", userId: "user_1",
    items: [
      { itemId: "item_39", variantId: "v39_2", name: "Instant Noodles", imageUrl: "/images/items/noodles.png", price: 130, mrp: 168, quantity: 1, unit: "Pack of 12" },
      { itemId: "item_34", variantId: "v34_1", name: "Mango Juice", imageUrl: "/images/items/mango-juice.png", price: 85, mrp: 99, quantity: 1, unit: "1 L" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "delivered",
    timeline: [
      { status: "created", timestamp: "2026-02-05T17:00:00Z" },
      { status: "confirmed", timestamp: "2026-02-05T17:01:00Z" },
      { status: "packing", timestamp: "2026-02-05T17:05:00Z" },
      { status: "out_for_delivery", timestamp: "2026-02-05T17:12:00Z" },
      { status: "delivered", timestamp: "2026-02-05T17:25:00Z" },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 25, etaChangedAfterOrder: false,
    subtotal: 215, discount: 50, deliveryFee: 15, packingFee: 0, total: 180,
    paymentId: "pay_24", couponId: "coup_6", packingPreference: "standard", createdAt: "2026-02-05T17:00:00Z", updatedAt: "2026-02-05T17:25:00Z",
  },
  // "Created" status — the orphaned payment case
  {
    id: "ord_25", userId: "user_1",
    items: [
      { itemId: "item_22", variantId: "v22_2", name: "Paneer (Fresh)", imageUrl: "/images/items/paneer.png", price: 150, mrp: 180, quantity: 1, unit: "400 g" },
      { itemId: "item_16", variantId: "v16_2", name: "Full Cream Milk", imageUrl: "/images/items/milk.png", price: 56, mrp: 60, quantity: 2, unit: "1 L" },
    ],
    addressId: "addr_1", zoneId: "zone_1", status: "created",
    timeline: [
      { status: "created", timestamp: "2026-02-06T09:00:00Z", note: "Payment succeeded (TXN025) but order confirmation failed — system error. Customer sees payment deducted but no order." },
    ],
    deliverySlotId: "slot_2", estimatedDeliveryMinutes: 30, etaChangedAfterOrder: false,
    subtotal: 262, discount: 0, deliveryFee: 15, packingFee: 0, total: 277,
    paymentId: "pay_25", packingPreference: "standard", createdAt: "2026-02-06T09:00:00Z", updatedAt: "2026-02-06T09:00:00Z",
  },
];
