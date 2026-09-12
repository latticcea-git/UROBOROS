import type { Metadata } from "next";
import BookExperience from "./book-experience";
import { bookAssetPath } from "./book-data";

export const metadata: Metadata = {
  title: "LATTICCE BOOK — Archivo creativo",
  description:
    "Explora el archivo creativo de LATTICCE a través de Agency, Studio, Sound, Design y Time.",
  openGraph: {
    title: "LATTICCE BOOK",
    description: "Un archivo creativo vivo: cinco nodos, una intención.",
    images: [bookAssetPath("/og.png")],
  },
  alternates: { canonical: "/book/" },
};

export default function BookPage() {
  return <BookExperience />;
}
