import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import IPLDetailClient from "./IPLDetailClient";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Internacional Pedro Lezcano — Felipe Cámara",
  description:
    "Landing institucional para la XVIII Edición del Memorial Pedro Lezcano Montalvo 2026 — torneo internacional de ajedrez en Las Palmas. 22.000€ en premios, 9 rondas, validez FIDE.",
};

export default function IPLPage() {
  return (
    <div className={`${merriweather.variable} ${inter.variable}`}>
      <IPLDetailClient />
    </div>
  );
}
