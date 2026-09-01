import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { BackgroundMusic } from "@/components/background-music";
import "./globals.css";

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });

export const metadata: Metadata = {
  title: "Marwan Bukhori: AI Engineering Hub",
  description:
    "A running log of GenAI projects, notes, and apps I've built, documented as I build them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${pixelFont.variable}`}>
      <body className="min-h-full font-sans">
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
