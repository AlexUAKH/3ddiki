import { Controller, Get } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get('/for-select')
  findAllForSelect() {
    return this.productCategoryService.findAllForSelect();
  }
}
