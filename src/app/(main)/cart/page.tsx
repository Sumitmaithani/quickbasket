"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, Tag, Leaf, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/LoadingSpinner";
import { useCartStore } from "@/store/cartStore";
import { CouponService } from "@/network/services/couponService";
import { COUPONS } from "@/data/coupons";
import { Coupon } from "@/types";
import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    appliedCoupon,
    packingPreference,
    deliveryInstructions,
    subtotal,
    discount,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    setPackingPreference,
    setDeliveryInstructions,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponSheet, setCouponSheet] = useState(false);

  const sub = subtotal();
  const disc = discount();
  const deliveryFee = sub >= 149 ? 0 : 15;
  const packingFee = packingPreference === "eco_friendly" ? 5 : 0;
  const total = sub - disc + deliveryFee + packingFee;

  const handleApplyCoupon = async (code: string) => {
    setCouponLoading(true);
    const result = await CouponService.validateCoupon(code, sub, false, false, {});
    if (result.valid && result.coupon) {
      applyCoupon(result.coupon);
      toast.success(`Coupon ${code} applied!`);
      setCouponSheet(false);
    } else {
      toast.error(result.reason || "Invalid coupon");
    }
    setCouponLoading(false);
  };

  if (items.length === 0) {
    return (
      <div>
        <PageHeader title="Cart" />
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Add items from the home page to get started"
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={`Cart (${items.length} items)`} />

      <div className="px-4 py-4 space-y-4 pb-44">
        {/* Cart Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={`${item.itemId}-${item.variantId}`}
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                🛒
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.unit}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold">
                    ₹{item.price * item.quantity}
                  </span>
                  {item.mrp > item.price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{item.mrp * item.quantity}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(item.itemId, item.variantId)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-0.5 bg-green-600 rounded-lg">
                  <button
                    onClick={() =>
                      item.quantity <= 1
                        ? removeItem(item.itemId, item.variantId)
                        : updateQuantity(item.itemId, item.variantId, item.quantity - 1)
                    }
                    className="p-1.5 text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-white text-xs font-medium w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.itemId, item.variantId, item.quantity + 1)
                    }
                    className="p-1.5 text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon Section */}
        <Sheet open={couponSheet} onOpenChange={setCouponSheet}>
          <SheetTrigger asChild>
            <button className="w-full p-3 rounded-xl border border-dashed border-green-300 bg-green-50 flex items-center gap-3">
              <Tag className="w-5 h-5 text-green-600" />
              <div className="flex-1 text-left">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-green-700">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-xs text-green-600 ml-2">
                        -₹{disc}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCoupon();
                        toast.info("Coupon removed");
                      }}
                      className="text-xs text-red-500 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-green-700">Apply Coupon</span>
                )}
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-w-lg mx-auto rounded-t-xl">
            <SheetHeader>
              <SheetTitle>Apply Coupon</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleApplyCoupon(couponCode)}
                  disabled={!couponCode || couponLoading}
                  className="bg-green-600"
                >
                  Apply
                </Button>
              </div>
              <Separator />
              <p className="text-xs text-gray-500">Available Coupons</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {COUPONS.filter((c) => c.isActive && c.code !== "HIDDEN99").map(
                  (coupon: Coupon) => (
                    <button
                      key={coupon.id}
                      onClick={() => handleApplyCoupon(coupon.code)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono font-bold text-green-700">
                          {coupon.code}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Min ₹{coupon.minBasketValue}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {coupon.description}
                      </p>
                    </button>
                  )
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Packing Preference */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <PackageOpen className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">Packing Preference</span>
          </div>
          <RadioGroup
            value={packingPreference}
            onValueChange={(v) => setPackingPreference(v as "standard" | "no_bag" | "eco_friendly")}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="text-sm">Standard bag</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no_bag" id="no_bag" />
              <Label htmlFor="no_bag" className="text-sm flex items-center gap-1">
                No bag <Leaf className="w-3 h-3 text-green-600" />
                <span className="text-[10px] text-green-600">Save ₹10</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="eco_friendly" id="eco" />
              <Label htmlFor="eco" className="text-sm flex items-center gap-1">
                Eco-friendly bag
                <span className="text-[10px] text-gray-400">+₹5</span>
              </Label>
            </div>
          </RadioGroup>
          {packingPreference === "no_bag" && (
            <p className="text-[10px] text-amber-600 mt-2 p-2 bg-amber-50 rounded">
              Note: Some items like loose vegetables may still require minimal
              packaging for hygiene reasons.
            </p>
          )}
        </div>

        {/* Delivery instructions */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <p className="text-sm font-medium mb-2">Delivery Instructions</p>
          <Textarea
            placeholder="e.g. Ring the bell twice, leave at the door..."
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
            className="text-sm"
            rows={2}
          />
        </div>

        {/* Bill Summary */}
        <div className="p-4 bg-white rounded-xl border border-gray-100 space-y-2">
          <h3 className="text-sm font-semibold">Bill Details</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Item total</span>
            <span>₹{sub}</span>
          </div>
          {disc > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Coupon discount</span>
              <span>-₹{disc}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery fee</span>
            <span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}</span>
          </div>
          {packingFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Eco packing</span>
              <span>₹{packingFee}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          {sub > 0 && (
            <p className="text-[10px] text-gray-400">
              {sub >= 149
                ? "Free delivery applied!"
                : `Add ₹${149 - sub} more for free delivery`}
            </p>
          )}
        </div>
      </div>

      {/* Bottom checkout bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30">
        <div className="mx-auto max-w-lg bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            <span className="text-lg font-bold">₹{total}</span>
            <p className="text-[10px] text-gray-500">
              {items.length} item{items.length > 1 ? "s" : ""}
            </p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white px-8 h-11"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
