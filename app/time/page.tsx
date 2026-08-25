import type { Metadata } from "next";
import TimeExperience from "./time-experience";

export const metadata: Metadata = {
  title: "LATTICCE Time — Fotografía y video para tu evento",
  description:
    "Fotografía, video y memoria impresa para bodas, XV años y eventos. Coberturas flexibles, cercanas y hechas a la medida.",
};

export default function TimePage() {
  return <TimeExperience />;
}
