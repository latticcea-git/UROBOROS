import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../json-ld";
import CinemaExperience from "../cinema-experience";
import { getCinemaWork, publishedCinemaWorks } from "../cinema-data";
import { publicUrl, socialImage } from "../../../site-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCinemaWorks.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: PageProps<"/films/cinema/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getCinemaWork(slug);
  if (!work) return {};
  const datedTitle = work.year === "—" ? work.title : `${work.title} ${work.year}`;
  return {
    title: `${datedTitle} — CINEMA LATTICCE — LATTICCE FILMS`,
    description: work.synopsis,
    alternates: { canonical: `/films/cinema/${work.slug}/` },
    robots: work.indexable ? undefined : { index: false, follow: false, nocache: true },
    openGraph: {
      title: `${datedTitle} — CINEMA LATTICCE`,
      description: work.synopsis,
      images: [socialImage(work.poster, work.posterAlt)],
    },
    twitter: {
      title: `${datedTitle} — CINEMA LATTICCE`,
      description: work.synopsis,
      card: "summary_large_image",
      images: [publicUrl(work.poster)],
    },
  };
}

export default async function CinemaWorkPage({ params }: PageProps<"/films/cinema/[slug]">) {
  const { slug } = await params;
  const work = getCinemaWork(slug);
  if (!work) notFound();

  const cinemaWorkJsonLd = work.indexable ? {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.synopsis,
    url: publicUrl(`/films/cinema/${work.slug}/`),
    image: publicUrl(work.poster),
    genre: work.category,
    author: { "@type": "Person", name: work.author },
    isPartOf: { "@type": "CollectionPage", name: "Cinema LATTICCE", url: publicUrl("/films/cinema/") },
    ...(work.year === "—" ? {} : { dateCreated: work.year }),
  } : null;

  return <>{cinemaWorkJsonLd && <JsonLd data={cinemaWorkJsonLd} />}<CinemaExperience initialSlug={slug} /></>;
}
