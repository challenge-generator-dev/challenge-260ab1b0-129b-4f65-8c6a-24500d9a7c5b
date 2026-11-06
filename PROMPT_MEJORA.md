# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

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

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.
- `client/package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz (corrida e2e 20261106160222034), Implementa operaciones CRUD de ordenes en DynamoDB desde la interfaz y versiona la infraestructura

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de ordenes en DynamoDB desde la interfaz
- Tiempo estimado: 1 semana

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno — objetivo: Configurar el entorno de desarrollo para interactuar con DynamoDB y la interfaz de usuario. — entregable (NO resolver): Entorno de desarrollo configurado y tabla de DynamoDB creada.
- Fase 2: Implementación de operaciones CRUD — objetivo: Implementar las operaciones CRUD de ordenes en DynamoDB desde la interfaz de usuario. — entregable (NO resolver): Operaciones CRUD de ordenes implementadas y funcionando correctamente desde la interfaz de usuario.
- Fase 3: Versionado de la infraestructura — objetivo: Versionar la infraestructura utilizando Terraform. — entregable (NO resolver): Infraestructura versionada y desplegada utilizando Terraform.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "order-management-api",
  "version": "1.0.0",
  "description": "API para gestión de órdenes con persistencia en DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.577.0",
    "@aws-sdk/lib-dynamodb": "^3.577.0",
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.4.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.12.7",
    "@types/uuid": "^9.0.8",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './infrastructure/exceptions/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API para gestión de órdenes con persistencia en DynamoDB')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();

// === ARCHIVO: api/src/domain/entities/order.entity.ts ===
import { v4 as uuidv4 } from 'uuid';
import { IsString, IsNumber, IsDate, IsOptional, IsUUID, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class Order {
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  customerId: string;

  @IsNumber()
  @Min(0)
  @Expose()
  totalAmount: number;

  @IsString()
  @Expose()
  status: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @Expose()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  @Expose()
  deletedAt?: Date;

  constructor(
    customerId: string,
    totalAmount: number,
    status: string = 'PENDING',
    id: string = uuidv4(),
    createdAt: Date = new Date(),
    updatedAt?: Date,
    deletedAt?: Date
  ) {
    this.id = id;
    this.customerId = customerId;
    this.totalAmount = totalAmount;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;

    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.totalAmount < 0) {
      throw new Error('Total amount cannot be negative');
    }
    if (!this.customerId || this.customerId.trim() === '') {
      throw new Error('Customer ID is required');
    }
    if (!['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(this.status)) {
      throw new Error('Invalid order status');
    }
  }

  markAsProcessed(): void {
    this.status = 'PROCESSING';
    this.updatedAt = new Date();
    this.validateInvariants();
  }

  markAsShipped(): void {
    this.status = 'SHIPPED';
    this.updatedAt = new Date();
    this.validateInvariants();
  }

  markAsDelivered(): void {
    this.status = 'DELIVERED';
    this.updatedAt = new Date();
    this.validateInvariants();
  }

  cancel(): void {
    this.status = 'CANCELLED';
    this.updatedAt = new Date();
    this.validateInvariants();
  }

  softDelete(): void {
    this.deletedAt = new Date();
    this.validateInvariants();
  }

  isDeleted(): boolean {
    return this.deletedAt !== undefined;
  }
}

// === ARCHIVO: api/src/domain/ports/order.repository.port.ts ===
import { Order } from '../entities/order.entity';

export interface OrderRepositoryPort {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Order[]>;
}

// === ARCHIVO: api/src/infrastructure/repositories/order.repository.ts ===
import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DynamoDBClient, GetItemCommand, PutItemCommand, DeleteItemCommand, UpdateItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, UpdateCommand, ScanCommand as DocScanCommand } from '@aws-sdk/lib-dynamodb';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/ports/order.repository.port';

@Injectable()
export class OrderRepository implements OrderRepositoryPort {
  private readonly logger = new Logger(OrderRepository.name);
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor() {
    const region = process.env.AWS_REGION || 'us-east-1';
    const endpoint = process.env.DYNAMODB_ENDPOINT;

    const clientConfig: any = { region };
    if (endpoint) {
      clientConfig.endpoint = endpoint;
    }

    const client = new DynamoDBClient(clientConfig);
    this.docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    });

    this.tableName = process.env.ORDERS_TABLE || 'orders';
    this.logger.log(`Repository initialized with table: ${this.tableName}`);
  }

  async create(order: Order): Promise<Order> {
    try {
      const orderData = this.toDynamoDBItem(order);

      await this.docClient.send(
        new PutCommand({
          TableName: this.tableName,
          Item: orderData,
        }),
      );

      this.logger.log(`Order created with ID: ${order.id}`);
      return order;
    } catch (error) {
      this.logger.error(`Failed to create order: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create order in database');
    }
  }

  async findById(id: string): Promise<Order | null> {
    try {
      const result = await this.docClient.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { id: { S: id } },
        }),
      );

      if (!result.Item) {
        this.logger.warn(`Order not found: ${id}`);
        return null;
      }

      return this.fromDynamoDBItem(result.Item);
    } catch (error) {
      this.logger.error(`Failed to find order: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve order from database');
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const orderData = this.toDynamoDBItem(order);

      const updateExpression = 'SET #status = :status, updatedAt = :updatedAt, items = :items, totalAmount = :totalAmount, customerEmail = :customerEmail, shippingAddress = :shippingAddress';
      const expressionAttributeNames: Record<string, string> = {
        '#status': 'status',
      };
      const expressionAttributeValues: Record<string, any> = {
        ':status': { S: order.status },
        ':updatedAt': { S: order.updatedAt },
        ':items': { L: order.items.map(item => ({ M: {
          productId: { S: item.productId },
          quantity: { N: item.quantity.toString() },
          price: { N: item.price.toString() },
        }})}) },
        ':totalAmount': { N: order.totalAmount.toString() },
        ':customerEmail': { S: order.customerEmail },
        ':shippingAddress': { S: order.shippingAddress },
      };

      await this.docClient.send(
        new UpdateCommand({
          TableName: this.tableName,
          Key: { id: { S: order.id } },
          UpdateExpression: updateExpression,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
        }),
      );

      this.logger.log(`Order updated: ${order.id}`);
      return order;
    } catch (error) {
      this.logger.error(`Failed to update order: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to update order in database');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.docClient.send(
        new DeleteCommand({
          TableName: this.tableName,
          Key: { id: { S: id } },
        }),
      );

      this.logger.log(`Order deleted: ${id}`);
    } catch (error) {
      this.logger.error(`Failed to delete order: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to delete order from database');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const result = await this.docClient.send(
        new ScanCommand({
          TableName: this.tableName,
        }),
      );

      if (!result.Items || result.Items.length === 0) {
        return [];
      }

      return result.Items.map(item => this.fromDynamoDBItem(item));
    } catch (error) {
      this.logger.error(`Failed to find all orders: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve orders from database');
    }
  }

  private toDynamoDBItem(order: Order): Record<string, any> {
    const item: Record<string, any> = {
      id: { S: order.id },
      customerEmail: { S: order.customerEmail },
      shippingAddress: { S: order.shippingAddress },
      status: { S: order.status },
      totalAmount: { N: order.totalAmount.toString() },
      createdAt: { S: order.createdAt },
      updatedAt: { S: order.updatedAt },
      items: {
        L: order.items.map(i => ({
          M: {
            productId: { S: i.productId },
            quantity: { N: i.quantity.toString() },
            price: { N: i.price.toString() },
          },
        })),
      },
    };

    if (order.deletedAt) {
      item.deletedAt = { S: order.deletedAt };
    }

    return item;
  }

  private fromDynamoDBItem(item: Record<string, any>): Order {
    const items = item.items?.L?.map((i: any) => ({
      productId: i.M.productId.S,
      quantity: parseInt(i.M.quantity.N, 10),
      price: parseFloat(i.M.price.N),
    })) || [];

    return new Order(
      item.id.S,
      item.customerEmail.S,
      item.shippingAddress.S,
      items,
      item.status.S,
      item.createdAt.S,
      item.updatedAt.S,
      item.deletedAt?.S,
    );
  }
}

// === ARCHIVO: api/src/infrastructure/dto/create-order.dto.ts ===
import { IsString, IsArray, ValidateNested, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ description: 'Identificador del producto', example: 'prod_123' })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Laptop Pro 15' })
  @IsString()
  productName: string;

  @ApiProperty({ description: 'Cantidad del producto', example: 2 })
  @IsNumber()
  @Min(1)
  @Max(999)
  quantity: number;

  @ApiProperty({ description: 'Precio unitario del producto', example: 1299.99 })
  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Identificador del cliente', example: 'cust_456' })
  @IsString()
  customerId: string;

  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Pérez' })
  @IsString()
  customerName: string;

  @ApiProperty({ description: 'Email del cliente', example: 'juan.perez@example.com' })
  @IsString()
  customerEmail: string;

  @ApiProperty({ description: 'Dirección de envío', example: 'Av. Principal 123, Ciudad' })
  @IsString()
  shippingAddress: string;

  @ApiProperty({ type: [OrderItemDto], description: 'Lista de productos en la orden' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiPropertyOptional({ description: 'Notas adicionales de la orden', example: 'Entregar en horario matutino' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Código de descuento aplicado', example: 'DESCUENTO20' })
  @IsOptional()
  @IsString()
  discountCode?: string;
}

// === ARCHIVO: api/src/infrastructure/dto/update-order.dto.ts ===
import { IsString, IsArray, ValidateNested, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemUpdateDto {
  @ApiPropertyOptional({ description: 'Identificador del producto', example: 'prod_123' })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional({ description: 'Nombre del producto', example: 'Laptop Pro 15' })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiPropertyOptional({ description: 'Cantidad del producto', example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(999)
  quantity?: number;

  @ApiPropertyOptional({ description: 'Precio unitario del producto', example: 1299.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class UpdateOrderDto {
  @ApiPropertyOptional({ description: 'Estado de la orden', enum: OrderStatus, example: 'PROCESSED' })
  @IsOptional()
  @IsString()
  status?: OrderStatus;

  @ApiPropertyOptional({ description: 'Dirección de envío actualizada', example: 'Av. Secundaria 456, Ciudad' })
  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @ApiPropertyOptional({ type: [OrderItemUpdateDto], description: 'Lista de productos actualizada' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemUpdateDto)
  items?: OrderItemUpdateDto[];

  @ApiPropertyOptional({ description: 'Notas adicionales actualizadas', example: 'Confirmar entrega por teléfono' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Código de descuento aplicado', example: 'DESCUENTO15' })
  @IsOptional()
  @IsString()
  discountCode?: string;

  @ApiPropertyOptional({ description: 'Número de seguimiento del envío', example: 'TRACK123456' })
  @IsOptional()
  @IsString()
  trackingNumber?: string;
}

// === ARCHIVO: api/src/infrastructure/dto/order-response.dto.ts ===
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from './update-order.dto';

export class OrderItemResponseDto {
  @ApiProperty({ description: 'Identificador del producto', example: 'prod_123' })
  productId: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Laptop Pro 15' })
  productName: string;

  @ApiProperty({ description: 'Cantidad del producto', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Precio unitario del producto', example: 1299.99 })
  unitPrice: number;

  @ApiProperty({ description: 'Subtotal del item', example: 2599.98 })
  subtotal: number;
}

export class OrderResponseDto {
  @ApiProperty({ description: 'Identificador único de la orden', example: 'ord_abc123' })
  id: string;

  @ApiProperty({ description: 'Identificador del cliente', example: 'cust_456' })
  customerId: string;

  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Pérez' })
  customerName: string;

  @ApiProperty({ description: 'Email del cliente', example: 'juan.perez@example.com' })
  customerEmail: string;

  @ApiProperty({ description: 'Dirección de envío', example: 'Av. Principal 123, Ciudad' })
  shippingAddress: string;

  @ApiProperty({ type: [OrderItemResponseDto], description: 'Lista de productos en la orden' })
  items: OrderItemResponseDto[];

  @ApiProperty({ description: 'Monto total de la orden', example: 2599.98 })
  totalAmount: number;

  @ApiProperty({ enum: OrderStatus, description: 'Estado actual de la orden', example: 'PENDING' })
  status: OrderStatus;

  @ApiPropertyOptional({ description: 'Notas adicionales de la orden', example: 'Entregar en horario matutino' })
  notes?: string;

  @ApiPropertyOptional({ description: 'Código de descuento aplicado', example: 'DESCUENTO20' })
  discountCode?: string;

  @ApiPropertyOptional({ description: 'Número de seguimiento del envío', example: 'TRACK123456' })
  trackingNumber?: string;

  @ApiProperty({ description: 'Fecha de creación de la orden', example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2024-01-15T14:22:00.000Z' })
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Fecha de eliminación (soft delete)', example: null })
  deletedAt?: Date;
}

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderUseCase } from '../../application/usecases/create-order.usecase';
import { GetOrderUseCase } from '../../application/usecases/get-order.usecase';
import { UpdateOrderUseCase } from '../../application/usecases/update-order.usecase';
import { DeleteOrderUseCase } from '../../application/usecases/delete-order.usecase';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderResponseDto } from '../dto/order-response.dto';
import { Order } from '../../domain/entities/order.entity';

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva orden', description: 'Crea una nueva orden en el sistema con los datos proporcionados' })
  @ApiBody({ type: CreateOrderDto, description: 'Datos de la orden a crear' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Orden creada exitosamente', type: OrderResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const order: Order = await this.createOrderUseCase.execute(createOrderDto);
    return this.mapToResponseDto(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID', description: 'Retorna los detalles de una orden específica' })
  @ApiParam({ name: 'id', description: 'UUID de la orden', type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Orden encontrada', type: OrderResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<OrderResponseDto> {
    const order: Order = await this.getOrderUseCase.execute(id);
    return this.mapToResponseDto(order);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una orden', description: 'Actualiza los datos de una orden existente' })
  @ApiParam({ name: 'id', description: 'UUID de la orden', type: String })
  @ApiBody({ type: UpdateOrderDto, description: 'Datos actualizados de la orden' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Orden actualizada exitosamente', type: OrderResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de entrada inválidos' })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderResponseDto> {
    const order: Order = await this.updateOrderUseCase.execute(id, updateOrderDto);
    return this.mapToResponseDto(order);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una orden', description: 'Elimina lógicamente una orden del sistema' })
  @ApiParam({ name: 'id', description: 'UUID de la orden', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Orden eliminada exitosamente' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteOrderUseCase.execute(id);
  }

  private mapToResponseDto(order: Order): OrderResponseDto {
    const response = new OrderResponseDto();
    response.id = order.id;
    response.customerId = order.customerId;
    response.items = order.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    }));
    response.totalAmount = order.totalAmount;
    response.status = order.status;
    response.createdAt = order.createdAt;
    response.updatedAt = order.updatedAt;
    return response;
  }
}

// === ARCHIVO: api/src/infrastructure/config/dynamodb.config.ts ===
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export interface DynamoDBConfig {
  region: string;
  endpoint?: string;
  tableName: string;
  maxAttempts: number;
}

@Injectable()
export class DynamoDBConfigService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DynamoDBConfigService.name);
  private client: DynamoDBClient | null = null;
  private docClient: DynamoDBDocumentClient | null = null;

  private config: DynamoDBConfig = {
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.DYNAMODB_ENDPOINT,
    tableName: process.env.ORDERS_TABLE || 'orders',
    maxAttempts: parseInt(process.env.DYNAMODB_MAX_ATTEMPTS || '3', 10),
  };

  onModuleInit() {
    this.initializeClient();
  }

  onModuleDestroy() {
    this.logger.log('DynamoDB client is being destroyed');
    this.client = null;
    this.docClient = null;
  }

  private initializeClient(): void {
    try {
      const clientConfig: any = {
        region: this.config.region,
        maxAttempts: this.config.maxAttempts,
      };

      if (this.config.endpoint) {
        clientConfig.endpoint = this.config.endpoint;
        this.logger.log(`Using DynamoDB endpoint: ${this.config.endpoint}`);
      }

      this.client = new DynamoDBClient(clientConfig);

      this.docClient = DynamoDBDocumentClient.from(this.client, {
        marshallOptions: {
          removeUndefinedValues: true,
          convertClassInstanceToMap: true,
        },
        unmarshallOptions: {
          wrapNumbers: false,
        },
      });

      this.logger.log(`DynamoDB client initialized for region: ${this.config.region}`);
    } catch (error) {
      this.logger.error(`Failed to initialize DynamoDB client: ${error.message}`, error.stack);
      throw error;
    }
  }

  getClient(): DynamoDBClient {
    if (!this.client) {
      throw new Error('DynamoDB client not initialized. Call onModuleInit first.');
    }
    return this.client;
  }

  getDocumentClient(): DynamoDBDocumentClient {
    if (!this.docClient) {
      throw new Error('DynamoDB document client not initialized. Call onModuleInit first.');
    }
    return this.docClient;
  }

  getTableName(): string {
    return this.config.tableName;
  }

  getRegion(): string {
    return this.config.region;
  }

  getConfig(): DynamoDBConfig {
    return { ...this.config };
  }

  isLocalMode(): boolean {
    return !!this.config.endpoint;
  }
}

// === ARCHIVO: api/src/infrastructure/exceptions/global-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  method: string;
  requestId?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || message;
        error = responseObj.error || error;

        if (Array.isArray(responseObj.message)) {
          message = responseObj.message.join(', ');
        }
      }

      this.handleHttpException(exception, request, status);
    } else if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      message = this.extractMessage(exception);
      error = 'Bad Request';
      this.logger.warn(`Bad request on ${request.method} ${request.url}: ${message}`);
    } else if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = this.extractMessage(exception);
      error = 'Not Found';
      this.logger.warn(`Resource not found: ${request.method} ${request.url}`);
    } else if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
      message = this.extractMessage(exception);
      error = 'Unauthorized';
      this.logger.warn(`Unauthorized access attempt: ${request.method} ${request.url}`);
    } else if (exception instanceof ForbiddenException) {
      status = HttpStatus.FORBIDDEN;
      message = this.extractMessage(exception);
      error = 'Forbidden';
      this.logger.warn(`Forbidden access: ${request.method} ${request.url}`);
    } else if (exception instanceof InternalServerErrorException) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = this.extractMessage(exception);
      error = 'Internal Server Error';
      this.logger.error(`Internal server error: ${message}`, (exception as Error).stack);
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Unhandled error: ${message}`, exception.stack);
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      requestId: (request.headers['x-request-id'] as string) || this.generateRequestId(),
    };

    response.status(status).json(errorResponse);
  }

  private handleHttpException(exception: HttpException, request: Request, status: number): void {
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `HTTP ${status} error on ${request.method} ${request.url}: ${exception.message}`,
        (exception as Error).stack,
      );
    } else if (status >= HttpStatus.BAD_REQUEST) {
      this.logger.warn(
        `HTTP ${status} error on ${request.method} ${request.url}: ${exception.message}`,
      );
    }
  }

  private extractMessage(exception: HttpException): string {
    const response = exception.getResponse();
    if (typeof response === 'string') {
      return response;
    }
    if (typeof response === 'object' && response !== null) {
      const obj = response as any;
      if (Array.isArray(obj.message)) {
        return obj.message.join(', ');
      }
      return obj.message || exception.message;
    }
    return exception.message;
  }

  private generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}

// === ARCHIVO: api/src/infrastructure/swagger/swagger.config.ts ===
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface SwaggerConfigOptions {
  title?: string;
  description?: string;
  version?: string;
  tags?: string[];
  bearerAuth?: boolean;
}

const DEFAULT_OPTIONS: Required<SwaggerConfigOptions> = {
  title: 'Order Management API',
  description: 'API para gestión de órdenes con persistencia en DynamoDB',
  version: '1.0',
  tags: ['orders'],
  bearerAuth: false,
};

export function createSwaggerDocument(app: INestApplication, options?: SwaggerConfigOptions): void {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const documentBuilder = new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version);

  if (config.tags && config.tags.length > 0) {
    config.tags.forEach((tag) => {
      documentBuilder.addTag(tag);
    });
  }

  if (config.bearerAuth) {
    documentBuilder.addBearerAuth(
      'bearer',
      'header',
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    );
  }

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { font-size: 2.5em; }
      .swagger-ui .info .description { font-size: 1.1em; line-height: 1.6; }
    `,
    customCssUrl: undefined,
    customJs: undefined,
    customJsStr: undefined,
    customSiteTitle: 'Order Management API Documentation',
    customfavIcon: undefined,
  });
}

export function setupSwagger(app: INestApplication): void {
  createSwaggerDocument(app);
  const globalPrefix = 'api';
  const swaggerPath = `/${globalPrefix}`;
  console.log(`Swagger documentation available at: http://localhost:3000${swaggerPath}`);
}

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { CreateOrderUseCase } from './application/usecases/create-order.usecase';
import { GetOrderUseCase } from './application/usecases/get-order.usecase';
import { UpdateOrderUseCase } from './application/usecases/update-order.usecase';
import { DeleteOrderUseCase } from './application/usecases/delete-order.usecase';
import { DynamoDbConfig } from './infrastructure/config/dynamodb.config';
import { GlobalExceptionFilter } from './infrastructure/exceptions/global-exception.filter';

@Module({
  controllers: [OrderController],
  providers: [
    OrderRepository,
    DynamoDbConfig,
    CreateOrderUseCase,
    GetOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/application/usecases/create-order.usecase.ts ===
import { Injectable, NotFoundException, BadRequestException, Inject, Logger } from '@nestjs/common';
import { CreateOrderDto } from '@/infrastructure/dto/create-order.dto';
import { OrderResponseDto } from '@/infrastructure/dto/order-response.dto';
import { Order } from '@/domain/entities/order.entity';
import { OrderRepositoryPort } from '@/domain/ports/order.repository.port';

@Injectable()
export class CreateOrderUseCase {
  private readonly logger = new Logger(CreateOrderUseCase.name);

  constructor(
    @Inject(OrderRepositoryPort)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    this.logger.log(`Creating order with data: ${JSON.stringify(createOrderDto)}`);

    const order = new Order(
      createOrderDto.customerId,
      createOrderDto.items,
      createOrderDto.shippingAddress,
      createOrderDto.paymentMethod,
    );

    try {
      order.validateInvariants();
    } catch (error) {
      this.logger.error(`Order validation failed: ${error.message}`);
      throw new BadRequestException(`Invalid order data: ${error.message}`);
    }

    const savedOrder = await this.orderRepository.create(order);
    this.logger.log(`Order created successfully with ID: ${savedOrder.id}`);

    return this.mapToResponseDto(savedOrder);
  }

  private mapToResponseDto(order: Order): OrderResponseDto {
    return {
      id: order.id,
      customerId: order.customerId,
      items: order.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      totalAmount: order.totalAmount,
      status: order.status,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}

// === ARCHIVO: api/src/application/usecases/get-order.usecase.ts ===
import { Injectable, NotFoundException, Inject, Logger } from '@nestjs/common';
import { OrderResponseDto } from '@/infrastructure/dto/order-response.dto';
import { Order } from '@/domain/entities/order.entity';
import { OrderRepositoryPort } from '@/domain/ports/order.repository.port';

@Injectable()
export class GetOrderUseCase {
  private readonly logger = new Logger(GetOrderUseCase.name);

  constructor(
    @Inject(OrderRepositoryPort)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(id: string): Promise<OrderResponseDto> {
    this.logger.log(`Fetching order with ID: ${id}`);

    if (!id || id.trim() === '') {
      this.logger.error('Order ID is required');
      throw new NotFoundException('Order not found');
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      this.logger.warn(`Order not found with ID: ${id}`);
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (order.isDeleted()) {
      this.logger.warn(`Order with ID: ${id} has been deleted`);
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    this.logger.log(`Order retrieved successfully: ${order.id}`);
    return this.mapToResponseDto(order);
  }

  private mapToResponseDto(order: Order): OrderResponseDto {
    return {
      id: order.id,
      customerId: order.customerId,
      items: order.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      totalAmount: order.totalAmount,
      status: order.status,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}

// === ARCHIVO: api/src/application/usecases/update-order.usecase.ts ===
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { OrderRepositoryPort } from '@/domain/ports/order.repository.port';
import { Order } from '@/domain/entities/order.entity';
import { UpdateOrderDto } from '@/infrastructure/dto/update-order.dto';
import { OrderResponseDto } from '@/infrastructure/dto/order-response.dto';
import { OrderStatus } from '@/infrastructure/dto/update-order.dto';

@Injectable()
export class UpdateOrderUseCase {
  private readonly logger = new Logger(UpdateOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderResponseDto> {
    this.logger.log(`Updating order with id: ${id}`);

    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      this.logger.warn(`Order not found: ${id}`);
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (updateOrderDto.customerId !== undefined) {
      (existingOrder as any).customerId = updateOrderDto.customerId;
    }
    if (updateOrderDto.customerName !== undefined) {
      (existingOrder as any).customerName = updateOrderDto.customerName;
    }
    if (updateOrderDto.customerEmail !== undefined) {
      (existingOrder as any).customerEmail = updateOrderDto.customerEmail;
    }
    if (updateOrderDto.items !== undefined) {
      const items = updateOrderDto.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));
      (existingOrder as any).items = items;
    }
    if (updateOrderDto.totalAmount !== undefined) {
      (existingOrder as any).totalAmount = updateOrderDto.totalAmount;
    }
    if (updateOrderDto.status !== undefined) {
      const statusMap: Record<OrderStatus, () => void> = {
        [OrderStatus.PENDING]: () => {},
        [OrderStatus.PROCESSED]: () => existingOrder.markAsProcessed(),
        [OrderStatus.SHIPPED]: () => existingOrder.markAsShipped(),
        [OrderStatus.DELIVERED]: () => existingOrder.markAsDelivered(),
        [OrderStatus.CANCELLED]: () => existingOrder.cancel(),
      };
      const action = statusMap[updateOrderDto.status];
      if (action) {
        action();
      }
    }

    const updatedOrder = await this.orderRepository.update(existingOrder);
    this.logger.log(`Order updated successfully: ${id}`);

    return this.mapToResponseDto(updatedOrder);
  }

  private mapToResponseDto(order: Order): OrderResponseDto {
    const items = (order as any).items.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

    return {
      id: (order as any).id,
      customerId: (order as any).customerId,
      customerName: (order as any).customerName,
      customerEmail: (order as any).customerEmail,
      items,
      totalAmount: (order as any).totalAmount,
      status: (order as any).status,
      createdAt: (order as any).createdAt,
      updatedAt: (order as any).updatedAt,
    };
  }
}

// === ARCHIVO: api/src/application/usecases/delete-order.usecase.ts ===
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { OrderRepositoryPort } from '../../domain/ports/order.repository.port';
import { Order } from '../../domain/entities/order.entity';

export interface DeleteOrderInput {
  id: string;
}

export interface DeleteOrderOutput {
  success: boolean;
  message: string;
}

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(OrderRepositoryPort)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(input: DeleteOrderInput): Promise<DeleteOrderOutput> {
    const { id } = input;

    if (!id || id.trim().length === 0) {
      throw new NotFoundException('El ID de la orden no puede estar vacío');
    }

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    if (existingOrder.isDeleted()) {
      throw new NotFoundException(`La orden con ID ${id} ya ha sido eliminada`);
    }

    await this.orderRepository.delete(id);

    return {
      success: true,
      message: `Orden con ID ${id} eliminada correctamente`,
    };
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "react-router-dom": "6.23.1",
    "@tanstack/react-query": "5.36.0",
    "axios": "1.7.2"
  },
  "devDependencies": {
    "typescript": "5.7.0",
    "vite": "5.2.11",
    "@vitejs/plugin-react": "4.2.1",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "eslint": "8.57.0",
    "eslint-plugin-react": "7.34.1",
    "eslint-plugin-react-hooks": "4.6.2",
    "sass": "1.77.2"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/global.scss";'
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query', 'axios']
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitAny": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: client/src/main.tsx ===
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app/App';
import './styles/global.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

// === ARCHIVO: client/src/app/App.tsx ===
import { Routes, Route, Navigate } from 'react-router-dom';
import { OrderList } from '../features/orders/OrderList';
import { OrderForm } from '../features/orders/OrderForm';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Órdenes</h1>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/new" element={<OrderForm />} />
          <Route path="/orders/:id" element={<OrderForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema de Gestión de Órdenes</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/orders/OrderList.tsx ===
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../shared/hooks/useOrders';
import { OrderApiService } from '../../shared/services/api';
import { OrderResponseDto } from '../../shared/types/order';
import { Button } from '../../shared/components/Button';
import { OrderItem } from './OrderItem';

const apiService = new OrderApiService();

export function OrderList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const { data: orders, isLoading, error, refetch } = useOrders();

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta orden?')) {
      return;
    }
    try {
      await apiService.deleteOrder(id);
      refetch();
    } catch (err) {
      console.error('Error al eliminar la orden:', err);
      alert('No se pudo eliminar la orden. Intente de nuevo.');
    }
  }, [refetch]);

  const handleEdit = useCallback((id: string) => {
    navigate(`/orders/edit/${id}`);
  }, [navigate]);

  const handleView = useCallback((id: string) => {
    navigate(`/orders/${id}`);
  }, [navigate]);

  const handleCreate = useCallback(() => {
    navigate('/orders/new');
  }, [navigate]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];
  const totalPages = orders ? Math.ceil(orders.length / ordersPerPage) : 0;

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="pagination">
        <Button
          variant="ghost"
          size="small"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className="page-info">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="ghost"
          size="small"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="order-list-container">
        <div className="loading-state">
          <div className="spinner" aria-label="Cargando órdenes"></div>
          <p>Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-list-container">
        <div className="error-state">
          <p>Error al cargar las órdenes</p>
          <Button variant="primary" onClick={() => refetch()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <header className="order-list-header">
        <h1>Gestión de Órdenes</h1>
        <Button variant="primary" onClick={handleCreate}>
          Nueva Orden
        </Button>
      </header>

      {orders && orders.length === 0 ? (
        <div className="empty-state">
          <p>No hay órdenes registradas</p>
          <Button variant="secondary" onClick={handleCreate}>
            Crear primera orden
          </Button>
        </div>
      ) : (
        <>
          <div className="order-list">
            {currentOrders.map((order: OrderResponseDto) => (
              <OrderItem
                key={order.id}
                order={order}
                onView={() => handleView(order.id)}
                onEdit={() => handleEdit(order.id)}
                onDelete={() => handleDelete(order.id)}
              />
            ))}
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  );
}

// === ARCHIVO: client/src/features/orders/OrderForm.tsx ===
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderApiService } from '../../shared/services/api';
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../../shared/types/order';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';

const apiService = new OrderApiService();

export function OrderForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<CreateOrderDto>({
    customerName: '',
    customerEmail: '',
    items: [],
    total: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      loadOrder(id);
    }
  }, [id, isEditMode]);

  const loadOrder = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const order = await apiService.getOrder(orderId);
      setFormData({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        total: order.total,
      });
    } catch (err) {
      console.error('Error al cargar la orden:', err);
      setError('No se pudo cargar la orden. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName || formData.customerName.trim().length < 2) {
      errors.customerName = 'El nombre del cliente es requerido (mínimo 2 caracteres)';
    }

    if (!formData.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      errors.customerEmail = 'Ingrese un correo electrónico válido';
    }

    if (!formData.items || formData.items.length === 0) {
      errors.items = 'Debe agregar al menos un item a la orden';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof CreateOrderDto, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [fieldErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isEditMode && id) {
        const updateData: UpdateOrderDto = {
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          items: formData.items,
          total: formData.total,
        };
        await apiService.updateOrder(id, updateData);
      } else {
        await apiService.createOrder(formData);
      }
      navigate('/orders');
    } catch (err) {
      console.error('Error al guardar la orden:', err);
      setError('No se pudo guardar la orden. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = useCallback(() => {
    navigate('/orders');
  }, [navigate]);

  if (loading && isEditMode && !formData.customerName) {
    return (
      <div className="order-form-container">
        <div className="loading-state">
          <div className="spinner" aria-label="Cargando orden"></div>
          <p>Cargando orden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-form-container">
      <header className="order-form-header">
        <h1>{isEditMode ? 'Editar Orden' : 'Nueva Orden'}</h1>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="order-form" noValidate>
        <Input
          label="Nombre del Cliente"
          type="text"
          value={formData.customerName}
          onChange={(e) => handleInputChange('customerName', e.target.value)}
          error={fieldErrors.customerName}
          required
          placeholder="Ingrese el nombre del cliente"
        />

        <Input
          label="Correo Electrónico"
          type="email"
          value={formData.customerEmail}
          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
          error={fieldErrors.customerEmail}
          required
          placeholder="cliente@ejemplo.com"
        />

        <Input
          label="Total"
          type="number"
          value={formData.total}
          onChange={(e) => handleInputChange('total', parseFloat(e.target.value) || 0)}
          min={0}
          step={0.01}
          required
        />

        {fieldErrors.items && (
          <div className="field-error" role="alert">
            {fieldErrors.items}
          </div>
        )}

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}

// === ARCHIVO: client/src/features/orders/OrderItem.tsx ===
import { useCallback } from 'react';
import { OrderResponseDto } from '../../shared/types/order';
import { Button } from '../../shared/components/Button';

export interface OrderItemProps {
  order: OrderResponseDto;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function OrderItem({ order, onView, onEdit, onDelete }: OrderItemProps) {
  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }, []);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }, []);

  const getStatusBadgeClass = useCallback((status: string): string => {
    const statusMap: Record<string, string> = {
      pending: 'status-badge--pending',
      processing: 'status-badge--processing',
      completed: 'status-badge--completed',
      cancelled: 'status-badge--cancelled',
    };
    return statusMap[status.toLowerCase()] || 'status-badge--default';
  }, []);

  const itemCount = order.items?.length || 0;

  return (
    <article className="order-item" aria-label={`Orden ${order.id}`}>
      <header className="order-item-header">
        <div className="order-item-id">
          <span className="label">ID:</span>
          <span className="value">{order.id}</span>
        </div>
        <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
          {order.status || 'Sin estado'}
        </span>
      </header>

      <section className="order-item-details">
        <div className="detail-row">
          <span className="label">Cliente:</span>
          <span className="value">{order.customerName}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{order.customerEmail}</span>
        </div>
        <div className="detail-row">
          <span className="label">Items:</span>
          <span className="value">{itemCount} producto{itemCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="detail-row">
          <span className="label">Total:</span>
          <span className="value total">{formatCurrency(order.total)}</span>
        </div>
        <div className="detail-row">
          <span className="label">Fecha:</span>
          <span className="value">{order.createdAt ? formatDate(order.createdAt) : 'N/A'}</span>
        </div>
      </section>

      <footer className="order-item-actions">
        <Button
          variant="ghost"
          size="small"
          onClick={onView}
          aria-label={`Ver detalles de la orden ${order.id}`}
        >
          Ver
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={onEdit}
          aria-label={`Editar la orden ${order.id}`}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          size="small"
          onClick={onDelete}
          aria-label={`Eliminar la orden ${order.id}`}
        >
          Eliminar
        </Button>
      </footer>
    </article>
  );
}

// === ARCHIVO: client/src/shared/types/order.ts ===
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CreateOrderDto {
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
}

export interface UpdateOrderDto {
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface OrderResponseDto {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// === ARCHIVO: client/src/shared/services/api.ts ===
import axios, { AxiosError, AxiosInstance } from 'axios';
import type { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../types/order';

const API_BASE_URL = 'http://localhost:3000';

class OrderApiService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data as { message?: string };
          const message = data?.message || `Error ${status}: ${error.message}`;
          console.error(`[OrderAPI] Error ${status}:`, message);
          return Promise.reject(new Error(message));
        } else if (error.request) {
          console.error('[OrderAPI] No se recibió respuesta del servidor');
          return Promise.reject(new Error('No se pudo conectar con el servidor'));
        } else {
          console.error('[OrderAPI] Error de configuración:', error.message);
          return Promise.reject(error);
        }
      }
    );
  }

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    const response = await this.client.post<OrderResponseDto>('/orders', orderData);
    console.log('[OrderAPI] Orden creada:', response.data.id);
    return response.data;
  }

  async getOrders(): Promise<OrderResponseDto[]> {
    const response = await this.client.get<OrderResponseDto[]>('/orders');
    console.log('[OrderAPI] Órdenes obtenidas:', response.data.length);
    return response.data;
  }

  async getOrder(id: string): Promise<OrderResponseDto> {
    const response = await this.client.get<OrderResponseDto>(`/orders/${id}`);
    console.log('[OrderAPI] Orden obtenida:', id);
    return response.data;
  }

  async updateOrder(id: string, updateData: UpdateOrderDto): Promise<OrderResponseDto> {
    const response = await this.client.put<OrderResponseDto>(`/orders/${id}`, updateData);
    console.log('[OrderAPI] Orden actualizada:', id);
    return response.data;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.client.delete(`/orders/${id}`);
    console.log('[OrderAPI] Orden eliminada:', id);
  }
}

export const orderApi = new OrderApiService();

// === ARCHIVO: client/src/shared/hooks/useOrders.ts ===
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../services/api';
import type { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../types/order';

const ORDERS_QUERY_KEY = ['orders'];
const ORDER_QUERY_KEY = (id: string) => ['orders', id];

export function useOrders() {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery<OrderResponseDto[], Error>({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: () => orderApi.getOrders(),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const createOrderMutation = useMutation<OrderResponseDto, Error, CreateOrderDto>({
    mutationFn: (orderData: CreateOrderDto) => orderApi.createOrder(orderData),
    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      console.log('[useOrders] Orden creada exitosamente:', newOrder.id);
    },
    onError: (error) => {
      console.error('[useOrders] Error al crear orden:', error.message);
    },
  });

  const updateOrderMutation = useMutation<
    OrderResponseDto,
    Error,
    { id: string; data: UpdateOrderDto }
  >({
    mutationFn: ({ id, data }) => orderApi.updateOrder(id, data),
    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY(updatedOrder.id) });
      console.log('[useOrders] Orden actualizada exitosamente:', updatedOrder.id);
    },
    onError: (error) => {
      console.error('[useOrders] Error al actualizar orden:', error.message);
    },
  });

  const deleteOrderMutation = useMutation<void, Error, string>({
    mutationFn: (id: string) => orderApi.deleteOrder(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      console.log('[useOrders] Orden eliminada exitosamente:', deletedId);
    },
    onError: (error) => {
      console.error('[useOrders] Error al eliminar orden:', error.message);
    },
  });

  return {
    orders: ordersQuery.data ?? [],
    isLoading: ordersQuery.isLoading,
    isError: ordersQuery.isError,
    error: ordersQuery.error,
    refetch: ordersQuery.refetch,
    createOrder: createOrderMutation.mutate,
    createOrderAsync: createOrderMutation.mutateAsync,
    isCreating: createOrderMutation.isPending,
    createError: createOrderMutation.error,
    updateOrder: updateOrderMutation.mutate,
    updateOrderAsync: updateOrderMutation.mutateAsync,
    isUpdating: updateOrderMutation.isPending,
    updateError: updateOrderMutation.error,
    deleteOrder: deleteOrderMutation.mutate,
    deleteOrderAsync: deleteOrderMutation.mutateAsync,
    isDeleting: deleteOrderMutation.isPending,
    deleteError: deleteOrderMutation.error,
  };
}

export function useOrder(id: string) {
  const queryClient = useQueryClient();

  const orderQuery = useQuery<OrderResponseDto, Error>({
    queryKey: ORDER_QUERY_KEY(id),
    queryFn: () => orderApi.getOrder(id),
    enabled: !!id,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  });

  const updateOrderMutation = useMutation<
    OrderResponseDto,
    Error,
    { id: string; data: UpdateOrderDto }
  >({
    mutationFn: ({ id, data }) => orderApi.updateOrder(id, data),
    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY(id) });
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      console.log('[useOrder] Orden actualizada:', updatedOrder.id);
    },
  });

  const deleteOrderMutation = useMutation<void, Error, string>({
    mutationFn: (orderId: string) => orderApi.deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      console.log('[useOrder] Orden eliminada:', id);
    },
  });

  return {
    order: orderQuery.data,
    isLoading: orderQuery.isLoading,
    isError: orderQuery.isError,
    error: orderQuery.error,
    refetch: orderQuery.refetch,
    updateOrder: (data: UpdateOrderDto) =>
      updateOrderMutation.mutate({ id, data }),
    updateOrderAsync: (data: UpdateOrderDto) =>
      updateOrderMutation.mutateAsync({ id, data }),
    isUpdating: updateOrderMutation.isPending,
    updateError: updateOrderMutation.error,
    deleteOrder: () => deleteOrderMutation.mutate(id),
    deleteOrderAsync: () => deleteOrderMutation.mutateAsync(id),
    isDeleting: deleteOrderMutation.isPending,
    deleteError: deleteOrderMutation.error,
  };
}

// === ARCHIVO: client/src/shared/components/Button.tsx ===
import React from 'react';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    isLoading && 'btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="btn__spinner" aria-hidden="true" />}
      {!isLoading && leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
      <span className="btn__text">{children}</span>
      {!isLoading && rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;

// === ARCHIVO: client/src/shared/components/Input.tsx ===
import React, { forwardRef, useId } from 'react';
import './Input.scss';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: InputType;
  size?: InputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size = 'medium',
      label,
      error,
      helperText,
      leftAdornment,
      rightAdornment,
      fullWidth = false,
      disabled,
      required,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const hasError = Boolean(error);

    const containerClasses = [
      'input-container',
      fullWidth && 'input-container--full-width',
      disabled && 'input-container--disabled',
      hasError && 'input-container--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'input',
      `input--${size}`,
      leftAdornment && 'input--with-left-adornment',
      rightAdornment && 'input--with-right-adornment',
      hasError && 'input--error',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {required && <span className="input-label__required" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="input-wrapper">
          {leftAdornment && <span className="input-adornment input-adornment--left">{leftAdornment}</span>}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={inputClasses}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={helperText || error ? helperId : undefined}
            {...props}
          />
          {rightAdornment && <span className="input-adornment input-adornment--right">{rightAdornment}</span>}
        </div>
        {(error || helperText) && (
          <span
            id={helperId}
            className={`input-helper ${error ? 'input-helper--error' : ''}`}
            role={error ? 'alert' : undefined}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

// === ARCHIVO: client/src/styles/global.scss ===
// ===========================================
// ESTILOS GLOBALES - APLICACIÓN DE ÓRDENES
// ===========================================

// Variables de color
$color-primary: #2563eb;
$color-primary-hover: #1d4ed8;
$color-primary-active: #1e40af;
$color-secondary: #64748b;
$color-secondary-hover: #475569;
$color-danger: #dc2626;
$color-danger-hover: #b91c1c;
$color-success: #16a34a;
$color-warning: #d97706;

// Paleta de grises
$color-white: #ffffff;
$color-gray-50: #f8fafc;
$color-gray-100: #f1f5f9;
$color-gray-200: #e2e8f0;
$color-gray-300: #cbd5e1;
$color-gray-400: #94a3b8;
$color-gray-500: #64748b;
$color-gray-600: #475569;
$color-gray-700: #334155;
$color-gray-800: #1e293b;
$color-gray-900: #0f172a;
$color-black: #000000;

// Espaciado
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;
$spacing-2xl: 3rem;

// Bordes
$border-radius-sm: 0.25rem;
$border-radius-md: 0.375rem;
$border-radius-lg: 0.5rem;
$border-radius-xl: 0.75rem;
$border-radius-full: 9999px;

// Sombras
$shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
$shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
$shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
$shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

// Transiciones
$transition-fast: 150ms ease-in-out;
$transition-normal: 250ms ease-in-out;
$transition-slow: 350ms ease-in-out;

// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;

// Reset y estilos base
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: $color-gray-900;
  background-color: $color-gray-50;
  min-height: 100vh;
}

// Tipografía
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  line-height: 1.25;
  color: $color-gray-900;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: $spacing-lg;
}

h2 {
  font-size: 2rem;
  margin-bottom: $spacing-md;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: $spacing-md;
}

h4 {
  font-size: 1.25rem;
  margin-bottom: $spacing-sm;
}

p {
  margin-bottom: $spacing-md;
}

a {
  color: $color-primary;
  text-decoration: none;
  transition: color $transition-fast;

  &:hover {
    color: $color-primary-hover;
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
    border-radius: $border-radius-sm;
  }
}

// Elementos de formulario base
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

// Utilidades de accesibilidad
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// Contenedor principal
#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// Scrollbar personalizada
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: $color-gray-100;
  border-radius: $border-radius-full;
}

::-webkit-scrollbar-thumb {
  background: $color-gray-300;
  border-radius: $border-radius-full;

  &:hover {
    background: $color-gray-400;
  }
}

// Selección de texto
::selection {
  background-color: rgba($color-primary, 0.2);
  color: $color-gray-900;
}

// Focus visible global
:focus-visible {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}

// Animaciones globales
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in {
  animation: fadeIn $transition-normal forwards;
}

.animate-slide-in-up {
  animation: slideInUp $transition-normal forwards;
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
