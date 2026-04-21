import type { Metadata } from "next";
import NoaDetailClient from "./NoaDetailClient";

export const metadata: Metadata = {
  title: "Noa — Felipe Cámara",
  description:
    "Noa, el asistente financiero con IA para autónomos y PYMEs. Diseño, desarrollo y producto — de principio a fin.",
};

export default function NoaPage() {
  return <NoaDetailClient />;
}
