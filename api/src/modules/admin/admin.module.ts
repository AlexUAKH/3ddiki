import { Module } from '@nestjs/common';
import { FilamentBrandService } from '../filament/brand/filament-brand.service';
import { FilamentColorService } from '../filament/color/filament-color.service';
import { FilamentService } from '../filament/filament.service';
import { FilamentTypeService } from '../filament/type/filament-type.service';
import { ProductCategoryService } from '../products/categories/product-category.service';
import { ProductVariantsService } from '../products/product-variant.service';
import { ProductsService } from '../products/products.service';
import { R2StorageService } from '../storage/r2-storage.service';
import { AdminFilamentBrandController } from './filament/admin-filament-brand.controller';
import { AdminFilamentColorController } from './filament/admin-filament-color.controller';
import { AdminFilamentTypeController } from './filament/admin-filament-type.controller';
import { AdminFilamentController } from './filament/admin-filament.controller';
import { AdminProductCategoryController } from './product-category/admin-product-category.controller';
import { AdminProductVariantsController } from './product/admin-product-variants.controller';
import { AdminProductsController } from './product/admin-products.controller';

@Module({
  controllers: [
    AdminProductsController,
    AdminProductVariantsController,
    AdminProductCategoryController,
    AdminFilamentTypeController,
    AdminFilamentBrandController,
    AdminFilamentColorController,
    AdminFilamentController,
  ],
  providers: [
    ProductsService,
    ProductVariantsService,
    ProductCategoryService,
    FilamentTypeService,
    FilamentBrandService,
    FilamentColorService,
    FilamentService,
    R2StorageService,
  ],
})
export class AdminModule {}
