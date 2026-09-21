"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { BookProject } from "./book-data";

type ProjectMediaProps = {
  project: BookProject;
  sizes: string;
  priority?: boolean;
  className?: string;
  hero?: boolean;
};

export default function ProjectMedia({ project, sizes, priority = false, className, hero = false }: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.08 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [project.video]);

  if (project.video) {
    return (
      <span
        className={["project-motion-media", className].filter(Boolean).join(" ")}
        style={{ "--project-poster": `url(${project.image})` } as CSSProperties}
        data-project-hero-image={hero || undefined}
      >
        <video
          ref={videoRef}
          src={project.video}
          poster={project.image}
          aria-label={project.alt}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </span>
    );
  }

  if (project.imageFit === "contain") {
    return (
      <span
        className={["project-motion-media", className].filter(Boolean).join(" ")}
        style={{ "--project-poster": `url(${project.image})` } as CSSProperties}
        data-project-hero-image={hero || undefined}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: "contain", objectPosition: project.imagePosition }}
        />
      </span>
    );
  }

  return (
    <Image
      className={className}
      src={project.image}
      alt={project.alt}
      fill
      priority={priority}
      sizes={sizes}
      style={{ objectPosition: project.imagePosition }}
      data-project-hero-image={hero || undefined}
    />
  );
}
