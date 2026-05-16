/*
 * Footer — appears on every page via layout.tsx
 *
 * Minimal content: copyright · Instagram · Vimeo
 * TODO: replace href values with Florencia's real profile URLs.
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="h-[60px] bg-[#313534] flex items-center justify-between px-[60px] shrink-0">

      <p className="font-body text-[12px] text-[#ece8df]/50">
        © {year} Florencia Romero
      </p>

      <nav className="flex items-center gap-8" aria-label="Social links">
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[12px] text-[#ece8df]/50 hover:text-[#c6ba9f] transition-colors duration-300"
        >
          Instagram
        </a>
        <a
          href="https://vimeo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[12px] text-[#ece8df]/50 hover:text-[#c6ba9f] transition-colors duration-300"
        >
          Vimeo
        </a>
      </nav>

    </footer>
  );
}
