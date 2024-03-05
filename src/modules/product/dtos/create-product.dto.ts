import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AVAILABILITY } from '../product.interface';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  price: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(AVAILABILITY)
  role: AVAILABILITY;
}
