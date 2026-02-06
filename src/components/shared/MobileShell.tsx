"use client";

import { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
  className?: string;
  /** Whether to add bottom padding for tab bar */
  hasTabBar?: boolean;
}

export function MobileShell({ children, className = "", hasTabBar = true }: MobileShellProps) {
  return (
    <div className={`mx-auto max-w-lg min-h-screen bg-white ${hasTabBar ? "pb-20" : ""} ${className}`}>
      {children}
    </div>
  );
}
