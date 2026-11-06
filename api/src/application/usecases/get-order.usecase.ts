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