import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    robots: { index: false, follow: false, nocache: true },
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
  if (!getCinemaWork(slug)) notFound();
  return <CinemaExperience initialSlug={slug} />;
}
