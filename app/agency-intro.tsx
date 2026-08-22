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
    const duration = phase === "prompt" ? 6000 : phase === "loading" ? 5000 : 4000;
    const timer = window.setTimeout(() => {
      if (phase === "prompt") setPhase("loading");
      else if (phase === "loading") setPhase("welcome");
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
      <div className={styles.technicalFrame} aria-hidden="true">
        <span>SYS_ERR / 01</span>
        <span>AGENCY_GATE</span>
        <span>MX—19.4326</span>
        <span>ESC / RETURN</span>
      </div>

      {phase === "prompt" && (
        <button className={styles.prompt} type="button" onClick={advance} autoFocus>
          <span className={styles.alertCode}>UNEXPECTED CREATIVE SYSTEM DETECTED</span>
          <strong><span>¿LISTO PARA CONOCER</span><br />LATTICCE AGENCY?</strong>
          <span className={styles.clickHint}>CLICK / ENTER / ESPACIO PARA CONTINUAR</span>
          <i aria-hidden="true" />
        </button>
      )}

      {phase === "loading" && (
        <div className={styles.loading} role="status">
          <div className={styles.codeHeader}>
            <span>DEPLOY_SEQUENCE</span>
            <span>AGENCY.OS</span>
          </div>
          <div className={styles.codeLines}>
            {diagnosticLines.map((line, index) => (
              <p key={line} style={{ "--line-index": index } as React.CSSProperties}>{line}</p>
            ))}
          </div>
          <div className={styles.progress} aria-label="Cargando LATTICCE Agency">
            <i />
          </div>
          <div className={styles.loadMeta}><span>LOADING ARCHITECTURE</span><span>000—100</span></div>
        </div>
      )}

      {phase === "welcome" && (
        <div className={styles.welcome} role="status">
          <span>ACCESS GRANTED</span>
          <strong>BIENVENIDO A<br />LATTICCE AGENCY</strong>
          <i aria-hidden="true" />
          <p>ENTRANDO AL SISTEMA</p>
        </div>
      )}

      <span className={styles.escapeHint}>ESC PARA VOLVER</span>
    </section>
  );
}
