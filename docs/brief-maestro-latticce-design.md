# Brief maestro — LATTICCE DESIGN / VERSIÓN 2

> Prompt de dirección creativa, experiencia, contenido y producción para la página `/design`.
>
> Estado: `BORRADOR — VERSIÓN 2`
> Concepto rector: **La idea atraviesa la materia y toma forma.**

## 1. Encargo

Diseñar y desarrollar una experiencia web vertical para LATTICCE DESIGN, integrada al ecosistema general de LATTICCE y construida desde objetos, materia, luz y transformación. El sitio debe comunicar que DESIGN convierte ideas en identidades, objetos y experiencias que pueden verse, tocarse y moverse.

La página no es un clon de Adobe ni una interfaz SaaS. Illustrator, Photoshop y Blender funcionan como vocabulario visual: pluma, nodos, guías, capas, barras, lienzos, materiales y estados de edición. La única escena que adopta una interfaz completa de software es el BOOK.

## 2. Objetivo

- Presentar con claridad las capacidades de DESIGN.
- Destacar el BOOK y conducir a los casos completos.
- Explicar una atención ordenada y cercana.
- Mostrar aplicaciones concretas: branding, 3D, packaging y contenido periódico.
- Convertir el recorrido en una cita virtual mediante el formulario global de LATTICCE.

## 3. Audiencia

Marcas, fundadores, equipos de marketing, directores creativos y proyectos culturales o tecnológicos que necesitan identidad, dirección visual, editorial, 3D, animación, packaging o contenido recurrente con una perspectiva experimental y producible.

## 4. Dirección visual

### Materia

Resina negra, arcilla, vidrio, acrílico naranja, cromo, aluminio, papel sin recubrimiento, niebla y grano. Los materiales deben percibirse con peso, espesor, sombras y comportamiento físico intencional.

### Paleta

- Negro: `#050505`
- Grafito: `#141414`
- Papel cálido: `#F1EEE8`
- Marfil: `#E9E4DB`
- Naranja: `#FF5A0A`

El naranja funciona como abertura, selección, energía y continuidad. No usar violeta, azul neón ni partículas decorativas.

### Tipografía

- Arial/Helvetica para interfaz, navegación, datos y titulares de fuerza gráfica.
- Georgia para énfasis editorial, lenguaje humano y contraste material.
- No añadir dependencias tipográficas.

### Logo

Usar exclusivamente el SVG oficial `public/assets/logos/LTT_LOGO_NEG_DESIGN.svg` sobre fondo oscuro o su variante positiva sobre fondo claro. El logo se superpone como capa independiente; nunca se genera, redibuja o deforma con IA.

## 5. Secuencia narrativa

### 01. Hero — La idea atraviesa la materia

Escultura monumental de resina negra dividida por una abertura naranja. Niebla baja, grano y retícula técnica sutil. El logo oficial de LATTICCE DESIGN se presenta como vector seleccionado con cuatro nodos discretos y resplandor controlado.

Copy:

> Convertimos ideas en identidades, objetos y experiencias que pueden verse, tocarse y moverse.

CTA: `Descubrir capacidades`.

### 02. Capacidades — + CREA

Adaptar el sistema visual de `+ CREA` de LATTICCE SOUND a naranja. Un halo tenue sigue al mouse y la capacidad activa cambia automáticamente o por selección directa.

1. Branding e identidad
2. Dirección de arte
3. Diseño editorial
4. 3D y visualización
5. Motion y animación
6. Packaging
7. Contenido para redes

### 03. Book — Archivos abiertos

Único tramo horizontal del sitio. En desktop permanece fijado mientras las ventanas avanzan de derecha a izquierda; en móvil usa scroll horizontal nativo con `scroll-snap`.

Mostrar exclusivamente `bookProjects.filter(project => project.node === "design")`:

- `Materia 01` como archivo `.ai`, enlace `/book/materia-01`.
- `Archivo naranja` como archivo `.psd`, enlace `/book/archivo-naranja`.

Cada proyecto se presenta como una ventana completa de software creativo con barra, herramientas, lienzo, selección, capas, propiedades y metadatos. Toda la ventana es un enlace al caso completo.

### 04. Anima — El mundo plano se mueve

Escena oscura y limpia con loader radial naranja. El porcentaje pasa de 0 a 100 conforme la sección entra y avanza por el viewport.

Copy:

> ANIMA
> Le damos alma y movimiento a tu mundo plano.

### 05. Proceso — Atención visible

Fondo marfil con paneles físicos de vidrio, arcilla, acrílico transparente y acrílico naranja.

1. **Brief claro** — Aterrizamos objetivo, contexto, alcance y referencias antes de diseñar.
2. **Dirección compartida** — Alineamos concepto, ruta visual y decisiones antes de producir.
3. **Seguimiento visible** — Compartimos avances y próximos pasos para que siempre sepas dónde estamos.
4. **Entrega ordenada** — Archivos, versiones y guías listos para usar, adaptar y crecer.

### 06. Branding

> Creamos universos visuales.

Tu marca deja de ser una pieza aislada y se convierte en un lenguaje reconocible.

### 07. 3D

> Modelamos tu mundo.

Construimos objetos, espacios y productos antes de que existan, listos para presentar, probar o animar.

### 08. Packaging

> Listo para enviar.

Diseñamos empaques que presentan, protegen y venden desde el primer contacto.

### 09. Contenido periódico

> Contenido periódico para redes sociales.
> Lo hacemos por ti.

Planeamos, diseñamos y adaptamos un sistema constante para que tu marca no improvise cada semana.

### 10. Contacto

Manos desenfocadas detrás de vidrio esmerilado con luz naranja.

> Agenda tu cita virtual.
> *Asesoramos tu proyecto.

CTA: `Agendar una conversación`. Debe abrir el formulario global de LATTICCE sin duplicar formularios dentro de la página.

## 6. Interacción y movimiento

- Scroll vertical para todo el recorrido.
- Book horizontal fijado únicamente en desktop y solo cuando no se solicita reducción de movimiento.
- Cursor personalizado de 16–20 px inspirado en la pluma de Illustrator, con la punta exactamente en el hotspot.
- Sin etiqueta junto al cursor. En elementos interactivos aparece únicamente un nodo naranja discreto.
- Halo naranja que sigue al mouse dentro de Capacidades.
- Revelados, escalas y parallax leves con GSAP/ScrollTrigger.
- El contenido nunca depende de una animación para existir o entenderse.

## 7. Responsive y accesibilidad

- Validar en `1440×900`, `768×1024` y `390×844`.
- En touch ocultar el cursor personalizado y conservar cursores/controles nativos.
- En móvil, el BOOK debe tener `overflow-x: auto`, `scroll-snap-type: x mandatory` y ventanas completas enlazables.
- Mantener foco visible, semántica de enlaces/botones, textos alternativos y contraste AA.
- Con `prefers-reduced-motion: reduce`: sin pinning, parallax ni progresión; loader estático en 100% y contenido visible.

## 8. Assets originales

Las referencias entregadas son dirección, no material de producción. Generar imágenes nuevas sin logos, marcas ni texto legible y etiquetarlas como `BORRADOR — imagen generada` hasta aprobación:

1. Hero: monolito de resina negra abierto por luz naranja.
2. Proceso: paneles de vidrio, arcilla y acrílico naranja sobre marfil.
3. Branding: papel, resina, metal y bloques abstractos sin texto.
4. 3D: objeto continuo de vidrio, cromo y arcilla naranja.
5. Packaging: caja negra con mecanismo interior naranja.
6. Redes: mano real sosteniendo un dispositivo sin marca bajo luz naranja.
7. Contacto: dos manos detrás de vidrio esmerilado.

## 9. Prohibiciones

- No convertir toda la página en software, dashboard o SaaS.
- No copiar composiciones, textos, marcas ni assets de las referencias.
- No generar el logo de LATTICCE DESIGN dentro de una imagen.
- No usar texto falso dentro de renders.
- No añadir partículas, glitches, neón azul/violeta o mundos digitales de Agency.
- No sacrificar legibilidad, touch, teclado, rendimiento o reducción de movimiento por efectos.

## 10. Prompt maestro de ejecución

Diseña y desarrolla una página vertical para LATTICCE DESIGN bajo el concepto “La idea atraviesa la materia y toma forma”. Construye la experiencia desde objetos físicos y experimentación 3D: resina negra, arcilla, vidrio, acrílico naranja, cromo, papel, niebla y grano. Usa negro `#050505`, grafito `#141414`, papel `#F1EEE8`, marfil `#E9E4DB` y naranja `#FF5A0A`; combina Arial/Helvetica para interfaz con Georgia para énfasis editorial.

Ordena la página así: hero monumental con el SVG oficial de LATTICCE DESIGN superpuesto, capacidades `+ CREA`, book, Anima, proceso, branding, modelado 3D, packaging, contenido periódico y contacto. Mantén el scroll vertical y convierte únicamente el book en una escena horizontal fijada en desktop; en móvil usa scroll horizontal nativo con snap. Construye el book desde los proyectos centrales del nodo DESIGN y representa cada uno como una ventana enlazable de Illustrator o Photoshop con barra, herramientas, lienzo, selección, capas y propiedades.

Usa una pluma de Illustrator de 16–20 px como cursor, orientada hacia su hotspot exacto en la punta inferior izquierda, sin etiqueta y con un nodo naranja mínimo en estados interactivos. Añade un halo naranja que siga al mouse en Capacidades y un loader radial que inicie opaco en 1%, se ilumine progresivamente y alcance 100% en 15 segundos al entrar en Anima. En Packaging, deja visible la imagen sola durante unos segundos antes de revelar el copy. Usa GSAP/ScrollTrigger con moderación y respeta `prefers-reduced-motion`: sin pin, parallax ni progresión, con contenido visible y loader al 100%.

Genera únicamente las siete escenas de materia descritas, sin logos, marcas ni texto legible. Coloca el SVG oficial como capa independiente. Evita SaaS, dashboard, copia de Adobe, exceso de partículas, mundos digitales, azul/violeta, texto generado y minimalismo corporativo. Prioriza jerarquía, contraste AA, foco visible, touch, rendimiento y navegación clara al formulario global.

## 11. Criterios de aceptación

- DESIGN se reconoce en los primeros segundos mediante logo oficial, materia y naranja.
- La página es vertical; solo el book cambia de eje.
- El book contiene los dos proyectos reales del nodo y abre sus páginas canónicas.
- El cursor es pequeño, claro y no compite con el contenido.
- Las siete capacidades, cuatro etapas y cuatro aplicaciones están completas.
- El CTA final abre el formulario global.
- No hay assets rotos, texto generado dentro de imágenes ni logotipos reconstruidos.
- Desktop, tablet, móvil y reducción de movimiento conservan contenido, foco y navegación.
