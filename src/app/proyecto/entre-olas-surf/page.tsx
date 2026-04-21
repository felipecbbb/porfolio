import type { Metadata } from "next";
import { Bebas_Neue, Manrope, Space_Grotesk } from "next/font/google";
import EntreOlasDetailClient from "./EntreOlasDetailClient";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Entre Olas Surf — Felipe Cámara",
  description:
    "Web completa para escuela de surf en Playa de Roche: bonos, e-commerce, reservas y surf camps. Cádiz en la pantalla.",
};

export default function EntreOlasPage() {
  return (
    <div className={`${bebas.variable} ${manrope.variable} ${spaceGrotesk.variable}`}>
      <EntreOlasDetailClient />
    </div>
  );
}
