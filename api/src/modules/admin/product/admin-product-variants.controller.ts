import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductVariantsService } from 'src/modules/products/product-variant.service';
import { CreateVariantDto } from './dto/create-product-variant.dto';
import { UpdateVariantDto } from './dto/update-product-variant.dto';

@Controller('')
export class AdminProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Post('products/:productId/variants')
  createVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: CreateVariantDto,
  ) {
    return this.productVariantsService.create(productId, dto);
  }

  @Get('products/:productId/variants')
  getVariants(@Param('productId', ParseIntPipe) productId: number) {
    return this.productVariantsService.getVariants(productId);
  }

  @Patch('variants/:id')
  updateVariant(
    @Param('id', ParseIntPipe) id: number,

    @Body() dto: UpdateVariantDto,
  ) {
    return this.productVariantsService.update(+id, dto);
  }

  @Delete('variants/:id')
  removeVariant(@Param('id', ParseIntPipe) id: number) {
    return this.productVariantsService.remove(+id);
  }
}
