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
 *   Heading ("Curriculum") + CV download button
 *   3-col grid: Teatro | Largometrajes+Cortometrajes+Idiomas | Formación
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
    cvHeading,
    cvFileSrc,
    cvSections,
    idiomas,
    bioHeading,
    bio,
  } = conocemeData as {
    portraitSrc: string;
    portraitAlt: string;
    cvHeading:   string;
    cvFileSrc:   string;
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

          {/* ── Heading + CV download button ── */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-[22px] md:text-[28px] text-[#313534] uppercase">
              {cvHeading}
            </h2>
            {cvFileSrc && (
              <a
                href={cvFileSrc}
                download
                aria-label="Descargar CV"
                className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 -960 960 960"
                  fill="#797c5c"
                >
                  <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                </svg>
              </a>
            )}
          </div>

          {/* 3-column grid — Col 1: Teatro
                              Col 2: Largometrajes + Cortometrajes + Idiomas
                              Col 3: Formación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* ── Col 1 — Teatro ── */}
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

            {/* ── Col 2 — Largometrajes, Cortometrajes, Idiomas stacked ── */}
            <div className="flex flex-col gap-8">
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

              {idiomas?.items?.length > 0 && (
                <div>
                  <h3 className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mb-3">
                    {idiomas.title}
                  </h3>
                  <ul className="flex flex-row flex-wrap gap-x-2 gap-y-1">
                    {idiomas.items.map((lang, li) => (
                      <li
                        key={li}
                        className="font-body font-medium text-[14px] text-[#313534] leading-snug after:content-['•'] after:ml-2 after:text-[#313534]/40 last:after:content-none"
                      >
                        {lang}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ── Col 3 — Formación ── */}
            {formacionSection && (
              <div>
                <h3 className="font-body font-semibold text-[11px] uppercase tracking-[0.12em] text-[#313534]/50 mb-3">
                  {formacionSection.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {formacionSection.items.map((item, ii) => (
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
          </div>
        </section>

      </div>
    </main>
  );
}
