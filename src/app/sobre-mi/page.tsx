import type { Metadata } from "next";
import SobreMiClient from "./SobreMiClient";

export const metadata: Metadata = {
  title: "Sobre mí · Felipe Cámara",
  description:
    "No vengo solo del código: festivales, humoristas, influencers, lanzamientos de infoproductos, plataformas y una empresa de marketing. Visión de negocio + diseño + código.",
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    type: "profile",
    url: "https://felippecamara.com/sobre-mi",
    title: "Sobre mí · Felipe Cámara",
    description:
      "Desarrollador, diseñador y emprendedor. Eventos, marketing, plataformas e IA — todo en cada proyecto.",
  },
};

export default function SobreMiPage() {
  return <SobreMiClient />;
}
