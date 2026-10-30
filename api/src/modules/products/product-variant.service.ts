import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MediaOwnerType, MediaType } from 'generated/prisma/enums';
import { CreateVariantDto } from '../admin/product/dto/create-product-variant.dto';
import { UpdateVariantDto } from '../admin/product/dto/update-product-variant.dto';
import { PrismaService } from '../prisma/prisma.service';
import { R2StorageService } from '../storage/r2-storage.service';

@Injectable()
export class ProductVariantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: R2StorageService,
  ) {}

  // admin part
  async findOneForAdmin(id: number) {
    return this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            id: true,
            path: true,
            type: true,
          },
        },
      },
    });
  }

  async getVariants(productId: number) {
    // const public_api = process.env.R2_PUBLIC_URL;
    const variants = await this.prisma.productVariant.findMany({
      where: { productId },
      include: {
        filament: true,
        images: {
          select: {
            id: true,
            path: true,
            type: true,
          },
        },
      },
    });
    return variants.map((variant) => ({
      ...variant,
      filament: variant.filament.name,
      // images: variant.images.map((image) => ({
      //   ...image,
      //   url: `${public_api}/${image.path}`,
      // })),
    }));
  }

  async create(
    productId: number,
    dto: CreateVariantDto,
    images: Express.Multer.File[],
  ) {
    const uploadedImages = await Promise.all(
      images.map((file) => this.storageService.uploadImage(file, 'variants')),
    );

    try {
      return this.prisma.productVariant.create({
        data: {
          filamentId: dto.filamentId,
          price: dto.price,
          stock: dto.stock,
          productId,
          images: {
            create: uploadedImages.map((image) => ({
              filename: image.key,
              originalName: image.originalName,
              path: image.url,
              ownerType: MediaOwnerType.PRODUCT_VARIANT,
              mimeType: image.mimeType,
              size: image.size,
              type: MediaType.IMAGE,
            })),
          },
          // include: {
          //   images: true,
          // },
          //   : {
          //   connect: { id: productId },
          // },
        },
      });
    } catch (error) {
      // Best-effort cleanup if the database operation fails.
      await Promise.allSettled(
        uploadedImages.map((image) =>
          this.storageService.deleteImage(image.key),
        ),
      );
      throw error;
    }
  }

  async update(
    variantId: number,
    dto: UpdateVariantDto,
    newFiles: Express.Multer.File[],
    deleteImageIds: number[],
  ) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { images: true },
    });

    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    // Only allow deleting images that belong to this variant.
    const imagesToDelete = variant.images.filter((image) =>
      deleteImageIds.includes(image.id),
    );

    if (imagesToDelete.length !== new Set(deleteImageIds).size) {
      throw new BadRequestException(
        'One or more image IDs do not belong to this variant',
      );
    }

    // Upload new images to R2 first.
    const uploadedImages = await Promise.all(
      newFiles.map((file) => this.storageService.uploadImage(file)),
    );

    try {
      const updatedVariant = await this.prisma.$transaction(async (tx) => {
        await tx.productVariant.update({
          where: { id: variantId },
          data: {
            ...dto,
            images: {
              ...(imagesToDelete.length && {
                deleteMany: {
                  id: { in: imagesToDelete.map((image) => image.id) },
                },
              }),
              ...(uploadedImages.length && {
                create: uploadedImages.map((image) => ({
                  filename: image.key,
                  originalName: image.originalName,
                  path: image.url,
                  ownerType: MediaOwnerType.PRODUCT_VARIANT,
                  mimeType: image.mimeType,
                  size: image.size,
                  type: MediaType.IMAGE,
                })),
              }),
            },
          },
          include: { images: true },
        });

        return tx.productVariant.findUniqueOrThrow({
          where: { id: variantId },
          include: { images: true },
        });
      });

      // Database changes succeeded; now remove deleted files from R2.
      const cleanup = await Promise.allSettled(
        imagesToDelete.map((image) =>
          this.storageService.deleteImage(image.filename),
        ),
      );

      // Log failures so orphaned R2 objects can be cleaned up later.
      cleanup.forEach((result) => {
        if (result.status === 'rejected') {
          console.error('Failed to delete image from R2:', result.reason);
        }
      });

      return updatedVariant;
    } catch (error) {
      // Remove newly uploaded objects if the DB update failed.
      await Promise.allSettled(
        uploadedImages.map((image) =>
          this.storageService.deleteImage(image.key),
        ),
      );

      throw error;
    }
  }

  async removeImage(variantId: number, imageId: number) {
    const image = await this.prisma.file.findFirst({
      where: {
        id: imageId,
        // Use these conditions if your File model has these fields:
        ownerId: variantId,
        ownerType: MediaOwnerType.PRODUCT_VARIANT,
      },
    });

    if (!image) {
      throw new NotFoundException('Image not found for this variant');
    }

    // Delete the database record first.
    await this.prisma.file.delete({
      where: { id: imageId },
    });

    // Delete the actual file from Cloudflare R2.
    try {
      await this.storageService.deleteImage(image.filename);
    } catch (error) {
      // Log the failure and retry cleanup later.
      console.error('Failed to delete image from R2:', error);
    }

    return { message: 'Image deleted successfully' };
  }

  async remove(variantId: number) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { images: true },
    });

    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    await this.prisma.$transaction(async (tx) => {
      // Delete image records associated with this variant.
      await tx.productVariant.update({
        where: { id: variantId },
        data: {
          images: {
            deleteMany: {},
          },
        },
      });

      await tx.productVariant.delete({
        where: { id: variantId },
      });
    });

    // Remove the actual image objects from Cloudflare R2.
    const results = await Promise.allSettled(
      variant.images.map((image) =>
        this.storageService.deleteImage(image.filename),
      ),
    );

    results.forEach((result) => {
      if (result.status === 'rejected') {
        console.error('R2 image cleanup failed:', result.reason);
      }
    });

    return { message: 'Variant deleted successfully' };
  }

  // ===========================
  // client part
}
