export type ArticleSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type ArticleContent = {
  intro: string;
  sections: ArticleSection[];
  quote: string;
  notes: Array<{ label: string; value: string }>;
  bookProjectSlug: string;
};

export const articleContent: Record<string, ArticleContent> = {
  "el-espacio-tambien-dirige": {
    intro: "Antes de decidir dónde colocar la cámara conviene comprender qué fuerzas ya existen en el lugar. Una plataforma, una distancia imposible de cruzar, una fuente de luz o una multitud pueden ordenar la escena con más precisión que un movimiento añadido.",
    sections: [
      {
        eyebrow: "01 / Lectura",
        title: "El lugar no es un fondo",
        paragraphs: [
          "Todo espacio propone relaciones. Tiene zonas de tránsito y de espera, líneas que conducen la mirada, límites que aíslan y profundidades que revelan escala. La dirección comienza al reconocerlas, no al intentar ocultarlas.",
          "En un escenario de gran formato, por ejemplo, el vacío alrededor de una figura puede decir tanto como su gesto. Abrir el encuadre no es alejarse de la emoción: es mostrar contra qué dimensión está ocurriendo.",
        ],
      },
      {
        eyebrow: "02 / Decisión",
        title: "Mover sólo cuando cambia el sentido",
        paragraphs: [
          "Una cámara fija permite que cuerpos, luz y arquitectura transformen el plano desde dentro. Un desplazamiento se vuelve necesario cuando descubre una relación que antes no existía: una distancia, una ausencia o un cambio de poder.",
          "La pregunta útil no es qué movimiento se ve mejor, sino qué información emocional aparece gracias a él. Cuando la respuesta no es clara, sostener el punto de vista suele ser la decisión más fuerte.",
        ],
      },
      {
        eyebrow: "03 / Continuidad",
        title: "La escala debe sobrevivir al montaje",
        paragraphs: [
          "Alternar planos abiertos y próximos no basta. Cada corte necesita conservar la geografía sensible de la escena: dónde está cada cuerpo, qué distancia los separa y qué presión ejerce el espacio sobre ellos.",
          "La continuidad más importante no siempre es física. Es la permanencia de una tensión. Si esa tensión llega intacta al siguiente plano, el espacio continúa dirigiendo incluso después del corte.",
        ],
      },
    ],
    quote: "EL ESPACIO NO CONTIENE LA ESCENA. PARTICIPA EN ELLA.",
    notes: [
      { label: "Territorio", value: "Narrativa visual" },
      { label: "Variables", value: "Escala / vacío / profundidad" },
      { label: "Principio", value: "Leer antes de intervenir" },
    ],
    bookProjectSlug: "enjambre-estadio-gnp",
  },
  "exponer-para-la-luz-que-cambia": {
    intro: "La luz de un concierto puede cambiar de dirección, color e intensidad en segundos. Cubrirla no consiste en perseguir cada variación, sino en establecer un margen técnico que proteja el gesto sin eliminar la atmósfera real de la escena.",
    sections: [
      {
        eyebrow: "01 / Prioridad",
        title: "Decidir qué no debe perderse",
        paragraphs: [
          "Cuando el rango dinámico es limitado, la exposición necesita una prioridad. En retrato escénico suele ser la piel iluminada; en una silueta puede ser el contorno; en un plano general, la relación entre escenario y público.",
          "Medir sobre el punto más brillante que todavía necesita textura ayuda a conservar margen. Las pantallas y luminarias pueden recortarse si no contienen información, pero un rostro sobreexpuesto rara vez se recupera con naturalidad.",
        ],
      },
      {
        eyebrow: "02 / Método",
        title: "Preparar familias de exposición",
        paragraphs: [
          "En lugar de corregir parámetro por parámetro durante cada cambio, conviene anticipar dos o tres situaciones: luz frontal intensa, contraluz y ambiente bajo. Un ajuste memorizado o una práctica clara reduce la fricción cuando la escena acelera.",
          "La velocidad protege el gesto; la apertura define cuánto contexto permanece; el ISO absorbe la variación final. El orden puede cambiar, pero la intención debe mantenerse: registrar movimiento real sin convertir la noche en una superficie uniforme.",
        ],
      },
      {
        eyebrow: "03 / Color",
        title: "No neutralizar lo que pertenece a la escena",
        paragraphs: [
          "Una dominante verde, ámbar o azul puede ser una decisión de iluminación, no un error de balance. Corregirla por completo borra la identidad del momento.",
          "El revelado funciona mejor cuando recupera separación y piel sin desactivar la mezcla original. La consistencia de una serie no exige que todas las imágenes tengan el mismo color; exige que compartan un criterio.",
        ],
      },
    ],
    quote: "EXPONER ES ELEGIR QUÉ INFORMACIÓN MERECE SOBREVIVIR AL CAMBIO.",
    notes: [
      { label: "Territorio", value: "Fotografía de concierto" },
      { label: "Prioridad", value: "Gesto / atmósfera / continuidad" },
      { label: "Método", value: "Anticipar antes de corregir" },
    ],
    bookProjectSlug: "diana-meril-ambar",
  },
  "la-mezcla-empieza-en-la-distancia": {
    intro: "Un micrófono no escucha desde ninguna parte: escucha desde un punto preciso del espacio. Antes de ecualizar o comprimir, la distancia ya decidió cuánto cuerpo, aire, sala y fuga entrarán en la señal.",
    sections: [
      {
        eyebrow: "01 / Fuente",
        title: "Acercarse cambia más que el volumen",
        paragraphs: [
          "Al aproximar el micrófono aumenta la relación entre sonido directo y ambiente. También cambian el detalle, los transitorios y, según el patrón polar, la respuesta en graves. No es una solución universal: es una elección de perspectiva.",
          "Alejarlo integra instrumento y sala, pero expone reflexiones, ruido y otras fuentes. La distancia correcta es la que captura la proporción que la mezcla necesitará, no la que produce la señal más grande.",
        ],
      },
      {
        eyebrow: "02 / Relación",
        title: "Escuchar el conjunto antes de aislarlo",
        paragraphs: [
          "Dos instrumentos próximos pueden compartir aire, fase y energía. Intentar separarlos por completo puede quitar la relación que vuelve convincente la interpretación.",
          "Conviene escuchar primero desde el lugar donde el conjunto ya se equilibra y usar esa referencia para colocar cada captura. La técnica deja entonces de corregir una escena y comienza a describirla.",
        ],
      },
      {
        eyebrow: "03 / Prueba",
        title: "Mover centímetros antes que sumar procesos",
        paragraphs: [
          "Una pequeña variación de altura o ángulo puede reducir dureza, recuperar cuerpo o evitar una reflexión temprana. Es una decisión reversible, rápida y normalmente más limpia que una cadena de reparación.",
          "Grabar una comparación breve y nivelada permite elegir por escucha, no por costumbre. Si la fuente llega con intención, la mezcla conserva margen para construir profundidad en lugar de resolver problemas.",
        ],
      },
    ],
    quote: "LA POSICIÓN DEL MICRÓFONO YA ES UNA PRIMERA MEZCLA.",
    notes: [
      { label: "Territorio", value: "Grabación" },
      { label: "Variables", value: "Fuente / aire / sala" },
      { label: "Práctica", value: "Mover / comparar / decidir" },
    ],
    bookProjectSlug: "surfistas-del-sistema",
  },
  "el-color-como-sistema-de-orientacion": {
    intro: "El color puede hacer más que identificar una marca. Puede separar niveles de información, señalar cambios de estado, construir recorridos y preparar una transición antes de que el contenido la explique.",
    sections: [
      {
        eyebrow: "01 / Función",
        title: "Asignar una tarea antes de elegir un tono",
        paragraphs: [
          "Una paleta se vuelve sistema cuando cada familia cromática tiene una función reconocible. Puede distinguir categorías, indicar prioridad, activar una acción o separar una voz editorial de otra.",
          "Si todos los colores pueden hacer todo, ninguno orienta. Limitar sus usos crea memoria y permite que una excepción tenga verdadero peso.",
        ],
      },
      {
        eyebrow: "02 / Relación",
        title: "El contraste no depende sólo del matiz",
        paragraphs: [
          "Valor, saturación y superficie determinan cuánto se separan dos elementos. Un azul y un verde diferentes pueden resultar casi idénticos a distancia si comparten luminosidad.",
          "Probar la composición en escala de grises, en pantallas pequeñas y bajo distintas condiciones de luz revela si la jerarquía sigue funcionando cuando el color pierde intensidad.",
        ],
      },
      {
        eyebrow: "03 / Ritmo",
        title: "Diseñar transiciones, no muestras aisladas",
        paragraphs: [
          "En una secuencia editorial o digital, el color prepara lo que viene. Una acumulación puede aumentar tensión; una reducción puede abrir una pausa; un cambio brusco puede marcar un capítulo.",
          "El sistema debe describir cómo se pasa de un estado a otro. Ahí aparece su capacidad narrativa: ya no colorea piezas, organiza una experiencia.",
        ],
      },
    ],
    quote: "EL COLOR ORIENTA CUANDO CADA APARICIÓN TIENE UNA RAZÓN.",
    notes: [
      { label: "Territorio", value: "Diseño gráfico" },
      { label: "Variables", value: "Valor / saturación / superficie" },
      { label: "Objetivo", value: "Jerarquía y recorrido" },
    ],
    bookProjectSlug: "frutisa-branding-sitio-web",
  },
  "la-atencion-no-se-compra-se-construye": {
    intro: "Una impresión puede comprarse. La atención sostenida no. Se construye cuando la promesa, la experiencia y la forma de regresar mantienen una relación clara a lo largo del tiempo.",
    sections: [
      {
        eyebrow: "01 / Promesa",
        title: "Dar una razón específica para quedarse",
        paragraphs: [
          "El alcance aumenta visibilidad, pero no resuelve relevancia. Una audiencia necesita reconocer qué obtiene: una idea útil, una emoción precisa, una perspectiva difícil de encontrar o una pertenencia real.",
          "La promesa debe poder expresarse sin depender del formato de moda. Si sólo funciona como anuncio, todavía no organiza la experiencia de marca.",
        ],
      },
      {
        eyebrow: "02 / Consistencia",
        title: "Repetir un criterio, no una fórmula",
        paragraphs: [
          "La familiaridad aparece cuando una marca toma decisiones compatibles en momentos distintos. Eso no significa publicar la misma pieza, sino sostener una mirada reconocible sobre temas, tono y calidad.",
          "La repetición vacía produce hábito sin vínculo. Un criterio consistente permite variar y, aun así, seguir siendo identificable.",
        ],
      },
      {
        eyebrow: "03 / Comunidad",
        title: "Observar qué devuelve la audiencia",
        paragraphs: [
          "Comentarios, preguntas, respuestas y usos imprevistos contienen más información que una cifra aislada. Muestran qué parte de la propuesta fue comprendida y cuál necesita claridad.",
          "La estrategia madura cuando esa devolución modifica la siguiente decisión sin convertir cada reacción en mandato. Escuchar no es obedecer todo; es reconocer patrones con criterio.",
        ],
      },
    ],
    quote: "LA ATENCIÓN DURA CUANDO LA EXPERIENCIA CONFIRMA LA PROMESA.",
    notes: [
      { label: "Territorio", value: "Estrategia" },
      { label: "Secuencia", value: "Promesa / experiencia / regreso" },
      { label: "Medida", value: "Calidad del vínculo" },
    ],
    bookProjectSlug: "ingles-con-jeremy-sitio-web",
  },
  "una-noche-no-cabe-en-una-imagen": {
    intro: "Una fotografía puede condensar un instante, pero una experiencia cambia de escala, velocidad y temperatura. Para conservarla necesitamos una secuencia que permita entrar, acercarse, respirar y salir.",
    sections: [
      {
        eyebrow: "01 / Cobertura",
        title: "Fotografiar también los enlaces",
        paragraphs: [
          "Los momentos culminantes son necesarios, pero no explican por sí solos cómo se llegó a ellos. Un desplazamiento, una espera o una mirada hacia el público conectan escenas y devuelven duración al archivo.",
          "Registrar planos abiertos, retratos, detalles y transiciones no es completar una lista. Es reunir escalas capaces de conversar durante la edición.",
        ],
      },
      {
        eyebrow: "02 / Secuencia",
        title: "Editar una curva, no una cronología",
        paragraphs: [
          "El orden temporal sirve como referencia, pero la memoria trabaja mediante asociaciones. Un color puede llamar a otro; un gesto puede responder varias páginas después; un silencio puede separar dos intensidades.",
          "Una buena secuencia conserva orientación mientras modifica el ritmo. Sabemos dónde estamos, aunque la edición no intente narrar cada minuto.",
        ],
      },
      {
        eyebrow: "03 / Permanencia",
        title: "Dejar espacio para volver",
        paragraphs: [
          "Un archivo saturado de clímax agota su propia intensidad. Las imágenes de transición permiten que las más fuertes recuperen escala y que la lectura tenga pausas.",
          "Conservar una noche no significa fijarla. Significa construir una forma abierta que pueda ser recorrida después sin perder su temperatura.",
        ],
      },
    ],
    quote: "LA MEMORIA NO RESUME EL TIEMPO. LE DA UNA FORMA PARA REGRESAR.",
    notes: [
      { label: "Territorio", value: "Archivo" },
      { label: "Escalas", value: "Apertura / gesto / transición" },
      { label: "Salida", value: "Secuencia editorial" },
    ],
    bookProjectSlug: "sofia-stainer-foro-la-paz",
  },
  "poner-en-escena-es-construir-relaciones": {
    intro: "La puesta en escena no consiste en llenar el cuadro. Consiste en tensar la relación entre cuerpos, objetos, arquitectura, luz y tiempo hasta que cada elemento afecte la lectura de los demás.",
    sections: [
      {
        eyebrow: "01 / Cuerpo",
        title: "La posición ya contiene una intención",
        paragraphs: [
          "Un cuerpo frontal afirma; un perfil retiene información; una espalda puede producir distancia o vulnerabilidad. Antes de pedir una acción conviene observar qué expresa la posición inicial.",
          "El gesto gana potencia cuando responde a una fuerza concreta: otro cuerpo, un límite arquitectónico, una fuente de luz o algo que permanece fuera de campo.",
        ],
      },
      {
        eyebrow: "02 / Arquitectura",
        title: "La escena necesita resistencia",
        paragraphs: [
          "Pasillos, desniveles, marcos y vacíos pueden oponerse al movimiento o dirigirlo. Esa resistencia vuelve visible el esfuerzo y evita que el espacio sea intercambiable.",
          "En lugar de decorar una locación, es más útil encontrar su regla: qué permite, qué niega y qué distancia obliga a recorrer.",
        ],
      },
      {
        eyebrow: "03 / Tiempo",
        title: "Dejar que la relación se transforme",
        paragraphs: [
          "Una composición no tiene que permanecer estable. Puede abrirse, comprimirse o romperse mientras cambia el vínculo entre sus elementos.",
          "La duración correcta es la que permite percibir esa transformación. Cortar antes la convierte en información; sostenerla con precisión la vuelve experiencia.",
        ],
      },
    ],
    quote: "DIRIGIR ES HACER VISIBLE LA FUERZA ENTRE LAS COSAS.",
    notes: [
      { label: "Territorio", value: "Dirección" },
      { label: "Elementos", value: "Cuerpo / espacio / tiempo" },
      { label: "Objetivo", value: "Tensión legible" },
    ],
    bookProjectSlug: "la-bande-son-imaginaire",
  },
  "cubrir-un-concierto-sin-borrar-al-publico": {
    intro: "El escenario concentra la acción, pero la audiencia revela su escala y su efecto. Una cobertura completa registra ambas direcciones: lo que se emite y lo que vuelve transformado desde la sala.",
    sections: [
      {
        eyebrow: "01 / Posición",
        title: "Buscar puntos que contengan relación",
        paragraphs: [
          "Desde el foso es fácil producir una serie de retratos sin contexto. Alternar laterales, fondo de sala y posiciones elevadas permite integrar cuerpos, luz, arquitectura y respuesta colectiva.",
          "Cada desplazamiento debe responder a una imagen que falta. Moverse por ansiedad consume atención; moverse para cambiar de escala construye relato.",
        ],
      },
      {
        eyebrow: "02 / Respeto",
        title: "Documentar sin convertir al público en obstáculo",
        paragraphs: [
          "La cobertura comparte el espacio con quienes asistieron. Trabajar con discreción, anticipar rutas y reducir bloqueos protege la experiencia y también produce imágenes más honestas.",
          "Los teléfonos, manos y siluetas no siempre son contaminación. Pueden funcionar como primer plano, medida de distancia o señal de una atención compartida.",
        ],
      },
      {
        eyebrow: "03 / Entrega",
        title: "Editar la respuesta además del espectáculo",
        paragraphs: [
          "Una selección dominada por primeros planos puede describir al artista, pero no la noche. Incorporar entradas, coros, pausas y reacciones devuelve el carácter colectivo del evento.",
          "La proporción depende del encargo, aunque el principio se mantiene: si la audiencia cambió lo ocurrido, necesita existir en el relato final.",
        ],
      },
    ],
    quote: "EL PÚBLICO NO RODEA EL ACONTECIMIENTO. FORMA PARTE DE ÉL.",
    notes: [
      { label: "Territorio", value: "Producción" },
      { label: "Cobertura", value: "Escenario / sala / relación" },
      { label: "Criterio", value: "Moverse con propósito" },
    ],
    bookProjectSlug: "diana-meril-ambar",
  },
  "lo-que-el-publico-devuelve-al-escenario": {
    intro: "Una sala no es un recipiente pasivo. Absorbe, refleja y responde. El público modifica la dinámica del concierto con su presencia física, sus coros y la forma en que llena o deja respirar cada pausa.",
    sections: [
      {
        eyebrow: "01 / Ambiente",
        title: "Registrar el lugar además de la fuente",
        paragraphs: [
          "Una señal cercana ofrece definición, pero no explica por sí sola la escala del evento. Un par de ambiente bien ubicado conserva cola, profundidad y reacción sin depender del micrófono de una cámara.",
          "La posición debe evitar una masa indistinta y buscar una imagen estéreo estable. La sala necesita sentirse amplia sin desplazar el centro musical.",
        ],
      },
      {
        eyebrow: "02 / Dinámica",
        title: "Dejar que la respuesta tenga forma",
        paragraphs: [
          "El aplauso no tiene un único nivel. Comienza, se propaga, encuentra un máximo y cae. Comprimirlo en exceso elimina la percepción de escala que intentábamos conservar.",
          "Automatizar el ambiente por secciones permite acompañar esa curva. No se trata de subir al público todo el tiempo, sino de abrir la sala cuando la música lo necesita.",
        ],
      },
      {
        eyebrow: "03 / Montaje",
        title: "Usar la escucha para enlazar momentos",
        paragraphs: [
          "Una respiración colectiva o un coro pueden comenzar antes del cambio de imagen y prolongarse después. Ese puente sonoro mantiene continuidad aunque el montaje salte de escala.",
          "La audiencia devuelve contexto, tiempo y temperatura. Integrarla con precisión evita que el registro se convierta en una interpretación aislada dentro de un vacío artificial.",
        ],
      },
    ],
    quote: "LA SALA TAMBIÉN INTERPRETA: RESPONDE, PROLONGA Y TRANSFORMA.",
    notes: [
      { label: "Territorio", value: "Diseño sonoro" },
      { label: "Fuentes", value: "Directo / ambiente / respuesta" },
      { label: "Objetivo", value: "Conservar escala" },
    ],
    bookProjectSlug: "la-bande-son-imaginaire",
  },
  "disenar-una-secuencia-no-una-coleccion": {
    intro: "Una serie no mejora por acumular imágenes fuertes. Necesita relaciones: una entrada, cambios de distancia, contrastes, pausas y una salida que transforme la lectura de lo anterior.",
    sections: [
      {
        eyebrow: "01 / Selección",
        title: "Elegir por función, no sólo por impacto",
        paragraphs: [
          "Dos fotografías excelentes pueden cumplir la misma tarea. Si ambas permanecen, compiten y reducen el ritmo. La edición pregunta qué aporta cada imagen que ninguna otra ofrece.",
          "Conviene asignar funciones provisionales: apertura, contexto, retrato, transición, detalle, clímax o cierre. Las etiquetas no dictan el orden, pero revelan repeticiones y ausencias.",
        ],
      },
      {
        eyebrow: "02 / Montaje",
        title: "Construir relaciones entre páginas",
        paragraphs: [
          "Dirección de mirada, temperatura, forma y escala pueden enlazar dos imágenes o producir una ruptura deliberada. El intervalo entre ellas también comunica.",
          "Una secuencia funciona cuando cada imagen modifica a la siguiente. El diseño no rellena una retícula: administra anticipación, eco y contraste.",
        ],
      },
      {
        eyebrow: "03 / Prueba",
        title: "Leer a velocidad real",
        paragraphs: [
          "Reducir las imágenes a miniaturas ayuda a ver ritmo; ampliarlas permite comprobar detalle y permanencia. Ambas lecturas son necesarias.",
          "Imprimir una maqueta o recorrer el prototipo sin detenerse revela acumulaciones que el tablero de selección oculta. Editar también es quitar hasta que la secuencia pueda respirar.",
        ],
      },
    ],
    quote: "UNA SECUENCIA NO SUMA IMÁGENES. CONSTRUYE TIEMPO ENTRE ELLAS.",
    notes: [
      { label: "Territorio", value: "Diseño editorial" },
      { label: "Herramientas", value: "Selección / montaje / ritmo" },
      { label: "Principio", value: "Cada imagen cumple una función" },
    ],
    bookProjectSlug: "sofia-stainer-foro-la-paz",
  },
  "una-idea-debe-sobrevivir-al-formato": {
    intro: "Una campaña no es un archivo adaptado a muchas medidas. Es una idea capaz de mantener su sentido al convertirse en anuncio, pieza editorial, experiencia, conversación o seguimiento.",
    sections: [
      {
        eyebrow: "01 / Núcleo",
        title: "Definir lo que no puede cambiar",
        paragraphs: [
          "Antes de producir formatos conviene escribir el principio en una frase operable. Debe indicar qué queremos que la audiencia comprenda o sienta, sin depender de una imagen o plataforma específica.",
          "Ese núcleo no es necesariamente el eslogan. Es la decisión que permite evaluar si cada ejecución pertenece al mismo sistema.",
        ],
      },
      {
        eyebrow: "02 / Traducción",
        title: "Adaptar la función, no encoger la pieza",
        paragraphs: [
          "Una valla necesita reconocimiento inmediato; un artículo puede desarrollar argumento; una historia breve puede activar curiosidad. Repetir toda la información en cada soporte ignora cómo se usa.",
          "La coherencia aparece cuando cada formato cumple una parte distinta de la misma idea. La campaña se vuelve una red de experiencias, no una colección de recortes.",
        ],
      },
      {
        eyebrow: "03 / Control",
        title: "Probar el sistema en sus extremos",
        paragraphs: [
          "Antes de escalar producción, conviene ensayar el formato más pequeño, el más lento y el más físico. Si la idea sólo sobrevive en la pieza principal, todavía depende demasiado de una ejecución.",
          "Un sistema resistente define jerarquías, tono, reglas visuales y márgenes de variación. Así puede crecer sin convertirse en ruido uniforme.",
        ],
      },
    ],
    quote: "LA COHERENCIA NO REPITE UNA PIEZA. TRADUCE UNA MISMA DECISIÓN.",
    notes: [
      { label: "Territorio", value: "Branding" },
      { label: "Ruta", value: "Núcleo / traducción / prueba" },
      { label: "Objetivo", value: "Consistencia multiformato" },
    ],
    bookProjectSlug: "okame",
  },
  "editar-memoria-es-conservar-relaciones": {
    intro: "Un archivo útil no conserva sólo archivos digitales. Conserva procedencia, intención, vínculos y decisiones para que una imagen pueda volver a leerse sin quedar separada de aquello que la hizo significativa.",
    sections: [
      {
        eyebrow: "01 / Contexto",
        title: "Nombrar más allá de la fecha",
        paragraphs: [
          "La fecha de captura es necesaria, pero insuficiente. Proyecto, personas, lugar, autoría, versión y condiciones de uso convierten una imagen almacenada en un documento recuperable.",
          "Registrar estos datos al ingresar el material cuesta menos que reconstruirlos meses después. El contexto también es parte del activo.",
        ],
      },
      {
        eyebrow: "02 / Relación",
        title: "Conservar series, no archivos aislados",
        paragraphs: [
          "Una fotografía puede pertenecer a una secuencia, una entrega, una publicación y un proyecto mayor al mismo tiempo. El archivo necesita representar esos vínculos sin duplicar el original.",
          "Colecciones, etiquetas controladas y referencias cruzadas permiten regresar desde distintos caminos. Buscar deja de depender de recordar un nombre exacto.",
        ],
      },
      {
        eyebrow: "03 / Cuidado",
        title: "Separar originales, trabajo y salida",
        paragraphs: [
          "El original debe permanecer intacto; las decisiones de edición necesitan versiones identificables; las exportaciones requieren un destino y una vigencia. Mezclar las tres capas produce pérdidas y usos incorrectos.",
          "Respaldar no es archivar si no podemos verificar integridad ni recuperar una versión. La memoria se sostiene con redundancia, criterios de acceso y revisiones periódicas.",
        ],
      },
    ],
    quote: "ARCHIVAR ES CONSERVAR EL CAMINO QUE LE DEVUELVE SENTIDO A UNA IMAGEN.",
    notes: [
      { label: "Territorio", value: "Oficio y creatividad" },
      { label: "Capas", value: "Original / edición / entrega" },
      { label: "Objetivo", value: "Memoria recuperable" },
    ],
    bookProjectSlug: "surfistas-del-sistema",
  },
  "conocias-esta-tecnica-linograbado-reduccion": {
    intro: "El linograbado por reducción permite imprimir una imagen de varios colores utilizando una sola matriz. Después de cada tiraje se talla una nueva zona del bloque: lo que se elimina ya no puede recuperarse, por eso cada capa exige registro, orden y una decisión irreversible.",
    sections: [
      {
        eyebrow: "01 / La lógica",
        title: "Imprimir primero lo que debe permanecer",
        paragraphs: [
          "El proceso suele avanzar de los tonos más claros a los más oscuros. Se talla la primera reserva, se entinta la matriz y se imprime toda la edición. Después se retira del bloque aquello que conservará ese color antes de aplicar el siguiente.",
          "Como la matriz se destruye poco a poco, no es posible regresar a una etapa anterior para producir copias adicionales. Definir el tamaño final de la edición y guardar pruebas de estado resulta indispensable.",
        ],
      },
      {
        eyebrow: "02 / El registro",
        title: "La precisión comienza fuera de la imagen",
        paragraphs: [
          "Una guía en forma de L, topes fijos o un sistema de pines mantiene el papel en la misma posición durante todas las capas. Antes del tiraje conviene probar el grosor del papel y marcar siempre el mismo borde de alimentación.",
          "Los pequeños desplazamientos pueden ser parte del lenguaje, pero deben ser controlados. La diferencia entre vibración expresiva y error accidental está en que el sistema permite repetir el resultado.",
        ],
      },
      {
        eyebrow: "03 / La tinta",
        title: "Cada capa modifica a las anteriores",
        paragraphs: [
          "La opacidad, la presión y el tiempo de secado cambian el color final. Una tinta transparente mezcla ópticamente las capas; una más cubriente reemplaza parte de lo impreso. Las pruebas deben realizarse sobre el mismo papel de la edición.",
          "Planear tres o cuatro valores claros produce mejores decisiones que perseguir una paleta demasiado extensa. La fuerza del método aparece en la relación entre límite material, textura y secuencia.",
        ],
      },
    ],
    quote: "EN EL LINOGRABADO POR REDUCCIÓN, CADA COLOR ES TAMBIÉN UNA DECISIÓN DE NO REGRESO.",
    notes: [
      { label: "Técnica", value: "Linograbado por reducción" },
      { label: "Herramientas", value: "Gubias / rodillo / guía de registro" },
      { label: "Orden", value: "Claro → medio → oscuro" },
    ],
    bookProjectSlug: "okame",
  },
  "conecta-mejor-el-secreto-de-un-buen-ecommerce": {
    intro: "El secreto de un buen ecommerce no es una animación espectacular ni un botón más brillante. Es la continuidad entre lo que la marca promete, la información que ayuda a decidir y una operación capaz de cumplir sin fricción.",
    sections: [
      {
        eyebrow: "01 / Decisión",
        title: "Responder dudas antes de pedir la compra",
        paragraphs: [
          "Una ficha útil explica qué es el producto, para quién funciona, qué incluye, cuándo llega y qué ocurre si no cumple la expectativa. Fotografías consistentes, medidas comparables y costos visibles reducen incertidumbre.",
          "La conversión no mejora ocultando información hasta el último paso. Mejora cuando cada pantalla permite tomar la siguiente decisión con confianza.",
        ],
      },
      {
        eyebrow: "02 / Recorrido",
        title: "Conservar contexto hasta el checkout",
        paragraphs: [
          "Categorías comprensibles, búsqueda tolerante y filtros relevantes ayudan a explorar. Una vez elegido el producto, el carrito debe conservar variantes, cantidades, disponibilidad y fecha estimada sin sorpresas.",
          "En móvil conviene probar el recorrido con una mano, conexión lenta y datos reales. Cada campo innecesario y cada salto de contexto compiten contra la intención de compra.",
        ],
      },
      {
        eyebrow: "03 / Operación",
        title: "La experiencia continúa después del pago",
        paragraphs: [
          "Inventario, preparación, empaque, seguimiento y devoluciones forman parte del producto digital. Una interfaz impecable no compensa un pedido equivocado o una comunicación ausente.",
          "Las mejores mejoras surgen al conectar métricas con causas: búsquedas sin resultados, abandono por costo de envío, entregas tardías o consultas repetidas. El ecommerce crece cuando diseño y operación comparten el mismo diagnóstico.",
        ],
      },
    ],
    quote: "UNA TIENDA CONVIERTE CUANDO LA PROMESA, LA DECISIÓN Y LA ENTREGA CUENTAN LA MISMA HISTORIA.",
    notes: [
      { label: "Ruta", value: "Descubrir / decidir / recibir" },
      { label: "Prioridad", value: "Claridad antes que persuasión" },
      { label: "Medición", value: "Fricción y cumplimiento" },
    ],
    bookProjectSlug: "frutisa-branding-sitio-web",
  },
  "antes-de-pedir-presupuesto-audiovisual": {
    intro: "Pedir cuánto cuesta un video sin definir para qué servirá produce cifras difíciles de comparar. Un presupuesto serio depende de alcance, condiciones de producción, derechos y entregables; preparar esa información ahorra rondas y evita que lo importante aparezca como un costo imprevisto.",
    sections: [
      {
        eyebrow: "01 / Objetivo",
        title: "Define el problema antes que la duración",
        paragraphs: [
          "Explica qué debe cambiar en la audiencia, dónde verá la pieza y cuál es la acción esperada. Un video de treinta segundos para pauta, una pieza institucional y un retrato documental pueden durar lo mismo y exigir producciones completamente distintas.",
          "Incluye referencias por cualidad concreta: ritmo, escala, luz, tratamiento sonoro o tipo de interpretación. Una referencia no es una orden de copiar; es una forma de hacer visible la expectativa.",
        ],
      },
      {
        eyebrow: "02 / Alcance",
        title: "Nombra las piezas que realmente necesitas",
        paragraphs: [
          "Indica duración aproximada, formatos verticales u horizontales, idiomas, subtítulos, versiones, fotografías derivadas y fecha de entrega. Cada variante afecta rodaje, encuadre, montaje y revisión.",
          "También aclara qué ya existe: guion, locación, talento, producto, permisos, música o identidad. Lo disponible reduce incertidumbre sólo cuando puede revisarse antes de cotizar.",
        ],
      },
      {
        eyebrow: "03 / Condiciones",
        title: "El presupuesto también compra viabilidad",
        paragraphs: [
          "Ciudad, jornadas, horarios, accesos, traslados, número de participantes y restricciones técnicas modifican el equipo necesario. Una visita de locación puede revelar energía, ruido, seguridad y tiempos de montaje que ninguna fotografía explica.",
          "Comparar propuestas exige revisar inclusiones, rondas, licencias, vigencia y forma de pago, no sólo el total. Si todavía no hay presupuesto objetivo, compartir un rango permite diseñar una solución posible en lugar de adivinar una escala.",
        ],
      },
    ],
    quote: "UN BUEN PRESUPUESTO NO ADIVINA LA PRODUCCIÓN: LA HACE VISIBLE ANTES DE FILMAR.",
    notes: [
      { label: "Define", value: "Objetivo / audiencia / canal" },
      { label: "Entrega", value: "Piezas / formatos / versiones" },
      { label: "Confirma", value: "Derechos / tiempos / revisiones" },
    ],
    bookProjectSlug: "enjambre-estadio-gnp",
  },
  "como-grabar-una-voz": {
    intro: "Una voz bien grabada no necesita sonar terminada desde el primer minuto. Necesita conservar interpretación, claridad y margen suficiente para que la mezcla decida después cuánto cuerpo, proximidad y ambiente necesita.",
    sections: [
      {
        eyebrow: "01 / Espacio",
        title: "Controla reflexiones antes de elegir micrófono",
        paragraphs: [
          "Escucha la sala con palmas y voz hablada. Las reflexiones cortas, el ruido de ventilación y las superficies paralelas quedan más expuestos cuando comprimimos. Coloca absorción detrás y a los lados de la persona sin encerrar por completo la voz.",
          "Un clóset lleno de ropa puede controlar agudos, pero también producir un sonido opaco. Busca equilibrio: menos rebote problemático sin borrar toda sensación de aire.",
        ],
      },
      {
        eyebrow: "02 / Posición",
        title: "Empieza a quince o veinte centímetros",
        paragraphs: [
          "Usa un filtro antipop y coloca la cápsula ligeramente por encima o fuera del eje directo si las consonantes son agresivas. Acercarse aumenta detalle y efecto de proximidad; alejarse integra más sala y estabiliza cambios de volumen.",
          "El patrón cardioide requiere atención a la parte frontal y al rechazo posterior. Orientar esa zona de rechazo hacia el ruido más constante suele ser más efectivo que intentar retirarlo después.",
        ],
      },
      {
        eyebrow: "03 / Nivel",
        title: "Graba interpretación, no una forma de onda grande",
        paragraphs: [
          "Ajusta la ganancia con el fragmento más intenso y conserva margen. Picos alrededor de −12 a −6 dBFS son una referencia práctica, no una meta rígida. Evita limitación o compresión irreversible si no responde a una intención clara.",
          "Haz una toma corta, escúchala en audífonos y corrige distancia, ruido o comodidad antes de continuar. Una persona que puede respirar y moverse de forma consistente produce una señal más útil que cualquier ajuste extremo.",
        ],
      },
    ],
    quote: "LA MEJOR CADENA DE VOZ COMIENZA CON UNA PERSONA CÓMODA EN UN ESPACIO QUE ESCUCHA BIEN.",
    notes: [
      { label: "Inicio", value: "15–20 cm con filtro antipop" },
      { label: "Margen", value: "Picos aproximados de −12 a −6 dBFS" },
      { label: "Orden", value: "Sala / posición / ganancia" },
    ],
    bookProjectSlug: "maria-daniela-y-su-sonido-lasser",
  },
  "como-editar-un-piano": {
    intro: "Editar piano exige escuchar más que las notas. El ataque, la resonancia, el pedal y el ruido mecánico forman una continuidad; un corte limpio en pantalla puede sentirse imposible cuando rompe esa respiración.",
    sections: [
      {
        eyebrow: "01 / Preparación",
        title: "Alinea tomas antes de elegir fragmentos",
        paragraphs: [
          "Confirma que las tomas usan la misma afinación, posición de micrófonos y ganancia. Si hay varios micrófonos, agrúpalos para que cada corte preserve sus relaciones de fase.",
          "Crea una pista de referencia con marcas de estructura, tempo y comentarios de interpretación. El objetivo del comping no es fabricar perfección nota por nota, sino reunir frases compatibles.",
        ],
      },
      {
        eyebrow: "02 / Corte",
        title: "Busca respiraciones y decaimientos compatibles",
        paragraphs: [
          "Los mejores puntos suelen aparecer antes de un ataque claro o durante una zona estable de resonancia. Evita cortar en medio de un cambio de pedal: la cola armónica revelará inmediatamente la unión.",
          "Aplica fundidos cruzados suficientemente largos para conservar la sala, pero revisa que no dupliquen ataques. Escucha en mono para detectar pérdidas de fase y a volumen bajo para percibir saltos de ambiente.",
        ],
      },
      {
        eyebrow: "03 / Tiempo",
        title: "Corrige el pulso sin cuadrar la interpretación",
        paragraphs: [
          "Antes de cuantizar, identifica qué notas sostienen el ritmo y cuáles anticipan o retrasan con intención. Mover grupos completos suele conservar mejor la relación entre manos que desplazar eventos aislados.",
          "Deja el ajuste elástico para problemas puntuales y verifica transitorios, colas y fase después de cada cambio. Si la edición llama la atención sobre sí misma, probablemente ha corregido más de lo necesario.",
        ],
      },
    ],
    quote: "EDITAR PIANO ES CONSERVAR LA FRASE MIENTRAS HACEMOS INVISIBLE LA UNIÓN.",
    notes: [
      { label: "Agrupa", value: "Todos los micrófonos de la toma" },
      { label: "Protege", value: "Ataque / pedal / resonancia" },
      { label: "Verifica", value: "Fase / mono / volumen bajo" },
    ],
    bookProjectSlug: "surfistas-del-sistema",
  },
  "cinco-wedding-planners-mexico": {
    intro: "No existe un wedding planner universalmente mejor: la elección depende de destino, número de invitados, nivel de producción, idioma, presupuesto y forma de trabajar. Esta selección reúne cinco estudios activos con enfoques distintos para iniciar una comparación informada.",
    sections: [
      {
        eyebrow: "01 / Centro y Bajío",
        title: "Penzi Weddings y González + Helfon",
        paragraphs: [
          "Penzi Weddings trabaja desde San Miguel de Allende y presenta un servicio integral que reúne planeación, diseño, decoración, gastronomía y logística. Es una referencia pertinente para celebraciones de destino que necesitan conocimiento local y una experiencia completa alrededor de la ciudad.",
          "González + Helfon se presenta como firma de planeación de eventos con alcance internacional. Su portafolio resulta útil para observar producciones de gran escala y una dirección estética especialmente cuidada.",
        ],
      },
      {
        eyebrow: "02 / Los Cabos",
        title: "Karla Casillas & Co.",
        paragraphs: [
          "Karla Casillas & Co. opera como casa de diseño y planeación en Los Cabos. Integra producción, flores, renta y logística desde un mismo equipo, una ventaja cuando la celebración exige coordinar múltiples jornadas y proveedores.",
          "Su propuesta conviene a parejas que buscan una producción de destino altamente integrada. Antes de decidir, vale la pena confirmar disponibilidad, inversión mínima, alcance de viajes y qué componentes se resuelven internamente.",
        ],
      },
      {
        eyebrow: "03 / Caribe y destinos múltiples",
        title: "Sora Weddings y Sparks Weddings",
        paragraphs: [
          "Sora Weddings es un estudio boutique radicado en Tulum que ofrece planeación, diseño y dirección creativa con conocimiento de Riviera Maya. Trabaja con un número limitado de parejas, un modelo relevante para quien prioriza acompañamiento cercano.",
          "Sparks Weddings produce bodas de destino en regiones como Los Cabos, Tulum y Punta Mita. Su enfoque combina negociación de venues, curaduría de proveedores, logística y ejecución. En cualquiera de las cinco opciones, compara procesos, honorarios, exclusiones, referencias recientes y compatibilidad personal antes de contratar.",
        ],
      },
    ],
    quote: "EL MEJOR EQUIPO NO ES EL MÁS VISIBLE: ES EL QUE ENTIENDE TU ESCALA, TU DESTINO Y TU FORMA DE DECIDIR.",
    notes: [
      { label: "Criterio", value: "Región / escala / integración" },
      { label: "Verificación", value: "Sitios oficiales consultados en septiembre de 2026" },
      { label: "Antes de firmar", value: "Alcance / honorarios / referencias" },
    ],
    bookProjectSlug: "mariana-y-leo",
  },
  "como-preparar-un-scouting-de-locacion-cinematografica": {
    intro: "Un scouting no es una excursión para encontrar una postal. Es la primera conversación real entre el guion, la producción y un lugar. Lo que aparece en esa visita —una ruta de carga, un rebote inesperado, una restricción de horario o un silencio útil— cambia las decisiones antes de que sean costosas.",
    sections: [
      {
        eyebrow: "01 / Lectura",
        title: "Llegar con preguntas, no con una lista de planos",
        paragraphs: [
          "Antes de visitar, define qué necesita ocurrir en cada escena: quién entra, quién espera, qué debe sentirse grande, qué debe permanecer oculto y qué distancia existe entre los cuerpos. Así el lugar puede responder a una necesidad narrativa en lugar de convertirse en una colección de referencias bonitas.",
          "Camina primero sin cámara. Detecta direcciones de luz, alturas, ejes, texturas, fondos y cambios de escala. Después registra ángulos posibles, pero también las zonas que no funcionan. Un scouting valioso documenta límites con la misma atención que oportunidades.",
        ],
      },
      {
        eyebrow: "02 / Condición",
        title: "Medir el espacio que la imagen no muestra",
        paragraphs: [
          "La fotografía de una locación rara vez revela ruido, reverberación, estacionamiento, ascensores, accesos, baños, seguridad o capacidad eléctrica. Revisa esos elementos con la persona responsable y toma nota de horarios, permisos, rutas de equipo y restricciones de montaje.",
          "Observa el lugar en la franja horaria en que se pretende filmar. La posición del sol, el flujo de gente y el sonido de la calle pueden transformar por completo una arquitectura. Si no es posible volver, registra una referencia de orientación y pregunta qué cambia durante el día.",
        ],
      },
      {
        eyebrow: "03 / Decisión",
        title: "Salir con una hipótesis de rodaje",
        paragraphs: [
          "La visita debe terminar con decisiones accionables: qué áreas se usan, qué se debe controlar, qué plano exige permiso adicional, qué equipo cabe y qué alternativa existe si cambia el clima o el acceso. Una planta simple con recorridos y fotografías señaladas suele ser más útil que una carpeta extensa sin jerarquía.",
          "No se trata de resolver toda la puesta en escena de antemano. Se trata de llegar al rodaje con el lenguaje del lugar ya leído, para que el equipo pueda concentrarse en los cuerpos, el tiempo y la escena.",
        ],
      },
    ],
    quote: "UNA LOCACIÓN NO SE ELIGE SÓLO POR LO QUE MUESTRA: SE ELIGE POR LO QUE HACE POSIBLE.",
    notes: [
      { label: "Lleva", value: "Guion / plano / registro de foto y audio" },
      { label: "Confirma", value: "Acceso / energía / horarios / permisos" },
      { label: "Entrega", value: "Rutas, riesgos y alternativas" },
    ],
    bookProjectSlug: "enjambre-estadio-gnp",
  },
  "como-dirigir-a-una-persona-que-no-es-modelo": {
    intro: "La mayoría de las personas no necesita aprender a posar para producir un buen retrato. Necesita entender qué está ocurriendo, disponer de una acción concreta y sentir que no será evaluada por no parecerse a una referencia. La dirección comienza antes de levantar la cámara.",
    sections: [
      {
        eyebrow: "01 / Confianza",
        title: "Explicar la situación antes de pedir un gesto",
        paragraphs: [
          "Cuenta qué estás buscando, cuánto tiempo tomará y qué parte de su experiencia importa para la imagen. Una instrucción como “haz algo natural” deja a la persona sola frente a una expectativa imposible; una acción como “muéstrame cómo preparas esta pieza” le devuelve un punto de apoyo real.",
          "Evita corregir cada movimiento. Deja que la primera toma sirva para encontrar ritmo, luz y distancia. Nombrar lo que funciona —la forma de sostener una herramienta, una pausa, una dirección de mirada— es más útil que repetir “relájate”.",
        ],
      },
      {
        eyebrow: "02 / Acción",
        title: "Dar algo que hacer con las manos y la atención",
        paragraphs: [
          "Las manos se sienten incómodas cuando no tienen una función. Propón acciones pertenecientes a su oficio: ordenar una mesa, revisar una impresión, caminar una ruta conocida, explicar un objeto. La acción produce variaciones pequeñas que la cámara puede esperar sin fabricar una pose.",
          "Si el retrato requiere quietud, llega a ella después de una actividad. Una pausa entre tareas conserva respiración y presencia. La quietud elegida suele verse más viva que una postura sostenida desde el inicio.",
        ],
      },
      {
        eyebrow: "03 / Encuadre",
        title: "Construir con la persona, no a costa de ella",
        paragraphs: [
          "Comparte algunas imágenes durante la sesión, sobre todo si hay una duda de vestuario, luz o contexto. Ver el resultado reduce incertidumbre y permite que la persona proponga algo que tú no habías considerado. La colaboración mejora tanto la precisión como la confianza.",
          "Dirigir no significa borrar el nervio. Significa convertirlo en una condición legible: una mirada breve, una concentración sobre el trabajo, una respiración antes de hablar. El retrato se vuelve creíble cuando aún conserva a quien estaba ahí.",
        ],
      },
    ],
    quote: "LA DIRECCIÓN NO PIDE UNA ACTUACIÓN. CREA LAS CONDICIONES PARA QUE ALGUIEN PUEDA ESTAR PRESENTE.",
    notes: [
      { label: "Primero", value: "Contexto y duración clara" },
      { label: "Después", value: "Acción propia del oficio" },
      { label: "Criterio", value: "Presencia antes que pose" },
    ],
    bookProjectSlug: "sofia-stainer-foro-la-paz",
  },
  "como-grabar-una-entrevista-en-una-locacion-dificil": {
    intro: "Una entrevista puede suceder junto a una avenida, dentro de una cocina o en una fábrica que no se detiene. En esos casos, buscar silencio absoluto suele ser una pérdida de tiempo. El objetivo es proteger la voz, entender el ambiente y elegir una solución que no rompa la situación que queremos registrar.",
    sections: [
      {
        eyebrow: "01 / Escucha",
        title: "Detectar el ruido antes de instalar",
        paragraphs: [
          "Llega con tiempo para escuchar sin conversación. Identifica qué fuentes son continuas —ventilación, refrigeradores, tráfico— y cuáles aparecen por ciclos —licuadoras, puertas, trenes, avisos. Pregunta si pueden pausarse durante algunos minutos o si existe una franja más estable.",
          "No todo sonido debe desaparecer. Un ambiente propio del lugar puede ayudar a situar la entrevista, siempre que la voz mantenga inteligibilidad. Graba un minuto de atmósfera sin diálogo: será útil para el montaje y para revisar cualquier corte posterior.",
        ],
      },
      {
        eyebrow: "02 / Proximidad",
        title: "Acercar el micrófono sin invadir la conversación",
        paragraphs: [
          "Un lavalier bien colocado o un boom cercano y fuera de cuadro gana más claridad que cualquier reducción de ruido aplicada después. Elige la herramienta según el encuadre, el vestuario y el movimiento; no por apariencia. Revisa roce de tela, joyería, pelo y delantal antes de comenzar.",
          "Busca una orientación que aleje el punto de máxima captación de la fuente más agresiva. Si hay superficies duras muy cercanas, un panel portátil, una tela gruesa fuera de cuadro o una pequeña variación de posición puede reducir reflexión sin convertir la locación en un estudio falso.",
        ],
      },
      {
        eyebrow: "03 / Cobertura",
        title: "Registrar una segunda oportunidad",
        paragraphs: [
          "Monitorea con audífonos cerrados durante respuestas importantes y graba una pista de respaldo cuando el equipo lo permita. Si una interrupción cubre una idea clave, pide repetir sólo esa frase cuando termine el ruido, sin reconstruir toda la conversación.",
          "Al finalizar, registra frases de enlace, silencios y acciones de la locación. En edición, esas piezas permiten conservar el ritmo sin limpiar la entrevista hasta volverla ajena al lugar donde ocurrió.",
        ],
      },
    ],
    quote: "EL SONIDO DE UNA LOCACIÓN DIFÍCIL NO SE GANA EN POSPRODUCCIÓN: SE DECIDE AL ESCUCHAR Y POSICIONAR.",
    notes: [
      { label: "Antes", value: "Escucha y graba ambiente" },
      { label: "Protege", value: "Voz cercana y ropa sin roce" },
      { label: "Respalda", value: "Pista extra y frases de enlace" },
    ],
    bookProjectSlug: "la-bande-son-imaginaire",
  },
  "conocias-esta-tecnica-risografia": {
    intro: "La risografía es un sistema de impresión por capas que usa masters y tambores de tinta para producir tirajes ágiles, con colores intensos y pequeñas variaciones de registro. No intenta imitar la perfección de la impresión offset: hace visibles el papel, la superposición y el paso de cada color.",
    sections: [
      {
        eyebrow: "01 / Capas",
        title: "Diseñar cada tinta como una decisión independiente",
        paragraphs: [
          "Una imagen a dos o tres tintas no es una ilustración a todo color convertida al final. Se construye separando masas, texturas y transparencias desde el inicio. Cada color recibe un archivo propio y una función: fondo, forma, sombra, detalle o mezcla óptica.",
          "Cuando dos tintas transparentes se superponen, aparece un tercer tono. Anticipar esas mezclas permite trabajar con una paleta económica y expresiva. Las pruebas de sobreimpresión son indispensables porque el resultado depende del papel y la densidad real de cada tinta.",
        ],
      },
      {
        eyebrow: "02 / Registro",
        title: "Aceptar la vibración sin perder el control",
        paragraphs: [
          "Cada pasada de papel puede desplazarse ligeramente. En vez de tratar ese margen como un defecto automático, el diseño puede aprovecharlo con bordes amplios, texturas, tramas y formas que soporten una pequeña variación. El registro es parte de la composición, no sólo una corrección técnica.",
          "Aun así, hay que planearlo. Mantén áreas críticas alejadas de recortes mínimos, prueba el orden de las tintas y revisa cómo se comporta el papel entre pasadas. La libertad material funciona mejor cuando el sistema sabe dónde puede ceder.",
        ],
      },
      {
        eyebrow: "03 / Tiraje",
        title: "Editar para el objeto que llegará a las manos",
        paragraphs: [
          "La risografía es especialmente potente en pósters, publicaciones cortas, invitaciones y pequeñas ediciones: formatos donde textura, reverso y tacto también comunican. Elegir un papel absorbente, una tinta dominante y un orden de lectura claro importa tanto como el archivo digital.",
          "Conserva pruebas y anota la combinación de papel, color y orden de impresión. Ese registro transforma un experimento aislado en una práctica que puede repetirse, ajustarse y convertirse en sistema editorial.",
        ],
      },
    ],
    quote: "EN RISOGRAFÍA, LA VARIACIÓN NO ES UN ACCIDENTE: ES PARTE DE LA FIRMA MATERIAL DE LA IMAGEN.",
    notes: [
      { label: "Piensa", value: "Una capa por cada tinta" },
      { label: "Prueba", value: "Papel / orden / sobreimpresión" },
      { label: "Conserva", value: "Pruebas y receta del tiraje" },
    ],
    bookProjectSlug: "shakti-yoga-estudio",
  },
  "la-pagina-de-inicio-no-tiene-que-contarlo-todo": {
    intro: "La página de inicio suele recibir una misión imposible: explicar toda la empresa, mostrar todos los servicios, probar toda la credibilidad y convertir a cada visitante. Cuando intenta hacerlo de una vez, termina por no orientar a nadie. Su función es más precisa: abrir una ruta clara hacia lo que importa.",
    sections: [
      {
        eyebrow: "01 / Promesa",
        title: "Decir para quién existe y por qué importa",
        paragraphs: [
          "La primera pantalla necesita responder una pregunta esencial: qué cambio puede esperar la persona que llegó aquí. No hace falta resumir toda la historia de la marca; hace falta elegir la idea que permite reconocer si el sitio es relevante para ella.",
          "Una promesa clara combina problema, enfoque y consecuencia. Si esa frase sólo podría pertenecer a cualquier competidor, todavía no está lista. La especificidad no viene de enumerar servicios, sino de nombrar la decisión que los conecta.",
        ],
      },
      {
        eyebrow: "02 / Ruta",
        title: "Convertir la navegación en una secuencia",
        paragraphs: [
          "Después de la entrada, cada bloque debe responder a una objeción o abrir una siguiente pregunta: cómo trabajan, qué han hecho, para quién es, qué ocurre después. Organizar la página como una secuencia evita que los módulos compitan por la misma atención.",
          "Los llamados a la acción no necesitan repetirse por ansiedad. Cada uno debe nombrar una acción real: ver casos, comprender un servicio, iniciar una conversación o conocer al equipo. La claridad del verbo reduce la fricción mejor que una urgencia artificial.",
        ],
      },
      {
        eyebrow: "03 / Prueba",
        title: "Dejar que el resto del sitio complete el argumento",
        paragraphs: [
          "Una homepage no debe cargar con todas las pruebas. Los casos de estudio, las páginas de servicio, la sección de equipo y las respuestas a preguntas frecuentes existen para desarrollar lo que la entrada anuncia. Enlazarlas en el momento correcto hace que el sitio respire.",
          "Revisa la página con una intención concreta y en una pantalla pequeña. Si una persona no puede identificar el siguiente paso sin leerlo todo, falta jerarquía. Si entiende el camino aunque no recorra cada módulo, la página ya está cumpliendo su trabajo.",
        ],
      },
    ],
    quote: "UNA PÁGINA DE INICIO NO ES EL SITIO ENTERO. ES LA PRIMERA DECISIÓN QUE ORDENA EL RECORRIDO.",
    notes: [
      { label: "Primero", value: "Promesa específica" },
      { label: "Después", value: "Ruta y siguiente acción" },
      { label: "Comprueba", value: "Jerarquía en móvil" },
    ],
    bookProjectSlug: "ingles-con-jeremy-sitio-web",
  },
  "cinco-fotografos-de-boda-mexicanos": {
    intro: "No hay una sola forma correcta de fotografiar una boda. Hay miradas que privilegian la observación, otras que construyen una atmósfera más editorial y otras que trabajan el destino como parte del relato. Esta selección no ordena a nadie del mejor al peor: reúne cinco referencias mexicanas para reconocer qué tipo de memoria te interesa construir.",
    sections: [
      {
        eyebrow: "01 / Narrativa de destino",
        title: "Wedding Media y FM Weddings",
        paragraphs: [
          "Wedding Media trabaja celebraciones en distintos destinos de México, con presencia en ciudades y regiones como Ciudad de México, Los Cabos, Riviera Maya y Oaxaca. Sus imágenes son una referencia útil para observar cómo paisaje, arquitectura y grupos grandes pueden pertenecer a una misma secuencia.",
          "FM Weddings, dirigido por Fernanda, propone una mirada natural, mínima y elegante desde Ciudad de México, con trabajo también en el Bajío. Vale la pena estudiarlo si buscas una relación contenida entre retrato, luz disponible y detalles que no interrumpen la experiencia de la celebración.",
        ],
      },
      {
        eyebrow: "02 / Documento y cercanía",
        title: "Pastrana Estudio y Christian Macías",
        paragraphs: [
          "Pastrana Estudio se presenta desde Chihuahua y trabaja bodas de destino en diferentes regiones del país. Su portafolio permite leer una combinación entre observación documental y construcción creativa de escenas, especialmente útil para quien quiere conservar contexto sin renunciar a una imagen pensada.",
          "Christian Macías, desde Guadalajara, describe su práctica desde la fotografía documental de bodas. Su trabajo recuerda que una cobertura puede encontrar fuerza en gestos pequeños, relaciones familiares y momentos que aparecen una sola vez, sin forzar una coreografía para cada imagen.",
        ],
      },
      {
        eyebrow: "03 / Mirada sostenida",
        title: "Say González y la pregunta correcta",
        paragraphs: [
          "Say González trabaja desde Guadalajara con un enfoque documental. Más que buscar una copia de su estilo, conviene mirar cómo usa proximidad, ritmo y distancia: qué deja fuera, cuándo se acerca y cómo permite que las personas tengan espacio dentro del encuadre.",
          "Antes de elegir, revisa una boda completa en lugar de sólo una selección de redes. Pregunta cuántas personas cubren el día, cómo se entrega la edición, qué sucede con traslados y derechos de uso, y si el lenguaje del fotógrafo tiene lugar para la forma en que ustedes realmente celebran. La referencia correcta no impone una memoria: ayuda a que la memoria conserve su propia voz.",
        ],
      },
    ],
    quote: "ELEGIR FOTÓGRAFO NO ES ESCOGER UNA POSE: ES DECIDIR CÓMO QUIERES VOLVER A UN MOMENTO.",
    notes: [
      { label: "Selección", value: "Cinco portafolios mexicanos" },
      { label: "Criterio", value: "Narrativa / cercanía / destino" },
      { label: "Antes de contratar", value: "Revisar una boda completa" },
    ],
    bookProjectSlug: "mariana-y-leo",
  },
};
