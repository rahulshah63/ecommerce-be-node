import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TYPE, SUBTYPE } from '../category.interface';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TYPE)
  type: TYPE;

  @IsString()
  @IsNotEmpty()
  @IsEnum(SUBTYPE)
  subtype: SUBTYPE;
}
