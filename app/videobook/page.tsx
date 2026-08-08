/*
 * VIDEOBOOK page
 *
 * Content loaded from content/videobook/index.json (managed via Tina CMS admin).
 * Dark radial-gradient background (full bleed).
 * Content capped at max-w-[1200px], centred.
 * Featured video (top) + grid of smaller videos, gap-5 (20px).
 */

import videobookData from "@/content/videobook/index.json";

/* ─── URL normaliser ─────────────────────────────────────────── */
/**
 * Converts any YouTube or Vimeo URL into its embed form.
 * Accepts: watch URLs, short URLs (youtu.be), share URLs, and already-embed URLs.
 * Returns the original string unchanged if it doesn't match.
 */
function toEmbedUrl(url: string): string {
  if (!url) return url;

  // ── YouTube ──────────────────────────────────────────────────
  // https://www.youtube.com/watch?v=ID&...
  // https://youtu.be/ID
  // https://www.youtube.com/shorts/ID
  const ytWatch = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  // ── Vimeo ────────────────────────────────────────────────────
  // https://vimeo.com/ID  or  https://vimeo.com/channels/*/ID
  const vimeo = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
  if (vimeo && !url.includes("player.vimeo.com")) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }

  return url; // already an embed URL or unknown platform — pass through
}

/* ─── Sub-components ─────────────────────────────────────────── */
function VideoPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#d9d9d9]/20 rounded-sm flex items-center justify-center ${className}`}>
      <svg className="w-12 h-12 text-[#ece8df]/30" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Videobook() {
  const { featured, grid } = videobookData;

  return (
    <main
      className="flex-1 min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at 85% 40%, rgba(56,24,11,1) 0%, rgba(4,6,5,1) 60%)",
      }}
    >
      {/* ── Centred content container ── */}
      <div className="max-w-[1200px] mx-auto w-full pt-[110px] sm:pt-[200px] pb-[80px] px-6">

        {/* ── Featured video ── */}
        <section className="mb-10">
          {featured.embedUrl ? (
            <iframe
              src={toEmbedUrl(featured.embedUrl)}
              className="w-full aspect-video rounded-[8px]"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <VideoPlaceholder className="w-full aspect-video rounded-[8px]" />
          )}
          {featured.title && (
            <div className="mt-3 text-[#ece8df]">
              <p className="font-body font-semibold text-[24px] leading-tight">{featured.title}</p>
              <p className="font-body text-[14px] opacity-60">{featured.date}</p>
            </div>
          )}
        </section>

        {/* ── Video grid — 1 col mobile → 2 col desktop (max 2) ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {grid.map((v, i) => (
            <div key={i}>
              {v.embedUrl ? (
                <iframe
                  src={toEmbedUrl(v.embedUrl)}
                  className="w-full aspect-video rounded-[8px]"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <VideoPlaceholder className="w-full aspect-video rounded-[8px]" />
              )}
              {v.title && (
                <div className="mt-3 text-[#ece8df]">
                  <p className="font-body font-semibold text-[24px] leading-tight">{v.title}</p>
                  <p className="font-body text-[14px] opacity-60">{v.date}</p>
                </div>
              )}
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
