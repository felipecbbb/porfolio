import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Felipe Cámara — Desarrollo, Diseño y Estrategia Digital",
  description:
    "Portfolio de Felipe Cámara Barroso. Desarrollo de software, diseño web y gestión de redes sociales. Soluciones digitales que funcionan.",
  keywords: [
    "desarrollo web",
    "diseño web",
    "freelance",
    "portfolio",
    "Felipe Cámara",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="noise min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
