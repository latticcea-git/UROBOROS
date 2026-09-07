"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { openContactPopup } from "../global-shell";
import filmsLogo from "../../LOGO X NODOS/FILMS/svg/LTT_LOGO_POS_FILMS.svg";
import styles from "./films.module.css";
import SigueLaLuzCanvas from "./sigue-la-luz-canvas";
import {
  cinematicCopy,
  cinematicFrames,
  FILMS_EXPERIENCE_VERSION,
  reducedMotionFrameIds,
  withFilmsBasePath,
} from "./sigue-la-luz-data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;
  uniform float uAspect;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotation = mat2(0.80, -0.60, 0.60, 0.80);
    for (int octave = 0; octave < 4; octave++) {
      value += amplitude * noise(p);
      p = rotation * p * 2.03 + 17.13;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uAspect;

    float progress = clamp(uProgress, 0.0, 1.0);
    float field = fbm(p * 3.1 + vec2(progress * 0.22, -progress * 0.15));
    float fineField = fbm(p * 8.4 - vec2(progress * 0.16, progress * 0.11));

    float particleCellSize = 42.0;
    vec2 particleCell = floor(gl_FragCoord.xy / particleCellSize);
    vec2 particleLocal = mod(gl_FragCoord.xy, particleCellSize) - particleCellSize * 0.5;
    float particleSeed = hash(particleCell + 31.7);
    vec2 particleOffset = (vec2(hash(particleCell + 7.1), hash(particleCell + 19.3)) - 0.5) * particleCellSize * 0.62;
    vec2 particleDrift = vec2(sin(particleSeed * 31.0 + progress * 3.4), cos(particleSeed * 23.0 - progress * 2.8)) * progress * 3.2;
    float particleRadius = mix(0.9, 2.1, hash(particleCell + 47.8));
    float particleShape = 1.0 - smoothstep(particleRadius, particleRadius + 1.7, length(particleLocal - particleOffset - particleDrift));
    float particlePresence = step(0.92, particleSeed);
    float particleLife = smoothstep(0.012, 0.105, progress) * (1.0 - smoothstep(0.72, 0.90, progress));
    float particles = particleShape * particlePresence * particleLife * mix(0.16, 0.52, particleSeed);

    float viewportRadius = length(vec2(uAspect * 0.55, 0.55));
    float idlePulse = 0.78 + sin(uTime * 1.85) * 0.13 + sin(uTime * 0.73 + 1.2) * 0.09;
    float lightBirth = mix(0.13, 1.0, smoothstep(0.018, 0.095, progress));
    float lightExit = 1.0 - smoothstep(0.64, 0.72, progress);
    float pulse = idlePulse + smoothstep(0.018, 0.095, progress) * (0.22 + sin(uTime * 2.15) * 0.08);
    float corePoint = exp(-dot(p, p) * 2600.0) * lightBirth * lightExit * pulse;
    float coreBloom = exp(-dot(p * vec2(0.72, 1.18), p * vec2(0.72, 1.18)) * 58.0) * lightBirth * lightExit * 0.11;

    float flashRise = smoothstep(0.42, 0.575, progress);
    flashRise *= flashRise;
    float flashFall = smoothstep(0.575, 0.68, progress);
    float flashRadius = mix(0.018, viewportRadius * 1.60, flashRise);
    flashRadius = mix(flashRadius, 0.026, flashFall);
    float flashDistance = dot(p, p) / max(flashRadius * flashRadius, 0.00001);
    float flashEnvelope = smoothstep(0.40, 0.44, progress) * (1.0 - smoothstep(0.67, 0.70, progress));
    float flashRadial = exp(-flashDistance * 1.15) * flashEnvelope;
    float flashPeak = smoothstep(0.535, 0.575, progress) * (1.0 - smoothstep(0.575, 0.625, progress));
    float flashWash = exp(-dot(p, p) / max(viewportRadius * viewportRadius * 3.2, 0.001)) * flashPeak * 1.35;
    float flashField = flashRadial * mix(0.20, 2.10, flashRise) * mix(1.0, 0.74, flashFall) + flashWash;
    float flashCover = clamp(flashPeak + flashRise * (1.0 - flashFall) * 0.48, 0.0, 1.0);

    float haloField = 0.0;
    float membraneField = 0.0;
    float haloToMembrane = smoothstep(0.60, 0.82, progress);

    for (int index = 0; index < 7; index++) {
      float haloIndex = float(index);
      float haloSeed = hash(vec2(haloIndex + 2.7, haloIndex * 3.9 + 11.0));
      float haloStart = 0.065 + haloIndex * 0.027;
      float haloGrowth = smoothstep(haloStart, haloStart + 0.31, progress);
      float haloPresence = smoothstep(haloStart, haloStart + 0.055, progress);
      float angle = haloSeed * 6.2831853 + haloIndex * 1.73;
      vec2 haloOrigin = vec2(cos(angle), sin(angle)) * mix(0.008, 0.038, haloSeed);
      vec2 membraneOrigin = vec2(0.0, (haloIndex - 3.0) * 0.024);
      vec2 haloCenter = mix(haloOrigin, membraneOrigin, haloToMembrane);
      float expandedRadius = viewportRadius * mix(0.92, 1.24, haloSeed);
      float openRadius = mix(0.014 + haloSeed * 0.008, expandedRadius, haloGrowth);
      float membraneRadius = uAspect * 0.21 + haloIndex * 0.018;
      float currentRadius = mix(openRadius, membraneRadius, haloToMembrane);
      vec2 currentScale = mix(vec2(1.0), vec2(0.30, 7.2 + haloSeed * 1.8), haloToMembrane);
      vec2 haloPoint = (p - haloCenter) * currentScale;
      float haloDistortion = (field - 0.5) * mix(0.018, 0.004, haloToMembrane);
      float distanceToHalo = abs(length(haloPoint) - currentRadius + haloDistortion);
      float haloCore = exp(-distanceToHalo * mix(220.0, 132.0, haloToMembrane));
      float haloGlow = exp(-distanceToHalo * mix(38.0, 25.0, haloToMembrane));
      float haloEnergy = (haloCore * 0.72 + haloGlow * 0.13) * haloPresence;
      haloField += haloEnergy;
      membraneField += (haloCore * 0.82 + haloGlow * 0.08) * haloPresence * haloToMembrane;
    }

    float weaveArrival = smoothstep(0.59, 0.74, progress);
    float weaveContact = smoothstep(0.67, 0.82, progress);
    float weaveAbsorption = 1.0 - smoothstep(0.82, 0.96, progress);
    float bottomGate = smoothstep(0.69, 0.715, progress);
    float bottomArrival = smoothstep(0.69, 0.84, progress);
    float topBoundary = mix(0.55, -0.16, weaveArrival);
    float bottomBoundary = mix(-0.56, 0.15, bottomArrival);
    float topReveal = smoothstep(topBoundary - 0.06, topBoundary + 0.02, p.y);
    float bottomReveal = (1.0 - smoothstep(bottomBoundary - 0.02, bottomBoundary + 0.06, p.y)) * bottomGate;
    float weaveWarpA = (field - 0.5) * mix(0.025, 0.065, weaveContact) + sin(p.x * 4.8 + progress * 9.0) * mix(0.004, 0.026, weaveContact);
    float weaveWarpB = (fineField - 0.5) * mix(0.020, 0.055, weaveContact) + sin(p.x * 6.1 - progress * 7.0 + 1.8) * mix(0.004, 0.023, weaveContact);
    float weaveCoordinateA = p.y + p.x * mix(0.006, 0.055, weaveContact) + weaveWarpA;
    float weaveCoordinateB = p.y - p.x * mix(0.005, 0.048, weaveContact) + weaveWarpB;
    float weaveDistanceA = abs(sin(weaveCoordinateA * 54.0 + progress * 1.8));
    float weaveDistanceB = abs(sin(weaveCoordinateB * 61.0 - progress * 1.5));
    float weaveA = exp(-weaveDistanceA * 19.0) + exp(-weaveDistanceA * 4.8) * 0.075;
    float weaveB = exp(-weaveDistanceB * 18.0) + exp(-weaveDistanceB * 4.4) * 0.070;
    float weaveGate = smoothstep(0.585, 0.615, progress) * weaveAbsorption;
    float weaveField = (weaveA * topReveal + weaveB * bottomReveal) * weaveGate;

    float companionUpperArrival = smoothstep(0.59, 0.76, progress);
    float companionLowerArrival = smoothstep(0.69, 0.82, progress);
    float companionTopFront = mix(0.54, -0.04, companionUpperArrival);
    float companionBottomFront = mix(-0.54, 0.04, companionLowerArrival);
    float companionTopMask = smoothstep(companionTopFront - 0.055, companionTopFront + 0.012, p.y);
    float companionBottomMask = (1.0 - smoothstep(companionBottomFront - 0.012, companionBottomFront + 0.055, p.y)) * bottomGate;
    float companionWarp = sin(p.x * 3.15 + progress * 4.2 + 1.1) * 0.0035;
    float companionMetric = length(vec2(p.x * 0.30, (p.y + companionWarp) * 7.8));
    float companionDistance = abs(sin(companionMetric * 5.65 + 2.37));
    float companionCore = exp(-companionDistance * 10.5);
    float companionGlow = exp(-companionDistance * 3.2) * 0.065;
    float companionReveal = clamp(companionTopMask + companionBottomMask, 0.0, 1.0);
    float companionField = (companionCore + companionGlow) * companionReveal * weaveAbsorption;

    float freeMatter = 1.0 - smoothstep(0.82, 0.96, progress);
    haloField *= freeMatter;
    membraneField *= freeMatter;

    float intensity = particles;
    intensity += corePoint * 1.55 + coreBloom;
    intensity += flashField;
    intensity += haloField * 0.62;
    intensity += membraneField * 0.24;
    intensity += weaveField * 0.48;
    intensity += companionField * 0.24;

    vec3 coldWhite = vec3(0.91, 0.94, 0.92);
    vec3 warmWhite = vec3(1.0, 0.975, 0.91);
    vec3 color = mix(coldWhite, warmWhite, smoothstep(0.55, 1.25, intensity));
    color *= intensity;

    float vignette = 1.0 - smoothstep(0.20, 1.02, length((vUv - 0.5) * vec2(0.78, 1.25)));
    color *= mix(vignette, 1.0, flashCover);
    gl_FragColor = vec4(color, 1.0);
  }
`;

type ProgressRef = MutableRefObject<{ value: number }>;

function MaterialField({ progress }: { progress: ProgressRef }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, invalidate } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uAspect: { value: 1 },
  }), []);

  useEffect(() => {
    let timer = 0;
    const pulse = () => {
      if (progress.current.value < 0.36) invalidate();
      timer = window.setTimeout(pulse, 80);
    };
    pulse();
    return () => window.clearTimeout(timer);
  }, [invalidate, progress]);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uProgress.value = Math.min(1, progress.current.value / 0.36);
    material.uniforms.uAspect.value = size.width / Math.max(size.height, 1);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} depthWrite={false} depthTest={false} />
    </mesh>
  );
}

function TechnicalCanvas({ progress }: { progress: ProgressRef }) {
  return (
    <Canvas
      orthographic
      frameloop="demand"
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[0.75, 1]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
      fallback={null}
    >
      <MaterialField progress={progress} />
    </Canvas>
  );
}

export default function FilmsExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const masterProgress = useRef({ value: 0 });
  const cinematicProgress = useRef({ value: 0 });
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forceReducedPreview = new URLSearchParams(window.location.search).get("motion") === "reduced";
    const update = () => setReducedMotion(forceReducedPreview || media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || reducedMotion === null || reducedMotion) return;

    const logo = root.querySelector<HTMLElement>("[data-films-logo]");
    const logoWhiteout = root.querySelector<HTMLElement>("[data-logo-whiteout]");
    const vignette = root.querySelector<HTMLElement>("[data-vignette]");
    const introField = root.querySelector<HTMLElement>("[data-intro-field]");
    const cinematic = root.querySelector<HTMLElement>("[data-cinematic]");
    const introMarker = root.querySelector<HTMLElement>("[data-marker-intro]");
    const existsWord = root.querySelector<HTMLElement>("[data-will-word='exists']");
    const insistsWord = root.querySelector<HTMLElement>("[data-will-word='insists']");
    const narrativeLines = Array.from(root.querySelectorAll<HTMLElement>("[data-cinematic-line]"));
    const cinematicBrand = root.querySelector<HTMLElement>("[data-cinematic-brand]");
    const lightWord = root.querySelector<HTMLElement>("[data-light-word]");
    const scrollPrompt = root.querySelector<HTMLElement>("[data-scroll-prompt]");
    const finalActions = root.querySelector<HTMLElement>("[data-final-actions]");

    const INTRO_END = 0.36;
    const CINEMATIC_START = 0.49;
    const CINEMATIC_END = 0.96;
    const clampUnit = (value: number) => Math.min(1, Math.max(0, value));
    const smoothstep = (start: number, end: number, value: number) => {
      const normalized = clampUnit((value - start) / Math.max(end - start, 0.0001));
      return normalized * normalized * (3 - 2 * normalized);
    };
    const syncNarrative = (masterValue: number) => {
      const cinematicValue = clampUnit(
        (masterValue - CINEMATIC_START) / (CINEMATIC_END - CINEMATIC_START),
      );

      // The official lockup enters with the first cinematic sentence, before
      // the second scroll gesture, and remains framed above the architecture.
      const brandAlpha = smoothstep(0.032, 0.056, cinematicValue)
        * (1 - smoothstep(0.845, 0.895, cinematicValue));
      if (cinematicBrand) {
        cinematicBrand.style.visibility = brandAlpha > 0.001 ? "visible" : "hidden";
        cinematicBrand.style.opacity = (brandAlpha * 0.9).toFixed(4);
        cinematicBrand.style.transform = `translate(-50%, ${(-0.7 + brandAlpha * 0.7).toFixed(3)}rem) scale(${(0.985 + brandAlpha * 0.015).toFixed(4)})`;
      }

      const scrollPromptAlpha = smoothstep(0.012, 0.035, cinematicValue)
        * (1 - smoothstep(0.925, 0.955, cinematicValue));
      if (scrollPrompt) {
        scrollPrompt.style.visibility = scrollPromptAlpha > 0.001 ? "visible" : "hidden";
        scrollPrompt.style.opacity = scrollPromptAlpha.toFixed(4);
        scrollPrompt.style.transform = `translate(-50%, ${((1 - scrollPromptAlpha) * 0.55).toFixed(3)}rem)`;
      }

      narrativeLines.forEach((line) => {
        const start = Number(line.dataset.start ?? 0);
        const end = Number(line.dataset.end ?? 0);
        const fade = Math.min(0.022, Math.max((end - start) * 0.24, 0.012));
        let alpha = smoothstep(start, start + fade, cinematicValue)
          * (1 - smoothstep(end - fade, end, cinematicValue));
        if (line.dataset.cinematicLine === "see") {
          alpha *= 1 - smoothstep(0.968, 0.981, masterValue);
        }
        line.style.visibility = alpha > 0.001 ? "visible" : "hidden";
        line.style.opacity = alpha.toFixed(4);
        line.style.transform = `translateY(${((1 - alpha) * 0.55).toFixed(3)}rem)`;
      });

      // The word starts only after the photographic timeline has reached full
      // white, so it never crosses the silhouette of the character.
      const lightProgress = smoothstep(0.972, 0.989, masterValue);
      const finalGlow = smoothstep(0.985, 0.997, masterValue);
      if (lightWord) {
        const gray = Math.round(194 + (48 - 194) * lightProgress);
        lightWord.style.visibility = lightProgress > 0.001 ? "visible" : "hidden";
        lightWord.style.opacity = lightProgress.toFixed(4);
        lightWord.style.color = `rgb(${gray} ${gray} ${gray})`;
        lightWord.style.transform = `translate(-50%, -50%) scale(${(0.78 + lightProgress * 0.22).toFixed(4)})`;
        lightWord.style.textShadow = `0 0 ${(0.6 + finalGlow * 3.4).toFixed(2)}rem rgba(255,255,255,${(0.08 + finalGlow * 0.72).toFixed(3)})`;
      }

      const ctaProgress = smoothstep(0.989, 0.998, masterValue);
      if (finalActions) {
        finalActions.style.visibility = ctaProgress > 0.001 ? "visible" : "hidden";
        finalActions.style.opacity = ctaProgress.toFixed(4);
        finalActions.style.transform = `translate(-50%, ${((1 - ctaProgress) * 1.1).toFixed(3)}rem)`;
        finalActions.style.pointerEvents = ctaProgress > 0.94 ? "auto" : "none";
      }
    };
    masterProgress.current.value = 0;
    cinematicProgress.current.value = 0;
    gsap.set(existsWord, { autoAlpha: 1, filter: "blur(0px)" });
    gsap.set(insistsWord, { autoAlpha: 0, filter: "blur(6px)" });
    gsap.set(logo, {
      autoAlpha: 0,
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      transformOrigin: "38.318% 37.247%",
      "--logo-oval-rx": "5%",
      "--logo-oval-ry": "48%",
      "--logo-line-fill": "7%",
      filter: "blur(11px) brightness(1.15) drop-shadow(0 0 1px rgba(255,255,255,.10)) drop-shadow(0 0 8px rgba(255,255,255,.05)) drop-shadow(0 0 36px rgba(255,255,255,0)) drop-shadow(0 0 90px rgba(255,255,255,0))",
    });
    gsap.set(logoWhiteout, {
      autoAlpha: 0,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      filter: "blur(24px)",
    });
    gsap.set(cinematic, { autoAlpha: 0 });
    gsap.set("[data-final-white]", { autoAlpha: 0 });
    syncNarrative(0);

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.72,
        invalidateOnRefresh: true,
      },
    });
    const cinematicDriver = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Keep the approved opening on its original softened timeline. The
        // photographic proof follows the physical scroll directly so it
        // cannot lag behind and catch up in visible jumps.
        cinematicProgress.current.value = self.progress;
        syncNarrative(self.progress);
      },
      onRefresh: (self) => {
        cinematicProgress.current.value = self.progress;
        syncNarrative(self.progress);
      },
    });
    master.to(masterProgress.current, {
      value: 1,
      duration: 1,
      ease: "none",
      onUpdate: () => {
        root.dataset.masterProgress = masterProgress.current.value.toFixed(4);
      },
    }, 0);

    const intro = gsap.timeline();
    intro.fromTo("[data-progress-fill]", { scaleY: 0.04 }, { scaleY: 0.42, duration: 1, ease: "none" }, 0);
    intro.fromTo("[data-stage-label='will']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.025, ease: "sine.out" }, 0.07);
    intro.to(existsWord, { autoAlpha: 0, filter: "blur(6px)", duration: 0.03, ease: "sine.in" }, 0.115);
    intro.to(insistsWord, { autoAlpha: 1, filter: "blur(0px)", duration: 0.035, ease: "sine.out" }, 0.115);
    intro.to("[data-stage-label='will']", { autoAlpha: 0, duration: 0.035, ease: "sine.in" }, 0.255);
    intro.fromTo("[data-stage-label='utter']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04, ease: "sine.out" }, 0.28);
    intro.to("[data-stage-label='utter']", { autoAlpha: 0, duration: 0.035, ease: "sine.in" }, 0.415);
    intro.fromTo("[data-stage-label='weight']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.035, ease: "sine.out" }, 0.485);
    intro.to("[data-stage-label='weight']", { autoAlpha: 0, duration: 0.035, ease: "sine.in" }, 0.55);
    intro.fromTo("[data-stage-label='connections']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.035, ease: "sine.out" }, 0.655);
    intro.to("[data-stage-label='connections']", { autoAlpha: 0, duration: 0.03, ease: "sine.in" }, 0.735);
    intro.fromTo("[data-stage-label='form']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.035, ease: "sine.out" }, 0.755);
    intro.to("[data-stage-label='form']", { autoAlpha: 0, duration: 0.04, ease: "sine.in" }, 0.89);
    intro.to(vignette, { autoAlpha: 0, duration: 0.045, ease: "sine.inOut" }, 0.53);
    intro.to(vignette, { autoAlpha: 1, duration: 0.08, ease: "sine.inOut" }, 0.60);
    intro.to(logo, {
      autoAlpha: 0.14,
      "--logo-side-clip": "38%",
      "--logo-line-fill": "14%",
      filter: "blur(11px) brightness(1.35) drop-shadow(0 0 1px rgba(255,255,255,.28)) drop-shadow(0 0 7px rgba(255,255,255,.12)) drop-shadow(0 0 20px rgba(255,255,255,.06))",
      duration: 0.08,
      ease: "none",
    }, 0.76);
    intro.to(logo, {
      autoAlpha: 0.50,
      "--logo-side-clip": "14%",
      "--logo-line-fill": "42%",
      filter: "blur(7px) brightness(1.65) drop-shadow(0 0 1px rgba(255,255,255,.48)) drop-shadow(0 0 8px rgba(255,255,255,.25)) drop-shadow(0 0 24px rgba(255,255,255,.12))",
      duration: 0.07,
      ease: "sine.inOut",
    }, 0.84);
    intro.to(logo, {
      autoAlpha: 1,
      "--logo-side-clip": "0%",
      "--logo-line-fill": "100%",
      filter: "blur(4px) brightness(2.15) drop-shadow(0 0 2px rgba(255,255,255,.68)) drop-shadow(0 0 10px rgba(255,255,255,.42)) drop-shadow(0 0 28px rgba(255,255,255,.22))",
      duration: 0.03,
      ease: "sine.inOut",
    }, 0.91);
    intro.to(logo, {
      filter: "blur(2.2px) brightness(3.2) drop-shadow(0 0 2px rgba(255,255,255,.95)) drop-shadow(0 0 12px rgba(255,255,255,.72)) drop-shadow(0 0 34px rgba(255,255,255,.38))",
      duration: 0.06,
      ease: "sine.inOut",
    }, 0.94);
    intro.fromTo("[data-final-copy]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04, ease: "sine.out" }, 0.945);
    intro.to("[data-scroll-cue]", { autoAlpha: 0, duration: 0.08 }, 0.12);
    intro.duration(INTRO_END);
    master.add(intro, 0);

    const TT_BOUNDS = {
      centerX: 0.38318185,
      centerY: 0.37247302,
      width: 0.24120562,
      height: 0.65054817,
    };
    const FRAME_THREE_TT = { x: 546, y: 190, width: 572, height: 399 };
    const getLogoMatch = () => {
      if (!logo) return { x: 0, y: 0, scale: 1 };
      const stage = { width: window.innerWidth, height: window.innerHeight };
      const logoWidth = window.matchMedia("(max-width: 700px)").matches
        ? Math.min(stage.width * 0.84, 544)
        : Math.min(stage.width * 0.72, 1216);
      const logoHeight = logoWidth * (5449 / 21092);
      const cover = Math.max(stage.width / 1672, stage.height / 941);
      const imageX = (stage.width - 1672 * cover) / 2;
      const imageY = (stage.height - 941 * cover) / 2;
      const targetCenterX = imageX + (FRAME_THREE_TT.x + FRAME_THREE_TT.width / 2) * cover;
      const targetCenterY = imageY + (FRAME_THREE_TT.y + FRAME_THREE_TT.height / 2) * cover;
      const logoCenterX = stage.width / 2 + (TT_BOUNDS.centerX - 0.5) * logoWidth;
      const logoCenterY = stage.height / 2 + (TT_BOUNDS.centerY - 0.5) * logoHeight;
      const widthScale = FRAME_THREE_TT.width * cover / (logoWidth * TT_BOUNDS.width);
      const heightScale = FRAME_THREE_TT.height * cover / (logoHeight * TT_BOUNDS.height);
      const scale = Math.sqrt(widthScale * heightScale);
      root.dataset.logoMatchScale = scale.toFixed(4);
      root.dataset.logoMatchCenter = `${targetCenterX.toFixed(2)},${targetCenterY.toFixed(2)}`;
      root.dataset.logoMatchSizeDelta = `${(Math.abs(widthScale - heightScale) / scale * 100).toFixed(2)}%`;
      return {
        x: targetCenterX - logoCenterX,
        y: targetCenterY - logoCenterY,
        scale,
      };
    };

    master.to("[data-final-copy]", { autoAlpha: 0, duration: 0.018, ease: "sine.in" }, 0.36);
    master.to(introMarker, { autoAlpha: 0, duration: 0.018, ease: "sine.in" }, 0.36);
    master.to("[data-progress-rail]", { autoAlpha: 0, duration: 0.018, ease: "sine.in" }, 0.36);
    master.to(logo, {
      x: () => getLogoMatch().x * 0.45,
      y: () => getLogoMatch().y * 0.45,
      scale: () => 1 + (getLogoMatch().scale - 1) * 0.52,
      filter: "blur(2.8px) brightness(3.35) drop-shadow(0 0 3px rgba(255,255,255,.95)) drop-shadow(0 0 18px rgba(255,255,255,.68)) drop-shadow(0 0 42px rgba(255,255,255,.34))",
      duration: 0.035,
      ease: "none",
    }, 0.36);
    master.to(logo, {
      x: () => getLogoMatch().x,
      y: () => getLogoMatch().y,
      scale: () => getLogoMatch().scale,
      filter: "blur(4px) brightness(3.9) drop-shadow(0 0 5px rgba(255,255,255,1)) drop-shadow(0 0 28px rgba(255,255,255,.82)) drop-shadow(0 0 72px rgba(255,255,255,.52))",
      duration: 0.045,
      ease: "none",
    }, 0.395);
    master.to(logoWhiteout, { autoAlpha: 0.96, scale: 2.25, duration: 0.035, ease: "power2.in" }, 0.44);
    master.to(cinematic, { autoAlpha: 1, duration: 0.033, ease: "sine.inOut" }, 0.455);
    master.to(logo, { autoAlpha: 0, duration: 0.022, ease: "sine.in" }, 0.468);
    master.to(introField, { autoAlpha: 0, duration: 0.03, ease: "sine.in" }, 0.47);
    master.to(logoWhiteout, { autoAlpha: 0, scale: 3, duration: 0.025, ease: "sine.out" }, 0.48);
    master.to({}, { duration: 1 }, 0);

    return () => {
      cinematicDriver.kill();
      master.kill();
    };
  }, { scope: rootRef, dependencies: [reducedMotion], revertOnUpdate: true });

  if (reducedMotion === null) {
    return <main className={styles.loadingRoot} aria-label="Cargando LATTICCE FILMS" />;
  }

  if (reducedMotion) {
    const reducedFrames = cinematicFrames.filter((item) => reducedMotionFrameIds.includes(item.id as (typeof reducedMotionFrameIds)[number]));
    return (
      <main className={styles.reducedRoot} data-films-version={FILMS_EXPERIENCE_VERSION}>
        <section className={styles.reducedIntro} aria-label="LATTICCE FILMS">
          <Image src={filmsLogo} priority alt="LATTICCE FILMS" />
        </section>
        {reducedFrames.map((frame) => (
          <figure className={styles.reducedFrame} key={frame.id}>
            <Image
              src={withFilmsBasePath(frame.desktopFallback)}
              width={1672}
              height={941}
              alt=""
            />
          </figure>
        ))}
        <section className={styles.reducedInvitation} aria-label="Fin de la secuencia">
          <strong>luz</strong>
          <div className={styles.reducedActions}>
            <button type="button" onClick={() => openContactPopup("films")}>Cuéntanos tu proyecto <span aria-hidden="true">↗</span></button>
            <Link href="/films/cinema">VER <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      ref={rootRef}
      className={styles.root}
      data-films-experience
      data-films-version={FILMS_EXPERIENCE_VERSION}
    >
      <div className={styles.stickyStage}>
        <div className={styles.introField} data-intro-field>
          <div className={styles.fallbackGlow} aria-hidden="true" />
          <div className={styles.canvas}><TechnicalCanvas progress={masterProgress} /></div>
          <div className={styles.vignette} data-vignette aria-hidden="true" />
        </div>

        <div className={styles.cinematic} data-cinematic>
          <SigueLaLuzCanvas progress={cinematicProgress} reducedMotion={false} />
        </div>

        <div className={styles.identity} data-films-logo>
          <Image src={filmsLogo} priority alt="LATTICCE FILMS" />
        </div>
        <div className={styles.cinematicBrand} data-cinematic-brand aria-hidden="true">
          <Image src={filmsLogo} priority alt="" />
        </div>
        <div className={styles.logoWhiteout} data-logo-whiteout aria-hidden="true" />
        <div className={styles.finalWhite} data-final-white aria-hidden="true" />

        <p className={styles.marker} data-marker-intro>LATTICCE FILMS / 01</p>
        <p className={styles.stageLabel} data-stage-label="will">
          <span>Una voluntad </span>
          <span className={styles.wordSwap}>
            <span data-will-word="exists">existe</span>
            <span data-will-word="insists">insiste</span>
          </span>
          <span>.</span>
        </p>
        <p className={styles.stageLabel} data-stage-label="utter">Algo se quiere decir.</p>
        <p className={styles.stageLabel} data-stage-label="weight">La luz adquiere peso.</p>
        <p className={styles.stageLabel} data-stage-label="connections">La materia busca conexiones.</p>
        <p className={styles.stageLabel} data-stage-label="form">Encuentra forma.</p>
        <p className={styles.finalCopy} data-final-copy>EL PROCESO ES LA OBRA.</p>

        <div className={styles.cinematicCopy} aria-live="polite">
          {cinematicCopy.map((line) => (
            <p
              key={line.id}
              data-cinematic-line={line.id}
              data-start={line.start}
              data-end={line.end}
            >
              <span>{line.text}</span>
            </p>
          ))}
        </div>
        <strong className={styles.lightWord} data-light-word>luz</strong>
        <div className={styles.finalActions} data-final-actions>
          <button
            className={styles.finalAction}
            type="button"
            onClick={() => openContactPopup("films")}
          >
            Cuéntanos tu proyecto <span aria-hidden="true">↗</span>
          </button>
          <Link className={`${styles.finalAction} ${styles.cinemaCta}`} href="/films/cinema">
            VER <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.scrollPrompt} data-scroll-prompt aria-hidden="true">
          <span>Sigue deslizando</span>
        </div>

        <div className={styles.srNarrative}>
          <h1>LATTICCE FILMS — Sigue la luz</h1>
        </div>

        <div className={styles.scrollCue} data-scroll-cue>
          <span>Desplaza para dar forma</span>
          <i aria-hidden="true" />
        </div>
        <div className={styles.progressRail} data-progress-rail aria-hidden="true"><i data-progress-fill /></div>
      </div>
    </main>
  );
}
