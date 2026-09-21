import type { Metadata } from "next";
import StudioExperience from "./studio-experience";
import { publicUrl, socialImage } from "../site-metadata";

export const metadata: Metadata = {
  title: "LATTICCE Studio — Foto + video comercial",
  description:
    "Fotografía, video, postproducción y contenido para marcas, artistas y empresas.",
  openGraph: {
    title: "LATTICCE Studio — Foto + video comercial",
    description: "Fotografía, video, postproducción y contenido para marcas, artistas y empresas.",
    images: [socialImage("/assets/images/studio/studio-cdmx-golden-hour-generated-draft-v2-optimized.jpg", "LATTICCE Studio")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/studio/studio-cdmx-golden-hour-generated-draft-v2-optimized.jpg")] },
  alternates: { canonical: "/studio/" },
};

export default function StudioPage() {
  return <StudioExperience />;
}
