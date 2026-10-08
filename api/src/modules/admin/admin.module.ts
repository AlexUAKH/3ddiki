import { Module } from '@nestjs/common';
import { FilamentBrandService } from '../filament/brand/filament-brand.service';
import { FilamentColorService } from '../filament/color/filament-color.service';
import { FilamentService } from '../filament/filament.service';
import { FilamentTypeService } from '../filament/type/filament-type.service';
import { ProductCategoryService } from '../products/categories/product-category.service';
import { ProductsService } from '../products/products.service';
import { AdminFilamentBrandController } from './filament/admin-filament-brand.controller';
import { AdminFilamentColorController } from './filament/admin-filament-color.controller';
import { AdminFilamentTypeController } from './filament/admin-filament-type.controller';
import { AdminFilamentController } from './filament/admin-filament.controller';
import { AdminProductCategoryController } from './product-category/admin-product-category.controller';
import { AdminProductsController } from './product/admin-products.controller';

@Module({
  controllers: [
    AdminProductsController,
    AdminProductCategoryController,
    AdminFilamentTypeController,
    AdminFilamentBrandController,
    AdminFilamentColorController,
    AdminFilamentController,
  ],
  providers: [
    ProductsService,
    ProductCategoryService,
    FilamentTypeService,
    FilamentBrandService,
    FilamentColorService,
    FilamentService,
  ],
})
export class AdminModule {}
