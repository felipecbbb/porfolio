import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProyectosClient from "./ProyectosClient";

export const metadata: Metadata = {
  title: "Proyectos · Felipe Cámara",
  description:
    "Catálogo completo de proyectos: SaaS, webs, e-commerce y plataformas. Busca por nombre, filtra por categoría o por tecnología.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    type: "website",
    url: "https://felippecamara.com/proyectos",
    title: "Proyectos · Felipe Cámara",
    description:
      "Webs, SaaS, e-commerce y plataformas a medida. Casos reales de desarrollo y diseño.",
  },
};

export default function ProyectosPage() {
  return <ProyectosClient projects={projects} />;
}
