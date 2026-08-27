import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./node-loading.module.css";

const pendingNodes = {
  sound: "Sound",
  book: "Book",
  blog: "Blog",
} as const;

type PendingNode = keyof typeof pendingNodes;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pendingNodes).map((node) => ({ node }));
}

export async function generateMetadata({ params }: PageProps<"/[node]">): Promise<Metadata> {
  const { node } = await params;
  const name = pendingNodes[node as PendingNode];

  return name
    ? { title: `LATTICCE ${name} — Próximamente` }
    : {};
}

export default async function NodeLoadingPage({ params }: PageProps<"/[node]">) {
  const { node } = await params;
  const name = pendingNodes[node as PendingNode];

  if (!name) notFound();

  return (
    <main className={styles.root} id="inicio" aria-labelledby="loading-title">
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.content}>
        <Image src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS.svg" width={246} height={47} alt="LATTICCE" priority />
        <p id="loading-title">{name} / en preparación</p>
        <span role="status">Cargando</span>
      </div>
    </main>
  );
}
