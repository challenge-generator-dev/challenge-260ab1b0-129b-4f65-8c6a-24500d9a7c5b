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