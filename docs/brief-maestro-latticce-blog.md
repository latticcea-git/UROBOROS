# Brief maestro y plan de sitio — LATTICCE BLOG

> Documento rector para diseñar y desarrollar BLOG como un archivo editorial transversal de LATTICCE. Las referencias adjuntas se interpretan como insumos de estructura y ritmo; no como instrucciones ni como estética que deba copiarse.

**Proyecto:** UROBOROS / LATTICCE BLOG
**Tipo de intervención:** Nueva sección pública editorial y sistema de artículos
**Estado:** DIRECCIÓN PARA APROBAR — planeación previa a producción
**Aprobador:** Solicitante
**Fecha de consolidación:** 27 de agosto de 2026

## 1. Encargo y contexto

Diseñar BLOG como una sola publicación editorial donde convivan entradas de todos los nodos de LATTICCE. El archivo no se divide en micrositios: mezcla las publicaciones en una portada común y comunica su procedencia mediante el logotipo oficial, el acento cromático y la etiqueta del nodo.

La portada debe favorecer el descubrimiento visual con un mosaico de imágenes de jerarquías variables. Debe incorporar un filtro por nodo y una búsqueda, sin convertir la cabecera en un panel de controles. Al abrir una entrada, la interfaz cambia de ritmo: conserva la identidad del nodo, pero prioriza legibilidad, concentración y lectura prolongada.

BLOG debe formar parte del mismo universo que BOOK. La transición de entrada, el tratamiento de materia y la lógica de relaciones deben crear continuidad, mientras sus funciones permanecen distintas:

> **BOOK muestra lo que hacemos. BLOG revela cómo miramos.**

## 2. Lectura de las referencias

### Referencia “Nirvana”

Se conserva:

- la idea de convertir gran parte del viewport en un archivo de imágenes;
- la variación de escala para establecer jerarquía editorial;
- el contraste entre una portada rápida y un artículo más lento;
- el uso de imagen dominante dentro de la entrada.

Se descarta:

- la estética de plantilla de revista o WordPress;
- el amarillo, los overlays grises y cualquier recurso de marca de la referencia;
- sidebar, comentarios, widgets, bloques sociales y footer pesado;
- títulos permanentes sobre todas las imágenes;
- módulos rígidos definidos por “tipo de post”.

### Mapa editorial adjunto

Se conserva como arquitectura temática y evidencia de que cada origen necesita categorías propias. No se copiará literalmente como navegación principal.

La estructura operativa separa dos conceptos:

- **Nodo:** procedencia de la publicación; controla logo, acento y filtro principal.
- **Categoría editorial:** tema o formato dentro de un nodo; sirve para metadatos, búsqueda, relaciones y crecimiento futuro.

Esta separación evita mezclar “Miradas”, “Narrativa visual” o “Equipo” con los nodos corporativos y permite que una categoría cambie sin alterar la identidad de la entrada.

## 3. Objetivo verificable

Una persona debe poder:

1. Reconocer BLOG como parte del universo LATTICCE desde la entrada.
2. Descubrir publicaciones de distintos nodos en un único archivo.
3. Identificar el nodo de cada entrada sin depender exclusivamente del color.
4. Filtrar el archivo por nodo y restablecer la vista completa.
5. Buscar por título, bajada, autor, categoría y palabras clave.
6. Abrir un artículo y leerlo cómodamente en escritorio o móvil.
7. Continuar hacia una entrada relacionada o un proyecto pertinente de BOOK.
8. Usar todas las funciones con teclado, touch o movimiento reducido.

## 4. Audiencia y respuesta esperada

### Audiencia primaria

- Prospectos que desean comprender la mirada, el criterio y el proceso detrás del trabajo.
- Personas de marca, cultura, diseño, producción, cine, sonido y comunicación que buscan pensamiento aplicado.
- Lectores que llegan por una búsqueda o por una entrada individual y aún no conocen el ecosistema LATTICCE.

### Audiencia secundaria

- Clientes, colaboradores, aliados y talento potencial.
- Comunidad creativa interesada en referencias, procesos, herramientas y reflexión.

### Respuesta esperada

La persona debe percibir que LATTICCE produce pensamiento además de obra, entender de qué nodo proviene cada mirada y encontrar un siguiente recorrido relevante sin sentir presión comercial dentro del texto.

## 5. Idea rectora

**Un archivo visual de pensamiento y proceso.**

La imagen abre la puerta; la interfaz revela procedencia; la lectura construye profundidad; las relaciones conectan el pensamiento con la práctica.

```text
La entrada sitúa.
El archivo mezcla.
El nodo identifica.
La búsqueda recupera.
El artículo desacelera.
BOOK demuestra.
```

## 6. Principios de experiencia

1. **Un archivo, múltiples voces.** Todo el contenido vive en una sola superficie; el nodo identifica, no fragmenta.
2. **Imagen antes que interfaz.** La portada muestra obra visual antes de exponer títulos y metadatos completos.
3. **Identidad como señal, no decoración.** Logo, nombre y acento del nodo cumplen una función de orientación.
4. **Dos velocidades.** El archivo es exploratorio y denso; el artículo es lento, espacioso y legible.
5. **Profundidad progresiva.** El primer nivel filtra por nodo; las categorías aparecen como metadata, búsqueda y navegación contextual.
6. **Lectura sin sacrificio de carácter.** La identidad cambia detalles editoriales, nunca ancho de columna, contraste o jerarquía de lectura.
7. **Continuidad útil.** El final del artículo abre una relación editorial o una aplicación en BOOK; no termina en un footer genérico.

## 7. Arquitectura de información

```text
MENÚ GLOBAL / BLOG
│
└── /blog
    ├── Entrada editorial
    ├── Archivo mixto
    │   ├── filtro por nodo
    │   ├── búsqueda
    │   ├── resultados / vacío
    │   └── paginación progresiva
    └── /blog/[slug]
        ├── cabecera editorial
        ├── cuerpo modular
        ├── proyecto relacionado de BOOK, si existe
        └── continuar leyendo
```

### Rutas recomendadas

```text
/blog
/blog/[slug]
```

Los filtros y la búsqueda deben reflejarse en la URL para permitir compartir y conservar el estado:

```text
/blog?nodo=studio
/blog?q=iluminacion
/blog?nodo=design&q=tipografia
```

No se recomiendan rutas separadas por nodo en la primera versión. Las páginas indexables por taxonomía pueden evaluarse después según volumen editorial y estrategia SEO.

## 8. Recorrido de la portada

### 8.1 Entrada

La entrada conserva el lenguaje de transición ya establecido por BOOK:

```text
BLOG
→ transición material emparentada con BOOK
→ frase editorial breve
→ apertura del archivo
```

La frase provisional es:

> **Miradas que construyen. Ideas que transforman.**

El primer viewport no incluye tarjetas convencionales, destacados laterales ni un bloque de “últimos posts”. Puede mostrar una primera composición visual o permitir que el mosaico empiece a revelarse desde la apertura.

### 8.2 Barra de exploración

Una franja limpia y, al desplazarse, sticky contiene:

- selector `TODOS`;
- un control por cada nodo editorial activo;
- botón o campo de búsqueda;
- contador accesible de resultados;
- acción `LIMPIAR` cuando exista un filtro o consulta.

En escritorio, los nodos se presentan en una línea discreta. En móvil, el filtro usa scroll horizontal con indicadores completos; no se oculta dentro de un menú si cabe como carrusel accesible.

Los filtros funcionan como botones con `aria-pressed`. El estado seleccionado no depende sólo del acento cromático: cambia texto, línea, contraste o fondo y mantiene foco visible.

### 8.3 Búsqueda

El campo se expande desde un control compacto sin cubrir la navegación. Reglas:

- consulta con actualización diferida para evitar saltos por pulsación;
- búsqueda normalizada sin distinguir mayúsculas ni acentos;
- coincidencia inicial en título, bajada, autor, categoría, palabras clave y texto indexado;
- `Escape` cierra o limpia según el estado;
- mensaje explícito cuando no hay resultados;
- sugerencia para retirar filtros cuando la combinación sea demasiado restrictiva.

### 8.4 Mosaico editorial

El archivo usa una retícula modular asimétrica con tamaños editoriales, no tamaños elegidos aleatoriamente.

Jerarquías recomendadas:

- **Manifiesto / ensayo principal:** módulo `2 × 2` o ancho dominante.
- **Ensayo / historia:** módulo horizontal o vertical de jerarquía media.
- **Nota / recurso / entrada técnica:** módulo menor.

La prioridad editorial se almacena como dato y se traduce a patrones de retícula predeterminados. El layout debe evitar huecos, reordenamientos semánticos y desplazamientos acumulados durante la carga.

Orden inicial: fecha editorial descendente, con una regla explícita de `featured` o `priority` para piezas dominantes. El orden visual no debe romper el orden de lectura del DOM.

### 8.5 Tarjeta de entrada

Estado base:

- imagen dominante;
- pequeño identificador persistente compuesto por logotipo oficial o símbolo del nodo más nombre textual;
- acento del nodo limitado a borde, línea, índice o halo controlado;
- sin bloque de texto permanente encima de la fotografía.

Hover o foco:

- cambio leve de luminosidad, contraste o escala;
- aparición de título, categoría, fecha y tiempo de lectura;
- tratamiento cromático del nodo;
- llamada `LEER` opcional y discreta.

Touch y teclado:

- la información esencial aparece siempre debajo o dentro de un área legible;
- el primer toque no se desperdicia en simular hover;
- la tarjeta completa conserva un nombre accesible claro.

## 9. Filtro e identidad por nodo

### Nodos confirmados para BLOG

```text
Agency
Studio
Sound
Design
Time
Films
```

`Films` es un nodo editorial activo. “Cinematografía” funciona como su territorio editorial y puede desglosarse en categorías como narrativa visual, dirección, cámara e imagen, postproducción e inspiración. No se tratará como un blog separado.

El sistema debe aceptar futuros nodos sin cambiar el componente. Una posible voz de marca madre queda soportada por el modelo, pero su activación editorial es una decisión pendiente.

### Reglas visuales

- Fondo común: negro profundo LATTICCE.
- Texto común: blanco/papel y grises fríos.
- Cada entrada usa el token de nodo ya definido en `app/globals.css`.
- FILMS requiere incorporar `--node-films` al sistema global usando el acento oficial que se confirme para el nodo; no se tomará automáticamente el amarillo de la referencia.
- El color de nodo ocupa una proporción baja de la superficie y nunca tiñe toda la galería.
- El logo se compone desde el asset oficial; no se redibuja, genera ni modifica.
- La infografía adjunta no redefine la paleta real del proyecto.

Tokens existentes:

```text
Agency  → --node-agency
Studio  → --node-studio
Sound   → --node-sound
Design  → --node-design
Time    → --node-time
Films   → --node-films (por incorporar con valor oficial)
```

## 10. Artículo individual

### 10.1 Cambio de ritmo

Al abrir una entrada, el mosaico desaparece y el sistema se vuelve editorial. La secuencia recomendada es:

```text
nodo / categoría / fecha / tiempo de lectura
→ título de escala dominante
→ bajada
→ autor y créditos
→ imagen hero
→ cuerpo de lectura
```

El logotipo del nodo puede acompañar la metadata o la cabecera, pero no competir con el título. La cabecera hereda el acento del nodo y el resto de la página vuelve a la paleta neutra.

### 10.2 Lectura

- Columna principal de aproximadamente `50–70ch`.
- Tamaño de texto fluido con mínimo cómodo en móvil.
- Interlineado generoso y contraste AA como mínimo.
- Márgenes laterales amplios en escritorio.
- Indicador de progreso discreto y no invasivo.
- Navegación global disponible sin ocupar el campo de lectura.
- Tiempo de lectura calculado y editable desde contenido.

### 10.3 Componentes editoriales

El cuerpo no será un campo HTML arbitrario. Debe componerse con bloques controlados:

- párrafo, subtítulo y lista;
- imagen contenida, amplia o full-width;
- galería o secuencia de fotogramas;
- cita destacada;
- palabra clave que rompe la retícula;
- pie de foto y créditos;
- anotación lateral;
- comparativa antes/después;
- diagrama o dato técnico;
- embed autorizado;
- ficha técnica;
- bloque de equipo utilizado;
- problema / solución;
- separador de capítulo.

Los bloques técnicos se habilitan donde aportan valor —por ejemplo Studio o Sound—, pero todos consumen el mismo sistema de artículo. No habrá un template completamente distinto por nodo.

### 10.4 Final del artículo

El final no se percibe como footer. La secuencia es:

```text
FIN DEL ARTÍCULO
→ VERLO EN PRÁCTICA (proyecto relacionado de BOOK, si existe)
→ CONTINUAR LEYENDO (hasta 3 entradas)
→ footer global mínimo
```

Los relacionados se seleccionan editorialmente. Como respaldo, el sistema puede priorizar misma categoría, mismo nodo y después diversidad entre nodos. Nunca debe mostrar la entrada actual ni repetir piezas.

## 11. Dirección de arte

### Concepto visual

**Una cámara oscura editorial:** el archivo vive en oscuridad y las imágenes aparecen como superficies proyectadas; al entrar al artículo, la luz se ordena para leer.

### Principios operativos

1. **Oscuridad estructural:** el negro crea profundidad y silencio, no un efecto de interfaz tecnológica.
2. **Imagen proyectada:** fotografía y video parecen revelar materia mediante luz, sin marcos decorativos de plantilla.
3. **Vacío deliberado:** la densidad del mosaico se compensa con respiración amplia en cabecera y lectura.
4. **Acento localizado:** el color del nodo orienta en puntos precisos; nunca convierte la página en un arcoíris.
5. **Tipografía arquitectónica y editorial:** sans serif aprobada para sistema y metadata; serif editorial del proyecto sólo si se confirma como parte del sistema tipográfico existente.

### Composición y materialidad

- Retícula modular de 12 columnas en escritorio, 6 en tablet y 2 en móvil.
- Grano global ya presente en el sitio, sin añadir texturas competitivas.
- Líneas finas, halos bajos, refracción o desenfoque sólo cuando indiquen foco o transición.
- Imágenes con tratamiento coherente, pero sin imponer un filtro que destruya el lenguaje propio de cada nodo.
- El espacio negativo aumenta de forma visible al pasar de archivo a artículo.

### Movimiento

- Entrada emparentada con BOOK mediante máscara, compresión o revelado material.
- Aparición escalonada de módulos sólo en la primera carga.
- Filtrado con transición corta que preserve posición y contexto.
- Hover basado en luz/contraste, no en desplazamientos grandes.
- Transición a artículo mediante continuidad de la imagen seleccionada cuando sea viable y estable.
- Con `prefers-reduced-motion`, eliminar parallax, seguimiento del puntero y transformaciones extensas; conservar cambios de estado instantáneos o fundidos breves.

## 12. Responsive

### Escritorio

- Mosaico de 12 columnas con 3–5 módulos visibles según el patrón.
- Filtros y búsqueda en una sola franja.
- Metadata revelada en hover y foco.

### Tablet

- Retícula de 6 columnas con menor variación extrema.
- Barra de filtros desplazable si no cabe.
- Controles táctiles explícitos.

### Móvil

- Retícula de 2 columnas con piezas dominantes a ancho completo.
- Título y metadata esenciales siempre visibles; no depender de hover.
- Búsqueda a ancho completo al abrirse.
- Cuerpo del artículo en una columna; anotaciones laterales pasan a bloques intercalados.
- Full-width media usa el viewport sin provocar scroll horizontal.

## 13. Modelo de contenido

### `BlogNode`

```text
id
name
slug
logo
accentToken
statement
isActive
order
```

### `BlogCategory`

```text
id
nodeId
name
slug
description
isActive
```

### `Author`

```text
id
name
role
portrait
bio
links[]
```

### `Post`

```text
slug
title
dek
nodeId
categoryIds[]
authorIds[]
publishedAt
updatedAt
readingTime
keywords[]
coverMedia
coverAlt
coverFocalPoint
priority: lead | standard | note
featured: boolean
bodyBlocks[]
relatedPostIds[]
relatedBookProjectId?
seoTitle
seoDescription
ogMedia
status: draft | review | published | archived
```

### Reglas de integridad

- Toda entrada publicada tiene título, bajada, nodo, fecha, portada, alt, autor o firma editorial y al menos un bloque de cuerpo.
- `nodeId` debe corresponder a un nodo activo y definir logo/acento desde una sola fuente.
- `categoryIds` sólo admite categorías válidas para la taxonomía acordada.
- `relatedBookProjectId` debe apuntar a un proyecto existente.
- La fecha de actualización sólo aparece si hay un cambio editorial sustantivo.
- No se publica media sin crédito, procedencia y estado de derechos registrado.

## 14. Arquitectura técnica recomendada

La solución debe integrarse a la base existente de Next.js, React y TypeScript y reutilizar:

- `SiteMenu` para navegación global;
- tokens de nodo de `app/globals.css`;
- incorporación de FILMS a los tokens y, si se aprueba para todo el sitio, al menú global;
- identidad y relaciones ya definidas por BOOK;
- componentes de imagen optimizada y metadata del App Router.

Componentes conceptuales:

```text
BlogExperience
├── BlogIntro
├── BlogToolbar
│   ├── NodeFilter
│   └── BlogSearch
├── EditorialMosaic
│   └── PostTile
└── BlogResultsState

BlogArticle
├── ArticleHeader
├── ReadingProgress
├── ArticleBody
│   └── EditorialBlockRenderer
├── BookBridge
└── RelatedPosts
```

La búsqueda de la primera versión puede resolverse en cliente si el archivo inicial es pequeño y todo el índice público cabe en el payload. Al crecer el volumen, debe migrar a búsqueda de servidor o índice dedicado sin cambiar la interfaz ni las URLs.

## 15. Estados necesarios

- carga inicial del archivo;
- filtro activo;
- consulta activa;
- combinación filtro + consulta;
- cero resultados;
- imagen ausente o con error;
- nodo sin publicaciones;
- artículo en borrador/no encontrado;
- contenido relacionado ausente;
- JavaScript deshabilitado: listado navegable y contenido legible.

## 16. Accesibilidad, SEO y rendimiento

### Accesibilidad

- Landmarks y encabezados en orden semántico.
- Filtros operables por teclado con foco visible.
- Identidad del nodo expresada en texto además de color y logo.
- `alt` editorial específico; imágenes decorativas con alt vacío.
- Contraste AA en texto y controles.
- Links de salto hacia archivo y contenido del artículo.
- Anuncios accesibles de cantidad de resultados sin interrumpir cada pulsación.

### SEO

- Metadata única por artículo, canonical y Open Graph.
- `Article` JSON-LD con autor, fecha, actualización, imagen y publisher.
- sitemap de publicaciones publicadas.
- páginas de búsqueda interna sin indexar.
- enlaces reales entre BLOG y BOOK para fortalecer contexto semántico.

### Rendimiento

- reservar proporción de cada imagen para evitar layout shift;
- cargar con prioridad sólo el primer módulo dominante;
- formatos responsivos y tamaños acordes a la retícula;
- no montar animaciones fuera del viewport;
- evitar video autoplay dentro del mosaico inicial;
- mantener la búsqueda fluida con índice liviano y actualización diferida.

## 17. Analítica mínima

- visita a `/blog`;
- selección y limpieza de nodo;
- uso de búsqueda y búsqueda sin resultados;
- apertura de entrada desde mosaico;
- profundidad de lectura por tramos;
- clic en proyecto relacionado de BOOK;
- clic en entrada relacionada.

La analítica debe medir decisiones de producto, no capturar el contenido completo de búsquedas si pudiera contener información personal.

## 18. Assets

### Disponibles

- logotipo LATTICCE y variantes de nodos en `public/assets/logos/`;
- logotipos oficiales de FILMS disponibles actualmente en `LOGO X NODOS/FILMS/`;
- tokens de color por nodo en `app/globals.css`;
- sistema global de navegación;
- sección BOOK y modelo de proyectos relacionados;
- imágenes del sitio que pueden servir como placeholders internos si se marcan como demostrativas.

### Faltantes para producción real

- inventario de entradas de lanzamiento;
- portadas y medias internas con derechos confirmados;
- autores, biografías y retratos, si aplican;
- taxonomía editorial final por nodo;
- relaciones iniciales con proyectos de BOOK;
- familia tipográfica editorial aprobada, si será distinta de la actual;
- valor oficial del acento cromático de FILMS y traslado de su SVG aprobado a `public/assets/logos/` durante producción;
- política editorial, cadencia y responsable de publicación.

## 19. Prohibiciones

- No copiar la identidad, amarillo ni composición exacta de “Nirvana”.
- No separar cada nodo en un blog distinto.
- No usar color sin etiqueta textual como única identificación.
- No llenar el primer viewport de filtros, títulos o widgets.
- No usar sidebar, comentarios o footer de revista convencional en el MVP.
- No convertir todas las entradas en tarjetas idénticas.
- No sacrificar legibilidad para conservar efectos inmersivos dentro del artículo.
- No reconstruir logos oficiales ni incrustarlos en imágenes generadas.
- No ordenar visualmente el mosaico de forma distinta al orden accesible del contenido.
- No publicar placeholders como proyectos o textos reales.

## 20. Criterios de aceptación

1. Todas las entradas publicadas aparecen en una sola portada y pueden filtrarse por nodo.
2. La procedencia de cada entrada se reconoce mediante texto, logo oficial y acento, sin depender sólo del color.
3. La búsqueda encuentra coincidencias en los campos definidos y conserva el estado en la URL.
4. El mosaico establece al menos tres jerarquías editoriales sin alterar el orden semántico.
5. En touch y teclado se accede a la misma información disponible en hover.
6. Los artículos mantienen una columna principal entre aproximadamente `50–70ch` y contraste AA.
7. El cuerpo admite los bloques editoriales definidos sin HTML arbitrario que rompa la maqueta.
8. El final del artículo ofrece continuidad editorial y, cuando exista, una relación válida con BOOK.
9. Movimiento reducido, carga fallida, cero resultados y ausencia de relacionados tienen estados completos.
10. La experiencia se reconoce como LATTICCE sin recurrir a recursos visuales de la referencia externa.

## 21. Alcance por fases

### Fase 0 — Aprobación y contenido semilla

- Aprobar este brief y la dirección.
- Cerrar nodos editoriales activos y taxonomía inicial.
- Elegir 8–12 entradas representativas para probar el mosaico.
- Inventariar logos, portadas, autores y relaciones con BOOK.

### Fase 1 — Modelo y wireframes

- Definir esquema de datos y fixture inicial.
- Wireframe de entrada, archivo, búsqueda, cero resultados y artículo.
- Probar navegación en escritorio y móvil.

### Fase 2 — Dirección visual y prototipo

- Aplicar retícula, tipografía, color, imagen y movimiento.
- Construir prototipo del mosaico con filtros y búsqueda.
- Construir un artículo largo con todos los bloques críticos.

### Fase 3 — Producción

- Implementar `/blog` y `/blog/[slug]`.
- Integrar metadata, búsqueda, filtros y relaciones.
- Añadir contenido inicial y estados completos.

### Fase 4 — QA y publicación

- Verificar responsive, teclado, screen reader y movimiento reducido.
- Revisar contenido, créditos, derechos, metadata y enlaces con BOOK.
- Medir rendimiento y corregir layout shift.
- Aprobar visualmente renders reales antes de publicar.

## 22. Confirmado, provisional y faltante

### Confirmado

- Todas las entradas se mezclan en una sola página.
- Cada entrada se identifica por acento y logo de su nodo.
- FILMS forma parte del BLOG como nodo activo; “Cinematografía” es su territorio editorial.
- Existe filtro por nodo y barra de búsqueda.
- El artículo conserva estética e identidad, pero prioriza lectura.
- El mosaico y la lógica editorial de la referencia son válidos; su estética no.
- BLOG debe relacionarse visualmente con BOOK y evitar patrones de blog convencional.

### Provisional

- Filtros iniciales: Todos, Films, Studio, Sound, Design, Agency y Time.
- Dos rutas públicas: `/blog` y `/blog/[slug]`.
- La búsqueda opera primero sobre un índice local si el volumen inicial lo permite.
- La frase de entrada es “Miradas que construyen. Ideas que transforman.”
- La retícula usa 12/6/2 columnas y tres jerarquías editoriales.
- El lanzamiento se prueba con 8–12 entradas.
- La voz autoral de marca queda soportada, pero no activa hasta confirmar su estatus.

### Faltante antes de producción final

- Confirmar si “Voz autoral” será un nodo de marca, una firma institucional o una categoría transversal.
- Cerrar las categorías iniciales de FILMS dentro del territorio “Cinematografía”.
- Confirmar el valor oficial del acento cromático de FILMS.
- Aprobar la taxonomía inicial completa por nodo.
- Definir fuente de contenido para la primera versión y CMS definitivo.
- Entregar o aprobar contenido y media de lanzamiento con derechos.
- Confirmar autores/firma institucional y responsable editorial.
- Confirmar si la tipografía editorial actual de BOOK se reutiliza o se proveerá otra familia aprobada.

## 23. Ruta de trabajo recomendada

1. **Aprobar brief y dirección de arte.** Cierra estructura, jerarquía y reglas visuales.
2. **Definir contenido semilla.** Prueba el sistema con casos reales y variedad suficiente.
3. **Prototipar portada + artículo.** Valida las dos velocidades de la experiencia.
4. **Criticar diseño.** Evalúa claridad, diferenciación, ritmo y lectura sobre renders reales.
5. **Construir el sitio.** Integra la solución con Next.js y los sistemas existentes.
6. **QA visual y funcional.** Comprueba brief, responsive, accesibilidad, rendimiento y contenido antes de publicar.

## 24. Siguiente hito de aprobación

Responder con `APROBAR DIRECCIÓN` o `CAMBIOS DE DIRECCIÓN: ...`.

Tras la aprobación, el siguiente entregable será un wireframe de alta definición de `/blog` y `/blog/[slug]`, acompañado por el esquema de datos inicial y una selección explícita de contenido placeholder.
