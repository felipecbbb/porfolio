import type { Metadata } from "next";
import { Unbounded, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import SambaDetailClient from "./SambaDetailClient";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samba Trips — Felipe Cámara",
  description:
    "Web para Samba Trips: viajes en grupo por Asia, África y Europa. Atlas de destinos, reservas y comunidad.",
};

export default function SambaPage() {
  return (
    <div className={`${unbounded.variable} ${jakarta.variable} ${mono.variable}`}>
      <SambaDetailClient />
    </div>
  );
}
