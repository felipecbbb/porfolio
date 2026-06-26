import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Raleway } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  weight: ["500", "600"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const SITE_URL = "https://felippecamara.com";
const DESCRIPTION =
  "Desarrollador y diseñador web freelance en Gran Canaria. Webs a medida, SaaS, e-commerce y automatización con IA que convierten visitas en clientes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Felipe Cámara — Desarrollo web, software a medida e IA · Gran Canaria",
  description: DESCRIPTION,
  applicationName: "Felipe Cámara",
  authors: [{ name: "Felipe Cámara", url: SITE_URL }],
  creator: "Felipe Cámara",
  publisher: "Felipe Cámara",
  category: "technology",
  // canonical y og:url se definen por página (no globalmente) para no
  // apuntar todas las URLs al home.
  keywords: [
    "desarrollo web",
    "diseñador web",
    "desarrollador freelance",
    "Gran Canaria",
    "Canarias",
    "software a medida",
    "SaaS",
    "inteligencia artificial",
    "automatización",
    "e-commerce",
    "landing pages",
    "Next.js",
    "páginas web",
    "Felipe Cámara",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Felipe Cámara",
    title: "Felipe Cámara — Desarrollo web, software a medida e IA",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe Cámara — Desarrollo web, IA y diseño",
    description: DESCRIPTION,
    creator: "@felippe.camara",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Iconos autodetectados por file convention (app/favicon.ico, app/icon.svg, app/apple-icon.png).
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#felipe`,
      name: "Felipe Cámara",
      alternateName: "Felipe Cámara Barroso",
      url: SITE_URL,
      jobTitle: "Desarrollador y diseñador web freelance",
      description: DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Palmas de Gran Canaria",
        addressRegion: "Canarias",
        addressCountry: "ES",
      },
      sameAs: [
        "https://www.instagram.com/felippe.camara",
        "https://www.tiktok.com/@felippe.camara",
      ],
      knowsAbout: [
        "Desarrollo web",
        "Next.js",
        "Inteligencia artificial",
        "Automatización",
        "Diseño web",
        "SaaS",
        "E-commerce",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Felipe Cámara",
      description: DESCRIPTION,
      inLanguage: "es-ES",
      publisher: { "@id": `${SITE_URL}/#felipe` },
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1a1916",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="noise min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
