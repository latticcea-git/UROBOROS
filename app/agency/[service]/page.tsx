import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgencyServiceExperience from "./agency-service-experience";
import { isServiceSlug, servicePages, serviceSlugs } from "./service-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: PageProps<"/agency/[service]">): Promise<Metadata> {
  const { service } = await params;
  if (!isServiceSlug(service)) return {};
  const page = servicePages[service];

  return {
    title: `${page.title} — LATTICCE AGENCY`,
    description: page.intro,
  };
}

export default async function AgencyServicePage({ params }: PageProps<"/agency/[service]">) {
  const { service } = await params;
  if (!isServiceSlug(service)) notFound();

  return <AgencyServiceExperience service={servicePages[service]} />;
}
