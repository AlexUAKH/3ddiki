import { Module } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { ClientProductsController } from './product/client-products.controller';

@Module({
  controllers: [ClientProductsController],
  providers: [ProductsService],
})
export class ClientModule {}
