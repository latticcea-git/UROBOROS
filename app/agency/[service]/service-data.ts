export type ServiceSlug =
  | "contenido-rrss"
  | "ecosistemas-ui-ux"
  | "distribucion-ads";

export type AgencyService = {
  slug: ServiceSlug;
  index: string;
  title: string;
  shortTitle: string;
  kicker: string;
  promise: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  ritual: string;
  problemTitle: string;
  problemCopy: string;
  process: Array<{ title: string; copy: string }>;
  capabilities: string[];
  reportTitle: string;
  reportCopy: string;
  reportSignals: string[];
  caseTitle: string;
  caseCopy: string;
  cta: string;
  nextSlug: ServiceSlug;
  nextTitle: string;
  cinematic?: boolean;
  chapters?: Array<{ number: string; title: string; copy: string }>;
  platforms?: Array<{ name: string; icon: string }>;
  studioLink?: boolean;
  campaignLine?: string;
};

export const servicePages: Record<ServiceSlug, AgencyService> = {
  "contenido-rrss": {
    slug: "contenido-rrss",
    index: "01",
    title: "CONTENIDO RRSS",
    shortTitle: "CONTENIDO",
    kicker: "EL RITUAL DE LA SEÑAL",
    promise: "Tu marca presente. Tu contenido en movimiento.",
    intro:
      "Convertimos tus redes en un sistema constante de estrategia, producción, publicación, comunidad y aprendizaje mensual.",
    heroImage: "/UROBOROS/assets/images/agency/services/contenido-rrss-v1.webp",
    heroAlt:
      "Operador frente a un núcleo físico de señales digitales dentro de una cámara tecnológica oscura.",
    ritual: "OBSERVAR · CREAR · PROGRAMAR · ESCUCHAR · MEDIR",
    problemTitle: "Publicar no es lo mismo que construir presencia.",
    problemCopy:
      "Cuando cada publicación nace aislada, la marca pierde ritmo, consistencia y capacidad de aprender. Diseñamos un ciclo donde cada pieza responde a una intención y cada resultado alimenta la siguiente decisión.",
    process: [
      {
        title: "Diagnóstico de señal",
        copy: "Leemos marca, objetivos, audiencias, canales y comportamiento actual antes de definir el sistema.",
      },
      {
        title: "Arquitectura editorial",
        copy: "Construimos pilares, formatos, frecuencia, tono y calendario para sostener una presencia reconocible.",
      },
      {
        title: "Producción y adaptación",
        copy: "Creamos piezas específicas para el lenguaje, proporción y momento de cada plataforma.",
      },
      {
        title: "Programación y comunidad",
        copy: "Publicamos, moderamos, respondemos y mantenemos el ritmo operativo de la marca.",
      },
      {
        title: "Reporte mensual",
        copy: "Entregamos resultados, aprendizajes y decisiones concretas para el siguiente ciclo de contenido.",
      },
    ],
    capabilities: [
      "Estrategia de canales",
      "Pilares de contenido",
      "Calendario mensual",
      "Copywriting",
      "Diseño y adaptación",
      "Programación y publicación",
      "Community management",
      "Moderación y respuesta",
      "Reporte y optimización",
    ],
    reportTitle: "Cada mes deja una lectura.",
    reportCopy:
      "No entregamos únicamente publicaciones. Cerramos cada ciclo con un reporte comprensible: qué ocurrió, qué aprendimos y qué cambiaremos para mejorar la siguiente entrega.",
    reportSignals: ["ALCANCE", "INTERACCIÓN", "COMUNIDAD", "CONTENIDO", "SIGUIENTE CICLO"],
    caseTitle: "Casos de éxito",
    caseCopy:
      "Este espacio mostrará procesos, contenido y resultados cuando cada caso cuente con autorización de publicación.",
    cta: "Agenda tu cita y hacemos tu contenido.",
    nextSlug: "ecosistemas-ui-ux",
    nextTitle: "ECOSISTEMAS DIGITALES (UI–UX)",
    studioLink: true,
    platforms: [
      { name: "Instagram", icon: "/UROBOROS/assets/icons/social/instagram.svg" },
      { name: "Facebook", icon: "/UROBOROS/assets/icons/social/facebook.svg" },
      { name: "TikTok", icon: "/UROBOROS/assets/icons/social/tiktok.svg" },
      { name: "YouTube", icon: "/UROBOROS/assets/icons/social/youtube.svg" },
      { name: "LinkedIn", icon: "/UROBOROS/assets/icons/social/linkedin.svg" },
      { name: "WhatsApp", icon: "/UROBOROS/assets/icons/social/whatsapp.svg" },
      { name: "X", icon: "/UROBOROS/assets/icons/social/x.svg" },
      { name: "Pinterest", icon: "/UROBOROS/assets/icons/social/pinterest.svg" },
      { name: "Threads", icon: "/UROBOROS/assets/icons/social/threads.svg" },
    ],
  },
  "ecosistemas-ui-ux": {
    slug: "ecosistemas-ui-ux",
    index: "02",
    title: "ECOSISTEMAS DIGITALES (UI–UX)",
    shortTitle: "ECOSISTEMAS",
    kicker: "LA FORJA DE MUNDOS",
    promise: "Diseñamos el mundo digital donde tu marca puede crecer.",
    intro:
      "Estrategia, experiencia, interfaz y desarrollo conectados para crear sitios, landings, e-commerce y sistemas que funcionan como un solo organismo.",
    heroImage: "/UROBOROS/assets/images/agency/services/ecosistemas-digitales-v1.webp",
    heroAlt:
      "Arquitectos digitales materializando estructuras de cristal y código dentro de un bosque monumental.",
    ritual: "IMAGINAR · ARQUITECTAR · PROGRAMAR · CONECTAR · EVOLUCIONAR",
    problemTitle: "Una página aislada no forma un ecosistema.",
    problemCopy:
      "Una marca necesita más que una interfaz atractiva. Necesita una arquitectura capaz de conectar objetivos, personas, contenido, tecnología, medición y operación sin perder claridad.",
    process: [
      {
        title: "Descubrimiento",
        copy: "Definimos problema, objetivos, audiencias, contenido, integraciones y criterios de éxito.",
      },
      {
        title: "Arquitectura UX",
        copy: "Ordenamos recorridos, jerarquías y decisiones para que cada interacción tenga una función.",
      },
      {
        title: "Sistema UI",
        copy: "Convertimos la estrategia en una interfaz coherente, expresiva, accesible y escalable.",
      },
      {
        title: "Desarrollo",
        copy: "Programamos componentes, funciones, contenidos e integraciones como partes del mismo mundo.",
      },
      {
        title: "Activación y evolución",
        copy: "Probamos, publicamos, medimos y mantenemos el sistema preparado para crecer.",
      },
    ],
    capabilities: [
      "Arquitectura de información",
      "UX research y recorridos",
      "UI y sistemas de diseño",
      "Landing pages",
      "Sitios corporativos y premium",
      "E-commerce",
      "CMS y contenido",
      "SEO técnico",
      "Analítica y eventos",
      "CRM y automatizaciones",
      "IA y agentes",
      "Mantenimiento y evolución",
    ],
    reportTitle: "El sistema permanece vivo.",
    reportCopy:
      "Después de publicar, observamos rendimiento, comportamiento y oportunidades. El sitio deja de ser una entrega estática y se convierte en infraestructura que aprende.",
    reportSignals: ["EXPERIENCIA", "RENDIMIENTO", "CONVERSIÓN", "CONTENIDO", "EVOLUCIÓN"],
    caseTitle: "Mundos materializados",
    caseCopy:
      "Aquí vivirán casos de sitios y ecosistemas aprobados, explicados desde el problema hasta la arquitectura y el resultado.",
    cta: "Hacemos tu sitio web. Creamos tu ecosistema.",
    nextSlug: "distribucion-ads",
    nextTitle: "DISTRIBUCIÓN ADS",
    cinematic: true,
    chapters: [
      {
        number: "I",
        title: "El territorio",
        copy: "Antes de diseñar, leemos el lugar: negocio, usuarios, contenido, límites y posibilidades.",
      },
      {
        number: "II",
        title: "La arquitectura",
        copy: "Proyectamos rutas, jerarquías y componentes. La experiencia toma forma antes de tomar superficie.",
      },
      {
        number: "III",
        title: "La función",
        copy: "Programamos comportamiento, contenido e integraciones para que cada elemento responda al sistema.",
      },
      {
        number: "IV",
        title: "La conexión",
        copy: "CMS, SEO, analítica, CRM y automatizaciones se enlazan dentro de una misma infraestructura.",
      },
      {
        number: "V",
        title: "El mundo vivo",
        copy: "Publicamos, medimos y evolucionamos. El ecosistema continúa después de su primera activación.",
      },
    ],
  },
  "distribucion-ads": {
    slug: "distribucion-ads",
    index: "03",
    title: "DISTRIBUCIÓN ADS",
    shortTitle: "DISTRIBUCIÓN",
    kicker: "EL RITUAL DE AMPLIFICACIÓN",
    promise: "La señal correcta frente a la audiencia correcta.",
    intro:
      "Impulsamos tu contenido con campañas de Meta Ads y Google Ads diseñadas para alcanzar, aprender y convertir.",
    heroImage: "/UROBOROS/assets/images/agency/services/distribucion-ads-v1.webp",
    heroAlt:
      "Operador calibrando una máquina óptica que distribuye haces suaves hacia distintos destinos.",
    ritual: "DEFINIR · SEGMENTAR · ACTIVAR · MEDIR · OPTIMIZAR",
    problemTitle: "Alcance sin dirección solo consume energía.",
    problemCopy:
      "La pauta funciona cuando objetivo, audiencia, creatividad, destino y medición forman una sola trayectoria. Diseñamos esa ruta y la ajustamos con evidencia real.",
    process: [
      {
        title: "Objetivo y oferta",
        copy: "Alineamos la campaña con una acción concreta: mensaje, registro, visita, compra o conversación.",
      },
      {
        title: "Audiencia y plataforma",
        copy: "Definimos dónde distribuir, a quién llegar y qué señales utilizar en Meta o Google.",
      },
      {
        title: "Campaña y destino",
        copy: "Conectamos anuncios, creatividades, landing, formulario o canal de conversión.",
      },
      {
        title: "Medición y pruebas",
        copy: "Configuramos eventos, observamos comportamiento y probamos variables sin perder trazabilidad.",
      },
      {
        title: "Reporte y optimización",
        copy: "Traducimos resultados en decisiones: detener, ajustar, reforzar, redistribuir o escalar.",
      },
    ],
    capabilities: [
      "Estrategia de pauta",
      "Meta Ads",
      "Google Ads",
      "Audiencias y segmentación",
      "Estructura de campañas",
      "Creatividades y adaptaciones",
      "Landings y funnels",
      "Pixel, etiquetas y eventos",
      "Remarketing",
      "Pruebas y optimización",
      "Reporte de resultados",
    ],
    reportTitle: "El reporte también es parte de la campaña.",
    reportCopy:
      "Entregamos una lectura periódica y comprensible del rendimiento: inversión, alcance, respuesta, conversiones, hallazgos y siguiente plan de optimización.",
    reportSignals: ["INVERSIÓN", "ALCANCE", "RESPUESTA", "CONVERSIÓN", "SIGUIENTE ACCIÓN"],
    caseTitle: "Casos de éxito",
    caseCopy:
      "Este espacio presentará campañas autorizadas con contexto, decisiones y resultados verificables; nunca métricas aisladas.",
    cta: "Impulsa tu contenido con un plan de publicidad pagada.",
    nextSlug: "contenido-rrss",
    nextTitle: "CONTENIDO RRSS",
    campaignLine: "PAY TO WIN",
  },
};

export const serviceSlugs = Object.keys(servicePages) as ServiceSlug[];

export function isServiceSlug(value: string): value is ServiceSlug {
  return value in servicePages;
}
