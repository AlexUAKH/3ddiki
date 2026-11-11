import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { FilamentColorService } from 'src/modules/filament/color/filament-color.service';
import { CreateFilamentColorDto } from './dto/create-filament-color.dto';
import { UpdateFilamentColorDto } from './dto/update-filament-color.dto';

@Controller('filament-colors')
@UseGuards(JwtAuthGuard)
export class AdminFilamentColorController {
  constructor(private readonly filamentColorService: FilamentColorService) {}

  @Post()
  create(@Body() dto: CreateFilamentColorDto) {
    return this.filamentColorService.create(dto);
  }

  @Get()
  findAll() {
    return this.filamentColorService.findAll();
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
