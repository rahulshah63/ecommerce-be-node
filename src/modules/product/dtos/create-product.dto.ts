import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  price: string;
}
