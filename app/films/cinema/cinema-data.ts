export type CinemaSource =
  | { kind: "privateStream"; playbackKey: string; localPreviewSrc?: string }
  | { kind: "youtube"; embedUrl: string; externalUrl?: string }
  | { kind: "instagram"; embedUrl: string; externalUrl: string }
  | { kind: "externalLink"; url: string };

export type CinemaWork = {
  slug: string;
  title: string;
  year: string;
  author: string;
  synopsis: string;
  poster: string;
  posterAlt: string;
  category: "obra" | "videoclip" | "performance" | "comercial" | "reel" | "otro";
  technicalSheet: Array<{ label: string; value: string }>;
  source: CinemaSource;
  published: boolean;
  accent?: string;
};

export const cinemaWorks: CinemaWork[] = [
  {
    slug: "escila-2018",
    title: "ESCILA",
    year: "2018",
    author: "EMMANUEL NIETO FLORES",
    synopsis:
      "Ulises se ve inmerso en la confusión de un tortuoso desprendimiento emocional. Su fuerte determinación de confrontarse y observarse a sí mismo lo mantendrán desnudo ante la verdad.",
    poster: "/UROBOROS/assets/images/films/cinema/escila-poster-provisional-v1.jpg",
    posterAlt: "Fotograma provisional de ESCILA",
    category: "obra",
    technicalSheet: [
      { label: "OBRA", value: "ESCILA" },
      { label: "AÑO", value: "2018" },
      { label: "AUTOR", value: "EMMANUEL NIETO FLORES" },
    ],
    source: {
      kind: "externalLink",
      url: "https://filmfreeway.com/ESCILA-ShortFilm",
    },
    published: true,
    accent: "210, 229, 234",
  },
  {
    slug: "hierba-mala",
    title: "HIERBA MALA",
    year: "—",
    author: "EMMANUEL NIETO FLORES",
    synopsis:
      "En el registro y clasificación de la flora se usa el término “Hierba Mala” para generalizar a las plantas que desde el punto de vista estético y funcional no debiesen obtener una nomenclatura. Este tipo de vegetación crece de forma espontánea en casi cualquier lugar, por su alta capacidad de adaptación al entorno y durabilidad. Incluso según el contexto pueden llegar a ser considerada como mal habidas.",
    poster: "/UROBOROS/assets/images/films/cinema/hierba-mala-poster.jpg",
    posterAlt: "Cartel de HIERBA MALA",
    category: "obra",
    technicalSheet: [
      { label: "OBRA", value: "HIERBA MALA" },
      { label: "AUTOR", value: "EMMANUEL NIETO FLORES" },
    ],
    source: {
      kind: "externalLink",
      url: "https://filmfreeway.com/HIERBAMALA-SHORT-FILM",
    },
    published: true,
    accent: "78, 255, 111",
  },
  {
    slug: "interludio",
    title: "INTERLUDIO",
    year: "2026",
    author: "LATTICCE FILMS",
    synopsis:
      "Una presencia atraviesa la sala después de la última proyección. La luz permanece unos instantes más, suspendida sobre el espacio vacío.",
    poster: "/UROBOROS/assets/images/films/cinema/cinema-auditorium-generated-draft-v1.jpg",
    posterAlt: "Sala de cine de INTERLUDIO, obra de ejemplo",
    category: "otro",
    technicalSheet: [
      { label: "OBRA", value: "INTERLUDIO" },
      { label: "AÑO", value: "2026" },
      { label: "AUTOR", value: "LATTICCE FILMS" },
    ],
    source: { kind: "privateStream", playbackKey: "interludio" },
    published: true,
    accent: "222, 204, 171",
  },
  {
    slug: "alejate-los-chicklets",
    title: "ALEJATE",
    year: "—",
    author: "LOS CHICKLETS",
    synopsis:
      "En los bordes de Coacalco, una despedida se transforma en recorrido. La ciudad, el concreto y la distancia acompañan una canción que busca romper el último vínculo antes de volver a mirar atrás.",
    poster: "/UROBOROS/assets/images/films/cinema/alejate-instagram-cover.jpg",
    posterAlt: "Fotograma del videoclip ALEJATE",
    category: "videoclip",
    technicalSheet: [
      { label: "TÍTULO", value: "ALEJATE" },
      { label: "ARTISTA", value: "LOS CHICKLETS" },
      { label: "PRODUCCIÓN", value: "LATTICCE STUDIO" },
      { label: "LOCACIÓN", value: "COACALCO, EDOMEX" },
    ],
    source: {
      kind: "instagram",
      embedUrl: "https://www.instagram.com/reel/DUtvY1-ieH8/embed/",
      externalUrl: "https://www.instagram.com/reel/DUtvY1-ieH8/",
    },
    published: true,
    accent: "255, 218, 72",
  },
  {
    slug: "peculiar-karell",
    title: "PECULIAR",
    year: "—",
    author: "KARELL",
    synopsis:
      "Reforma aparece como una línea encendida que divide la noche. Entre reflejos, tránsito y arquitectura, KARELL avanza dentro de una ciudad que multiplica su presencia y vuelve extraordinario cada gesto cotidiano.",
    poster: "/UROBOROS/assets/images/films/cinema/peculiar-instagram-cover.jpg",
    posterAlt: "Fotograma del videoclip PECULIAR",
    category: "videoclip",
    technicalSheet: [
      { label: "TÍTULO", value: "PECULIAR" },
      { label: "ARTISTA", value: "KARELL" },
      { label: "PRODUCCIÓN", value: "LATTICCE STUDIO" },
      { label: "LOCACIÓN", value: "REFORMA, CDMX" },
    ],
    source: {
      kind: "instagram",
      embedUrl: "https://www.instagram.com/reel/DQaSzpfiYfJ/embed/",
      externalUrl: "https://www.instagram.com/reel/DQaSzpfiYfJ/",
    },
    published: true,
    accent: "255, 73, 73",
  },
  {
    slug: "hecho-para-ti-performance",
    title: "HECHO PARA TI",
    year: "—",
    author: "JIMENA @HERMIDA",
    synopsis:
      "El cuerpo responde a la música como si recordara algo que todavía no sucede. La interpretación de Jimena ocupa el espacio con proximidad, pausa y movimiento, construyendo una presencia hecha para un solo instante.",
    poster: "/UROBOROS/assets/images/films/cinema/hecho-para-ti-instagram-cover.jpg",
    posterAlt: "Fotograma del performance HECHO PARA TI",
    category: "performance",
    technicalSheet: [
      { label: "PIEZA", value: "HECHO PARA TI" },
      { label: "PERFORMANCE", value: "JIMENA @HERMIDA" },
      { label: "MÚSICA", value: "LATIN MAFIA — HECHO PARA TI" },
    ],
    source: {
      kind: "instagram",
      embedUrl: "https://www.instagram.com/reel/DOr0hRJiWgr/embed/",
      externalUrl: "https://www.instagram.com/reel/DOr0hRJiWgr/",
    },
    published: true,
    accent: "25, 94, 62",
  },
];

export const publishedCinemaWorks = cinemaWorks.filter((work) => work.published);

export function getCinemaWork(slug: string) {
  return publishedCinemaWorks.find((work) => work.slug === slug);
}
