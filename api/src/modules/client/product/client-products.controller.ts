import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ProductsService } from 'src/modules/products/products.service';

@Controller('products')
export class ClientProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    Logger.debug('in client controller');
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}
