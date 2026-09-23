import Image from "next/image";
import { getBookNode, type BookProject } from "./book-data";
import GalleryLightbox from "./gallery-lightbox";
import styles from "./book.module.css";

type FrutisaBrandCaseProps = {
  project: BookProject & { frutisaCase: NonNullable<BookProject["frutisaCase"]> };
};

export default function FrutisaBrandCase({ project }: FrutisaBrandCaseProps) {
  const brand = project.frutisaCase;

  return (
    <>
      <nav className={styles.caseNodeNav} aria-label="Recorridos del caso">
        <a href="#identidad" data-node="design"><Image src={getBookNode("design").logo} alt="LATTICCE Design" width={300} height={76} /><span>Identidad, personaje y aplicaciones ↓</span></a>
        <a href="#agency" data-node="agency"><Image src={getBookNode("agency").logo} alt="LATTICCE Agency" width={300} height={76} /><span>Experiencia digital ↓</span></a>
      </nav>

      <section className={`${styles.brandOpening} ${styles.frutisaOpening}`} id="identidad" data-project-statement>
        <div>
          <p><span>01</span> El reto</p>
          <h2>{brand.challenge}</h2>
        </div>
        <figure><Image className={styles.frutisaLogoBackdrop} src={brand.backgrounds.waffle} alt="" fill sizes="(max-width: 760px) 100vw, 45vw" /><Image className={styles.frutisaLogoArtwork} src={brand.logoVariants[0].image} alt={brand.logoVariants[0].alt} fill sizes="(max-width: 760px) 100vw, 45vw" /></figure>
      </section>

      <section className={styles.frutisaConcept} aria-labelledby="frutisa-concept-title">
        <div>
          <p><span>02</span> Concepto de identidad</p>
          <h2 id="frutisa-concept-title">Sabor que se <em>reconoce</em></h2>
          <p>{brand.concept}</p>
        </div>
        <figure><Image className={styles.frutisaLogoBackdrop} src={brand.backgrounds.cream} alt="" fill sizes="(max-width: 760px) 100vw, 58vw" /><Image className={styles.frutisaLogoArtwork} src={brand.logoVariants[1].image} alt={brand.logoVariants[1].alt} fill sizes="(max-width: 760px) 100vw, 58vw" /></figure>
      </section>

      <section className={`${styles.brandLogoSystem} ${styles.frutisaLogoSystem}`} aria-labelledby="frutisa-logo-title">
        <header><p><span>03</span> Sistema de logotipo</p><h2 id="frutisa-logo-title">Una firma, <em>distintas materias</em></h2></header>
        <div className={styles.frutisaLogoGrid}>
          {brand.logoVariants.map((variant) => (
            <figure key={variant.caption} data-backdrop={variant.backdrop}>
              <Image className={styles.frutisaLogoBackdrop} src={brand.backgrounds[variant.backdrop]} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
              <Image className={styles.frutisaLogoArtwork} src={variant.image} alt={variant.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              <figcaption>{variant.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.brandPrinciples}>
        {brand.principles.map((principle) => <article key={principle.index} data-project-info-panel><span>{principle.index}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}
      </section>

      <section className={styles.frutisaPalette} aria-labelledby="frutisa-palette-title">
        <div><p><span>04</span> Paleta y código</p><h2 id="frutisa-palette-title">Cada sabor tiene <em>un color</em></h2><p>{brand.paletteSummary}</p></div>
        <div className={styles.frutisaSwatches}>
          {brand.palette.map((color) => <article key={color.value} style={{ backgroundColor: color.value }} data-dark={color.value === "#4A388E" || color.value === "#7A4A2A" || color.value === "#13132A" ? "true" : undefined}><span>{color.description}</span><strong>{color.name}</strong><small>{color.value}</small></article>)}
        </div>
      </section>

      <section className={styles.frutisaPet} aria-labelledby="frutisa-pet-title">
        <header><p><span>05</span> Brand Pet</p><h2 id="frutisa-pet-title">De la primera línea a <em>una personalidad</em></h2><p>{brand.petSummary}</p></header>
        <div className={styles.frutisaPetProcess}>
          <figure><Image src={brand.petSketch} alt="Boceto de proceso del personaje de Frutisa con estudios de pose, expresión y construcción" fill sizes="(max-width: 760px) 100vw, 67vw" /><figcaption>Boceto de proceso / Exploración de silueta y gesto</figcaption></figure>
          <figure><Image src={brand.petFinal} alt="Versión final a color del Brand Pet de Frutisa" fill sizes="(max-width: 760px) 100vw, 33vw" /><figcaption>Personaje final / Volumen, color y actitud</figcaption></figure>
        </div>
        <GalleryLightbox frames={brand.petGallery} />
      </section>

      <section className={styles.frutisaApplications} aria-labelledby="frutisa-applications-title">
        <header><p><span>06</span> La marca en uso</p><h2 id="frutisa-applications-title">La identidad sale a <em>vivir</em></h2><p>{brand.applicationsSummary}</p></header>
        <figure className={styles.frutisaCapMock}><Image src={brand.capBase} alt="Gorra color crema en un entorno material Frutisa" fill sizes="100vw" /><Image src={brand.logoVariants[0].image} alt="Logotipo Frutisa aplicado en gorra" width={1536} height={1024} /><figcaption>Indumentaria / Aplicación del logotipo</figcaption></figure>
        <GalleryLightbox frames={brand.applications} />
      </section>

      <section className={styles.frutisaLabels} aria-labelledby="frutisa-labels-title">
        <header><p><span>07</span> Sistema de etiquetas</p><h2 id="frutisa-labels-title">La marca llega <em>al producto</em></h2><p>Las etiquetas convierten cada entrega en un punto de contacto. El sello circular concentra personaje, logotipo y promesa; el pliego técnico adapta la identidad a producción y diferentes presentaciones.</p></header>
        <figure className={styles.frutisaLabelFeature}><Image src={brand.labelCupBase} alt="Persona sosteniendo un vaso de helado preparado para etiqueta Frutisa" fill sizes="100vw" /><Image src={brand.sticker} alt="Etiqueta circular oficial de Frutisa aplicada al vaso" width={1536} height={1024} /><figcaption>Aplicación real / Etiqueta circular sobre vaso</figcaption></figure>
        <GalleryLightbox frames={brand.labels} />
      </section>

      <section className={styles.frutisaSocial} aria-labelledby="frutisa-social-title">
        <header><p><span>08</span> Contenido para redes</p><h2 id="frutisa-social-title">La marca entra en <em>la conversación</em></h2><p>El sistema se adapta a piezas de descubrimiento, promociones y contenido de producto. Color, personaje y textura crean reconocimiento inmediato aun antes de leer el mensaje.</p></header>
        <div>
          <figure className={styles.frutisaPhoneMock}><Image src={brand.socialPhoneBase} alt="Persona consultando contenido de Frutisa integrado en su celular" fill sizes="(max-width: 760px) 100vw, 67vw" /><figcaption>Social / Contenido móvil integrado</figcaption></figure>
          <figure><Image src={brand.socialPost} alt="Pieza de contenido para redes de Frutisa dedicada al sabor brownie" fill sizes="(max-width: 760px) 100vw, 33vw" /><figcaption>Social / Brownie y textura</figcaption></figure>
        </div>
      </section>

      <section className={`${styles.digitalCase} ${styles.frutisaDigital}`} id="agency" aria-labelledby="frutisa-digital-title">
        <div className={styles.digitalCaseIntro}>
          <Image src={getBookNode("agency").logo} alt="LATTICCE Agency" width={380} height={96} />
          <p><span>09</span> Extensión digital</p>
          <h2 id="frutisa-digital-title">La marca guía <em>la conversión</em></h2>
          <p>{brand.agency.summary}</p>
        </div>
        <div className={`${styles.digitalBrowser} ${styles.frutisaBrowser}`}>
          <div><span /><span /><span /><small>dannlagger.github.io/frutisa</small></div>
          <figure><Image src={brand.agency.screenshots[0].image} alt={brand.agency.screenshots[0].alt} fill sizes="(max-width: 760px) 100vw, 58vw" /></figure>
        </div>
      </section>

      <section className={`${styles.websiteScreenshots} ${styles.frutisaWebsite}`} aria-labelledby="frutisa-website-title">
        <header><p><span>10</span> Sitio publicado</p><h2 id="frutisa-website-title">Del antojo a <em>la cotización</em></h2><p>{brand.agency.websiteSummary}</p></header>
        <GalleryLightbox frames={brand.agency.screenshots} />
      </section>

      <section className={styles.digitalDecisions}>
        {brand.agency.decisions.map((decision, index) => <article key={decision.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{decision.title}</h3><p>{decision.description}</p></article>)}
      </section>

      <section className={styles.digitalStack}>
        <div><p><span>11</span> Implementación</p><h2>Directo a <em>la acción</em></h2><a href={brand.agency.externalUrl} target="_blank" rel="noreferrer">Visitar sitio publicado ↗</a></div>
        <ul>{brand.agency.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      </section>

      <section className={styles.projectInfo}>
        <div data-project-info-panel><p><span>12</span> Servicios</p><ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul></div>
        <div data-project-info-panel><p><span>13</span> Créditos</p><ul>{project.credits.map((credit) => <li key={credit}>{credit}</li>)}</ul></div>
      </section>
    </>
  );
}
