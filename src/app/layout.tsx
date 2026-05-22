import type { Metadata } from "next";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/effects/CursorGlow";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CoreLogic Web Lab | Intelligent Digital Infrastructure",
  description:
    "Enterprise software, AI systems, smart governance platforms, cloud infrastructure, and next-generation digital experiences.",
  keywords: [
    "enterprise software",
    "AI systems",
    "smart city",
    "government platforms",
    "cloud infrastructure",
    "cybersecurity",
  ],
  icons: {
    icon: "/corelogic.png",
    apple: "/corelogic.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} min-h-screen bg-[#050816] antialiased`}
      >
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
