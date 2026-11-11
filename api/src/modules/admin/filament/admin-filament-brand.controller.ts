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
import { FilamentBrandService } from 'src/modules/filament/brand/filament-brand.service';
import { CreateFilamentBrandDto } from './dto/create-filament-brand.dto';
import { UpdateFilamentBrandDto } from './dto/update-filament-brand.dto';

@Controller('filament-brands')
@UseGuards(JwtAuthGuard)
export class AdminFilamentBrandController {
  constructor(private readonly filamentBrandService: FilamentBrandService) {}

  @Post()
  create(@Body() dto: CreateFilamentBrandDto) {
    return this.filamentBrandService.create(dto);
  }

  @Get()
  findAll() {
    return this.filamentBrandService.findAll();
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
