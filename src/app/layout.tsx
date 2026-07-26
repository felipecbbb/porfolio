import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import MetaPixel from "@/components/MetaPixel";

// Tipografía principal de marca: Akzidenz-Grotesk BQ (Light / Medium / Bold).
// Mantiene la variable --font-geist-sans para no tocar las referencias existentes.
const geistSans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  src: [
    { path: "./fonts/akzidenz-light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/akzidenz-light-italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/akzidenz-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/akzidenz-bold.woff2", weight: "700", style: "normal" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Tipografía secundaria de marca: The Seasons (solo Italic), recurso de contraste.
// Mantiene la variable --font-serif.
const instrumentSerif = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "./fonts/theseasons-light-italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/theseasons-italic.woff2", weight: "400", style: "italic" },
  ],
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
  // Iconos con versión explícita (?v=2) para reventar la caché de favicon
  // (el fc oficial ya estaba, pero los navegadores clavan la versión vieja).
  icons: {
    icon: [
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png?v=2" }],
  },
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
  themeColor: "#1c1b1b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="noise min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          {children}
          <MetaPixel />
        </LanguageProvider>
      </body>
    </html>
  );
}
