"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import SiteMenu from "../site-menu";
import styles from "./agency.module.css";

const services = [
  {
    index: "01",
    title: "CONTENIDO RRSS",
    detail: "Crear · programar · medir",
    href: "/agency/contenido-rrss",
    tone: "signal",
  },
  {
    index: "02",
    title: "ECOSISTEMAS DIGITALES (UI–UX)",
    detail: "Diseñar · construir · conectar",
    href: "/agency/ecosistemas-ui-ux",
    tone: "system",
  },
  {
    index: "03",
    title: "DISTRIBUCIÓN ADS",
    detail: "Impulsar · segmentar · convertir",
    href: "/agency/distribucion-ads",
    tone: "reach",
  },
] as const;

type ServiceHref = (typeof services)[number]["href"];

export default function AgencyExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState<ServiceHref | null>(null);
  const [hovered, setHovered] = useState<ServiceHref | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const trackPointer = (event: globalThis.MouseEvent) => {
      if (!rootRef.current || active) return;

      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      const coreX = window.innerWidth * 0.5;
      const coreY = window.innerHeight * 0.4;
      const deltaX = event.clientX - coreX;
      const deltaY = event.clientY - coreY;
      const beamLength = Math.hypot(deltaX, deltaY);
      const beamAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      rootRef.current.style.setProperty("--pointer-x", x.toFixed(3));
      rootRef.current.style.setProperty("--pointer-y", y.toFixed(3));
      rootRef.current.style.setProperty("--mouse-x", `${event.clientX}px`);
      rootRef.current.style.setProperty("--mouse-y", `${event.clientY}px`);
      rootRef.current.style.setProperty("--beam-length", `${beamLength}px`);
      rootRef.current.style.setProperty("--beam-angle", `${beamAngle}deg`);
    };

    window.addEventListener("mousemove", trackPointer, { passive: true });
    return () => window.removeEventListener("mousemove", trackPointer);
  }, [active]);

  const navigate = (event: ReactMouseEvent<HTMLAnchorElement>, href: ServiceHref) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    if (active) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(href);
    timerRef.current = setTimeout(
      () => router.push(href, { scroll: false }),
      reducedMotion ? 80 : 940,
    );
  };

  return (
    <main
      id="inicio"
      ref={rootRef}
      className={styles.agencyRoot}
      data-exiting={active ? "true" : "false"}
      data-active={hovered ?? active ?? "none"}
    >
      <SiteMenu
        homeHref="/"
        logoSrc="/UROBOROS/assets/logos/LTT_LOGO_FX_POS_AGENCY.svg"
        logoAlt="LATTICCE Agency"
        variant="agency"
      />
      <div className={styles.world} aria-hidden="true">
        <Image
          className={styles.worldImage}
          src="/UROBOROS/assets/images/agency/agency-gateway-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.worldDepth} />
        <div className={styles.corePulse} />
        <div className={styles.cursorBeam} />
        <div className={styles.cursorLight} />
        <div className={styles.guideLight} />
      </div>

      <div className={styles.interface}>
        <div className={styles.topline} aria-hidden="true" />

        <header className={styles.brandBlock}>
          <p className={styles.eyebrow}>NODO 01 / DIGITAL SYSTEMS</p>
          <Image
            className={styles.agencyLogo}
            src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS_AGENCY.svg"
            width={560}
            height={144}
            alt="LATTICCE Agency"
            priority
          />
          <p className={styles.subtitle}>
            Contenido, experiencias y distribución para hacer crecer marcas en el mundo digital.
          </p>
        </header>

        <nav className={styles.services} id="servicios" aria-label="Servicios principales de Agency">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              scroll={false}
              className={`${styles.service} ${styles[service.tone]}`}
              data-selected={active === service.href ? "true" : "false"}
              aria-label={`${service.title}. ${service.detail}`}
              onClick={(event) => navigate(event, service.href)}
              onMouseEnter={() => !active && setHovered(service.href)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => !active && setHovered(service.href)}
              onBlur={() => setHovered(null)}
            >
              <span className={styles.serviceIndex}>{service.index}</span>
              <span className={styles.serviceTitle}>{service.title}</span>
              <span className={styles.serviceDetail}>{service.detail}</span>
              <span className={styles.serviceArrow} aria-hidden="true">↗︎</span>
            </Link>
          ))}
        </nav>

        <div className={styles.status} aria-hidden="true">
          <span>SELECT A SYSTEM</span>
          <i />
          <span>01—03</span>
        </div>
      </div>

      <p className={styles.loading} role="status" aria-live="polite">
        {active ? "ABRIENDO SISTEMA" : ""}
      </p>
    </main>
  );
}
