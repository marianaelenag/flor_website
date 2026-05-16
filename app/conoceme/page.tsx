/*
 * CONÓCEME (About) page
 *
 * Two equal columns, 24px gap, filling full viewport height minus footer.
 * Height chain: body(flex-col) → div(flex-1) → main(flex-1 flex-col)
 *               → container(flex-1) → columns fill naturally.
 *
 * Left  — portrait photo (uploaded via Tina CMS).
 * Right — satin-linen bg, 52px padding, content centred & growing from centre.
 *
 * TODO (Tina CMS): portrait { src, alt }, heading, bio
 */

import Image from "next/image";

/* ─── Placeholder content (will come from Tina CMS) ─────────── */
const content = {
  portraitSrc: "",
  portraitAlt: "Florencia Romero",
  heading: "Hola, soy Florencia Romero",
  bio: `Soy actriz formada en el Estudio de Arte Dramático de Buenos Aires y con posgrado en el Lee Strasberg Theatre & Film Institute de Nueva York. A lo largo de los años he trabajado en teatro, cine y televisión, explorando personajes que me desafían a ir siempre un poco más lejos.

Me interesa el trabajo honesto, el que parte del cuerpo y la escucha. Creo en el teatro como un espacio de encuentro real entre personas, y en el cine como un lugar donde el tiempo se puede detener.

Actualmente resido en Barcelona, donde continúo mi formación, participo en proyectos de creación colectiva y ofrezco talleres de expresión corporal y técnica actoral.`,
};

/* ─── Page ───────────────────────────────────────────────────── */
export default function Conoceme() {
  return (
    /*
     * flex-1 flex flex-col: main grows to fill the div wrapper in layout.tsx,
     * becoming the full space between the nav and the footer.
     * pt-[80px]: clears the absolute nav.
     * pb-24 (96px ≈ 100pt): bottom breathing room before the footer.
     */
    <main className="min-h-screen bg-[#e5e6e6] pt-[120px] pb-24">

      {/*
       * min-h-[calc(100vh-316px)]: columns are at least tall enough that
       * the footer sits just below the fold — requires scrolling to reach.
       * 316px = pt-[80px] + mt-20(80) + pb-24(96) + footer(60).
       */}
      <div className="min-h-[calc(100vh-316px)] w-full max-w-[1200px] mx-auto mt-20 flex gap-6">

        {/* ── Left column: portrait photo ── */}
        <div className="flex-1 relative overflow-hidden">
          {content.portraitSrc ? (
            <Image
              src={content.portraitSrc}
              alt={content.portraitAlt}
              fill
              className="object-cover object-top"
            />
          ) : (
            /* Placeholder — replace with Tina image field */
            <div className="w-full h-full bg-[#c8c4bb]" />
          )}
        </div>

        {/* ── Right column: satin-linen, 52px padding, centred content ── */}
        <div className="flex-1 bg-[#ece8df] p-[52px] flex items-center justify-center">
          {/*
           * Inner block grows from the centre:
           * flex-col + items-center centres children horizontally.
           * No fixed height → expands symmetrically as content grows.
           */}
          <div className="flex flex-col items-center text-center max-w-[540px]">

            <h1 className="font-display text-[20px] text-[#313534] uppercase leading-tight">
              {content.heading}
            </h1>

            {/* mt-8 = 32px gap between title and body */}
            <div className="mt-8 font-body text-[14px] text-[#313534] leading-relaxed whitespace-pre-line">
              {content.bio}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
