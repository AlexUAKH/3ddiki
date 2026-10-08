import { Controller, Get } from '@nestjs/common';
import { FilamentTypeService } from './filament-type.service';

@Controller('filament-types')
export class FilamentTypeController {
  constructor(private readonly filamentTypeService: FilamentTypeService) {}

  @Get('/for-select')
  indAllForSelect() {
    return this.filamentTypeService.findAllForSelect();
  }
}
