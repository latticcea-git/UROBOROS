# Reporte general de QA — UROBOROS

**Estado:** Requiere validación humana antes de publicar.

## Alcance

Revisión técnica del sitio, navegación horizontal, comportamiento responsive, consistencia del header/menú, iconografía, galerías y transiciones visuales. La revisión técnica confirma compilación; la aprobación final requiere probar el sitio en dispositivos físicos y navegadores reales.

## Correcciones aplicadas

- Se añadieron señales sutiles y animadas de dirección `‹‹‹  ›››` en las experiencias horizontales de Design, Time y Studio.
- Se amplió el menú compartido con CLIENTES, COLABORADORES y USUARIO, manteniendo los enlaces específicos de cada sección.
- Se ajustó el encuadre de la fotografía principal de Time para conservar a la pareja dentro de la transición.
- Se confirmó que los controles principales usan texto, SVG o caracteres de interfaz; no se encontraron emojis Unicode en el código de la aplicación.

## Hallazgos a validar manualmente

### P1 — Navegación de Design

La interacción horizontal puede resultar inesperada porque el desplazamiento vertical de escritorio controla un carril horizontal y en móvil se convierte en swipe. Verificar que una persona que entra sin explicación entienda el gesto en menos de cinco segundos.

### P1 — Studio en móvil

La galería y algunos elementos pueden quedar visualmente bajos dentro del viewport. Probar en 360×800, 390×844 y 430×932; revisar especialmente el primer panel, la galería, los controles de avance y el formulario.

### P1 — Consistencia de navegación

Comprobar que el logo, apertura/cierre del menú, orden de enlaces, foco, cierre al navegar y regreso a Inicio se comporten igual en Inicio, Agency, Design, Studio y Time.

### P1 — Time: transición y recorte

Comprobar el encuadre de la pareja durante el inicio, pausa, cambio de orientación y apertura del reel. No debe quedar visible únicamente una persona ni cortarse una cara o torso.

### P2 — Iconografía

Revisar que los símbolos de play, abrir, cerrar, siguiente y externo tengan significado claro, área táctil suficiente y nombre accesible. Confirmar que no aparezcan emojis desde contenido CMS o textos dinámicos.

### P2 — Señales de scroll

Confirmar que las señales no cubran CTAs, subtítulos, controles del navegador ni contenido en pantallas pequeñas. Verificar que desaparezcan o se actualicen al llegar al último panel.

## Guion de testeo humano antes de publicar

1. Abrir el sitio en Safari iOS, Chrome Android, Safari macOS y Chrome de escritorio.
2. Probar móvil con una mano: abrir menú, ir a cada nodo, volver a Inicio y cerrar menú tocando fuera o navegando.
3. Entrar a Studio y recorrer toda la galería con swipe; abrir cada interacción, comprobar que el contenido no quede debajo del header y completar el flujo de cotización sin enviar datos reales.
4. Entrar a Design sin leer instrucciones: descubrir el gesto de navegación, usar `‹‹‹  ›››`, abrir Book, abrir/cerrar un caso y regresar.
5. Entrar a Time: recorrer historias, abrir una galería, abrir/cerrar el reel y verificar el encuadre en vertical y horizontal.
6. Repetir los flujos con teclado: Tab, Shift+Tab, Enter, Escape y foco visible. Confirmar que ningún modal deje el foco perdido.
7. Activar “reducir movimiento” y comprobar que la navegación siga siendo comprensible sin animaciones.
8. Probar red lenta o modo offline parcial: revisar imágenes rotas, videos, estados de carga y mensajes de error.
9. Revisar enlaces internos, WhatsApp, correo, formularios, botones de regreso y rutas inexistentes.
10. Hacer una pasada final de ortografía, textos provisionales, placeholders, console errors y desbordamientos horizontales involuntarios.

## Criterio de salida

Publicar solo cuando no existan P0/P1 abiertos, los flujos principales hayan sido probados en al menos un iPhone y un Android, y se haya aprobado visualmente cada nodo en escritorio y móvil.
