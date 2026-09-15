import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";
import { BackgroundMusic } from "@/components/background-music";
import "./globals.css";

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });

// Miracode (SIL OFL 1.1) — see app/fonts/Miracode-LICENSE.txt. Used for body prose:
// pixel letterforms that stay readable at paragraph length.
const bodyFont = localFont({
  src: "./fonts/Miracode.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Marwan Bukhori: AI Engineering Hub",
  description:
    "A running log of GenAI projects, notes, and apps I've built, documented as I build them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${pixelFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-full font-sans">
        <div className="page-bg-image" aria-hidden="true" />
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
