"use client";

import Image from "next/image";
import { FormEvent, PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./time.module.css";

const heroImage = "/UROBOROS/assets/images/time/wedding-hero-v1.png";

const services = [
  {
    number: "01",
    title: "Bodas",
    copy: "Desde los preparativos hasta el último abrazo de la celebración.",
    image: heroImage,
    position: "66% center",
    size: "cover",
    area: "1 / 1 / 5 / 4",
    rotation: "-1.4deg",
  },
  {
    number: "02",
    title: "XV años",
    copy: "Retratos, familia, energía y una noche que habla de quién eres.",
    image: "/UROBOROS/assets/images/time/gallery/quince-v1.png",
    position: "center 34%",
    size: "cover",
    area: "1 / 4 / 4 / 7",
    rotation: "1.8deg",
  },
  {
    number: "03",
    title: "Eventos privados",
    copy: "Celebraciones íntimas documentadas con una mirada cercana.",
    image: "/UROBOROS/assets/images/time/gallery/corporate-event-v1.png",
    position: "center 58%",
    size: "cover",
    area: "4 / 4 / 9 / 7",
    rotation: "-.8deg",
  },
  {
    number: "04",
    title: "Conciertos",
    copy: "Escenario, público y energía conservados desde dentro.",
    image: "/UROBOROS/assets/images/time/gallery/services-mosaic-v1.png",
    position: "left top",
    size: "auto 200%",
    area: "1 / 7 / 5 / 10",
    rotation: "1.1deg",
  },
  {
    number: "05",
    title: "Sesiones personalizadas",
    copy: "Retratos para cumpleaños, etapas personales y nuevas memorias.",
    image: "/UROBOROS/assets/images/time/gallery/services-mosaic-v1.png",
    position: "right top",
    size: "200% auto",
    area: "1 / 10 / 4 / 13",
    rotation: "-2deg",
  },
  {
    number: "06",
    title: "Conferencias",
    copy: "Tus logros, ideas y encuentros profesionales también dejan memoria.",
    image: "/UROBOROS/assets/images/time/gallery/corporate-event-v1.png",
    position: "center 48%",
    size: "cover",
    area: "1 / 13 / 4 / 16",
    rotation: ".6deg",
  },
  {
    number: "07",
    title: "Cobertura completa",
    copy: "Fotografía, video, audio y respaldo pensados como un solo relato.",
    image: "/UROBOROS/assets/images/time/equipment/equipment-panorama-v1.png",
    position: "95% center",
    size: "500% auto",
    area: "5 / 7 / 9 / 10",
    rotation: "-1deg",
  },
  {
    number: "08",
    title: "Sesiones de pareja",
    copy: "Una memoria propia antes del evento o simplemente porque sí.",
    image: "/UROBOROS/assets/images/time/gallery/services-mosaic-v1.png",
    position: "left bottom",
    size: "auto 200%",
    area: "4 / 10 / 9 / 13",
    rotation: "1.5deg",
  },
  {
    number: "09",
    title: "Invitaciones digitales",
    copy: "Una primera pieza visual para anunciar lo que está por comenzar.",
    image: "/UROBOROS/assets/images/time/gallery/services-mosaic-v1.png",
    position: "right bottom",
    size: "200% auto",
    area: "4 / 13 / 6 / 16",
    rotation: "-1.8deg",
  },
  {
    number: "10",
    title: "Preparativos",
    copy: "Los detalles, las manos y la espera antes de abrir las puertas.",
    image: "/UROBOROS/assets/images/time/gallery/before-triptych-v1.png",
    position: "center center",
    size: "300% auto",
    area: "5 / 1 / 7 / 4",
    rotation: ".9deg",
  },
  {
    number: "11",
    title: "Retratos familiares",
    copy: "Las personas que hacen que cada celebración tenga sentido.",
    image: "/UROBOROS/assets/images/time/gallery/before-triptych-v1.png",
    position: "right center",
    size: "300% auto",
    area: "7 / 1 / 9 / 4",
    rotation: "-1.2deg",
  },
  {
    number: "12",
    title: "Cobertura con dron",
    copy: "La escala del lugar y la celebración observada desde el aire.",
    image: "/UROBOROS/assets/images/time/equipment/equipment-panorama-v1.png",
    position: "28% center",
    size: "500% auto",
    area: "6 / 13 / 9 / 16",
    rotation: "1.6deg",
  },
];

const packages = [
  {
    name: "Esencial",
    hours: "4 horas",
    description: "Para conservar los momentos principales con una cobertura precisa.",
    items: ["Fotografía profesional", "Selección editada", "Galería digital"],
  },
  {
    name: "Memoria",
    hours: "6 horas",
    description: "Para ampliar la historia con movimiento y una pieza física para conservar.",
    items: ["Fotografía + video", "Video resumen", "Selección impresa"],
  },
  {
    name: "Historia completa",
    hours: "8+ horas",
    description: "Para contar el día desde la preparación hasta el cierre de la celebración.",
    items: ["Foto + video", "Sesión previa", "Dron o cámara 360"],
  },
];

const equipment = [
  { number: "01", title: "Sony Alpha", label: "Cámara profesional", icon: "camera" },
  { number: "02", title: "DJI X3", label: "Cobertura aérea", icon: "drone" },
  { number: "03", title: "Insta360", label: "Experiencia inmersiva", icon: "camera360" },
  { number: "04", title: "Audio + luz", label: "Voz y atmósfera", icon: "audio" },
  { number: "05", title: "Cobertura completa", label: "Respaldo de principio a fin", icon: "coverage" },
];

function EquipmentIcon({ type }: { type: string }) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "camera") return (
    <svg {...common}>
      <path d="M10 22h10l4-6h16l4 6h10v28H10z" />
      <circle cx="32" cy="36" r="10" />
      <circle cx="32" cy="36" r="5.5" />
      <path d="M47 28h3" />
    </svg>
  );

  if (type === "drone") return (
    <svg {...common}>
      <circle cx="13" cy="18" r="7" /><circle cx="51" cy="18" r="7" />
      <circle cx="13" cy="46" r="7" /><circle cx="51" cy="46" r="7" />
      <path d="M18 22l9 7m19-7-9 7M18 42l9-7m19 7-9-7" />
      <rect x="26" y="27" width="12" height="10" rx="3" />
      <path d="M29 37v5h6v-5" />
    </svg>
  );

  if (type === "camera360") return (
    <svg {...common}>
      <rect x="20" y="8" width="24" height="48" rx="12" />
      <circle cx="32" cy="23" r="8" /><circle cx="32" cy="23" r="3.5" />
      <path d="M27 43h10M32 39v8" />
      <path d="M14 32a18 18 0 0 0 5 13m31-13a18 18 0 0 1-5 13" />
    </svg>
  );

  if (type === "audio") return (
    <svg {...common}>
      <rect x="24" y="9" width="16" height="31" rx="8" />
      <path d="M18 31v2a14 14 0 0 0 28 0v-2M32 47v9M24 56h16" />
      <path d="M49 13l3-3m0 12h5m-8 9 3 3" />
    </svg>
  );

  return (
    <svg {...common}>
      <rect x="9" y="13" width="46" height="38" rx="3" />
      <path d="M17 21h30v22H17z" />
      <path d="M24 32l6 6 12-14" />
      <path d="M15 8h34M15 56h34" />
    </svg>
  );
}

const galleryDetails: Record<string, { eyebrow: string; title: string; copy: string; images: string[] }> = {
  "Bodas": {
    eyebrow: "Galería / bodas",
    title: "Todo lo que ocurre alrededor del sí.",
    copy: "Preparación, ceremonia, retratos y celebración narrados como una sola historia.",
    images: [heroImage, "/UROBOROS/assets/images/time/gallery/before-triptych-v1.png", "/UROBOROS/assets/images/time/gallery/printed-album-v1.png"],
  },
  "XV años": {
    eyebrow: "Galería / XV años",
    title: "Una etapa que merece su propia mirada.",
    copy: "Retrato, familia y celebración con una cobertura cercana y contemporánea.",
    images: ["/UROBOROS/assets/images/time/gallery/quince-v1.png", heroImage, "/UROBOROS/assets/images/time/gallery/before-triptych-v1.png"],
  },
  "Eventos privados": {
    eyebrow: "Galería / eventos privados",
    title: "La celebración también vive en los detalles.",
    copy: "Cumpleaños, aniversarios y encuentros íntimos documentados desde cerca y sin interrumpir lo que ocurre.",
    images: ["/UROBOROS/assets/images/time/gallery/corporate-event-v1.png", "/UROBOROS/assets/images/time/equipment/equipment-panorama-v1.png", heroImage],
  },
  "Conciertos": {
    eyebrow: "Galería / conciertos",
    title: "La energía también puede quedarse.",
    copy: "Escenario, público, luces y momentos detrás de la presentación reunidos en una narración viva.",
    images: ["/UROBOROS/assets/images/time/gallery/services-mosaic-v1.png", "/UROBOROS/assets/images/time/gallery/corporate-event-v1.png", heroImage],
  },
  "Sesiones personalizadas": {
    eyebrow: "Galería / sesiones personalizadas",
    title: "Una sesión construida alrededor de ti.",
    copy: "Cumpleaños, retratos y etapas personales con una dirección cercana, cómoda y pensada para tu manera de ser.",
    images: ["/UROBOROS/assets/images/time/gallery/services-mosaic-v1.png", "/UROBOROS/assets/images/time/gallery/quince-v1.png", heroImage],
  },
  "Conferencias": {
    eyebrow: "Galería / conferencias",
    title: "Tus logros requieren momentos guardados.",
    copy: "Ponencias, invitados, interacción y resultados documentados con una presencia discreta y profesional.",
    images: ["/UROBOROS/assets/images/time/gallery/corporate-event-v1.png", "/UROBOROS/assets/images/time/equipment/equipment-panorama-v1.png", "/UROBOROS/assets/images/time/gallery/printed-album-v1.png"],
  },
  "Cobertura completa": {
    eyebrow: "Galería / cobertura completa",
    title: "Una sola historia, todas las herramientas necesarias.",
    copy: "Integramos fotografía, video, audio y respaldo para conservar el evento de principio a fin.",
    images: ["/UROBOROS/assets/images/time/equipment/equipment-panorama-v1.png", heroImage, "/UROBOROS/assets/images/time/gallery/corporate-event-v1.png"],
  },
  "Sesiones de pareja": {
    eyebrow: "Galería / sesiones de pareja",
    title: "Una memoria que comienza antes.",
    copy: "Retratos de pareja para invitaciones, save the date o simplemente para conservar esta etapa juntos.",
    images: ["/UROBOROS/assets/images/time/gallery/services-mosaic-v1.png", heroImage, "/UROBOROS/assets/images/time/gallery/before-triptych-v1.png"],
  },
  "Invitaciones digitales": {
    eyebrow: "Galería / invitaciones digitales",
    title: "La primera imagen de lo que está por venir.",
    copy: "Diseñamos una invitación digital a partir de la identidad visual, las fotografías y el tono de tu evento.",
    images: ["/UROBOROS/assets/images/time/gallery/services-mosaic-v1.png", heroImage, "/UROBOROS/assets/images/time/gallery/printed-album-v1.png"],
  },
  "Preparativos": {
    eyebrow: "Galería / preparativos",
    title: "La historia empieza mientras todo toma forma.",
    copy: "Manos, detalles y gestos que construyen el día antes de que comience la celebración.",
    images: ["/UROBOROS/assets/images/time/gallery/before-triptych-v1.png", "/UROBOROS/assets/images/time/gallery/printed-album-v1.png", heroImage],
  },
  "Retratos familiares": {
    eyebrow: "Galería / retratos familiares",
    title: "Quienes hacen que el momento tenga sentido.",
    copy: "Las personas que hacen que ese momento tenga sentido, reunidas en una imagen.",
    images: ["/UROBOROS/assets/images/time/gallery/before-triptych-v1.png", "/UROBOROS/assets/images/time/gallery/quince-v1.png", heroImage],
  },
  "Cobertura con dron": {
    eyebrow: "Galería / cobertura con dron",
    title: "El lugar también forma parte de la historia.",
    copy: "Usamos la mirada aérea cuando la escala, el paisaje o la llegada del evento realmente enriquecen la narración.",
    images: ["/UROBOROS/assets/images/time/equipment/equipment-panorama-v1.png", "/UROBOROS/assets/images/time/gallery/corporate-event-v1.png", heroImage],
  },
};

type BookingData = {
  name: string;
  contact: string;
  event: string;
  date: string;
  city: string;
  interests: string;
};

const initialBooking: BookingData = {
  name: "",
  contact: "",
  event: "Boda",
  date: "",
  city: "",
  interests: "Fotografía y video",
};

export default function TimeExperience() {
  const [introVisible, setIntroVisible] = useState(true);
  const [flashing, setFlashing] = useState(false);
  const [interludePaused, setInterludePaused] = useState(false);
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [reelOpen, setReelOpen] = useState(false);
  const [booking, setBooking] = useState(initialBooking);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const interludeVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    window.scrollTo({ top: 0, left: 0 });
    if (introVisible) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introVisible]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (introVisible) setIntroVisible(false);
      setActiveGallery(null);
      setReelOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [introVisible]);

  useEffect(() => {
    if (!activeGallery && !reelOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeGallery, reelOpen]);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    interludeVideoRef.current?.pause();
    setInterludePaused(true);
  }, []);

  useEffect(() => {
    const section = horizontalRef.current;
    const track = trackRef.current;
    const sticky = section?.querySelector<HTMLElement>(`.${styles.sticky}`);
    if (!section || !track || !sticky) return;

    const mobileQuery = window.matchMedia("(max-width: 880px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const travel = Math.max(0, track.scrollWidth - sticky.clientWidth);

      if (mobileQuery.matches) {
        section.style.height = `${window.innerHeight}px`;
        track.style.removeProperty("transform");
        const progress = travel > 0 ? sticky.scrollLeft / travel : 0;
        section.style.setProperty("--time-progress", progress.toFixed(4));
        return;
      }

      if (sticky.scrollLeft !== 0) sticky.scrollLeft = 0;
      section.style.height = `${window.innerHeight + travel}px`;
      const bounds = section.getBoundingClientRect();
      const verticalTravel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / verticalTravel));

      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
      section.style.setProperty("--time-progress", progress.toFixed(4));
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
  }, [introVisible]);

  useEffect(() => {
    const section = horizontalRef.current;
    const track = trackRef.current;
    const sticky = section?.querySelector<HTMLElement>(`.${styles.sticky}`);
    if (!section || !track || !sticky) return;

    const mobileQuery = window.matchMedia("(max-width: 880px)");

    const trackOffset = (target: HTMLElement) => {
      let offset = 0;
      let element: HTMLElement | null = target;
      while (element && element !== track) {
        offset += element.offsetLeft;
        element = element.offsetParent as HTMLElement | null;
      }
      return offset;
    };

    const navigate = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const selector = anchor.getAttribute("href");
      if (!selector || selector === "#") return;
      const destination = document.querySelector<HTMLElement>(selector);
      if (!destination) return;
      event.preventDefault();

      const left = trackOffset(destination);
      if (mobileQuery.matches) {
        sticky.scrollTo({ left, behavior: "smooth" });
        return;
      }

      const travel = Math.max(1, track.scrollWidth - sticky.clientWidth);
      const verticalTravel = Math.max(1, section.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: section.offsetTop + Math.min(1, left / travel) * verticalTravel,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", navigate);
    return () => document.removeEventListener("click", navigate);
  }, []);

  function moveFocus(event: PointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--focus-x", `${x.toFixed(2)}%`);
    event.currentTarget.style.setProperty("--focus-y", `${y.toFixed(2)}%`);
  }

  function captureMoment() {
    if (flashing) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setIntroVisible(false);
      return;
    }

    setFlashing(true);
    window.setTimeout(() => setIntroVisible(false), 520);
    window.setTimeout(() => setFlashing(false), 1400);
  }

  function toggleInterlude() {
    const video = interludeVideoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setInterludePaused(false);
    } else {
      video.pause();
      setInterludePaused(true);
    }
  }

  const whatsappMessage = useMemo(
    () =>
      [
        "Hola LATTICCE Time, quiero agendar una cita para mi evento.",
        "",
        `Nombre: ${booking.name || "Por definir"}`,
        `Contacto: ${booking.contact || "Por definir"}`,
        `Evento: ${booking.event}`,
        `Fecha: ${booking.date || "Por definir"}`,
        `Ciudad: ${booking.city || "Por definir"}`,
        `Me interesa: ${booking.interests}`,
      ].join("\n"),
    [booking],
  );

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(
      `https://wa.me/525525241137?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className={styles.root}>
      <a className={styles.skipLink} href="#agenda">Ir a agendar una cita</a>

      <header className={styles.header}>
        <a className={styles.logo} href="/UROBOROS/#inicio" aria-label="LATTICCE, volver al inicio">
          <Image
            src="/UROBOROS/assets/logos/LTT_LOGO_NEG_TIME.svg"
            width={330}
            height={104}
            alt="LATTICCE Time"
            priority
          />
        </a>
        <nav className={styles.nav} aria-label="Navegación de LATTICCE Time">
          <a href="#historias">Historias</a>
          <a href="#coberturas">Coberturas</a>
          <a href="#equipo">Equipo</a>
        </nav>
        <a className={styles.headerCta} href="#agenda">Agenda tu cita <span aria-hidden="true">↗</span></a>
      </header>

      <div className={styles.horizontal} ref={horizontalRef}>
        <div className={styles.sticky}>
          <div className={styles.track} ref={trackRef}>
            <section className={`${styles.panel} ${styles.hero}`} id="inicio" aria-labelledby="time-hero-title">
              <div className={styles.directionCue} aria-hidden="true"><span>‹‹‹</span><i /><span>›››</span></div>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Fotografía + video de eventos</p>
                <h1 id="time-hero-title">Tu historia<br /><em>merece quedar así.</em></h1>
                <p>Conservamos bodas, XV años y celebraciones con una mirada íntima, cercana y hecha para volver.</p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#agenda">Agenda tu cita</a>
                  <a className={styles.textLink} href="#historias">Recorre el álbum <span aria-hidden="true">→</span></a>
                </div>
              </div>

              <figure className={styles.heroPrint}>
                <button className={styles.heroPhotoButton} type="button" onClick={() => setReelOpen(true)} aria-label="Abrir reel de bodas">
                  <span className={styles.heroPhoto} role="img" aria-label="Pareja caminando después de su boda" />
                  <span className={styles.reelBadge} aria-hidden="true"><i>▶</i> Ver reel</span>
                </button>
                <figcaption>Hagámoslo real</figcaption>
              </figure>

              <div className={styles.scrollHint} aria-hidden="true"><span>Desplázate</span><i /></div>
            </section>

            <section className={`${styles.panel} ${styles.stories}`} id="historias" aria-labelledby="stories-title">
              <div className={styles.sectionIntro}>
                <p className={styles.eyebrow}>Servicios + productos</p>
                <h2 id="stories-title">Una mirada para <em>cada historia.</em></h2>
                <p>Todo lo que LATTICCE TIME tiene para ti.</p>
                <a className={styles.boardCta} href="#agenda">Agendar mi evento <span aria-hidden="true">↘</span></a>
              </div>

              <div className={styles.corkboard} aria-label="Servicios de LATTICCE Time">
                {services.map((service) => (
                  <button
                    className={styles.serviceTile}
                    key={service.title}
                    type="button"
                    onClick={() => setActiveGallery(service.title)}
                    style={{
                      "--tile-image": `url(${service.image})`,
                      "--tile-position": service.position,
                      "--tile-size": service.size,
                      "--tile-area": service.area,
                      "--tile-rotation": service.rotation,
                    } as CSSProperties}
                  >
                    <span className={styles.serviceNumber}>{service.number}</span>
                    <strong>{service.title}</strong>
                    <span className={styles.galleryHover}>Visita la galería <i aria-hidden="true">↗</i></span>
                  </button>
                ))}
              </div>
            </section>

            <section className={`${styles.panel} ${styles.interlude}`} aria-labelledby="interlude-title">
              <video
                className={styles.interludeVideo}
                ref={interludeVideoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src="/UROBOROS/assets/videos/time/rings-motion-reference-v1.mp4" type="video/mp4" />
              </video>
              <div className={styles.interludeCopy}>
                <p className={styles.eyebrow}>Lo que importa permanece</p>
                <h2 id="interlude-title">Hagamos eternos<br /><em>tus recuerdos.</em></h2>
                <Image
                  className={styles.interludeLogo}
                  src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS_TIME.svg"
                  width={700}
                  height={180}
                  alt="LATTICCE Time"
                />
              </div>
              <button className={styles.videoControl} type="button" onClick={toggleInterlude} aria-label={interludePaused ? "Reproducir video" : "Pausar video"}>
                <span aria-hidden="true">{interludePaused ? "▶" : "Ⅱ"}</span>
              </button>
              <span className={styles.interludeIndex} aria-hidden="true">Pausa / 00:03</span>
            </section>

            <section className={`${styles.panel} ${styles.coverage}`} id="coberturas" aria-labelledby="coverage-title">
              <div className={styles.coverageHeading}>
                <p className={styles.eyebrow}>Coberturas flexibles</p>
                <h2 id="coverage-title">Tu evento, tu tiempo,<br /><em>tu manera de recordarlo.</em></h2>
                <p>Partimos de opciones claras y ajustamos horas, formatos y entregables a lo que realmente necesitas.</p>
              </div>
              <div className={styles.packageGrid}>
                {packages.map((item, index) => (
                  <article
                    className={`${styles.packageCard} ${index === 1 ? styles.packageFeatured : ""}`}
                    key={item.name}
                    style={{ "--package-position": `${index * 50}% center` } as CSSProperties}
                  >
                    <div className={styles.packageSummary}>
                      <div className={styles.packageVisual}>
                        <div className={styles.packageTop}><span>Cobertura 0{index + 1}</span><small>{item.hours}</small></div>
                        <h3>{item.name}</h3>
                      </div>
                      <p className={styles.packageDescription}>{item.description}</p>
                      <a className={styles.packageButton} href="#agenda">Elegir esta cobertura <span aria-hidden="true">↘</span></a>
                    </div>
                    <ul className={styles.packageList}>{item.items.map((included) => <li key={included}>{included}</li>)}</ul>
                  </article>
                ))}
              </div>
              <p className={styles.affordableNote}>Coberturas que se adaptan a tu celebración y a tu presupuesto.</p>
            </section>

            <section className={`${styles.panel} ${styles.equipment}`} id="equipo" aria-labelledby="equipment-title">
              <div className={styles.equipmentHeading}>
                <p className={styles.eyebrow}>La mirada + las herramientas</p>
                <h2 id="equipment-title">Elegimos la tecnología<br /><em>según la historia.</em></h2>
                <p>No se trata de llevar más equipo, sino de elegir la herramienta correcta para conservar cada escala, voz y movimiento.</p>
                <a className={styles.equipmentCta} href="#coberturas">Escoge tu paquete <span aria-hidden="true">↖</span></a>
              </div>
              <div className={styles.equipmentConstellation}>
                {equipment.map((item) => (
                  <div className={styles.equipmentItem} key={item.number}>
                    <span className={styles.equipmentIcon}><EquipmentIcon type={item.icon} /></span>
                    <span>{item.number} / {item.label}</span>
                    <strong>{item.title}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className={`${styles.panel} ${styles.deliverables}`} aria-labelledby="deliverables-title">
              <div className={styles.memoryTable} role="img" aria-label="Persona observando un álbum físico de fotografías" />
              <div className={styles.deliverablesCopy}>
                <p className={styles.eyebrow}>Memoria física + digital</p>
                <h2 id="deliverables-title">Más allá<br /><em>de la pantalla.</em></h2>
                <p>Recibe tu historia organizada y lista para compartir. También podemos ayudarte a convertirla en un álbum, una impresión o un objeto que viva contigo.</p>
                <div className={styles.deliveryList}>
                  <span>Galería digital</span><span>Video editado</span><span>Álbum</span><span>Impresiones</span>
                </div>
                <a className={styles.providerLink} href="#agenda">Pregunta por nuestros servicios impresos <span aria-hidden="true">↘</span></a>
                <small className={styles.providerNote}>Trabajamos estas piezas con proveedores especializados.</small>
              </div>
            </section>

            <section className={`${styles.panel} ${styles.contact}`} id="agenda" aria-labelledby="contact-title">
              <div className={styles.contactIntro}>
                <p className={styles.eyebrow}>Tu fecha se acerca</p>
                <h2 id="contact-title">Que quede<br /><em>para siempre.</em></h2>
                <p>Cuéntanos qué estás preparando. Te ayudamos a encontrar una cobertura adecuada para tu evento, tu historia y tu presupuesto.</p>
                <div className={styles.contactPromise}>
                  <span>Una conversación primero.</span>
                  <span>Una propuesta clara después.</span>
                </div>
              </div>

              <form className={styles.form} onSubmit={submitBooking}>
                <div className={styles.fieldGrid}>
                  <label><span>Tu nombre</span><input required value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} placeholder="Nombre completo" /></label>
                  <label><span>WhatsApp o correo</span><input required value={booking.contact} onChange={(event) => setBooking({ ...booking, contact: event.target.value })} placeholder="55 0000 0000" /></label>
                  <label><span>Tipo de evento</span><select value={booking.event} onChange={(event) => setBooking({ ...booking, event: event.target.value })}><option>Boda</option><option>XV años</option><option>Evento social</option><option>Otro</option></select></label>
                  <label><span>Fecha</span><input type="date" value={booking.date} onChange={(event) => setBooking({ ...booking, date: event.target.value })} /></label>
                  <label><span>Ciudad o lugar</span><input value={booking.city} onChange={(event) => setBooking({ ...booking, city: event.target.value })} placeholder="Ciudad de México" /></label>
                  <label><span>Me interesa</span><select value={booking.interests} onChange={(event) => setBooking({ ...booking, interests: event.target.value })}><option>Fotografía y video</option><option>Solo fotografía</option><option>Solo video</option><option>Foto, video y memoria impresa</option></select></label>
                </div>
                <button className={styles.submitButton} type="submit">Agenda tu cita <span aria-hidden="true">↗</span></button>
                <p className={styles.privacy}>Abriremos WhatsApp con tu solicitud. Tú confirmarás el envío.</p>
              </form>
            </section>
          </div>
        </div>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <span>TIME / recorrido</span><div><i /></div><span>01 — 07</span>
      </div>

      {introVisible && (
        <section className={`${styles.intro} ${flashing ? styles.isCapturing : ""}`} aria-label="Entrada a LATTICCE Time">
          <div className={styles.introTopline}><span>LATTICCE / TIME</span><span>Visor — 01</span></div>
          <button className={styles.captureSurface} type="button" onPointerMove={moveFocus} onClick={captureMoment}>
            <span className={styles.introPhoto} />
            <span className={styles.grid} aria-hidden="true" />
            <span className={styles.focusBlur} aria-hidden="true" />
            <span className={styles.focusFrame} aria-hidden="true"><i /><i /><i /><i /><b>+</b></span>
            <span className={styles.capturePrompt}><strong>Haz clic para capturar</strong></span>
            <span className={styles.cameraData} aria-hidden="true">1/125&nbsp;&nbsp; f/2.8&nbsp;&nbsp; ISO 400</span>
            <Image className={styles.captureLogo} src="/UROBOROS/assets/logos/LTT_LOGO_NEG_TIME.svg" width={380} height={98} alt="LATTICCE Time" priority />
          </button>
          <span className={styles.escapeHint}>Presiona escape</span>
        </section>
      )}
      {activeGallery && galleryDetails[activeGallery] && (
        <div className={styles.galleryModal} role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" onClick={() => setActiveGallery(null)}>
          <div className={styles.galleryModalFrame} onClick={(event) => event.stopPropagation()}>
            <button className={styles.modalClose} type="button" onClick={() => setActiveGallery(null)} aria-label="Cerrar galería">×</button>
            <div className={styles.galleryModalCopy}>
              <p className={styles.eyebrow}>{galleryDetails[activeGallery].eyebrow}</p>
              <h2 id="gallery-modal-title">{galleryDetails[activeGallery].title}</h2>
              <p>{galleryDetails[activeGallery].copy}</p>
            </div>
            <div className={styles.galleryModalImages}>
              {galleryDetails[activeGallery].images.map((image, index) => (
                <img src={image} alt={`${activeGallery}, imagen ${index + 1}`} key={`${image}-${index}`} />
              ))}
            </div>
          </div>
        </div>
      )}
      {reelOpen && (
        <div className={styles.galleryModal} role="dialog" aria-modal="true" aria-labelledby="reel-modal-title" onClick={() => setReelOpen(false)}>
          <div className={`${styles.galleryModalFrame} ${styles.reelModalFrame}`} onClick={(event) => event.stopPropagation()}>
            <button className={styles.modalClose} type="button" onClick={() => setReelOpen(false)} aria-label="Cerrar reel">×</button>
            <div className={styles.galleryModalCopy}>
              <p className={styles.eyebrow}>Reel / bodas</p>
              <h2 id="reel-modal-title">Una historia en movimiento.</h2>
              <p>Avance visual provisional para integrar el reel final de bodas.</p>
            </div>
            <video className={styles.reelVideo} controls autoPlay muted playsInline poster={heroImage}>
              <source src="/UROBOROS/assets/videos/time/rings-motion-reference-v1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
      <div className={`${styles.flash} ${flashing ? styles.flashActive : ""}`} aria-hidden="true" />
    </main>
  );
}
