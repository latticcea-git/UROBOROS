# Brief funcional — Área de usuario y portales LATTICCE

**Proyecto:** UROBOROS / Sitio LATTICCE
**Área:** Inicio de sesión, registro y portales privados
**Estado:** Exploración funcional para definir el primer alcance
**Prioridad:** Crear una puerta de acceso única para colaboradores y clientes, sin romper la experiencia inmersiva del Home.

## 1. Intención detectada

Incorporar en la esquina izquierda del Home un botón de usuario que conduzca a un sistema de acceso privado LATTICCE. Desde el registro, la persona deberá distinguir si entra como **colaborador** o como **cliente**. Cada perfil tendrá después un portal diferente:

- El portal de colaboradores será el primer intento de plataforma interna de trabajo, con identidad `@latticce.com`, herramientas conectadas, comunicación, aprendizaje y utilidades operativas.
- El portal de clientes será un dashboard privado para consultar el estado de la relación y del proyecto: contrato, seguimiento, notificaciones, contactos, equipo asignado y servicios incluidos.

## 2. Objetivo del producto

Construir una experiencia de acceso que haga visible que LATTICCE no solo presenta servicios, sino que también ofrece un sistema vivo de relación, colaboración y seguimiento.

El área deberá resolver tres necesidades:

1. Permitir que una persona se registre y solicite su identidad o acceso correspondiente.
2. Dirigirla a la experiencia correcta según su relación con LATTICCE.
3. Centralizar la información y las acciones más importantes de colaboradores y clientes en un espacio privado, claro y escalable.

## 3. Punto de entrada en el Home

### Ubicación

- Botón de usuario fijo en la esquina superior izquierda del sitio.
- Debe convivir con el lenguaje visual del Home sin competir con el logo, el menú ni el contenido principal.
- Debe ser reconocible por icono y, cuando el contexto lo permita, por etiqueta textual.
- En móvil deberá conservar un área táctil cómoda y no quedar oculto detrás de la navegación o de contenido interactivo.

### Estados del botón

- **Visitante:** icono de usuario y acción “Entrar” o “Área de usuario”.
- **Persona no autenticada en una ruta privada:** opción de iniciar sesión o regresar al Home.
- **Persona autenticada:** avatar o iniciales, nombre y acceso directo a su portal.
- **Notificaciones pendientes:** indicador discreto, sin depender únicamente del color.

### Decisión pendiente

Confirmar si el botón abrirá una pantalla dedicada, un panel lateral o una transición modal sobre el Home. Para el primer alcance se recomienda una pantalla dedicada de acceso, porque facilita la autenticación, la recuperación de sesión y la accesibilidad.

## 4. Registro y clasificación de cuenta

### Pantalla inicial

La persona deberá poder elegir entre:

- **Soy colaborador/a**
- **Soy cliente**

La distinción debe explicarse con una frase breve para evitar que una persona seleccione el flujo equivocado.

### Registro de colaborador

Objetivo: solicitar o activar una identidad de trabajo LATTICCE.

Campos iniciales propuestos:

- Nombre completo.
- Correo actual.
- Área, disciplina o relación con LATTICCE.
- Tipo de colaboración, si aplica.
- Contraseña o método de acceso sin contraseña.
- Aceptación de términos y políticas aplicables.

Regla principal: el registro debe pedir o gestionar una identidad `@latticce.com`. Falta definir si:

- toda persona colaboradora recibirá automáticamente una cuenta;
- la cuenta se aprobará manualmente;
- el correo `@latticce.com` será un alias, una cuenta de Google Workspace o solo un identificador dentro de la plataforma.

### Registro de cliente

Objetivo: vincular a una persona con una empresa, contrato o proyecto existente.

Campos iniciales propuestos:

- Nombre completo.
- Correo de contacto.
- Empresa o marca.
- Proyecto o servicio relacionado, si lo conoce.
- Código de invitación, enlace de invitación o validación por parte de LATTICCE.
- Contraseña o método de acceso sin contraseña.
- Aceptación de términos y políticas aplicables.

El portal de cliente no debería permitir que una persona consulte información de una empresa o proyecto únicamente por registrarse. La vinculación deberá requerir invitación, aprobación o coincidencia validada con un registro interno.

## 5. Autenticación y estados de acceso

### Flujo mínimo

```text
Home → Botón de usuario → Entrar / Registrarse → Elegir perfil
→ Crear cuenta o aceptar invitación → Verificar identidad
→ Aprobación, si aplica → Portal correspondiente
```

### Casos necesarios

- Iniciar sesión.
- Cerrar sesión.
- Recuperar contraseña o solicitar nuevo enlace de acceso.
- Verificar correo electrónico.
- Aceptar una invitación.
- Ver cuenta pendiente de aprobación.
- Ver acceso rechazado o expirado.
- Cambiar de organización o proyecto cuando una persona tenga más de uno.
- Gestionar permisos según rol.

### Recomendación de seguridad

Separar desde el inicio la autenticación de la autorización. Una persona puede estar autenticada y aun así no tener permiso para ver un contrato, un proyecto, un curso o una integración determinada.

## 6. Portal de colaboradores

### Propósito

Crear la primera versión de una plataforma interna para trabajadores y colaboradores LATTICCE. Debe funcionar como punto de entrada operativo, cultural y de comunicación, no como una acumulación de enlaces.

### Módulos iniciales

#### Inicio

- Resumen de actividad relevante.
- Anuncios recientes.
- Accesos rápidos a herramientas.
- Próximos eventos, entregas o pendientes, si se integran después.
- Estado de la cuenta y de la identidad `@latticce.com`.

#### Herramientas e integraciones

Espacio para centralizar o enlazar integraciones con:

- Google Drive.
- Jira.
- Redes sociales.
- Meta.
- Otros complementos que se incorporen posteriormente.

Cada integración deberá indicar claramente si:

- está conectada;
- requiere autorización;
- está disponible solo para ciertos roles;
- abre una herramienta externa;
- sincroniza información dentro de LATTICCE.

Para el MVP se recomienda comenzar con enlaces y estados de conexión antes de construir sincronizaciones profundas.

#### Cursos y aprendizaje

- Catálogo de cursos o recursos.
- Estado de avance.
- Cursos obligatorios o recomendados.
- Materiales asociados.
- Posible registro de finalización.

#### Anuncios

- Comunicados internos.
- Cambios operativos.
- Nuevos proyectos, oportunidades o recursos.
- Fecha de publicación y autor o área responsable.
- Estado leído/no leído.

#### Calculadora

La calculadora vivirá dentro del portal de colaboradores. En esta etapa se debe definir qué calcula, qué variables recibe, quién puede usarla y si sus resultados se guardan.

Preguntas pendientes:

- ¿Es una calculadora de cotización, horas, recursos, presupuestos, producción o rentabilidad?
- ¿Sus fórmulas serán visibles para todos?
- ¿Los resultados son privados, compartibles o parte de un proyecto?
- ¿Debe generar un reporte o exportación?

#### Perfil y cuenta

- Nombre, foto o avatar e información profesional.
- Disciplina y rol.
- Datos de contacto.
- Estado de identidad `@latticce.com`.
- Preferencias de notificación.
- Seguridad y sesiones activas.

## 7. Portal de clientes

### Propósito

Ofrecer a cada cliente una vista clara, confiable y actualizada de su relación con LATTICCE, sin exponer información interna innecesaria.

### Módulos iniciales

#### Dashboard

- Estado general de la relación o proyecto.
- Próximo hito.
- Última actualización.
- Acciones pendientes del cliente.
- Acceso rápido a contacto y documentos.

#### Contrato y alcance

- Contrato vigente.
- Versión y fecha del documento.
- Estado: pendiente, activo, pausado, cerrado o vencido.
- Servicios incluidos.
- Entregables o límites de alcance, si se decide mostrarlos.
- Documentos relacionados y versiones aprobadas.

#### Seguimiento del proyecto

- Fases o hitos.
- Estado de cada fase.
- Fechas relevantes.
- Entregables entregados, en revisión o pendientes.
- Comentarios o actualizaciones autorizadas.

#### Notificaciones

- Cambios de estado.
- Solicitudes de aprobación.
- Nuevos documentos.
- Próximas reuniones o fechas clave.
- Comunicaciones importantes.

#### Información de contacto

- Contacto principal de LATTICCE.
- Contactos adicionales autorizados.
- Canal recomendado de comunicación.
- Horarios o tiempos de respuesta, si se definen.

#### Personas asignadas al proyecto

- Nombre y rol de cada persona visible para el cliente.
- Área o disciplina.
- Función dentro del proyecto.
- Canal de contacto, solo si corresponde.

#### Servicios incluidos

- Lista de servicios contratados.
- Estado de cada servicio.
- Descripción breve.
- Relación con fases o entregables.
- Servicios adicionales fuera del alcance, si deben mostrarse como oportunidades y no como obligaciones.

## 8. Modelo de roles y permisos

El sistema deberá contemplar permisos desde el primer diseño, aunque el MVP tenga pocos roles.

### Roles mínimos sugeridos

- **Visitante:** puede ver el Home y solicitar acceso.
- **Colaborador pendiente:** puede completar registro y esperar aprobación.
- **Colaborador activo:** puede entrar al portal interno según sus permisos.
- **Cliente pendiente:** puede aceptar invitación o completar validación.
- **Cliente activo:** puede consultar la información de sus organizaciones y proyectos autorizados.
- **Administrador LATTICCE:** gestiona usuarios, permisos, contenidos, proyectos e integraciones.
- **Responsable de proyecto:** actualiza el seguimiento y la información visible para un cliente.

### Principio de visibilidad

El cliente verá únicamente datos asociados a su organización y a los proyectos que tenga autorizados. El colaborador verá únicamente las herramientas, cursos, anuncios y datos internos correspondientes a su rol.

## 9. Arquitectura de navegación propuesta

```text
/usuario
├── /entrar
├── /registrarse
│   ├── /colaborador
│   └── /cliente
├── /verificar
├── /recuperar-acceso
├── /pendiente
├── /colaboradores
│   ├── /inicio
│   ├── /herramientas
│   ├── /cursos
│   ├── /anuncios
│   ├── /calculadora
│   └── /perfil
└── /clientes
    ├── /inicio
    ├── /contrato
    ├── /seguimiento
    ├── /notificaciones
    ├── /contactos
    ├── /equipo
    └── /servicios
```

Las rutas son una propuesta de organización y no una decisión técnica definitiva.

## 10. Alcance recomendado para el primer MVP

### Incluir

- Botón de usuario en el Home.
- Pantallas de entrar, registrarse y recuperar acceso.
- Selección explícita entre colaborador y cliente.
- Verificación de correo.
- Flujo de invitación o aprobación.
- Portal base con navegación diferenciada por perfil.
- Portal de colaboradores con inicio, anuncios, herramientas enlazadas, cursos básicos y calculadora pendiente de definición.
- Portal de clientes con inicio, contrato, seguimiento, contactos, equipo y servicios incluidos.
- Sistema básico de permisos.
- Estados vacíos, errores, carga, sesión expirada y acceso pendiente.

### Dejar para una segunda fase

- Sincronización profunda con Drive, Jira, Meta y redes sociales.
- Automatizaciones entre integraciones.
- Chat interno o mensajería compleja.
- Facturación y pagos.
- Aplicación móvil nativa.
- Analítica avanzada de uso.
- Constructor flexible de dashboards.

## 11. Criterios de aceptación iniciales

- El botón de usuario es localizable y usable en escritorio y móvil.
- Una persona puede identificar correctamente si entra como colaborador o cliente.
- Un cliente no puede acceder a información ajena por conocer un correo o URL.
- Un colaborador pendiente no recibe acceso completo antes de la aprobación definida.
- Cada perfil llega a un dashboard diferente después de autenticarse.
- Las integraciones externas muestran su estado y no aparentan estar sincronizadas si solo son enlaces.
- Los portales funcionan con estados de carga, vacío, error y sesión expirada.
- La experiencia mantiene el lenguaje visual de LATTICCE sin sacrificar legibilidad ni claridad operativa.
- La interfaz es navegable por teclado, tiene foco visible y ofrece una alternativa razonable para movimiento reducido.

## 12. Decisiones que deben resolverse antes de diseñar la UI final

1. ¿Qué proveedor gestionará autenticación, usuarios, invitaciones y recuperación de acceso?
2. ¿Cómo se crearán las cuentas `@latticce.com` y quién las aprobará?
3. ¿El registro de clientes será abierto, por invitación o mixto?
4. ¿Qué información contractual puede ver el cliente y qué información debe permanecer interna?
5. ¿Cuál es la definición exacta de la calculadora?
6. ¿Qué integraciones son prioritarias para la primera versión?
7. ¿Quién administra cursos, anuncios, usuarios y permisos?
8. ¿Una misma persona puede ser colaborador y cliente en contextos distintos?
9. ¿Un cliente puede pertenecer a varias empresas o proyectos?
10. ¿Qué acciones deben generar notificaciones y por qué canal?

## 13. Supuestos de esta ampliación

- “Obtener un `@latticce.com`” se interpreta como una identidad de colaborador, no como una dirección que cualquier visitante puede reclamar automáticamente.
- El portal de clientes requiere una relación previa con LATTICCE y no debe ser un área pública de autoservicio.
- Las integraciones serán inicialmente accesos controlados o enlaces con estado, salvo que se defina una sincronización específica.
- La calculadora se incorpora como módulo reservado a colaboradores, pero su función todavía no está definida.
- El documento describe producto, contenido, permisos y criterios de experiencia; no fija todavía una tecnología de backend ni un proveedor de autenticación.

## 14. Siguiente paso recomendado

Convertir este brief en tres piezas de trabajo antes de programar:

1. Mapa de roles, permisos y datos visibles.
2. Flujo UX completo de registro, aprobación, inicio de sesión y primer acceso.
3. Wireframes del botón de usuario, autenticación, dashboard de colaborador y dashboard de cliente.
