"use client";

import Image from "next/image";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState, WheelEvent as ReactWheelEvent } from "react";
import { CinemaWork, publishedCinemaWorks } from "./cinema-data";
import styles from "./cinema.module.css";

type PlayerState =
  | { status: "idle" | "loading" }
  | { status: "ready"; url: string; kind: "iframe" | "video"; format?: "portrait" }
  | { status: "error" };

const AUTOPLAY_INTERVAL = 7000;
const WHEEL_LOCK_INTERVAL = 480;
const CINEMA_BASE_PATH = "/UROBOROS/films/cinema";

function workOffset(index: number, active: number, length: number) {
  if (index === active || length < 2) return 0;
  const forward = (index - active + length) % length;
  const backward = forward - length;
  return Math.abs(forward) <= Math.abs(backward) ? forward : backward;
}

export default function CinemaExperience({ initialSlug }: { initialSlug?: string }) {
  const works = publishedCinemaWorks;
  const initialIndex = Math.max(0, works.findIndex((work) => work.slug === initialSlug));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [player, setPlayer] = useState<PlayerState>({ status: "idle" });
  const [interacting, setInteracting] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<number | null>(null);
  const wheelLocked = useRef(false);
  const wheelRelease = useRef<number | null>(null);
  const playerStage = useRef<HTMLDivElement>(null);
  const activeWork = works[activeIndex] ?? works[0];

  const selectWork = useCallback((index: number, updateRoute = true) => {
    if (!works.length) return;
    const normalized = (index + works.length) % works.length;
    setActiveIndex(normalized);
    setSheetOpen(false);
    setPlayerOpen(false);
    setPlayer({ status: "idle" });
    if (updateRoute && typeof window !== "undefined") {
      window.history.replaceState(window.history.state, "", `${CINEMA_BASE_PATH}/${works[normalized].slug}`);
    }
  }, [works]);

  const nextWork = useCallback((direction: 1 | -1) => {
    if (works.length > 1) selectWork(activeIndex + direction);
  }, [activeIndex, selectWork, works.length]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (works.length < 2 || interacting || sheetOpen || playerOpen || reducedMotion || !documentVisible) return;
    const timer = window.setTimeout(() => nextWork(1), AUTOPLAY_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [activeIndex, documentVisible, interacting, nextWork, playerOpen, reducedMotion, sheetOpen, works.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, iframe")) return;
      if (event.key === "ArrowRight") { event.preventDefault(); nextWork(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); nextWork(-1); }
      if (event.key === "Escape") {
        if (playerOpen) { setPlayerOpen(false); setPlayer({ status: "idle" }); }
        else if (sheetOpen) setSheetOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextWork, playerOpen, sheetOpen]);

  useEffect(() => () => {
    if (wheelRelease.current !== null) window.clearTimeout(wheelRelease.current);
  }, []);

  useEffect(() => {
    if (!playerOpen || !activeWork) return;
    const controller = new AbortController();
    const load = async () => {
      if (activeWork.source.kind === "youtube") {
        setPlayer({ status: "ready", url: activeWork.source.embedUrl, kind: "iframe" });
        return;
      }
      if (activeWork.source.kind === "instagram") {
        setPlayer({ status: "ready", url: activeWork.source.embedUrl, kind: "iframe", format: "portrait" });
        return;
      }
      if (activeWork.source.kind === "externalLink") return;
      const endpoint = process.env.NEXT_PUBLIC_CINEMA_TOKEN_ENDPOINT?.replace(/\/$/, "");
      if (!endpoint && activeWork.source.localPreviewSrc) {
        setPlayer({ status: "ready", url: activeWork.source.localPreviewSrc, kind: "video" });
        return;
      }
      if (!endpoint) { setPlayer({ status: "error" }); return; }
      setPlayer({ status: "loading" });
      try {
        const response = await fetch(`${endpoint}/v1/cinema/playback`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ slug: activeWork.source.playbackKey }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Playback unavailable");
        const payload = await response.json() as { playerUrl?: string };
        if (!payload.playerUrl) throw new Error("Missing player URL");
        setPlayer({ status: "ready", url: payload.playerUrl, kind: "iframe" });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) setPlayer({ status: "error" });
      }
    };
    void load();
    return () => controller.abort();
  }, [activeWork, playerOpen]);

  const cardOrder = useMemo(() => works
    .map((work, index) => ({ work, index, offset: workOffset(index, activeIndex, works.length) }))
    .filter(({ offset }) => Math.abs(offset) <= 2), [activeIndex, works]);

  const openPlayer = () => {
    setSheetOpen(false);
    if (activeWork.source.kind === "externalLink") return;
    setPlayer({ status: "loading" });
    setPlayerOpen(true);
  };

  const closePlayer = () => {
    setPlayerOpen(false);
    setPlayer({ status: "idle" });
  };

  const requestFullscreen = async () => {
    try { await playerStage.current?.requestFullscreen(); } catch { /* Browser keeps the inline player available. */ }
  };

  const externalPlayerUrl = activeWork.source.kind === "instagram"
    ? activeWork.source.externalUrl
    : activeWork.source.kind === "youtube"
      ? activeWork.source.externalUrl
      : undefined;

  const handleWheel = (event: ReactWheelEvent<HTMLElement>) => {
    if (works.length < 2 || playerOpen || sheetOpen) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 10) return;
    event.preventDefault();
    if (wheelLocked.current) return;
    wheelLocked.current = true;
    nextWork(delta > 0 ? 1 : -1);
    wheelRelease.current = window.setTimeout(() => {
      wheelLocked.current = false;
      wheelRelease.current = null;
    }, WHEEL_LOCK_INTERVAL);
  };

  if (!activeWork) return null;

  return (
    <main
      className={styles.cinemaRoot}
      data-playing={playerOpen || undefined}
      data-sheet-open={sheetOpen || undefined}
      data-interacting={interacting || undefined}
      onWheel={handleWheel}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
        if (Math.abs(distance) > 48) nextWork(distance < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <div className={styles.auditorium} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <nav className={styles.chrome} aria-label="Controles de CINEMA LATTICCE">
        <button className={styles.chromeButton} type="button" onClick={() => nextWork(-1)} aria-label="Ficha anterior">←</button>
        <button className={styles.chromeButton} type="button" onClick={() => nextWork(1)} aria-label="Ficha siguiente">→</button>
        <div className={styles.chromeAddress} role="group" aria-label="Seleccionar ficha">
          {works.map((work, index) => (
            <button
              type="button"
              key={work.slug}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Seleccionar ${work.title}`}
              onClick={() => selectWork(index)}
            />
          ))}
        </div>
        <button className={styles.chromeButton} type="button" disabled aria-label="Correo, no disponible">✉</button>
        <button className={styles.chromeButton} type="button" disabled aria-label="Favorito, no disponible">♡</button>
      </nav>

      <Image className={styles.filmsLogo} src="/UROBOROS/assets/logos/LTT_FILMS_LOGO_1920_FX.png" width={1920} height={503} priority alt="LATTICCE FILMS" />

      <section
        className={styles.carousel}
        aria-label="Obras de CINEMA LATTICCE"
        aria-live="polite"
        onPointerEnter={() => setInteracting(true)}
        onPointerLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
        }}
      >
        <div className={styles.cardStack}>
          {cardOrder.map(({ work, index, offset }) => (
            <article
              className={styles.workCard}
              data-active={offset === 0 || undefined}
              key={work.slug}
              style={{
                "--card-offset": Math.max(-2, Math.min(2, offset)),
                "--card-depth": Math.min(2, Math.abs(offset)),
                "--work-accent": work.accent ?? "210, 229, 234",
              } as CSSProperties}
              aria-hidden={offset !== 0}
              onClick={() => { if (offset !== 0) selectWork(index); }}
            >
              <div className={styles.posterFrame}>
                <Image src={work.poster} alt={work.posterAlt} fill priority={offset === 0} sizes="(max-width: 700px) 88vw, 52vw" />
                <div className={styles.posterShade} />
                {offset === 0 && (work.source.kind === "externalLink"
                  ? <a className={styles.playButton} href={work.source.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${work.title} en una pestaña nueva`}><span aria-hidden="true">▶</span></a>
                  : <button className={styles.playButton} type="button" onClick={openPlayer} aria-label={`Reproducir ${work.title}`}><span aria-hidden="true">▶</span></button>)}
              </div>
              <div className={styles.workInfo}>
                <div className={styles.titleLine}><h1>{work.title}</h1><span>{work.year}</span></div>
                <div className={styles.synopsis} data-paused={sheetOpen || playerOpen || interacting || undefined}>
                  <p>{work.synopsis}</p>
                </div>
              </div>
              {offset === 0 && sheetOpen && (
                <aside className={styles.technicalSheet} aria-label={`Ficha técnica de ${work.title}`}>
                  <button type="button" onClick={() => setSheetOpen(false)} aria-label="Cerrar ficha técnica">×</button>
                  {work.technicalSheet.map((item) => <p key={item.label}><span>{item.label}</span><strong>{item.value}</strong></p>)}
                </aside>
              )}
            </article>
          ))}
        </div>
      </section>

      <div
        className={styles.authorBar}
        onPointerEnter={() => setInteracting(true)}
        onPointerLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
        }}
      >
        <span className={styles.authorIndex}>{String(activeIndex + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}</span>
        <div><strong>{activeWork.author}</strong><small>{activeWork.year}</small></div>
        <button type="button" aria-expanded={sheetOpen} onClick={() => setSheetOpen((value) => !value)} aria-label={`Abrir ficha técnica de ${activeWork.title}`}><span aria-hidden="true">◉</span></button>
      </div>

      <div className={styles.progress} aria-hidden="true"><span key={`${activeWork.slug}-${playerOpen}-${sheetOpen}`} /></div>

      {playerOpen && (
        <section className={styles.playerOverlay} aria-label={`Reproductor de ${activeWork.title}`}>
          <div className={styles.playerStage} ref={playerStage}>
            <div className={styles.playerHeader}>
              <span>{activeWork.title} / {activeWork.year}</span>
              <div>
                {externalPlayerUrl && <a href={externalPlayerUrl} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${activeWork.title} en su publicación original`}>↗</a>}
                <button type="button" onClick={requestFullscreen} aria-label="Pantalla completa">⛶</button>
                <button type="button" onClick={closePlayer} aria-label="Cerrar reproductor">×</button>
              </div>
            </div>
            <div className={styles.playerViewport} data-format={player.status === "ready" ? player.format : undefined}>
              {player.status === "loading" && <span role="status">CARGANDO</span>}
              {player.status === "error" && <span role="alert">REPRODUCCIÓN PENDIENTE</span>}
              {player.status === "ready" && player.kind === "iframe" && <iframe src={player.url} title={`${activeWork.title} — ${activeWork.year}`} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen />}
              {player.status === "ready" && player.kind === "video" && <video src={player.url} poster={activeWork.poster} aria-label={`${activeWork.title} — ${activeWork.year}`} controls autoPlay playsInline preload="metadata" />}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
