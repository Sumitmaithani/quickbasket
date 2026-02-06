import { SUPPORT_TICKETS } from "@/data/support-tickets";
import { SupportTicket, TicketCategory } from "@/types";
import { simulateDelay } from "./delay";

export const SupportService = {
  async getTickets(): Promise<SupportTicket[]> {
    await simulateDelay();
    return [...SUPPORT_TICKETS].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getTicketById(id: string): Promise<SupportTicket | undefined> {
    await simulateDelay(100, 400);
    return SUPPORT_TICKETS.find((t) => t.id === id);
  },

  async createTicket(params: {
    orderId?: string;
    category: TicketCategory;
    subject: string;
    description: string;
  }): Promise<SupportTicket> {
    await simulateDelay(400, 800);
    const newTicket: SupportTicket = {
      id: `tkt_new_${Date.now()}`,
      userId: "user_1",
      orderId: params.orderId,
      category: params.category,
      severity: "medium",
      status: "open",
      resolution: "pending",
      subject: params.subject,
      description: params.description,
      messages: [
        {
          id: `msg_new_1`,
          sender: "customer",
          message: params.description,
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newTicket;
  },

  async sendMessage(
    ticketId: string,
    message: string
  ): Promise<{ success: boolean }> {
    await simulateDelay(200, 500);
    void ticketId;
    void message;
    return { success: true };
  },
};
