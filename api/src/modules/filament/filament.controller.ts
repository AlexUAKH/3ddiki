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
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CreateFilamentDto } from './dto/create-filament.dto';
import { UpdateFilamentDto } from './dto/update-filament.dto';
import { FilamentService } from './filament.service';

@Controller('filament')
export class FilamentController {
  constructor(private readonly filamentService: FilamentService) {}

  @Post()
  create(@Body() dto: CreateFilamentDto) {
    return this.filamentService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.filamentService.findAll();
  }

  @Get('/for-select')
  findAllForSelect() {
    return this.filamentService.findAllForSelect();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filamentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFilamentDto) {
    return this.filamentService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filamentService.remove(+id);
  }
}
