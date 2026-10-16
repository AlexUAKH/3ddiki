import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from 'src/modules/products/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  findAllForAdmin() {
    return this.productsService.findAllForAdmin();
  }

  @Get(':id')
  findOneForAdmin(@Param('id') id: string) {
    return this.productsService.findOneForAdmin(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }

  @Patch(':id/change-discount')
  updateProductDiscount(
    @Param('id') id: string,
    @Body() dto: UpdateProductDiscountDto,
  ) {
    Logger.debug(`updateProductDiscount dto: ${JSON.stringify(dto)}`);
    return this.productsService.updateProductDiscount(+id, dto.discount);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
