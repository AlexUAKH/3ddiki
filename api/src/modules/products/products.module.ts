import { Module } from '@nestjs/common';
import { R2StorageService } from '../storage/r2-storage.service';
import { ProductCategoryController } from './categories/product-category.controller';
import { ProductCategoryService } from './categories/product-category.service';
import { ProductVariantsService } from './product-variant.service';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductCategoryController],
  providers: [
    ProductsService,
    ProductVariantsService,
    ProductCategoryService,
    R2StorageService,
  ],
})
export class ProductsModule {}
