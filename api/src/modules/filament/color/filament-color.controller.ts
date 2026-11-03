import { Controller, Get } from '@nestjs/common';
import { FilamentColorService } from './filament-color.service';

@Controller('filament-colors')
export class FilamentColorController {
  constructor(private readonly filamentColorService: FilamentColorService) {}

  @Get('/for-select')
  indAllForSelect() {
    return this.filamentColorService.findAllForSelect();
  }
}
