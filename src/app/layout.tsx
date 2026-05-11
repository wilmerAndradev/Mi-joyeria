import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
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

export const metadata: Metadata = {
  title: {
    template: "%s | LUMIÈRE Alta Joyería",
    default: "LUMIÈRE | Alta Joyería",
  },
  description: "Exclusiva joyería fina en Chile. Anillos, collares, aros y pulseras de metales preciosos con diamantes certificados.",
  keywords: ["joyería fina", "diamantes", "oro 18k", "anillos de compromiso", "Lumière", "Chile"],
  authors: [{ name: "Lumière" }],
  openGraph: {
    title: "LUMIÈRE | Alta Joyería",
    description: "Exclusiva joyería fina en Chile. Anillos, collares, aros y pulseras de metales preciosos con diamantes certificados.",
    url: "https://lumiere-joyeria.cl",
    siteName: "LUMIÈRE",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMIÈRE | Alta Joyería",
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
    name: "Lumière Alta Joyería",
    url: "https://lumiere-joyeria.cl",
    logo: "https://lumiere-joyeria.cl/logo.png",
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
      className={`${josefin.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-onyx bg-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <CartDrawer />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
