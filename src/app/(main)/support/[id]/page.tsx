"use client";

import { useState, useEffect, use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingScreen } from "@/components/shared/LoadingSpinner";
import { SupportService } from "@/network/services/supportService";
import { SupportTicket, TicketMessage } from "@/types";
import { toast } from "sonner";

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    SupportService.getTicketById(id).then((data) => {
      setTicket(data || null);
      setLoading(false);
    });
  }, [id]);

  const handleSend = async () => {
    if (!message.trim() || !ticket) return;
    setSending(true);
    await SupportService.sendMessage(ticket.id, message);
    const newMsg: TicketMessage = {
      id: `msg_new_${Date.now()}`,
      sender: "customer",
      message,
      timestamp: new Date().toISOString(),
    };
    setTicket({ ...ticket, messages: [...ticket.messages, newMsg] });
    setMessage("");
    toast.success("Message sent");
    setSending(false);
  };

  if (loading) return <LoadingScreen />;
  if (!ticket) {
    return (
      <div>
        <PageHeader title="Ticket" showBack />
        <p className="text-center py-16 text-gray-500">Ticket not found</p>
      </div>
    );
  }

  const resolutionLabel =
    ticket.resolution === "pending" ? "Pending" :
    ticket.resolution === "refund" ? "Refund" :
    ticket.resolution === "replacement" ? "Replacement" :
    ticket.resolution === "credit" ? "Store Credit" :
    ticket.resolution === "explanation" ? "Explanation" : "No Action";

  return (
    <div>
      <PageHeader title={`Ticket ${ticket.id}`} showBack />

      <div className="px-4 py-4 space-y-4 pb-32">
        {/* Header */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <h2 className="text-base font-semibold">{ticket.subject}</h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="outline" className="text-[10px]">
              {ticket.category.replace(/_/g, " ")}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Severity: {ticket.severity}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Resolution: {resolutionLabel}
            </Badge>
          </div>
          {ticket.orderId && (
            <p className="text-xs text-gray-500 mt-2 font-mono">
              Order: {ticket.orderId}
            </p>
          )}
        </div>

        <Separator />

        {/* Messages */}
        <div className="space-y-3">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.sender === "customer"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-xs font-medium mb-1">
                  {msg.sender === "customer" ? "You" : "Support Agent"}
                </p>
                <p className="text-sm">{msg.message}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    msg.sender === "customer" ? "text-green-200" : "text-gray-400"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply bar */}
      {ticket.status !== "closed" && (
        <div className="fixed bottom-16 left-0 right-0 z-30">
          <div className="mx-auto max-w-lg bg-white border-t border-gray-200 px-4 py-3 flex gap-2">
            <Textarea
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 min-h-[40px] max-h-20 text-sm"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim() || sending}
              className="bg-green-600 self-end"
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
