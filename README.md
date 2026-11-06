# Implementación de CRUD de ordenes en DynamoDB desde la interfaz

El sistema de gestión de ordenes requiere la implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de ordenes en DynamoDB desde la interfaz de usuario. Las ordenes son generadas por clientes y gestionadas por el equipo de soporte. El sistema debe permitir la creación, lectura, actualización y eliminación de ordenes, asegurando la integridad y consistencia de los datos almacenados en DynamoDB.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 1 semana |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del entorno

**Objetivo:** Configurar el entorno de desarrollo para interactuar con DynamoDB y la interfaz de usuario.

**Tiempo estimado:** 1 día

**Instrucciones:**

- Configurar las credenciales de acceso a DynamoDB.
- Crear una tabla en DynamoDB para almacenar las ordenes.
- Configurar la interfaz de usuario para interactuar con la tabla de DynamoDB.

**Entregable:** Entorno de desarrollo configurado y tabla de DynamoDB creada.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para gestionar la infraestructura.
- Configuración de credenciales de acceso a servicios de AWS.

</details>

### Fase 2: Implementación de operaciones CRUD

**Objetivo:** Implementar las operaciones CRUD de ordenes en DynamoDB desde la interfaz de usuario.

**Tiempo estimado:** 3 días

**Instrucciones:**

- Implementar la funcionalidad para crear nuevas ordenes.
- Implementar la funcionalidad para leer ordenes existentes.
- Implementar la funcionalidad para actualizar ordenes existentes.
- Implementar la funcionalidad para eliminar ordenes existentes.

**Entregable:** Operaciones CRUD de ordenes implementadas y funcionando correctamente desde la interfaz de usuario.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de React para desarrollar la interfaz de usuario.
- Manejo de estados y efectos en React para interactuar con DynamoDB.

</details>

### Fase 3: Versionado de la infraestructura

**Objetivo:** Versionar la infraestructura utilizando Terraform.

**Tiempo estimado:** 1 día

**Instrucciones:**

- Crear un archivo de configuración de Terraform para versionar la infraestructura.
- Aplicar el archivo de configuración de Terraform para desplegar la infraestructura.
- Verificar que la infraestructura desplegada funciona correctamente.

**Entregable:** Infraestructura versionada y desplegada utilizando Terraform.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para versionar y desplegar la infraestructura.
- Manejo de variables y outputs en Terraform.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es DynamoDB y cómo se utiliza en este contexto?
- **paraQueSirve**: ¿Para qué sirve versionar la infraestructura utilizando Terraform?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD de ordenes en DynamoDB desde la interfaz de usuario?
- **erroresComunes**: ¿Qué errores comunes pueden ocurrir al interactuar con DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica el diseño de la estructura de la tabla de DynamoDB para almacenar las ordenes?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo para interactuar con DynamoDB y la interfaz de usuario.
- Implementación correcta de las operaciones CRUD de ordenes en DynamoDB desde la interfaz de usuario.
- Versionado correcto de la infraestructura utilizando Terraform.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`
- `client` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
