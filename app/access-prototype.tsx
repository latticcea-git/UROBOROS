"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import styles from "./access.module.css";

type Role = "colaborador" | "cliente";

const roles: Record<Role, { label: string; title: string; description: string; hint: string; route: string }> = {
  colaborador: {
    label: "Colaborador",
    title: "Tu centro de trabajo.",
    description: "Herramientas, anuncios, aprendizaje y una identidad dentro del sistema LATTICCE.",
    hint: "Accede con tu identidad @latticce.com.",
    route: "/colaboradores",
  },
  cliente: {
    label: "Cliente",
    title: "Tu proyecto, en un solo lugar.",
    description: "Consulta el avance, equipo, contrato, servicios y notificaciones de tu proyecto.",
    hint: "Accede con el correo asociado a tu proyecto.",
    route: "/clientes",
  },
};

export default function AccessPrototype() {
  const [role, setRole] = useState<Role>("colaborador");
  const [mode, setMode] = useState<"entrar" | "registro">("entrar");
  const [submitted, setSubmitted] = useState(false);
  const current = roles[role];

  useEffect(() => {
    const documentRoot = document.documentElement;
    const pageBody = document.body;
    const previousRootOverflow = documentRoot.style.overflow;
    const previousBodyOverflow = pageBody.style.overflow;
    const previousBodyHeight = pageBody.style.height;

    // Safari can retain the Home scroll lock after a client-side route change.
    documentRoot.style.overflow = "auto";
    pageBody.style.overflow = "auto";
    pageBody.style.height = "auto";

    return () => {
      documentRoot.style.overflow = previousRootOverflow;
      pageBody.style.overflow = previousBodyOverflow;
      pageBody.style.height = previousBodyHeight;
    };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className={styles.access}>
      <div className={styles.glow} />
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Volver al inicio de LATTICCE">LATTICCE</Link>
        <span className={styles.local}>PROTOTIPO LOCAL · 01</span>
      </header>

      <section className={styles.layout} aria-labelledby="access-title">
        <div className={styles.intro}>
          <p className="eyebrow">Área privada</p>
          <h1 id="access-title">Elige cómo<br />entras al sistema.</h1>
          <p className={styles.introText}>Dos experiencias, una misma estructura. Tu acceso determina las herramientas y la información que verás.</p>
          <div className={styles.identityNote}>
            <span aria-hidden="true">✦︎</span>
            <p>Las identidades <strong>@latticce.com</strong> se asignarán a colaboradores autorizados. Este flujo es una demostración visual; aún no crea cuentas.</p>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelTop}>
            <div className={styles.modeTabs} role="tablist" aria-label="Acceso o registro">
              <button className={mode === "entrar" ? styles.activeTab : ""} onClick={() => { setMode("entrar"); setSubmitted(false); }} role="tab" aria-selected={mode === "entrar"}>Entrar</button>
              <button className={mode === "registro" ? styles.activeTab : ""} onClick={() => { setMode("registro"); setSubmitted(false); }} role="tab" aria-selected={mode === "registro"}>Registrarme</button>
            </div>
            <span className={styles.step}>01 / 02</span>
          </div>

          <div className={styles.rolePicker} aria-label="Tipo de cuenta">
            {(Object.keys(roles) as Role[]).map((item) => (
              <button key={item} className={`${styles.roleCard} ${role === item ? styles.selected : ""}`} onClick={() => { setRole(item); setSubmitted(false); }} aria-pressed={role === item}>
                <span className={styles.roleMark}>{item === "colaborador" ? "01" : "02"}</span>
                <span>
                  <strong>{roles[item].label}</strong>
                  <small>{item === "colaborador" ? "Trabajo interno" : "Seguimiento de proyecto"}</small>
                </span>
              </button>
            ))}
          </div>

          {submitted ? (
            <div className={styles.success} role="status">
              <span>✓︎</span>
              <div>
                <p>{mode === "entrar" ? "Acceso simulado listo." : "Solicitud simulada recibida."}</p>
                <small>En la versión final se verificará tu identidad y tus permisos antes de mostrar contenido privado.</small>
              </div>
              <Link href={current.route}>Ver portal {current.label.toLowerCase()}</Link>
            </div>
          ) : (
            <form onSubmit={submit} className={styles.form}>
              <div className={styles.context}>
                <p>{current.title}</p>
                <small>{current.description}</small>
              </div>
              {mode === "registro" && (
                <label>
                  Nombre completo
                  <input required name="name" autoComplete="name" placeholder="Tu nombre" />
                </label>
              )}
              <label>
                {role === "colaborador" ? "Correo de trabajo" : "Correo asociado al proyecto"}
                <input required type="email" name="email" autoComplete="email" placeholder={role === "colaborador" ? "nombre@latticce.com" : "nombre@empresa.com"} />
              </label>
              {mode === "registro" && role === "cliente" && (
                <label>
                  Empresa o marca
                  <input required name="company" placeholder="Nombre de la empresa" />
                </label>
              )}
              <label>
                Contraseña
                <input required type="password" name="password" autoComplete={mode === "entrar" ? "current-password" : "new-password"} placeholder="••••••••••" />
              </label>
              <p className={styles.hint}>{current.hint}</p>
              <button className={styles.submit} type="submit">{mode === "entrar" ? "Entrar al portal" : role === "colaborador" ? "Solicitar identidad" : "Solicitar acceso"}<span aria-hidden="true">↗︎</span></button>
              {mode === "entrar" && <button className={styles.textButton} type="button" onClick={() => setSubmitted(true)}>¿Olvidaste tu contraseña?</button>}
            </form>
          )}
          <p className={styles.legal}>Al continuar aceptas los términos y políticas aplicables. La autorización real dependerá de tu relación con LATTICCE.</p>
        </div>
      </section>
    </main>
  );
}
