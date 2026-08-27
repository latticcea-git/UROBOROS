"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, FormEvent, ReactNode, useEffect, useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "525525241137";
const CONTACT_EMAIL = "contacto@latticce.com";
const nodes = [
  { label: "Studio", href: "/studio", node: "studio" },
  { label: "Sound", href: "/sound", node: "sound" },
  { label: "Time", href: "/time", node: "time" },
  { label: "Design", href: "/design", node: "design" },
  { label: "Agency", href: "/agency", node: "agency" },
] as const;
const portalLinks = [
  { label: "Inicio", href: "/usuario" },
  { label: "Clientes", href: "/clientes" },
  { label: "Colaboradores", href: "/colaboradores" },
] as const;

export function openContactPopup() {
  window.dispatchEvent(new CustomEvent("latticce:open-contact"));
}

export function ContactTrigger({ children, className }: { children: ReactNode; className?: string }) {
  return <button className={className} type="button" data-contact-trigger onClick={openContactPopup}>{children}</button>;
}

export type NodeSocialLinks = { instagram?: string; facebook?: string; youtube?: string };

const socialLinksByNode: Record<string, NodeSocialLinks> = {
  studio: {
    instagram: "https://www.instagram.com/___latticce___?igsi=YTVnMzJwb2F2amQ1&utm_source=qr",
  },
  sound: {
    instagram: "https://www.instagram.com/latticce.sound?igsi=MWl4enBidDFremthOA%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/profile.php?id=61588752884212",
  },
  time: {
    instagram: "https://www.instagram.com/latticce.time?igsi=N280aXlkbzkxaDE4&utm_source=qr",
  },
  design: {
    instagram: "https://www.instagram.com/latticce.design?igsi=Nm1zYW8xbmZzOXhq&utm_source=qr",
    facebook: "https://www.facebook.com/profile.php?id=61589128948498",
  },
  agency: {
    instagram: "https://www.instagram.com/latticce.agency?igsi=MXh0cGRhdHU0c2Fjcg%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/profile.php?id=61589054697841",
  },
};

const pendingSocials: Record<string, Array<"facebook" | "youtube">> = {
  studio: ["facebook", "youtube"],
  time: ["facebook", "youtube"],
};

export function NodeSocialFooter({ node, socials = {} }: { node?: string; socials?: NodeSocialLinks }) {
  const links = [
    socials.instagram && { label: "Instagram", href: socials.instagram, icon: "instagram" },
    socials.facebook && { label: "Facebook", href: socials.facebook, icon: "facebook" },
    socials.youtube && { label: "YouTube", href: socials.youtube, icon: "youtube" },
    { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: "whatsapp" },
  ].filter(Boolean) as Array<{ label: string; href: string; icon: string }>;
  const pending = node ? pendingSocials[node] ?? [] : [];
  return <footer className="node-social-footer" data-node={node}>
    <span>{node ? `LATTICCE ${node}` : "LATTICCE"}</span>
    <nav aria-label="Contacto y redes">
      {links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}><Image src={`/UROBOROS/assets/icons/social/${link.icon}.svg`} width={18} height={18} alt="" /><span>{link.label}</span></a>)}
      {pending.map((social) => <span className="node-social-pending" key={social} title="Enlace pendiente" aria-label={`${social}, enlace pendiente`}><Image src={`/UROBOROS/assets/icons/social/${social}.svg`} width={18} height={18} alt="" /><span>{social}</span></span>)}
    </nav>
  </footer>;
}

type SectionItem = { id: string; label: string };
const routeSections: Array<{ match: (pathname: string) => boolean; items: SectionItem[] }> = [
  { match: (path) => path === "/", items: [{ id: "inicio", label: "Inicio" }, { id: "manifiesto", label: "Manifiesto" }, { id: "ecosistema", label: "Nodos" }, { id: "intencion", label: "Intención" }, { id: "metodo", label: "Pilares" }, { id: "comunidad", label: "Comunidad" }, { id: "contacto", label: "Contacto" }] },
  { match: (path) => path === "/agency", items: [{ id: "inicio", label: "Inicio" }, { id: "servicios", label: "Sistemas" }] },
  { match: (path) => path === "/sound", items: [{ id: "inicio", label: "Inicio" }] },
  { match: (path) => path === "/studio", items: [{ id: "inicio", label: "Inicio" }, { id: "servicios", label: "Servicios" }, { id: "proceso", label: "Proceso" }, { id: "proyectos", label: "Proyectos" }, { id: "cotizar", label: "Cotizar" }] },
  { match: (path) => path === "/time", items: [{ id: "inicio", label: "Inicio" }, { id: "historias", label: "Historias" }, { id: "coberturas", label: "Coberturas" }, { id: "equipo", label: "Equipo" }, { id: "agenda", label: "Agenda" }] },
  { match: (path) => path === "/design", items: [{ id: "inicio", label: "Inicio" }, { id: "book", label: "Book" }, { id: "metodo", label: "Método" }, { id: "servicios", label: "Servicios" }, { id: "contacto", label: "Contacto" }] },
  { match: (path) => path === "/book", items: [{ id: "inicio", label: "Inicio" }, { id: "destacados", label: "Destacados" }, { id: "nodos", label: "Nodos" }, { id: "catalogo", label: "Archivo" }] },
  { match: (path) => path === "/blog", items: [{ id: "inicio", label: "Inicio" }, { id: "archivo", label: "Archivo" }] },
  { match: (path) => path.startsWith("/agency/"), items: [{ id: "inicio", label: "Inicio" }, { id: "enfoque", label: "Enfoque" }, { id: "proceso", label: "Proceso" }, { id: "capacidades", label: "Capacidades" }, { id: "casos", label: "Casos" }, { id: "cuentanos", label: "Contacto" }] },
];

function SectionNavigator({ pathname }: { pathname: string }) {
  const items = useMemo(() => routeSections.find((route) => route.match(pathname))?.items ?? [], [pathname]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!items.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const hashIndex = items.findIndex((item) => `#${item.id}` === window.location.hash);
      if (pathname === "/") { setActive(hashIndex >= 0 ? hashIndex : 0); return; }
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;
      items.forEach((item, index) => {
        const target = document.getElementById(item.id);
        if (!target) return;
        const bounds = target.getBoundingClientRect();
        const visible = bounds.right > 0 && bounds.left < window.innerWidth && bounds.bottom > 0 && bounds.top < window.innerHeight;
        const nextDistance = visible ? Math.min(Math.abs(bounds.left - centerX), Math.abs(bounds.top - centerY)) : Math.hypot(bounds.left - centerX, bounds.top - centerY);
        if (nextDistance < distance) { distance = nextDistance; nearest = index; }
      });
      setActive(nearest);
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true, capture: true });
    window.addEventListener("resize", requestUpdate);
    const timer = window.setInterval(requestUpdate, 500);
    return () => { if (frame) window.cancelAnimationFrame(frame); window.clearInterval(timer); window.removeEventListener("scroll", requestUpdate, true); window.removeEventListener("resize", requestUpdate); };
  }, [items, pathname]);
  if (!items.length) return null;
  const progress = items.length > 1 ? active / (items.length - 1) : 1;
  return <nav className="shared-section-nav" aria-label="Secciones de esta página" style={{ "--section-progress": progress } as CSSProperties}>
    <span className="shared-section-node">{pathname.split("/")[1] || "LATTICCE"}</span>
    <div className="shared-section-links">{items.map((item, index) => <a className={index === active ? "active" : ""} href={`#${item.id}`} key={item.id} aria-current={index === active ? "location" : undefined} onClick={() => window.dispatchEvent(new CustomEvent("latticce:navigate-section", { detail: item.id }))}>{item.label}</a>)}</div>
    <div className="shared-section-progress" aria-hidden="true"><i /></div>
    <span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
  </nav>;
}

function GlobalHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState<"nodes" | "portal" | null>(null);
  useEffect(() => { setMenuOpen(false); setSectionOpen(null); }, [pathname]);
  return <header className="shared-header">
    <Link className="shared-header-logo" href="/" aria-label="LATTICCE, ir al inicio"><Image src="/UROBOROS/assets/logos/LTT_LOGO_1920_FX.png" width={246} height={47} alt="LATTICCE" priority /></Link>
    <a className="shared-header-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><Image src="/UROBOROS/assets/icons/social/whatsapp.svg" width={16} height={16} alt="" /> WhatsApp</a>
    <button className="shared-header-trigger" type="button" aria-expanded={menuOpen} aria-controls="global-navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? "Cerrar" : "Menú"}<i aria-hidden="true">{menuOpen ? "×" : "+"}</i></button>
    {menuOpen && <nav className="shared-navigation" id="global-navigation" aria-label="Navegación principal">
      <Link href="/">HOME</Link>
      <div className="shared-navigation-group"><button type="button" aria-expanded={sectionOpen === "nodes"} onClick={() => setSectionOpen(sectionOpen === "nodes" ? null : "nodes")}>NODOS <span>+</span></button>{sectionOpen === "nodes" && <div>{nodes.map((item) => <Link key={item.node} href={item.href} data-node={item.node}>{item.label}</Link>)}</div>}</div>
      <Link href="/book">BOOK</Link><Link href="/blog">BLOG</Link>
      <div className="shared-navigation-group"><button type="button" aria-expanded={sectionOpen === "portal"} onClick={() => setSectionOpen(sectionOpen === "portal" ? null : "portal")}>PORTAL <span>+</span></button>{sectionOpen === "portal" && <div>{portalLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>}</div>
      <button className="shared-navigation-contact" type="button" onClick={() => { setMenuOpen(false); openContactPopup(); }}>CONTACTO</button>
      <a className="shared-navigation-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WHATSAPP ↗</a>
    </nav>}
  </header>;
}

function ContactPopup() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const [name, setName] = useState(""); const [contact, setContact] = useState(""); const [message, setMessage] = useState("");
  useEffect(() => {
    const show = () => setOpen(true);
    const intercept = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href='#contacto'], a[href='/#contacto'], a[href='#cotizar'], a[href='#agenda'], a[href='#cuentanos'], a[href^='mailto:']");
      if (!target || target.closest(".shared-section-nav")) return;
      event.preventDefault();
      setOpen(true);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("latticce:open-contact", show); document.addEventListener("click", intercept); document.addEventListener("keydown", escape);
    return () => { window.removeEventListener("latticce:open-contact", show); document.removeEventListener("click", intercept); document.removeEventListener("keydown", escape); };
  }, []);
  const body = [`Nombre: ${name}`, `Contacto: ${contact}`, "", message].join("\n");
  const sendEmail = (event: FormEvent) => { event.preventDefault(); window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Nuevo proyecto — ${name}`)}&body=${encodeURIComponent(body)}`; };
  const sendWhatsApp = () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
  if (!open) return null;
  return <div className="contact-popup-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><section className="contact-popup" role="dialog" aria-modal="true" aria-labelledby={titleId}>
    <button className="contact-popup-close" type="button" aria-label="Cerrar contacto" onClick={() => setOpen(false)}>×</button><p>Contacto general / LATTICCE</p><h2 id={titleId}>AQUÍ TERMINA TU RECORRIDO<br /><em>Y COMIENZA TTU CAMINO</em></h2>
    <form onSubmit={sendEmail}><label><span>Nombre</span><input required value={name} onChange={(event) => setName(event.target.value)} autoFocus /></label><label><span>Correo o teléfono</span><input required value={contact} onChange={(event) => setContact(event.target.value)} /></label><label><span>Proyecto</span><textarea required rows={4} value={message} onChange={(event) => setMessage(event.target.value)} /></label><div className="contact-popup-actions"><button type="submit">Enviar por correo ↗</button><button type="button" onClick={sendWhatsApp}>Enviar por WhatsApp ↗</button></div></form>
    <a className="contact-popup-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
  </section></div>;
}

export default function GlobalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const node = nodes.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.node;
  return <><GlobalHeader />{children}<SectionNavigator pathname={pathname} /><ContactPopup />{node && <NodeSocialFooter node={node} socials={socialLinksByNode[node]} />}</>;
}
