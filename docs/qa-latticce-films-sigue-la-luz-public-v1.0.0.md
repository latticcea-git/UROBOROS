# LATTICCE FILMS — Sigue la luz / Public v1.0.0

Estado: aprobado para publicación.

## Identidad de versión

- Nombre: `Sigue la luz — Public v1.0.0`
- Identificador interno: `sigue-la-luz-public-v1.0.0`
- Etiqueta Git: `films-sigue-la-luz-v1.0.0`
- Ruta local: `http://localhost:3100/UROBOROS/films`
- Ruta pública: `https://latticcea-git.github.io/UROBOROS/films`

## Secuencia publicada

- Apertura y empalme SVG aprobados, sin cambios de recorrido.
- Cinco placas maestras: `frame-003`, `bridge-005-008-prelude-v2`, `frame-008`, `frame-009` y `frame-012`.
- Exposición final realizada sobre `frame-012`, sin sustituir el encuadre.
- Narrativa, marca superior y cierre `luz` conservados.
- Guía intermitente inferior: “Sigue deslizando”.
- Cierre con dos accesos: formulario FILMS y CINNEMA.

## Optimización

- Render inmediato desde memoria cuando la placa ya está decodificada.
- Eliminada la precarga duplicada que competía con el dibujo del canvas.
- Cinco imágenes decodificadas como máximo en el tamaño activo.
- Paquete público de la secuencia reducido de 29 MB y 337 archivos a 2.8 MB y 30 derivados.
- Los masters y puentes descartados permanecen respaldados en `TT-IA` y pueden regenerarse con las herramientas del proyecto.

## QA ejecutado

- TypeScript: correcto.
- Exportación estática de Next.js: correcta, 46 páginas generadas.
- Escritorio 1280×720: correcto.
- Móvil 390×844: correcto.
- Scroll rápido, reversa y cambios alternados: canvas listo, cinco placas decodificadas, cero cargas pendientes.
- Enlace VER: destino `/films/cinema` correcto.
- Formulario FILMS: apertura y cierre con Escape correctos.
- Movimiento reducido: cuatro estados esenciales, formulario y CINNEMA disponibles.
- Navegación: Films disponible dentro de NODOS; el home conserva sus cinco tarjetas originales.
- Consola: sin errores. Permanece un aviso no bloqueante deprecado del reloj interno de Three/R3F.

## Criterio de respaldo

Esta versión sustituye los respaldos de prueba V1–V10 como referencia activa. El historial Git y los masters conservan la trazabilidad necesaria.
