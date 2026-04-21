import type { Metadata } from "next";
import { Changa, Poppins, JetBrains_Mono } from "next/font/google";
import AlmaDetailClient from "./AlmaDetailClient";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-changa",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alma de Nómada — Felipe Cámara",
  description:
    "Web para travel coach: asesoría de viaje y cambio de vida. 9 destinos, captación de leads y un proceso transparente.",
};

export default function AlmaPage() {
  return (
    <div className={`${changa.variable} ${poppins.variable} ${mono.variable}`}>
      <AlmaDetailClient />
    </div>
  );
}
