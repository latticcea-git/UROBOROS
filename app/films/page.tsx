import type { Metadata } from "next";
import FilmsExperience from "./films-experience";

export const metadata: Metadata = {
  title: "LATTICCE FILMS — Sigue la luz",
  description: "Una experiencia cinematográfica interactiva: del logotipo a la arquitectura, del recorrido a la luz.",
  alternates: { canonical: "/films/" },
};

export default function FilmsPage() {
  return <FilmsExperience />;
}
