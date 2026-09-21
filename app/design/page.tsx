import type { Metadata } from "next";
import DesignExperience from "./design-experience";
import { publicUrl, socialImage } from "../site-metadata";

export const metadata: Metadata = {
  title: "LATTICCE Design — La idea toma forma",
  description:
    "Branding, dirección de arte, diseño editorial, 3D, animación, packaging y contenido para marcas que quieren tomar forma.",
  openGraph: {
    title: "LATTICCE Design — La idea toma forma",
    description: "Branding, dirección de arte, diseño editorial, 3D, animación, packaging y contenido para marcas que quieren tomar forma.",
    images: [socialImage("/assets/images/design/design-branding-universe-generated-draft-v1.png", "LATTICCE Design")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/design/design-branding-universe-generated-draft-v1.png")] },
  alternates: { canonical: "/design/" },
};

export default function DesignPage() {
  return <DesignExperience />;
}
