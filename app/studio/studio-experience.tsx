"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { openContactPopup } from "../global-shell";
import { BlackSea } from "../home-visuals";
import { bookProjects } from "../book/book-data";
import styles from "./studio.module.css";

const WHATSAPP_NUMBER = "525525241137";

const services = [
  { id: "video", title: "Producción de video", image: "/UROBOROS/assets/images/studio/video-optimized.jpg" },
  { id: "photo", title: "Sesión fotográfica", image: "/UROBOROS/assets/images/studio/photo-optimized.jpg" },
  { id: "videoclips", title: "Videoclips", image: "/UROBOROS/assets/images/studio/videoclips-optimized.jpg" },
  { id: "events", title: "Cobertura de eventos", image: "/UROBOROS/assets/images/studio/events-optimized.jpg" },
  { id: "food", title: "Food styling", image: "/UROBOROS/assets/images/studio/food-optimized.jpg" },
  { id: "architecture", title: "Arquitectura", image: "/UROBOROS/assets/images/studio/architecture-optimized.jpg" },
] as const;

const process = [
  ["01", "Escuchar", "Objetivo, público, formato y contexto."],
  ["02", "Planear", "Concepto, relato, encuadres y plan de producción."],
  ["03", "Producir", "Personas, producto, espacio y luz trabajando juntos."],
  ["04", "Entregar", "Edición, adaptación de formatos y cierre final."],
] as const;

const scenes = [
  { id: "inicio", label: "Inicio", iso: "100", shutter: "1/500", aperture: "ƒ5.6", wb: "6200K" },
  { id: "mirada", label: "Mirada", iso: "200", shutter: "1/250", aperture: "ƒ4", wb: "5600K" },
  { id: "crea", label: "+ Crea", iso: "400", shutter: "1/125", aperture: "ƒ2.8", wb: "4400K" },
  { id: "proyecto", label: "Proyecto", iso: "1600", shutter: "1/320", aperture: "ƒ2.8", wb: "3600K" },
  { id: "book", label: "Book", iso: "320", shutter: "1/200", aperture: "ƒ4", wb: "5000K" },
  { id: "proceso", label: "Proceso", iso: "400", shutter: "1/160", aperture: "ƒ4", wb: "4800K" },
  { id: "postproduccion", label: "Post", iso: "—", shutter: "24 FPS", aperture: "LOG", wb: "REC.709" },
  { id: "contenido", label: "Redes", iso: "250", shutter: "1/240", aperture: "ƒ2.2", wb: "5200K" },
  { id: "contacto", label: "Hablemos", iso: "—", shutter: "READY", aperture: "09", wb: "CDMX" },
] as const;

const featuredStudioProject = bookProjects.find((project) => project.slug === "enjambre-estadio-gnp");

type Simulation = (typeof services)[number];

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function StudioExperience() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef("inicio");
  const [activeScene, setActiveScene] = useState("inicio");
  const [reelOpen, setReelOpen] = useState(false);
  const [simulation, setSimulation] = useState<Simulation | null>(null);

  const realStudioProjects = useMemo(
    () => bookProjects.filter((project) => project.node === "studio"),
    [],
  );

  useEffect(() => {
    const root = journeyRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-studio-reveal]"));
    root.classList.add(styles.revealReady);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add(styles.revealed));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(styles.revealed);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!reelOpen && !simulation) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setReelOpen(false);
      setSimulation(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reelOpen, simulation]);

  useEffect(() => {
    const journey = journeyRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!journey || !sticky || !track) return;

    const mobile = window.matchMedia("(max-width: 900px)");
    const hasScrollTimeline = CSS.supports("animation-timeline: scroll()");
    let animationFrame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const update = () => {
      animationFrame = 0;
      const travel = Math.max(0, track.scrollWidth - sticky.clientWidth);
      let offset = 0;

      if (mobile.matches) {
        journey.style.height = `${window.innerHeight}px`;
        track.style.removeProperty("transform");
        offset = sticky.scrollLeft;
      } else {
        if (sticky.scrollLeft) sticky.scrollLeft = 0;
        journey.style.height = `${window.innerHeight + travel}px`;
        const bounds = journey.getBoundingClientRect();
        const scrollable = Math.max(1, journey.offsetHeight - window.innerHeight);
        const progress = clamp(-bounds.top / scrollable);
        offset = progress * travel;
        if (hasScrollTimeline) track.style.removeProperty("transform");
        else track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      const viewportCenter = offset + sticky.clientWidth / 2;
      const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-studio-panel]"));
      let closest = panels[0];
      let closestDistance = Number.POSITIVE_INFINITY;
      panels.forEach((panel) => {
        const distance = Math.abs(panel.offsetLeft + panel.offsetWidth / 2 - viewportCenter);
        if (distance < closestDistance) {
          closest = panel;
          closestDistance = distance;
        }
      });
      const nextId = closest?.dataset.studioPanel ?? "inicio";
      const normalizedId = nextId === "cta" ? "postproduccion" : nextId;
      if (normalizedId !== activeIdRef.current) {
        activeIdRef.current = normalizedId;
        setActiveScene(normalizedId);
      }

      const processPanel = track.querySelector<HTMLElement>('[data-studio-panel="proceso"]');
      const socialPanel = track.querySelector<HTMLElement>('[data-studio-panel="contenido"]');
      const postPanel = track.querySelector<HTMLElement>('[data-studio-panel="postproduccion"]');
      if (processPanel) {
        const processStart = processPanel.offsetLeft;
        const processEnd = processStart + processPanel.offsetWidth;
        const fadeStart = processStart + processPanel.offsetWidth * 0.68;
        journey.style.setProperty("--frame-opacity", String(1 - clamp((viewportCenter - fadeStart) / Math.max(1, processEnd - fadeStart))));
        journey.style.setProperty("--process-progress", String(clamp((viewportCenter - processStart) / processPanel.offsetWidth)));
      }
      if (socialPanel) {
        const socialLead = sticky.clientWidth * 0.85;
        const socialStart = socialPanel.offsetLeft - socialLead;
        const socialProgress = clamp((viewportCenter - socialStart) / (socialPanel.offsetWidth * 0.8 + socialLead));
        journey.style.setProperty("--social-progress", String(socialProgress));
        journey.style.setProperty("--phone-y", `${(1 - socialProgress) * 78}vh`);
      }
      if (postPanel) {
        journey.style.setProperty("--post-progress", String(clamp((viewportCenter - postPanel.offsetLeft) / postPanel.offsetWidth)));
      }
      journey.style.setProperty("--journey-progress", String(travel ? offset / travel : 0));
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    sticky.addEventListener("scroll", requestUpdate, { passive: true });
    mobile.addEventListener("change", requestUpdate);
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      sticky.removeEventListener("scroll", requestUpdate);
      mobile.removeEventListener("change", requestUpdate);
    };
  }, []);

  const goTo = useCallback((id: string) => {
    const journey = journeyRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const target = track?.querySelector<HTMLElement>(`[data-studio-panel="${id}"]`);
    if (!journey || !sticky || !track || !target) return;
    if (window.matchMedia("(max-width: 900px)").matches) {
      sticky.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
      return;
    }
    const travel = Math.max(1, track.scrollWidth - sticky.clientWidth);
    const verticalTravel = Math.max(1, journey.offsetHeight - window.innerHeight);
    window.scrollTo({ top: journey.offsetTop + Math.min(1, target.offsetLeft / travel) * verticalTravel, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const navigate = (event: Event) => goTo((event as CustomEvent<string>).detail);
    window.addEventListener("latticce:navigate-section", navigate);
    return () => window.removeEventListener("latticce:navigate-section", navigate);
  }, [goTo]);

  const telemetry = scenes.find((scene) => scene.id === activeScene) ?? scenes[0];
  const sceneIndex = scenes.findIndex((scene) => scene.id === activeScene);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("latticce:section-active", { detail: activeScene }));
  }, [activeScene]);

  return (
    <main className={`${styles.root} studio-page-root`}>
      <div className={styles.journey} ref={journeyRef}>
        <StudioFrame sceneIndex={Math.max(0, sceneIndex)} telemetry={telemetry} />

        <div className={styles.sticky} ref={stickyRef}>
          <div className={styles.track} ref={trackRef}>
            <section className={`${styles.panel} ${styles.hero}`} id="inicio" data-studio-panel="inicio">
              <ResponsivePhoto className={styles.heroImage} desktop="/UROBOROS/assets/images/studio/studio-cdmx-golden-hour-generated-draft-v2-optimized.jpg" mobile="/UROBOROS/assets/images/studio/studio-cdmx-golden-hour-generated-draft-v2-mobile.jpg" alt="Ciudad de México durante una hora dorada, con el Ángel de la Independencia y peatones a contraluz." eager />
              <div className={styles.heroShade} />
              <div className={styles.heroContent} data-studio-reveal>
                <Image className={styles.heroLogo} src="/UROBOROS/assets/logos/LTT_LOGO_NEG_STUDIO.svg" alt="LATTICCE Studio" width={760} height={196} priority />
                <p className={styles.heroService}>Foto + video comercial.</p>
                <p className={styles.heroStatement}>Creamos imágenes que conectan, comunican y permanecen.</p>
                <a className={styles.reelButton} href="/UROBOROS/films/cinema" target="_blank" rel="noreferrer"><span aria-hidden="true"><PlayIcon /></span> Ver reel</a>
                <a className={styles.heroContact} href="#contacto-global" onClick={() => openContactPopup()}>Cotizar proyecto <ArrowUpRightIcon /></a>
              </div>
              <div className={styles.advanceArrows} aria-hidden="true"><span><ArrowRightIcon /></span><span><ArrowRightIcon /></span><span><ArrowRightIcon /></span></div>
              <span className={styles.draftLabel}>© LATTICCE — Todos los derechos reservados</span>
            </section>

            <section className={`${styles.panel} ${styles.statement}`} id="mirada" data-studio-panel="mirada">
              <ResponsivePhoto className={`${styles.mountain} ${styles.mountainTop}`} desktop="/UROBOROS/assets/images/studio/studio-snow-mountain-generated-draft-v2-optimized.jpg" mobile="/UROBOROS/assets/images/studio/studio-snow-mountain-generated-draft-v2-mobile.jpg" alt="" />
              <ResponsivePhoto className={`${styles.mountain} ${styles.mountainTopEcho}`} desktop="/UROBOROS/assets/images/studio/studio-snow-mountain-generated-draft-v2-optimized.jpg" mobile="/UROBOROS/assets/images/studio/studio-snow-mountain-generated-draft-v2-mobile.jpg" alt="" />
              <ResponsivePhoto className={`${styles.mountain} ${styles.mountainBottom}`} desktop="/UROBOROS/assets/images/studio/studio-snow-mountain-generated-draft-v2-optimized.jpg" mobile="/UROBOROS/assets/images/studio/studio-snow-mountain-generated-draft-v2-mobile.jpg" alt="" />
              <div className={styles.statementShade} />
              <div className={styles.statementContent} data-studio-reveal>
                <p className={styles.eyebrow}>02 / Lo que hacemos</p>
                <h2>Historias reales.<br /><em>Imágenes poderosas.</em></h2>
                <p>Desde la primera conversación hasta la entrega final, dirigimos cada proyecto para que una imagen no solo se vea bien: que diga algo verdadero.</p>
                <a href="#proceso" onClick={(event) => { event.preventDefault(); goTo("proceso"); }}>Conocer el proceso <ArrowRightIcon /></a>
              </div>
            </section>

            <section className={`${styles.panel} ${styles.create}`} id="crea" data-studio-panel="crea">
              <div className={styles.createGrid} aria-hidden="true" />
              <div className={styles.createMeta}><span>03 / Capacidades</span><span>Una mirada / múltiples formas</span></div>
              <div className={styles.createDisplay} data-studio-reveal>
                <div className={styles.createPill}><span>+</span><strong>CREA</strong></div><i className={styles.createBeam} aria-hidden="true" /><div className={styles.createServices}>{services.map((service, index) => <p style={{ "--service-index": index } as CSSProperties} key={service.id}>{service.title}</p>)}</div>
              </div>
              <span className={styles.createFoot}>Cada servicio permanece 7 segundos</span>
            </section>

            {featuredStudioProject && <section className={`${styles.panel} ${styles.project}`} id="proyecto" data-studio-panel="proyecto">
              <div className={styles.projectVisual}><Image src={featuredStudioProject.image} alt={featuredStudioProject.alt} fill sizes="64vw" /><span>01 / Proyecto real</span></div>
              <div className={styles.projectCopy} data-studio-reveal>
                <p className={styles.eyebrow}>04 / Concierto / Proyecto en foco</p><h2>{featuredStudioProject.title}</h2><p>Una noche de concierto, luz y respuesta colectiva documentada desde el gesto real con Sony α7 IV.</p>
                <dl><div><dt>Registro</dt><dd>Concierto</dd></div><div><dt>Formato</dt><dd>Fotografía</dd></div><div><dt>Cámara</dt><dd>Sony α7 IV</dd></div></dl>
                <Link href={`/book/${featuredStudioProject.slug}`}>Ver proyecto completo <ArrowUpRightIcon /></Link>
              </div>
            </section>}

            <section className={`${styles.panel} ${styles.book}`} id="book" data-studio-panel="book">
              <header className={styles.bookHeader} data-studio-reveal><div><p className={styles.eyebrow}>05 / Book Studio</p><h2>Obra real.<br /><em>Miradas en proceso.</em></h2></div><Link href="/book#studio">Explorar Studio en Book <ArrowUpRightIcon /></Link><span className={styles.bookHint}>Desliza <i aria-hidden="true"><ArrowRightIcon /><ArrowRightIcon /><ArrowRightIcon /></i></span></header>
              <div className={styles.bookRail}>
                {realStudioProjects.map((project) => <Link className={styles.bookCard} href={`/book/${project.slug}`} key={project.slug} data-studio-reveal><Image src={project.image} alt={project.alt} fill sizes="32vw" /><span className={styles.bookShade} /><small>Proyecto real / {project.year}</small><div><p>{project.category}</p><h3>{project.title}</h3><b>Ver proyecto <ArrowUpRightIcon /></b></div></Link>)}
                {services.map((service) => <a className={`${styles.bookCard} ${styles.bookSimulation}`} href={service.image} target="_blank" rel="noreferrer" key={service.id} onClick={(event) => { event.preventDefault(); setSimulation(service); }} data-studio-reveal><Image src={service.image} alt="" fill sizes="32vw" /><span className={styles.bookShade} /><small>Simulación / En producción</small><div><p>Studio / Capacidad</p><h3>{service.title}</h3><b>Abrir vista <ArrowUpRightIcon /></b></div></a>)}
                <Link className={styles.bookPortal} href="/book" data-studio-reveal aria-label="Abrir el Book completo de LATTICCE">
                  <span className={styles.bookFolder} aria-hidden="true"><BookFolderIcon /></span>
                  <span className={styles.bookPortalMeta}>Archivo completo</span>
                  <strong>BOOK</strong>
                  <span className={styles.bookPortalAction}>Explorar todos los proyectos <ArrowUpRightIcon /></span>
                </Link>
              </div>
            </section>

            <section className={`${styles.panel} ${styles.process}`} id="proceso" data-studio-panel="proceso">
              <header data-studio-reveal><p className={styles.eyebrow}>06 / El proceso</p><h2>De la intención<br /><em>a la imagen.</em></h2></header>
              <div className={styles.processModules}>{process.map(([number, title, description], index) => <article style={{ "--step": index + 1 } as CSSProperties} key={number} data-studio-reveal><span>{number}</span><i aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div>
              <p className={styles.processExit}>El visor termina aquí <ArrowRightIcon /></p>
            </section>

            <section className={`${styles.panel} ${styles.post}`} id="postproduccion" data-studio-panel="postproduccion">
              <div className={styles.postReference} data-studio-reveal>
                <ResponsivePhoto className={styles.postReferenceUi} desktop="/UROBOROS/assets/images/studio/studio-postproduction-davinci-reference-user-v2-optimized.jpg" mobile="/UROBOROS/assets/images/studio/studio-postproduction-davinci-reference-user-v2-mobile.jpg" alt="Interfaz de referencia aportada para representar un flujo profesional de edición y corrección de color." />
                <div className={styles.postIndustrialFrame}><Image src="/UROBOROS/assets/images/studio/studio-industrial-commercial-generated-draft-v1-optimized.jpg" alt="Operador supervisando una máquina industrial durante un comercial." fill sizes="(max-width: 900px) 74vw, 40vw" /></div>
                <div className={styles.postIntegratedCopy}><p className={styles.eyebrow}>07 / Precisión después del rodaje</p><h2>Expertos en<br /><em>postproducción.</em></h2></div>
                <div className={styles.postServiceBoard}>
                  <div className={styles.postServices}>{["Montaje", "Color grading", "VFX", "Motion graphics", "Retoque", "Edición fotográfica", "Limpieza de audio", "Masters y adaptaciones"].map((item) => <span key={item}>{item}</span>)}</div>
                  <a className={styles.postMajorCta} href={whatsappUrl("Hola LATTICCE Studio, quiero cotizar la postproducción de un proyecto.")} target="_blank" rel="noreferrer">Cotiza tu postproducción <ArrowUpRightIcon /></a>
                </div>
              </div><span className={styles.draftLabel}>© LATTICCE — Todos los derechos reservados</span>
            </section>

            <section className={`${styles.panel} ${styles.cta}`} data-studio-panel="cta"><div className={styles.ctaSea} aria-hidden="true"><BlackSea active={activeScene === "postproduccion"} presence={0.3} tempo={0.42} horizon={0.1} /></div><div className={styles.ctaGlow} aria-hidden="true" /><div className={styles.ctaContent} data-studio-reveal><p className={styles.eyebrow}>Tu proyecto puede ser el siguiente</p><h2>Hagamos <strong>visible</strong><br /><em>lo que imaginas.</em></h2><a href={whatsappUrl("Hola LATTICCE Studio, quiero hacer visible un proyecto.")} target="_blank" rel="noreferrer">Construir mi proyecto <ArrowUpRightIcon /></a></div></section>

            <section className={`${styles.panel} ${styles.social}`} id="contenido" data-studio-panel="contenido">
              <ResponsivePhoto className={styles.socialBackground} desktop="/UROBOROS/assets/images/studio/studio-social-dance-generated-draft-v1-optimized.jpg" mobile="/UROBOROS/assets/images/studio/studio-social-dance-generated-draft-v1-mobile.jpg" alt="" /><div className={styles.socialShade} />
              <div className={styles.socialCopy} data-studio-reveal><p className={styles.eyebrow}>08 / Contenido periódico</p><h2>Tu marca también<br /><em>vive en movimiento.</em></h2><p>Planeamos, producimos y adaptamos contenido para que tus redes mantengan presencia sin perder intención.</p></div>
              <PhoneCamera /><span className={styles.draftLabel}>© LATTICCE — Todos los derechos reservados</span>
            </section>

            <section className={`${styles.panel} ${styles.contact}`} id="contacto" data-studio-panel="contacto"><a className={styles.contactTrigger} href="#contacto-global" onClick={() => openContactPopup()} data-studio-reveal><p className={styles.eyebrow}>09 / HABLEMOS</p><h2>Agenda tu<br /><em>cita virtual.</em></h2><span>Asesoramos tu proyecto. <ArrowUpRightIcon /></span></a><div className={styles.contactSun} aria-hidden="true" /></section>
          </div>
        </div>
      </div>

      <div id="studio-reel" className={styles.modalBackdrop} data-open={reelOpen ? "true" : "false"} role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setReelOpen(false); }}><section className={styles.reelModal} role="dialog" aria-modal="true" aria-labelledby="studio-reel-title"><a href="#" onClick={() => setReelOpen(false)} aria-label="Cerrar reel">×</a><span>Reel Studio / 2026</span><h2 id="studio-reel-title">En actualización.</h2><p>Este espacio está listo para integrar el reel oficial.</p></section></div>
      {simulation && <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSimulation(null); }}><section className={styles.simulationModal} role="dialog" aria-modal="true" aria-labelledby="studio-simulation-title"><button type="button" onClick={() => setSimulation(null)} aria-label="Cerrar vista">×</button><div><p className={styles.eyebrow}>Simulación / En producción</p><h2 id="studio-simulation-title">{simulation.title}</h2><p>Esta imagen representa una capacidad de Studio y será sustituida por un caso real en Book.</p></div><Image src={simulation.image} alt={`Vista provisional de ${simulation.title}.`} width={1440} height={1080} /></section></div>}
    </main>
  );
}

function StudioFrame({ sceneIndex, telemetry }: { sceneIndex: number; telemetry: (typeof scenes)[number] }) {
  return <aside className={styles.frame} aria-label="Parámetros de cámara"><div className={styles.frameCorners} aria-hidden="true"><i /><i /><i /><i /></div><div className={styles.telemetry} aria-live="polite"><span>ISO <b>{telemetry.iso}</b></span><span>SHUTTER <b>{telemetry.shutter}</b></span><span>APERTURE <b>{telemetry.aperture}</b></span><span>WB <b>{telemetry.wb}</b></span><span>REC.709</span></div><div className={styles.exposure} aria-hidden="true"><span>−2</span><i /><i /><i /><i /><i className={styles.exposureCenter} /><i /><i /><i /><i /><span>+2</span></div><div className={styles.frameProgress}><span>{String(sceneIndex + 1).padStart(2, "0")} / 09</span><div><i /></div></div></aside>;
}

function PhoneCamera() {
  return <div className={styles.phone} aria-label="Interfaz conceptual de cámara móvil"><div className={styles.phoneTop}><span>9:41</span><b className={styles.phoneSignal} aria-hidden="true"><i /><i /><i /></b></div><div className={styles.phoneMode}><span>RAW</span><b>CONTENT</b><span className={styles.phoneDots} aria-hidden="true"><i /><i /><i /></span></div><div className={styles.phonePreview}><Image src="/UROBOROS/assets/images/studio/studio-social-dance-generated-draft-v1-mobile.jpg" alt="Creadora de contenido bailando ante una cámara." fill sizes="(max-width: 900px) 48vw, 22vw" /></div><div className={styles.phoneMeter}><span>−2</span><span>−1</span><b>0</b><span>+1</span><span>+2</span></div><div className={styles.phoneSettings}><span>4K<br /><b>RES</b></span><span>24<br /><b>FPS</b></span><span>5200<br /><b>WB</b></span></div><div className={styles.phoneShutter}><i /><button type="button" tabIndex={-1} aria-hidden="true" /><i /></div></div>;
}

function ResponsivePhoto({ className, desktop, mobile, alt, eager = false }: { className: string; desktop: string; mobile: string; alt: string; eager?: boolean }) {
  return <picture className={`${styles.responsivePhoto} ${className}`}><source media="(max-width: 900px)" srcSet={mobile} /><img src={desktop} alt={alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" /></picture>;
}

function ArrowRightIcon() {
  return <svg className={styles.inlineIcon} aria-hidden="true" viewBox="0 0 18 12" focusable="false"><path d="M1 6h15M11 1l5 5-5 5" /></svg>;
}

function ArrowUpRightIcon() {
  return <svg className={styles.inlineIcon} aria-hidden="true" viewBox="0 0 14 14" focusable="false"><path d="M3 11 11 3M5 3h6v6" /></svg>;
}

function PlayIcon() {
  return <svg className={styles.playIcon} aria-hidden="true" viewBox="0 0 16 18" focusable="false"><path d="m2 2 12 7-12 7Z" /></svg>;
}

function BookFolderIcon() {
  return <svg className={styles.bookFolderIcon} viewBox="0 0 96 72" focusable="false"><path d="M5 19h34l8-10h19c5 0 9 4 9 9v4H14c-5 0-9 4-9 9Z" /><path d="M5 31c0-5 4-9 9-9h72c4 0 7 4 6 8l-8 31c-1 4-4 6-8 6H13c-4 0-8-4-8-8Z" /></svg>;
}
