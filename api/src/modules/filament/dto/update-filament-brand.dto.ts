import { PartialType } from '@nestjs/mapped-types';
import { CreateFilamentBrandDto } from './create-filament-brand.dto';

export class UpdateFilamentBrandDto extends PartialType(
  CreateFilamentBrandDto,
) {}
