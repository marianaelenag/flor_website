/*
 * CONÓCEME (About) page
 *
 * Content loaded from content/conoceme/index.json (managed via Tina CMS admin).
 *
 * Two equal columns, 24px gap, filling full viewport height minus footer.
 * Left  — portrait photo.
 * Right — satin-linen bg, 52px padding, content centred & growing from centre.
 */

import Image from "next/image";
import conocemeData from "@/content/conoceme/index.json";

/* ─── Page ───────────────────────────────────────────────────── */
export default function Conoceme() {
  const { portraitSrc, portraitAlt, heading, bio } = conocemeData;

  return (
    <main className="min-h-screen bg-[#e5e6e6] pt-[120px] pb-24">

      <div className="min-h-[calc(100vh-316px)] w-full max-w-[1200px] mx-auto mt-20 flex gap-6">

        {/* ── Left column: portrait photo ── */}
        <div className="flex-1 relative overflow-hidden">
          {portraitSrc ? (
            <Image
              src={portraitSrc}
              alt={portraitAlt}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-[#c8c4bb]" />
          )}
        </div>

        {/* ── Right column: satin-linen, 52px padding, centred content ── */}
        <div className="flex-1 bg-[#ece8df] p-[52px] flex items-center justify-center">
          <div className="flex flex-col items-center text-center max-w-[540px]">

            <h1 className="font-display text-[20px] text-[#313534] uppercase leading-tight">
              {heading}
            </h1>

            {/* mt-8 = 32px gap between title and body */}
            <div className="mt-8 font-body text-[14px] text-[#313534] leading-relaxed whitespace-pre-line">
              {bio}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
