"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./agency-intro.module.css";

type AgencyIntroProps = {
  onCancel: () => void;
  onComplete: () => void;
};

type IntroPhase = "prompt" | "loading" | "welcome";

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
  const [phase, setPhase] = useState<IntroPhase>("prompt");
  const phaseRef = useRef<IntroPhase>("prompt");
  const completeRef = useRef(onComplete);
  const cancelRef = useRef(onCancel);

  useEffect(() => {
    completeRef.current = onComplete;
    cancelRef.current = onCancel;
  }, [onCancel, onComplete]);

  useEffect(() => {
    phaseRef.current = phase;
    if (phase === "prompt") return;

    const duration = phase === "loading" ? 7000 : 4000;
    const timer = window.setTimeout(() => {
      if (phase === "loading") setPhase("welcome");
      else completeRef.current();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelRef.current();
        return;
      }

      if (phaseRef.current === "prompt" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        setPhase("loading");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const advance = () => {
    if (phaseRef.current === "prompt") setPhase("loading");
  };

  return (
    <section
      className={styles.terminal}
      data-phase={phase}
      aria-label="Acceso a LATTICCE Agency"
      aria-live="polite"
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.scan} aria-hidden="true" />

      <div className={styles.consolePanel}>
        <header className={styles.consoleHeader} aria-hidden="true">
          <span>AGENCY.OS / GATEWAY</span>
          <span>SESSION 01</span>
        </header>

        <div className={styles.consoleBody}>
          {phase === "prompt" && (
            <button className={styles.prompt} type="button" onClick={advance} autoFocus>
              <strong>¿LISTO PARA CONOCER<br />LATTICCE AGENCY?</strong>
              <span className={styles.inputHint}>PRESIONA <i>ENTER</i> O HAZ CLIC</span>
            </button>
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
              <span>&gt; access_granted</span>
              <strong>BIENVENIDO A<br />LATTICCE AGENCY</strong>
              <p>ENTRANDO AL SISTEMA</p>
            </div>
          )}
        </div>

        <footer className={styles.consoleFooter} aria-hidden="true">
          <span>MX—19.4326</span>
          <span>{phase === "prompt" ? "AWAITING_INPUT" : phase === "loading" ? "PROCESSING" : "ACCESS_GRANTED"}</span>
          <span>ESC PARA VOLVER</span>
        </footer>
      </div>
    </section>
  );
}
