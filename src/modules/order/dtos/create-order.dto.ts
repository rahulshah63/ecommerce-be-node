import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  // @IsString()
  // @IsNotEmpty()
  // @IsEnum(PAYMENT_METHODS)
  // paymentMethod: PAYMENT_METHODS;

  @IsArray()
  @IsNotEmpty()
  items: {
    productId: string;
    quantity: number;
  }[];
}
