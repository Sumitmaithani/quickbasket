# Figma Design Link & Integration Guide

> **QuickBasket** — Connecting design to code
>
> This document serves as the bridge between Figma design files and the QuickBasket codebase. It contains the Figma project link, instructions for accessing design assets, and notes on how design tokens map to the Tailwind CSS configuration.

---

## Figma Project

| Property | Value |
|----------|-------|
| **Project URL** | [https://www.figma.com/file/qB4x7kPmZz3aLc9yV2tR8w/QuickBasket-Design-System](https://www.figma.com/file/qB4x7kPmZz3aLc9yV2tR8w/QuickBasket-Design-System) |
| **Team** | QuickBasket Product |
| **Last synced** | *Not yet synced — placeholder* |
| **Access** | Request edit access from the design lead; view access is open to all team members |

> **Note:** The URL above is a placeholder. Replace it with the actual Figma file link once the design system is created and shared.

---

## File Structure (Expected)

The Figma project should follow this page organisation:

```
QuickBasket-Design-System
├── 🎨 Design Tokens
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Shadows
│   └── Border Radius
├── 🧩 Components
│   ├── Navigation (BottomTabBar, PageHeader)
│   ├── Cards (ItemCard, OrderCard, TicketCard)
│   ├── Inputs (SearchBar, QuantityStepper, VariantSelector)
│   ├── Sheets (CouponSheet, CreateTicketSheet)
│   ├── Feedback (LoadingSpinner, ErrorState, EmptyState)
│   └── Promotional (BannerCarousel, CategoryTile)
├── 📱 Screens
│   ├── Auth (Login, Location)
│   ├── Home
│   ├── Categories & Item Detail
│   ├── Cart & Checkout
│   ├── Orders & Order Detail
│   ├── Support & Ticket Detail
│   ├── Membership
│   └── Profile
├── 🔄 Flows
│   ├── Login → Location → Home
│   ├── Browse → Add to Cart → Checkout
│   ├── Order Tracking
│   └── Support Ticket
└── 📝 Annotations & Specs
    ├── Spacing & Layout Notes
    ├── Interaction Notes
    └── Edge Cases
```

---

## Design Tokens → Tailwind Mapping

The following table maps Figma design tokens to their Tailwind CSS equivalents. When updating the design system in Figma, ensure these values remain in sync with `tailwind.config.ts`.

### Colors

| Figma Token | Figma Value | Tailwind Class | CSS Variable |
|-------------|-------------|----------------|--------------|
| `Primary/600` | `#16a34a` | `green-600` | `--color-green-600` |
| `Primary/700` | `#15803d` | `green-700` | `--color-green-700` |
| `Primary/500` | `#22c55e` | `green-500` | `--color-green-500` |
| `Primary/100` | `#dcfce7` | `green-100` | `--color-green-100` |
| `Primary/50` | `#f0fdf4` | `green-50` | `--color-green-50` |
| `Neutral/900` | `#111827` | `gray-900` | `--color-gray-900` |
| `Neutral/700` | `#374151` | `gray-700` | `--color-gray-700` |
| `Neutral/500` | `#6b7280` | `gray-500` | `--color-gray-500` |
| `Neutral/400` | `#9ca3af` | `gray-400` | `--color-gray-400` |
| `Neutral/200` | `#e5e7eb` | `gray-200` | `--color-gray-200` |
| `Neutral/100` | `#f3f4f6` | `gray-100` | `--color-gray-100` |
| `Neutral/50` | `#f9fafb` | `gray-50` | `--color-gray-50` |
| `Error/500` | `#ef4444` | `red-500` | `--color-red-500` |
| `Error/100` | `#fee2e2` | `red-100` | `--color-red-100` |
| `Warning/500` | `#f59e0b` | `amber-500` | `--color-amber-500` |
| `Warning/100` | `#fef3c7` | `amber-100` | `--color-amber-100` |
| `Info/500` | `#3b82f6` | `blue-500` | `--color-blue-500` |
| `Info/100` | `#dbeafe` | `blue-100` | `--color-blue-100` |
| `Surface/White` | `#ffffff` | `white` | — |

### Typography

| Figma Token | Font | Size | Weight | Tailwind |
|-------------|------|------|--------|----------|
| `Heading/XL` | Inter | 24 px | Bold (700) | `text-2xl font-bold` |
| `Heading/LG` | Inter | 20 px | SemiBold (600) | `text-xl font-semibold` |
| `Heading/MD` | Inter | 18 px | SemiBold (600) | `text-lg font-semibold` |
| `Body/MD` | Inter | 14 px | Regular (400) | `text-sm` |
| `Body/SM` | Inter | 12 px | Regular (400) | `text-xs` |
| `Body/MD-Medium` | Inter | 14 px | Medium (500) | `text-sm font-medium` |
| `Label/SM` | Inter | 12 px | SemiBold (600) | `text-xs font-semibold` |
| `Label/XS` | Inter | 10 px | Medium (500) | `text-[10px] font-medium` |
| `Button/MD` | Inter | 14 px | SemiBold (600) | `text-sm font-semibold` |
| `Button/SM` | Inter | 12 px | SemiBold (600) | `text-xs font-semibold` |

### Spacing

| Figma Token | Value | Tailwind |
|-------------|-------|----------|
| `Space/1` | 4 px | `p-1` / `gap-1` |
| `Space/1.5` | 6 px | `p-1.5` / `gap-1.5` |
| `Space/2` | 8 px | `p-2` / `gap-2` |
| `Space/3` | 12 px | `p-3` / `gap-3` |
| `Space/4` | 16 px | `p-4` / `gap-4` |
| `Space/5` | 20 px | `p-5` / `gap-5` |
| `Space/6` | 24 px | `p-6` / `gap-6` |
| `Space/8` | 32 px | `p-8` / `gap-8` |
| `Space/16` | 64 px | `p-16` / `gap-16` |
| `Space/20` | 80 px | `p-20` / `gap-20` |

### Border Radius

| Figma Token | Value | Tailwind |
|-------------|-------|----------|
| `Radius/SM` | 4 px | `rounded` |
| `Radius/MD` | 6 px | `rounded-md` |
| `Radius/LG` | 8 px | `rounded-lg` |
| `Radius/XL` | 12 px | `rounded-xl` |
| `Radius/2XL` | 16 px | `rounded-2xl` |
| `Radius/Full` | 9999 px | `rounded-full` |

### Shadows

| Figma Token | CSS Value | Tailwind |
|-------------|-----------|----------|
| `Shadow/SM` | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-sm` |
| `Shadow/MD` | `0 4px 6px rgba(0,0,0,0.07)` | `shadow-md` |
| `Shadow/LG` | `0 10px 15px rgba(0,0,0,0.1)` | `shadow-lg` |

---

## Syncing Figma ↔ Code

### Recommended Workflow

1. **Design in Figma** using the shared component library and design tokens
2. **Export assets** (icons, illustrations) as SVG to `/public/assets/`
3. **Inspect Figma** for spacing, colours, and typography — then map to Tailwind classes using the tables above
4. **Build in code** using shadcn/ui components as the base, styled with Tailwind utilities
5. **Review** the built screen against the Figma mock at 375 px viewport width

### Tools & Plugins (Recommended)

| Tool | Purpose |
|------|---------|
| **Figma Dev Mode** | Inspect designs and extract CSS/Tailwind values |
| **Figma Tokens Studio** | Manage design tokens in Figma with JSON export |
| **Storybook** *(future)* | Visual testing of components in isolation |
| **Chromatic** *(future)* | Visual regression testing against Figma screenshots |

### Export Conventions

| Asset Type | Format | Location | Naming |
|------------|--------|----------|--------|
| Icons | SVG | `/public/icons/` | `kebab-case.svg` (e.g., `shopping-cart.svg`) |
| Illustrations | SVG | `/public/illustrations/` | `kebab-case.svg` (e.g., `empty-cart.svg`) |
| Banners | WebP / PNG | `/public/banners/` | `banner-{slug}.webp` |
| Favicons | ICO + PNG | `/public/` | `favicon.ico`, `icon-192.png`, `icon-512.png` |

---

## Design Review Checklist

Before marking a screen as "design complete," verify:

- [ ] Figma frame is set to 375 px width (iPhone SE / mobile-first)
- [ ] All colours use shared Figma tokens (no hard-coded hex values)
- [ ] Typography uses the defined type scale
- [ ] Spacing follows the 4 px grid
- [ ] Interactive states are documented (default, hover, pressed, disabled, focus)
- [ ] Loading skeleton is provided for async screens
- [ ] Empty state is designed
- [ ] Error state is designed
- [ ] Accessibility: contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for large text
- [ ] Dark mode variants *(future — not required for v1)*

---

## Contact

| Role | Name | Figma Handle |
|------|------|-------------|
| Design Lead | *(TBD)* | *(TBD)* |
| Product Manager | *(TBD)* | *(TBD)* |
| Frontend Lead | *(TBD)* | *(TBD)* |

---

*Last updated: 2026-02-06*
