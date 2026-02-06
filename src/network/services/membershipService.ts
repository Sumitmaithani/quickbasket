import { MEMBERSHIP_PLANS } from "@/data/membership";
import { MembershipPlan } from "@/types";
import { simulateDelay } from "./delay";

export const MembershipService = {
  async getPlans(): Promise<MembershipPlan[]> {
    await simulateDelay();
    return MEMBERSHIP_PLANS;
  },

  async subscribe(
    planId: string,
    _billing: "monthly" | "annual"
  ): Promise<{ success: boolean; message: string }> {
    await simulateDelay(500, 1000);
    const plan = MEMBERSHIP_PLANS.find((p) => p.id === planId);
    if (!plan) return { success: false, message: "Plan not found" };
    return {
      success: true,
      message: `Welcome to ${plan.name}! Your ${plan.trialDays}-day free trial has started.`,
    };
  },
};
