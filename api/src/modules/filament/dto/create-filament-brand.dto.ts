import { IsString, MinLength } from 'class-validator';

export class CreateFilamentBrandDto {
  @IsString()
  @MinLength(3)
  name: string;
}
