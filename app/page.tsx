import type { Metadata } from "next";
import HomeExperience from "./home-experience";

export const metadata: Metadata = {
  title: "LATTICCE — Un sistema creativo",
  description:
    "LATTICCE articula estrategia, diseño, imagen, sonido, cine y memoria en un solo sistema creativo.",
};

export default function HomePage() {
  return <HomeExperience />;
}
