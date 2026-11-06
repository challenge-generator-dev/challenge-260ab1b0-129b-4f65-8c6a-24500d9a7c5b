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