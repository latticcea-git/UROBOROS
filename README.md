# UROBOROS

Núcleo digital vivo de LATTICCE. Este repositorio será la base técnica de
LATTICCE.com, LATTICCE Experience y, en fases posteriores, la plataforma
privada para clientes y colaboradores.

## Estado

- Etapa: fundación
- Versión: `0.1.1`
- Alcance inmediato: definir y construir el MVP de LATTICCE.com

La primera prueba pública es una página estática `Hola mundo` en `index.html`.

## Arquitectura aprobada como punto de partida

- Next.js + React + TypeScript
- Payload CMS
- PostgreSQL
- GSAP para animación narrativa
- React Three Fiber para experiencias 3D justificadas
- Cloudflare R2 / Stream para medios
- Vercel para despliegue

La aplicación se incorporará por capas. No se añadirán Experience, portal,
CRM o automatizaciones antes de cerrar el alcance del MVP público.

## Ciclo de versiones

UROBOROS utiliza un ciclo de tres entregas por iteración:

```text
0.1.1 -> 0.1.2 -> 0.1.3 -> 0.2.1
```

La tercera entrega cierra la iteración y la siguiente versión abre una nueva.
Las versiones anteriores nunca se sobrescriben ni eliminan.

Comandos:

```bash
npm run version:check
npm run version:bump
```

El workflow `Version cycle` permite ejecutar el incremento manualmente desde
GitHub Actions. Valida el ciclo, actualiza `VERSION` y `package.json`, crea el
commit y etiqueta la versión.

Consulta [docs/VERSIONING.md](docs/VERSIONING.md) para las reglas completas.
