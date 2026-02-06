"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MessageSquare, ChevronRight, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingScreen } from "@/components/shared/LoadingSpinner";
import { SupportService } from "@/network/services/supportService";
import { SupportTicket, TicketCategory, TicketStatus } from "@/types";
import { toast } from "sonner";

const statusColors: Record<TicketStatus, string> = {
  open: "bg-red-100 text-red-800",
  in_progress: "bg-blue-100 text-blue-800",
  waiting_on_customer: "bg-amber-100 text-amber-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const categoryLabels: Record<TicketCategory, string> = {
  missing_item: "Missing Item",
  damaged_item: "Damaged Item",
  wrong_item: "Wrong Item",
  late_delivery: "Late Delivery",
  refund_delay: "Refund Delay",
  payment_issue: "Payment Issue",
  order_not_created: "Order Not Created",
  eta_changed: "ETA Changed",
  coupon_issue: "Coupon Issue",
  membership_issue: "Membership Issue",
  address_issue: "Address Issue",
  packing_issue: "Packing Issue",
  other: "Other",
};

function SupportContent() {
  const searchParams = useSearchParams();
  const prefilledOrderId = searchParams.get("orderId") || "";

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<TicketCategory>("other");
  const [newSubject, setNewSubject] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newOrderId, setNewOrderId] = useState(prefilledOrderId);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    SupportService.getTickets().then((data) => {
      setTickets(data);
      setLoading(false);
    });
  }, []);

  const handleCreate = async () => {
    if (!newSubject || !newDescription) return;
    setCreating(true);
    const ticket = await SupportService.createTicket({
      orderId: newOrderId || undefined,
      category: newCategory,
      subject: newSubject,
      description: newDescription,
    });
    setTickets((prev) => [ticket, ...prev]);
    toast.success("Support ticket created");
    setCreateOpen(false);
    setNewSubject("");
    setNewDescription("");
    setCreating(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader
        title="Support"
        rightAction={
          <Sheet open={createOpen} onOpenChange={setCreateOpen}>
            <SheetTrigger asChild>
              <button className="p-1">
                <PlusCircle className="w-5 h-5 text-green-600" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-w-lg mx-auto rounded-t-xl">
              <SheetHeader>
                <SheetTitle>New Support Ticket</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newCategory} onValueChange={(v) => setNewCategory(v as TicketCategory)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Order ID (optional)</label>
                  <Input
                    placeholder="e.g. ord_13"
                    value={newOrderId}
                    onChange={(e) => setNewOrderId(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="Brief summary of the issue"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe the issue in detail"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <Button
                  className="w-full bg-green-600"
                  onClick={handleCreate}
                  disabled={!newSubject || !newDescription || creating}
                >
                  {creating ? "Creating..." : "Submit Ticket"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        }
      />
      <div className="px-4 py-4 space-y-3">
        {tickets.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No support tickets yet</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <Link key={ticket.id} href={`/support/${ticket.id}`}>
              <div className="p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors mb-3">
                <div className="flex items-start justify-between">
                  <Badge className={`text-[10px] ${statusColors[ticket.status]}`}>
                    {ticket.status.replace(/_/g, " ")}
                  </Badge>
                  <span className="text-[10px] text-gray-400">
                    {categoryLabels[ticket.category]}
                  </span>
                </div>
                <p className="text-sm font-medium mt-2">{ticket.subject}</p>
                <div className="flex items-center justify-between mt-2">
                  {ticket.orderId && (
                    <span className="text-[10px] text-gray-500 font-mono">
                      {ticket.orderId}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400">
                    {new Date(ticket.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-end mt-1">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SupportContent />
    </Suspense>
  );
}
