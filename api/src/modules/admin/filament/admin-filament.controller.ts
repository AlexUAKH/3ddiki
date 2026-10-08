import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { FilamentService } from 'src/modules/filament/filament.service';
import { CreateFilamentDto } from './dto/create-filament.dto';
import { UpdateFilamentDto } from './dto/update-filament.dto';

@Controller('filament')
export class AdminFilamentController {
  constructor(private readonly filamentService: FilamentService) {}

  @Post()
  create(@Body() dto: CreateFilamentDto) {
    return this.filamentService.create(dto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.filamentService.findAll();
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
