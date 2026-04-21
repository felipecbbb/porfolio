import type { Metadata } from "next";
import { projects } from "@/data/projects";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Felipe Cámara — Desarrollo, Diseño y Estrategia Digital",
  description:
    "Desarrollador de software y diseñador web. SaaS, webs, landings y plataformas a medida. Freelance en España.",
};

export default function Home() {
  return <HomeClient projects={projects} />;
}
