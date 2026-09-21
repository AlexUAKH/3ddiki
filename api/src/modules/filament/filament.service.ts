import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilamentDto } from './dto/create-filament.dto';
import { UpdateFilamentDto } from './dto/update-filament.dto';

@Injectable()
export class FilamentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFilamentDto) {
    const type = await this.prisma.filamentType.findUnique({
      where: { id: dto.typeId },
    });

    if (!type) {
      throw new BadRequestException('Invalid typeId');
    }

    const brand = await this.prisma.filamentBrand.findUnique({
      where: { id: dto.brandId },
    });

    if (!brand) {
      throw new BadRequestException('Invalid brandId');
    }

    const filament = await this.prisma.filament.create({
      data: {
        name: dto.name,
        typeId: dto.typeId,
        brandId: dto.brandId,
        price: dto.price,
        stock: dto.stock,

        // many-to-many with FilamentColor[]
        colors: {
          connect: dto.colors.map((id) => ({
            id,
          })),
        },
      },
    });

    const id = filament.id;
    // Logger.debug(`createRes: ${JSON.stringify(filament)}`);

    // // files
    // if (files?.length) {
    //   await this.file.create(files, {
    //     ownerId: id,
    //     ownerType: 'FILAMENT',
    //   });
    // }

    return this.prisma.filament.findUnique({
      where: { id },
      include: {
        colors: true,
        brand: true,
        type: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.filament.findMany({
      include: {
        brand: true,
        type: true,
        colors: {
          select: {
            color: true,
          },
        },
      },
    });
  }

  async findAllForSelect() {
    return await this.prisma.filament.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.filament.findFirst({
      where: { id },
      include: { colors: true },
    });
  }

  async update(id: number, dto: UpdateFilamentDto) {
    const data: any = {
      ...dto,
    };

    if (dto.colors) {
      // many-to-many with FilamentColor[]
      data['colors'] = {
        connect: dto.colors.map((id) => ({
          id,
        })),
      };
    }

    return await this.prisma.filament.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.filament.delete({ where: { id } });
  }
}
