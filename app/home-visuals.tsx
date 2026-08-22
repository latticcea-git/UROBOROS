"use client";

import { useEffect, useRef } from "react";
import styles from "./home.module.css";

type ActiveVisualProps = {
  active: boolean;
};

const manifestoParagraphs = [
  <>No creemos en disciplinas aisladas.<br />Creemos en ideas que necesitan distintas formas para existir.</>,
  <>Cada nodo conserva una mirada propia.<br />Juntos construyen una estructura capaz de pensar, producir y evolucionar alrededor de una misma intención.</>,
  <>En el centro está el <em>Luminautta</em>: la expresión de nuestra voluntad creativa.<br />Quien explora lo desconocido, conecta posibilidades y encuentra una forma donde antes solo existía una idea.</>,
  <>Trabajamos cerca de cada cliente para entender su universo antes de intervenirlo.<br />Así, cada disciplina responde a una misma visión, reduciendo fragmentación y construyendo proyectos más coherentes, flexibles y profundos.</>,
  <>Creemos en <em>ver cine en cada detalle y hacer que cada detalle sea cine</em>.<br />No como formato, sino como forma de observar: luz, sonido, diseño, ritmo, espacio y narrativa pueden convertir lo cotidiano en experiencia.</>,
  <>Por eso no buscamos repetir fórmulas.<br />Cada proyecto debe encontrar su propia <em>voz autoral</em>, su lenguaje y su manera única de existir.</>,
  <>Conectamos pensamiento, imagen, sonido, tecnología y experiencia.<br />Exploramos. Interpretamos. Materializamos.</>,
  <>No buscamos producir más de lo mismo.<br />Buscamos descubrir qué puede llegar a ser cada idea cuando todas sus partes comienzan a hablar el mismo lenguaje.</>,
  <strong>Bienvenido a LATTICCE.<br />Comencemos a crear juntos.</strong>,
] as const;

function sizeCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
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

export function BlackSea({ active }: ActiveVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.68, y: 0.48, energy: 0 };
    let frame = 0;
    let lastX = window.innerWidth * pointer.x;
    let lastY = window.innerHeight * pointer.y;
    let lastTime = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const elapsed = Math.max(16, now - lastTime);
      const velocity = Math.hypot(event.clientX - lastX, event.clientY - lastY) / elapsed;
      pointer.x = event.clientX / Math.max(1, window.innerWidth);
      pointer.y = event.clientY / Math.max(1, window.innerHeight);
      pointer.energy = Math.min(1, pointer.energy + velocity * 0.16);
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    const draw = (now: number) => {
      const { width, height } = sizeCanvas(canvas, context);
      const time = reduceMotion ? 0.8 : now * 0.00016;
      pointer.energy *= 0.965;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#020202";
      context.fillRect(0, 0, width, height);

      const atmosphere = context.createRadialGradient(
        width * pointer.x,
        height * pointer.y,
        0,
        width * pointer.x,
        height * pointer.y,
        width * 0.72,
      );
      atmosphere.addColorStop(0, `rgba(78, 82, 82, ${0.045 + pointer.energy * 0.035})`);
      atmosphere.addColorStop(0.38, "rgba(19, 21, 21, .035)");
      atmosphere.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = atmosphere;
      context.fillRect(0, 0, width, height);

      const rows = Math.max(42, Math.round(height / 15));
      const points = Math.max(56, Math.round(width / 22));

      for (let row = 0; row < rows; row += 1) {
        const depth = row / Math.max(1, rows - 1);
        const baseY = height * (0.02 + depth * 1.02);
        const amplitude = height * (0.018 + depth * 0.038);
        const path = new Path2D();

        for (let point = 0; point <= points; point += 1) {
          const nx = point / points;
          const distance = Math.hypot((nx - pointer.x) * 1.15, (depth - pointer.y) * 0.8);
          const influence = Math.max(0, 1 - distance * 2.4);
          const wave =
            Math.sin(nx * 13.5 + depth * 8.2 + time * 6.1) * 0.46 +
            Math.sin(nx * 27.2 - depth * 12.8 - time * 3.7) * 0.23 +
            Math.cos(nx * 7.1 + depth * 19.4 + time * 2.2) * 0.31;
          const wake = Math.sin(distance * 34 - time * 14) * influence * (0.18 + pointer.energy * 0.85);
          const x = nx * width;
          const y = baseY + (wave + wake) * amplitude;
          if (point === 0) path.moveTo(x, y);
          else path.lineTo(x, y);
        }

        const ridge = 0.016 + depth * 0.072 + pointer.energy * 0.018;
        context.strokeStyle = `rgba(203, 207, 205, ${ridge})`;
        context.lineWidth = 0.45 + depth * 1.05;
        context.stroke(path);

        if (row % 3 === 0) {
          context.save();
          context.globalCompositeOperation = "screen";
          context.strokeStyle = `rgba(112, 118, 116, ${0.012 + depth * 0.025})`;
          context.lineWidth = 3 + depth * 7;
          context.shadowColor = "rgba(211, 218, 214, .06)";
          context.shadowBlur = 16;
          context.stroke(path);
          context.restore();
        }
      }

      const shade = context.createLinearGradient(0, 0, width, height);
      shade.addColorStop(0, "rgba(0,0,0,.9)");
      shade.addColorStop(0.4, "rgba(0,0,0,.18)");
      shade.addColorStop(0.72, "rgba(0,0,0,.48)");
      shade.addColorStop(1, "rgba(0,0,0,.92)");
      context.fillStyle = shade;
      context.fillRect(0, 0, width, height);

      if (active && !reduceMotion && document.visibilityState === "visible") {
        frame = window.requestAnimationFrame(draw);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    draw(performance.now());
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [active]);

  return <canvas ref={canvasRef} className={styles.seaCanvas} aria-hidden="true" />;
}

export function LightNucleus({ active }: ActiveVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5, energy: 0 };
    let frame = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastTime = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      const elapsed = Math.max(16, now - lastTime);
      pointer.x = (event.clientX - rect.left) / Math.max(1, rect.width);
      pointer.y = (event.clientY - rect.top) / Math.max(1, rect.height);
      pointer.energy = Math.min(1, pointer.energy + Math.hypot(event.clientX - lastX, event.clientY - lastY) / elapsed * 0.2);
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    const draw = (now: number) => {
      const { width, height } = sizeCanvas(canvas, context);
      const time = reduceMotion ? 1 : now * 0.00042;
      pointer.energy *= 0.95;
      const pulse = 0.96 + Math.sin(time * (3.2 + pointer.energy * 8)) * (0.035 + pointer.energy * 0.065);
      const cx = width * (0.5 + (pointer.x - 0.5) * 0.055);
      const cy = height * (0.5 + (pointer.y - 0.5) * 0.055);
      const radius = Math.min(width, height) * 0.27 * pulse;

      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(cx, cy);
      context.globalCompositeOperation = "screen";

      for (let fiber = 0; fiber < 84; fiber += 1) {
        const phase = fiber * 0.77;
        const tilt = Math.sin(fiber * 1.91) * 0.46;
        const path = new Path2D();
        const segments = 58;

        for (let segment = 0; segment <= segments; segment += 1) {
          const angle = (segment / segments) * Math.PI * 2;
          const distortion =
            Math.sin(angle * 3 + phase + time * (1.1 + pointer.energy * 2.8)) * 0.12 +
            Math.cos(angle * 5 - phase * 0.4 - time * 0.8) * 0.055;
          const r = radius * (0.72 + distortion + fiber / 84 * 0.28);
          const x = Math.cos(angle + phase * 0.018) * r;
          const y = Math.sin(angle) * r * (0.6 + tilt * 0.2);
          if (segment === 0) path.moveTo(x, y);
          else path.lineTo(x, y);
        }
        path.closePath();
        context.strokeStyle = `rgba(220, 226, 223, ${0.038 + (fiber % 9 === 0 ? 0.095 : 0.026) + pointer.energy * 0.045})`;
        context.lineWidth = fiber % 9 === 0 ? 1.1 : 0.45;
        context.stroke(path);
      }

      const core = context.createRadialGradient(0, 0, 0, 0, 0, radius * 1.6);
      core.addColorStop(0, `rgba(245,248,246,${0.24 + pointer.energy * 0.14})`);
      core.addColorStop(0.18, "rgba(177,185,181,.11)");
      core.addColorStop(0.48, "rgba(91,99,96,.03)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = core;
      context.fillRect(-width / 2, -height / 2, width, height);
      context.restore();

      if (active && !reduceMotion && document.visibilityState === "visible") {
        frame = window.requestAnimationFrame(draw);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    draw(performance.now());
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [active]);

  return <canvas ref={canvasRef} className={styles.nucleusCanvas} aria-hidden="true" data-local-interactive="true" />;
}

export function ManifestoLoop({ active }: ActiveVisualProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const previousYRef = useRef(0);
  const idleUntilRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let previousTime = performance.now();

    const tick = (now: number) => {
      const loopHeight = track.scrollHeight / 2;
      if (active && !reduceMotion && now > idleUntilRef.current) {
        offsetRef.current += Math.min(32, now - previousTime) * 0.017;
      }
      if (loopHeight > 0) {
        offsetRef.current = ((offsetRef.current % loopHeight) + loopHeight) % loopHeight;
        track.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
      }
      previousTime = now;
      if (active && document.visibilityState === "visible") frame = window.requestAnimationFrame(tick);
    };

    tick(previousTime);
    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  const shift = (amount: number) => {
    offsetRef.current += amount;
    idleUntilRef.current = performance.now() + 1400;
  };

  return (
    <div
      ref={viewportRef}
      className={styles.manifestoViewport}
      data-manifesto-scroll="true"
      tabIndex={active ? 0 : -1}
      aria-label="Manifiesto LATTICCE. Desplaza para recorrer el texto."
      onWheel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        shift(event.deltaY * 0.52);
      }}
      onPointerDown={(event) => {
        draggingRef.current = true;
        previousYRef.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!draggingRef.current) return;
        shift((previousYRef.current - event.clientY) * 1.05);
        previousYRef.current = event.clientY;
      }}
      onPointerUp={(event) => {
        draggingRef.current = false;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { draggingRef.current = false; }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") { event.preventDefault(); shift(84); }
        if (event.key === "ArrowUp") { event.preventDefault(); shift(-84); }
      }}
    >
      <div ref={trackRef} className={styles.manifestoTrack}>
        {[false, true].map((duplicate) => (
          <div className={styles.manifestoCycle} aria-hidden={duplicate || undefined} key={String(duplicate)}>
            {manifestoParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        ))}
      </div>
      <span className={styles.manifestoHint} aria-hidden="true">Arrastra / desplaza</span>
    </div>
  );
}

export function ClassicalStructure() {
  return (
    <div className={styles.classicalStructure} aria-hidden="true">
      <svg viewBox="0 0 920 920" role="presentation">
        <defs>
          <radialGradient id="temple-light" cx="50%" cy="38%" r="62%">
            <stop offset="0" stopColor="#f4f6f3" stopOpacity=".38" />
            <stop offset=".3" stopColor="#aeb5b2" stopOpacity=".14" />
            <stop offset="1" stopColor="#020202" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="temple-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f1f3ef" stopOpacity=".34" />
            <stop offset=".46" stopColor="#555b59" stopOpacity=".08" />
            <stop offset="1" stopColor="#dfe4e0" stopOpacity=".24" />
          </linearGradient>
          <filter id="temple-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <ellipse cx="460" cy="446" rx="395" ry="390" fill="url(#temple-light)" />
        <g className={styles.templeRear} fill="none" stroke="url(#temple-metal)" strokeWidth="2">
          <path d="M108 711H812L752 760H168Z" />
          <path d="M152 646H768L812 711H108Z" />
          <path d="M182 274H738L781 324H139Z" />
          <path d="M215 270L460 105L705 270Z" />
          <path d="M272 249L460 139L648 249Z" opacity=".48" />
        </g>
        <g className={styles.templeColumns} fill="rgba(160,168,164,.025)" stroke="url(#temple-metal)" strokeWidth="2.2" filter="url(#temple-glow)">
          {[210, 310, 410, 510, 610, 710].map((x, index) => (
            <g key={x} style={{ "--column-delay": `${index * 110}ms` } as React.CSSProperties}>
              <path d={`M${x - 25} 326H${x + 25}L${x + 19} 352H${x - 19}Z`} />
              <path d={`M${x - 17} 352H${x + 17}L${x + 13} 624H${x - 13}Z`} />
              <path d={`M${x - 24} 624H${x + 24}L${x + 31} 646H${x - 31}Z`} />
              <path d={`M${x - 8} 360V617M${x + 1} 360V617M${x + 9} 360V617`} opacity=".45" />
            </g>
          ))}
        </g>
        <g className={styles.templeFront} fill="none" stroke="rgba(238,242,239,.34)" strokeWidth="1.2">
          <path d="M139 324H781" />
          <path d="M152 337H768" opacity=".45" />
          <path d="M108 711H812" />
        </g>
      </svg>
    </div>
  );
}
