"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useHeroColor } from "@/context/HeroColorContext";

/* ─── Nav link definitions ──────────────────────────────────── */
const links = [
  { href: "/videobook", label: "Videobook"        },
  { href: "/galeria",   label: "Galería"           },
  { href: "/",          label: "Florencia Romero", isBrand: true },
  { href: "/conoceme",  label: "Conóceme"          },
  { href: "/contacto",  label: "Contacto"          },
];

const darkRoutes = ["/videobook", "/contacto"];

export default function Navigation() {
  const pathname              = usePathname();
  const { color: heroColor }  = useHeroColor();
  const [open, setOpen]       = useState(false);

  const isHome = pathname === "/";
  const isDark = darkRoutes.includes(pathname);

  /* Colour for subpages */
  const subpageColor    = isDark ? "#ece8df" : "#313534";
  const activeUnderline = isDark
    ? "border-b border-[#ece8df]"
    : "border-b border-[#313534]";

  /* Colour used by mobile bar (burger icon + brand) */
  const mobileColor = isHome ? heroColor : subpageColor;

  /* Overlay theme for the burger drawer */
  const overlayBg    = isDark ? "bg-[#0d0d0d]/96" : "bg-[#ece8df]/96";
  const menuColor    = isDark ? "#ece8df"          : "#313534";

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          DESKTOP NAV  (md +)
      ════════════════════════════════════════════════════════ */}
      <nav className="absolute top-0 left-0 right-0 z-50 hidden md:flex justify-center">
        <div className="flex items-center h-[48px] max-w-[935px] w-full mt-[80px] px-6">
          {links.map(({ href, label, isBrand }) => {
            const isActive = pathname === href;

            /* ── Homepage ── */
            if (isHome) {
              return (
                <Link
                  key={href}
                  href={href}
                  style={{ color: heroColor, transition: "color 700ms ease" }}
                  className={[
                    "flex flex-1 items-center justify-center h-full px-3 whitespace-nowrap leading-none hover:opacity-70",
                    isBrand ? "font-display text-[36px]" : "font-body text-[16px]",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            }

            /* ── Subpages ── */
            return (
              <Link
                key={href}
                href={href}
                style={{ color: subpageColor }}
                className={[
                  "flex flex-1 items-center justify-center h-full px-3 whitespace-nowrap leading-none transition-opacity hover:opacity-70",
                  isBrand ? "font-body font-semibold text-[16px]" : "font-body text-[16px]",
                ].join(" ")}
              >
                <span className={isActive ? `${activeUnderline} pb-1` : ""}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════
          MOBILE BAR  (< md)
      ════════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-5 pt-7">
        {/* Brand — links home */}
        <Link
          href="/"
          style={{ color: mobileColor, transition: "color 700ms ease" }}
          className="font-display text-[26px] leading-none"
          onClick={() => setOpen(false)}
        >
          Florencia Romero
        </Link>

        {/* Burger icon */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="p-2 flex flex-col gap-[5px]"
          style={{ color: mobileColor, transition: "color 700ms ease" }}
        >
          <span className="block w-[22px] h-[1.5px] bg-current" />
          <span className="block w-[22px] h-[1.5px] bg-current" />
          <span className="block w-[22px] h-[1.5px] bg-current" />
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE OVERLAY MENU
      ════════════════════════════════════════════════════════ */}
      {open && (
        <div
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center ${overlayBg} backdrop-blur-sm`}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            style={{ color: menuColor }}
            className="absolute top-7 right-5 font-body text-[11px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
          >
            Cerrar ✕
          </button>

          {/* Stacked links — brand excluded (already in the bar) */}
          <nav className="flex flex-col items-center gap-10">
            {links
              .filter(({ isBrand }) => !isBrand)
              .map(({ href, label }) => {
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
