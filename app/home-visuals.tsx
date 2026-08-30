"use client";

import { useEffect, useRef } from "react";
import styles from "./home.module.css";

type ActiveVisualProps = {
  active: boolean;
};

type BlackSeaProps = ActiveVisualProps & {
  presence?: number;
  tempo?: number;
  horizon?: number;
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

export function BlackSea({ active, presence = 0.7, tempo = 1, horizon = 0 }: BlackSeaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactRender = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
    const pointer = { x: 0.68, y: 0.48, energy: 0 };
    let frame = 0;
    let previousDraw = 0;
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
      if (compactRender && !reduceMotion && now - previousDraw < 32) {
        if (active && document.visibilityState === "visible") frame = window.requestAnimationFrame(draw);
        return;
      }
      previousDraw = now;
      const { width, height } = sizeCanvas(canvas, context);
      const time = reduceMotion ? 0.8 : now * 0.00016 * tempo;
      pointer.energy *= 0.965;

      context.clearRect(0, 0, width, height);

      const atmosphere = context.createRadialGradient(
        width * pointer.x,
        height * pointer.y,
        0,
        width * pointer.x,
        height * pointer.y,
        width * 0.72,
      );
      atmosphere.addColorStop(0, `rgba(86, 92, 91, ${(0.075 + pointer.energy * 0.045) * presence})`);
      atmosphere.addColorStop(0.38, `rgba(28, 32, 31, ${0.052 * presence})`);
      atmosphere.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = atmosphere;
      context.fillRect(0, 0, width, height);

      const rows = compactRender ? Math.max(28, Math.round(height / 24)) : Math.max(42, Math.round(height / 15));
      const points = compactRender ? Math.max(38, Math.round(width / 34)) : Math.max(56, Math.round(width / 22));

      for (let row = 0; row < rows; row += 1) {
        const depth = row / Math.max(1, rows - 1);
        const baseY = height * (0.02 + horizon + depth * 1.02);
        const amplitude = height * (0.021 + depth * 0.045) * (0.82 + presence * 0.22);
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

        const ridge = (0.022 + depth * 0.095 + pointer.energy * 0.022) * presence;
        context.strokeStyle = `rgba(203, 207, 205, ${ridge})`;
        context.lineWidth = 0.45 + depth * 1.05;
        context.stroke(path);

        if (row % 3 === 0) {
          context.save();
          context.globalCompositeOperation = "screen";
          context.strokeStyle = `rgba(126, 134, 131, ${(0.016 + depth * 0.036) * presence})`;
          context.lineWidth = 3 + depth * 7;
          context.shadowColor = `rgba(211, 218, 214, ${0.085 * presence})`;
          context.shadowBlur = 16;
          context.stroke(path);
          context.restore();
        }
      }

      const shade = context.createLinearGradient(0, 0, width, height);
      shade.addColorStop(0, `rgba(0,0,0,${0.36 + (1 - presence) * 0.22})`);
      shade.addColorStop(0.4, `rgba(0,0,0,${0.04 + (1 - presence) * 0.08})`);
      shade.addColorStop(0.72, `rgba(0,0,0,${0.16 + (1 - presence) * 0.11})`);
      shade.addColorStop(1, `rgba(0,0,0,${0.48 + (1 - presence) * 0.18})`);
      context.fillStyle = shade;
      context.fillRect(0, 0, width, height);

      if (active && !reduceMotion && document.visibilityState === "visible") {
        frame = window.requestAnimationFrame(draw);
      }
    };

    if (active) window.addEventListener("pointermove", onPointerMove, { passive: true });
    draw(performance.now());
    return () => {
      window.cancelAnimationFrame(frame);
      if (active) window.removeEventListener("pointermove", onPointerMove);
    };
  }, [active, horizon, presence, tempo]);

  return <canvas ref={canvasRef} className={styles.seaCanvas} aria-hidden="true" />;
}

export function LightNucleus({ active }: ActiveVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, energy: 0, inside: false };
    let frame = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastTime = performance.now();
    let previousFrameTime = performance.now();
    let motionTime = 1.4;
    let pulsePhase = 0;
    let smoothEnergy = 0;
    let pointerPresence = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      const elapsed = Math.max(16, now - lastTime);
      const localX = (event.clientX - rect.left) / Math.max(1, rect.width);
      const localY = (event.clientY - rect.top) / Math.max(1, rect.height);
      pointer.inside = localX >= 0 && localX <= 1 && localY >= 0 && localY <= 1;
      pointer.targetX = pointer.inside ? Math.max(0, Math.min(1, localX)) : 0.5;
      pointer.targetY = pointer.inside ? Math.max(0, Math.min(1, localY)) : 0.5;
      const velocity = Math.hypot(event.clientX - lastX, event.clientY - lastY) / elapsed;
      if (pointer.inside) pointer.energy = Math.min(1, pointer.energy + velocity * 0.22);
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    const draw = (now: number) => {
      const { width, height } = sizeCanvas(canvas, context);
      const deltaSeconds = reduceMotion ? 0 : Math.min(0.05, Math.max(0, (now - previousFrameTime) / 1000));
      previousFrameTime = now;
      pointer.energy *= Math.pow(0.958, deltaSeconds * 60);
      smoothEnergy += (pointer.energy - smoothEnergy) * Math.min(1, deltaSeconds * 7);
      pointerPresence += ((pointer.inside ? 1 : 0) - pointerPresence) * Math.min(1, deltaSeconds * 6);
      pointer.x += (pointer.targetX - pointer.x) * Math.min(1, deltaSeconds * 5.2);
      pointer.y += (pointer.targetY - pointer.y) * Math.min(1, deltaSeconds * 5.2);
      motionTime += deltaSeconds * (0.34 + smoothEnergy * 0.12);
      pulsePhase += deltaSeconds * (1.35 + smoothEnergy * 2.15);

      const time = reduceMotion ? 1.4 : motionTime;
      const pulse = 1 + Math.sin(pulsePhase) * (0.018 + smoothEnergy * 0.028);
      const cx = width * (0.5 + (pointer.x - 0.5) * 0.042);
      const cy = height * (0.5 + (pointer.y - 0.5) * 0.042);
      const radius = Math.min(width, height) * 0.335 * pulse;
      const pointerAngle = Math.atan2(pointer.y - 0.5, pointer.x - 0.5);

      const angularDistance = (a: number, b: number) => {
        const delta = Math.atan2(Math.sin(a - b), Math.cos(a - b));
        return Math.abs(delta);
      };

      const membraneRadius = (angle: number, layer = 0) => {
        const breathing =
          Math.sin(angle * 2 + time * 1.6) * 0.044 +
          Math.cos(angle * 3 - time * 1.12) * 0.031 +
          Math.sin(angle * 5 + time * 0.74) * 0.018;
        const agitation = Math.sin(angle * 9 - time * 4.8) * smoothEnergy * 0.016;
        const tug =
          Math.exp(-Math.pow(angularDistance(angle, pointerAngle) / 0.52, 2)) *
          pointerPresence *
          (0.024 + smoothEnergy * 0.06);
        return radius * (1 + breathing + agitation + tug + layer);
      };

      const membranePath = (layer = 0) => {
        const path = new Path2D();
        const segments = 132;
        for (let segment = 0; segment <= segments; segment += 1) {
          const angle = (segment / segments) * Math.PI * 2;
          const r = membraneRadius(angle, layer);
          const x = Math.cos(angle) * r * 1.035;
          const y = Math.sin(angle) * r * 0.94;
          if (segment === 0) path.moveTo(x, y);
          else path.lineTo(x, y);
        }
        path.closePath();
        return path;
      };

      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(cx, cy);
      context.globalCompositeOperation = "screen";

      const halo = context.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius * 1.42);
      halo.addColorStop(0, "rgba(118,130,129,.025)");
      halo.addColorStop(0.72, `rgba(176,194,193,${0.025 + smoothEnergy * 0.02})`);
      halo.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = halo;
      context.fillRect(-width / 2, -height / 2, width, height);

      const body = membranePath();
      context.save();
      context.clip(body);

      const interior = context.createRadialGradient(
        radius * (pointer.x - 0.5) * 0.16,
        radius * (pointer.y - 0.5) * 0.16,
        radius * 0.04,
        0,
        0,
        radius * 1.12,
      );
      interior.addColorStop(0, `rgba(228,235,232,${0.15 + smoothEnergy * 0.06})`);
      interior.addColorStop(0.46, "rgba(69,78,78,.095)");
      interior.addColorStop(0.76, "rgba(24,29,30,.16)");
      interior.addColorStop(1, "rgba(205,215,211,.04)");
      context.fillStyle = interior;
      context.fillRect(-radius * 1.2, -radius * 1.2, radius * 2.4, radius * 2.4);

      for (let fiber = 0; fiber < 54; fiber += 1) {
        const progress = fiber / 53;
        const y = (progress - 0.5) * radius * 1.75;
        const halfWidth = Math.sqrt(Math.max(0, 1 - Math.pow(y / (radius * 0.94), 2))) * radius * 1.02;
        const drift = Math.sin(fiber * 1.73 + time * 1.5) * radius * 0.035;
        const bend = Math.cos(fiber * 0.91 - time * 1.1) * radius * (0.055 + smoothEnergy * 0.032);
        const fiberPath = new Path2D();
        fiberPath.moveTo(-halfWidth, y + drift);
        fiberPath.bezierCurveTo(
          -halfWidth * 0.32,
          y - bend,
          halfWidth * 0.28,
          y + bend + (pointer.y - 0.5) * radius * 0.08,
          halfWidth,
          y - drift,
        );
        context.strokeStyle = `rgba(${fiber % 7 === 0 ? "164,184,190" : "205,214,211"},${0.025 + (fiber % 8 === 0 ? 0.066 : 0.016) + smoothEnergy * 0.016})`;
        context.lineWidth = fiber % 8 === 0 ? 0.9 : 0.42;
        context.stroke(fiberPath);
      }

      for (let ray = 0; ray < 24; ray += 1) {
        const angle = (ray / 24) * Math.PI * 2 + Math.sin(ray * 2.4) * 0.08;
        const rayPath = new Path2D();
        rayPath.moveTo(Math.cos(angle + 0.18) * radius * 0.1, Math.sin(angle + 0.18) * radius * 0.08);
        rayPath.quadraticCurveTo(
          Math.cos(angle + time * 0.3) * radius * 0.44,
          Math.sin(angle - time * 0.2) * radius * 0.38,
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.92,
        );
        context.strokeStyle = `rgba(221,226,223,${0.032 + smoothEnergy * 0.018})`;
        context.lineWidth = 0.42;
        context.stroke(rayPath);
      }
      context.restore();

      for (let rim = 6; rim >= 0; rim -= 1) {
        const rimPath = membranePath((rim - 3) * 0.0024);
        const alpha = 0.034 + (6 - rim) * 0.016 + smoothEnergy * 0.009;
        const color = rim % 3 === 0 ? `158,180,190` : rim % 3 === 1 ? `220,203,178` : `222,229,226`;
        context.strokeStyle = `rgba(${color},${alpha})`;
        context.lineWidth = rim === 0 ? 1.15 : 0.5;
        context.stroke(rimPath);
      }

      context.shadowColor = `rgba(218,229,225,${0.18 + smoothEnergy * 0.09})`;
      context.shadowBlur = 20 + smoothEnergy * 12;
      context.strokeStyle = `rgba(236,240,237,${0.34 + smoothEnergy * 0.09})`;
      context.lineWidth = 0.75;
      context.stroke(body);
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
