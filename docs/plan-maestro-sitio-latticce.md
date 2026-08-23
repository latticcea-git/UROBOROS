# Plan maestro del sitio — LATTICCE / UROBOROS

**Estado:** Propuesta de planeación; requiere aprobación para iniciar producción.
**Visión:** Un sitio público inmersivo que presenta el ecosistema LATTICCE y evoluciona hacia una plataforma privada para clientes y colaboradores.

## 1. Brief normalizado

### Confirmado

- UROBOROS es la base de LATTICCE.com, LATTICCE Experience y, en fases posteriores, los portales privados.
- El sitio público prioriza una experiencia inmersiva y narrativa, antes que una estructura de dashboard o SaaS convencional.
- El Home cuenta con navegación por escenas y presenta los nodos del ecosistema LATTICCE.
- Debe existir un botón de usuario en la esquina superior izquierda del Home.
- El acceso privado distingue entre colaboradores y clientes desde el registro.
- El área de colaboradores contempla identidad `@latticce.com`, herramientas, cursos, anuncios e inicialmente una calculadora.
- El portal de clientes contempla contrato, seguimiento, notificaciones, contactos, equipo asignado y servicios incluidos.
- La base técnica declarada es Next.js, React, TypeScript, Payload CMS, PostgreSQL, GSAP, React Three Fiber cuando sea necesario, Cloudflare R2/Stream y Vercel.

### Provisional

- El primer portal de colaboradores funcionará primero como centro de acceso y contenido, no como reemplazo de Drive, Jira o Meta.
- Los clientes accederán por invitación o aprobación; no podrán ver información por registrarse libremente.
- Las integraciones empezarán como enlaces autorizados y estados de conexión antes de sincronizar datos.
- La autenticación se implementará como una capa independiente del modelo de permisos.
- El acceso se abrirá en una ruta dedicada para mantener la experiencia de autenticación simple y accesible.

### Faltante o bloqueante para construir los portales

- Proveedor de autenticación y gestión real de cuentas `@latticce.com`.
- Regla de alta, aprobación y baja de colaboradores.
- Regla de invitación de clientes y responsables internos de aprobarla.
- Definición funcional y fórmulas de la calculadora.
- Primera integración prioritaria y qué datos, si alguno, se sincronizarán.
- Modelo de contratos, proyectos, entregables, fases y personas responsables.
- Políticas de privacidad, términos y retención de documentos.

## 2. Arquitectura del sitio

```text
LATTICCE.com
├── Home inmersivo
│   ├── Manifiesto
│   ├── Ecosistema / nodos
│   ├── Pilares
│   ├── Contacto
│   └── Área de usuario
├── Nodos públicos
│   ├── Agency
│   ├── Studio
│   ├── Sound
│   ├── Design
│   ├── Films
│   └── Time
├── Servicios y contacto
└── Área privada
    ├── Acceso y registro
    ├── Portal de colaboradores
    └── Portal de clientes
```

## 3. Experiencia por tipo de usuario

| Persona | Entra para | Resultado principal |
| --- | --- | --- |
| Visitante | Conocer LATTICCE y sus nodos | Explorar, contactar o iniciar acceso |
| Prospecto | Entender servicios y solicitar una conversación | Enviar solicitud o entrar al portal si ya es cliente |
| Cliente | Consultar el estado de su relación y proyecto | Tomar decisiones informadas y comunicarse con el equipo |
| Colaborador | Trabajar, aprender y acceder a herramientas | Resolver tareas y mantenerse al día |
| Administrador LATTICCE | Gestionar información, personas y permisos | Mantener el sistema actualizado y seguro |

## 4. Mapa de rutas propuesto

### Sitio público

```text
/
/agency
/studio
/sound
/design
/films
/time
/contacto
/usuario
/usuario/entrar
/usuario/registrarse
/usuario/recuperar-acceso
```

### Área de colaboradores

```text
/colaboradores/inicio
/colaboradores/herramientas
/colaboradores/cursos
/colaboradores/anuncios
/colaboradores/calculadora
/colaboradores/perfil
```

### Área de clientes

```text
/clientes/inicio
/clientes/contrato
/clientes/seguimiento
/clientes/notificaciones
/clientes/contactos
/clientes/equipo
/clientes/servicios
```

## 5. Fases de construcción

### Fase 0 — Fundamentos y definición

**Objetivo:** cerrar lo indispensable antes de introducir cuentas o información privada.

- Aprobar el mapa del sitio y la jerarquía de navegación.
- Inventariar contenido, logos, medios y copys definitivos del sitio público.
- Diseñar el modelo de datos inicial: usuarios, organizaciones, proyectos, contratos, servicios, equipos, anuncios y cursos.
- Definir roles y reglas de visibilidad.
- Elegir autenticación, gestión de invitaciones y operación de cuentas `@latticce.com`.
- Definir el propósito de la calculadora.

**Entregable:** arquitectura aprobada, mapa de permisos y wireframes de los cuatro momentos críticos: Home, acceso, portal de colaborador y portal de cliente.

### Fase 1 — Sitio público MVP

**Objetivo:** publicar un Home sólido que comunique LATTICCE y permita convertir interés en contacto.

- Consolidar navegación inmersiva del Home.
- Terminar rutas públicas prioritarias de nodos y servicios.
- Implementar contacto y captación de prospectos.
- Añadir el botón de usuario en estado de “próximamente” o enlazado al acceso, según esté lista la fase siguiente.
- Garantizar versión móvil, navegación por teclado, foco visible y movimiento reducido.
- Medir rendimiento, errores y conversiones básicas.

**Salida de fase:** el público puede descubrir, entender y contactar LATTICCE sin depender aún de los portales.

### Fase 2 — Acceso y base privada

**Objetivo:** habilitar identidad, sesiones y permisos sin exponer datos sensibles.

- Crear rutas de entrar, registro, verificación, recuperación y sesión pendiente.
- Pedir la distinción entre cliente y colaborador.
- Implementar invitaciones y/o aprobación según la política definida.
- Crear perfiles, organizaciones y relaciones de pertenencia.
- Aplicar autorización a nivel de ruta y datos.
- Crear layouts diferenciados para colaboradores y clientes.

**Salida de fase:** usuarios autorizados llegan a una portada privada segura y ven solo información de ejemplo o de su relación real.

### Fase 3 — Portal de colaboradores MVP

**Objetivo:** ofrecer una primera herramienta interna útil y mantenible.

- Inicio con anuncios y accesos rápidos.
- Biblioteca de herramientas con Drive, Jira, Meta, redes y otros complementos.
- Centro de cursos con progreso básico.
- Anuncios con autor, fecha y estado leído/no leído.
- Calculadora, una vez que su modelo esté aprobado.
- Perfil y preferencias de cuenta.

**Salida de fase:** un colaborador encuentra sus recursos y comunicaciones operativas sin navegar por múltiples lugares.

### Fase 4 — Portal de clientes MVP

**Objetivo:** dar visibilidad clara del proyecto, reduciendo seguimiento disperso y solicitudes repetidas.

- Dashboard con estado general, próximo hito y acciones pendientes.
- Contrato y servicios incluidos.
- Seguimiento por fases, entregables y actualizaciones visibles.
- Contactos y personas asignadas.
- Notificaciones y solicitudes de aprobación.
- Soporte para múltiples proyectos u organizaciones, si el modelo lo requiere.

**Salida de fase:** cada cliente autorizado entiende el estado y alcance de su proyecto sin acceso a información interna.

### Fase 5 — Integraciones y automatización

**Objetivo:** conectar sistemas externos solo cuando cada integración tenga un caso de uso y dueño claro.

- Priorizar una integración por impacto operativo, no por cantidad.
- Integrar lectura o enlaces profundos con Drive y Jira primero, si son las más usadas.
- Definir integraciones de Meta y redes por caso de uso: campañas, publicaciones, analítica o activos.
- Añadir alertas y automatizaciones con trazabilidad.
- Revisar permisos, revocación de accesos, límites de API y privacidad antes de cada conexión.

**Salida de fase:** integraciones que reducen trabajo manual sin convertir el portal en una copia incompleta de las plataformas externas.

## 6. Prioridad de pantallas

1. Home y navegación pública.
2. Botón de usuario y pantalla de acceso.
3. Registro con distinción de perfil.
4. Estado de invitación, verificación o aprobación pendiente.
5. Dashboard de colaborador.
6. Dashboard de cliente.
7. Contrato y seguimiento del cliente.
8. Herramientas, anuncios y cursos del colaborador.
9. Calculadora e integraciones avanzadas.

## 7. Principios de diseño y contenido

- El Home conserva una narrativa visual inmersiva; los portales privados priorizan claridad, confianza y lectura rápida.
- Los portales no deben adoptar una estética SaaS genérica: la identidad LATTICCE se expresa mediante luz, materia, tipografía y espacio, sin perjudicar la función.
- La información crítica siempre tendrá texto, estado y fecha; nunca dependerá solo de una animación, color o icono.
- Cada área debe tener estados diseñados para carga, vacío, error, permiso denegado, sesión expirada y contenido pendiente.
- Los documentos contractuales, responsables y estados de proyecto deberán mostrar fuente y última actualización.
- El cliente nunca verá información interna, costos no autorizados, comentarios privados ni proyectos de terceros.

## 8. Modelo funcional mínimo

```text
Usuario
├── rol: visitante | colaborador | cliente | administrador
├── pertenece a una o más organizaciones
├── tiene permisos específicos
└── recibe notificaciones

Organización
├── tiene clientes y colaboradores autorizados
├── contiene proyectos
└── conserva contratos y servicios

Proyecto
├── tiene fases, hitos y entregables
├── tiene equipo asignado
├── registra actualizaciones visibles o internas
└── está ligado a servicios contratados
```

## 9. Criterios de éxito por etapa

| Etapa | Comprobación |
| --- | --- |
| Público | Una persona entiende qué hace LATTICCE, explora nodos y puede contactar desde móvil o escritorio. |
| Acceso | La persona identifica su tipo de cuenta, recupera acceso y no puede llegar a rutas privadas sin permiso. |
| Colaboradores | Encuentra anuncios, recursos y cursos relevantes en menos de tres interacciones desde el inicio. |
| Clientes | Entiende el estado, alcance y responsable de su proyecto desde una sola vista. |
| Integraciones | Cada conexión evita una acción manual concreta y puede ser revocada sin perder control del acceso. |

## 10. Siguiente hito de aprobación

Aprobar esta planeación y responder las seis decisiones bloqueantes de la Fase 0. Con esa base, el siguiente entregable será el flujo UX de acceso y los wireframes de las cuatro pantallas críticas.
