import type { Metadata } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import JMPadelDetailClient from "./JMPadelDetailClient";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JM Padel Academy — Felipe Cámara",
  description:
    "Sistema completo para academia de pádel: branding, web full-stack con e-commerce, 3 vídeos de método, 8 guías formativas y ebook. Stack Vite + React + Stripe + Vercel.",
};

export default function JMPadelPage() {
  return (
    <div className={`${archivo.variable} ${interTight.variable}`}>
      <JMPadelDetailClient />
    </div>
  );
}
