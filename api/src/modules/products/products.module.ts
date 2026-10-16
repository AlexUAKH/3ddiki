import { Module } from '@nestjs/common';
import { ProductCategoryController } from './categories/product-category.controller';
import { ProductCategoryService } from './categories/product-category.service';
import { ProductVariantsService } from './product-variant.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController, ProductCategoryController],
  providers: [ProductsService, ProductVariantsService, ProductCategoryService],
})
export class ProductsModule {}
