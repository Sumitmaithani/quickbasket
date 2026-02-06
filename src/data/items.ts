import { Item } from "@/types";

export const ITEMS: Item[] = [
  // ===== Fruits & Vegetables (cat_1) — 15 items =====
  {
    id: "item_1", name: "Organic Bananas", slug: "organic-bananas", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Fresh organic bananas, naturally ripened. Rich in potassium and perfect for smoothies or as a quick snack.",
    imageUrl: "/images/items/bananas.png", unit: "1 dozen", variants: [
      { id: "v1_1", label: "1 dozen", price: 49, mrp: 60, isDefault: true },
      { id: "v1_2", label: "Half dozen", price: 29, mrp: 35, isDefault: false },
    ],
    tags: ["bestseller", "organic"], isVeg: true, brand: "FarmFresh", rating: 4.5, ratingCount: 1230, frequentlyBought: true,
  },
  {
    id: "item_2", name: "Red Apples", slug: "red-apples", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Premium Kashmir red apples. Sweet, crunchy, and loaded with vitamins.",
    imageUrl: "/images/items/apples.png", unit: "1 kg", variants: [
      { id: "v2_1", label: "1 kg", price: 180, mrp: 220, isDefault: true },
      { id: "v2_2", label: "500 g", price: 95, mrp: 115, isDefault: false },
    ],
    tags: ["premium"], isVeg: true, brand: "Kashmir Orchards", rating: 4.3, ratingCount: 874, frequentlyBought: true,
  },
  {
    id: "item_3", name: "Baby Spinach", slug: "baby-spinach", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Tender baby spinach leaves, pre-washed and ready to use. Great for salads and smoothies.",
    imageUrl: "/images/items/spinach.png", unit: "200 g", variants: [
      { id: "v3_1", label: "200 g", price: 45, mrp: 55, isDefault: true },
      { id: "v3_2", label: "500 g", price: 99, mrp: 120, isDefault: false },
    ],
    tags: ["organic"], isVeg: true, brand: "GreenLeaf", rating: 4.1, ratingCount: 562, frequentlyBought: false,
  },
  {
    id: "item_4", name: "Fresh Tomatoes", slug: "fresh-tomatoes", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Locally sourced vine-ripened tomatoes. Ideal for curries, salads, and sauces.",
    imageUrl: "/images/items/tomatoes.png", unit: "1 kg", variants: [
      { id: "v4_1", label: "1 kg", price: 35, mrp: 45, isDefault: true },
      { id: "v4_2", label: "2 kg", price: 65, mrp: 85, isDefault: false },
    ],
    tags: ["bestseller"], isVeg: true, brand: "Local Farm", rating: 4.2, ratingCount: 2140, frequentlyBought: true,
  },
  {
    id: "item_5", name: "Onions", slug: "onions", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Fresh medium-sized onions. Kitchen essential for everyday cooking.",
    imageUrl: "/images/items/onions.png", unit: "1 kg", variants: [
      { id: "v5_1", label: "1 kg", price: 30, mrp: 40, isDefault: true },
      { id: "v5_2", label: "2 kg", price: 55, mrp: 75, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "Local Farm", rating: 4.0, ratingCount: 3210, frequentlyBought: true,
  },
  {
    id: "item_6", name: "Potatoes", slug: "potatoes", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Farm-fresh potatoes, great for frying, boiling, or making curries.",
    imageUrl: "/images/items/potatoes.png", unit: "1 kg", variants: [
      { id: "v6_1", label: "1 kg", price: 28, mrp: 35, isDefault: true },
      { id: "v6_2", label: "2 kg", price: 52, mrp: 65, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "Local Farm", rating: 4.0, ratingCount: 1890, frequentlyBought: false,
  },
  {
    id: "item_7", name: "Broccoli", slug: "broccoli", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Fresh green broccoli florets. Packed with nutrients and fiber.",
    imageUrl: "/images/items/broccoli.png", unit: "300 g", variants: [
      { id: "v7_1", label: "300 g", price: 65, mrp: 80, isDefault: true },
    ],
    tags: ["organic"], isVeg: true, brand: "GreenLeaf", rating: 4.4, ratingCount: 430, frequentlyBought: false,
  },
  {
    id: "item_8", name: "Mangoes (Alphonso)", slug: "alphonso-mangoes", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Premium Alphonso mangoes from Ratnagiri. The king of fruits, naturally ripened.",
    imageUrl: "/images/items/mangoes.png", unit: "1 kg", variants: [
      { id: "v8_1", label: "1 kg (3-4 pcs)", price: 450, mrp: 550, isDefault: true },
      { id: "v8_2", label: "500 g (2 pcs)", price: 240, mrp: 290, isDefault: false },
    ],
    tags: ["premium", "seasonal"], isVeg: true, brand: "Ratnagiri Select", rating: 4.8, ratingCount: 670, frequentlyBought: false,
  },
  {
    id: "item_9", name: "Cucumber", slug: "cucumber", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Fresh green cucumbers, crisp and hydrating.",
    imageUrl: "/images/items/cucumber.png", unit: "500 g", variants: [
      { id: "v9_1", label: "500 g", price: 25, mrp: 30, isDefault: true },
      { id: "v9_2", label: "1 kg", price: 45, mrp: 55, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "Local Farm", rating: 4.0, ratingCount: 990, frequentlyBought: false,
  },
  {
    id: "item_10", name: "Carrots", slug: "carrots", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Crunchy orange carrots. Great for salads, juice, or cooking.",
    imageUrl: "/images/items/carrots.png", unit: "500 g", variants: [
      { id: "v10_1", label: "500 g", price: 32, mrp: 40, isDefault: true },
      { id: "v10_2", label: "1 kg", price: 58, mrp: 75, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "FarmFresh", rating: 4.1, ratingCount: 720, frequentlyBought: false,
  },
  {
    id: "item_11", name: "Green Capsicum", slug: "green-capsicum", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Fresh green bell peppers for cooking and salads.",
    imageUrl: "/images/items/capsicum.png", unit: "250 g", variants: [
      { id: "v11_1", label: "250 g", price: 30, mrp: 40, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "Local Farm", rating: 3.9, ratingCount: 340, frequentlyBought: false,
  },
  {
    id: "item_12", name: "Lemons", slug: "lemons", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Juicy lemons, perfect for drinks and cooking.",
    imageUrl: "/images/items/lemons.png", unit: "250 g", variants: [
      { id: "v12_1", label: "250 g (4-5 pcs)", price: 20, mrp: 25, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "Local Farm", rating: 4.2, ratingCount: 510, frequentlyBought: true,
  },
  {
    id: "item_13", name: "Sweet Corn", slug: "sweet-corn", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Fresh sweet corn cobs. Boil, grill, or add to your favourite recipes.",
    imageUrl: "/images/items/corn.png", unit: "2 pcs", variants: [
      { id: "v13_1", label: "2 pcs", price: 40, mrp: 50, isDefault: true },
      { id: "v13_2", label: "4 pcs", price: 75, mrp: 95, isDefault: false },
    ],
    tags: ["new"], isVeg: true, brand: "FarmFresh", rating: 4.3, ratingCount: 280, frequentlyBought: false,
  },
  {
    id: "item_14", name: "Mushrooms (Button)", slug: "button-mushrooms", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Fresh white button mushrooms. Versatile ingredient for many dishes.",
    imageUrl: "/images/items/mushrooms.png", unit: "200 g", variants: [
      { id: "v14_1", label: "200 g", price: 50, mrp: 65, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "GreenLeaf", rating: 4.0, ratingCount: 410, frequentlyBought: false,
  },
  {
    id: "item_15", name: "Fresh Coriander", slug: "fresh-coriander", categoryId: "cat_1", categorySlug: "fruits-vegetables",
    description: "Fragrant coriander leaves for garnishing and chutneys.",
    imageUrl: "/images/items/coriander.png", unit: "100 g", variants: [
      { id: "v15_1", label: "100 g", price: 15, mrp: 20, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "Local Farm", rating: 4.1, ratingCount: 630, frequentlyBought: true,
  },

  // ===== Dairy & Breakfast (cat_2) — 12 items =====
  {
    id: "item_16", name: "Full Cream Milk", slug: "full-cream-milk", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Fresh pasteurized full cream milk. Rich and creamy, delivered every morning.",
    imageUrl: "/images/items/milk.png", unit: "1 L", variants: [
      { id: "v16_1", label: "500 ml", price: 30, mrp: 32, isDefault: false },
      { id: "v16_2", label: "1 L", price: 56, mrp: 60, isDefault: true },
    ],
    tags: ["bestseller"], isVeg: true, brand: "DairyPure", rating: 4.6, ratingCount: 5430, frequentlyBought: true,
  },
  {
    id: "item_17", name: "Brown Bread", slug: "brown-bread", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Whole wheat brown bread, soft and healthy. No added preservatives.",
    imageUrl: "/images/items/bread.png", unit: "400 g", variants: [
      { id: "v17_1", label: "400 g", price: 42, mrp: 50, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "BakeHouse", rating: 4.2, ratingCount: 1870, frequentlyBought: true,
  },
  {
    id: "item_18", name: "Farm Eggs", slug: "farm-eggs", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Free-range farm eggs. Brown shell, rich yolk.",
    imageUrl: "/images/items/eggs.png", unit: "6 pcs", variants: [
      { id: "v18_1", label: "6 pcs", price: 60, mrp: 72, isDefault: true },
      { id: "v18_2", label: "12 pcs", price: 110, mrp: 135, isDefault: false },
    ],
    tags: ["bestseller"], isVeg: false, brand: "HappyHens", rating: 4.4, ratingCount: 2910, frequentlyBought: true,
  },
  {
    id: "item_19", name: "Greek Yogurt", slug: "greek-yogurt", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Thick, creamy Greek yogurt. High protein, low sugar.",
    imageUrl: "/images/items/yogurt.png", unit: "400 g", variants: [
      { id: "v19_1", label: "400 g", price: 85, mrp: 99, isDefault: true },
      { id: "v19_2", label: "200 g", price: 49, mrp: 55, isDefault: false },
    ],
    tags: ["new"], isVeg: true, brand: "DairyPure", rating: 4.3, ratingCount: 760, frequentlyBought: false,
  },
  {
    id: "item_20", name: "Cheddar Cheese Slices", slug: "cheddar-cheese", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Smooth cheddar cheese slices for sandwiches and burgers.",
    imageUrl: "/images/items/cheese.png", unit: "200 g", variants: [
      { id: "v20_1", label: "200 g (10 slices)", price: 120, mrp: 145, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "CheeseKraft", rating: 4.1, ratingCount: 530, frequentlyBought: false,
  },
  {
    id: "item_21", name: "Butter (Salted)", slug: "salted-butter", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Creamy salted butter made from fresh cream.",
    imageUrl: "/images/items/butter.png", unit: "200 g", variants: [
      { id: "v21_1", label: "200 g", price: 52, mrp: 58, isDefault: true },
      { id: "v21_2", label: "500 g", price: 120, mrp: 140, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "DairyPure", rating: 4.5, ratingCount: 1540, frequentlyBought: false,
  },
  {
    id: "item_22", name: "Paneer (Fresh)", slug: "fresh-paneer", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Soft and fresh cottage cheese. Perfect for curries and snacks.",
    imageUrl: "/images/items/paneer.png", unit: "200 g", variants: [
      { id: "v22_1", label: "200 g", price: 80, mrp: 95, isDefault: true },
      { id: "v22_2", label: "400 g", price: 150, mrp: 180, isDefault: false },
    ],
    tags: ["bestseller"], isVeg: true, brand: "DairyPure", rating: 4.4, ratingCount: 2100, frequentlyBought: false,
  },
  {
    id: "item_23", name: "Cornflakes", slug: "cornflakes", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Crispy golden cornflakes. Start your morning right.",
    imageUrl: "/images/items/cornflakes.png", unit: "500 g", variants: [
      { id: "v23_1", label: "500 g", price: 165, mrp: 199, isDefault: true },
      { id: "v23_2", label: "250 g", price: 89, mrp: 105, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "CrunchMorning", rating: 4.0, ratingCount: 890, frequentlyBought: false,
  },
  {
    id: "item_24", name: "Oats (Rolled)", slug: "rolled-oats", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "100% whole grain rolled oats. High in fiber, heart-healthy.",
    imageUrl: "/images/items/oats.png", unit: "1 kg", variants: [
      { id: "v24_1", label: "1 kg", price: 185, mrp: 220, isDefault: true },
      { id: "v24_2", label: "500 g", price: 99, mrp: 120, isDefault: false },
    ],
    tags: ["organic"], isVeg: true, brand: "NutriGrain", rating: 4.5, ratingCount: 1200, frequentlyBought: false,
  },
  {
    id: "item_25", name: "Peanut Butter", slug: "peanut-butter", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Creamy peanut butter with no added sugar. High protein spread.",
    imageUrl: "/images/items/peanut-butter.png", unit: "350 g", variants: [
      { id: "v25_1", label: "350 g", price: 225, mrp: 275, isDefault: true },
    ],
    tags: ["new"], isVeg: true, brand: "NutriGrain", rating: 4.3, ratingCount: 650, frequentlyBought: false,
  },
  {
    id: "item_26", name: "Honey (Raw)", slug: "raw-honey", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Pure raw honey, unprocessed and unfiltered. Natural sweetener.",
    imageUrl: "/images/items/honey.png", unit: "500 g", variants: [
      { id: "v26_1", label: "500 g", price: 299, mrp: 350, isDefault: true },
      { id: "v26_2", label: "250 g", price: 169, mrp: 195, isDefault: false },
    ],
    tags: ["organic"], isVeg: true, brand: "HoneyBee", rating: 4.6, ratingCount: 980, frequentlyBought: false,
  },
  {
    id: "item_27", name: "Fresh Orange Juice", slug: "fresh-oj", categoryId: "cat_2", categorySlug: "dairy-breakfast",
    description: "Cold-pressed fresh orange juice. No added sugar or preservatives.",
    imageUrl: "/images/items/oj.png", unit: "500 ml", variants: [
      { id: "v27_1", label: "500 ml", price: 90, mrp: 110, isDefault: true },
      { id: "v27_2", label: "1 L", price: 165, mrp: 199, isDefault: false },
    ],
    tags: ["new"], isVeg: true, brand: "FreshSqueeze", rating: 4.2, ratingCount: 340, frequentlyBought: false,
  },

  // ===== Snacks & Beverages (cat_3) — 12 items =====
  {
    id: "item_28", name: "Classic Potato Chips", slug: "potato-chips", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Crispy salted potato chips. The perfect snack for any time.",
    imageUrl: "/images/items/chips.png", unit: "150 g", variants: [
      { id: "v28_1", label: "150 g", price: 40, mrp: 50, isDefault: true },
      { id: "v28_2", label: "300 g", price: 75, mrp: 95, isDefault: false },
    ],
    tags: ["bestseller"], isVeg: true, brand: "CrunchTime", rating: 4.2, ratingCount: 3450, frequentlyBought: true,
  },
  {
    id: "item_29", name: "Mixed Nuts Trail Mix", slug: "trail-mix", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Premium mix of almonds, cashews, raisins, and dried cranberries.",
    imageUrl: "/images/items/trail-mix.png", unit: "200 g", variants: [
      { id: "v29_1", label: "200 g", price: 250, mrp: 299, isDefault: true },
      { id: "v29_2", label: "500 g", price: 575, mrp: 699, isDefault: false },
    ],
    tags: ["premium"], isVeg: true, brand: "NutriGrain", rating: 4.5, ratingCount: 890, frequentlyBought: false,
  },
  {
    id: "item_30", name: "Cold Coffee (Ready to Drink)", slug: "cold-coffee", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Chilled cold coffee with a smooth, creamy taste. Ready to drink.",
    imageUrl: "/images/items/cold-coffee.png", unit: "200 ml", variants: [
      { id: "v30_1", label: "200 ml", price: 35, mrp: 40, isDefault: true },
      { id: "v30_2", label: "Pack of 4", price: 125, mrp: 160, isDefault: false },
    ],
    tags: ["new"], isVeg: true, brand: "BeanBrew", rating: 4.0, ratingCount: 540, frequentlyBought: false,
  },
  {
    id: "item_31", name: "Green Tea (Mint)", slug: "green-tea-mint", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Refreshing mint green tea bags. Natural antioxidants for wellness.",
    imageUrl: "/images/items/green-tea.png", unit: "25 bags", variants: [
      { id: "v31_1", label: "25 bags", price: 150, mrp: 180, isDefault: true },
    ],
    tags: ["organic"], isVeg: true, brand: "LeafWell", rating: 4.3, ratingCount: 720, frequentlyBought: false,
  },
  {
    id: "item_32", name: "Sparkling Water", slug: "sparkling-water", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Naturally carbonated sparkling water. Zero calories, refreshing taste.",
    imageUrl: "/images/items/sparkling.png", unit: "750 ml", variants: [
      { id: "v32_1", label: "750 ml", price: 55, mrp: 65, isDefault: true },
      { id: "v32_2", label: "Pack of 6", price: 299, mrp: 390, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "FizzNatural", rating: 3.9, ratingCount: 410, frequentlyBought: false,
  },
  {
    id: "item_33", name: "Chocolate Cookies", slug: "choco-cookies", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Double chocolate chip cookies. Crunchy outside, gooey inside.",
    imageUrl: "/images/items/cookies.png", unit: "200 g", variants: [
      { id: "v33_1", label: "200 g", price: 60, mrp: 75, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "BakeHouse", rating: 4.4, ratingCount: 1100, frequentlyBought: false,
  },
  {
    id: "item_34", name: "Mango Juice", slug: "mango-juice", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Pure mango juice with real fruit pulp. No artificial colours.",
    imageUrl: "/images/items/mango-juice.png", unit: "1 L", variants: [
      { id: "v34_1", label: "1 L", price: 85, mrp: 99, isDefault: true },
      { id: "v34_2", label: "200 ml", price: 20, mrp: 25, isDefault: false },
    ],
    tags: ["bestseller"], isVeg: true, brand: "FreshSqueeze", rating: 4.1, ratingCount: 1640, frequentlyBought: false,
  },
  {
    id: "item_35", name: "Masala Chai Premix", slug: "masala-chai", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Instant masala chai premix with real spices. Just add hot water.",
    imageUrl: "/images/items/chai.png", unit: "500 g", variants: [
      { id: "v35_1", label: "500 g", price: 199, mrp: 245, isDefault: true },
      { id: "v35_2", label: "250 g", price: 110, mrp: 130, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "ChaiWala", rating: 4.5, ratingCount: 2300, frequentlyBought: false,
  },
  {
    id: "item_36", name: "Roasted Peanuts", slug: "roasted-peanuts", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Crunchy salted roasted peanuts. Protein-packed healthy snack.",
    imageUrl: "/images/items/peanuts.png", unit: "200 g", variants: [
      { id: "v36_1", label: "200 g", price: 45, mrp: 55, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "CrunchTime", rating: 4.0, ratingCount: 680, frequentlyBought: false,
  },
  {
    id: "item_37", name: "Coconut Water", slug: "coconut-water", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "100% natural tender coconut water. Refreshing and hydrating.",
    imageUrl: "/images/items/coconut-water.png", unit: "300 ml", variants: [
      { id: "v37_1", label: "300 ml", price: 40, mrp: 50, isDefault: true },
      { id: "v37_2", label: "Pack of 6", price: 220, mrp: 300, isDefault: false },
    ],
    tags: ["organic"], isVeg: true, brand: "FreshSqueeze", rating: 4.4, ratingCount: 920, frequentlyBought: false,
  },
  {
    id: "item_38", name: "Protein Bar (Chocolate)", slug: "protein-bar", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "High protein chocolate bar. 20g protein, low sugar.",
    imageUrl: "/images/items/protein-bar.png", unit: "60 g", variants: [
      { id: "v38_1", label: "Single bar", price: 120, mrp: 150, isDefault: true },
      { id: "v38_2", label: "Box of 6", price: 650, mrp: 900, isDefault: false },
    ],
    tags: ["new"], isVeg: true, brand: "FitFuel", rating: 4.2, ratingCount: 450, frequentlyBought: false,
  },
  {
    id: "item_39", name: "Instant Noodles", slug: "instant-noodles", categoryId: "cat_3", categorySlug: "snacks-beverages",
    description: "Quick cook masala noodles. Ready in 2 minutes.",
    imageUrl: "/images/items/noodles.png", unit: "4 pack", variants: [
      { id: "v39_1", label: "Pack of 4", price: 48, mrp: 56, isDefault: true },
      { id: "v39_2", label: "Pack of 12", price: 130, mrp: 168, isDefault: false },
    ],
    tags: ["bestseller"], isVeg: true, brand: "QuickBite", rating: 4.0, ratingCount: 4200, frequentlyBought: true,
  },

  // ===== Household Essentials (cat_4) — 11 items =====
  {
    id: "item_40", name: "Dish Wash Liquid", slug: "dish-wash", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Concentrated dish wash liquid with lemon extracts. Tough on grease.",
    imageUrl: "/images/items/dish-wash.png", unit: "500 ml", variants: [
      { id: "v40_1", label: "500 ml", price: 95, mrp: 115, isDefault: true },
      { id: "v40_2", label: "1 L", price: 175, mrp: 210, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "CleanHome", rating: 4.3, ratingCount: 1560, frequentlyBought: false,
  },
  {
    id: "item_41", name: "Floor Cleaner (Lavender)", slug: "floor-cleaner", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Antibacterial floor cleaner with a soothing lavender fragrance.",
    imageUrl: "/images/items/floor-cleaner.png", unit: "1 L", variants: [
      { id: "v41_1", label: "1 L", price: 130, mrp: 155, isDefault: true },
      { id: "v41_2", label: "2 L", price: 240, mrp: 290, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "CleanHome", rating: 4.1, ratingCount: 890, frequentlyBought: false,
  },
  {
    id: "item_42", name: "Laundry Detergent", slug: "laundry-detergent", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Powerful liquid laundry detergent. Works in all machines.",
    imageUrl: "/images/items/detergent.png", unit: "1 L", variants: [
      { id: "v42_1", label: "1 L", price: 199, mrp: 249, isDefault: true },
      { id: "v42_2", label: "2 L", price: 365, mrp: 449, isDefault: false },
    ],
    tags: ["bestseller"], isVeg: true, brand: "CleanHome", rating: 4.4, ratingCount: 2340, frequentlyBought: false,
  },
  {
    id: "item_43", name: "Kitchen Tissue Roll", slug: "kitchen-tissue", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Super absorbent kitchen tissue rolls. 80 sheets per roll.",
    imageUrl: "/images/items/tissue.png", unit: "2 rolls", variants: [
      { id: "v43_1", label: "2 rolls", price: 120, mrp: 150, isDefault: true },
      { id: "v43_2", label: "4 rolls", price: 220, mrp: 280, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "SoftTouch", rating: 4.0, ratingCount: 670, frequentlyBought: false,
  },
  {
    id: "item_44", name: "Garbage Bags", slug: "garbage-bags", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Thick, leak-proof garbage bags. Medium size, 30 bags per pack.",
    imageUrl: "/images/items/garbage-bags.png", unit: "30 pcs", variants: [
      { id: "v44_1", label: "30 pcs (Medium)", price: 80, mrp: 99, isDefault: true },
      { id: "v44_2", label: "15 pcs (Large)", price: 65, mrp: 80, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "CleanHome", rating: 3.9, ratingCount: 430, frequentlyBought: false,
  },
  {
    id: "item_45", name: "Aluminium Foil", slug: "aluminium-foil", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Food-grade aluminium foil. 9m roll, ideal for cooking and wrapping.",
    imageUrl: "/images/items/foil.png", unit: "9 m", variants: [
      { id: "v45_1", label: "9 m", price: 70, mrp: 85, isDefault: true },
      { id: "v45_2", label: "25 m", price: 175, mrp: 210, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "KitchenPro", rating: 4.1, ratingCount: 520, frequentlyBought: false,
  },
  {
    id: "item_46", name: "Sponge Scrubber (Pack of 3)", slug: "sponge-scrubber", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Dual-sided sponge scrubber for dishes and surfaces.",
    imageUrl: "/images/items/sponge.png", unit: "3 pcs", variants: [
      { id: "v46_1", label: "Pack of 3", price: 35, mrp: 45, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "CleanHome", rating: 4.0, ratingCount: 290, frequentlyBought: false,
  },
  {
    id: "item_47", name: "Bathroom Cleaner", slug: "bathroom-cleaner", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Powerful bathroom cleaner spray. Removes stains and kills germs.",
    imageUrl: "/images/items/bathroom-cleaner.png", unit: "500 ml", variants: [
      { id: "v47_1", label: "500 ml", price: 110, mrp: 135, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "CleanHome", rating: 4.2, ratingCount: 760, frequentlyBought: false,
  },
  {
    id: "item_48", name: "Mosquito Repellent Refill", slug: "mosquito-repellent", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Liquid mosquito repellent refill. 45 nights protection.",
    imageUrl: "/images/items/repellent.png", unit: "1 refill", variants: [
      { id: "v48_1", label: "1 refill", price: 65, mrp: 79, isDefault: true },
      { id: "v48_2", label: "Pack of 2", price: 120, mrp: 158, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "GuardHome", rating: 4.0, ratingCount: 1100, frequentlyBought: false,
  },
  {
    id: "item_49", name: "Glass Cleaner", slug: "glass-cleaner", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Streak-free glass and surface cleaner spray.",
    imageUrl: "/images/items/glass-cleaner.png", unit: "500 ml", variants: [
      { id: "v49_1", label: "500 ml", price: 95, mrp: 120, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "CleanHome", rating: 3.8, ratingCount: 340, frequentlyBought: false,
  },
  {
    id: "item_50", name: "Eco Paper Bags (Pack of 10)", slug: "eco-paper-bags", categoryId: "cat_4", categorySlug: "household-essentials",
    description: "Biodegradable paper bags for groceries and storage. Eco-friendly alternative.",
    imageUrl: "/images/items/paper-bags.png", unit: "10 pcs", variants: [
      { id: "v50_1", label: "Pack of 10", price: 45, mrp: 55, isDefault: true },
    ],
    tags: ["eco"], isVeg: true, brand: "GreenChoice", rating: 4.3, ratingCount: 210, frequentlyBought: false,
  },

  // ===== Personal Care (cat_5) — 10 items =====
  {
    id: "item_51", name: "Hand Wash (Neem)", slug: "hand-wash-neem", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Antibacterial neem hand wash. Gentle on skin, tough on germs.",
    imageUrl: "/images/items/handwash.png", unit: "250 ml", variants: [
      { id: "v51_1", label: "250 ml", price: 75, mrp: 89, isDefault: true },
      { id: "v51_2", label: "750 ml (Refill)", price: 160, mrp: 199, isDefault: false },
    ],
    tags: [], isVeg: true, brand: "PureCare", rating: 4.2, ratingCount: 1340, frequentlyBought: false,
  },
  {
    id: "item_52", name: "Toothpaste (Herbal)", slug: "herbal-toothpaste", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Natural herbal toothpaste with neem and clove. No harsh chemicals.",
    imageUrl: "/images/items/toothpaste.png", unit: "150 g", variants: [
      { id: "v52_1", label: "150 g", price: 85, mrp: 99, isDefault: true },
    ],
    tags: ["organic"], isVeg: true, brand: "DentaNature", rating: 4.3, ratingCount: 2100, frequentlyBought: false,
  },
  {
    id: "item_53", name: "Shampoo (Anti-Dandruff)", slug: "anti-dandruff-shampoo", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Clinically tested anti-dandruff shampoo. Scalp care formula.",
    imageUrl: "/images/items/shampoo.png", unit: "200 ml", variants: [
      { id: "v53_1", label: "200 ml", price: 190, mrp: 230, isDefault: true },
      { id: "v53_2", label: "400 ml", price: 350, mrp: 430, isDefault: false },
    ],
    tags: ["bestseller"], isVeg: true, brand: "HairSure", rating: 4.1, ratingCount: 1780, frequentlyBought: false,
  },
  {
    id: "item_54", name: "Body Lotion (Aloe Vera)", slug: "aloe-body-lotion", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Moisturizing aloe vera body lotion. 24-hour hydration.",
    imageUrl: "/images/items/body-lotion.png", unit: "200 ml", variants: [
      { id: "v54_1", label: "200 ml", price: 145, mrp: 175, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "PureCare", rating: 4.0, ratingCount: 560, frequentlyBought: false,
  },
  {
    id: "item_55", name: "Sunscreen SPF 50", slug: "sunscreen-spf50", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Broad spectrum SPF 50 sunscreen. Lightweight, non-greasy formula.",
    imageUrl: "/images/items/sunscreen.png", unit: "100 ml", variants: [
      { id: "v55_1", label: "100 ml", price: 320, mrp: 399, isDefault: true },
    ],
    tags: ["premium"], isVeg: true, brand: "SunGuard", rating: 4.4, ratingCount: 890, frequentlyBought: false,
  },
  {
    id: "item_56", name: "Deodorant Spray", slug: "deo-spray", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Long-lasting freshness deodorant spray. 48-hour protection.",
    imageUrl: "/images/items/deo.png", unit: "150 ml", variants: [
      { id: "v56_1", label: "150 ml", price: 175, mrp: 210, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "FreshVibe", rating: 4.0, ratingCount: 1230, frequentlyBought: false,
  },
  {
    id: "item_57", name: "Face Wash (Charcoal)", slug: "charcoal-face-wash", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Activated charcoal face wash. Deep cleansing for oily skin.",
    imageUrl: "/images/items/face-wash.png", unit: "100 ml", variants: [
      { id: "v57_1", label: "100 ml", price: 130, mrp: 160, isDefault: true },
    ],
    tags: ["new"], isVeg: true, brand: "PureCare", rating: 4.2, ratingCount: 670, frequentlyBought: false,
  },
  {
    id: "item_58", name: "Razor Cartridges", slug: "razor-cartridges", categoryId: "cat_5", categorySlug: "personal-care",
    description: "5-blade razor cartridges for a smooth, close shave. Pack of 4.",
    imageUrl: "/images/items/razor.png", unit: "4 pcs", variants: [
      { id: "v58_1", label: "Pack of 4", price: 340, mrp: 399, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "SharpEdge", rating: 4.1, ratingCount: 450, frequentlyBought: false,
  },
  {
    id: "item_59", name: "Cotton Pads", slug: "cotton-pads", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Soft cotton pads for skincare routine. Gentle and absorbent.",
    imageUrl: "/images/items/cotton-pads.png", unit: "80 pcs", variants: [
      { id: "v59_1", label: "80 pcs", price: 65, mrp: 79, isDefault: true },
    ],
    tags: [], isVeg: true, brand: "SoftTouch", rating: 4.0, ratingCount: 320, frequentlyBought: false,
  },
  {
    id: "item_60", name: "Lip Balm (Strawberry)", slug: "strawberry-lip-balm", categoryId: "cat_5", categorySlug: "personal-care",
    description: "Moisturizing strawberry lip balm with SPF 15. Keeps lips soft and protected.",
    imageUrl: "/images/items/lip-balm.png", unit: "4.5 g", variants: [
      { id: "v60_1", label: "4.5 g", price: 99, mrp: 120, isDefault: true },
    ],
    tags: ["new"], isVeg: true, brand: "PureCare", rating: 4.3, ratingCount: 410, frequentlyBought: false,
  },
];
