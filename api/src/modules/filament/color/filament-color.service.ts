import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateFilamentColorDto } from '../dto/create-filament-color.dto';
import { UpdateFilamentColorDto } from '../dto/update-filament-color.dto';

@Injectable()
export class FilamentColorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFilamentColorDto) {
    return await this.prisma.filamentColor.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.filamentColor.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findAllForSelect() {
    const colors = await this.prisma.filamentColor.findMany();
    return colors.map((color) => ({
      label: color.color,
      value: color.id,
      name: color.name,
    }));
  }

  async findOne(id: number) {
    return await this.prisma.filamentColor.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateFilamentColorDto) {
    return await this.prisma.filamentColor.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.filamentColor.delete({
      where: { id },
    });
  }
}
