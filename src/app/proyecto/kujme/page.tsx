import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import KujmeDetailClient from "./KujmeDetailClient";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kujme — Felipe Cámara",
  description:
    "Doce agentes IA jerárquicos que generan, publican y miden contenido todos los días por menos de 6€/mes. Newsletter, blog SEO, posts LinkedIn y emails de conversión — sin tocar nada.",
};

export default function KujmePage() {
  return (
    <div className={`${inter.variable} ${mono.variable}`}>
      <KujmeDetailClient />
    </div>
  );
}
