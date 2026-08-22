import type { Metadata } from "next";
import AgencyExperience from "./agency-experience";

export const metadata: Metadata = {
  title: "LATTICCE Agency — Sistemas digitales que crecen",
  description:
    "Contenido, experiencias y distribución para hacer crecer marcas en el mundo digital.",
};

export default function AgencyPage() {
  return <AgencyExperience />;
}
