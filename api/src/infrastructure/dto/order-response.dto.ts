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