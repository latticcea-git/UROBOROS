import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../agency.module.css";

const servicePages = {
  "contenido-rrss": {
    title: "CONTENIDO RRSS",
    description: "Creación, programación y resultados mensuales para tus redes.",
  },
  "ecosistemas-ui-ux": {
    title: "ECOSISTEMAS UI–UX",
    description: "Sitios, landings, e-commerce y experiencias digitales conectadas.",
  },
  "distribucion-ads": {
    title: "DISTRIBUCIÓN ADS",
    description: "Publicidad pagada para impulsar, segmentar y convertir.",
  },
} as const;

type ServiceSlug = keyof typeof servicePages;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(servicePages).map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: PageProps<"/agency/[service]">): Promise<Metadata> {
  const { service } = await params;
  const page = servicePages[service as ServiceSlug];
  if (!page) return {};

  return {
    title: `${page.title} — LATTICCE Agency`,
    description: page.description,
  };
}

export default async function AgencyServicePage({ params }: PageProps<"/agency/[service]">) {
  const { service } = await params;
  const page = servicePages[service as ServiceSlug];

  if (!page) notFound();

  return (
    <main className={styles.servicePreview}>
      <div>
        <span>LATTICCE AGENCY / PRÓXIMA FASE</span>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <Link href="/agency">VOLVER AL SELECTOR</Link>
      </div>
    </main>
  );
}
