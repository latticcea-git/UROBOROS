import type { Metadata } from "next";
import DesignExperience from "./design-experience";

export const metadata: Metadata = {
  title: "LATTICCE Design — Ideas que toman forma",
  description:
    "Identidad, dirección de arte, editorial, experiencias digitales, 3D y movimiento construidos como sistemas vivos.",
};

export default function DesignPage() {
  return <DesignExperience />;
}
