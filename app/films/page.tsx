import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./films.module.css";

export const metadata: Metadata = {
  title: "LATTICCE FILMS — Página en construcción",
  description: "El universo de LATTICCE FILMS está en construcción.",
  robots: { index: false, follow: false, nocache: true },
};

export default function FilmsPage() {
  return <main className={styles.root}>
    <div className={styles.landscape} aria-hidden="true" />
    <div className={styles.atmosphere} aria-hidden="true" />

    <p className={styles.route}>LATTICCE / LATTICCE FILMS</p>

    <section className={styles.signal} aria-labelledby="films-construction-title">
      <span>SEÑAL EN PROCESO / 2026</span>
      <Image src="/UROBOROS/assets/logos/LTT_FILMS_LOGO_1920_FX.png" width={1920} height={503} priority alt="LATTICCE FILMS" />
      <h1 id="films-construction-title">PÁGINA EN<br />CONSTRUCCIÓN</h1>
      <p>Estamos construyendo el espacio completo de LATTICCE FILMS. Mientras tanto, el archivo CINNEMA permanece abierto.</p>
      <nav aria-label="Navegación de LATTICCE FILMS">
        <Link href="/films/cinema">ENTRAR A CINNEMA <span aria-hidden="true">→︎</span></Link>
        <Link href="/">VOLVER AL HOME</Link>
      </nav>
    </section>

    <footer><span>IMAGEN · TIEMPO · NARRATIVA</span><span>CIUDAD DE MÉXICO</span></footer>
  </main>;
}
