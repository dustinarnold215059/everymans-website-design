import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

// Search/social title — kept concise and keyword-forward (independent of the hero tagline).
const seoTitle = `${siteConfig.name} — Web Design for Ministries & Nonprofits`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Dustin" }],
  creator: "Dustin",
  keywords: [
    "web design",
    "website design",
    "Next.js developer",
    "church website",
    "ministry website",
    "nonprofit website",
    "abolition movement website",
    "mission-driven web design",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteConfig.name,
    title: seoTitle,
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Favicon + Apple touch icon are provided by app/icon.svg and app/apple-icon.tsx
  // (Next file conventions), so no manual icon links are needed here.
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.colors.ink,
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteUrl,
  email: siteConfig.email,
  description: siteConfig.description,
  image: `${siteUrl}/opengraph-image`,
  priceRange: "$$",
  areaServed: "US",
  knowsAbout: [
    "Web design",
    "Next.js development",
    "Website maintenance",
    "Data automation",
  ],
  serviceType: [
    "Website design and development",
    "Website care and hosting",
    "Automation and data",
  ],
  founder: { "@type": "Person", name: "Dustin" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hanken.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh bg-paper">
        <JsonLd data={orgJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-on-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
