# Brief actualizado — Área de usuario y portales LATTICCE

**Proyecto:** UROBOROS / LATTICCE
**Área:** acceso, portal de colaboradores y portal de clientes
**Estado:** dirección funcional y visual para la siguiente iteración
**Alcance de este documento:** define qué se diseñará y qué datos debe representar; no da por hechas integraciones, cuentas reales ni métricas sin una fuente conectada.

## 1. Intención detectada

Construir dos portales privados, unidos por un mismo acceso pero con finalidades distintas:

- **Colaboradores:** un espacio operativo para organizar proyectos, herramientas, calendario, personas, aprendizaje y anuncios.
- **Clientes:** una vista clara y contenida de su proyecto, avance, contrato, documentos, responsables y acciones pendientes.

Ambos deben tomar de la referencia una cualidad espacial y editorial: un **núcleo con halo acuoso** que concentra atención y un **panel inferior oscuro** que resume la información operativa. No se debe copiar su interfaz ni rellenar el portal con gráficas, archivos o integraciones simuladas.

## 2. Lectura de la referencia

### Lo que funciona y se conserva

| Rasgo visible | Valor para LATTICCE | Adaptación propuesta |
| --- | --- | --- |
| Campo claro y muy despejado | Hace que la información se perciba ordenada y permite distinguir lo crítico. | Superficie clara o gris mineral para los portales, con tipografía LATTICCE y contraste negro preciso. |
| Núcleo orgánico con halo acuoso | Da un punto de concentración sin convertir el dashboard en una cuadrícula genérica. | Halo abstracto, sin imagen decorativa obligatoria, asociado al proyecto seleccionado o al estado general. Nunca debe ocultar datos. |
| Módulos de distintas escalas | Separa agenda, actividad, equipo y material sin usar una sola tabla. | Tarjetas con propósito único y jerarquía explícita: proyecto, avance, próximas fechas, equipo o documentos. |
| Franja inferior negra | Crea un lugar claro para resumir indicadores y actividad. | Panel inferior de rendimiento/progreso, con datos verificables y fecha de actualización. |

### Lo que no se adopta

- No se copiará la marca, la retícula exacta, los textos, el file preview ni la forma de las tarjetas de la referencia.
- No se crearán gráficas, porcentajes, archivos o avatares ficticios para llenar espacio.
- El halo no será un adorno constante ni una animación que perjudique lectura, rendimiento o movimiento reducido.
- No se prometerá que una herramienta está integrada si solo abre un enlace externo.

### Veredicto

La referencia es **prometedora** para el tipo de información que necesitan ambos portales: mezcla una superficie serena con un foco visual y un resumen operacional. Su adaptación debe ser más sobria: la identidad LATTICCE aparece en luz, materialidad, contraste y ritmo, mientras que el contenido siempre conserva prioridad.

## 3. Principios de diseño compartidos

1. **Un núcleo por contexto.** El halo representa el proyecto activo, el avance general o el siguiente hito; no una imagen intercambiable sin significado.
2. **El panel inferior informa.** Resume progreso, carga o estado con texto, etiquetas y fecha; las gráficas complementan, no sustituyen, la lectura.
3. **Una acción principal visible.** Crear proyecto, revisar un hito o descargar un documento; no varias llamadas compitiendo.
4. **Datos antes que ornamento.** Si no existe conexión o dato, se muestra un estado vacío útil y la acción para resolverlo.
5. **Móvil primero en comportamiento.** Las tarjetas pasan a una columna; el panel inferior se apila; las acciones de arrastrar también se pueden realizar con toque, selección y botón “Agregar”.
6. **Mismo sistema, distinta privacidad.** Colaboradores ven operación interna según permisos. Clientes solo ven contenido autorizado de su organización y proyecto.

## 4. Acceso y clasificación de cuenta

El botón de usuario permanece en la esquina superior izquierda del Home y dirige a una pantalla dedicada `/usuario`.

La pantalla de acceso debe permitir elegir con claridad:

- **Colaborador/a:** solicita o activa una identidad `@latticce.com`; la cuenta requiere la aprobación que LATTICCE defina.
- **Cliente:** accede mediante invitación, validación o relación previa; registrarse por sí solo no concede acceso a proyectos ni contratos.

Flujo mínimo:

```text
Home → Área de usuario → Entrar / Registrarse → Elegir perfil
→ Verificar identidad o aceptar invitación → Aprobación, si aplica
→ Portal correspondiente
```

La autenticación y la autorización se mantienen separadas: tener sesión no concede automáticamente acceso a una organización, proyecto, calculadora o integración.

## 5. Portal de colaboradores

### Propósito

Ser el centro de trabajo de cada colaborador: encontrar su actividad y organizar proyectos sin intentar reemplazar Drive, Jira, Meta, Adobe o las demás plataformas.

### Navegación propuesta

```text
/colaboradores
├── Inicio
├── Proyectos
├── Herramientas
├── Calendario
├── Personas
├── Cursos
├── Anuncios
└── Perfil
```

### Inicio: composición visual

- **Núcleo / halo:** proyecto seleccionado o estado general del trabajo. Debe mostrar su nombre y estado en texto.
- **Columna operativa:** próximos hitos, actividad relevante y anuncios no leídos.
- **Panel inferior oscuro:** rendimiento general y por proyecto, únicamente cuando haya una fuente de datos definida; de lo contrario, estado “Sin datos conectados”.
- **Acción primaria:** `Crear proyecto`, visible solo a quien tenga permiso.

### Proyectos

- Vistas separables: **activos**, **terminados** y, si se requiere posteriormente, archivados.
- Crear proyecto con un nombre y los datos mínimos que LATTICCE defina; no se inventa un flujo de aprobación sin regla operativa.
- Cada proyecto muestra: estado, responsables visibles, siguiente hito y avance solo si está disponible.
- Al abrir un proyecto se muestra su espacio de herramientas, calendario, equipo y actividad autorizada.

### Espacio de herramientas por proyecto

El usuario puede configurar las herramientas de cada proyecto mediante una bandeja de iconos y zonas de destino claras.

**Catálogo inicial solicitado:** Jira, Meta, Google Drive, Adobe, TikTok, otras apps aprobadas y lenguajes o stacks de programación.

Reglas:

- Arrastrar un icono equivale inicialmente a **asociar un acceso o una categoría** al proyecto; no equivale a conceder permisos ni a sincronizar datos.
- Cada icono debe indicar su estado: `disponible`, `requiere conexión`, `conectado` o `sin permiso`.
- En móvil se ofrece el mismo resultado con selección de icono y botón `Agregar al proyecto`.
- Las opciones de lenguajes/stacks se usan para describir la configuración técnica del proyecto, no como métricas de desempeño.

### Herramientas y calculadoras

La sección `Herramientas` reúne accesos externos y las calculadoras actuales de TABULADOR:

| Herramienta | Ruta actual en TABULADOR | Condición de enlace |
| --- | --- | --- |
| HORA$ | `/` | Abrir en la instancia pública de TABULADOR cuando exista. |
| Cotizador Studio | `/cotizador-studio` | Abrir en la instancia pública de TABULADOR cuando exista. |
| Renta de equipo | `/renta-equipo` | Abrir en la instancia pública de TABULADOR cuando exista. |
| Paquetes | `/paquetes` | Abrir en la instancia pública de TABULADOR cuando exista. |

La base pública de TABULADOR aún debe confirmarse. Hasta entonces, el portal no debe exponer enlaces `localhost` ni presentar estas calculadoras como públicas. Al definirse, se configurará una sola URL base y se enlazarán las cuatro rutas.

### Calendario, personas y perfil

- **Calendario:** hitos, entregas, sesiones y fechas de proyecto que estén autorizadas para el usuario.
- **Personas:** directorio de colaboradores y clientes visibles según proyecto/permisos, con una vía de contacto aprobada por LATTICCE.
- **Perfil:** cambiar foto, nombre y datos de contacto propios. La visibilidad de cada dato se configura explícitamente.
- **Cursos y anuncios:** se conservan como módulos de apoyo, con avance y lectura solo si se registran esas señales.

## 6. Portal de clientes

### Propósito

Dar al cliente una imagen confiable de su proyecto sin trasladarle la operación interna de LATTICCE.

### Navegación propuesta

```text
/clientes
├── Inicio
├── Proyecto
├── Contrato y documentos
├── Calendario
├── Personas
└── Notificaciones
```

### Dashboard: composición visual equivalente

- **Núcleo / halo:** estado del proyecto seleccionado y su próximo hito, siempre expresados con texto y fecha.
- **Módulos centrales:** avance por fases, entregables autorizados, próximas acciones y responsable principal.
- **Panel inferior oscuro:** gráfica de avance y resumen de servicios/entregables solo con datos reales; indica última actualización y fuente.
- **Acción primaria:** revisar una aprobación o descargar un documento disponible. No hay “crear proyecto” para clientes salvo que se apruebe expresamente ese flujo.

### Información visible

| Módulo | Información permitida |
| --- | --- |
| Proyecto | Estado, fases/hitos visibles, próxima fecha y actualizaciones autorizadas. |
| Avance | Gráfica o porcentaje respaldado por el seguimiento del proyecto, con fecha de actualización. |
| Contrato y descargables | Contrato vigente y documentos aprobados para descarga; versión, fecha y estado. |
| Servicios | Servicios incluidos y su relación con el proyecto, sin costos o notas internas no autorizadas. |
| Personas | Equipo y contactos visibles, con rol y canal de contacto autorizado. |
| Notificaciones | Cambios de estado, documentos, aprobaciones y fechas importantes. |
| Calendario | Hitos, reuniones y entregas que el cliente pueda consultar. |

El cliente no ve comentarios internos, proyectos de terceros, costos no aprobados, herramientas de colaboradores ni métricas internas de rendimiento.

## 7. Datos, permisos y estados necesarios

### Entidades mínimas

```text
Usuario
├── perfil, foto y datos de contacto con visibilidad configurable
├── rol: visitante | colaborador pendiente | colaborador activo |
│       cliente pendiente | cliente activo | administrador
└── pertenencias y permisos

Proyecto
├── estado, responsables, hitos y calendario
├── avance y fuente/fecha de actualización
├── herramientas asociadas
└── documentos o contratos visibles por permiso
```

### Estados obligatorios

- Carga, vacío, error, sesión expirada y permiso denegado.
- Integración no conectada o sin permiso.
- Avance todavía no disponible, con explicación y fecha de última actualización si existe.
- Documento no disponible o acceso revocado.

## 8. Alcance de la siguiente implementación

### Incluir

- El sistema visual compartido: halo funcional, módulos claros y panel inferior informativo.
- Dashboard de colaborador y de cliente con contenido de ejemplo claramente identificado como demo cuando no sea real.
- Vistas de proyectos activos/terminados y la acción de crear proyecto condicionada a permiso.
- Compositor de herramientas por proyecto con arrastrar y alternativa táctil.
- Sección Herramientas con las cuatro calculadoras preparadas para una URL base de TABULADOR.
- Perfil editable, calendario, personas y módulos de progreso con estados vacíos honestos.
- Contrato/documentos descargables como estructura y permisos; la descarga real requiere archivos y autorización.

### No incluir todavía

- Sincronización profunda o acceso delegado a Jira, Meta, Drive, Adobe, TikTok u otras plataformas.
- Chat, pagos, facturación o métricas inventadas.
- Creación automática de correos `@latticce.com`.
- Enlaces públicos a TABULADOR hasta confirmar y publicar su instancia.

## 9. Criterios de aceptación

- El portal de colaboradores permite distinguir proyectos activos de terminados y crear uno solo con permiso.
- Las herramientas se pueden asociar a un proyecto con arrastrar y con una alternativa accesible en móvil/teclado.
- Ningún icono promete una integración que no exista.
- Las calculadoras usan las rutas actuales y se activan solo con una base pública válida de TABULADOR.
- El perfil permite editar únicamente los propios datos y define qué datos de contacto se muestran.
- Cada gráfica expone etiqueta, estado y fecha; si no hay datos, no simula actividad.
- El cliente entiende estado, avance, documentos, contrato, responsables y siguiente acción desde su dashboard.
- El cliente no puede acceder a información interna ni a proyectos ajenos.
- En móvil, el acceso y ambos portales mantienen scroll, controles táctiles y lectura en una sola columna.

## 10. Decisiones aún necesarias

1. Qué roles pueden crear, cerrar o archivar proyectos.
2. Cuál será la fuente de verdad para avance, rendimiento y calendario.
3. Qué datos de perfil y contacto serán visibles entre colaboradores y clientes.
4. Qué integraciones entrarán primero y quién autoriza cada conexión.
5. La URL pública definitiva de TABULADOR para activar HORA$, Cotizador Studio, Renta y Paquetes.
6. Qué contratos y documentos pueden descargarse y bajo qué regla de expiración/revocación.

## 11. Siguiente iteración sugerida

Diseñar primero cuatro pantallas con datos de muestra explícitamente etiquetados: Inicio de colaborador, proyecto de colaborador con compositor de herramientas, Inicio de cliente y detalle de contrato/documentos. Después se valida el comportamiento móvil antes de conectar cualquier dato real.
