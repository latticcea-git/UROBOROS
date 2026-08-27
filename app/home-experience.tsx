"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import AgencyIntro from "./agency-intro";
import SoundIntro from "./sound-intro";
import styles from "./home.module.css";
import { BlackSea, ClassicalStructure, LightNucleus, ManifestoLoop } from "./home-visuals";
import SiteMenu from "./site-menu";
import { openContactPopup } from "./global-shell";

const nodes = [
  { index: "01", name: "Agency", line: "Ideas que se vuelven sistemas.", tone: "agency", href: "/agency" },
  { index: "02", name: "Studio", line: "La realidad, dirigida.", tone: "studio", href: "/studio" },
  { index: "03", name: "Sound", line: "Lo invisible toma cuerpo.", tone: "sound", href: "/sound" },
  { index: "04", name: "Design", line: "La materia encuentra su forma.", tone: "design", href: "/design" },
  { index: "05", name: "Time", line: "Lo vivido deja una huella.", tone: "time", href: "/time" },
] as const;

const pillars = [
  ["01", "Escuchar", "Entender el contexto antes de decidir la forma."],
  ["02", "Conectar", "Reunir las disciplinas que la idea realmente necesita."],
  ["03", "Construir", "Convertir estrategia, materia y tiempo en una experiencia."],
  ["04", "Permanecer", "Crear sistemas capaces de crecer sin perder identidad."],
] as const;

const sceneAnchors = ["inicio", "manifiesto", "ecosistema", "intencion", "metodo", "comunidad", "contacto"] as const;
const sceneNames = ["Inicio", "Manifiesto", "ELIGE TTU nodo", "LA INTTENCCIÓN permanecce", "NUESTTROS pilares", "SINTTERGIA LATTENTTE", "Contacto"] as const;
const transitionDuration = 1050;

export default function HomeExperience() {
  const router = useRouter();
  const [activeScene, setActiveScene] = useState(0);
  const [previousScene, setPreviousScene] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [transitioning, setTransitioning] = useState(false);
  const [flash, setFlash] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [agencyIntro, setAgencyIntro] = useState(false);
  const [soundIntro, setSoundIntro] = useState(false);
  const activeRef = useRef(0);
  const lockedRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const wheelResetRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const touchRef = useRef({ x: 0, y: 0, local: false });
  const didSwipeRef = useRef(false);

  const moveTo = useCallback((target: number) => {
    const current = activeRef.current;
    const next = Math.max(0, Math.min(sceneAnchors.length - 1, target));
    if (next === current || lockedRef.current) return;

    const nextDirection = next > current ? 1 : -1;
    lockedRef.current = true;
    activeRef.current = next;
    setDirection(nextDirection);
    setPreviousScene(current);
    setActiveScene(next);
    setTransitioning(true);
    setFlash((current === 3 && next === 4) || (current === 4 && next === 3));
    wheelDeltaRef.current = 0;

    window.history.replaceState(null, "", `#${sceneAnchors[next]}`);
    transitionTimerRef.current = window.setTimeout(() => {
      setPreviousScene(null);
      setTransitioning(false);
      setFlash(false);
      lockedRef.current = false;
    }, transitionDuration);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const initial = sceneAnchors.indexOf(hash as (typeof sceneAnchors)[number]);
    if (initial > 0) {
      activeRef.current = initial;
      setActiveScene(initial);
    }

    return () => {
      if (wheelResetRef.current) window.clearTimeout(wheelResetRef.current);
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-manifesto-scroll='true'], .global-menu-panel")) return;
      event.preventDefault();
      if (lockedRef.current) return;

      wheelDeltaRef.current += event.deltaY;
      if (wheelResetRef.current) window.clearTimeout(wheelResetRef.current);
      wheelResetRef.current = window.setTimeout(() => { wheelDeltaRef.current = 0; }, 180);

      if (Math.abs(wheelDeltaRef.current) >= 64) {
        moveTo(activeRef.current + (wheelDeltaRef.current > 0 ? 1 : -1));
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const target = event.target as HTMLElement | null;
      touchRef.current = {
        x: touch?.clientX ?? 0,
        y: touch?.clientY ?? 0,
        local: Boolean(target?.closest("[data-manifesto-scroll='true'], [data-local-interactive='true'], .global-menu-panel")),
      };
      didSwipeRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchRef.current.local) return;
      const touch = event.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchRef.current.x;
      const deltaY = touch.clientY - touchRef.current.y;
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchRef.current.local || lockedRef.current) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchRef.current.x;
      const deltaY = touch.clientY - touchRef.current.y;
      if (Math.abs(deltaY) > 52 && Math.abs(deltaY) > Math.abs(deltaX) * 1.15) {
        didSwipeRef.current = true;
        moveTo(activeRef.current + (deltaY < 0 ? 1 : -1));
        window.setTimeout(() => { didSwipeRef.current = false; }, 320);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-manifesto-scroll='true'], input, textarea, select")) return;
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        moveTo(activeRef.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        moveTo(activeRef.current - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        moveTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        moveTo(sceneAnchors.length - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [moveTo]);

  useEffect(() => {
    const navigateSection = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const index = sceneAnchors.indexOf(id as (typeof sceneAnchors)[number]);
      if (index >= 0) moveTo(index);
    };
    window.addEventListener("latticce:navigate-section", navigateSection);
    return () => window.removeEventListener("latticce:navigate-section", navigateSection);
  }, [moveTo]);

  const sceneClass = (index: number) => {
    if (index === activeScene) return `${styles.scene} ${styles.sceneActive}`;
    if (index === previousScene) return `${styles.scene} ${styles.sceneLeaving}`;
    return `${styles.scene} ${styles.sceneHidden}`;
  };

  const sceneProps = (index: number) => ({
    className: sceneClass(index),
    "data-direction": direction,
    "aria-hidden": activeScene !== index,
    inert: activeScene !== index,
  });

  const handleMenuNavigate = (href: string) => {
    if (!href.startsWith("#")) return;
    const index = sceneAnchors.indexOf(href.slice(1) as (typeof sceneAnchors)[number]);
    if (index >= 0) moveTo(index);
  };

  const selectNode = (event: React.MouseEvent<HTMLAnchorElement>, name: string, href: string) => {
    event.preventDefault();
    if (didSwipeRef.current || lockedRef.current) return;
    lockedRef.current = true;
    setSelectedNode(name);
    if (name === "Agency") {
      setAgencyIntro(true);
      return;
    }
    if (name === "Sound") {
      setSoundIntro(true);
      return;
    }
    window.setTimeout(() => router.push(href), 520);
  };

  const cancelAgencyIntro = useCallback(() => {
    setAgencyIntro(false);
    setSelectedNode(null);
    lockedRef.current = false;
  }, []);

  const completeAgencyIntro = useCallback(() => {
    router.push("/agency", { scroll: false });
  }, [router]);

  const cancelSoundIntro = useCallback(() => {
    setSoundIntro(false);
    setSelectedNode(null);
    lockedRef.current = false;
  }, []);

  const completeSoundIntro = useCallback(() => {
    router.push("/sound", { scroll: false });
  }, [router]);

  return (
    <>
      <main
        className={`${styles.homeRoot} ${transitioning ? styles.isTransitioning : ""} ${selectedNode ? styles.isSelectingNode : ""}`}
        data-agency-entering={agencyIntro ? "true" : "false"}
        data-sound-entering={soundIntro ? "true" : "false"}
        inert={agencyIntro || soundIntro || undefined}
      >
      <SiteMenu
        homeHref="#inicio"
        onNavigate={handleMenuNavigate}
        links={[
          { label: "HOME", href: "#inicio" },
          { label: "STUDIO", href: "/studio#inicio" },
          { label: "SOUND", href: "/sound" },
          { label: "DESIGN", href: "/design" },
          { label: "AGENCY", href: "/agency" },
          { label: "TIME", href: "/time" },
          { label: "BOOK", href: "/book" },
          { label: "BLOG", href: "/blog" },
        ]}
      />

      <Link
        className={styles.userAccess}
        href="/usuario"
        data-local-interactive="true"
        aria-label="Abrir área de usuario"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M4.8 20c.75-3.35 3.2-5.15 7.2-5.15s6.45 1.8 7.2 5.15" />
        </svg>
        <span>Acceso</span>
      </Link>

      <div className={styles.sceneProgress} aria-hidden="true">
        <i style={{ transform: `scaleX(${activeScene / (sceneAnchors.length - 1)})` }} />
      </div>

      <nav className={styles.sceneRail} aria-label="Secciones del Home">
        {sceneNames.map((name, index) => (
          <button
            type="button"
            key={name}
            className={index === activeScene ? styles.railActive : ""}
            onClick={() => moveTo(index)}
            aria-label={`Ir a ${name}`}
            aria-current={index === activeScene ? "step" : undefined}
          >
            <span>{String(index).padStart(2, "0")}</span><i />
          </button>
        ))}
      </nav>

      {flash && <div className={styles.sceneFlash} aria-hidden="true" />}

      <section {...sceneProps(0)} id="inicio" aria-labelledby="hero-title">
        <BlackSea active={activeScene === 0} presence={0.96} tempo={1} horizon={-0.01} />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroObelisk} aria-hidden="true">
          <Image src="/UROBOROS/assets/images/obelisco.png" width={939} height={1675} alt="" loading="eager" fetchPriority="high" sizes="(max-width: 620px) 54vw, (max-width: 900px) 42vw, 31vw" />
        </div>
        <div className={styles.heroMeta}><span>Creative system</span><span>Mexico · 19.4326° N</span></div>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>LATTICCE / Sistema creativo independiente</p>
          <h1 id="hero-title">Una idea.<br /><em>Muchas formas</em><br />de hacerla real.</h1>
          <div className={styles.heroFoot}>
            <p>Estrategia, diseño, imagen, sonido, cine y memoria trabajando como un solo organismo.</p>
            <button type="button" onClick={() => moveTo(1)}>Entrar al sistema <span aria-hidden="true">↓</span></button>
          </div>
        </div>
        <span className={styles.sceneIndex}>00 / 05</span>
      </section>

      <section {...sceneProps(1)} id="manifiesto" aria-labelledby="manifesto-title">
        <BlackSea active={activeScene === 1} presence={0.34} tempo={0.48} horizon={0.08} />
        <div className={styles.manifestoAtmosphere} aria-hidden="true" />
        <div className={styles.sceneLabel}><span>01</span><p>Manifiesto</p></div>
        <div className={styles.manifestoLayout}>
          <div className={styles.manifestoText}>
            <p className={styles.kicker}>Una red, no una colección</p>
            <h2 id="manifesto-title">MANIFIESTTO</h2>
            <ManifestoLoop active={activeScene === 1} />
          </div>
          <div className={styles.nucleusWrap} data-local-interactive="true">
            <LightNucleus active={activeScene === 1} />
            <span>Luminautta / núcleo latente</span>
          </div>
        </div>
      </section>

      <section {...sceneProps(2)} id="ecosistema" aria-labelledby="nodes-title">
        <BlackSea active={activeScene === 2} presence={0.94} tempo={1.02} horizon={0.025} />
        <div className={styles.nodesAtmosphere} aria-hidden="true" />
        <div className={styles.sceneLabel}><span>02</span><p>Ecosistema</p></div>
        <div className={styles.nodesHeader}>
          <p className={styles.kicker}>Cinco miradas / una intención</p>
          <h2 id="nodes-title">ELIGE TTU <em>nodo</em></h2>
        </div>
        <div className={styles.nodeList}>
          {nodes.map((node, index) => (
            <Link
              className={`${styles.node} ${styles[node.tone]} ${selectedNode === node.name ? styles.nodeSelected : ""}`}
              style={{ "--node-order": index } as React.CSSProperties}
              key={node.name}
              href={node.href}
              onClick={(event) => selectNode(event, node.name, node.href)}
              aria-label={`Explorar LATTICCE ${node.name}`}
              data-node={node.tone}
            >
              <span className={styles.nodeIndex}>{node.index}</span>
              <div className={styles.nodeName}><h3>{node.name}</h3><p>{node.line}</p></div>
              <span className={styles.nodePrompt} aria-hidden="true">Explorar <i>↗</i></span>
            </Link>
          ))}
        </div>
      </section>

      <section {...sceneProps(3)} id="intencion" aria-labelledby="intention-title">
        <BlackSea active={activeScene === 3} presence={0.22} tempo={0.34} horizon={0.12} />
        <div className={styles.intentionLight} aria-hidden="true" />
        <p className={styles.intentionLead}>La forma cambia.</p>
        <h2 id="intention-title">LA INTTENCCIÓN<br /><em>permanecce.</em></h2>
        <span>LATTICCE / 2026</span>
        <Link className={styles.intentionBookCta} href="/book" data-local-interactive="true">
          Conoce nuestro trabajo <i aria-hidden="true">↗</i>
        </Link>
      </section>

      <section {...sceneProps(4)} id="metodo" aria-labelledby="pillars-title">
        <BlackSea active={activeScene === 4} presence={0.4} tempo={0.56} horizon={0.06} />
        <div className={styles.sceneLabel}><span>04</span><p>Método</p></div>
        <ClassicalStructure />
        <div className={styles.pillarsCopy}>
          <p className={styles.kicker}>La estructura sostiene la intención</p>
          <h2 id="pillars-title">NUESTTROS <em>pilares</em></h2>
          <div className={styles.pillarList}>
            {pillars.map(([index, name, description]) => (
              <article key={index} style={{ "--pillar-order": Number(index) - 1 } as React.CSSProperties}>
                <span>{index}</span><h3>{name}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section {...sceneProps(5)} id="comunidad" aria-labelledby="community-title">
        <div className={styles.communityImage} aria-hidden="true" />
        <div className={styles.communityShade} aria-hidden="true" />
        <div className={styles.sceneLabel}><span>05</span><p>Comunidad</p></div>
        <div className={styles.communityCopy}>
          <p className={styles.kicker}>Conecta con otros LUMINAUTTAS</p>
              <h2 id="community-title">SINTTERGIA<br /><em>lattentte</em></h2>
          <a href="https://chat.whatsapp.com/GCpJDA5K9quC0RaHCEodRi" target="_blank" rel="noreferrer" data-local-interactive="true">Únete a nuestra comunidad <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section {...sceneProps(6)} id="contacto" aria-labelledby="contact-title">
        <BlackSea active={activeScene === 6} presence={0.16} tempo={0.24} horizon={0.14} />
        <div className={styles.contactAtmosphere} aria-hidden="true" />
        <div className={styles.sceneLabel}><span>06</span><p>Contacto</p></div>
        <div className={styles.contactCopy}>
          <p className={styles.kicker}>Un LUMINAUTTA enviará una señal a la brevedad</p>
          <h2 id="contact-title">Agenda<br />TU CITTA</h2>
          <p>Cuéntanos qué quieres poner en movimiento. Elegiremos contigo el nodo o la combinación adecuada.</p>
          <button className={styles.contactButton} type="button" data-contact-trigger onClick={openContactPopup}>Iniciar una conversación <span aria-hidden="true">↗</span></button>
        </div>
        <footer className={styles.contactFooter}>
          <Link href="#inicio" onClick={(event) => { event.preventDefault(); moveTo(0); }} aria-label="Volver al inicio">
            <Image src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS.svg" width={198} height={38} alt="LATTICCE" />
          </Link>
          <nav aria-label="Explorar LATTICCE"><Link href="/studio">Studio</Link><Link href="/sound">Sound</Link><Link href="/time">Time</Link><Link href="/design">Design</Link><Link href="/agency">Agency</Link><Link href="/book">Book</Link><Link href="/blog">Blog</Link><a href="https://chat.whatsapp.com/GCpJDA5K9quC0RaHCEodRi" target="_blank" rel="noreferrer">Comunidad</a><a href="https://wa.me/525525241137" target="_blank" rel="noreferrer">WhatsApp</a></nav>
          <span>© 2026 LATTICCE</span>
        </footer>
      </section>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>{activeScene === sceneAnchors.length - 1 ? "Scroll para volver" : "Scroll para avanzar"}</span>
        <i />
      </div>
      </main>
      {agencyIntro && <AgencyIntro onCancel={cancelAgencyIntro} onComplete={completeAgencyIntro} />}
      {soundIntro && <SoundIntro onCancel={cancelSoundIntro} onComplete={completeSoundIntro} />}
    </>
  );
}
