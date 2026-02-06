import { InventoryRecord } from "@/types";

// Inventory for zone_1 (Koramangala) — primary zone
// Includes deliberate sync delay scenarios
export const INVENTORY: InventoryRecord[] = [
  // Fruits & Vegetables — mostly in stock
  { itemId: "item_1", variantId: "v1_1", zoneId: "zone_1", quantity: 45, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_1", variantId: "v1_2", zoneId: "zone_1", quantity: 30, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_2", variantId: "v2_1", zoneId: "zone_1", quantity: 20, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_3", variantId: "v3_1", zoneId: "zone_1", quantity: 12, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_4", variantId: "v4_1", zoneId: "zone_1", quantity: 60, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_5", variantId: "v5_1", zoneId: "zone_1", quantity: 50, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_6", variantId: "v6_1", zoneId: "zone_1", quantity: 40, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  // Broccoli — low stock, sync delay (the demo scenario)
  { itemId: "item_7", variantId: "v7_1", zoneId: "zone_1", quantity: 2, status: "low_stock", lastSyncedAt: "2026-02-06T06:00:00Z", hasSyncDelay: true },
  { itemId: "item_8", variantId: "v8_1", zoneId: "zone_1", quantity: 8, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_9", variantId: "v9_1", zoneId: "zone_1", quantity: 25, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_10", variantId: "v10_1", zoneId: "zone_1", quantity: 30, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_11", variantId: "v11_1", zoneId: "zone_1", quantity: 15, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_12", variantId: "v12_1", zoneId: "zone_1", quantity: 40, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_13", variantId: "v13_1", zoneId: "zone_1", quantity: 10, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  // Mushrooms — out of stock but sync delay shows in_stock (demo: stock flip at checkout)
  { itemId: "item_14", variantId: "v14_1", zoneId: "zone_1", quantity: 0, status: "in_stock", lastSyncedAt: "2026-02-05T22:00:00Z", hasSyncDelay: true },
  { itemId: "item_15", variantId: "v15_1", zoneId: "zone_1", quantity: 35, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },

  // Dairy & Breakfast
  { itemId: "item_16", variantId: "v16_2", zoneId: "zone_1", quantity: 100, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_17", variantId: "v17_1", zoneId: "zone_1", quantity: 50, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_18", variantId: "v18_1", zoneId: "zone_1", quantity: 35, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_19", variantId: "v19_1", zoneId: "zone_1", quantity: 18, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_20", variantId: "v20_1", zoneId: "zone_1", quantity: 22, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_21", variantId: "v21_1", zoneId: "zone_1", quantity: 30, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_22", variantId: "v22_1", zoneId: "zone_1", quantity: 15, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  // Paneer low stock
  { itemId: "item_22", variantId: "v22_2", zoneId: "zone_1", quantity: 3, status: "low_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_23", variantId: "v23_1", zoneId: "zone_1", quantity: 25, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_24", variantId: "v24_1", zoneId: "zone_1", quantity: 20, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_25", variantId: "v25_1", zoneId: "zone_1", quantity: 12, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_26", variantId: "v26_1", zoneId: "zone_1", quantity: 8, status: "in_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },
  { itemId: "item_27", variantId: "v27_1", zoneId: "zone_1", quantity: 0, status: "out_of_stock", lastSyncedAt: "2026-02-06T07:00:00Z", hasSyncDelay: false },

  // Snacks — mostly in stock
  { itemId: "item_28", variantId: "v28_1", zoneId: "zone_1", quantity: 80, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_29", variantId: "v29_1", zoneId: "zone_1", quantity: 15, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_30", variantId: "v30_1", zoneId: "zone_1", quantity: 40, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_31", variantId: "v31_1", zoneId: "zone_1", quantity: 20, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_32", variantId: "v32_1", zoneId: "zone_1", quantity: 30, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_33", variantId: "v33_1", zoneId: "zone_1", quantity: 25, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_34", variantId: "v34_1", zoneId: "zone_1", quantity: 50, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_35", variantId: "v35_1", zoneId: "zone_1", quantity: 18, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_36", variantId: "v36_1", zoneId: "zone_1", quantity: 35, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_37", variantId: "v37_1", zoneId: "zone_1", quantity: 22, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_38", variantId: "v38_1", zoneId: "zone_1", quantity: 10, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_39", variantId: "v39_1", zoneId: "zone_1", quantity: 60, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },

  // Household
  { itemId: "item_40", variantId: "v40_1", zoneId: "zone_1", quantity: 20, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_41", variantId: "v41_1", zoneId: "zone_1", quantity: 15, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_42", variantId: "v42_1", zoneId: "zone_1", quantity: 25, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_43", variantId: "v43_1", zoneId: "zone_1", quantity: 30, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_44", variantId: "v44_1", zoneId: "zone_1", quantity: 20, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_45", variantId: "v45_1", zoneId: "zone_1", quantity: 12, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_46", variantId: "v46_1", zoneId: "zone_1", quantity: 40, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_47", variantId: "v47_1", zoneId: "zone_1", quantity: 18, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_48", variantId: "v48_1", zoneId: "zone_1", quantity: 25, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_49", variantId: "v49_1", zoneId: "zone_1", quantity: 10, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_50", variantId: "v50_1", zoneId: "zone_1", quantity: 8, status: "low_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },

  // Personal Care
  { itemId: "item_51", variantId: "v51_1", zoneId: "zone_1", quantity: 20, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_52", variantId: "v52_1", zoneId: "zone_1", quantity: 15, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_53", variantId: "v53_1", zoneId: "zone_1", quantity: 10, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_54", variantId: "v54_1", zoneId: "zone_1", quantity: 12, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_55", variantId: "v55_1", zoneId: "zone_1", quantity: 8, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_56", variantId: "v56_1", zoneId: "zone_1", quantity: 15, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_57", variantId: "v57_1", zoneId: "zone_1", quantity: 10, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_58", variantId: "v58_1", zoneId: "zone_1", quantity: 6, status: "low_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_59", variantId: "v59_1", zoneId: "zone_1", quantity: 20, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
  { itemId: "item_60", variantId: "v60_1", zoneId: "zone_1", quantity: 14, status: "in_stock", lastSyncedAt: "2026-02-06T08:00:00Z", hasSyncDelay: false },
];
