"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Clock, CreditCard, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingScreen, EmptyState } from "@/components/shared/LoadingSpinner";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { OrderService } from "@/network/services/orderService";
import { SAVED_PAYMENT_METHODS } from "@/data/users";
import { DeliverySlot } from "@/types";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, packingPreference, clearCart } = useCartStore();
  const { addresses, selectedAddressId, selectAddress } = useAuthStore();
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const [slots, setSlots] = useState<DeliverySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState(SAVED_PAYMENT_METHODS[0]?.id || "");
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [showStockWarning, setShowStockWarning] = useState(false);

  const sub = subtotal();
  const disc = discount();
  const selectedSlotData = slots.find((s) => s.id === selectedSlot);
  const deliveryFee = selectedSlotData?.fee ?? (sub >= 149 ? 0 : 15);
  const packingFee = packingPreference === "eco_friendly" ? 5 : 0;
  const total = sub - disc + deliveryFee + packingFee;

  useEffect(() => {
    OrderService.getDeliverySlots().then((s) => {
      setSlots(s);
      setSelectedSlot(s[1]?.id || s[0]?.id || "");
      setLoading(false);
    });
    // 20% chance to show stock warning for demo
    setShowStockWarning(Math.random() < 0.2);
  }, []);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    const result = await OrderService.placeOrder();
    if (result.success) {
      clearCart();
      toast.success("Order placed successfully!");
      router.push("/orders");
    } else {
      toast.error(
        "Payment was processed but order creation failed. Please contact support.",
        { duration: 5000 }
      );
      setPlacing(false);
    }
  };

  if (loading) return <LoadingScreen />;

  if (items.length === 0) {
    return (
      <div>
        <PageHeader title="Checkout" showBack />
        <EmptyState icon="🛒" title="Cart is empty" description="Add items before checkout" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Checkout" showBack />

      <div className="px-4 py-4 space-y-4 pb-44">
        {/* Stock Warning */}
        {showStockWarning && (
          <div className="p-3 bg-amber-50 rounded-xl flex items-start gap-2 border border-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-amber-800">
                Some items may become unavailable
              </p>
              <p className="text-[10px] text-amber-600 mt-0.5">
                Stock for 1-2 items in your cart has been fluctuating. If unavailable during packing, we&apos;ll remove them and adjust your total.
              </p>
            </div>
          </div>
        )}

        {/* Delivery Address */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-full p-4 bg-white rounded-xl border border-gray-100 text-left">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      Deliver to: {selectedAddress?.label}
                    </span>
                    <span className="text-xs text-green-600">Change</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedAddress?.line1}, {selectedAddress?.line2}, {selectedAddress?.city}
                  </p>
                </div>
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-w-lg mx-auto rounded-t-xl">
            <SheetHeader>
              <SheetTitle>Select Address</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => selectAddress(addr.id)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    addr.id === selectedAddressId
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        addr.id === selectedAddressId ? "text-green-600" : "text-gray-300"
                      }`}
                    />
                    <span className="text-sm font-medium">{addr.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6 mt-0.5">
                    {addr.line1}, {addr.city}
                  </p>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Delivery Slot */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">Delivery Slot</span>
          </div>
          <RadioGroup
            value={selectedSlot}
            onValueChange={setSelectedSlot}
            className="space-y-2"
          >
            {slots.map((slot) => (
              <div key={slot.id} className="flex items-center space-x-2">
                <RadioGroupItem value={slot.id} id={slot.id} />
                <Label htmlFor={slot.id} className="text-sm flex-1 flex justify-between">
                  <span>
                    {slot.label}
                    {slot.isExpress && (
                      <span className="text-[10px] text-orange-600 ml-1">⚡ Express</span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {slot.fee === 0 ? "Free" : `₹${slot.fee}`}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Payment Method */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">Payment Method</span>
          </div>
          <RadioGroup
            value={selectedPayment}
            onValueChange={setSelectedPayment}
            className="space-y-2"
          >
            {SAVED_PAYMENT_METHODS.map((pm) => (
              <div key={pm.id} className="flex items-center space-x-2">
                <RadioGroupItem value={pm.id} id={pm.id} />
                <Label htmlFor={pm.id} className="text-sm">
                  {pm.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="p-4 bg-white rounded-xl border border-gray-100 space-y-2">
          <h3 className="text-sm font-semibold">Order Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Items ({items.length})
            </span>
            <span>₹{sub}</span>
          </div>
          {disc > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-₹{disc}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
          </div>
          {packingFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Eco packing</span>
              <span>₹{packingFee}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30">
        <div className="mx-auto max-w-lg bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            <span className="text-lg font-bold">₹{total}</span>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white px-8 h-11"
            onClick={handlePlaceOrder}
            disabled={placing}
          >
            {placing ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
