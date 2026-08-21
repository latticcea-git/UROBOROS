"use client";

import Image from "next/image";
import SiteMenu from "../site-menu";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

const services = [
  {
    id: "video",
    kicker: "Movimiento + narrativa",
    title: "Producción de video",
    description: "Piezas comerciales y editoriales que convierten una idea en una experiencia visible.",
    className: "service-video",
    image: "/UROBOROS/assets/images/studio/video.png",
  },
  {
    id: "photo",
    kicker: "Producto + personas",
    title: "Sesión fotográfica",
    description: "Imágenes dirigidas con precisión para campañas, retrato, producto y contenido de marca.",
    className: "service-photo",
    image: "/UROBOROS/assets/images/studio/photo.png",
  },
  {
    id: "videoclips",
    kicker: "Ritmo + expresión",
    title: "Videoclips",
    description: "Imágenes con pulso musical, dirección de arte y una identidad que se mueve.",
    className: "service-videoclips",
    image: "/UROBOROS/assets/images/studio/videoclips.png",
  },
  {
    id: "events",
    kicker: "Instante + atmósfera",
    title: "Cobertura de eventos",
    description: "Documentación sensible del espacio, las personas y los momentos que construyen una experiencia.",
    className: "service-events",
    image: "/UROBOROS/assets/images/studio/events.png",
  },
  {
    id: "food",
    kicker: "Materia + gesto",
    title: "Food styling",
    description: "Producto, proceso, detalle e interacción para volver tangible el carácter de cada propuesta.",
    className: "service-food",
    image: "/UROBOROS/assets/images/studio/food.png",
  },
  {
    id: "architecture",
    kicker: "Espacio + luz",
    title: "Arquitectura",
    description: "Fotografía y video que revelan proporción, materialidad, recorrido y vida dentro del espacio.",
    className: "service-architecture",
    image: "/UROBOROS/assets/images/studio/architecture.png",
  },
];

const process = [
  ["01", "Escuchar", "Objetivo, público, formato y contexto."],
  ["02", "Planear", "Concepto, relato, encuadres y plan de producción."],
  ["03", "Producir", "Personas, producto, espacio y luz trabajando juntos."],
  ["04", "Entregar", "Edición, adaptación de formatos y cierre final."],
];

const extraOptions = ["Edición extendida", "Dron", "Talento", "Locación", "Entrega urgente"];

type QuoteData = {
  service: string;
  project: string;
  extras: string[];
  date: string;
  city: string;
  name: string;
  brand: string;
  contact: string;
};

const initialQuote: QuoteData = {
  service: "Producción de video",
  project: "",
  extras: [],
  date: "",
  city: "",
  name: "",
  brand: "",
  contact: "",
};

export default function StudioPage() {
  const [reelOpen, setReelOpen] = useState(false);
  const [activeService, setActiveService] = useState<(typeof services)[number] | null>(null);
  const [step, setStep] = useState(1);
  const [quote, setQuote] = useState<QuoteData>(initialQuote);
  const siteHorizontalSectionRef = useRef<HTMLDivElement>(null);
  const siteHorizontalTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("reveal-ready");

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return () => root.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${(index % 5) * 55}ms`);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  useEffect(() => {
    if (!reelOpen && !activeService) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setReelOpen(false);
      setActiveService(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeService, reelOpen]);

  useEffect(() => {
    const section = siteHorizontalSectionRef.current;
    const track = siteHorizontalTrackRef.current;
    if (!section || !track) return;

    const sticky = section.querySelector<HTMLElement>(".site-horizontal-sticky");
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    if (!sticky) return;
    let frame = 0;

    const update = () => {
      frame = 0;

      const travel = Math.max(0, track.scrollWidth - sticky.clientWidth);

      if (mobileQuery.matches) {
        section.style.height = `${window.innerHeight}px`;
        track.style.removeProperty("transform");
        const progress = travel > 0 ? sticky.scrollLeft / travel : 0;
        section.style.setProperty("--horizontal-progress", progress.toFixed(4));
        return;
      }

      // Desktop uses the document's vertical position as the single source of
      // truth. Native anchor focus can otherwise move this hidden scroller too
      // and apply a second horizontal offset.
      if (sticky.scrollLeft !== 0) sticky.scrollLeft = 0;
      section.style.height = `${window.innerHeight + travel}px`;

      const bounds = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / scrollableDistance));

      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
      section.style.setProperty("--horizontal-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    sticky.addEventListener("scroll", requestUpdate, { passive: true });
    mobileQuery.addEventListener("change", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      sticky.removeEventListener("scroll", requestUpdate);
      mobileQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const section = siteHorizontalSectionRef.current;
    const track = siteHorizontalTrackRef.current;
    if (!section || !track) return;

    const sticky = section.querySelector<HTMLElement>(".site-horizontal-sticky");
    const mobileQuery = window.matchMedia("(max-width: 900px)");

    const getOffsetWithinTrack = (target: HTMLElement) => {
      let offset = 0;
      let current: HTMLElement | null = target;
      while (current && current !== track) {
        offset += current.offsetLeft;
        current = current.offsetParent as HTMLElement | null;
      }
      return offset;
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const origin = event.target as HTMLElement | null;
      const anchor = origin?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.getAttribute("href") === "#") return;

      const target = document.querySelector<HTMLElement>(anchor.getAttribute("href") ?? "");
      if (!target || !sticky) return;

      event.preventDefault();
      const targetOffset = getOffsetWithinTrack(target);

      if (mobileQuery.matches) {
        sticky.scrollTo({ left: targetOffset, behavior: "smooth" });
        return;
      }

      sticky.scrollLeft = 0;
      const travel = Math.max(1, track.scrollWidth - sticky.clientWidth);
      const verticalTravel = Math.max(1, section.offsetHeight - window.innerHeight);
      const targetProgress = Math.min(1, Math.max(0, targetOffset / travel));
      window.scrollTo({
        top: section.offsetTop + targetProgress * verticalTravel,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const message = useMemo(() => {
    const extras = quote.extras.length ? quote.extras.join(", ") : "Sin extras seleccionados";
    return [
      "Hola LATTICCE Studio, quiero cotizar un proyecto.",
      "",
      `Servicio: ${quote.service}`,
      `Proyecto: ${quote.project || "Por definir"}`,
      `Extras: ${extras}`,
      `Fecha: ${quote.date || "Por definir"}`,
      `Ciudad: ${quote.city || "Por definir"}`,
      `Nombre: ${quote.name || "Por definir"}`,
      `Marca/empresa: ${quote.brand || "No indicada"}`,
      `Contacto: ${quote.contact || "Por definir"}`,
    ].join("\n");
  }, [quote]);

  function toggleExtra(extra: string) {
    setQuote((current) => ({
      ...current,
      extras: current.extras.includes(extra)
        ? current.extras.filter((item) => item !== extra)
        : [...current.extras, extra],
    }));
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = `https://wa.me/525525241137?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <SiteMenu
        homeHref="/UROBOROS/#inicio"
        links={[
          { label: "HOME", href: "/UROBOROS/#inicio" },
          { label: "STUDIO", href: "#inicio" },
          { label: "SOUND", href: "#servicios" },
          { label: "DESIGN", href: "#servicios" },
          { label: "AGENCY", href: "#proceso" },
          { label: "TIME", href: "#proceso" },
          { label: "PORTFOLIO", href: "#proyectos" },
          { label: "BLOG", href: "#cotizar" },
        ]}
      />

      <div className="site-horizontal" ref={siteHorizontalSectionRef}>
        <div className="site-horizontal-sticky">
          <div className="site-horizontal-track" ref={siteHorizontalTrackRef}>
      <section className="hero site-panel" id="inicio">
        <div className="hero-image" aria-hidden="true">
          <div className="hero-glow" />
          <div className="focus-frame"><span /><span /><span /><span /></div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Realidad dirigida</p>
          <h1 className="hero-studio-title">
            <Image
              src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS_STUDIO.svg"
              width={640}
              height={165}
              alt="LATTICCE Studio"
              preload
            />
          </h1>
          <p className="hero-service-title">Foto + video comercial.</p>
          <p className="hero-lede">Creamos imágenes que conectan, comunican y permanecen.</p>
          <div className="hero-actions">
            <a className="text-link" href="#cotizar">Cotizar proyecto <span aria-hidden="true">↘</span></a>
          </div>
        </div>

        <button className="hero-reel-control" type="button" onClick={() => setReelOpen(true)}>
          <i aria-hidden="true">▶</i><span>Ver reel</span>
        </button>

        <div className="scroll-cue" aria-hidden="true"><span>Explorar</span><i /></div>
      </section>

      <section className="statement section-pad site-panel" aria-labelledby="statement-title">
        <p className="eyebrow">Lo que hacemos</p>
        <div className="statement-grid" data-reveal>
          <h2 id="statement-title">Historias reales.<br /><em>Imágenes poderosas.</em></h2>
          <div>
            <p>Desde la primera conversación hasta la entrega final, dirigimos cada proyecto para que una imagen no solo se vea bien: que diga algo verdadero.</p>
            <a className="text-link" href="#proceso">Conocer el proceso <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="services services-horizontal" id="servicios" aria-labelledby="services-title">
        <div className="services-sticky section-pad">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Servicios</p>
            <h2 id="services-title">Una mirada para<br />cada historia.</h2>
            <p>Desplázate para recorrer nuestras formas de observar, dirigir y producir.</p>
          </div>
          <div className="service-window">
            <div className="service-grid">
              {services.map((service, index) => (
                <button
                  className={`service-card ${service.className}`}
                  key={service.id}
                  type="button"
                  data-reveal
                  style={{ "--service-image": `url(${service.image})` } as CSSProperties}
                  onClick={() => setActiveService(service)}
                  aria-label={`Abrir galería de ${service.title}`}
                >
                  <div className="service-number">0{index + 1}</div>
                  <div className="service-card-copy">
                    <p>{service.kicker}</p>
                    <h3>{service.title}</h3>
                    <span>{service.description}</span>
                  </div>
                  <span className="service-open" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="process section-pad site-panel" id="proceso" aria-labelledby="process-title">
        <div className="section-heading process-heading" data-reveal>
          <p className="eyebrow">El proceso</p>
          <h2 id="process-title">De la intención<br />a la imagen.</h2>
        </div>
        <div className="process-list">
          {process.map(([number, title, description]) => (
            <article key={number} data-reveal>
              <p>{number}</p><h3>{title}</h3><span>{description}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="project-feature section-pad site-panel" id="proyectos" aria-labelledby="project-title">
        <div className="project-visual" data-reveal>
          <span className="project-index">01 / Caso seleccionado</span>
        </div>
        <div className="project-copy" data-reveal>
          <p className="eyebrow">Proyecto en foco</p>
          <h2 id="project-title">La materia también cuenta historias.</h2>
          <p>Un ejemplo provisional de cómo presentaremos cada caso: necesidad, mirada, proceso y resultado.</p>
          <dl>
            <div><dt>Registro</dt><dd>Comercial</dd></div>
            <div><dt>Formato</dt><dd>Foto + video</dd></div>
            <div><dt>Estado</dt><dd>En actualización</dd></div>
          </dl>
        </div>
      </section>

      <section className="cta-band section-pad site-panel" data-reveal>
        <p className="eyebrow">Tu proyecto puede ser el siguiente</p>
        <h2>Hagamos visible<br /><em>lo que imaginas.</em></h2>
        <a className="button button-light" href="#cotizar">Construir mi proyecto <span aria-hidden="true">→</span></a>
      </section>

      <section className="quote section-pad site-panel" id="cotizar" aria-labelledby="quote-title">
        <aside className="quote-intro" data-reveal>
          <p className="eyebrow">Cotizador</p>
          <h2 id="quote-title">Construyamos tu proyecto.</h2>
          <p>Responde lo esencial. Al final abriremos WhatsApp con tu solicitud lista para revisar y enviar.</p>
          <div className="step-counter"><span>0{step}</span><i /><span>05</span></div>
        </aside>

        <form className="quote-form" onSubmit={submitQuote} data-reveal>
          <div className="quote-tabs" aria-label={`Paso ${step} de 5`}>
            {["Servicio", "Detalles", "Extras", "Información", "Resumen"].map((label, index) => (
              <button
                key={label}
                type="button"
                className={step === index + 1 ? "active" : step > index + 1 ? "done" : ""}
                onClick={() => index + 1 < step && setStep(index + 1)}
                aria-current={step === index + 1 ? "step" : undefined}
              >
                <span>0{index + 1}</span>{label}
              </button>
            ))}
          </div>

          <div className="quote-panel">
            {step === 1 && (
              <fieldset>
                <legend>¿Qué servicio necesitas?</legend>
                <div className="option-grid">
                  {["Producción de video", "Sesión fotográfica", "Cobertura de eventos", "Food styling", "Arquitectura", "Otro"].map((option) => (
                    <label className={quote.service === option ? "selected" : ""} key={option}>
                      <input type="radio" name="service" value={option} checked={quote.service === option} onChange={() => setQuote({ ...quote, service: option })} />
                      <span>{option}</span><i aria-hidden="true">{quote.service === option ? "●" : "○"}</i>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend>Cuéntanos qué tienes en mente.</legend>
                <label className="field-label" htmlFor="project">Proyecto, objetivo y entregables deseados</label>
                <textarea id="project" value={quote.project} onChange={(event) => setQuote({ ...quote, project: event.target.value })} placeholder="Ej. Campaña de lanzamiento con fotografías de producto y tres videos verticales…" rows={7} autoFocus />
              </fieldset>
            )}

            {step === 3 && (
              <fieldset>
                <legend>¿Qué podría sumar al proyecto?</legend>
                <div className="option-grid extras-grid">
                  {extraOptions.map((extra) => (
                    <label className={quote.extras.includes(extra) ? "selected" : ""} key={extra}>
                      <input type="checkbox" checked={quote.extras.includes(extra)} onChange={() => toggleExtra(extra)} />
                      <span>{extra}</span><i aria-hidden="true">{quote.extras.includes(extra) ? "●" : "+"}</i>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset>
                <legend>¿Dónde y cuándo comenzamos?</legend>
                <div className="field-grid">
                  <label><span>Fecha tentativa</span><input type="date" value={quote.date} onChange={(event) => setQuote({ ...quote, date: event.target.value })} /></label>
                  <label><span>Ciudad</span><input type="text" value={quote.city} onChange={(event) => setQuote({ ...quote, city: event.target.value })} placeholder="Ciudad de México" /></label>
                  <label><span>Tu nombre</span><input required type="text" value={quote.name} onChange={(event) => setQuote({ ...quote, name: event.target.value })} placeholder="Nombre completo" /></label>
                  <label><span>Marca o empresa</span><input type="text" value={quote.brand} onChange={(event) => setQuote({ ...quote, brand: event.target.value })} placeholder="Opcional" /></label>
                  <label className="wide"><span>Correo o teléfono de contacto</span><input required type="text" value={quote.contact} onChange={(event) => setQuote({ ...quote, contact: event.target.value })} placeholder="tu@correo.com / 55 0000 0000" /></label>
                </div>
              </fieldset>
            )}

            {step === 5 && (
              <fieldset>
                <legend>Tu solicitud está lista.</legend>
                <div className="summary-card">
                  <p>{message}</p>
                </div>
                <p className="privacy-note">Nada se envía automáticamente. WhatsApp abrirá con este mensaje y tú confirmarás el envío.</p>
              </fieldset>
            )}
          </div>

          <div className="quote-controls">
            <button className="back-button" type="button" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1}>← Regresar</button>
            {step < 5 ? (
              <button className="button button-primary" type="button" onClick={() => setStep((value) => Math.min(5, value + 1))}>Siguiente paso <span aria-hidden="true">→</span></button>
            ) : (
              <button className="button whatsapp-button" type="submit" disabled={!quote.name || !quote.contact}>Enviar por WhatsApp <span aria-hidden="true">↗</span></button>
            )}
          </div>
        </form>
      </section>
          </div>
        </div>

        <footer className="site-footer section-pad">
          <a className="footer-brand" href="#inicio" aria-label="Volver al inicio">
            <Image src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS.svg" width={190} height={42} alt="LATTICCE" loading="eager" />
          </a>
          <p>Realidad, personas, procesos, espacios y luz.</p>
          <div className="footer-progress" aria-hidden="true">
            <span>Studio / recorrido</span>
            <div><i /></div>
            <span>01 — 07</span>
          </div>
          <span>© {new Date().getFullYear()} LATTICCE</span>
        </footer>
      </div>

      {reelOpen && (
        <div className="reel-modal" role="dialog" aria-modal="true" aria-labelledby="reel-title" onClick={() => setReelOpen(false)}>
          <div className="reel-frame" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Cerrar reel" onClick={() => setReelOpen(false)}>×</button>
            <div className="reel-placeholder">
              <span>Reel 2026</span>
              <h2 id="reel-title">En actualización.</h2>
              <p>Este espacio está listo para integrar el reel oficial de LATTICCE Studio.</p>
            </div>
          </div>
        </div>
      )}

      {activeService && (
        <div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" onClick={() => setActiveService(null)}>
          <div className="service-modal-frame" onClick={(event) => event.stopPropagation()}>
            <button className="service-modal-close" type="button" aria-label="Cerrar galería" onClick={() => setActiveService(null)}>×</button>
            <div className="service-modal-heading">
              <p className="eyebrow">Galería Studio</p>
              <h2 id="service-modal-title">{activeService.title}</h2>
              <p>{activeService.description}</p>
            </div>
            <div className="service-gallery">
              {[1, 2, 3].map((item) => <img key={item} src={activeService.image} alt={`${activeService.title}, imagen ${item}`} />)}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
