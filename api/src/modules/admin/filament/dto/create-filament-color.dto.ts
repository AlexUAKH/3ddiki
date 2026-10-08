import { IsString, MinLength } from 'class-validator';

export class CreateFilamentColorDto {
  @IsString()
  @MinLength(3)
  color: string;

  @IsString()
  @MinLength(3)
  name: string;
}
