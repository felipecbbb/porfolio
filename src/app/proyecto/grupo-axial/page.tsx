import type { Metadata } from "next";
import GrupoAxialDetailClient from "./GrupoAxialDetailClient";

export const metadata: Metadata = {
  title: "Grupo Axial · 4 webs + redes sociales — Felipe Cámara",
  description:
    "Diseño y desarrollo de webs corporativas + gestión completa de redes sociales para el grupo de movilidad de Las Palmas: bicis, motos, alquiler y talleres.",
};

export default function GrupoAxialPage() {
  return <GrupoAxialDetailClient />;
}
