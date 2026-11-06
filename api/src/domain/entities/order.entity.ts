import { v4 as uuidv4 } from 'uuid';
import { IsString, IsNumber, IsDate, IsOptional, IsUUID, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class Order {
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  customerId: string;

  @IsNumber()
  @Min(0)
  @Expose()
  totalAmount: number;

  @IsString()
  @Expose()
  status: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @Expose()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  @Expose()
  deletedAt?: Date;

  constructor(
    customerId: string,
    totalAmount: number,
    status: string = 'PENDING',
    id: string = uuidv4(),
    createdAt: Date = new Date(),
    updatedAt?: Date,
    deletedAt?: Date
  ) {
    this.id = id;
    this.customerId = customerId;
    this.totalAmount = totalAmount;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;

    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.totalAmount < 0) {
      throw new Error('Total amount cannot be negative');
    }
    if (!this.customerId || this.customerId.trim() === '') {
      throw new Error('Customer ID is required');
    }
    if (!['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(this.status)) {
      throw new Error('Invalid order status');
    }
  }

  markAsProcessed(): void {
    this.status = 'PROCESSING';
    this.updatedAt = new Date();
    this.validateInvariants();
  }

  markAsShipped(): void {
    this.status = 'SHIPPED';
    this.updatedAt = new Date();
    this.validateInvariants();
  }

  markAsDelivered(): void {
    this.status = 'DELIVERED';
    this.updatedAt = new Date();
    this.validateInvariants();
  }

  cancel(): void {
    this.status = 'CANCELLED';
    this.updatedAt = new Date();
    this.validateInvariants();
  }

  softDelete(): void {
    this.deletedAt = new Date();
    this.validateInvariants();
  }

  isDeleted(): boolean {
    return this.deletedAt !== undefined;
  }
}