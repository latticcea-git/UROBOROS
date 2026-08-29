"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { bookProjects } from "../book/book-data";
import styles from "./sound.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const Antigravity = dynamic(() => import("../book/antigravity"), { ssr: false });
const completedProjects = bookProjects.filter((project) => project.node === "sound");

const services = [
  "Grabación en estudio",
  "Sonido directo en set",
  "Postproducción de audio",
  "Diseño sonoro",
  "Musicalización",
  "Mezcla y mastering",
  "Podcast y radio digital",
] as const;

const equipment = [
  {
    id: "postproduccion",
    index: "01",
    label: "Precisión en estudio",
    title: "Cada detalle encuentra su lugar.",
    focus: "Asesoría y dirección en grabación de voz",
    copy: "Acompañamos la interpretación, la intención y la técnica desde la toma. Después, edición, limpieza, mezcla y mastering construyen claridad, profundidad y una escucha consistente.",
    image: "/UROBOROS/assets/images/sound/studio-microphone-exploded-generated-draft-v1-4k-v1.jpg",
    alt: "Micrófono de estudio desarmado mostrando cápsula, tubo y componentes internos",
  },
  {
    id: "set",
    index: "02",
    label: "Grabación en set",
    title: "Capturamos el momento antes de que desaparezca.",
    focus: "Sonido directo",
    copy: "Sonido directo, caña y microfonía de locación preparados para conservar presencia, ambiente y verdad desde la toma.",
    image: "/UROBOROS/assets/images/sound/shotgun-exploded-generated-draft-v1-4k-v1.jpg",
    alt: "Micrófono shotgun con caña y deadcat desarmado mostrando sus componentes",
  },
  {
    id: "musicalizacion",
    index: "03",
    label: "Composición y musicalización",
    title: "La emoción también se diseña.",
    copy: "Música original y selección sonora concebidas para sostener el ritmo, la identidad y la intención narrativa de cada proyecto.",
    image: "/UROBOROS/assets/images/sound/keyboard-exploded-generated-draft-v1-4k-v1.jpg",
    alt: "Teclado profesional blanco desarmado mostrando teclas, circuitos y estructura interna",
  },
] as const;

type EquipmentItem = (typeof equipment)[number];

function EquipmentPanel({ item, index }: { item: EquipmentItem; index: number }) {
  return (
    <section className={styles.equipment} id={item.id} data-equipment-panel data-equipment-index={index}>
      <Image
        className={styles.equipmentImage}
        src={item.image}
        fill
        sizes="100vw"
        alt={item.alt}
        data-cinematic-image
      />
      <div className={styles.equipmentShade} data-reverse={index % 2 === 1 ? "true" : undefined} aria-hidden="true" data-cinematic-shade />
      <div className={styles.equipmentCopy} data-reverse={index % 2 === 1 ? "true" : undefined} data-cinematic-copy>
        <p><span>{item.index}</span>{item.label}</p>
        <h2>{item.title}</h2>
        <div>
          <p>{"focus" in item && <strong className={styles.equipmentFocus}>{item.focus}</strong>}{item.copy}</p>
          <a href="#contacto">Hablemos de tu proyecto <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}

export default function SoundExperience() {
  const [activeService, setActiveService] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveService((current) => (current + 1) % services.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, []);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 761px)",
      },
      (context) => {
        const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const heroCopy = root.querySelector<HTMLElement>("[data-sound-hero-copy]");
        if (heroCopy) {
          gsap.from(Array.from(heroCopy.children), {
            autoAlpha: 0,
            y: 64,
            duration: 1.25,
            stagger: .1,
            ease: "power3.out",
            delay: .12,
          });
        }

        const heroImage = root.querySelector<HTMLElement>("[data-sound-hero-image]");
        if (heroImage) {
          gsap.fromTo(heroImage, { scale: 1.055, autoAlpha: .72 }, { scale: 1, autoAlpha: 1, duration: 1.8, ease: "power3.out" });
        }

        root.querySelectorAll<HTMLElement>("[data-equipment-panel]").forEach((panel, index) => {
          const image = panel.querySelector<HTMLElement>("[data-cinematic-image]");
          const shade = panel.querySelector<HTMLElement>("[data-cinematic-shade]");
          const copy = panel.querySelector<HTMLElement>("[data-cinematic-copy]");

          if (index === 1 && image && shade && copy) {
            const pauseTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top 72%",
                toggleActions: "play none none none",
                once: true,
              },
            });
            pauseTimeline
              .fromTo(image,
                { scale: 1.055, autoAlpha: .66 },
                { scale: 1, autoAlpha: 1, duration: 1.15, ease: "power3.out" }, 0,
              )
              .fromTo(shade, { autoAlpha: 0 }, { autoAlpha: 1, duration: .65, ease: "power2.out" }, .72)
              .fromTo(Array.from(copy.children),
                { autoAlpha: 0, y: 46 },
                { autoAlpha: 1, y: 0, stagger: .08, duration: .72, ease: "power3.out" }, .88,
              );
            return;
          }

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 78%",
              toggleActions: "play none none none",
              once: true,
            },
          });

          if (image) {
            timeline.fromTo(image,
              { scale: 1.085, autoAlpha: .38, clipPath: index % 2 === 0 ? "inset(0 0 0 11%)" : "inset(0 11% 0 0)" },
              { scale: 1, autoAlpha: 1, clipPath: "inset(0 0 0 0)", duration: 1.25, ease: "power3.out" }, 0,
            );
          }

          if (copy) {
            timeline.fromTo(Array.from(copy.children),
              { autoAlpha: 0, y: 38 },
              { autoAlpha: 1, y: 0, duration: .72, stagger: .08, ease: "power2.out" }, .34,
            );
          }
        });

        const studio = root.querySelector<HTMLElement>("[data-studio-scene]");
        const studioImage = studio?.querySelector<HTMLElement>("[data-studio-image]");
        const studioShade = studio?.querySelector<HTMLElement>("[data-studio-shade]");
        const studioCopy = studio?.querySelector<HTMLElement>("[data-studio-copy]");
        if (studio && studioImage && studioShade && studioCopy) {
          const studioTrigger: ScrollTrigger.Vars = desktop
            ? {
                trigger: studio,
                start: "top top",
                end: "+=120%",
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                scrub: true,
                invalidateOnRefresh: true,
              }
            : {
                trigger: studio,
                start: "top 76%",
                toggleActions: "play none none none",
                once: true,
              };
          const studioTimeline = gsap.timeline({
            scrollTrigger: studioTrigger,
          });
          studioTimeline
            .fromTo(studioImage, { scale: 1 }, { scale: 1.095, duration: .62, ease: "none" }, 0)
            .fromTo(studioShade, { autoAlpha: 0 }, { autoAlpha: 1, duration: .2, ease: "none" }, .48)
            .fromTo(Array.from(studioCopy.children),
              { autoAlpha: 0, y: 58 },
              { autoAlpha: 1, y: 0, stagger: .07, duration: .24, ease: "power2.out" }, .58,
            );
        }

        const radioCopy = root.querySelector<HTMLElement>("[data-radio-copy]");
        if (radioCopy) {
          gsap.fromTo(Array.from(radioCopy.children), { autoAlpha: 0, x: 54 }, {
            autoAlpha: 1,
            x: 0,
            duration: .9,
            stagger: .09,
            ease: "power3.out",
            scrollTrigger: { trigger: "#radio", start: "top 76%", toggleActions: "play none none none", once: true },
          });
        }

        const postScene = root.querySelector<HTMLElement>("[data-post-scene]");
        const postCopy = postScene?.querySelector<HTMLElement>("[data-post-copy]");
        const dawWindow = postScene?.querySelector<HTMLElement>("[data-daw-window]");
        if (postScene && postCopy && dawWindow) {
          const postTimeline = gsap.timeline({
            scrollTrigger: { trigger: postScene, start: "top 76%", toggleActions: "play none none none", once: true },
          });
          postTimeline
            .fromTo(Array.from(postCopy.children), { autoAlpha: 0, y: 38 }, { autoAlpha: 1, y: 0, duration: .75, stagger: .08, ease: "power3.out" })
            .fromTo(dawWindow, { autoAlpha: 0, y: 70, scale: .965 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" }, .18);
        }

        root.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card, index) => {
          gsap.fromTo(card,
            { autoAlpha: 0, y: 100, rotateZ: index === 0 ? -1.4 : 1.4, scale: .96 },
            {
              autoAlpha: 1,
              y: 0,
              rotateZ: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 84%", toggleActions: "play none none none", once: true },
            },
          );
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      },
    );

    return () => media.revert();
  }, { scope: rootRef });

  useEffect(() => {
    const root = rootRef.current;
    const servicesSection = servicesRef.current;
    if (!root || !servicesSection || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    const depthElements = Array.from(root.querySelectorAll<HTMLElement>("[data-pointer-depth]"));
    const magneticElements = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));

    const onRootMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      depthElements.forEach((element) => {
        const depth = Number(element.dataset.pointerDepth ?? 8);
        gsap.to(element, { x: x * depth, y: y * depth, duration: .85, ease: "power3.out", overwrite: "auto" });
      });
    };

    const onServiceMove = (event: PointerEvent) => {
      const bounds = servicesSection.getBoundingClientRect();
      servicesSection.style.setProperty("--light-x", `${event.clientX - bounds.left}px`);
      servicesSection.style.setProperty("--light-y", `${event.clientY - bounds.top}px`);
    };

    const cleanups = magneticElements.map((element) => {
      const onMove = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        gsap.to(element, { rotateY: x * 5, rotateX: y * -5, x: x * 8, y: y * 8, duration: .55, ease: "power2.out", transformPerspective: 900, overwrite: "auto" });
      };
      const onLeave = () => gsap.to(element, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: .8, ease: "elastic.out(1, .45)" });
      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      return () => { element.removeEventListener("pointermove", onMove); element.removeEventListener("pointerleave", onLeave); };
    });

    root.addEventListener("pointermove", onRootMove, { passive: true });
    servicesSection.addEventListener("pointermove", onServiceMove, { passive: true });
    return () => {
      root.removeEventListener("pointermove", onRootMove);
      servicesSection.removeEventListener("pointermove", onServiceMove);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <main ref={rootRef} className={styles.root} data-node="sound">
      <section className={styles.hero} id="inicio" aria-labelledby="sound-title">
        <Image
          className={styles.heroImage}
          src="/UROBOROS/assets/images/sound/headphones-exploded-generated-draft-v1-4k-v1.jpg"
          fill
          priority
          sizes="100vw"
          alt="Audífonos morado oscuro desarmados mostrando sus componentes internos"
          data-sound-hero-image
          data-pointer-depth="14"
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.frequencyField} aria-hidden="true" data-pointer-depth="-24"><i /><i /><i /></div>
        <div className={styles.heroMeta}><span>Sound / 03</span><span>Escucha en alta definición</span></div>
        <div className={styles.heroCopy} data-sound-hero-copy>
          <p className={styles.eyebrow}>LATTICCE SOUND / Sonido que toma cuerpo</p>
          <h1 id="sound-title">Hacemos visible<br />lo que <em>se escucha.</em></h1>
          <p>Grabación, postproducción y música para construir experiencias que se sienten antes de explicarse.</p>
          <a className={styles.primaryCta} href="#contacto">Cuéntanos tu proyecto <span>↗</span></a>
        </div>
        <a className={styles.scrollCue} href="#servicios">Explorar la frecuencia <span>↓</span></a>
      </section>

      <section ref={servicesRef} className={styles.services} id="servicios" aria-labelledby="services-title">
        <Antigravity className={styles.servicesAntigravity} count={72} color="#b98aff" magnetRadius={13} ringRadius={7.5} particleSize={.92} waveAmplitude={.7} />
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.servicesMeta}><span>01 / Capacidades</span><span>Una señal / múltiples formas</span></div>
        <div className={styles.serviceDisplay}>
          <div className={styles.createPill} data-magnetic>
            <span aria-hidden="true">＋</span>
            <strong id="services-title">CREAR</strong>
          </div>
          <div className={styles.serviceBeam} aria-hidden="true" />
          <p key={activeService} className={styles.activeService} aria-live="polite">{services[activeService]}</p>
        </div>
        <div className={styles.serviceSelector} aria-label="Servicios LATTICCE Sound">
          {services.map((service, index) => (
            <button
              type="button"
              key={service}
              className={index === activeService ? styles.serviceActive : ""}
              onClick={() => setActiveService(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>{service}
            </button>
          ))}
        </div>
        <a className={styles.inlineCta} href="#contacto">Agenda una cita virtual <span>↗</span></a>
      </section>

      <section className={styles.studio} id="estudio" aria-labelledby="studio-title" data-studio-scene>
        <Image
          className={styles.studioImage}
          src="/UROBOROS/assets/images/sound/home-studio-generated-draft-v1-4k-v1.jpg"
          fill
          sizes="100vw"
          alt="Estudio profesional de audio con consola, monitores y acentos de luz morada"
          data-studio-image
        />
        <div className={styles.studioShade} aria-hidden="true" data-studio-shade />
        <div className={styles.studioCopy} data-studio-copy>
          <p className={styles.eyebrow}>02 / HOME STUDIO</p>
          <h2>Un espacio para<br /><em>escuchar mejor.</em></h2>
          <p>Monitoreo preciso, acústica controlada y un entorno diseñado para grabar, editar, mezclar y tomar decisiones con confianza.</p>
          <a className={styles.primaryCta} href="#contacto">Reserva una sesión <span>↗</span></a>
        </div>
      </section>

      <div className={styles.equipmentFlow}>
        <EquipmentPanel item={equipment[0]} index={0} />
      </div>

      <section className={styles.radio} id="radio" aria-labelledby="radio-title">
        <Image
          className={styles.radioBackdrop}
          src="/UROBOROS/assets/images/sound/podcast-silhouettes-generated-draft-v1-4k-v1.jpg"
          fill
          sizes="100vw"
          alt="Tres personas en silueta grabando un podcast alrededor de micrófonos bajo contraluz violeta"
        />
        <div className={styles.radioBackdropShade} aria-hidden="true" />
        <div className={styles.radioHalo} aria-hidden="true" />
        <div className={styles.vinylStage} aria-hidden="true" data-magnetic data-pointer-depth="16">
          <div className={styles.vinyl}><i /><span /></div>
          <div className={styles.needle}><i /></div>
          <div className={styles.radioWave} />
        </div>
        <div className={styles.radioCopy} data-radio-copy>
          <p className={styles.eyebrow}>03 / radio en internet</p>
          <h2 id="radio-title">LATTICCE<br /><em>radio</em></h2>
          <p className={styles.radioInvite}>Acompáñanos.</p>
          <button className={styles.radioButton} type="button" disabled>Próximamente</button>
        </div>
      </section>

      <div className={styles.equipmentFlow}>
        <EquipmentPanel item={equipment[1]} index={1} />
      </div>

      <section className={styles.post} id="post" aria-labelledby="post-title" data-post-scene>
        <div className={styles.postGlow} aria-hidden="true" />
        <div className={styles.postCopy} data-post-copy>
          <p className={styles.eyebrow}>04 / POSTPRODUCCIÓN</p>
          <h2 id="post-title">De la toma<br />a la <em>forma final.</em></h2>
          <p>Edición, limpieza, diseño sonoro, mezcla y mastering dentro de un flujo preciso, preparado para cada pantalla, espacio y sistema de escucha.</p>
        </div>
        <div className={styles.dawWindow} data-daw-window aria-label="Visualización de una sesión de postproducción de audio">
          <div className={styles.dawTopbar}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <span>SESIÓN / POST 48 KHZ</span>
            <span>00:01:42:18</span>
          </div>
          <div className={styles.dawRuler} aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => <span key={index}>{String(index + 1).padStart(2, "0")}</span>)}
          </div>
          <div className={styles.dawBody}>
            <aside className={styles.dawSidebar} aria-hidden="true">
              <span>VOZ</span><span>AMB</span><span>FX</span><span>MUS</span><span>MASTER</span>
            </aside>
            <div className={styles.dawTracks} aria-hidden="true">
              {["VOZ PRINCIPAL", "DIÁLOGO LIMPIO", "AMBIENTE", "DISEÑO SONORO", "MÚSICA"].map((track, trackIndex) => (
                <div className={styles.dawTrack} key={track}>
                  <div className={styles.dawTrackMeta}><span>{track}</span><i /><i /></div>
                  <div className={styles.dawWaveform}>
                    {Array.from({ length: 54 }, (_, barIndex) => {
                      const level = 18 + ((barIndex * 17 + trackIndex * 23) % 72);
                      return <i key={barIndex} style={{ height: `${level}%` }} />;
                    })}
                  </div>
                </div>
              ))}
              <div className={styles.dawPlayhead} />
            </div>
          </div>
          <div className={styles.dawTransport} aria-hidden="true"><span>■</span><span>◀</span><strong>▶</strong><span>▶</span><i /></div>
        </div>
      </section>

      <div className={styles.equipmentFlow}>
        <EquipmentPanel item={equipment[2]} index={2} />
      </div>

      <section className={styles.projects} id="proyectos" aria-labelledby="projects-title">
        <Antigravity className={styles.projectsAntigravity} count={56} color="#9f68e7" magnetRadius={12} ringRadius={6} particleSize={.7} waveAmplitude={.55} />
        <div className={styles.projectsHeader}>
          <p className={styles.eyebrow}>05 / PROYECTOS TERMINADOS</p>
          <h2 id="projects-title">ARCHIVO<br /><em>sound</em></h2>
          <p>Una selección de experiencias donde grabación, producción y espacio se convierten en una escucha concreta.</p>
          <Link className={styles.archiveLink} href="/book#sound">Ver todo el archivo <span>↗</span></Link>
        </div>
        <div className={styles.projectGrid}>
          {completedProjects.map((project, index) => (
            <Link className={styles.projectCard} href={`/book/${project.slug}`} key={project.slug} data-project-card data-magnetic>
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                style={{ objectPosition: project.imagePosition }}
              />
              <span className={styles.projectShade} aria-hidden="true" />
              <span className={styles.projectIndex}>{String(index + 1).padStart(2, "0")} / {String(completedProjects.length).padStart(2, "0")}</span>
              <div className={styles.projectCopy}>
                <p>{project.category} / {project.year}</p>
                <h3>{project.title}</h3>
                <span>Ver proyecto <i aria-hidden="true">↗</i></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="contacto" aria-labelledby="contact-title">
        <div className={styles.contactWave} aria-hidden="true"><i /><i /><i /><i /></div>
        <p className={styles.eyebrow}>Tu proyecto / nuestra escucha</p>
        <h2 id="contact-title">Agenda tu cita virtual.<br /><em>Asesoramos tu proyecto.</em></h2>
        <p>Cuéntanos qué quieres hacer sonar. Encontraremos contigo el proceso, el equipo y la escala adecuados.</p>
        <a className={styles.contactButton} href="#contacto">Comenzar conversación <span>↗</span></a>
      </section>
    </main>
  );
}
