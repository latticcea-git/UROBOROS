"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SiteMenuProps = {
  links?: Array<{ label: string; href: string }>;
  homeHref: string;
  onNavigate?: (href: string) => void;
  logoSrc?: string;
  logoAlt?: string;
  variant?: "dark" | "light" | "agency" | "design";
};

const defaultLinks = [
  { label: "HOME", href: "/" },
  { label: "AGENCY", href: "/agency" },
  { label: "DESIGN", href: "/design" },
  { label: "STUDIO", href: "/studio" },
  { label: "TIME", href: "/time" },
  { label: "SOUND", href: "/sound" },
  { label: "BOOK", href: "/book" },
  { label: "BLOG", href: "/blog" },
  { label: "CLIENTES", href: "/clientes" },
  { label: "COLABORADORES", href: "/colaboradores" },
  { label: "USUARIO", href: "/usuario" },
] as const;

export default function SiteMenu({
  links = [],
  homeHref,
  onNavigate,
  logoSrc = "/UROBOROS/assets/logos/LTT_LOGO_1920_FX.png",
  logoAlt = "LATTICCE",
  variant = "dark",
}: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const overrides = new Map(links.map((link) => [link.label, link]));
  const canonicalLinks = [
    ...defaultLinks.map((link) => overrides.get(link.label) ?? link),
    ...links.filter((link) => !defaultLinks.some((canonical) => canonical.label === link.label)),
  ];
  const close = (href?: string) => {
    setOpen(false);
    if (href) onNavigate?.(href);
  };

  return (
    <header className="global-menu-header" data-menu-variant={variant}>
      {homeHref.startsWith("/UROBOROS/") ? (
        <a className="global-menu-logo" href={homeHref} onClick={() => close(homeHref)} aria-label="LATTICCE, ir al inicio">
          <Image src={logoSrc} width={246} height={47} alt={logoAlt} loading="eager" fetchPriority="high" />
        </a>
      ) : (
        <Link className="global-menu-logo" href={homeHref} onClick={() => close(homeHref)} aria-label="LATTICCE, ir al inicio">
          <Image src={logoSrc} width={246} height={47} alt={logoAlt} loading="eager" fetchPriority="high" />
        </Link>
      )}
      <button
        className="global-menu-trigger"
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="site-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span>Menú</span>
        <i aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d={open ? "M6 6l12 12M18 6 6 18" : "M12 5v14M5 12h14"} /></svg>
        </i>
      </button>
      {open && (
        <nav className="global-menu-panel" id="site-menu-panel" aria-label="Navegación principal">
          <div className="global-menu-topline"><span>Índice</span><span>LATTICCE / 00</span></div>
          {canonicalLinks.map((link, index) => {
            const isBook = link.label === "BOOK";
            const nodeId = ["AGENCY", "STUDIO", "SOUND", "DESIGN", "TIME"].includes(link.label)
              ? link.label.toLowerCase()
              : undefined;
            const bookPointer = isBook ? {
              onPointerMove: (event: React.PointerEvent<HTMLAnchorElement>) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--book-lens-x", `${event.clientX - bounds.left}px`);
                event.currentTarget.style.setProperty("--book-lens-y", `${event.clientY - bounds.top}px`);
              },
            } : {};
            const content = <><span>{String(index).padStart(2, "0")}</span>{link.label}</>;

            return link.href.startsWith("/UROBOROS/") ? (
              <a href={link.href} onClick={() => close(link.href)} key={link.label} data-book-link={isBook || undefined} data-node={nodeId} {...bookPointer}>
                {content}
              </a>
            ) : (
              <Link href={link.href} onClick={() => close(link.href)} key={link.label} data-book-link={isBook || undefined} data-node={nodeId} {...bookPointer}>
                {content}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
