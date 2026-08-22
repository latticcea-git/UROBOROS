# Brief maestro — Home inmersivo LATTICCE

**Proyecto:** UROBOROS / Home LATTICCE  
**Tipo de intervención:** Rediseño de navegación, interacción, motion y atmósfera visual  
**Estado:** Dirección para aprobar antes de producción  
**Prioridad principal:** Sustituir el desplazamiento continuo por una navegación escénica controlada, consistente en móvil y escritorio.

## 1. Encargo y contexto

El Home actual debe evolucionar de una página vertical convencional a una experiencia inmersiva compuesta por escenas de pantalla completa. Cada gesto de scroll o swipe deberá activar una transición deliberada: la escena activa se mantiene fija, sus elementos salen y la siguiente escena ocupa su lugar.

La nueva interacción debe resolver el fallo actual de scroll en móvil y conservar la posibilidad de explorar elementos interactivos dentro de cada escena sin romper la navegación general.

La identidad visual seguirá perteneciendo a la marca madre LATTICCE: oscuridad física, luz blanca proyectada, materia apenas visible, profundidad monumental y amplias áreas de vacío.

## 2. Objetivo verificable

Construir un Home de seis escenas donde:

1. El scroll vertical libre sea reemplazado por navegación por pasos o **hard scroll**.
2. Cada paso complete la salida de una escena y la entrada de la siguiente antes de permitir otro cambio.
3. La experiencia responda correctamente a rueda, trackpad, teclado, swipe y controles táctiles.
4. Los objetos interactivos reaccionen al puntero o al tacto sin bloquear permanentemente el avance general.
5. Las transiciones mantengan una narrativa continua de zoom, oscuridad y luz.
6. La versión con movimiento conserve buen rendimiento y disponga de una alternativa accesible con movimiento reducido.

## 3. Audiencia y respuesta esperada

**Audiencia confirmada:** visitantes que descubren el sistema creativo LATTICCE y sus nodos.  
**Respuesta esperada:** comprender que LATTICCE funciona como un organismo formado por disciplinas conectadas, explorar sus escenas y elegir un nodo.

## 4. Prioridad 1 — Nuevo sistema de navegación

### 4.1 Comportamiento general

- Cada escena ocupará `100svh` y permanecerá fijada durante su transición.
- La página no deberá deslizarse libremente dejando medias secciones visibles.
- Un gesto intencional de scroll, trackpad o swipe acumulará progreso hasta cruzar un umbral; entonces comenzará la transición a la escena contigua.
- Durante la transición, nuevos impulsos no encadenarán saltos ni omitirán escenas.
- Al terminar, la siguiente escena quedará estable y preparada para recibir un nuevo gesto.
- El desplazamiento hacia arriba deberá reproducir la transición inversa.
- El Home tendrá seis posiciones navegables: `00 / 05`.
- El progreso inferior deberá representar la escena activa, no el desplazamiento físico de un documento largo.
- Los enlaces del menú deberán llevar directamente a la escena correspondiente cuando exista un ancla interna y conservar sus rutas actuales hacia las páginas de nodo.
- El historial del navegador y los botones Atrás/Adelante deberán mantener una posición coherente.

### 4.2 Modelo técnico recomendado

Implementar una máquina de estados con una única `activeScene`:

```text
00 Hero
01 Manifiesto
02 Escoge tu nodo
03 La intención permanece
04 Nuestros Pilares
05 Contacto
```

Cada transición tendrá tres fases:

```text
reposo → salida de escena activa → entrada de escena siguiente → reposo
```

El gesto de navegación solo podrá cambiar `activeScene` durante el estado de reposo. La rueda o el swipe se bloquearán únicamente mientras corre la transición; el usuario nunca deberá quedar atrapado sin respuesta visual.

### 4.3 Escritorio

- Rueda y trackpad controlarán el avance por escenas.
- El primer desplazamiento perceptible iniciará o cargará la transición; al superar el umbral, la escena cambiará.
- El cursor podrá modificar ondas, núcleo y tarjetas sin cancelar la navegación vertical general.
- Teclas `ArrowDown`, `PageDown` y `Space` avanzarán; `ArrowUp` y `PageUp` retrocederán.
- `Home` irá al Hero y `End` a Contacto.

### 4.4 Móvil y tablet

- El gesto principal será un swipe vertical fuera de las zonas interactivas.
- La interfaz deberá responder desde el primer gesto, sin necesitar múltiples intentos para desbloquear el movimiento.
- El desplazamiento nativo del documento se desactivará solo dentro de la experiencia inmersiva.
- Un swipe corto que no supere el umbral devolverá la escena a su posición original.
- El cambio de orientación y las barras variables del navegador no deberán cortar contenido; usar unidades de viewport dinámicas.
- Los controles táctiles tendrán áreas mínimas cómodas y no dependerán del hover.

### 4.5 Interacción local frente a navegación general

- **Texto de Manifiesto:** arrastrar o desplazar directamente sobre su zona controlará el bucle del texto.
- **Núcleo:** mover el puntero o arrastrar sobre él alterará pulsación, dirección y energía visual.
- **Tarjetas de nodo:** tocar o hacer clic abre el nodo; un swipe vertical claro sobre la escena avanza o retrocede.
- Al terminar una manipulación local o después de un breve periodo sin acción, el movimiento automático se reanudará.
- La página deberá distinguir entre clic, arrastre exploratorio y swipe de navegación para evitar aperturas accidentales.

### 4.6 Accesibilidad y control de movimiento

- Con `prefers-reduced-motion`, sustituir zooms, loops y flashes por fundidos breves y saltos directos entre escenas.
- No usar destellos rápidos, repetitivos ni de alto contraste que puedan provocar malestar.
- Mantener navegación completa por teclado y foco visible.
- Cada escena deberá exponer un título semántico y anunciar el cambio sin repetir texto decorativo.
- Canvas, shaders y objetos visuales serán decorativos y no reemplazarán contenido textual.

## 5. Secuencia de escenas

## Escena 00 — Hero

### Contenido que permanece

- Logo y menú global.
- Titular actual: “Una idea. Muchas formas de hacerla real.”
- Variación tipográfica vigente: sans serif geométrica para el bloque principal y serif cursiva gris para el énfasis.
- Texto introductorio, llamada “Entrar al sistema” e indicador `00 / 05`.
- Obelisco actual, sujeto a composición con el nuevo mar digital.

### Cambios visuales

- Eliminar el fondo actual de monolito, abertura circular, haz lineal y geometrías rígidas.
- Sustituirlo por un **mar negro digital**, muy oscuro y de lectura sutil.
- La referencia adjunta define la calidad de la materia: pliegues densos, crestas suaves, profundidad negra, reflejos grises mínimos y aspecto escultórico.
- La referencia no se usará como fondo fijo final; funcionará como objetivo de textura y relieve.
- Mantener la escena predominantemente negra. Las olas solo deberán revelarse por reflejos fríos de muy baja intensidad.

### Movimiento del mar

- Construir las olas como superficie procedural animada en `canvas` o WebGL, no como imagen fija.
- Movimiento base lento, orgánico y continuo, sin sensación de salvapantallas.
- El puntero deberá generar una perturbación local: mayor desplazamiento, variación de reflejo y aceleración controlada cerca de su posición.
- En táctil, la perturbación seguirá el arrastre; sin interacción, la superficie regresará gradualmente a su ritmo base.
- La animación no deberá competir con el titular ni reducir su legibilidad.
- Incluir un fallback estático o de baja frecuencia para equipos limitados y movimiento reducido.

### Transición a Manifiesto

- Al avanzar, las capas de texto y el obelisco se separan suavemente en profundidad y pierden opacidad.
- El mar se repliega hacia negro.
- El título de Manifiesto y su caja entran desde una profundidad ligeramente mayor, sin mostrar una franja intermedia de página.

## Escena 01 — Manifiesto

### Jerarquía y composición

- Cambiar la etiqueta actual “Principio” por **“Manifiesto”**.
- Sustituir el contenido actual por el texto confirmado de este brief, sin resumirlo ni reescribirlo.
- Reducir el ancho de la caja principal de texto.
- Desplazar la caja ligeramente hacia la derecha, manteniendo suficiente aire respecto al núcleo.
- Mantener una jerarquía equivalente a la del Hero: masa tipográfica sólida, énfasis cursivo gris, luz contenida y espacio negativo deliberado.

### Texto confirmado

No creemos en disciplinas aisladas.  
Creemos en ideas que necesitan distintas formas para existir.

Cada nodo conserva una mirada propia.  
Juntos construyen una estructura capaz de pensar, producir y evolucionar alrededor de una misma intención.

En el centro está el **Luminautta**: la expresión de nuestra voluntad creativa.  
Quien explora lo desconocido, conecta posibilidades y encuentra una forma donde antes solo existía una idea.

Trabajamos cerca de cada cliente para entender su universo antes de intervenirlo.  
Así, cada disciplina responde a una misma visión, reduciendo fragmentación y construyendo proyectos más coherentes, flexibles y profundos.

Creemos en **ver cine en cada detalle y hacer que cada detalle sea cine**.  
No como formato, sino como forma de observar: luz, sonido, diseño, ritmo, espacio y narrativa pueden convertir lo cotidiano en experiencia.

Por eso no buscamos repetir fórmulas.  
Cada proyecto debe encontrar su propia **voz autoral**, su lenguaje y su manera única de existir.

Conectamos pensamiento, imagen, sonido, tecnología y experiencia.  
Exploramos. Interpretamos. Materializamos.

No buscamos producir más de lo mismo.  
Buscamos descubrir qué puede llegar a ser cada idea cuando todas sus partes comienzan a hablar el mismo lenguaje.

**Bienvenido a LATTICCE.**  
**Comencemos a crear juntos.**

### Tratamiento tipográfico del texto

- Mantener el cuerpo principal en la sans serif geométrica del Hero, con variaciones de escala y peso que permitan leer el manifiesto por fragmentos.
- Renderizar **Luminautta**, **ver cine en cada detalle y hacer que cada detalle sea cine** y **voz autoral** como énfasis en serif cursiva gris, siguiendo el lenguaje ya usado en el Hero.
- Tratar **Bienvenido a LATTICCE.** y **Comencemos a crear juntos.** como cierre de mayor presencia: sans serif geométrica blanca, sólida y separada del cuerpo por espacio, sin introducir un color nuevo.
- Conservar los saltos de párrafo indicados; forman parte del ritmo del pergamino.
- El texto completo debe existir una sola vez en la estructura semántica. Las copias necesarias para el bucle serán visuales y quedarán ocultas a tecnologías de asistencia.

### Texto-pergamino

- La caja funcionará como una ventana recortada o máscara vertical.
- El texto se desplazará hacia arriba y se repetirá en un bucle continuo, sin salto visible entre final e inicio.
- El movimiento automático será lento y legible.
- Scroll, rueda o arrastre directamente sobre la caja permitirán adelantar, retroceder o acelerar el texto.
- Después de la inactividad, el texto retomará suavemente el movimiento automático desde su posición actual.
- El bucle no deberá duplicar el contenido para lectores de pantalla.

### Núcleo LATTICCE

- Colocar a la derecha un núcleo vibrante compuesto por fibras de luz blanca y plata fría.
- El núcleo late de forma orgánica y contenida.
- La velocidad e intensidad del pulso aumentan con la velocidad del puntero o del arrastre, no solo con su posición.
- Cuando cesa la interacción, el pulso vuelve gradualmente a un estado latente.
- Evitar neón, esfera tecnológica genérica, azul dominante y partículas decorativas sin función.
- El núcleo debe sentirse físico, denso y vivo, como una concentración de energía del sistema.

### Transición a Nodos

- Al avanzar con el scroll general, texto y núcleo se contraen y se alejan mediante un zoom out.
- La máscara del texto se cierra y el núcleo se reduce hasta convertirse en un punto de luz.
- Desde esa profundidad aparecen las tarjetas de los nodos.

## Escena 02 — Escoge tu nodo

### Título

- Título propuesto: **“Escoge tu nodo”**.
- Esta redacción normaliza la frase original “Escoge tu Nodos”; deberá confirmarse antes de producción si se desea conservar otra formulación.

### Tarjetas

- Conservar únicamente este orden:
  1. Agency
  2. Studio
  3. Sound
  4. Design
  5. Time
- Las cajas aparecen suspendidas en un espacio negro, con variaciones leves de profundidad y flotación.
- En reposo, cada tarjeta activará de manera autónoma un brillo breve y revelará sutilmente su imagen y color predominante.
- Los destellos autónomos se alternarán; no deberán encenderse todas las tarjetas al mismo tiempo.
- Al hover o foco, la tarjeta activa toma control, aumenta su presencia y muestra con mayor claridad imagen, color y llamada de exploración.
- En táctil, el primer contacto puede revelar el estado activo y el toque confirmado abre el destino, siempre que no se haya detectado un swipe.

### Colores confirmados

- Agency: azul.
- Studio: amarillo dorado.
- Sound: morado.
- Design: naranja.
- Time: gris/plata neutro, provisional mientras no se defina otro color.

### Navegación de las tarjetas

- Agency → `/agency`
- Studio → `/studio`
- Sound → `/sound` mientras permanezca en preparación.
- Design → `/design`
- Time → `/time` mientras permanezca en preparación.

### Transiciones

- **Scroll general:** zoom out del conjunto y aparición de “La intención permanece”.
- **Clic o toque en una tarjeta:** zoom in hacia la tarjeta seleccionada; las demás desaparecen en profundidad y, al completar la transición, se abre la página correspondiente.
- El cambio de ruta solo ocurrirá después de dar feedback visual inmediato.

## Escena 03 — La intención permanece

### Contenido

- Conservar sin cambios:
  - “La forma cambia.”
  - “La intención permanece.”
  - “LATTICCE / 2026”
- Mantener la composición central y el espacio negativo actual.

### Movimiento y luz

- La escena entra como resultado del zoom out de las tarjetas.
- El texto aparece desde profundidad y estabiliza su escala al centro.
- El texto tendrá un brillo latente: respiración luminosa lenta, blanca y muy tenue.
- El brillo no deberá desenfocar los contornos ni reducir legibilidad.

### Transición a Pilares

- Al avanzar, una expansión breve de luz blanca atraviesa la escena.
- El flash funcionará como transición de revelado, no como destello agresivo.
- Tras el flash aparece la estructura de “Nuestros Pilares”.

## Escena 04 — Nuestros Pilares

### Contenido

- Renombrar la sección visualmente como **“Nuestros Pilares”**.
- Conservar la información existente y su orden:
  1. Escuchar — Entender el contexto antes de decidir la forma.
  2. Conectar — Reunir las disciplinas que la idea realmente necesita.
  3. Construir — Convertir estrategia, materia y tiempo en una experiencia.
  4. Permanecer — Crear sistemas capaces de crecer sin perder identidad.

### Nueva imagen

- Sustituir el Luminautta actual por una estructura inspirada en un palacio o templo griego.
- No deberá parecer una fotografía turística ni una ilustración clásica ornamental.
- Dirección propuesta: arquitectura monumental fragmentaria, columnas y entablamento apenas revelados por luz proyectada, construidos como materia negra, plata o fibras luminosas.
- La estructura debe representar fundamento, orden, permanencia y soporte colectivo.
- Mantener el contenido legible y separado de la imagen.
- El asset definitivo queda pendiente de producción y aprobación; puede resolverse como escena 3D, composición generada o imagen tratada, nunca incluyendo logotipos o texto generado.

### Interacción y transición

- Los cuatro pilares se revelan por capas mientras la estructura gana volumen.
- Hover o foco sobre un pilar puede encender una zona arquitectónica correspondiente de manera sutil.
- Al avanzar, la cámara realiza un zoom in hacia la oscuridad de la estructura.
- La arquitectura se disuelve y deja aparecer la escena de Contacto.

## Escena 05 — Contacto

### Composición

- Conservar el contenido y la intención de la sección de contacto actual.
- La escena inicia casi completamente oscura.
- Logo, etiqueta, titular, texto y botón aparecen gradualmente como elementos alcanzados por una luz tenue.
- Mantener el protagonismo del titular y la llamada a conversación.
- Evitar añadir formas decorativas que compitan con el foco central.

### Estado final

- Al llegar a Contacto, la escena queda estable y permite interactuar con el botón sin movimiento forzado.
- Un scroll hacia arriba vuelve a “Nuestros Pilares” mediante la transición inversa.
- El footer podrá revelarse dentro de la misma escena o después de la acción principal, sin crear una séptima pantalla accidental.

## 6. Sistema visual

### Paleta

- Negro profundo como espacio físico dominante.
- Blanco, gris y plata fría para luz, texto y fibras.
- Colores de nodo limitados a estados interactivos y revelados breves.
- Sin dorado ornamental, salvo el amarillo dorado funcional de Studio.
- Sin azul tecnológico genérico, morado dominante ni neón multicolor.

### Tipografía

- Mantener las familias ya implementadas en el Home.
- Sans serif geométrica, sólida y arquitectónica para titulares estructurales.
- Serif cursiva gris para ideas sensibles, persistencia y énfasis.
- Conservar contraste equivalente al Hero en Manifiesto y escenas posteriores.
- Evitar agregar familias nuevas sin necesidad.

### Luz y materia

- La luz deberá sentirse proyectada y física, no como adorno de interfaz.
- Usar haze, bloom y partículas solo cuando ayuden a describir volumen.
- Mantener superficies oscuras apenas reveladas y abundante espacio negativo.
- El movimiento debe sugerir organismo, latencia y respiración.

## 7. Requisitos técnicos y de rendimiento

- Mantener exportación estática compatible con GitHub Pages y el `basePath` `/UROBOROS`.
- Evitar dependencias que requieran servidor en tiempo de ejecución.
- Usar carga diferida para escenas, texturas y assets que no pertenezcan al Hero.
- Limitar resolución y densidad del render procedural según capacidad del dispositivo.
- Pausar canvas, shaders y loops cuando la pestaña no esté visible o la escena no esté activa.
- Reducir calidad de forma progresiva antes de desactivar la interacción.
- Objetivo provisional: experiencia fluida en móviles recientes y escritorio sin bloquear el hilo principal.
- Conservar rutas, menú, enlaces de nodos y pantallas de carga existentes.
- No introducir scroll horizontal ni saltos de layout.

## 8. Entregables

1. Sistema de navegación hard scroll para móvil y escritorio.
2. Hero con mar negro digital procedural e interacción por puntero/tacto.
3. Manifiesto con caja recortada, loop controlable y núcleo de fibras de luz.
4. Escena de nodos suspendidos con autoplay visual, estados hover/foco/touch y navegación.
5. Escena “La intención permanece” con latencia luminosa y transición flash controlada.
6. “Nuestros Pilares” con nueva arquitectura y contenido existente preservado.
7. Contacto con revelado progresivo en oscuridad.
8. Fallback para movimiento reducido y dispositivos limitados.
9. QA en móvil, tablet y escritorio.

## 9. Criterios de aceptación

### Navegación

- Ninguna escena queda a medio camino después de finalizar un gesto.
- No se pueden saltar escenas por inercia del trackpad o múltiples eventos de rueda.
- El Home responde al primer swipe válido en móvil.
- Es posible avanzar, retroceder y abrir el menú sin quedar atrapado.
- Las zonas interactivas no abren rutas por accidente durante un arrastre.

### Visual

- El Hero ya no contiene las formas geométricas ni líneas del fondo actual.
- Las olas son animadas, procedurales y muy oscuras; no se perciben como una imagen fija.
- Manifiesto conserva variación tipográfica y gana una composición más corta y desplazada a la derecha.
- El núcleo responde a velocidad de puntero/tacto y recupera su estado latente.
- Las tarjetas flotan y se autoiluminan incluso sin hover.
- “La intención permanece” conserva su contenido y respira con luz tenue.
- La arquitectura de Pilares comunica soporte y permanencia sin caer en ornamentación clásica genérica.
- Contacto aparece desde oscuridad con iluminación progresiva y legible.

### Rendimiento y accesibilidad

- No hay scroll horizontal ni bloqueo irreversible del scroll.
- No hay errores de consola que interrumpan la navegación.
- La interacción conserva fluidez razonable en móvil y escritorio.
- La experiencia completa funciona con teclado.
- `prefers-reduced-motion` elimina loops intensos, zooms y flashes.
- El contenido sigue siendo comprensible si WebGL o canvas no están disponibles.

## 10. Confirmado, provisional y faltante

### Confirmado

- Home compuesto por seis escenas.
- Navegación hard scroll en móvil y escritorio.
- Fondo de Hero reemplazado por mar negro digital animado.
- Texto definitivo de Manifiesto incorporado sin reescritura, con sus énfasis tipográficos definidos.
- Manifiesto con texto recortado, bucle controlable y núcleo interactivo.
- Nodos flotantes, autoiluminados y navegables.
- Conservación del contenido de “La intención permanece”.
- Método renombrado visualmente como “Nuestros Pilares” y contenido preservado.
- Sustitución del Luminautta por una arquitectura inspirada en palacio o templo griego.
- Contacto oscuro con revelado luminoso.

### Provisional

- Título normalizado “Escoge tu nodo”.
- Time usa gris/plata como color de interacción.
- Implementación procedural mediante canvas/WebGL con fallback estático.
- El footer se integra dentro de la escena de Contacto.
- Umbrales exactos, duración y curvas de transición se definirán durante el prototipo.

### Faltante antes de producción final

- Aprobar la redacción exacta del título de la escena de nodos.
- Aprobar el concepto visual del núcleo de fibras.
- Aprobar el tratamiento arquitectónico de “Nuestros Pilares”.
- Definir si el obelisco actual permanece visible en el Hero o se elimina al introducir el mar digital.
- Confirmar el nivel máximo de intensidad permitido para el flash entre escenas 03 y 04.

## 11. Ruta de producción recomendada

1. Aprobar este brief y resolver los cinco puntos faltantes.
2. Prototipar únicamente la navegación hard scroll con bloques neutros en móvil y escritorio.
3. Aprobar ritmo, sensibilidad, bloqueo y reversibilidad del gesto.
4. Producir Hero y Manifiesto interactivos.
5. Integrar Nodos y sus transiciones de ruta.
6. Producir Interludio, Pilares y Contacto.
7. Optimizar rendimiento, movimiento reducido y fallbacks.
8. Ejecutar QA visual y funcional sobre renders reales.

## 12. Siguiente hito de aprobación

**APROBAR BRIEF** o indicar **CAMBIOS DE BRIEF**.  
Después de la aprobación, el primer entregable será un prototipo funcional de navegación con las seis escenas, todavía sin invertir tiempo en los efectos visuales finales.
