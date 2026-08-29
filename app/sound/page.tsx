import type { Metadata } from "next";
import SoundExperience from "./sound-experience";

export const metadata: Metadata = {
  title: "LATTICCE Sound — Lo invisible toma cuerpo",
  description:
    "Grabación, postproducción, sonido directo y musicalización para estudio, set y formatos digitales.",
};

export default function SoundPage() {
  return <SoundExperience />;
}
