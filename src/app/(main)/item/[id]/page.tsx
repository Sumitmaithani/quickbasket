"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart, Minus, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingScreen } from "@/components/shared/LoadingSpinner";
import { useCartStore } from "@/store/cartStore";
import { CatalogService } from "@/network/services/catalogService";
import { INVENTORY } from "@/data/inventory";
import { Item, ItemVariant } from "@/types";

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { items: cartItems, addItem, updateQuantity, removeItem } = useCartStore();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ItemVariant | null>(null);

  useEffect(() => {
    CatalogService.getItemById(id).then((data) => {
      setItem(data || null);
      if (data) {
        setSelectedVariant(
          data.variants.find((v) => v.isDefault) || data.variants[0]
        );
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (!item || !selectedVariant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-gray-500">Item not found</p>
        <Button variant="link" onClick={() => router.back()}>Go back</Button>
      </div>
    );
  }

  const inv = INVENTORY.find(
    (r) => r.itemId === item.id && r.variantId === selectedVariant.id
  );
  const cartItem = cartItems.find(
    (ci) => ci.itemId === item.id && ci.variantId === selectedVariant.id
  );
  const qty = cartItem?.quantity || 0;
  const discountPercent =
    selectedVariant.mrp > selectedVariant.price
      ? Math.round(
          ((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100
        )
      : 0;

  const handleAdd = () => {
    addItem({
      itemId: item.id,
      variantId: selectedVariant.id,
      quantity: 1,
      name: item.name,
      imageUrl: item.imageUrl,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      unit: selectedVariant.label,
    });
  };

  return (
    <div>
      <PageHeader
        title=""
        showBack
        rightAction={
          <button onClick={() => router.push("/cart")} className="relative p-1">
            <ShoppingCart className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 pb-32">
        {/* Image placeholder */}
        <div className="w-full aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-7xl mb-4">
          {item.categorySlug === "fruits-vegetables" ? "🥬" :
           item.categorySlug === "dairy-breakfast" ? "🥛" :
           item.categorySlug === "snacks-beverages" ? "🍿" :
           item.categorySlug === "household-essentials" ? "🧹" : "🧴"}
        </div>

        {/* Tags */}
        <div className="flex gap-1 mb-2">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] capitalize">
              {tag}
            </Badge>
          ))}
          {item.isVeg && <Badge className="text-[10px] bg-green-100 text-green-800">Veg</Badge>}
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500">{item.brand}</p>
        <h1 className="text-xl font-bold mt-1">{item.name}</h1>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs">
            <Star className="w-3 h-3 fill-current" />
            <span>{item.rating}</span>
          </div>
          <span className="text-xs text-gray-500">
            {item.ratingCount.toLocaleString()} ratings
          </span>
        </div>

        {/* Inventory warning */}
        {inv?.hasSyncDelay && (
          <div className="mt-3 p-3 bg-amber-50 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-amber-800">Stock may vary</p>
              <p className="text-[10px] text-amber-600">
                This item&apos;s availability may change by the time your order is packed.
                Last synced: {new Date(inv.lastSyncedAt).toLocaleTimeString()}.
              </p>
            </div>
          </div>
        )}
        {inv?.status === "low_stock" && !inv.hasSyncDelay && (
          <p className="text-xs text-orange-600 mt-2">⚠️ Only {inv.quantity} left — order soon!</p>
        )}
        {inv?.status === "out_of_stock" && !inv.hasSyncDelay && (
          <p className="text-xs text-red-600 mt-2">Currently out of stock</p>
        )}

        {/* Variants */}
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Select Size</p>
          <div className="flex gap-2">
            {item.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  selectedVariant.id === v.id
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                <span className="font-medium">{v.label}</span>
                <span className="block text-xs mt-0.5">₹{v.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-2xl font-bold">₹{selectedVariant.price}</span>
          {discountPercent > 0 && (
            <>
              <span className="text-base text-gray-400 line-through">
                ₹{selectedVariant.mrp}
              </span>
              <span className="text-sm text-green-600 font-medium">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-1">About this product</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30">
        <div className="mx-auto max-w-lg bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <span className="text-lg font-bold">₹{selectedVariant.price}</span>
            <span className="text-xs text-gray-500 ml-1">{selectedVariant.label}</span>
          </div>
          {qty === 0 ? (
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-8 h-11"
              onClick={handleAdd}
            >
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-green-600 rounded-lg">
                <button
                  onClick={() =>
                    qty <= 1
                      ? removeItem(item.id, selectedVariant.id)
                      : updateQuantity(item.id, selectedVariant.id, qty - 1)
                  }
                  className="p-2.5 text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-medium w-6 text-center">
                  {qty}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, selectedVariant.id, qty + 1)
                  }
                  className="p-2.5 text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                variant="outline"
                className="border-green-600 text-green-600"
                onClick={() => router.push("/cart")}
              >
                View Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
