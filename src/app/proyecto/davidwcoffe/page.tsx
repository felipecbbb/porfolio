import type { Metadata } from "next";
import { Anton, Fraunces } from "next/font/google";
import DavidwcoffeDetailClient from "./DavidwcoffeDetailClient";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "David W. Coffe — Felipe Cámara",
  description:
    "Web multipágina para David W. Coffe, coach de mindset y hábitos con +275K de comunidad. Paleta bloqueada de 2 colores, fotografía en blanco y negro y modelo de sesiones de pago 1 a 1.",
  alternates: { canonical: "/proyecto/davidwcoffe" },
  openGraph: {
    type: "article",
    url: "https://felippecamara.com/proyecto/davidwcoffe",
    title: "David W. Coffe — Felipe Cámara",
    description:
      "Web editorial de dos colores y fotografía B/N para un coach de mindset y hábitos. Diseño, desarrollo y dirección.",
    images: ["/projects/davidwcoffe/hero.jpg"],
  },
};

export default function DavidwcoffePage() {
  return (
    <div className={`${anton.variable} ${fraunces.variable}`}>
      <DavidwcoffeDetailClient />
    </div>
  );
}
