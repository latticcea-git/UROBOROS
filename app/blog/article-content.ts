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
  "el-cine-existe-antes-de-la-camara": {
    intro: "Antes de elegir una óptica, una relación de aspecto o una distancia focal, ya existe una película posible. Está en la forma de mirar un espacio, en aquello que decidimos omitir y en el tiempo que concedemos a un gesto.",
    sections: [
      {
        eyebrow: "01 / La intención",
        title: "La imagen comienza con una pregunta",
        paragraphs: [
          "La cámara no produce una mirada por sí sola. Apenas vuelve visible una serie de decisiones anteriores: dónde se sitúa el cuerpo, qué distancia mantiene respecto al mundo y qué información considera necesaria.",
          "Cuando esas decisiones no existen, la técnica intenta compensarlas. Aparecen movimientos sin dirección, luces que describen todo y encuadres que acumulan información. La imagen puede ser correcta y, aun así, no decir nada.",
        ],
      },
      {
        eyebrow: "02 / El espacio",
        title: "Dirigir también es decidir qué permanece fuera",
        paragraphs: [
          "Un espacio cinematográfico no es solamente una locación. Es una estructura de fuerzas: entradas, obstáculos, profundidades, silencios y zonas que todavía no conocemos. El encuadre no lo reduce; organiza la relación entre esas fuerzas.",
          "Por eso la puesta en escena precede al dispositivo. La posición de una persona, la duración de una espera o el recorrido de una sombra pueden contener más dirección que una operación de cámara compleja.",
        ],
      },
      {
        eyebrow: "03 / La herramienta",
        title: "La técnica llega para sostener la mirada",
        paragraphs: [
          "Elegir cámara, luz y movimiento importa. Pero importa después de comprender qué sensación debe sobrevivir al rodaje. La herramienta adecuada es la que protege esa intención con la menor cantidad de ruido.",
          "El cine comienza antes de la cámara y continúa después de ella. En montaje, color y sonido volvemos a formular la misma pregunta: qué necesita permanecer para que la experiencia conserve su forma.",
        ],
      },
    ],
    quote: "EL EQUIPO NO CONSTRUYE LA MIRADA. LA HACE POSIBLE.",
    notes: [
      { label: "Territorio", value: "Narrativa visual" },
      { label: "Herramientas", value: "Puesta en escena / cámara / montaje" },
      { label: "Principio", value: "Intención antes que complejidad" },
    ],
    bookProjectSlug: "fase-roja",
  },
  "la-luz-no-ilumina-revela": {
    intro: "Iluminar no consiste en hacer visible cada superficie. Consiste en decidir qué información aparece, cuál espera y cómo se mueve la atención dentro del plano.",
    sections: [
      {
        eyebrow: "01 / Contraste",
        title: "La oscuridad también trabaja",
        paragraphs: [
          "Una fuente cobra sentido por aquello que deja sin tocar. Cuando eliminamos el miedo a la sombra, el espacio gana profundidad y la mirada encuentra una dirección.",
          "Antes de sumar luminarias conviene observar las fuentes existentes, bloquear rebotes involuntarios y construir una relación clara entre sujeto y fondo.",
        ],
      },
      {
        eyebrow: "02 / Método",
        title: "Una fuente, una función",
        paragraphs: [
          "Cada luz debe resolver una tarea concreta: separar, revelar textura, sostener un gesto o dibujar arquitectura. Si no podemos nombrar su función, probablemente todavía no la necesitamos.",
          "La precisión reduce equipo, acelera el set y deja más tiempo para mirar lo que realmente ocurre frente a cámara.",
        ],
      },
    ],
    quote: "ILUMINAR ES EDITAR EL ESPACIO ANTES DEL MONTAJE.",
    notes: [
      { label: "Territorio", value: "Iluminación" },
      { label: "Método", value: "Bloquear / observar / sumar" },
      { label: "Objetivo", value: "Profundidad y atención" },
    ],
    bookProjectSlug: "ritual-de-luz",
  },
  "cuando-el-sonido-ocupa-el-espacio": {
    intro: "El sonido no llega al cuerpo como una línea plana. Se desplaza, rebota, pierde energía y modifica la percepción del lugar que habitamos.",
    sections: [
      {
        eyebrow: "01 / Escucha",
        title: "Diseñar desde la posición del cuerpo",
        paragraphs: [
          "Antes de mezclar una experiencia espacial necesitamos saber dónde estará quien escucha y qué trayecto puede recorrer. Cada cambio de posición transforma la relación entre fuentes.",
          "La dirección, la distancia y el tiempo de llegada son materiales compositivos tanto como el timbre o el volumen.",
        ],
      },
      {
        eyebrow: "02 / Materia",
        title: "La vibración vuelve visible la arquitectura",
        paragraphs: [
          "Una sala responde. Sus superficies absorben, reflejan y prolongan. Diseñar con ella exige medir, pero también escuchar cómo altera la emoción del contenido.",
          "La experiencia aparece cuando sistema técnico, composición y espacio dejan de competir y se convierten en una sola estructura.",
        ],
      },
    ],
    quote: "EL SONIDO NO ACOMPAÑA EL ESPACIO. LO CONSTRUYE.",
    notes: [
      { label: "Territorio", value: "Diseño sonoro" },
      { label: "Variables", value: "Dirección / distancia / tiempo" },
      { label: "Escala", value: "Cuerpo y arquitectura" },
    ],
    bookProjectSlug: "frecuencia-mineral",
  },
  "disenar-desde-la-materia": {
    intro: "Una identidad puede comenzar antes del logotipo: en el peso de un papel, el reflejo de un metal o la manera en que una superficie cambia al tocarla.",
    sections: [
      {
        eyebrow: "01 / Origen",
        title: "La forma nace de una condición real",
        paragraphs: [
          "Trabajar con materia obliga a tomar decisiones que la pantalla suele aplazar. Hay espesor, fricción, costo, luz y límites de producción.",
          "Esas condiciones no reducen el sistema. Le dan una lógica capaz de sostener múltiples aplicaciones sin depender de un recurso decorativo.",
        ],
      },
      {
        eyebrow: "02 / Sistema",
        title: "Traducir, no imitar",
        paragraphs: [
          "Cuando el lenguaje pasa a digital no necesita simular literalmente el objeto físico. Debe conservar sus relaciones: opacidad, ritmo, tensión y transformación.",
          "La coherencia aparece en las reglas compartidas, no en repetir una misma composición sobre todas las superficies.",
        ],
      },
    ],
    quote: "LA MATERIA NO DECORA EL SISTEMA. LE ENSEÑA CÓMO COMPORTARSE.",
    notes: [
      { label: "Territorio", value: "Diseño gráfico" },
      { label: "Materiales", value: "Papel / metal / resina" },
      { label: "Traducción", value: "Físico →︎ digital" },
    ],
    bookProjectSlug: "materia-01",
  },
  "una-marca-es-una-forma-de-decidir": {
    intro: "Una marca útil no intenta decirlo todo. Establece una postura y convierte esa postura en criterios para elegir, renunciar y actuar de forma consistente.",
    sections: [
      {
        eyebrow: "01 / Posición",
        title: "La claridad empieza por una renuncia",
        paragraphs: [
          "Posicionarse significa aceptar que no todas las personas, formatos o conversaciones tienen el mismo valor estratégico. La definición aparece cuando también sabemos qué no perseguir.",
          "Sin esa decisión, la comunicación acumula mensajes y cada campaña vuelve a comenzar desde cero.",
        ],
      },
      {
        eyebrow: "02 / Operación",
        title: "La estrategia debe poder usarse",
        paragraphs: [
          "Una estrategia no termina en una presentación. Debe traducirse en tono, prioridades, decisiones de contenido y reglas que un equipo pueda aplicar bajo presión.",
          "La marca se fortalece cuando la misma intención organiza desde una conversación comercial hasta la forma de entregar el trabajo.",
        ],
      },
    ],
    quote: "UNA MARCA SE RECONOCE EN LAS DECISIONES QUE REPITE.",
    notes: [
      { label: "Territorio", value: "Estrategia" },
      { label: "Acción", value: "Elegir / renunciar / sostener" },
      { label: "Salida", value: "Criterios operables" },
    ],
    bookProjectSlug: "archivo-nocturno",
  },
  "la-memoria-no-es-un-resumen": {
    intro: "Una memoria no necesita contener cada instante. Necesita conservar las relaciones que hicieron que un momento se sintiera irrepetible.",
    sections: [
      {
        eyebrow: "01 / Distancia",
        title: "Observar sin interrumpir",
        paragraphs: [
          "La intimidad rara vez aparece frente a una instrucción. Aparece entre acciones, cuando las personas vuelven a reconocerse y el fotógrafo sabe mantener la distancia justa.",
          "Trabajar así exige anticipación y confianza: leer el espacio antes de ocuparlo y permitir que el tiempo real organice parte de la imagen.",
        ],
      },
      {
        eyebrow: "02 / Edición",
        title: "Recordar también es relacionar",
        paragraphs: [
          "La selección no debe resumir cronológicamente un evento. Debe encontrar respiraciones, ecos y contrastes capaces de devolver su temperatura.",
          "Una imagen individual conserva un gesto. Una secuencia bien editada conserva una forma de estar juntos.",
        ],
      },
    ],
    quote: "LA MEMORIA PERMANECE EN LOS DETALLES QUE NO PEDIMOS.",
    notes: [
      { label: "Territorio", value: "Memoria" },
      { label: "Método", value: "Observación y distancia" },
      { label: "Salida", value: "Secuencia editorial" },
    ],
    bookProjectSlug: "mariana-y-leo",
  },
  "dirigir-es-organizar-la-atencion": {
    intro: "Toda escena contiene más información de la que una audiencia puede procesar al mismo tiempo. Dirigir es construir la ruta sensible por la que esa atención se desplaza.",
    sections: [
      {
        eyebrow: "01 / Jerarquía",
        title: "Cada plano necesita una fuerza dominante",
        paragraphs: [
          "La atención puede comenzar en un rostro, una ausencia o un movimiento fuera de campo. Lo importante es decidir qué fuerza organiza a las demás.",
          "Cuando todos los elementos reclaman protagonismo, la escena se vuelve legible pero indiferente.",
        ],
      },
      {
        eyebrow: "02 / Tiempo",
        title: "La mirada necesita llegar, no ser empujada",
        paragraphs: [
          "La duración permite descubrir relaciones que un corte rápido sólo enuncia. Sostener un plano también es una forma de confiar en la puesta en escena.",
          "El movimiento funciona cuando modifica el sentido, no cuando intenta demostrar que la cámara puede moverse.",
        ],
      },
    ],
    quote: "DIRIGIR NO ES MOSTRAR MÁS. ES HACER QUE ALGO IMPORTE.",
    notes: [
      { label: "Territorio", value: "Dirección" },
      { label: "Variables", value: "Jerarquía / tiempo / movimiento" },
      { label: "Objetivo", value: "Atención con sentido" },
    ],
    bookProjectSlug: "sistema-cero",
  },
  "el-archivo-como-herramienta-viva": {
    intro: "Un archivo no cobra valor por la cantidad de elementos que conserva, sino por la calidad de las relaciones que permite construir entre ellos.",
    sections: [
      {
        eyebrow: "01 / Criterio",
        title: "Guardar es apenas el comienzo",
        paragraphs: [
          "Sin taxonomía, contexto y una regla de selección, la acumulación vuelve invisible aquello que intentaba proteger. Encontrar deja de ser un acto de descubrimiento y se convierte en fricción.",
          "Un archivo vivo registra procedencia, decisiones y vínculos, no solamente nombres de archivo.",
        ],
      },
      {
        eyebrow: "02 / Reuso",
        title: "La memoria debe poder producir algo nuevo",
        paragraphs: [
          "El sistema funciona cuando una referencia antigua puede activar una conversación actual sin perder su contexto original.",
          "Diseñar el archivo es diseñar una interfaz entre pasado y futuro: una estructura para recordar, comparar y volver a crear.",
        ],
      },
    ],
    quote: "UN ARCHIVO VIVO NO TERMINA DE ORDENARSE. APRENDE A RELACIONAR.",
    notes: [
      { label: "Territorio", value: "Recursos" },
      { label: "Estructura", value: "Contexto / taxonomía / relaciones" },
      { label: "Objetivo", value: "Memoria reutilizable" },
    ],
    bookProjectSlug: "archivo-naranja",
  },
};
