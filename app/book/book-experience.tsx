"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import SiteMenu from "../site-menu";
import { bookNodes, bookProjects, getBookNode, type NodeId } from "./book-data";
import BookMotion from "./book-motion";
import styles from "./book.module.css";

const featuredProjects = bookProjects.filter((project) => project.featured);
const Antigravity = dynamic(() => import("./antigravity"), { ssr: false });

export default function BookExperience() {
  const [slide, setSlide] = useState(0);
  const [activeNode, setActiveNode] = useState<NodeId | "all">("all");
  const [previewNode, setPreviewNode] = useState<NodeId>("agency");
  const [activeCategory, setActiveCategory] = useState("Todo");

  useEffect(() => {
    const node = window.location.hash.replace("#", "") as NodeId;
    if (!bookNodes.some((item) => item.id === node)) return;
    setActiveNode(node);
    setPreviewNode(node);
    setActiveCategory("Todo");
    window.setTimeout(() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "auto", block: "start" }), 80);
  }, []);

  const categories = useMemo(() => {
    if (activeNode === "all") return ["Todo"];
    return ["Todo", ...new Set(bookProjects.filter((project) => project.node === activeNode).map((project) => project.category))];
  }, [activeNode]);

  const visibleProjects = useMemo(() => bookProjects.filter((project) => {
    const inNode = activeNode === "all" || project.node === activeNode;
    const inCategory = activeCategory === "Todo" || project.category === activeCategory;
    return inNode && inCategory;
  }), [activeCategory, activeNode]);

  const preview = bookProjects.find((project) => project.node === previewNode) ?? bookProjects[0];
  const previewIdentity = getBookNode(previewNode);

  const selectNode = (node: NodeId | "all") => {
    setActiveNode(node);
    setActiveCategory("Todo");
    if (node !== "all") setPreviewNode(node);
    window.setTimeout(() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "auto", block: "start" }), 60);
  };

  const moveSlide = (direction: number) => {
    setSlide((value) => (value + direction + featuredProjects.length) % featuredProjects.length);
  };

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    window.setTimeout(() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "auto", block: "start" }), 80);
  };

  return (
    <main className={styles.bookRoot} data-book-motion-root="index">
      <BookMotion variant="index" refreshKey={`${activeNode}-${activeCategory}`} />
      <SiteMenu homeHref="/" logoSrc="/UROBOROS/assets/logos/LTT_LOGO_1920_FX.png" logoAlt="LATTICCE" />

      <section className={styles.hero} id="inicio" aria-labelledby="book-title" data-book-hero>
        <div data-book-antigravity>
          <Antigravity className={styles.antigravityField} count={180} magnetRadius={16} ringRadius={9} particleSize={1.5} waveAmplitude={1.05} />
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroTopline} data-book-hero-topline><span>Archivo creativo / 2026</span><span>Ciudad de México</span></div>
        <div className={styles.heroTitleWrap} data-book-hero-title>
          <span className={styles.heroEdition}>01</span>
          <h1 id="book-title">BOOK</h1>
          <span className={`${styles.focusCapsule} ${styles.focusCapsuleLeft}`} aria-hidden="true" data-book-capsule />
          <span className={`${styles.focusCapsule} ${styles.focusCapsuleRight}`} aria-hidden="true" data-book-capsule />
        </div>
        <div className={styles.heroFoot} data-book-hero-foot>
          <p>Una selección de obras, procesos y sistemas conectados por una misma intención.</p>
          <a href="#destacados">Entrar al archivo <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroIndex} aria-hidden="true"><span>NODE</span><i /><span>PROJECT</span><i /><span>WORK</span></div>
      </section>

      <section className={styles.featured} id="destacados" aria-label="Proyecto destacado" data-book-featured>
        <div
          className={styles.slider}
          data-book-slider
        >
          <div className={styles.sliderViewport}>
            {featuredProjects.map((project, index) => {
              const identity = getBookNode(project.node);
              const active = slide === index;
              return (
                <Link
                  className={`${styles.slide} ${active ? styles.slideActive : ""}`}
                  href={`/book/${project.slug}`}
                  key={project.slug}
                  aria-hidden={!active}
                  tabIndex={active ? 0 : -1}
                  data-node={project.node}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    style={{ objectPosition: project.imagePosition }}
                  />
                  <span className={styles.slideShade} />
                  <div className={styles.slideIdentity}>
                    <Image src={identity.logo} alt={`LATTICCE ${identity.name}`} width={380} height={96} />
                    <span>{project.category} / {project.year}</span>
                  </div>
                  <div className={styles.slideCopy}>
                    <span>{String(index + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <b>Ver proyecto <i aria-hidden="true">↗</i></b>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.sliderControls}>
            <button type="button" onClick={() => moveSlide(-1)} aria-label="Proyecto anterior">←</button>
            <div aria-hidden="true"><i style={{ transform: `scaleX(${(slide + 1) / featuredProjects.length})` }} /></div>
            <span>{String(slide + 1).padStart(2, "0")} — {String(featuredProjects.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => moveSlide(1)} aria-label="Proyecto siguiente">→</button>
          </div>
        </div>
      </section>

      <section className={styles.nodes} id="nodos" aria-label="Nodos de LATTICCE" data-book-nodes>
        <div className={styles.nodeStage} data-book-node-stage>
          <div className={styles.nodeList} role="list" aria-label="Nodos de LATTICCE">
            {bookNodes.map((node) => (
              <button
                type="button"
                className={activeNode === node.id ? styles.nodeActive : ""}
                onPointerEnter={() => setPreviewNode(node.id)}
                onFocus={() => setPreviewNode(node.id)}
                onClick={() => selectNode(node.id)}
                key={node.id}
                aria-pressed={activeNode === node.id}
                data-book-node
                data-node={node.id}
              >
                <span>{node.index}</span>
                <Image src={node.logo} alt={`LATTICCE ${node.name}`} width={360} height={92} />
                <small>{node.statement}</small>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>

          <div className={styles.nodePreview} aria-live="polite" data-book-node-preview data-node={previewNode}>
            <Image
              src={preview.image}
              alt={preview.alt}
              fill
              loading="eager"
              sizes="(max-width: 900px) 100vw, 58vw"
              style={{ objectPosition: preview.imagePosition }}
            />
            <span className={styles.nodePreviewShade} />
            <div>
              <span>Nodo {previewIdentity.index}</span>
              <h3>{previewIdentity.name}</h3>
              <p>{previewIdentity.description}</p>
              <button type="button" onClick={() => selectNode(previewNode)}>Explorar {previewIdentity.name}</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.catalog} id="catalogo" aria-labelledby="catalog-title" data-node={activeNode === "all" ? undefined : activeNode}>
        <div className={styles.catalogHead} data-book-intro>
          <div>
            <p><span>03</span> Archivo / {activeNode === "all" ? "Todos los nodos" : getBookNode(activeNode).name}</p>
            <h2 id="catalog-title">Obras <em>seleccionadas</em></h2>
          </div>
          <button type="button" className={activeNode === "all" ? styles.catalogAllActive : ""} onClick={() => selectNode("all")}>Ver todo</button>
        </div>

        <div className={styles.categoryList} aria-label="Filtrar por categoría" data-book-categories>
          {categories.map((category) => (
            <button
              type="button"
              className={activeCategory === category ? styles.categoryActive : ""}
              onClick={() => selectCategory(category)}
              aria-pressed={activeCategory === category}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.projectGrid} data-book-project-track>
          {visibleProjects.map((project, index) => {
            const identity = getBookNode(project.node);
            return (
              <Link className={styles.projectCard} href={`/book/${project.slug}`} key={project.slug} data-book-project-card data-node={project.node}>
                <div className={styles.projectImage}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                    style={{ objectPosition: project.imagePosition }}
                  />
                  <span aria-hidden="true" />
                  <b aria-hidden="true">Abrir ↗</b>
                </div>
                <div className={styles.projectMeta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{project.title}</h3><p>{project.category} / {project.year}</p></div>
                  <Image src={identity.logo} alt={`LATTICCE ${identity.name}`} width={220} height={56} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer} data-book-footer>
        <p>LATTICCE / BOOK / 2026</p>
        <h2>¿Qué puede llegar a ser <em>tu idea?</em></h2>
        <Link href="/#contacto">Conversemos <span aria-hidden="true">↗</span></Link>
        <Image src="/UROBOROS/assets/logos/LTT_LOGO_1920_FX.png" width={460} height={88} alt="LATTICCE" />
      </footer>
    </main>
  );
}
