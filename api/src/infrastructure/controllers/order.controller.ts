import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderUseCase } from '../../application/usecases/create-order.usecase';
import { GetOrderUseCase } from '../../application/usecases/get-order.usecase';
import { UpdateOrderUseCase } from '../../application/usecases/update-order.usecase';
import { DeleteOrderUseCase } from '../../application/usecases/delete-order.usecase';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderResponseDto } from '../dto/order-response.dto';
import { Order } from '../../domain/entities/order.entity';

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva orden', description: 'Crea una nueva orden en el sistema con los datos proporcionados' })
  @ApiBody({ type: CreateOrderDto, description: 'Datos de la orden a crear' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Orden creada exitosamente', type: OrderResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const order: Order = await this.createOrderUseCase.execute(createOrderDto);
    return this.mapToResponseDto(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID', description: 'Retorna los detalles de una orden específica' })
  @ApiParam({ name: 'id', description: 'UUID de la orden', type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Orden encontrada', type: OrderResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<OrderResponseDto> {
    const order: Order = await this.getOrderUseCase.execute(id);
    return this.mapToResponseDto(order);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una orden', description: 'Actualiza los datos de una orden existente' })
  @ApiParam({ name: 'id', description: 'UUID de la orden', type: String })
  @ApiBody({ type: UpdateOrderDto, description: 'Datos actualizados de la orden' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Orden actualizada exitosamente', type: OrderResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de entrada inválidos' })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderResponseDto> {
    const order: Order = await this.updateOrderUseCase.execute(id, updateOrderDto);
    return this.mapToResponseDto(order);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una orden', description: 'Elimina lógicamente una orden del sistema' })
  @ApiParam({ name: 'id', description: 'UUID de la orden', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Orden eliminada exitosamente' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteOrderUseCase.execute(id);
  }

  private mapToResponseDto(order: Order): OrderResponseDto {
    const response = new OrderResponseDto();
    response.id = order.id;
    response.customerId = order.customerId;
    response.items = order.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    }));
    response.totalAmount = order.totalAmount;
    response.status = order.status;
    response.createdAt = order.createdAt;
    response.updatedAt = order.updatedAt;
    return response;
  }
}