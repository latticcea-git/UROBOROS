# Versionado cíclico de UROBOROS

## Regla

El formato es `MAYOR.ITERACION.ENTREGA` y cada iteración contiene exactamente
tres entregas:

1. `x.y.1`: apertura y primera entrega.
2. `x.y.2`: consolidación.
3. `x.y.3`: cierre de la iteración.

Después de `x.y.3`, el ciclo continúa en `x.(y+1).1`.

Ejemplo:

```text
0.1.1 -> 0.1.2 -> 0.1.3 -> 0.2.1 -> 0.2.2 -> 0.2.3 -> 0.3.1
```

## Incremento mayor

El cambio de versión mayor es deliberado y no automático. Cuando exista una
ruptura de compatibilidad o un nuevo producto estable, se abre manualmente
`(x+1).0.1`.

## Garantías

- Nunca se reutilizan etiquetas.
- Nunca se eliminan versiones publicadas.
- Cada versión corresponde a un commit identificable.
- `VERSION` y `package.json` deben contener siempre el mismo valor.
- El workflow debe ejecutar las pruebas antes de crear una etiqueta.

## Operación

Para validar el comportamiento:

```bash
npm run version:check
```

Para calcular y escribir la siguiente versión:

```bash
npm run version:bump
```
