import { PartialType } from '@nestjs/mapped-types';
import { CreateFilamentColorDto } from './create-filament-color.dto';

export class UpdateFilamentColorDto extends PartialType(
  CreateFilamentColorDto,
) {}
