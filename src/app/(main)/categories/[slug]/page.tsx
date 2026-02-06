"use client";

import { useState, useEffect, use } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ItemCard } from "@/components/shared/ItemCard";
import { LoadingScreen } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { CatalogService } from "@/network/services/catalogService";
import { CATEGORIES } from "@/data/categories";
import { Item } from "@/types";

type SortOption = "relevance" | "price_low" | "price_high" | "rating";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = CATEGORIES.find((c) => c.slug === slug);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [vegOnly, setVegOnly] = useState(false);

  useEffect(() => {
    CatalogService.getItemsByCategory(slug).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [slug]);

  const filteredItems = items
    .filter((item) => !vegOnly || item.isVeg)
    .sort((a, b) => {
      const aPrice = a.variants.find((v) => v.isDefault)?.price ?? 0;
      const bPrice = b.variants.find((v) => v.isDefault)?.price ?? 0;
      switch (sort) {
        case "price_low":
          return aPrice - bPrice;
        case "price_high":
          return bPrice - aPrice;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title={category?.name || "Category"} showBack />

      {/* Filters */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Button
          size="sm"
          variant={vegOnly ? "default" : "outline"}
          className="text-xs h-7 flex-shrink-0"
          onClick={() => setVegOnly(!vegOnly)}
        >
          🥬 Veg Only
        </Button>
        {(["relevance", "price_low", "price_high", "rating"] as SortOption[]).map(
          (opt) => (
            <Button
              key={opt}
              size="sm"
              variant={sort === opt ? "default" : "outline"}
              className="text-xs h-7 flex-shrink-0"
              onClick={() => setSort(opt)}
            >
              {opt === "relevance" && "Relevance"}
              {opt === "price_low" && "Price: Low"}
              {opt === "price_high" && "Price: High"}
              {opt === "rating" && "Rating"}
            </Button>
          )
        )}
      </div>

      <div className="px-4 py-4">
        <p className="text-xs text-gray-500 mb-3">
          {filteredItems.length} items
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
