import type { Metadata } from "next";
import { Playfair_Display, Yanone_Kaffeesatz } from "next/font/google";
import LaInquietaDetailClient from "./LaInquietaDetailClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const yanone = Yanone_Kaffeesatz({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-yanone",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Inquieta — Felipe Cámara",
  description:
    "Landing andaluza para La Inquieta · Caseta Nº154 de la Feria de Jerez 2026. Arco mozárabe, patrón geométrico, cartel SVG original y reservas por WhatsApp.",
};

export default function LaInquietaPage() {
  return (
    <div className={`${playfair.variable} ${yanone.variable}`}>
      <LaInquietaDetailClient />
    </div>
  );
}
