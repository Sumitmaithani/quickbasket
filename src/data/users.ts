import { User, Address, SavedPaymentMethod } from "@/types";

export const MOCK_USER: User = {
  id: "user_1",
  name: "Priya Sharma",
  phone: "+91 98765 43210",
  email: "priya.sharma@email.com",
  avatarUrl: undefined,
  isMember: false,
  membershipPlanId: undefined,
  preferences: {
    vegOnly: false,
    noBag: false,
    ecoPacking: false,
    notificationsEnabled: true,
  },
  defaultAddressId: "addr_1",
  createdAt: "2025-08-15T10:30:00Z",
};

export const ADDRESSES: Address[] = [
  {
    id: "addr_1", userId: "user_1", label: "Home", line1: "42, 3rd Cross, 6th Block",
    line2: "Koramangala", city: "Bengaluru", state: "Karnataka", pincode: "560095",
    lat: 12.9352, lng: 77.6245, zoneId: "zone_1", isDefault: true,
  },
  {
    id: "addr_2", userId: "user_1", label: "Office", line1: "Tech Park Tower B, 5th Floor",
    line2: "Outer Ring Road, Marathahalli", city: "Bengaluru", state: "Karnataka", pincode: "560037",
    lat: 12.9563, lng: 77.7010, zoneId: "zone_4", isDefault: false,
  },
  {
    id: "addr_3", userId: "user_1", label: "Mom's Place", line1: "15, 2nd Main, 4th Block",
    line2: "Jayanagar", city: "Bengaluru", state: "Karnataka", pincode: "560011",
    lat: 12.9250, lng: 77.5938, zoneId: "zone_5", isDefault: false,
  },
];

export const SAVED_PAYMENT_METHODS: SavedPaymentMethod[] = [
  { id: "pm_1", userId: "user_1", method: "upi", label: "priya@okaxis", isDefault: true },
  { id: "pm_2", userId: "user_1", method: "card", label: "HDFC Visa ••••1234", isDefault: false },
  { id: "pm_3", userId: "user_1", method: "wallet", label: "QuickPay Wallet (₹340)", isDefault: false },
  { id: "pm_4", userId: "user_1", method: "cod", label: "Cash on Delivery", isDefault: false },
];
