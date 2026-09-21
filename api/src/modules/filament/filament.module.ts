import { Module } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { FilamentBrandController } from './brand/filament-brand.controller';
import { FilamentBrandService } from './brand/filament-brand.service';
import { FilamentColorController } from './color/filament-color.controller';
import { FilamentColorService } from './color/filament-color.service';
import { FilamentController } from './filament.controller';
import { FilamentService } from './filament.service';
import { FilamentTypeController } from './type/filament-type.controller';
import { FilamentTypeService } from './type/filament-type.service';

@Module({
  controllers: [
    FilamentController,
    FilamentTypeController,
    FilamentBrandController,
    FilamentColorController,
  ],
  providers: [
    FilamentService,
    FilamentTypeService,
    FilamentBrandService,
    FilamentColorService,
    FileService,
  ],
})
export class FilamentModule {}
