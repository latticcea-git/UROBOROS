# Reporte general de QA prepublicación — UROBOROS

**Fecha:** 26 de agosto de 2026

**Estado técnico:** APROBABLE

**Aprobación humana:** Pendiente en dispositivos físicos

## Veredicto breve

UROBOROS compila como export estático, conserva su dirección visual diferenciada por nodo y ya cuenta con una navegación global coherente. Las correcciones solicitadas de Studio, Design, Time, señales de desplazamiento e iconografía fueron aplicadas y reverificadas en navegador.

## Alcance verificado

- Build de producción con Next.js 16.3.1 y export estático.
- TypeScript y generación de 17 rutas.
- Tests automatizados del ciclo de versiones.
- Vistas de Studio, Design, Agency y Time en 390 × 844 y 1440 × 900.
- Navegación global, assets, overflow, señales de desplazamiento y errores de consola.
- Transición inicial y encuadre fotográfico de Time.

## Correcciones aplicadas

### Navegación global

- Se consolidó un único componente de header y menú para Home, Agency, Design, Studio y Time.
- Todas las variantes muestran el mismo índice base: HOME, AGENCY, DESIGN, STUDIO, TIME, SOUND, BOOK, BLOG, CLIENTES, COLABORADORES y USUARIO.
- Cada nodo conserva logo, color y atmósfera propios sin alterar la estructura ni el orden del menú.
- Time mantiene accesos contextuales a Historias, Coberturas, Equipo y Agenda.

### Navegación horizontal

- Studio, Design y Time muestran indicadores animados `‹‹‹  ›››` en escritorio y móvil.
- Los indicadores son decorativos, no interceptan gestos y respetan `prefers-reduced-motion`.
- En Design se eliminó el menú local inconsistente; la navegación principal ahora coincide con el resto del ecosistema.

### Studio móvil

- Se redujo y recentró el bloque de galería dentro del viewport móvil.
- En 390 × 844 las tarjetas quedan entre aproximadamente 283 y 763 px, con header y progreso visibles y sin quedar pegadas al borde inferior.
- El carril conserva swipe horizontal y el contenido mantiene legibilidad.

### Time

- El encuadre de entrada móvil ahora muestra a la pareja completa dentro del visor, evitando que la transición presente únicamente a la novia.
- La fotografía principal conserva el contexto horizontal y ambos sujetos.
- El indicador de navegación permanece visible después de cerrar la intro.

### Iconografía

- Los controles de reproducción y apertura/cierre de menú usan SVG.
- No se detectaron emojis Unicode en los archivos de aplicación.
- Los iconos decorativos permanecen fuera del árbol accesible y los botones conservan nombres legibles.

## Evidencia técnica

| Comprobación | Resultado |
| --- | --- |
| Build de producción | Aprobado |
| TypeScript | Aprobado |
| Export estático | 17 rutas generadas |
| Tests automatizados | 2 de 2 aprobados |
| Errores de consola en vistas revisadas | 0 |
| Overflow horizontal involuntario en Agency y Time móvil | 0 px |
| Menú canónico | 11 destinos consistentes |
| Assets visibles revisados | Sin roturas confirmadas |

## Hallazgos residuales

- **P2 — Prueba física pendiente.** La emulación responsive no reproduce completamente barras del navegador, safe areas, rendimiento ni inercia táctil de iOS y Android.
- **P2 — Recorrido completo con teclado.** Conviene confirmar foco visible y retorno de foco después de cerrar todos los modales en Safari y Chrome reales.
- **P3 — Dependencia informativa.** `baseline-browser-mapping` muestra una advertencia de datos desactualizados; no bloquea compilación ni publicación.

## Recomendaciones de testeo humano

1. Probar un iPhone con Safari y un Android con Chrome en orientación vertical y horizontal.
2. Pedir a una persona nueva que encuentre Studio, recorra su galería y llegue al cotizador sin instrucciones.
3. Pedir a otra persona que abra Design y determine en menos de cinco segundos hacia dónde desplazarse.
4. Recorrer Time desde el visor inicial hasta el reel y confirmar que ninguna cara o torso quede cortado durante la transición.
5. Abrir el menú desde Home, Agency, Design, Studio y Time; comparar orden, etiquetas, cierre y destino de cada enlace.
6. Probar Tab, Shift+Tab, Enter y Escape en menús, galerías, modales y formularios.
7. Activar “Reducir movimiento” y confirmar que toda la información siga disponible.
8. Probar una conexión lenta y verificar carga de videos, imágenes, posters y estados de espera.
9. Revisar WhatsApp y formularios con datos ficticios sin confirmar el envío final.
10. Hacer una última lectura editorial de textos, datos de contacto, avisos legales y contenido provisional.

## Criterio de salida

El sitio es técnicamente publicable. Para considerarlo aprobado por negocio, completar una pasada física en iPhone y Android y registrar cualquier P0/P1 antes de anunciar el dominio al público.
