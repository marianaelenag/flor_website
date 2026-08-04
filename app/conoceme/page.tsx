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
    <main className="min-h-screen bg-[#e5e6e6] pt-[90px] sm:pt-[120px] pb-24">

      <div className="w-full max-w-[1200px] mx-auto mt-6 sm:mt-20 flex flex-col md:flex-row gap-6 px-4 md:px-0">

        {/* ── Portrait photo ── */}
        <div className="w-full h-[60vw] min-h-[260px] md:h-auto md:flex-1 relative overflow-hidden">
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

        {/* ── Text panel: satin-linen ── */}
        <div className="w-full md:flex-1 bg-[#ece8df] p-6 sm:p-[52px] flex items-center justify-center pb-10 md:pb-[52px]">
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
