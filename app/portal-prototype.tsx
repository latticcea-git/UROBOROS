"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./portal.module.css";

type PortalType = "collaborator" | "client";

const collaboratorNav = ["Inicio", "Herramientas", "Cursos", "Anuncios"];
const clientNav = ["Resumen", "Seguimiento", "Contrato", "Equipo", "Servicios"];

const calculators = [
  { id: "01", title: "HORA$", description: "Jornadas, horas extra e IVA.", route: "TABULADOR /", type: "hours" },
  { id: "02", title: "COTIZADOR", description: "Alcance y presupuesto por nodo.", route: "TABULADOR /cotizador-studio", type: "quote" },
  { id: "03", title: "RENTA", description: "Equipo, días y condiciones de renta.", route: "TABULADOR /renta-equipo", type: "rental" },
  { id: "04", title: "PAQUETES", description: "Comparador de soluciones y servicios.", route: "TABULADOR /paquetes", type: "packages" },
] as const;

export default function PortalPrototype({ type }: { type: PortalType }) {
  const client = type === "client";
  const nav = client ? clientNav : collaboratorNav;
  const [section, setSection] = useState(nav[0]);

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link className={styles.logo} href="/usuario">LATTICCE</Link>
        <div className={styles.workspace}><span>{client ? "CLIENTE" : "COLABORADORES"}</span><strong>{client ? "CASA NÓRDICA" : "SISTEMA INTERNO"}</strong></div>
        <nav aria-label="Navegación del portal">{nav.map((item, index) => <button key={item} className={section === item ? styles.current : ""} onClick={() => setSection(item)}><span>0{index + 1}</span>{item}</button>)}</nav>
        <div className={styles.sideBottom}><button className={styles.profile}><i>{client ? "CN" : "EM"}</i><span><strong>{client ? "Claudia N." : "Emm Cinne"}</strong><small>{client ? "Cliente" : "Colaborador"}</small></span></button><Link href="/usuario">Cerrar prototipo <b>↗</b></Link></div>
      </aside>
      <section className={styles.content}>
        <header className={styles.contentHeader}><p className="eyebrow">{client ? "Proyecto activo · 01" : "Viernes · 22 agosto"}</p><div><button className={styles.search} aria-label="Buscar">⌕</button><button className={styles.bell} aria-label="Notificaciones">◉<span>3</span></button></div></header>
        {client ? <ClientDashboard section={section} /> : <CollaboratorDashboard section={section} onSectionChange={setSection} />}
      </section>
    </main>
  );
}

function CollaboratorDashboard({ section, onSectionChange }: { section: string; onSectionChange: (section: string) => void }) {
  if (section === "Herramientas") {
    return <ToolsHub />;
  }
  return <>
    <div className={styles.titleRow}><div><h1>{section === "Inicio" ? "Buen día, Emm." : section}</h1><p>{section === "Inicio" ? "Esto es lo que sostiene el ritmo de hoy." : "Vista de demostración para el sistema interno LATTICCE."}</p></div><button className={styles.outlineButton}>Ver agenda <span>↗</span></button></div>
    {section === "Inicio" ? <>
      <section className={styles.feature} aria-label="Anuncio destacado"><div><p className="eyebrow">Anuncio / 02</p><h2>La estructura se mueve. <em>Nosotros también.</em></h2><p>Ya está disponible el calendario de entregas y sesiones para la próxima iteración del sistema.</p><button>Leer anuncio <span>→</span></button></div><div className={styles.orb} aria-hidden="true"><i /><i /><i /></div></section>
      <div className={styles.grid}><section className={styles.card}><div className={styles.cardHead}><p className="eyebrow">Herramientas</p><span>04 calculadoras</span></div><h3>Tabulador LATTICCE</h3><div className={styles.toolList}><Tool icon="H" name="HORA$" status="Horas y jornada" /><Tool icon="C" name="Cotizador" status="Por nodo" /><Tool icon="R" name="Renta" status="Equipo" /></div><button className={styles.lineButton} onClick={() => onSectionChange("Herramientas")}>Ver herramientas <span>→</span></button></section><section className={styles.card}><div className={styles.cardHead}><p className="eyebrow">Aprendizaje</p><span>02 en curso</span></div><h3>Tu siguiente módulo</h3><div className={styles.course}><span>03</span><div><strong>Producción con intención</strong><small>Unidad 3 de 6 · 48 min</small><i><b /></i></div></div><button className={styles.lineButton}>Continuar curso <span>→</span></button></section></div>
    </> : <section className={styles.singleView}><p className="eyebrow">Módulo de prueba</p><h2>{section}</h2><p>Esta pantalla representa el espacio donde vivirán los recursos de {section.toLowerCase()}. La conexión y los permisos reales se incorporarán después del prototipo.</p></section>}
  </>;
}

function ToolsHub() {
  return <>
    <div className={styles.titleRow}><div><h1>Herramientas</h1><p>Calculadoras y accesos operativos de LATTICCE.</p></div><span className={styles.status}>● 04 calculadoras</span></div>
    <section className={styles.toolsIntro}>
      <div><p className="eyebrow">Tabulador LATTICCE</p><h2>Decidir con<br /><em>números claros.</em></h2></div>
      <p>HORA$, Cotizador, Renta y Paquetes ya viven en el sistema TABULADOR. Este espacio centraliza su entrada para colaboradores.</p>
    </section>
    <div className={styles.calculatorGrid} aria-label="Calculadoras disponibles">
      {calculators.map((calculator) => <article className={styles.calculatorCard} key={calculator.title}>
        <header><span>{calculator.id}</span><CalculatorIcon type={calculator.type} /></header>
        <div><h3>{calculator.title}</h3><p>{calculator.description}</p></div>
        <footer><code>{calculator.route}</code><span>Instancia local</span></footer>
      </article>)}
    </div>
    <section className={styles.studioLink}>
      <div><p className="eyebrow">Acceso web disponible</p><h3>Cotizador de Studio</h3><p>La versión ya integrada al sitio prepara una solicitud para WhatsApp.</p></div>
      <Link href="/studio#cotizar">Abrir cotizador Studio <b>↗</b></Link>
    </section>
  </>;
}

function ClientDashboard({ section }: { section: string }) {
  return <>
    <div className={styles.titleRow}><div><h1>{section === "Resumen" ? "Casa Nórdica" : section}</h1><p>{section === "Resumen" ? "Identidad, contenido y espacio digital." : "Vista privada del proyecto Casa Nórdica."}</p></div><span className={styles.status}>● En curso</span></div>
    {section === "Resumen" ? <>
      <section className={styles.clientHero}><div><p className="eyebrow">Siguiente hito</p><h2>Presentación de dirección visual</h2><p>28 de agosto · Revisión con LATTICCE Design</p><button>Ver seguimiento <span>→</span></button></div><div className={styles.progress}><span>Iteración</span><strong>02 <small>/ 04</small></strong><i><b /></i><p>Descubrimiento <em>Dirección visual</em> Producción Entrega</p></div></section>
      <div className={styles.clientGrid}><section className={styles.card}><div className={styles.cardHead}><p className="eyebrow">Servicios incluidos</p><span>03</span></div><div className={styles.serviceList}><p><b>01</b> Estrategia de marca <i>Activo</i></p><p><b>02</b> Identidad visual <i>Activo</i></p><p><b>03</b> Sistema de contenido <i>Próximo</i></p></div><button className={styles.lineButton}>Ver alcance <span>↗</span></button></section><section className={styles.card}><div className={styles.cardHead}><p className="eyebrow">Equipo asignado</p><span>03 personas</span></div><div className={styles.people}><Person name="Emm Cinne" role="Dirección creativa" initials="EC" /><Person name="Marina P." role="Gestión de proyecto" initials="MP" /><Person name="Leo R." role="Diseño" initials="LR" /></div><button className={styles.lineButton}>Contactar equipo <span>→</span></button></section></div>
    </> : <section className={styles.singleView}><p className="eyebrow">Módulo de prueba</p><h2>{section}</h2><p>Esta vista mostrará información autorizada del proyecto: documentos, actualizaciones y personas asignadas. Nada de este contenido está conectado todavía a datos reales.</p></section>}
  </>;
}

function Tool({ icon, name, status }: { icon: string; name: string; status: string }) { return <p><b>{icon}</b><span>{name}</span><small>{status}</small></p>; }
function Person({ name, role, initials }: { name: string; role: string; initials: string }) { return <p><b>{initials}</b><span><strong>{name}</strong><small>{role}</small></span></p>; }

function CalculatorIcon({ type }: { type: (typeof calculators)[number]["type"] }) {
  if (type === "hours") return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16" /><path d="M24 14v11l7 5" /></svg>;
  if (type === "quote") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 8h22v32H13z" /><path d="M19 18h10M19 24h10M19 30h6" /></svg>;
  if (type === "rental") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 16h30v18H9z" /><path d="M16 16v-5h16v5M16 34v4M32 34v4" /><circle cx="16" cy="25" r="3" /><circle cx="32" cy="25" r="3" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 13h28v22H10z" /><path d="M10 20h28M19 20v15M29 20v15" /></svg>;
}
