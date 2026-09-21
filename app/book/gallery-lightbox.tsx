"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./book.module.css";

type GalleryFrame = {
  image: string;
  alt: string;
  caption: string;
  orientation?: "portrait" | "landscape";
  position?: string;
};

type GalleryLightboxProps = {
  frames: GalleryFrame[];
};

export default function GalleryLightbox({ frames }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = () => {
    const index = activeIndex;
    setActiveIndex(null);
    requestAnimationFrame(() => {
      if (index !== null) triggerRefs.current[index]?.focus();
    });
  };

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + direction + frames.length) % frames.length;
    });
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const activeFrame = activeIndex === null ? null : frames[activeIndex];

  return (
    <>
      <div className={styles.galleryGrid}>
        {frames.map((frame, index) => (
          <figure key={`${frame.image}-${index}`} data-project-frame data-orientation={frame.orientation}>
            <Image src={frame.image} alt={frame.alt} fill sizes="(max-width: 760px) 100vw, 70vw" style={{ objectPosition: frame.position }} />
            <button
              ref={(element) => { triggerRefs.current[index] = element; }}
              className={styles.galleryTrigger}
              type="button"
              aria-label={`Ampliar fotografía ${index + 1} de ${frames.length}: ${frame.caption}`}
              aria-haspopup="dialog"
              onClick={() => setActiveIndex(index)}
            />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span>
              <span>{frame.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {activeFrame && activeIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografía ampliada ${activeIndex + 1} de ${frames.length}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className={styles.lightboxStage}>
            <Image
              key={activeFrame.image}
              src={activeFrame.image}
              alt={activeFrame.alt}
              fill
              priority
              sizes="100vw"
            />
          </div>

          <div className={styles.lightboxMeta} aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span>
            <span>{activeFrame.caption}</span>
          </div>

          <button
            ref={closeButtonRef}
            className={styles.lightboxClose}
            type="button"
            onClick={close}
            aria-label="Cerrar fotografía ampliada"
          >
            Cerrar <span aria-hidden="true">×</span>
          </button>

          {frames.length > 1 && (
            <>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxPrevious}`}
                type="button"
                onClick={() => move(-1)}
                aria-label="Fotografía anterior"
              >
                ←
              </button>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
                type="button"
                onClick={() => move(1)}
                aria-label="Fotografía siguiente"
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
