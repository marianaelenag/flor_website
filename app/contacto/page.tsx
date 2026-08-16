"use client";

/*
 * CONTACTO page
 *
 * Pure black background.
 * Desktop: form panel LEFT (black wrapper, blends with page bg seamlessly),
 *          photo RIGHT (anchored to the right edge, object-position: right).
 * Mobile:  black form wrapper stacks on top (full width), photo stacks below.
 *          Since the wrapper and page are both black, no visual seam on mobile.
 *
 * The explicit black wrapper is intentional: it protects form content from
 * bleeding into the photo on narrow viewports without extra mobile-specific code.
 *
 * Content from content/contacto/index.json, managed via Tina CMS.
 */

import { useState } from "react";
import Image from "next/image";
import contactoData from "@/content/contacto/index.json";

/* ─── Shared input styles ────────────────────────────────────── */
const inputBase =
  "w-full bg-white/10 border border-white/20 rounded-full px-5 h-[48px] font-body text-[14px] text-[#ece8df] placeholder:text-white/30 outline-none focus:border-white/60 transition-colors";

const textareaBase =
  "w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 font-body text-[14px] text-[#ece8df] placeholder:text-white/30 outline-none focus:border-white/60 transition-colors resize-none";

const labelBase =
  "block font-body text-[11px] text-white/40 uppercase tracking-widest mb-1";

/* ─── Page ───────────────────────────────────────────────────── */
export default function Contacto() {
  const { backgroundSrc, backgroundAlt } = contactoData;
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // TODO: replace with Resend / Formspree call
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  return (
    <main className="min-h-screen bg-black">

      {/* ══════════════════════════════════════════════════════════
          Desktop: side-by-side   Mobile: stacked (form then photo)
          Wrapped at max-w-[1200px] so the form+photo pair reads as
          one centered unit on wide viewports instead of the form
          sitting flush against the left edge.
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row min-h-screen max-w-[1200px] mx-auto">

        {/* ── LEFT — black form wrapper ─────────────────────────
            Same colour as page bg, so on desktop the elements look
            "directly on black". On mobile it just takes full width. */}
        <div className="w-full md:w-1/2 bg-black flex flex-col justify-center px-8 sm:px-12 md:px-16 pt-[110px] md:pt-[160px] pb-12 md:pb-16">

          {status === "sent" ? (
            <div className="flex flex-col gap-4">
              <h1 className="font-display text-[56px] md:text-[72px] text-[#ece8df] uppercase leading-none">
                Contactame
              </h1>
              <p className="font-body text-[14px] text-white/60 mt-4">
                ¡Mensaje enviado! Te responderé pronto.
              </p>
            </div>
          ) : (
            <>
              {/* Heading */}
              <h1 className="font-display text-[56px] md:text-[72px] text-[#ece8df] uppercase leading-none mb-10">
                Contactame
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[480px]">

                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelBase}>Nombre</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={inputBase}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelBase}>Email address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={inputBase}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelBase}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí…"
                    className={textareaBase}
                  />
                </div>

                {/* Submit */}
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#ece8df] text-[#313534] font-display text-[16px] uppercase px-10 py-3 rounded-lg hover:bg-[#c6ba9f] transition-colors duration-300 disabled:opacity-50"
                  >
                    {status === "sending" ? "Enviando…" : "Send message"}
                  </button>
                </div>

              </form>
            </>
          )}
        </div>

        {/* ── RIGHT — photo panel ───────────────────────────────
            Anchored to the right; the specific theatrical photo
            should have object-position: right so the subject is
            always visible regardless of container width. */}
        <div className="w-full md:w-1/2 relative min-h-[50vw] md:min-h-0 overflow-visible bg-black">
          {backgroundSrc ? (
            <Image
              src={backgroundSrc}
              alt={backgroundAlt ?? ""}
              fill
              className="object-cover"
              style={{ objectPosition: "40% center" }}
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[#111]" />
          )}
        </div>

      </div>
    </main>
  );
}
