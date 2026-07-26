import type { Metadata } from "next";
import TrabajoConmigoClient from "./TrabajoConmigoClient";

/* =========================================================
   /trabajo-conmigo — LANDING DE CIERRE para tráfico de pago (Meta).
   NO es el portfolio: una promesa, una oferta, un CTA (agendar).
   noindex: es destino de ads, no de SEO orgánico.
   ========================================================= */

export const metadata: Metadata = {
  title: "Web + reservas para tu negocio de turismo | Felipe Cámara",
  description:
    "Webs con motor de reservas para negocios de turismo en Canarias. Recibe reservas directas sin comisiones. Lista en 3-4 semanas. Agenda una llamada de 15 min.",
  alternates: { canonical: "/trabajo-conmigo" },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://felippecamara.com/trabajo-conmigo",
    title: "Web + reservas para tu negocio de turismo",
    description:
      "Reservas directas sin comisiones. Lista en 3-4 semanas. Agenda 15 min con Felipe Cámara.",
  },
};

export default function Page() {
  return <TrabajoConmigoClient />;
}
