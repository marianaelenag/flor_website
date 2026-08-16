"use client";

/*
 * Navigation — desktop-only horizontal nav bar.
 *
 * Visible only on md+ (hidden md:flex).
 * Mobile navigation is handled by MobileNav (components/MobileNav.tsx).
 *
 * Colour logic:
 *   Homepage   → heroColor from carousel context, fades on slide change
 *   Dark pages (/videobook, /contacto) → satin-linen (#ece8df)
 *   Light pages (/galeria, /conoceme)  → cape-cod (#313534)
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHeroColor } from "@/context/HeroColorContext";

const links = [
  { href: "/videobook", label: "Videobook"        },
  { href: "/galeria",   label: "Galería"           },
  { href: "/",          label: "Florencia Romero", isBrand: true },
  { href: "/conoceme",  label: "Conóceme"          },
  { href: "/contacto",  label: "Contacto"          },
];

const darkRoutes = ["/videobook", "/contacto"];

export default function Navigation() {
  const pathname             = usePathname();
  const { color: heroColor } = useHeroColor();

  const isHome = pathname === "/";
  const isDark = darkRoutes.includes(pathname);

  const subpageColor    = isDark ? "#ece8df" : "#313534";
  const activeUnderline = isDark
    ? "border-b border-[#ece8df]"
    : "border-b border-[#313534]";

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 hidden md:flex justify-center">
      <div
        className="flex items-center h-[48px] max-w-[935px] w-full mt-[80px] px-6 rounded-[8px]"
        style={{ boxShadow: "0 0 24px 24px #3E3128" }}
      >
        {links.map(({ href, label, isBrand }) => {
          const isActive = pathname === href;

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
  );
}
