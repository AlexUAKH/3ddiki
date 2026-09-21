import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFilamentBrandDto } from '../dto/create-filament-brand.dto';
import { UpdateFilamentBrandDto } from '../dto/update-filament-brand.dto';
import { FilamentBrandService } from './filament-brand.service';

@Controller('filament-brand')
export class FilamentBrandController {
  constructor(private readonly filamentBrandService: FilamentBrandService) {}

  @Post()
  create(@Body() dto: CreateFilamentBrandDto) {
    return this.filamentBrandService.create(dto);
  }

  @Get()
  findAll() {
    return this.filamentBrandService.findAll();
  }

  @Get('/for-select')
  indAllForSelect() {
    return this.filamentBrandService.findAllForSelect();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filamentBrandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFilamentBrandDto) {
    return this.filamentBrandService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filamentBrandService.remove(+id);
  }
}
