"use client";

/*
 * MobileNav — sticky mobile navigation bar + full-screen overlay menu.
 *
 * Rendered independently from the desktop Navigation so each can have
 * its own positioning strategy:
 *   Desktop nav  → absolute (overlays the hero image)
 *   Mobile nav   → fixed   (sticks while the page scrolls)
 *
 * Visibility:
 *   MobileNav   → visible only on < md  (flex md:hidden)
 *   Navigation  → visible only on md +  (hidden md:flex)
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useHeroColor } from "@/context/HeroColorContext";

const menuLinks = [
  { href: "/videobook", label: "Videobook"  },
  { href: "/galeria",   label: "Galería"    },
  { href: "/conoceme",  label: "Conóceme"   },
  { href: "/contacto",  label: "Contacto"   },
];

const darkRoutes = ["/videobook", "/contacto"];

export default function MobileNav() {
  const pathname             = usePathname();
  const { color: heroColor } = useHeroColor();
  const [open, setOpen]      = useState(false);

  const isHome = pathname === "/";
  const isDark = darkRoutes.includes(pathname);

  /* Bar colour: follows hero carousel on home, page palette on subpages */
  const barColor  = isHome ? heroColor : isDark ? "#ece8df" : "#313534";

  /* Overlay theme */
  const overlayBg = isDark || isHome ? "bg-[#0d0d0d]/96" : "bg-[#ece8df]/96";
  const menuColor = isDark || isHome ? "#ece8df"          : "#313534";

  return (
    <>
      {/* ── Sticky bar ─────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-5 py-4"
        style={{
          /* Subtle bg so text is always legible over any page colour */
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{ color: barColor, transition: "color 700ms ease" }}
          className="font-display text-[24px] leading-none"
        >
          Florencia Romero
        </Link>

        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          style={{ color: barColor, transition: "color 700ms ease" }}
          className="p-2 flex flex-col gap-[5px]"
        >
          <span className="block w-[22px] h-[1.5px] bg-current" />
          <span className="block w-[22px] h-[1.5px] bg-current" />
          <span className="block w-[22px] h-[1.5px] bg-current" />
        </button>
      </div>

      {/* ── Full-screen overlay ────────────────────────────────── */}
      {open && (
        <div
          className={`fixed inset-0 z-[200] flex md:hidden flex-col items-center justify-center ${overlayBg} backdrop-blur-sm`}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            style={{ color: menuColor }}
            className="absolute top-5 right-5 font-body text-[11px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
          >
            Cerrar ✕
          </button>

          {/* Links */}
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
