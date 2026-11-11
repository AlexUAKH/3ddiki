import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'generated/prisma/browser';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @MinLength(3)
  lastName!: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsEnum(Role)
  role!: Role;

  @IsBoolean()
  isEmailVerified!: boolean;
}
