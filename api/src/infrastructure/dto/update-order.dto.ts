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