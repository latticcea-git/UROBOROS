"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type AntigravityProps = {
  count?: number;
  color?: string;
  className?: string;
  fieldStrength?: number;
  magnetRadius?: number;
  particleSize?: number;
  ringRadius?: number;
  waveAmplitude?: number;
};

type Particle = {
  t: number;
  speed: number;
  mx: number;
  my: number;
  mz: number;
  cx: number;
  cy: number;
  cz: number;
  radiusOffset: number;
};

function AntigravityField({
  count = 180,
  color = "#f2f1eb",
  fieldStrength = 12,
  magnetRadius = 14,
  particleSize = 1.15,
  ringRadius = 8,
  waveAmplitude = 0.7,
}: Omit<AntigravityProps, "className">) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const elapsedTime = useRef(0);
  const initialized = useRef(false);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<Particle[]>(() => {
    let seed = 731;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    return Array.from({ length: count }, () => {
      const x = random() - 0.5;
      const y = random() - 0.5;
      const z = (random() - 0.5) * 18;
      return {
        t: random() * 100,
        speed: 0.012 + random() / 180,
        mx: x,
        my: y,
        mz: z,
        cx: 0,
        cy: 0,
        cz: z,
        radiusOffset: (random() - 0.5) * 2,
      };
    });
  }, [count]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const frameDelta = Math.min(delta, 1 / 30);
    elapsedTime.current += frameDelta;
    const time = elapsedTime.current;
    const targetX = Math.sin(time * 0.23) * viewport.width * 0.18;
    const targetY = Math.cos(time * 0.31) * viewport.height * 0.12;
    const globalRotation = time * 0.035;

    particles.forEach((particle, index) => {
      particle.t += particle.speed * frameDelta * 30;
      const projection = 1 - particle.cz / 50;
      const projectedX = targetX * projection;
      const projectedY = targetY * projection;
      const baseX = particle.mx * viewport.width;
      const baseY = particle.my * viewport.height;
      const dx = baseX - projectedX;
      const dy = baseY - projectedY;
      const distance = Math.hypot(dx, dy);
      let x = baseX;
      let y = baseY;
      let z = particle.mz * 0.7;

      if (distance < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(particle.t * 0.45 + angle) * waveAmplitude * 0.5;
        const deviation = particle.radiusOffset * (5 / (fieldStrength + 0.1));
        const radius = ringRadius + wave + deviation;
        x = projectedX + radius * Math.cos(angle);
        y = projectedY + radius * Math.sin(angle);
        z = particle.mz * 0.7 + Math.sin(particle.t) * waveAmplitude;
      }

      if (!initialized.current) {
        particle.cx = x;
        particle.cy = y;
        particle.cz = z;
      } else {
        particle.cx += (x - particle.cx) * 0.045;
        particle.cy += (y - particle.cy) * 0.045;
        particle.cz += (z - particle.cz) * 0.045;
      }

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(projectedX, projectedY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const ringDistance = Math.abs(Math.hypot(particle.cx - projectedX, particle.cy - projectedY) - ringRadius);
      const visibility = Math.max(0.08, Math.min(1, 1 - ringDistance / 11));
      const pulse = 0.82 + Math.sin(particle.t * 2.6) * 0.18;
      const scale = visibility * pulse * particleSize;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });

    initialized.current = true;
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <capsuleGeometry args={[0.075, 0.32, 3, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.76} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export default function Antigravity({ className, ...props }: AntigravityProps) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 35 }}
        dpr={[1, 1.2]}
        frameloop={visible ? "always" : "never"}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <AntigravityField {...props} />
      </Canvas>
    </div>
  );
}
