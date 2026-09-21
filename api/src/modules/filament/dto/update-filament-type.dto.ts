import { PartialType } from '@nestjs/mapped-types';
import { CreateFilamentTypeDto } from './create-filament-type.dto';

export class UpdateFilamentTypeDto extends PartialType(CreateFilamentTypeDto) {}
