import type { Metadata } from "next";
import IcaroDetailClient from "./IcaroDetailClient";

export const metadata: Metadata = {
  alternates: { canonical: "/proyecto/icaro" },
  openGraph: { url: "https://felippecamara.com/proyecto/icaro", type: "article", images: ["/projects/icaro/cover.jpg"] },
  title: "ÍCARO — Felipe Cámara",
  description:
    "Tienda online a medida en Shopify para ÍCARO, sneakers hechas a mano en Portugal. Tema custom minimalista, bilingüe, con drops y reseñas.",
};

export default function IcaroPage() {
  return <IcaroDetailClient />;
}
