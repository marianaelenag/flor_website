"use client";

import { createContext, useContext, useState } from "react";

/* ─── Types ─────────────────────────────────────────────────── */
export type HeroColor = "#c6ba9f" | "#e5e6e6"; // coral-reef | black-haze

interface HeroColorContextValue {
  color: HeroColor;
  setColor: (color: HeroColor) => void;
}

/* ─── Context ───────────────────────────────────────────────── */
const HeroColorContext = createContext<HeroColorContextValue>({
  color: "#c6ba9f",
  setColor: () => {},
});

/* ─── Provider ──────────────────────────────────────────────── */
export function HeroColorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [color, setColor] = useState<HeroColor>("#c6ba9f");

  return (
    <HeroColorContext.Provider value={{ color, setColor }}>
      {children}
    </HeroColorContext.Provider>
  );
}

/* ─── Hook ──────────────────────────────────────────────────── */
export function useHeroColor() {
  return useContext(HeroColorContext);
}
