import type { Metadata } from "next";
import BlogExperience from "./blog-experience";

export const metadata: Metadata = {
  title: "LATTICCE BLOG — Miradas que construyen",
  description:
    "Pensamiento, procesos y referencias de LATTICCE Films, Studio, Sound, Design, Agency y Time.",
  openGraph: {
    title: "LATTICCE BLOG",
    description: "Miradas que construyen. Ideas que transforman.",
    images: ["/UROBOROS/og.png"],
  },
};

export default function BlogPage() {
  return <BlogExperience />;
}
