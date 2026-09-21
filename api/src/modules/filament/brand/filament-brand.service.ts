import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateFilamentBrandDto } from '../dto/create-filament-brand.dto';
import { UpdateFilamentBrandDto } from '../dto/update-filament-brand.dto';

@Injectable()
export class FilamentBrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFilamentBrandDto) {
    return await this.prisma.filamentBrand.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.filamentBrand.findMany();
  }

  async findAllForSelect() {
    const brands = await this.prisma.filamentBrand.findMany();
    return brands.map((brand) => ({ label: brand.name, value: brand.id }));
  }

  async findOne(id: number) {
    return await this.prisma.filamentBrand.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateFilamentBrandDto) {
    return await this.prisma.filamentBrand.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.filamentBrand.delete({
      where: { id },
    });
  }
}
