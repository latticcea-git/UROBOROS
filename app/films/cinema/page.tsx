import type { Metadata } from "next";
import CinemaExperience from "./cinema-experience";
import { publicUrl, socialImage } from "../../site-metadata";

export const metadata: Metadata = {
  title: "CINEMA LATTICCE — LATTICCE FILMS",
  description: "Obras cinematográficas de LATTICCE FILMS.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "CINEMA LATTICCE — LATTICCE FILMS",
    description: "Obras cinematográficas de LATTICCE FILMS.",
    images: [socialImage("/assets/images/films/cinema/cinema-auditorium-generated-draft-v1.jpg", "CINEMA LATTICCE")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/films/cinema/cinema-auditorium-generated-draft-v1.jpg")] },
  alternates: { canonical: "/films/cinema/" },
};

export default function CinemaPage() {
  return <CinemaExperience />;
}
