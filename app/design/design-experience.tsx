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
    eyebrow: "06 / BRANDING DESIGN",
    title: "Creamos tu universo visual.",
    copy: "Diseñamos el kit que mantiene unido tu universo: identidad, tipografía, color, dirección de arte y aplicaciones.",
    image: "/UROBOROS/assets/images/design/design-branding-universe-generated-draft-v1.png",
    alt: "Sistema visual de papel, resina negra, metal y piezas naranjas dispuesto sobre una superficie oscura",
    side: "left",
  },
  {
    id: "modelado",
    eyebrow: "07 / 3D + VISUALIZACIÓN",
    title: "Modelamos tu mundo.",
    copy: "Construimos objetos, espacios y productos antes de que existan, listos para presentar, probar o animar.",
    image: "/UROBOROS/assets/images/studio/architecture-optimized.jpg",
    alt: "Render arquitectónico de un interior contemporáneo trabajado dentro de una interfaz de modelado tridimensional",
    side: "right",
  },
  {
    id: "packaging",
    eyebrow: "08 / PACKAGING + E-COMMERCE",
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

function DrawnArrow({ direction }: { direction: "right" | "down" | "upRight" | "upLeft" }) {
  const directionClass = {
    right: styles.arrowRight,
    down: styles.arrowDown,
    upRight: styles.arrowUpRight,
    upLeft: styles.arrowUpLeft,
  }[direction];

  return <span className={`${styles.drawnArrow} ${directionClass}`} aria-hidden="true" />;
}

function SocialPhone() {
  return (
    <div className={styles.socialPhone} data-social-phone aria-label="Vista de una publicación de identidad de marca dentro de un teléfono">
      <div className={styles.socialPhoneTop}><span>9:41</span><i aria-hidden="true" /></div>
      <div className={styles.socialProfile}><b aria-hidden="true">L</b><span>IDENTIDAD / SISTEMA</span><i aria-hidden="true">•••</i></div>
      <div className={styles.socialPost} aria-hidden="true">
        <span className={styles.socialPostMark}>L</span>
        <span className={styles.socialPostGrid} />
        <strong>IDENTIDAD<br />EN MOVIMIENTO</strong>
        <small>01 — 06</small>
      </div>
      <div className={styles.socialActions} aria-hidden="true"><i /><i /><i /><i /></div>
      <p><b>Sistema visual naranja.</b><br />Una marca lista para publicar, adaptar y crecer.</p>
      <div className={styles.socialPhoneHome} aria-hidden="true" />
    </div>
  );
}

function BrandKitExamples() {
  return (
    <div className={styles.brandKit} data-brand-kit aria-label="Ejemplos del kit de identidad">
      {designProjects.slice(0, 2).map((project, index) => (
        <Link href={`/book/${project.slug}`} key={project.slug} className={styles.brandKitCard} data-pen-active>
          <Image src={project.image} fill sizes="(max-width: 620px) 42vw, 20vw" alt={project.alt} />
          <span>{String(index + 1).padStart(2, "0")} / {project.title}</span>
        </Link>
      ))}
      <div className={`${styles.brandKitCard} ${styles.brandKitPalette}`} aria-label="Paleta y sistema tipográfico">
        <i /><i /><i /><i />
        <strong>Aa</strong><span>Color / tipo / materia</span>
      </div>
    </div>
  );
}

function BlenderInterface() {
  return (
    <div className={styles.blenderInterface} data-blender-ui aria-hidden="true">
      <div className={styles.blenderTopbar}><span>LAYOUT</span><span>MODELING</span><b>RENDER</b><span>COMPOSITING</span></div>
      <div className={styles.blenderTools}><i /><i /><i /><i /><i /><i /></div>
      <div className={styles.blenderAxis}><i /><i /><i /><b>X</b><b>Y</b><b>Z</b></div>
      <div className={styles.blenderOutliner}><strong>SCENE COLLECTION</strong><span>Architecture</span><span>Camera</span><span>Key light</span><span>Material.Orange</span></div>
      <div className={styles.blenderTimeline}><span>001</span><i /><i /><i /><i /><i /><i /><span>120</span></div>
      <span className={styles.blenderStatus}>RENDERING ARCHITECTURE / CYCLES</span>
    </div>
  );
}

function CommerceIcons() {
  const icons = [
    { label: "Tienda", path: <><path d="M3 5h2l1.4 8h8.8l1.7-6H6" /><circle cx="8" cy="16" r="1" /><circle cx="15" cy="16" r="1" /></> },
    { label: "Empaque", path: <><path d="m4 7 6-3 6 3-6 3-6-3Z" /><path d="M4 7v7l6 3 6-3V7M10 10v7" /></> },
    { label: "Entrega", path: <><path d="M2 6h10v8H2zM12 9h3l3 3v2h-6z" /><circle cx="6" cy="15" r="1.5" /><circle cx="15" cy="15" r="1.5" /></> },
  ];

  return <div className={styles.commerceIcons} data-commerce-icons>{icons.map((icon) => <span key={icon.label}><svg viewBox="0 0 20 20" aria-hidden="true">{icon.path}</svg><b>{icon.label}</b></span>)}</div>;
}

function AdobeWindow({ project, index }: { project: (typeof designProjects)[number]; index: number }) {
  const extension = index % 2 === 0 ? "ai" : "psd";
  const filename = `${project.slug.replaceAll("-", "_")}.${extension}`;

  return (
    <Link className={styles.adobeWindow} href={`/book/${project.slug}`} aria-label={`Abrir el proyecto completo ${project.title}`} data-book-window data-pen-active>
      <span className={styles.windowTopbar}>
        <i className={styles.windowDots} aria-hidden="true"><b /><b /><b /></i>
        <span>{filename} @ 100% (RGB/8)</span>
        <i className={styles.windowControls} aria-hidden="true">—　□　×</i>
      </span>
      <span className={styles.windowWorkspace}>
        <span className={styles.toolRail} aria-hidden="true">
          <i className={styles.toolArrow}><DrawnArrow direction="upLeft" /></i><i>⌁</i><i className={styles.activeTool}>♢</i><i>T</i><i>□</i><i>◯</i><i>⌗</i>
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
        <strong>Abrir proyecto completo <DrawnArrow direction="upRight" /></strong>
      </span>
    </Link>
  );
}

function ApplicationSection({ item }: { item: (typeof applications)[number] }) {
  return (
    <section className={styles.application} id={item.id} data-side={item.side} data-application aria-labelledby={`${item.id}-title`}>
      <i className={styles.sectionTransition} data-section-transition aria-hidden="true" />
      <Image className={styles.applicationImage} src={item.image} fill sizes="100vw" alt={item.alt} data-application-image />
      <div className={styles.applicationShade} aria-hidden="true" />
      {item.id === "branding" && <BrandKitExamples />}
      {item.id === "modelado" && <BlenderInterface />}
      {item.id === "packaging" && <CommerceIcons />}
      <div className={styles.applicationCopy} data-application-copy>
        <p className={styles.eyebrow}>{item.eyebrow}</p>
        <h2 id={`${item.id}-title`}>{item.title}</h2>
        <p>{item.copy}</p>
        <a href="#contacto" data-pen-active>Hablemos de tu proyecto <DrawnArrow direction="upRight" /></a>
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
        gsap.fromTo(Array.from(element.children), { autoAlpha: 0, y: 34, filter: "blur(7px)" }, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: .07,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top 92%", end: "top 56%", scrub: .7 },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-section-transition]").forEach((line) => {
        gsap.fromTo(line, { autoAlpha: 0, scaleX: 0 }, {
          autoAlpha: .34,
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: line, start: "top 100%", end: "top 54%", scrub: .7 },
        });
      });

      const processVisual = root.querySelector<HTMLElement>("[data-process-visual]");
      if (processVisual) gsap.fromTo(processVisual, { clipPath: "inset(16% 0 0 0)", scale: 1.045 }, {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1,
        ease: "none",
        scrollTrigger: { trigger: processVisual, start: "top 96%", end: "top 48%", scrub: .8 },
      });

      const bookWindows = Array.from(root.querySelectorAll<HTMLElement>("[data-book-window]"));
      if (bookWindows.length) gsap.fromTo(bookWindows, { autoAlpha: .18, y: 64, scale: .965 }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        stagger: .12,
        ease: "none",
        scrollTrigger: { trigger: book, start: "top 96%", end: "top 38%", scrub: .8 },
      });

      root.querySelectorAll<HTMLElement>("[data-application]").forEach((section) => {
        const image = section.querySelector<HTMLElement>("[data-application-image]");
        const copy = section.querySelector<HTMLElement>("[data-application-copy]");
        const enterX = section.dataset.side === "right" ? 64 : -64;
        if (section.id === "packaging" && image && copy) {
          const copyChildren = Array.from(copy.children);
          gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 98%", end: "top 34%", scrub: .8 },
          })
            .fromTo(image, { scale: 1.1, clipPath: "inset(9% 0 9% 0)", filter: "brightness(.62) saturate(.72)" }, { scale: 1, clipPath: "inset(0% 0 0% 0)", filter: "brightness(1) saturate(1)", duration: 1, ease: "none" })
            .to(image, { scale: 1.008, duration: .7, ease: "none" })
            .fromTo(copyChildren, { autoAlpha: 0, x: enterX, y: 28, filter: "blur(8px)" }, { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)", duration: 1, stagger: .08, ease: "none" });
        } else {
          if (image) gsap.fromTo(image, { scale: 1.1, clipPath: "inset(9% 0 9% 0)", filter: "brightness(.62) saturate(.72)" }, {
            scale: 1,
            clipPath: "inset(0% 0 0% 0)",
            filter: "brightness(1) saturate(1)",
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 100%", end: "top 32%", scrub: .8 },
          });
          if (copy) gsap.fromTo(Array.from(copy.children), { autoAlpha: 0, x: enterX, y: 28, filter: "blur(8px)" }, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: .08,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 88%", end: "top 48%", scrub: .75 },
          });
        }

        const brandKit = section.querySelector<HTMLElement>("[data-brand-kit]");
        if (brandKit) gsap.fromTo(Array.from(brandKit.children), { autoAlpha: 0, y: 54, rotate: -2 }, {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          stagger: .12,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top 72%", end: "top 24%", scrub: .8 },
        });

        const blenderUi = section.querySelector<HTMLElement>("[data-blender-ui]");
        if (blenderUi) gsap.fromTo(Array.from(blenderUi.children), { autoAlpha: 0, scale: .96 }, {
          autoAlpha: 1,
          scale: 1,
          stagger: .06,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top 82%", end: "top 25%", scrub: .9 },
        });

        const commerceIcons = section.querySelector<HTMLElement>("[data-commerce-icons]");
        if (commerceIcons) gsap.fromTo(Array.from(commerceIcons.children), { autoAlpha: 0, y: 40, scale: .9 }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: .16,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top 72%", end: "top 28%", scrub: .8 },
        });
      });

      const socialSection = root.querySelector<HTMLElement>("[data-social-section]");
      if (socialSection) {
        const socialCopy = socialSection.querySelector<HTMLElement>("[data-social-copy]");
        const socialPoints = socialSection.querySelectorAll<HTMLElement>("[data-social-point]");
        const socialMedia = socialSection.querySelector<HTMLElement>("[data-social-media]");
        const socialPhone = socialSection.querySelector<HTMLElement>("[data-social-phone]");
        const socialTimeline = gsap.timeline({
          scrollTrigger: { trigger: socialSection, start: "top 88%", end: "top 18%", scrub: .85 },
        });
        if (socialCopy) socialTimeline.fromTo(Array.from(socialCopy.children).filter((child) => child.tagName !== "UL"), { autoAlpha: 0, x: -52, y: 24, filter: "blur(8px)" }, { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)", stagger: .08, duration: 1, ease: "none" });
        if (socialPoints.length) socialTimeline.fromTo(socialPoints, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: .1, duration: .6, ease: "none" }, ">-.15");
        if (socialMedia) socialTimeline.fromTo(socialMedia, { autoAlpha: 0, scale: 1.08, clipPath: "inset(12% 0 0 0)" }, { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "none" }, ">-.05");
        if (socialPhone) socialTimeline.fromTo(socialPhone, { autoAlpha: 0, y: "62vh", rotate: 5 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1.35, ease: "none" }, "<+.1");
      }

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

      <section className={styles.hero} id="inicio" aria-labelledby="design-title">
        <Image className={styles.heroImage} src="/UROBOROS/assets/images/design/design-hero-threshold-generated-draft-v1.png" fill priority sizes="100vw" alt="Escultura monumental de resina negra dividida por una abertura de luz naranja" data-hero-image />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroLines} aria-hidden="true"><i /><i /><i /><i /></div>
        <div className={styles.heroMeta}><span>DESIGN / 04</span><span>La idea atraviesa la materia y toma forma</span></div>
        <div className={styles.heroLogoFrame} data-hero-logo data-pen-active>
          <h1 id="design-title" className={styles.srOnly}>LATTICCE Design</h1>
          <Image src="/UROBOROS/assets/logos/LTT_LOGO_NEG_DESIGN.svg" width={704} height={182} alt="LATTICCE Design" />
          <i className={styles.logoNodeOne} /><i className={styles.logoNodeTwo} /><i className={styles.logoNodeThree} /><i className={styles.logoNodeFour} />
        </div>
        <div className={styles.heroCopy} data-hero-copy>
          <p>Convertimos ideas en identidades, objetos y experiencias que pueden verse, tocarse y moverse.</p>
          <a href="#capacidades" data-pen-active>Descubrir capacidades <DrawnArrow direction="down" /></a>
        </div>
      </section>

      <section ref={capabilitiesRef} className={styles.capabilities} id="capacidades" aria-labelledby="capabilities-title">
        <i className={styles.sectionTransition} data-section-transition aria-hidden="true" />
        <div className={styles.capabilityGrid} aria-hidden="true" />
        <div className={styles.capabilityHalo} aria-hidden="true" />
        <div className={styles.sectionMeta} data-reveal><span>01 / CAPACIDADES</span><span>Una idea / múltiples formas</span></div>
        <div className={styles.createStage} data-reveal>
          <div className={styles.createPill} data-pen-active><span aria-hidden="true">＋</span><strong id="capabilities-title">CREA</strong></div>
          <i className={styles.createBeam} aria-hidden="true" />
          <p key={activeCapability} className={styles.activeCapability} aria-live="polite">{capabilities[activeCapability]}</p>
        </div>
        <div className={styles.capabilitySelector} aria-label="Capacidades de LATTICCE Design" data-reveal>
          {capabilities.map((capability, index) => (
            <button type="button" key={capability} className={index === activeCapability ? styles.capabilityActive : ""} onClick={() => setActiveCapability(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{capability}
            </button>
          ))}
        </div>
      </section>

      <section ref={bookRef} className={styles.book} id="book" aria-labelledby="book-title">
        <i className={styles.sectionTransition} data-section-transition aria-hidden="true" />
        <div ref={bookViewportRef} className={styles.bookViewport}>
          <div ref={bookTrackRef} className={styles.bookTrack}>
            <div className={styles.bookIntro}>
              <div data-reveal>
                <p className={styles.eyebrow}>02 / BOOK SELECCIONADO</p>
                <h2 id="book-title">El proceso también<br /><em>forma parte de la obra.</em></h2>
                <p>Dos proyectos abiertos como archivos de trabajo. Entra a cada ventana para conocer el caso completo.</p>
              </div>
              <span className={styles.bookDirection}>Desplaza para abrir archivos <DrawnArrow direction="right" /></span>
            </div>
            {designProjects.map((project, index) => <AdobeWindow project={project} index={index} key={project.slug} />)}
            <div className={styles.bookEnd} aria-hidden="true"><span>BOOK</span><i>02 / 02</i></div>
          </div>
        </div>
      </section>

      <section className={styles.anima} id="anima" aria-labelledby="anima-title">
        <i className={styles.sectionTransition} data-section-transition aria-hidden="true" />
        <div className={styles.animaClouds} aria-hidden="true"><i /><i /><i /><i /></div>
        <div ref={loaderRef} className={styles.loader} aria-hidden="true">
          {Array.from({ length: 64 }, (_, index) => <i key={index} data-loader-bar style={{ "--bar-index": index } as CSSProperties} />)}
          <div><span ref={loaderNumberRef}>01</span><b>%</b><small>cargando αnima</small></div>
        </div>
        <div className={styles.animaCopy} data-reveal>
          <p className={styles.eyebrow}>03 / MOTION + ANIMACIÓN</p>
          <h2 id="anima-title" aria-label="anima"><span aria-hidden="true">αnima</span></h2>
          <p>Le damos alma y movimiento a tu mundo plano.</p>
        </div>
      </section>

      <section className={styles.process} id="proceso" aria-labelledby="process-title">
        <i className={styles.sectionTransition} data-section-transition aria-hidden="true" />
        <div className={styles.processHeader} data-reveal>
          <p className={styles.eyebrow}>04 / NUESTRO PROCESO</p>
          <h2 id="process-title">De una idea clara<br /><em>a una entrega útil.</em></h2>
          <p>Atención cercana, decisiones visibles y archivos que no necesitan explicación adicional.</p>
        </div>
        <div className={styles.processSteps} data-reveal>
          {processSteps.map((step) => <article key={step.index}><span>{step.index}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.copy}</p></article>)}
        </div>
        <div className={styles.processVisual} data-process-visual>
          <Image src="/UROBOROS/assets/images/design/design-process-panels-generated-draft-v1.png" fill sizes="100vw" alt="Cuatro paneles de vidrio, arcilla, acrílico transparente y acrílico naranja sobre fondo marfil" />
        </div>
      </section>

      <section className={styles.content} id="contenido" aria-labelledby="content-title" data-social-section>
        <i className={styles.sectionTransition} data-section-transition aria-hidden="true" />
        <div className={styles.contentMedia} data-social-media>
          <Image className={styles.contentImage} src="/UROBOROS/assets/images/design/design-social-content-generated-draft-v1.png" fill sizes="100vw" alt="Mano sosteniendo un teléfono bajo luz naranja" />
          <SocialPhone />
        </div>
        <div className={styles.contentShade} aria-hidden="true" />
        <div className={styles.contentCopy} data-social-copy>
          <p className={styles.eyebrow}>05 / CONTENIDO PARA REDES</p>
          <h2 id="content-title">Contenido periódico<br />para redes sociales.<br /><em>Lo hacemos por ti.</em></h2>
          <p>Planeamos, diseñamos y adaptamos un sistema constante para que tu marca no improvise cada semana.</p>
          <ul aria-label="Alcance del servicio"><li data-social-point>Planeación</li><li data-social-point>Diseño</li><li data-social-point>Adaptación</li><li data-social-point>Entrega periódica</li></ul>
          <a href="#contacto" data-pen-active>Construyamos tu sistema <DrawnArrow direction="upRight" /></a>
        </div>
      </section>

      <div id="aplicaciones" className={styles.applicationFlow}>{applications.map((item) => <ApplicationSection item={item} key={item.id} />)}</div>

      <section className={styles.contact} id="contacto" aria-labelledby="contact-title">
        <i className={styles.sectionTransition} data-section-transition aria-hidden="true" />
        <Image className={styles.contactImage} src="/UROBOROS/assets/images/design/design-contact-hands-generated-draft-v1.png" fill sizes="100vw" alt="Dos manos desenfocadas acercándose detrás de vidrio esmerilado con luz naranja" />
        <div className={styles.contactShade} aria-hidden="true" />
        <div className={styles.contactCopy} data-reveal>
          <p className={styles.eyebrow}>09 / HABLEMOS</p>
          <h2 id="contact-title">Agenda tu<br /><em>cita virtual.</em></h2>
          <p>*Asesoramos tu proyecto.</p>
          <ContactTrigger className={styles.contactButton}>Agendar una conversación <DrawnArrow direction="upRight" /></ContactTrigger>
        </div>
      </section>
    </main>
  );
}
