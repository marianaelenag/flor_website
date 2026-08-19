/*
 * CONÓCEME (About) page
 *
 * Two-box layout:
 *
 * BOX 1 (upper) — cream card
 *   Heading + bio text split into two CSS columns (browser handles reflow)
 *
 * BOX 2 (lower) — olive green background card
 *   Left  : portrait photo, top-right anchored, fixed width
 *   Right : cream panel with CV sections grid + Idiomas one-liner
 *
 * Mobile: photo stacks on top, CV sections 1-col, bio 1-col.
 *
 * Content from content/conoceme/index.json, managed via Tina CMS.
 */

import Image from "next/image";
import conocemeData from "@/content/conoceme/index.json";

/* ─── Types ──────────────────────────────────────────────────── */
type CvItem    = { text: string };
type CvSection = { title: string; items: CvItem[] };
type Idiomas   = { title: string; items: string[] };

/* ─── Page ───────────────────────────────────────────────────── */
export default function Conoceme() {
  const {
    portraitSrc,
    portraitAlt,
    cvSections,
    idiomas,
    bioHeading,
    bio,
  } = conocemeData as {
    portraitSrc: string;
    portraitAlt: string;
    cvSections:  CvSection[];
    idiomas:     Idiomas;
    bioHeading:  string;
    bio:         string;
  };

  return (
    <main className="min-h-screen bg-[#797c5c] pt-[90px] md:pt-[160px] pb-16">

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col gap-6">

        {/* ══════════════════════════════════════════════════════
            BOX 1 (upper) — Bio (two CSS columns on desktop)
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#ece8df] rounded-[4px] p-6 md:p-12 lg:p-16">

          <h2 className="font-display text-[22px] md:text-[28px] text-[#313534] uppercase mb-8">
            {bioHeading}
          </h2>

          <div
            className="font-body text-[13px] md:text-[14px] text-[#313534] leading-relaxed"
            style={{
              /* Two columns on md+, single column on mobile */
              columnCount: undefined,
            }}
          >
            {/* CSS columns via Tailwind: columns-1 md:columns-2 */}
            <p
              className="columns-1 md:columns-2 gap-10 whitespace-pre-line"
            >
              {bio}
            </p>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════
            BOX 2 (lower) — Portrait + CV sections
        ══════════════════════════════════════════════════════ */}
        <section className="flex flex-col md:flex-row overflow-hidden rounded-[4px]">

          {/* ── Portrait photo ───────────────────────────────── */}
          <div className="w-full h-[60vw] md:h-auto md:w-[320px] lg:w-[380px] relative flex-shrink-0 overflow-hidden bg-[#4a4a3a]">
            {portraitSrc ? (
              <Image
                src={portraitSrc}
                alt={portraitAlt}
                fill
                className="object-cover"
                style={{ objectPosition: "top left" }}
                priority
              />
            ) : (
              <div className="w-full h-full bg-[#5a5a4a]" />
            )}
          </div>

          {/* ── CV panel (cream) ─────────────────────────────── */}
          <div className="flex-1 bg-[#ece8df] p-6 md:p-10 flex flex-col justify-between">

            {/* Section grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
              {cvSections.map((section, si) => (
                <div key={si}>
                  <h3 className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mb-3">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {section.items.map((item, ii) => (
                      <li
                        key={ii}
                        className="font-body font-medium text-[14px] text-[#313534] leading-snug whitespace-pre-line"
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ── Idiomas — one-liner ── */}
            {idiomas?.items?.length > 0 && (
              <div className="mt-8 pt-5 border-t border-[#313534]/15 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mr-2">
                  {idiomas.title}
                </span>
                {idiomas.items.map((lang, li) => (
                  <span key={li} className="font-body text-[12px] text-[#313534]">
                    {lang}
                    {li < idiomas.items.length - 1 && (
                      <span className="ml-2 text-[#313534]/30">·</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
