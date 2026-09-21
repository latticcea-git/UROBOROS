import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteMenu from "../../site-menu";
import { bookAssetPath, bookProjects, getBookNode, getBookProject, getRelatedProjects } from "../book-data";
import BookMotion from "../book-motion";
import GalleryLightbox from "../gallery-lightbox";
import ProjectMedia from "../project-media";
import styles from "../book.module.css";
import { publicUrl, socialImage } from "../../site-metadata";
import JsonLd from "../../json-ld";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return bookProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getBookProject(slug);
  if (!project) return {};
  const node = getBookNode(project.node);
  return {
    title: `${project.title} | ${project.category} — LATTICCE ${node.name}`,
    description: project.summary,
    alternates: { canonical: `/book/${project.slug}/` },
    openGraph: { title: project.title, description: project.summary, images: [socialImage(project.image, project.alt)] },
    twitter: { card: "summary_large_image", title: project.title, description: project.summary, images: [publicUrl(project.image)] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getBookProject(slug);
  if (!project) notFound();

  const node = getBookNode(project.node);
  const related = getRelatedProjects(project);
  const galleryFrames = project.gallery ?? ["01", "02", "03", "04", "05", "06"].map((frame) => ({
    image: project.image,
    alt: `${project.alt} Encuadre ${frame}.`,
    caption: project.status ?? "Proyecto demostrativo",
  }));
  const gallery = (
    <section className={styles.projectGallery} id="galeria" aria-labelledby="gallery-title">
      <div className={styles.projectSectionHead} data-book-intro>
        <p><span>{project.galleryFirst ? "01" : "02"}</span> Galería</p>
        <h2 id="gallery-title">{project.galleryTitle ?? "Una imagen,"} <em>{project.galleryEmphasis ?? "seis ritmos"}</em></h2>
        <p>{project.galleryDescription ?? "Una secuencia visual que desarrolla el concepto, la atmósfera y los servicios planteados para el proyecto."}</p>
      </div>
      <GalleryLightbox frames={galleryFrames} />
    </section>
  );
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: publicUrl(`/book/${project.slug}/`),
    image: publicUrl(project.image),
    genre: project.category,
    dateCreated: project.year,
    keywords: project.services.join(", "),
    creativeWorkStatus: project.status ?? "Proyecto demostrativo",
    isPartOf: { "@type": "CollectionPage", name: "LATTICCE BOOK", url: publicUrl("/book/") },
  };

  return (
    <main className={styles.projectRoot} data-book-motion-root="project" data-node={project.node}>
      <JsonLd data={projectJsonLd} />
      <BookMotion variant="project" />
      <SiteMenu homeHref="/" logoSrc={bookAssetPath("/assets/logos/LTT_LOGO_1920_FX.png")} logoAlt="LATTICCE" />

      <section className={styles.projectHero} data-project-hero>
        <ProjectMedia project={project} priority sizes="100vw" hero />
        <span className={styles.projectHeroShade} />
        <div className={styles.projectBreadcrumb} data-project-breadcrumb>
          <Link href="/book">BOOK</Link><span>/</span><span>{node.name}</span><span>/</span><span>{project.category}</span>
        </div>
        <div className={styles.projectHeroCopy} data-project-hero-copy>
          <Image src={node.logo} alt={`LATTICCE ${node.name}`} width={420} height={106} />
          <p>{project.category} / {project.year}</p>
          <h1>{project.title}</h1>
          <span>{project.projectLabel ?? project.status ?? "Proyecto demostrativo"}</span>
        </div>
        <a className={styles.projectScroll} href={project.galleryFirst ? "#galeria" : "#proyecto"} data-project-scroll>Descubrir <span aria-hidden="true">↓︎</span></a>
      </section>

      {project.galleryFirst && gallery}

      <section className={styles.projectStatement} id="proyecto" data-project-statement>
        <p><span>{project.galleryFirst ? "02" : "01"}</span> El proyecto</p>
        <h2>{project.summary}</h2>
        <div>
          <span>Decisión central</span>
          <p>{project.decision}</p>
        </div>
      </section>

      <section className={styles.projectDetails} data-project-details>
        <div>
          <span>Nodo</span><strong>{node.name}</strong>
        </div>
        <div>
          <span>Categoría</span><strong>{project.category}</strong>
        </div>
        <div>
          <span>Año</span><strong>{project.year}</strong>
        </div>
        <div>
          <span>Estado</span><strong>{project.status ?? "Proyecto demostrativo"}</strong>
        </div>
      </section>

      {!project.galleryFirst && gallery}

      <section className={styles.projectInfo}>
        <div data-project-info-panel>
          <p><span>03</span> Servicios</p>
          <ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
        </div>
        <div data-project-info-panel>
          <p><span>04</span> Créditos</p>
          <ul>{project.credits.map((credit) => <li key={credit}>{credit}</li>)}</ul>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className={styles.projectSectionHead} data-book-intro>
          <p><span>05</span> La red continúa</p>
          <h2 id="related-title">También puede <em>interesarte</em></h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((candidate) => {
            const candidateNode = getBookNode(candidate.node);
            return (
              <Link href={`/book/${candidate.slug}`} key={candidate.slug} data-project-related-card data-node={candidate.node}>
                <div>
                  <ProjectMedia project={candidate} sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <span>{candidateNode.name} / {candidate.category}</span>
                <h3>{candidate.title}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className={styles.projectFooter}>
        <Link href="/book">←︎ Volver al archivo</Link>
        <Image src={bookAssetPath("/assets/logos/LTT_LOGO_1920_FX.png")} width={380} height={74} alt="LATTICCE" />
        <Link href="/#contacto">Iniciar un proyecto ↗︎</Link>
      </footer>
    </main>
  );
}
