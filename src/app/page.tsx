import type { Metadata } from "next";
import { projects } from "@/data/projects";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: {
    absolute: "Felipe Cámara — Desarrollo web, software a medida e IA · Gran Canaria",
  },
  description:
    "Desarrollador y diseñador web freelance en Gran Canaria. Webs a medida, SaaS, e-commerce, landings y automatización con IA que convierten visitas en clientes. Hablemos de tu proyecto.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://felippecamara.com",
    title: "Felipe Cámara — Desarrollo web, software a medida e IA",
    description:
      "Webs a medida, SaaS, e-commerce y automatización con IA. Freelance en Gran Canaria.",
  },
};

export default function Home() {
  return <HomeClient projects={projects} />;
}
