"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHeroColor } from "@/context/HeroColorContext";

/* ─── Nav link definitions ──────────────────────────────────── */
const links = [
  { href: "/videobook", label: "Videobook"       },
  { href: "/galeria",   label: "Galería"          },
  { href: "/",          label: "Florencia Romero", isBrand: true },
  { href: "/conoceme",  label: "Conóceme"         },
  { href: "/contacto",  label: "Contacto"         },
];

/*
 * ─── Colour logic ────────────────────────────────────────────
 *
 * Homepage (/):
 *   All text (including brand) → heroColor from context (coral-reef or black-haze)
 *   Brand size: 36px
 *   No active underline
 *   Transition: fade via CSS transition on color
 *
 * Dark subpages (/videobook, /contacto):
 *   All text → satin-linen (#ece8df)
 *   Active: bottom border underline
 *
 * Light subpages (/galeria, /conoceme):
 *   All text → cape-cod (#313534)
 *   Active: bottom border underline
 */
const darkRoutes  = ["/videobook", "/contacto"];

export default function Navigation() {
  const pathname   = usePathname();
  const { color: heroColor } = useHeroColor();

  const isHome  = pathname === "/";
  const isDark  = darkRoutes.includes(pathname);

  /* Resolved colour for subpages */
  const subpageColor   = isDark ? "#ece8df" : "#313534";
  const activeUnderline = isDark
    ? "border-b border-[#ece8df]"
    : "border-b border-[#313534]";

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center h-[48px] w-[935px] mt-[80px] px-6 overflow-hidden">
        {links.map(({ href, label, isBrand }) => {
          const isActive = pathname === href;

          /* ── Homepage state ── */
          if (isHome) {
            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: heroColor,
                  /* Smooth fade when carousel changes colour */
                  transition: "color 700ms ease",
                }}
                className={[
                  "flex flex-1 items-center justify-center h-full px-3 whitespace-nowrap leading-none hover:opacity-70",
                  isBrand
                    ? "font-display text-[36px]"
                    : "font-body text-[16px]",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          }

          /* ── Subpage state ── */
          return (
            <Link
              key={href}
              href={href}
              style={{ color: subpageColor }}
              className={[
                "flex flex-1 items-center justify-center h-full px-3 whitespace-nowrap leading-none transition-opacity hover:opacity-70",
                isBrand
                  ? "font-body font-semibold text-[16px]"
                  : "font-body text-[16px]",
              ].join(" ")}
            >
              <span className={isActive ? `${activeUnderline} pb-1` : ""}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
