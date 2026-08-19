/*
 * CONÓCEME (About) page
 *
 * Two-box layout:
 *
 * BOX 1 (upper)
 *   Left  : portrait photo, 30% width
 *   Right : bio heading + bio text (single column), 70% width
 *
 * BOX 2 (lower) — cream card
 *   CV sections grid + Idiomas one-liner
 *
 * Mobile: photo stacks on top, bio 1-col, CV sections 1-col.
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

  const teatroSection         = cvSections.find((s) => s.title === "Teatro");
  const largometrajesSection  = cvSections.find((s) => s.title === "Largometrajes");
  const cortometrajesSection  = cvSections.find((s) => s.title === "Cortometrajes");
  const formacionSection      = cvSections.find((s) => s.title === "Formación");

  return (
    <main className="min-h-screen bg-[#797c5c] pt-[90px] md:pt-[160px] pb-16">

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col gap-6">

        {/* ══════════════════════════════════════════════════════
            BOX 1 (upper) — Portrait (30%) + Bio (70%, single column)
        ══════════════════════════════════════════════════════ */}
        <section className="flex flex-col md:flex-row overflow-hidden rounded-[4px]">

          {/* ── Portrait photo — 30% width ───────────────────── */}
          <div className="w-full h-[60vw] md:h-auto md:w-[30%] relative flex-shrink-0 overflow-hidden bg-[#4a4a3a]">
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

          {/* ── Bio (cream) — 70% width, single column ───────── */}
          <div className="w-full md:w-[70%] bg-[#ece8df] p-6 md:p-12 lg:p-16 flex flex-col justify-center">

            <h2 className="font-display text-[22px] md:text-[28px] text-[#313534] uppercase mb-8">
              {bioHeading}
            </h2>

            <p className="font-body text-[13px] md:text-[14px] text-[#313534] leading-relaxed whitespace-pre-line">
              {bio}
            </p>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BOX 2 (lower) — CV sections
        ══════════════════════════════════════════════════════ */}
        <section className="bg-[#ece8df] rounded-[4px] p-6 md:p-10">

          {/* 3x3 grid — Row 1: Teatro | Formación (bleeds across cols 2-3)
                        Row 2: Largometrajes | Cortometrajes | Idiomas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* ── Row 1, Col 1 — Teatro ── */}
            {teatroSection && (
              <div>
                <h3 className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mb-3">
                  {teatroSection.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {teatroSection.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="font-body font-medium text-[14px] text-[#313534] leading-snug whitespace-pre-line"
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Row 1, Col 2-3 — Formación, flowing across both ── */}
            {formacionSection && (
              <div className="md:col-span-2">
                <h3 className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mb-3">
                  {formacionSection.title}
                </h3>
                <ul className="columns-1 md:columns-2 gap-8">
                  {formacionSection.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="font-body font-medium text-[14px] text-[#313534] leading-snug whitespace-pre-line mb-3"
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Row 2, Col 1 — Largometrajes ── */}
            {largometrajesSection && (
              <div>
                <h3 className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mb-3">
                  {largometrajesSection.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {largometrajesSection.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="font-body font-medium text-[14px] text-[#313534] leading-snug whitespace-pre-line"
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Row 2, Col 2 — Cortometrajes ── */}
            {cortometrajesSection && (
              <div>
                <h3 className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mb-3">
                  {cortometrajesSection.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {cortometrajesSection.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="font-body font-medium text-[14px] text-[#313534] leading-snug whitespace-pre-line"
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Row 2, Col 3 — Idiomas ── */}
            {idiomas?.items?.length > 0 && (
              <div>
                <h3 className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mb-3">
                  {idiomas.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {idiomas.items.map((lang, li) => (
                    <li
                      key={li}
                      className="font-body font-medium text-[14px] text-[#313534] leading-snug"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
