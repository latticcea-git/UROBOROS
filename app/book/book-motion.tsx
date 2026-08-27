"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type BookMotionProps = {
  refreshKey?: string;
  variant: "index" | "project";
};

const selectAll = (root: Element, selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

function revealGroups(root: Element) {
  selectAll(root, "[data-book-intro]").forEach((group) => {
    gsap.fromTo(
      Array.from(group.children),
      { autoAlpha: 0, y: 72 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: group, start: "top 88%", end: "top 45%", scrub: true },
      },
    );
  });
}

function revealCards(root: Element, selector: string) {
  selectAll(root, selector).forEach((card, index) => {
    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 110, rotateZ: index % 2 === 0 ? -1.2 : 1.2, scale: 0.975 },
      {
        autoAlpha: 1,
        y: 0,
        rotateZ: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top 96%", end: "top 58%", scrub: true },
      },
    );
  });
}

function animateIndex(root: Element, desktop: boolean) {
  // On touch devices Book remains a continuous, native vertical reading journey.
  // The section navigator still provides direct access to each marked section.
  if (!desktop) return;

  const hero = root.querySelector<HTMLElement>("[data-book-hero]");
  const title = hero?.querySelector<HTMLElement>("[data-book-hero-title]");
  const antigravity = hero?.querySelector<HTMLElement>("[data-book-antigravity]");
  const capsules = hero ? selectAll(hero, "[data-book-capsule]") : [];

  if (hero && title) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: true,
        fastScrollEnd: true,
        preventOverlaps: "book-scenes",
      },
    });

    timeline
      .to(title, { yPercent: -11, scale: 0.56, autoAlpha: 0, ease: "none" }, 0.12)
      .to(hero.querySelector("[data-book-hero-topline]"), { autoAlpha: 0, y: -28, ease: "none" }, 0.08)
      .to(hero.querySelector("[data-book-hero-foot]"), { autoAlpha: 0, y: 65, ease: "none" }, 0.08)
      .to(capsules[0], { xPercent: -60, yPercent: 34, rotate: -6, autoAlpha: 0, ease: "none" }, 0.08)
      .to(capsules[1], { xPercent: 62, yPercent: -28, rotate: 7, autoAlpha: 0, ease: "none" }, 0.08);

    if (antigravity) timeline.to(antigravity, { autoAlpha: 0, ease: "none" }, 0.08);
  }

  const featured = root.querySelector<HTMLElement>("[data-book-featured]");
  const slider = root.querySelector<HTMLElement>("[data-book-slider]");
  if (featured && slider) {
    gsap.timeline({
      scrollTrigger: {
        trigger: featured,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: true,
        fastScrollEnd: true,
        preventOverlaps: "book-scenes",
      },
    })
      .fromTo(
        slider,
        { scale: 0.965 },
        { scale: 1, duration: 1, ease: "none" },
      );
  }

  const nodes = root.querySelector<HTMLElement>("[data-book-nodes]");
  if (nodes) {
    ScrollTrigger.create({
      trigger: nodes,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      fastScrollEnd: true,
      preventOverlaps: "book-scenes",
    });
  }

  const catalog = root.querySelector<HTMLElement>("#catalogo");
  const track = catalog?.querySelector<HTMLElement>("[data-book-project-track]");
  if (catalog && track) {
    const travel = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
    const catalogTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: catalog,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.2, travel() + window.innerWidth * 0.65)}`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: "book-scenes",
      },
    });
    catalogTimeline.to(track, { x: () => -travel(), duration: 1, ease: "none" });
  }

  const footer = root.querySelector<HTMLElement>("[data-book-footer]");
  const footerTitle = footer?.querySelector<HTMLElement>("h2");
  if (footer && footerTitle) {
    gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top top",
        end: "+=90%",
        pin: true,
        anticipatePin: 1,
        scrub: true,
        fastScrollEnd: true,
        preventOverlaps: "book-scenes",
      },
    }).fromTo(
      Array.from(footer.children),
      { autoAlpha: 0, y: 80, scale: 0.78 },
      { autoAlpha: 1, y: 0, scale: 1, stagger: 0.06, ease: "none" },
    );
  }
}

function animateProject(root: Element, desktop: boolean) {
  const hero = root.querySelector<HTMLElement>("[data-project-hero]");
  const image = hero?.querySelector<HTMLElement>("[data-project-hero-image]");
  const copy = hero?.querySelector<HTMLElement>("[data-project-hero-copy]");

  if (hero && copy) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: desktop ? "+=125%" : "bottom top",
        pin: desktop,
        anticipatePin: desktop ? 1 : 0,
        scrub: true,
      },
    });
    if (image) timeline.to(image, { scale: 1.18, yPercent: 4, ease: "none" }, 0);
    timeline
      .to(copy, { yPercent: -18, scale: desktop ? 0.84 : 0.92, autoAlpha: 0.18, ease: "none" }, 0)
      .to(hero.querySelector("[data-project-breadcrumb]"), { autoAlpha: 0, y: -24, ease: "none" }, 0)
      .to(hero.querySelector("[data-project-scroll]"), { autoAlpha: 0, y: 28, ease: "none" }, 0);
  }

  const statement = root.querySelector<HTMLElement>("[data-project-statement]");
  if (statement) {
    gsap.fromTo(
      Array.from(statement.children),
      { autoAlpha: 0, y: 95 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: statement, start: "top 92%", end: "top 38%", scrub: true },
      },
    );
  }

  const details = root.querySelector<HTMLElement>("[data-project-details]");
  if (details) {
    gsap.fromTo(
      Array.from(details.children),
      { autoAlpha: 0, y: 55 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: details, start: "top 92%", end: "top 58%", scrub: true },
      },
    );
  }

  revealCards(root, "[data-project-frame]");
  revealCards(root, "[data-project-info-panel]");
  revealCards(root, "[data-project-related-card]");
}

export default function BookMotion({ refreshKey = "", variant }: BookMotionProps) {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>(`[data-book-motion-root="${variant}"]`);
    if (!root) return;

    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 761px)",
        mobile: "(max-width: 760px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduced } = context.conditions as { desktop: boolean; mobile: boolean; reduced: boolean };
        if (reduced) return;

        const scoped = gsap.context(() => {
          if (variant === "index") animateIndex(root, desktop);
          else {
            animateProject(root, desktop);
            revealGroups(root);
          }
        }, root);

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => scoped.revert();
      },
    );

    return () => media.revert();
  }, { dependencies: [variant] });

  useGSAP(() => {
    if (!refreshKey) return;
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, { dependencies: [refreshKey] });

  return null;
}
