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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
  return bookProjects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: BookProject) {
  const sameNode = bookProjects.filter((candidate) => candidate.node === project.node && candidate.slug !== project.slug);
  const crossNode = bookProjects.filter((candidate) => candidate.node !== project.node && candidate.slug !== project.slug);
  return [...sameNode, ...crossNode].slice(0, 3);
}
