import { Module } from '@nestjs/common';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { CreateOrderUseCase } from './application/usecases/create-order.usecase';
import { GetOrderUseCase } from './application/usecases/get-order.usecase';
import { UpdateOrderUseCase } from './application/usecases/update-order.usecase';
import { DeleteOrderUseCase } from './application/usecases/delete-order.usecase';
import { DynamoDbConfig } from './infrastructure/config/dynamodb.config';
import { GlobalExceptionFilter } from './infrastructure/exceptions/global-exception.filter';

@Module({
  controllers: [OrderController],
  providers: [
    OrderRepository,
    DynamoDbConfig,
    CreateOrderUseCase,
    GetOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}