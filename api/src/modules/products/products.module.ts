import { Module } from '@nestjs/common';
import { ProductCategoryController } from './categories/product-category.controller';
import { ProductCategoryService } from './categories/product-category.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController, ProductCategoryController],
  providers: [ProductsService, ProductCategoryService],
})
export class ProductsModule {}
