import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProyectosClient from "./ProyectosClient";

export const metadata: Metadata = {
  title: "Proyectos · Felipe Cámara",
  description:
    "Catálogo completo de proyectos: SaaS, webs, e-commerce y plataformas. Busca por nombre, filtra por categoría o por tecnología.",
};

export default function ProyectosPage() {
  return <ProyectosClient projects={projects} />;
}
