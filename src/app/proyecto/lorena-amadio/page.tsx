import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import LorenaDetailClient from "./LorenaDetailClient";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lorena Amadio — Felipe Cámara",
  description:
    "Web para psicóloga sanitaria. Terapia online, reservas en un solo paso y un espacio que cuida a quien entra.",
};

export default function LorenaPage() {
  return (
    <div className={`${cormorant.variable} ${dmSans.variable}`}>
      <LorenaDetailClient />
    </div>
  );
}
