import type { Metadata } from "next";
import SoundExperience from "./sound-experience";
import { publicUrl, socialImage } from "../site-metadata";

export const metadata: Metadata = {
  title: "LATTICCE Sound — Lo invisible toma cuerpo",
  description:
    "Grabación, postproducción, sonido directo y musicalización para estudio, set y formatos digitales.",
  openGraph: {
    title: "LATTICCE Sound — Lo invisible toma cuerpo",
    description: "Grabación, postproducción, sonido directo y musicalización para estudio, set y formatos digitales.",
    images: [socialImage("/assets/images/sound/home-studio-generated-draft-v1-4k-v1.jpg", "LATTICCE Sound")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/sound/home-studio-generated-draft-v1-4k-v1.jpg")] },
  alternates: { canonical: "/sound/" },
};

export default function SoundPage() {
  return <SoundExperience />;
}
