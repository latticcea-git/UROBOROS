import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.root}>
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.beam} />
        <div className={styles.prism} />
        <div className={styles.ring} />
        <div className={styles.haze} />
      </div>

      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="LATTICCE, volver al inicio">
          <span className={styles.logoLight} aria-hidden="true" />
          <Image
            src="/UROBOROS/assets/logos/LTT_LOGO_NEG.svg"
            width={246}
            height={47}
            alt="LATTICCE"
            priority
          />
        </Link>
        <span>404 / LATTICCE</span>
      </header>

      <div className={styles.content}>
        <p className={styles.number} aria-hidden="true">404</p>
        <section className={styles.panel} aria-labelledby="not-found-title">
          <span className={styles.panelGlow} aria-hidden="true" />
          <p className={styles.eyebrow}>Ruta no encontrada</p>
          <h1 id="not-found-title">Esta ruta no existe.</h1>
          <p className={styles.copy}>
            Puede que haya cambiado de forma, o que todavía no pertenezca al sistema.
          </p>
          <Link className={styles.cta} href="/">
            Volver al inicio <span aria-hidden="true">↗︎</span>
          </Link>
        </section>
      </div>

      <footer className={styles.footer}>
        <span>Sistema creativo independiente</span>
        <span>Ciudad de México · 2026</span>
      </footer>
    </main>
  );
}
