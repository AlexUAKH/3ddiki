import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  MinLength
} from 'class-validator';

export class CreateFilamentDto {
  @IsString()
  @MinLength(3)
  name: string;

  @Type(() => Number)
  @IsInt()
  typeId: number;

  @Type(() => Number)
  @IsInt()
  brandId: number;

  @Transform(({ value }) => {
    // Form-data often sends arrays as a single string "1,2,3"
    // or multiple entries. This handles both.
    if (typeof value === 'string') {
      return value.split(',').map(Number);
    }
    return Array.isArray(value) ? value.map(Number) : value;
  })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMaxSize(3, { message: 'The array must contain no more than 3 items' })
  colors: number[];

  @Type(() => Number)
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber()
  stock: number;
}
