"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { AgencyService } from "./service-data";
import styles from "./service.module.css";

type Props = {
  service: AgencyService;
};

export default function AgencyServiceExperience({ service }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealTargets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    revealTargets.forEach((target) => observer.observe(target));

    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(1, window.scrollY / height) : 0;
      root.style.setProperty("--page-progress", progress.toFixed(4));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, [service.slug]);

  const submitProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus(
      "Tu proyecto quedó preparado para envío. Conectaremos este formulario al canal comercial antes de publicar.",
    );
  };

  return (
    <main
      ref={rootRef}
      className={styles.serviceRoot}
      data-service={service.slug}
      data-cinematic={service.cinematic ? "true" : "false"}
    >
      <div className={styles.progress} aria-hidden="true">
        <i />
      </div>

      <header className={styles.header}>
        <Link className={styles.brand} href="/agency" aria-label="Volver a LATTICCE Agency">
          <span>LATTICCE</span>
          <small>AGENCY</small>
        </Link>

        <nav className={styles.headerNav} aria-label="Navegación del servicio">
          <Link href="/agency">SISTEMAS</Link>
          <a href="#cuentanos">CUÉNTANOS TU PROYECTO</a>
        </nav>
      </header>

      <section className={styles.hero} id="inicio" aria-labelledby="service-title">
        <Image
          className={styles.heroImage}
          src={service.heroImage}
          alt={service.heroAlt}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroContent}>
          <div className={styles.heroMeta}>
            <span>{service.index}</span>
            <span>LATTICCE AGENCY</span>
            <span>{service.kicker}</span>
          </div>
          {service.campaignLine ? (
            <p className={styles.campaignLine}>{service.campaignLine}</p>
          ) : null}
          <h1 id="service-title">{service.title}</h1>
          <p className={styles.heroPromise}>{service.promise}</p>
          <p className={styles.heroIntro}>{service.intro}</p>
          <a className={styles.primaryCta} href="#cuentanos">
            CUÉNTANOS TU PROYECTO <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className={styles.ritualLine} aria-hidden="true">
          <span>{service.ritual}</span>
          <i />
          <span>SCROLL PARA ACTIVAR</span>
        </div>
      </section>

      <section className={styles.statement} id="enfoque">
        <div className={styles.sectionIndex} data-reveal>
          <span>01</span>
          <span>EL PROBLEMA</span>
        </div>
        <div className={styles.statementCopy} data-reveal>
          <h2>{service.problemTitle}</h2>
          <p>{service.problemCopy}</p>
        </div>
      </section>

      {service.cinematic && service.chapters ? (
        <section className={styles.cinematic} aria-label="Recorrido de creación del ecosistema">
          <div className={styles.cinematicWorld} aria-hidden="true">
            <div className={styles.cinematicMedia}>
              <Image
                className={styles.cinematicImage}
                src={service.heroImage}
                alt=""
                fill
                sizes="100vw"
              />
            </div>
            <div className={styles.cinematicShade} />
            <div className={styles.codeField} />
          </div>
          <div className={styles.chapters}>
            {service.chapters.map((chapter, index) => (
              <article
                className={styles.chapter}
                data-side={index % 2 === 0 ? "left" : "right"}
                key={chapter.number}
              >
                <div data-reveal>
                  <span>{chapter.number}</span>
                  <h2>{chapter.title}</h2>
                  <p>{chapter.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.processSection} id="proceso">
        <div className={styles.sectionHeading} data-reveal>
          <div className={styles.sectionIndex}>
            <span>{service.cinematic ? "02" : "02"}</span>
            <span>EL SISTEMA</span>
          </div>
          <h2>{service.cinematic ? "Cómo hacemos habitable el mundo." : "Un ritual que se puede repetir y mejorar."}</h2>
        </div>

        <ol className={styles.processList}>
          {service.process.map((step, index) => (
            <li key={step.title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      {service.platforms ? (
        <section className={styles.platformSection}>
          <div className={styles.platformIntro} data-reveal>
            <span>03 / CANALES</span>
            <h2>Una voz. Cada red en su propio lenguaje.</h2>
            <p>
              Priorizamos los canales de mayor impacto para tu marca y adaptamos cada pieza al
              comportamiento de su plataforma.
            </p>
          </div>
          <ul className={styles.platforms} aria-label="Redes sociales atendidas">
            {service.platforms.map((platform, index) => (
              <li key={platform.name} data-reveal style={{ "--item-index": index } as React.CSSProperties}>
                <Image src={platform.icon} width={36} height={36} alt="" />
                <span>{platform.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className={styles.capabilitiesSection} id="capacidades">
        <div className={styles.sectionHeading} data-reveal>
          <div className={styles.sectionIndex}>
            <span>{service.platforms ? "04" : "03"}</span>
            <span>CAPACIDADES</span>
          </div>
          <h2>Las partes del sistema.</h2>
        </div>
        <ul className={styles.capabilities}>
          {service.capabilities.map((capability, index) => (
            <li key={capability} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{capability}</strong>
            </li>
          ))}
        </ul>

        {service.studioLink ? (
          <div className={styles.studioBridge} data-reveal>
            <span>PRODUCCIÓN ESPECIALIZADA</span>
            <p>
              Cuando el contenido necesita fotografía o video especializado, activamos el mundo de
              producción de LATTICCE Studio.
            </p>
            <Link href="/studio">CONOCER STUDIO ↗</Link>
          </div>
        ) : null}
      </section>

      <section className={styles.reportSection}>
        <div className={styles.reportGlow} aria-hidden="true" />
        <div className={styles.reportCopy} data-reveal>
          <span>{service.platforms ? "05" : "04"} / LECTURA</span>
          <h2>{service.reportTitle}</h2>
          <p>{service.reportCopy}</p>
        </div>
        <div className={styles.reportSignals} aria-label="Indicadores del reporte">
          {service.reportSignals.map((signal, index) => (
            <div key={signal} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{signal}</strong>
              <i />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.casesSection} id="casos">
        <div className={styles.caseNumber} aria-hidden="true">
          {service.platforms ? "06" : "05"}
        </div>
        <div data-reveal>
          <span>CASOS AUTORIZADOS / EN PREPARACIÓN</span>
          <h2>{service.caseTitle}</h2>
          <p>{service.caseCopy}</p>
        </div>
      </section>

      <section className={styles.contactSection} id="cuentanos">
        <div className={styles.contactIntro} data-reveal>
          <span>{service.platforms ? "07" : "06"} / CONTACTO</span>
          <h2>{service.cta}</h2>
          <p>
            Cuéntanos qué quieres activar. Empezaremos por entender el problema antes de proponer una
            solución.
          </p>
        </div>

        <form className={styles.contactForm} onSubmit={submitProject} data-reveal>
          <label>
            <span>NOMBRE</span>
            <input name="name" autoComplete="name" required placeholder="¿Cómo te llamas?" />
          </label>
          <label>
            <span>MARCA / PROYECTO</span>
            <input name="brand" autoComplete="organization" required placeholder="Nombre del proyecto" />
          </label>
          <label>
            <span>CORREO</span>
            <input name="email" type="email" autoComplete="email" required placeholder="correo@marca.com" />
          </label>
          <label>
            <span>SERVICIO</span>
            <select name="service" defaultValue={service.slug}>
              <option value="contenido-rrss">Contenido RRSS</option>
              <option value="ecosistemas-ui-ux">Ecosistemas Digitales (UI–UX)</option>
              <option value="distribucion-ads">Distribución ADS</option>
            </select>
          </label>
          <label className={styles.fullField}>
            <span>CUÉNTANOS TU PROYECTO</span>
            <textarea
              name="project"
              required
              rows={5}
              placeholder="¿Qué necesitas construir, activar o mejorar?"
            />
          </label>
          <button type="submit">ENVIAR PROYECTO ↗</button>
          <p className={styles.formStatus} role="status" aria-live="polite">
            {formStatus}
          </p>
        </form>
      </section>

      <Link className={styles.nextService} href={`/agency/${service.nextSlug}`}>
        <span>SIGUIENTE SISTEMA</span>
        <strong>{service.nextTitle}</strong>
        <i aria-hidden="true">↗</i>
      </Link>

      <footer className={styles.footer}>
        <Link href="/agency">← SELECTOR AGENCY</Link>
        <span>LATTICCE AGENCY</span>
        <span>ESTRATEGIA · SISTEMAS · CRECIMIENTO</span>
      </footer>
    </main>
  );
}
