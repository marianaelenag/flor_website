"use client";

/*
 * Client-side providers wrapper.
 * layout.tsx is a server component and cannot hold client context directly,
 * so we wrap everything here and import this into layout.tsx.
 */

import { HeroColorProvider } from "@/context/HeroColorContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroColorProvider>{children}</HeroColorProvider>;
}
