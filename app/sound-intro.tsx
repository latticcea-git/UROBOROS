"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./sound-intro.module.css";

type SoundIntroProps = {
  onCancel: () => void;
  onComplete: () => void;
};

type SoundState = "awaiting" | "listening" | "fallback" | "accepted";

type Energy = { level: number; bass: number; pointer: number };
type LegacyAudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };

function resizeCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { width: rect.width, height: rect.height };
}

export default function SoundIntro({ onCancel, onComplete }: SoundIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const energyRef = useRef<Energy>({ level: 0, bass: 0, pointer: 0 });
  const interactedRef = useRef(false);
  const stateRef = useRef<SoundState>("awaiting");
  const listeningStartedAtRef = useRef(0);
  const lastSignalAtRef = useRef(0);
  const accessGrantedRef = useRef(false);
  const accessTimerRef = useRef<number | null>(null);
  const completeRef = useRef(onComplete);
  const cancelRef = useRef(onCancel);
  const grantAccessRef = useRef<() => void>(() => undefined);
  const [state, setState] = useState<SoundState>("awaiting");
  const [heardNothing, setHeardNothing] = useState(false);

  useEffect(() => {
    completeRef.current = onComplete;
    cancelRef.current = onCancel;
  }, [onCancel, onComplete]);

  const complete = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    audioContextRef.current?.close().catch(() => undefined);
    completeRef.current();
  }, []);

  const grantAccess = useCallback(() => {
    if (accessGrantedRef.current) return;
    accessGrantedRef.current = true;
    setHeardNothing(false);
    setState("accepted");
    accessTimerRef.current = window.setTimeout(complete, 1500);
  }, [complete]);

  useEffect(() => {
    stateRef.current = state;
    grantAccessRef.current = grantAccess;
  }, [grantAccess, state]);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      if (!interactedRef.current) {
        setHeardNothing(true);
        setState("fallback");
      }
    }, 8000);
    const autoTimer = window.setTimeout(() => {
      if (!interactedRef.current) complete();
    }, 10000);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelRef.current();
      }
      if (event.key === "Enter" && interactedRef.current) grantAccess();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(autoTimer);
      window.removeEventListener("keydown", onKeyDown);
      if (accessTimerRef.current) window.clearTimeout(accessTimerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      audioContextRef.current?.close().catch(() => undefined);
    };
  }, [complete]);

  useEffect(() => {
    if (state !== "fallback") return;
    const fallbackExitTimer = window.setTimeout(complete, 10000);
    return () => window.clearTimeout(fallbackExitTimer);
  }, [complete, state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let motion = 0;
    let previous = performance.now();
    let smoothLevel = 0;
    let smoothBass = 0;
    let pointerX = .5;
    let pointerY = .52;
    const frequencyData = new Uint8Array(128);

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / Math.max(1, window.innerWidth);
      pointerY = event.clientY / Math.max(1, window.innerHeight);
      energyRef.current.pointer = Math.min(1, energyRef.current.pointer + .24);
    };

    const draw = (now: number) => {
      const { width, height } = resizeCanvas(canvas, context);
      const delta = reduceMotion ? 0 : Math.min(.05, Math.max(0, (now - previous) / 1000));
      previous = now;
      motion += delta;

      const analyser = analyserRef.current;
      if (analyser) {
        analyser.getByteFrequencyData(frequencyData);
        const bass = frequencyData.slice(0, 12).reduce((sum, value) => sum + value, 0) / (12 * 255);
        const level = frequencyData.reduce((sum, value) => sum + value, 0) / (frequencyData.length * 255);
        energyRef.current.level = level;
        energyRef.current.bass = bass;
        if (level > .025) lastSignalAtRef.current = now;
        if (stateRef.current === "listening") {
          const listeningFor = now - listeningStartedAtRef.current;
          const silentFor = now - lastSignalAtRef.current;
          if (listeningFor >= 10000 || silentFor >= 5000) grantAccessRef.current();
        }
      }

      const simulated = .11 + Math.sin(motion * 1.45) * .035 + Math.sin(motion * 3.7) * .014;
      const targetLevel = analyser ? energyRef.current.level : simulated;
      const targetBass = analyser ? energyRef.current.bass : simulated * .85;
      smoothLevel += (targetLevel - smoothLevel) * Math.min(1, delta * 7);
      smoothBass += (targetBass - smoothBass) * Math.min(1, delta * 6);
      energyRef.current.pointer *= Math.pow(.95, delta * 60);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#010102";
      context.fillRect(0, 0, width, height);

      const haze = context.createRadialGradient(width * .5, height * .52, 0, width * .5, height * .52, width * .72);
      haze.addColorStop(0, `rgba(111, 59, 177, ${.07 + smoothLevel * .22})`);
      haze.addColorStop(.48, "rgba(32, 12, 56, .08)");
      haze.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = haze;
      context.fillRect(0, 0, width, height);

      const rows = Math.max(38, Math.round(height / 18));
      const points = Math.max(54, Math.round(width / 24));
      for (let row = 0; row < rows; row += 1) {
        const depth = row / Math.max(1, rows - 1);
        const path = new Path2D();
        const baseY = height * (.34 + depth * .78);
        const amplitude = height * (.008 + depth * .025 + smoothBass * .055);
        for (let point = 0; point <= points; point += 1) {
          const xRatio = point / points;
          const distance = Math.hypot((xRatio - pointerX) * 1.18, (depth - pointerY) * .8);
          const pointerWake = Math.sin(distance * 32 - motion * 6.4) * Math.max(0, 1 - distance * 2.5) * energyRef.current.pointer * .28;
          const wave = Math.sin(xRatio * 13 + depth * 8 + motion * 2.3) * .55 + Math.sin(xRatio * 27 - depth * 13 - motion * 1.3) * .24 + pointerWake;
          const x = xRatio * width;
          const y = baseY + wave * amplitude;
          if (point === 0) path.moveTo(x, y);
          else path.lineTo(x, y);
        }
        context.strokeStyle = `rgba(167, 105, 245, ${.018 + depth * .07 + smoothLevel * .1})`;
        context.lineWidth = .4 + depth * .7;
        context.stroke(path);
      }

      const cx = width * .5;
      const cy = height * .62;
      const radius = Math.min(width, height) * (.102 + smoothBass * .1 + energyRef.current.pointer * .018);
      const halo = context.createRadialGradient(cx, cy, radius * .2, cx, cy, radius * 3.2);
      halo.addColorStop(0, `rgba(196, 139, 255, ${.15 + smoothLevel * .34})`);
      halo.addColorStop(.35, `rgba(119, 65, 195, ${.1 + smoothBass * .22})`);
      halo.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = halo;
      context.beginPath();
      context.arc(cx, cy, radius * 3.2, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.translate(cx, cy);
      for (let ring = 0; ring < 4; ring += 1) {
        context.beginPath();
        const segments = 80;
        for (let segment = 0; segment <= segments; segment += 1) {
          const angle = (segment / segments) * Math.PI * 2;
          const deformation = Math.sin(angle * 5 + motion * 3.6) * radius * (.012 + smoothLevel * .08) + Math.cos(angle * 2 - motion * 2.2) * radius * .018;
          const currentRadius = radius * (1 + ring * .045) + deformation;
          const x = Math.cos(angle) * currentRadius;
          const y = Math.sin(angle) * currentRadius;
          if (segment === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(222, 194, 255, ${.18 - ring * .032 + smoothLevel * .32})`;
        context.lineWidth = 1.1 - ring * .14;
        context.stroke();
      }
      const orb = context.createRadialGradient(-radius * .28, -radius * .34, radius * .04, 0, 0, radius);
      orb.addColorStop(0, "rgba(245,236,255,.95)");
      orb.addColorStop(.16, "rgba(185,126,255,.82)");
      orb.addColorStop(.62, "rgba(58,24,98,.9)");
      orb.addColorStop(1, "rgba(5,2,10,1)");
      context.fillStyle = orb;
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();

      if (!reduceMotion && document.visibilityState === "visible") frame = window.requestAnimationFrame(draw);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    draw(performance.now());
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const requestMicrophone = async () => {
    interactedRef.current = true;
    if (!navigator.mediaDevices?.getUserMedia) {
      setHeardNothing(true);
      setState("fallback");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      const AudioContextClass = window.AudioContext || (window as LegacyAudioWindow).webkitAudioContext;
      if (!AudioContextClass) throw new Error("AudioContext is not supported");
      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      audioContext.createMediaStreamSource(stream).connect(analyser);
      streamRef.current = stream;
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      listeningStartedAtRef.current = performance.now();
      lastSignalAtRef.current = listeningStartedAtRef.current;
      setState("listening");
      setHeardNothing(false);
    } catch {
      setState("fallback");
      setHeardNothing(true);
    }
  };

  const continueWithoutMicrophone = () => {
    interactedRef.current = true;
    setHeardNothing(true);
    setState("fallback");
  };

  return (
    <section className={styles.intro} data-state={state} aria-label="Acceso a LATTICCE Sound">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.copy}>
        <p className={styles.kicker}>LATTICCE SOUND / FREQUENCY GATE</p>
        <p className={styles.prompt}>DI: ACCEDER A LATTICCE SOUND</p>
        {state === "awaiting" && (
          <div className={styles.actions}>
            <button type="button" onClick={requestMicrophone}>ACTIVAR MICRÓFONO</button>
            <button type="button" onClick={continueWithoutMicrophone}>CONTINUAR SIN MICRÓFONO</button>
          </div>
        )}
        {state === "listening" && <p className={styles.status}>TE ESCUCHO · SIGUE A TU RITMO</p>}
        {heardNothing && <p className={styles.status}>NO TE ESCUCHO · PRESIONA ENTER PARA ACCEDER</p>}
        {state === "accepted" && <p className={styles.status}>ACCESO ACEPTADO</p>}
      </div>
      <p className={styles.escape}>ESC PARA VOLVER</p>
    </section>
  );
}
