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
    description: "Estrategia, campañas y experiencias digitales construidas como mundos coherentes.",
    href: "/agency",
    tone: "agency",
  },
  {
    index: "02",
    name: "Design",
    line: "La materia encuentra su forma.",
    description: "Identidad, objetos y lenguajes visuales donde concepto y ejecución son inseparables.",
    href: "/design",
    tone: "design",
  },
  {
    index: "03",
    name: "Studio",
    line: "La realidad, dirigida.",
    description: "Fotografía y video comercial construidos desde las personas, el producto y la luz.",
    href: "/studio",
    tone: "studio",
    live: true,
  },
  {
    index: "04",
    name: "Sound",
    line: "Lo invisible toma cuerpo.",
    description: "Identidad sonora, música y diseño de audio que hacen perceptible una idea.",
    href: "/sound",
    tone: "sound",
  },
  {
    index: "05",
    name: "Films",
    line: "El tiempo sostiene la imagen.",
    description: "Cine y narrativas audiovisuales donde paisaje, arquitectura y silencio construyen escala.",
    href: "/films",
    tone: "films",
  },
  {
    index: "06",
    name: "Time",
    line: "Lo vivido deja una huella.",
    description: "Memoria editorial, archivo y fotografía física para conservar lo que no debe desaparecer.",
    href: "/time",
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
          { label: "TIME", href: "#metodo" },
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
        <span className={styles.heroIndex}>00 / 06</span>
      </section>

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={styles.sectionLabel} data-home-reveal><span>00</span><p>Principio</p></div>
        <div className={styles.manifestoCopy} data-home-reveal>
          <p className={styles.kicker}>No hacemos piezas aisladas</p>
          <h2 id="manifesto-title">Construimos relaciones entre <em>ideas, materia y tiempo.</em></h2>
          <div className={styles.manifestoDetail}>
            <p>LATTICCE conecta disciplinas distintas para responder a una misma intención. Cada nodo conserva una mirada propia; juntos forman una estructura capaz de pensar, producir y evolucionar.</p>
            <span>Una red, no una colección.</span>
          </div>
        </div>
      </section>

      <section className={styles.ecosystem} id="ecosistema" aria-labelledby="ecosystem-title">
        <div className={styles.ecosystemHeading} data-home-reveal>
          <div className={styles.sectionLabel}><span>01</span><p>Ecosistema</p></div>
          <h2 id="ecosystem-title">Seis nodos.<br />Una sola estructura.</h2>
          <p>Cada disciplina abre una forma distinta de observar y producir. El sistema comienza donde el proyecto lo necesita.</p>
        </div>

        <div className={styles.nodeList}>
          {nodes.map((node) => {
            const isLive = "live" in node && node.live;
            const content = (
              <>
              <span className={styles.nodeIndex}>{node.index}</span>
              <div className={styles.nodeName}>
                <h3>{node.name}</h3>
                <p>{node.line}</p>
              </div>
              <p className={styles.nodeDescription}>{node.description}</p>
              <span className={styles.nodeStatus}>{isLive ? "Entrar" : "En desarrollo"} <i aria-hidden="true">{isLive ? "↗" : "·"}</i></span>
              </>
            );

            return isLive ? (
              <Link className={`${styles.node} ${styles[node.tone]} ${styles.nodeLive}`} href={node.href} key={node.name} data-home-reveal>
                {content}
              </Link>
            ) : (
              <article className={`${styles.node} ${styles[node.tone]} ${styles.nodePending}`} key={node.name} data-home-reveal>
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.interlude} aria-label="Declaración LATTICCE">
        <div className={styles.interludeLight} aria-hidden="true" />
        <p data-home-reveal>La forma cambia.</p>
        <h2 data-home-reveal>La intención<br /><em>permanece.</em></h2>
        <span>LATTICCE / 2026</span>
      </section>

      <section className={styles.method} id="metodo" aria-labelledby="method-title">
        <div className={styles.methodIntro} data-home-reveal>
          <div className={styles.sectionLabel}><span>02</span><p>Método</p></div>
          <h2 id="method-title">Pensar como sistema.<br /><em>Trabajar con precisión.</em></h2>
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
          {nodes.map((node) => "live" in node && node.live
            ? <Link href={node.href} key={node.name}>{node.name}</Link>
            : <span key={node.name}>{node.name}</span>)}
        </div>
        <span>© 2026 LATTICCE</span>
      </footer>
    </main>
  );
}
