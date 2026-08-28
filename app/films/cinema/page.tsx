import type { Metadata } from "next";
import CinemaExperience from "./cinema-experience";

export const metadata: Metadata = {
  title: "CINEMA LATTICCE — LATTICCE FILMS",
  description: "Obras cinematográficas de LATTICCE FILMS.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function CinemaPage() {
  return <CinemaExperience />;
}
