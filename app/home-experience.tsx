"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import SiteMenu from "./site-menu";

const nodes = [
  {
    index: "01",
    name: "Agency",
    line: "Ideas que se vuelven sistemas.",
    tone: "agency",
  },
  {
    index: "02",
    name: "Studio",
    line: "La realidad, dirigida.",
    tone: "studio",
  },
  {
    index: "03",
    name: "Sound",
    line: "Lo invisible toma cuerpo.",
    tone: "sound",
  },
  {
    index: "04",
    name: "Design",
    line: "La materia encuentra su forma.",
    tone: "design",
  },
  {
    index: "05",
    name: "Time",
    line: "Lo vivido deja una huella.",
    tone: "time",
  },
] as const;

const method = [
  ["01", "Escuchar", "Entender el contexto antes de decidir la forma."],
  ["02", "Conectar", "Reunir las disciplinas que la idea realmente necesita."],
  ["03", "Construir", "Convertir estrategia, materia y tiempo en una experiencia."],
  ["04", "Permanecer", "Crear sistemas capaces de crecer sin perder identidad."],
] as const;

export default function HomeExperience() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-home-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      elements.forEach((element) => element.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, window.scrollY / distance) : 0);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <main className={styles.homeRoot}>
      <SiteMenu
        homeHref="#inicio"
        links={[
          { label: "HOME", href: "#inicio" },
          { label: "STUDIO", href: "/studio#inicio" },
          { label: "SOUND", href: "#ecosistema" },
          { label: "DESIGN", href: "#ecosistema" },
          { label: "AGENCY", href: "#ecosistema" },
          { label: "TIME", href: "#ecosistema" },
          { label: "BOOK", href: "#ecosistema" },
          { label: "BLOG", href: "#contacto" },
        ]}
      />

      <div className={styles.progress} aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>

      <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
        <div className={styles.heroScene} aria-hidden="true">
          <div className={styles.monolith} />
          <div className={styles.aperture} />
          <div className={styles.beam} />
        </div>
        <div className={styles.heroObelisk} aria-hidden="true">
          <Image
            src="/UROBOROS/assets/images/obelisco.png"
            width={939}
            height={1675}
            alt=""
            priority
            sizes="(max-width: 620px) 46vw, (max-width: 900px) 38vw, 30vw"
          />
        </div>
        <div className={styles.heroMeta}>
          <span>Creative system</span>
          <span>Mexico · 19.4326° N</span>
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>LATTICCE / Sistema creativo independiente</p>
          <h1 id="hero-title">Una idea.<br /><em>Muchas formas</em><br />de hacerla real.</h1>
          <div className={styles.heroFoot}>
            <p>Estrategia, diseño, imagen, sonido, cine y memoria trabajando como un solo organismo.</p>
            <a href="#ecosistema">Entrar al sistema <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <span className={styles.heroIndex}>00 / 05</span>
      </section>

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={styles.sectionLabel} data-home-reveal><span>00</span><p>Principio</p></div>
        <div className={styles.manifestoCopy} data-home-reveal>
          <p className={styles.kicker}>No hacemos piezas aisladas</p>
          <h2 id="manifesto-title">Conectamos <em>disciplinas distintas</em> para responder a una misma intención. Cada nodo conserva una <em>mirada propia</em>, pero juntos forman una estructura capaz de pensar, producir y evolucionar.</h2>
          <div className={styles.manifestoDetail}>
            <p>Construimos relaciones entre ideas, materia y tiempo.</p>
            <span>Una red, no una colección.</span>
          </div>
        </div>
      </section>

      <section className={styles.ecosystem} id="ecosistema" aria-label="Nodos LATTICCE">
        <div className={styles.nodeList}>
          {nodes.map((node) => (
            <article className={`${styles.node} ${styles[node.tone]}`} key={node.name} data-home-reveal tabIndex={0}>
              <span className={styles.nodeIndex}>{node.index}</span>
              <div className={styles.nodeName}>
                <h3>{node.name}</h3>
                <p>{node.line}</p>
              </div>
              <span className={styles.nodePrompt} aria-hidden="true">Explorar <i>↗</i></span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.interlude} aria-label="Declaración LATTICCE">
        <div className={styles.interludeLight} aria-hidden="true" />
        <p data-home-reveal>La forma cambia.</p>
        <h2 data-home-reveal>La intención<br /><em>permanece.</em></h2>
        <span>LATTICCE / 2026</span>
      </section>

      <section className={styles.method} id="metodo" aria-label="Método">
        <div className={styles.luminautta} aria-hidden="true">
          <Image src="/UROBOROS/assets/images/luminautta.png" width={1024} height={1536} alt="" sizes="(max-width: 620px) 95vw, (max-width: 900px) 70vw, 34vw" />
        </div>
        <div className={styles.methodList}>
          {method.map(([index, name, description]) => (
            <article key={index} data-home-reveal>
              <span>{index}</span>
              <h3>{name}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="contacto" aria-labelledby="contact-title">
        <div className={styles.contactGrid} aria-hidden="true" />
        <div className={styles.sectionLabel} data-home-reveal><span>03</span><p>Contacto</p></div>
        <div className={styles.contactCopy} data-home-reveal>
          <p className={styles.kicker}>El siguiente proyecto puede comenzar aquí</p>
          <h2 id="contact-title">Hagamos espacio<br />para una <em>idea.</em></h2>
          <p>Mientras habilitamos el canal general de LATTICCE, puedes iniciar una conversación desde nuestro nodo de producción visual.</p>
          <Link className={styles.contactButton} href="/studio#cotizar">
            Hablar con Studio <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.footerLogo} href="#inicio" aria-label="Volver al inicio">
          <Image src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS.svg" width={198} height={38} alt="LATTICCE" />
        </Link>
        <p>Sistema creativo independiente</p>
        <div className={styles.footerNodes}>
          {nodes.map((node) => <span key={node.name}>{node.name}</span>)}
        </div>
        <span>© 2026 LATTICCE</span>
      </footer>
    </main>
  );
}
