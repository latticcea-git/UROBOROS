export type NodeId = "agency" | "studio" | "sound" | "design" | "time";

export type BookNode = {
  id: NodeId;
  index: string;
  name: string;
  statement: string;
  description: string;
  logo: string;
};

export type BookProject = {
  slug: string;
  title: string;
  node: NodeId;
  category: string;
  year: string;
  image: string;
  imagePosition?: string;
  alt: string;
  summary: string;
  decision: string;
  services: string[];
  credits: string[];
  featured: boolean;
  projectLabel?: string;
  status?: string;
  galleryTitle?: string;
  galleryEmphasis?: string;
  galleryDescription?: string;
  galleryFirst?: boolean;
  gallery?: Array<{
    image: string;
    alt: string;
    caption: string;
  }>;
};

export const bookNodes: BookNode[] = [
  {
    id: "agency",
    index: "01",
    name: "Agency",
    statement: "Ideas que se vuelven sistemas.",
    description: "Estrategia, campañas y ecosistemas coordinados alrededor de una intención.",
    logo: "/UROBOROS/assets/logos/LTT_AGENCY_LOGO_1920_FX.png",
  },
  {
    id: "studio",
    index: "02",
    name: "Studio",
    statement: "La realidad, dirigida.",
    description: "Fotografía y producción audiovisual construidas desde personas, luz y espacio.",
    logo: "/UROBOROS/assets/logos/LTT_STUDIO_LOGO_1920_FX.png",
  },
  {
    id: "sound",
    index: "03",
    name: "Sound",
    statement: "Lo invisible toma cuerpo.",
    description: "Grabación, mezcla y experiencias donde la vibración se vuelve materia.",
    logo: "/UROBOROS/assets/logos/LTT_SOUND_LOGO_1920_FX.png",
  },
  {
    id: "design",
    index: "04",
    name: "Design",
    statement: "La materia encuentra su forma.",
    description: "Identidad, editorial y sistemas visuales hechos para transformarse y permanecer.",
    logo: "/UROBOROS/assets/logos/LTT_DESIGN_LOGO_1920_FX.png",
  },
  {
    id: "time",
    index: "05",
    name: "Time",
    statement: "Lo vivido deja una huella.",
    description: "Memoria fotográfica y audiovisual para conservar la intimidad de un momento.",
    logo: "/UROBOROS/assets/logos/LTT_TIME_LOGO_1920_FX.png",
  },
];

export const bookProjects: BookProject[] = [
  {
    slug: "enjambre-estadio-gnp",
    title: "Enjambre",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: "/UROBOROS/assets/images/book/enjambre/enjambre-hero.jpg",
    imagePosition: "center 50%",
    alt: "Enjambre interpreta en el Estadio GNP Seguros bajo un campo de luces cálidas durante un concierto nocturno.",
    summary: "Enjambre llevó su directo al Estadio GNP Seguros de Ciudad de México durante sus fechas de 2026. Esta serie registra la relación entre la banda, la luz y una audiencia que convirtió el concierto en una experiencia colectiva.",
    decision: "Construir el relato desde la escala compartida: abrir con la pertenencia del público, acercarse al gesto de cada intérprete y volver al escenario completo. La Sony α7 IV conserva grano, color y contraste como sucedieron en la noche.",
    services: ["Fotografía de concierto", "Cobertura editorial", "Selección y curaduría", "Revelado y color"],
    credits: [
      "Artista — Enjambre",
      "Fotografía — Hernán Jiménez Herrera",
      "Cámara — Sony α7 IV",
      "Ubicación — Estadio GNP Seguros, Ciudad de México",
    ],
    featured: true,
    projectLabel: "Registro documental / Sony α7 IV",
    status: "Proyecto real",
    galleryFirst: true,
    galleryTitle: "Una noche,",
    galleryEmphasis: "en enjambre",
    galleryDescription: "La secuencia avanza del público a la presencia escénica y termina en una imagen de comunidad, sin reconstruir la energía del directo.",
    gallery: [
      {
        image: "/UROBOROS/assets/images/book/enjambre/enjambre-gallery-01.jpg",
        alt: "Asistente sostiene una manta de Enjambre entre el público del Estadio GNP Seguros.",
        caption: "Pertenencia / Apertura",
      },
      {
        image: "/UROBOROS/assets/images/book/enjambre/enjambre-gallery-02.jpg",
        alt: "Integrante de Enjambre canta frente a una pantalla cian y magenta durante el concierto.",
        caption: "Color y gesto / Pulso",
      },
      {
        image: "/UROBOROS/assets/images/book/enjambre/enjambre-gallery-03.jpg",
        alt: "Vocalista de Enjambre canta bajo un campo de luces en blanco y negro.",
        caption: "Voz y constelación / Centro",
      },
      {
        image: "/UROBOROS/assets/images/book/enjambre/enjambre-gallery-04.jpg",
        alt: "Escenario de Enjambre visto en escala amplia bajo luces circulares y humo.",
        caption: "Escenario / Escala",
      },
      {
        image: "/UROBOROS/assets/images/book/enjambre/enjambre-gallery-05.jpg",
        alt: "La banda Enjambre comparte el escenario en una imagen panorámica en blanco y negro.",
        caption: "Banda completa / Encuentro",
      },
      {
        image: "/UROBOROS/assets/images/book/enjambre/enjambre-gallery-06.jpg",
        alt: "Dos asistentes con trajes de abeja celebran dentro del público del concierto de Enjambre.",
        caption: "Comunidad / Cierre",
      },
    ],
  },
  {
    slug: "maria-daniela-y-su-sonido-lasser",
    title: "María Daniela y Su Sonido Lasser",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: "/UROBOROS/assets/images/book/mdyssl/mdyssl-hero.jpg",
    imagePosition: "center 58%",
    alt: "María Daniela canta ante un público lleno entre luz amarilla, verde y azul durante un concierto nocturno.",
    summary: "María Daniela Azpiazu y Emilio Acevedo llevan el electropop mexicano a una pista donde sintetizadores, humor y coros se vuelven memoria colectiva.",
    decision: "Construir la noche desde la relación entre intérprete, luz y audiencia. El registro con Sony α7 IV conserva la mezcla de azules, amarillos y humo, aceptando movimiento y grano como parte de la energía real del concierto.",
    services: ["Fotografía de concierto", "Cobertura editorial", "Selección y curaduría", "Revelado y color"],
    credits: [
      "Artista — María Daniela y Su Sonido Lasser",
      "Integrantes — María Daniela Azpiazu y Emilio Acevedo",
      "Fotografía — LATTICCE Studio",
      "Cámara — Sony α7 IV (ILCE-7M4)",
    ],
    featured: true,
    projectLabel: "Registro documental / Sony α7 IV",
    status: "Proyecto real",
    galleryTitle: "Una noche,",
    galleryEmphasis: "seis pulsos",
    galleryDescription: "La secuencia abre el espacio, se acerca al gesto y vuelve a la pista. Luz, movimiento y público organizan el relato sin reconstruir lo que ocurrió.",
    gallery: [
      {
        image: "/UROBOROS/assets/images/book/mdyssl/mdyssl-gallery-01.jpg",
        alt: "Escenario azul de María Daniela y Su Sonido Lasser visto sobre las cabezas del público.",
        caption: "Escenario y público / Apertura",
      },
      {
        image: "/UROBOROS/assets/images/book/mdyssl/mdyssl-gallery-02.jpg",
        alt: "María Daniela canta y señala al público bajo un haz de luz amarilla.",
        caption: "Haces cálidos / Voz",
      },
      {
        image: "/UROBOROS/assets/images/book/mdyssl/mdyssl-gallery-03.jpg",
        alt: "María Daniela sonríe mientras canta frente a una pantalla azul y magenta.",
        caption: "Proximidad / Coro",
      },
      {
        image: "/UROBOROS/assets/images/book/mdyssl/mdyssl-gallery-04.jpg",
        alt: "Vista amplia del concierto bajo haces cian con el público en primer plano.",
        caption: "Baño azul / Escala",
      },
      {
        image: "/UROBOROS/assets/images/book/mdyssl/mdyssl-gallery-05.jpg",
        alt: "María Daniela en el escenario frente a una multitud iluminada por tonos amarillos y verdes.",
        caption: "Pista y escenario / Clímax",
      },
      {
        image: "/UROBOROS/assets/images/book/mdyssl/mdyssl-gallery-06.jpg",
        alt: "María Daniela abre el brazo hacia el público bajo una intensa luz azul.",
        caption: "Gesto y respuesta / Cierre",
      },
    ],
  },
  {
    slug: "surfistas-del-sistema",
    title: "Surfistas del Sistema",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: "/UROBOROS/assets/images/book/surfistas/surfistas-hero.jpg",
    imagePosition: "center 50%",
    alt: "Dos músicos de Surfistas del Sistema tocan espalda con espalda entre humo y luz blanca durante su concierto en el Pepsi Center.",
    summary: "Surfistas del Sistema, proyecto argentino liderado por Fran Frione junto a Cisco Achával y Rama Vázquez, ha llevado su cruce de indie pop y synth-pop por Latinoamérica. En el Pepsi Center, ese pulso se volvió coro, luz y movimiento.",
    decision: "Dejar que la energía del directo ordene el relato: la cercanía del gesto, la relación entre músicos y la escala del escenario aparecen sin reconstruir la noche.",
    services: ["Fotografía de concierto", "Cobertura editorial", "Selección y curaduría", "Revelado y color"],
    credits: [
      "Artista — Surfistas del Sistema",
      "Fotografía — Hernán Jiménez Herrera",
      "Cámara — Sony α7 IV",
      "Ubicación — Pepsi Center, Ciudad de México",
    ],
    featured: true,
    projectLabel: "Registro documental / Sony α7 IV",
    status: "Proyecto real",
    galleryFirst: true,
    galleryTitle: "Una noche de",
    galleryEmphasis: "surfear el sistema",
    galleryDescription: "La secuencia captura la esencia de la banda y su impacto en vivo.",
    gallery: [
      {
        image: "/UROBOROS/assets/images/book/surfistas/surfistas-gallery-01.jpg",
        alt: "Vocalista de Surfistas del Sistema canta frente a una luz roja intensa.",
        caption: "Voz y rojo / Inicio",
      },
      {
        image: "/UROBOROS/assets/images/book/surfistas/surfistas-gallery-02.jpg",
        alt: "Dos músicos tocan espalda con espalda, uno con saxofón y otro con guitarra.",
        caption: "Cuerpos e instrumentos / Cruce",
      },
      {
        image: "/UROBOROS/assets/images/book/surfistas/surfistas-gallery-03.jpg",
        alt: "Dos intérpretes comparten el escenario durante un momento en blanco y negro.",
        caption: "Encuentro / Contrapunto",
      },
      {
        image: "/UROBOROS/assets/images/book/surfistas/surfistas-gallery-04.jpg",
        alt: "Vista amplia en blanco y negro del escenario con la banda y haces de luz detrás.",
        caption: "Escenario / Escala",
      },
      {
        image: "/UROBOROS/assets/images/book/surfistas/surfistas-gallery-05.jpg",
        alt: "Intérprete canta bajo luces cálidas durante el concierto.",
        caption: "Pulso / Voz",
      },
      {
        image: "/UROBOROS/assets/images/book/surfistas/surfistas-gallery-06.jpg",
        alt: "Silueta de un intérprete frente a una luz violeta con el público al fondo.",
        caption: "Siluetas / Cierre",
      },
    ],
  },
  {
    slug: "archivo-nocturno",
    title: "Archivo nocturno",
    node: "agency",
    category: "Campañas",
    year: "2026",
    image: "/UROBOROS/assets/images/book/agency-archivo-v1.jpg",
    alt: "Equipo creativo revisando imágenes y materiales sobre una mesa en un estudio de concreto oscuro.",
    summary: "Una plataforma cultural convertida en campaña, archivo editorial y conversación pública.",
    decision: "Hacer visible la investigación antes que la publicidad: cada pieza funciona como fragmento de un archivo en expansión.",
    services: ["Estrategia de campaña", "Dirección creativa", "Sistema de contenidos", "Producción editorial"],
    credits: ["Dirección creativa — LATTICCE Agency", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: true,
  },
  {
    slug: "sistema-cero",
    title: "Sistema Cero",
    node: "agency",
    category: "Ecosistemas digitales",
    year: "2026",
    image: "/UROBOROS/assets/images/book/agency-sistema-cero-v1.jpg",
    alt: "Dos profesionales observando proyecciones abstractas en una sala de control monumental.",
    summary: "Un ecosistema digital que reúne contenido, campaña y medición bajo una sola lógica visual.",
    decision: "Sustituir la suma de canales por una sala de mando clara: una intención, múltiples superficies y una lectura común.",
    services: ["Arquitectura digital", "Campaña integrada", "Dirección de arte", "Sistema de medición"],
    credits: ["Estrategia — LATTICCE Agency", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: true,
  },
  {
    slug: "fase-roja",
    title: "Fase Roja",
    node: "studio",
    category: "Videoclip",
    year: "2026",
    image: "/UROBOROS/assets/images/book/studio-fase-roja-v1.jpg",
    alt: "Intérprete con vestido negro moviéndose en un corredor brutalista con un reflejo rojo.",
    summary: "Un videoclip construido desde arquitectura, cuerpo y una interrupción mínima de color.",
    decision: "Reducir el relato a un cuerpo atravesando espacios de presión; la luz funciona como montaje dentro del plano.",
    services: ["Dirección", "Cinematografía", "Diseño de producción", "Postproducción"],
    credits: ["Producción — LATTICCE Studio", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: true,
  },
  {
    slug: "ritual-de-luz",
    title: "Ritual de luz",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: "/UROBOROS/assets/images/book/studio-ritual-luz-v1.jpg",
    alt: "Cantante en un escenario oscuro bajo dos haces blancos y una banda en silueta.",
    summary: "Registro en vivo que conserva la fuerza física del concierto y el silencio alrededor del gesto.",
    decision: "Fotografiar la escala antes que el espectáculo: el escenario se convierte en arquitectura y el intérprete en foco humano.",
    services: ["Cobertura multicámara", "Fotografía fija", "Edición", "Piezas de lanzamiento"],
    credits: ["Producción — LATTICCE Studio", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: true,
  },
  {
    slug: "frecuencia-mineral",
    title: "Frecuencia mineral",
    node: "sound",
    category: "Instalación sonora",
    year: "2026",
    image: "/UROBOROS/assets/images/book/sound-frecuencia-mineral-v1.jpg",
    alt: "Ingeniero de sonido frente a una consola bajo altavoces suspendidos en una sala negra.",
    summary: "Una instalación espacial donde la vibración recorre un campo de altavoces suspendidos.",
    decision: "Dar peso y dirección al sonido: cada fuente ocupa una altura y convierte la escucha en recorrido físico.",
    services: ["Diseño sonoro", "Mezcla espacial", "Montaje técnico", "Dirección de experiencia"],
    credits: ["Diseño sonoro — LATTICCE Sound", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: true,
  },
  {
    slug: "sesion-umbral",
    title: "Sesión Umbral",
    node: "sound",
    category: "Producción musical",
    year: "2026",
    image: "/UROBOROS/assets/images/book/sound-sesion-umbral-v1.jpg",
    alt: "Vocalista grabando frente a un micrófono en un estudio oscuro, observada desde la cabina.",
    summary: "Una sesión de estudio centrada en la respiración, la proximidad y la textura real de la voz.",
    decision: "Mantener la interpretación al frente y hacer que la producción acompañe sus imperfecciones sin pulirlas de más.",
    services: ["Producción musical", "Grabación", "Mezcla", "Mastering"],
    credits: ["Producción — LATTICCE Sound", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "materia-01",
    title: "Materia 01",
    node: "design",
    category: "Identidad",
    year: "2026",
    image: "/UROBOROS/assets/images/book/design-materia-v1.jpg",
    alt: "Sistema de identidad experimental compuesto por papel, metal, resina y tramas de semitono.",
    summary: "Una identidad modular que existe como impresión, objeto, volumen y superficie digital.",
    decision: "Diseñar desde la materia antes que desde una aplicación: cada textura se convierte en una regla del sistema.",
    services: ["Estrategia de identidad", "Dirección de arte", "Sistema editorial", "Objetos 3D"],
    credits: ["Diseño — LATTICCE Design", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: true,
  },
  {
    slug: "archivo-naranja",
    title: "Archivo naranja",
    node: "design",
    category: "Editorial",
    year: "2026",
    image: "/UROBOROS/assets/images/book/design-archivo-naranja-v1.jpg",
    alt: "Libro de artista abierto con papeles translúcidos, formas negras y acentos naranjas sobre piedra oscura.",
    summary: "Una publicación que organiza proceso, memoria y variación mediante capas físicas.",
    decision: "Usar la transparencia como edición: cada página conserva lo anterior y prepara una lectura nueva.",
    services: ["Concepto editorial", "Diseño de publicación", "Dirección de arte", "Producción impresa"],
    credits: ["Diseño — LATTICCE Design", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: true,
  },
  {
    slug: "mariana-y-leo",
    title: "Mariana & Leo",
    node: "time",
    category: "Bodas",
    year: "2026",
    image: "/UROBOROS/assets/images/book/time-mariana-leo-v1.jpg",
    alt: "Pareja recién casada caminando de la mano en un gran patio de concreto después de la lluvia.",
    summary: "Una memoria de boda observada desde la distancia justa: íntima, sobria y profundamente física.",
    decision: "Dejar que el espacio contenga a la pareja; la emoción aparece en el gesto pequeño y no en la pose.",
    services: ["Fotografía", "Video", "Edición narrativa", "Álbum impreso"],
    credits: ["Memoria — LATTICCE Time", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: true,
  },
  {
    slug: "isabel",
    title: "Isabel",
    node: "time",
    category: "Celebraciones",
    year: "2026",
    image: "/UROBOROS/assets/images/book/time-isabel-v1.jpg",
    alt: "Retrato editorial de una joven con vestido negro en un pabellón contemporáneo rodeado de vegetación.",
    summary: "Retrato y celebración construidos como una secuencia de presencia, familia y espacio.",
    decision: "Evitar el código visual de fiesta y concentrar la memoria en luz natural, arquitectura y carácter.",
    services: ["Retrato", "Cobertura de evento", "Video", "Selección editorial"],
    credits: ["Memoria — LATTICCE Time", "Imagen conceptual generada para BOOK", "Proyecto demostrativo"],
    featured: false,
  },
];

export function getBookNode(id: NodeId) {
  return bookNodes.find((node) => node.id === id)!;
}

export function getBookProject(slug: string) {
  return bookProjects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: BookProject) {
  const sameNode = bookProjects.filter((candidate) => candidate.node === project.node && candidate.slug !== project.slug);
  const crossNode = bookProjects.filter((candidate) => candidate.node !== project.node && candidate.slug !== project.slug);
  return [...sameNode, ...crossNode].slice(0, 3);
}
