import Image from "next/image";
import { bookAssetPath, getBookNode, type BookProject } from "./book-data";
import GalleryLightbox from "./gallery-lightbox";
import styles from "./book.module.css";

type OkameBrandCaseProps = {
  project: BookProject & { okameCase: NonNullable<BookProject["okameCase"]> };
};

export default function OkameBrandCase({ project }: OkameBrandCaseProps) {
  const brand = project.okameCase;
  const primaryLogo = brand.logos[0];

  return (
    <>
      <nav className={`${styles.caseNodeNav} ${styles.okameNodeNav}`} aria-label="Recorrido del caso">
        <a href="#identidad" data-node="design"><Image src={getBookNode("design").logo} alt="LATTICCE Design" width={300} height={76} /><span>Logotipo, branding y contenido ↓</span></a>
      </nav>

      <section className={`${styles.brandOpening} ${styles.okameOpening}`} id="identidad" data-project-statement>
        <div><p><span>01</span> El reto</p><h2>{brand.challenge}</h2></div>
        <figure><Image src={primaryLogo.image} alt={primaryLogo.alt} fill sizes="(max-width: 760px) 100vw, 45vw" /></figure>
      </section>

      <section className={styles.okameArchitecture} aria-labelledby="okame-architecture-title">
        <header><p><span>02</span> Arquitectura de marca</p><h2 id="okame-architecture-title">Una marca.<br /><em>Dos experiencias.</em></h2></header>
        <div>
          <a href="#nails"><span>01 / Producto</span><h3>OKAME Nails</h3><p>Press on nails, colecciones cromadas y contenido de producto.</p><strong>Explorar Nails ↓</strong></a>
          <a href="#beauty-studio"><span>02 / Espacio</span><h3>OKAME Beauty Studio</h3><p>Manicure, maquillaje, cosmética y una experiencia presencial de marca.</p><strong>Explorar Beauty Studio ↓</strong></a>
        </div>
      </section>

      <section className={styles.okameConcept} aria-labelledby="okame-concept-title">
        <div><p><span>03</span> Concepto de identidad</p><h2 id="okame-concept-title">Una forma que cambia <em>con la luz</em></h2><p>{brand.concept}</p></div>
        <div className={styles.okameSymbolStage}><Image src={bookAssetPath("/assets/images/book/okame/okame-symbol-g1.png")} alt="Isotipo oficial cromado de OKAME Nails" fill sizes="(max-width: 760px) 90vw, 42vw" /><p>{brand.symbol}</p></div>
      </section>

      <section className={`${styles.brandLogoSystem} ${styles.okameLogoSystem}`} id="nails" aria-labelledby="okame-logo-title">
        <header><p><span>04</span> OKAME Nails / Press on</p><h2 id="okame-logo-title">Una firma, <em>cuatro presencias</em></h2></header>
        <div className={styles.okameLogoGrid}>
          {brand.logos.map((logo) => <figure key={logo.caption} data-tone={logo.tone}><Image src={logo.image} alt={logo.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>{logo.caption}</figcaption></figure>)}
        </div>
      </section>

      <section className={`${styles.brandPrinciples} ${styles.okamePrinciples}`}>
        {brand.principles.map((principle) => <article key={principle.index} data-project-info-panel><span>{principle.index}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}
      </section>

      <section className={styles.okamePalette} aria-labelledby="okame-palette-title">
        <header><p><span>05</span> Sistema cromático</p><h2 id="okame-palette-title">Oscuridad, reflejo y <em>energía violeta</em></h2></header>
        <div>{brand.palette.map((color) => <article key={color.value} style={{ backgroundColor: color.value }} data-light={color.value === "#09070D" || color.value === "#241640" || color.value === "#5A30A4" ? "true" : undefined}><span>{color.role}</span><strong>{color.name}</strong><small>{color.value}</small></article>)}</div>
      </section>

      <section className={styles.okameMaterials} aria-labelledby="okame-materials-title">
        <header><p><span>06</span> Identidad material</p><h2 id="okame-materials-title">El símbolo se vuelve <em>superficie</em></h2><p>El acabado cromado convierte el isotipo en una pieza visual con profundidad. Cada variante conserva la misma estructura, pero responde de manera distinta a luz, fondo y escala.</p></header>
        <GalleryLightbox frames={brand.materials} />
      </section>

      <section className={styles.okameSocial} aria-labelledby="okame-social-title">
        <header><p><span>07</span> Contenido para redes</p><h2 id="okame-social-title">Una marca diseñada para <em>detener el scroll</em></h2><p>El sistema social alterna producto, identidad y actitud. El isotipo funciona como avatar; el cromo aporta reconocimiento; y la frase de marca sostiene una voz breve, segura y personal.</p></header>
        <div className={styles.okameSocialGrid}>
          <article data-card="manifesto"><Image src={bookAssetPath("/assets/images/book/okame/okame-hand-social.jpg")} alt="Editorial de uñas cromadas OKAME Nails" fill sizes="(max-width: 760px) 100vw, 33vw" /><div><p>BE YOU.<br />WEAR OKAME.</p><span>Manifiesto / Marca</span></div></article>
          <article data-card="product"><Image src={bookAssetPath("/assets/images/book/okame/okame-kit.jpg")} alt="Kit press on OKAME con isotipo aplicado" fill sizes="(max-width: 760px) 100vw, 33vw" /><div><strong>PRESS ON<br />NAILS</strong><span>Producto / Materialidad</span></div></article>
          <article data-card="identity"><Image src={primaryLogo.image} alt={primaryLogo.alt} width={1528} height={972} /><p>STYLE IS<br />A SIGNATURE.</p><span>Identidad / Actitud</span></article>
        </div>
      </section>

      <section className={styles.okameBoard} aria-labelledby="okame-board-title">
        <header><p><span>08</span> OKAME Nails / Aplicaciones</p><h2 id="okame-board-title">Del símbolo a <em>la experiencia</em></h2><p>La línea press on lleva la identidad al kit, la colección y la comunicación. Cada aplicación conserva el logotipo o el isotipo oficial como capa independiente y deja que la materia cromada construya el contexto.</p></header>
        <GalleryLightbox frames={brand.applications} />
      </section>

      <section className={styles.okameBeauty} id="beauty-studio" aria-labelledby="okame-beauty-title">
        <header>
          <p><span>09</span> OKAME Beauty Studio</p>
          <div className={styles.okameBeautyLogo}><Image src={brand.beautyStudio.logo} alt="Logotipo horizontal blanco oficial de OKAME Beauty Studio" fill sizes="(max-width: 760px) 78vw, 34vw" /></div>
          <h2 id="okame-beauty-title">La identidad se vuelve <em>servicio y espacio</em></h2>
          <p>{brand.beautyStudio.summary}</p>
        </header>
        <GalleryLightbox frames={brand.beautyStudio.gallery} />
      </section>

      <section className={styles.projectInfo}>
        <div data-project-info-panel><p><span>10</span> Servicios</p><ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul></div>
        <div data-project-info-panel><p><span>11</span> Créditos</p><ul>{project.credits.map((credit) => <li key={credit}>{credit}</li>)}</ul></div>
      </section>
    </>
  );
}
