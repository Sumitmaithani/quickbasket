import { CATEGORIES } from "@/data/categories";
import { ITEMS } from "@/data/items";
import { BANNERS } from "@/data/banners";
import { Category, Item, Banner } from "@/types";
import { simulateDelay } from "./delay";

export const CatalogService = {
  async getCategories(): Promise<Category[]> {
    await simulateDelay();
    return CATEGORIES;
  },

  async getItemsByCategory(categorySlug: string): Promise<Item[]> {
    await simulateDelay();
    return ITEMS.filter((item) => item.categorySlug === categorySlug);
  },

  async getItemById(id: string): Promise<Item | undefined> {
    await simulateDelay(100, 400);
    return ITEMS.find((item) => item.id === id);
  },

  async searchItems(query: string): Promise<Item[]> {
    await simulateDelay(150, 500);
    const q = query.toLowerCase();
    return ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q)
    );
  },

  async getFrequentlyBought(): Promise<Item[]> {
    await simulateDelay(100, 300);
    return ITEMS.filter((item) => item.frequentlyBought);
  },

  async getBanners(): Promise<Banner[]> {
    await simulateDelay(100, 300);
    return BANNERS.filter((b) => b.isActive);
  },
};
