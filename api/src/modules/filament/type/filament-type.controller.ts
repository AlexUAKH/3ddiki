import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFilamentTypeDto } from '../dto/create-filament-type.dto';
import { UpdateFilamentTypeDto } from '../dto/update-filament-type.dto';
import { FilamentTypeService } from './filament-type.service';

@Controller('filament-type')
export class FilamentTypeController {
  constructor(private readonly filamentTypeService: FilamentTypeService) {}

  @Post()
  create(@Body() dto: CreateFilamentTypeDto) {
    return this.filamentTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.filamentTypeService.findAll();
  }

  @Get('/for-select')
  indAllForSelect() {
    return this.filamentTypeService.findAllForSelect();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filamentTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFilamentTypeDto) {
    return this.filamentTypeService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filamentTypeService.remove(+id);
  }
}
