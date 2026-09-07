# LATTICCE FILMS — Brief maestro: “Sigue la luz”

Estado: fuente canónica de requisitos. Arquitectura técnica y secuencia V1 implementadas; pendientes de aprobación visual antes de construir la variante FILMS del formulario.

## Fuente y alcance

Este documento registra el brief maestro entregado en español el 31 de agosto de 2026. Su copia de origen permanece en el adjunto de la conversación: `/Users/emmcinne/.codex/attachments/a3a6ed0e-c8f9-4d99-b878-52554ed5d293/pasted-text.txt`.

El prompt visual de origen para producir o corregir únicamente frames faltantes está almacenado aparte en `docs/prompt-origen-latticce-films-establishing-shot.md`. En caso de conflicto, los keyframes adyacentes siguen teniendo prioridad visual.

La experiencia pertenece al sitio de **LATTICCE FILMS** y continúa exactamente después de la animación actual del logotipo. La secuencia se identifica como **“Sigue la luz”**.

Flujo conceptual obligatorio:

`LOGOTIPO → FORMA → ARQUITECTURA → RECORRIDO → LUZ → INVITACIÓN`

## Reglas canónicas

- Los keyframes proporcionados son canónicos: no se regeneran, reinterpretan ni rediseñan.
- Cualquier frame nuevo existe únicamente para explicar la continuidad entre keyframes consecutivos.
- Deben conservarse la misma arquitectura TT, relieve superior, materiales brutalistas, terreno húmedo, atmósfera, personaje, vestuario, eje de cámara, profundidad, fuente de luz y progresión luminosa.
- No introducir otras estructuras, edificios, decoración, props, vegetación dominante, símbolos, interfaz sci-fi, vehículos ni elementos ajenos.
- El master visual es 4K 16:9 (3840 × 2160). La adaptación responsive usa recorte controlado, nunca deformación.

## Continuidad narrativa

La doble T del SVG se reencuadra y se aproxima con una elevación leve de luz. Los elementos del logo que no son TT desaparecen de forma independiente. Dentro de un bloom controlado, el SVG se materializa en concreto fotográfico; no se permite un corte ni el patrón “logo → fade → imagen”.

El recorrido avanza sobre un eje central estable: descubrimiento distante, aproximación, entrada dentro de la misma TT, consolidación del personaje y sobreexposición progresiva. La luz final es predominantemente blanca, con contaminación dorada apenas perceptible; no debe convertirse abruptamente en `#FFFFFF` ni en golden hour.

El movimiento principal es avance. Solo se permite un desplazamiento lateral mínimo al inicio para empatar el logo y la estructura.

## Texto y comportamiento

Los textos narrativos son editables, no parte de las imágenes. Aparecen de uno en uno con transición suave y pueden responder a una pausa de contemplación; la escena queda sutilmente viva al detener el scroll sin reproducirse por sí sola.

La implementación debe usar progreso de scroll y una timeline interpolada, con precarga selectiva y una estrategia de rendimiento que no cargue masters 4K masivamente. Desktop es prioritario; tablet, móvil y `prefers-reduced-motion` conservan la narrativa mediante una versión adaptada o simplificada.

## Nota canónica del final: invitación y formulario

Esta parte **no es parte directa de la animación principal** y se diseñará después de estabilizar “Sigue la luz”. El blanco final funciona como puente: `LUZ → PAUSA → INVITACIÓN → FORMULARIO`.

El CTA provisional usa laureles y el texto “TU CAMINO APENAS COMIENZA”. Al activarse, muestra una variante específica del formulario LATTICCE FILMS.

Antes de construir esa variante se debe localizar y analizar el formulario existente, reutilizar o duplicar sus componentes y lógica, conservar las funcionalidades —incluida la interacción de mano si aplica— y proponer los campos específicos de FILMS. El formulario original no se modifica hasta aprobar la nueva variante.

## Secuencia de trabajo obligatoria

1. Revisar la arquitectura actual del sitio y localizar intro Films, SVG y formulario existente.
2. Inventariar, ordenar y analizar los keyframes reales.
3. Detectar inconsistencias y proponer frames puente sin alterar los keyframes.
4. Medir resolución/peso y proponer arquitectura técnica, timeline y breakpoints.
5. Presentar el plan para aprobación antes de implementar.

## Estado de implementación V1

- 15 keyframes canónicos preservados sin modificaciones.
- 18 frames puente incorporados como borrador de continuidad.
- 33 estados narrativos publicados mediante derivados WebP/JPEG para desktop, tablet y móvil.
- Render Canvas 2D de doble buffer, ventana máxima de cuatro imágenes decodificadas y timeline independiente de la intro existente.
- Narrativa editable, pausa contemplativa, responsive y variante `prefers-reduced-motion` implementados.
- Invitación final representada como continuidad visual, sin activar ni modificar todavía el formulario existente.

La V1 debe aprobarse visualmente antes de iniciar la fase `LUZ → PAUSA → INVITACIÓN → FORMULARIO`.
