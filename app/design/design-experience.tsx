"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { bookProjects } from "../book/book-data";
import { ContactTrigger } from "../global-shell";
import styles from "./design.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const designProjects = bookProjects.filter((project) => project.node === "design");

const capabilities = [
  "Branding e identidad",
  "Dirección de arte",
  "Diseño editorial",
  "3D y visualización",
  "Motion y animación",
  "Packaging",
  "Contenido para redes",
] as const;

const processSteps = [
  { index: "01", title: "Brief claro", copy: "Aterrizamos objetivo, contexto, alcance y referencias antes de diseñar." },
  { index: "02", title: "Dirección compartida", copy: "Alineamos concepto, ruta visual y decisiones antes de producir." },
  { index: "03", title: "Seguimiento visible", copy: "Compartimos avances y próximos pasos para que siempre sepas dónde estamos." },
  { index: "04", title: "Entrega ordenada", copy: "Archivos, versiones y guías listos para usar, adaptar y crecer." },
] as const;

const applications = [
  {
    id: "branding",
    eyebrow: "05 / BRANDING DESIGN",
    title: "Creamos universos visuales.",
    copy: "Tu marca deja de ser una pieza aislada y se convierte en un lenguaje reconocible.",
    image: "/UROBOROS/assets/images/design/design-branding-universe-generated-draft-v1.png",
    alt: "Sistema visual de papel, resina negra, metal y piezas naranjas dispuesto sobre una superficie oscura",
    side: "left",
  },
  {
    id: "modelado",
    eyebrow: "06 / 3D + VISUALIZACIÓN",
    title: "Modelamos tu mundo.",
    copy: "Construimos objetos, espacios y productos antes de que existan, listos para presentar, probar o animar.",
    image: "/UROBOROS/assets/images/design/design-modeling-world-generated-draft-v1.png",
    alt: "Objeto tridimensional continuo de vidrio, cromo y arcilla naranja suspendido sobre un pedestal",
    side: "right",
  },
  {
    id: "packaging",
    eyebrow: "07 / PACKAGING",
    title: "Listo para enviar.",
    copy: "Diseñamos empaques que presentan, protegen y venden desde el primer contacto.",
    image: "/UROBOROS/assets/images/design/design-packaging-ready-generated-draft-v1.png",
    alt: "Empaque negro sin marca con estructura de papel y mecanismo interior naranja",
    side: "left",
  },
] as const;

function IllustratorPen() {
  return (
    <svg viewBox="0 0 20 24" aria-hidden="true">
      <path d="M.8 23.2 4.2 9.4 15.6.8l3.6 3.6-8.8 11.3L.8 23.2Z" />
      <path d="m.8 23.2 9.6-7.5" />
      <circle cx="10.4" cy="15.7" r="1.7" />
    </svg>
  );
}

function DraftAsset() {
  return <span className={styles.draftAsset}>BORRADOR — imagen generada</span>;
}

function AdobeWindow({ project, index }: { project: (typeof designProjects)[number]; index: number }) {
  const extension = index % 2 === 0 ? "ai" : "psd";
  const filename = `${project.slug.replaceAll("-", "_")}.${extension}`;

  return (
    <Link className={styles.adobeWindow} href={`/book/${project.slug}`} aria-label={`Abrir el proyecto completo ${project.title}`} data-pen-active>
      <span className={styles.windowTopbar}>
        <i className={styles.windowDots} aria-hidden="true"><b /><b /><b /></i>
        <span>{filename} @ 100% (RGB/8)</span>
        <i className={styles.windowControls} aria-hidden="true">—　□　×</i>
      </span>
      <span className={styles.windowWorkspace}>
        <span className={styles.toolRail} aria-hidden="true">
          <i>↖</i><i>⌁</i><i className={styles.activeTool}>♢</i><i>T</i><i>□</i><i>◯</i><i>⌗</i>
        </span>
        <span className={styles.artboard}>
          <span className={styles.artboardImage}>
            <Image src={project.image} fill sizes="(max-width: 760px) 76vw, 58vw" alt={project.alt} />
            <i className={styles.selectionBox} aria-hidden="true"><b /><b /><b /><b /></i>
          </span>
          <span className={styles.zoomLabel}>{index === 0 ? "66.7%" : "50%"}</span>
        </span>
        <span className={styles.layerPanel}>
          <span className={styles.panelTitle}>CAPAS <i>•••</i></span>
          <span className={styles.layerActive}><i>◉</i>{project.title}</span>
          {project.services.slice(0, 3).map((service) => <span key={service}><i>◉</i>{service}</span>)}
          <span className={styles.panelTitle}>PROPIEDADES <i>•••</i></span>
          <span><i>W</i> 1920 px</span>
          <span><i>H</i> 1080 px</span>
        </span>
      </span>
      <span className={styles.windowFooter}>
        <span><i>{String(index + 1).padStart(2, "0")}</i>{project.category} / {project.year}</span>
        <strong>Abrir proyecto completo <i>↗</i></strong>
      </span>
    </Link>
  );
}

function ApplicationSection({ item }: { item: (typeof applications)[number] }) {
  return (
    <section className={styles.application} id={item.id} data-side={item.side} data-application aria-labelledby={`${item.id}-title`}>
      <Image className={styles.applicationImage} src={item.image} fill sizes="100vw" alt={item.alt} data-application-image />
      <div className={styles.applicationShade} aria-hidden="true" />
      <DraftAsset />
      <div className={styles.applicationCopy} data-application-copy>
        <p className={styles.eyebrow}>{item.eyebrow}</p>
        <h2 id={`${item.id}-title`}>{item.title}</h2>
        <p>{item.copy}</p>
        <a href="#contacto" data-pen-active>Hablemos de tu proyecto <span>↗</span></a>
      </div>
    </section>
  );
}

export default function DesignExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const capabilitiesRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLElement>(null);
  const bookViewportRef = useRef<HTMLDivElement>(null);
  const bookTrackRef = useRef<HTMLDivElement>(null);
  const loaderNumberRef = useRef<HTMLSpanElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const penRef = useRef<HTMLDivElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setActiveCapability((current) => (current + 1) % capabilities.length), 2300);
    return () => window.clearInterval(interval);
  }, []);

  useGSAP(() => {
    const root = rootRef.current;
    const book = bookRef.current;
    const viewport = bookViewportRef.current;
    const track = bookTrackRef.current;
    const loader = loaderRef.current;
    const loaderNumber = loaderNumberRef.current;
    if (!root || !book || !viewport || !track || !loader || !loaderNumber) return;

    const loaderBars = Array.from(loader.querySelectorAll<HTMLElement>("[data-loader-bar]"));
    const paintLoader = (progress: number) => {
      const value = Math.round(progress * 100);
      loaderNumber.textContent = String(value).padStart(2, "0");
      loader.style.setProperty("--loader-progress", progress.toFixed(3));
      loaderBars.forEach((bar, index) => {
        bar.dataset.active = index / Math.max(1, loaderBars.length - 1) <= progress ? "true" : "false";
      });
    };

    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 901px)" }, (context) => {
      const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
      if (!motion) {
        paintLoader(1);
        return;
      }

      paintLoader(.01);
      const heroCopy = root.querySelector<HTMLElement>("[data-hero-copy]");
      const heroLogo = root.querySelector<HTMLElement>("[data-hero-logo]");
      const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");
      if (heroCopy) gsap.from(Array.from(heroCopy.children), { autoAlpha: 0, y: 42, duration: 1.05, stagger: .09, ease: "power3.out", delay: .18 });
      if (heroLogo) gsap.fromTo(heroLogo, { autoAlpha: 0, scale: .965 }, { autoAlpha: 1, scale: 1, duration: 1.45, ease: "power3.out", delay: .12 });
      if (heroImage) gsap.fromTo(heroImage, { scale: 1.08, autoAlpha: .6 }, { scale: 1, autoAlpha: 1, duration: 1.75, ease: "power3.out" });

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(Array.from(element.children), { autoAlpha: 0, y: 34 }, {
          autoAlpha: 1,
          y: 0,
          duration: .8,
          stagger: .07,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 82%", toggleActions: "play none none none", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-application]").forEach((section) => {
        const image = section.querySelector<HTMLElement>("[data-application-image]");
        const copy = section.querySelector<HTMLElement>("[data-application-copy]");
        if (section.id === "packaging" && image && copy) {
          const copyChildren = Array.from(copy.children);
          gsap.set(copyChildren, { autoAlpha: 0, y: 42 });
          gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none", once: true },
          })
            .fromTo(image, { scale: 1.055, filter: "brightness(.72) saturate(.82)" }, { scale: 1, filter: "brightness(1) saturate(1)", duration: 1.2, ease: "power3.out" })
            .to(image, { scale: 1.012, duration: 2.6, ease: "sine.inOut" })
            .to(copyChildren, { autoAlpha: 1, y: 0, duration: .8, stagger: .08, ease: "power3.out" });
          return;
        }
        if (image) gsap.fromTo(image, { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
        if (copy) gsap.fromTo(Array.from(copy.children), { autoAlpha: 0, y: 46 }, {
          autoAlpha: 1,
          y: 0,
          duration: .85,
          stagger: .08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none", once: true },
        });
      });

      const loaderState = { progress: .01 };
      gsap.to(loaderState, {
        progress: 1,
        duration: 15,
        ease: "none",
        onUpdate: () => paintLoader(loaderState.progress),
        scrollTrigger: { trigger: loader, start: "top 78%", toggleActions: "play none none none", once: true },
      });

      if (desktop) {
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: book,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => media.revert();
  }, { scope: rootRef });

  useEffect(() => {
    const capabilitiesSection = capabilitiesRef.current;
    const pen = penRef.current;
    if (!capabilitiesSection || !pen) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!coarse) document.body.classList.add("design-cursor-active");

    const movePen = (event: PointerEvent) => {
      pen.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      pen.dataset.visible = "true";
      const target = event.target as HTMLElement | null;
      pen.dataset.active = target?.closest("a, button, [data-pen-active]") ? "true" : "false";
    };
    const hidePen = () => { pen.dataset.visible = "false"; };
    const moveLight = (event: PointerEvent) => {
      const bounds = capabilitiesSection.getBoundingClientRect();
      capabilitiesSection.style.setProperty("--light-x", `${event.clientX - bounds.left}px`);
      capabilitiesSection.style.setProperty("--light-y", `${event.clientY - bounds.top}px`);
    };

    if (!coarse) {
      window.addEventListener("pointermove", movePen, { passive: true });
      window.addEventListener("blur", hidePen);
      document.documentElement.addEventListener("mouseleave", hidePen);
      capabilitiesSection.addEventListener("pointermove", moveLight, { passive: true });
    }

    return () => {
      document.body.classList.remove("design-cursor-active");
      window.removeEventListener("pointermove", movePen);
      window.removeEventListener("blur", hidePen);
      document.documentElement.removeEventListener("mouseleave", hidePen);
      capabilitiesSection.removeEventListener("pointermove", moveLight);
    };
  }, []);

  return (
    <main ref={rootRef} className={styles.root} data-node="design">
      <div ref={penRef} className={styles.penCursor} data-visible="false" data-active="false" aria-hidden="true"><IllustratorPen /></div>
      <p className={styles.version}>BORRADOR — VERSIÓN 2</p>

      <section className={styles.hero} id="inicio" aria-labelledby="design-title">
        <Image className={styles.heroImage} src="/UROBOROS/assets/images/design/design-hero-threshold-generated-draft-v1.png" fill priority sizes="100vw" alt="Escultura monumental de resina negra dividida por una abertura de luz naranja" data-hero-image />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroLines} aria-hidden="true"><i /><i /><i /><i /></div>
        <DraftAsset />
        <div className={styles.heroMeta}><span>DESIGN / 04</span><span>La idea atraviesa la materia y toma forma</span></div>
        <div className={styles.heroLogoFrame} data-hero-logo data-pen-active>
          <h1 id="design-title" className={styles.srOnly}>LATTICCE Design</h1>
          <Image src="/UROBOROS/assets/logos/LTT_LOGO_NEG_DESIGN.svg" width={704} height={182} alt="LATTICCE Design" />
          <i className={styles.logoNodeOne} /><i className={styles.logoNodeTwo} /><i className={styles.logoNodeThree} /><i className={styles.logoNodeFour} />
        </div>
        <div className={styles.heroCopy} data-hero-copy>
          <p>Convertimos ideas en identidades, objetos y experiencias que pueden verse, tocarse y moverse.</p>
          <a href="#capacidades" data-pen-active>Descubrir capacidades <span>↓</span></a>
        </div>
      </section>

      <section ref={capabilitiesRef} className={styles.capabilities} id="capacidades" aria-labelledby="capabilities-title">
        <div className={styles.capabilityGrid} aria-hidden="true" />
        <div className={styles.capabilityHalo} aria-hidden="true" />
        <div className={styles.sectionMeta}><span>01 / CAPACIDADES</span><span>Una idea / múltiples formas</span></div>
        <div className={styles.createStage}>
          <div className={styles.createPill} data-pen-active><span aria-hidden="true">＋</span><strong id="capabilities-title">CREA</strong></div>
          <i className={styles.createBeam} aria-hidden="true" />
          <p key={activeCapability} className={styles.activeCapability} aria-live="polite">{capabilities[activeCapability]}</p>
        </div>
        <div className={styles.capabilitySelector} aria-label="Capacidades de LATTICCE Design">
          {capabilities.map((capability, index) => (
            <button type="button" key={capability} className={index === activeCapability ? styles.capabilityActive : ""} onClick={() => setActiveCapability(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{capability}
            </button>
          ))}
        </div>
      </section>

      <section ref={bookRef} className={styles.book} id="book" aria-labelledby="book-title">
        <div ref={bookViewportRef} className={styles.bookViewport}>
          <div ref={bookTrackRef} className={styles.bookTrack}>
            <div className={styles.bookIntro}>
              <div data-reveal>
                <p className={styles.eyebrow}>02 / BOOK SELECCIONADO</p>
                <h2 id="book-title">El proceso también<br /><em>forma parte de la obra.</em></h2>
                <p>Dos proyectos abiertos como archivos de trabajo. Entra a cada ventana para conocer el caso completo.</p>
              </div>
              <span className={styles.bookDirection}>Desplaza para abrir archivos <i>→</i></span>
            </div>
            {designProjects.map((project, index) => <AdobeWindow project={project} index={index} key={project.slug} />)}
            <div className={styles.bookEnd} aria-hidden="true"><span>BOOK</span><i>02 / 02</i></div>
          </div>
        </div>
      </section>

      <section className={styles.anima} id="anima" aria-labelledby="anima-title">
        <div ref={loaderRef} className={styles.loader} aria-hidden="true">
          {Array.from({ length: 64 }, (_, index) => <i key={index} data-loader-bar style={{ "--bar-index": index } as CSSProperties} />)}
          <div><span ref={loaderNumberRef}>01</span><b>%</b><small>cargando anima</small></div>
        </div>
        <div className={styles.animaCopy} data-reveal>
          <p className={styles.eyebrow}>03 / MOTION + ANIMACIÓN</p>
          <h2 id="anima-title">ANIMA</h2>
          <p>Le damos alma y movimiento a tu mundo plano.</p>
        </div>
      </section>

      <section className={styles.process} id="proceso" aria-labelledby="process-title">
        <div className={styles.processHeader} data-reveal>
          <p className={styles.eyebrow}>04 / NUESTRO PROCESO</p>
          <h2 id="process-title">De una idea clara<br /><em>a una entrega útil.</em></h2>
          <p>Atención cercana, decisiones visibles y archivos que no necesitan explicación adicional.</p>
        </div>
        <div className={styles.processSteps}>
          {processSteps.map((step) => <article key={step.index}><span>{step.index}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.copy}</p></article>)}
        </div>
        <div className={styles.processVisual}>
          <Image src="/UROBOROS/assets/images/design/design-process-panels-generated-draft-v1.png" fill sizes="100vw" alt="Cuatro paneles de vidrio, arcilla, acrílico transparente y acrílico naranja sobre fondo marfil" />
          <DraftAsset />
        </div>
      </section>

      <div id="aplicaciones" className={styles.applicationFlow}>{applications.map((item) => <ApplicationSection item={item} key={item.id} />)}</div>

      <section className={styles.content} id="contenido" aria-labelledby="content-title" data-application>
        <Image className={styles.contentImage} src="/UROBOROS/assets/images/design/design-social-content-generated-draft-v1.png" fill sizes="100vw" alt="Mano sosteniendo un teléfono sin marca con formas abstractas bajo luz naranja" data-application-image />
        <div className={styles.contentShade} aria-hidden="true" />
        <DraftAsset />
        <div className={styles.contentCopy} data-application-copy>
          <p className={styles.eyebrow}>08 / CONTENIDO PARA REDES</p>
          <h2 id="content-title">Contenido periódico<br />para redes sociales.<br /><em>Lo hacemos por ti.</em></h2>
          <p>Planeamos, diseñamos y adaptamos un sistema constante para que tu marca no improvise cada semana.</p>
          <ul aria-label="Alcance del servicio"><li>Planeación</li><li>Diseño</li><li>Adaptación</li><li>Entrega periódica</li></ul>
          <a href="#contacto" data-pen-active>Construyamos tu sistema <span>↗</span></a>
        </div>
      </section>

      <section className={styles.contact} id="contacto" aria-labelledby="contact-title">
        <Image className={styles.contactImage} src="/UROBOROS/assets/images/design/design-contact-hands-generated-draft-v1.png" fill sizes="100vw" alt="Dos manos desenfocadas acercándose detrás de vidrio esmerilado con luz naranja" />
        <div className={styles.contactShade} aria-hidden="true" />
        <DraftAsset />
        <div className={styles.contactCopy} data-reveal>
          <p className={styles.eyebrow}>09 / HABLEMOS</p>
          <h2 id="contact-title">Agenda tu<br /><em>cita virtual.</em></h2>
          <p>*Asesoramos tu proyecto.</p>
          <ContactTrigger className={styles.contactButton}>Agendar una conversación <span>↗</span></ContactTrigger>
        </div>
      </section>
    </main>
  );
}
