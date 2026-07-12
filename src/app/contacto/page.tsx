import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto · Felipe Cámara",
  description:
    "¿Tienes un proyecto? Cuéntame qué necesitas — webs, tiendas online, plataformas a medida. Respondo rápido.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    type: "website",
    url: "https://felippecamara.com/contacto",
    title: "Contacto · Felipe Cámara",
    description: "¿Tienes un proyecto? Cuéntame qué necesitas. Respondo rápido.",
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}
