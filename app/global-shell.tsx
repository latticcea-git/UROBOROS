"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, FormEvent, ReactNode, useEffect, useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "525525241137";
const CONTACT_EMAIL = "contacto@latticce.com";
type ContactContext = "general" | "films";
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

export function openContactPopup(): void;
export function openContactPopup(context: ContactContext): void;
export function openContactPopup(context: ContactContext = "general") {
  window.dispatchEvent(new CustomEvent("latticce:open-contact", { detail: { context } }));
}

export function ContactTrigger({ children, className }: { children: ReactNode; className?: string }) {
  return <a className={className} href="#contacto-global" data-contact-trigger onClick={() => openContactPopup()}>{children}</a>;
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
  { match: (path) => path === "/", items: [{ id: "inicio", label: "Inicio" }, { id: "ecosistema", label: "Nodos" }, { id: "intencion", label: "Book" }, { id: "metodo", label: "Pilares" }, { id: "comunidad", label: "Comunidad" }, { id: "manifiesto", label: "Manifiesto" }, { id: "contacto", label: "Agenda" }] },
  { match: (path) => path === "/agency", items: [{ id: "inicio", label: "Inicio" }, { id: "servicios", label: "Sistemas" }] },
  { match: (path) => path === "/sound", items: [{ id: "inicio", label: "Inicio" }, { id: "servicios", label: "Capacidades" }, { id: "estudio", label: "Home Studio" }, { id: "postproduccion", label: "Precisión" }, { id: "radio", label: "radio" }, { id: "set", label: "Set" }, { id: "post", label: "Post" }, { id: "musicalizacion", label: "Música" }, { id: "proyectos", label: "Proyectos" }, { id: "contacto", label: "Agenda" }] },
  { match: (path) => path === "/studio", items: [{ id: "inicio", label: "Inicio" }, { id: "mirada", label: "Mirada" }, { id: "crea", label: "+ Crea" }, { id: "proyecto", label: "Proyecto" }, { id: "book", label: "Book" }, { id: "proceso", label: "Proceso" }, { id: "postproduccion", label: "Post" }, { id: "contenido", label: "Redes" }, { id: "contacto", label: "Hablemos" }] },
  { match: (path) => path === "/time", items: [{ id: "inicio", label: "Inicio" }, { id: "historias", label: "Historias" }, { id: "coberturas", label: "Coberturas" }, { id: "equipo", label: "Equipo" }, { id: "agenda", label: "Agenda" }] },
  { match: (path) => path === "/design", items: [{ id: "inicio", label: "Inicio" }, { id: "capacidades", label: "Capacidades" }, { id: "book", label: "Book" }, { id: "anima", label: "Anima" }, { id: "proceso", label: "Proceso" }, { id: "aplicaciones", label: "Aplicaciones" }, { id: "contenido", label: "Contenido" }, { id: "contacto", label: "Agenda" }] },
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
    const syncActive = (event: Event) => {
      const index = items.findIndex((item) => item.id === (event as CustomEvent<string>).detail);
      if (index >= 0) setActive(index);
    };
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
    if (pathname === "/studio") {
      window.addEventListener("latticce:section-active", syncActive);
      return () => window.removeEventListener("latticce:section-active", syncActive);
    }
    window.addEventListener("scroll", requestUpdate, { passive: true, capture: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("latticce:section-active", syncActive);
    const timer = window.setInterval(requestUpdate, 500);
    return () => { if (frame) window.cancelAnimationFrame(frame); window.clearInterval(timer); window.removeEventListener("scroll", requestUpdate, true); window.removeEventListener("resize", requestUpdate); window.removeEventListener("latticce:section-active", syncActive); };
  }, [items, pathname]);
  if (!items.length) return null;
  const progress = items.length > 1 ? active / (items.length - 1) : 1;
  return <nav className="shared-section-nav" aria-label="Secciones de esta página" style={{ "--section-progress": progress } as CSSProperties}>
    <span className="shared-section-node">{pathname.split("/")[1] || "LATTICCE"}</span>
    <div className="shared-section-links">{items.map((item, index) => <a className={index === active ? "active" : ""} href={`#${item.id}`} key={item.id} aria-current={index === active ? "location" : undefined} onClick={() => { setActive(index); window.dispatchEvent(new CustomEvent("latticce:navigate-section", { detail: item.id })); }}>{item.label}</a>)}</div>
    <div className="shared-section-progress" aria-hidden="true"><i /></div>
    <span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
  </nav>;
}

function GlobalHeader() {
  return <header className="shared-header">
    <Link className="shared-header-logo" href="/" aria-label="LATTICCE, ir al inicio"><Image src="/UROBOROS/assets/logos/LTT_LOGO_1920_FX.png" width={246} height={47} alt="LATTICCE" priority /></Link>
    <a className="shared-header-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><Image src="/UROBOROS/assets/icons/social/whatsapp.svg" width={16} height={16} alt="" /> WhatsApp</a>
    <details className="shared-header-menu">
      <summary className="shared-header-trigger" aria-controls="global-navigation">Menú<i aria-hidden="true">+</i></summary>
      <nav className="shared-navigation" id="global-navigation" aria-label="Navegación principal">
        <Link href="/">HOME</Link>
        <details className="shared-navigation-group"><summary>NODOS <span>+</span></summary><div>{nodes.map((item) => <Link key={item.node} href={item.href} data-node={item.node}>{item.label}</Link>)}</div></details>
        <Link href="/book">BOOK</Link><Link href="/blog">BLOG</Link><Link href="/films/cinema">CINNEMA</Link>
        <details className="shared-navigation-group"><summary>PORTAL <span>+</span></summary><div>{portalLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div></details>
        <a className="shared-navigation-contact" href="#contacto-global">CONTACTO</a>
        <a className="shared-navigation-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WHATSAPP ↗︎</a>
      </nav>
    </details>
  </header>;
}

function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<ContactContext>("general");
  const titleId = useId();
  const [name, setName] = useState(""); const [contact, setContact] = useState(""); const [message, setMessage] = useState("");
  useEffect(() => {
    const show = (event: Event) => {
      const detail = (event as CustomEvent<{ context?: ContactContext }>).detail;
      setContext(detail?.context === "films" ? "films" : "general");
      setOpen(true);
    };
    const intercept = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href='#contacto-global'], a[href='#contacto'], a[href='/#contacto'], a[href='#cotizar'], a[href='#agenda'], a[href='#cuentanos'], a[href^='mailto:']");
      if (!target || target.closest(".shared-section-nav")) return;
      if (target.getAttribute("href") === "#contacto-global") { setContext("general"); setOpen(true); return; }
      event.preventDefault();
      setContext("general"); setOpen(true);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("latticce:open-contact", show); document.addEventListener("click", intercept); document.addEventListener("keydown", escape);
    return () => { window.removeEventListener("latticce:open-contact", show); document.removeEventListener("click", intercept); document.removeEventListener("keydown", escape); };
  }, []);
  const contextLabel = context === "films" ? "LATTICCE FILMS" : "LATTICCE";
  const body = [`Área: ${contextLabel}`, `Nombre: ${name}`, `Contacto: ${contact}`, "", message].join("\n");
  const sendEmail = (event: FormEvent) => { event.preventDefault(); window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Nuevo proyecto — ${contextLabel} — ${name}`)}&body=${encodeURIComponent(body)}`; };
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}${body.trim() ? `?text=${encodeURIComponent(body)}` : ""}`;
  return <div id="contacto-global" className="contact-popup-backdrop" data-open={open ? "true" : "false"} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><section className="contact-popup" role="dialog" aria-modal="true" aria-labelledby={titleId}>
    <a className="contact-popup-close" href="#" aria-label="Cerrar contacto" onClick={() => setOpen(false)}>×</a><p>{context === "films" ? "Contacto / LATTICCE FILMS" : "Contacto general / LATTICCE"}</p>{context === "films" ? <h2 id={titleId}>CONTACTA CON<br /><em>LATTICCE FILMS</em></h2> : <h2 id={titleId}>Aquí termina TU<br /><em>recorrido</em><br />COMIENZA TU<br /><em>camino</em></h2>}
    <form action={`mailto:${CONTACT_EMAIL}`} method="post" encType="text/plain" onSubmit={sendEmail}><label><span>Nombre</span><input required name="Nombre" value={name} onChange={(event) => setName(event.target.value)} /></label><label><span>Correo o teléfono</span><input required name="Contacto" value={contact} onChange={(event) => setContact(event.target.value)} /></label><label><span>Proyecto</span><textarea required name="Proyecto" rows={4} value={message} onChange={(event) => setMessage(event.target.value)} /></label><div className="contact-popup-actions"><button type="submit">Enviar por correo ↗︎</button><a href={whatsappHref} target="_blank" rel="noreferrer">Enviar por WhatsApp ↗︎</a></div></form>
    <a className="contact-popup-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
  </section></div>;
}

export default function GlobalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCinema = pathname === "/films/cinema" || pathname.startsWith("/films/cinema/");
  const node = nodes.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.node;
  if (isCinema) return <>{children}<ContactPopup /></>;
  return <><GlobalHeader />{children}<SectionNavigator pathname={pathname} /><ContactPopup />{node && <NodeSocialFooter node={node} socials={socialLinksByNode[node]} />}</>;
}
