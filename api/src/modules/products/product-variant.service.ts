import { Injectable, Logger } from '@nestjs/common';
import { CreateVariantDto } from '../admin/product/dto/create-product-variant.dto';
import { UpdateVariantDto } from '../admin/product/dto/update-product-variant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductVariantsService {
  constructor(private readonly prisma: PrismaService) {}

  // admin part
  async findOneForAdmin(id: number) {
    return this.prisma.productVariant.findUnique({
      where: { id },
      // include: {
      //   variants: true,
      // },
    });
  }

  async getVariants(productId: number) {
    return this.prisma.productVariant.findMany({
      where: { productId },
      // include: {
      //   variants: true,
      // },
    });
  }

  async create(productId: number, dto: CreateVariantDto) {
    return this.prisma.productVariant.create({
      data: {
        filamentId: dto.filamentId,
        price: dto.price,
        stock: dto.stock,
        productId,
        //   : {
        //   connect: { id: productId },
        // },
      },
    });
  }

  async update(id: number, dto: UpdateVariantDto) {
    Logger.debug(`${id} ${dto.price}`);
    //   return this.prisma.variant.update({
    //   where: { id },
    //   data: {
    //     ...(dto.name !== undefined && { name: dto.name }),
    //     ...(dto.price !== undefined && { price: dto.price }),
    //     ...(dto.sku !== undefined && { sku: dto.sku }),
    //   },
    // });
  }

  remove(id: number) {
    return this.prisma.productVariant.delete({ where: { id } });
  }

  // ===========================
  // client part
}
