"use client";

import { Item } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

interface ItemCardProps {
  item: Item;
  compact?: boolean;
}

export function ItemCard({ item, compact = false }: ItemCardProps) {
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const defaultVariant = item.variants.find((v) => v.isDefault) || item.variants[0];

  const cartItem = items.find(
    (ci) => ci.itemId === item.id && ci.variantId === defaultVariant.id
  );
  const qty = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      itemId: item.id,
      variantId: defaultVariant.id,
      quantity: 1,
      name: item.name,
      imageUrl: item.imageUrl,
      price: defaultVariant.price,
      mrp: defaultVariant.mrp,
      unit: defaultVariant.label,
    });
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty <= 1) {
      removeItem(item.id, defaultVariant.id);
    } else {
      updateQuantity(item.id, defaultVariant.id, qty - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(item.id, defaultVariant.id, qty + 1);
  };

  const discountPercent =
    defaultVariant.mrp > defaultVariant.price
      ? Math.round(
          ((defaultVariant.mrp - defaultVariant.price) / defaultVariant.mrp) * 100
        )
      : 0;

  if (compact) {
    return (
      <Link href={`/item/${item.id}`} className="block">
        <div className="bg-white rounded-xl border border-gray-100 p-3 flex gap-3 hover:shadow-sm transition-shadow">
          <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
            {item.categorySlug === "fruits-vegetables" ? "🥬" :
             item.categorySlug === "dairy-breakfast" ? "🥛" :
             item.categorySlug === "snacks-beverages" ? "🍿" :
             item.categorySlug === "household-essentials" ? "🧹" : "🧴"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-xs text-gray-500">{defaultVariant.label}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold">₹{defaultVariant.price}</span>
              {discountPercent > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{defaultVariant.mrp}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-end">
            {qty === 0 ? (
              <Button size="sm" variant="outline" onClick={handleAdd} className="h-8 text-green-600 border-green-600 hover:bg-green-50">
                ADD
              </Button>
            ) : (
              <div className="flex items-center gap-1 bg-green-600 rounded-lg">
                <button onClick={handleDecrement} className="p-1.5 text-white">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-white text-sm font-medium w-5 text-center">{qty}</span>
                <button onClick={handleIncrement} className="p-1.5 text-white">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/item/${item.id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-sm transition-shadow relative">
        {item.tags.includes("bestseller") && (
          <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] px-1.5 py-0">
            Bestseller
          </Badge>
        )}
        {item.tags.includes("organic") && (
          <Badge className="absolute top-2 left-2 bg-green-700 text-white text-[10px] px-1.5 py-0">
            Organic
          </Badge>
        )}
        {item.tags.includes("new") && (
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-1.5 py-0">
            New
          </Badge>
        )}
        <div className="w-full aspect-square rounded-lg bg-gray-50 flex items-center justify-center text-4xl mb-2">
          {item.categorySlug === "fruits-vegetables" ? "🥬" :
           item.categorySlug === "dairy-breakfast" ? "🥛" :
           item.categorySlug === "snacks-beverages" ? "🍿" :
           item.categorySlug === "household-essentials" ? "🧹" : "🧴"}
        </div>
        <p className="text-xs text-gray-500">{item.brand}</p>
        <p className="text-sm font-medium truncate mt-0.5">{item.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{defaultVariant.label}</p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-sm font-semibold">₹{defaultVariant.price}</span>
            {discountPercent > 0 && (
              <>
                <span className="text-xs text-gray-400 line-through ml-1">
                  ₹{defaultVariant.mrp}
                </span>
                <span className="text-xs text-green-600 ml-1">{discountPercent}% off</span>
              </>
            )}
          </div>
          {qty === 0 ? (
            <Button size="sm" variant="outline" onClick={handleAdd} className="h-7 text-xs text-green-600 border-green-600 hover:bg-green-50 px-3">
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-0.5 bg-green-600 rounded-lg">
              <button onClick={handleDecrement} className="p-1.5 text-white">
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-white text-xs font-medium w-4 text-center">{qty}</span>
              <button onClick={handleIncrement} className="p-1.5 text-white">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
