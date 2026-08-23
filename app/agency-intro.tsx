"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./agency-intro.module.css";

type AgencyIntroProps = {
  onCancel: () => void;
  onComplete: () => void;
};

type IntroPhase = "blank" | "prompt" | "loading" | "welcome";

const diagnosticLines = [
  "> latticce.agency / access_request",
  "[01] isolating creative environment... ok",
  "[02] mounting digital architecture... ok",
  "[03] connecting content systems... ok",
  "[04] synchronizing interface layer... ok",
  "[05] calibrating distribution engine... ok",
  "[06] rendering agency gateway... ready",
] as const;

export default function AgencyIntro({ onCancel, onComplete }: AgencyIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>("blank");
  const [typedCommand, setTypedCommand] = useState("");
  const phaseRef = useRef<IntroPhase>("blank");
  const completeRef = useRef(onComplete);
  const cancelRef = useRef(onCancel);

  useEffect(() => {
    completeRef.current = onComplete;
    cancelRef.current = onCancel;
  }, [onCancel, onComplete]);

  const startLoading = useCallback(() => {
    if (phaseRef.current !== "prompt") return;
    phaseRef.current = "loading";
    setPhase("loading");
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
    const duration = phase === "blank" ? 2000 : phase === "prompt" ? 7000 : phase === "loading" ? 3000 : 7000;
    const timer = window.setTimeout(() => {
      if (phase === "blank") setPhase("prompt");
      else if (phase === "prompt") startLoading();
      else if (phase === "loading") setPhase("welcome");
      else completeRef.current();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [phase, startLoading]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelRef.current();
        return;
      }

      if (phaseRef.current !== "prompt") return;

      if (event.key === "Enter") {
        event.preventDefault();
        startLoading();
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        setTypedCommand((current) => current.slice(0, -1));
        return;
      }

      if (/^[a-z]$/i.test(event.key)) {
        event.preventDefault();
        setTypedCommand((current) => {
          const next = `${current}${event.key}`.slice(-12);
          if (next.toLowerCase().endsWith("ok")) window.setTimeout(startLoading, 0);
          return next;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [startLoading]);

  return (
    <section
      className={styles.terminal}
      data-phase={phase}
      aria-label="Acceso a LATTICCE Agency"
      aria-live="polite"
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.scan} aria-hidden="true" />

      <div className={styles.consolePanel} onClick={startLoading}>
        <header className={styles.consoleHeader} aria-hidden="true">
          <span>AGENCY.OS / GATEWAY</span>
          <span>SESSION 01</span>
        </header>

        <div className={styles.consoleBody}>
          {phase === "prompt" && (
            <div className={styles.prompt} role="button" tabIndex={0} aria-label="Continuar a LATTICCE Agency">
              <p className={styles.question}>¿Listo para conocer LATTICCE AGENCY?</p>
              <p className={styles.instruction}>Presiona Enter, haz clic o escribe OK para continuar.</p>
              <p className={styles.typedLine} aria-label={`Comando escrito: ${typedCommand || "vacío"}`}>
                &gt; {typedCommand}<i aria-hidden="true" />
              </p>
            </div>
          )}

          {phase === "loading" && (
            <div className={styles.loading} role="status">
              <div className={styles.codeLines}>
                {diagnosticLines.map((line, index) => (
                  <p key={line} style={{ "--line-index": index } as React.CSSProperties}>{line}</p>
                ))}
              </div>
              <div className={styles.progress} aria-label="Cargando LATTICCE Agency"><i /></div>
              <div className={styles.loadMeta}><span>DEPLOYING ARCHITECTURE</span><span>000—100</span></div>
            </div>
          )}

          {phase === "welcome" && (
            <div className={styles.welcome} role="status">
              <p>BIENVENIDO A LATTICCE AGENCY</p>
            </div>
          )}
        </div>

        <footer className={styles.consoleFooter} aria-hidden="true">
          <span>MX—19.4326</span>
          <span>{phase === "blank" ? "STANDBY" : phase === "prompt" ? "AWAITING_INPUT" : phase === "loading" ? "PROCESSING" : "ACCESS_GRANTED"}</span>
          <span>ESC PARA VOLVER</span>
        </footer>
      </div>
    </section>
  );
}
