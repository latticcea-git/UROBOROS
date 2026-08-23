import type { Metadata } from "next";
import Link from "next/link";
import styles from "./prueba-acceso.module.css";

export const metadata: Metadata = {
  title: "Prueba de acceso — LATTICCE",
  description: "Home de prueba local para el acceso privado de LATTICCE.",
};

export default function AccessHomeTestPage() {
  return (
    <main className={styles.home}>
      <div className={styles.haze} aria-hidden="true" />
      <header className={styles.header}>
        <Link className={styles.userIcon} href="/usuario" aria-label="Abrir área de usuario">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" /><path d="M4.8 20c.75-3.35 3.2-5.15 7.2-5.15s6.45 1.8 7.2 5.15" /></svg>
          <span>Área de usuario</span>
        </Link>
        <p className={styles.logo}>LATTICCE</p>
        <span className={styles.testLabel}>HOME DE PRUEBA · LOCAL</span>
      </header>

      <section className={styles.hero}>
        <p className="eyebrow">Acceso integrado sin tocar el Home público</p>
        <h1>Una idea.<br /><em>Muchas formas</em><br />de hacerla real.</h1>
        <p>Este entorno simula la posición final del icono de usuario. El enlace abre el flujo de acceso para colaboradores y clientes.</p>
        <Link href="/usuario" className={styles.enter}>Probar inicio de sesión <span>↗</span></Link>
      </section>

      <aside className={styles.note}>
        <span>01</span>
        <p>Ruta aislada: <code>/prueba-acceso</code>. No modifica <code>/</code> ni sus componentes.</p>
      </aside>
    </main>
  );
}
