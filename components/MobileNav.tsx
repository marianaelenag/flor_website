"use client";

/*
 * MobileNav — fixed mobile navigation bar + full-screen overlay menu.
 *
 * BAR (closed): white frosted-glass card floating at the top of the screen.
 *   — bg-white/80 + backdrop-blur-sm + rounded-[8px]
 *   — Brand and hamburger are always dark (#313534) regardless of page or hero.
 *   — Figma ref: node 219:2133
 *
 * OVERLAY (open): full-screen, adapts to page palette.
 *   — Dark pages (/videobook, /contacto) + Home → dark overlay, cream links
 *   — Light pages (/galeria, /conoceme)         → cream overlay, dark links
 *
 * Visibility:
 *   MobileNav  → flex md:hidden  (mobile only)
 *   Navigation → hidden md:flex  (desktop only)
 *
 * Positioning:
 *   Bar     → fixed (sticks on scroll)
 *   Overlay → fixed inset-0 (full screen)
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuLinks = [
  { href: "/videobook", label: "Videobook" },
  { href: "/galeria",   label: "Galería"   },
  { href: "/conoceme",  label: "Conóceme"  },
  { href: "/contacto",  label: "Contacto"  },
];

const darkRoutes = ["/videobook", "/contacto"];

export default function MobileNav() {
  const pathname    = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const isDark = darkRoutes.includes(pathname);

  /* Overlay adapts to page palette */
  const overlayBg = isDark || isHome ? "bg-[#0d0d0d]/96" : "bg-[#ece8df]/96";
  const menuColor = isDark || isHome ? "#ece8df"          : "#313534";

  return (
    <>
      {/* ── Fixed bar — white frosted-glass card ───────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex md:hidden px-4 pt-4">
        <div className="w-full bg-white/70 backdrop-blur-sm rounded-[8px] flex items-center justify-between px-3 py-[10px]">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-[24px] leading-none text-[#313534]"
          >
            Florencia Romero
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="p-1 flex flex-col gap-[5px]"
          >
            <span className="block w-[22px] h-[1.5px] bg-[#313534]" />
            <span className="block w-[22px] h-[1.5px] bg-[#313534]" />
            <span className="block w-[22px] h-[1.5px] bg-[#313534]" />
          </button>

        </div>
      </div>

      {/* ── Full-screen overlay ────────────────────────────────── */}
      {open && (
        <div
          className={`fixed inset-0 z-[200] flex md:hidden flex-col items-center justify-center ${overlayBg} backdrop-blur-sm`}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            style={{ color: menuColor }}
            className="absolute top-5 right-5 font-body text-[11px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
          >
            Cerrar ✕
          </button>

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-10">
            {menuLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{ color: menuColor }}
                  className={[
                    "font-display text-[40px] uppercase leading-none transition-opacity hover:opacity-70",
                    isActive ? "opacity-100" : "opacity-50",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
