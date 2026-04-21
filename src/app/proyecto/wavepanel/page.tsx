import type { Metadata } from "next";
import WavepanelDetailClient from "./WavepanelDetailClient";

export const metadata: Metadata = {
  title: "WavePanel · Software para escuelas de surf — Felipe Cámara",
  description:
    "SaaS completo para escuelas de surf, kite y deportes acuáticos. Reservas, tienda, pagos y web pública. Producto propio construido end-to-end.",
};

export default function WavepanelPage() {
  return <WavepanelDetailClient />;
}
