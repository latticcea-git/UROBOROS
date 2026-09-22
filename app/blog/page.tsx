import type { Metadata } from "next";
import BlogExperience from "./blog-experience";
import { publicUrl, socialImage } from "../site-metadata";

export const metadata: Metadata = {
  title: "LATTICCE BLOG — Los textos de nuestros Transductores",
  description:
    "El archivo vivo de ideas, procesos, referencias y herramientas de LATTICCE Films, Studio, Sound, Design, Agency y Time.",
  openGraph: {
    title: "LATTICCE BLOG",
    description: "Los textos de nuestros Transductores.",
    images: [socialImage("/assets/images/book/sofia-stainer/sofia-stainer-poster.jpg", "LATTICCE BLOG")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/book/sofia-stainer/sofia-stainer-poster.jpg")] },
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return <BlogExperience />;
}
