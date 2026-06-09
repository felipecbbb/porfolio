import type { Metadata } from "next";
import ArgaDetailClient from "./ArgaDetailClient";

export const metadata: Metadata = {
  title: "ARGA Premium Cars — Felipe Cámara",
  description:
    "Web premium para ARGA Premium Cars — importación de coches premium de Alemania a España. Estética dark & dorado, blog SEO y proceso de importación explicado.",
  alternates: { canonical: "/proyecto/arga-premium-cars" },
  openGraph: {
    type: "article",
    url: "https://felippecamara.com/proyecto/arga-premium-cars",
    title: "ARGA Premium Cars — Felipe Cámara",
    description:
      "Web premium para un importador de coches de Alemania. Dark & dorado, blog SEO y formulario de presupuesto.",
    images: ["/projects/arga-premium-cars/hero.jpg"],
  },
};

export default function ArgaPage() {
  return <ArgaDetailClient />;
}
