import type { Metadata } from "next";
import { Work_Sans, Fraunces } from "next/font/google";
import AolelimDetailClient from "./AolelimDetailClient";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "800"],
  variable: "--font-worksans",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AOLELIM — Felipe Cámara",
  description:
    "Tienda Shopify completa para AOLELIM, marca de baño y beachwear. «Eleva tu rollo»: lujo minimalista, copy íntegro de la marca y secciones Liquid a medida.",
  alternates: { canonical: "/proyecto/aolelim" },
  openGraph: {
    type: "article",
    url: "https://felippecamara.com/proyecto/aolelim",
    title: "AOLELIM — Felipe Cámara",
    description:
      "E-commerce de moda baño en Shopify: tema exprimido, copy en la voz de la marca y una sección custom que vende el set completo.",
    images: ["/projects/aolelim/hero.jpg"],
  },
};

export default function AolelimPage() {
  return (
    <div className={`${workSans.variable} ${fraunces.variable}`}>
      <AolelimDetailClient />
    </div>
  );
}
