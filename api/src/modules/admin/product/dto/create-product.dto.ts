import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @Type(() => Number)
  @IsInt()
  categoryId!: number;

  @IsString()
  @MaxLength(250)
  description!: string;

  @Type(() => Number)
  @IsInt()
  weight!: number;

  @Type(() => Number)
  @IsNumber()
  sizeX!: number;

  @Type(() => Number)
  @IsNumber()
  sizeY!: number;

  @Type(() => Number)
  @IsNumber()
  sizeZ!: number;

  @Type(() => Number)
  @IsInt()
  discount!: number;
}
