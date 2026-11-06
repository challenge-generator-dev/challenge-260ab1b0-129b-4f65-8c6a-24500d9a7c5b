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