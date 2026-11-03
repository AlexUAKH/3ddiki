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
      data: dto,
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

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data: dto,
    });

    return { id: product.id };
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

    return res
      .filter((product) => product.variants.length)
      .map((product) => ({
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
    const res = await this.prisma.product.findUnique({
      where: { id },
      omit: {
        categoryId: true,
      },
      include: {
        category: true,
        variants: {
          include: {
            filament: {
              include: {
                colors: true,
                type: true,
              },
            },
            images: {
              select: {
                path: true,
                type: true,
              },
            },
            // price: true,
          },
        },
      },
    });

    if (!res) {
      throw new BadRequestException('Product not found');
    }

    return {
      id: res.id,
      name: res.name,
      description: res.description,

      weight: res.weight,
      sizeX: res.sizeX,
      sizeY: res.sizeY,
      sizeZ: res.sizeZ,
      rate: res.rate || 0,
      discount: res.discount || 0,
      category: res.category.title || '',
      variants: res.variants.map((variant) => ({
        id: variant.id,
        price: variant.price,
        stock: variant.stock,
        filament: {
          colors: variant.filament.colors.map((c) => c.color),
          type: variant.filament.type.name,
        },
        images: variant.images,
      })),
    };
  }
}
