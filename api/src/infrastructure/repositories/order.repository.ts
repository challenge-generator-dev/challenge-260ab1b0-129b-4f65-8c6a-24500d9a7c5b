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