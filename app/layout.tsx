import type { Metadata } from "next";
import { Koulen, Krub } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

/* ─── Fonts ─────────────────────────────────────────────────── */
const koulen = Koulen({
  weight: "400",
  variable: "--font-koulen",
  subsets: ["latin"],
});

const krub = Krub({
  weight: ["400", "600"],
  variable: "--font-krub",
  subsets: ["latin"],
});

/* ─── Metadata ──────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Florencia Romero",
  description: "Portfolio de Florencia Romero — Actriz y artista visual",
};

/* ─── Root layout ───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${koulen.variable} ${krub.variable} h-full`}
    >
      {/*
       * Body is a flex column so the footer always sits at the bottom.
       * — Navigation  : absolute, doesn't affect document flow
       * — children    : flex-1, grows to fill all space between nav and footer
       * — Footer      : shrink-0, fixed 60px, always at the bottom
       */}
      <body className="h-full flex flex-col">
        <Providers>
          <Navigation />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
