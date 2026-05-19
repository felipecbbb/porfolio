import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import WayaSurfDetailClient from "./WayaSurfDetailClient";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waya Surf — Felipe Cámara",
  description:
    "Web para escuela de surf en Playa del Hombre, Gran Canaria. 15 años de método propio, sistema de niveles y bono residente — en una web que enseña antes de vender.",
};

export default function WayaSurfPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable}`}>
      <WayaSurfDetailClient />
    </div>
  );
}
