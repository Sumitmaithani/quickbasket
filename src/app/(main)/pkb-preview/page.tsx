"use client";

import { useState } from "react";
import { FileText, Download, Copy, Check, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageHeader";
import { toast } from "sonner";

const docs = [
  { file: "01_product_overview.md", title: "Product Overview" },
  { file: "02_personas_and_jobs_to_be_done.md", title: "Personas & Jobs to Be Done" },
  { file: "03_user_flows.md", title: "User Flows" },
  { file: "04_policies_and_constraints.md", title: "Policies & Constraints" },
  { file: "05_data_model.md", title: "Data Model" },
  { file: "06_analytics_events.md", title: "Analytics Events" },
  { file: "07_known_issues_and_debt.md", title: "Known Issues & Tech Debt" },
];

const transcripts = Array.from({ length: 25 }, (_, i) => {
  const id = String(i + 1).padStart(3, "0");
  const names = [
    "stock_flip_at_checkout", "eta_changed_after_order", "coupon_not_applied",
    "coupon_conditions_unclear", "payment_success_no_order", "refund_delayed",
    "wrong_item_delivered", "damaged_item_replacement", "order_tracking_stuck",
    "address_change_failed", "membership_benefits_not_applied", "no_bag_option_confusion",
    "missing_items_not_notified", "app_froze_during_checkout", "cold_coffee_leaking",
    "overripe_mangoes", "search_not_finding_items", "delivery_person_lost",
    "upi_payment_failed_debited", "stale_bread_near_expiry", "member_coupon_confusion",
    "floor_cleaner_cap_loose", "eco_packing_too_much_paper", "discount_rounding_issue",
    "default_delivery_slot_request",
  ];
  return { file: `${id}_${names[i]}.txt`, title: names[i].replace(/_/g, " ") };
});

const designDocs = [
  { file: "01_screen_inventory_map.md", title: "Screen Inventory Map" },
  { file: "02_component_catalog.md", title: "Component Catalog" },
  { file: "03_copy_and_microcopy.md", title: "Copy & Microcopy" },
  { file: "04_future_mockups_notes.md", title: "Future Mockup Notes" },
  { file: "figma_link.md", title: "Figma Link (Placeholder)" },
];

export default function PkbPreviewPage() {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleCopy = (filename: string) => {
    navigator.clipboard.writeText(`/pkb/docs/${filename}`);
    setCopiedFile(filename);
    toast.success("Path copied to clipboard");
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div>
      <PageHeader title="PKB Preview" showBack />

      <div className="px-4 py-4">
        <div className="p-4 bg-blue-50 rounded-xl mb-4">
          <h2 className="text-sm font-semibold text-blue-900">
            Product Knowledge Base
          </h2>
          <p className="text-xs text-blue-700 mt-1">
            These artifacts are ready for your Cursor-for-PM agent. Files are in the{" "}
            <code className="bg-blue-100 px-1 rounded">/pkb</code> folder.
          </p>
        </div>

        <Tabs defaultValue="docs">
          <TabsList className="w-full">
            <TabsTrigger value="docs" className="flex-1 text-xs">
              Docs ({docs.length})
            </TabsTrigger>
            <TabsTrigger value="transcripts" className="flex-1 text-xs">
              Transcripts ({transcripts.length})
            </TabsTrigger>
            <TabsTrigger value="design" className="flex-1 text-xs">
              Design ({designDocs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="docs" className="space-y-2 mt-4">
            {docs.map((doc) => (
              <div
                key={doc.file}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100"
              >
                <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{doc.title}</p>
                  <p className="text-[10px] text-gray-400 font-mono truncate">
                    /pkb/docs/{doc.file}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(doc.file)}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  {copiedFile === doc.file ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="transcripts" className="space-y-2 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-[10px]">
                25 support transcripts
              </Badge>
            </div>
            {transcripts.map((t) => (
              <div
                key={t.file}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100"
              >
                <FolderOpen className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm capitalize">{t.title}</p>
                  <p className="text-[10px] text-gray-400 font-mono truncate">
                    /pkb/support_transcripts/{t.file}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="design" className="space-y-2 mt-4">
            {designDocs.map((doc) => (
              <div
                key={doc.file}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100"
              >
                <Download className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{doc.title}</p>
                  <p className="text-[10px] text-gray-400 font-mono truncate">
                    /pkb/design/{doc.file}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
