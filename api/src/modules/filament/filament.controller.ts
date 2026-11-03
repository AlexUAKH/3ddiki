import { Controller, Get } from '@nestjs/common';
import { FilamentService } from './filament.service';

@Controller('filament')
export class FilamentController {
  constructor(private readonly filamentService: FilamentService) {}

  @Get('/for-select')
  findAllForSelect() {
    return this.filamentService.findAllForSelect();
  }
}
