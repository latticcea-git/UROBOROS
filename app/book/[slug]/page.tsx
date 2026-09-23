import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteMenu from "../../site-menu";
import { bookAssetPath, bookProjects, getBookNode, getBookProject, getRelatedProjects, type BookProject } from "../book-data";
import BookMotion from "../book-motion";
import BookHashEntry from "../book-hash-entry";
import FrutisaBrandCase from "../frutisa-brand-case";
import OkameBrandCase from "../okame-brand-case";
import GalleryLightbox from "../gallery-lightbox";
import ProjectMedia from "../project-media";
import styles from "../book.module.css";
import { publicUrl, socialImage } from "../../site-metadata";
import JsonLd from "../../json-ld";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...bookProjects.map((project) => ({ slug: project.slug })), { slug: "okame-nails" }];
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
      {(project.brandCase || project.frutisaCase || project.okameCase) && <BookHashEntry />}
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
        <a className={styles.projectScroll} href={project.brandCase || project.frutisaCase || project.okameCase ? "#identidad" : project.caseStudy ? "#caso" : project.galleryFirst ? "#galeria" : "#proyecto"} data-project-scroll>Descubrir <span aria-hidden="true">↓︎</span></a>
      </section>

      {project.okameCase ? (
        <OkameBrandCase project={project as BookProject & { okameCase: NonNullable<BookProject["okameCase"]> }} />
      ) : project.frutisaCase ? (
        <FrutisaBrandCase project={project as BookProject & { frutisaCase: NonNullable<BookProject["frutisaCase"]> }} />
      ) : project.brandCase ? (
        <>
          <nav className={styles.caseNodeNav} aria-label="Recorridos del caso">
            <a href="#identidad" data-node="design"><Image src={getBookNode("design").logo} alt="LATTICCE Design" width={300} height={76} /><span>Identidad y marca ↓</span></a>
            <a href="#agency" data-node="agency"><Image src={getBookNode("agency").logo} alt="LATTICCE Agency" width={300} height={76} /><span>Experiencia digital ↓</span></a>
          </nav>

          <section className={styles.brandOpening} id="identidad" data-project-statement>
            <div>
              <p><span>01</span> El reto</p>
              <h2>{project.brandCase.challenge}</h2>
            </div>
            <figure>
              <Image src={project.brandCase.assets.logoNegative} alt="Logotipo oficial de Shakti Yoga Estudio" fill sizes="(max-width: 760px) 100vw, 45vw" />
            </figure>
          </section>

          <section className={styles.brandConcept} aria-labelledby="brand-concept-title">
            <div>
              <p><span>02</span> Concepto de identidad</p>
              <h2 id="brand-concept-title">Sostenerse para <em>expandirse</em></h2>
              <p>{project.brandCase.concept}</p>
            </div>
            <div className={styles.brandSymbolStage}>
              <span aria-hidden="true">SHAKTI</span>
              <Image src={project.brandCase.assets.symbol} alt="Isotipo oficial de Shakti Yoga Estudio" width={665} height={578} />
              <p>{project.brandCase.symbol}</p>
            </div>
          </section>

          <section className={styles.brandLogoSystem} aria-labelledby="brand-system-title">
            <header>
              <p><span>03</span> Sistema de marca</p>
              <h2 id="brand-system-title">Una identidad, <em>distintas presencias</em></h2>
            </header>
            <div className={styles.brandLogoGrid}>
              <figure className={styles.brandLogoDark}><Image src={project.brandCase.assets.logoNegative} alt="Versión negativa del logotipo Shakti" fill sizes="50vw" /><figcaption>Marca completa / Negativo</figcaption></figure>
              <figure className={styles.brandLogoLight}><Image src={project.brandCase.assets.logoPositive} alt="Versión positiva del logotipo Shakti" fill sizes="50vw" /><figcaption>Marca completa / Positivo</figcaption></figure>
              <figure className={styles.brandWordmark}><Image src={project.brandCase.assets.logotype} alt="Logotipo horizontal Shakti" fill sizes="50vw" /><figcaption>Logotipo / Firma</figcaption></figure>
              <figure className={styles.brandSymbol}><Image src={project.brandCase.assets.symbol} alt="Isotipo Shakti" fill sizes="50vw" /><figcaption>Isotipo / Reconocimiento</figcaption></figure>
            </div>
          </section>

          <section className={styles.brandPrinciples}>
            {project.brandCase.principles.map((principle) => (
              <article key={principle.index} data-project-info-panel>
                <span>{principle.index}</span><h3>{principle.title}</h3><p>{principle.description}</p>
              </article>
            ))}
          </section>

          <section className={styles.brandPalette} aria-labelledby="brand-palette-title">
            <header><p><span>04</span> Paleta</p><h2 id="brand-palette-title">Color con <em>función</em></h2></header>
            <div>
              {project.brandCase.palette.map((color) => (
                <article key={color.value} style={{ background: color.value }} data-light={color.value === "#28472D" || color.value === "#1D1D1B" ? "true" : undefined}>
                  <strong>{color.name}</strong><span>{color.value}</span>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.brandApplications} aria-labelledby="brand-applications-title">
            <header><p><span>05</span> Despliegue</p><h2 id="brand-applications-title">La marca se vuelve <em>materia</em></h2></header>
            <div className={styles.brandApplicationStage}>
              <div className={styles.brandPoster}><Image src={project.brandCase.assets.symbol} alt="Aplicación del isotipo Shakti en cartel" width={665} height={578} /><span>FUERZA<br />QUE NACE<br />EN TI.</span></div>
              <div className={styles.brandCard}><Image src={project.brandCase.assets.logotype} alt="Aplicación del logotipo Shakti en papelería" width={665} height={487} /></div>
              <div className={styles.brandTote}><Image src={project.brandCase.assets.symbol} alt="Aplicación del isotipo Shakti en textil" width={665} height={578} /></div>
            </div>
            <div className={styles.brandApplicationList}>
              {project.brandCase.applications.map((application) => <article key={application.title}><h3>{application.title}</h3><p>{application.description}</p></article>)}
            </div>
          </section>

          <section className={styles.digitalCase} id="agency" aria-labelledby="digital-case-title">
            <div className={styles.digitalCaseIntro}>
              <Image src={getBookNode("agency").logo} alt="LATTICCE Agency" width={380} height={96} />
              <p><span>06</span> Extensión digital</p>
              <h2 id="digital-case-title">La identidad se convierte en <em>experiencia</em></h2>
              <p>{project.brandCase.agency.summary}</p>
            </div>
            <div className={styles.digitalBrowser}>
              <div><span /><span /><span /><small>shakti-yoga-estudio</small></div>
              <figure><Image src={project.brandCase.assets.websiteHero} alt="Hero del sitio web de Shakti Yoga Estudio" fill sizes="(max-width: 760px) 100vw, 58vw" /><Image className={styles.digitalBrowserLogo} src={project.brandCase.assets.logoNegative} alt="" width={160} height={260} /></figure>
            </div>
          </section>

          <section className={styles.websiteScreenshots} aria-labelledby="website-screenshots-title">
            <header>
              <p><span>07</span> Sitio publicado</p>
              <h2 id="website-screenshots-title">La experiencia, <em>en pantalla</em></h2>
              <p>Una muestra del recorrido real: la portada introduce el universo de marca, el catálogo organiza las prácticas y las pausas editoriales sostienen el ritmo emocional del sitio.</p>
            </header>
            <GalleryLightbox frames={project.brandCase.agency.screenshots} />
          </section>

          <section className={styles.digitalDecisions}>
            {project.brandCase.agency.decisions.map((decision, index) => (
              <article key={decision.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{decision.title}</h3><p>{decision.description}</p></article>
            ))}
          </section>

          <section className={styles.digitalStack}>
            <div><p><span>08</span> Implementación</p><h2>Ligero por <em>decisión</em></h2><a href={project.brandCase.agency.externalUrl} target="_blank" rel="noreferrer">Visitar sitio publicado ↗</a></div>
            <ul>{project.brandCase.agency.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </section>

          <section className={styles.projectInfo}>
            <div data-project-info-panel><p><span>09</span> Servicios</p><ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul></div>
            <div data-project-info-panel><p><span>10</span> Créditos</p><ul>{project.credits.map((credit) => <li key={credit}>{credit}</li>)}</ul></div>
          </section>
        </>
      ) : project.caseStudy ? (
        <>
          <section className={styles.caseIntro} id="caso" data-project-statement>
            <p><span>01</span> El punto de partida</p>
            <h2>{project.caseStudy.challenge}</h2>
            <div>
              <span>La transformación</span>
              <p>{project.caseStudy.transformation}</p>
            </div>
          </section>

          <section className={styles.casePillars} aria-labelledby="case-pillars-title">
            <header>
              <p><span>02</span> La solución</p>
              <h2 id="case-pillars-title">Un sistema, <em>tres capas</em></h2>
            </header>
            <div>
              {project.caseStudy.pillars.map((pillar) => (
                <article key={pillar.index} data-project-info-panel>
                  <span>{pillar.index}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.caseVisuals} aria-label="Ecosistema visual del proyecto">
            {project.caseStudy.visuals.map((visual, index) => (
              <figure key={visual.image} className={index === 0 ? styles.caseVisualLead : undefined}>
                <Image src={visual.image} alt={visual.alt} fill sizes={index === 0 ? "100vw" : "(max-width: 760px) 100vw, 50vw"} />
                <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{visual.caption}</figcaption>
              </figure>
            ))}
          </section>

          <section className={styles.caseJourney} aria-labelledby="case-journey-title">
            <header>
              <p><span>03</span> Arquitectura de experiencia</p>
              <h2 id="case-journey-title">Del primer contacto al <em>seguimiento</em></h2>
            </header>
            <ol>
              {project.caseStudy.journey.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.caseMetrics} aria-labelledby="case-metrics-title">
            <header>
              <p><span>04</span> Escala del sistema</p>
              <h2 id="case-metrics-title">Una operación que puede <em>medirse</em></h2>
              <p>Indicadores estructurales del ecosistema actual. La plantilla queda preparada para incorporar conversión, retención y crecimiento cuando exista analítica consolidada.</p>
            </header>
            <div>
              {project.caseStudy.metrics.map((metric) => (
                <article key={metric.label} data-project-info-panel>
                  <strong>{metric.value}</strong>
                  <h3>{metric.label}</h3>
                  <p>{metric.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.caseEcosystem} aria-labelledby="case-ecosystem-title">
            <div>
              <p><span>05</span> Ecosistema</p>
              <h2 id="case-ecosystem-title">Cada canal cumple <em>una función</em></h2>
              <p>{project.caseStudy.outcome}</p>
              <a href={project.caseStudy.externalUrl} target="_blank" rel="noreferrer">{project.caseStudy.externalLabel} <span aria-hidden="true">↗</span></a>
            </div>
            <ul>
              {project.caseStudy.ecosystem.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.caseParticipation}>
            <p><span>06</span> Participación LATTICCE</p>
            {project.caseStudy.nodeRoles.map((role) => {
              const roleNode = getBookNode(role.node);
              return (
                <div key={role.node}>
                  <Image src={roleNode.logo} alt={`LATTICCE ${roleNode.name}`} width={420} height={106} />
                  <p>{role.role}</p>
                </div>
              );
            })}
          </section>

          <section className={styles.projectInfo}>
            <div data-project-info-panel>
              <p><span>07</span> Servicios</p>
              <ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
            </div>
            <div data-project-info-panel>
              <p><span>08</span> Créditos</p>
              <ul>{project.credits.map((credit) => <li key={credit}>{credit}</li>)}</ul>
            </div>
          </section>
        </>
      ) : (
        <>
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
            <div><span>Nodo</span><strong>{node.name}</strong></div>
            <div><span>Categoría</span><strong>{project.category}</strong></div>
            <div><span>Año</span><strong>{project.year}</strong></div>
            <div><span>Estado</span><strong>{project.status ?? "Proyecto demostrativo"}</strong></div>
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
        </>
      )}

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
