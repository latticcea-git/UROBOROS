"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./design.module.css";

const projects = [
  {
    number: "01",
    title: "Forma continua",
    discipline: "Identidad · Objeto 3D",
    caption: "Un sistema que se reconoce incluso cuando cambia de materia.",
    brief: "Construir una identidad flexible capaz de conservar su carácter al pasar de símbolo a objeto, espacio y movimiento.",
    solution: "Una geometría continua que cambia de material sin perder su gesto central. El sistema vive entre vidrio, metal, tinta y animación.",
    deliverables: ["Estrategia visual", "Identidad", "Sistema 3D", "Motion toolkit"],
    visual: "orange",
  },
  {
    number: "02",
    title: "Archivo vivo",
    discipline: "Editorial · Dirección de arte",
    caption: "Capas, ritmo y contraste para convertir información en experiencia.",
    brief: "Transformar un archivo complejo de ideas, imágenes y documentos en una publicación con tensión y ritmo propios.",
    solution: "Una retícula variable que alterna silencio, escala y color para convertir cada capítulo en una secuencia visual distinta.",
    deliverables: ["Dirección de arte", "Sistema editorial", "Cubierta", "Plantillas"],
    visual: "editorial",
  },
  {
    number: "03",
    title: "Interfaz sensible",
    discipline: "Digital · Motion",
    caption: "Una interfaz que responde con intención, peso y movimiento.",
    brief: "Diseñar una experiencia digital que hiciera visible información en tiempo real sin sentirse fría ni genérica.",
    solution: "Datos convertidos en pulsos, órbitas y cambios de materia. La interacción organiza el contenido y produce una respuesta física.",
    deliverables: ["UX direction", "UI system", "Motion language", "Prototype"],
    visual: "interface",
  },
] as const;

const method = [
  ["01", "Encontrar", "Contexto, preguntas, referencias y la tensión que hace único al proyecto."],
  ["02", "Construir", "Concepto, lenguaje, forma, tipografía, color y materia trabajando juntos."],
  ["03", "Probar", "Prototipos, variaciones y movimiento para comprobar el comportamiento del sistema."],
  ["04", "Entregar", "Un sistema aplicable, archivos claros y acompañamiento para hacerlo crecer."],
] as const;

const services = [
  ["01", "Branding", "Identidades con una idea central y un sistema capaz de evolucionar."],
  ["02", "Dirección de arte", "Una mirada coherente para campañas, lanzamientos y universos visuales."],
  ["03", "Editorial", "Estructuras que hacen legible, deseable y memorable la información."],
  ["04", "UI / UX", "Experiencias digitales claras con carácter, ritmo y comportamiento."],
  ["05", "3D + Packaging", "Objetos, materiales y empaques que vuelven tangible una idea."],
  ["06", "Motion", "Movimiento con función: explicar, conectar, revelar y dar vida."],
] as const;

function PenCursor({ mode, x, y }: { mode: string; x: number; y: number }) {
  return (
    <div
      className={styles.penCursor}
      data-mode={mode}
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 36 44">
        <path d="M18 1 31 15 18 41 5 15 18 1Z" />
        <path d="M18 2v23" />
        <circle cx="18" cy="25" r="3.2" />
      </svg>
      <span>{mode}</span>
    </div>
  );
}

function AnchorNode({ className = "" }: { className?: string }) {
  return <i className={`${styles.anchorNode} ${className}`} aria-hidden="true" />;
}

function ProjectArtwork({ visual, full = false }: { visual: (typeof projects)[number]["visual"]; full?: boolean }) {
  return (
    <div className={`${styles.projectVisual} ${styles[visual]} ${full ? styles.projectVisualFull : ""}`}>
      {visual === "orange" && <Image src="/UROBOROS/assets/images/nodes/design.png" fill sizes={full ? "90vw" : "45vw"} alt="Objeto escultórico translúcido en color naranja" />}
      {visual === "editorial" && <div className={styles.editorialObject}><i>DESIGN</i><b>FORM<br />FOLLOWS<br />INTENT</b><span>VOL. 01</span></div>}
      {visual === "interface" && <div className={styles.interfaceObject}><i /><i /><i /><b>98.4</b><span>motion / system</span></div>}
    </div>
  );
}

export default function DesignExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100, mode: "Pluma" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const viewport = section.querySelector<HTMLElement>("[data-design-viewport]");
    const mobile = window.matchMedia("(max-width: 820px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!viewport) return;

    let frame = 0;
    let mobileInitialized = false;
    const update = () => {
      frame = 0;
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);

      if (mobile.matches) {
        section.style.height = `${window.innerHeight}px`;
        track.style.removeProperty("transform");
        if (!mobileInitialized) {
          viewport.scrollLeft = travel;
          mobileInitialized = true;
        }
        const progress = travel ? 1 - viewport.scrollLeft / travel : 0;
        section.style.setProperty("--design-progress", progress.toFixed(4));
        return;
      }

      mobileInitialized = false;
      section.style.height = `${window.innerHeight + travel}px`;
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollDistance));
      track.style.removeProperty("transform");
      viewport.scrollLeft = (1 - progress) * travel;
      section.style.setProperty("--design-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    viewport.addEventListener("scroll", requestUpdate, { passive: true });
    mobile.addEventListener("change", requestUpdate);

    const reveal = Array.from(document.querySelectorAll<HTMLElement>("[data-design-reveal]"));
    if (reduced.matches) reveal.forEach((item) => item.setAttribute("data-visible", "true"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.setAttribute("data-visible", "true")),
      { threshold: 0.12 },
    );
    if (!reduced.matches) reveal.forEach((item) => observer.observe(item));

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      viewport.removeEventListener("scroll", requestUpdate);
      mobile.removeEventListener("change", requestUpdate);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const previousOverflow = document.body.style.overflow;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveProject(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [activeProject]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const mode = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "Pluma";
      setCursor({ x: event.clientX - 9, y: event.clientY - 4, mode });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const goTo = (id: string) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const target = document.getElementById(id);
    const viewport = section?.querySelector<HTMLElement>("[data-design-viewport]");
    if (!section || !track || !target || !viewport) return;

    const targetOffset = target.offsetLeft;
    const travel = Math.max(1, track.scrollWidth - viewport.clientWidth);
    if (window.matchMedia("(max-width: 820px)").matches) {
      viewport.scrollTo({ left: targetOffset, behavior: "smooth" });
    } else {
      const verticalTravel = Math.max(1, section.offsetHeight - window.innerHeight);
      const reverseProgress = Math.min(1, Math.max(0, 1 - targetOffset / travel));
      window.scrollTo({ top: section.offsetTop + reverseProgress * verticalTravel, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <main className={styles.root}>
      <PenCursor {...cursor} />

      <header className={styles.header}>
        <Link href="/" className={styles.brand} data-cursor="Abrir" aria-label="LATTICCE Design, volver a inicio">
          <Image src="/UROBOROS/assets/logos/LTT_LOGO_NEG_DESIGN.svg" width={272} height={70} alt="LATTICCE Design" loading="eager" />
        </Link>
        <div className={styles.status}><i /> archivo/design_01.ai <span>125%</span></div>
        <button className={styles.menuButton} type="button" data-cursor="Menú" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          Menú <b>{menuOpen ? "×" : "+"}</b>
        </button>
        {menuOpen && (
          <nav className={styles.menuPanel} aria-label="Navegación de Design">
            {[["inicio", "Inicio"], ["book", "Book"], ["metodo", "Método"], ["servicios", "Servicios"], ["contacto", "Contacto"]].map(([id, label], index) => (
              <button key={id} type="button" onClick={() => goTo(id)} data-cursor="Ir">
                <span>{String(index).padStart(2, "0")}</span>{label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <aside className={styles.toolbar} aria-label="Herramientas visuales">
        {["↖", "⌁", "◆", "T", "○", "▱"].map((tool, index) => <button key={tool} type="button" data-cursor={index === 1 ? "Dibujar" : "Herramienta"} aria-label={`Herramienta ${index + 1}`}>{tool}</button>)}
      </aside>

      <div className={styles.timeline}><span>06</span><i /><span>00</span></div>
      <p className={styles.draft}>BORRADOR — VERSIÓN 1</p>

      <div className={styles.horizontal} ref={sectionRef}>
        <div className={styles.viewport} data-design-viewport>
          <div className={styles.track} ref={trackRef}>
            <section className={`${styles.panel} ${styles.hero}`} id="inicio" aria-labelledby="design-hero-title">
              <div className={styles.heroGrid} aria-hidden="true" />
              <div className={styles.heroCopy} data-design-reveal>
                <p className={styles.kicker}><span>01</span> Diseño como materia</p>
                <h1 id="design-hero-title">Ideas que<br /><em>toman forma.</em></h1>
                <p>Identidad, objetos, sistemas y experiencias construidos para moverse en el mundo real.</p>
                <button type="button" onClick={() => goTo("book")} data-cursor="Explorar">Ver el book <span>←</span></button>
              </div>
              <div className={styles.editingStage} data-cursor="Editar" aria-label="Logotipo oficial de LATTICCE Design en un marco de edición">
                <span className={styles.coordinate}>X 1820 px · Y 640 px</span>
                <div className={styles.logoSelection}>
                  <Image src="/UROBOROS/assets/logos/LTT_LOGO_NEG_DESIGN.svg" width={704} height={182} alt="LATTICCE Design" loading="eager" />
                  <AnchorNode className={styles.n1} /><AnchorNode className={styles.n2} /><AnchorNode className={styles.n3} /><AnchorNode className={styles.n4} />
                </div>
                <svg className={styles.heroCurve} viewBox="0 0 800 360" aria-hidden="true"><path d="M20 292C186 60 372 56 486 178S684 328 786 76" /><circle cx="20" cy="292" r="5" /><circle cx="486" cy="178" r="5" /><circle cx="786" cy="76" r="5" /></svg>
                <div className={styles.materialOrb} aria-hidden="true"><i /><b /></div>
              </div>
              <p className={styles.scrollHint}>Desplaza hacia la izquierda <span>←</span></p>
            </section>

            <section className={`${styles.panel} ${styles.manifesto}`} aria-labelledby="manifesto-title">
              <div className={styles.manifestoObject} data-cursor="Rotar" aria-hidden="true"><i /><b /><span /></div>
              <div className={styles.manifestoCopy} data-design-reveal>
                <p className={styles.kicker}><span>02</span> Punto de vista</p>
                <h2 id="manifesto-title">Antes de diseñar,<br /><em>observamos.</em></h2>
                <p>Encontramos la tensión correcta, la convertimos en lenguaje y después la hacemos comportarse como un sistema.</p>
              </div>
              <div className={styles.layerPanel} aria-hidden="true"><p>CAPAS</p><span>◉ concepto</span><span>◉ forma</span><span>◉ materia</span><span>◉ movimiento</span></div>
            </section>

            <section className={`${styles.panel} ${styles.bookWorkspace}`} id="book" aria-labelledby="book-title">
              <div className={styles.bookHead} data-design-reveal>
                <p className={styles.kicker}><span>03</span> Book seleccionado</p>
                <h2 id="book-title">Proyectos abiertos.<br /><em>Procesos visibles.</em></h2>
                <p>Selecciona una ventana para abrir el caso completo, sus decisiones y entregables.</p>
              </div>
              <div className={styles.windowDock}>
                {projects.map((project, index) => (
                  <button
                    className={styles.projectWindow}
                    style={{ "--window-index": index } as CSSProperties}
                    key={project.number}
                    type="button"
                    onClick={() => setActiveProject(project)}
                    data-cursor="Abrir proyecto"
                    aria-label={`Abrir proyecto ${project.title}`}
                  >
                    <span className={styles.windowBar}>
                      <i><b /> <b /> <b /></i>
                      <em>{project.title.toLowerCase().replaceAll(" ", "_")}.{project.visual === "editorial" ? "ai" : "psd"} @ 100%</em>
                      <strong>— □ ×</strong>
                    </span>
                    <span className={styles.windowBody}>
                      <span className={styles.windowTools}>↖<i>⌁</i>◆T○▱</span>
                      <ProjectArtwork visual={project.visual} />
                      <span className={styles.windowLayers}>
                        <b>CAPAS</b><i>◉ {project.title}</i><i>◉ Material</i><i>◉ Guías</i><i>◉ Fondo</i>
                      </span>
                    </span>
                    <span className={styles.windowMeta}><i>{project.number} / 03 · {project.discipline}</i><strong>{project.title}</strong><em>Abrir caso ↗</em></span>
                  </button>
                ))}
              </div>
              <span className={styles.bookCount}>03 VENTANAS / CLICK PARA ABRIR</span>
            </section>

            <section className={`${styles.panel} ${styles.method}`} id="metodo" aria-labelledby="method-title">
              <div className={styles.methodHead} data-design-reveal>
                <p className={styles.kicker}><span>04</span> Método</p>
                <h2 id="method-title">Del trazo<br /><em>al sistema.</em></h2>
              </div>
              <svg className={styles.methodLine} viewBox="0 0 1100 220" preserveAspectRatio="none" aria-hidden="true"><path d="M8 164C194 4 289 20 398 112S626 214 753 95 944 31 1092 144" /></svg>
              <div className={styles.methodList}>
                {method.map(([number, title, text]) => <article key={number} data-cursor="Seleccionar"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
              </div>
            </section>

            <section className={`${styles.panel} ${styles.services}`} id="servicios" aria-labelledby="services-title">
              <div className={styles.servicesHead} data-design-reveal>
                <p className={styles.kicker}><span>05</span> Servicios</p>
                <h2 id="services-title">Herramientas para<br /><em>hacer visible una idea.</em></h2>
              </div>
              <div className={styles.serviceList}>
                {services.map(([number, title, text]) => <article key={number} data-cursor="Transformar"><span>{number}</span><h3>{title}</h3><p>{text}</p><i>↗</i></article>)}
              </div>
              <div className={styles.serviceSculpture} aria-hidden="true"><i /><b /><span /></div>
            </section>

            <section className={`${styles.panel} ${styles.contact}`} id="contacto" aria-labelledby="contact-title">
              <div className={styles.contactCopy} data-design-reveal>
                <p className={styles.kicker}><span>06</span> Nuevo archivo</p>
                <h2 id="contact-title">¿Qué quieres<br /><em>construir?</em></h2>
                <p>Cuéntanos dónde estás, qué necesita tomar forma y qué debería cambiar cuando el proyecto exista.</p>
                <a href="mailto:hola@latticce.com?subject=Nuevo%20proyecto%20LATTICCE%20Design" data-cursor="Enviar">Iniciar un proyecto <span>→</span></a>
              </div>
              <div className={styles.contactForm} aria-hidden="true">
                <p>NUEVO_PROYECTO.DESIGN</p>
                <span>Nombre / marca</span><i />
                <span>¿Qué quieres construir?</span><i />
                <span>Fecha ideal</span><i />
                <b>Adjuntar referencias +</b>
              </div>
              <footer><Image src="/UROBOROS/assets/logos/LTT_LOGO_NEG_DESIGN.svg" width={238} height={62} alt="LATTICCE Design" /><span>© 2026 · México</span></footer>
            </section>
          </div>
        </div>
      </div>

      {activeProject && (
        <div className={styles.caseOverlay} role="presentation" onMouseDown={(event) => event.currentTarget === event.target && setActiveProject(null)}>
          <article className={styles.caseWindow} role="dialog" aria-modal="true" aria-labelledby="case-title">
            <header className={styles.caseBar}>
              <span><i /><i /><i /></span>
              <p>{activeProject.title.toLowerCase().replaceAll(" ", "_")}_case.ai @ 100% (RGB/Preview)</p>
              <button type="button" onClick={() => setActiveProject(null)} data-cursor="Cerrar" aria-label="Cerrar proyecto">×</button>
            </header>
            <div className={styles.caseBody}>
              <aside className={styles.caseTools} aria-hidden="true">↖<i>⌁</i>◆T○▱◇⌗</aside>
              <div className={styles.caseCanvas}>
                <ProjectArtwork visual={activeProject.visual} full />
                <div className={styles.caseIdentity}>
                  <span>{activeProject.number} / CASO SELECCIONADO</span>
                  <h2 id="case-title">{activeProject.title}</h2>
                  <p>{activeProject.discipline}</p>
                </div>
              </div>
              <aside className={styles.caseInfo}>
                <section><span>01 / RETO</span><p>{activeProject.brief}</p></section>
                <section><span>02 / RESPUESTA</span><p>{activeProject.solution}</p></section>
                <section><span>03 / ENTREGABLES</span><ul>{activeProject.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>
                <div className={styles.caseLayers}><b>CAPAS</b><i>◉ Resultado final</i><i>◉ Sistema</i><i>◉ Exploración</i><i>◉ Concepto</i></div>
              </aside>
            </div>
            <footer className={styles.caseFooter}><span>{activeProject.caption}</span><button type="button" onClick={() => setActiveProject(null)} data-cursor="Volver">← Volver al book</button></footer>
          </article>
        </div>
      )}
    </main>
  );
}
