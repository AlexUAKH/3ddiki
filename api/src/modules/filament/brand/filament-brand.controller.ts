import { Controller, Get } from '@nestjs/common';
import { FilamentBrandService } from './filament-brand.service';

@Controller('filament-brands')
export class FilamentBrandController {
  constructor(private readonly filamentBrandService: FilamentBrandService) {}

  @Get('/for-select')
  indAllForSelect() {
    return this.filamentBrandService.findAllForSelect();
  }
}
