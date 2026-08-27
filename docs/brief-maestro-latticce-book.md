# Brief maestro — LATTICCE BOOK

> Documento rector de estrategia, experiencia, dirección visual, contenido y producción para desarrollar la sección BOOK del sitio UROBOROS.

**Proyecto:** UROBOROS / LATTICCE BOOK
**Tipo de intervención:** Nueva sección pública de portafolio y sistema de exploración de proyectos
**Estado:** Brief para aprobación antes de dirección de arte y producción
**Aprobador:** Solicitante
**Fecha de consolidación:** 26 de agosto de 2026

## 1. Encargo y contexto

Diseñar y desarrollar BOOK como el portafolio central de LATTICCE. BOOK no será una galería plana ni una acumulación de miniaturas: será un archivo creativo interactivo que permita descubrir el trabajo por procedencia, disciplina y proyecto.

La experiencia deberá conectar los cinco nodos públicos actuales —Agency, Studio, Sound, Design y Time— sin diluir sus lenguajes particulares. La portada seduce con una selección transversal; los nodos ordenan; las categorías permiten profundizar; los proyectos demuestran el trabajo real; y las recomendaciones vuelven a abrir caminos entre disciplinas.

El proyecto existente ya incluye BOOK en el menú global y enlaza a `/book`, pero esa ruta todavía no está construida. HOME ya contiene el mar digital interactivo y la escena “La intención permanece”, que serán los puntos de continuidad principales.

## 2. Objetivo verificable

Construir una experiencia de portafolio donde una persona pueda:

1. Reconocer BOOK como parte del universo LATTICCE desde el primer impacto.
2. Descubrir proyectos destacados de distintos nodos sin elegir una disciplina de entrada.
3. Explorar el archivo mediante la secuencia `nodo → categoría → proyecto`.
4. Abrir una obra completa con medios, contexto, servicios y créditos pertinentes.
5. Continuar hacia proyectos relacionados sin llegar a un callejón sin salida.
6. Llegar desde HOME o desde el menú global con una transición coherente.
7. Completar el recorrido con teclado, touch o movimiento reducido, sin depender del hover ni de efectos visuales.

## 3. Idea rectora

**Entrar al archivo creativo de LATTICCE.**

BOOK debe sentirse menos como “ver nuestro portafolio” y más como acceder a un organismo editorial vivo: una colección curada donde cada obra conserva su origen, pero puede conectarse con otras disciplinas.

La experiencia se resume así:

```text
La portada seduce.
Los nodos orientan.
Las categorías enfocan.
Los proyectos demuestran.
Las relaciones reabren el recorrido.
```

## 4. Audiencia y situación de recepción

### Audiencia primaria

- Prospectos que desean comprobar la calidad y amplitud del trabajo de LATTICCE.
- Marcas, fundadores, equipos de marketing, productores y directores creativos que buscan un socio multidisciplinario.
- Personas que llegan interesadas en un nodo concreto, pero pueden descubrir capacidades complementarias.

### Audiencia secundaria

- Colaboradores, aliados y talento potencial que necesitan comprender el alcance creativo del sistema.
- Clientes existentes que desean consultar o compartir proyectos publicados.

### Respuesta esperada

La persona debe comprender que LATTICCE no es una colección accidental de servicios, sino un sistema capaz de articular estrategia, producción, imagen, diseño, sonido y memoria alrededor de una misma intención.

## 5. Mensaje y jerarquía de comunicación

### Mensaje principal

**LATTICCE convierte ideas en obras completas mediante disciplinas conectadas.**

### Mensajes secundarios

1. Cada nodo posee una mirada y una capacidad reconocibles.
2. Los proyectos son evidencia real, no ilustraciones de servicios.
3. Un proyecto puede activar y conectar más de un nodo.
4. El archivo está curado y puede crecer sin perder estructura.

### Acción principal

Explorar y abrir un proyecto.

### Acciones secundarias

- Elegir un nodo.
- Filtrar por categoría.
- Continuar hacia un proyecto relacionado.
- Volver al nivel anterior sin perder contexto.
- Contactar o iniciar una conversación desde el proyecto cuando esa conversión se defina.

## 6. Principios de experiencia

1. **Descubrimiento progresivo.** La interfaz revela profundidad por etapas y no expone toda la taxonomía al mismo tiempo.
2. **Curaduría antes que volumen.** El sistema debe comunicar criterio editorial, no cantidad de archivos.
3. **Procedencia visible.** Cada proyecto conserva el nodo o nodos que participaron en él.
4. **Una sola fuente de contenido.** El slider, los listados y las recomendaciones consumen los mismos registros de proyecto.
5. **Expresión con función.** Máscaras, desenfoque, semitono y movimiento deben ayudar a revelar, seleccionar u orientar.
6. **Continuidad sin homogeneización.** BOOK pertenece a LATTICCE, pero permite que cada nodo aporte matices propios.
7. **Navegación reversible.** Toda profundización debe conservar una salida clara, contexto y regreso predecible.

## 7. Accesos y transición de entrada

### 7.1 Menú global

BOOK permanece como sección independiente del menú principal y apunta a `/book`.

En escritorio, al hacer hover o foco sobre BOOK:

- aparece una cápsula o cuadro pequeño asociado al puntero o al enlace;
- el área contenida produce un desenfoque o alteración material marcada sobre la superficie inferior;
- el módulo es considerablemente menor que el visor utilizado en TIME;
- no incluye retícula, esquinas de enfoque, cruz, datos de cámara ni gesto de captura;
- su función es anticipar que BOOK permite mirar el archivo mediante fragmentos y capas.

Al activar el enlace, la cápsula puede expandirse, comprimir la materia o actuar como máscara de transición hacia BOOK. La forma exacta se definirá en dirección de arte y prototipo de motion.

En touch y con movimiento reducido, el enlace deberá funcionar como navegación convencional con un estado visual breve y claro. El acceso nunca dependerá del seguimiento del cursor.

### 7.2 Acceso desde HOME

En la escena `La intención permanece`, después de `LATTICCE / 2026`, se añade el CTA:

**CONOCE NUESTRO TRABAJO**

El CTA abre `/book`. Debe integrarse a la composición central sin competir con el titular y conservar foco visible, área táctil suficiente y lectura clara.

## 8. Arquitectura de información

```text
HOME
│
├── CTA “CONOCE NUESTRO TRABAJO”
└── Menú / BOOK
     │
     └── /book
          ├── Proyectos destacados
          └── Selector de nodos
               ├── Agency
               │    ├── Categorías
               │    └── Proyectos
               ├── Studio
               │    ├── Categorías
               │    └── Proyectos
               ├── Sound
               │    ├── Categorías
               │    └── Proyectos
               ├── Design
               │    ├── Categorías
               │    └── Proyectos
               └── Time
                    ├── Categorías
                    └── Proyectos

PROYECTO
├── Galería o caso de éxito
├── Datos, servicios y créditos
└── “También puede interesarte”
```

### Niveles funcionales

1. **Portada BOOK:** selección destacada y acceso a nodos.
2. **Catálogo de nodo:** categorías disponibles dentro del nodo elegido.
3. **Listado de proyectos:** obras reales pertenecientes a la categoría.
4. **Proyecto individual:** galería visual o caso de éxito completo.
5. **Relaciones:** proyectos recomendados, incluso de otros nodos.

## 9. Portada BOOK

### 9.1 Atmósfera

La portada utiliza un campo de partículas antigravitacional como base visual y de interacción. El sistema conserva la oscuridad, la luz proyectada y la continuidad de LATTICCE sin reutilizar el efecto de mar del HOME.

Las partículas actúan como ambiente y profundidad espacial. Su render se detiene fuera de pantalla y desaparece al entrar el primer proyecto para no competir con los medios protagonistas.

### 9.2 Apertura editorial

La entrada debe establecer con claridad:

- el nombre `BOOK`;
- una frase breve que explique la lógica del archivo;
- la procedencia `LATTICCE / ARCHIVO CREATIVO` o equivalente sujeto a aprobación de copy;
- un indicador que sugiera exploración horizontal o secuencial cuando corresponda.

El titular podrá emplear interferencias, máscaras y semitono, pero la navegación y el contenido funcional deberán permanecer legibles.

### 9.3 Slider principal

La parte superior o primer plano de exploración estará dominada por un slider horizontal de gran formato con proyectos destacados de distintos nodos.

Cada pieza deberá mostrar como mínimo:

- medio protagonista;
- título del proyecto;
- nodo de procedencia;
- año, si está disponible;
- indicación clara de que puede abrirse.

El slider:

- se alimenta de proyectos existentes marcados como `featured`;
- no administra una galería paralela;
- puede reproducirse de forma continua y suave, pero se pausa al recibir hover, foco, interacción, cambio de visibilidad o preferencia de movimiento reducido;
- permite arrastre, controles de anterior/siguiente y navegación por teclado;
- no desplaza contenido a una velocidad que impida elegir una pieza;
- mantiene enlaces directos hacia el proyecto de origen.

La selección deberá equilibrar nodos, formatos y ritmos visuales. Si no existen suficientes proyectos destacados, se muestra una secuencia editorial estable en lugar de duplicar piezas para aparentar volumen.

## 10. Selector de nodos

Debajo o después del slider aparecen cinco fichas compactas en este orden:

```text
Agency → Studio → Sound → Design → Time
```

### Forma

- Fichas rectangulares compactas, con palabra horizontal.
- Disposición vertical en escritorio, salvo que el prototipo demuestre una solución más clara.
- No reutilizar los grandes módulos cuadrados del HOME.
- El nodo activo utiliza el naranja de selección del sistema (`#ff6a00` como referencia técnica provisional) y un cambio adicional de forma, borde o etiqueta para no depender solo del color.

### Hover, foco y selección

Al pasar el puntero o enfocar una ficha aparece una escena humana o fragmento de proceso que explique el acto creativo del nodo:

- **Agency:** planeación, dirección o desarrollo de campaña.
- **Studio:** rodaje, fotografía, videoclip, boda o producción.
- **Sound:** grabación, mezcla o trabajo sonoro.
- **Design:** diseño gráfico, identidad o creación web.
- **Time:** una escena propia del universo TIME, pendiente de selección definitiva.

La presencia humana no será decoración ni retrato genérico. Debe responder en pocos segundos a la pregunta: **“¿Qué significa crear dentro de este nodo?”**

En touch, la primera activación selecciona o revela información y la acción explícita abre el nodo. También puede resolverse mediante una composición siempre visible si el doble toque genera fricción.

## 11. Catálogo del nodo

Al seleccionar un nodo, la portada general cede el protagonismo a un catálogo específico. La navegación conserva un rastro visible del contexto:

```text
BOOK / NODO
```

Cada categoría vive en un módulo compacto con:

- nombre;
- imagen, fragmento o tratamiento visual opcional;
- cantidad de proyectos, si aporta orientación;
- estado de hover, foco y selección;
- enlace persistente y compartible.

### Categorías provisionales

**Design**

- Branding
- Contenido para redes
- Impresión
- Web
- Diseño editorial
- Motion / contenido digital

**Studio**

- Videoclips
- Comerciales
- Conciertos
- Sesiones fotográficas
- Bodas
- Producciones especiales

Las categorías de Agency, Sound y Time, así como la taxonomía definitiva de Design y Studio, deben cerrarse mediante inventario real de proyectos. La arquitectura admitirá altas, bajas y reordenamiento sin reconstruir la interfaz.

## 12. Listado de proyectos

Al seleccionar una categoría se muestran exclusivamente obras reales vinculadas con ella.

Cada módulo de proyecto contiene:

- portada representativa;
- nombre;
- nodo o combinación de nodos;
- categoría;
- año, si está disponible;
- tipo de medio cuando no sea evidente;
- enlace al proyecto individual.

La cuadrícula no debe sentirse como un catálogo comercial genérico. Se permite variar escala, proporción y ritmo de las piezas dentro de una retícula editorial estable. La variación nunca debe alterar el orden de lectura ni ocultar datos esenciales.

Estados requeridos:

- carga o preparación visual;
- listado vacío;
- error de medio;
- foco y hover;
- proyecto no publicado o retirado, dentro de la lógica editorial interna;
- regreso a categoría y nodo.

## 13. Proyecto individual

Cada proyecto despliega una experiencia completa y compartible. La estructura se adapta al tipo de trabajo sin perder un esqueleto común.

### Contenido mínimo

- Título.
- Nodo principal y nodos participantes.
- Categoría o categorías.
- Año.
- Imagen o video de apertura.
- Descripción breve.
- Servicios realizados.
- Galería principal.
- Créditos pertinentes.
- Proyectos relacionados.

### Galería visual

Como referencia inicial, cada proyecto incluirá entre cinco y siete piezas principales, ampliables cuando la narrativa lo justifique. Puede contener:

- fotografías;
- video;
- piezas gráficas;
- aplicaciones de identidad;
- capturas o demostraciones de páginas web;
- proceso;
- texto contextual breve;
- audio o visualización sonora cuando corresponda.

### Variantes narrativas

- **Studio, Sound y Time:** recorrido predominantemente sensorial y visual, con texto breve.
- **Agency, Design y proyectos web:** estructura más cercana a caso de éxito, con reto, enfoque, sistema, aplicaciones y resultado cuando existan datos verificables.

Estas variantes comparten navegación, metadatos, créditos, accesibilidad y recomendaciones. No deben convertirse en plantillas totalmente independientes.

## 14. Proyectos relacionados

Al final de cada proyecto aparece:

**También puede interesarte**

La recomendación puede cruzar nodos deliberadamente para evidenciar la naturaleza multidisciplinaria de LATTICCE. Por ejemplo:

```text
Concierto → identidad visual → sesión fotográfica → campaña → Sound
```

Regla provisional de selección:

1. Relaciones editoriales asignadas manualmente.
2. Coincidencia de proyecto, cliente, disciplina o contexto.
3. Cruce de nodo que expanda la lectura.
4. Evitar repetir el proyecto actual o generar bucles cerrados inmediatos.

## 15. Dirección visual

### 15.1 Traducción de la referencia gráfica

La referencia de `PORTFOLIO 2025` define un lenguaje, no una composición para copiar. Se trasladan estos principios:

- fondo negro profundo con grano fino;
- blanco cálido y gris metálico;
- serif editorial de alto contraste para títulos;
- sans técnica y compacta para navegación y metadatos;
- cápsulas redondeadas como máscaras, ventanas o controles;
- semitono, desenfoque y distorsión parcial como recursos de revelado;
- escalas tipográficas monumentales;
- microdatos de archivo: nodo, año, disciplina, índice;
- espacio negativo abundante y ritmo de galería.

### 15.2 Rol propio de BOOK

BOOK será la capa editorial de la marca madre: oscuro, preciso, táctil y curado. No debe adoptar por completo la estética de ningún nodo. Los nodos pueden aportar color, imagen o material en momentos acotados, mientras la estructura general conserva neutralidad.

### 15.3 Paleta provisional

- Negro base: `#050505`.
- Negro tinta: `#0a0a0a`.
- Blanco cálido: `#f2f1eb`.
- Gris secundario: `#969791`.
- Líneas: `rgba(242, 241, 235, 0.18)`.
- Naranja de selección: `#ff6a00`.

El naranja se reserva para selección, foco editorial o estado activo. No se utilizará como relleno constante ni como color dominante del archivo.

### 15.4 Tipografía

- Serif display para títulos, nombres de proyecto y momentos editoriales.
- Sans técnica para navegación, filtros, índices, años, categorías y estados.
- Cursiva serif solo para énfasis puntual.
- Ningún efecto de máscara o distorsión deberá impedir reconocer el nombre de un proyecto o usar un control.

### 15.5 Cápsulas y máscaras

Las cápsulas deben asumir funciones consistentes:

- revelar fragmentos de imagen;
- indicar selección;
- contener filtros o metadatos breves;
- conectar estados durante una transición;
- enfocar una zona del mar o de un proyecto.

No deben aparecer como decoración repetitiva ni encerrar párrafos largos.

### 15.6 Semitono, grano y desenfoque

- El semitono pertenece a aperturas, transiciones o estados de revelado.
- El grano será global y sutil; no debe ensuciar fotografía ni video.
- El desenfoque indicará profundidad, selección o paso entre niveles.
- El contenido activo debe recuperar nitidez y contraste.
- No aplicar los tres efectos con máxima intensidad al mismo tiempo.

## 16. Movimiento e interacción

### Principios

- Movimiento lento, continuo y editorial.
- Respuesta perceptible a toda acción.
- Transiciones causadas por selección, profundidad o cambio de contexto.
- Ausencia de movimiento ornamental perpetuo fuera del mar y el slider controlado.

### Comportamientos

- **Entrada:** la cápsula de BOOK puede abrir la superficie o revelar el título mediante máscara.
- **Slider:** avance suave, pausa controlable y selección inequívoca.
- **Selector:** la ficha activa altera color, imagen y profundidad.
- **Cambio de nivel:** la selección se expande o desplaza mientras el nivel anterior se desenfoca y pierde presencia.
- **Proyecto:** los medios entran por cortes editoriales, máscaras o cambios de escala moderados.
- **Regreso:** conserva la dirección inversa y, cuando sea viable, la posición previa del catálogo.

### Movimiento reducido

Con `prefers-reduced-motion`:

- detener autoplay y desplazamientos continuos;
- sustituir deformaciones y zooms por cambios breves de opacidad o estado;
- permitir navegación directa entre piezas;
- conservar todo el contenido y la jerarquía.

## 17. Responsive y modalidades de entrada

### Escritorio

- Aprovechar amplitud para slider, superposición editorial y ficha humana del nodo.
- Soportar puntero, rueda, trackpad y teclado.
- No secuestrar el scroll general salvo en una interacción delimitada y reversible.

### Tablet

- Reducir capas simultáneas y priorizar una pieza protagonista.
- Mantener controles visibles; no depender del hover.
- Permitir swipe horizontal únicamente dentro de carruseles claramente delimitados.

### Móvil

- Convertir el slider en secuencia táctil con snap o controles explícitos.
- Mantener título, nodo y acción dentro del primer plano de cada pieza.
- Presentar los nodos como lista vertical legible.
- Sustituir la representación humana al hover por imagen persistente, expansión controlada o detalle posterior a la selección.
- Evitar máscaras tan pequeñas que oculten el contenido y efectos costosos que compitan con los medios.

## 18. Accesibilidad

- Estructura semántica con un solo `h1` por página y jerarquía lógica.
- Enlaces reales para proyectos, nodos y categorías; no simular navegación con elementos sin semántica.
- Foco visible con contraste suficiente.
- Operación completa por teclado.
- Alternativas textuales para imágenes informativas y descripciones útiles para video o audio cuando sean esenciales.
- Controles de pausa para movimiento automático.
- El estado activo no depende únicamente del naranja.
- Las máscaras decorativas no ocultan texto accesible ni impiden ampliar contenido.
- Respeto a `prefers-reduced-motion` y a tamaños de viewport dinámicos.
- Objetivos táctiles cómodos y separación suficiente entre acciones.

## 19. Modelo de contenido

BOOK debe consumir una fuente estructurada y evitar datos duplicados en componentes.

### Nodo

```text
id
slug
name
order
shortDescription
accent
hoverMedia
hoverMediaAlt
active
```

### Categoría

```text
id
slug
name
nodeIds[]
description
coverMedia
order
active
```

### Proyecto

```text
id
slug
title
year
status: draft | published | archived
primaryNodeId
nodeIds[]
categoryIds[]
summary
services[]
credits[]
coverMedia
gallery[]
featured: boolean
featuredOrder
featuredMedia
relatedProjectIds[]
seoTitle
seoDescription
publishedAt
```

### Medio

```text
type: image | video | audio | embed | process | text
src
poster
alt
caption
credit
width
height
duration
order
```

### Reglas de integridad

- Un proyecto publicado requiere título, slug, nodo principal, portada y al menos un medio.
- `featured` solo puede activarse si existe `featuredMedia` o una portada válida para el formato del slider.
- Una categoría no se muestra públicamente si no contiene proyectos publicados, salvo que se diseñe explícitamente un estado editorial de “próximamente”.
- Toda relación debe apuntar a un proyecto publicado.
- Un medio reutilizado conserva crédito y texto alternativo propios.

## 20. Arquitectura técnica recomendada

### Base confirmada del proyecto

- Next.js `16.3.1` con App Router.
- React `19.2.8` y TypeScript.
- `output: "export"`.
- `basePath: "/UROBOROS"`.
- Imágenes sin optimización de servidor.

### Rutas propuestas

```text
/book
/book/[node]
/book/[node]/[category]
/book/project/[project]
```

Se recomienda que el proyecto tenga una URL independiente de su categoría principal, porque puede pertenecer a varios nodos o categorías y puede abrirse directamente desde el slider o las recomendaciones.

Con la exportación estática actual, todos los valores dinámicos deberán existir durante el build y generarse mediante `generateStaticParams`. Un proyecto nuevo no será visible en producción hasta reconstruir y desplegar el sitio. Si se requiere publicación inmediata desde un CMS, deberá revisarse la estrategia de despliegue o abandonar `output: "export"` en una fase posterior.

### Fuente de contenido por fases

**Fase inicial:** datos tipados locales y assets versionados para validar experiencia y modelo.
**Fase posterior:** CMS aún por seleccionar e integrar; deberá conservar el modelo anterior y disparar un nuevo build al publicar mientras continúe la exportación estática.

### Componentes conceptuales

```text
BookExperience
├── BookEntryTransition
├── BookHero
│   ├── AntigravityField optimizado
│   └── EditorialTitle
├── FeaturedProjectsSlider
├── NodeSelector
├── NodeCatalog
├── ProjectGrid
├── ProjectExperience
│   ├── ProjectHero
│   ├── ProjectNarrative
│   ├── ProjectGallery
│   ├── ProjectCredits
│   └── RelatedProjects
└── BookNavigationState
```

La lógica de contenido se separará de la presentación. El slider filtrará `featured`; los catálogos filtrarán por nodo y categoría; y los relacionados usarán relaciones editoriales o reglas explícitas.

## 21. Rendimiento

- Cargar inicialmente solo la portada, el primer proyecto destacado y los recursos críticos.
- Diferir videos y galerías fuera del viewport.
- Usar posters para video y no reproducir varios videos simultáneamente.
- Limitar la resolución y densidad de medios según viewport.
- Pausar canvas, autoplay y animaciones cuando la pestaña no sea visible.
- Evitar que el mar digital se renderice varias veces en capas simultáneas.
- Reservar espacio de medios para impedir saltos de layout.
- Medir el coste del semitono y desenfoque en dispositivos móviles reales.

## 22. SEO, metadatos y compartibilidad

- Cada proyecto tendrá URL, título y descripción propios.
- Cada proyecto definirá imagen social sin efectos que comprometan lectura.
- Nodo y categoría tendrán títulos y descripciones indexables.
- El contenido principal existirá como texto semántico, no solo dentro de canvas o animaciones.
- Los proyectos archivados deberán conservar una estrategia explícita: permanencia, redirección o retiro.

## 23. Analítica mínima

Eventos sugeridos:

- acceso a BOOK desde menú;
- acceso a BOOK desde HOME;
- proyecto destacado abierto;
- nodo seleccionado;
- categoría seleccionada;
- proyecto abierto;
- proyecto relacionado abierto;
- reproducción de video o audio;
- CTA de contacto desde proyecto, si se incorpora.

La herramienta de analítica y las reglas de privacidad están pendientes de definición.

## 24. Contenido y assets requeridos

Antes de cerrar producción se necesita:

- inventario de proyectos publicables;
- taxonomía definitiva por nodo;
- portadas y medios en resolución suficiente;
- autorización de publicación y uso de cada medio;
- nombres, fechas, servicios y descripciones verificadas;
- créditos obligatorios;
- selección `featured` y orden inicial;
- relaciones editoriales entre proyectos;
- cinco escenas humanas o medios representativos para el selector;
- copy definitivo de apertura y CTA;
- definición del CTA comercial al final de cada proyecto;
- reglas para proyectos confidenciales, incompletos o sin créditos públicos.

## 25. Prohibiciones

- No construir una cuadrícula plana como experiencia completa.
- No administrar manualmente una segunda galería para el slider.
- No copiar la composición exacta de la referencia `PORTFOLIO 2025`.
- No convertir las cápsulas en ornamento sin función.
- No ocultar nombres o controles esenciales con distorsión, semitono o desenfoque.
- No mezclar todos los lenguajes de nodo al mismo tiempo.
- No reproducir múltiples videos o animaciones pesadas de manera simultánea.
- No depender de hover en touch.
- No usar autoplay imposible de pausar.
- No publicar proyectos, nombres, clientes o créditos de ejemplo como si fueran reales.

## 26. Criterios de aceptación

### Comunicación

- En los primeros segundos se entiende que BOOK es el archivo de trabajo de LATTICCE.
- Se percibe la relación entre nodos sin confundir sus identidades.
- El trabajo real domina sobre la explicación de servicios.

### Arquitectura

- El recorrido `BOOK → nodo → categoría → proyecto` es comprensible y reversible.
- El slider abre el proyecto correcto y no duplica contenido.
- Los proyectos relacionados continúan la exploración y pueden cruzar nodos.
- Las URLs permiten compartir un proyecto y volver a su contexto.

### Visual

- La referencia editorial se reconoce en tipografía, cápsulas, semitono, grano y ritmo, sin convertirse en copia.
- El mar digital conecta BOOK con HOME sin competir con los medios.
- El naranja comunica selección y no se vuelve color decorativo dominante.
- La legibilidad se conserva sobre movimiento y efectos.

### Interacción

- Slider, nodos, categorías y proyectos funcionan con puntero, teclado y touch.
- El usuario puede pausar o evitar movimiento continuo.
- Volver conserva contexto o comunica claramente el cambio de nivel.

### Técnica

- Todas las rutas de proyecto se generan correctamente en el build estático.
- Los medios no provocan saltos de layout ni reproducción simultánea excesiva.
- La experiencia respeta movimiento reducido.
- No existen enlaces rotos desde HOME, menú, slider o recomendaciones.

### Contenido

- Cada proyecto publicado tiene portada, datos básicos, medios y créditos verificados.
- No aparecen categorías vacías sin tratamiento editorial aprobado.
- Las relaciones y etiquetas corresponden al contenido real.

## 27. Alcance por fases

### Fase 0 — Inventario y cierre de taxonomía

- Auditar proyectos y assets existentes.
- Definir categorías definitivas de los cinco nodos.
- Seleccionar proyectos de lanzamiento y destacados.
- Resolver permisos, créditos y copys.

**Salida:** matriz de contenido aprobada.

### Fase 1 — Arquitectura y prototipo UX

- Wireflow completo.
- Wireframes de portada, nodo, categoría y proyecto.
- Prototipo de slider, selector y navegación reversible.
- Prueba específica de móvil y teclado.

**Salida:** recorrido funcional aprobado sin depender del acabado visual.

### Fase 2 — Dirección de arte y motion

- Sistema editorial de BOOK.
- Tratamiento de cápsulas, semitono, grano y desenfoque.
- Comportamientos de entrada y cambio de nivel.
- Variantes para Agency/Design y Studio/Sound/Time.

**Salida:** keyframes y prototipo visual aprobados.

### Fase 3 — Producción técnica

- Construcción de rutas y modelo de datos.
- Integración con HOME y menú.
- Slider alimentado desde proyectos.
- Catálogo, proyecto individual y relacionados.
- Responsive, accesibilidad, SEO y analítica acordada.

**Salida:** implementación completa en entorno local.

### Fase 4 — Carga, QA y publicación

- Carga de proyectos reales.
- QA visual y funcional en desktop, tablet y móvil.
- Revisión de rendimiento y movimiento reducido.
- Verificación de créditos, enlaces, rutas y metadatos.

**Salida:** BOOK listo para aprobación y despliegue.

## 28. Confirmado, provisional y faltante

### Confirmado

- BOOK será el portafolio central e interactivo de LATTICCE.
- El recorrido principal es `nodo → categoría → proyecto → obra completa`.
- Los nodos iniciales son Agency, Studio, Sound, Design y Time.
- BOOK se abre desde el menú y desde un CTA nuevo en HOME.
- La portada reutiliza el mar digital del HOME.
- El slider se alimenta de proyectos existentes marcados como destacados.
- Cada proyecto termina con recomendaciones.
- La dirección visual adopta una lógica editorial oscura, tipográfica y material.

### Provisional

- Taxonomía detallada de Design y Studio.
- Orden y disposición exacta del selector en todos los breakpoints.
- Copy de apertura y metadatos editoriales.
- Naranja `#ff6a00` como valor único de selección para BOOK.
- Cantidad habitual de cinco a siete medios por proyecto.
- Reglas automáticas complementarias para relacionados.
- Rutas internas propuestas y datos locales como primera fuente.
- Forma exacta de la transición desde el menú.

### Faltante

- Inventario final de proyectos y categorías de los cinco nodos.
- Assets humanos del selector.
- Selección y orden de proyectos destacados.
- Derechos de publicación y créditos.
- Copys definitivos de apertura, proyectos y CTA comercial.
- Definición de CMS y flujo editorial, si se implementará en esta fase.
- Herramienta de analítica y consentimiento aplicable.
- Persona responsable de actualizar y aprobar nuevos proyectos después del lanzamiento.

## 29. Preguntas bloqueantes antes de producción final

1. ¿Qué proyectos reales estarán disponibles para el lanzamiento y cuáles pueden publicarse legalmente?
2. ¿Cuál es la taxonomía definitiva de Agency, Studio, Sound, Design y Time?
3. ¿Qué proyectos y medios serán `featured` en la primera versión?
4. ¿BOOK se alimentará inicialmente de datos locales o debe conectarse a un CMS desde la primera entrega?
5. ¿Cuál será la acción comercial al terminar un proyecto: contacto general, formulario contextual o ninguna?
6. ¿Qué créditos, permisos y restricciones de cliente son obligatorios por proyecto?

Estas preguntas no bloquean wireframes ni prototipos con placeholders explícitos; sí bloquean la carga final, el modelo editorial definitivo y la publicación.

## 30. Ruta de trabajo recomendada

1. **Aprobar este brief maestro.** Cerrar objetivo, alcance, principios y elementos provisionales.
2. **Definir dirección de arte.** Convertir la referencia y la identidad LATTICCE en un sistema visual producible.
3. **Construir wireflow y prototipo UX.** Validar profundidad, reversibilidad y uso móvil.
4. **Producir la página.** Implementar rutas, datos, medios e interacción.
5. **Criticar la iteración.** Evaluar jerarquía, claridad, distinción y eficacia.
6. **Ejecutar QA visual y funcional.** Verificar renders reales, accesibilidad, rendimiento y contenido antes de entregar.

## 31. Siguiente hito de aprobación

Aprobar o corregir este brief. Con esa aprobación, el siguiente entregable debe ser un **wireflow maestro de BOOK** acompañado por un **mapa de pantallas y estados**; después se define la dirección de arte final y se construye el primer prototipo visual de la portada.
