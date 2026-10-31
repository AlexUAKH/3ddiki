import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../admin/product/dto/create-product.dto';
import { UpdateProductDto } from '../admin/product/dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // admin part
  async create(dto: CreateProductDto) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new BadRequestException('Invalid categoryId');
    }

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        categoryId: dto.categoryId,
        description: dto.description,
        weight: dto.weight,
        sizeX: dto.sizeX,
        sizeY: dto.sizeY,
        sizeZ: dto.sizeZ,
        discount: dto.discount,
      },
    });

    return { id: product.id };
  }

  async findAllForAdmin() {
    return this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        discount: true,
        weight: true,
        sizeX: true,
        sizeY: true,
        sizeZ: true,
      },
    });
  }

  async findOneForAdmin(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      omit: {
        rate: true,
      },
      // include: {
      //   variants: true,
      // },
    });
  }

  update(id: number, dto: UpdateProductDto) {
    return `This action updates a #${id} product: ${dto.name}`;
  }

  async updateProductDiscount(id: number, discount: number) {
    return await this.prisma.product.update({
      where: { id },
      data: { discount },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  // ===========================
  // client part
  async findAll() {
    const res = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        discount: true,
        rate: true,
        variants: {
          include: {
            images: {
              select: {
                path: true,
                type: true,
              },
            },
          },
        },
      },
    });

    // price
    // images: MediaFile[],
    // return res;

    return res.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category.title || '',
      discount: product.discount || 0,
      rate: product.rate || 0,
      price: Math.min(...product.variants.map((variant) => variant.price)),
      images: product.variants.map((variant) => variant.images).flat(),
    }));
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }
}
