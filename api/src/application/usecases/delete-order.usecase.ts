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