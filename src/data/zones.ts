import { Zone } from "@/types";

export const ZONES: Zone[] = [
  {
    id: "zone_1",
    name: "Koramangala",
    code: "KRM",
    city: "Bengaluru",
    isActive: true,
    deliveryRadiusKm: 5,
    avgDeliveryMinutes: 18,
  },
  {
    id: "zone_2",
    name: "Indiranagar",
    code: "IND",
    city: "Bengaluru",
    isActive: true,
    deliveryRadiusKm: 4,
    avgDeliveryMinutes: 22,
  },
  {
    id: "zone_3",
    name: "HSR Layout",
    code: "HSR",
    city: "Bengaluru",
    isActive: true,
    deliveryRadiusKm: 6,
    avgDeliveryMinutes: 15,
  },
  {
    id: "zone_4",
    name: "Whitefield",
    code: "WTF",
    city: "Bengaluru",
    isActive: true,
    deliveryRadiusKm: 7,
    avgDeliveryMinutes: 30,
  },
  {
    id: "zone_5",
    name: "Jayanagar",
    code: "JAY",
    city: "Bengaluru",
    isActive: false,
    deliveryRadiusKm: 5,
    avgDeliveryMinutes: 25,
  },
];
