"use client";

/*
 * GALERÍA page
 *
 * Content loaded from content/galeria/index.json (managed via Tina CMS admin).
 * Flexible auto-fill grid of square photo containers, gap-5.
 * Click any photo to open it in a full-screen carousel lightbox.
 * Keyboard: ← → to navigate, Esc to close.
 */

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import galeriaData from "@/content/galeria/index.json";

/* ─── Page ───────────────────────────────────────────────────── */
export default function Galeria() {
  const photos = galeriaData.photos as { src: string; alt: string }[];
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() =>
    setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
  [photos.length]);

  const next = useCallback(() =>
    setLightbox((i) => (i !== null ? (i + 1) % photos.length : null)),
  [photos.length]);

  /* Keyboard navigation */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  return (
    <main className="min-h-screen bg-[#ece8df] pt-[200px] pb-[80px]">

      {/* ── Photo grid ── */}
      <div className="max-w-[1200px] mx-auto w-full px-6">
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="aspect-square overflow-hidden focus:outline-none group relative"
              aria-label={photo.alt}
            >
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-[#c8c4bb] transition-opacity duration-300 group-hover:opacity-80" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Inner — stop click-through */}
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image area */}
            <div className="w-[80vw] h-[80vh] relative flex items-center justify-center">
              {photos[lightbox].src ? (
                <Image
                  src={photos[lightbox].src}
                  alt={photos[lightbox].alt}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full bg-[#555]" />
              )}
            </div>

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-[-56px] top-1/2 -translate-y-1/2 text-[#ece8df]/60 hover:text-[#ece8df] font-display text-[36px] leading-none transition-colors"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Siguiente"
              className="absolute right-[-56px] top-1/2 -translate-y-1/2 text-[#ece8df]/60 hover:text-[#ece8df] font-display text-[36px] leading-none transition-colors"
            >
              ›
            </button>

            {/* Close */}
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-[-40px] right-0 font-body text-[12px] text-[#ece8df]/60 hover:text-[#ece8df] tracking-widest uppercase transition-colors"
            >
              Cerrar ✕
            </button>

            {/* Counter */}
            <p className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 font-body text-[12px] text-[#ece8df]/40 tracking-widest">
              {lightbox + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
