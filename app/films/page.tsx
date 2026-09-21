import type { Metadata } from "next";
import FilmsExperience from "./films-experience";
import { publicUrl, socialImage } from "../site-metadata";

export const metadata: Metadata = {
  title: "LATTICCE FILMS — Sigue la luz",
  description: "Una experiencia cinematográfica interactiva: del logotipo a la arquitectura, del recorrido a la luz.",
  openGraph: {
    title: "LATTICCE FILMS — Sigue la luz",
    description: "Una experiencia cinematográfica interactiva: del logotipo a la arquitectura, del recorrido a la luz.",
    images: [socialImage("/assets/images/films/cinema/cinema-auditorium-generated-draft-v1.jpg", "LATTICCE FILMS")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/films/cinema/cinema-auditorium-generated-draft-v1.jpg")] },
  alternates: { canonical: "/films/" },
};

export default function FilmsPage() {
  return <FilmsExperience />;
}
