import { MOCK_USER, ADDRESSES, SAVED_PAYMENT_METHODS } from "@/data/users";
import { User, Address, SavedPaymentMethod } from "@/types";
import { simulateDelay } from "./delay";

export const UserService = {
  async login(phone: string): Promise<{ success: boolean; message: string }> {
    await simulateDelay(300, 800);
    if (phone.length >= 10) {
      return { success: true, message: "OTP sent to your phone" };
    }
    return { success: false, message: "Invalid phone number" };
  },

  async verifyOtp(_otp: string): Promise<{ success: boolean; user: User }> {
    await simulateDelay(300, 600);
    // Always succeeds for demo
    return { success: true, user: MOCK_USER };
  },

  async getProfile(): Promise<User> {
    await simulateDelay(100, 300);
    return MOCK_USER;
  },

  async getAddresses(): Promise<Address[]> {
    await simulateDelay(100, 300);
    return ADDRESSES;
  },

  async getPaymentMethods(): Promise<SavedPaymentMethod[]> {
    await simulateDelay(100, 300);
    return SAVED_PAYMENT_METHODS;
  },
};
