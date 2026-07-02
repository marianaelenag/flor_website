"use client";

/*
 * CONTACTO page
 *
 * Content loaded from content/contacto/index.json (managed via Tina CMS admin).
 * Full-bleed background photo behind everything.
 * Two-column layout within max-w-[1200px]:
 *   Left  — transparent spacer (photo shows through).
 *   Right — satin-linen container, 52px padding, form centred vertically.
 *
 * Form submission: wire up to Resend / Formspree in Step 6.
 */

import { useState } from "react";
import Image from "next/image";
import contactoData from "@/content/contacto/index.json";

/* ─── Shared input classes ───────────────────────────────────── */
const inputBase =
  "w-full bg-white border border-[#313534]/20 rounded-full px-5 h-[48px] font-body text-[14px] text-[#313534] placeholder:text-[#313534]/30 outline-none focus:border-[#313534] transition-colors";

const textareaBase =
  "w-full bg-white border border-[#313534]/20 rounded-2xl px-5 py-4 font-body text-[14px] text-[#313534] placeholder:text-[#313534]/30 outline-none focus:border-[#313534] transition-colors resize-none";

const labelBase = "block font-body text-[12px] text-[#313534]/60 uppercase tracking-widest mb-1";

/* ─── Page ───────────────────────────────────────────────────── */
export default function Contacto() {
  const { backgroundSrc, backgroundAlt } = contactoData;
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // TODO: replace with Resend / Formspree call in Step 6
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  return (
    <main className="min-h-screen relative">

      {/* ── Full-bleed background photo ── */}
      <div className="absolute inset-0 bg-[#313534]">
        {backgroundSrc ? (
          <Image
            src={backgroundSrc}
            alt={backgroundAlt}
            fill
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-[#4a4542]" />
        )}
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative max-w-[1200px] mx-auto w-full min-h-screen flex gap-6 px-6 py-[200px]">

        {/* Left — transparent spacer, photo shows through */}
        <div className="flex-1" />

        {/* Right — satin-linen container */}
        <div className="flex-1 bg-[#ece8df] p-[52px] flex flex-col justify-center">

          {status === "sent" ? (
            <div className="flex flex-col items-center text-center gap-4">
              <h1 className="font-display text-[36px] text-[#313534] uppercase">
                Contactame
              </h1>
              <p className="font-body text-[14px] text-[#313534]/70">
                ¡Mensaje enviado! Te responderé pronto.
              </p>
            </div>
          ) : (
            <>
              {/* Heading */}
              <h1 className="font-display text-[36px] text-[#313534] uppercase mb-8">
                Contactame
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
                  <label htmlFor="email" className={labelBase}>Email</label>
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
                  <label htmlFor="message" className={labelBase}>Mensaje</label>
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
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-[#313534] text-[#ece8df] font-display text-[16px] uppercase px-10 py-3 rounded-lg hover:bg-[#c6ba9f] hover:text-[#313534] transition-colors duration-300 disabled:opacity-50"
                  >
                    {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                  </button>
                </div>

              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
