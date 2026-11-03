import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';

export class CreateVariantDto {
  @Type(() => Number)
  @IsInt()
  filamentId!: number;

  @Type(() => Number)
  @IsNumber()
  price!: number;

  @Type(() => Number)
  @IsInt()
  stock!: number;
}
