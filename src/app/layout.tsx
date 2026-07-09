import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SpaceCursor from "@/components/SpaceCursor";
import GalaxyBackground from "@/components/GalaxyBackground";
import Preloader from "@/components/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Visionary X — Make the world stop scrolling.",
  description:
    "Strategy-led growth agency by IPG. Performance marketing, Gen-AI ads, AI films & shows, and 3D immersive web that turn attention into actual revenue.",
  keywords: [
    "performance marketing",
    "gen ai video",
    "ai filmmaking",
    "growth agency",
    "3d websites",
    "Visionary X",
  ],
  openGraph: {
    title: "Visionary X — Make the world stop scrolling.",
    description:
      "The ads, content and websites that turn attention into actual revenue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-carbon text-ivory">
        <Preloader />
        <GalaxyBackground />
        <SmoothScroll>
          <SpaceCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
