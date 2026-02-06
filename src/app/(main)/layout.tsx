"use client";

import { BottomTabBar } from "@/components/shared/BottomTabBar";
import { MobileShell } from "@/components/shared/MobileShell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileShell hasTabBar={true}>
      {children}
      <BottomTabBar />
    </MobileShell>
  );
}
