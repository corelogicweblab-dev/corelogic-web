import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f0f7ff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: "CoreLogic Web Lab | Intelligent Digital Infrastructure",
    template: "%s | CoreLogic Web Lab",
  },
  description:
    "Enterprise software, AI systems, smart governance platforms, and cloud infrastructure. Philippines.",
  icons: {
    icon: [{ url: "/corelogic.png", type: "image/png" }],
    apple: [{ url: "/corelogic.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.siteUrl,
    siteName: SITE.name,
    title: "CoreLogic Web Lab",
    description: "Engineering intelligent digital infrastructure.",
    images: [{ url: "/corelogic.png", width: 512, height: 512, alt: SITE.name }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.siteUrl,
    email: SITE.email,
    telephone: SITE.phoneTel,
    logo: `${SITE.siteUrl}${SITE.logoSrc}`,
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} min-h-screen bg-[#f0f7ff] text-slate-900 antialiased`}
      >
        <Script
          id="json-ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
