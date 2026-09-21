import type { Metadata } from "next";
import BookExperience from "./book-experience";
import { publicUrl, socialImage } from "../site-metadata";

export const metadata: Metadata = {
  title: "LATTICCE BOOK — Archivo creativo",
  description:
    "Explora el archivo creativo de LATTICCE a través de Agency, Studio, Sound, Design y Time.",
  openGraph: {
    title: "LATTICCE BOOK",
    description: "Un archivo creativo vivo: cinco nodos, una intención.",
    images: [socialImage("/assets/images/book/sofia-stainer/sofia-stainer-poster.jpg", "LATTICCE BOOK")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/book/sofia-stainer/sofia-stainer-poster.jpg")] },
  alternates: { canonical: "/book/" },
};

export default function BookPage() {
  return <BookExperience />;
}
