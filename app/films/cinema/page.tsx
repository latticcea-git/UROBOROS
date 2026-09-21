import type { Metadata } from "next";
import CinemaExperience from "./cinema-experience";
import JsonLd from "../../json-ld";
import { publicUrl, socialImage } from "../../site-metadata";
import { indexableCinemaWorks } from "./cinema-data";

export const metadata: Metadata = {
  title: "Producción cinematográfica, videoclips y obras | Cinema LATTICCE",
  description: "Cinema LATTICCE reúne obras, videoclips y producción cinematográfica para cineastas, artistas, marcas y proyectos audiovisuales.",
  openGraph: {
    title: "Cinema LATTICCE — Producción cinematográfica y videoclips",
    description: "Obras y producción audiovisual de LATTICCE Films.",
    images: [socialImage("/assets/images/films/cinema/cinema-auditorium-generated-draft-v1.jpg", "CINEMA LATTICCE")],
  },
  twitter: { card: "summary_large_image", images: [publicUrl("/assets/images/films/cinema/cinema-auditorium-generated-draft-v1.jpg")] },
  alternates: { canonical: "/films/cinema/" },
};

export default function CinemaPage() {
  const cinemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cinema LATTICCE",
    description: "Obras, videoclips y producción cinematográfica de LATTICCE Films.",
    url: publicUrl("/films/cinema/"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: indexableCinemaWorks.map((work, position) => ({
        "@type": "ListItem",
        position: position + 1,
        url: publicUrl(`/films/cinema/${work.slug}/`),
        name: work.title,
      })),
    },
  };

  return <><JsonLd data={cinemaJsonLd} /><CinemaExperience /></>;
}
