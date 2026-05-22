import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/effects/CursorGlow";
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
  themeColor: "#050816",
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
    "Enterprise software, AI systems, smart governance platforms, cloud infrastructure, and next-generation digital experiences. Philippines.",
  keywords: [
    "CoreLogic Web Lab",
    "enterprise software Philippines",
    "AI systems",
    "smart city",
    "government platforms",
    "cloud infrastructure",
    "cybersecurity",
    "web development Philippines",
  ],
  authors: [{ name: "CoreLogic Web Lab" }],
  creator: "CoreLogic Web Lab",
  icons: {
    icon: [{ url: "/corelogic.png", type: "image/png" }],
    apple: [{ url: "/corelogic.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE.siteUrl,
    siteName: SITE.name,
    title: "CoreLogic Web Lab | Intelligent Digital Infrastructure",
    description:
      "Enterprise software, AI systems, and government-ready digital platforms engineered in the Philippines.",
    images: [{ url: "/corelogic.png", width: 512, height: 512, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreLogic Web Lab",
    description: "Engineering intelligent digital infrastructure.",
    images: ["/corelogic.png"],
  },
  robots: {
    index: true,
    follow: true,
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
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneTel,
      contactType: "customer service",
      email: SITE.email,
      availableLanguage: ["English", "Filipino"],
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} min-h-screen bg-[#050816] antialiased`}
      >
        <Script
          id="json-ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
