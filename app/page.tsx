"use client";

/*
 * HOME — Hero page with carousel
 *
 * Content is loaded from content/hero/index.json (managed via Tina CMS admin).
 * Each slide drives background colour / photo + text colour.
 * Quote and attribution are shared across all slides.
 *
 * Colour sync: textColor is shared with Navigation via HeroColorContext.
 * Text stays fully visible at all times — only the CSS `color` property fades.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { useHeroColor, type HeroColor } from "@/context/HeroColorContext";
import heroData from "@/content/hero/index.json";

const SLIDE_DURATION = 4000;
const COLOR_TRANSITION = "color 700ms ease";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const { color: textColor, setColor } = useHeroColor();

  const slides = heroData.slides as { bg: string; textColor: HeroColor; image?: string }[];
  const { quote, quoteAttribution } = heroData;

  /* Sync nav colour on first render */
  useEffect(() => {
    setColor(slides[0].textColor);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Auto-advance — colour transition only, no opacity tricks */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        setColor(slides[next].textColor);
        return next;
      });
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goTo(i: number) {
    setCurrent(i);
    setColor(slides[i].textColor);
  }

  const slide = slides[current];

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* ── Background: photo if set, otherwise colour swatch ── */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: slide.bg }}
      >
        {slide.image && (
          <Image
            src={slide.image}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(4,6,5,0.88) 0%, rgba(10,6,4,0.55) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Hero text ── */}
      <div
        className="absolute bottom-[134px] left-[124px]"
        style={{ color: textColor, transition: COLOR_TRANSITION }}
      >
        {/* Name */}
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

        {/* Quote — line-height 1.2, whitespace preserved for line breaks */}
        <div
          className="mt-6 font-body text-[24px] tracking-[-0.04em] whitespace-pre-line"
          style={{ lineHeight: 1.2 }}
        >
          <span>&ldquo;{quote}&rdquo;</span>
          {quoteAttribution && (
            <span className="text-[16px] tracking-[-0.04em]"> | {quoteAttribution}</span>
          )}
        </div>
      </div>

      {/* ── Slide indicators ── */}
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
