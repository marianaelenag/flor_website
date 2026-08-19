/*
 * Footer — appears on every page via layout.tsx
 *
 * Minimal content: copyright · social links
 * Social links come from content/site/index.json (Tina CMS "Sitio" collection),
 * so editors can add/remove/reorder them without touching code.
 */

import siteData from "@/content/site/index.json";

type SocialLink = { platform: string; url: string };

export default function Footer() {
  const year = new Date().getFullYear();
  const socialLinks = (siteData.socialLinks ?? []) as SocialLink[];

  return (
    <footer className="h-[60px] bg-[#313534] flex items-center justify-between px-4 sm:px-[60px] shrink-0">

      <p className="font-body text-[12px] text-[#ece8df]/50">
        © {year} Florencia Romero
      </p>

      <nav className="flex items-center gap-8" aria-label="Social links">
        {socialLinks.map(({ platform, url }) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[12px] text-[#ece8df]/50 hover:text-[#c6ba9f] transition-colors duration-300"
          >
            {platform}
          </a>
        ))}
      </nav>

    </footer>
  );
}
