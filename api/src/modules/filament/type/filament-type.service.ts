import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateFilamentTypeDto } from '../dto/create-filament-type.dto';
import { UpdateFilamentTypeDto } from '../dto/update-filament-type.dto';

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
    const types = await this.prisma.filamentType.findMany();
    return types.map((type) => ({ label: type.name, value: type.id }));
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
