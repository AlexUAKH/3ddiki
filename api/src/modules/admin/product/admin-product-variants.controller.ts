import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProductVariantsService } from 'src/modules/products/product-variant.service';
import { CreateVariantDto } from './dto/create-product-variant.dto';
import { UpdateVariantDto } from './dto/update-product-variant.dto';

@Controller('')
export class AdminProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Post('products/:productId/variants')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
      storage: memoryStorage(),
    }),
  )
  createVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: CreateVariantDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.productVariantsService.create(productId, dto, images ?? []);
  }

  @Get('products/:productId/variants')
  getVariants(@Param('productId', ParseIntPipe) productId: number) {
    return this.productVariantsService.getVariants(productId);
  }

  @Get('variants/:id')
  getVariant(@Param('id', ParseIntPipe) id: number) {
    return this.productVariantsService.findOneForAdmin(+id);
  }

  @Patch('variants/:variantId')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
      storage: memoryStorage(),
    }),
  )
  updateVariant(
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() dto: UpdateVariantDto,
    @Body('deleteImageIds') deleteImageIdsRaw: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    Logger.debug(`deleteImageIds: ${deleteImageIdsRaw}`);
    let deleteImageIds: number[] = [];

    if (deleteImageIdsRaw) {
      try {
        const parsed: unknown = JSON.parse(deleteImageIdsRaw);

        if (
          !Array.isArray(parsed) ||
          !parsed.every((id) => Number.isSafeInteger(id) && id > 0)
        ) {
          throw new Error('Invalid image IDs');
        }

        deleteImageIds = [...new Set(parsed as number[])];
      } catch {
        throw new BadRequestException(
          'deleteImageIds must be a JSON array of positive integers',
        );
      }
    }

    return this.productVariantsService.update(
      variantId,
      dto,
      images ?? [],
      deleteImageIds,
    );
  }

  @Delete('variants/:variantId/image/:imageId')
  removeVariantImage(
    @Param('variantId', ParseIntPipe) variantId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ) {
    return this.productVariantsService.removeImage(+variantId, imageId);
  }

  @Delete('variants/:id')
  removeVariant(@Param('id', ParseIntPipe) id: number) {
    return this.productVariantsService.remove(+id);
  }
}
