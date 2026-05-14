import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { WelcomeGiftPopup } from "@/components/layout/WelcomeGiftPopup";
import "./globals.css";

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | ALEAFAR Alta Joyería",
    default: "ALEAFAR | Alta Joyería",
  },
  description: "Exclusiva joyería fina en Chile. Anillos, collares, aros y pulseras de metales preciosos con diamantes certificados.",
  keywords: ["joyería fina", "diamantes", "oro 18k", "anillos de compromiso", "Aleafar", "Chile"],
  authors: [{ name: "Aleafar" }],
  openGraph: {
    title: "ALEAFAR | Alta Joyería",
    description: "Exclusiva joyería fina en Chile. Anillos, collares, aros y pulseras de metales preciosos con diamantes certificados.",
    url: "https://aleafar.cl",
    siteName: "ALEAFAR",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALEAFAR | Alta Joyería",
    description: "Exclusiva joyería fina en Chile.",
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
    name: "Aleafar Alta Joyería",
    url: "https://aleafar.cl",
    logo: "https://aleafar.cl/logo.png",
    description: "Exclusiva joyería fina en Chile.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressRegion: "RM",
      addressCountry: "CL"
    }
  };

  return (
    <html
      lang="es"
      className={`${josefin.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans text-onyx bg-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Server-rendered blur overlay — prevents flash of page content before React hydrates.
            WelcomeGiftPopup removes this div on mount once it takes control. */}
        <div
          id="initial-blur"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 109,
            background: 'rgba(26,26,26,0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        />
        <WelcomeGiftPopup />
        <Navbar />
        <CartDrawer />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
