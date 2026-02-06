import { Banner } from "@/types";

export const BANNERS: Banner[] = [
  {
    id: "banner_1",
    title: "Fresh Alphonso Mangoes",
    subtitle: "Season's best — starting ₹240",
    imageUrl: "/images/banners/mangoes.png",
    bgColor: "#FFF3E0",
    linkTo: "/item/item_8",
    isActive: true,
  },
  {
    id: "banner_2",
    title: "Free Delivery Weekend",
    subtitle: "No minimum order — this weekend only",
    imageUrl: "/images/banners/delivery.png",
    bgColor: "#E8F5E9",
    linkTo: "/home",
    isActive: true,
  },
  {
    id: "banner_3",
    title: "QuickBasket Plus",
    subtitle: "Try 14 days free — unlimited free delivery",
    imageUrl: "/images/banners/membership.png",
    bgColor: "#E3F2FD",
    linkTo: "/membership",
    isActive: true,
  },
  {
    id: "banner_4",
    title: "25% Off Snacks",
    subtitle: "Use code SNACK25 at checkout",
    imageUrl: "/images/banners/snacks.png",
    bgColor: "#FCE4EC",
    linkTo: "/categories/snacks-beverages",
    isActive: true,
  },
];
