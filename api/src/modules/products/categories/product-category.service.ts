import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from 'src/modules/admin/product-category/dto/create-product-category.dto';
import { UpdateProductCategoryDto } from 'src/modules/admin/product-category/dto/update-product-category.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductCategoryDto) {
    return await this.prisma.productCategory.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.productCategory.findMany();
  }

  async findAllForSelect() {
    const types = await this.prisma.productCategory.findMany();
    return types.map((type) => ({ name: type.title, id: type.id }));
  }

  async findOne(id: number) {
    return await this.prisma.productCategory.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateProductCategoryDto) {
    return await this.prisma.productCategory.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.productCategory.delete({
      where: { id },
    });
  }
}
