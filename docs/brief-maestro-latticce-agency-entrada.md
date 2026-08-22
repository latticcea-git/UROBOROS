# Brief maestro — Entrada de LATTICCE AGENCY

> **DIRECCIÓN PARA APROBAR**  
> Documento rector para diseñar y desarrollar exclusivamente la entrada y selector de servicios de LATTICCE AGENCY. Las páginas internas de cada servicio se planearán en una fase posterior.

## 1. Encargo

Crear una experiencia de entrada a pantalla completa para LATTICCE AGENCY que presente tres rutas principales de servicio:

1. **CONTENIDO RRSS**
2. **ECOSISTEMAS UI–UX**
3. **DISTRIBUCIÓN ADS**

La escena toma de la imagen de referencia únicamente su lógica compositiva —objeto suspendido sobre una mano, vacío oscuro, iluminación azul profunda y textos distribuidos alrededor del centro—, no su identidad, contenido ni diseño literal.

Esta entrada no es una página larga ni un índice con anclas. Es un umbral inmersivo: el usuario elige un servicio y la escena responde físicamente antes de abrir una página independiente.

## 2. Objetivo

Comunicar en los primeros segundos que LATTICCE AGENCY diseña, construye y distribuye sistemas digitales completos. La entrada debe:

- presentar las tres áreas con igualdad de importancia;
- volver evidente que cada nombre es interactivo;
- producir una elección rápida sin perder atmósfera ni sofisticación;
- conducir a una URL propia para cada servicio;
- reforzar la relación entre estrategia, tecnología, contenido y distribución.

## 3. Mensaje central

**“Creamos sistemas digitales que atraen, conectan y crecen.”**

La escena representa una inteligencia digital contenida: la mano sostiene y activa un núcleo central del que nacen tres rutas. La tecnología se expresa con sutileza en la superficie de la esfera y en su comportamiento lumínico, sobre un fondo azul continuo y limpio.

## 4. Público

Marcas, empresas, fundadores y equipos de marketing que necesitan una o varias de estas capacidades:

- contenido constante y gestión profesional de redes;
- sitios, landings, e-commerce y ecosistemas digitales;
- distribución pagada y amplificación estratégica del contenido.

La audiencia debe comprender los tres servicios sin conocer vocabulario técnico especializado.

## 5. Alcance de esta fase

### Incluye

- entrada/hero de Agency a pantalla completa;
- logotipo oficial de LATTICCE AGENCY con efecto;
- subtítulo o promesa principal;
- selector de los tres servicios;
- estados de reposo, hover, foco, selección, transición y carga;
- botón persistente de contacto;
- transición cinematográfica de salida;
- rutas preparadas para las tres futuras páginas;
- adaptación responsive, accesibilidad y reducción de movimiento.

### No incluye todavía

- contenido, arquitectura o diseño interior de las páginas de servicio;
- secciones inferiores dentro de la entrada;
- formularios completos;
- casos de estudio, paquetes, precios o testimonios;
- generación de imágenes finales o implementación del sitio.

## 6. Arquitectura de información

La entrada contiene solo cuatro niveles de información:

1. **Marca:** logotipo oficial LATTICCE AGENCY FX.
2. **Promesa:** una frase breve que explique el nodo.
3. **Elección:** los tres servicios, leídos de izquierda a derecha.
4. **Conversión secundaria:** botón de contacto.

Orden obligatorio en desktop:

`CONTENIDO RRSS` → `ECOSISTEMAS UI–UX` → `DISTRIBUCIÓN ADS`

Rutas propuestas, sujetas a validación al planear las páginas internas:

- `/agency/contenido-rrss`
- `/agency/ecosistemas-ui-ux`
- `/agency/distribucion-ads`

El contacto debe apuntar a la ruta o mecanismo global que defina el sitio. Mientras esa URL no esté confirmada, se documentará como `CONTACT_HREF` y no como ancla local inventada.

## 7. Copy de entrada

### Marca

Usar el SVG oficial:

`LOGO X NODOS/AGENCY/svg/LTT_LOGO_FX_POS_AGENCY.svg`

Para producción web, copiarlo sin modificar a:

`public/assets/logos/LTT_LOGO_FX_POS_AGENCY.svg`

La variante FX queda autorizada expresamente por este brief. Debe colocarse como una capa independiente de la escena, sin regenerarla, redibujarla, deformarla ni integrarla dentro de una imagen generada.

### Subtítulo recomendado

**Contenido, experiencias y distribución para hacer crecer marcas en el mundo digital.**

### CTA secundario

**HABLEMOS**

### Nombres interactivos

- **CONTENIDO RRSS**
- **ECOSISTEMAS UI–UX**
- **DISTRIBUCIÓN ADS**

No añadir descripciones permanentes debajo de cada opción en esta primera entrada. Si hace falta orientar al usuario, utilizar una microfrase contextual que cambie al hacer hover o foco:

- Contenido RRSS: `Crear · programar · medir`
- Ecosistemas UI–UX: `Diseñar · construir · conectar`
- Distribución Ads: `Impulsar · segmentar · convertir`

## 8. Dirección creativa

### Concepto: “El núcleo de expansión”

Una mano humana emerge desde la oscuridad y sostiene una esfera tecnológica suspendida. La forma debe ser simple, oscura y silenciosa, con microdetalle integrado que solo se descubre al observarla. Su luz conecta visualmente las tres decisiones del menú.

La imagen debe conservar realismo físico en la mano, la esfera y el rebote de luz, pero eliminar arquitectura, estructuras laterales, túneles, paneles y paisaje. El fondo es una superficie atmosférica azul continua, sin ruido visual.

### Lectura conceptual de los tres servicios

- **Izquierda / CONTENIDO RRSS:** señal, ritmo, múltiples pulsos o capas de transmisión.
- **Centro / ECOSISTEMAS UI–UX:** núcleo estructural, arquitectura, conexión y sistema.
- **Derecha / DISTRIBUCIÓN ADS:** expansión, trayectorias dirigidas, alcance y aceleración.

Estas señales deben existir dentro de la materia y la iluminación de la escena; no como iconos flotantes, tarjetas o gráficas superpuestas.

## 9. Composición

### Desktop — formato rector 16:9

- Escena full viewport, altura mínima `100svh`, sin scroll en estado inicial.
- Mano en el eje central, entrando desde el tercio inferior y ocupando aproximadamente 25–35% de la altura.
- Núcleo suspendido encima de la palma, ligeramente sobre el centro óptico.
- Logotipo FX en el tercio superior central, con aire suficiente y presencia institucional.
- Subtítulo debajo del logo, ancho corto y legible.
- Tres servicios dispuestos alrededor del núcleo en una línea visual de izquierda a derecha. Deben conservar ese orden aunque su posición vertical varíe levemente para integrarse con la escena.
- CTA `HABLEMOS` en una esquina segura y visible, independiente del selector.
- Indicaciones mínimas de interacción; no usar navegación saturada.

### Tablet

- Mantener escena central y orden horizontal mientras exista espacio legible.
- Reducir el desplazamiento periférico de los servicios y acercarlos al centro.
- Asegurar áreas táctiles mínimas de 44 × 44 px.

### Móvil

- Mantener la mano y el núcleo como foco, ajustando el encuadre en vez de reducir toda la escena.
- Apilar los servicios verticalmente en el mismo orden semántico.
- No depender del hover: cada opción debe parecer accionable por tipografía, contraste y affordance táctil.
- Permitir desplazamiento vertical únicamente si la altura útil no admite la composición completa; la elección sigue abriendo otra página y nunca actúa como ancla.

## 10. Paleta e iluminación

La referencia orienta el contraste y la atmósfera, pero la escena debe adquirir materialidad propia de Agency.

- Fondo abisal: `#020912`
- Azul petróleo: `#041C2C`
- Azul profundo: `#063B59`
- Cian energético: `#16B9E8`
- Cian de máxima emisión: `#72E7FF`
- Blanco frío de lectura: `#ECF8FC`
- Gris técnico: `#91A8B2`

Usar el cian como luz física emitida únicamente por el núcleo y reflejada sobre la mano y el fondo liso. La emisión debe ser máxima junto a la esfera y caer suavemente hacia bordes casi negros. Evitar bañar toda la interfaz en neón.

## 11. Materia, cámara y calidad

- **Entorno:** fondo azul abisal liso y continuo, sin arquitectura visible.
- **Tecnología:** microestructura, anillos o detalle superficial apenas perceptible dentro de la esfera.
- **Mano:** humana, anatómicamente correcta, textura real, iluminada por rebote cian; nunca robótica salvo decisión posterior aprobada.
- **Núcleo:** esfera oscura, simple y creíble; tecnológica en el detalle, nunca una máquina sobredimensionada.
- **Cámara:** frontal, lente cinematográfica aproximada de 40–55 mm, simetría con pequeñas tensiones asimétricas.
- **Profundidad:** fondo atmosférico, planos reconocibles y profundidad de campo moderada; el texto siempre permanece nítido.
- **Calidad objetivo:** Unreal Engine / Houdini, ray tracing, reflejos y dispersión volumétrica físicamente coherentes.

## 12. Tipografía y jerarquía

- Sans grotesca o neo-grotesca precisa para navegación, selector y subtítulo.
- Nombres de servicios en mayúsculas, tracking controlado y peso medio; deben sentirse editoriales, no como botones SaaS.
- Logo como elemento de marca dominante, seguido por el núcleo y después por las tres rutas.
- Texto blanco frío en reposo; cian luminoso y halo localizado para interacción.
- No usar contenedores tipo píldora alrededor de los tres servicios.

La tipografía final debe salir del sistema existente de LATTICCE si ya está definida. No incorporar una fuente nueva antes de revisar los archivos y licencias del proyecto.

## 13. Comportamiento e interacción

### Estado inicial

La escena respira con movimiento mínimo: oscilación casi imperceptible del núcleo, flujo interno de energía, niebla lenta y microrespuesta de la luz sobre la mano. Ningún elemento debe competir con la elección.

### Hover y foco

Al pasar el puntero o enfocar con teclado un servicio:

- el nombre incrementa luminosidad y contraste;
- aparece un halo cian breve, contenido y direccional;
- el núcleo responde orientando una corriente, pulso o estructura interna hacia esa opción;
- las otras dos opciones reducen su énfasis, pero siguen siendo legibles;
- puede aparecer la microfrase contextual correspondiente;
- el cursor conserva comportamiento estándar de enlace o una variante claramente reconocible como interacción.
- un halo suave sigue el puntero y la luz del núcleo se orienta hacia la opción activa, guiando la elección sin tapar texto.

El hover no debe provocar desplazamientos de layout ni flashes continuos.

### Selección y transición de salida

Al activar un servicio con click, tap o teclado:

1. Bloquear nuevas selecciones para impedir navegación duplicada.
2. Confirmar la opción elegida mediante un pulso corto en el núcleo.
3. La mano desciende físicamente hacia el borde inferior.
4. El núcleo, el logo, el subtítulo, las opciones no elegidas y el CTA abandonan el encuadre con trayectorias coordinadas.
5. La opción elegida conserva prioridad durante unos instantes y se convierte en el puente visual hacia el siguiente estado.
6. Navegar a la URL independiente del servicio seleccionado.

Duración objetivo total: **700–1100 ms**. La navegación no debe esperar indefinidamente a la animación. Implementar un límite de seguridad que cambie de ruta aunque un evento visual falle.

### Regla crítica de navegación

Los tres servicios deben ser enlaces reales con rutas propias. No usar `#hash`, `scrollIntoView`, scroll programático ni anclas a secciones de `/agency`. Abrir en la misma pestaña y conservar comportamiento web estándar cuando JavaScript esté desactivado.

### Movimiento reducido

Con `prefers-reduced-motion: reduce`:

- eliminar oscilación, parallax y movimiento volumétrico no esencial;
- sustituir la salida por un cambio breve de opacidad de máximo 150 ms o navegación inmediata;
- mantener la confirmación de selección mediante contraste, borde o subrayado.

## 14. Accesibilidad

- Usar enlaces semánticos para los tres servicios y para contacto.
- Orden del DOM igual al orden de lectura: Contenido, Ecosistemas, Distribución.
- Foco visible con contraste WCAG AA y tratamiento equivalente al hover.
- Activación completa con teclado; `Enter` abre la ruta y no se secuestra `Tab` ni `Escape`.
- Nombre accesible exacto de cada servicio.
- La escena decorativa debe ocultarse a tecnologías asistivas; el contenido esencial permanece como HTML.
- Contraste mínimo de 4.5:1 para textos pequeños.
- No depender únicamente de color para indicar selección.
- El sitio debe seguir siendo navegable si WebGL, canvas, video o JavaScript fallan.

## 15. Rendimiento y estrategia técnica

- Priorizar una implementación progresiva: HTML y CSS funcionales antes de cargar efectos avanzados.
- Evitar que un video de fondo sea la única representación de la escena. Si se usa, incluir poster optimizado y fallback estático.
- Usar formatos modernos y tamaños responsive para imágenes.
- Mantener el texto y los enlaces fuera del canvas/WebGL.
- Pausar simulaciones cuando la pestaña no sea visible.
- Reservar dimensiones de logo, imagen y escena para evitar saltos de layout.
- Objetivo de carga: mostrar marca, promesa y rutas útiles de inmediato; los detalles atmosféricos pueden completar después.

## 16. Assets

### Disponibles

- Logo oficial negativo: `LOGO X NODOS/AGENCY/svg/LTT_LOGO_NEG_AGENCY.svg`
- Logo oficial positivo: `LOGO X NODOS/AGENCY/svg/LTT_LOGO_POS_AGENCY.svg`
- Logo oficial FX autorizado: `LOGO X NODOS/AGENCY/svg/LTT_LOGO_FX_POS_AGENCY.svg`
- Referencia compositiva entregada: mano, objeto suspendido, fondo azul profundo y textos periféricos.

### Pendientes de producción

- escena hero final o sistema 3D en tiempo real;
- mano y núcleo con pases o capas suficientes para animación;
- poster/fallback responsive;
- mapa de profundidad, máscaras o secuencias si la solución de movimiento las necesita;
- tipografía confirmada del sistema LATTICCE;
- URL final de contacto.

Si se utiliza IA, generar únicamente el fondo liso, la mano, la esfera y su iluminación física. Excluir logos, marcas y texto legible del prompt de imagen. El logo oficial se superpone después como SVG independiente.

## 17. Prompt maestro para producir la escena base

> Crear un frame hero cinematográfico 16:9 para una experiencia web de una agencia digital, inspirado en una composición minimalista de mano y esfera suspendida. Fondo liso y continuo que transita de azul petróleo a negro, sin arquitectura, textura, interfaces, paneles ni paisaje. En el eje central, una mano humana anatómicamente correcta surge desde abajo con la palma abierta. Sobre ella flota una esfera oscura, compacta y sutilmente tecnológica, con microestructura y anillos superficiales apenas visibles. La esfera es la única fuente clara de luz cian: su emisión nace detrás y alrededor del núcleo, ilumina de forma físicamente correcta los dedos y la palma y cae suavemente sobre el fondo hasta perderse en bordes oscuros. Cámara frontal cinematográfica de 40–55 mm, realismo contenido, composición limpia y amplio espacio negativo para superponer logo, subtítulo y tres enlaces HTML. Sin logotipos, marcas, letras, texto legible, maquinaria, túneles, arquitectura, dashboards, tarjetas SaaS, cyberpunk, exceso de neón ni magia fantástica.

## 18. Prohibiciones

- No convertir la entrada en una landing larga o página con scroll narrativo.
- No usar anclas para simular páginas de servicio.
- No copiar el sitio, textos, marca ni componentes de la referencia.
- No generar ni reinterpretar el logo de Agency.
- No incrustar textos del menú dentro del render.
- No usar tarjetas, paneles flotantes, dashboard, mockups de laptop o estética SaaS.
- No añadir arquitectura, túneles, maquinaria lateral, grillas o escenarios detrás de la mano.
- No usar glitches constantes, neón excesivo o cyberpunk cliché.
- No esconder navegación esencial dentro de canvas o video.
- No sacrificar legibilidad, foco visible, fallback o rendimiento por la transición.

## 19. Criterios de aceptación / QA

- ¿Se reconoce LATTICCE AGENCY en menos de tres segundos?
- ¿El logo usado es exactamente el SVG FX oficial y está superpuesto como capa independiente?
- ¿La escena se percibe física, hiperrealista, profunda y de calidad AAA?
- ¿La esfera es simple y sutil, pero conserva microdetalle tecnológico?
- ¿Toda la iluminación parece nacer del núcleo y caer naturalmente sobre mano y fondo?
- ¿El halo del mouse guía hacia las opciones sin distraer ni reducir legibilidad?
- ¿Los servicios se leen en el orden Contenido → Ecosistemas → Distribución?
- ¿Los tres nombres parecen interactivos y responden tanto a hover como a foco?
- ¿Cada servicio es un enlace real a una página independiente?
- ¿No existe scroll, ancla ni salto de sección al seleccionar un servicio?
- ¿La mano baja y los elementos salen de cuadro antes del cambio de página?
- ¿La transición tiene límite de seguridad y no bloquea la navegación?
- ¿Contacto permanece visible sin competir con las tres rutas?
- ¿La experiencia funciona con teclado, touch, movimiento reducido y JavaScript limitado?
- ¿El layout conserva jerarquía y legibilidad en desktop, tablet y móvil?
- ¿La interfaz existe sobre y dentro del mundo sin parecer un dashboard flotante?

## 20. Entregables de la siguiente fase

Tras **APROBAR DIRECCIÓN**, producir:

1. wireframe de desktop y móvil;
2. storyboard de estados y transición;
3. borrador de escena `BORRADOR — imagen generada / versión 1`;
4. prototipo interactivo de hover, foco y salida;
5. implementación responsive de la entrada;
6. QA visual, funcional, accesible y de rendimiento;
7. planeación individual de las tres páginas de servicio.

## 21. Estado

**BORRADOR — VERSIÓN 3**

Correcciones de composición vigentes:

- En escritorio, el bloque de marca se centra en la parte inferior con margen seguro para evitar recortes.
- En móvil, el bloque de marca permanece en la parte superior y respeta los límites del viewport.
- `ECOSISTEMAS UI–UX` ocupa el centro superior, por encima del núcleo.
- La iluminación interactiva nace en el núcleo, se orienta hacia el cursor y se refuerza sobre las áreas clicables.

La aprobación de este documento autoriza pasar al wireframe y al borrador visual de la entrada. No autoriza todavía definir ni construir el contenido interno de las páginas `CONTENIDO RRSS`, `ECOSISTEMAS UI–UX` o `DISTRIBUCIÓN ADS`.
