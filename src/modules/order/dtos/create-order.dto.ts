import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PAYMENT_METHODS } from '../order.interface';

export class CreateOrderDto {
  // @IsString()
  // @IsNotEmpty()
  // @IsEnum(PAYMENT_METHODS)
  // paymentMethod: PAYMENT_METHODS;

  @IsString()
  @IsNotEmpty()
  items: {
    productCode: string;
    quantity: number;
  }[];
}
