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