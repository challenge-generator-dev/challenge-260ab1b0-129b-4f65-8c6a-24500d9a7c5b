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