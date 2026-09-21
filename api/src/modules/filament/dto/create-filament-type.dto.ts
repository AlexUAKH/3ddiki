import { IsString, MinLength } from 'class-validator';

export class CreateFilamentTypeDto {
  @IsString()
  @MinLength(3)
  name: string;
}
