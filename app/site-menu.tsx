"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SiteMenuProps = {
  links: Array<{ label: string; href: string }>;
  homeHref: string;
};

export default function SiteMenu({ links, homeHref }: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="global-menu-header">
      {homeHref.startsWith("/UROBOROS/") ? (
        <a className="global-menu-logo" href={homeHref} onClick={close} aria-label="LATTICCE, ir al inicio">
          <Image src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS.svg" width={246} height={47} alt="LATTICCE" priority />
        </a>
      ) : (
        <Link className="global-menu-logo" href={homeHref} onClick={close} aria-label="LATTICCE, ir al inicio">
          <Image src="/UROBOROS/assets/logos/LTT_LOGO_FX_POS.svg" width={246} height={47} alt="LATTICCE" priority />
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
        <span>Menú</span><i aria-hidden="true">{open ? "×" : "+"}</i>
      </button>
      {open && (
        <nav className="global-menu-panel" id="site-menu-panel" aria-label="Navegación principal">
          <div className="global-menu-topline"><span>Índice</span><span>LATTICCE / 00</span></div>
          {links.map((link, index) => (
            link.href.startsWith("/UROBOROS/") ? (
              <a href={link.href} onClick={close} key={link.label}>
                <span>{String(index).padStart(2, "0")}</span>{link.label}
              </a>
            ) : (
              <Link href={link.href} onClick={close} key={link.label}>
                <span>{String(index).padStart(2, "0")}</span>{link.label}
              </Link>
            )
          ))}
        </nav>
      )}
    </header>
  );
}
