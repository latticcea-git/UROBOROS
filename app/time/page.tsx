import type { Metadata } from "next";
import TimeExperience from "./time-experience";
import { publicUrl, socialImage } from "../site-metadata";

export const metadata: Metadata = {
  title: "LATTICCE Time — Fotografía y video para tu evento",
  description:
    "Fotografía, video y memoria impresa para bodas, XV años y eventos. Coberturas flexibles, cercanas y hechas a la medida.",
  openGraph: {
    title: "LATTICCE Time — Fotografía y video para tu evento",
    description: "Fotografía, video y memoria impresa para bodas, XV años y eventos. Coberturas flexibles, cercanas y hechas a la medida.",
    images: [socialImage("/assets/images/time/wedding-hero-v1.png", "LATTICCE Time")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/time/wedding-hero-v1.png")] },
  alternates: { canonical: "/time/" },
};

export default function TimePage() {
  return <TimeExperience />;
}
