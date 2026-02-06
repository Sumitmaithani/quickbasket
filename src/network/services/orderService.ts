import { ORDERS, PAYMENTS, DELIVERY_SLOTS } from "@/data/orders";
import { Order, Payment, DeliverySlot } from "@/types";
import { simulateDelay } from "./delay";

export const OrderService = {
  async getOrders(): Promise<Order[]> {
    await simulateDelay();
    return [...ORDERS].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getOrderById(id: string): Promise<Order | undefined> {
    await simulateDelay(100, 400);
    return ORDERS.find((o) => o.id === id);
  },

  async getDeliverySlots(): Promise<DeliverySlot[]> {
    await simulateDelay(100, 300);
    return DELIVERY_SLOTS;
  },

  async getPaymentById(id: string): Promise<Payment | undefined> {
    await simulateDelay(100, 300);
    return PAYMENTS.find((p) => p.id === id);
  },

  async getOrphanedPayment(): Promise<Payment | undefined> {
    await simulateDelay(100, 200);
    return PAYMENTS.find((p) => p.orderCreationFailed);
  },

  async cancelOrder(orderId: string): Promise<{ success: boolean; message: string }> {
    await simulateDelay(300, 600);
    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) return { success: false, message: "Order not found" };
    if (order.status === "out_for_delivery" || order.status === "delivered") {
      return { success: false, message: "Cannot cancel order in current status" };
    }
    return { success: true, message: "Order cancelled. Refund will be initiated within 24 hours." };
  },

  async placeOrder(): Promise<{ success: boolean; orderId: string }> {
    await simulateDelay(500, 1200);
    // Simulate: 90% success, 10% the "payment success but order fails" scenario
    const willFail = Math.random() < 0.1;
    if (willFail) {
      return { success: false, orderId: "" };
    }
    return { success: true, orderId: `ord_new_${Date.now()}` };
  },
};
