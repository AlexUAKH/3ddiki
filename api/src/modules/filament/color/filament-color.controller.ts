import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFilamentColorDto } from '../dto/create-filament-color.dto';
import { UpdateFilamentColorDto } from '../dto/update-filament-color.dto';
import { FilamentColorService } from './filament-color.service';

@Controller('filament-color')
export class FilamentColorController {
  constructor(private readonly filamentColorService: FilamentColorService) {}

  @Post()
  create(@Body() dto: CreateFilamentColorDto) {
    return this.filamentColorService.create(dto);
  }

  @Get()
  findAll() {
    return this.filamentColorService.findAll();
  }

  @Get('/for-select')
  indAllForSelect() {
    return this.filamentColorService.findAllForSelect();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filamentColorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFilamentColorDto) {
    return this.filamentColorService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filamentColorService.remove(+id);
  }
}
