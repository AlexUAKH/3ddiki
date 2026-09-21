import { IsEnum, IsInt } from 'class-validator';
import { MediaOwnerType } from 'generated/prisma/enums';

export class CreateFileDto {
  @IsInt()
  ownerId: number;

  @IsEnum(MediaOwnerType)
  ownerType: MediaOwnerType;
}
