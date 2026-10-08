import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UpdateProductDiscountDto {
  @Type(() => Number)
  @IsInt()
  discount!: number;
}
