"use client";

import { useState, useEffect } from "react";
import { Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingScreen } from "@/components/shared/LoadingSpinner";
import { useAuthStore } from "@/store/authStore";
import { MembershipService } from "@/network/services/membershipService";
import { MembershipPlan } from "@/types";
import { toast } from "sonner";

export default function MembershipPage() {
  const { user, setMembership } = useAuthStore();
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    MembershipService.getPlans().then((data) => {
      setPlans(data);
      setLoading(false);
    });
  }, []);

  const handleSubscribe = async (planId: string) => {
    setSubscribing(planId);
    const result = await MembershipService.subscribe(planId, billingCycle);
    if (result.success) {
      setMembership(planId);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setSubscribing(null);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title="Membership" showBack />

      <div className="px-4 py-4 space-y-6">
        {/* Header */}
        <div className="text-center py-4">
          <Crown className="w-12 h-12 text-amber-500 mx-auto mb-2" />
          <h1 className="text-xl font-bold">QuickBasket Membership</h1>
          <p className="text-sm text-gray-500 mt-1">
            Unlock exclusive benefits and save more on every order
          </p>
          {user?.isMember && (
            <Badge className="mt-2 bg-amber-100 text-amber-800">
              Current: {plans.find((p) => p.id === user.membershipPlanId)?.name || "Member"}
            </Badge>
          )}
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "annual"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Annual
              <span className="text-[10px] text-green-600 ml-1">Save 30%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        {plans.map((plan) => {
          const isCurrentPlan = user?.membershipPlanId === plan.id;
          const price =
            billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
          const period = billingCycle === "monthly" ? "/month" : "/year";

          return (
            <div
              key={plan.id}
              className={`p-5 rounded-2xl border-2 ${
                plan.tier === "plus"
                  ? "border-amber-300 bg-amber-50/50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  {plan.tier === "plus" && (
                    <Badge className="bg-amber-500 text-white text-[10px] mt-1">
                      Most Popular
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">₹{price}</span>
                  <span className="text-xs text-gray-500">{period}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                {plan.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{benefit.title}</p>
                      <p className="text-xs text-gray-500">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full mt-4 h-11 ${
                  plan.tier === "plus"
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
                onClick={() => handleSubscribe(plan.id)}
                disabled={isCurrentPlan || subscribing === plan.id}
              >
                {isCurrentPlan
                  ? "Current Plan"
                  : subscribing === plan.id
                  ? "Subscribing..."
                  : `Start ${plan.trialDays}-Day Free Trial`}
              </Button>
            </div>
          );
        })}

        {/* FAQ */}
        <div className="p-4 bg-gray-50 rounded-xl space-y-3">
          <h3 className="text-sm font-semibold">Frequently Asked</h3>
          <div>
            <p className="text-xs font-medium">Can I cancel anytime?</p>
            <p className="text-xs text-gray-500">
              Yes, cancel anytime. Benefits remain active until the billing period ends.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">What happens after the trial?</p>
            <p className="text-xs text-gray-500">
              You&apos;ll be charged the subscription fee unless you cancel before the trial ends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
