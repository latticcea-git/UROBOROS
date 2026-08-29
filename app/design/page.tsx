import type { Metadata } from "next";
import DesignExperience from "./design-experience";

export const metadata: Metadata = {
  title: "LATTICCE Design — La idea toma forma",
  description:
    "Branding, dirección de arte, diseño editorial, 3D, animación, packaging y contenido para marcas que quieren tomar forma.",
};

export default function DesignPage() {
  return <DesignExperience />;
}
