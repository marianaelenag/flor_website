"use client";

/*
 * HOME — Hero page with carousel
 *
 * Each slide has a `textColor` (coral-reef | black-haze) shared with
 * Navigation via HeroColorContext. The colour fades via CSS transition —
 * text stays fully visible at all times, only the colour property changes.
 *
 * TODO (Tina CMS): replace placeholder `bg` values with real slide images.
 */

import { useEffect, useState } from "react";
import { useHeroColor, type HeroColor } from "@/context/HeroColorContext";

/* ─── Slide definitions — extend with real images via Tina CMS ─ */
const slides: { bg: string; textColor: HeroColor }[] = [
  { bg: "#2a1a0e", textColor: "#c6ba9f" }, // slide 1 — warm dark brown
  { bg: "#313534", textColor: "#e5e6e6" }, // slide 2 — cool dark grey
  { bg: "#1e1a16", textColor: "#c6ba9f" }, // slide 3 — deep warm dark
  { bg: "#252b2a", textColor: "#e5e6e6" }, // slide 4 — dark teal-grey
  { bg: "#2d1f1a", textColor: "#c6ba9f" }, // slide 5 — deep brown
];

const SLIDE_DURATION = 4000; // ms between auto-advances
const COLOR_TRANSITION = "color 700ms ease";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const { color: textColor, setColor } = useHeroColor();

  /* Sync nav colour on first render */
  useEffect(() => {
    setColor(slides[0].textColor);
  }, [setColor]);

  /* Auto-advance — no opacity manipulation, colour transition only */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        setColor(slides[next].textColor);
        return next;
      });
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [setColor]);

  /* Manual jump — same: just update index + colour, CSS does the rest */
  function goTo(i: number) {
    setCurrent(i);
    setColor(slides[i].textColor);
  }

  const slide = slides[current];

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* ── Background (placeholder colours — swap for <Image> via Tina) ── */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: slide.bg }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(4,6,5,0.88) 0%, rgba(10,6,4,0.55) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Hero text — always fully visible, only colour transitions ── */}
      <div
        className="absolute bottom-[134px] left-[124px]"
        style={{ color: textColor, transition: COLOR_TRANSITION }}
      >
        {/* Name — line-height 0.8 */}
        <p
          className="font-display text-[160px] uppercase"
          style={{ lineHeight: 0.8 }}
        >
          Florencia
        </p>
        <p
          className="font-display text-[199px] uppercase"
          style={{ lineHeight: 0.8 }}
        >
          Romero
        </p>

        {/* Quote — line-height 1.2 */}
        <div
          className="mt-6 font-body text-[24px] tracking-[-0.04em]"
          style={{ lineHeight: 1.2 }}
        >
          <p>&ldquo;Aunque estoy entrenada y siempre resucito</p>
          <p>
            he decidido no morirme nunca más&rdquo;{" "}
            <span className="text-[16px] tracking-[-0.04em]">| G.F.</span>
          </p>
        </div>
      </div>

      {/* ── Slide indicators — colour also transitions ── */}
      <div className="absolute bottom-8 left-[124px] flex gap-2">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              backgroundColor: i === current ? textColor : "transparent",
              borderColor: textColor,
              transition: COLOR_TRANSITION,
            }}
            className="w-2 h-2 rounded-full border"
          />
        ))}
      </div>
    </main>
  );
}
