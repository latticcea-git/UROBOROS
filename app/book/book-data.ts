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
  participatingNodes?: NodeId[];
  nodeEntries?: Partial<Record<NodeId, { category: string; anchor?: string }>>;
  category: string;
  year: string;
  image: string;
  video?: string;
  imageFit?: "cover" | "contain";
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
    orientation?: "portrait" | "landscape";
    position?: string;
  }>;
  caseStudy?: {
    challenge: string;
    transformation: string;
    outcome: string;
    pillars: Array<{ index: string; title: string; description: string }>;
    journey: Array<{ title: string; description: string }>;
    ecosystem: Array<{ title: string; description: string }>;
    metrics: Array<{ value: string; label: string; description: string }>;
    nodeRoles: Array<{ node: NodeId; role: string }>;
    externalUrl: string;
    externalLabel: string;
    visuals: Array<{ image: string; alt: string; caption: string }>;
  };
  brandCase?: {
    challenge: string;
    concept: string;
    symbol: string;
    palette: Array<{ name: string; value: string }>;
    principles: Array<{ index: string; title: string; description: string }>;
    applications: Array<{ title: string; description: string }>;
    assets: {
      logoPositive: string;
      logoNegative: string;
      logotype: string;
      symbol: string;
      websiteHero: string;
      websiteScene: string;
      botanical: string;
    };
    agency: {
      summary: string;
      decisions: Array<{ title: string; description: string }>;
      stack: string[];
      externalUrl: string;
      screenshots: Array<{ image: string; alt: string; caption: string; orientation: "landscape" }>;
    };
  };
  frutisaCase?: {
    challenge: string;
    concept: string;
    principles: Array<{ index: string; title: string; description: string }>;
    logoVariants: Array<{ image: string; alt: string; caption: string; backdrop: "waffle" | "cream" | "lime" | "chocolate" | "oreo" | "strawberry" }>;
    backgrounds: Record<"waffle" | "cream" | "lime" | "chocolate" | "oreo" | "strawberry", string>;
    palette: Array<{ name: string; value: string; description: string }>;
    paletteSummary: string;
    petSummary: string;
    petSketch: string;
    petFinal: string;
    petGallery: NonNullable<BookProject["gallery"]>;
    applicationsSummary: string;
    applications: NonNullable<BookProject["gallery"]>;
    capBase: string;
    sticker: string;
    labelCupBase: string;
    labels: NonNullable<BookProject["gallery"]>;
    socialPhoneBase: string;
    socialPost: string;
    agency: {
      summary: string;
      websiteSummary: string;
      decisions: Array<{ title: string; description: string }>;
      stack: string[];
      externalUrl: string;
      screenshots: NonNullable<BookProject["gallery"]>;
    };
  };
  okameCase?: {
    challenge: string;
    concept: string;
    symbol: string;
    principles: Array<{ index: string; title: string; description: string }>;
    palette: Array<{ name: string; value: string; role: string }>;
    logos: Array<{ image: string; alt: string; caption: string; tone: "dark" | "light" | "violet" | "chrome" }>;
    materials: NonNullable<BookProject["gallery"]>;
    applications: NonNullable<BookProject["gallery"]>;
    beautyStudio: {
      summary: string;
      logo: string;
      gallery: NonNullable<BookProject["gallery"]>;
    };
  };
};

export const bookAssetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function concertGallery(
  basePath: string,
  count: number,
  artist: string,
  captions: string[],
): NonNullable<BookProject["gallery"]> {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      image: `${basePath}-${number}.jpg`,
      alt: `${artist} durante el concierto, fotografía ${index + 1} de ${count}.`,
      caption: captions[index] ?? `Registro documental / ${number}`,
    };
  });
}

function sampleCaseGallery(
  basePath: string,
  project: string,
  captions: string[],
): NonNullable<BookProject["gallery"]> {
  return captions.map((caption, index) => ({
    image: `${basePath}-${index % 2 === 0 ? "hero" : "detail"}.jpg`,
    alt: `${project}, visual de muestra ${index + 1} de ${captions.length}.`,
    caption,
  }));
}

export const bookNodes: BookNode[] = [
  {
    id: "agency",
    index: "01",
    name: "Agency",
    statement: "Ideas que se vuelven sistemas.",
    description: "Estrategia, campañas y ecosistemas coordinados alrededor de una intención.",
    logo: bookAssetPath("/assets/logos/LTT_AGENCY_LOGO_1920_FX.png"),
  },
  {
    id: "studio",
    index: "02",
    name: "Studio",
    statement: "La realidad, dirigida.",
    description: "Fotografía y producción audiovisual construidas desde personas, luz y espacio.",
    logo: bookAssetPath("/assets/logos/LTT_STUDIO_LOGO_1920_FX.png"),
  },
  {
    id: "sound",
    index: "03",
    name: "Sound",
    statement: "Lo invisible toma cuerpo.",
    description: "Grabación, mezcla y experiencias donde la vibración se vuelve materia.",
    logo: bookAssetPath("/assets/logos/LTT_SOUND_LOGO_1920_FX.png"),
  },
  {
    id: "design",
    index: "04",
    name: "Design",
    statement: "La materia encuentra su forma.",
    description: "Identidad, editorial y sistemas visuales hechos para transformarse y permanecer.",
    logo: bookAssetPath("/assets/logos/LTT_DESIGN_LOGO_1920_FX.png"),
  },
  {
    id: "time",
    index: "05",
    name: "Time",
    statement: "Lo vivido deja una huella.",
    description: "Memoria fotográfica y audiovisual para conservar la intimidad de un momento.",
    logo: bookAssetPath("/assets/logos/LTT_TIME_LOGO_1920_FX.png"),
  },
];

export const bookProjects: BookProject[] = [
  {
    slug: "sofia-stainer-foro-la-paz",
    title: "Sofía Stainer",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: bookAssetPath("/assets/images/book/sofia-stainer/sofia-stainer-poster.jpg"),
    video: bookAssetPath("/assets/videos/book/sofia-stainer-hero.mov"),
    imagePosition: "center 38%",
    alt: "Sofía Stainer sonríe y extiende los brazos durante su concierto en Foro La Paz, Ciudad de México.",
    summary: "Sofía Stainer reunió en Foro La Paz más de diez años de canciones e historias. Su mezcla de pop alternativo, funk, soul, disco y ritmos latinos convirtió el concierto en una celebración cercana, atravesada por el baile y la complicidad con el público.",
    decision: "Construir el relato desde el cuerpo en movimiento y la cercanía del foro. La secuencia alterna retrato, gesto, banda y audiencia; conserva el verde, el ámbar y el blanco y negro de la noche, sin recortar la presencia escénica de la artista para forzarla a un formato horizontal.",
    services: ["Fotografía de concierto", "Cobertura audiovisual", "Selección y curaduría", "Revelado y color"],
    credits: [
      "Artista — Sofía Stainer",
      "Fotografía — Hernán Jiménez Herrera",
      "Cámara — Sony α7 IV (ILCE-7M4)",
      "Ubicación — Foro La Paz, Ciudad de México",
      "Fecha — 12 de septiembre de 2026",
    ],
    featured: true,
    projectLabel: "Registro documental / Sony α7 IV",
    status: "Proyecto real",
    galleryFirst: true,
    galleryTitle: "Diez años,",
    galleryEmphasis: "una noche",
    galleryDescription: "Treinta imágenes recorren la sonrisa, el baile, la banda y la respuesta del público. Los dos encuadres horizontales abren la escala del escenario; los retratos verticales conservan completo el movimiento de Sofía.",
    gallery: [
      ["Presencia / Apertura", "portrait"], ["Retrato / Luz verde", "portrait"], ["Escenario / Blanco y negro", "landscape"],
      ["Voz / Ámbar", "portrait"], ["Banda / Encuentro", "portrait"], ["Dúo / Escala", "landscape"],
      ["Gesto / Verde", "portrait"], ["Silueta / Contraluz", "portrait"], ["Cuerpo / Luz", "portrait"],
      ["Dirección / Público", "portrait"], ["Movimiento / Perfil", "portrait"], ["Vestuario / Detalle", "portrait"],
      ["Apertura / Escena", "portrait"], ["Espalda / Contraluz", "portrait"], ["Paso / Resplandor", "portrait"],
      ["Pausa / Escenario", "portrait"], ["Voz / Proximidad", "portrait"], ["Perfil / Ámbar", "portrait"],
      ["Gesto / Micrófono", "portrait"], ["Canción / Calidez", "portrait"], ["Secuencia / Color", "portrait"],
      ["Retrato / Ensamble", "portrait"], ["Escena / Ámbar", "portrait"], ["Voz / Azul", "portrait"],
      ["Secuencia / Blanco y negro", "portrait"], ["Banda / Ritmo", "portrait"], ["Público / Constelación", "portrait"],
      ["Encuentro / Audiencia", "portrait"], ["Memoria / Recapitulación", "portrait"], ["Baile / Cierre", "portrait"],
    ].map(([caption, orientation], index) => ({
      image: bookAssetPath(`/assets/images/book/sofia-stainer/sofia-stainer-gallery-${String(index + 1).padStart(2, "0")}.jpg`),
      alt: `Sofía Stainer en Foro La Paz, fotografía ${index + 1} de 30.`,
      caption,
      orientation: orientation as "portrait" | "landscape",
      position: "center",
    })),
  },
  {
    slug: "diana-meril-ambar",
    title: "Diana Meril",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: bookAssetPath("/assets/images/book/diana-meril/diana-meril-hero.jpg"),
    imageFit: "contain",
    imagePosition: "center",
    alt: "Diana Meril interpreta Ámbar bajo luz verde y ámbar durante su concierto en Foro La Paz.",
    summary: "Diana Meril presentó Ámbar en Foro La Paz durante su primer concierto estelar en Ciudad de México. Entre pop alternativo, arreglos en vivo y colaboraciones, la noche avanzó de la cercanía del retrato a una celebración compartida con el público.",
    decision: "Respetar la verticalidad y el movimiento como parte del lenguaje de la noche. La secuencia comienza cerca de Diana, abre el escenario con los encuadres horizontales y termina en banda, colaboraciones y audiencia; ninguna fotografía se recorta para ajustarla por fuerza a otro formato.",
    services: ["Fotografía de concierto", "Cobertura editorial", "Selección y curaduría", "Revelado y color"],
    credits: [
      "Artista — Diana Meril",
      "Show — Ámbar",
      "Fotografía — Hernán Jiménez Herrera",
      "Cámara — Sony α7 IV (ILCE-7M4)",
      "Ubicación — Foro La Paz, Ciudad de México",
      "Fecha — 19 de septiembre de 2026",
    ],
    featured: true,
    projectLabel: "Registro documental / Sony α7 IV",
    status: "Proyecto real",
    galleryFirst: true,
    galleryTitle: "Ámbar,",
    galleryEmphasis: "en escena",
    galleryDescription: "Treinta y cuatro imágenes recorren voz, movimiento, banda, colaboraciones y público. Los retratos conservan el cuerpo completo y los encuadres horizontales muestran la escena sin perder información en los bordes.",
    gallery: [
      ["Ámbar / Apertura", "portrait"], ["Presencia / Escenario", "portrait"], ["Voz / Azul", "portrait"],
      ["Retrato / Movimiento", "portrait"], ["Encuentro / Reflejo", "portrait"], ["Perfil / Ámbar", "portrait"],
      ["Voz / Verde", "portrait"], ["Escena / Contraluz", "portrait"], ["Cuerpo / Azul", "portrait"],
      ["Canción / Resplandor", "portrait"], ["Silueta / Haz de luz", "portrait"], ["Gesto / Escenario", "portrait"],
      ["Presencia / Apertura", "portrait"], ["Pausa / Escena", "landscape"], ["Movimiento / Suelo", "landscape"],
      ["Colaboración / Encuentro", "landscape"], ["Voces / Blanco", "landscape"], ["Proximidad / Ámbar", "portrait"],
      ["Cuerpo / Resplandor", "portrait"], ["Invitado / Verde", "landscape"], ["Diálogo / Escenario", "landscape"],
      ["Dúo / Escala", "landscape"], ["Banda / Contraluz", "landscape"], ["Público / Comunidad", "landscape"],
      ["Micrófono / Detalle", "portrait"], ["Dirección / Audiencia", "portrait"], ["Soledad / Escenario", "portrait"],
      ["Banda / Celebración", "landscape"], ["Transición / Azul", "portrait"], ["Colaboración / Pulso", "landscape"],
      ["Voces / Cercanía", "landscape"], ["Movimiento / Rojo", "landscape"], ["Banda / Haces", "landscape"],
      ["Ámbar / Cierre", "landscape"],
    ].map(([caption, orientation], index) => ({
      image: bookAssetPath(`/assets/images/book/diana-meril/diana-meril-gallery-${String(index + 1).padStart(2, "0")}.jpg`),
      alt: `Diana Meril presenta Ámbar en Foro La Paz, fotografía ${index + 1} de 34.`,
      caption,
      orientation: orientation as "portrait" | "landscape",
      position: "center",
    })),
  },
  {
    slug: "la-bande-son-imaginaire",
    title: "La Bande-Son Imaginaire",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: bookAssetPath("/assets/images/book/la-bande/la-bande-hero.jpg"),
    imagePosition: "center 42%",
    alt: "Integrante de La Bande-Son Imaginaire abre los brazos bajo haces de luz cian durante su concierto en el Pepsi Center WTC.",
    summary: "La Bande-Son Imaginaire, proyecto oaxaqueño integrado por los hermanos Óscar Tanat y Heri Ángelo Tanat junto al violinista Bram Hernández, llevó al Pepsi Center WTC su cruce de darkwave, electrónica y teatro. El 10 de septiembre de 2026, sintetizadores, personajes y luz convirtieron el concierto en una experiencia audiovisual.",
    decision: "Registrar el espectáculo como un umbral escénico: preservar los personajes, el vestuario, el violín y la respuesta del público sin separar la música de su dimensión teatral. El cian, el rojo, el movimiento y el grano permanecen como materia real de la noche.",
    services: ["Fotografía de concierto", "Cobertura editorial", "Selección y curaduría", "Revelado y color"],
    credits: [
      "Artista — La Bande-Son Imaginaire",
      "Integrantes — Óscar Tanat, Heri Ángelo Tanat y Bram Hernández",
      "Fotografía — Hernán Jiménez Herrera",
      "Cámara — Sony α7 IV (ILCE-7M4)",
      "Ubicación — Pepsi Center WTC, Ciudad de México",
      "Fecha — 10 de septiembre de 2026",
    ],
    featured: true,
    projectLabel: "Registro documental / Sony α7 IV",
    status: "Proyecto real",
    galleryFirst: true,
    galleryTitle: "El portal,",
    galleryEmphasis: "se abre",
    galleryDescription: "Veinte fragmentos recorren personajes, violín, sintetizadores, contraluces y público. La secuencia conserva la teatralidad del concierto sin desprenderla de lo que ocurrió sobre el escenario.",
    gallery: concertGallery(
      bookAssetPath("/assets/images/book/la-bande/la-bande-gallery"),
      20,
      "La Bande-Son Imaginaire en el Pepsi Center WTC",
      [
        "Personaje / Apertura", "Gesto / Invocación", "Contraluz / Presencia", "Teatro / Rojo",
        "Público / Escala", "Encuentro / Personajes", "Sombrero / Blanco y negro", "Audiencia / Umbral",
        "Voz / Escena", "Violín / Rojo", "Haces / Aparición", "Personaje / Cian", "Cuerpo / Luz",
        "Silueta / Magenta", "Máscara / Movimiento", "Escena / Profundidad", "Figura / Azul",
        "Voz / Proximidad", "Soledad / Transición", "Pantallas / Cierre",
      ],
    ),
  },
  {
    slug: "enjambre-estadio-gnp",
    title: "Enjambre",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: bookAssetPath("/assets/images/book/enjambre/enjambre-hero.jpg"),
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
    galleryDescription: "La secuencia completa avanza del público a la presencia escénica y vuelve sobre la banda, el color y la escala del Estadio GNP, sin reconstruir la energía del directo.",
    gallery: concertGallery(
      bookAssetPath("/assets/images/book/enjambre/enjambre-gallery"),
      17,
      "Enjambre en el Estadio GNP Seguros",
      [
        "Pertenencia / Apertura", "Público / Comunidad", "Escenario / Constelación", "Escala / Blanco y negro",
        "Banda / Encuentro", "Voz / Contraluz", "Pulso / Cian", "Gesto / Movimiento", "Retrato / Perfil",
        "Pantalla / Profundidad", "Guitarra / Atmósfera", "Voz / Rojo", "Banda / Color", "Escena / Capas",
        "Músico / Detalle", "Voz / Haz de luz", "Escenario / Cierre",
      ],
    ),
  },
  {
    slug: "maria-daniela-y-su-sonido-lasser",
    title: "María Daniela y Su Sonido Lasser",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: bookAssetPath("/assets/images/book/mdyssl/mdyssl-hero.jpg"),
    imagePosition: "center 58%",
    alt: "María Daniela canta ante un público lleno entre luz amarilla, verde y azul durante un concierto nocturno.",
    summary: "María Daniela Azpiazu y Emilio Acevedo llevan el electropop mexicano a una pista donde sintetizadores, humor y coros se vuelven memoria colectiva.",
    decision: "Construir la noche desde la relación entre intérprete, luz y audiencia. El registro con Sony α7 IV conserva la mezcla de azules, amarillos y humo, aceptando movimiento y grano como parte de la energía real del concierto.",
    services: ["Fotografía de concierto", "Cobertura editorial", "Selección y curaduría", "Revelado y color"],
    credits: [
      "Artista — María Daniela y Su Sonido Lasser",
      "Integrantes — María Daniela Azpiazu y Emilio Acevedo",
      "Fotografía — Hernán Jiménez Herrera",
      "Cámara — Sony α7 IV (ILCE-7M4)",
    ],
    featured: true,
    projectLabel: "Registro documental / Sony α7 IV",
    status: "Proyecto real",
    galleryTitle: "Una noche,",
    galleryEmphasis: "catorce pulsos",
    galleryDescription: "La secuencia completa abre el espacio, se acerca al gesto y vuelve a la pista. Luz, movimiento y público organizan el relato sin reconstruir lo que ocurrió.",
    gallery: concertGallery(
      bookAssetPath("/assets/images/book/mdyssl/mdyssl-gallery"),
      14,
      "María Daniela y Su Sonido Lasser",
      [
        "Escenario y público / Apertura", "Baño azul / Escala", "Haces y audiencia / Espacio", "Voz / Contraluz",
        "Movimiento / Haz cálido", "Blanco y negro / Presencia", "Proximidad / Coro", "Luz amarilla / Gesto",
        "Respuesta / Frente de escenario", "Brazo abierto / Encuentro", "Baño azul / Voz", "Color / Retrato",
        "Escenario / Distancia", "Último gesto / Cierre",
      ],
    ),
  },
  {
    slug: "surfistas-del-sistema",
    title: "Surfistas del Sistema",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: bookAssetPath("/assets/images/book/surfistas/surfistas-hero.jpg"),
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
    gallery: concertGallery(
      bookAssetPath("/assets/images/book/surfistas/surfistas-gallery"),
      17,
      "Surfistas del Sistema en el Pepsi Center",
      [
        "Cuerpos e instrumentos / Apertura", "Saxofón / Silueta", "Guitarra / Blanco y negro", "Voz y rojo / Inicio",
        "Encuentro / Contrapunto", "Pulso / Voz", "Escenario / Escala", "Silueta / Haz de luz", "Público / Violeta",
        "Dúo / Cian", "Diálogo / Blanco y negro", "Guitarra / Retrato", "Cruce / Instrumentos", "Banda / Rojo",
        "Escena / Clímax", "Banda completa / Blanco y negro", "Voz / Cierre",
      ],
    ),
  },
  {
    slug: "okame",
    title: "OKAME",
    node: "design",
    category: "Identidad visual",
    year: "2026",
    image: bookAssetPath("/assets/images/book/okame/okame-beauty-manicure-v2.jpg"),
    imageFit: "cover",
    imagePosition: "center center",
    alt: "Sesión profesional de manicure en OKAME Beauty Studio con la firma horizontal blanca aplicada en el espacio.",
    summary: "OKAME es una marca de belleza concebida para crecer en dos experiencias complementarias: OKAME Nails lleva la identidad al producto press on; OKAME Beauty Studio la convierte en servicio, espacio y cuidado personal. LATTICCE Design construyó un sistema común capaz de reconocer ambas expresiones sin volverlas idénticas.",
    decision: "Construir una arquitectura de marca alrededor de un símbolo orbital compartido. Nails explora el cromo y la transformación del producto; Beauty Studio utiliza violeta profundo, blanco y precisión editorial para comunicar uñas, maquillaje y cosmética dentro de una experiencia presencial.",
    services: ["Arquitectura de marca", "Diseño de logotipo", "Diseño de isotipo", "Sistema cromático", "Dirección de arte", "Aplicaciones de espacio y producto", "Contenido para redes"],
    credits: ["Identidad y dirección creativa — LATTICCE Design", "Logotipo, isotipo y sistema visual — LATTICCE Design", "Dirección de arte y aplicaciones — LATTICCE Design", "Cliente — OKAME"],
    featured: true,
    projectLabel: "Caso de éxito / Branding y contenido",
    status: "Proyecto real",
    okameCase: {
      challenge: "Crear una identidad premium y expresiva que pudiera ordenar dos líneas de negocio: una colección de uñas press on y un estudio de belleza presencial. Cada variante debía tener personalidad propia y, al mismo tiempo, conservar una firma inequívocamente OKAME.",
      concept: "OKAME parte de una idea de transformación personal: una forma que cambia según el ángulo, la luz y quien la lleva. El sistema crece desde el producto hasta el espacio; el símbolo compartido y la disciplina tipográfica conectan Nails y Beauty Studio sin borrar sus diferencias.",
      symbol: "El isotipo reúne órbita, destello y materia líquida. Su geometría central permanece estable mientras el acabado cromado introduce variación; esa tensión entre estructura y cambio se convierte en el rasgo más reconocible de OKAME.",
      principles: [
        { index: "01", title: "Forma reconocible", description: "Una silueta compacta y propia permite identificar la marca incluso sin nombre, en avatares, sellos y aplicaciones de escala reducida." },
        { index: "02", title: "Materia cambiante", description: "El cromo no funciona como decoración: traduce brillo, color y transformación, atributos vinculados directamente con el producto." },
        { index: "03", title: "Precisión editorial", description: "La tipografía y el espacio ordenan la energía visual para conservar sofisticación y legibilidad en piezas de marca y comunicación." },
      ],
      palette: [
        { name: "Negro profundo", value: "#09070D", role: "Base" },
        { name: "Violeta nocturno", value: "#241640", role: "Profundidad" },
        { name: "Violeta eléctrico", value: "#5A30A4", role: "Energía" },
        { name: "Lavanda", value: "#B690E8", role: "Luz" },
        { name: "Plata", value: "#D7D4DF", role: "Reflejo" },
      ],
      logos: [
        { image: bookAssetPath("/assets/images/book/okame/okame-lockup-nails.jpg"), alt: "Firma oficial OKAME Nails con descriptor Press On Nails", caption: "Firma principal / OKAME Nails", tone: "dark" },
        { image: bookAssetPath("/assets/images/book/okame/okame-symbol-g1.png"), alt: "Isotipo oficial violeta de OKAME Nails", caption: "Isotipo / Reducción", tone: "light" },
        { image: bookAssetPath("/assets/images/book/okame/okame-symbol-g2.png"), alt: "Isotipo oficial cromado violeta de OKAME Nails", caption: "Isotipo / Cromo violeta", tone: "violet" },
        { image: bookAssetPath("/assets/images/book/okame/okame-symbol-g3.png"), alt: "Isotipo oficial cromado azul de OKAME Nails", caption: "Isotipo / Reflejo frío", tone: "chrome" },
      ],
      materials: [
        { image: bookAssetPath("/assets/images/book/okame/okame-chrome-wht.jpg"), alt: "Isotipo OKAME en acabado cromado blanco", caption: "Cromo / Luz", orientation: "portrait" },
        { image: bookAssetPath("/assets/images/book/okame/okame-chrome-purp.jpg"), alt: "Isotipo OKAME en acabado cromado violeta", caption: "Cromo / Violeta", orientation: "portrait" },
        { image: bookAssetPath("/assets/images/book/okame/okame-chrome-gld.jpg"), alt: "Isotipo OKAME en acabado cromado dorado", caption: "Cromo / Oro", orientation: "portrait" },
        { image: bookAssetPath("/assets/images/book/okame/okame-chrome-blk.jpg"), alt: "Isotipo OKAME en acabado cromado negro", caption: "Cromo / Sombra", orientation: "portrait" },
      ],
      applications: [
        { image: bookAssetPath("/assets/images/book/okame/okame-studio-hero.jpg"), alt: "Interior nocturno de un estudio de uñas con la firma oficial de OKAME Nails", caption: "Espacio / Estudio de marca", orientation: "landscape" },
        { image: bookAssetPath("/assets/images/book/okame/okame-kit.jpg"), alt: "Kit de diez uñas press on cromadas con el isotipo oficial de OKAME", caption: "Producto / Kit press on", orientation: "landscape" },
        { image: bookAssetPath("/assets/images/book/okame/okame-hand-social.jpg"), alt: "Mano con uñas cromadas violetas y el isotipo oficial de OKAME", caption: "Contenido / Editorial social", orientation: "portrait" },
      ],
      beautyStudio: {
        summary: "Beauty Studio expande la marca hacia una experiencia presencial integral. El logotipo horizontal blanco organiza fachada, cabinas y producto; el violeta funciona como atmósfera y el negro aporta contraste. La identidad acompaña servicios de manicure, maquillaje y cosmética con una presencia sofisticada, legible y consistente.",
        logo: bookAssetPath("/assets/images/book/okame/okame-beauty-logo-white.png"),
        gallery: [
          { image: bookAssetPath("/assets/images/book/okame/okame-beauty-facade.jpg"), alt: "Mockup real de letrero circular de fachada con el logotipo horizontal blanco de OKAME Beauty Studio", caption: "Fachada / Letrero real", orientation: "landscape" },
          { image: bookAssetPath("/assets/images/book/okame/okame-beauty-manicure-v2.jpg"), alt: "Sesión profesional de manicure dentro del universo visual de OKAME Beauty Studio", caption: "Servicio / Manicure en estudio", orientation: "landscape" },
          { image: bookAssetPath("/assets/images/book/okame/okame-beauty-makeup.jpg"), alt: "Sesión profesional de maquillaje en OKAME Beauty Studio", caption: "Servicio / Maquillaje", orientation: "landscape" },
          { image: bookAssetPath("/assets/images/book/okame/okame-beauty-cosmetics.jpg"), alt: "Línea de cosméticos con aplicación de marca OKAME Beauty Studio", caption: "Producto / Cosmética", orientation: "landscape" },
        ],
      },
    },
  },
  {
    slug: "shakti-yoga-estudio",
    title: "Shakti Yoga Estudio",
    node: "design",
    participatingNodes: ["design", "agency"],
    nodeEntries: {
      design: { category: "Identidad visual" },
      agency: { category: "Sitio web", anchor: "agency" },
    },
    category: "Branding",
    year: "2026",
    image: bookAssetPath("/assets/images/book/shakti-yoga/shakti-garden.jpg"),
    imagePosition: "center 52%",
    alt: "Jardín botánico y acceso ceremonial que introducen el universo visual de Shakti Yoga Estudio.",
    summary: "Shakti Yoga Estudio necesitaba una identidad capaz de reunir fuerza, transformación y comunidad sin caer en los códigos genéricos del bienestar. LATTICCE Design creó el logotipo y un sistema visual completo; LATTICCE Agency llevó esa identidad a una experiencia digital orientada a descubrimiento y contacto.",
    decision: "Construir la marca alrededor de una figura orgánica que une cuerpo, expansión y equilibrio. El sistema combina un símbolo expresivo, una voz tipográfica editorial y una paleta botánica que puede vivir con la misma claridad en una pieza gráfica o dentro del sitio web.",
    services: ["Estrategia de marca", "Diseño de logotipo", "Identidad visual", "Sistema de aplicaciones", "Dirección de arte"],
    credits: ["Identidad y dirección creativa — LATTICCE Design", "Experiencia y desarrollo web — LATTICCE Agency", "Cliente — Shakti Yoga Estudio"],
    featured: true,
    projectLabel: "Caso de éxito / Identidad de marca",
    status: "Proyecto real",
    brandCase: {
      challenge: "Crear una identidad propia para un estudio que entiende el yoga como fuerza, proceso y comunidad. La marca debía sentirse cálida y cercana, pero también sólida, reconocible y preparada para crecer en múltiples formatos.",
      concept: "La identidad nace de una tensión fértil: sostener y expandirse. El símbolo reúne estabilidad, movimiento y una energía ascendente; la composición editorial aporta calma y convierte esa fuerza en un lenguaje contemporáneo.",
      symbol: "El isotipo funciona como cuerpo y territorio. Su construcción orgánica evita representar una postura literal: sugiere apertura, impulso y equilibrio para que la marca no dependa de un solo estilo de yoga.",
      palette: [
        { name: "Verde Shakti", value: "#28472D" },
        { name: "Arena", value: "#EFD8B2" },
        { name: "Negro", value: "#1D1D1B" },
        { name: "Crema digital", value: "#F8F5EC" },
      ],
      principles: [
        { index: "01", title: "Fuerza orgánica", description: "Una forma con peso y movimiento que comunica transformación sin recurrir a símbolos espirituales previsibles." },
        { index: "02", title: "Calma editorial", description: "Tipografía, espacio y ritmo permiten que la identidad respire incluso en composiciones con mucha información." },
        { index: "03", title: "Sistema adaptable", description: "Logotipo, isotipo y versiones positivas y negativas conservan reconocimiento en señalización, impresos y medios digitales." },
      ],
      applications: [
        { title: "Papelería", description: "La marca se despliega con amplios campos de color, escala tipográfica y el símbolo como firma." },
        { title: "Señalización", description: "El isotipo adquiere presencia física y facilita reconocer el estudio antes de leer su nombre." },
        { title: "Textil y objetos", description: "Las variantes monocromáticas trasladan la identidad a piezas de uso cotidiano sin perder detalle." },
        { title: "Comunicación", description: "La paleta y la composición editorial ordenan horarios, prácticas y mensajes de comunidad." },
      ],
      assets: {
        logoPositive: bookAssetPath("/assets/images/book/shakti-yoga/brand/logo-positive.svg"),
        logoNegative: bookAssetPath("/assets/images/book/shakti-yoga/brand/logo-negative.svg"),
        logotype: bookAssetPath("/assets/images/book/shakti-yoga/brand/logotype.svg"),
        symbol: bookAssetPath("/assets/images/book/shakti-yoga/brand/symbol.svg"),
        websiteHero: bookAssetPath("/assets/images/book/shakti-yoga/shakti-garden.jpg"),
        websiteScene: bookAssetPath("/assets/images/book/shakti-yoga/shakti-scenes.jpg"),
        botanical: bookAssetPath("/assets/images/book/shakti-yoga/shakti-botanical.webp"),
      },
      agency: {
        summary: "Agency convirtió la identidad en una experiencia digital de una sola página que conduce desde el universo de marca hacia prácticas, horarios, ubicación y contacto directo por WhatsApp. El recorrido combina escenas controladas por scroll con navegación natural y conserva rendimiento sin depender de una plataforma pesada.",
        decisions: [
          { title: "Conversión directa", description: "Cada práctica y horario conduce a una conversación contextual en WhatsApp, sin formularios ni pasos innecesarios." },
          { title: "Experiencia narrativa", description: "El hero presenta cuatro momentos —conecta, fluye, desafíate y comparte— y después entrega el control a una lectura natural." },
          { title: "Sistema accesible", description: "Navegación por teclado, diálogos nativos, preferencia de movimiento reducido y adaptación a escritorio y móvil." },
        ],
        stack: ["HTML semántico", "CSS modular", "JavaScript nativo", "SVG oficial", "WebP + JPEG optimizado", "Google Maps diferido", "GitHub Pages"],
        externalUrl: "https://latticcea-git.github.io/shakti-yoga-estudio/",
        screenshots: [
          { image: bookAssetPath("/assets/images/book/shakti-yoga/shakti-site-hero.jpg"), alt: "Portada del sitio de Shakti Yoga Estudio con navegación, llamado a primera clase y recorrido por escenas.", caption: "Experiencia / Hero y recorrido", orientation: "landscape" },
          { image: bookAssetPath("/assets/images/book/shakti-yoga/shakti-site-practices.jpg"), alt: "Sección del sitio de Shakti que presenta ocho modalidades de práctica mediante medallones interactivos.", caption: "Arquitectura / Sistema de prácticas", orientation: "landscape" },
          { image: bookAssetPath("/assets/images/book/shakti-yoga/shakti-site-ritual.jpg"), alt: "Sección botánica del sitio de Shakti con incienso, mensaje editorial y llamada a la acción.", caption: "Dirección de arte / Pausa ritual", orientation: "landscape" },
        ],
      },
    },
  },
  {
    slug: "frutisa-branding-sitio-web",
    title: "Frutisa",
    node: "design",
    participatingNodes: ["design", "agency"],
    nodeEntries: {
      design: { category: "Identidad + Brand Pet" },
      agency: { category: "Sitio web", anchor: "agency" },
    },
    category: "Identidad + Brand Pet",
    year: "2026",
    image: bookAssetPath("/assets/images/book/frutisa-case/hero-flavors.jpg"),
    imagePosition: "center 50%",
    alt: "Siete sabores de helado Frutisa alineados sobre un fondo cromático que recorre la paleta de la marca.",
    summary: "Frutisa necesitaba dejar de presentarse como un producto aislado y convertirse en una marca capaz de ocupar eventos, puntos de venta y canales digitales. LATTICCE Design construyó su identidad, el sistema de logotipos y un Brand Pet con personalidad propia; LATTICCE Agency convirtió ese universo en un sitio orientado a descubrir sabores y cotizar servicios.",
    decision: "Convertir el acto de derretirse en el gesto central de la marca. Las letras, la paleta, el personaje y las aplicaciones comparten una misma materialidad cremosa; el sitio organiza esa energía en un recorrido claro desde el antojo hasta la conversación por WhatsApp.",
    services: ["Estrategia de marca", "Diseño de logotipo", "Sistema visual", "Diseño de Brand Pet", "Aplicaciones y punto de venta", "Arquitectura UX/UI", "Diseño y desarrollo web"],
    credits: ["Identidad y dirección creativa — LATTICCE Design", "Brand Pet y sistema de aplicaciones — LATTICCE Design", "Experiencia y desarrollo web — LATTICCE Agency", "Cliente — Frutisa"],
    featured: true,
    projectLabel: "Caso de éxito / Identidad y ecosistema digital",
    status: "Proyecto real",
    frutisaCase: {
      challenge: "Construir una marca tan memorable como el producto: alegre sin volverse infantil, flexible para convivir con muchos sabores y suficientemente consistente para funcionar en un cono, un carrito, una etiqueta o una pantalla.",
      concept: "El sistema parte de una idea simple y propia del producto: todo se derrite. Las letras adquieren peso, brillo y goteo; cada sabor activa un color; la retícula del cono se vuelve textura; y el movimiento del helado se transforma en un lenguaje reconocible más allá del logotipo.",
      principles: [
        { index: "01", title: "Materia apetecible", description: "Volumen, brillo y textura hacen que la identidad se perciba comestible y conectan la forma gráfica con la experiencia real del helado." },
        { index: "02", title: "Color que orienta", description: "La paleta no sólo decora: distingue familias de sabor, ordena el catálogo y permite crear variantes sin perder reconocimiento." },
        { index: "03", title: "Energía con sistema", description: "El carácter lúdico convive con reglas de uso claras para sostener la marca en piezas pequeñas, espacios físicos y medios digitales." },
      ],
      logoVariants: [
        { image: bookAssetPath("/assets/images/book/frutisa-case/logo-flat.png"), alt: "Logotipo multicolor oficial de Frutisa con acabado brillante", caption: "Firma principal / Color y brillo", backdrop: "oreo" },
        { image: bookAssetPath("/assets/images/book/frutisa-case/logo-3d.png"), alt: "Logotipo oficial de Frutisa con volumen y textura de helado", caption: "Versión material / Textura de helado", backdrop: "waffle" },
        { image: bookAssetPath("/assets/images/book/frutisa-case/logo-outline.png"), alt: "Variante monocromática delineada del logotipo Frutisa", caption: "Reducción / Línea y contorno", backdrop: "strawberry" },
        { image: bookAssetPath("/assets/images/book/frutisa-case/logo-black.png"), alt: "Variante monocromática sólida del logotipo Frutisa", caption: "Una tinta / Silueta sólida", backdrop: "lime" },
      ],
      backgrounds: {
        waffle: bookAssetPath("/assets/images/book/frutisa-case/background-waffle.jpg"),
        cream: bookAssetPath("/assets/images/book/frutisa-case/background-cream.jpg"),
        lime: bookAssetPath("/assets/images/book/frutisa-case/background-lime.jpg"),
        chocolate: bookAssetPath("/assets/images/book/frutisa-case/background-chocolate.jpg"),
        oreo: bookAssetPath("/assets/images/book/frutisa-case/background-oreo.jpg"),
        strawberry: bookAssetPath("/assets/images/book/frutisa-case/background-strawberry.jpg"),
      },
      palette: [
        { name: "Verde limón", value: "#8DC63F", description: "Frescura" },
        { name: "Morado", value: "#4A388E", description: "Carácter" },
        { name: "Naranja", value: "#F58220", description: "Energía" },
        { name: "Rosa", value: "#EC6BAA", description: "Dulzura" },
        { name: "Azul", value: "#29ABE2", description: "Contraste" },
        { name: "Café", value: "#7A4A2A", description: "Materia" },
        { name: "Amarillo", value: "#FFC20E", description: "Alegría" },
        { name: "Crema", value: "#FEF2E4", description: "Base" },
        { name: "Índigo", value: "#13132A", description: "Profundidad" },
      ],
      paletteSummary: "Nueve tonos conectan sabores, señalización y comunicación. Verde limón, morado, naranja, rosa, azul, café y amarillo trabajan sobre una base crema e índigo para mantener contraste y lectura.",
      petSummary: "El Brand Pet traduce la promesa de Frutisa a una voz capaz de actuar. Su cuerpo-cono, la bola derretida, la cuchara, la patineta y las expresiones construyen un personaje reconocible que puede servir, invitar, celebrar y acompañar la marca sin depender de una sola pose.",
      petSketch: bookAssetPath("/assets/images/book/frutisa-case/brand-pet-sketch.jpg"),
      petFinal: bookAssetPath("/assets/images/book/frutisa-case/brand-pet-hero.jpg"),
      petGallery: [
        { image: bookAssetPath("/assets/images/book/frutisa-case/brand-pet-skate.jpg"), alt: "Brand Pet Frutisa en patineta", caption: "Movimiento / Actitud", orientation: "portrait" },
        { image: bookAssetPath("/assets/images/book/frutisa-case/brand-pet-server.jpg"), alt: "Brand Pet Frutisa con cuchara de servicio", caption: "Servicio / Cercanía", orientation: "portrait" },
        { image: bookAssetPath("/assets/images/book/frutisa-case/brand-pet-cart.jpg"), alt: "Brand Pet Frutisa integrado a un carrito de helados", caption: "Evento / Punto móvil", orientation: "portrait" },
        { image: bookAssetPath("/assets/images/book/frutisa-case/brand-pet-bucket.jpg"), alt: "Brand Pet Frutisa transportando una cubeta de helado", caption: "Producto / Escala", orientation: "portrait" },
      ],
      applicationsSummary: "El sistema se prueba en el mundo real: punto de venta, conos por sabor, comunicación de producto y piezas promocionales. Cada soporte conserva el goteo, la paleta y la legibilidad del logotipo sin convertir todas las piezas en una repetición.",
      applications: [
        { image: bookAssetPath("/assets/images/book/frutisa-case/stand.jpg"), alt: "Punto de venta tridimensional de Frutisa con logotipo, sabores y Brand Pet", caption: "Punto de venta 3D", orientation: "portrait" },
        { image: bookAssetPath("/assets/images/book/frutisa-case/cones.jpg"), alt: "Sistema de conos impresos Frutisa codificado por sabor", caption: "Cono impreso", orientation: "landscape" },
      ],
      capBase: bookAssetPath("/assets/images/book/frutisa-case/cap-base.jpg"),
      sticker: bookAssetPath("/assets/images/book/frutisa-case/sticker-crop.jpg"),
      labelCupBase: bookAssetPath("/assets/images/book/frutisa-case/label-cup-base.jpg"),
      labels: [
        { image: bookAssetPath("/assets/images/book/frutisa-case/sticker.jpg"), alt: "Etiqueta circular Frutisa con Brand Pet y logotipo", caption: "Etiqueta 01 / Sello de producto", orientation: "landscape" },
        { image: bookAssetPath("/assets/images/book/frutisa-case/labels-sheet.jpg"), alt: "Pliego técnico de etiquetas impresas para productos Frutisa", caption: "Etiqueta 02 / Sistema impreso", orientation: "landscape" },
      ],
      socialPhoneBase: bookAssetPath("/assets/images/book/frutisa-case/social-phone-integrated.jpg"),
      socialPost: bookAssetPath("/assets/images/book/frutisa-case/poster.jpg"),
      agency: {
        summary: "Agency transformó el sistema visual en una experiencia digital centrada en negocio. La portada comunica el servicio para eventos, el catálogo permite explorar sabores y cada bloque conduce hacia una cotización contextual por WhatsApp o formulario.",
        websiteSummary: "La experiencia publicada conecta producto, servicios y contacto dentro de una sola página. La arquitectura reduce pasos: primero despierta el antojo, después explica formatos de servicio y finalmente abre una conversación con la información necesaria para cotizar.",
        decisions: [
          { title: "Producto primero", description: "Sabores, texturas y personaje dominan la experiencia para que el valor se comprenda antes de leer una explicación extensa." },
          { title: "Rutas de servicio", description: "Pedidos pequeños, eventos privados y mayoreo funcionan como entradas diferenciadas para necesidades y escalas de compra distintas." },
          { title: "Conversión contextual", description: "Llamados persistentes, formulario y WhatsApp convierten el recorrido editorial en una solicitud concreta sin abandonar la página." },
        ],
        stack: ["HTML semántico", "CSS responsivo", "JavaScript nativo", "Arquitectura one-page", "Assets optimizados", "Formulario contextual", "Integración con WhatsApp", "GitHub Pages"],
        externalUrl: "https://dannlagger.github.io/frutisa/",
        screenshots: [
          { image: bookAssetPath("/assets/images/book/frutisa-case/site-home.jpg"), alt: "Captura vertical completa del sitio publicado de Frutisa", caption: "Sitio publicado / Recorrido completo", orientation: "portrait" },
          { image: bookAssetPath("/assets/images/book/frutisa-case/site-system.jpg"), alt: "Sistema gráfico y de componentes utilizado en el sitio Frutisa", caption: "Sistema digital / Componentes y recursos", orientation: "portrait" },
          { image: bookAssetPath("/assets/images/book/frutisa-case/site-structure.jpg"), alt: "Mapa estructural del sitio web Frutisa", caption: "Arquitectura / Flujo y jerarquía", orientation: "portrait" },
        ],
      },
    },
  },
  {
    slug: "ingles-con-jeremy-sitio-web",
    title: "Inglés con Jeremy",
    node: "agency",
    category: "Ecosistema digital",
    year: "2026",
    image: bookAssetPath("/assets/images/book/ingles-con-jeremy/ingles-con-jeremy-platform.jpg"),
    imagePosition: "center 50%",
    alt: "Ecosistema educativo de Inglés con Jeremy desplegado en computadora, tableta y teléfono con cursos, práctica, podcast y maestro virtual.",
    summary: "Convertimos una oferta educativa amplia en un ecosistema fácil de entender y continuar: el sitio ordena el método, las redes mantienen la conversación y la inteligencia artificial extiende el acompañamiento más allá de la clase.",
    decision: "Diseñar una experiencia alrededor del recorrido real del alumno —diagnóstico, grupo, clase, práctica y seguimiento— para que cada canal cumpla una función y todos conduzcan hacia una misma experiencia de aprendizaje.",
    services: ["Estrategia y arquitectura digital", "Diseño y estructuración del sitio web", "Gestión y seguimiento de redes sociales", "Sistemas de contenido educativo", "Experiencia educativa asistida por IA"],
    credits: ["Cliente — Inglés con Jeremy", "Estrategia y experiencia — LATTICCE Agency", "Sitio web — inglesconjeremy.com", "Social + sistemas de IA — LATTICCE Agency"],
    featured: true,
    projectLabel: "Caso de éxito / LATTICCE Agency",
    status: "Proyecto real",
    caseStudy: {
      challenge: "Inglés con Jeremy ya reunía clases en vivo, materiales, dinámicas, contenido y distintos formatos de acompañamiento. El reto no era sumar otra página: era volver legible todo el sistema para que una persona pudiera entender cómo aprende, elegir una modalidad y continuar practicando después de clase.",
      transformation: "La intervención de Agency conectó tres capas que antes podían percibirse por separado: una plataforma web que organiza la oferta, una operación de contenidos que sostiene presencia y seguimiento, y herramientas de inteligencia artificial que amplían la disponibilidad del acompañamiento educativo.",
      outcome: "El resultado es un ecosistema continuo: el alumno puede descubrir el método, identificar su siguiente paso, acceder a recursos y mantener la práctica entre sesiones sin perder la cercanía que distingue al proyecto.",
      pillars: [
        { index: "01", title: "Una plataforma que orienta", description: "La arquitectura transforma servicios, planes y recursos en decisiones claras. Cada bloque responde qué se aprende, cómo funciona y cuál es el siguiente paso." },
        { index: "02", title: "Contenido que sostiene el vínculo", description: "La gestión de redes y formatos educativos mantiene activa la relación con la comunidad mediante cápsulas, práctica cotidiana y rutas hacia los recursos del sitio." },
        { index: "03", title: "IA que extiende al maestro", description: "La estructura de maestros virtuales permite practicar y resolver dudas fuera del horario de clase, conservando objetivos, tono y lógica pedagógica definidos por el proyecto." },
      ],
      journey: [
        { title: "Diagnóstico", description: "Reconocer nivel y objetivos." },
        { title: "Grupo adecuado", description: "Asignar una ruta de aprendizaje." },
        { title: "Clase en vivo", description: "Aprender directamente con Jeremy." },
        { title: "Práctica", description: "Activar materiales y dinámicas." },
        { title: "Seguimiento", description: "Continuar con contenido e IA." },
      ],
      ecosystem: [
        { title: "Sitio web", description: "Método, planes, recursos, testimonios, preguntas frecuentes y contacto dentro de una navegación común." },
        { title: "Redes sociales", description: "Seguimiento editorial y piezas que convierten temas de clase en conversación recurrente." },
        { title: "Biblioteca", description: "Videoteca, audioteca, materiales, Vocabulary Challenge y Survival English para practicar en distintos formatos." },
        { title: "Maestro virtual", description: "Una capa de asistencia con IA para extender la práctica y la disponibilidad del sistema educativo." },
      ],
      metrics: [
        { value: "05", label: "Etapas conectadas", description: "Del diagnóstico inicial al seguimiento posterior a clase." },
        { value: "03", label: "Rutas comerciales", description: "Tres planes que hacen visible la progresión del servicio." },
        { value: "04", label: "Capas del ecosistema", description: "Sitio, redes, biblioteca educativa y asistencia con IA." },
        { value: "24/7", label: "Práctica asistida", description: "Disponibilidad extendida mediante el maestro virtual." },
      ],
      nodeRoles: [
        { node: "agency", role: "Estrategia, sitio web, gestión social y arquitectura de IA." },
      ],
      externalUrl: "https://www.inglesconjeremy.com/",
      externalLabel: "Visitar Inglés con Jeremy",
      visuals: [
        { image: bookAssetPath("/assets/images/book/ingles-con-jeremy/ingles-con-jeremy-platform.jpg"), alt: "Vista del ecosistema educativo de Inglés con Jeremy en múltiples dispositivos.", caption: "Plataforma / Ecosistema" },
        { image: bookAssetPath("/assets/images/book/ingles-con-jeremy/ingles-con-jeremy-podcast.jpg"), alt: "Alumna escucha el podcast de Inglés con Jeremy desde su teléfono.", caption: "Contenido / Podcast" },
        { image: bookAssetPath("/assets/images/book/ingles-con-jeremy/ingles-con-jeremy-kids.jpg"), alt: "Experiencia de Inglés con Jeremy para niñas y niños.", caption: "Oferta / Inglés para niños" },
      ],
    },
  },
  {
    slug: "aby-y-ali-boda-2026",
    title: "Aby y Ali",
    node: "time",
    category: "Bodas",
    year: "2026",
    image: bookAssetPath("/assets/images/book/aby-ali/aby-ali-hero.jpg"),
    imagePosition: "center 46%",
    alt: "Pareja de recién casados camina de la mano por un patio de piedra después de la lluvia.",
    summary: "Aby y Ali imaginaron una memoria que se sintiera cercana incluso con el paso de los años. La cobertura observa la boda desde la distancia justa: arquitectura, lluvia, manos y silencios sostienen una historia sin convertirla en espectáculo.",
    decision: "Priorizar gesto y permanencia sobre pose. La edición alterna escenas amplias con detalles táctiles y deja espacio alrededor de la pareja para que la secuencia respire como un álbum, no como una suma de fotografías aisladas.",
    services: ["Fotografía documental", "Retrato editorial", "Curaduría narrativa", "Diseño de álbum"],
    credits: ["Memoria — LATTICCE Time", "Visuales de muestra — IA generativa", "Caso ficticio para revisión y reemplazo"],
    featured: false,
    projectLabel: "Memoria editorial / Boda 2026",
    status: "Caso de muestra",
    galleryFirst: true,
    galleryTitle: "Lo vivido deja",
    galleryEmphasis: "una huella",
    galleryDescription: "La galería provisional prioriza atmósfera, cercanía y detalle. Mantendrá esta secuencia cuando las fotografías reales sustituyan las muestras.",
    gallery: sampleCaseGallery(
      bookAssetPath("/assets/images/book/aby-ali/aby-ali"),
      "Boda de Aby y Ali",
      ["Patio / Apertura", "Manos / Promesa", "Distancia / Presencia", "Detalle / Memoria", "Lluvia / Tiempo", "Juntos / Cierre"],
    ),
  },
  {
    slug: "voces-para-un-branding",
    title: "Voces para un Branding",
    node: "sound",
    category: "Sonic branding",
    year: "2026",
    image: bookAssetPath("/assets/images/book/voces-branding/voces-branding-hero.jpg"),
    imagePosition: "center 50%",
    alt: "Voz humana representada como partículas, ondas y luz frente a un micrófono dentro de una cámara acústica.",
    summary: "Una marca puede reconocerse antes de ser vista. Voces para un Branding explora cómo timbre, respiración, ritmo y silencio construyen una firma vocal coherente para piezas, interfaces y experiencias de atención.",
    decision: "No buscar una voz bonita, sino una voz propia. El sistema define intención, velocidad, textura y rango emocional; después los traduce a dirección de casting, grabación, procesamiento y reglas de uso para conservar consistencia en cada punto de contacto.",
    services: ["Estrategia sonora", "Dirección de voz", "Casting y grabación", "Sistema de identidad sonora"],
    credits: ["Dirección sonora — LATTICCE Sound", "Visuales de muestra — IA generativa", "Caso ficticio para revisión y reemplazo"],
    featured: false,
    projectLabel: "Caso de éxito / Identidad sonora",
    status: "Caso de muestra",
    galleryTitle: "Una voz puede ser",
    galleryEmphasis: "una identidad",
    galleryDescription: "La secuencia provisional hace visible la cadena física de la voz: partícula, movimiento, onda y luz.",
    gallery: sampleCaseGallery(
      bookAssetPath("/assets/images/book/voces-branding/voces-branding"),
      "Voces para un Branding",
      ["Fuente / Apertura", "Partícula / Aliento", "Movimiento / Timbre", "Onda / Sistema", "Luz / Reconocimiento", "Voz / Cierre"],
    ),
  },
  {
    slug: "archivo-nocturno",
    title: "Archivo nocturno",
    node: "agency",
    category: "Campañas",
    year: "2026",
    image: bookAssetPath("/assets/images/book/agency-archivo-v1.jpg"),
    alt: "Equipo creativo revisando imágenes y materiales sobre una mesa en un estudio de concreto oscuro.",
    summary: "Una plataforma cultural convertida en campaña, archivo editorial y conversación pública.",
    decision: "Hacer visible la investigación antes que la publicidad: cada pieza funciona como fragmento de un archivo en expansión.",
    services: ["Estrategia de campaña", "Dirección creativa", "Sistema de contenidos", "Producción editorial"],
    credits: ["Dirección creativa — LATTICCE Agency", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "sistema-cero",
    title: "Sistema Cero",
    node: "agency",
    category: "Ecosistemas digitales",
    year: "2026",
    image: bookAssetPath("/assets/images/book/agency-sistema-cero-v1.jpg"),
    alt: "Dos profesionales observando proyecciones abstractas en una sala de control monumental.",
    summary: "Un ecosistema digital que reúne contenido, campaña y medición bajo una sola lógica visual.",
    decision: "Sustituir la suma de canales por una sala de mando clara: una intención, múltiples superficies y una lectura común.",
    services: ["Arquitectura digital", "Campaña integrada", "Dirección de arte", "Sistema de medición"],
    credits: ["Estrategia — LATTICCE Agency", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "fase-roja",
    title: "Fase Roja",
    node: "studio",
    category: "Videoclip",
    year: "2026",
    image: bookAssetPath("/assets/images/book/studio-fase-roja-v1.jpg"),
    alt: "Intérprete con vestido negro moviéndose en un corredor brutalista con un reflejo rojo.",
    summary: "Un videoclip construido desde arquitectura, cuerpo y una interrupción mínima de color.",
    decision: "Reducir el relato a un cuerpo atravesando espacios de presión; la luz funciona como montaje dentro del plano.",
    services: ["Dirección", "Cinematografía", "Diseño de producción", "Postproducción"],
    credits: ["Producción — LATTICCE Studio", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "ritual-de-luz",
    title: "Ritual de luz",
    node: "studio",
    category: "Conciertos",
    year: "2026",
    image: bookAssetPath("/assets/images/book/studio-ritual-luz-v1.jpg"),
    alt: "Cantante en un escenario oscuro bajo dos haces blancos y una banda en silueta.",
    summary: "Registro en vivo que conserva la fuerza física del concierto y el silencio alrededor del gesto.",
    decision: "Fotografiar la escala antes que el espectáculo: el escenario se convierte en arquitectura y el intérprete en foco humano.",
    services: ["Cobertura multicámara", "Fotografía fija", "Edición", "Piezas de lanzamiento"],
    credits: ["Producción — LATTICCE Studio", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "frecuencia-mineral",
    title: "Frecuencia mineral",
    node: "sound",
    category: "Instalación sonora",
    year: "2026",
    image: bookAssetPath("/assets/images/book/sound-frecuencia-mineral-v1.jpg"),
    alt: "Ingeniero de sonido frente a una consola bajo altavoces suspendidos en una sala negra.",
    summary: "Una instalación espacial donde la vibración recorre un campo de altavoces suspendidos.",
    decision: "Dar peso y dirección al sonido: cada fuente ocupa una altura y convierte la escucha en recorrido físico.",
    services: ["Diseño sonoro", "Mezcla espacial", "Montaje técnico", "Dirección de experiencia"],
    credits: ["Diseño sonoro — LATTICCE Sound", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "sesion-umbral",
    title: "Sesión Umbral",
    node: "sound",
    category: "Producción musical",
    year: "2026",
    image: bookAssetPath("/assets/images/book/sound-sesion-umbral-v1.jpg"),
    alt: "Vocalista grabando frente a un micrófono en un estudio oscuro, observada desde la cabina.",
    summary: "Una sesión de estudio centrada en la respiración, la proximidad y la textura real de la voz.",
    decision: "Mantener la interpretación al frente y hacer que la producción acompañe sus imperfecciones sin pulirlas de más.",
    services: ["Producción musical", "Grabación", "Mezcla", "Mastering"],
    credits: ["Producción — LATTICCE Sound", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "materia-01",
    title: "Materia 01",
    node: "design",
    category: "Identidad",
    year: "2026",
    image: bookAssetPath("/assets/images/book/design-materia-v1.jpg"),
    alt: "Sistema de identidad experimental compuesto por papel, metal, resina y tramas de semitono.",
    summary: "Una identidad modular que existe como impresión, objeto, volumen y superficie digital.",
    decision: "Diseñar desde la materia antes que desde una aplicación: cada textura se convierte en una regla del sistema.",
    services: ["Estrategia de identidad", "Dirección de arte", "Sistema editorial", "Objetos 3D"],
    credits: ["Diseño — LATTICCE Design", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "archivo-naranja",
    title: "Archivo naranja",
    node: "design",
    category: "Editorial",
    year: "2026",
    image: bookAssetPath("/assets/images/book/design-archivo-naranja-v1.jpg"),
    alt: "Libro de artista abierto con papeles translúcidos, formas negras y acentos naranjas sobre piedra oscura.",
    summary: "Una publicación que organiza proceso, memoria y variación mediante capas físicas.",
    decision: "Usar la transparencia como edición: cada página conserva lo anterior y prepara una lectura nueva.",
    services: ["Concepto editorial", "Diseño de publicación", "Dirección de arte", "Producción impresa"],
    credits: ["Diseño — LATTICCE Design", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "mariana-y-leo",
    title: "Mariana & Leo",
    node: "time",
    category: "Bodas",
    year: "2026",
    image: bookAssetPath("/assets/images/book/time-mariana-leo-v1.jpg"),
    alt: "Pareja recién casada caminando de la mano en un gran patio de concreto después de la lluvia.",
    summary: "Una memoria de boda observada desde la distancia justa: íntima, sobria y profundamente física.",
    decision: "Dejar que el espacio contenga a la pareja; la emoción aparece en el gesto pequeño y no en la pose.",
    services: ["Fotografía", "Video", "Edición narrativa", "Álbum impreso"],
    credits: ["Memoria — LATTICCE Time", "Proyecto demostrativo"],
    featured: false,
  },
  {
    slug: "isabel",
    title: "Isabel",
    node: "time",
    category: "Celebraciones",
    year: "2026",
    image: bookAssetPath("/assets/images/book/time-isabel-v1.jpg"),
    alt: "Retrato editorial de una joven con vestido negro en un pabellón contemporáneo rodeado de vegetación.",
    summary: "Retrato y celebración construidos como una secuencia de presencia, familia y espacio.",
    decision: "Evitar el código visual de fiesta y concentrar la memoria en luz natural, arquitectura y carácter.",
    services: ["Retrato", "Cobertura de evento", "Video", "Selección editorial"],
    credits: ["Memoria — LATTICCE Time", "Proyecto demostrativo"],
    featured: false,
  },
];

export function getBookNode(id: NodeId) {
  return bookNodes.find((node) => node.id === id)!;
}

export function getBookProject(slug: string) {
  if (slug === "okame-nails") return bookProjects.find((project) => project.slug === "okame");
  return bookProjects.find((project) => project.slug === slug);
}

export function projectBelongsToNode(project: BookProject, node: NodeId) {
  return project.node === node || project.participatingNodes?.includes(node) === true;
}

export function prioritizeRealProjects(projects: BookProject[]) {
  return [...projects].sort((a, b) => {
    const rank = (project: BookProject) => project.status === "Proyecto real" ? 0 : project.status === "Caso de muestra" ? 2 : 1;
    return rank(a) - rank(b);
  });
}

export function getRelatedProjects(project: BookProject) {
  const sameNode = bookProjects.filter((candidate) => candidate.node === project.node && candidate.slug !== project.slug);
  const crossNode = bookProjects.filter((candidate) => candidate.node !== project.node && candidate.slug !== project.slug);
  return [...sameNode, ...crossNode].slice(0, 3);
}
