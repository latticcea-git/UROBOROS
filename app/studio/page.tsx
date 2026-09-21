import type { Metadata } from "next";
import StudioExperience from "./studio-experience";

export const metadata: Metadata = {
  title: "LATTICCE Studio — Foto + video comercial",
  description:
    "Fotografía, video, postproducción y contenido para marcas, artistas y empresas.",
  alternates: { canonical: "/studio/" },
};

export default function StudioPage() {
  return <StudioExperience />;
}
