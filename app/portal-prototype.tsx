"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./portal.module.css";

type PortalType = "collaborator" | "client";
type ProjectStatus = "Activo" | "Terminado";

type DemoProject = {
  id: number;
  name: string;
  status: ProjectStatus;
  next: string;
  progress: number;
};

type Software = {
  id: string;
  name: string;
  mark: string;
  category: string;
};

const collaboratorNav = [
  { id: "inicio", label: "Inicio", mark: "⌂" },
  { id: "proyectos", label: "Proyectos", mark: "◇" },
  { id: "herramientas", label: "Herramientas", mark: "⊞" },
  { id: "calendario", label: "Calendario", mark: "□" },
  { id: "personas", label: "Personas", mark: "◎" },
  { id: "cursos", label: "Cursos", mark: "↗" },
  { id: "anuncios", label: "Anuncios", mark: "•" },
  { id: "perfil", label: "Perfil", mark: "◉" },
] as const;

const clientNav = [
  { id: "resumen", label: "Resumen", mark: "⌂" },
  { id: "proyecto", label: "Proyecto", mark: "◇" },
  { id: "contrato", label: "Contrato", mark: "↧" },
  { id: "calendario", label: "Calendario", mark: "□" },
  { id: "personas", label: "Personas", mark: "◎" },
  { id: "notificaciones", label: "Avisos", mark: "•" },
] as const;

const softwareCatalog: Software[] = [
  { id: "drive", name: "Google Drive", mark: "DR", category: "Archivos" },
  { id: "jira", name: "Jira", mark: "JI", category: "Gestión" },
  { id: "meta", name: "Meta", mark: "ME", category: "Campañas" },
  { id: "adobe", name: "Adobe", mark: "AD", category: "Producción" },
  { id: "tiktok", name: "TikTok", mark: "TT", category: "Contenido" },
  { id: "github", name: "GitHub", mark: "GH", category: "Código" },
  { id: "react", name: "React", mark: "RE", category: "Stack" },
  { id: "python", name: "Python", mark: "PY", category: "Stack" },
];

const calculators = [
  { id: "01", title: "HORA$", detail: "Jornadas, horas extra e IVA", route: "/", mark: "H$" },
  { id: "02", title: "Cotizador", detail: "Alcance y presupuesto por nodo", route: "/cotizador-studio", mark: "CO" },
  { id: "03", title: "Renta", detail: "Equipo, días y condiciones", route: "/renta-equipo", mark: "RE" },
  { id: "04", title: "Paquetes", detail: "Comparador de soluciones", route: "/paquetes", mark: "PA" },
] as const;

const initialProjects: DemoProject[] = [
  { id: 1, name: "Proyecto 01", status: "Activo", next: "Hito por conectar", progress: 42 },
  { id: 2, name: "Proyecto 02", status: "Activo", next: "Sin calendario", progress: 68 },
  { id: 3, name: "Proyecto 03", status: "Terminado", next: "Cierre registrado", progress: 100 },
];

const tabulatorBase = process.env.NEXT_PUBLIC_TABULADOR_URL?.replace(/\/$/, "") ?? "";

export default function PortalPrototype({ type }: { type: PortalType }) {
  const client = type === "client";
  const nav = client ? clientNav : collaboratorNav;
  const [section, setSection] = useState<string>(nav[0].id);
  const [profileName, setProfileName] = useState(client ? "Cuenta cliente" : "Emm Cinne");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previous = [root.style.overflow, body.style.overflow, body.style.height];
    root.style.overflow = "auto";
    body.style.overflow = "auto";
    body.style.height = "auto";
    return () => {
      root.style.overflow = previous[0];
      body.style.overflow = previous[1];
      body.style.height = previous[2];
    };
  }, []);

  useEffect(() => () => {
    if (profileImage?.startsWith("blob:")) URL.revokeObjectURL(profileImage);
  }, [profileImage]);

  const initials = profileName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "LT";

  function navigate(nextSection: string) {
    setSection(nextSection);
    window.scrollTo({ top: 0, behavior: "smooth" });
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={styles.portalViewport}>
      <section className={styles.appShell}>
        <aside className={styles.sidebar}>
          <Link className={styles.brand} href="/usuario" aria-label="Volver al acceso de usuario">
            <Image
              src="/UROBOROS/assets/logos/LTT_LOGO_NEG.svg"
              alt="LATTICCE"
              width={94}
              height={20}
              priority
            />
          </Link>

          <nav className={styles.navigation} aria-label={client ? "Portal de clientes" : "Portal de colaboradores"}>
            {nav.map((item) => (
              <button
                className={section === item.id ? styles.navActive : ""}
                key={item.id}
                onClick={() => navigate(item.id)}
                aria-label={item.label}
                type="button"
              >
                <span aria-hidden="true">{item.mark}</span>
                <b>{item.label}</b>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarFoot}>
            <button type="button" onClick={() => !client && navigate("perfil")}>
              <Avatar image={profileImage} initials={initials} />
              <span><strong>{profileName}</strong><small>{client ? "Portal cliente" : "@latticce.com"}</small></span>
            </button>
            <Link href="/usuario" aria-label="Salir del prototipo">↗</Link>
          </div>
        </aside>

        <div className={styles.workspace}>
          <PortalHeader client={client} section={section} />
          <div className={styles.prototypeFlag}>PROTOTIPO · DATOS DE MUESTRA</div>
          <div className={styles.contentScroll} ref={contentRef}>
            {client ? (
              <ClientPortal section={section} setSection={navigate} />
            ) : (
              <CollaboratorPortal
                section={section}
                setSection={navigate}
                profileName={profileName}
                setProfileName={setProfileName}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                initials={initials}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function PortalHeader({ client, section }: { client: boolean; section: string }) {
  const title = section === "inicio" || section === "resumen" ? "Management" : section.charAt(0).toUpperCase() + section.slice(1);
  return (
    <header className={styles.portalHeader}>
      <div>
        <span>{client ? "CLIENTE / PROYECTO" : "COLABORADORES / WORKSPACE"}</span>
        <h1>{title}</h1>
      </div>
      <div className={styles.headerTools}>
        <span className={styles.dateChip}>25 AGO · 2026</span>
        <label className={styles.searchBox}><span>⌕</span><input aria-label="Buscar" placeholder="Buscar..." /></label>
        <button type="button" aria-label="Notificaciones">•<i>2</i></button>
      </div>
    </header>
  );
}

function CollaboratorPortal({
  section,
  setSection,
  profileName,
  setProfileName,
  profileImage,
  setProfileImage,
  initials,
}: {
  section: string;
  setSection: (value: string) => void;
  profileName: string;
  setProfileName: (value: string) => void;
  profileImage: string | null;
  setProfileImage: (value: string | null) => void;
  initials: string;
}) {
  if (section === "proyectos") return <ProjectsWorkspace />;
  if (section === "herramientas") return <ToolsHub />;
  if (section === "calendario") return <CalendarPanel client={false} />;
  if (section === "personas") return <PeoplePanel client={false} />;
  if (section === "cursos") return <LearningPanel />;
  if (section === "anuncios") return <NoticePanel client={false} />;
  if (section === "perfil") {
    return <ProfilePanel name={profileName} setName={setProfileName} image={profileImage} setImage={setProfileImage} initials={initials} />;
  }
  return <CollaboratorDashboard setSection={setSection} />;
}

function CollaboratorDashboard({ setSection }: { setSection: (value: string) => void }) {
  return (
    <div className={styles.dashboardGrid}>
      <TimelineCard client={false} onOpen={() => setSection("proyectos")} />
      <ProgressCard value={68} label="Rendimiento general" />
      <MediaCard title="Proyecto 01" meta="Archivo de vista previa" />
      <IntegrationCard onOpen={() => setSection("proyectos")} />
      <TeamCard client={false} />
    </div>
  );
}

function ClientPortal({ section, setSection }: { section: string; setSection: (value: string) => void }) {
  if (section === "proyecto") return <ClientProject />;
  if (section === "contrato") return <ContractPanel />;
  if (section === "calendario") return <CalendarPanel client />;
  if (section === "personas") return <PeoplePanel client />;
  if (section === "notificaciones") return <NoticePanel client />;
  return <ClientDashboard setSection={setSection} />;
}

function ClientDashboard({ setSection }: { setSection: (value: string) => void }) {
  return (
    <div className={styles.dashboardGrid}>
      <TimelineCard client onOpen={() => setSection("proyecto")} />
      <ProgressCard value={42} label="Avance del proyecto" />
      <MediaCard title="Proyecto 01" meta="Vista autorizada" />
      <DocumentList onOpen={() => setSection("contrato")} />
      <TeamCard client />
    </div>
  );
}

function TimelineCard({ client, onOpen }: { client: boolean; onOpen: () => void }) {
  const rows = client
    ? [
        ["Descubrimiento", "1 / 4", 8, 25],
        ["Dirección", "2 / 4", 28, 42],
        ["Producción", "Pendiente", 53, 25],
        ["Entrega", "Pendiente", 73, 17],
      ] as const
    : [
        ["Proyecto 01", "4 horas", 7, 31],
        ["Proyecto 02", "2 horas", 30, 27],
        ["Revisión interna", "1 hora", 48, 22],
        ["Cierre", "Sin fecha", 70, 19],
      ] as const;

  return (
    <article className={`${styles.card} ${styles.timelineCard}`}>
      <CardTop title={client ? "Ruta del proyecto" : "Proyectos actuales"} meta="Día · Semana · Mes" action="•••" />
      <div className={styles.timelineHead}><span>Actividad</span><b>09</b><b>11</b><b>13</b><b>15</b><b>17</b></div>
      <div className={styles.timelineBody}>
        {rows.map(([name, duration, left, width], index) => (
          <div className={styles.timelineRow} key={name}>
            <span><strong>{name}</strong><small>{duration}</small></span>
            <div><i style={{ left: `${left}%`, width: `${width}%` }}><em>{index + 1}</em><b>{name}</b></i></div>
          </div>
        ))}
      </div>
      <button className={styles.inlineAction} type="button" onClick={onOpen}>{client ? "Ver detalle" : "Gestionar proyectos"}<span>↗</span></button>
    </article>
  );
}

function ProgressCard({ value, label }: { value: number; label: string }) {
  return (
    <article className={`${styles.card} ${styles.progressCard}`}>
      <CardTop title="Ongoing" meta="Proyecto 01" action="⊞" />
      <strong className={styles.progressValue}>{value}<small>%</small></strong>
      <p>{label}</p>
      <svg className={styles.lineChart} viewBox="0 0 260 92" role="img" aria-label={`Gráfica de muestra: ${value}%`}>
        <path d="M2 72 C25 68 35 34 58 42 S90 78 112 54 S150 16 175 31 S204 76 226 52 S242 35 258 39" />
        <path className={styles.chartFade} d="M2 72 C25 68 35 34 58 42 S90 78 112 54 S150 16 175 31 S204 76 226 52 S242 35 258 39 L258 92 L2 92 Z" />
      </svg>
      <div className={styles.progressLegend}><span><i />Completado</span><b>{value}%</b></div>
    </article>
  );
}

function MediaCard({ title, meta }: { title: string; meta: string }) {
  return (
    <article className={styles.mediaCard}>
      <Image
        src="/UROBOROS/assets/images/portal/latticce-liquid-core-v1.png"
        alt="Núcleo líquido abstracto de LATTICCE"
        fill
        loading="eager"
        sizes="(max-width: 720px) 100vw, 24vw"
      />
      <div className={styles.mediaTop}><span>◉</span><small>{meta}</small><b>•••</b></div>
      <div className={styles.mediaFoot}><span><strong>{title}</strong><small>Estado visual del proyecto</small></span><i>42%</i></div>
    </article>
  );
}

function IntegrationCard({ onOpen }: { onOpen: () => void }) {
  return (
    <article className={`${styles.card} ${styles.integrationCard}`}>
      <CardTop title="Integraciones" meta="Arrastra a un proyecto" action="⊞" />
      <div className={styles.integrationList}>
        {softwareCatalog.slice(0, 4).map((tool) => (
          <div key={tool.id}><SoftwareMark tool={tool} /><span><strong>{tool.name}</strong><small>{tool.category}</small></span><b>＋</b></div>
        ))}
      </div>
      <button className={styles.inlineAction} onClick={onOpen} type="button">Abrir compositor<span>↗</span></button>
    </article>
  );
}

function DocumentList({ onOpen }: { onOpen: () => void }) {
  return (
    <article className={`${styles.card} ${styles.integrationCard}`}>
      <CardTop title="Documentos" meta="Autorizados" action="↧" />
      <div className={styles.integrationList}>
        {["Contrato", "Alcance", "Calendario", "Entregables"].map((name, index) => (
          <div key={name}><i className={styles.fileMark}>0{index + 1}</i><span><strong>{name}</strong><small>{index ? "Archivo pendiente" : "Descarga no disponible"}</small></span><b>—</b></div>
        ))}
      </div>
      <button className={styles.inlineAction} onClick={onOpen} type="button">Ver documentos<span>↗</span></button>
    </article>
  );
}

function TeamCard({ client }: { client: boolean }) {
  return (
    <article className={styles.teamCard}>
      <div className={styles.teamHeader}>
        <span><small>{client ? "PROYECTO" : "TEAM"}</small><strong>{client ? "Seguimiento autorizado" : "Rendimiento por proyecto"}</strong></span>
        <div><b>{client ? "04" : "12"}<small>{client ? " Fases" : " Colaboradores"}</small></b><b>{client ? "03" : "02"}<small>{client ? " Responsables" : " Activos"}</small></b></div>
      </div>
      <div className={styles.teamColumns}>
        <TeamUnit title={client ? "Dirección" : "Proyecto 01"} value={client ? 72 : 68} people="EC · MA" />
        <TeamUnit title={client ? "Producción" : "Proyecto 02"} value={client ? 42 : 51} people="LR · JS" />
        <div className={styles.barChart} aria-label="Gráfica de rendimiento de muestra">
          {[22, 34, 28, 49, 41, 64, 58, 78, 67, 91].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
        </div>
      </div>
    </article>
  );
}

function TeamUnit({ title, value, people }: { title: string; value: number; people: string }) {
  return (
    <div className={styles.teamUnit}>
      <span><strong>{title}</strong><small>{people}</small></span>
      <div><i><b style={{ width: `${value}%` }} /></i><em>{value}%</em></div>
      <small>Progreso visible</small>
    </div>
  );
}

function ProjectsWorkspace() {
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState<ProjectStatus>("Activo");
  const [creating, setCreating] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [assignedTools, setAssignedTools] = useState<string[]>(["drive", "jira"]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const visibleProjects = projects.filter((project) => project.status === filter);
  const assignedSoftware = useMemo(() => softwareCatalog.filter((tool) => assignedTools.includes(tool.id)), [assignedTools]);

  function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = projectName.trim();
    if (!name) return;
    setProjects((current) => [...current, { id: Date.now(), name, status: "Activo", next: "Sin calendario", progress: 0 }]);
    setProjectName("");
    setCreating(false);
    setFilter("Activo");
  }

  function addTool(id: string) {
    setAssignedTools((current) => current.includes(id) ? current : [...current, id]);
    setSelectedTool(null);
  }

  function dropTool(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    if (softwareCatalog.some((tool) => tool.id === id)) addTool(id);
  }

  return (
    <div className={styles.sectionGrid}>
      <article className={`${styles.card} ${styles.projectManager}`}>
        <div className={styles.sectionHeading}>
          <span><small>PORTAFOLIO</small><strong>Proyectos</strong></span>
          <button type="button" onClick={() => setCreating((value) => !value)}>Nuevo proyecto <b>＋</b></button>
        </div>
        <div className={styles.tabs}>
          {(["Activo", "Terminado"] as ProjectStatus[]).map((status) => <button className={filter === status ? styles.tabActive : ""} key={status} onClick={() => setFilter(status)} type="button">{status === "Activo" ? "Activos" : "Terminados"}<span>{projects.filter((project) => project.status === status).length}</span></button>)}
        </div>
        {creating && <form className={styles.createForm} onSubmit={createProject}><input autoFocus value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Nombre del proyecto" /><button>Agregar</button></form>}
        <div className={styles.projectList}>
          {visibleProjects.map((project) => <div key={project.id}><i>{project.id > 100 ? "N" : `0${project.id}`}</i><span><strong>{project.name}</strong><small>{project.next}</small></span><em><b style={{ width: `${project.progress}%` }} /></em><mark>{project.progress}%</mark></div>)}
        </div>
      </article>

      <article className={`${styles.card} ${styles.composerCard}`}>
        <CardTop title="Compositor" meta="Proyecto 01" action="Arrastrar" />
        <p>Asocia herramientas al proyecto. Esta maqueta no concede permisos ni sincroniza cuentas.</p>
        <div className={styles.softwareTray}>
          {softwareCatalog.map((tool) => <button className={selectedTool === tool.id ? styles.softwareSelected : ""} draggable key={tool.id} onDragStart={(event) => event.dataTransfer.setData("text/plain", tool.id)} onClick={() => setSelectedTool(tool.id)} type="button"><SoftwareMark tool={tool} /><span><strong>{tool.name}</strong><small>{tool.category}</small></span></button>)}
        </div>
        <div className={styles.dropZone} onDragOver={(event) => event.preventDefault()} onDrop={dropTool}>
          <span>HERRAMIENTAS ASIGNADAS</span>
          <div>{assignedSoftware.map((tool) => <button key={tool.id} onClick={() => setAssignedTools((current) => current.filter((id) => id !== tool.id))} type="button" title={`Quitar ${tool.name}`}><SoftwareMark tool={tool} /><b>{tool.name}</b><small>×</small></button>)}</div>
          {!assignedSoftware.length && <p>Arrastra aquí una herramienta</p>}
        </div>
        <button className={styles.addTool} disabled={!selectedTool} onClick={() => selectedTool && addTool(selectedTool)} type="button">Agregar selección <span>＋</span></button>
      </article>
    </div>
  );
}

function ToolsHub() {
  return (
    <div className={styles.toolsLayout}>
      <article className={styles.toolsIntro}>
        <div><small>HERRAMIENTAS / TABULADOR</small><h2>Calculadoras LATTICCE</h2><p>Accesos a las rutas actuales. Se habilitan cuando exista una URL pública configurada.</p></div>
        <Image src="/UROBOROS/assets/images/portal/latticce-liquid-core-v1.png" alt="Núcleo líquido abstracto" fill loading="eager" sizes="(max-width: 720px) 100vw, 45vw" />
        <span>{tabulatorBase ? "● Conexión disponible" : "○ URL pública pendiente"}</span>
      </article>
      <section className={styles.calculatorGrid}>
        {calculators.map((calculator) => {
          const href = tabulatorBase ? `${tabulatorBase}${calculator.route}` : "";
          return <article className={styles.calculatorCard} key={calculator.id}><header><span>{calculator.id}</span><i>{calculator.mark}</i></header><div><h2>{calculator.title}</h2><p>{calculator.detail}</p></div>{href ? <a href={href} target="_blank" rel="noreferrer">Abrir <span>↗</span></a> : <button type="button" disabled>URL pendiente <span>—</span></button>}</article>;
        })}
      </section>
      <article className={styles.localTool}><span><small>DISPONIBLE EN UROBOROS</small><strong>Cotizador Studio</strong></span><Link href="/studio#cotizar">Abrir herramienta ↗</Link></article>
    </div>
  );
}

function CalendarPanel({ client }: { client: boolean }) {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  return (
    <div className={styles.calendarGrid}>
      <article className={`${styles.card} ${styles.calendarCard}`}>
        <CardTop title="Agosto 2026" meta="Mes" action="‹  ›" />
        <div className={styles.weekdays}>{["L", "M", "M", "J", "V", "S", "D"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
        <div className={styles.days}>{days.map((day) => <button className={day === 25 ? styles.today : ""} key={day} type="button"><span>{day}</span>{day === 25 && <i>Hoy</i>}</button>)}</div>
      </article>
      <article className={styles.calendarAgenda}>
        <span>AGENDA</span><strong>{client ? "Fechas autorizadas" : "Actividad asignada"}</strong><div><b>25</b><span><strong>Sin eventos conectados</strong><small>La fuente de calendario está pendiente.</small></span></div>
      </article>
    </div>
  );
}

function PeoplePanel({ client }: { client: boolean }) {
  const roles = client ? ["Dirección del proyecto", "Gestión de proyecto", "Especialista asignado"] : ["Dirección", "Gestión", "Diseño", "Desarrollo"];
  return (
    <div className={styles.peopleLayout}>
      <div className={styles.compactHeading}><span><small>DIRECTORIO</small><strong>{client ? "Equipo de tu proyecto" : "Personas"}</strong></span><p>{client ? "Responsables autorizados para contacto." : "Colaboradores y clientes según permisos."}</p></div>
      <section className={styles.peopleGrid}>{roles.map((role, index) => <article key={role}><Avatar image={null} initials={`0${index + 1}`} /><span><strong>Perfil {index + 1}</strong><small>{role}</small></span><button disabled type="button">Contacto pendiente</button></article>)}</section>
    </div>
  );
}

function LearningPanel() {
  return (
    <div className={styles.learningGrid}>
      <article className={styles.learningMain}><small>FORMACIÓN / CURSO 01</small><h2>Producción con intención</h2><p>Espacio preparado para cursos asignados y avance por colaborador.</p><div><i><b style={{ width: "48%" }} /></i><span>48%</span></div></article>
      <article className={`${styles.card} ${styles.learningEmpty}`}><span>＋</span><strong>Catálogo pendiente</strong><small>Sin fuente de aprendizaje conectada.</small></article>
    </div>
  );
}

function NoticePanel({ client }: { client: boolean }) {
  return (
    <div className={styles.noticeLayout}>
      <div className={styles.compactHeading}><span><small>{client ? "CLIENTE" : "COLABORADORES"} / AVISOS</small><strong>Notificaciones</strong></span><p>Este módulo mostrará solo información procedente de una fuente autorizada.</p></div>
      <article className={styles.noticeEmpty}><strong>0</strong><span><b>Sin notificaciones reales</b><small>{client ? "Cambios de estado, documentos y aprobaciones aparecerán aquí." : "Anuncios internos y asignaciones aparecerán aquí."}</small></span></article>
    </div>
  );
}

function ProfilePanel({ name, setName, image, setImage, initials }: { name: string; setName: (value: string) => void; image: string | null; setImage: (value: string | null) => void; initials: string }) {
  const [contact, setContact] = useState(false);
  function changePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  }
  return (
    <div className={styles.profileGrid}>
      <article className={styles.profileVisual}><div><Avatar image={image} initials={initials} /></div><strong>{name}</strong><small>Colaborador · @latticce.com</small><label>Cambiar fotografía<input type="file" accept="image/*" onChange={changePhoto} /></label><p>La imagen permanece en esta sesión.</p></article>
      <form className={`${styles.card} ${styles.profileForm}`} onSubmit={(event) => event.preventDefault()}>
        <CardTop title="Información de perfil" meta="Visible según permisos" action="•••" />
        <label><span>Nombre visible</span><input value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label><span>Identidad de trabajo</span><input disabled value="usuario@latticce.com" /></label>
        <label><span>Contacto</span><input disabled placeholder="Dato no conectado" /></label>
        <div className={styles.contactToggle}><span><strong>Permitir contacto</strong><small>Solo personas autorizadas del proyecto.</small></span><button className={contact ? styles.toggleOn : ""} onClick={() => setContact((value) => !value)} type="button" role="switch" aria-checked={contact}><i /></button></div>
        <button className={styles.saveButton} type="button">Guardado en esta sesión <span>✓</span></button>
      </form>
    </div>
  );
}

function ClientProject() {
  return (
    <div className={styles.clientProjectGrid}>
      <article className={`${styles.card} ${styles.phaseCard}`}><CardTop title="Fases del proyecto" meta="04 etapas" action="•••" />{["Descubrimiento", "Dirección", "Producción", "Entrega"].map((name, index) => <div className={index === 1 ? styles.phaseActive : ""} key={name}><i>0{index + 1}</i><span><strong>{name}</strong><small>{index === 0 ? "Completa" : index === 1 ? "En curso" : "Pendiente"}</small></span><b>{index === 0 ? "✓" : index === 1 ? "42%" : "—"}</b></div>)}</article>
      <ProgressCard value={42} label="Avance autorizado" />
      <MediaCard title="Proyecto 01" meta="Vista autorizada" />
      <article className={styles.servicesCard}><CardTop title="Servicios incluidos" meta="Alcance visible" action="03" /><div>{["Servicio incluido 01", "Servicio incluido 02", "Servicio incluido 03"].map((item, index) => <span key={item}><i>0{index + 1}</i><strong>{item}</strong><small>Estado por conectar</small></span>)}</div></article>
    </div>
  );
}

function ContractPanel() {
  return (
    <div className={styles.contractLayout}>
      <article className={styles.contractHero}><div><small>CONTRATO / DOCUMENTOS</small><h2>Archivos del proyecto</h2><p>La estructura está lista para versiones autorizadas, fechas y descargas.</p></div><span>↧</span></article>
      <section className={styles.documentGrid}>{["Contrato", "Alcance", "Entregables"].map((title, index) => <article className={styles.card} key={title}><span>0{index + 1}</span><div><strong>{title}</strong><small>{index === 0 ? "Descarga no disponible" : "Archivo pendiente"}</small></div><button disabled type="button">—</button></article>)}</section>
    </div>
  );
}

function CardTop({ title, meta, action }: { title: string; meta: string; action: ReactNode }) {
  return <header className={styles.cardTop}><span><strong>{title}</strong><small>{meta}</small></span><b>{action}</b></header>;
}

function SoftwareMark({ tool }: { tool: Software }) {
  return <i className={styles.softwareMark}>{tool.mark}</i>;
}

function Avatar({ image, initials }: { image: string | null; initials: string }) {
  return <i className={styles.avatar}>{image ? <img src={image} alt="Fotografía de perfil" /> : initials}</i>;
}
