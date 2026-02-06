"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ChevronRight, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingScreen, EmptyState } from "@/components/shared/LoadingSpinner";
import { OrderService } from "@/network/services/orderService";
import { Order, OrderStatus } from "@/types";

const statusColors: Record<OrderStatus, string> = {
  created: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  packing: "bg-purple-100 text-purple-800",
  out_for_delivery: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refund_initiated: "bg-amber-100 text-amber-800",
  refunded: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<OrderStatus, string> = {
  created: "Created",
  confirmed: "Confirmed",
  packing: "Packing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refund_initiated: "Refund Pending",
  refunded: "Refunded",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderService.getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  if (orders.length === 0) {
    return (
      <div>
        <PageHeader title="My Orders" />
        <EmptyState icon="📦" title="No orders yet" description="Start shopping to see your orders here" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="My Orders" />
      <div className="px-4 py-4 space-y-3">
        {orders.map((order) => (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <div className="p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors mb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 font-mono">{order.id}</span>
                </div>
                <Badge className={`text-[10px] ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </Badge>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium">
                  {order.items.slice(0, 2).map((i) => i.name).join(", ")}
                  {order.items.length > 2 && ` +${order.items.length - 2} more`}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold">₹{order.total}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {order.etaChangedAfterOrder && (
                  <div className="mt-2 flex items-center gap-1 text-amber-600">
                    <AlertCircle className="w-3 h-3" />
                    <span className="text-[10px]">
                      ETA was updated after order placement
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end mt-1">
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
