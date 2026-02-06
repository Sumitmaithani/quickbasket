"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin, Clock, Package, CheckCircle, Truck, AlertCircle,
  Headphones, RotateCcw, XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingScreen } from "@/components/shared/LoadingSpinner";
import { OrderService } from "@/network/services/orderService";
import { ADDRESSES } from "@/data/users";
import { Order, OrderTimeline, OrderStatus } from "@/types";
import { toast } from "sonner";

const timelineIcons: Record<OrderStatus, React.ReactNode> = {
  created: <Package className="w-4 h-4" />,
  confirmed: <CheckCircle className="w-4 h-4" />,
  packing: <Package className="w-4 h-4" />,
  out_for_delivery: <Truck className="w-4 h-4" />,
  delivered: <CheckCircle className="w-4 h-4" />,
  cancelled: <XCircle className="w-4 h-4" />,
  refund_initiated: <RotateCcw className="w-4 h-4" />,
  refunded: <CheckCircle className="w-4 h-4" />,
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    OrderService.getOrderById(id).then((data) => {
      setOrder(data || null);
      setLoading(false);
    });
  }, [id]);

  const handleCancel = async () => {
    if (!order) return;
    setCancelling(true);
    const result = await OrderService.cancelOrder(order.id);
    if (result.success) {
      toast.success(result.message);
      router.push("/orders");
    } else {
      toast.error(result.message);
    }
    setCancelling(false);
  };

  if (loading) return <LoadingScreen />;
  if (!order) {
    return (
      <div>
        <PageHeader title="Order" showBack />
        <div className="text-center py-16">
          <p className="text-gray-500">Order not found</p>
        </div>
      </div>
    );
  }

  const address = ADDRESSES.find((a) => a.id === order.addressId);
  const canCancel = ["created", "confirmed"].includes(order.status);

  return (
    <div>
      <PageHeader title={`Order ${order.id}`} showBack />

      <div className="px-4 py-4 space-y-4 pb-8">
        {/* Status Header */}
        <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
          <Badge className="text-xs mb-2">
            {order.status.replace(/_/g, " ").toUpperCase()}
          </Badge>
          {order.status === "out_for_delivery" && (
            <div className="mt-2">
              <p className="text-2xl font-bold text-green-600">
                {order.estimatedDeliveryMinutes} min
              </p>
              <p className="text-xs text-gray-500">Estimated delivery time</p>
            </div>
          )}
          {order.etaChangedAfterOrder && (
            <div className="mt-3 p-2 bg-amber-50 rounded-lg flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-amber-800">ETA Updated</p>
                <p className="text-[10px] text-amber-600">
                  Original: {order.originalEtaMinutes} min → Now: {order.estimatedDeliveryMinutes} min
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Map placeholder */}
        {["out_for_delivery", "packing"].includes(order.status) && (
          <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-xs text-gray-500 mt-1">Live tracking map</p>
              <p className="text-[10px] text-gray-400">(placeholder)</p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <h3 className="text-sm font-semibold mb-3">Order Timeline</h3>
          <div className="space-y-0">
            {order.timeline.map((event: OrderTimeline, idx: number) => (
              <div key={idx} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    idx === order.timeline.length - 1
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    {timelineIcons[event.status]}
                  </div>
                  {idx < order.timeline.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium capitalize">
                    {event.status.replace(/_/g, " ")}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {new Date(event.timestamp).toLocaleString("en-IN")}
                  </p>
                  {event.note && (
                    <p className="text-[10px] text-amber-600 mt-0.5">{event.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <h3 className="text-sm font-semibold mb-3">Items</h3>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-lg">
                  📦
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.unit} × {item.quantity}
                  </p>
                  {item.unavailableAtPacking && (
                    <p className="text-[10px] text-red-500">❌ Unavailable during packing</p>
                  )}
                  {item.substitutedWith && (
                    <p className="text-[10px] text-amber-600">
                      ↳ Substituted with: {item.substitutedWith}
                    </p>
                  )}
                </div>
                <span className="text-sm font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery info */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <h3 className="text-sm font-semibold mb-2">Delivery Details</h3>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>{address?.line1}, {address?.line2}, {address?.city}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <p>{order.estimatedDeliveryMinutes} min estimated</p>
          </div>
        </div>

        {/* Bill */}
        <div className="p-4 bg-white rounded-xl border border-gray-100 space-y-1">
          <h3 className="text-sm font-semibold mb-2">Bill Details</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-₹{order.discount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span>{order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}</span>
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {canCancel && (
            <Button
              variant="outline"
              className="flex-1 text-red-600 border-red-200"
              onClick={handleCancel}
              disabled={cancelling}
            >
              {cancelling ? "Cancelling..." : "Cancel Order"}
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push(`/support?orderId=${order.id}`)}
          >
            <Headphones className="w-4 h-4 mr-1" />
            Get Help
          </Button>
        </div>
      </div>
    </div>
  );
}
