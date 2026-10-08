import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateFilamentTypeDto } from '../../admin/filament/dto/create-filament-type.dto';
import { UpdateFilamentTypeDto } from '../../admin/filament/dto/update-filament-type.dto';

@Injectable()
export class FilamentTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFilamentTypeDto) {
    return await this.prisma.filamentType.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.filamentType.findMany();
  }

  async findAllForSelect() {
    return await this.prisma.filamentType.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.filamentType.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateFilamentTypeDto) {
    return await this.prisma.filamentType.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.filamentType.delete({
      where: { id },
    });
  }
}
