import type { StaticImageData } from "next/image";
import filmsLogo from "../../LOGO X NODOS/FILMS/png/LTT_FILMS_LOGO_1920_FX.png";

export type BlogNodeId = "films" | "studio" | "sound" | "design" | "agency" | "time";

export type BlogNode = {
  id: BlogNodeId;
  name: string;
  index: string;
  logo: string | StaticImageData;
  territory: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  dek: string;
  node: BlogNodeId;
  category: string;
  date: string;
  displayDate: string;
  readingTime: string;
  author: string;
  image: string;
  imagePosition?: string;
  alt: string;
  priority: "lead" | "wide" | "portrait" | "standard";
  keywords: string[];
};

export const blogNodes: BlogNode[] = [
  {
    id: "films",
    name: "Films",
    index: "01",
    logo: filmsLogo,
    territory: "Cinematografía",
  },
  {
    id: "studio",
    name: "Studio",
    index: "02",
    logo: "/UROBOROS/assets/logos/LTT_STUDIO_LOGO_1920_FX.png",
    territory: "Técnica, equipo y procesos",
  },
  {
    id: "sound",
    name: "Sound",
    index: "03",
    logo: "/UROBOROS/assets/logos/LTT_SOUND_LOGO_1920_FX.png",
    territory: "Escucha, vibración y materia",
  },
  {
    id: "design",
    name: "Design",
    index: "04",
    logo: "/UROBOROS/assets/logos/LTT_DESIGN_LOGO_1920_FX.png",
    territory: "Forma, función y lenguaje visual",
  },
  {
    id: "agency",
    name: "Agency",
    index: "05",
    logo: "/UROBOROS/assets/logos/LTT_AGENCY_LOGO_1920_FX.png",
    territory: "Estrategia, marca y comunicación",
  },
  {
    id: "time",
    name: "Time",
    index: "06",
    logo: "/UROBOROS/assets/logos/LTT_TIME_LOGO_1920_FX.png",
    territory: "Memoria, oficio y cultura",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "el-cine-existe-antes-de-la-camara",
    title: "El cine existe antes de la cámara",
    dek: "Una mirada sobre la intención, el espacio y el tiempo que preceden a cualquier decisión técnica.",
    node: "films",
    category: "Narrativa visual",
    date: "2026-08-24",
    displayDate: "24.08.26",
    readingTime: "8 min",
    author: "LATTICCE Films",
    image: "/UROBOROS/assets/images/book/studio-fase-roja-v1.jpg",
    imagePosition: "center 44%",
    alt: "Intérprete avanzando por un corredor brutalista atravesado por una luz roja.",
    priority: "lead",
    keywords: ["cine", "dirección", "puesta en escena", "narrativa", "cámara"],
  },
  {
    slug: "la-luz-no-ilumina-revela",
    title: "La luz no ilumina. Revela.",
    dek: "Cómo construir profundidad y atención con menos fuentes y decisiones más precisas.",
    node: "studio",
    category: "Tips técnicos",
    date: "2026-08-19",
    displayDate: "19.08.26",
    readingTime: "6 min",
    author: "LATTICCE Studio",
    image: "/UROBOROS/assets/images/book/studio-ritual-luz-v1.jpg",
    alt: "Cantante bajo dos haces blancos en un escenario oscuro.",
    priority: "portrait",
    keywords: ["iluminación", "set", "fotografía", "contraste", "luz"],
  },
  {
    slug: "cuando-el-sonido-ocupa-el-espacio",
    title: "Cuando el sonido ocupa el espacio",
    dek: "Diseñar una escucha física exige pensar en distancia, dirección y materia.",
    node: "sound",
    category: "Diseño sonoro",
    date: "2026-08-12",
    displayDate: "12.08.26",
    readingTime: "7 min",
    author: "LATTICCE Sound",
    image: "/UROBOROS/assets/images/book/sound-frecuencia-mineral-v1.jpg",
    alt: "Ingeniero frente a una consola bajo altavoces suspendidos en una sala negra.",
    priority: "standard",
    keywords: ["sonido", "espacio", "mezcla", "vibración", "instalación"],
  },
  {
    slug: "disenar-desde-la-materia",
    title: "Diseñar desde la materia",
    dek: "Antes de ser aplicación, una identidad puede ser peso, reflejo, textura y resistencia.",
    node: "design",
    category: "Diseño gráfico",
    date: "2026-08-07",
    displayDate: "07.08.26",
    readingTime: "5 min",
    author: "LATTICCE Design",
    image: "/UROBOROS/assets/images/book/design-materia-v1.jpg",
    alt: "Sistema visual experimental hecho con metal, papel, resina y tramas.",
    priority: "wide",
    keywords: ["identidad", "materialidad", "tipografía", "sistema", "diseño"],
  },
  {
    slug: "una-marca-es-una-forma-de-decidir",
    title: "Una marca es una forma de decidir",
    dek: "La estrategia se vuelve útil cuando reduce ruido y hace visible una postura.",
    node: "agency",
    category: "Estrategia",
    date: "2026-07-29",
    displayDate: "29.07.26",
    readingTime: "9 min",
    author: "LATTICCE Agency",
    image: "/UROBOROS/assets/images/book/agency-archivo-v1.jpg",
    alt: "Equipo creativo revisando imágenes sobre una mesa en un estudio oscuro.",
    priority: "standard",
    keywords: ["marca", "estrategia", "posicionamiento", "decisiones", "comunicación"],
  },
  {
    slug: "la-memoria-no-es-un-resumen",
    title: "La memoria no es un resumen",
    dek: "Fotografiar un momento es conservar su temperatura, sus silencios y sus pequeñas distancias.",
    node: "time",
    category: "Reflexiones",
    date: "2026-07-18",
    displayDate: "18.07.26",
    readingTime: "6 min",
    author: "LATTICCE Time",
    image: "/UROBOROS/assets/images/book/time-mariana-leo-v1.jpg",
    alt: "Pareja caminando de la mano en un patio de concreto después de la lluvia.",
    priority: "wide",
    keywords: ["memoria", "fotografía", "tiempo", "archivo", "intimidad"],
  },
  {
    slug: "dirigir-es-organizar-la-atencion",
    title: "Dirigir es organizar la atención",
    dek: "La puesta en escena no agrega información: decide qué debe permanecer en la mirada.",
    node: "films",
    category: "Dirección",
    date: "2026-07-09",
    displayDate: "09.07.26",
    readingTime: "10 min",
    author: "LATTICCE Films",
    image: "/UROBOROS/assets/images/book/agency-sistema-cero-v1.jpg",
    alt: "Dos personas observan proyecciones en una sala de control monumental.",
    priority: "portrait",
    keywords: ["dirección", "actores", "puesta en escena", "cine", "atención"],
  },
  {
    slug: "el-archivo-como-herramienta-viva",
    title: "El archivo como herramienta viva",
    dek: "Guardar no basta: una colección sólo cobra sentido cuando permite nuevas relaciones.",
    node: "design",
    category: "Recursos",
    date: "2026-06-26",
    displayDate: "26.06.26",
    readingTime: "4 min",
    author: "LATTICCE Design",
    image: "/UROBOROS/assets/images/book/design-archivo-naranja-v1.jpg",
    alt: "Libro de artista abierto con papeles translúcidos y acentos naranjas.",
    priority: "standard",
    keywords: ["archivo", "recursos", "editorial", "sistema", "memoria"],
  },
];

export function getBlogNode(id: BlogNodeId) {
  return blogNodes.find((node) => node.id === id)!;
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
