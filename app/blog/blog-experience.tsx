"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import SiteMenu from "../site-menu";
import { blogNodes, blogPosts, getBlogNode, type BlogNodeId } from "./blog-data";
import styles from "./blog.module.css";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function BlogExperience() {
  const [activeNode, setActiveNode] = useState<BlogNodeId | "all">("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const visiblePosts = useMemo(() => {
    const needle = normalize(deferredQuery.trim());
    return blogPosts.filter((post) => {
      const inNode = activeNode === "all" || post.node === activeNode;
      const haystack = normalize([
        post.title,
        post.dek,
        post.category,
        post.author,
        ...post.keywords,
      ].join(" "));
      return inNode && (!needle || haystack.includes(needle));
    });
  }, [activeNode, deferredQuery]);

  const clearFilters = () => {
    setActiveNode("all");
    setQuery("");
  };

  return (
    <main className={styles.blogRoot}>
      <SiteMenu homeHref="/" logoSrc="/assets/logos/LTT_LOGO_1920_FX.png" logoAlt="LATTICCE" />

      <section className={styles.hero} id="inicio" aria-labelledby="blog-title">
        <div className={styles.museumGrid} aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className={styles.heroTopline}>
          <span>Archivo editorial / 2026</span>
          <span>Ideas · Procesos · Oficio · Cultura</span>
        </div>

        <div className={styles.heroStage}>
          <div className={styles.museumHalo} aria-hidden="true" />
          <div className={styles.heroArtifact} aria-hidden="true">
            <Image
              src="/assets/images/latticce/sinttergia-lattentte-v1.png"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 92vw, 64vw"
            />
          </div>
          <div className={styles.heroTitle}>
            <span>Sala de consulta</span>
            <h1 id="blog-title">BLOG</h1>
            <p>Los textos de nuestros <em>Transductores</em></p>
          </div>
        </div>

        <div className={styles.heroFooter}>
          <p>Una colección viva de pensamiento aplicado.</p>
          <a className={styles.heroEnter} href="#archivo">Entrar al archivo <span aria-hidden="true">↓︎</span></a>
        </div>
      </section>

      <section className={styles.museumStatement} aria-labelledby="museum-statement-title">
        <div className={styles.statementIndex}>
          <span>01 / Umbral</span>
          <i aria-hidden="true" />
          <span>LATTICCE BLOG</span>
        </div>
        <div className={styles.statementCopy}>
          <p className={styles.statementKicker}>Un archivo para entrar, detenerse y volver a mirar.</p>
          <h2 id="museum-statement-title">Lo más profundo de nuestro archivo no siempre termina en una imagen.</h2>
          <div className={styles.statementBody}>
            <p>Este blog reúne las capas menos visibles del trabajo de LATTICCE: las ideas que aparecen antes de una producción, las decisiones que sostienen una pieza y las preguntas que permanecen cuando el proyecto ya terminó. Es una sala de consulta abierta donde nuestros Transductores escriben desde la experiencia, el oficio y la observación.</p>
            <p>Aquí encontrarás ensayos, manifiestos, referencias y conversaciones sobre cine, fotografía, sonido, diseño, estrategia, cultura visual y memoria. También encontrarás guías técnicas, herramientas, métodos de trabajo y consejos concretos para comprender mejor cada proceso: desde preparar un rodaje o grabar una voz hasta construir una identidad, editar un archivo o diseñar una experiencia digital.</p>
            <p>No es un escaparate de respuestas definitivas. Es un archivo vivo de pruebas, aprendizajes y relaciones entre disciplinas. Un lugar para compartir lo que normalmente queda detrás de la obra: el razonamiento, los errores, las influencias y los pequeños descubrimientos que transforman la manera en que observamos, construimos y recordamos.</p>
          </div>
          <div className={styles.statementLegend} aria-label="Contenido del archivo">
            <span>Ideas</span><span>Técnica</span><span>Procesos</span><span>Referencias</span><span>Archivo</span>
          </div>
        </div>
      </section>

      <section className={styles.archive} id="archivo" aria-labelledby="archive-title">
        <header className={styles.archiveHead}>
          <div>
            <span>Archivo visual / Edición continua</span>
            <h2 id="archive-title">Pensamiento <em>en proceso</em></h2>
          </div>
          <p>Una sola publicación. Seis nodos. Distintas herramientas para observar, construir y recordar.</p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.filters} aria-label="Filtrar publicaciones por nodo">
            <button type="button" onClick={() => setActiveNode("all")} aria-pressed={activeNode === "all"} className={activeNode === "all" ? styles.activeFilter : ""}>Todos</button>
            {blogNodes.map((node) => (
              <button
                type="button"
                key={node.id}
                data-node={node.id}
                onClick={() => setActiveNode(node.id)}
                aria-pressed={activeNode === node.id}
                className={activeNode === node.id ? styles.activeFilter : ""}
              >
                {node.name}
              </button>
            ))}
          </div>
          <label className={styles.search}>
            <span>Buscar</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Título, tema o palabra clave"
              aria-label="Buscar en LATTICCE BLOG"
            />
            <i aria-hidden="true">⌕</i>
          </label>
        </div>

        <div className={styles.resultLine} aria-live="polite">
          <span>{String(visiblePosts.length).padStart(2, "0")} publicaciones</span>
          {(activeNode !== "all" || query) && <button type="button" onClick={clearFilters}>Limpiar filtros ×</button>}
        </div>

        {visiblePosts.length > 0 ? (
          <div className={styles.mosaic}>
            {visiblePosts.map((post, index) => {
              const node = getBlogNode(post.node);
              return (
                <Link
                  className={`${styles.tile} ${styles[post.priority]}`}
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  data-node={post.node}
                >
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 40vw"
                    style={{ objectPosition: post.imagePosition }}
                  />
                  <span className={styles.tileShade} aria-hidden="true" />
                  <div className={styles.tileIdentity}>
                    <Image src={node.logo} width={240} height={62} alt={`LATTICCE ${node.name}`} />
                    <span>{node.territory}</span>
                  </div>
                  <div className={styles.tileCopy}>
                    <span>{post.category} / {post.displayDate} / {post.readingTime}</span>
                    <h3>{post.title}</h3>
                    <p>{post.dek}</p>
                    <b>Leer artículo <i aria-hidden="true">↗︎</i></b>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            <span>00</span>
            <h3>No encontramos esa mirada.</h3>
            <p>Prueba otra palabra o vuelve a explorar todos los nodos.</p>
            <button type="button" onClick={clearFilters}>Ver todo el archivo</button>
          </div>
        )}
      </section>
    </main>
  );
}
