import type { Metadata } from "next";
import LuninDetailClient from "./LuninDetailClient";

export const metadata: Metadata = {
  alternates: { canonical: "/proyecto/lunin" },
  openGraph: { url: "https://felippecamara.com/proyecto/lunin", type: "article", images: ["/projects/lunin/cover-cherry.jpg"] },
  title: "Lunin Cocktail Bar — Felipe Cámara",
  description:
    "Web, carta digital, reservas de eventos y redes sociales para Lunin Cocktail Bar — coctelería de autor con destilería propia en Russafa, Valencia.",
};

export default function LuninPage() {
  return <LuninDetailClient />;
}
