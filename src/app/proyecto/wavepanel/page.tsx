import type { Metadata } from "next";
import WavepanelDetailClient from "./WavepanelDetailClient";

export const metadata: Metadata = {
  alternates: { canonical: "/proyecto/wavepanel" },
  openGraph: { type: "article", url: "https://felippecamara.com/proyecto/wavepanel" },
  title: "WavePanel · Software para escuelas de surf — Felipe Cámara",
  description:
    "SaaS completo para escuelas de surf, kite y deportes acuáticos. Reservas, tienda, pagos y web pública. Producto propio construido end-to-end.",
};

export default function WavepanelPage() {
  return <WavepanelDetailClient />;
}
