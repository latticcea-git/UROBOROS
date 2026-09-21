import type { Metadata } from "next";
import AgencyExperience from "./agency-experience";
import { publicUrl, socialImage } from "../site-metadata";

export const metadata: Metadata = {
  title: "LATTICCE Agency — Sistemas digitales que crecen",
  description:
    "Contenido, experiencias y distribución para hacer crecer marcas en el mundo digital.",
  openGraph: {
    title: "LATTICCE Agency — Sistemas digitales que crecen",
    description: "Contenido, experiencias y distribución para hacer crecer marcas en el mundo digital.",
    images: [socialImage("/assets/images/agency/agency-gateway-v2.png", "LATTICCE Agency")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/agency/agency-gateway-v2.png")] },
  alternates: { canonical: "/agency/" },
};

export default function AgencyPage() {
  return <AgencyExperience />;
}
